import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Reduxスライスを生成
const userSlice = createSlice({
  name: 'user',
  initialState: { authUserProfile: [], authUserBlog: [] },
  reducers: {
    addAuthUserProfile(state, { payload }) {
      state.authUserProfile = payload;
    },
    addAuthUserBlog(state, { payload }) {
      state.authUserBlog = payload;
    },
    allClear(state) {
      state.authUserProfile = [];
      state.authUserBlog = [];
    },
  },
  // ユーザプロフィール取得の非同期通信からstateに格納
  extraReducers(builder) {
    builder.addCase(userAsyncCreator.pending, () => {});
    builder.addCase(userAsyncCreator.fulfilled, () => {});
    builder.addCase(userAsyncCreator.rejected, () => {});
  },
});

// 非同期アクションクリエーター生成
// 第二引数は、非同期通信でユーザプロフィールを取得する処理
export const userAsyncCreator = createAsyncThunk(
  'user/userProfile',
  async () => {}
);

export const { addAuthUserProfile, addAuthUserBlog, allClear } =
  userSlice.actions;

export default userSlice.reducer;
