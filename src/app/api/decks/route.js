// src/app/api/decks/route.js
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/mongodb";
import Decks from "@/app/models/Decks";
import mongoose from 'mongoose';

export async function GET(request) {
    try {
        // 1. Check authentication
        const session = await getServerSession(options);
        if (!session?.user) {
            return Response.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // 2. Connect to database
        await dbConnect();

        // 3. Convert the user ID to a valid ObjectId or handle string ID
        const userId = session.user.id;
        let query;

        try {
            // Try to create an ObjectId from the user.id
            if (mongoose.Types.ObjectId.isValid(userId)) {
                query = { user: new mongoose.Types.ObjectId(userId) };
            } else {
                // If it's not a valid ObjectId, use the string directly
                query = { user: userId };
            }
        } catch (error) {
            console.error('Error converting ID:', error);
            query = { user: userId };
        }

        // 4. Fetch user's decks with the appropriate query
        const userDecks = await Decks.find(query)
            .select('name cards createdAt')
            .sort({ createdAt: -1 });

        // 5. Return decks
        return Response.json(userDecks);

    } catch (error) {
        console.error('Error fetching decks:', error);
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}