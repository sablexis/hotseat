const express = require('express');
const router = express.Router();
const Decks = require('../../models/Decks');
const verifySession = require('../middleware/verifySession');
const res = require('express/lib/response');
const req = require('express/lib/request');


// Get all string arrays for the authenticated user
router.get('/', verifySession, async (req,res) => {
    try {
        const Decks = await Decks.find({user: req.user._id});
        res.json(Decks);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Create a new string array for the authenticated user
router.post('/', verifySession, async (req,res) => {
    const Decks = new Decks ({
        ...req.body,
        user: req.user._id
    });
    try{
        const newDecks = await Decks.save();
        res.status(201).json(newDecks)
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Update a string array owned by the authenticated user
router.patch('/:id', verifySession, async (req, res) => {
    try {
      const updatedDecks = await Decks.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { $set: req.body },
        { new: true }
      );
      if (!updatedDecks) {
        return res.status(404).json({ message: 'String array not found' });
      }
      res.json(updatedDecks);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a string array owned by the authenticated user
  router.delete('/:id', verifySession, async (req, res) => {
    try {
      const deletedDecks = await Decks.findOneAndDelete({ _id: req.params.id, user: req.user._id });
      if (!deletedDecks) {
        return res.status(404).json({ message: 'String array not found' });
      }
      res.json({ message: 'String array deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;