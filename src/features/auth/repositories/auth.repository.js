import { User } from "../models/user.model.js";

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (data) => {
  return await User.create(data);
};

export { findUserByEmail, createUser };
