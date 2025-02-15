import prisma from '../lib/prisma.js';

const users = [
  {
    username: 'karen',
    password: 'password',
  },
];

const avatars = [];

const userAvatars = [];

const interests = [
  { name: 'Artificial Intelligence' },
  { name: 'Cybersecurity' },
  { name: 'Data Science' },
  { name: 'Machine Learning' },
  { name: 'Quantum Computing' },
  { name: 'Blockchain & Cryptography' },
  { name: 'Game Development' },
  { name: 'Virtual Reality (VR)' },
  { name: 'Augmented Reality (AR)' },
  { name: 'Web Development' },
  { name: 'Mobile App Development' },
  { name: 'Ethical Hacking' },
  { name: 'Cloud Computing' },
  { name: 'DevOps & Automation' },
  { name: 'Penetration Testing' },
  { name: 'Electronics & DIY Hardware' },
  { name: '3D Printing' },
  { name: 'Robotics' },
  { name: 'Arduino & Raspberry Pi' },
  { name: 'Open Source Contribution' },
  { name: 'Competitive Programming' },
  { name: 'Embedded Systems' },
  { name: 'Anime & Manga' },
  { name: 'Sci-Fi & Fantasy' },
  { name: 'Board Games & Tabletop RPGs' },
  { name: 'Dungeons & Dragons' },
  { name: 'Esports & Competitive Gaming' },
  { name: 'Retro Gaming' },
  { name: 'Indie Games' },
  { name: 'Comics & Graphic Novels' },
  { name: 'Cosplay' },
  { name: 'Film & TV Fandoms' },
  { name: 'Harry Potter' },
  { name: 'Star Wars' },
  { name: 'Star Trek' },
  { name: 'Marvel & DC' },
  { name: 'Doctor Who' },
  { name: 'Lord of the Rings' },
  { name: 'Mythology & Folklore' },
  { name: 'Space Exploration' },
  { name: 'Astrophysics' },
  { name: 'Mathematics & Puzzles' },
  { name: 'Philosophy' },
  { name: 'Cryptography' },
  { name: 'Biotechnology' },
  { name: 'Metaverse & Digital Worlds' },
  { name: 'VR Chat & Online Communities' },
  { name: 'Artificial Life & Simulations' },
  { name: 'Horror & Gothic Culture' },
  { name: 'Steampunk & Cyberpunk' },
];

const userInterests = [
  { userId: 1, interestId: 1 },
  { userId: 1, interestId: 2 },
  { userId: 1, interestId: 10 },
  { userId: 1, interestId: 20 },
  { userId: 1, interestId: 30 },
];

const main = async () => {
  await prisma.user.createMany({ data: users });

  await prisma.avatar.createMany({ data: avatars });
  await prisma.userAvatar.createMany({ data: userAvatars });

  await prisma.interest.createMany({ data: interests });
  await prisma.userInterest.createMany({ data: userInterests });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
