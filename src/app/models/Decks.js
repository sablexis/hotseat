const mongoose = require('mongoose');

const decksSchema = new mongoose.Schema({
    user: {
        type: String || mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    }, 
    cards: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true

});

export default mongoose.models.Decks || mongoose.model('Decks', decksSchema);



// mongoose.connect(process.env.MONGO_URI)





