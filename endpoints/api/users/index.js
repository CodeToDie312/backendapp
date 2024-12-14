const { User } = require("../../../models/user");
const { otpVerification } = require("../../../models/otpVerification");
const { reqBody } = require("../../../utils/http");
const { verifyToken, generateToken, hashPassword, comparePassword } = require('../../../utils/http');
const { sendOtp } = require("../../../utils/otpMail");
const prisma = require("../../../utils/prisma");

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
            response.status(500).message(e.message);
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
            response.status(500).message(e.message);
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
            response.status(500).message(e.message);
        }
    });

    app.post("/forget-pass", async(request, response) => {
        try {
            const { mail } = reqBody(request);
            if(!mail) { return response.status(400).message('Email is required')}

            const user = await User.get({
                mail
            });
            if(!user) {
                return response.status(404).message('No Email Registed');
            }
            const otp = await sendOtp(mail);
            const expirationTime = new Date();
            expirationTime.setMinutes(expirationTime.getMinutes() + 5);
            await otpVerification.create({
                data: {
                    userId: user.id,
                    otp,
                    expiredAt: expirationTime,
                    isVerified: false
                }
            });
            response.status(200).json({message: 'OTP was sended to your mail'});
        } catch (e){
            console.log('FAIL TO RESET PASS', e.message);
            response.status(500).message(e.message);
        }
    })
    app.post("/reset-pass", async(request, response) => {
        try {
            const { mail, otp, newPass } = reqBody(request);
            
            const otpTimeAlive = await otpVerification.get({
                user: {mail},
                otp,
                isVerified: false
            })
            if(!otpTimeAlive){return response.status(400).json({message: 'OTP was not match'})};

            if(new Date() > otpTimeAlive.expiredAt){
                return response.status(400).json({message: 'OTP was Exipred'});
            }

            await otpVerification.update({
                user_id: otpTimeAlive.user_id,
                data : {
                    isVerified: true
                }

            })
            const hashedPassword = await hashPassword(newPass);

            await User.update({
                id: otpTimeAlive.id,
                data: {
                    password: hashedPassword
                }
            })
            response.status(200).json({message: 'Pass was Change Success'});
        } catch (e){
            console.log('FAIL TO RESET PASS', e.message);
            response.status(500).message(e.message);
        }
    })
}
module.exports = { apiUserEndpoints };