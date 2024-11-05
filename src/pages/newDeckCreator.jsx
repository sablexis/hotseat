import CreateDeck from "@/components/CreateDeck";
import Link from "next/link";

export default function newDeckCreator() {
    return <div>
        <CreateDeck/>
        <Link href = "/Member">Back</Link>

    </div>
}