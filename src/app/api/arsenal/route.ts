import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const db = await connectDb();
    const arsenalCollection = db.collection('arsenal');
    // Sort by 'order' ascending, defaulting to insertion order if 'order' is missing
    const arsenalData = await arsenalCollection
      .find({})
      .sort({ order: 1, _id: 1 })
      .toArray();
    return NextResponse.json({ success: true, data: arsenalData });
  } catch (error) {
    console.error('Error fetching arsenal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch arsenal' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const db = await connectDb();
    const arsenalCollection = db.collection('arsenal');
    const body = await req.json();

    // Find the highest existing order
    const maxOrderDoc = await arsenalCollection
      .find({})
      .sort({ order: -1 })
      .limit(1)
      .toArray();
    const nextOrder =
      maxOrderDoc.length > 0 && maxOrderDoc[0].order !== undefined
        ? maxOrderDoc[0].order + 1
        : 0;

    const newArsenalItem = {
      name: body.name,
      image: body.image,
      order: nextOrder,
    };

    const result = await arsenalCollection.insertOne(newArsenalItem);
    return NextResponse.json({
      success: true,
      message: 'Arsenal item added successfully',
      data: { ...newArsenalItem, _id: result.insertedId },
    });
  } catch (error) {
    console.error('Error adding arsenal item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add arsenal item' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing ID' },
        { status: 400 },
      );
    }

    const db = await connectDb();
    const arsenalCollection = db.collection('arsenal');

    await arsenalCollection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({
      success: true,
      message: 'Arsenal item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting arsenal item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete arsenal item' },
      { status: 500 },
    );
  }
}
