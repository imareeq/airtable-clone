import * as z from 'zod';

export const BaseColorSchema = z.enum(['PINK_LIGHT', 'PEACH_LIGHT', 'YELLOW_LIGHT', 'GREEN_LIGHT', 'TEAL_LIGHT', 'SKY_LIGHT', 'BLUE_LIGHT', 'PURPLE_LIGHT', 'LAVENDER_LIGHT', 'GRAY_LIGHT', 'RED', 'ORANGE', 'YELLOW', 'GREEN', 'TEAL', 'CYAN', 'BLUE', 'PINK', 'PURPLE', 'GRAY'])

export type BaseColor = z.infer<typeof BaseColorSchema>;