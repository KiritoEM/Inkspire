import { ReactNode } from "react";

interface RootLayout {
    children: ReactNode;
}

interface Response<T> {
    status: "success" | "error";
    message: string;
    data?: T;
}

export type { RootLayout, Response }