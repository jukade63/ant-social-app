import CommentItem from './CommentItem';

interface CommentFeedProps {
    comments?: Record<string, any>[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
    return (
        <div className='ml-5'>
            {comments.map((comment: Record<string, any>,) => (
                <CommentItem key={comment.id} data={comment} />
            ))}
        </div>
    );
};

export default CommentFeed;