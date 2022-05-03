const axios = require("axios");
const httpStatus = require("http-status");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const response = await axios.post(`${baseUrl}/api/v1/users`, {
      email,
      password,
    });

    const profileResponse = await axios.post(
      `${baseUrl}/api/v1/profiles`,
      {
        name,
      },
      {
        headers: {
          authorization: `Bearer ${response.data.result.token}`,
        },
      }
    );

    return res.status(httpStatus.CREATED).json({
      ok: true,
      result: {
        ...response.data.result,
        profile: profileResponse.data.result.profile,
      },
    });
  } catch (err) {
    return next(err);
  }
};
