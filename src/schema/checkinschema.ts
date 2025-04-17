import { z } from 'zod';

export const checkInSchema = z.object({
  attendee_id: z.number().int().positive(),
});
