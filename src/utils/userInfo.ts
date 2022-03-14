import { CurrentUserType } from "@/types";
import { Observable, BehaviorSubject } from "rxjs";
import Cookies from "js-cookie";

export class AuthUserInfo {
  private currentUserSubject: BehaviorSubject<CurrentUserType>;
  public currentUser: Observable<CurrentUserType>;

  constructor() {
    const currentUser = Cookies.get("currentUser") || JSON.stringify("");
    this.currentUserSubject = new BehaviorSubject<CurrentUserType>(JSON.parse(currentUser as any));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getCurrentUserValue = (): CurrentUserType => {
    return this.currentUserSubject.value;
  };

  public removeCurrentValue = (): void => {
    Cookies.remove("currentUser");
    this.currentUserSubject.next(null as any);
  };

  public setCurrentUserValue = (authInfo: CurrentUserType): void => {
    Cookies.set("currentUser", JSON.stringify(authInfo), { expires: 7 });
    this.currentUserSubject.next(authInfo);
  };
}
