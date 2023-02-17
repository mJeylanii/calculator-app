import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Calculator.css";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [result, setResult] = useState("0");
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("0");
  const [operator, setOperator] = useState("");
  const btnRef = useRef(null);

  const handleNumClick = (e) => {
    //Don't allow multiple 0's
    if (e.target.value === "0" && currentValue === "0") {
      return;
    }
    //Don't allow multiple decimals
    if (e.target.value === "." && currentValue.includes(".")) {
      return;
    }
    setCurrentValue(currentValue + e.target.value);
    setDisplayValue(
      currentValue ? currentValue + e.target.value : e.target.value
    );
  };

  const handleOperatorClick = (e) => {
    if (operator != "" && e.target.value === "-" && currentValue === "") {
      currentValue === "" ? setCurrentValue("-") : setCurrentValue("");
      return;
    }
    if ((currentValue === "" || currentValue == "-") && operator !== "") {
      setCurrentValue("");
      setOperator(e.target.value);
      return;
    }

    if (operator !== "") {
      setOperator(e.target.value);
      setResult(calculateResult());
      setCurrentValue("");
      return;
    }
    if (currentValue === "" && operator !== "") {
      setOperator(e.target.value);
      return;
    }
    if (currentValue !== "" && result !== "0") {
      console.log("here");
      setOperator(e.target.value);
      console.log(e.target.value);
      setResult(calculateResult());
      setCurrentValue("");
      console.log(result);
      return;
    }

    if (operator === "") {
      setPreviousValue(currentValue);
      setResult(calculateResult());
      setCurrentValue("");
      setOperator(e.target.value);
    }
  };

  function handleEqualClick() {
    setResult(calculateResult());
    setCurrentValue("");
    setOperator("");
  }

  function handleClearClick() {
    setDisplayValue("0");
    setPreviousValue("");
    setCurrentValue("");
    setOperator("");
    setResult("0");
  }

  function calculateResult() {
    const leftOperand = parseFloat(result !== "0" ? result : previousValue);
    const rightOperand = parseFloat(currentValue);
    console.log(leftOperand, rightOperand);
    switch (operator) {
      case "+":
        return (leftOperand + rightOperand).toString();
      case "-":
        return (leftOperand - rightOperand).toString();
      case "*":
        return (leftOperand * rightOperand).toString();
      case "/":
        return (leftOperand / rightOperand).toString();
      default:
        return result;
    }
  }
  useEffect(() => {
    setDisplayValue(result !== "" ? result : currentValue);
    setPreviousValue(result);
  }, [result]);

  return (
    <div className="container w-80 h-3/4 bg-neutral-700 shadow-xl rounded-md p-3 border border-neutral-600">
      <div className="text-3xl bg-neutral-700 text-neutral-100 rounded-md shadow-lg ">
        <input
          id="display"
          className="display p-3 text-end w-full h-full  "
          type="text"
          value={displayValue}
          disabled
        />
      </div>
      <div className="container ">
        <div className="flex  text-2xl gap-1 mb-2">
          <button
            id="clear"
            className={"rounded bg-zinc-600 shadow-lg p-2 w-full font-semibold"}
            onClick={handleClearClick}
          >
            AC
          </button>
          <button
            ref={btnRef}
            id="add"
            className="rounded shadow-lg p-2 w-20 bg-zinc-600"
            value="+"
            onClick={handleOperatorClick}
          >
            +
          </button>
          <button
            id="subtract"
            className="rounded bg-zinc-600 shadow-lg p-1 w-20"
            value="-"
            onClick={handleOperatorClick}
          >
            -
          </button>
        </div>
        <div className="flex flex-row  content-center justify-center">
          <div className="grid grid-cols-3 gap-6 text-3xl w-full">
            <button
              id="one"
              className="w-3/4 rounded hover:bg-gray-300/50 rounded"
              value="1"
              onClick={handleNumClick}
            >
              1
            </button>

            <button
              id="two"
              className="w-3/4 hover:bg-gray-300/50 rounded"
              value="2"
              onClick={handleNumClick}
            >
              2
            </button>

            <button
              id="three"
              className="w-3/4 hover:bg-gray-300/50 rounded "
              value="3"
              onClick={handleNumClick}
            >
              3
            </button>

            <button
              id="four"
              className="w-3/4 hover:bg-gray-300/50 rounded "
              value="4"
              onClick={handleNumClick}
            >
              4
            </button>

            <button
              id="five"
              className="w-3/4 hover:bg-gray-300/50 rounded"
              value="5"
              onClick={handleNumClick}
            >
              5
            </button>

            <button
              id="six"
              className="w-3/4 hover:bg-gray-300/50 rounded"
              value="6"
              onClick={handleNumClick}
            >
              6
            </button>

            <button
              id="seven"
              className="w-3/4 hover:bg-gray-300/50 rounded"
              value="7"
              onClick={handleNumClick}
            >
              7
            </button>

            <button
              id="eight"
              className="w-3/4 hover:bg-gray-300/50 rounded"
              value="8"
              onClick={handleNumClick}
            >
              8
            </button>

            <button
              id="nine"
              className="w-3/4 hover:bg-gray-300/50 rounded"
              value="9"
              onClick={handleNumClick}
            >
              9
            </button>

            <button
              id="zero"
              className="w-3/4 hover:bg-gray-300/50 rounded"
              value="0"
              onClick={handleNumClick}
            >
              0
            </button>

            <button
              id="decimal"
              className="w-3/4 hover:bg-gray-300/50 rounded"
              value="."
              onClick={handleNumClick}
            >
              .
            </button>

            <button
              id="add-subtract"
              className="w-3/4 hover:bg-gray-300/50 rounded"
              value="+/-"
              onClick={handleNumClick}
            >
              +/-
            </button>
          </div>
          <div className="flex flex-col w-16 gap-1">
            <button
              id="multiply"
              className="rounded bg-zinc-600 shadow-lg p-2 h-20"
              value="*"
              onClick={handleOperatorClick}
            >
              x
            </button>
            <button
              id="divide"
              className="rounded bg-zinc-600 shadow-lg p-2 h-20"
              value="/"
              onClick={handleOperatorClick}
            >
              /
            </button>
            <button
              id="equals"
              className="rounded bg-zinc-600 shadow-lg p-2 h-full"
              value="="
              onClick={handleEqualClick}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
