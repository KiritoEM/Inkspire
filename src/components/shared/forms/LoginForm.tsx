import { FC, useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { LoginSchemaTypes } from "../../../lib/form-validation/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/form-validation";
import { FloatingLabelInput } from "./FloatingInput";
import { Eye, EyeOff } from "lucide-react"

/**
 * A component that renders a form for a user to logIn.
 *
 * @returns A JSX element representing the login form.
 */
const LoginForm: FC = (): JSX.Element => {
    const [show, setShow] = useState<boolean>(false);
    const form = useForm<LoginSchemaTypes>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    return (
        <div className="login__right max-w-[400px] w-full bg-white h-[450px] rounded-t-lg p-8 flex flex-col gap-6">
            <header>
                <p className="text-secondary/80">Ravis de vous revoir!</p>
                <h4 className="text-2xl mt-1  text-secondary font-semibold">Se connecter à votre compte</h4>
            </header>

            <FormProvider {...form}>
                <form action="post" className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <FloatingLabelInput
                                        id="email"
                                        label="Email"
                                        {...field}
                                        className="text-base"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <FloatingLabelInput
                                        id="password"
                                        label="Mot de passe"
                                        {...field}
                                        className="text-base"
                                        type={show ? "text" : "password"}
                                        suffix={show ? <EyeOff size={19} className="cursor-pointer" onClick={() => setShow(!show)} /> : <Eye size={19} className="cursor-pointer" onClick={() => setShow(!show)} />}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="forgot flex justify-between">
                        <div className="checkbox"></div>
                        <p className="text-blue-500 text-sm">Mot de passe oublié?</p>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default LoginForm;
