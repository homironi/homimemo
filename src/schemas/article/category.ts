import {
  array,
  InferOutput,
  minLength,
  object,
  optional,
  pipe,
  string,
} from "valibot";

export const CategoryMetaSchema = object({
  name: pipe(string(), minLength(1, "カテゴリ名が設定されていません")),
  slug: pipe(string(), minLength(1, "slug が設定されていません")),
  description: optional(string()),
});

export const CategoriesMetaSchema = array(CategoryMetaSchema);

export type CategoryMeta = InferOutput<typeof CategoryMetaSchema>;
export type CategoriesMeta = InferOutput<typeof CategoriesMetaSchema>;
