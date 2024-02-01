import * as z from 'zod';

export const todoFormSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters.',
  }),
  description: z
    .string()
    .min(3, {
      message: 'Description must be at least 3 characters.',
    })
    .max(400, {
      message: 'Description must be less than 400 characters.',
    }),
  imageUrl: z.string(),
  startDateTime: z.date(),
  estimatedHours: z.coerce.number().int().positive(),
  projectId: z.string(),
  isPrivate: z.boolean(),
  url: z.string().url(),
});