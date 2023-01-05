import {ChallengeDTO} from "../../Challenge.dto";
import {Button, Card, Link} from "@mui/material";
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
        <div>
            {challengeList.map((challenge) => (
                <Card key={challenge.challengeId}
                      sx={{
                          borderRadius: "20px",
                          padding: "5px",
                          textAlign: "center",
                          justifyContent: "center",
                          margin: "3rem",
                          borderColor: "black",
                          height: "10rem",
                          width: "16rem",
                          float: "left",
                      }}
                >
                    <span style={{fontSize: "2rem"}}>{challenge.name}</span>
                    <br></br>

                    <Button sx={{margin: "15px"}} variant="contained">
                        <Link
                            underline="none"
                            color="inherit"
                            href={"/challenges/" + challenge.challengeId + "/edit"}
                        >
                            Edit
                        </Link>
                    </Button>
                </Card>
            ))}
            <Card
                sx={{
                    borderRadius: "20px",
                    padding: "5px",
                    textAlign: "center",
                    margin: "3rem",
                    borderColor: "black",
                    height: "10rem",
                    width: "16rem",
                    float: "left",
                }}
            >
                New challenge
                <br></br>
                <Link underline="none" color="inherit" href="/challenges/create">
                    <span style={{fontSize: "5rem", margin: "2rem"}}>+</span>
                </Link>
            </Card>
        </div>
    );
};

