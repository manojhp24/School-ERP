import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { registerUser } from "../service/auth.service.js";
import { loginUser } from "../service/auth.service.js";

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfull"));
});

const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body);
  return res.status(200).json(new ApiResponse(200, data, "Login successful"));
});

export { register, login };
