import {CreateChallengeDTO} from "../../CreateChallenge.dto";
import {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import {Button, Card, MenuItem, Select, TextField} from "@mui/material";
import {ChallengeDTO, ChallengeType, LanguageName} from "../../Challenge.dto";
import {useRouter} from "next/router";
import {authHeader} from "../../services/authHeader";
import {AuthService} from "../../services/AuthService";

export default function CreateChallenge() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [difficulty, setDifficulty] = useState<ChallengeType>(ChallengeType.EASY);
    const [language, setLanguage] = useState<LanguageName>(LanguageName.JAVASCRIPT);
    const [description, setDescription] = useState<string>("");
    const [exampleTestCases, setExampleTestCases] = useState<string>("");

    useEffect(() => {
        if (AuthService.protectSite(router)) {
            return;
        }
    })

    const codeChangeHandler = (newCode: string | undefined) => {
        setCode(newCode ?? "");
    };

    const getChallengePageLink = (challengeId: number): string => {
        return `/challenges/${challengeId}/edit`
    }

    const getInitialCode = () => {
        switch(language) {
            case LanguageName.JAVASCRIPT:
                return "// type initial code here"
            case LanguageName.PYTHON:
                return "# type initial code here"
        }
    }

    const submitChallenge = () => {
        const challenge: CreateChallengeDTO = {
            name: name,
            description: description,
            codeSnippet: code,
            type: difficulty,
            exampleTestCases: exampleTestCases,
            language: language,
        };
        fetch("/api/challenge/add", {
            method: "POST",
            headers: {
                ...authHeader(),
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(challenge),
        }).then(data => data.json())
            .then((challenge: ChallengeDTO) => {
                const urlToRedirect: string = getChallengePageLink(challenge.challengeId);
                void router.push(urlToRedirect);
            });
    };

    return (
        <>
            <div>
                <Card
                    sx={{
                        borderRadius: "20px",
                        paddingY: "2vh",
                        paddingX: "4rem",
                        marginX: "3rem",
                        marginY: "4vh",
                        borderColor: "black",
                        height: "80vh",
                        width: "55vw",
                        float: "left",
                    }}
                >
                    <form>
                        <TextField
                            sx={{
                                width: "15rem",
                                marginX: "1rem",
                                marginY: "1rem",
                                float: "left",
                            }}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            onInput={(event) => {
                                setName((event.target as HTMLInputElement).value);
                            }}
                        />
                        <Select
                            labelId="select-difficulty"
                            id="difficulty"
                            value={difficulty}
                            label="Difficulty level"
                            onChange={(event) => {
                                setDifficulty(ChallengeType[event.target.value as keyof typeof ChallengeType]);
                            }}
                            sx={{
                                width: "15rem",
                                marginX: "1rem",
                                marginY: "1rem",
                                float: "left",
                            }}
                        >
                            <MenuItem value={"EASY"}>Easy</MenuItem>
                            <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                            <MenuItem value={"HARD"}>Hard</MenuItem>
                        </Select>
                        <Select
                            labelId="select-difficulty"
                            id="difficulty"
                            value={language}
                            label="Language"
                            onChange={(event) => {
                                setLanguage(LanguageName[event.target.value as keyof typeof LanguageName]);
                            }}
                            sx={{
                                width: "15rem",
                                marginX: "1rem",
                                marginY: "1rem",
                                float: "left",
                            }}
                        >
                            <MenuItem value={"PYTHON"}>Python</MenuItem>
                            <MenuItem value={"JAVASCRIPT"}>Javascript</MenuItem>
                        </Select>
                        <TextField
                            sx={{
                                width: "49rem",
                                marginX: "1rem",
                                marginY: "0rem",
                                float: "left",
                            }}
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            rows="10"
                            multiline={true}
                            onInput={(event) => {
                                setDescription((event.target as HTMLInputElement).value);
                            }}
                        />
                        <TextField
                            sx={{
                                width: "49rem",
                                marginX: "1rem",
                                marginY: "4rem",
                                float: "left",
                            }}
                            id="outlined-basic"
                            label="Example test cases"
                            variant="outlined"
                            rows="6"
                            multiline={true}
                            onInput={(event) => {
                                setExampleTestCases((event.target as HTMLInputElement).value);
                            }}
                        />
                    </form>

                    <div role="presentation" style={{margin: "auto"}}></div>
                </Card>

                <Card
                    sx={{
                        borderRadius: "20px",
                        marginLeft: "2vw",
                        marginY: "0vh",
                        borderColor: "black",
                        float: "left",
                    }}
                >
                    <Editor
                        height="63vh"
                        width="35vw"
                        theme="vs-dark"
                        value={getInitialCode()}
                        language={language.toLowerCase()}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                        }}
                        onChange={(value) => codeChangeHandler(value)}
                    />
                </Card>

                <div
                    style={{marginLeft: "50rem", marginRight: "50rem", clear: "both"}}
                >
                    <Button
                        sx={{paddingY: "10px", paddingX: "20px", borderRadius: "15px"}}
                        variant="outlined"
                        onClick={submitChallenge}
                    >
                        Submit Challenge
                    </Button>
                </div>

                <div style={{color: "blue", fontSize: "20px", float: "left"}}></div>
            </div>
        </>
    );
}
