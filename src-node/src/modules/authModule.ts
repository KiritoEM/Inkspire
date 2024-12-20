import AuthController from "@/controllers/AuthController";
import AuthRouter from "@/routes/auth";
import AuthServices from "@/services/AuthServices";

export default {
    controller: AuthController,
    router: AuthRouter,
    service: AuthServices
}