import {JwtResponse} from "../components/login/dto/JwtResponse";

export const authHeader = () => {
    const user: JwtResponse = JSON.parse(localStorage.getItem("user")!);

    if (user && user.token) {
        return {Authorization: 'Bearer ' + user.token}
    }

    return {Authorization: ''};
}