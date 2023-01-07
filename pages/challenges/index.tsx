import {ChallengeDTO} from "../../Challenge.dto";
import {Card, Link} from "@mui/material";
import {useEffect, useState} from "react";
import {authHeader} from "../../services/authHeader";
import {AuthService} from "../../services/AuthService";
import {useRouter} from "next/router";

export default function () {
    const router = useRouter();
    const [challengeList, setChallengeList] = useState<ChallengeDTO[]>([]);

    useEffect(() => {
        if (AuthService.protectSite(router)) {
            return;
        }
        fetch("/api/challenge/all", {
            headers: {...authHeader()}
        })
            .then((data) => {
                return data.json();
            })
            .then((challengeList) => {
                setChallengeList(challengeList);
            });
    }, []);

    return (
        <div style={{margin: "50px 50px"}}>
            {challengeList.map((challenge) => (
                <Card key={challenge.challengeId}
                      sx={{
                          borderRadius: "20px",
                          padding: "15px",
                          textAlign: "center",
                          justifyContent: "center",
                          marginRight: "2rem",
                          marginBottom: "2rem",
                          borderColor: "black",
                          height: "10rem",
                          width: "16rem",
                          float: "left",
                      }}
                >
                    <span style={{fontSize: "2rem",}}>{challenge.name}</span>
                    <br></br>

                    <button style={{margin: "15px", background: "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #BA53FF",
                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)", border: "none", borderRadius: "20px", width: "10rem", height: "3rem"}} >
                        <Link
                            underline="none"
                            color="inherit"
                            href={"/challenges/" + challenge.challengeId + "/edit"}
                        >
                            <span style={{fontSize: "17px"}}>Edit</span>
                        </Link>
                    </button>
                </Card>
            ))}
            <Card
                sx={{
                    borderRadius: "20px",
                    padding: "15px",
                    textAlign: "center",
                    // margin: "2rem",
                    borderColor: "black",
                    height: "10rem",
                    width: "16rem",
                    float: "left",
                }}
            >
                <Link underline="none" color="inherit" href="/challenges/create">
                    <span style={{fontSize: "5rem", margin: "1rem"}}>+</span>
                </Link>
            </Card>
        </div>
    );
}

