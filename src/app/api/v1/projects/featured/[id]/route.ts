import { connectDb } from '@/lib/connectDb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const db = await connectDb();
  const collection = db?.collection('projects');

  if (!collection) {
    return NextResponse.json(
      { message: 'Database connection failed' },
      { status: 500 },
    );
  }

  const body = await req.json();
  const { featured } = body;

  if (featured) {
    // Set all projects to not featured
    await collection.updateMany({}, { $set: { featured: false } });

    // Set the specific project to featured
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { featured: true } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 },
      );
    }
  } else {
    // Unfeature the specific project
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { featured: false } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 },
      );
    }
  }

  return NextResponse.json(
    { message: 'Project featured successfully' },
    { status: 200 },
  );
}
