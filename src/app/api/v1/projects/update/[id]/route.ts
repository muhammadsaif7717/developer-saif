// app/api/projects/[id]/route.ts
import { connectDb } from '@/lib/connectDb';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: 'Invalid project ID' },
      { status: 400 },
    );
  }

  try {
    const db = await connectDb();
    const projectsCollection = db?.collection('projects');

    if (!projectsCollection) {
      return NextResponse.json(
        { message: 'Failed to connect to the database' },
        { status: 500 },
      );
    }

    const updatedData = await req.json();

    // Basic validation
    const requiredFields = [
      'slug',
      'title',
      'description',
      'image',
      'role',
      'technologies',
      'features',
    ];
    for (const field of requiredFields) {
      if (
        !updatedData[field] ||
        (Array.isArray(updatedData[field]) && updatedData[field].length === 0)
      ) {
        return NextResponse.json(
          { message: `Field "${field}" is required` },
          { status: 400 },
        );
      }
    }

    const result = await projectsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Project updated successfully' },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: `Something went wrong: ${err}` },
      { status: 500 },
    );
  }
}
