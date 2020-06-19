const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {signToken} = require("../helpers/auth")

module.exports = {
  Signup: async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists)
      return res.status(403).json({ message: "email already exists" });

		
    const Users = new User(req.body);
    try {
			const savedUser = await Users.save();
			const token = signToken(savedUser)
      res.status(200).json({message:"sign up successfull %%%",Token:token});
    } catch (error) {
      res.status(400).json({ success: false });
    }
	},
	Login: async (req,res) =>{
		const username = req.body.username
		const password = req.body.password

		try {
			const user = await User.findOne({username: username})

			const result = await bcrypt.compareSync(password,user.password)
			if(result === true){
				const token = signToken(result)
				res.status(200).json({message:"successfully logged in >>>",Token:token})
			} else {
				res.status(403).json({message:"wrong password try again"})
			}
		} catch (error) {
			res.status(400).json({message:"failed to login please create an account"})
		}
	}
};
