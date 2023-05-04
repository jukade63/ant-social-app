import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';

const FollowBar = () => {
    const { data: users = [] } = useUsers();

    if (users.length === 0) {
        return null;
    }

    return (
        <div className="p:2 flex justify-center md:px-6 md:py-4 md:block">
            <div className="md:bg-violet-200 rounded-sm p-2 md:p-4">
                <h2 className="text-black text-xl font-semibold tracking-wider text-center">Who to follow</h2>
                <div className="md:flex flex-col gap-6 md:mt-4">
                    {users.map((user: Record<string, any>) => (
                        <>
                            <div className='md:hidden inline-block mr-3 mb-2 mt-3' key={user.id}>
                                <Avatar userId={user.id} />
                            </div>
                            <div key={user.id} className="hidden md:flex flex-row gap-4 items-center bg-neutral-100 p-2 
                                rounded-md shadow-md">
                                <Avatar userId={user.id} />
                                <div className="flex flex-col ">
                                    <p className="text-gray-500 font-semibold text-sm">{user.name ? user.name : user.username}</p>
                                </div>
                            </div>
                        </>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default FollowBar;