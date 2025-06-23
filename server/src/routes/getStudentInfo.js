const express = require("express");
const { upload } = require("../helpers/filehelper");
const Authenticate = require("../middleware/authenticate");
const USER = require("../modelschemas/userschema");
const router = express.Router();
const fs = require("fs");
const wbm = require("wbm");
const jwt = require("jsonwebtoken"); 


router.post(
  "/upload_stud",
  upload.fields([
    {
      name: "sslc_certificate",
    },
    {
      name: "plustwo_certificate",
    },
  ]),
  Authenticate,
  async (req, res) => {
    // console.log(req.files);

    const final_path_sslc =
      req.files.sslc_certificate &&
      req.files.sslc_certificate[0] &&
      req.files.sslc_certificate[0].path;

    const base64_sslc =
      req.files.sslc_certificate &&
      req.files.sslc_certificate[0] &&
      fs.readFileSync(final_path_sslc, "base64");

    const buffer_sslc =
      req.files.sslc_certificate &&
      req.files.sslc_certificate[0] &&
      Buffer.from(base64_sslc, "base64");

    const final_path__plustwo =
      req.files.plustwo_certificate &&
      req.files.plustwo_certificate[0] &&
      req.files.plustwo_certificate[0].path;

    const base64_plustwo =
      req.files.plustwo_certificate &&
      req.files.plustwo_certificate[0] &&
      fs.readFileSync(final_path__plustwo, "base64");

    const buffer_plustwo =
      req.files.plustwo_certificate &&
      req.files.plustwo_certificate[0] &&
      Buffer.from(base64_plustwo, "base64");

    const {
     
      developer_status,
      dev_description,
      nodev_status,
      college_name,
      branch,
      year,
      
    } = req.body;


    var user_id = req.userID;
    const userUpdate = await USER.findByIdAndUpdate(user_id, {
          institution_name: college_name,
          branch: branch,
          year: year,
          nodev_desc: nodev_status,
          dev_desc: dev_description,
          dev_status: developer_status,        
      
    });
    res.send(userUpdate);
    console.log(req.body);
  }
);

const SECRET_KEY = process.env.SECRET_KEY; // Use your actual secret key

router.post("/get_stud", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from the request headers

    let filter = { Role: 0 }; // Default: fetch all students

    if (token && token!=="null") {
      console.log("Fetching students",token);
      
      // Decode the token to get user details
      const decoded = jwt.verify(token, SECRET_KEY);

      const rootUser = await USER.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (decoded) {
        filter.institution_name = rootUser.institution_name;
        filter.branch = rootUser.branch;
        filter.year = rootUser.year;
      }
    }
    console.log(filter);
    

    const students = await USER.find(filter); // Fetch students with the applied filter
    res.send(students);
  } catch (error) {
    console.error("Error fetching students", error);
    res.status(400).send({ error: "Error fetching student list" });
  }
});


