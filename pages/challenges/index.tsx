import {ChallengeDTO} from "../../Challenge.dto";
import {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link'
import { useRouter } from "next/router";
import { Card, Button } from '@mui/material';
import { border, borderColor } from "@mui/system";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from "@mui/material/colors";

const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0971f1',
        darker: '#053e85',
      },
      neutral: {
        main: "#9542cc",
        contrastText: '#fff',
      },
    },
  });

  declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: React.CSSProperties['color'];
      };
    }
  
    interface Palette {
      neutral: Palette['primary'];
    }
    interface PaletteOptions {
      neutral: PaletteOptions['primary'];
    }
  
    interface PaletteColor {
      darker?: string;
    }
    interface SimplePaletteColorOptions {
      darker?: string;
    }
    interface ThemeOptions {
      status: {
        danger: React.CSSProperties['color'];
      };
    }
  }

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [challengeList, setChallengeList] = useState<ChallengeDTO[]>([]);
    const [currentChallenge, setCurrentChallenge] = useState<ChallengeDTO>();
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
            <div style={{backgroundColor: "#1c4190"}}>
              <Card sx={{borderRadius: "20px", padding: "10px", marginLeft :"3rem", marginY:"2rem", borderColor: "black", width:"65rem", float: "left"}}>
              <h1><span style={{color: "purple", fontWeight: "bold"}}>{currentChallenge?.name}</span></h1>
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

              <Card sx={{borderRadius: "20px", marginRight :"3rem", marginY:"2rem", padding: "10px", borderColor: "black", width:"40rem", height:"60vh", float: "right"}}>
              <li><span style={{color: "purple", fontWeight: "bold"}}>Example test case:</span> {currentChallenge?.exampleTestCases}</li>
              </Card>
              
              <Card sx={{borderRadius: "20px", marginLeft :"3rem", marginY:"2rem", borderColor: "black", width:"65rem", height:"35rem", float: "left"}}>
              <Editor
                  height="50rem"
                  width="90rem"
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
            

            

            <div style={{marginLeft: "50rem", marginRight: "50rem", clear: "both"}}>
            <ThemeProvider theme={theme}>
                <Button sx={{paddingY: "20px", paddingX: "40px", borderRadius: "15px", }} color="neutral" variant="outlined" onClick={submitCode}>Submit code!</Button>
            </ThemeProvider>
            </div>
            
            
            <br/>
            <div style={{color: "blue", fontSize: "20px"}}>{testResults}</div>
            <br/>
          </div>  
        </>
    )
}

