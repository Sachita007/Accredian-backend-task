const catchAsync = require('./../Utills/catchAsync');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const AppError = require('./../Utills/appError');

const prisma = new PrismaClient();

exports.createRefer = catchAsync(async (req, res, next) => {
    console.log("Creating Refer")
    const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

    // Validate the input data
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
        return next(new AppError('All fields are required', 400));
    }

    // Save the referral data to the database
    const referral = await prisma.referral.create({
        data: {
            referrerName,
            referrerEmail,
            refereeName,
            refereeEmail,
        },
    });

    // Send referral email
    // await sendReferralEmail(referrerEmail, refereeEmail);

    res.status(201).json(referral);
});

exports.getAllRefer = catchAsync(async (req, res, next) => {
    // Fetch all referrals from the database
    const referrals = await prisma.referral.findMany();

    res.status(200).json({
        status: 'success',
        data: referrals,
    });
});

exports.getReferById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    // Fetch the referral by ID from the database
    const referral = await prisma.referral.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    // If referral with the given ID is not found
    if (!referral) {
        return next(new AppError('Referral not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: referral,
    });
});

async function sendReferralEmail(referrerEmail, refereeEmail) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: refereeEmail,
        subject: 'Course Referral',
        text: `You have been referred to a course by ${referrerEmail}. Check it out!`,
    };

    await transporter.sendMail(mailOptions);
}
