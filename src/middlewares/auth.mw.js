const jwt = require("jsonwebtoken");
const { errorMessages, errorCodes } = require("../utils/messages");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  const exempted = await isExempted(req);
  if (exempted) return next();
  else {
    if (!token)
      return res.status(errorCodes.unAuthorized).send({
        message: errorMessages.noToken,
      });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(errorCodes.unAuthorized).send({
        message: errorMessages.invalidToken,
      });
    }
  }
};

const isExempted = (req) => {
  return new Promise((resolve) => {
    const exemptedPaths = ["/api/auth/login", "/api/auth/register"];
    if (exemptedPaths.includes(req.path)) resolve(true);
    else resolve(false);
  });
};
