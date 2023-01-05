import React, {useEffect, useState} from "react";
import {AssessmentDTO} from "../../components/assessments/dto/AssessmentDTO";
import {AssessmentsList} from "../../components/assessments/AssessmentsList";
import {Card} from "@mui/material";
import Link from "next/link";
import {authHeader} from "../../services/authHeader";
import {AuthService} from "../../services/AuthService";
import {useRouter} from "next/router";
import {JwtResponse} from "../../components/login/dto/JwtResponse";

export default function () {
    const router = useRouter();
    const newAssessmentPageLink = "/assessments/newAssessment";
    const [assessmentsList, setAssessmentsList] = useState<AssessmentDTO[]>([]);

    useEffect(() => {
        if (AuthService.protectSite(router)) {
            return;
        }
        const user: JwtResponse = AuthService.getCurrentUser();
        fetch("/api/assessment/user/" + user?.user.userId, {headers: authHeader()})
            .then(data => data.json())
            .then(assessmentsList => setAssessmentsList(assessmentsList))
            .catch(() => console.log("Error during fetching assessment [assessmentId]"))
    }, [])

    return (<>
        <Card sx={{borderRadius: "20px", margin: "50px"}}>
            <div>
                <button
                    style={{margin: "15px", background: "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #BA53FF",
                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)", border: "none", borderRadius: "20px", width: "12rem", height: "2.4rem", fontSize: "15px", textAlign: "center"}}
                >
                    <Link
                        color="inherit"
                        href={newAssessmentPageLink}
                    >
                       <b>+</b> New assessment
                    </Link>
                </button>
            </div>
            <AssessmentsList assessmentsList={assessmentsList}/>
        </Card>
    </>)
}