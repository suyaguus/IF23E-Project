// src/lib/sanitize.ts

export const sanitizeUser = <T extends Record<string, unknown>>(user: T) => {
    // Kita memberitahu TypeScript bahwa 'user' MUNGKIN punya password
    // tapi kita ingin memisahkannya dari sisa data
    const { password: _, ...sanitized } = user as T & { password?: string };

    return sanitized;
};