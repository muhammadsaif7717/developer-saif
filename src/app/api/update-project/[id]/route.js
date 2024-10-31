import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export const PATCH = async (request, { params }) => {
    const db = await connectDB();
    const projectsCollection = db?.collection('projects');

    const updatedData = await request.json();


    try {
        const res = await projectsCollection?.updateOne(
            { _id: new ObjectId(params.id) },
            { $set: { ...updatedData } },
            { upsert: true }
        );

        if (res?.matchedCount === 0) {
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Updated successfully', res: res }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
    }
};
