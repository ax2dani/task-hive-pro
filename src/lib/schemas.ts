import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(100, { message: 'Title must be 100 characters or less.' }),
  description: z
    .string()
    .min(1, { message: 'Description is required.' })
    .max(500, { message: 'Description must be 500 characters or less.' }),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
