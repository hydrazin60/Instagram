// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized",
//         success: false,
//       });
//     }
//     const decode = await jwt.verify(token, process.env.JWT_SECRETKEY);
//     if (!decode) {
//       return res.status(401).json({
//         message: "incorrect token",
//         success: false,
//       });
//     }
//     req.id = decode.userid;
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    // Attach user ID to request object
    req.userId = decoded.id;
    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      message: "Unauthorized: Invalid token",
      success: false,
    });
  }
};

export default isAuthenticated;
