var express = require('express');
var router = express.Router();
const User = require("../models/registeration");
const bcrypt = require("bcrypt");


router.get("/", async function (req, res, next){
  let results=await User.find();
  res.json(results);
});
router.post("/", async function(req, res, next){
  let user= await User.findOne({
    email: req.body.email,
  });
  if(user){
    return res.status(400).json({
      msg: "User does Already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  let encryptedPassword= await bcrypt.hash(req.body.password, salt);
  var userOb = new User({
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    gender:req.body.gender,
    dob: req.body.dob,
    city: req.body.city,
    profession: req.body.profession,
    password: encryptedPassword,
    
  });

  console.log(userOb);
  const result = await userOb.save();
  res.json({status:1, data: result});
});


router.put('/:id', async function (req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      
      const result = await User.findByIdAndUpdate(id, updates, { new: true });
      res.json({ status: 1, data: result });
    } catch (error) {
      next(error);
    }
  });

router.patch('/:id', async function (req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      
      const result = await User.findByIdAndUpdate(id, updates, { new: true });
      res.json({ status: 1, data: result });
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id', async function (req, res, next) {
    try {
      const { id } = req.params;
  
      
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      
      await User.findByIdAndDelete(id);
      res.json({ status: 1, msg: 'User deleted' });
    } catch (error) {
      next(error);
    }
  });
      

module.exports = router;