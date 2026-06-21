const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Order = require("../models/Order");

// REGISTER USER

router.post(
  "/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message:
            "Email already exists",
        });
      }

      const user =
        await User.create({
          name,
          email,
          password,
        });

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

// LOGIN USER

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (
        !user ||
        user.password !==
          password
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid Email or Password",
        });
      }

      res.json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

// GET ALL USERS

router.get(
  "/",
  async (req, res) => {
    try {

      const users =
        await User.find();

      const usersWithOrders =
        await Promise.all(
          users.map(
            async (user) => {

              const orderCount =
                await Order.countDocuments({
                  "customer.name":
                    user.name,
                });

              return {
                ...user._doc,
                orders:
                  orderCount,
              };
            }
          )
        );

      res.json(
        usersWithOrders
      );

    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  }
);

module.exports = router;