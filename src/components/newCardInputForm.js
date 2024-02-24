"use client"

import React from "react";
import { TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useState } from "react";
import Link from "next/link";


export default function NewCardInputForm(){

    const [newCardText, setNewCardText] = useState("");


    const handleClick = () => {
        setNewCardText(inputText);
    }

    return(

        <div>
            <h1>New Card</h1>
            <Paper elevation={3}>
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
        </div>

    );
}