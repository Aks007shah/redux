const AuthController = require("../models/Auth");
const bcrypt = require("bcrypt");

class ABC {
  register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
      const checkUser = await AuthController.findOne({ email });

      if (checkUser) {
        res.status(400).json({ message: "User Already Exists" });
      } else {
        const saltRound = 10;
        const hashpassword = await bcrypt.hash(password, saltRound);

        const newUse = new AuthController({
          name,
          email,
          password: hashpassword,
        });

        await newUse.save();
        res.status(201).json({ message: "User Created Successfully" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", Error: error.message });
    }
  };

  async Login(req, res) {
    const { name, email, password } = req.body;

    if ((!email && !name) || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email or name, and password" });
    }

    try {
      const checkUser = await AuthController.findOne({
        $or: [{ name }, { email }],
      });

      if (!checkUser) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        checkUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      res.status(200).json({ message: "Login Successful", user: checkUser });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
}

const obj = new ABC();
module.exports = obj;
