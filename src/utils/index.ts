import { AuthUserInfo } from "./userInfo";

class AuthUserInfoSingleton {
  private static instance: AuthUserInfo;

  public static getInstance(): AuthUserInfo {
    if (!AuthUserInfoSingleton.instance) {
      AuthUserInfoSingleton.instance = new AuthUserInfo();
    }

    return AuthUserInfoSingleton.instance;
  }
}

const authUserInfo = AuthUserInfoSingleton.getInstance();

export { authUserInfo };
