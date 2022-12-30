export interface NewAssessmentDTO {
    [key: string]: string | number | number[];
    email: string;
    expiryDate: string;
    solvingTime: number;
    challengesIds: number[]
    authorId: number;
}