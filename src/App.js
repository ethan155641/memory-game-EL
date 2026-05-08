import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';

const cardImages = [
  { src: 'img/apple.png', matched: false },
  { src: 'img/bananas.png', matched: false },
  { src: 'img/cherries.png', matched: false },
  { src: 'img/lemon.png', matched: false },
  { src: 'img/strawberry.png', matched: false },
  { src: 'img/watermelon.png', matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }

            return card;
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>&#9733; Memory Match Game &#9733;</h1>
      <p className="instructions">
        Click two cards to reveal fruit images and find a matching pair.
        Keep matching until all 6 pairs are visible.
      </p>

      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>

      <footer>
        <a href="https://YOUR-COURSE-HOMEPAGE-URL" target="_blank" rel="noreferrer">
          Course Homepage
        </a>
        <span>
          {' '}| Adapted from Net Ninja:{' '}
          <a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy0y_95Q1r0SHEdL1ydUB" target="_blank" rel="noreferrer">
            Build a Memory Game with React
          </a>{' '}
          |
        </span>
        <a href="https://github.com/YOUR-USERNAME/project3-memory-game" target="_blank" rel="noreferrer">
          GitHub Project
        </a>
      </footer>
    </div>
  );
}

export default App;
