import { cardList } from './CardData.js';
import  Cards from './Cards.js';
import "./game.css"


export default function GameCards({cardText}) {


    return(
    <>
        <div className='gameCards'>
            <div>
                {cardText}
            </div>
        </div>
    </>
    );
}