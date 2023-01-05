import {Alert, Button, Card, TextField} from "@mui/material";
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

    const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUserDTO({...newUserDTO, [event.target.name]: event.target.value})
    }

    const handleRegister = () => {
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
                marginY: "2vh",
                padding: "2rem",
                borderColor: "black",
                width: "40rem",
                height: "60vh",
                float: "center",
                justifyContent: "center",
                textAlign: "center"
            }}
        >
            <h1 style={{color: "purple", fontWeight: "bold"}}>
                LOGIN
            </h1>
            <div>
                <div style={{marginTop: "60px"}}>
                    <TextField
                        label={"Username"}
                        name={"username"}
                        onChange={handleTextFieldChange}
                        value={newUserDTO.username}
                    />
                </div>
                <div style={{marginTop: "20px"}}>
                    <TextField
                        label={"Email address"}
                        name={"email"}
                        onInput={handleTextFieldChange}
                        value={newUserDTO.email}
                    />
                </div>
                <div style={{marginTop: "20px"}}>
                    <TextField
                        type={"password"}
                        label={"Password"}
                        name={"password"}
                        onInput={handleTextFieldChange}
                        value={newUserDTO.password}
                    />
                </div>
                <div style={{marginTop: "20px"}}>
                    <Button variant={"contained"} onClick={handleRegister}>Register</Button>
                </div>
                {success && <Alert sx={{marginTop: "10px"}} severity={"success"}>
                    Successfully registered! Now you can go to <Link href={"/login"}><b>login page</b></Link>.
                </Alert>}
            </div>
        </Card>
    </div>
}