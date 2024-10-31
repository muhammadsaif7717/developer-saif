import { MongoClient, ServerApiVersion } from "mongodb";

export const connectDB = async () => {
    let db;
    if (db) {
        return db
    }

    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

    try {
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        const db = client.db('developerSaifDB');
        console.log("Connected to MongoDB successfully");
        return db;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }

}