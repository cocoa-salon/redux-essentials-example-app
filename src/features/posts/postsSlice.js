import { createSlice, nanoid } from '@reduxjs/toolkit'
// createSlice를 이용하여 액션, 액션 생성 함수, 초기값, 리듀서를 모두 정의할 수 있다. 
import { sub } from 'date-fns';

const initialState = [
  {
    reactions: {
      thumbsUp: 3,
      hooray: 4,
      heart: 0,
      rocket: 2,
      eyes: 1
    },
    id: '1', user: '0', date: sub(new Date(), { minutes: 10 }).toISOString(), title: '리덕스를 공부하자', content: '잘할 수 있을까. 새로운 것은 늘 진입 장벽이 있기 마련이다.'
  },
  {
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 3,
      rocket: 2,
      eyes: 6
    },
    id: '2', user: '1', date: sub(new Date(), { minutes: 5 }).toISOString(), title: '리덕스의 핵심', content: '공통으로 관리하는 상태를 컴포넌트 밖에 모아놓고 필요할 때마다 접근해서 쓰거나, 업데이트하는 것.'
  }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(userId, title, content) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            user: userId,
            title,
            content,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0
            }
          }
        }
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
    ,
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      // let postIdx = state.findIndex(post => post.id === id)
      // state[postIdx] = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    }
    // state 상태를 직접 변경해도 createSlice 내부의 immer로 인해 immutable한 객체가 생성된다.
  }
})

export const { postAdded, reactionAdded, postUpdated } = postsSlice.actions;
// 필요한 곳에서 해당 액션을 디스패치하기 위해, 액션 생성 함수를 노출한다.
export default postsSlice.reducer;
// 리덕스 스토어를 생성하기 위해 리듀서를 노출한다.