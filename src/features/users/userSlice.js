import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '0', name: '개발자1' },
  { id: '1', name: '개발자2' },
  { id: '2', name: '개발자3' },
]

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default userSlice.reducer;

