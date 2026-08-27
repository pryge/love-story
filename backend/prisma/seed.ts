import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// to change something: change in code and run *npx prisma db seed*
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
