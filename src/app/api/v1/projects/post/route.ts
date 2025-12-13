import { connectDb } from '@/lib/connectDb';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const db = await connectDb();
    const projectsCollection = db?.collection('projects');

    if (!projectsCollection) {
      return NextResponse.json(
        { message: 'Failed to connect to the database' },
        { status: 500 },
      );
    }

    const project = await req.json();

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
        !project[field] ||
        (Array.isArray(project[field]) && project[field].length === 0)
      ) {
        return NextResponse.json(
          { message: `Field "${field}" is required` },
          { status: 400 },
        );
      }
    }

    const result = await projectsCollection.insertOne(project);

    return NextResponse.json(
      { message: 'Project created successfully', projectId: result.insertedId },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: `Something went wrong: ${err}` },
      { status: 500 },
    );
  }
};
