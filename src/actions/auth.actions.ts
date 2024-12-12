import { Response } from "../helpers/types";

const LOGIN = async <T>(): Promise<Response<T>> => {
    try {
        

        return {
            status: "error",
            message: "Login successful",
            data: null as T,
        };
    } catch (err) {

        throw new Error("An error occurred when logging in.");
    }
};

export default { LOGIN };
