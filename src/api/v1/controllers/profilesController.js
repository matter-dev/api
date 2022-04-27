const httpStatus = require("http-status");
const argon2 = require("argon2");
const db = require("../../../db");
const jsonwebtoken = require("jsonwebtoken");

exports.createProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const {
      user: { id: userId },
    } = req;

    const existingProfile = await db.profile.findFirst({
      where: {
        userId,
      },
    });

    if (existingProfile) {
      res.status(httpStatus.CONFLICT);
      throw new Error("Profile already exists");
    }

    const profile = await db.profile.create({
      data: {
        name,
        userId,
      },
    });

    return res.status(httpStatus.CREATED).json({
      ok: true,
      result: {
        profile,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      throw new Error("No user found");
    }

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      res.status(httpStatus.UNAUTHORIZED);
      throw new Error("Invalid email or password");
    }

    const token = jsonwebtoken.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10y",
    });

    return res.json({
      ok: true,
      result: {
        user,
        token,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAuthStatus = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.json({
        ok: false,
      });
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      return res.json({
        ok: false,
      });
    }

    try {
      const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);

      const { sub: userId } = payload;

      const user = await db.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        res.status(httpStatus.FORBIDDEN);
        throw new Error("Invalid token provided");
      }

      return res.json({
        ok: true,
        result: {
          user,
        },
      });
    } catch (err) {
      return res.json({
        ok: false,
      });
    }
  } catch (err) {
    return next(err);
  }
};
