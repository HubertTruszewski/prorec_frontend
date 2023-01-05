import {LoginUserDTO} from "../components/login/dto/LoginUserDTO";
import {NewUserDTO} from "../components/login/dto/NewUserDTO";
import {JwtResponse} from "../components/login/dto/JwtResponse";

export class AuthService {
    static login(loginUser: LoginUserDTO): Promise<Response> {
        return fetch("/api/user/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUser)
        })
            .then(response => {
                    if (response.ok) {
                        response.json().then(user => localStorage.setItem("user", JSON.stringify(user)));
                    }
                    return response;
                }
            )
    }

    static logout(): void {
        localStorage.removeItem("user");
    }

    static register(newUserDTO: NewUserDTO): Promise<Response> {
        return fetch("/api/user/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserDTO)
        })
    }

    static getCurrentUser(): JwtResponse {
        return JSON.parse(localStorage.getItem("user")!);
    }

    static protectSite(router: any): boolean {
        if (localStorage) {
            const user: JwtResponse = AuthService.getCurrentUser();
            if (user === null) {
                router.push("/login");
                return true;
            }
            return false;
        }
        return true;
    }
}