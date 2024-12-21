// src/app/api/decks/create/route.js
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/mongodb";
import Decks from "@/app/models/Decks";

export async function POST(request) {
    try {
        // 1. Check authentication
        const session = await getServerSession(options);
        if (!session?.user) {
            return Response.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }

        // 2. Connect to database
        await dbConnect();
        
        // 3. Parse request body
        const body = await request.json();
        const { title, cards } = body;

        // 4. Validate input
        if (!title || !title.trim()) {
            return Response.json(
                { message: "Deck title is required" },
                { status: 400 }
            );
        }

        if (!Array.isArray(cards) || cards.length === 0) {
            return Response.json(
                { message: "Deck must contain at least one card" },
                { status: 400 }
            );
        }

        // 5. Create the deck
        const newDeck = await Decks.create({
            user: session.user.id,
            name: title.trim(),
            cards: cards.map(card => card.trim()).filter(card => card) // Remove empty strings
        });

        // 6. Return success response
        return Response.json({
            message: "Deck created successfully",
            deck: newDeck
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating deck:', error);
        return Response.json(
            { message: "Error creating deck", error: error.message },
            { status: 500 }
        );
    }
}