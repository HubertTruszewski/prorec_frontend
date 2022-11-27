import {ChallengeDTO} from "./Challenge.dto";
import {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";

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
                setCurrentChallenge(challengeList[0]);
                setLanguage(challengeList[0].language.toLowerCase());
                setCode(challengeList[0]?.codeSnippet);
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
            <h1>{currentChallenge?.name}</h1>
            <ol>
                <li>{currentChallenge?.description}</li>
                <li>{currentChallenge?.exampleTestCases}</li>
                <li>{currentChallenge?.language}</li>
                <li>{currentChallenge?.type.toLowerCase()}</li>
            </ol>
            <Editor
                height="90vh"
                width="70vw"
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
            <button onClick={submitCode}>Submit code!</button>
            <br/>
            {testResults}
            <br/>
            Challenges list:
            <ul>
                {challengeList.map(challenge => <li>
                    <a href="#" onClick={() => {
                        setCurrentChallenge(challenge);
                        setTestResults("");
                    }}>{challenge.name}</a>
                </li>)}
            </ul>
        </>
    )
}
