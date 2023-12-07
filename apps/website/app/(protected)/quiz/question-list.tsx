"use client";


export default function QuestionList({
  questions,
  startId,
  setDataArray,
  dataArray,
  setAnsweredAllQuestions,
  answeredAllQuestions,
  setLoading,
  position,
  photo,
}: QuestionListProps) {
  const [nextId, setNextId] = useState<number | null>(null);
  const [prevId, setPrevId] = useState<number | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(startId);
  const router = useRouter();
  const [options, setOptions] = useState<string>([]);
  const [requirement, setRequirement] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showOkeyMessage, setShowOkeyMessage] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      scrolltoHash(`${currentId}`);
    }, 100);

    const currentQuestion = questions.findIndex(
      (question) => question.id == currentId
    );

    setNextId(
      currentQuestion != questions.length - 1
        ? questions[currentQuestion + 1]?.id
        : null
    );
    setPrevId(currentQuestion != 0 ? questions[currentQuestion - 1]?.id : null);
  }, [currentId]);

  useEffect(() => {
    if (nextId == 1) {
      setAnsweredAllQuestions(true);
    }
  }, [nextId]);

  useEffect(() => {
    const sendData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/addAnswers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataArray),
        });

        if (response.ok) {
          const data = await response.json();
          setTimeout(() => {
            setLoading(false);
          }, 1000);
          router.push(`/antworten/${data.post_id}`);
        } else {
          const errorData = await response.json();
          console.error(
            "Veri yüklenirken bir hata oluştu:",
            errorData.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Bir hata oluştu:", error);
      }
    };

    if (answeredAllQuestions) {
      sendData();
    }
  }, [answeredAllQuestions]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await fetch("/api/options");
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("An error occurred while retrieving data.");
      }
    }
    fetchOptions();
  }, []);

  useEffect(() => {
    setShowErrorMessage(false);
    setShowOkeyMessage(false);
    setTimeout(() => {
      setInputValue("");
    }, 300);
  }, [currentId]);

  return (
    <>
      {questions.map((question, index) => (
        <Question
          nextId={nextId}
          key={index}
          prefix={index + 1}
          {...question}
          questions={questions[index]}
          questionsArray={questions}
          dataArray={dataArray}
          options={options}
          prevId={prevId}
          setDataArray={setDataArray}
          setCurrentId={setCurrentId}
          setRequirement={setRequirement}
          requirement={requirement}
          setShowErrorMessage={setShowErrorMessage}
          showErrorMessage={showErrorMessage}
          showOkeyMessage={showOkeyMessage}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      ))}
      <div className="flex w-full">
        <div
          className={
            photo
              ? position == "right"
                ? "md:block md:w-[46%] lg:w-[52%] 2xl:w-[50%] fixed bottom-2 right-2"
                : "fixed bottom-2 right-2"
              : "fixed bottom-2 right-2"
          }
        >
          <div className="flex">
            <button
              onClick={() => setCurrentId(prevId)}
              disabled={prevId === null}
              className={cn(
                "bg-blue-500 text-white p-2 rounded-l-lg flex items-center justify-center relative group",
                !prevId && "bg-gray-300"
              )}
            >
              <span className="ml-1 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity">
                <ChevronUpIcon size={24} />
              </span>
              <span className="opacity-100 transition-opacity">Zurück</span>
            </button>
            <button
              onClick={() => {
                if (requirement === false && nextId != null) {
                  setCurrentId(nextId);
                } else if (dataArray[nextId - 2]) {
                  setCurrentId(nextId);
                } else if (showErrorMessage && !(inputValue == "")) {
                  setShowOkeyMessage(true);
                } else if (requirement === true) {
                  setShowErrorMessage(true);
                }
              }}
              className={cn(
                "bg-blue-500 text-white p-2 rounded-r-lg flex items-center justify-center relative group",
                !nextId && "bg-gray-300"
              )}
            >
              <span className=" transition-opacity">Weiter</span>
              <span className="mr-1 opacity-0 group-hover:opacity-100 hidden group-hover:block transition-opacity">
                <ChevronDownIcon size={24} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
