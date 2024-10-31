import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";




export const DELETE = async (request, { params }) => {
    const db = await connectDB();
    const projectsCollection = db?.collection('projects')
    const { id } = await params;

    try {
        const res = await projectsCollection?.deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ message: 'Deleted successfully', res: res }, { status: 200 },);
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
    }
}