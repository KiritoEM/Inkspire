import { ZodIssueCode, ZodSchema } from "zod";

type parseWithSchemaType<T> = {
    data: unknown;
    schema: ZodSchema<T>;
    errorMessage: string;
};

/**
 * Parses the given data against the provided Zod schema.
 *
 * @template T - The type of the schema.
 * @param {parseWithSchemaType<T>} param - An object containing the data to be parsed, the schema, and an error message.
 * @param {unknown} param.data - The data to be validated 
 * @param {ZodSchema<T>} param.schema - The Zod schema to validate the data
 * @param {string} param.errorMessage - The error message when not recognized
 * @returns {T} - The parsed data  if validated
 * @throws Error
 */

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