export enum DietType {
  "SPECIAL_MILK" = 0,
  "BREAST_MILK" = 1,
  "VEGETABLES" = 2,
  "MEAT" = 3,
  "FRUIT" = 4,
  "MAIN_FOOD" = 5,
  "PROCESSED_FOOD" = 6,
}

export const DIET_TYPE_COLUMNS = ["特奶", "母乳", "蔬菜", "肉食", "水果", "主食", "加工食品"];

export interface Diet {
  personUuid?: string;
  uuid?: string;
  dietContent: string;
  dietTime: string;
  dietType: DietType;
  pheValue: number;
  specialMilk: number /** 特奶 */;
  breastMilk: number /** 母乳 */;
}
