import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGO_URI)
mongoose.Promise = global.Promise

const decksSchema = new Schema({
    title: String, 
    questions: [{body: String}]

})

const Decks = mongoose.models.Decks || mongoose.model("Decks", decksSchema);