import { IconButton, ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { ChallengeDTO } from "../../Challenge.dto";
import CommentIcon from "@mui/icons-material/Comment";

export default function ChallengeItem(props: { challenge: ChallengeDTO }) {
  const router = useRouter();

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => router.push("/" + props.challenge.challengeId)}>
            <CommentIcon/>
          </IconButton>
        }>
        <ListItemText primary={props.challenge.name}/>
      </ListItem>
    </>
  );
}
