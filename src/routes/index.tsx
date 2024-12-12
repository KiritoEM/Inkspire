import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";

const AppRoutes: FC = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;