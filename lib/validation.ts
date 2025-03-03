import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(250),
  category: z.string().min(1).max(20),
  link: z.string().url(),
  pitch: z.string().min(10),
});
