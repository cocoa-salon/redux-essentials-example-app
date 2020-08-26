import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { client } from '../../api/client';


const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.users;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: usersAdapter.setAll
    // 기존 사용자 목록을 서버로부터 가져온 사용자 목록으로 대체
  }
})



export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors(state => state.users);

export default userSlice.reducer;

