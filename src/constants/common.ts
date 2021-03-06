let PLAN_SERVER = "/plan/";

if (process.env.NODE_ENV === "development") {
  /** MOCK URL */
  // PLAN_SERVER = "http://10.154.5.146:7002/mock/1134/warpdrive/v1/server/";

  /** DEV URL */
  // PLAN_SERVER = "http://106.14.138.73:8080/";
  PLAN_SERVER = "http://localhost:8080/";
} else {
  PLAN_SERVER = window.externalService.base_url;
}

export { PLAN_SERVER };
