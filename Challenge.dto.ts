export interface ChallengeDTO {
    challengeId: number;
    name: string;
    description: string;
    codeSnippet: string;
    exampleTestCases: string;
    type: ChallengeType;
    language: LanguageName
}

export enum ChallengeType {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}

export enum LanguageName {
    JAVASCRIPT = "JAVASCRIPT",
    PYTHON = "PYTHON"
}