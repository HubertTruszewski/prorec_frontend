import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {AssessmentDTO, AssessmentStatus} from "../../../../components/assessments/dto/AssessmentDTO";
import {AssessmentBasicInfo} from "../../../../components/assessments/AssessmentBasicInfo";
import {AssessmentSelectedChallenges} from "../../../../components/assessments/AssessmentSelectedChallenges";
import {ChallengeDTO} from "../../../../Challenge.dto";
import {AssessmentAttempts} from "../../../../components/assessments/AssessmentAttempts";
import {AttemptDTO} from "../../../../components/assessments/dto/AttemptDTO";
import {authHeader} from "../../../../services/authHeader";
import {AuthService} from "../../../../services/AuthService";

export default function () {
    const router = useRouter();
    const assessmentId = router.query.assessmentId;
    const [assessment, setAssessment] = useState<AssessmentDTO>(defaultAssessment);
    const [challenges, setChallenges] = useState<ChallengeDTO[]>([]);
    const [attempts, setAttempts] = useState<AttemptDTO[]>([]);

    const fetchAssessment = () => {
        if (assessmentId === undefined) {
            return;
        }
        fetch("/api/assessment/" + assessmentId, {headers: authHeader()})
            .then(data => data.json()).then(data => setAssessment(data));
    }

    const fetchChallenges = () => {
        fetch("/api/challenge/all", {headers: authHeader()})
            .then((data) => {
                return data.json();
            })
            .then((challengeList) => {
                setChallenges(challengeList);
            });
    }

    const fetchAttempts = () => {
        if (assessmentId === undefined) {
            return;
        }
        fetch("/api/attempt/assessment/" + assessmentId, {headers: authHeader()})
            .then((data) => {
                return data.json();
            })
            .then((attemptsList) => {
                setAttempts(attemptsList);
            });
    }

    useEffect(() => {
        if (AuthService.protectSite(router)) {
            return;
        }
        fetchAssessment();
        fetchChallenges();
        fetchAttempts();
    }, [assessmentId])

    const cancelAssessment = (assessmentId: number) => {
        fetch("/api/assessment/cancel/" + assessmentId, {headers: authHeader(), method: "PUT"})
            .then(() => fetchAssessment())
    }

    const getChallengesListForAssessment = () => {
        return challenges.filter(challenge => assessment.challengesIds.includes(challenge.challengeId));
    }

    return (<>
            <AssessmentBasicInfo assessment={assessment} cancelAssessment={cancelAssessment}/>
            <AssessmentSelectedChallenges selectedChallenges={getChallengesListForAssessment()}/>
            <AssessmentAttempts attempts={attempts} challenges={getChallengesListForAssessment()}/>
        </>
    )
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
    status: AssessmentStatus.AWAITING
}