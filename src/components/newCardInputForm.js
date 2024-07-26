"use client"

import React from "react";
import Paper from '@mui/material/Paper';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useState } from "react";
import Link from "next/link";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';



function NewCardInputForm(){

        const [title, setTitle] = useState("");
        const [cards, setCards] = useState([]);
      
        const handleTitleChange = (event) => setTitle(event.target.value);

        const handleCardChange = (index, event) => {
          const updatedCard = [...cards];
          updatedCard[index] = event.target.value;
          setCards(updatedCard);
        };
      
        const addQuestion = () => setCards([...cards, ""]);

        const handleRemoveCard = (index) => {
            const updatedCards = [...cards];
            updatedCards.splice(index, 1);
            setCards(updatedCards);
          };
      
        const handleSubmit =  (event) => {
          event.preventDefault();
        
          const response = fetch('src/app/api/addDeckCard/addDeckString.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, cards }),
          })
            .then(response => response.json())  // Parse the response as JSON
            .then(data => {
              if (data.message === 'Deck created successfully') {
                // Handle successful deck creation (e.g., display success message or redirect)
                console.log('Deck created successfully!');
                // Optionally, update the UI (e.g., clear the form)
              } else {
                // Handle errors (e.g., display error message to user)
                console.error('Error creating deck:', data.message);
              }
            })
            .catch(error => {
              console.error('Error creating deck:', error);
              // Handle errors here (e.g., display a generic error message)
            });

        };
    
    

    return(

        <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField id="filled-basic"
            color = "secondary"
            label="Deck Title"
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </FormControl>
        {cards.map((card, index) => (
          <FormControl fullWidth key={index} margin="normal">
            <TextField
              label={`Card ${index + 1}`}
              value={card}
              onChange={(event) => handleCardChange(index, event)}
              required
            />
            {index > 0 && (
              <Button variant="contained" color="error" size="small" onClick={() => handleRemoveCard(index)}>
                Remove Card
              </Button>
            )}
          </FormControl>
        ))}
        <Button variant="contained" color="primary" onClick={addQuestion}>
          Add Card
        </Button>
        <br />
        <Button type="submit" variant="contained">
          Create Deck
        </Button>
      </form>
    </div>

        // <div>
        //     <form onSubmit = {handleSubmit}>
        //     <h1>New Card</h1>
        //     <Paper elevation={3}>
        //     <div className="deckTitleInput">
        //     <TextField id="filled-basic"
        //         color = "secondary" 
        //         label="Deck Title" 
        //         variant="outlined"
        //         onChange={handleTitleChange}>
        //         </TextField> 
        //     </div>
        //     <div className="cardTextInput">
        //         <TextField id="outlined-basic"
        //         color = "secondary" 
        //         label="Question" 
        //         variant="outlined"
        //         multiline
        //         rows={4}
        //         onChange={(event) => handleCardChange(index, event)}>
        //         </TextField> 
        //     </div>
        //     <Button variant="outlined" 
        //     startIcon={<PostAddIcon />}
        //     onClick ={addQuestion}
        //     sx = {{
        //         margin: 2
        //     }}>
        //             Add card
        //         </Button>
        //     </Paper>
        //     </form>
        // </div>

    );
}

export default NewCardInputForm;