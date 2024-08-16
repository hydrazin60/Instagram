import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
export default isAuthenticated;
