import { z } from 'zod';

export const attendeeRegisterSchema = z.object({
  event_id: z.number({ required_error: 'Event ID is required' }).int().positive(),
});
