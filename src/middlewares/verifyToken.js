const { responseReturn } = require("../utils/response");
const jwt = require("jsonwebtoken");
module.exports.verifyToken = (req, res, next) => {
  const accessToken =
    req.cookies.accessToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!accessToken) {
    return res.status(401).json({ message: "You are not authenticated" });
  } else {
    try {
      const decodeAccessToken = jwt.verify(
        accessToken,
        process.env.SECRET_ACCESS_TOKEN
      );
      req.accessToken = { value: accessToken, exp: decodeAccessToken.exp };
      req.id = decodeAccessToken.id;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        responseReturn(res, 401, {
          message: "Access token expired",
          code: "AccessTokenExpired",
        });
      } else if (error instanceof jwt.JsonWebTokenError) {
        responseReturn(res, 401, {
          message: "Invalid access token",
          code: "InvalidAccessToken",
        });
      } else {
        responseReturn(res, 500, { message: error.message });
      }
    }
  }
};
