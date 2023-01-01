import {Card} from "@mui/material";
import React from "react";
import {ChallengeDTO} from "../../Challenge.dto";
import Link from "next/link";
import LaunchIcon from '@mui/icons-material/Launch';

export interface AssessmentSelectedChallengesProps {
    selectedChallenges: ChallengeDTO[];
}

export const AssessmentSelectedChallenges = ({selectedChallenges}: AssessmentSelectedChallengesProps) => {
    const getChallengePageLink = (challengeId: number): string => {
        return `/challenges/${challengeId}/edit`
    }

    return <Card sx={{
        borderRadius: "20px",
        marginRight: "3rem",
        marginY: "2vh",
        padding: "10px",
        borderColor: "black",
        width: "40rem",
        height: "80vh",
        float: "right",
    }}>
        <span style={{color: "purple", fontWeight: "bold"}}>
            <h1>
                Selected challenges
            </h1>
        </span>
        <ol>
            {selectedChallenges.map(challenge => <li key={challenge.challengeId} style={{marginBottom: "10px"}}>
                {challenge.name}
                <Link href={getChallengePageLink(challenge.challengeId)}>
                    <LaunchIcon sx={{height: "15px"}} />
                </Link>
            </li>)}
        </ol>
    </Card>
}