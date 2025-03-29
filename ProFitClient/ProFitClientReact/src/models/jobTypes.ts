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
    skills: string;
    yearsOfExperienceRequired: number;
    location: string;
    recruiterId: number;
}