const User = require('../models/').User;

const registerUser = async (req,res) => {
    const {fullname,username,email,password} = req.body;
    try{
        if (fullname == "" || fullname == undefined ||
        username == "" || username == undefined || email == ""
        || email == undefined || password == ""
        || password == undefined) {
            res.status(202).send({ error: "Please fill al fields" });
        }
        const checkUser = await User.findOne({ where: {email: req.body.email} });
        if(!checkUser){
            const user = await User.create({
                fullname,
                username,
                email,
                password
            });
            delete findUser.password
            res.status(200).send({ success: "user register successfully", data: user});
        }else {
            res.status(203).send({ error: "email already exist" });
        }
    }catch(err){
        console.log(err);
    }
}
const loginUser = async (req,res) => {
    const { email, password } = req.body;
    try {
        if (email == "" || email == undefined ||
            password == "" || password == undefined) {
            res.status(202).send({ error: "Please fill al fields" });
        }
        const findUser = await User.findOne({ where: {email: req.body.email, password: req.body.password} });
        delete findUser.password
        if (findUser) {
            res.status(200).send({ success: "user login successfully", data: findUser });
        }
        else {
            res.status(203).send({ error: "wrong credentials" });
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    registerUser,
    loginUser,
}