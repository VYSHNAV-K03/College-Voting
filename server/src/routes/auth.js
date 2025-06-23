const express = require("express");
const USER = require("../modelschemas/userschema");
const router = express.Router();
const bcrypt = require("bcrypt");
const fs = require("fs");
const cookieParser = require("cookie-parser"); //this is used for getting req.cookies in middleware otherwise we dont get cookies in req in middleware
const Authenticate = require("../middleware/authenticate");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure file upload

const wbm = require("wbm");
const { emitWarning } = require("process");
const jwt = require("jsonwebtoken");

router.use(cookieParser());

router.post("/uploadstudinfo", (req, res) => {
  const name = req.body.name;
});

router.post("/signup", upload.single("profile"), async (req, res) => {
  

  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password ) {
      res.send("pls fill the field properly");
    }

    const userExist = await USER.findOne({ email: email });

    if (userExist) {
      res.send({ status: 422, error: "Email is already present" });
    } else {
      const user = new USER({
        name,
        email,
        phone,
        password,
        Role:0,
        profile:req.file.path
      });

      const userRegister = await user.save();

      if (userRegister) {
        res.send({ status: 200,user:{email,password}, message: "user registered successfully" });
      } else {
        res.send({ status: 422, error: "Failed to Registered" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});


// Student Signup Route
router.post(
  "/signup_user",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "voterId", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, email, phone, password, college, branch, year } = req.body;

      if (!name || !email || !phone || !password || !college || !branch || !year) {
        return res.status(400).json({ error: "Please fill all fields properly." });
      }

      const userExist = await USER.findOne({ email });

      if (userExist) {
        return res.status(422).json({ error: "Email is already present" });
      }


      const user = new USER({
        name,
        email,
        phone,
        password,
        Role: 1,
        institution_name:college,
        branch,
        year,
        profile: req.files.profile ? req.files.profile[0].path : null,
        voterId: req.files.voterId ? req.files.voterId[0].path : null,
      });

      await user.save();
      res.status(200).json({ message: "Student registered successfully" });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);


router.post("/signup_client", upload.single("profile"), async (req, res) => {
  

 console.log("file",req.file.path);


 try {
  const { name, email, phone, password, cpassword } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    res.send("pls fill the field properly");
  }

  const userExist = await USER.findOne({ email: email });

  if (userExist) {
    res.send({ status: 422, error: "Email is already present" });
  } else if (password === cpassword) {
    const user = new USER({
      name,
      email,
      phone,
      password,
      cpassword,
      Role:1,
      profile:req.file.path
    });

    const userRegister = await user.save();

    if (userRegister) {
      res.send({ status: 200, message: "user registered successfully" });
    } else {
      res.send({ status: 422, error: "Failed to Registered" });
    }
  } else {
    res.send({ status: 422, error: "password must be equal" });
  }
} catch (error) {
  console.log(error);
}

 
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
};

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).send("pls fill properly");
    } else {
      const userExist = await USER.findOne({ email: req.body.email });
      if (userExist) {
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
          res.status(404).send("check password");
        } else {
          // const token = await generateToken(userExist._id);
          const token = await userExist.generateAuthToken();
          // res.cookie("jwt", token);

          res.status(201).json({ token: token, Role:userExist.Role,user: userExist});
        }
      } else {
        res.status(404).send("Invalid Credentials");
        //hacker dont know the problem is email or password
      }
    }
  } catch (e) {
    res.send("error");
    console.log("error", e);
  }
});

// {
//   // sameSite: "strict",
//   secure: true,
//   expires: new Date(Date.now() + 300000),
//   httpOnly: true,
// }

router.get("/signout", Authenticate, (req, res) => {
  res.clearCookie("jwt", { path: "/" }); //path : cookie path
  res.status(200).send("User logout");
});



//for getting data for frontend
router.post("/getData", Authenticate, async (req, res) => {
  try {
    // wbm
    //   .start()
    //   .then(async () => {
    //     const phones = ["9048920962"];
    //     const message = "Good Morning.";
    //     await wbm.send(phones, message);
    //     await wbm.end();
    //   })
    //   .catch((err) => console.log(err));

    res.status(200).send(req.rootUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/getstudent_notification", Authenticate, async (req, res) => {
  try {
    const id = req.body.id;
    const user = await USER.findOne({ _id: id });
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("user not found");
  }
});

module.exports = router;
