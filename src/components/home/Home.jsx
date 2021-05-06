import { h } from 'preact';
import { useState } from 'preact/hooks';

export const Home = () => {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState([]);
  const [dragId, setDragId] = useState();

  const handleSend = () => {
    setOptions((prev) => {
      let len = prev.length;
      return [
        ...prev,
        {
          id: prev[len - 1]?.id + 1 || 0,
          order: prev[len - 1]?.order + 1 || 0,
          val: input,
        },
      ];
    });
  };

  const handleDrag = ({ currentTarget: target }) => {
    setDragId(target.id);
  };

  const handleDrop = ({ currentTarget: target }) => {
    const dragElem = options.find((elem) => elem.id == dragId);
    const dropElem = options.find((elem) => elem.id == target.id);

    const newElemState = options.map((elem) => {
      if (elem.id == dragId) {
        elem = { ...elem, order: dropElem.order };
      }

      if (elem.id == target.id) {
        elem = { ...elem, order: dragElem.order };
      }

      return elem;
    });

    setOptions(newElemState);
  };

  const optionsList = options
    .sort((a, b) => a.order - b.order)
    .map((elem) => {
      return (
        <li
          id={elem.id}
          draggable={true}
          onDragOver={(e) => e.preventDefault()}
          onDragStart={handleDrag}
          onDrop={handleDrop}
        >
          {elem.val}
        </li>
      );
    });

  return (
    <div class="container">
      <h1>Voting</h1>
      <input value={input} onChange={({ target }) => setInput(target.value)} />
      <button onClick={handleSend}>Send</button>
      <ul>{optionsList}</ul>
    </div>
  );
};
