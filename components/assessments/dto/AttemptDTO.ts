import {AttemptSummaryDTO} from "../AttemptSummaryDTO";

export interface AttemptDTO {
    attemptId: number;
    submittedCode: string;
    codeError: boolean;
    codeErrorDetails: string;
    submitDate: string;
    attemptSummary: AttemptSummaryDTO;
    challengeId: number;
    assessmentId: number;
}