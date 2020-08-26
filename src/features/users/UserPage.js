import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectUserById } from './userSlice';
import { selectPostsByUser } from '../posts/postsSlice';

export const UserPage = ({ match }) => {
  const { userId } = match.params;
  const user = useSelector(state => selectUserById(state, userId));

  const postsForUser = useSelector(state =>
    // const allPosts = selectAllPosts(state);
    // return allPosts.filter(post => post.user === userId);
    selectPostsByUser(state, userId) // createSelector를 통해 생성한 memoized 함수
  );

  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>
        {post.title}
        {/* 포스트 제목만 노출한다. */}
      </Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}

