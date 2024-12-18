import { prisma } from "@/database"
import { PostSchema } from "@/schemas/SchemaTypes"

const saveNewPost = async (postData: PostSchema, userId: number): Promise<PostSchema> => {
    const post = await prisma.post.create({
        data: {
            ...postData,
            userId
        }
    })

    return post;
}

export default { saveNewPost }