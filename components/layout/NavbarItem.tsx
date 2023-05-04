import { IconType } from 'react-icons'
import { useRouter } from 'next/router';
import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useCallback } from 'react';
import { BsDot } from 'react-icons/bs';

interface NavbarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    onClick?: () => void
    auth?: boolean
    alert?: boolean
}

function NavbarItem({ label, href, icon: Icon, onClick, auth, alert }: NavbarItemProps) {
    const router = useRouter()
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();

    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick()
        }
        if (auth && !currentUser) {
            loginModal.onOpen()
        } else if (href) {
            router.push(href)
        }

    }, [router, href, auth, loginModal, onClick, currentUser])
    return (
        <div onClick={handleClick} className='flex flex-row items-center'>
            <div className='relative
                    items-row 
                    flex
                    gap:2
                    md:gap-4
                    p-2
                    md:p-4
                    rounded-full 
                    hover:bg-slate-300 
                    hover:bg-opacity-10 
                    cursor-pointer
                    items-center'
            >
                <Icon size={22} color="indigo" />
                <p className={`text-neutral-700  ml-2
                    md:ml-0
                font-bold
                ${href === router.asPath ? 'text-purple-700 underline' : ''} 
                `}>
                    {label}</p>
                {alert ? <div className="text-sky-500 absolute -top-4 left-0"  ><BsDot size={70} /></div> : null}
            </div>
        </div>
    )
}

export default NavbarItem