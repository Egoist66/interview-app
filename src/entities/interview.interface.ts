export interface IInterView {
    id: string;
    company: string;
    vacancyLink: string;
    hrName: string;
    contactTelegram?: string;
    contactPhone?: string;
    createdAt: string | number;
    salaryFrom?: number;
    salaryTo?: number;
    stages?: IStage[];
    result?: 'Отказ' | 'Оффер' | '';
}

export interface IStage {
    id: string | number;
    name: string;
    date: string;
    description: string;
}