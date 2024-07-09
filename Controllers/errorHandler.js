// errorMiddleware.js
const AppError = require('./../Utills/appError')

// Error handling middleware for Express
function errorHandler(err, req, res, next) {
    let error = { ...err };

    error.message = err.message;

    // Handle MySQL errors
    if (err.code && err.errno) {
        error = handleMySQLError(error);
    }

    // Handle Prisma errors
    if (err.code && err.meta && err.meta.target) {
        error = handlePrismaError(error);
    }

    // Send appropriate JSON response
    res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message || 'Internal Server Error',
    });
}

// Handle specific MySQL errors
function handleMySQLError(err) {
    const message = 'MySQL Error: Something went wrong.';
    return new AppError(message, 500);
}

// Handle specific Prisma errors
function handlePrismaError(err) {
    const message = 'Prisma Error: Something went wrong with the database.';
    return new AppError(message, 500);
}

module.exports = errorHandler;
