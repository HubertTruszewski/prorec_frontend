import { IconButton, ListItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { useRouter } from "next/router";
import { ChallengeDTO } from '../../Challenge.dto';
import CommentIcon from '@mui/icons-material/Comment';

export default function ChallengeItem(props: {challenge: ChallengeDTO}){
    const router = useRouter();
    function attemptHandler() {
        router.push('/' + props.challenge.challengeId)}
    
    return (
        <>
        <ListItem secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={attemptHandler}>
            <CommentIcon />
        </IconButton>
        }>
        <ListItemText primary={props.challenge.name}/>
        </ListItem>
        
        </>
    )


}

