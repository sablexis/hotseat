import "@picocss/pico";
import '../app/page.module.css';
import "./game.css";


export default function RulesCard() {
    return (
        <>
        <div className = "rules-card">
              <h5>Hot Seat:<br></br> The Drinking Game 🔥</h5>
              <div className = "rules-text">
                <ul>
                  <li>Designate who's up first and the following order of players</li>
                  <li>The player on the hot seat picks who they'd like a question from</li>
                  <li>The person who's been picked to ask a question asks their question, If the question is one you wish not to ask, you must drink and tap 'new card' to pull a new card from the pile</li>
                  <li>If the hot seat player wishes not to answer they must drink</li>
                </ul>
              </div>
        </div>
        </>
      );
}