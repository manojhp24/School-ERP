import { ApiError } from "../utils/ApiError.js";
import { HTTP_STATUS } from "../shared/statusCodes.js";
import { AUTH_MESSAGES } from "../shared/constants/auth_message.js";
import { ERROR_CODES } from "../shared/constants/errorCodes.js";

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!roles.includes(userRole)) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        AUTH_MESSAGES.UNAUTHORIZED_ACCESS,
        [],
        ERROR_CODES.ACCESS_DENIED
      );
    }
    next();
  };
};

export { authorizedRoles };
