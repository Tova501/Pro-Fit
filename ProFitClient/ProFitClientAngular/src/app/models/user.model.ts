export class UserPostModel {
    constructor(
      public firstName: string,
      public lastName: string,
      public email: string,
      public password: string,
    ) { }
  }
  
  export class UserLogin {
    constructor(public email: string, public password: string) { }
  }
  
  export class User {
      constructor(
      public id: number,
      public name: string,
      public email: string,
      public password: string,
      public isActive: boolean,
      public userId: number) { }
  }

  export const emptyUser = new User(0, '', '', '', false, 0);
  