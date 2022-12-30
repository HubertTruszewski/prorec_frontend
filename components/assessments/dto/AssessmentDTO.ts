export interface AssessmentDTO {
    assessmentId: number;
    email: string;
    createDate: string;
    expiryDate: string;
    solvingTime: number;
    status: AssessmentStatus;
    deadline: string;
    authorId: string;
    challengesIds: number[];
}

export enum AssessmentStatus {
    AWAITING = "AWAITING",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    EXPIRED = "EXPIRED"
}