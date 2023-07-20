import React, {FC} from 'react';
import {PostType} from "../posts-api";

const Post: FC<{post: PostType}> = ({post}) => {
    return (
        <div className={'row'}>
            <div className={'id'}>{post.id}</div>
            <div className={'title'}>{post.title}</div>
            <div className={'description'}>{post.body}</div>
        </div>
    );
};

export default Post;