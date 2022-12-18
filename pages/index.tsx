
import {ChallengeDTO} from "../Challenge.dto";
import {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import ChallengeList from "../components/challenges/challengesList";

export default function Home() {
    
    const [challengeList, setChallengeList] = useState<ChallengeDTO[]>([]);
    const [currentChallenge, setCurrentChallenge] = useState<ChallengeDTO>(challengeList[0]);
    const [code, setCode] = useState<string>("");
    const [language, setLanguage] = useState<string>("javascript");
    const [testResults, setTestResults] = useState<string>("");

    const codeChangeHandler = (newCode: string | undefined) => {
        setCode(newCode ?? "");
    }

    useEffect(() => {
        fetch("/api/challenge/all")
            .then(data => data.json())
            .then(challengeList => {
                setChallengeList(challengeList);
            })
    }, [])

  

 

    return (
            <ul>
                <ChallengeList challenges={challengeList}></ChallengeList>
            </ul>
        
    )
}

