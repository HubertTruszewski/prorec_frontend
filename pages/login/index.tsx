import {Alert, Button, Card, TextField} from "@mui/material";
import {LoginUserDTO} from "../../components/login/dto/LoginUserDTO";
import {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {AuthService} from "../../services/AuthService";

export default function () {
    const router = useRouter();
    const logout = router.query.logout;
    const [errorVisibility, setErrorVisibility] = useState<boolean>(false)
    const [logoutMessage, setLogoutMessage] = useState<boolean>(false);
    const loginUserDTO: LoginUserDTO = {
        username: "",
        password: ""
    }

    const handleTestFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        loginUserDTO[event.target.name] = event.target.value;
    }

    const handleLogin = () => {
        AuthService.login(loginUserDTO).then((response) => {
            if (response.ok) {
                window.location.href = "/";
            } else {
                setErrorVisibility(true);
            }
        });
    }

    useEffect(() => {
        if (logout === "true") {
            setLogoutMessage(true);
        }
    }, [router.query.logout])

    useEffect(() => {
        if (AuthService.getCurrentUser() !== null) {
            void router.push("/")
        }
    })

    return <div style={{justifyContent: "center", display: "flex",}}>
        <Card
            sx={{
                borderRadius: "20px",
                marginY: "10vh",
                padding: "2rem",
                borderColor: "black",
                width: "40rem",
                height: "60vh",
                float: "center",
                justifyContent: "center",
                textAlign: "center"
            }}
        >
            <h1 style={{color: "#BA53FF", fontWeight: "bold"}}>
                LOGIN
            </h1>
            <div>
                <div style={{marginTop: "60px"}}>
                    <TextField label={"Username"} name={"username"} onChange={handleTestFieldChange}/>
                </div>
                <div style={{marginTop: "20px"}}>
                    <TextField type={"password"} label={"Password"} name={"password"} onChange={handleTestFieldChange}/>
                </div>
                <div style={{marginTop: "176px"}}>
                    <Button style={{width: "223px"}} variant={"contained"} onClick={handleLogin}>Log in</Button>
                </div>
                {errorVisibility && <Alert sx={{marginTop: "10px"}} severity={"error"}>
                    Invalid username and/or password
                </Alert>}
                {logoutMessage && <Alert sx={{marginTop: "10px"}} severity={"success"}>
                    You've been logged out
                </Alert>}
            </div>
        </Card>
    </div>
}