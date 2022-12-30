import Layout from "../../../components/layout/Layout";
import React, {ChangeEvent, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {NewAssessmentDTO} from "../../../components/assessments/dto/NewAssessmentDTO";
import {NewAssessmentBasicInfoForm} from "../../../components/assessments/NewAssessmentBasicInfoForm";
import {NewAssessmentChallengeSelect} from "../../../components/assessments/NewAssessmentChallengeSelect";
import {ChallengeDTO} from "../../../Challenge.dto";
import {Button} from "@mui/material";

export default function Home() {
    const newAssessmentDTO: NewAssessmentDTO = {
        authorId: 1,
        challengesIds: [],
        email: "",
        expiryDate: "",
        solvingTime: 0
    };
    const [challenges, setChallenges] = useState<ChallengeDTO[]>([]);

    useEffect(() => {
        fetch("/api/challenge/all")
            .then((data) => {
                return data.json();
            })
            .then((challengeList) => {
                setChallenges(challengeList);
            });
    }, [])

    const createAssessment = () => {
        fetch("/api/assessment/add", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAssessmentDTO),
        })
            .then((result) => result.json())
            .then(result => console.log(result))
            .catch(() => console.log("Error!"))
    }

    const handleInputChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        newAssessmentDTO[event.target.name] = event.target.value;
    }, [newAssessmentDTO])

    const setExpiryDate = (expiryDate: string) => {
        newAssessmentDTO.expiryDate = expiryDate;
    }

    const handleChallengesChange = (event: SyntheticEvent, values: ChallengeDTO[]) => {
        newAssessmentDTO.challengesIds = values.map(challenge => challenge.challengeId);
    }

    return (<>
        <Layout>
            <div style={{height: "40vh"}}>
                <NewAssessmentBasicInfoForm handleInputChange={handleInputChange} setExpiryDate={setExpiryDate}/>
                <NewAssessmentChallengeSelect challengesList={challenges}
                                              handleChallengesChange={handleChallengesChange}/>
                <div style={{marginLeft: "50rem", marginRight: "50rem", clear: "both"}}>
                    <Button
                        sx={{paddingY: "10px", paddingX: "20px", borderRadius: "15px"}}
                        variant="outlined"
                        onClick={createAssessment}
                    >
                        Create assessment
                    </Button>
                </div>
            </div>
        </Layout>
    </>)
}