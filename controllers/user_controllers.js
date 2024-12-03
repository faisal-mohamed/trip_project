const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/index");

const regUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Please fill all the fields" });
    }

    const userExists = await User.findOne({ where: { email } });

    console.log(userExists);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ status: "success", message: "User created successfully", user });
  } catch (error) {}
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    //console.log("user: ", user);
    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "User does not exist" });
    }

    const comparePass = await bcrypt.compare(password, user.password);

    //console.log("comparePass: ", comparePass);

    if (!comparePass) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid credentials" });
    }
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //console.log("token: ", token);

    res
      .status(200)
      .json({
        status: "success",
        message: "User logged in successfully",
        token,
      });
  } catch (error) {
    console.log("error: ", error);
    res.json({
      status: "error",
      message: error.message | error,
    });
  }
};

module.exports = {
  regUser,
  loginUser,
};
