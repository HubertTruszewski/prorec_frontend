import {ChallengeDTO} from "../Challenge.dto";
import {useEffect, useState} from "react";
import ChallengeList from "../components/challenges/challengesList";

export default function Home() {

    const [challengeList, setChallengeList] = useState<ChallengeDTO[]>([]);
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

