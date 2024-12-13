import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ValidationEmail from "../pages/signup/validate_email";

const AppRoutes: FC = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/validate-email/:email" element={<ValidationEmail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;