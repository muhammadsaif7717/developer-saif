import { connectDb } from '@/lib/connectDb';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(
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
    const projectsCollection = db.collection('projects');

    // Find project by ID
    const project = await projectsCollection.findOne({ _id: new ObjectId(id) });

    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Fetch successful', res: project },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Something went wrong: ${err}` },
      { status: 500 },
    );
  }
}
