import {Button, Card, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import React from "react";
import {AssessmentDTO, AssessmentStatus} from "./dto/AssessmentDTO";

export interface AssessmentBasicInfoProps {
    assessment: AssessmentDTO;
    cancelAssessment: (assessmentId: number) => void;
}

export const AssessmentBasicInfo = ({assessment, cancelAssessment}: AssessmentBasicInfoProps) => {

    return <Card sx={{
        borderRadius: "20px",
        marginLeft: "3rem",
        marginY: "2vh",
        padding: "10px",
        borderColor: "black",
        width: "50rem",
        height: "80vh",
        float: "left",
    }}>
        <span style={{color: "purple", fontWeight: "bold"}}>
            <h1>
                Basic info
            </h1>
        </span>
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Applicant's mail address</TableCell>
                        <TableCell>{assessment.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Creation date</TableCell>
                        <TableCell>{assessment.createDate}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Expiry date</TableCell>
                        <TableCell>{assessment.expiryDate}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>
                            {assessment.status}
                            {assessment.status === AssessmentStatus.AWAITING && <Button
                                variant={"outlined"}
                                color={"error"}
                                sx={{marginLeft: "15px"}}
                                onClick={() => cancelAssessment(assessment.assessmentId)}
                            >
                                CANCEL
                            </Button>}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Card>
}
