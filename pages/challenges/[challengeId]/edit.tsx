import {ChallengeDTO, ChallengeType, LanguageName,} from "../../../Challenge.dto";
import {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import {useRouter} from "next/router";
import {Button, Card, MenuItem, Select, TextField} from "@mui/material";
import {TestCaseDTO, TestCaseIdDTO} from "../../../TestCase.dto";

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
        fetch(url)
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

        fetch(url)
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
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testCase),
        }).catch();
        setDisplayForm(false);
        fetchTestCases();
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
                            paddingX: "10px",
                            marginX: "3rem",
                            marginY: "2vh",
                            borderColor: "black",
                            heightMax: "18vh",
                            width: "65rem",
                            float: "left",
                        }}
                    >
                        <h1 style={{marginTop: "0px"}}>
                          <span style={{color: "purple", fontWeight: "bold"}}>
                            {currentChallenge?.name}
                          </span>
                        </h1>
                        <ul>
                            <li>
                                <span style={{color: "purple", fontWeight: "bold"}}>
                                  Task:
                                </span>{" "}
                                {currentChallenge?.description}
                            </li>
                            <li>
                                <span style={{color: "purple", fontWeight: "bold"}}>
                                  Programming language:
                                </span>{" "}
                                {currentChallenge?.language}
                            </li>
                            <li>
                                <span style={{color: "purple", fontWeight: "bold"}}>
                                  Difficulty level:
                                </span>
                                {" " + currentChallenge?.type}
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
                        <div style={{color: "purple", fontWeight: "bold"}}>
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
                                                color: "purple",
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
                                        marginX: "1rem",
                                        marginY: "1rem",
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
                    style={{marginLeft: "50rem", marginRight: "50rem", clear: "both"}}
                >
                    <Button
                        sx={{paddingY: "10px", paddingX: "20px", borderRadius: "15px"}}
                        variant="outlined"
                    >
                        Submit Changes
                    </Button>
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
