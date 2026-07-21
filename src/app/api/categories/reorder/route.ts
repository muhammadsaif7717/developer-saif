import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { ObjectId } from 'mongodb';

export async function PUT(req: Request) {
  try {
    const db = await connectDb();
    const categoriesCollection = db.collection('skillCategories');
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
      categoriesCollection.updateOne(
        { _id: new ObjectId(item.id) },
        { $set: { order: item.order } },
      ),
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: 'Categories reordered successfully',
    });
  } catch (error) {
    console.error('Error reordering categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reorder categories' },
      { status: 500 },
    );
  }
}
