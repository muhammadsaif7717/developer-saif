import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { ObjectId } from 'mongodb';

export async function PUT(req: Request) {
  try {
    const db = await connectDb();
    const arsenalCollection = db.collection('arsenal');
    const { items } = await req.json();

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { success: false, error: 'Invalid data provided' },
        { status: 400 },
      );
    }

    // items is an array of { id: string, order: number }
    // Update each item in the database with its new order
    const updatePromises = items.map((item) =>
      arsenalCollection.updateOne(
        { _id: new ObjectId(item.id) },
        { $set: { order: item.order } },
      ),
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: 'Arsenal reordered successfully',
    });
  } catch (error) {
    console.error('Error reordering arsenal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reorder arsenal' },
      { status: 500 },
    );
  }
}
