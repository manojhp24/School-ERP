import { ApiError } from "../utils/ApiError.js";

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!roles.includes(userRole)) {
      throw new ApiError(401, "Access Denied");
    }
    next();
  };
};

export { authorizedRoles };
