import { connectDb } from '@/lib/connectDb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const db = await connectDb();
    const blogsCollection = db?.collection('blogs');

    if (!blogsCollection) {
      return NextResponse.json(
        { message: 'Failed to connect to the database' },
        { status: 500 },
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: 'Blog ID is required' },
        { status: 400 },
      );
    }

    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Get successfull', res: blog },
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
