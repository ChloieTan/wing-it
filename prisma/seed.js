import prisma from '../lib/prisma.js';

const users = [
  {
    username: 'karen',
    password: 'password',
  },
  {
    username: 'dave',
    password: 'password',
  },
];

const avatars = [];

const userAvatars = [];

export const interests = [
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

const guilds = [
  {
    title: 'Tennis Geeks',
    author: 'Tony Stark',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    profilePic: 'https://example.com/knights.png',
    tags: 'tennis, swe, data sci',
  },
  {
    title: 'Anime Geeks',
    author: 'Weeb Forever',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    profilePic: 'https://example.com/mages.png',
    tags: 'anime, gaming, japan, ai',
  },
  {
    title: 'Kdrama Geeks',
    author: 'Obi Wan',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    profilePic: 'https://example.com/shadows.png',
    tags: 'street food, korea, data sci',
  },
  {
    title: 'League Geeks',
    author: 'Black Widow',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    profilePic: 'https://example.com/shadows.png',
    tags: 'league, mobile legends, swe',
  },
  {
    title: 'Japan Geeks',
    author: 'Oishi Low',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    profilePic: 'https://example.com/shadows.png',
    tags: 'japan, travelling, swe',
  },
];

const guildMembers = [
  { guildId: 1, userId: 1, leader: true },
  { guildId: 2, userId: 1, leader: true },
  { guildId: 2, userId: 2, leader: true },
];

const guildEvents = [
  { guildId: 1, title: 'Tennis Party', date: new Date('2025-03-10') },
  { guildId: 1, title: 'Competition', date: new Date('2025-03-20') },
  { guildId: 2, title: 'Anime Watching Session', date: new Date('2025-02-20') },
];

const competitions = [
  {
    title: 'Global Hackathon 2025',
    description:
      "Looking for a team to join for the Global Hackathon! It's a 48-hour coding marathon where we’ll be building innovative solutions to real-world problems. I’m hoping to team up with people skilled in JavaScript, React, and Node.js. Let’s come together and make something awesome! Anyone interested?",
    url: 'https://globalhackathon2025.com',
    skills: 'JavaScript, React, Node.js, Express',
    creator: 1,
    capacity: 5,
    date: new Date('2025-04-10T08:00:00Z'),
  },
  {
    title: 'AI Challenge',
    description:
      "I’m looking for collaborators to join me in the AI Challenge. It's a competition that’s all about building AI solutions using machine learning. If you’re good with Python, TensorFlow, or PyTorch, let’s team up and create something cool. The competition is going to be intense, but that’s what makes it fun!",
    url: 'https://aichallenge.com',
    skills: 'Python, TensorFlow, PyTorch, Data Science',
    creator: 2,
    capacity: 4,
    date: new Date('2025-05-15T09:00:00Z'),
  },
  {
    title: 'Web Dev Bootcamp Hackathon',
    description:
      'Seeking a web dev team for a 24-hour hackathon at the Web Dev Bootcamp! If you’re passionate about creating dynamic websites and full-stack applications, we should team up. Let’s tackle some challenges and push our web development skills to the limit. Who’s in for some fast-paced fun?',
    url: 'https://webdevbootcamp.com',
    skills: 'HTML, CSS, JavaScript, Node.js, MongoDB',
    creator: 2,
    capacity: 5,
    date: new Date('2025-06-20T10:00:00Z'),
  },
  {
    title: 'Mobile App Development Contest',
    description:
      "Looking for mobile app developers to join me for the Mobile App Development Contest! Whether you're into React Native or Flutter, we can create something amazing together. Let’s work on an app that stands out with great user experience and performance. Anyone interested in teaming up?",
    url: 'https://mobileappcontest.com',
    skills: 'React Native, Flutter, Java, Kotlin, Android, iOS',
    creator: 2,
    capacity: 5,
    date: new Date('2025-07-01T07:00:00Z'),
  },
  {
    title: 'Cybersecurity Capture The Flag',
    description:
      "Who’s up for the Cybersecurity CTF? I’m looking for a team to tackle some hacking challenges, cryptography puzzles, and ethical hacking tasks. If you're familiar with penetration testing, Linux, or Python, we’ll make a great team. Let's capture those flags and show off our skills!",
    url: 'https://cyberctf.com',
    skills: 'Ethical Hacking, Cryptography, Penetration Testing, Linux, Python',
    creator: 2,
    capacity: 5,
    date: new Date('2025-08-05T08:00:00Z'),
  },
];

const main = async () => {
  await prisma.user.createMany({ data: users });

  await prisma.avatar.createMany({ data: avatars });
  await prisma.userAvatar.createMany({ data: userAvatars });

  await prisma.interest.createMany({ data: interests });
  await prisma.userInterest.createMany({ data: userInterests });

  await prisma.guild.createMany({ data: guilds });
  await prisma.guildMember.createMany({ data: guildMembers });
  await prisma.guildEvent.createMany({ data: guildEvents });

  await prisma.competition.createMany({ data: competitions });
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
