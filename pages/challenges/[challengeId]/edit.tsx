import {
  ChallengeDTO,
  ChallengeType,
  LanguageName,
} from "../../../Challenge.dto";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import { Card, Button, TextField, MenuItem, Select } from "@mui/material";
import { TestCaseDTO } from "../../../TestCase.dto";

export default function Home() {
  const router = useRouter();
  const challengeIdS  =  router.query.challengeId;
  const challengeId = challengeIdS?.toString()
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [challengeList, setChallengeList] = useState<ChallengeDTO[]>([]);
  const [currentChallenge, setCurrentChallenge] =
    useState<ChallengeDTO>(defaultChallengeDTO);
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [testResults, setTestResults] = useState<string>("");
  const [testExpression, setNewTestExpresion] = useState<string>("");
  const [outputType, setOutputType] = useState<string>("");
  const [expectedResult, setExpectedResult] = useState<string>("");
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const codeChangeHandler = (newCode: string | undefined) => {
    setCode(newCode ?? "");
  };

  const addTestCaseHandler = () => {
    const testCase: TestCaseDTO = {
      challengeId: parseInt(challengeId),
      expression: testExpression,
      expectedValue: expectedResult,
      expectedValueType: outputType,
    };
    console.log(testCase);
    fetch("/api/challenge/addTestCase", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testCase),
    });
    setDisplayForm(false);
  };

  const newTestCaseHandler = () => {
    setDisplayForm(true);
  };

  useEffect(() => {
    fetch("/api/challenge/all")
      .then((data) => {
        return data.json();
      })
      .then((challengeList) => {
        setChallengeList(challengeList);
        setCurrentChallenge(challengeList[0]);
        setLanguage(challengeList[0].language.toLowerCase());
        setCode(challengeList[0]?.codeSnippet);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentChallenge === undefined) {
      return;
    }
    console.log(currentChallenge);
    setLanguage(currentChallenge.language.toLowerCase());
    setCode(currentChallenge?.codeSnippet);
  }, [currentChallenge]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div>
        <div style={{ height: "40vh" }}>
          <Card
            sx={{
              borderRadius: "20px",
              paddingY: "5px",
              paddingX: "10px",
              marginX: "3rem",
              marginY: "2vh",
              borderColor: "black",
              heightMax: "18vh",
              width: "65rem",
              float: "left",
            }}
          >
            <h1 style={{ marginTop: "0px" }}>
              <span style={{ color: "purple", fontWeight: "bold" }}>
                {currentChallenge?.name}
              </span>
            </h1>
            <ul>
              <li>
                <span style={{ color: "purple", fontWeight: "bold" }}>
                  Task:
                </span>{" "}
                {currentChallenge?.description}
              </li>
              <li>
                <span style={{ color: "purple", fontWeight: "bold" }}>
                  Programming language:
                </span>{" "}
                {currentChallenge?.language}
              </li>
              <li>
                <span style={{ color: "purple", fontWeight: "bold" }}>
                  Difficulty level:
                </span>{" "}
                {currentChallenge?.type.toLowerCase()}
              </li>
            </ul>
          </Card>

          <Card
            sx={{
              borderRadius: "20px",
              marginRight: "3rem",
              marginY: "2vh",
              padding: "2rem",
              borderColor: "black",
              width: "40rem",
              height: "80vh",
              float: "right",
            }}
          >
            <li>
              <span style={{ color: "purple", fontWeight: "bold" }}>
                Example test case:
              </span>{" "}
              {currentChallenge?.exampleTestCases}
            </li>
            <span onClick={newTestCaseHandler} style={{ fontSize: "3rem" }}>
              +
            </span>
            { displayForm &&(
            <form>
              <TextField
                sx={{
                  width: "32rem",
                  marginX: "1rem",
                  marginY: "1rem",
                  float: "left",
                }}
                id="outlined-basic"
                label="Expression"
                variant="outlined"
                onInput={(event) => {
                  setNewTestExpresion((event.target as HTMLInputElement).value);
                }}
              />
              <Select
                labelId="select-difficulty"
                id="difficulty"
                value={outputType}
                label="Difficulty level"
                onChange={(event) => {
                  setOutputType(event.target.value as string);
                }}
                sx={{
                  width: "15rem",
                  marginX: "1rem",
                  float: "left",
                }}
              >
                <MenuItem value={"INTEGER"}>int</MenuItem>
                <MenuItem value={"STRING"}>string</MenuItem>
                <MenuItem value={"BOOLEAN"}>bool</MenuItem>
              </Select>
              <TextField
                sx={{
                  width: "15rem",
                  marginX: "1rem",
                  float: "left",
                }}
                id="outlined-basic"
                label="Expected Result"
                variant="outlined"
                onInput={(event) => {
                  setExpectedResult((event.target as HTMLInputElement).value);
                }}
              />
              <Button onClick={addTestCaseHandler}>Add Test Case</Button>
              <Button onClick={() => setDisplayForm(false)}>Cancel</Button>
            </form>
            )}
          </Card>
          

          <Card
            sx={{
              borderRadius: "20px",
              marginLeft: "3rem",
              marginY: "3vh",
              borderColor: "black",
              float: "left",
            }}
          >
            <Editor
              height="58vh"
              width="65rem"
              theme="vs-dark"
              value={code}
              language={language}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              onChange={(value, ev) => codeChangeHandler(value)}
            />
          </Card>
        </div>

        <div
          style={{ marginLeft: "50rem", marginRight: "50rem", clear: "both" }}
        >
          <Button
            sx={{ paddingY: "10px", paddingX: "20px", borderRadius: "15px" }}
            variant="outlined"
          >
            Submit Changes
          </Button>
        </div>

        <div style={{ color: "blue", fontSize: "20px", float: "left" }}>
          {testResults}
        </div>
      </div>
    </>
  );
}

const defaultChallengeDTO: ChallengeDTO = {
  challengeId: 0,
  codeSnippet: "",
  description: "",
  exampleTestCases: "",
  language: LanguageName.JAVASCRIPT,
  name: "",
  type: ChallengeType.EASY,
};
