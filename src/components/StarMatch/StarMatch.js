import { useState } from 'react';
import { utils } from '../../shared/Utils';
import './StarMatch.css';

const StarMatch = () => {
  const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };

  const [stars, setStars] = useState(utils.random(1, 9));

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {utils.range(1, stars).map(starId => (
            <div key={starId} className="star"></div>
          ))}
        </div>
        <div className="right">
          {utils.range(1, 9).map(numberId => (
            <button className="number">{numberId}</button>
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
  );
};

export default StarMatch;