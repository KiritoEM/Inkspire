import { FC } from "react";
import SignupLayout from "./Layout";
import SignupForm from "../../components/shared/forms/SignupForm";

/**
 * The signup page.
 *
 * @returns A JSX.Element signup page.
 */
const Signup: FC = (): JSX.Element => {
    return (
        <SignupLayout>
            <SignupForm />
        </SignupLayout>
    );
};

export default Signup;