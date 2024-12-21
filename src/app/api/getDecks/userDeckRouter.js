import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import {options} from "./options";
const express = require('express');
const router = express.Router();
// schema models
const Deck = require('../models/Decks');
const User = require('./models/User');

router.post('/add-question', async (req, res) => {
  // Implementation from the previous response
  try {
    const { question } = req.body;
    const user = await User.findOne({ _id: req.user._id }); // Assuming you're using Passport.js for user authentication
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.deck.push(question);
    await user.save();

    res.status(201).json({ message: 'Question added to deck' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/user-decks', getUserDecks);

module.exports = router;

async function getUserDecks(req, res) {

    try{

        const userDecks = await Deck.find({user: req.user_id})
            .populate('user');

        if(!userDecks){
            return res.status(404).json({ error: 'No decks found' });
        }

        res.json(userDecks);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'an error occured!'});
    }
}