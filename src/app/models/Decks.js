const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/hotseat');
    mongoose.Promise = global.Promise

const cardSchema = new mongoose.Schema({
    cardText: {
        type: String,
        required: true
    }
    });

const decksSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: String, 
    cards: [{body: String}]

})

const Decks =  mongoose.model('Decks', decksSchema);

}

// mongoose.connect(process.env.MONGO_URI)





