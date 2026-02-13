'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import DeckEditor from '@/components/DeckEditor'
import { Spinner } from "@/components/ui/spinner"

const fetchDeck = async (deckId) => {
  const response = await fetch(`/api/decks/${deckId}`)
  return response.json()
}

export default function Page() {
  const { deckId } = useParams()
  const [deck, setDeck] = useState(null)

  useEffect(() => {
    fetchDeck(deckId).then(setDeck)
  }, [deckId])

  return deck ? <DeckEditor deck={deck} deckId={deckId} /> : <Spinner />
}

