import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash('OlehAndKatiaForewer', 10);
  const kittyPin = await bcrypt.hash('1501', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@lovestory.app' },
    update: {},
    create: {
      email: 'admin@lovestory.app',
      name: 'Admin',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const kitty = await prisma.user.upsert({
    where: { email: 'kitty@lovestory.app' },
    update: {},
    create: {
      email: 'kitty@lovestory.app',
      name: 'My Love',
      password: kittyPin,
      role: Role.KITTY,
    },
  });

  const datesCount = await prisma.importantDate.count();
  if (datesCount === 0) {
    await prisma.importantDate.createMany({
      data: [
        {
          title: 'Наша річниця',
          monthDay: '10-14',
          isFavorite: true,
          category: 'Річниця',
        },
        {
          title: 'День народження Каті',
          monthDay: '03-08',
          isFavorite: true,
          category: 'День народження',
        },
        {
          title: 'День першого побачення',
          monthDay: '01-15',
          isFavorite: false,
          category: 'Памʼятна дата',
        },
        {
          title: 'День народження Олега',
          monthDay: '07-22',
          isFavorite: false,
          category: 'День народження',
        },
      ],
    });
    console.log('🗓️ Initial important dates seeded!');
  }

  // NOTE: Quote seeding removed — quotes are now added by users through the UI.
  // Existing quotes in the database are NOT affected by this change.
  // If you need to clear existing seeded quotes, do it via the admin panel or a manual script.

  const sinsCount = await prisma.sin.count();
  if (sinsCount === 0) {
    await prisma.sin.createMany({
      data: [
        {
          title: 'Забув купити смачненьке до чаю 🍪',
          severity: 'Маленький грішок 🐣',
          isForgiven: false,
        },
        {
          title: 'Запізнився на 10 хвилин ⏰',
          severity: 'Середня провина 🙈',
          isForgiven: false,
        },
        {
          title: 'Не поцілував зранку перед виходом 💋',
          severity: 'Загладити провину смачненьким 🍰',
          isForgiven: false,
        },
      ],
    });
    console.log('📜 Initial sins seeded!');
  }

  console.log('✅ Seed completed successfully!');
  console.log(`👤 Admin created: ${admin.email}`);
  console.log(`💖 Kitty created: ${kitty.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
