import { useState, useEffect } from 'react';
import axios from 'axios';
import SignUpName from './components/SignUpName';
import SignUpBirthday from './components/SignUpBirthday';
import SignUpEmail from './components/SignUpEmail';
import SignUpPass from './components/SignUpPass';
import SignUpCheckPass from './components/SignUpCheckPass';
import ErrorMessage from './components/ErrorMessage';
import {
  ENDPOINT_USER,
  ENDPOINT_BLOG,
  EMAIL_ALREADY_REGISTERED,
  FETCH_DATA_FAILURE,
  NETWORK_ERROR,
} from './consts/const';
import { useNavigate } from 'react-router-dom';

/**
 * 新規登録画面
 */
const SignUp = () => {
  // 氏名の状態管理／氏名のエラーフラグの状態管理
  const [name, setName] = useState('');
  const [nameErrorFlag, setNameErrorFlag] = useState(true);

  // 生年月日の状態管理／生年月日のエラーフラグの状態管理
  const [birthday, setBirthday] = useState('');
  const [birthdayErrorFlag, setbirthdayErrorFlag] = useState(true);

  // アドレスの状態管理／アドレスのエラーフラグの状態管理
  const [email, setEmail] = useState('');
  const [emailErrorFlag, setEmailErrorFlag] = useState(true);

  // パスワードの状態管理／パスワードのエラーフラグの状態管理
  const [pass, setPass] = useState('');
  const [passErrorFlag, setPassErrorFlag] = useState(true);

  // 確認パスワードの状態管理／確認パスワードのエラーフラグの状態管理
  const [checkPass, setCheckPass] = useState('');
  const [checkPassErrorFlag, setCheckPassErrorFlag] = useState(true);

  // 規約同意チェックの状態管理
  const [isCheck, setIsCheck] = useState(false);

  // 全エラーフラグを集約した全体エラーフラグの状態管理
  const [isAllErrorFlag, setIsAllErrorFlag] = useState(true);

  // 登録可能であるかの状態管理
  const [isRegistrable, setIsRegistrable] = useState(true);

  // エラーメッセージの状態管理
  const [errorMessage, setErrorMessage] = useState('');

  // 全エラーフラグの状態を集約したリスト
  const allErrorFlags = [
    nameErrorFlag,
    birthdayErrorFlag,
    emailErrorFlag,
    passErrorFlag,
    checkPassErrorFlag,
    !isCheck,
  ];

  /**
   * 全体エラーフラグの更新を行う処理
   *
   * @param {function} setIsAllErrorFlag 全エラーフラグを一つの条件にまとめた、登録エラーフラグの更新関数
   * @hasAnyError 全エラーフラグを一つにまとめた真偽値（一つでもfalseだったらfalse）
   * @allErrorFlags 全エラーフラグの状態を集約したリスト
   * @param {boolean} nameErrorFlag 氏名のエラーフラグ
   * @param {boolean} birthdayErrorFlag 生年月日のエラーフラグ
   * @param {boolean} emailErrorFlag アドレスのエラーフラグ
   * @param {boolean} passErrorFlag パスワードのエラーフラグ
   * @param {boolean} checkPassErrorFlag 確認パスワードのエラーフラグ
   * @param {boolean} isCheck 規約同意のチェックボックス
   */
  useEffect(() => {
    const hasAnyError = allErrorFlags.some(Boolean);
    setIsAllErrorFlag(hasAnyError);
  }, [
    nameErrorFlag,
    birthdayErrorFlag,
    emailErrorFlag,
    passErrorFlag,
    checkPassErrorFlag,
    isCheck,
  ]);

  const navigate = useNavigate();

  /**
   * ユーザの新規登録を行う非同期関数
   *
   * 指定されたメールアドレスで既にユーザが登録されているかをチェックし、
   * 未登録の場合は新規ユーザとして登録を行い、登録後にトップ画面に遷移する。
   * 既に登録がある場合は、既存ユーザであることを示すフラグを更新する。
   *
   * @param {Event} e イベント
   * @param {string} name 氏名の入力値
   * @param {date} birthday 生年月日の入力値
   * @param {string} email アドレスの入力値
   * @param {string} pass パスワードの入力値
   * @param {function} setIsRegisteredEmail 既に登録中のアドレスであるかのフラグの更新関数
   * @resData 指定されたユーザIDのデータを持つデータをAPIリクエストしたレスポンスデータ
   * @getAuthUser ユーザ情報を取得する非同期関数
   * @registerUser 新規登録するデータを集約したオブジェクト
   *
   */
  const newRegisterUser = async (e) => {
    e.preventDefault();

    try {
      const resData = await getAuthUser();
      if (resData.length === 0) {
        setIsRegistrable(true);
        const registerUser = { name, birthday, email, pass };
        await postNewUser(registerUser);
        navigate('/');
      } else {
        setIsRegistrable(false);
        setErrorMessage(EMAIL_ALREADY_REGISTERED);
      }
    } catch (e) {
      setIsRegistrable(false);
      setErrorMessage(NETWORK_ERROR);
      console.error(FETCH_DATA_FAILURE, e);
    }
  };

  /**
   * ユーザ情報を取得する非同期関数
   *
   * @res 指定されたemailを持つデータをAPIにリクエストしたレスポンスオブジェクト
   */
  const getAuthUser = async () => {
    try {
      const res = await axios.get(`${ENDPOINT_USER}?email=${email}`);
      return res.data;
    } catch (e) {
      throw new Error(NETWORK_ERROR, e);
    }
  };

  /**
   * 新規ユーザ情報を追加する非同期関数
   *
   * @res 指定したデータをAPIに追加リクエストしたレスポンスオブジェクト
   */
  const postNewUser = async (registerUser) => {
    try {
      const res = await axios.post(ENDPOINT_USER, registerUser);
      await axios.post(ENDPOINT_BLOG, { id: res.data.id, posts: [] });
    } catch (e) {
      throw new Error(NETWORK_ERROR, e);
    }
  };

  return (
    <>
      <h1>新規登録</h1>
      <form onSubmit={newRegisterUser} className='signup-form'>
        <SignUpName
          nameState={[name, setName]}
          nameErrorFlag={[nameErrorFlag, setNameErrorFlag]}
        />
        <SignUpBirthday
          birthdayState={[birthday, setBirthday]}
          birthdayErrorFlag={[birthdayErrorFlag, setbirthdayErrorFlag]}
        />
        <SignUpEmail
          emailState={[email, setEmail]}
          emailErrorFlag={[emailErrorFlag, setEmailErrorFlag]}
        />
        <SignUpPass
          passState={[pass, setPass]}
          passErrorFlag={[passErrorFlag, setPassErrorFlag]}
        />
        <SignUpCheckPass
          passState={pass}
          checkPassState={[checkPass, setCheckPass]}
          checkPassErrorFlag={[checkPassErrorFlag, setCheckPassErrorFlag]}
        />
        <div className='checkbox-container'>
          <label>
            <input
              type='checkbox'
              checked={isCheck}
              onChange={() => setIsCheck(!isCheck)}
              className='input-checkbox'
            />
            規約同意
          </label>
        </div>
        <button
          type='submit'
          className={`submit-button ${
            isAllErrorFlag ? 'submit-button-disabled' : ''
          }`}
          disabled={isAllErrorFlag}
        >
          登録
        </button>
      </form>
      {!isRegistrable && <ErrorMessage message={errorMessage} />}
    </>
  );
};

export default SignUp;
