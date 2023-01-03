export interface AttemptSummaryDTO {
    syntaxError: boolean;
    testPassed: number;
    testFailed: number;
    details: string;
}