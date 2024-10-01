
import { response } from "express";
import React, {useState} from "react";

function DeckEditor(){
    const [newCard, setNewCard] = useState('');
    const [cards, setCards] = useState(deck.cards);

    const handleAddCard = () => {
        setCards([...cards, newCard]);
        setNewCard('');
    };

    const handleRemoveCard = (index) => {
        setCards(cards.filter((card,i) => i !== index));
    };

    function handleSubmit(){
        fetch('/api/decks',{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title: deck.title, cards}),
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>
                Edit deck {deck.title}
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={newCard}
                onChange={e => setNewCard(e.target.value)}
                />
                <button type="button" onClick={handleAddCard}>
                    Add card
                </button>
                <ul>
                    {cards.map((card, index) => (
                        <li key ={index}>
                            {card}
                            <button type="button" onClick={() => handleRemoveCard(index)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <button type="submit">Update deck</button>
            </form>
        </div>
    );

}

export default EditDeck;