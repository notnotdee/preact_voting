import { h } from 'preact';
import { useState } from 'preact/hooks';

export const Home = () => {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState([]);

  const handleSend = () => {
    setOptions((prev) => [...prev, input]);
  };

  const optionsList = options.map((elem) => {
    return <li>{elem}</li>;
  });

  return (
    <div>
      <h1>Voting</h1>
      <input onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
      <ul>{optionsList}</ul>
    </div>
  );
};
