import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectUsersById } from './userSlice';
import { selectAllPosts } from '../posts/postsSlice';

export const UserPage = ({ match }) => {
  const { userId } = match.params;

  const user = useSelector(state => selectUsersById(state, userId));

  const postsForUser = useSelector(state => {
    const allPosts = selectAllPosts(state);
    // 스토어에 저장된 모든 포스트를 가져온다.
    return allPosts.filter(post => post.user === userId);
    // url 정보에서 전달받은 사용자 아이디를 통해, 특정 아이디가 작성한 포스트만 필터링한다. 
  });

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

