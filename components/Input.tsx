import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";

interface InputProps {
    id: string;
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

const Input = ({ id, placeholder, errors, type = "text", disabled, register, label }: InputProps) => {
    return (
        <div className="w-full">
            {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
            <input
                id={id}
                disabled={disabled}
                {...register(id, {
                    required: {
                        value: true,
                        message: `${id} is required`
                    }
                })}
                placeholder={placeholder}
                type={type}
                className={`
                    w-full
                    p-4 
                    text-lg 
                    border-2
                    border-neutral-800 
                    rounded-md
                    outline-none
                    transition
                    disabled:bg-neutral-900
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-blue'}
                    ${errors.name && errors.name.type === "required" && <span>This is required</span>}
                    `}
            />
            {errors[id]?.message && <p className="text-red-500 mt-1">{errors[id]?.message?.toString()[0].toUpperCase()}{errors[id]?.message?.toString().slice(1)} </p>}
        </div>
    );
}

export default Input;