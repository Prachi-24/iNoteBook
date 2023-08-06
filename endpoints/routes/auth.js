const express = require("express");
const User = require("../models/User");
const router = express.Router();
router.use(express.json());
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const jwt_token = 'this is a authlogin'

// Route :1 Create a user using POST "/api/auth", doesn't require authentication

router.post('/createauth', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res.status(200).json( success,'Please Login with correct password')
    };
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hashSync(req.body.password, salt);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    const data = {
      user: {
        id: user.id
      }
    }
    var authToken = jwt.sign(data, jwt_token);
    success = true;
    res.status(200).json({success, authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//Route:2 Create a login for auth using POST "/api/auth", doesn't require authentication

router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  let success = false
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // const { email, password } = req.body; this throwing error
  
  const body = req.body;
  try {
    let user = await User.findOne({ email: body.email })
   
    if (!user) {
      return res.status(404).json({success, error: "User doesn't exists" });
    }

    const passCompare = await bcrypt.compare(body.password, user.password)
    if (!passCompare) {
      return res.status(401).json({success, error: "Invalid email or password" });
    }

    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, jwt_token);
    success=true;
    res.status(200).json({success, authToken });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// /Roues:3 get user detail
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    var userId = req.user.id;
    const user = await User.findById(userId).select("-Password")
    res.send(user)
  } catch (err) {
    console.log(err)
    res.status(400).send("internal server error")
  }
})

module.exports = router;