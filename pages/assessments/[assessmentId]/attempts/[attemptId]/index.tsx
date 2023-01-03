import React, {useEffect, useState} from "react";
import {Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Editor from "@monaco-editor/react";
import {useRouter} from "next/router";
import {AttemptDTO} from "../../../../../components/assessments/dto/AttemptDTO";
import {ChallengeDTO, ChallengeType, LanguageName} from "../../../../../Challenge.dto";
import {TestResultDTO} from "../../../../../components/assessments/dto/TestResultDTO";

export default function () {
    const router = useRouter();
    const attemptId = router.query.attemptId;
    const [attempt, setAttempt] = useState<AttemptDTO>(defaultAttempt);
    const [challenge, setChallenge] = useState<ChallengeDTO>(defaultChallenge);
    const [testResults, setTestResults] = useState<TestResultDTO[]>([])

    useEffect(() => {
        if (attemptId === undefined) {
            return;
        }
        fetch("/api/attempt/" + attemptId)
            .then(data => data.json())
            .then(attempt => setAttempt(attempt))
    }, [attemptId])

    useEffect(() => {
        if (attempt.attemptId === 0) {
            return;
        }
        fetch("/api/challenge/" + attempt.challengeId)
            .then(data => data.json())
            .then(challenge => setChallenge(challenge))
        fetch("/api/attempt/results/" + attempt.attemptId)
            .then(data => data.json())
            .then(results => setTestResults(results))
    }, [attempt])

    const successRate = Math.round(
        100 * attempt.attemptSummary.testPassed / (attempt.attemptSummary.testFailed + attempt.attemptSummary.testPassed))

    return <>
        <Card sx={{
            borderRadius: "20px",
            marginLeft: "3rem",
            marginY: "2vh",
            padding: "10px",
            borderColor: "black",
            width: "50rem",
            height: "50vh",
            float: "left",
        }}>
            <span style={{color: "purple", fontWeight: "bold"}}>
                <h1>Code</h1>
            </span>
            <Editor
                height={"39vh"}
                value={attempt.submittedCode}
                defaultValue={attempt.submittedCode}
                language={challenge.language.toLowerCase()}
                theme={"vs-dark"}
                options={{
                    readOnly: true,
                    minimap: {
                        enabled: false
                    }
                }}
            />
        </Card>

        <Card sx={{
            borderRadius: "20px",
            marginRight: "3rem",
            marginY: "2vh",
            padding: "10px",
            borderColor: "black",
            width: "50rem",
            height: "20vh",
            float: "right",
        }}>
            <div>
                <span style={{color: "purple", fontWeight: "bold"}}>
                    <h1>Test summary</h1>
                </span>
            </div>
            <div>
                {attempt.codeError ? attempt.codeErrorDetails : <div>
                    <ul>
                        <li>Test passed: {attempt.attemptSummary.testPassed}</li>
                        <li>Test failed: {attempt.attemptSummary.testFailed}</li>
                    </ul>
                    Success rate: {successRate}%
                </div>}
            </div>
        </Card>

        <Card sx={{
            borderRadius: "20px",
            marginRight: "3rem",
            marginY: "2vh",
            padding: "10px",
            borderColor: "black",
            width: "50rem",
            height: "60vh",
            float: "right",
        }}>
            <span style={{color: "purple", fontWeight: "bold"}}>
                <h1>Results details:</h1>
            </span>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Expression</TableCell>
                            <TableCell>Expected value</TableCell>
                            <TableCell>Expected value type</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Remarks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {testResults.map(testResult => (<TableRow key={testResult.expression}>
                            <TableCell>{testResult.expression}</TableCell>
                            <TableCell>{testResult.expectedValue}</TableCell>
                            <TableCell>{testResult.expectedValueType}</TableCell>
                            <TableCell>{testResult.passed ? "Passed" : "Failed"}</TableCell>
                            <TableCell>{testResult.passed ? "" : testResult.details}</TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    </>
}

const defaultAttempt: AttemptDTO = {
    assessmentId: 0,
    attemptId: 0,
    attemptSummary: {
        testFailed: 0,
        testPassed: 0,
        details: "",
        syntaxError: false
    },
    challengeId: 0,
    codeError: false,
    codeErrorDetails: "",
    submitDate: "",
    submittedCode: ""
}

const defaultChallenge: ChallengeDTO = {
    challengeId: 0,
    codeSnippet: "",
    description: "",
    exampleTestCases: "",
    language: LanguageName.JAVASCRIPT,
    name: "",
    type: ChallengeType.EASY
}