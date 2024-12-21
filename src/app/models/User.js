const mongoose = require('mongoose');




    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
    },{
        timestamps: true,
        decks: [{type: mongoose.Schema.Types.ObjectID, ref: 'Decks'}]
    }
    );
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    export default mongoose.models.User || mongoose.model('User', userSchema);







//;