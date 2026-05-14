import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AUTH_MESSAGES } from "../../../shared/constants/auth_message.js";
import { ApiError } from "../../../utils/ApiError.js";
import { userResponseDto } from "../dto/user.dto.js";
import {
  findUserByEmail,
  createUser,
} from "../repositories/auth.repository.js";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../validations/auth.validation.js";
import { HTTP_STATUS } from "../../../shared/statusCodes.js";
import { ERROR_CODES } from "../../../shared/constants/errorCodes.js";

const registerUser = async (data) => {
  const { name, email, password, role } = data;
  const { error } = registerValidationSchema.validate(data);
  const existingUser = await findUserByEmail(email);

  if (error) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      AUTH_MESSAGES.VALIDATION_ERROR,
      error.details.map((detail) => detail.message),
      ERROR_CODES.INVALID_INPUT
    );
  }

  if (existingUser) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      AUTH_MESSAGES.USER_ALREADY_EXISTS,
      [],
      ERROR_CODES.USER_ALREADY_EXISTS
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return userResponseDto(user);
};

const loginUser = async (data) => {
  const { email, password } = data;
  const { error } = loginValidationSchema.validate(data);

  if (error) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      AUTH_MESSAGES.VALIDATION_ERROR,
      error.details.map((detail) => detail.message),
      ERROR_CODES.INVALID_INPUT
    );
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      AUTH_MESSAGES.INVALID_CREDENTIALS,
      [],
      ERROR_CODES.INVALID_CREDENTIALS
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      AUTH_MESSAGES.INVALID_CREDENTIALS,
      [],
      ERROR_CODES.INVALID_CREDENTIALS
    );
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    tokenType: "bearer",
    user: userResponseDto(user),
  };
};

export { registerUser, loginUser };
