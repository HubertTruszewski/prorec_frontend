import {useRouter} from "next/router";
import {useEffect} from "react";
import {JwtResponse} from "../components/login/dto/JwtResponse";

const parseJwt = (token: string) => {
    try {
        return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    } catch (e) {
        return null;
    }
};

export interface AuthVerifyProps {
    logOut: () => void;
}

export const AuthVerify = (props: AuthVerifyProps) => {
    const router = useRouter();
    let path = router.asPath;

    useEffect(() => {
        const user: JwtResponse = JSON.parse(localStorage.getItem("user")!);

        if (user) {
            const decodedJwt = parseJwt(user.token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut();
            }
        }
    }, [path, props])

    return <></>
}