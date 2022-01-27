import './App.css';
import Dice from "./components/Dice";
import Die from "./components/Die";
import {useState} from "react";

function App() {
    const [dice, setDice] = useState(allNewDice);
    const allDice = dice.map((die, index) => <Die key={index} value={die.value}/>);
    
    function allNewDice() {
        let newDice = [];
        for (let i = 1; i <= 10; i++) {
            let randomNumber = Math.floor((Math.random() * 6) + 1);
            newDice.push({value: randomNumber, isHeld: false});
        }
        return newDice;
    }

    function handleRollDice() {
        setDice(allNewDice());
    }

    return (
      <main className='container'>
          <Dice>
              {allDice}
          </Dice>
          <button className='roll-dice' onClick={handleRollDice}>Roll</button>
      </main>
  );
}

export default App;
