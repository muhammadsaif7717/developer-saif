import { connectDb } from '@/lib/connectDb';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const db = await connectDb();
    const blogsCollection = db?.collection('blogs');

    if (!blogsCollection) {
      return NextResponse.json(
        { message: 'Failed to connect to the database' },
        { status: 500 },
      );
    }

    const blog = await req.json();

    // Basic validation
    const requiredFields = [
      'title',
      'slug',
      'content',
      'coverImage',
      'categories',
      'tags',
    ];
    for (const field of requiredFields) {
      if (
        !blog[field] ||
        (Array.isArray(blog[field]) && blog[field].length === 0)
      ) {
        return NextResponse.json(
          { message: `Field "${field}" is required` },
          { status: 400 },
        );
      }
    }

    const wordCount = blog.content.trim().split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const newBlog = {
      ...blog,
      readTime,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await blogsCollection.insertOne(newBlog);

    return NextResponse.json(
      { message: 'Blog created successfully', blogId: result.insertedId },
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
