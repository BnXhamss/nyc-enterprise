import { adminModel } from "../models/adminmodels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  adminLoginValidator,
  adminRegisterValidator,
  updateAdminValidator,
} from "../Validators/adminvalidator.js";

//Register Admin
export const registerAdmin = async (req, res, next) => {
  try {
    const { error, value } = adminRegisterValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }

    const admin = await adminModel.findOne({
      $or: [{ username: value.username }, { email: value.email }],
    });
    if (admin) {
      return res
        .status(409)
        .json({ message: "Username or Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 10);
    await adminModel.create({
      ...value,
      password: hashedPassword,
    });

    // Add send registration email to user (optional)
    res.status(201).json("Admin created successfully");
  } catch (err) {
    // Log the error and send a 500 response
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// login Admin
export const adminLogin = async (req, res, next) => {
  try {
    console.log(req.body); // Debugging: Log the request body
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { error, value } = adminLoginValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }

    const admin = await adminModel.findOne({
      $or: [{ username: value.username }, { email: value.email }],
    });
    if (!admin) {
      return res.status(404).json({ message: "Admin does not exist" });
    }

    const correctPassword = bcrypt.compareSync(value.password, admin.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid Credential" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login Successfully, Welcome Back" ,  token  });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateAdmin = async (req, res) => {
  const {error, value} = updateAdminValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error)
  }

  const result = await adminModel.findByIdAndUpdate(req.params.id,value,{new:true})
   
  res.status(200).json(result)
}