import {ChallengeDTO, ChallengeType, LanguageName} from "../../Challenge.dto";
import {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link'
import { useRouter } from "next/router";
import { Card, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from "./../../components/layout/Layout"


export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [challengeList, setChallengeList] = useState<ChallengeDTO[]>([]);
    const [currentChallenge, setCurrentChallenge] = useState<ChallengeDTO>(defaultChallengeDTO);
    const [code, setCode] = useState<string>("");
    const [language, setLanguage] = useState<string>("javascript");
    const [testResults, setTestResults] = useState<string>("");

    const codeChangeHandler = (newCode: string | undefined) => {
        setCode(newCode ?? "");
    }

    function returnToMenuHandler() {
        router.push('/')
    }

    useEffect(() => {
        fetch("/api/challenge/all")
            .then(data => {return data.json()})
            .then(challengeList => {
                setChallengeList(challengeList);
                setCurrentChallenge(challengeList[0]);
                setLanguage(challengeList[0].language.toLowerCase());
                setCode(challengeList[0]?.codeSnippet);
                setIsLoading(false)
            })
    }, [])

   


    useEffect(() => {
        if (currentChallenge === undefined) {
            return;
        }
        console.log(currentChallenge);
        setLanguage(currentChallenge.language.toLowerCase());
        setCode(currentChallenge?.codeSnippet);
    }, [currentChallenge])

    if(isLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }



    const submitCode = () => {
        fetch("/api/attempt/perform",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        challengeId: currentChallenge.challengeId,
                        code: code
                    }
                )
            }).then(result => result.text())
            .then(text => setTestResults(text));
    }

    return (<>
            <Layout>
              <div style={{height: "40vh"}}>
                <Card sx={{borderRadius: "20px", paddingY: "5px", paddingX: "10px", marginX :"3rem", marginY:"2vh", borderColor: "black", heightMax: "18vh", width:"65rem", float: "left"}}>
                <h1 style={{marginTop: "0px"}}><span style={{color: "purple", fontWeight: "bold"}}>{currentChallenge?.name}</span></h1>
                <ul>
                    <li><span style={{color: "purple", fontWeight: "bold"}}>Task:</span> {currentChallenge?.description}</li>
                    <li><span style={{color: "purple", fontWeight: "bold"}}>Programming language:</span> {currentChallenge?.language}</li>
                    <li><span style={{color: "purple", fontWeight: "bold"}}>Difficulty level:</span> {currentChallenge?.type.toLowerCase()}</li>
                </ul>
                <div role="presentation" style={{margin: "auto"}}>
                    <Breadcrumbs aria-label="breadcrumb">
                    <span style={{color: "purple", fontWeight: "bold"}}>Tasks:</span>

                    {challengeList.map((challenge) => (
                        <Link underline="hover" color="inherit" onClick={() => setCurrentChallenge(challenge)}>
                        {challenge.name}
                        </Link>))}
                        
                    </Breadcrumbs>
                </div>
                </Card>

                <Card sx={{borderRadius: "20px", marginRight :"3rem", marginY:"2vh", padding: "10px", borderColor: "black", width:"40rem", height:"80vh", float: "right"}}>
                <li><span style={{color: "purple", fontWeight: "bold"}}>Example test case:</span> {currentChallenge?.exampleTestCases}</li>
                </Card>
                
                <Card sx={{borderRadius: "20px", marginLeft :"3rem", marginY:"3vh", borderColor: "black",  float: "left"}}>
                <Editor
                    height="58vh"
                    width="65rem"
                    theme="vs-dark"
                    value={code}
                    language={language}
                    options={{
                        minimap: {
                            enabled: false
                        }
                    }}
                    onChange={(value, ev) => codeChangeHandler((value))}
                />
                </Card>
              </div>
            

            

            <div style={{marginLeft: "50rem", marginRight: "50rem", clear: "both"}}>
                <Button sx={{paddingY: "10px", paddingX: "20px", borderRadius: "15px", }} variant="outlined" onClick={submitCode}>Submit Challenge!</Button>
        
            </div>
            
            
            
            <div style={{color: "blue", fontSize: "20px", float: "left"}}>{testResults}</div>
          </Layout>  
        </>
    )
}

const defaultChallengeDTO: ChallengeDTO = {
  challengeId: 0,
  codeSnippet: "",
  description: "",
  exampleTestCases: "",
  language: LanguageName.JAVASCRIPT,
  name: "",
  type: ChallengeType.EASY
}



