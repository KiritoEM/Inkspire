import { RootLayout } from "../../helpers/types";
import { FC } from "react";

interface SignupLayoutProps extends RootLayout { }

const SignupLayout: FC<SignupLayoutProps> = ({ children }): JSX.Element => {
    return (
        <section className="signup w-full overflow-x-hidden bg-white md:bg-[url('/images/signup-bg.png')] min-h-screen bg-cover" id="login">
            <div className={`signup__container container mx-auto px-0 md:px-14 xl:px-20 2xl:px-32 flex justify-center lg:gap-16 item-center min-h-screen`} style={{ alignItems: "center" }}>
                {children}
            </div>
        </section >
    )
}

export default SignupLayout;