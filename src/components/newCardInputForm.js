"use client"

import React from "react";
import { TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useState } from "react";
import Link from "next/link";



export default function NewCardInputForm(){

        const [title, setTitle] = useState("");
        const [questions, setQuestions] = useState([]);
      
        const handleTitleChange = (event) => setTitle(event.target.value);
        const handleQuestionChange = (index, event) => {
          const updatedQuestions = [...questions];
          updatedQuestions[index] = event.target.value;
          setQuestions(updatedQuestions);
        };
      
        const addQuestion = () => setQuestions([...questions, ""]);
      
        const handleSubmit = (event) => {
          event.preventDefault();
          onSubmit({ title, questions });
        };
    
    

    return(

        <div>
            <form onSubmit = {handleSubmit}>
            <h1>New Card</h1>
            <Paper elevation={3}>
            <div className="deckTitleInput">
            <TextField id="filled-basic"
                color = "secondary" 
                label="Deck Title" 
                variant="outlined"
                onChange={handleTitleChange}>
                </TextField> 
            </div>
            <div className="cardTextInput">
                <TextField id="outlined-basic"
                color = "secondary" 
                label="Question" 
                variant="outlined"
                multiline
                rows={4}
                onChange={e => inputText(e.target.value)}>
                </TextField> 
            </div>
            <Button variant="outlined" 
            startIcon={<PostAddIcon />}
            onClick ={handleClick}
            sx = {{
                margin: 2
            }}>
                    Add card
                </Button>
            </Paper>
            </form>
        </div>

    );
}
