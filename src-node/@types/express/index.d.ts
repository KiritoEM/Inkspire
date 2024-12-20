import { User } from '@prisma/client';
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            files: {
                [key: string]: UploadFileTypes.File | undefined;
            },
            user: Partial<User>
        }
    }

    namespace UploadFileTypes {
        interface File {
            name: string;
            data: Buffer;
            size: number;
            encoding: string;
            tempFilePath: string;
            truncated: boolean;
            mimetype: string;
            md5: string;
            mv: (dest: string, callback: (err: any) => void) => void;
        }
    }
}