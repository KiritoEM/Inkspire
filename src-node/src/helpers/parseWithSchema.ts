import { ZodIssueCode, ZodSchema } from "zod";

type parseWithSchemaType<T> = {
    data: unknown;
    schema: ZodSchema<T>;
    errorMessage: string;
};

const parseWithSchema = <T>({
    data,
    schema,
    errorMessage,
}: parseWithSchemaType<T>) => {
    const schemaZod = schema.parse(data, {
        errorMap: (error: { code: string; }, ctx: { defaultError: any; }) => {
            if (error.code === ZodIssueCode.unrecognized_keys) {
                return { message: errorMessage };
            }
            return { message: ctx.defaultError };
        },
    });

    return schemaZod;
};

export default parseWithSchema;