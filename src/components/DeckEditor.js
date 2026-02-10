"use client"

import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Edit,
  Trash2,
  Check,
  XCircle,
  PlusCircle,
  Pencil
} from 'lucide-react';


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
                body: JSON.stringify({name: deckTitle, cards})
            });
            if (!response.ok) throw new Error('Failed to update deck');
            setSuccessMessage('Deck updated successfully!');

        } catch (error) {
            setError(error.message || 'Failed to update deck');
            
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
        if (setEditedContent === cards) {
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
        <div className="w-full relative">
            <div className="flex items-center justify-center gap-2 my-4">
                {!isEditingTitle ? (
                    <div className="flex items-center justify-center gap-2 my-4">
                        <h3 className="text-3xl font-semibold mb-2">
                            {deckTitle}
                        </h3>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsEditingTitle(true)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Edit Title"
                            value={editedTitle}
                            onChange={handleTitleChange}
                            className="max-w-sm"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleTitleSave}
                        >
                            <Check className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsEditingTitle(false)}
                        >
                            <XCircle className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        {/* Card Display Area */}
        <div className="flex items-center justify-center gap-2 my-4">
          {/* Previous Card - slightly smaller and to the left */}
          {previousCard && (
            <Card className="opacity-70 scale-90 transition-all duration-300">
              <CardContent>
                <p>{previousCard}</p>
              </CardContent>
            </Card>
          )}

          {/* Current Card - larger and prominent */}
          <Card className="scale-110 z-10 shadow-lg transition-all duration-300">
            <CardContent>
              <p>{currentCard}</p>
            </CardContent>
            <div className="flex items-center justify-center gap-1 my-1">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        setIsEditing(true);
                        setEditingCard(currentCard);
                        setEditedContent(currentCard);
                    }}
                >
                    <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
          </Card>

          {/* Next Card - slightly smaller and to the right */}
          {nextCard && (
            <Card className="opacity-70 scale-90 transition-all duration-300">
              <CardContent>
                <p>{nextCard}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/*Step 3: Slide-up Edit Panel*/}

        <div
            className={`fixed bottom-0 left-0 right-0 h-1/2 transition-transform duration-300 ease-in-out z-10 ${
                isEditing ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
            }}
        >
            {/* Step 4: Edit Interface Content */}
            <Card className="h-full overflow-auto shadow-lg">
                <CardContent className="p-4">
                <Textarea
                    rows={2}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="mb-2"
                />

                {/* Step 5: Action Buttons */}
                <div className="flex justify-end gap-2">
                    <Button
                        onClick={() => {
                            setIsEditing(false);
                            setEditingCard(null);
                        }}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEditedCardSave}
                    >
                        Save
                    </Button>
                </div>
                </CardContent>
            </Card>
        </div>


      <div className="flex items-center justify-between mt-4 p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          disabled={activeStep === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="text-sm text-muted-foreground">
          {activeStep + 1} / {maxSteps}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

        {/* Edit interface - only shown when isEditing is true */}
      {isEditing && (
        <div
          className="fixed inset-0 bg-black/50 z-[9]"
          onClick={() => setIsEditing(false)}
        />
      )}

        <div className="flex items-center justify-center gap-2 my-4">
            <Button variant="outline" asChild>
                <a href="/Member">Back</a>
            </Button>

            {/* Add Card Button */}
            <Button
                onClick={() => setIsAddCardOpen(true)}
            >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Card
            </Button>
        </div>

            {/* Add Card Dialog */}
            <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
                <DialogContent className="sm:max-w-md">
                    <div className="p-3">
                        <h3 className="text-lg font-semibold mb-4">
                            Add New Card
                        </h3>
                        <Textarea
                            rows={4}
                            value={newCardText}
                            onChange={(e) => setNewCardText(e.target.value)}
                            placeholder="Enter your card text..."
                            className="mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <Button
                                onClick={() => setIsAddCardOpen(false)}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleAddCard}
                                disabled={!newCardText.trim()}
                            >
                                Add Card
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
      
        

      );

    }


export default DeckEditor;