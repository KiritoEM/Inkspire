import { FC } from "react";
import { Button } from "../ui/button"; // Votre composant de bouton personnalisé
import { useGoogleLogin } from "@react-oauth/google";
import authActions from "../../../actions/auth.actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * A component for handling Google authentication
 *
 * @returns A JSX.Element component.
 */
const SocialauthForm: FC = (): JSX.Element => {
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            const authResponse = await authActions.GOOGLE_AUTH(response.access_token);

            if (authResponse.status === "success") {
                navigate("/");
                toast.success("Utilisateur authentifié avec succés !!!", {
                    position: "bottom-center",
                    autoClose: 5000,
                });
            }
            else {
                toast.error("Un erreur s'est produit !!!", {
                    position: "bottom-center",
                    autoClose: 5000,
                })
            }
        },
        onError: () => {
            console.error("Échec de la connexion avec Google");
        },
    });

    return (
        <div className="google-auth flex w-full flex-col space-y-4">
            <Button
                variant="outline"
                className="space-x-2"
                onClick={() => login()}
            >
                <img src="/icons/google.svg" alt="google-icon" className="w-5" />
                <span className="text-secondary-foreground">Connexion avec Google</span>
            </Button>

            {/* <Button variant="outline" className="space-x-2">
                <img src="/icons/facebook.svg" alt="facebook-icon" className="w-6" />
                <span className="text-secondary-foreground">Connexion avec Facebook</span>
            </Button> */}
        </div>
    );
};

export default SocialauthForm;
