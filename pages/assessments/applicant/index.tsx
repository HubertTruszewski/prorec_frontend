import React, {ChangeEvent, useEffect, useState} from "react";
import {Alert, Button, Card, TextField} from "@mui/material";
import {useRouter} from "next/router";

export default function () {
    const router = useRouter();
    const [token, setToken] = useState<string>("");
    const queryToken: string = router.query.token as string;
    const [errorText, setErrorText] = useState<string>("");
    const errorVisible = errorText.length !== 0;

    useEffect(() => {
        if (queryToken !== undefined) {
            goToAssessmentPage(queryToken);
        }
    }, [queryToken])

    const handleTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    }

    const getAssessmentPageLink = (assessmentId: number) => {
        return `/assessments/applicant/${assessmentId}`;
    }

    const goToAssessmentPage = (token: string) => {
        fetch("/api/assessment/token/" + token)
            .then(response => {
                if (response.ok) {
                    response
                        .json()
                        .then(message => {
                            void router.push(getAssessmentPageLink(message.message))
                        })
                } else {
                    response
                        .json()
                        .then(message => {
                            setErrorText(message.message);
                        })
                }
            })
    }

    return <>
        <Card sx={{width: "80%", margin: "0 auto", marginTop: "50px", paddingY: "10px", textAlign: "center"}}>
            <h1>Hi!</h1>
            <p>We are very pleased to welcome you in our recruitment system.</p>
            <p>To start solving your tasks please provide below the code what you received in email message</p>
            <div>
                <TextField
                    label={"Invitation code"}
                    sx={{width: "500px"}}
                    value={token}
                    onChange={handleTokenChange}
                />
            </div>
            <div>
                <Button sx={{marginTop: "15px", backgroundColor: "#0063cc"}} size={"large"}
                        variant={"contained"} onClick={() => goToAssessmentPage(token)}>
                    Enter
                </Button>
            </div>
            {errorVisible && <Alert severity="error" sx={{margin: "20px"}}>
                {errorText}
            </Alert>}
        </Card>
    </>
}