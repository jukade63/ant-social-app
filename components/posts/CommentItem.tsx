import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from '../Avatar';

interface CommentItemProps {
    data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {
    const router = useRouter();

    const goToUser = useCallback((ev: any) => {
        ev.stopPropagation();

        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id]);

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data.createdAt])

    return (
        <div
            className="
                p-5 
                cursor-pointer 
                hover:bg-slate-100 
                transition
                border-b-[1px]
                border-purple-500
      ">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p
                            onClick={goToUser}
                            className="
                                text-purple-800 
                                font-semibold 
                                cursor-pointer 
                                hover:underline
            ">
                            {data.user.name}
                        </p>
                        <span
                            onClick={goToUser}
                            className="
                                text-neutral-500
                                cursor-pointer
                                hover:underline
                                hidden
                                md:block
            ">
                            @{data.user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt} <span className='ml-2'>ago</span>

                        </span>
                    </div>
                    <div className="text-gray-600 mt-1">
                        {data.body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem;