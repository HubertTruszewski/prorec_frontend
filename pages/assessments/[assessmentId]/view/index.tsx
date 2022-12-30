import {useRouter} from "next/router";
import Layout from "../../../../components/layout/Layout";

export default function () {
    const router = useRouter();
    const assessmentId = router.query.assessmentId;
    return (<Layout>
            Hello! - {assessmentId}
        </Layout>)
}