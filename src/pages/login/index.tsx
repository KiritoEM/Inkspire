import { FC } from "react";
import LoginLayout from "./Layout";
import LoginForm from "../../components/shared/forms/LoginForm";

/**
 * The login page.
 *
 * @returns A JSX.Element login page.
 */
const Login: FC = (): JSX.Element => {
    return (
        <LoginLayout>
            <section className="login w-full overflow-x-hidden bg-[url('/images/login-bg.png')] min-h-screen bg-cover" id="login">
                <div className="login-container container mx-auto px-6 md:px-14 xl:px-20 2xl:px-32 flex flex-col lg:flex-row justify-center lg:justify-between lg:gap-16 item-center lg:items-end min-h-screen">
                    <div className="login__left max-w-[400px] w-full mb-16 mt-10 lg:mt-0">
                        <img src="/logo_2.svg" alt="logo" className="w-[160px] lg:w-[180px]" />

                        <div className="text mt-4 lg:mt-[7vh] flex flex-col items-center">
                            <h1 className="text-[1.8em] lg:text-[2.1em] xl:text-[2.3em] 2xl:text-[2.7em] leading-tight text-white font-semibold">La Communauté des Créateurs</h1>
                            <p className="text-white/80 mt-3 lg:mt-4 text-sm lg:text-base">Un espace dédié aux artistes pour partager, découvrir et collaborer. Rejoignez une communauté passionnée par la créativité sous toutes ses formes.</p>
                        </div>
                    </div>

                    <LoginForm />
                </div>
            </section>
        </LoginLayout>
    );
};

export default Login;