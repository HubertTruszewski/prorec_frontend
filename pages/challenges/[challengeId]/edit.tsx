import {
  ChallengeDTO,
  ChallengeType,
  LanguageName,
} from "../../../Challenge.dto";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useRouter } from "next/router";
import { Button, Card, MenuItem, Select, TextField } from "@mui/material";
import { TestCaseDTO, TestCaseIdDTO } from "../../../TestCase.dto";
import { authHeader } from "../../../services/authHeader";
import { AuthService } from "../../../services/AuthService";
import { CreateChallengeDTO } from "../../../CreateChallenge.dto";

export default function Edit() {
  const router = useRouter();
  const [testCaseList, setTestCaseList] = useState<TestCaseIdDTO[]>([]);
  const [currentChallenge, setCurrentChallenge] =
    useState<ChallengeDTO>(defaultChallengeDTO);
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [difficulty, setDifficulty] = useState<ChallengeType>(
    ChallengeType.EASY
  );
  const [description, setDescription] = useState<string>("");
  const [language, setLanguage] = useState<LanguageName>(
    LanguageName.JAVASCRIPT
  );
  const [exampleTestCases, setExampleTestCases] = useState<string>("");
  const [testExpression, setNewTestExpression] = useState<string>("");
  const [outputType, setOutputType] = useState<string>("");
  const [expectedResult, setExpectedResult] = useState<string>("");
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [challengeId, setChallengeId] = useState<number>(-1);
  const id = parseInt(router.query.challengeId! as string);

  const fetchChallenge = () => {
    const url = "/api/challenge/" + id;
    fetch(url, { headers: authHeader() })
      .then((data) => data.json())
      .then((challenge) => {
        console.log(challenge);
        setCurrentChallenge(challenge);
        setLanguage(challenge.language);
        setCode(challenge.codeSnippet);
        setName(challenge.name);
        setDescription(challenge.description);
        setExampleTestCases(challenge.exampleTestCases);
        setDifficulty(challenge.type);
        setChallengeId(id);
      });
  };

  const fetchTestCases = () => {
    const url = "/api/challenge/" + id + "/testCases";

    fetch(url, { headers: authHeader() })
      .then((data) => data.json())
      .then((testCaseList) => {
        setTestCaseList(testCaseList);
      });
  };

  const postEditedChallenege = () => {
    const url = "/api/challenge/" + id;
    const challenge: CreateChallengeDTO = {
      name: name,
      description: description,
      codeSnippet: code,
      type: difficulty,
      exampleTestCases: exampleTestCases,
      language: language,
    };
    console.log(challenge);
    fetch(url, {
      method: "PUT",
      headers: {
        ...authHeader(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(challenge),
    });
  };

  const getData = () => {
    fetchChallenge();
    fetchTestCases();
  };

  useEffect(() => {
    if (AuthService.protectSite(router)) {
      return;
    }
    if (id !== undefined && !Number.isNaN(id)) {
      getData();
    }
  }, [id]);

  const codeChangeHandler = (newCode: string | undefined) => {
    setCode(newCode ?? "");
  };

  const addTestCaseHandler = () => {
    const testCase: TestCaseDTO = {
      challengeId: challengeId,
      expression: testExpression,
      expectedValue: expectedResult,
      expectedValueType: outputType,
    };
    console.log(testCase);
    fetch("/api/challenge/addTestCase", {
      method: "POST",
      headers: {
        ...authHeader(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testCase),
    }).then(() => {
      fetchTestCases();
    });
    setDisplayForm(false);
  };

  const newTestCaseHandler = () => {
    setDisplayForm(true);
  };

  return (
    <>
      <div>
        <div style={{ height: "40vh" }}>
          <Card
            sx={{
              borderRadius: "20px",
              paddingY: "5px",
              paddingX: "20px",
              marginLeft: "6vw",
              marginTop: "3vh",
              borderColor: "black",
              height: "38vh",
              width: "54rem",
              float: "left",
            }}
          >
            <form>
              <TextField
                sx={{
                  width: "15rem",
                  marginX: "1rem",
                  marginY: "1rem",
                  float: "left",
                }}
                label="Name"
                id="outlined-size-small"
                value={name}
                onChange={(event) => {
                  setName((event.target as HTMLInputElement).value);
                }}
              />
              <Select
                labelId="select-difficulty"
                id="difficulty"
                value={difficulty}
                label="Difficulty"
                onChange={(event) => {
                  setDifficulty(
                    ChallengeType[
                      event.target.value as keyof typeof ChallengeType
                    ]
                  );
                }}
                sx={{
                  width: "15rem",
                  marginX: "1rem",
                  marginY: "1rem",
                  float: "left",
                }}
              >
                <MenuItem value={"EASY"}>Easy</MenuItem>
                <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                <MenuItem value={"HARD"}>Hard</MenuItem>
              </Select>
              <Select
                labelId="select-difficulty"
                id="difficulty"
                value={language}
                label="Language"
                onChange={(event) => {
                  setLanguage(
                    LanguageName[
                      event.target.value as keyof typeof LanguageName
                    ]
                  );
                }}
                sx={{
                  width: "15rem",
                  marginX: "1rem",
                  marginY: "1rem",
                  float: "left",
                }}
              >
                <MenuItem value={"PYTHON"}>Python</MenuItem>
                <MenuItem value={"JAVASCRIPT"}>Javascript</MenuItem>
              </Select>
              <TextField
                sx={{
                  width: "49rem",
                  marginX: "1rem",
                  marginTop: "1rem",
                  float: "left",
                }}
                id="outlined-size-small"
                label="Description"
                rows="4"
                multiline={true}
                value={description}
                onChange={(event) => {
                  setDescription((event.target as HTMLInputElement).value);
                }}
              />
              <TextField
                sx={{
                  width: "49rem",
                  marginX: "1rem",
                  marginY: "1rem",
                  float: "left",
                }}
                id="outlined-size-small"
                label="Example test cases"
                rows="2"
                multiline={true}
                value={exampleTestCases}
                onChange={(event) => {
                  setExampleTestCases((event.target as HTMLInputElement).value);
                }}
              />
            </form>
          </Card>

          <Card
            sx={{
              borderRadius: "20px",
              marginTop: "3vh",
              marginRight: "6vw",
              padding: "2rem",
              borderColor: "black",
              width: "40rem",
              height: "77vh",
              float: "right",
            }}
          >
            <h2>Test Cases: </h2>
            <ol>
              {testCaseList.length != 0 &&
                testCaseList.map((testCase) => {
                  console.log(testCase);
                  return (
                    <li key={testCase.testCaseId}>
                      <span
                        style={{
                          fontWeight: "700",
                          fontSize: "1.3rem",
                          color: "#BA53FF",
                        }}
                      >
                        Test expression:
                      </span>{" "}
                      {testCase.expression}
                      <br />
                      <span style={{ fontWeight: "700" }}>
                        {" "}
                        Result type:
                      </span>{" "}
                      {testCase.expectedValueType}
                      <br />
                      <span style={{ fontWeight: "700" }}>
                        Expected value:
                      </span>{" "}
                      {testCase.expectedValue}
                      <br />
                      <br />
                    </li>
                  );
                })}
            </ol>
            <span onClick={newTestCaseHandler} style={{ fontSize: "3rem" }}>
              +
            </span>
            {displayForm && (
              <form>
                <TextField
                  sx={{
                    width: "32rem",
                    marginX: "15px",
                    marginY: "15px",
                    float: "left",
                  }}
                  id="outlined-basic"
                  label="Expression"
                  variant="outlined"
                  onInput={(event) => {
                    setNewTestExpression(
                      (event.target as HTMLInputElement).value
                    );
                  }}
                />
                <Select
                  labelId="select-difficulty"
                  id="difficulty"
                  value={outputType}
                  label="Difficulty level"
                  onChange={(event) => {
                    setOutputType(event.target.value);
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
              marginLeft: "6vw",
              marginTop: "2vh",
              borderColor: "black",
              float: "left",
              height: "38vh",
              width: "54rem",
            }}
          >
            <Editor
              height="58vh"
              width="65rem"
              theme="vs-dark"
              value={code}
              language={language.toLowerCase()}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              onChange={(value) => codeChangeHandler(value)}
            />
          </Card>
        </div>

        <div
          style={{
            marginLeft: "50rem",
            marginRight: "50rem",
            clear: "both",
            textAlign: "center",
          }}
        >
          <button
            style={{
              marginTop: "40px",
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #BA53FF",
              boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
              border: "none",
              borderRadius: "20px",
              width: "12rem",
              height: "2.5rem",
              fontSize: "17px",
            }}
            onClick={postEditedChallenege}
          >
            Submit Changes
          </button>
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
