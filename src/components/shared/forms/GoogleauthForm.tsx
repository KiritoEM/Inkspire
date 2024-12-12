import { FC } from "react";
import { Button } from "../ui/button";

/**
 * A component for handling Google authentication.
 *
 * @returns A JSX.Element component.
 */
const GoogleauthForm: FC = (): JSX.Element => {
    return (
        <div className="google-auth flex w-full flex-col space-y-4">
            <Button variant="outline" className="space-x-2">
                <img src="/icons/google.svg" alt="google-icons" className="w-5" />
                <span className="text-secondary-foreground">Avec Google</span>
            </Button>
            <Button variant="outline" className="space-x-2">
                <img src="/icons/facebook.svg" alt="google-icons" className="w-6" />
                <span className="text-secondary-foreground">Avec Facebook</span>
            </Button>
        </div>
    );
};

export default GoogleauthForm;