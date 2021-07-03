import { utils } from './../../shared/Utils';

const StarsDisplay = (props) => {
  return (
    <>
      {utils.range(1, props.count).map(starId => (
        <div key={starId} className="star"></div>
      ))}
    </>
  );
};

export default StarsDisplay;