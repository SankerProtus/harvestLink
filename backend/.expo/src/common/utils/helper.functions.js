import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const generateToken = (userId, secret, expiresIn) => {
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
