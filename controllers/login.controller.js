const {Customer} = require("../models");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const Login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await Customer.findOne({ where: { email } });
        if (!user) {
            res.status(401).send('Email chưa được đăng ký');
        } else {
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (isPasswordValid) {
                const fullName = user.fullName;
                const avatar = user.avatar;
                const phoneNumber = user.phoneNumber;
                const email = user.email;
                const token = jwt.sign(
                    {fullName, email, phoneNumber},
                    'testToken',
                    {expiresIn: 60*60}
                );
                res.status(200).send({"message": "Đăng nhập thành công",token,fullName,avatar,phoneNumber,email});
            } else {
                res.status(403).send('Sai mật khẩu');
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    Login
}