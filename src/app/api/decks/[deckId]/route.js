// src/app/api/decks/[deckId]/route.js
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/mongodb";
import Decks from "@/app/models/Decks";
import mongoose from 'mongoose';

export async function GET(request, { params }) {
    try {
        const session = await getServerSession(options);
        if (!session?.user) {
            return Response.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        await dbConnect();
        
        const { deckId } = params;
        
        // Validate deckId format
        if (!mongoose.Types.ObjectId.isValid(deckId)) {
            return Response.json(
                { error: "Invalid deck ID format" },
                { status: 400 }
            );
        }

        const deck = await Decks.findOne({
            _id: deckId,
            user: session.user.id
        });

        if (!deck) {
            return Response.json(
                { error: "Deck not found" },
                { status: 404 }
            );
        }

        return Response.json(deck);

    } catch (error) {
        console.error('Error fetching deck:', error);
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(options);
        if (!session?.user) {
            return Response.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        await dbConnect();
        
        const { deckId } = params;
        const body = await request.json();
        
        if (!mongoose.Types.ObjectId.isValid(deckId)) {
            return Response.json(
                { error: "Invalid deck ID format" },
                { status: 400 }
            );
        }

        const updatedDeck = await Decks.findOneAndUpdate(
            {
                _id: deckId,
                user: session.user.id
            },
            { $set: body },
            { new: true }
        );

        if (!updatedDeck) {
            return Response.json(
                { error: "Deck not found" },
                { status: 404 }
            );
        }

        return Response.json(updatedDeck);

    } catch (error) {
        console.error('Error updating deck:', error);
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(options);
        if (!session?.user) {
            return Response.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        await dbConnect();
        
        const { deckId } = params;
        
        if (!mongoose.Types.ObjectId.isValid(deckId)) {
            return Response.json(
                { error: "Invalid deck ID format" },
                { status: 400 }
            );
        }

        const deletedDeck = await Decks.findOneAndDelete({
            _id: deckId,
            user: session.user.id
        });

        if (!deletedDeck) {
            return Response.json(
                { error: "Deck not found" },
                { status: 404 }
            );
        }

        return Response.json({ message: "Deck deleted successfully" });

    } catch (error) {
        console.error('Error deleting deck:', error);
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
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
        
        // 3. Get request data
        const { deckId } = params;
        const body = await request.json();
        
        // 4. Validate deckId format
        if (!mongoose.Types.ObjectId.isValid(deckId)) {
            return Response.json(
                { error: "Invalid deck ID format" },
                { status: 400 }
            );
        }

        // 5. Update deck
        const updatedDeck = await Decks.findOneAndUpdate(
            {
                _id: deckId,
                user: session.user.id  // Ensure user owns this deck
            },
            { $set: body },  // Update with new data
            { new: true }    // Return updated document
        );

        // 6. Check if deck was found and updated
        if (!updatedDeck) {
            return Response.json(
                { error: "Deck not found" },
                { status: 404 }
            );
        }

        // 7. Return success
        return Response.json(updatedDeck);

    } catch (error) {
        console.error('Error updating deck:', error);
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}