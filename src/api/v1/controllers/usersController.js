const httpStatus = require("http-status");
const argon2 = require("argon2");
const db = require("../../../db");
const jsonwebtoken = require("jsonwebtoken");

exports.findUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    return res.json({
      ok: !!user,
    });
  } catch (err) {
    return next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      res.status(httpStatus.CONFLICT);
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await argon2.hash(password, { saltLength: 12 });

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = jsonwebtoken.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10y",
    });

    return res.status(httpStatus.CREATED).json({
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

      const profile = await db.profile.findFirst({
        where: {
          userId: user.id,
        },
      });

      return res.json({
        ok: true,
        result: {
          user,
          profile,
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

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(httpStatus.FORBIDDEN);
      throw new Error("No token provided");
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      res.status(httpStatus.FORBIDDEN);
      throw new Error("Invalid token provided");
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

      req.user = user;

      return next();
    } catch (err) {
      return res.json({
        ok: false,
      });
    }
  } catch (err) {
    return next(err);
  }
};
