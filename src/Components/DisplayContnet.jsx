import React, { useContext, useEffect, useState, useRef } from "react";
import { TypeContext } from "../Store/TypeContext";

const DisplayContnet = () => {
  const {
    words,
    leftIndex,
    rightIndex,
    currentWord,
    wrongCount,
    isComplete,
    updateCurrentIndex,
    validateWords,
    setStartTime,
    startTime,
    endTime,
  } = useContext(TypeContext);
  const [inputVal, setInputVal] = useState("");
  const [isTestStart, setIsTestStart] = useState(false);
  const inputValRef = useRef(inputVal);
  const wordsToDisplay = words.slice(leftIndex, rightIndex + 1);

  // Update the ref whenever inputVal changes
  useEffect(() => {
    inputValRef.current = inputVal;
  }, [inputVal]);

  const handleKeyDown = (event) => {
    if (event.code === "Space" || event.key === " ") {
      validateWords(inputValRef.current);
      updateCurrentIndex();
      setInputVal("");
    }
  };

  function handleOnChange(event) {
    if (!isTestStart && !startTime) {
      console.log("setStartTime was called");
      setStartTime(Date.now());
      setIsTestStart(true);
    }
    setInputVal(event.target.value);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center h-screen">
      <div>
        {wordsToDisplay.map((word) => (
          <span
            key={word}
            className={`mr-2 ${
              currentWord == word ? "bg-gray-300" : "bg-white"
            } text-[80px]`}
          >
            {word}
          </span>
        ))}
      </div>

      <input
        type="text"
        className="border-2 h-10 w-80"
        onChange={(e) => handleOnChange(e)}
        value={inputVal}
      />
      {isComplete && (
        <div>
          Test Completed !{" "}
          <p>
            Total Accuracy :{" "}
            {((words.length - wrongCount) * 100) / words.length}
          </p>
          <p>StartTime: {startTime}</p>
          <p>EndTime : {endTime}</p>
          <p>{words.length / (endTime - startTime) / 60000}</p>
        </div>
      )}
    </div>
  );
};

export default DisplayContnet;
