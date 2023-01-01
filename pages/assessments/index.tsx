import React, {useEffect, useState} from "react";
import {AssessmentDTO} from "../../components/assessments/dto/AssessmentDTO";
import {AssessmentsList} from "../../components/AssessmentsList";
import {Button, Card, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Link from "next/link";

export default function () {
    const newAssessmentPageLink = "/assessments/newAssessment";
    const [assessmentsList, setAssessmentsList] = useState<AssessmentDTO[]>([]);
    useEffect(() => {
        fetch("/api/assessment/all")
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