const User = require('../models/User')

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();
    res.status(200).json({ message: 'User updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserDetails= async(req, res) =>{
   try{
    const userDeatil = await User.findById(req.user.id);
    res.status(200).json(userDeatil);

   }catch(error){
     res.status(500).json({ error: error.message });
   }
}
