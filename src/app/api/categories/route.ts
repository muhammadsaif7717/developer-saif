import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const db = await connectDb();
    const categoriesCollection = db.collection('skillCategories');
    const body = await req.json();

    const { title, icon, accentHex } = body;

    if (!title || !icon || !accentHex) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const existingCategory = await categoriesCollection.findOne({ title });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, error: 'Category already exists' },
        { status: 400 },
      );
    }

    const newCategory = {
      title,
      icon,
      accentHex,
      skills: [],
    };

    const result = await categoriesCollection.insertOne(newCategory);
    return NextResponse.json({
      success: true,
      message: 'Category added successfully',
      data: { ...newCategory, _id: result.insertedId },
    });
  } catch (error) {
    console.error('Error adding category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add category' },
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
    const categoriesCollection = db.collection('skillCategories');

    await categoriesCollection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const db = await connectDb();
    const categoriesCollection = db.collection('skillCategories');
    const body = await req.json();

    const { id, isHidden } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing category ID' },
        { status: 400 },
      );
    }

    const result = await categoriesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isHidden } },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Category visibility updated',
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update category visibility' },
      { status: 500 },
    );
  }
}
