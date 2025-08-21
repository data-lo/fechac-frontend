import * as z from "zod";

export const FILE_PROJECT_SCHEMA = z
  .object({
    file: z
      .instanceof(File)
      .array()
      .min(1, { message: "Debes subir al menos un archivo" }),
  })
  .superRefine((data, ctx) => {
    if (data.file.some((item) => !item.name.endsWith(".csv"))) {
      ctx.addIssue({
        code: "custom",
        path: ["file"],
        message: "Solo se permiten archivos CSV",
      });
    }
  });


export type FILE_PROJECT_FORM = z.infer<typeof FILE_PROJECT_SCHEMA>;