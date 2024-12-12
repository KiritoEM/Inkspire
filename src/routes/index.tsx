import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";

const AppRoutes: FC = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;