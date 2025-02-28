const veriAdmin = (req, res, next) => {
    try {
      // Check if the user role is 'admin'
      if (req.user?.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to perform this action",
        });
      }
      next(); // Allow the request to proceed
    } catch (error) {
      console.error("Error in veriAdmin middleware:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while verifying admin privileges",
      });
    }
  };
  
  module.exports = veriAdmin;
  