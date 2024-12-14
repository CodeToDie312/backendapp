const nodemailer = require("nodemailer");

function generateOtp(length = 4){
    let otp= '';
    const characters = '0123456789';
    for(let i = 0; i < length; i++){
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
}

async function sendOtp(email) {
    const otp = generateOtp();

    const transporter = nodemailer.createTransport({
        service: 'email',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    })

    const mailOption = {
        from : 'your-email@gmail.com',
        to: email,
        subject : 'OTP Verified Forget Password',
        text : `Your OTP : ${otp}`
    }
    try {
        await transporter.sendMail(mailOption);
        return otp;
    } catch (e) {
        console.log('Error send mail :', e);
        throw new Error('Can Not Sent Otp to Mail');
    }
}
module.exports = {
    sendOtp
}
