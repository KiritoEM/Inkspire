import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ValidationEmail from "../pages/signup/validate_email";
import Finalization from "../pages/signup/finalization";

const AppRoutes: FC = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/validate-email/:email" element={<ValidationEmail />} />
                <Route path="/signup/finalization/:token" element={<Finalization />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;