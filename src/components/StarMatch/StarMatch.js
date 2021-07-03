import { useState, useEffect } from 'react';
import { utils } from '../../shared/Utils';
import PlayNumber from '../PlayNumber/PlayNumber';
import StarsDisplay from '../StarsDisplay/StarsDisplay';
import './StarMatch.css';

/* Custom Hook ... */
const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft((prev) => {
          return prev - 1;
        });
      }, 1000);

      return () => { clearTimeout(timer); };
    }
  }, [secondsLeft, availableNums.length]);


  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);

      /* redraw the no. of stars from what's available */
      setStars(utils.randomSumIn(newAvailableNums, 9));
    }
  };

  return {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState
  };
};

const PlayAgain = (props) => {
  return (
    <div className="game-done">
      <div className="message" style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}>
        {props.gameStatus === 'lost' ? 'Game Over!' : 'Noice!'}
      </div>
      <button onClick={props.click}>Play Again</button>
    </div>
  );
};

const Game = (props) => {
  const { stars, availableNums, candidateNums, secondsLeft, setGameState } = useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const numberClickHandler = (number, currStatus) => {
    if (gameStatus !== 'active' || currStatus === 'used') {
      return;
    }

    const newCandidateNums = currStatus === 'available' ? [...candidateNums, number] : candidateNums.filter(cn => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? <PlayAgain click={props.startNewGame} gameStatus={gameStatus} /> : <StarsDisplay count={stars} />}
        </div>
        <div className="right">
          {utils.range(1, 9).map(numberId => (
            <PlayNumber
              key={numberId}
              number={numberId}
              status={numberStatus(numberId)}
              click={numberClickHandler}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StarMatch = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => { setGameId(gameId + 1) }} />;
};

export default StarMatch;