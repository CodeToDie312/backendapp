const { User } = require("../../../models/user");
const { otpVerification } = require("../../../models/otpVerification");
const { reqBody } = require("../../../utils/http");
const { verifyToken, generateToken, hashPassword, comparePassword } = require('../../../utils/http');
const { sendOtp } = require("../../../utils/otpMail");
const { Topic } = require("../../../models/topic");
const { Proposal } = require("../../../models/proposal");
const { Employee } = require("../../../models/employee");

function apiUserEndpoints(app) {
    if (!app) return;

    app.get('/profile', async (request, response) => {
        try {
            const token = request.headers['authorization']?.split(' ')[1];
            if (!token) {
                return response.status(401).json({ message: 'No token provided' });
            }
            // Verify token
            const decoded = verifyToken(token);
            if (!decoded) {
                return response.status(401).json({ message: 'Invalid token' });
            }

            const user = await User.get({
                id: decoded.userId
            });
        
            response.status(200).json({profile: user, error: null});
        } catch (e) {
            console.log('FAIL TO GET PROFILE', e.message);
            response.status(500).json(e.message);
        }
    });

    app.post('/login', async (request, response) => {
        try {
            const { email, password } = reqBody(request);
            const user = await User.get({email: email});
        
            if (!user) {
                return response.status(401).json({ message: 'Invalid credentials' });
            }
        
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return response.status(401).json({ message: 'Invalid credentials' });
            }
            const token = generateToken(user);
            response.json({ user, token });
        } catch (e) {
            console.log('FAIL TO LOGIN', e.message);
            response.status(500).json(e.message);
        }
    });
    
    app.post('/register', async (request, response) => {
        try {
            const { name, email, password } = reqBody(request);
            const hashedPassword = await hashPassword(password);
            const user = await User.create({
                name: name,
                email: email,
                password: hashedPassword
            });
            const token = generateToken(user);
        
            response.status(200).json({ user, token });
        } catch (e){
            console.log('FAIL TO REGISTER', e.message);
            response.status(500).json(e.message);
        }
    });

    app.post("/forget-pass", async(request, response) => {
        try {
            const { mail } = reqBody(request);
            if(!mail) { return response.status(400).json('Email is required')}

            const user = await User.get({
                email: mail
            });
            if(!user) {
                return response.status(404).json('No Email Registed');
            }
            const otp = await sendOtp(mail);
            const expirationTime = new Date();
            const data = {
                user_id: user.id,
                otp,
                expiredAt: expirationTime,
                isVerified: false
            }
            expirationTime.setMinutes(expirationTime.getMinutes() + 5);
            const checkExist = await otpVerification.get({user_id: user.id})
            
            if(checkExist){
                const user_id = user.id
                if(new Date() > checkExist.expiredAt){
                    await otpVerification.delete({
                        user_id: user.id
                    });
                }
                await otpVerification.update(user_id, data);
            } else {
                await otpVerification.create({
                    ...data 
                });
            }
            response.status(200).json({message: 'OTP was sended to your mail'});
        } catch (e){
            console.log('FAIL TO RESET PASS', e.message);
            response.status(500).json(e.message);
        }
    })
    app.post("/reset-pass", async(request, response) => {
        try {
            const { mail, otp, newPass } = reqBody(request);
            const user = await User.get({
                email: mail
            });
            const otpTimeAlive = await otpVerification.get({
                user_id: user.id,
                otp,
                isVerified: false
            })
            if(!otpTimeAlive){return response.status(400).json({message: 'OTP was not match'})};

            if(new Date() > otpTimeAlive.expiredAt){
                return response.status(400).json({message: 'OTP was Exipred'});
            }

            await otpVerification.update(
                otpTimeAlive.user_id,
                {
                    isVerified: true
                }

            )
            const hashedPassword = await hashPassword(newPass);

            await User.update(
                otpTimeAlive.user_id,
                {
                    password: hashedPassword
                }
            )
            response.status(200).json({message: 'Pass was Change Success'});
        } catch (e){
            console.log('FAIL TO RESET PASS', e.message);
            response.status(500).json(e.message);
        }
    })
    app.get('/chart_data', async(_, response) => {
        try {
            const topic = await Topic.groupBy()
            const proposal = await Proposal.groupBy()
            const employee = await Employee.groupBy()
    
            response.status(200).json({topic: topic, proposal: proposal, employee: employee})
        } catch (e) {
            console.log(e)
            response.status(500).json("error to get chart")
        }

    })
}
module.exports = { apiUserEndpoints };