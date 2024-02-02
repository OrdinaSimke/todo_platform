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
    .max(1000, {
      message: 'Description must be less than 400 characters.',
    }),
  imageUrl: z.string(),
  deadline: z.date().or(z.null()),
  estimatedHours: z.coerce.number().int().positive(),
  projectId: z.string(),
  isPrivate: z.boolean(),
  url: z.string().url().or(z.literal('')),
});
