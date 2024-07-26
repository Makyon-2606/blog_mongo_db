import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT_BLOG, FETCH_BLOG_DATA_FAILURE } from './consts/const';
import {
  addAuthUserBlog as addAuthUserProfileActions,
  allClear as allClearActions,
} from './store/modules/authUserState';
import BlogList from './components/BlogList';
import { persistor } from './store';

/**
 * マイページ画面
 */
const Mypage = () => {
  const navigate = useNavigate();

  /**
   * ログインせずにマイページ画面への遷移を防止
   *
   * @param {object} authUserProfile ユーザ情報(store)
   */
  useEffect(() => {
    if (!authUserProfile) {
      navigate('/');
    }
  }, []);

  const authUserProfile = useSelector((state) => state.user.authUserProfile);
  const authUserBlogPosts = useSelector(
    (state) => state.user.authUserBlog.posts
  );
  const dispatch = useDispatch();

  /**
   * ユーザのブログ情報を取得する処理
   *
   * @param {object} authUserProfile ユーザ情報(store)
   * @res 指定されたユーザIDを持つデータをAPIにリクエストしたレスポンスオブジェクト
   * @authUserBlogData 指定されたユーザIDを持つデータをAPIにリクエストしたレスポンスデータ
   * @addAuthUserProfileActions state.authUserProfileにデータを追加するアクションクリエーター
   *
   */
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${ENDPOINT_BLOG}?id=${authUserProfile.id}`
        );
        const authUserBlogData = res.data[0];
        dispatch(addAuthUserProfileActions(authUserBlogData));
      } catch (e) {
        console.error(FETCH_BLOG_DATA_FAILURE, e);
      }
    })();
  }, []);

  /**
   * マイページに関連するstateを削除し、トップ画面に遷移する関数
   *
   * @allClearActions state.authUserProfileおよびstate.authUserBlogを空にするアクションクリエーター
   */
  const logout = () => {
    dispatch(allClearActions());
    persistor.purge();
    navigate('/');
  };

  return (
    <>
      <h1>{authUserProfile.name}さんのページ</h1>
      <Link to='newPost' className='button new-post-button'>
        新規投稿
      </Link>
      <Link to='changepass' className='button change-pass-button'>
        パスワード変更
      </Link>
      {authUserBlogPosts?.length ? (
        authUserBlogPosts.map((post) => (
          <BlogList post={post} key={post.postDate} />
        ))
      ) : (
        <div className='no-poslts-message'>投稿がありません</div>
      )}
      <button onClick={logout} className='button logout-button'>
        ログアウト
      </button>
    </>
  );
};

export default Mypage;
