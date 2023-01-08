import {Alert, Card, TextField} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import {AuthService} from "../../services/AuthService";
import Link from "next/link";
import {useRouter} from "next/router";
import {NewUserDTO} from "../../components/login/dto/NewUserDTO";

export default function () {
    const router = useRouter();
    const [success, setSuccess] = useState<boolean>(false);
    const [newUserDTO, setNewUserDTO] = useState<NewUserDTO>({
        email: "", password: "", username: ""
    })
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUserDTO({...newUserDTO, [event.target.name]: event.target.value})
    }

    const formValid = (): boolean => {
        let valid = true;
        if (newUserDTO.username === "") {
            setUsernameError(true);
            valid = false;
        }
        if (newUserDTO.email === "") {
            setEmailError(true);
            valid = false;
        }
        if (newUserDTO.password === "") {
            setPasswordError(true);
            valid = false;
        }
        return valid;
    }

    const handleRegister = () => {
        if (!formValid()) {
            return;
        }

        AuthService.register(newUserDTO).then(response => {
            if (response.ok) {
                setSuccess(true);
                setNewUserDTO({email: "", password: "", username: ""})
            }
        })
    }

    useEffect(() => {
        if (AuthService.getCurrentUser() !== null) {
            void router.push("/")
        }
    })

    return <div style={{justifyContent: "center", display: "flex"}}>
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
            <h1 style={{color: "#ba53ff", fontWeight: "bold",}}>
                REGISTER
            </h1>
            <div>
                <div style={{marginTop: "60px"}}>
                    <TextField
                        label={"Username"}
                        name={"username"}
                        onChange={handleTextFieldChange}
                        value={newUserDTO.username}
                        error={usernameError}
                        helperText={usernameError ? "Cannot be empty" : ""}
                    />
                </div>
                <div style={{marginTop: "20px"}}>
                    <TextField
                        label={"Email address"}
                        name={"email"}
                        onInput={handleTextFieldChange}
                        value={newUserDTO.email}
                        error={emailError}
                        helperText={emailError ? "Cannot be empty" : ""}
                    />
                </div>
                <div style={{marginTop: "20px"}}>
                    <TextField
                        type={"password"}
                        label={"Password"}
                        name={"password"}
                        onInput={handleTextFieldChange}
                        value={newUserDTO.password}
                        error={passwordError}
                        helperText={passwordError ? "Cannot be empty" : ""}
                    />
                </div>
                <div style={{marginTop: "20px"}}>
                    <button
                        style={{
                            background: "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #BA53FF",
                            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                            border: "none",
                            borderRadius: "20px",
                            width: "12rem",
                            height: "2.4rem",
                            fontSize: "15px",
                            textAlign: "center"
                        }}
                        onClick={handleRegister}>Register
                    </button>
                </div>
                {success && <Alert sx={{marginTop: "10px"}} severity={"success"}>
                    Successfully registered! Now you can go to <Link href={"/login"}><b>login page</b></Link>.
                </Alert>}
            </div>
        </Card>
    </div>
}