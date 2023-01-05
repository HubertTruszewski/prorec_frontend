import React, {useEffect, useState} from "react";
import {Card} from "@mui/material";
import Link from "next/link";
import {AuthService} from "../services/AuthService";
import {JwtResponse} from "../components/login/dto/JwtResponse";

export default function Home() {
    const [userData, setUserData] = useState<JwtResponse | null>(null);
    useEffect(() => {
        if (localStorage) {
            const userData: JwtResponse = AuthService.getCurrentUser();
            setUserData(userData);
        }
    }, [])
    return (<div style={{justifyContent: "center", display: "flex"}}>
        <Card
            sx={{
                borderRadius: "20px",
                marginY: "15vh",
                padding: "2rem",
                borderColor: "black",
                width: "40rem",
                height: "50vh",
                float: "center",
                justifyContent: "center",
                textAlign: "center"
            }}
        >
            {userData ? <div>
                <h1>Hi, {AuthService.getCurrentUser().user.username}!</h1>
                We wish you a pleasant day!
            </div> : <div>
                <h1>Hi!</h1>
                <p>Welcome to our application!</p>
                <p>If you received an invitation email, please proceed to
                    <Link href={"/assessments/applicant"} style={{marginLeft: "5px"}}>
                        <b><i>applicant page</i></b>
                    </Link>
                </p>
                <p style={{marginTop: "50px"}}>Do you want to join PROREC as a recruiter?
                    <Link href={"/login"} style={{marginLeft: "5px"}}>
                        <b>
                            <i>Register</i>
                        </b>
                    </Link>
                </p>
                <p style={{marginTop: "10px"}}>Already have an account?
                    <Link href={"/login"} style={{marginLeft: "5px"}}>
                        <b>
                            <i>Log in</i>
                        </b>
                    </Link>
                </p>
            </div>}
        </Card>
    </div>)
}

