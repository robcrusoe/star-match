const PlayNumber = (props) => {
  const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };

  const numberClickHandler = () => {
    console.log(props.number);
  };

  return (
    <button
      className="number"
      onClick={numberClickHandler}
      style={{ background: colors[props.status] }}
    >
      {props.number}
    </button>
  );
};

export default PlayNumber;