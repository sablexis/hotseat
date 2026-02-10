const mongoose = require('mongoose');

const decksSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function(v) {
                return typeof v === 'string' || mongoose.Types.ObjectId.isValid(v);
            },
        }
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





