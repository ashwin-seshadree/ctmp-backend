const jwt = require("jsonwebtoken");
const { errorMessages, httpCodes } = require("../utils/messages");

module.exports = async (req, res, next) => {
  const exempted = await isExempted(req);
  if (exempted) return next();
  else {
    if (!req.headers["authorization"])
      return res.status(httpCodes.unAuthorized).send({
        message: errorMessages.noToken,
      });
    const token = req.headers["authorization"].split(" ")[1];
    if (!token)
      return res.status(httpCodes.unAuthorized).send({
        message: errorMessages.noToken,
      });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (ex) {
      res.status(httpCodes.unAuthorized).send({
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
