import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
    showBackArrow?: boolean;
    label: string;
}

function Header({ showBackArrow, label }: HeaderProps) {
    const router = useRouter()
    const handleBack = useCallback(() => {
        router.back();
    }, [router]);
    return (
        <div className='p-5'>
            <div className='flex flex-row items-center gap-2'>
                {showBackArrow && (
                    <div onClick={handleBack} className="cursor-pointer hover:opacity-70 transition">
                        <BiArrowBack />
                    </div>

                )}
                <h1 className="text-black text-xl font-semibold">
                    {label}
                </h1>
            </div>

        </div>
    )
}

export default Header