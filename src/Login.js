import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAuthUserProfile as addAuthUserProfileActions } from './store/modules/authUserState';

import {
  ENDPOINT_USER,
  INVALID_EMAIL_OR_PASSWORD_MESSAGE,
} from './consts/const';
import ErrorMessage from './components/ErrorMessage';

/**
 * ログイン画面
 */
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginId, setLoginId] = useState(''); // ログインID（アドレス）の状態管理
  const [pass, setPass] = useState(''); // パスワードの状態管理
  const [errorFlag, setErrorFlag] = useState(false); // ログインのエラーフラグ状態管理
  const [errorMessage, setErrorMessage] = useState(''); // エラーメッセージ状態管理

  /**
   * ログインIDとパスワードの入力値をチェックし、適切でない場合はエラーを設定する関数
   *
   * @param {Event} e イベント
   * @param {string} loginId ログインID（アドレス）の入力値
   * @param {string} pass パスワードの入力値
   * @isInputEmpty 引数の値の空白を削除し、空文字であるか真偽値を返す関数
   * @settingError エラーメッセージをセットする関数
   * @handleUserLogin ユーザ情報の取得状況に応じた処理を行う関数
   */
  const velidateEmailAndPass = (e) => {
    e.preventDefault();

    const isInputEmpty = (input) => input.trim() === '';
    if (isInputEmpty(loginId) || isInputEmpty(pass)) {
      settingError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
      return;
    }

    handleUserLogin();
  };

  /**
   * ユーザログイン処理を行う関数
   *
   * ユーザ情報を取得し、成功した場合はauthUserProfile(state)に格納してマイページに遷移。
   * 失敗した場合は適切なエラーメッセージを表示する。
   *
   * @resData ユーザ情報が含まれたレスポンスデータ
   * @getUserData ユーザ情報を取得する関数
   * @addAuthUserProfileActions state.authUserProfileにデータを追加するアクションクリエーター
   * @settingError エラーメッセージをセットする関数
   */
  const handleUserLogin = async () => {
    try {
      const resData = await getUserData();
      if (resData.length) {
        dispatch(addAuthUserProfileActions(resData[0]));
        navigate('/mypage');
      } else {
        settingError(INVALID_EMAIL_OR_PASSWORD_MESSAGE);
      }
    } catch (e) {
      settingError(e.message);
    }
  };

  /**
   * ユーザ情報を取得する非同期関数
   *
   * @param {Event} e イベント
   * @res 指定されたemailとpasswordを持つデータをAPIにリクエストしたレスポンスオブジェクト
   */
  const getUserData = async (e) => {
    try {
      const res = await axios.get(
        `${ENDPOINT_USER}?email=${loginId}&pass=${pass}`
      );
      return res.data;
    } catch (e) {
      throw new Error('ネットワークエラーが発生しました。', e);
    }
  };

  /**
   * エラーメッセージをセットする関数。
   *
   * ログインのエラーフラグをtrueにし、ログインのエラーメッセージに引数を値を更新する。
   *
   * @param {string} message エラーメッセージ
   * @param {function} setErrorFlag ログインのエラーフラグの更新関数
   * @param {function} setErrorMessage ログインのエラーメッセージの更新関数
   */
  const settingError = (message) => {
    setErrorFlag(true);
    setErrorMessage(message);
  };

  return (
    <>
      <h1>ログイン</h1>
      <form onSubmit={velidateEmailAndPass} className='signup-form'>
        <input
          type='email'
          placeholder='ログインID（メールアドレス）'
          value={loginId}
          onChange={(e) => {
            setLoginId(e.target.value);
          }}
          className='input-field'
        />
        <input
          type='password'
          placeholder='パスワード'
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
          className='input-field'
        />
        <button type='submit' className='submit-button'>
          ログイン
        </button>
      </form>
      {errorFlag && <ErrorMessage message={errorMessage} />}
    </>
  );
};

export default Login;
