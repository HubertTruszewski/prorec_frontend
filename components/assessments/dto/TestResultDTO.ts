export interface TestResultDTO {
    expression: string;
    expectedValue: string;
    expectedValueType: string;
    passed: boolean;
    details: string;
}