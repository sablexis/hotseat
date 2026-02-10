/**
 * card object, a container for card texts and card...cards? themselves
 */

import React from 'react';
import "./game.css"

//import {cardCycler} from './GameCards';

// Simple shadcn-style Card component (uses existing CSS for styling)
function Card({ children }) {
  return (
    <div className="cardWContent">
      {children}
    </div>
  );
}

export default function Cards({cardText}) {
  return (
    <div className="container">
      <Card>
        {cardText}
      </Card>
    </div>
  );
}

