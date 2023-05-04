
import { useRouter } from 'next/router'




function NavbarLogo() {
    const router = useRouter()
    return (
        <div
            onClick={() => router.push('/')}
            className='
                rounded-full 
                flex
                ml-2
                items-center
                justify-center
                px-2 
                py-6
                text-white
                font-semibold
                bg-fuchsia-500
                hover:bg-fuchsia-700 
                cursor-pointer
                transition'>
            Switter
        </div>
    )
}

export default NavbarLogo