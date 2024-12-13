import { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authActions from "../../../actions/auth.actions";
import { toast } from "react-toastify";
import { Button } from "../../../components/shared/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * The signup finalization page.
 *
 * @returns A JSX.Element signup finalization page.
 */
const SignupFinalisation: FC = (): JSX.Element => {
    const { token } = useParams();
    const [signupState, setSignupState] = useState<"loading" | "success" | "error">("loading");
    const [requestSent, setRequestSent] = useState(false);
    const navigate = useNavigate();

    const handleFinalizeSignup = async () => {
        if (!token) {
            setSignupState("error");
            return;
        }

        const response = await authActions.SIGNUP_FINALISATION(token as string);

        if (response.status === "success") {
            ("success")
            setSignupState("success");
            toast.success("Utilisateur authentifié avec succès !!!", {
                position: "bottom-center",
                autoClose: 5000,
            });
            navigate("/");
        } else {
            setSignupState("error");
            toast.error("Une erreur s'est produite !!!", {
                position: "bottom-center",
                autoClose: 5000,
            });
        }
    };

    useEffect(() => {
        if (signupState === "loading" && !requestSent) {
            setRequestSent(true);
            handleFinalizeSignup();
        }
    }, [signupState, requestSent]);

    return (
        <div className="signup-finalization bg-white min-h-screen">
            <div className="container mx-auto flex items-center justify-center min-h-screen">
                {signupState === "loading" ? (
                    <div className="loading-state max-w-[400px] flex flex-col items-center">
                        <div className="rounded-full h-14 w-14 bg-primary animate-ping"></div>
                        <header className="text-center mt-14">
                            <h4 className="text-2xl mt-1 text-secondary font-semibold">Chargement en cours...</h4>
                            <p className="text-secondary/80 mt-2">Veuillez patienter pendant que nous finalisons votre inscription</p>
                        </header>
                    </div>
                ) : signupState === "success" ? (
                    <div className="loading-state max-w-[400px] flex flex-col items-center">
                        <header className="text-center mt-14">
                            <h4 className="text-2xl mt-1 text-secondary font-semibold">Compte créé avec succès !!!</h4>
                            <p className="text-secondary/80 mt-2">Vous allez être redirigé vers l'Accueil</p>
                        </header>
                    </div>
                ) : (
                    <div className="loading-state max-w-[400px] flex flex-col items-center">
                        <header className="text-center mt-14">
                            <h4 className="text-2xl mt-1 text-secondary font-semibold">Une erreur s'est produite !!!</h4>
                            <p className="text-secondary/80 mt-2">Veuillez réessayer de créer votre compte</p>
                            <Button variant="secondary" className="mt-4">Réessayer <ArrowRight size={17} className="ml-1" /></Button>
                        </header>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignupFinalisation;
