const { PrismaClient, Prisma } = require(`@prisma/client`);
const { ResponseTemplate } = require("../../helper/template.helper");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const register = async (req, res, next) => {
  let { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json(ResponseTemplate(null, "Bad Request", "Incomplete data", false));
  }
  try {
    let user = await prisma.users.findUnique({
      where: { email },
    });
    if (user) {
      return res
        .status(400)
        .json(
          ResponseTemplate(null, "Bad Request", "email sudah digunakan!", false)
        );
    }
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, "Internal Server Error", error, false));
  }
  const saltRounds = 10;
  const saltKey = process.env.SALT_KEY;

  try {
    const hashedPassword = await bcrypt.hash(
      saltKey + password + saltKey,
      saltRounds
    );
    let user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(201).json(ResponseTemplate(null, "Created", null, true));
  } catch (error) {
    return res
      .status(500)
      .json(ResponseTemplate(null, "Internal Server Error", error, false));
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(400)
        .json(
          ResponseTemplate(
            null,
            "Bad Request",
            "Invalid email or password!",
            false
          )
        );
    }
    const saltKey = process.env.SALT_KEY;

    let isPasswordCorrect = await bcrypt.compare(
      saltKey + password + saltKey,
      user.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json(
          ResponseTemplate(
            null,
            "Bad Request",
            "Invalid email or password!",
            false
          )
        );
    }

    // create token

    let selectedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const tokenExpiration = 24 * 60 * 60;
    let token = jwt.sign(selectedUser, process.env.JWT_SECRET_KEY, {
      expiresIn: tokenExpiration,
      algorithm: "HS256",
    });
    return res
      .status(201)
      .json(ResponseTemplate({ selectedUser, token }, "Created", null, true));
  } catch (error) {
    next(error);
  }
};
function Whoami(req, res) {
    let respons = ResponseFormatter({ user: req.user }, 'success', null, 200)
    res.status(200).json(respons)
    return
}
module.exports = {
  register,
  login,
  Whoami
};