import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { registerUser } from "../services/auth.service.js";
import { loginUser } from "../services/auth.service.js";
import {
  AUTH_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../../shared/constants/auth_message.js";
import { HTTP_STATUS } from "../../../shared/statusCodes.js";

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  return res
    .status(HTTP_STATUS.CREATED)
    .json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        user,
        SUCCESS_MESSAGES.REGISTRATION_SUCCESS
      )
    );
});

const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body);
  return res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(HTTP_STATUS.OK, data, SUCCESS_MESSAGES.LOGIN_SUCCESS)
    );
});

export { register, login };
