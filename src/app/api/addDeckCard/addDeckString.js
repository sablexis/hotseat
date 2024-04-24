import User from 'src/app/models/User.js';
import Decks from 'src/app/models/Decks.js';

User.methods.addUniqueString = function(string) {
    if (!this.uniqueStrings.includes(string)) {
      this.uniqueStrings.push(string);
      return this.save();
    }
  };
  