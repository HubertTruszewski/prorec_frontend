import {ChallengeDTO, ChallengeType, LanguageName,} from "../../../Challenge.dto";
import {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import {useRouter} from "next/router";
import {Button, Card, MenuItem, Select, TextField} from "@mui/material";
import {TestCaseDTO, TestCaseIdDTO} from "../../../TestCase.dto";
import {authHeader} from "../../../services/authHeader";
import {AuthService} from "../../../services/AuthService";

export default function Edit() {
    const router = useRouter();
    const [testCaseList, setTestCaseList] = useState<TestCaseIdDTO[]>([]);
    const [currentChallenge, setCurrentChallenge] =
        useState<ChallengeDTO>(defaultChallengeDTO);
    const [code, setCode] = useState<string>("");
    const [language, setLanguage] = useState<LanguageName>(LanguageName.JAVASCRIPT);
    const [testExpression, setNewTestExpression] = useState<string>("");
    const [outputType, setOutputType] = useState<string>("");
    const [expectedResult, setExpectedResult] = useState<string>("");
    const [displayForm, setDisplayForm] = useState<boolean>(false);
    const [challengeId, setChallengeId] = useState<number>(-1);
    const id = parseInt(router.query.challengeId! as string);

    const fetchChallenge = () => {
        const url = "/api/challenge/" + id;
        console.log("id z get data" + id);
        console.log(url);
        fetch(url, {headers: authHeader()})
            .then((data) => data.json())
            .then((challenge) => {
                setCurrentChallenge(challenge);
                setLanguage(challenge.language);
                setCode(challenge.codeSnippet);
                setChallengeId(id);
            });
    };

    const fetchTestCases = () => {
        const url = "/api/challenge/" + id + "/testCases";

        fetch(url, {headers: authHeader()})
            .then((data) => data.json())
            .then((testCaseList) => {
                setTestCaseList(testCaseList);
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
                <div style={{height: "40vh"}}>
                    <Card
                        sx={{
                            borderRadius: "20px",
                            paddingY: "5px",
                            paddingX: "20px",
                            marginX: "50px",
                            marginTop: "50px",
                            borderColor: "black",
                            height: "13vh",
                            width: "65rem",
                            float: "left",
                        }}
                    >
                        <h1 style={{marginTop: "0px"}}>
                          <span style={{color: "#BA53FF", fontWeight: "bold"}}>
                            {currentChallenge?.name}
                          </span>
                        </h1>
                        <ul>
                            <li>
                                <span style={{color: "#BA53FF", fontWeight: "bold"}}>
                                  Task:
                                </span>{" "}
                                {currentChallenge?.description}
                            </li>
                            <li>
                                <span style={{color: "#BA53FF", fontWeight: "bold"}}>
                                  Programming language:
                                </span>{" "}
                                {currentChallenge?.language}
                            </li>
                            <li>
                                <span style={{color: "#BA53FF", fontWeight: "bold"}}>
                                  Difficulty level:
                                </span>
                                {" " + currentChallenge?.type}
                            </li>
                        </ul>
                    </Card>

                    <Card
                        sx={{
                            borderRadius: "20px",
                            marginRight: "4rem",
                            marginTop: "50px",
                            padding: "2rem",
                            borderColor: "black",
                            width: "40rem",
                            height: "75vh",
                            float: "right",
                        }}
                    >
                        <div style={{color: "#BA53FF", fontWeight: "bold"}}>
                            Example test cases:
                        </div>
                        <span style={{whiteSpace: "pre-line"}}>
                                {currentChallenge?.exampleTestCases}
                        </span>
                        <h2>Test Cases: </h2>
                        <ol>
                            {testCaseList.length != 0 &&
                                testCaseList.map(testCase => {
                                    console.log(testCase);
                                    return <li key={testCase.testCaseId}>
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
                                        <br/>
                                        <span style={{fontWeight: "700"}}>
                                            {" "}
                                            Result type:
                                        </span>{" "}
                                        {testCase.expectedValueType}
                                        <br/>
                                        <span style={{fontWeight: "700"}}>
                                          Expected value:
                                        </span>{" "}
                                        {testCase.expectedValue}
                                        <br/>
                                        <br/>
                                    </li>
                                })}
                        </ol>
                        <span onClick={newTestCaseHandler} style={{fontSize: "3rem"}}>
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
                            marginLeft: "3rem",
                            marginTop: "4vh",
                            borderColor: "black",
                            float: "left",
                            height: "58vh",
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
                    style={{marginLeft: "50rem", marginRight: "50rem", clear: "both", textAlign: 'center'}}
                >
                    <button
                        style={{marginTop: "40px", background: "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #BA53FF",
                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)", border: "none", borderRadius: "20px", width: "12rem", height: "2.5rem", fontSize: "17px"}}
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
