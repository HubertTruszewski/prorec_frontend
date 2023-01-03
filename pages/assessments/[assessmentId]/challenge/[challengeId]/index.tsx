import {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import {Button, Card} from "@mui/material";
import {ChallengeDTO, ChallengeType, LanguageName} from "../../../../../Challenge.dto";
import {useRouter} from "next/router";
import {AttemptSummaryDTO} from "../../../../../components/assessments/AttemptSummaryDTO";

export default function () {
    const router = useRouter();
    const challengeId = router.query.challengeId;
    const assessmentId = router.query.assessmentId;
    const [currentChallenge, setCurrentChallenge] =
        useState<ChallengeDTO>(defaultChallengeDTO);
    const [code, setCode] = useState<string>("");
    const [language, setLanguage] = useState<string>("javascript");
    const [testsResults, setTestsResults] = useState<AttemptSummaryDTO | undefined>(undefined);

    const codeChangeHandler = (newCode: string | undefined) => {
        setCode(newCode ?? "");
    };

    useEffect(() => {
        if (challengeId === undefined) {
            return;
        }
        fetch("/api/challenge/" + challengeId)
            .then((data) => {
                return data.json();
            })
            .then((challenge: ChallengeDTO) => {
                setCurrentChallenge(challenge);
                setLanguage(challenge.language);
                setCode(challenge.codeSnippet);
            });
    }, [challengeId]);

    const submitCode = () => {
        fetch("/api/attempt/perform", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                challengeId: currentChallenge.challengeId,
                assessmentId: assessmentId,
                code: code,
            }),
        })
            .then((result) => result.json())
            .then((testsResults: AttemptSummaryDTO) => setTestsResults(testsResults));
    };

    const calculateSuccessRate = () => {
        if (testsResults !== undefined) {
            return Math.round(100 * testsResults?.testPassed / (testsResults?.testFailed + testsResults?.testPassed));
        }
    }

    const getResultsDetails = () => {
        if (testsResults?.syntaxError === true) {
            return <>
                <h3>Error in code!</h3>
                Details: {testsResults.details}
            </>
        }
        return <>
            <ul>
                <li>Test passed: {testsResults?.testPassed}</li>
                <li>Test failed: {testsResults?.testFailed}</li>
            </ul>
            Success rate: {calculateSuccessRate()}%
        </>
    }

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
                            padding: "10px",
                            borderColor: "black",
                            width: "40rem",
                            height: "20vh",
                            float: "right",
                        }}
                    >
                      <span style={{color: "purple", fontWeight: "bold"}}>
                        Example test case:
                      </span>
                        <div style={{whiteSpace: "pre-line"}}>
                            {currentChallenge?.exampleTestCases}
                        </div>
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

                    <Card
                        sx={{
                            borderRadius: "20px",
                            marginRight: "3rem",
                            marginY: "2vh",
                            padding: "10px",
                            borderColor: "black",
                            width: "40rem",
                            height: "20vh",
                            float: "right",
                        }}
                    >
                      <span style={{color: "purple", fontWeight: "bold"}}>
                        Results:
                      </span>
                        <div style={{whiteSpace: "pre-line"}}>
                            {testsResults === undefined ? "Not sent yet" : getResultsDetails()}
                        </div>
                    </Card>
                </div>

                <div
                    style={{marginLeft: "50rem", marginRight: "50rem", clear: "both"}}
                >
                    <Button
                        sx={{paddingY: "10px", paddingX: "20px", borderRadius: "15px"}}
                        variant="outlined"
                        onClick={submitCode}
                    >
                        Submit solution!
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
