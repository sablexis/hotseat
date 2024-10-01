
import React, {useState} from "react";

function CreateDeck(){
    const [title, setTitle] = useState('');
    const [deck, setDeck] = useState({title: '', cards: []});

    function handleSubmit(){
        setDeck({title, cards: []});
    };

    return (
        <div>
            <h1>
                Create a new deck
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <button type="submit">
                    New Deck
                </button>
            </form>
            {deck.title && <EditDeck deck={deck} />}
        </div>
    );

}

export default CreateDeck;