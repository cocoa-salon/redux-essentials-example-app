import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export const ReactionEmoji = ({ post }) => {
  const dispatch = useDispatch();

  const onReactionButtonClicked = (name) => {
    dispatch(reactionAdded({
      postId: post.id,
      reaction: name,
    }))
  }

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" className="muted-button reaction-button" onClick={() => onReactionButtonClicked(name)}>
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return (
    <div>{reactionButtons}</div>
  )
}