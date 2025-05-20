interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    hasUploadedGeneralCV: boolean;
};

export interface UserPutModel {
    firstName: string;
    lastName: string
}

export const emptyUserModel:User = {
    id : 0,
    firstName : '' ,
    lastName: '',
    email: '',
    password: '',
    createdAt: Date(),
    updatedAt: Date(),
    hasUploadedGeneralCV: false
}
export default User;