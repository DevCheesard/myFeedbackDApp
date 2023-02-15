import React, {useState} from 'react'
import './App.css';


function App() {
  const [snippet, setSnippet] = useState('');
  const [showSnippet, setShowSnippet] = useState(false);

  const handleChange = (event) => {
    setSnippet(event.target.value);
    if (!event.target.value) {
      setShowSnippet(false);
    }
  };

  const handleClick = () => {
    if (snippet) {
      setShowSnippet(true);
    }
  };

  return (
    <div className="App">
      <h1 className='head'>Snippets!</h1>
      <p>A comment, some advice, song lyrics, words that stuck with you, random words, random thoughts.</p>
      <p>Try out my first DApp, Leave a Snippet!</p>
      <input
        type="text"
        value={snippet}
        onChange={handleChange}
        placeholder="Leave a snippet"/>
      <button type='submit' onClick={handleClick}>Submit</button>
      {showSnippet ? (
        <div className='feed'>
          <h2>Recent Snips</h2>
          <p className='snips'>{snippet}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;