import { connectDb } from '@/lib/connectDb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export const PUT = async (
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

    const updateData = await req.json();

    // Prevent updating _id
    delete updateData._id;

    if (updateData.content) {
      const wordCount = updateData.content.trim().split(/\s+/).length;
      updateData.readTime = Math.max(1, Math.ceil(wordCount / 200));
    }

    updateData.updatedAt = new Date();

    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Blog updated successfully' },
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
