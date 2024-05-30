export interface Form {
    ID_form: number;
    name: string;
    question: string;
    topicA: string;
    topicB: string;
    topicC: string;
    avatar: string;
}

export interface FormResult {
    formId: number;
    result: number;
}