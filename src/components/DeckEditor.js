"use client"

import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { 
    Button, TextField, Box, Typography, Radio, RadioGroup,
    FormControlLabel, FormControl, FormLabel, Paper,
    CircularProgress, Alert, IconButton, MobileStepper, Card, CardContent
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
  import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

  // Props & State Setup
  const DeckEditor = ({ deck, deckId}) => {
        const [loading, setLoading] = useState(true);
        const [deckTitle, setDeckTitle] = useState('');
        const [newCard, setNewCard] = useState('');
        const [cards, setCards] = useState([]);
        const [activeStep, setActiveStep] = useState(0);
        const [currentCardIndex, setCurrentCardIndex] = useState(0);
        const [error, setError] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [isEditing, setIsEditing] = useState(false);

        const maxSteps = cards.length;
    

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const response = await fetch(`/api/decks/${deckId}`);
                if (!response.ok) throw new Error('Failed to fetch deck');
                    const data = await response.json();
                    setCards(data.cards);
                    setDeckTitle(data.name);
            
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (deckId) fetchDeck();
    
    }, [deckId]);
    
    const handleSubmit = async (e) => {
        setError(''); 
        setSuccessMessage('');

        e.preventDefault();

        if (cards.length === 0) {
            setError('Deck must contain at least one card');
            return;
          }

        try {
            const response = await fetch(`/api/decks/${deckId}`,{
                method: 'PATCH',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({title: deckTitle, cards})
            });
            if (!response.ok) throw new Error('Failed to update deck');
            setSuccessMessage('Deck updated successfully!');

        } catch (error) {
            setError(err.message || 'Failed to update deck');
            
        }
        
    };

      // Handler for adding new card
    const handleAddCard = (e) => {
        e.preventDefault();
        if (newCard.trim()) {
        setCards(prevCards => [...prevCards, newCard.trim()]);
        setNewCard(''); // Reset input field
        }
    };

  // Handler for removing a card
    const handleRemoveCard = (indexToRemove) => {
        setCards(prevCards => prevCards.filter((_, index) => index !== indexToRemove));
    };

    const handleNext = () =>{
        setActiveStep((prevStep) => prevStep + 1);
    }

    const handlePrev = () =>{
        setActiveStep((prevStep) => prevStep - 1);
    }
    

    const handleEdit = () => {

    }

    const handleCancel = () => {
        // Nav logic
    }

    const previousCard = activeStep > 0 ? cards[activeStep - 1] : null;
    const currentCard = cards[activeStep];
    const nextCard = activeStep < cards.length - 1 ? cards[activeStep + 1] : null;

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
        {/* Card Display Area */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2,
          my: 4 
        }}>
          {/* Previous Card - slightly smaller and to the left */}
          {previousCard && (
            <Card sx={{ 
              opacity: 0.7, 
              transform: 'scale(0.8)',
              transition: 'all 0.3s ease' 
            }}>
              <CardContent>
                <Typography>{previousCard}</Typography>
              </CardContent>
            </Card>
          )}
  
          {/* Current Card - larger and prominent */}
          <Card sx={{ 
            transform: 'scale(1.1)',
            zIndex: 1,
            boxShadow: 3,
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Typography>{currentCard}</Typography>
            </CardContent>
          </Card>
  
          {/* Next Card - slightly smaller and to the right */}
          {nextCard && (
            <Card sx={{ 
              opacity: 0.7, 
              transform: 'scale(0.8)',
              transition: 'all 0.3s ease' 
            }}>
              <CardContent>
                <Typography>{nextCard}</Typography>
              </CardContent>
            </Card>
          )}
        </Box>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <IconButton onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            <ArrowForwardIosIcon />
          </IconButton>
        }
        backButton={
          <IconButton onClick={handlePrev} disabled={activeStep === 0}>
            <ArrowBackIosIcon />
          </IconButton>
        }
        />

        {/* Edit interface - only shown when isEditing is true */}
      {isEditing && (
        <div className="edit-interface">
          {/* Edit form */}
        </div>
        
      )}
        </Box>
      

      );

    }


export default DeckEditor;