import { connectDB } from '@/lib/connectDB';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  const db = await connectDB();
  const projectsCollection = db?.collection('projects');

  try {
    const newProject = await request.json();
    const res = await projectsCollection?.insertOne(newProject);

    return NextResponse.json(
      { message: 'Posted successfully', res },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong', error },
      { status: 500 }
    );
  }
};
