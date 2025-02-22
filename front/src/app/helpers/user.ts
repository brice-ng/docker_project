import { LocalStorage } from './localStorage';

export class UserHelper {

  dialog = false;
  constructor() {

  }


  static isConnect(): boolean {

    return LocalStorage.getItem('easy_user') !== (undefined || null);
  }

  static disconect(): void {
    LocalStorage.delete('easy_user');
  }


  static getUser(): any {
    return JSON.parse(LocalStorage.getItem('easy_user'));
  }

  static getUserId(): any {
    const user = LocalStorage.getItem('easy_user');
    const userJson = JSON.parse(user);

    return userJson.id_User;
  }


  static connect(user: any): void {
    LocalStorage.setItem('easy_user', JSON.stringify(user));
  }


  static  refresh(token:any,refreshToken:any){
    const user = LocalStorage.getItem('easy_user');
          user.token = token;
          user.refreshToken=refreshToken;
    LocalStorage.setItem('easy_user', JSON.stringify(user));
  }


}
