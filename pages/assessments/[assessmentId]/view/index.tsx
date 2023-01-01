import {useRouter} from "next/router";

export default function () {
    const router = useRouter();
    const assessmentId = router.query.assessmentId;
    return (<>
            Hello! - {assessmentId}
        </>
    )
}