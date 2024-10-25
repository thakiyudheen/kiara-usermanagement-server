import bcrypt from 'bcrypt';


export const comparePassword = async (password: string, hashedPassword: any): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing password');
  }
};
