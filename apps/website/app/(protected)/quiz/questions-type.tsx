"use client";

import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import ReactStars from "react-stars";
import { Calendar } from "primereact/calendar";
import { format } from "date-fns";
import { startOfMonth } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RightSVG from "./svg/right";
const QuestionsType = ({
  prefix,
  questions,
  options,
  setInputValue,
  inputValue,
  error,
  setRequirement,
  prevId,
  questionsArray,
  dataArray,
  requirement,
}: QuestionProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueArray, setSelectedValueArray] = useState([]);
  const [inputValueMoney, setInputValueMoney] = useState("");
  const [defaultDate, setDefaultDate] = useState();
  const [inputErrors, setInputErrors] = useState(
    new Array(options.length).fill(false)
  );
  const [multiInputValue, setMultiInputValue] = useState(
    new Array(options.length).fill("")
  );
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState([]);

  const optionsArray = [1, 2, 3, 4, 5, 6];
  useEffect(() => {
    setRequirement(questionsArray[prevId || 0].required);
    dataArray.map((item) => {
      if (item.id - 1 == [prevId + 1]) {
        setRequirement(false);
      }
    });
  }, [inputValue, prevId]);

  if (questions.type === "input-money") {
    useEffect(() => {
      setInputValue(inputValueMoney + selectedValue);
      if (
        inputValue[0] == "€" ||
        inputValue[0] == "$" ||
        inputValue[0] == "£"
      ) {
        setInputValue(inputValue.slice(1));
      }
    }, [selectedValue, inputValueMoney]);
  }
  const handleDateChange = (e) => {
    if (format(e.value, "MMMM yyyy")) {
      setDefaultDate(e.value);
      setInputValue(format(e.value, "MMMM yyyy"));
    } else null;
  };
  /*
  const handleMultiInputChange = (e, index) => {
    const updatedMultiInputValue = [...multiInputValue];
    updatedMultiInputValue[index] = e.target.value;
    setMultiInputValue(updatedMultiInputValue);
  };
*/

  const handleMultiInputChange = (e, index) => {
    const userInput = e.target.value;
    if (userInput === "") {
      const updatedMultiInputValue = [...multiInputValue];
      updatedMultiInputValue[index] = e.target.value;
      setMultiInputValue(updatedMultiInputValue);
      const updatedInputErrors = [...inputErrors];
      updatedInputErrors[index] = false;
      setInputErrors(updatedInputErrors);
      return;
    }
    const numericValue = parseFloat(userInput);
    if (!isNaN(numericValue)) {
      if (numericValue >= 1 && numericValue <= 100) {
        const updatedMultiInputValue = [...multiInputValue];
        updatedMultiInputValue[index] = numericValue;
        setMultiInputValue(updatedMultiInputValue);

        const updatedInputErrors = [...inputErrors];
        updatedInputErrors[index] = false;
        setInputErrors(updatedInputErrors);
      } else {
        const updatedInputErrors = [...inputErrors];
        updatedInputErrors[index] = true;
        setInputErrors(updatedInputErrors);
      }
    } else {
      const updatedInputErrors = [...inputErrors];
      updatedInputErrors[index] = true;
      setInputErrors(updatedInputErrors);
    }
  };

  useEffect(() => {
    if (questions.type === "input-money-multi") {
      if (true) {
        const combinedValues = options.map((item, index) => {
          const inputValueStart = selectedValue;
          const value = multiInputValue[index];

          if (value !== undefined) {
            return {
              currency: inputValueStart,
              amount: value,
              value: item.value,
            };
          }

          return {};
        });
        const filteredCombinedValues = combinedValues.filter(
          (item) => Object.keys(item).length !== 0
        );

        const inputValueJSON = JSON.stringify(filteredCombinedValues);
        setInputValue(inputValueJSON);
      }
    }
  }, [selectedValue, multiInputValue]);

  const handleTextareaChange = (e, questionId) => {
    const newAnswers = { ...answers };
    newAnswers[questionId] = e.target.value;
    setAnswers(newAnswers);
    setInputValue(e.target.value);
  };
  const handleCheckboxChange = (optionValue) => {
    const isOptionSelected = checkboxValues.includes(optionValue);

    let updatedValues;
    if (isOptionSelected) {
      updatedValues = checkboxValues.filter((value) => value !== optionValue);
      setCheckboxValues(updatedValues);
    } else {
      updatedValues = [...checkboxValues, optionValue];
      setCheckboxValues(updatedValues);
    }
    setInputValue(updatedValues.join(","));
  };

  return (
    <div>
      {questions.type == "input" && (
        <div className="mt-10">
          <Input
            value={answers[questions.id] || ""}
            onChange={(e) => handleTextareaChange(e, questions.id)}
            error={error}
            placeholder="Geben Sie hier Ihre Antwort ein..."
          />
        </div>
      )}
      {questions.type == "input-money" && (
        <div className="mt-10 flex flex-row flex-wrap">
          <Input
            value={inputValueMoney}
            onChange={(e) => {
              const userInput = e.target.value;
              if (/^[0-9]*$/.test(userInput)) {
                setInputValueMoney(userInput);
              }
            }}
            error={error}
            placeholder="Geben Sie den Geldbetrag ein"
          />
          <Select onValueChange={setSelectedValue}>
            <SelectTrigger className="w-[180px] mr-3">
              <SelectValue placeholder={"Wählen"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="$">Dollar($)</SelectItem>
              <SelectItem value="£">Pound(£)</SelectItem>
              <SelectItem value="€">Euro(€)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {questions.type === "input-money-multi" && (
        <>
          {options.map((item, index) =>
            item.questionId === prefix ? (
              <div className="mt-10 flex items-center " key={index}>
                <span className="text-2xl flex text-black  items-center font-semibold">
                  <p>{item.value}</p>
                  <p>
                    <RightSVG />
                  </p>
                </span>
                <div>
                  <Input
                    className="h-[32px]"
                    type="number"
                    value={multiInputValue[index]}
                    onChange={(e) => {
                      const userInput = e.target.value;
                      if (/^[0-9]*\.?[0-9]{0,3}$/.test(userInput)) {
                        handleMultiInputChange(e, index);
                      }
                    }}
                    error={inputErrors[index]}
                    placeholder="Geben Sie hier Ihre Antwort ein..."
                  />
                  {inputErrors[index] && (
                    <span className="text-md block md:block md:text-xs  text-red-600 mt-1">
                      Bitte geben Sie einen Wert zwischen 1 und 100 ein.
                    </span>
                  )}
                </div>
              </div>
            ) : null
          )}
        </>
      )}
      {questions.type == "radio" && (
        <div className="mt-10">
          <RadioGroup>
            {options.map((item, index) =>
              item.questionId == prefix ? (
                <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem
                    value={`${item.value}`}
                    id={`option-${index}`}
                    onClick={() => setInputValue(item.value)}
                  />
                  <Label htmlFor={`option-${index}`}>{item.value}</Label>
                </div>
              ) : null
            )}
          </RadioGroup>
        </div>
      )}

      {questions.type === "checkbox" && (
        <div>
          {options.map(
            (item, index) =>
              item.questionId === prefix && (
                <div className="items-top flex space-x-2 my-2" key={index}>
                  <Checkbox
                    id={`checkbox-${index}`}
                    checked={checkboxValues.includes(item.value)}
                    onClick={() => handleCheckboxChange(item.value)}
                    error={error}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={`checkbox-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.value}
                    </label>
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {questions.type === "textarea" && (
        <div className="grid w-full gap-1.5">
          <Textarea
            value={answers[questions.id] || ""}
            onChange={(e) => handleTextareaChange(e, questions.id)}
            error={error}
            placeholder="Geben Sie hier Ihre Antwort ein..."
            id="message"
          />
        </div>
      )}

      {questions.type === "slider" && (
        <div>
          <ReactStars
            count={6}
            size={40}
            color2={"#ffd700"}
            half={false}
            value={inputValue}
            onChange={(inputValue) => setInputValue(inputValue.toString())}
          />
          {inputValue > "0" && (
            <span className="text-sm text-gray-400">
              <span>Ausgewählte Partitur: </span>
              {inputValue}
            </span>
          )}
        </div>
      )}
      {questions.type == "radio-slider" && (
        <div className="mt-10 flex flex-col">
          <RadioGroup className="flex flex-row flex-wrap ">
            {optionsArray.map((value, index) => (
              <div className="flex items-center space-x-2 mr-5 " key={index}>
                <RadioGroupItem
                  value={`${value}`}
                  id={`${questions.id}-option-${index}`}
                  onClick={() => setInputValue(value.toString())}
                />
                <Label htmlFor={`${questions.id}-option-${index}`}>
                  {value}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {questions.type === "calendar" && (
        <div className="flex ">
          <Calendar
            id="monthpicker"
            value={defaultDate}
            onChange={handleDateChange}
            view="month"
            dateFormat="mm/yy"
            minDate={startOfMonth(new Date(2014, 0))}
            maxDate={new Date()}
            placeholder="Datum auswählen"
          />
        </div>
      )}
    </div>
  );
};

export default QuestionsType;
