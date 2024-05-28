export interface Form {
    name: string;
    question: string;
    topicA: string;
    topicB: string;
    topicC: string;
}
export interface FormResult {
    formId: number;
    userId: number;
    result: number;
}