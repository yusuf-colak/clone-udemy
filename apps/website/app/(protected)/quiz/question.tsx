"use client";

import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";

import QuestionsType from "./questions-type";

export default function Question({
  prefix,
  questionNumber,
  question,
  description,
  nextId,
  setCurrentId,
  setDataArray,
  dataArray,
  questions,
  options,
  setRequirement,
  prevId,
  questionsArray,
  requirement,
  showErrorMessage,
  setShowErrorMessage,
  photo,
  id,
  showOkeyMessage,
  setInputValue,
  inputValue,
}: QuestionProps) {
  const [error, setError] = useState<string | undefined>();
  const answerIndex = dataArray.findIndex(
    (item) => item.questionNumber === questionNumber
  );

  useEffect(() => {
    if (answerIndex !== -1) {
      setInputValue(dataArray[answerIndex].answer);
    }
  }, [answerIndex]);

  const verifyAnswer = () => {
    if (requirement == true && inputValue == "" && !dataArray[nextId - 2]) {
      setShowErrorMessage(true);
    } else {
      if (inputValue.trim() !== "") {
        const newData = { questionNumber, answer: inputValue };
        if (answerIndex !== -1) {
          const updatedDataArray = [...dataArray];
          updatedDataArray[answerIndex] = newData;
          setDataArray(updatedDataArray);
        } else {
          setDataArray([...dataArray, newData]);
        }
      }
      if (nextId === null) {
        setCurrentId(null);
      } else {
        setCurrentId(nextId);
      }
    }
  };
  return (
    <section
      id={`${id}`}
      className="w-full h-screen md:p-32 p-12  flex flex-col justify-center snap-start"
    >
      <div className="flex items-center relative">
        <div className="absolute -left-8 text-brand-500 text-sm flex items-center space-x-1">
          <span>{prefix}</span>
          <ArrowRight className="w-3 h-3 font-bold" />
        </div>
        <h2 className="text-xl sm:text-2xl">{question}</h2>
      </div>

      <div className="mt-2">
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <QuestionsType
        questions={questions}
        options={options}
        prefix={prefix}
        setInputValue={setInputValue}
        inputValue={inputValue}
        error={error}
        setRequirement={setRequirement}
        prevId={prevId}
        questionsArray={questionsArray}
        dataArray={dataArray}
        requirement={requirement}
      />

      <div>
        {showErrorMessage &&
          requirement == true &&
          showOkeyMessage == false && (
            <span className="text-md block md:block md:text-xs  text-red-600 mt-1">
              Pflichtfrage
            </span>
          )}
        {showOkeyMessage && !(inputValue == "") ? (
          <span className="text-md block md:block md:text-xs  text-red-600 mt-1">
            Drücken Sie die OK-Taste
          </span>
        ) : null}
      </div>
      <div className="mt-8 flex items-center space-x-3 sm:justify-start justify-center">
        <button
          onClick={() => {
            verifyAnswer();
          }}
          className={cn(
            "bg-blue-500 text-white px-5 py-3 rounded-md flex items-center"
          )}
        >
          {nextId ? (
            <>
              <span>Ok</span>
              <Check className="w-5 h-5 ml-2" />
            </>
          ) : (
            <span>Senden</span>
          )}
        </button>
        <span className="text-xs hidden md:block">
          {nextId ? "Drücken Sie Enter" : "Drücken Sie Cmd + Enter"}
        </span>
      </div>
    </section>
  );
}
