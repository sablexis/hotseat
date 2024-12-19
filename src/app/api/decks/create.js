import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/mongodb";
import Decks from "@/app/models/Decks";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'});
    }

    try { 
        const session = await getServerSession(req, res, options);

        if (!session) {
            return res.status(401).json({message: 'Not authenticated' });
        }

        await dbConnect();

        const {title, cards} = req.body;

        if (!title || !cards || !Array.isArray(cards)) {
            return res.status(400).json({ message: 'Invalid deck data' });
        }

        const deck = await Decks.create({
            user: session.user.id,
            name: title,
            cards: cards
        });

        return res.status(201).json({ message: 'Deck created successfully', deck});
    } catch (error){
        console.error('Deck creation error:', error);
        return res.status(500).json({message: 'Error creating deck'});
    }
}