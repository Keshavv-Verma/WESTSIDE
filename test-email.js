// Run this file to test if email sending is working
// Command: node test-email.js

require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const testEmail = async () => {
    try {
        console.log('Testing email configuration...');
        console.log('Email User:', process.env.EMAIL_USER);
        console.log('Email Pass: [HIDDEN]');
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself for testing
            subject: 'WestSide - Email Configuration Test',
            html: `
                <div style="text-align: center; padding: 20px;">
                    <h2>Email Configuration Test</h2>
                    <p>This is a test email from WestSide Store.</p>
                    <p>If you received this, your email configuration is working correctly!</p>
                    <p style="color: green; font-weight: bold;">✓ Email sending is functional</p>
                </div>
            `
        };

        console.log('\nAttempting to send test email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✓ Test email sent successfully!');
        console.log('Response:', info.response);
        process.exit(0);
    } catch (error) {
        console.error('✗ Email sending failed!');
        console.error('Error:', error.message);
        console.error('\nTroubleshooting:');
        console.error('1. Ensure EMAIL_USER and EMAIL_PASS are set in .env.local');
        console.error('2. If using Gmail, EMAIL_PASS must be a 16-character app-specific password');
        console.error('3. Generate app password at: https://myaccount.google.com/apppasswords');
        console.error('4. Check if Less Secure App Access is disabled (it should be for Gmail)');
        process.exit(1);
    }
};

testEmail();
