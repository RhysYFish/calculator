import Results from './Results';
import Button from './Button';
import { useState } from 'react';

const specialChars = ['.', '+', '-', '*', '/'];

export default function Calculator({
  history,
  setHistory,
  isHistory,
  setIsHistory,
}) {
  const [result, setResult] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  // Function to append result
  function appendResult(e) {
    const btnValue = e.target.textContent;

    // ---------------- EARLY RETURNS START ----------------
    // Clear result if you press a number and the result was just answered
    if (isAnswered) {
      if (!specialChars.includes(btnValue)) {
        setResult(btnValue);
        setIsAnswered(false);
        return;
      }

      setIsAnswered(false);
    }

    // Prevent starting with a special character
    if (result.length === 0 && specialChars.includes(btnValue)) {
      return;
    }

    // Prevent pressing 2 special chars in a row
    if (
      specialChars.includes(result.split(' ').join('').at(-1)) &&
      specialChars.includes(btnValue)
    ) {
      return;
    }

    // Make sure only a special char follows a 0 if a 0 is the only thing there
    // if (
    //   result.length === 1 &&
    //   result === '0' &&
    //   !specialChars.includes(btnValue)
    // ) {
    //   return;
    // }
    const lastNumber = result.split(/[+\-*/]/).at(-1); // Get the last number
    if (
      /^0\d/.test(lastNumber + btnValue) && // Matches a leading zero followed by other digits
      btnValue !== '.' // Allow decimals like "0.1"
    ) {
      return;
    }

    // Prevent 2 decimal points being in the same number
    if (
      btnValue === '.' &&
      result
        .split(/[+\-*/]/)
        .at(-1)
        .includes('.')
    ) {
      return;
    }
    // ---------------- EARLY RETURNS END ----------------

    // Adding space around operator characters
    if (specialChars.includes(btnValue) && btnValue !== '.') {
      setResult(result => result + ` ${btnValue} `);
    } else {
      setResult(result => result + btnValue);
    }
  }

  // Function to clear result
  function clearResult() {
    // ---------------- EARLY RETURNS START ----------------
    if (result.length === 0) return;
    // ---------------- EARLY RETURNS END ----------------

    setResult('');
  }

  // Function to delete last result
  function deleteLastResult() {
    // ---------------- EARLY RETURNS START ----------------
    // Don't need to delete nothing
    if (result.length === 0) return;

    if (isAnswered) {
      clearResult();
      return;
    }
    // ---------------- EARLY RETURNS END ----------------

    if (result.at(-1) === ' ') {
      setResult(result => [...result].slice(0, -3).join('')); // To account for spacing around special chars
    } else {
      setResult(result => [...result].slice(0, -1).join(''));
    }
  }

  // Function to calculate result answer
  function calculateResult() {
    // ---------------- EARLY RETURNS START ----------------
    if (result.at(-1) === ' ') return;

    if (
      ![...result].some(char => {
        return specialChars.includes(char);
      })
    ) {
      return;
    }
    // ---------------- EARLY RETURNS END ----------------

    const numbers = result.match(/\d*\.?\d+/g).map(Number);
    const operators = result.match(/[+\-*/]/g);

    const answer = numbers.reduce((acc, cur, i) => {
      if (i === 0) return cur;

      switch (operators[i - 1]) {
        case '+':
          return acc + cur;
        case '-':
          return acc - cur;
        case '*':
          return acc * cur;
        case '/':
          return acc / cur;
        default:
          return null;
      }
    }, 0);

    setResult(answer.toString());
    setHistory(history => [...history, `${result} = ${answer}`]);
    setIsAnswered(true);
  }

  // Function to toggle history screen
  function toggleHistory() {
    setIsHistory(history => !history);
  }

  return (
    <div className={`calc_wrapper ${!isHistory ? 'width--100' : ''}`}>
      <div className="calc">
        <Results result={result} />

        <div className="buttons">
          <div>
            <Button onClick={clearResult} bgColor="var(--red)">
              C
            </Button>
            <Button onClick={deleteLastResult} bgColor="var(--yellow)">
              <i className="fa-solid fa-delete-left"></i>
            </Button>
            <Button onClick={toggleHistory} bgColor="var(--blue)">
              H
            </Button>
            <Button onClick={appendResult}>/</Button>
          </div>
          <div>
            <Button onClick={appendResult}>7</Button>
            <Button onClick={appendResult}>8</Button>
            <Button onClick={appendResult}>9</Button>
            <Button onClick={appendResult}>*</Button>
          </div>
          <div>
            <Button onClick={appendResult}>4</Button>
            <Button onClick={appendResult}>5</Button>
            <Button onClick={appendResult}>6</Button>
            <Button onClick={appendResult}>-</Button>
          </div>
          <div>
            <Button onClick={appendResult}>1</Button>
            <Button onClick={appendResult}>2</Button>
            <Button onClick={appendResult}>3</Button>
            <Button onClick={appendResult}>+</Button>
          </div>
          <div>
            <Button onClick={appendResult}>0</Button>
            <Button onClick={appendResult}>.</Button>
            <Button
              onClick={calculateResult}
              bgColor="var(--green)"
              style={{ flex: 1 }}
            >
              =
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
