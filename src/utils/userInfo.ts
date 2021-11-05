import { CurrentUserType } from "@/types";
import { Observable, BehaviorSubject } from "rxjs";

export class AuthUserInfo {
  private currentUserSubject: BehaviorSubject<CurrentUserType>;
  public currentUser: Observable<CurrentUserType>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<CurrentUserType>(
      JSON.parse(localStorage.getItem("currentUser") as string),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getCurrentUserValue = (): CurrentUserType => {
    return this.currentUserSubject.value;
  };

  public removeCurrentValue = (): void => {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null as any);
  };

  public setCurrentUserValue = (authInfo: CurrentUserType): void => {
    localStorage.setItem("currentUser", JSON.stringify(authInfo));
    this.currentUserSubject.next(authInfo);
  };
}
