import { Request, Response, Router } from "express";
import AuthRouter from "./auth";

const rootRouter: Router = Router();

rootRouter.use("/auth", AuthRouter);
rootRouter.get("/test", (req: Request, res: Response) => {
    res.send("Root test route");
});

export default rootRouter;