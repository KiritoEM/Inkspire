import { prisma } from "@/database";
import { uploadFile } from "@/helpers/file";
import { PostSchema } from "@/schemas/SchemaTypes";
import path from "path";

export const POST_PATH_UPLOAD = path.join(__dirname, "../../uploads", "posts");

/**
 * Saves a new post in the database.
 *
 * @param {PostSchema} postData - The post data
 * @param {number} userId - The user id
 * @param {UploadFileTypes.File[]} images - The images to upload
 * @returns {Promise<PostSchema>}
 * @throws {Error} 
 */
const saveNewPost = async (
    postData: PostSchema,
    userId: number,
    images: UploadFileTypes.File[]
): Promise<PostSchema> => {
    try {
        const postCreated = await prisma.$transaction(async (tx) => {
            return await tx.post.create({
                data: {
                    ...postData,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                    images: {
                        createMany: {
                            data: images.map((img) => ({ url: img.name })),
                        },
                    },
                },
            });
        });

        for (const file of images) {
            try {
                uploadFile(file, `${POST_PATH_UPLOAD}`);
            } catch (error) {
                console.error(`Error uploading file: ${file.name}`, error);
                throw new Error(`Failed to upload file: ${file.name}`);
            }
        }

        return postCreated;
    } catch (error) {
        console.error("Error in saveNewPost:", error);
        throw new Error("Failed to save the post.");
    }
};

export default { saveNewPost };
