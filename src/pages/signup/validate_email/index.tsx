import { FC } from "react";
import SignupLayout from "../Layout";
import { useParams } from "react-router-dom";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

/**
 * The signup email_validation page.
 *
 * @returns A JSX.Element signup page.
 */
const Signup: FC = (): JSX.Element => {
    const { email } = useParams();
    return (
        <SignupLayout>
            <div className="validate_email max-w-[420px] 2xl:max-w-[440px] h-max w-full mt-0 lg:mt-16 lg:mb-16 bg-white pb-6 lg:rounded-lg p-[26px] md:p-8 flex flex-col gap-7">
                <header>
                    <h4 className="text-2xl mt-1  text-secondary font-semibold">Consultez votre boite mail</h4>
                    <p className="text-secondary/80 mt-2">Un mail de vérification a été envoyé à l’adresse <b className="text-primary">"{email}"</b> . Veuillez vérifier votre boîte de réception pour continuer</p>
                </header>

                <DotLottiePlayer
                    autoplay={true}
                    loop={true}
                    src="/lotties/email-lottie.lottie"
                    style={{ width: "100%", height: "13em", objectFit: "cover" }}
                />

                <p className="text-secondary text-center text-sm">Vous rencontrez un problème? <b className="text-blue-500">Demandez de l'aide</b></p>
            </div>
        </SignupLayout>
    );
};

export default Signup;