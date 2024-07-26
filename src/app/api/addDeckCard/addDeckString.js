import User from 'src/app/models/User.js';
import Decks from 'src/app/models/Decks.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler ( NextApiRequest, NextApiResponse) {

    // await mongoose.connect('mongodb://127.0.0.1:27017/hotseat');
    mongoose.createConnection('mongodb://user:pass@127.0.0.1:port/hotseat', { autoIndex: false });
    mongoose.Promise = global.Promise

    const { title, cards } = req.body;

    try {
        // Create a new Deck document
        const deck = new Deck({ title, cards });
        await deck.save();
    
        return res.status(200).json({ message: 'Deck created successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating deck' });
      }
  
}
