import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  start_time: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "start_time must be a valid date",
  }),
  end_time: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "end_time must be a valid date",
  }),
  location: z.string().min(1),
}).refine(data => new Date(data.start_time) < new Date(data.end_time), {
  message: "start_time must be before end_time",
});
