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

  const quotesCount = await prisma.quote.count();
  if (quotesCount === 0) {
    await prisma.quote.createMany({
      data: [
        { text: 'Ти робиш кожен мій день особливим ✨' },
        { text: 'Кохаю тебе понад усе на світі 💖' },
        { text: 'Ти мій найулюбленіший простір 🌸' },
        { text: 'Разом — назавжди ♥' },
        { text: 'Твоя посмішка — це моє улюблене сонце ☀️' },
        { text: 'Дякую, що ти у мене є 💫' },
        { text: 'Моє серце належить тільки тобі 💓' },
        { text: 'Ти — моє найкраще рішення в житті ✨' },
        { text: 'З тобою кожен день як маленьке свято 🎉' },
        { text: 'Ти робиш цей світ теплішим 🌸' },
        { text: 'Обіймаю тебе подумки прямо зараз 🤍' },
        { text: 'Ти — моє натхнення і мій спокій 🕊️' },
        { text: 'Кохаю тебе сильніше з кожним днем 💖' },
        { text: 'Твій сміх — це найкраща музика 🎶' },
        { text: 'Ти мій найзатишніший дім 🏡' },
        { text: 'Ніхто не вміє дарувати стільки тепла, як ти ✨' },
        { text: 'Ти — моє солоденьке щастя 🍬' },
        { text: 'Моя найулюбленіша дівчинка на землі 👑' },
        { text: 'Все, що мені потрібно — це ти поруч 💕' },
        { text: 'Ти перетворюєш звичайні дні у магію 🪄' },
        { text: 'Кожна хвилина з тобою — безцінна ⏳' },
        { text: 'Ти — мій найкрутіший подарунок долі 🎁' },
        { text: 'Завжди памʼятай, як сильно я тебе кохаю 💖' },
        { text: 'Ти світліша за будь-які зірки на небі 🌌' },
        { text: 'Твої очі — це моє улюблене диво 👁️✨' },
        { text: 'Я безмежно щасливий бути поруч з тобою 🤍' },
        { text: 'Ти додаєш барв у моє життя 🎨' },
        { text: 'Наше кохання — це найкраща історія 📖' },
        { text: 'Ти — мій маленький найцінніший промінчик ☀️' },
        { text: 'Думаю про тебе щохвилини 💭' },
        { text: 'Ти вмієш дарувати посмішку навіть у найважчий день 🌸' },
        { text: 'З тобою гармонія в усьому 🧘‍♂️✨' },
        { text: 'Ти — моє рідне серденько ♥' },
        { text: 'Ніжність у кожному твоєму погляді 🕊️' },
        { text: 'Я завжди поруч, що б не сталося 🤝💖' },
        { text: 'Ти робиш моє життя повноцінним 🌈' },
        { text: 'Моє кохання до тебе — нескінченне ∞' },
        { text: 'Ти — найвродливіша та наймиліша дівчина у світі 🌹' },
        { text: 'Поруч з тобою час зупиняється ⏰' },
        { text: 'Ти — моя головна причина посміхатися ☺️' },
        { text: 'Завжди чекаю нашої наступної зустрічі 🕊️' },
        { text: 'Ти вмієш зігрівати навіть у найхолодніший день ☕' },
        { text: 'З тобою так легко й затишно 🧸' },
        { text: 'Ти — моя мрія, яка здійснилася ✨' },
        { text: 'Твоя турбота — це щось неймовірне 💕' },
        { text: 'Я пишаюся тобою та твоїми успіхами 🌟' },
        { text: 'Ти — моє маленьке диво ✨' },
        { text: 'День стає кращим, коли я бачу тебе ☀️' },
        { text: 'Ти — мій компас і мій орієнтир 🧭' },
      ],
    });
    console.log('💬 Initial quotes seeded!');
  }

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
