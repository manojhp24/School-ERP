import jwt from "jsonwebtoken";

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AUTH_MESSAGES } from "../shared/constants/auth_message.js";
import { HTTP_STATUS } from "../shared/statusCodes.js";
import { ERROR_CODES } from "../shared/constants/errorCodes.js";

const authMiddleWare = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      AUTH_MESSAGES.UNAUTHORIZED_ACCESS,
      [],
      ERROR_CODES.UNAUTHORIZED_ACCESS
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
  } catch (error) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      AUTH_MESSAGES.TOKEN_INVALID,
      [],
      ERROR_CODES.TOKEN_EXPIRED
    );
  }

  next();
});
export { authMiddleWare };
