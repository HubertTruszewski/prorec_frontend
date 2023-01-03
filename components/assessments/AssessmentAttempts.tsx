import {Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import {AttemptDTO} from "./dto/AttemptDTO";
import {ChallengeDTO} from "../../Challenge.dto";
import Link from "next/link";
import LaunchIcon from '@mui/icons-material/Launch';

export interface AssessmentAttemptsProps {
    attempts: AttemptDTO[];
    challenges: ChallengeDTO[];
}

export const AssessmentAttempts = ({attempts, challenges}: AssessmentAttemptsProps) => {

    const getChallengeName = (challengeId: number) => {
        return challenges.find(challenge => challenge.challengeId === challengeId)?.name;
    };

    const getAttemptPageLink = (attempt: AttemptDTO) => {
        return `/assessments/${attempt.assessmentId}/attempts/${attempt.attemptId}`;
    }

    const getResult = (attemptId: number) => {
        const attempt = attempts.find(attempt => attempt.attemptId === attemptId);
        if (attempt?.codeError) {
            return "Code error";
        }
        return Math.round(
            attempt!.attemptSummary.testPassed * 100 / (attempt!.attemptSummary.testPassed + attempt!.attemptSummary.testFailed)) + "%"
    }

    return <Card sx={{
        borderRadius: "20px",
        marginRight: "3rem",
        marginY: "2vh",
        padding: "10px",
        borderColor: "black",
        width: "50rem",
        height: "54vh",
        float: "right",
    }}>
        <span style={{color: "purple", fontWeight: "bold"}}>
            <h1>
                Attempts
            </h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Challenge name</TableCell>
                            <TableCell>Submit date</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attempts.map((attempt, index) => {
                            return <TableRow key={attempt.attemptId}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{getChallengeName(attempt.challengeId)}</TableCell>
                                <TableCell>{attempt.submitDate}</TableCell>
                                <TableCell>{getResult(attempt.attemptId)}</TableCell>
                                <TableCell>
                                    <Link href={getAttemptPageLink(attempt)}>
                                        <LaunchIcon />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </span>
    </Card>
}