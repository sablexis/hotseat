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

        // 3. Query for user's decks using the user ID as a string
        const userId = session.user.id;
        const query = { user: userId };

        // 4. Fetch user's decks
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