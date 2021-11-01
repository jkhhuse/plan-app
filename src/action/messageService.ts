import { BehaviorSubject } from "rxjs";

class MessageService {
  private static instance: BehaviorSubject<any>;

  public static getInstance(): BehaviorSubject<any> {
    if (!MessageService.instance) {
      MessageService.instance = new BehaviorSubject(1);
    }

    return MessageService.instance;
  }
}

const subject = MessageService.getInstance();

export const messageService = {
  sendMessage: (message: string): any => subject.next({ text: message }),
  clearMessages: (): any => subject.next(""),
  getMessage: (): any => subject.asObservable(),
};
