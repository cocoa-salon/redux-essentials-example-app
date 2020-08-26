import React from 'react';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionEmoji } from './ReactionButtons';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

export const PostExcerpt = React.memo(({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId))
  return (
    <article key={post.id} className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p>{post.content.substring(0, 100)}</p>
      <ReactionEmoji post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
});

