import React, {ChangeEvent, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {NewAssessmentDTO} from "../../../components/assessments/dto/NewAssessmentDTO";
import {NewAssessmentBasicInfoForm} from "../../../components/assessments/NewAssessmentBasicInfoForm";
import {NewAssessmentChallengeSelect} from "../../../components/assessments/NewAssessmentChallengeSelect";
import {ChallengeDTO} from "../../../Challenge.dto";
import {AssessmentDTO} from "../../../components/assessments/dto/AssessmentDTO";
import {useRouter} from "next/router";
import {authHeader} from "../../../services/authHeader";
import {AuthService} from "../../../services/AuthService";

export default function Home() {
    const newAssessmentDTO: NewAssessmentDTO = {
        authorId: 1,
        challengesIds: [],
        email: "",
        expiryDate: "",
        solvingTime: 0
    };
    const router = useRouter();
    const [challenges, setChallenges] = useState<ChallengeDTO[]>([]);
    const [bulk, setBulk] = useState<boolean>(false);
    const getAssessmentPageLink = (assessmentId: number): string => {
        return `/assessments/${assessmentId}/view`;
    }

    useEffect(() => {
        if (AuthService.protectSite(router)) {
            return;
        }
        fetch("/api/challenge/all", {headers: authHeader()})
            .then((data) => {
                return data.json();
            })
            .then((challengeList) => {
                setChallenges(challengeList);
            });
    }, [])

    const createAssessment = () => {
        const addUrl: string = bulk ? "/api/assessment/addBulk" : "/api/assessment/add";
        fetch(addUrl, {
            method: "POST",
            headers: {
                ...authHeader(),
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAssessmentDTO),
        })
            .then((result) => result.json())
            .then((assessment: AssessmentDTO) => {
                if (bulk) {
                    void router.push("/assessments");
                } else {
                    void router.push(getAssessmentPageLink(assessment.assessmentId));
                }
            })
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
        <div style={{height: "40vh"}}>
            <NewAssessmentBasicInfoForm
                handleInputChange={handleInputChange}
                setExpiryDate={setExpiryDate}
                bulk={bulk}
                setBulk={setBulk}
            />
            <NewAssessmentChallengeSelect
                challengesList={challenges}
                handleChallengesChange={handleChallengesChange}
            />
            <div style={{marginLeft: "50rem", marginRight: "50rem", clear: "both", textAlign: 'center'}}>
                <button
                    style={{
                        marginTop: "100px",
                        background: "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #BA53FF",
                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                        border: "none",
                        borderRadius: "20px",
                        width: "12rem",
                        height: "2.4rem",
                        fontSize: "15px",
                        textAlign: "center"
                    }}
                    onClick={createAssessment}
                >
                    Create assessment
                </button>
            </div>
        </div>
    </>)
}