import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseDoor } from 'react-icons/bs';
import { SlBell } from 'react-icons/sl';
import { FaRegUser } from 'react-icons/fa';
import NavbarLogo from './NavbarLogo';
import useCurrentUser from '@/hooks/useCurrentUser';
import NavbarItem from './NavbarItem';


function Navbar() {
    const { data: currentUser } = useCurrentUser()

    const items = [
        {
            icon: BsHouseDoor,
            label: 'Home',
            href: '/',
        },
        {
            icon: SlBell,
            label: 'Notifications',
            href: '/notifications',
            auth: true,
            alert: currentUser?.hasNotification
        },
        {
            icon: FaRegUser,
            label: 'Profile',
            href: `/users/${currentUser?.id}`,
            auth: true,
        },
    ]

    return (
        <div className='p-2 bg-gradient-25 from-fuchsia-200 to-violet-200 shadow-md'>
            <div className='flex justify-center'>
                <div className='hidden md:block'>
                    <NavbarLogo />
                </div>
                <div className='flex md:ml-auto'>
                    {items.map(item => (
                        <NavbarItem
                            key={item.href}
                            alert={item.alert}
                            auth={item.auth}
                            href={item.href}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))}
                </div>

                {currentUser && <NavbarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
            </div>
        </div>
    )
}

export default Navbar