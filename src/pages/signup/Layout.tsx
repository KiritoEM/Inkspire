import { RootLayout } from "../../helpers/types";
import { FC } from "react";

interface SignupLayoutProps extends RootLayout { }

/**
 * The SignupLayout component is a layout component that displays
 * a signup form
 */
const SignupLayout: FC<SignupLayoutProps> = ({ children }): JSX.Element => {
    return (
        <section className="signup w-full overflow-x-hidden bg-[url('/images/signup-bg.png')] min-h-screen bg-cover" id="login">
            <div className="signup-container container mx-auto px-6 md:px-14 xl:px-20 2xl:px-32 flex flex-col lg:flex-row justify-center lg:gap-16 item-center min-h-screen">
                {children}
            </div>
        </section>
    )
}

export default SignupLayout;