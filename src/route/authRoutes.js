import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from '../SignUp';
import Login from '../Login';
import Mypage from '../Mypage';
import NewPost from '../NewPost';
import ChangePassword from '../ChangePassword';
import BlogListDetail from '../components/BlogListDetail';

export const authRoutes = (
  <>
    <Route path='/signup' element={<SignUp />} />
    <Route path='/login' element={<Login />} />
    <Route path='/mypage' element={<Mypage />} />
    <Route path='/mypage/newPost' element={<NewPost />} />
    <Route path='/mypage/changepass' element={<ChangePassword />} />
    <Route path='/mypage/blogDetail' element={<BlogListDetail />} />
  </>
);

export default authRoutes;
