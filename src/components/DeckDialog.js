"use client"

import * as React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


function DeckDialog({onClose, open, deck}) {
  const router = useRouter();


  const handleListItemClick = (e, path) => {
    onClose();

    if (path === "/decks/{deckId}/edit") {
      router.push(`decks/${deck._id}/edit`)
        
    }

    if (path === "/decks/{deckId}/play") {
      router.push(`decks/${deck._id}/play`)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deck Options</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 pt-4">
          <Button
            variant="outline"
            onClick={(e) => handleListItemClick(e, "/decks/{deckId}/edit")}
            className="w-full justify-start"
          >
            Edit The Deck
          </Button>

          <Button
            variant="outline"
            onClick={(e) => handleListItemClick(e, "/decks/{deckId}/play")}
            className="w-full justify-start"
          >
            Play with this deck
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

DeckDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  deck: PropTypes.object.isRequired,
};
 

  
  




  export default  DeckDialog;