import { connectDb } from '@/lib/connectDb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const db = await connectDb();
  const result = await db
    ?.collection('projects')
    ?.deleteOne({ _id: new ObjectId(id) });

  if (result?.deletedCount === 0) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(
    { message: 'Project deleted successfully' },
    { status: 200 },
  );
}
