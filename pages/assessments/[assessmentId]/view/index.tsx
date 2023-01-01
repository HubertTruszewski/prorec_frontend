import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {AssessmentDTO, AssessmentStatus} from "../../../../components/assessments/dto/AssessmentDTO";
import {AssessmentBasicInfo} from "../../../../components/assessments/AssessmentBasicInfo";
import {AssessmentSelectedChallenges} from "../../../../components/assessments/AssessmentSelectedChallenges";
import {ChallengeDTO} from "../../../../Challenge.dto";

export default function () {
    const router = useRouter();
    const assessmentId = router.query.assessmentId;
    const [assessment, setAssessment] = useState<AssessmentDTO>(defaultAssessment);
    const [challenges, setChallenges] = useState<ChallengeDTO[]>([]);

    const fetchAssessment = () => {
        if (assessmentId === undefined) {
            return;
        }
        fetch("/api/assessment/" + assessmentId)
            .then(data => data.json()).then(data => setAssessment(data));
    }

    const fetchChallenges = () => {
        fetch("/api/challenge/all")
            .then((data) => {
                return data.json();
            })
            .then((challengeList) => {
                setChallenges(challengeList);
            });
    }

    useEffect(() => {
        fetchAssessment();
    }, [assessmentId])

    useEffect(() => {
        fetchChallenges();
    }, [])

    const cancelAssessment = (assessmentId: number) => {
        fetch("/api/assessment/cancel/" + assessmentId, {method: "PUT"})
            .then(() => fetchAssessment())
    }

    const getChallengesListForAssessment = () => {
        return challenges.filter(challenge => assessment.challengesIds.includes(challenge.challengeId));
    }

    return (<>
            <AssessmentBasicInfo assessment={assessment} cancelAssessment={cancelAssessment}/>
            <AssessmentSelectedChallenges selectedChallenges={getChallengesListForAssessment()}/>
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