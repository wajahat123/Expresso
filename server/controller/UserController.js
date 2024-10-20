// const User = require("../models/UserModel");
// const createUser = async (req, res) => {
//   try {
//     const { name, email, password, country, city, phone } = req.body;

//     if (!name || !email || !password || !country || !city || !phone) {
//       return res.status(500).send({
//         success: false,
//         messsage: "Please Provide All the Fields",
//       });
//     }

//     const existingUser = User.findOne({ email });

//     if (!existingUser) {
//       return res.status(500).send({
//         success: false,
//         messsage: "User Email ALready taken",
//       });
//     }

//     const User = await userModel.create({
//       name,
//       email,
//       password,
//       country,
//       city,
//       phone,
//     });

//     res.status(200).send({
//       success: true,
//       message: "User Created Successfully",
//       User,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "User Not Created",
//     });
//   }
// };

// module.exports = { createUser };
const User = require("../models/UserModel");

const createUser = async (req, res) => {
  try {
    const { name, email, password, country, city, phone } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !country || !city || !phone) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the fields",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User email already taken",
      });
    }

    // Create the new user
    const user = await User.create({
      name,
      email,
      password,
      country,
      city,
      phone,
    });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user, // Use lowercase "user" to avoid confusion with the model name
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "User not created",
    });
  }
};

// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if(!email || !password){
//         return res.status(500).send({
//             success:false,
//             message:"Provide email oR Password"
//         })

//         if(User.password == req.body.password) {

//         }

//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "User Login failed",
//     });
//   }
// };
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Add Email OR Password",
      });
    }
    // check user
    const user = await User.findOne({ email });
    //user valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "USer Not Found",
      });
    }
    //check pass
    const isMatch = await user.comparePassword(password);
    //valdiation pass
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credentials",
      });
    }
    //teken
    const token = user.generateToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error In Login Api",
      error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = User.findbyId(req.params.id);

    res.status(200).send({
      success: true,
      message: "data Successfully Fetched",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable to Fetch User",
    });
  }
};
const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Logout SUccessfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In LOgout API",
      error,
    });
  }
};
module.exports = { createUser, loginController, logoutController, getUser };
