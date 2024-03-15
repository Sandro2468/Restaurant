function errorHandlers(err, req, res, next) {
    console.log(err);
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        const errors = err.errors[0].message
        res.status(400).json(errors)
    } else if(err.name === 'InvalidToken' || err.name === 'JsonWebTokenError') {
        res.status(401).json({
            message: 'Invalid token'
        })
    } else if(err.name === "LoginFailed") {
        res.status(401).json({
            message: 'Invalid username/email'
        })
    } else if(err.name === 'ForbiddenAccess') {
        res.status(403).json({
            message: 'Forbidden error on authorization'
        })
    } else if(err.name === "AccountNotFound") {
        res.status(404).json({
            message: "Account not found!"
        })
    } else if(err.name === "InvalidPassword") {
        res.status(401).json({
            message: "Wrong Password!"
        })
    } else if(err.name === 'PaymentError') {
        res.status(402).json({
            message: "Payment is not enough!"
        })
    } else if(err.name === 'DataNotFound') {
        res.status(404).json({
            message: "Data not found!"
        })
    } else if(err.name === 'MenuNotFound') {
        res.status(404).json({
            message: "Menu not found!"
        })
    } else {
        console.log(err);
        res.status(500).json({
            message: 'Internal server error, try again later'
        })
    }

}

module.exports = errorHandlers