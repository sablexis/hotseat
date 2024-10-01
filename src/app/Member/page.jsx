import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';


const Member = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }

  return (
    <div>
      <h1>Member Dashboard</h1>
      <div>
        <h3>My decks:</h3>
      </div>
      
      <div className="decksContainer">
      <decksList />
      <Divider orientation="vertical" flexItem />
      <Button variant="contained" endIcon={<AddBoxIcon />} href = "/NewDeck">
      New Deck
      </Button>

      </div>
    </div>

  );
};

export default Member;