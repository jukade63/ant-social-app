import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar"

interface UserHeroProps {
    userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
    const { data: fetchedUser } = useUser(userId);

    return (
        <div>
            <div className="bg-neutral-400 h-60 relative rounded-sm">
                {fetchedUser?.coverImage && (
                    <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }} />
                )}
                <div className="absolute -bottom-14 left-4">
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        </div>
    );
}

export default UserHero;