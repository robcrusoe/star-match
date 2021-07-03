import { useState } from 'react';
import { utils } from '../../shared/Utils';
import PlayNumber from '../PlayNumber/PlayNumber';
import StarsDisplay from '../StarsDisplay/StarsDisplay';
import './StarMatch.css';

const PlayAgain = (props) => {
  return (
    <div className="game-done">
      <button onClick={props.click}>Play Again</button>
    </div>
  );
};

const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameIsDone = availableNums.length === 0;

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9));
    setCandidateNums([]);
  };

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
    if (currStatus === 'used') {
      return;
    }

    const newCandidateNums = currStatus === 'available' ? [...candidateNums, number] : candidateNums.filter(cn => cn !== number);
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

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameIsDone ? <PlayAgain click={resetGame} /> : <StarsDisplay count={stars} />}
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
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

export default StarMatch;