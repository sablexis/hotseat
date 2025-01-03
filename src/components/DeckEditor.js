"use client"

import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { 
    Button, TextField, Box, Typography, Radio, RadioGroup,
    FormControlLabel, FormControl, FormLabel, Paper,
    CircularProgress, Alert, IconButton, MobileStepper, Card, CardContent, Dialog
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
  import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
  import ModeIcon from '@mui/icons-material/Mode';
  import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
  import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
  import DoneIcon from '@mui/icons-material/Done';
  import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
  import AddCircleIcon from '@mui/icons-material/AddCircle';


  // Props & State Setup
  const DeckEditor = ({ deck, deckId}) => {
        const [loading, setLoading] = useState(true);
        const [deckTitle, setDeckTitle] = useState('');
        const [newCard, setNewCard] = useState('');
        const [cards, setCards] = useState([]);
        const [activeStep, setActiveStep] = useState(0);
        const [isEditingTitle, setIsEditingTitle] = useState(false);
        const [editedTitle, setEditedTitle] = useState(deck.name);
        const [error, setError] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [isEditing, setIsEditing] = useState(false);
        const [editingCard, setEditingCard] = useState(null);
        const [editedContent, setEditedContent] = useState('');
        // New state for add card dialog
        const [isAddCardOpen, setIsAddCardOpen] = useState(false);
        const [newCardText, setNewCardText] = useState('');

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
    const handleAddCard = async () => {
        if (!newCardText.trim()) return;

        const updatedCards = [...cards, newCardText.trim()];

        try {
            const response = await fetch(`/api/decks/${deckId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({cards: updatedCards})
            });

            if (!response.ok) throw new Error('Failed to add card!');

            setCards(updatedCards);
            setNewCardText('');
            setIsAddCardOpen(false);
            setSuccessMessage('Card added successfully!')

        } catch (error) {
            setError(error.message || 'Failed to add card')
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

        {/* verification */}

        // if cards array exists
        if (!cards || !Array.isArray(cards) || cards.length === 0) {
            setError("There are no cards in this deck!")
            return;
        }

        // if active card is valid
        if (activeStep < 0 || activeStep >= cards.length) {
            setError("Invalid card position!");
            return;
        }

        // if Active step has content
        if (!cards[activeStep]) {
            setError('Error with content at current card')
            return;
        }

        setIsEditing(true);
        setEditedContent(cards[activeStep]);
    }

    const handleEditedCardSave = async () => {
        {/* verification */}

        // Check if there's actually edited content
        if (setEditedContent === editedContent) {
            setError('Cards content not edited')
            return;
        }


        // Make sure the content isn't just empty spaces
        if (!editedContent || editedContent.trim() === '') {
            setError('Current content is empty spaces')
            return;
        }

        // Update local state
        const updatedCards = [...cards];  // Copy current cards array
        updatedCards[activeStep] = editedContent;  // Replace card at current position

        try {
            const response = await fetch(`/api/decks/${deckId}`,{
                method: 'PATCH',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({cards: updatedCards})
            });

            if (!response.ok) throw new Error('Failed to update card');
            setCards(updatedCards);  // Update cards state
            setSuccessMessage('Card updated successfully!');

            setIsEditing(false);  // Close edit panel
            setEditedContent('');    // Clear edit draft
            setError('');           // Clear any previous errors

        } catch (error) {
            setError(error.message || 'Failed to update card');
        }

    }

    const handleTitleChange = (e) => {

        setEditedTitle(e.target.value); 

        // Make sure the content isn't just empty spaces
        if (!editedTitle || editedTitle.trim() === '') {
            setError('Current content is empty spaces')
            return;
        }

        setIsEditingTitle(true)
    }

    const handleTitleSave = async () => {
        console.log('Starting save with editedTitle:', editedTitle); // Log initial value
        try {
            const response = await fetch(`/api/decks/${deckId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name: editedTitle })
            });
            
            const data = await response.json();
            console.log('Response from server:', data); // Log server response
            
            if (!response.ok) throw new Error('Failed to update title');
            
            console.log('Setting deckTitle to:', editedTitle); // Log before state update
            setDeckTitle(editedTitle);
            setIsEditingTitle(false);
            setSuccessMessage('Title updated successfully!');
            
            console.log('New deckTitle should be:', editedTitle); // Log after state update
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Failed to update title');
        }
    };

    const handleCancel = () => {
        // Nav logic
    }

    const previousCard = activeStep > 0 ? cards[activeStep - 1] : null;
    const currentCard = cards[activeStep];
    const nextCard = activeStep < cards.length - 1 ? cards[activeStep + 1] : null;

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 2,
                my: 4 
            }}>
                
                    
                    {!isEditingTitle ? (
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            gap: 2,
                            my: 4 
                        }}>

                        <Typography variant="h3" component="h3" className="mb-2">
                            {deckTitle}
                        </Typography>

                        <IconButton 
                        onClick={() => { 
                            setIsEditingTitle(true);
                        }}
                        color = "primary">
                            <ModeEditOutlineIcon />
                        </IconButton>

                        </Box>
                
                ):(
                    <Box>
                        <TextField id="outlined-basic" 
                            label="Edit Title" 
                            variant="outlined"
                            value={editedTitle}
                            onChange={handleTitleChange} 
                            
                        />
                        <IconButton 
                            onClick={handleTitleSave}
                            color="primary"
                            
                        >
                            <DoneIcon />
                        </IconButton>

                        <IconButton 
                            onClick={() => { 
                                setIsEditingTitle(false);
                            }}
                            color="primary"
                            
                        >
                            <DoDisturbAltIcon />
                        </IconButton>
                    </Box>
                    
                )}
            </Box>
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
            <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 1,
            my: 1 
            }}>
                <IconButton
                onClick={() => {
                    setIsEditing(true);
                    setEditingCard(currentCard);
                    setEditedContent(currentCard);
                  }}>
                    <ModeIcon />
                </IconButton>
                <IconButton>
                    <DeleteForeverIcon />
                </IconButton>
            </Box>
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

        {/*Step 3: Slide-up Edit Panel*/}

        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%', // Takes up bottom half of screen
                transform: isEditing ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.3s ease-in-out',
                zIndex: 10,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                boxShadow: 3,
                p: 2
            }}
            >
            {/* Step 4: Edit Interface Content */}
            <Card sx={{ height: '100%', overflow: 'auto' }}>
                <CardContent>
                <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    sx={{ mb: 1 }}
                />
                
                {/* Step 5: Action Buttons */}
                {/* Like having save/cancel buttons on your drawer */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button 
                    onClick={() => {
                        setIsEditing(false);
                        setEditingCard(null);
                    }}
                    variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button 
                    onClick={handleEditedCardSave}
                    variant="contained"
                    >
                        Save
                    </Button>
                </Box>
                </CardContent>
            </Card>
        </Paper>


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
          <Box
            sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9
            }}
            onClick={() => setIsEditing(false)}
        />
        </div>
        
      )}

        <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: 2,
                my: 4 
            }}>
            <Button variant="contained" href="/Member">
                Back
            </Button>

            {/* Add Card Button */}
            <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            onClick={() => setIsAddCardOpen(true)}
            //sx={{ mt: 2 }}
            >
            Add New Card
            </Button>
        </Box>

            {/* Add Card Dialog */}
            <Dialog 
                open={isAddCardOpen} 
                onClose={() => setIsAddCardOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Add New Card
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={newCardText}
                        onChange={(e) => setNewCardText(e.target.value)}
                        placeholder="Enter your card text..."
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button 
                            onClick={() => setIsAddCardOpen(false)}
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleAddCard}
                            variant="contained"
                            disabled={!newCardText.trim()}
                        >
                            Add Card
                        </Button>
                    </Box>
                </Box>
            </Dialog>

        </Box>
      
        

      );

    }


export default DeckEditor;