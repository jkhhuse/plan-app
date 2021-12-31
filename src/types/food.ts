export interface Food {
  name: string;
  phe: string;
  protein: string;
  rule: string;
  type: string;
  uuid: string;
}

/** 食物提示项 */
export interface FoodItem {
  name: string;
  uuid: string;
  phe: number;
}
