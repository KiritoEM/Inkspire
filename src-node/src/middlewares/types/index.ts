import { JwtPayload } from 'jsonwebtoken';

interface UserJWTPayload extends JwtPayload {
    id: number;
    pseudo: string;
    email: string;
}

export type { UserJWTPayload }