import { cardList } from './CardData.js';
import  Cards from './Cards.js';
import "@picocss/pico";


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