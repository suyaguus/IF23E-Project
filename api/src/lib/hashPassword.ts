// api/src/scripts/hash-existing-passwords.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashExistingPasswords() {
    try {
        // Ambil semua user
        const users = await prisma.tb_user.findMany();

        for (const user of users) {
            // Cek apakah password sudah di-hash (bcrypt hash selalu dimulai dengan $2)
            if (!user.password.startsWith('$2')) {
                console.log(`Hashing password for user: ${user.email}`);

                const hashedPassword = await bcrypt.hash(user.password, 10);

                await prisma.tb_user.update({
                    where: { id: user.id },
                    data: { password: hashedPassword }
                });

                console.log(`✓ Password hashed for: ${user.email}`);
            } else {
                console.log(`✓ Password already hashed for: ${user.email}`);
            }
        }

        console.log('\n✅ All passwords hashed successfully!');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

hashExistingPasswords();