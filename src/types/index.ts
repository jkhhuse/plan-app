/** 消息体封装 */
export interface HttpMessage<T> {
  code: number | string;
  data: T;
  message: string;
}

/** vant type */
export interface VantAreaType {
  code: string;
  name: string;
}

export interface CurrentUserType {
  token: string;
  userId: string;
}
