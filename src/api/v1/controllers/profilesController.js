const httpStatus = require("http-status");
const db = require("../../../db");

exports.createProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const {
      profile: { userId },
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
