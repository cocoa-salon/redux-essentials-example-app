import { createSlice } from '@reduxjs/toolkit'
// createSlice를 이용하여 액션, 액션 생성 함수, 초기값, 리듀서를 모두 정의할 수 있다. 

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    }
    // state 상태를 직접 변경해도 createSlice 내부의 immer로 인해 immutable한 객체가 생성된다.
  }
})

export default postsSlice.reducer;
// 리덕스 스토어를 생성하기 위해 리듀서를 노출한다. 
export const { postAdded } = postsSlice.actions;
// 필요한 곳에서 해당 액션을 디스패치하기 위해, 액션 생성 함수를 노출한다.