'use client'
import {React, useState, useEffect} from 'react'
import { useParams } from 'next/navigation'
import { CircularProgress } from '@mui/material'
import EditDeck from '@/components/DeckEditor'
import DeckEditor from '@/components/DeckEditor'

// Access deck ID


const fetchDeck = async (deckId) => {
    const response = await fetch(`/api/decks/${deckId}`)
    return response.json()
  }

  async function getDeck(deckId) {
    const deck = await Decks.findById(deckId)
    return deck
  }

export default function Page() {
    // params.deckId available directly

    const { deckId } = useParams()
    const [deck, setDeck] = useState(null)
    

  useEffect(() => {
    fetchDeck(deckId).then(setDeck)
  }, [deckId])

  return deck ? <DeckEditor deck={deck} deckId={deckId} /> : <CircularProgress />
  }