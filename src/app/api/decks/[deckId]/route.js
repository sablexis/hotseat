// src/app/api/decks/[deckId]/route.js
import { getServerSession } from "next-auth";
import { options as authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/mongodb";
import Decks from "@/app/models/Decks";
import mongoose from 'mongoose';

export async function GET(request, { params }) {
    // Validate request authentication if needed
    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    await dbConnect();
    
    // Destructure deckId from params
    const deckId = params.deckId;
    
    // Additional safety check
    if (!deckId) {
        return Response.json(
            { error: "Deck ID is required" },
            { status: 400 }
        );
    }
    
    // Validate deckId format
    if (!mongoose.Types.ObjectId.isValid(deckId)) {
        return Response.json(
            { error: "Invalid deck ID format" },
            { status: 400 }
        );
    }

    try {
        const deck = await Decks.findOne({
            _id: deckId,
            user: session.user.id
        });

        if (!deck) {
            return Response.json(
                { error: "Deck not found or you do not have permission to access" },
                { status: 404 }
            );
        }

        return Response.json(deck);

    } catch (error) {
        console.error('Error fetching deck:', error);
        return Response.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        // 1. Get session and check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // 2. Parse request body
        const body = await request.json();

        // 3. Validate deckId
        const deckId = params.deckId;
        
        // Additional safety check
        if (!deckId) {
            return Response.json(
                { error: "Deck ID is required" },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(deckId)) {
            return Response.json(
                { error: "Invalid deck ID format" },
                { status: 400 }
            );
        }

        // 4. Validate request body
        if (!body || Object.keys(body).length === 0) {
            return Response.json(
                { error: "No update data provided" },
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
                { error: "Deck not found or you do not have permission to update" },
                { status: 404 }
            );
        }

        // 7. Return success
        return Response.json(updatedDeck);

    } catch (error) {
        console.error('Error updating deck:', error);
        return Response.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Validate deckId
        const deckId = params.deckId;
        
        // Additional safety check
        if (!deckId) {
            return Response.json(
                { error: "Deck ID is required" },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(deckId)) {
            return Response.json(
                { error: "Invalid deck ID format" },
                { status: 400 }
            );
        }

        // Delete the deck
        const deletedDeck = await Decks.findOneAndDelete({
            _id: deckId,
            user: session.user.id
        });

        // Check if deck was found and deleted
        if (!deletedDeck) {
            return Response.json(
                { error: "Deck not found or you do not have permission to delete" },
                { status: 404 }
            );
        }

        return Response.json({ 
            message: "Deck deleted successfully",
            deletedDeck 
        });

    } catch (error) {
        console.error('Error deleting deck:', error);
        return Response.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
    try {
        // 1. Check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // 2. Parse request body
        const body = await request.json();

        // 3. Validate deckId
        const deckId = params.deckId;
        
        // Additional safety check
        if (!deckId) {
            return Response.json(
                { error: "Deck ID is required" },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(deckId)) {
            return Response.json(
                { error: "Invalid deck ID format" },
                { status: 400 }
            );
        }

        // 4. Validate request body
        if (!body || Object.keys(body).length === 0) {
            return Response.json(
                { error: "No update data provided" },
                { status: 400 }
            );
        }

        // 5. Partial update of the deck
        const updatedDeck = await Decks.findOneAndUpdate(
            {
                _id: deckId,
                user: session.user.id
            },
            { $set: body },
            { new: true }
        );

        // 6. Check if deck was found and updated
        if (!updatedDeck) {
            return Response.json(
                { error: "Deck not found or you do not have permission to update" },
                { status: 404 }
            );
        }

        // 7. Return success
        return Response.json(updatedDeck);

    } catch (error) {
        console.error('Error patching deck:', error);
        return Response.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}