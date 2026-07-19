import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';

// The data from Skills.tsx
const skillCategories = [
  {
    icon: 'Code2',
    title: 'Frontend Architecture',
    accentHex: '#0082c4',
    skills: [
      { label: 'Modern UI', name: 'React & Next.js' },
      { label: 'Type Safety', name: 'TypeScript' },
      { label: 'Styles', name: 'Tailwind CSS' },
      { label: 'Animation', name: 'Framer Motion' },
      { label: 'Components', name: 'shadcn/ui' },
    ],
  },
  {
    icon: 'Server',
    title: 'Backend Systems',
    accentHex: '#0099e6',
    skills: [
      { label: 'Runtime', name: 'Node.js' },
      { label: 'Framework', name: 'Express.js' },
      { label: 'API Design', name: 'REST APIs' },
      { label: 'Auth', name: 'Authentication' },
      { label: 'ODM', name: 'Mongoose' },
    ],
  },
  {
    icon: 'Database',
    title: 'Database & Storage',
    accentHex: '#0082c4',
    skills: [
      { label: 'NoSQL', name: 'MongoDB' },
      { label: 'Realtime', name: 'Firebase' },
      { label: 'Relational', name: 'SQL Basics' },
      { label: 'Modeling', name: 'Database Design' },
    ],
  },
  {
    icon: 'Wrench',
    title: 'Tools & Workflow',
    accentHex: '#0099e6',
    skills: [
      { label: 'Version Control', name: 'Git & GitHub' },
      { label: 'Editor', name: 'VS Code' },
      { label: 'Pkg Manager', name: 'npm & yarn' },
      { label: 'API Testing', name: 'Postman' },
      { label: 'Debugging', name: 'Chrome DevTools' },
    ],
  },
  {
    icon: 'Palette',
    title: 'UI/UX & Design',
    accentHex: '#0082c4',
    skills: [
      { label: 'Core', name: 'Responsive Design' },
      { label: 'Prototyping', name: 'Figma' },
      { label: 'Component Lib', name: 'Material-UI' },
      { label: 'Motion', name: 'Framer Motion' },
    ],
  },
  {
    icon: 'Cloud',
    title: 'Cloud & Deployment',
    accentHex: '#0099e6',
    skills: [
      { label: 'Hosting', name: 'Vercel' },
      { label: 'Hosting', name: 'Netlify' },
      { label: 'Firebase', name: 'Firebase Hosting' },
      { label: 'Database', name: 'MongoDB Atlas' },
    ],
  },
];

const skillsData = [
  { name: 'HTML', image: 'https://skillicons.dev/icons?i=html' },
  { name: 'CSS', image: 'https://skillicons.dev/icons?i=css' },
  { name: 'Next.js', image: 'https://skillicons.dev/icons?i=nextjs' },
  { name: 'React', image: 'https://skillicons.dev/icons?i=react' },
  { name: 'TypeScript', image: 'https://skillicons.dev/icons?i=ts' },
  { name: 'JavaScript', image: 'https://skillicons.dev/icons?i=js' },
  { name: 'Tailwind', image: 'https://skillicons.dev/icons?i=tailwind' },
  { name: 'Node.js', image: 'https://skillicons.dev/icons?i=nodejs' },
  { name: 'Express', image: 'https://skillicons.dev/icons?i=express' },
  { name: 'MongoDB', image: 'https://skillicons.dev/icons?i=mongodb' },
  { name: 'Firebase', image: 'https://skillicons.dev/icons?i=firebase' },
  { name: 'GitHub', image: 'https://skillicons.dev/icons?i=github' },
  { name: 'Git', image: 'https://skillicons.dev/icons?i=git' },
  { name: 'npm', image: 'https://skillicons.dev/icons?i=npm' },
  { name: 'Figma', image: 'https://skillicons.dev/icons?i=figma' },
  { name: 'VS Code', image: 'https://skillicons.dev/icons?i=vscode' },
];

export async function GET() {
  try {
    const db = await connectDb();

    // Seed Skill Categories
    const categoriesCollection = db.collection('skillCategories');
    await categoriesCollection.deleteMany({});
    await categoriesCollection.insertMany(skillCategories);

    // Seed Arsenal
    const arsenalCollection = db.collection('arsenal');
    await arsenalCollection.deleteMany({});
    await arsenalCollection.insertMany(skillsData);

    return NextResponse.json({ message: 'Seeding successful' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed' }, { status: 500 });
  }
}
