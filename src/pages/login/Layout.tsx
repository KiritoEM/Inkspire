import { Fragment } from "react/jsx-runtime";
import { RootLayout } from "../../helpers/types";
import { FC } from "react";

interface LoginLayoutProps extends RootLayout { }
const LoginLayout: FC<LoginLayoutProps> = ({ children }): JSX.Element => {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default LoginLayout;