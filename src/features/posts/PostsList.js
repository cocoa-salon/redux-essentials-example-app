import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostIds, fetchPosts } from './postsSlice';
import { PostExcerpt } from './PostExcerpt';

export const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
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
    content = orderedPostIds.map(postId => (
      <PostExcerpt key={postId} postId={postId} />
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