import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT_BLOG } from './consts/const';
import { addAuthUserBlog as addAuthUserBlogActions } from './store/modules/authUserState';

/**
 * 新規投稿画面
 */
const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUserProfile = useSelector((state) => state.user.authUserProfile);
  const authUserBlogPosts = useSelector(
    (state) => state.user.authUserBlog.posts
  );
  const [title, setTitle] = useState(''); // タイトルの入力値の状態管理
  const [titleErrorFlag, setTitleErrorFlag] = useState(true); // タイトルのエラーフラグの状態管理
  const [titleFirstFlag, setTitleFirstFlag] = useState(false); // タイトルの初期入力フラグの状態管理

  const [content, setContent] = useState(''); // 文章の入力値の状態管理
  const [contentErrorFlag, setContentErrorFlag] = useState(true); // 文章のエラーフラグの状態管理
  const [contentFirstFlag, setContentFirstFlag] = useState(false); // 文章の初期入力フラグの状態管理

  const [disabledFlag, setDisabledFlag] = useState(true); // 投稿ボタンの活性フラグの状態管理

  /**
   * バリデーションチェック関数を呼び出す処理
   *
   * @validateNewPost 新規投稿のバリデーションチェック関数
   * @param {string} title 新規投稿のタイトル
   * @param {string} content 新規投稿の文章
   */
  useEffect(() => {
    validateNewPost();
  }, [title, content]);

  /**
   * 新規投稿のバリデーションチェック関数
   *
   * @param {string} title 新規投稿のタイトル
   * @param {string} content 新規投稿の文章
   * @param {function} setTitleErrorFlag タイトルのエラーフラグの更新関数
   * @param {function} setContentErrorFlag 文章のエラーフラグの更新関数
   * @param {function} setDisabledFlag 投稿ボタンの活性フラグの更新関数
   * @newTitleErrorFlag titleが0文字、または31文字以上であるかの真偽値
   * @contentTooLong contentが0文字、または501文字以上であるかの真偽値
   * @isDisabled titleかcontentがエラーに該当しているかの真偽値
   */
  const validateNewPost = () => {
    const newTitleErrorFlag = title.length === 0 || title.length > 30;
    const newContentErrorFlag = content.length === 0 || content.length > 500;
    const isDisabled = newTitleErrorFlag || newContentErrorFlag;

    setTitleErrorFlag(newTitleErrorFlag);
    setContentErrorFlag(newContentErrorFlag);
    setDisabledFlag(isDisabled);
  };

  /**
   * タイトルのバリデーションチェック関数
   *
   * @param {string} newVal タイトルに新しく入力された値
   * @param {boolean} titleFirstFlag タイトルの初期入力フラグ
   * @param {function} setTitleErrorFlag タイトルのエラーフラグの更新関数
   * @param {function} setTitleFirstFlag タイトルの初期入力の更新関数
   */
  const validateTitle = (newVal) => {
    const newTitleErrorFlag = newVal.length === 0 || newVal.length > 30;
    setTitleErrorFlag(newTitleErrorFlag);

    if (!titleFirstFlag) {
      setTitleFirstFlag(true);
    }
  };

  /**
   * 文章のバリデーションチェック関数
   *
   * @param {string} newVal 文章に新しく入力された値
   * @param {boolean} contentFirstFlag 文章の初期入力フラグ
   * @param {function} setContentErrorFlag 文章のエラーフラグの更新関数
   * @param {function} setContentFirstFlag 文章の初期入力の更新関数
   */
  const validateContent = (newVal) => {
    const newContentErrorFlag = newVal.length === 0 || newVal.length > 500;
    setContentErrorFlag(newContentErrorFlag);

    if (!contentFirstFlag) {
      setContentFirstFlag(true);
    }
  };

  /**
   * ブログを新規投稿する非同期関数
   *
   * @param {Event} e イベント
   * @param {string} title タイトル
   * @param {string} content 文章
   * @newPost 新規投稿データ
   * @updatedPosts postsプロパティに追加するデータを新規作成したデータ（既存postsデータ＋新規投稿データ）
   * @addAuthUserBlogActions state.authUserBlogにデータを追加するアクションクリエーター
   */
  const postSubmit = async (e) => {
    e.preventDefault(); // フォームのデフォルト送信を防止

    const newPost = {
      postDate: new Date().toISOString(),
      title,
      content,
    };

    try {
      const updatedPosts = [...authUserBlogPosts, newPost];

      await axios.put(`${ENDPOINT_BLOG}/${authUserProfile.id}`, {
        posts: updatedPosts,
      });

      dispatch(addAuthUserBlogActions(updatedPosts));
      navigate('/mypage');
    } catch (e) {
      console.error('Error adding new post:', e);
    }
  };

  return (
    <>
      <h1>新規投稿</h1>
      <form onSubmit={postSubmit} className=''>
        <div className='new-post-title-area'>
          <textarea
            className={`new-post-title-textbox new-post-title-textbox-${
              titleErrorFlag && titleFirstFlag
            }`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              validateTitle(e.target.value);
            }}
          />
          <p
            className={`new-post-title-length new-post-title-length-${
              titleErrorFlag && titleFirstFlag
            }`}
          >{`${title.length}文字 / 30文字`}</p>
        </div>
        <div className='new-post-content-area'>
          <textarea
            className={`new-post-content-textbox new-post-content-textbox-${
              contentErrorFlag && contentFirstFlag
            }`}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              validateContent(e.target.value);
            }}
          />
          <p
            className={`new-post-content-length new-post-content-length-${
              contentErrorFlag && contentFirstFlag
            }`}
          >{`${content.length}文字 / 500文字`}</p>
        </div>
        <button
          type='submit'
          className={`submit-button new-post-submit-button 
          ${disabledFlag ? 'submit-button-disabled' : ''}`}
          disabled={disabledFlag}
        >
          投稿
        </button>
      </form>
    </>
  );
};

export default NewPost;
