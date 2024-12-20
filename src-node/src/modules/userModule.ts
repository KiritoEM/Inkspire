import UserController from "@/controllers/UserController"
import PostRouter from "@/routes/post"
import UserRouter from "@/routes/user"
import UserServices from "@/services/UserServices"

export default {
    router: UserRouter,
    service: UserServices,
    controller: UserController
}