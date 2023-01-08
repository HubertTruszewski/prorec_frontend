import {Autocomplete, Card, Checkbox, TextField} from "@mui/material";
import React, {SyntheticEvent} from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {ChallengeDTO} from "../../Challenge.dto";

export interface NewAssessmentChallengeSelectProps {
    challengesList: ChallengeDTO[];
    handleChallengesChange: (event: SyntheticEvent, values: ChallengeDTO[]) => void;
}

export const NewAssessmentChallengeSelect = (props: NewAssessmentChallengeSelectProps) => {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
    const checkedIcon = <CheckBoxIcon fontSize="small"/>;
    const getChallengeOption = (challenge: ChallengeDTO) => (
        challenge.name + " " + challenge.language + " " + challenge.type
    )

    return (
        <Card
            sx={{
                borderRadius: "20px",
                marginRight: "4rem",
                marginTop: "50px",
                padding: "10px",
                borderColor: "black",
                width: "40rem",
                height: "40vh",
                float: "right",
            }}
        >
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={props.challengesList}
                disableCloseOnSelect
                onChange={props.handleChallengesChange}
                getOptionLabel={getChallengeOption}
                renderOption={(props, option, {selected}) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{marginRight: 8}}
                            checked={selected}
                        />
                        {getChallengeOption(option)}
                    </li>
                )}
                style={{width: 500}}
                renderInput={(params) => (
                    <TextField {...params} label="Challenges" placeholder="Challenges"/>
                )}
            />
        </Card>
    );
}