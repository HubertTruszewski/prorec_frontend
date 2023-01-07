import {Button, Card, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import React, {useEffect, useState} from "react";
import {AssessmentDTO, AssessmentStatus} from "../../../../components/assessments/dto/AssessmentDTO";
import {useRouter} from "next/router";
import {ChallengeDTO} from "../../../../Challenge.dto";
import Link from "next/link";
import Countdown from "react-countdown";

export default function () {
    const router = useRouter();
    const assessmentId = router.query.assessmentId;
    const [assessment, setAssessment] = useState<AssessmentDTO>(defaultAssessment);
    const [challenges, setChallenges] = useState<ChallengeDTO[]>([]);

    const fetchAssessment = () => {
        fetch("/api/assessment/" + assessmentId)
            .then(data => data.json())
            .then((assessment: AssessmentDTO) => setAssessment(assessment));
    }

    const fetchChallenges = () => {
        fetch("/api/challenge/all")
            .then(data => data.json())
            .then((challenges: ChallengeDTO[]) => setChallenges(challenges));
    }

    useEffect(() => {
        if (assessmentId === undefined) {
            return;
        }
        fetchAssessment();
    }, [assessmentId])

    useEffect(() => {
        if (assessment?.status === AssessmentStatus.AWAITING) {
            return;
        }
        fetchChallenges();
    }, [assessment.assessmentId])

    const startAssessment = () => {
        fetch("/api/assessment/start/" + assessmentId, {method: "PUT"})
            .then(() => fetchAssessment())
    }

    const getAssessmentChallengePageLink = (challengeId: number) => {
        return `/assessments/${assessmentId}/challenge/${challengeId}`
    }

    const finishAssessment = () => {
        fetch("/api/assessment/finish/" + assessmentId, {method: "PUT"})
            .then(fetchAssessment)
    }

    const getTimeLeft = () => {
        switch (assessment.status) {
            case AssessmentStatus.AWAITING:
                return "Not started yet"
            case AssessmentStatus.IN_PROGRESS:
                return <Countdown key={assessment.deadline}
                                  date={Date.parse(assessment.deadline)}
                                  onComplete={finishAssessment}>
                    <span>No time left</span>
                </Countdown>
            case AssessmentStatus.DONE:
                return "Assessment done"
            case AssessmentStatus.EXPIRED:
                return "Assessment expired";
            case AssessmentStatus.CANCELLED:
                return "Assessment cancelled";
        }
    }

    return <>
        <Card
            sx={{
                borderRadius: "20px",
                paddingY: "5px",
                paddingX: "10px",
                marginX: "3rem",
                marginY: "2vh",
                borderColor: "black",
                heightMax: "18vh",
                width: "50rem",
                float: "left",
            }}
        >
            <h1 style={{marginTop: "0px"}}>
              <span style={{color: "#BA53FF", fontWeight: "bold"}}>
                Basic info
              </span>
            </h1>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Email address:</TableCell>
                            <TableCell>{assessment?.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Expiry date:</TableCell>
                            <TableCell>{assessment?.expiryDate}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Status:</TableCell>
                            <TableCell>{assessment?.status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Solving time: (in minutes)</TableCell>
                            <TableCell>{assessment?.solvingTime}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Time left:</TableCell>
                            <TableCell>
                                {getTimeLeft()}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
        <Card
            sx={{
                borderRadius: "20px",
                paddingY: "10px",
                paddingX: "10px",
                marginX: "3rem",
                marginY: "2vh",
                borderColor: "black",
                heightMax: "18vh",
                width: "35rem",
                float: "right",
            }}
        >
            <h1 style={{marginTop: "0px"}}>
              <span style={{color: "#BA53FF", fontWeight: "bold"}}>
                Tasks
              </span>
            </h1>
            {assessment?.status === AssessmentStatus.AWAITING &&
                <span>Task count: {assessment?.challengesIds?.length}</span>}
            {assessment?.status === AssessmentStatus.AWAITING ?
                <div style={{marginTop: "10px"}}>
                    <div>To start a challenge press the button below</div>
                    <Button
                        sx={{paddingY: "10px", paddingX: "20px", borderRadius: "15px", marginTop: "20px"}}
                        variant="outlined"
                        onClick={startAssessment}
                    >
                        Start assessment
                    </Button>
                </div> : <div>
                    <span style={{color: "#BA53FF", fontWeight: "bold"}}>
                        Task list:
                    </span>
                    <ol>
                        {challenges.filter(challenge => assessment?.challengesIds.includes(challenge.challengeId))
                            .map(challenge => (
                                <li key={challenge.challengeId}>
                                    <Link
                                        href={getAssessmentChallengePageLink(challenge.challengeId)}>
                                        {challenge.name} - {challenge.type}
                                    </Link>
                                </li>
                            ))}
                    </ol>
                </div>}
        </Card>
        {assessment.status === AssessmentStatus.IN_PROGRESS &&
            <div style={{marginLeft: "50rem", marginRight: "50rem", clear: "both"}}>
                <Button
                    sx={{paddingY: "10px", paddingX: "20px", borderRadius: "15px"}}
                    variant="outlined"
                    onClick={finishAssessment}
                >
                    Finish assessment
                </Button>
            </div>}
    </>
}

const defaultAssessment: AssessmentDTO = {
    assessmentId: 0,
    authorId: "",
    challengesIds: [],
    createDate: "",
    deadline: "",
    email: "",
    expiryDate: "",
    solvingTime: 0,
    status: AssessmentStatus.IN_PROGRESS
}