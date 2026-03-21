import { BaseColor } from "../../generated/prisma";

export const BASE_COLOR_MAP: Record<BaseColor, string> = {
  [BaseColor.PINK_LIGHT]: "bg-appearance-pink-light/50",
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

export const BASE_COLOR_ACCENT_MAP: Record<BaseColor, string> = {
  [BaseColor.PINK_LIGHT]: "bg-appearance-pink-light/75",
  [BaseColor.PEACH_LIGHT]: "bg-appearance-peach-light/75",
  [BaseColor.YELLOW_LIGHT]: "bg-appearance-yellow-light/75",
  [BaseColor.GREEN_LIGHT]: "bg-appearance-green-light/75",
  [BaseColor.TEAL_LIGHT]: "bg-appearance-teal-light/75",
  [BaseColor.SKY_LIGHT]: "bg-appearance-sky-light/75",
  [BaseColor.BLUE_LIGHT]: "bg-appearance-blue-light/75",
  [BaseColor.PURPLE_LIGHT]: "bg-appearance-purple-light/75",
  [BaseColor.LAVENDER_LIGHT]: "bg-appearance-lavender-light/75",
  [BaseColor.GRAY_LIGHT]: "bg-appearance-gray-light/75",
  [BaseColor.RED]: "bg-appearance-pink-light/50",
  [BaseColor.ORANGE]: "bg-appearance-peach-light/50",
  [BaseColor.YELLOW]: "bg-appearance-yellow-light/50",
  [BaseColor.GREEN]: "bg-appearance-green-light/50",
  [BaseColor.TEAL]: "bg-appearance-teal-light/50",
  [BaseColor.CYAN]: "bg-appearance-sky-light/50",
  [BaseColor.BLUE]: "bg-appearance-blue-light/50",
  [BaseColor.PINK]: "bg-appearance-lavender-light/50",
  [BaseColor.PURPLE]: "bg-appearance-purple-light/50",
  [BaseColor.GRAY]: "bg-appearance-gray-light/50",
};

export function isBaseColorLight(color: BaseColor): boolean {
  return color.endsWith("_LIGHT");
}

export function getBaseColorClass(color: BaseColor): string {
  return BASE_COLOR_MAP[color] ?? "bg-appearance-blue";
}

export function getBaseAccentColorClass(color: BaseColor): string {
  return BASE_COLOR_ACCENT_MAP[color] ?? "bg-appearance-blue-light";
}
