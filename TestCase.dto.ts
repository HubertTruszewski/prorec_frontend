export interface TestCaseDTO{
    challengeId: number;
    expression: string;
    expectedValue: string;
    expectedValueType: string;
}

export interface TestCaseIdDTO{
    testCaseId: number;
    challengeId: number;
    expression: string;
    expectedValue: string;
    expectedValueType: string;
}