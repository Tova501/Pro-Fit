export interface JobPostModel {
    title: string;
    description: string;
    company: string;
    requirements: string;
    skills: string;
    yearsOfExperienceRequired: number;
    location: string;
}

export interface Job {
    id: number;
    title: string;
    description: string;
    requirements: string;
    company: string;
    skills: string;
    yearsOfExperienceRequired: number;
    location: string;
    recruiterId: number;
    isActive: boolean;
    createdAt: Date
}