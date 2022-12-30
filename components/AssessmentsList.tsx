import {AssessmentDTO} from "./assessments/dto/AssessmentDTO";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";
import Link from "next/link";

export interface AssessmentsListProps {
    assessmentsList: AssessmentDTO[];
}

export const AssessmentsList = (props: AssessmentsListProps) => {
    const sortedAssessmentList = [...props.assessmentsList]
        .sort((firstAssessment, secondAssessment) => firstAssessment.createDate.localeCompare(
            secondAssessment.createDate))
        .reverse();

    const getAssessmentViewPageLink = (assessmentId: number) => {
        return `/assessments/${assessmentId}/view`;
    }

    return (<>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Applicant's email address</TableCell>
                        <TableCell>Creation date</TableCell>
                        <TableCell>Expiry date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedAssessmentList.map((assessment, index) => <TableRow key={assessment.assessmentId}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{assessment.email}</TableCell>
                        <TableCell>{assessment.createDate}</TableCell>
                        <TableCell>{assessment.expiryDate}</TableCell>
                        <TableCell>{assessment.status}</TableCell>
                        <TableCell>
                            <Button component={Link}
                                    href={getAssessmentViewPageLink(assessment.assessmentId)}>
                                VIEW
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}