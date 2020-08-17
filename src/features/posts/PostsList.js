import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, fetchPosts } from './postsSlice';
import { PostExcerpt } from './PostExcerpt';

export const PostsList = () => {
  // const posts = useSelector(state => state.posts);
  const posts = useSelector(selectAllPosts);
  // 리덕스 스토어에 접근하여 posts 상태값을 가져옴
  // 스토어가 업데이트될 때마다 실행되며, 변경된 값에 따라 렌더링이 이루어진다. 
  const dispatch = useDispatch();

  const postStatus = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch])

  let content;

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
    // 최신 포스트가 맨 위에 오도록 생성한 배열의 정렬 변경
    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section>
      <h2>Post</h2>
      {content}
    </section>
  )
}