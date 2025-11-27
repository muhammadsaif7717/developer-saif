import { connectDb } from '@/lib/connectDb';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const db = await connectDb();
  const projectsCollection = db?.collection('projects');

  if (!projectsCollection) {
    throw new Error('Failed to connect to the database');
  }

  try {
    const projects = await projectsCollection.find().toArray();
    return NextResponse.json(
      { message: 'Get successfull', res: projects },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Something went worng ${err}` },
      { status: 500 },
    );
  }
};
