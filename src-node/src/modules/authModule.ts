import AuthController from "@/controllers/AuthController";
import AuthRouter from "@/routes/auth";
import AuthServices from "@/services/authServices";

export default {
    controller: AuthController,
    router: AuthRouter,
    service: AuthServices
}