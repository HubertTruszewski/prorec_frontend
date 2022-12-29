import { ChallengeDTO, ChallengeType, LanguageName } from "../Challenge.dto";
import { Card, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const challengesManagement = () => {
  const router = useRouter();
  const [challengeList, setChallengeList] = useState<ChallengeDTO[]>([]);

  useEffect(() => {
    fetch("/api/challenge/all")
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
        <Card
          sx={{
            borderRadius: "20px",
            padding: "5px",
            justifyContent: "center",
            margin: "3rem",
            borderColor: "black",
            height: "10rem",
            width: "16rem",
            float: "left",
          }}
        >
          {challenge.name}
          <br></br>
          <Link
            underline="none"
            color="inherit"
            href={"/challenges/" + challenge.challengeId + "/edit"}
          >
            <span style={{ fontSize: "1rem", margin: "2rem" }}>manage</span>
          </Link>
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
          <span style={{ fontSize: "5rem", margin: "2rem" }}>+</span>
        </Link>
      </Card>
    </div>
  );
};

export default challengesManagement;
