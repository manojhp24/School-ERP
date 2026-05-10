import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { userResponseDto } from "../dto/user.dto.js";
import {
  findUserByEmail,
  createUser,
} from "../repositories/auth.repository.js";

const registerUser = async (data) => {
  const { name, email, password, role } = data;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists", [
      "Email already registered",
    ]);
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

  const user = await findUserByEmail({ email });

  if (!user) {
    throw new ApiError(401, "Invalid credential", ["Email not registerd!!"]);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Credentials", ["Password not correct"]);
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

  return { token };
};

export { registerUser, loginUser };
