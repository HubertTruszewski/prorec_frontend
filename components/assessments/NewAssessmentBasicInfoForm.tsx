import {Card, TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {AdapterLuxon} from "@mui/x-date-pickers/AdapterLuxon";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DateTime} from "luxon";

export interface NewAssessmentBasicInfoFormProps {
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    setExpiryDate: (expiryDate: string) => void;
}

export const NewAssessmentBasicInfoForm = (props: NewAssessmentBasicInfoFormProps) => {
    const [expiryDateField, setExpiryDateField] = useState<DateTime | null>(null);
    return (<Card
        sx={{
            borderRadius: "20px",
            paddingY: "5px",
            paddingX: "10px",
            marginX: "3rem",
            marginY: "2vh",
            borderColor: "black",
            heightMax: "18vh",
            width: "65rem",
            float: "left",
        }}
    >
        <h1 style={{marginTop: "0px"}}>
                      <span style={{color: "purple", fontWeight: "bold"}}>
                        Basic info
                      </span>
        </h1>
        <div>
            <TextField
                sx={{width: "300px", marginBottom: "20px"}}
                required
                id="outlined-required"
                label="Applicant's email address"
                defaultValue=""
                name="email"
                onChange={props.handleInputChange}
            />
        </div>
        <div>
            <TextField
                sx={{width: "300px", marginBottom: "20px"}}
                type="number"
                InputProps={{inputProps: {min: 0, max: 240}}}
                required
                id="outlined-required"
                label="Solving time (in minutes)"
                defaultValue=""
                name="solvingTime"
                onChange={props.handleInputChange}
            />
        </div>
        <div style={{marginBottom: "20px"}}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DateTimePicker
                    value={expiryDateField}
                    onChange={(date) => {
                        setExpiryDateField(date);
                        props.setExpiryDate(date !== null ? date.toString() : "")
                    }}
                    label="Expiry date"
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    </Card>)
}