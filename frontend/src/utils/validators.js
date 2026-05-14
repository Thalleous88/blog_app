import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password must contain a letter')
    .regex(/[0-9]/, 'Password must contain a number')
})

export const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(180, 'Title is too long'),
  category: z.string().max(80, 'Category is too long').optional(),
  content: z.string().min(20, 'Content must be at least 20 characters')
})

export const commentSchema = z.object({
  content: z.string().min(2, 'Comment must be at least 2 characters').max(2000, 'Comment is too long')
})
