const router = require("express").Router(); // Import router object
const { check, validationResult } = require("express-validator"); // Import validator to validate data
const bcrypt = require("bcryptjs"); // Import bcrypt library to help hash password
const fetchuser = require("../middleware/fetchuser"); // Import middleware for fetchuser 
const jwt = require("jsonwebtoken"); // Import jsonwebtoken 
const { connection1} = require("../Config/sqldb");

//  Api to create New User
router.post(
  "/createuser",
  [
    check("name", "Enter Valid name").isLength({ min: 3 }),
    check("email").isEmail(),
    check("password", "Password must be atleast 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // const salt = await bcrypt.genSalt(10);
      // const newPass = await bcrypt.hash(req.body.password, salt);
      connection1.query(
        "INSERT INTO erp_user values (?,?,?,?) ",
        [user.name, user.email, user.password, user.isSuperAdmin],
        function (error, results, fields) {
          if (error) {
            if (error.code == "ER_DUP_ENTRY") {
              connection1.query(
                "DELETE FROM erp_user where user_email = ?",
                user.email
              );
              connection1.query("INSERT INTO erp_user values (?,?,?,?) ", [
                user.name,
                user.email,
                user.password,
                user.isSuperAdmin,
              ],(error, results, fields)=>{
                success = true;
                res.json({ success});
              });
            } else {
              res.json({
                success: false,
                message: error,
              });
            }
          }
          // {
          //     const data = {
          //         user: {
          //             id: user.id
          //         }
          //     }
          //     success = true;
          //     const authtoken = jwt.sign(data,process.env.jwt_secret);
          //     res.json({ success, authtoken });
          // }
        }
      );
    } catch (error) {
      success = false;
      console.log(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

//   User Login Api
router.post(
  "/login",
  [
    check("email").isEmail(),
    check("password", "Password must be atleast 5 char"),
  ],
  async (req, res) => {
    let { email, password, isSuperAdmin } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors });
    }
    try {
      connection1.query(
        "select * from erp_user where user_email= ? ",
        [email],
        function (error, results, fields) {
          //  const passwordCompare = await bcrypt.compare(password, user.password);
      

          if (results[0].user_password == password) {
            res.json({
              user: results,
              success: true,
              message: "Login successful..",
            });
          }else{
            res.json({
              
              success: false,
              message: "wrong email or password",
            })
          }
          if (error) {
            res.json({
              success: false,
              message: error,
            });
          }
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

// let data = {
//     user: {
//         id: user.id,
//     },
// };
// let authtoken = jwt.sign(data,process.env.jwt_secret);
// success = true;
// isSuperAdmin = user.isSuperAdmin ;
// console.log(isSuperAdmin);
// res.json({ success, authtoken ,isSuperAdmin});

//Router 3: Get Loggedin User detail
// router.post("/getuser", fetchuser, async (req, res) => {
//     try {
//         userid = req.user.id;
//         const user = await User.findById(userid).select("-password");
//         res.send(user);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal server error occured");
//     }
// });
module.exports = router;
