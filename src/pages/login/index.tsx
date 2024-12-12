import { FC } from "react";
import LoginLayout from "./Layout";
import LoginForm from "../../components/shared/forms/LoginForm";

const Login: FC = (): JSX.Element => {
    return (
        <LoginLayout>
            <section className="login w-full overflow-x-hidden bg-[url('/images/login-bg.png')] min-h-screen bg-cover" id="login">
                <div className="container mx-auto px-20 flex justify-between gap-16 items-end min-h-screen">
                    <div className="login__left max-w-[400px] w-full mb-16">
                        <img src="/logo_2.svg" alt="logo" className="w-[180px]" />
                        <div className="text mt-[7vh]">
                            <h1 className="text-[2.3em] leading-tight text-white font-semibold">La Communauté des Créateurs</h1>
                            <p className="text-white/80 mt-4">Un espace dédié aux artistes pour partager, découvrir et collaborer. Rejoignez une communauté passionnée par la créativité sous toutes ses formes.</p>
                        </div>
                    </div>
                    <LoginForm />
                </div>
            </section>
        </LoginLayout>
    );
};

export default Login;