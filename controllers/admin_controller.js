const ADMIN = require("../models/adminModel");

exports.admin = {
    get: async (req, res) => {
        try {
            const admin = await ADMIN.find({});
            if (admin.length > 0) {
                return res.status(200).json({
                    isSuccess: true,
                    message: "All admin data",
                    data: admin
                });
            } else {
                return res.ststus(400).json({
                    message: "admin are not found !"
                });
            }
        } catch (error) {
            return res.json({ data: error, message: 'Request failed !' });
        }
    },
    add: async (req, res) => {
        try {
            let { title ,firstName, lastName,email,password, role } = req.body;
            console.log(req.body.email);
            if (!firstName || !email || !password) {
                return res.send({ isSuccess: false, message: "All fields are Required" })
            }
            const emaildata = await ADMIN.findOne({ email })
            if (emaildata) {
                return res.send({ message: "Email is Already Exist" })
            }
            const userObj ={
                title:title,
                firstName: firstName, 
                lastName:lastName,
                email: email,
                password: password,
                role: role,
            }
            const result = await ADMIN.create(userObj)
            return res.send({
                isSuccess: true,
                message: "User Created SuccessFully",
                data: result
            })

        } catch (error) {
            console.log(error);
            return res.send({ message: "Something went wrong " })
        }
    },
    login: async (req, res) => {
        try {
            if(!req.body || !req.body.email){
                res.status(400).send('Bad Request');
            }   
            let { email, password } = req.body;
            const user = await ADMIN.findOne({email});
            if (!email || !password) {
                return res.send({ isSuccess: false, message: "All fields are Required" })
            }
            if(!user){
                return res.send({message:"Invalid email or Password"})
            }else{
                res.send({
                    isSuccess: true,
                    message: "User Login SuccessFully",
                    data: user,
                })
            }
        } catch (error) {
            console.log(error);
            return res.send({ message: "Something went wrong " })
        }
    }

}

