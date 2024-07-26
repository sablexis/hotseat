const { type } = require('express/lib/response');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://user:password@127.0.0.1:27017/hotseat');
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
    name: {
        type: String,
        required: true},
    strings:[{
        type: String
    }]

})

const Decks =  mongoose.model('Decks', decksSchema);

}

// mongoose.connect(process.env.MONGO_URI)





