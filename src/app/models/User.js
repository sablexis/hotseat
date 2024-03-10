const mongoose = require('mongoose');

main().catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/hotseat');
    mongoose.Promise = global.Promise
  
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
    const User = mongoose.model('User', userSchema);

}





//export default User;