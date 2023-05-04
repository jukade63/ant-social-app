import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from 'next-auth/react';
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-hot-toast';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import Input from "../Input";
import Modal from "../Modal";
import Button from "../Button";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        },
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                toast.success('Registered!');
                reset()
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="email"
            />
            <Input
                id="username"
                label="Username"
                disabled={isLoading}
                register={register}
                errors={errors}
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3 items-center">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
                secondary
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
                secondary
            />
            <div
                className="
                    text-neutral-400
                    text-center 
                    mt-4 
                    font-light"
            >
                <p>Already have an account?
                    <span
                        onClick={onToggle}
                        className="
                            text-neutral-200
                            cursor-pointer 
                            hover:underline
                        "
                    > Log in</span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;