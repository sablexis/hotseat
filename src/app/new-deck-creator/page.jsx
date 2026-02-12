import DeckCreator from '@/components/DeckCreator';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewDeckCreatorPage() {
  return (
    <div>
      <DeckCreator />
      <Button asChild>
        <Link href="/Member">Back</Link>
      </Button>
    </div>
  );
}
