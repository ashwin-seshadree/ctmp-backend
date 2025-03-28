const {
  newPassword,
  hashPassword,
  verifyPassword,
  signJwt,
} = require("../utils/generators");
const authModel = require("../models/auth.model");
const { httpCodes, success, errorMessages } = require("../utils/messages");
const mailTemplates = require("../utils/mail-templates");
const mailService = require("../services/mail.service");

module.exports = {
  register: async (req, res) => {
    const { first_name, last_name, user_name, email } = req.body;

    const password = newPassword();

    const userData = {
      first_name,
      last_name,
      user_name,
      email,
      hashedPassword: await hashPassword(password),
      password: password,
      user_type: 2,
    };

    try {
      await authModel["create-user"](userData);
      let mailTemplate = mailTemplates["user-created"](userData);
      await mailService({
        to: email,
        subject: "Registration Successful | CTMP",
        html: mailTemplate,
      });
      return res
        .status(httpCodes.created)
        .send({ message: success.userCreated });
    } catch (e) {
      return res
        .status(httpCodes.internalServerError)
        .send({ message: errorMessages.internalServerError });
    }
  },

  login: async (req, res) => {
    const { user_name, password } = req.body;

    try {
      const userData = await authModel["get-user-details"]({ user_name });

      if (userData.length === 0) {
        return res
          .status(httpCodes.badRequest)
          .send({ message: errorMessages.noAccountFound });
      }

      const user = userData[0];

      const passwordMatch = await verifyPassword(user.password, password);

      if (!passwordMatch) {
        return res
          .status(httpCodes.badRequest)
          .send({ message: errorMessages.invalidCredentials });
      }

      const token = await signJwt({
        user: {
          user_id: user.user_id,
          email: user.email,
          user_role: user.user_role,
        },
      });
      const refreshToken = await signJwt(
        {
          user: {
            user_id: user.user_id,
            email: user.email,
            user_role: user.user_role,
          },
        },
        "refresh"
      );

      return res.status(httpCodes.success).send({
        token,
        refreshToken,
        user_type: user.user_role,
        message: success.loginSuccess,
      });
    } catch (e) {
      console.log(e);
      return res
        .status(httpCodes.internalServerError)
        .send({ message: errorMessages.internalServerError });
    }
  },

  refreshToken: async (req, res) => {
    const { refresh_token } = req.body;

    try {
      const { user } = req;

      const token = await signJwt({
        user: {
          user_id: user.user_id,
          email: user.email,
          user_role: user.user_role,
        },
      });
      const refreshToken = await signJwt(
        {
          user: {
            user_id: user.user_id,
            email: user.email,
            user_role: user.user_role,
          },
        },
        "refresh"
      );

      return res.status(httpCodes.success).send({
        token,
        refreshToken,
        user_type: user.user_role,
        message: success.refreshTokenSuccessful,
      });
    } catch (e) {
      console.log(e);
      return res
        .status(httpCodes.internalServerError)
        .send({ message: errorMessages.internalServerError });
    }
  },
};
