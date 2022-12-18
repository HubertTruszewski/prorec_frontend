import ChallengeItem from "./ChallengeItem";
import { ChallengeDTO } from "../../Challenge.dto";
import List from '@mui/material/List';

export default function ChallengeList(props: {challenges: ChallengeDTO[]}){
    return(
        <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {props.challenges.map((challenge: ChallengeDTO) =>
        <ChallengeItem challenge={challenge}/>
        
        )}
        </List>
        </>
        
        
       
    )
}


