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

export const OPPOSITE_BASE_COLOR_MAP: Record<BaseColor, string> = {
  [BaseColor.PINK_LIGHT]: "bg-appearance-red",
  [BaseColor.PEACH_LIGHT]: "bg-appearance-orange",
  [BaseColor.YELLOW_LIGHT]: "bg-appearance-yellow",
  [BaseColor.GREEN_LIGHT]: "bg-appearance-green",
  [BaseColor.TEAL_LIGHT]: "bg-appearance-teal",
  [BaseColor.SKY_LIGHT]: "bg-appearance-cyan",
  [BaseColor.BLUE_LIGHT]: "bg-appearance-blue",
  [BaseColor.PURPLE_LIGHT]: "bg-appearance-purple",
  [BaseColor.LAVENDER_LIGHT]: "bg-appearance-pink",
  [BaseColor.GRAY_LIGHT]: "bg-appearance-gray",
  [BaseColor.RED]: "bg-appearance-pink-light",
  [BaseColor.ORANGE]: "bg-appearance-peach-light",
  [BaseColor.YELLOW]: "bg-appearance-yellow-light",
  [BaseColor.GREEN]: "bg-appearance-green-light",
  [BaseColor.TEAL]: "bg-appearance-teal-light",
  [BaseColor.CYAN]: "bg-appearance-sky-light",
  [BaseColor.BLUE]: "bg-appearance-blue-light",
  [BaseColor.PINK]: "bg-appearance-lavender-light",
  [BaseColor.PURPLE]: "bg-appearance-purple-light",
  [BaseColor.GRAY]: "bg-appearance-gray-light",
};

export function isBaseColorLight(color: BaseColor): boolean {
  return color.endsWith("_LIGHT");
}

export function getBaseColorClass(color: BaseColor): string {
  return BASE_COLOR_MAP[color] ?? "bg-appearance-blue";
}

export function getOppositeBaseColorClass(color: BaseColor): string {
  return OPPOSITE_BASE_COLOR_MAP[color] ?? "bg-appearance-blue-light";
}