router.post("/get_stud_admin_want", async (req, res) => {
  try {
    var id = req.body.id;
    const user = await USER.findById(id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/get_stud_profile", Authenticate, async (req, res) => {
  var id = req.userID;
  console.log(id);
  try {
    const user = await USER.findById(id);

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/get_filter_stud", Authenticate, async (req, res) => {
  const {
    python,
    c,
    cplus,
    js,
    sql,
    dev_tech,
    sslc_maths,
    sslc_phy,
    sslc_che,
    plustwo_phy,
    plustwo_che,
    plustwo_maths,
    year,
    cgpa,
    suppli,
    branch,
    english,
    hindi,
    malayalam,
    level_placement,
    response,
    compa_name,
    train,
  } = req.body;

  console.log("filtering_students", req.body);

  const user = await USER.find({
    $and: [
      python
        ? {
            "coding.languages": {
              $elemMatch: {
                language_name: "python",
              },
            },
          }
        : {
            Role: 0,
          },
      c
        ? {
            "coding.languages": {
              $elemMatch: { language_name: "c" },
            },
          }
        : {
            Role: 0,
          },
      js
        ? {
            "coding.languages": {
              $elemMatch: { language_name: "js" },
            },
          }
        : {
            Role: 0,
          },
      sql
        ? {
            "coding.languages": {
              $elemMatch: {
                language_name: "sql",
              },
            },
          }
        : {
            Role: 0,
          },
      cplus
        ? {
            "coding.languages": {
              $elemMatch: {
                language_name: "c++",
              },
            },
          }
        : {
            Role: 0,
          },
      dev_tech
        ? {
            coding: {
              $elemMatch: {
                dev_status: dev_tech,
              },
            },
          }
        : {
            Role: 0,
          },

      sslc_maths
        ? {
            "education.sslc": { $elemMatch: { maths: { $gte: sslc_maths } } },
          }
        : {
            Role: 0,
          },

      sslc_che
        ? {
            "education.sslc": { $elemMatch: { che: { $gte: sslc_che } } },
          }
        : {
            Role: 0,
          },
      sslc_phy
        ? {
            "education.sslc": {
              $elemMatch: { phy: { $gte: sslc_phy } },
            },
          }
        : {
            Role: 0,
          },
      plustwo_maths
        ? {
            "education.plustwo": {
              $elemMatch: { maths: { $gte: plustwo_maths } },
            },
          }
        : {
            Role: 0,
          },
      plustwo_che
        ? {
            "education.plustwo": { $elemMatch: { che: { $gte: plustwo_che } } },
          }
        : {
            Role: 0,
          },
      plustwo_phy
        ? {
            "education.plustwo": {
              $elemMatch: { phy: { $gte: plustwo_phy } },
            },
          }
        : {
            Role: 0,
          },
      year
        ? {
            education: {
              $elemMatch: { year: { $eq: year } },
            },
          }
        : {
            Role: 0,
          },
      cgpa
        ? {
            education: {
              $elemMatch: { cgpa: { $gte: cgpa } },
            },
          }
        : {
            Role: 0,
          },
      suppli
        ? {
            education: {
              $elemMatch: { back_papers: { $lte: suppli } },
            },
          }
        : {
            Role: 0,
          },
      branch
        ? {
            education: {
              $elemMatch: { branch: branch },
            },
          }
        : {
            Role: 0,
          },

      level_placement
        ? {
            placement: {
              $elemMatch: {
                company_name: req.rootUser.name,
                level_of_placement: level_placement,
              },
            },
          }
        : {
            Role: 0,
          },

      response && response !== ""
        ? {
            placement: {
              $elemMatch: {
                company_name: req.rootUser.name,
                response: response === "p" ? 0 : response === "a" ? 1 : 2,
              },
            },
          }
        : {
            Role: 0,
          },

      train && train !== ""
        ? {
            Train: train === "t" ? true : false,
          }
        : {
            Role: 0,
          },

      compa_name && compa_name !== ""
        ? {
            placement: {
              $elemMatch: {
                company_name: compa_name,
              },
            },
          }
        : {
            Role: 0,
          },
      english
        ? {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "english",
              },
            },
          }
        : {
            Role: 0,
          },
      hindi
        ? {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "hindi",
              },
            },
          }
        : {
            Role: 0,
          },
      malayalam
        ? {
            "coding.communication_languages": {
              $elemMatch: {
                language_name: "malayalam",
              },
            },
          }
        : {
            Role: 0,
          },
    ],
  });
  res.send(user);
});

router.post("/get_filter_stud_college_admin", async (req, res) => {
  console.log(req.body);

  const {
    filter_content,
    filter_interview,
    filter_interview_attended,
    filter_placement,
  } = req.body;

  const user = await USER.find({
    $or: [
      filter_content === "interview"
        ? {
            "college_admin.interview": {
              $elemMatch: filter_interview && {
                attended: filter_interview,
                selected:
                  filter_interview !== "Filter" && filter_interview_attended,
              },
            },
          }
        : {},
    ],
  });

  res.send(user);
});

module.exports = router;
