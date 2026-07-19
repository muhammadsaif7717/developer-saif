import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/connectDb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const db = await connectDb();
    const categoriesCollection = db.collection('skillCategories');
    const skills = await categoriesCollection.find({}).toArray();
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const db = await connectDb();
    const categoriesCollection = db.collection('skillCategories');
    const body = await req.json();

    // Check if category exists
    const categoryTitle = body.category; // e.g., "Front-end Architecture"
    const existingCategory = await categoriesCollection.findOne({
      title: categoryTitle,
    });

    const newSkill = {
      label: body.label,
      name: body.name,
    };

    if (existingCategory) {
      // Add to existing category
      await categoriesCollection.updateOne(
        { title: categoryTitle },
        { $push: { skills: newSkill } as any },
      );
    } else {
      // Create new category with default icon and accent color
      const newCategory = {
        title: categoryTitle,
        icon: 'Layers', // default icon
        accentHex: '#0082c4', // default theme color
        skills: [newSkill],
      };
      await categoriesCollection.insertOne(newCategory);
    }

    return NextResponse.json({
      success: true,
      message: 'Skill added successfully',
    });
  } catch (error) {
    console.error('Error adding skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add skill' },
      { status: 500 },
    );
  }
}

// PUT and DELETE would need a bit more logic since skills are nested in categories in the current structure

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryTitle = searchParams.get('category');
    const skillName = searchParams.get('name');

    if (!categoryTitle || !skillName) {
      return NextResponse.json(
        { success: false, error: 'Missing category or skill name' },
        { status: 400 },
      );
    }

    const db = await connectDb();
    const categoriesCollection = db.collection('skillCategories');

    await categoriesCollection.updateOne(
      { title: categoryTitle },
      { $pull: { skills: { name: skillName } } as any },
    );

    return NextResponse.json({
      success: true,
      message: 'Skill deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete skill' },
      { status: 500 },
    );
  }
}
