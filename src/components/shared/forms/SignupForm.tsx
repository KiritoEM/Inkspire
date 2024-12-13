import React, { FC, useState } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { SignupSchemaTypes } from "../../../lib/form-validation/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../lib/form-validation";
import { FloatingLabelInput } from "./FloatingInput";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import GoogleauthForm from "./GoogleauthForm";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { AVALAIBLE_LOCATION } from "../../../helpers/constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authActions from "../../../actions/auth.actions";
import useLoading from "../../../hooks/useLoading";
import { Progress } from "../ui/progress";
import { evaluatePasswordStrength } from "../../../helpers/evaluatePassword";

/**
 * A component that renders a form for a user to signUp.
 *
 * @returns A JSX element representing the login form.
 */
const SignupForm: FC = (): JSX.Element => {
    const [show, setShow] = useState<boolean>(false);
    const [passwordLength, setPasswordLength] = useState<number>(0);
    const [passwordLevel, setPasswordLevel] = useState<string>("");
    const { loading, stopLoading, startLoading } = useLoading();
    const form = useForm<SignupSchemaTypes>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            location: "",
            pseudo: ""
        }
    });

    const handleSubmit = async (data: SignupSchemaTypes) => {
        startLoading();

        const response = await authActions.SIGNUP(data);

        if (response.status === "success") {
            toast.success("Nous vous avons envoyé un email de vérification !!!", {
                position: "bottom-center",
                autoClose: 5000,
            });
            stopLoading();
        } else {
            toast.error("Une erreur s'est produite !!!", {
                position: "bottom-center",
                autoClose: 5000,
            });
            stopLoading();
        }
    };

    return (
        <div className="signup__form max-w-[420px] 2xl:max-w-[440px] w-full mt-0 min-h-full md:min-h-auto lg:mt-16 lg:mb-16 bg-white pb-6 lg:rounded-lg p-[26px] md:p-8 flex flex-col gap-7">
            <header>
                <p className="text-secondary/80">Créér votre compte</p>
                <h4 className="text-2xl mt-1  text-secondary font-semibold">Rejoignez-nous en créant un compte</h4>
            </header>

            <FormProvider {...form}>
                <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
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
                        name="pseudo"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <FloatingLabelInput
                                        id="pseudo"
                                        label="Pseudo"
                                        {...field}
                                        className="text-base"
                                        type="text"
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
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            field.onChange(e);
                                            setPasswordLength(e.target.value.length);
                                            setPasswordLevel(evaluatePasswordStrength(e.target.value) as string);
                                        }}
                                        className="text-base"
                                        type={show ? "text" : "password"}
                                        suffix={
                                            show ? (
                                                <EyeOff size={19} className="cursor-pointer" onClick={() => setShow(!show)} />
                                            ) : (
                                                <Eye size={19} className="cursor-pointer" onClick={() => setShow(!show)} />
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {passwordLength > 0 && <div className="password-progress">
                        <Progress value={passwordLevel === "Fort" ? 100 : passwordLevel === "Moyen" ? 50 : 0} />
                        <span className="text-sm text-secondary/80">{passwordLevel}</span>
                    </div>
                    }

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Votre localisation" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {AVALAIBLE_LOCATION.map((location) => <SelectItem key={location} value={location}>{location}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="checkbox flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Se souvenir de moi
                        </label>
                    </div>
                    <Button type="submit" isLoading={loading} variant="secondary" className="mt-3">{loading ? "Chargement..." : "Créér un compte"}</Button>
                </form>
            </FormProvider>

            <div className="or flex items-center w-full gap-3">
                <div className="line flex-1 h-[1px] bg-input"></div>
                <p className="text-secondary text-sm">OU</p>
                <div className="line flex-1 h-[1px] bg-input"></div>
            </div>

            <GoogleauthForm />

            <p className="text-secondary text-center">Vous avez déja un compte? <Link to="/" replace><b className="text-blue-500">Se connecter</b></Link></p>
        </div>
    );
};

export default SignupForm;
