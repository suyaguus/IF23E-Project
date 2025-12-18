import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// 1. Definisikan tipe dasar untuk field yang ingin dihapus
interface SensitiveFields {
    password?: string;
}