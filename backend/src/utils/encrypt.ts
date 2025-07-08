import bcrypt from "bcrypt";

// Hash password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// Compare password
export const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

