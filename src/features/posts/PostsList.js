import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const PostsList = () => {
  const posts = useSelector(state => state.posts);
  // 리덕스 스토어에 접근하여 posts 상태값을 가져옴
  // 스토어가 업데이트될 때마다 실행되며, 변경된 값에 따라 렌더링이 이루어진다. 

  const renderedPosts = posts.map(post => (
    <article key={post.id} className="post-excerpt">
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article >
  ))

  return (
    <section>
      <h2>Post</h2>
      {renderedPosts}
    </section>
  )
}