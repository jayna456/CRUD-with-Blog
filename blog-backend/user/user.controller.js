const user = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req,res) => {
    try {
        console.log("signup ",req.body);
        
        let newUser = new user();
        newUser.email = req.body.email;
        newUser.username = req.body.username;
        newUser.password = bcrypt.hashSync(req.body.password,8);
        const storedData = await newUser.save();
        const tokenOj = {
            _id: storedData._id,
            email: storedData.email,
            password: storedData.password
        }
        const token = jwt.sign(tokenOj, process.env.SECRET, { expiresIn: '1h' });
        res.json({
            code: 200,
            status: 'success',
            data: storedData,
            authToken: token,                
        })
    } catch (error) {
        res.json({
            code: 500,
            status: 'error',
            message: error.toString()
        })
    }
}

const signIn = async (req,res) => {
    try {
        console.log("sign in ",req.body);
        
        const loggedInUser = await user.findOne({ email: req.body.email });
        if (loggedInUser) {
            if (bcrypt.compareSync(req.body.password, loggedInUser.password)) {
                const tokenOj = {
                    _id: loggedInUser._id,
                    email: loggedInUser.email,
                    password: loggedInUser.password
                }
                const token = jwt.sign(tokenOj, process.env.SECRET, { expiresIn: '1h' });
    
                res.json({
                    code: 200,
                    status: 'success',
                    data: loggedInUser,
                    authToken: token,                
                })
            } else {
                res.json({
                    code: 403,
                    status: 'error',
                    message: 'Password is not matched'
                })
            }
        } else {
            res.json({
                code: 403,
                status: 'error',
                message: 'No usesr found with this email. Please do sign up.'
            })
        }
    } catch (error) {
        res.json({
            code: 500,
            status: 'error',
            message: error.toString()
        })
    }
}

module.exports = { signIn, signUp };