const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/hotseat');
    mongoose.Promise = global.Promise

const decksSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: String, 
    questions: [{body: String}]

})
}

// mongoose.connect(process.env.MONGO_URI)


const Decks = mongoose.models.Decks || mongoose.model("Decks", decksSchema);

export default Decks;
