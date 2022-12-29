import { CreateChallengeDTO } from "../../CreateChallenge.dto";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import { Card, Button, TextField, Select, MenuItem } from "@mui/material";

export default function CreateChallenge() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("EASY");
  const [language, setLanguage] = useState<string>("javascript");
  const [description, setDescription] = useState<string>("");

  const codeChangeHandler = (newCode: string | undefined) => {
    setCode(newCode ?? "");
  };

  const submitChallenge = () => {
    const Challenge: CreateChallengeDTO = {
      name: name,
      description: description,
      codeSnippet: code,
      type: difficulty,
      exampleTestCases: "",
      language: language,
    };
    console.log(Challenge);
    fetch("/api/challenge/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Challenge }),
    });
  };

  return (
    <>
      <div>
        <Card
          sx={{
            borderRadius: "20px",
            paddingY: "3vh",
            paddingX: "4rem",
            marginX: "3rem",
            marginY: "4vh",
            borderColor: "black",
            height: "63vh",
            width: "55vw",
            float: "left",
          }}
        >
          <form>
            <TextField
              sx={{
                width: "15rem",
                marginX: "1rem",
                marginY: "2rem",
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
                setDifficulty(event.target.value as string);
              }}
              sx={{
                width: "15rem",
                marginX: "1rem",
                marginY: "2rem",
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
                setLanguage(event.target.value as string);
              }}
              sx={{
                width: "15rem",
                marginX: "1rem",
                marginY: "2rem",
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
                marginY: "4rem",
                float: "left",
              }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              rows="10"
              multiline="true"
              onInput={(event) => {
                setDescription((event.target as HTMLInputElement).value);
              }}
            />
          </form>

          <div role="presentation" style={{ margin: "auto" }}></div>
        </Card>

        <Card
          sx={{
            borderRadius: "20px",
            marginLeft: "2vw",
            marginY: "4vh",
            borderColor: "black",
            float: "left",
          }}
        >
          <Editor
            height="63vh"
            width="35vw"
            theme="vs-dark"
            value={"//type initial code here"}
            language={language.toLowerCase()}
            options={{
              minimap: {
                enabled: false,
              },
            }}
            onChange={(value, ev) => codeChangeHandler(value)}
          />
        </Card>

        <div
          style={{ marginLeft: "50rem", marginRight: "50rem", clear: "both" }}
        >
          <Button
            sx={{ paddingY: "10px", paddingX: "20px", borderRadius: "15px" }}
            variant="outlined"
            onClick={submitChallenge}
          >
            Submit Challenge
          </Button>
        </div>

        <div style={{ color: "blue", fontSize: "20px", float: "left" }}></div>
      </div>
    </>
  );
}
