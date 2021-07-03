const PlayNumber = (props) => {
  const numberClickHandler = () => {
    console.log(props.number);
  };

  return (
    <button className="number" onClick={numberClickHandler}>{props.number}</button>
  );
};

export default PlayNumber;