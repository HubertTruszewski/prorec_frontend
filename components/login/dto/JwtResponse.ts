export interface JwtResponse {
    token: string;
    user: {
        userId: number;
        username: string;
        email: string;
    }
}