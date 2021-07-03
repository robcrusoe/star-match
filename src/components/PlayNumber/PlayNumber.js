const PlayNumber = (props) => {
  const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };

  return (
    <button
      className="number"
      onClick={() => (props.click(props.number, props.status))}
      style={{ background: colors[props.status] }}
    >
      {props.number}
    </button>
  );
};

export default PlayNumber;