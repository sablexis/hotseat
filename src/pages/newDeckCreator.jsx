import DeckCreator from '@/components/DeckCreator';
import Link from "next/link";

export default function newDeckCreator() {
    return <div>
        <DeckCreator />
        <Link href = "/Member">Back</Link>

    </div>
}