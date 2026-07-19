import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';

export async function PUT(req: Request) {
  try {
    const db = await connectDb();
    const categoriesCollection = db.collection('skillCategories');
    const { category, skills } = await req.json();

    if (!category || !skills || !Array.isArray(skills)) {
      return NextResponse.json(
        { success: false, error: 'Invalid data provided' },
        { status: 400 },
      );
    }

    // Overwrite the entire skills array for this category with the new reordered array
    await categoriesCollection.updateOne(
      { title: category },
      { $set: { skills: skills } },
    );

    return NextResponse.json({
      success: true,
      message: 'Skills reordered successfully',
    });
  } catch (error) {
    console.error('Error reordering skills:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reorder skills' },
      { status: 500 },
    );
  }
}
