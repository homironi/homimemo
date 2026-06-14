import { z } from "astro/zod";
import { reference } from "astro:content";

export const affiliateSchema = z.object({
  title: z.string(),
  tags: z.optional(z.array(reference("tags"))),
});

export type AffiliateMeta = z.infer<typeof affiliateSchema>;
