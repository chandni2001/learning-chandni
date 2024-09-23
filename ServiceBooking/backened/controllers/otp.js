const crypto = require('crypto');
const twilio = require('twilio');
const jwt = require('jsonwebtoken'); 
const OtpLogin = require('../models/OtpLogin'); 
const User = require('../models/User'); 
const { twilio: twilioConfig, jwtSecret } = require('../config'); 
const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);


async function generateAndCreateOtp(req, res) {
    const { phoneNumber } = req.body;
    try {
        
        await OtpLogin.updateMany(
            {
                phoneNumber,
                isUsed: false,
                expiresAt: { $gte: new Date() },
            },
            { isUsed: true }
        );

       
        const otpCode = crypto.randomInt(100000, 999999).toString();
        console.log(`Generated OTP: ${otpCode}`);

        
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);

        
        const otpRecord = await OtpLogin.create({
            phoneNumber,
            otpCode,
            isUsed: false,
            expiresAt,
        });

        
        const message = await client.messages.create({
            body: `Your OTP is ${otpCode}. It is valid for 5 minutes.`,
            from: twilioConfig.phoneNumber,
            to: phoneNumber,
        });

        console.log(`Message SID: ${message.sid}`);
        res.json(otpRecord);
    } catch (error) {
        console.error('Error generating or sending OTP:', error);
        res.status(500).json({ message: 'Error generating or sending OTP' });
    }
}


async function validateOtp(req, res) {
    const { phoneNumber, otpCode } = req.body;
    try {
        
        const otpRecord = await OtpLogin.findOne({
            phoneNumber,
            otpCode,
            isUsed: false,
            expiresAt: { $gte: new Date() },
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
        }

        
        otpRecord.isUsed = true;
        await otpRecord.save();

        const username = phoneNumber;
        const email = `${phoneNumber.slice(1)}@gmail.com`;

        
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (!existingUser) {
            existingUser = await User.create({
                username,
                email,
                password: phoneNumber, 
                role: 'user', 
            });
        }

        
        const jwtToken = jwt.sign({ id: existingUser._id }, jwtSecret, { expiresIn: '1h' });

        
        res.json({
            isValid: true,
            message: 'OTP validated successfully, user created or exists',
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
        });
    } catch (error) {
        console.error('Error validating OTP:', error);
        res.status(500).json({ message: 'Failed to validate OTP', error });
    }
}

module.exports = {
    generateAndCreateOtp,
    validateOtp,
};