import { BaseColor } from "../../generated/prisma";

export const BASE_COLOR_MAP: Record<BaseColor, string> = {
  [BaseColor.PINK_LIGHT]: "bg-appearance-pink-light",
  [BaseColor.PEACH_LIGHT]: "bg-appearance-peach-light",
  [BaseColor.YELLOW_LIGHT]: "bg-appearance-yellow-light",
  [BaseColor.GREEN_LIGHT]: "bg-appearance-green-light",
  [BaseColor.TEAL_LIGHT]: "bg-appearance-teal-light",
  [BaseColor.SKY_LIGHT]: "bg-appearance-sky-light",
  [BaseColor.BLUE_LIGHT]: "bg-appearance-blue-light",
  [BaseColor.PURPLE_LIGHT]: "bg-appearance-purple-light",
  [BaseColor.LAVENDER_LIGHT]: "bg-appearance-lavender-light",
  [BaseColor.GRAY_LIGHT]: "bg-appearance-gray-light",
  [BaseColor.RED]: "bg-appearance-red",
  [BaseColor.ORANGE]: "bg-appearance-orange",
  [BaseColor.YELLOW]: "bg-appearance-yellow",
  [BaseColor.GREEN]: "bg-appearance-green",
  [BaseColor.TEAL]: "bg-appearance-teal",
  [BaseColor.CYAN]: "bg-appearance-cyan",
  [BaseColor.BLUE]: "bg-appearance-blue",
  [BaseColor.PINK]: "bg-appearance-pink",
  [BaseColor.PURPLE]: "bg-appearance-purple",
  [BaseColor.GRAY]: "bg-appearance-gray",
};

export function getBaseColorClass(color: BaseColor): string {
  return BASE_COLOR_MAP[color] ?? "bg-appearance-blue";
}
