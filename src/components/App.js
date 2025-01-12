import { useState } from 'react';
import Calculator from './Calculator';
import History from './History';

function App() {
  const [history, setHistory] = useState([]);
  const [isHistory, setIsHistory] = useState(false);

  return (
    <div className="app">
      <Calculator
        history={history}
        setHistory={setHistory}
        isHistory={isHistory}
        setIsHistory={setIsHistory}
      />
      {isHistory && <History history={history} />}
    </div>
  );
}

export default App;
