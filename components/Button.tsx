import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    onClick: () => void;
    disabled?: boolean;
    outline?: boolean;
    icon?: IconType;

}

function Button({ label,
    secondary,
    fullWidth,
    onClick,
    large,
    icon: Icon,
    disabled,
    outline }: ButtonProps) {

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
                flex
                justify-center
                gap-2
                disabled: opacity-70
                rounded-full
                font-semibold
                hover:opacity-80
                transition
                border-2
                border-none
                text-white
                cursor-pointer
                tracking-wider
                ${fullWidth ? 'w-full' : 'w-fit'}
                ${secondary ? 'bg-fuchsia-700' : 'bg-gradient-25 from-blue-800 to-blue-600'}
                ${secondary ? 'text-white' : 'text-black'}
                ${large ? 'text-xl' : 'text-md'}
                ${large ? 'px-5' : 'px-4'}
                ${large ? 'py-3' : 'py-2'}
                ${outline ? 'bg-transparent' : ''}
                ${outline ? 'border-white' : ''}
                ${outline ? 'text-white' : ''}
    `}>
            {Icon && (
                <div>
                    <Icon size={24} />
                </div>
            )}
            {label}
        </button>
    )
}

export default Button