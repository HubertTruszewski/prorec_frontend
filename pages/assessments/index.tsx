import React, {useEffect, useState} from "react";
import {AssessmentDTO} from "../../components/assessments/dto/AssessmentDTO";
import {AssessmentsList} from "../../components/assessments/AssessmentsList";
import {Button, Card, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
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
        <Card sx={{margin: "20px"}}>
            <div>
                <Typography
                    sx={{flex: '1 1 100%', margin: "10px"}}
                    variant="h4"
                    id="tableTitle"
                    component="div"
                >
                    Assessments
                </Typography>
                <Button
                    sx={{margin: "15px"}}
                    variant="contained"
                    startIcon={<AddIcon/>}
                    component={Link}
                    href={newAssessmentPageLink}
                >
                    New assessment
                </Button>
            </div>
            <AssessmentsList assessmentsList={assessmentsList}/>
        </Card>
    </>)
}