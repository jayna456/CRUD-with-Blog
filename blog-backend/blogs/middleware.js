const jwt = require('jsonwebtoken');
const user = require('../user/user.model');

const checkAuthentication = async (req,res,next) => {
    const token = req.headers.token;
    
    try {
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if (error) {
                next(error.toString());
            } else {
                req.user = decoded;
                next();                
            }
        })
    } catch (error) {
        next(error.toString());
    }
}

module.exports = {checkAuthentication}