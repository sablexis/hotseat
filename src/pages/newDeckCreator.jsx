import DeckCreator from '@/components/DeckCreator';
import Link from "next/link";
import { Button } from '@mui/material';

export default function newDeckCreator() {
    return <div>
        <DeckCreator />
        <Button variant="contained" href="/Member">
            Back
        </Button>

    </div>
}