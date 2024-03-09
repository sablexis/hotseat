import React from "react";
import { useState } from "react";
import { MongoClient } from "mongodb";

const client = new MongoClient(MONGO_URI);

let next = 0;

const database = client.db("hotseat_db");
const decks = database.collection("decks");

const questions = [
    database.decks.aggregate([
    {
        $match: { user_id: session?.user}
    },
    {
        $group: {_id: "$title" }
    }
    ])
]
    



export default function decksList() {
    const [text, setText] = useState('');

    return(
        <ul>
        {questions.map(questions => (
            <li key={questions.id}>{questions.name}</li>
        ))}
        </ul>
    )


}