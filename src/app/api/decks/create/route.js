// src/app/api/decks/create/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/mongodb";
import Decks from "@/app/models/Decks";

export async function POST(request) {
    console.log('API route hit');
    try {
        // Connect to database
        await dbConnect();
        console.log('Database connected');

        // Get session
        const session = await getServerSession(options);
        console.log('Session:', session);
        
        if (!session) {
            console.log('No session found');
            return NextResponse.json(
                { message: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Get request body
        const body = await request.json();
        const { title, cards } = body;
        console.log('Received data:', { title, cards });

        if (!title || !cards || !Array.isArray(cards)) {
            console.log('Invalid data received');
            return NextResponse.json(
                { message: 'Invalid deck data' },
                { status: 400 }
            );
        }

        // Create deck
        const deck = await Decks.create({
            user: session.user.id,
            name: title,
            cards: cards
        });

        console.log('Deck created successfully:', deck);

        return NextResponse.json(
            { message: 'Deck created successfully', deck },
            { status: 201 }
        );
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { message: 'Error creating deck: ' + error.message },
            { status: 500 }
        );
    }
}