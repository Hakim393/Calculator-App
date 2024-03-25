// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";
import "./NumberButton.css";

export const NumberButton = () => {
  let runningTotal = 0;
  let buffer = "0";
  let previousOperator;

  const screenRef = useRef(null);

  useEffect(() => {
    const handleButtonClick = (event) => {
      buttonClick(event.target.innerText);
    };

    const calcButtons = document.querySelectorAll(".calc-button");
    calcButtons.forEach((button) => {
      button.addEventListener("click", handleButtonClick);
    });

    return () => {
      calcButtons.forEach((button) => {
        button.removeEventListener("click", handleButtonClick);
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function buttonClick(value) {
    if (isNaN(value)) {
      handleSymbol(value);
    } else {
      handleNumber(value);
    }
    screenRef.current.innerText = buffer;
  }

  function handleSymbol(symbol) {
    switch (symbol) {
      case "C":
        buffer = "0";
        runningTotal = 0;
        break;
      case "=":
        if (previousOperator === null) {
          return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = runningTotal;
        runningTotal = 0;
        break;
      case "←":
        if (buffer.length === 1) {
          buffer = "0";
        } else {
          buffer = buffer.substring(0, buffer.length - 1);
        }
        break;
      case "+":
      case "−":
      case "×":
      case "÷":
        handleMath(symbol);
        break;
    }
  }

  function handleMath(symbol) {
    if (buffer === "0") {
      return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
      runningTotal = intBuffer;
    } else {
      flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
  }

  function flushOperation(intBuffer) {
    if (previousOperator === "+") {
      runningTotal += intBuffer;
    } else if (previousOperator === "−") {
      runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
      runningTotal *= intBuffer;
    } else if (previousOperator === "÷") {
      runningTotal /= intBuffer;
    }
  }

  function handleNumber(numberString) {
    if (buffer === "0") {
      buffer = numberString;
    } else {
      buffer += numberString;
    }
  }

  return (
    <div className="wrapper">
      <section ref={screenRef} className="screen">
        0
      </section>

      <section className="calc-buttons">
        <div className="calc-button-row">
          <button className="calc-button double">C</button>
          <button className="calc-button">&larr;</button>
          <button className="calc-button">&divide;</button>
        </div>

        <div className="calc-button-row">
          <button className="calc-button">7</button>
          <button className="calc-button">8</button>
          <button className="calc-button">9</button>
          <button className="calc-button">&times;</button>
        </div>

        <div className="calc-button-row">
          <button className="calc-button">4</button>
          <button className="calc-button">5</button>
          <button className="calc-button">6</button>
          <button className="calc-button">&minus;</button>
        </div>

        <div className="calc-button-row">
          <button className="calc-button">1</button>
          <button className="calc-button">2</button>
          <button className="calc-button">3</button>
          <button className="calc-button">+</button>
        </div>

        <div className="calc-button-row">
          <button className="calc-button triple">0</button>
          <button className="calc-button">=</button>
        </div>
      </section>
    </div>
  );
};
