
import CV from "./cvType";
import User from "./userTypes";

export interface Application{
    id: number;
    user: User;
    jobId: number;
    cv:  CV; 
    score: number;
    isFavorite: boolean;
}

