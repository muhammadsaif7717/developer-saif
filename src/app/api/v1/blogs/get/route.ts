import { connectDb } from '@/lib/connectDb';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const db = await connectDb();
    const blogsCollection = db?.collection('blogs');

    if (!blogsCollection) {
      return NextResponse.json(
        { message: 'Failed to connect to the database' },
        { status: 500 },
      );
    }

    const blogs = await blogsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      { message: 'Get successfull', res: blogs },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: `Something went wrong: ${err}` },
      { status: 500 },
    );
  }
};
