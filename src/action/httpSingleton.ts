import { RestClient } from "@cmss/http-client-rxjs";
import { RespInterceptor } from "./respInterceptor";

class HttpSingleton {
  private static instance: RestClient;

  public static getInstance(): RestClient {
    if (!HttpSingleton.instance) {
      HttpSingleton.instance = new RestClient({
        interceptors: [new RespInterceptor()],
      });
    }

    return HttpSingleton.instance;
  }
}

export { HttpSingleton };
