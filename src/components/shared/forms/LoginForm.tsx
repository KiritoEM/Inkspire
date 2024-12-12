import { FC, useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { LoginSchemaTypes } from "../../../lib/form-validation/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/form-validation";
import { FloatingLabelInput } from "./FloatingInput";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import GoogleauthForm from "./GoogleauthForm";

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
        <div className="login__right max-w-[400px] 2xl:max-w-[440px] w-full mt-0 lg:mt-16 mb-7 lg:mb-0 bg-white pb-6 rounded-b-lg lg:rounded-b-none rounded-t-lg p-[26px] md:p-8 flex flex-col gap-7">
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
                    <div className="forgot-password flex justify-between">
                        <div className="checkbox flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Se souvenir de moi
                            </label>
                        </div>
                        <p className="text-blue-500 text-sm">Mot de passe oublié?</p>
                    </div>
                    <Button type="submit" variant="secondary" className="mt-3">Se connecter</Button>
                </form>
            </FormProvider>

            <div className="or flex items-center w-full gap-3">
                <div className="line flex-1 h-[1px] bg-input"></div>
                <p className="text-secondary text-sm">OU</p>
                <div className="line flex-1 h-[1px] bg-input"></div>
            </div>

            <GoogleauthForm />

            <p className="text-secondary text-center">Nouveau ici? <b className="text-blue-500">Créér un compte</b></p>
        </div>
    );
};

export default LoginForm;
