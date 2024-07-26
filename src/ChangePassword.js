import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ChangeInputPassword from './components/ChangeInputPassword';
import ChangeNewPassword from './ChangeNewPassword';
import ChangeCheckNewPassword from './ChangeCheckNewPassword';
import axios from 'axios';
import { ENDPOINT_USER, PASSWORD_UPDATE_ERROR } from './consts/const';
import { addAuthUserProfile as addAuthUserProfileActions } from './store/modules/authUserState';
import ErrorMessage from './components/ErrorMessage';

/**
 * パスワード変更画面
 */
const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUserProfile = useSelector((state) => state.user.authUserProfile);

  const [inputPass, setInputPass] = useState(''); // 現在のパスワードの状態管理
  const [inputPassErrorFlag, setInputPassErrorFlag] = useState(true); // 現在のパスワードのエラーフラグの状態管理

  const [newPass, setNewPass] = useState(''); // 新しいパスワードの状態管理
  const [newPassErrorFlag, setNewPassErrorFlag] = useState(true); //  新しいパスワードのエラーフラグの状態管理

  const [checkNewPass, setCheckNewPass] = useState(''); // 確認パスワードの状態管理
  const [newCheckPassErrorFlag, setNewCCheckPassErrorFlag] = useState(true); // 確認パスワードのエラーフラグの状態管理

  const [disabledFlag, setDisabledFlag] = useState(true); // 変更ボタンの活性フラグの状態管理

  const [errorFlag, setErrorFlag] = useState(false); // パスワード変更のエラーフラグの状態管理

  /**
   * パスワード変更のエラーフラグを更新する処理
   *
   * @hasError 現在のパス、新しいパス、新しい確認パスのエラーフラグをまとめた真偽値
   * @setDisabledFlag 変更ボタンの活性／非活性フラグの更新関数
   * @param {boolean} inputPassErrorFlag 現在のパスワードのエラーフラグ
   * @param {boolean} newPassErrorFlag 新しいパスワードのエラーフラグ
   * @param {boolean} newCheckPassErrorFlag 確認パスワードのエラーフラグ
   */
  useEffect(() => {
    const hasError =
      inputPassErrorFlag || newPassErrorFlag || newCheckPassErrorFlag;
    setDisabledFlag(hasError);
  }, [inputPassErrorFlag, newPassErrorFlag, newCheckPassErrorFlag]);

  /**
   * パスワードを変更してマイページに遷移する関数
   *
   * @changeUserPass ユーザのパスワードを更新する非同期関数
   */
  const submitPasswordChange = () => {
    changeUserPass();
    navigate('/mypage');
  };

  /**
   * ユーザのパスワードを更新する非同期関数
   *
   * @param {object} authUserProfile ユーザ情報(store)
   * @param {function} setErrorFlag パスワード変更のエラーフラグの更新関数
   * @userNewProfilePass 更新する新しいデータオブジェクト
   * @res 指定されたユーザIDのデータにuserNewProfilePassデータの更新をAPIにリクエストしたレスポンスオブジェクト
   * @addAuthUserProfileActions state.authUserProfileにデータを追加するアクションクリエーター
   */
  const changeUserPass = async () => {
    const userNewProfilePass = { ...authUserProfile, pass: newPass };

    try {
      const res = await axios.put(
        ENDPOINT_USER + '/' + authUserProfile.id,
        userNewProfilePass
      );
      dispatch(addAuthUserProfileActions(res.data));
    } catch (e) {
      setErrorFlag(true);
      console.error(PASSWORD_UPDATE_ERROR, e);
    }
  };

  return (
    <>
      <h1>パスワード変更</h1>
      <form onSubmit={submitPasswordChange} className='signup-form'>
        <ChangeInputPassword
          inputPassState={[inputPass, setInputPass]}
          inputPassErrorFlag={[inputPassErrorFlag, setInputPassErrorFlag]}
        />
        <ChangeNewPassword
          newPassState={[newPass, setNewPass]}
          newPassErrorFlag={[newPassErrorFlag, setNewPassErrorFlag]}
          placeholder={'新しいパスワード'}
        />
        <ChangeCheckNewPassword
          passState={newPass}
          checkPassState={[checkNewPass, setCheckNewPass]}
          checkPassErrorFlag={[
            newCheckPassErrorFlag,
            setNewCCheckPassErrorFlag,
          ]}
          placeholder={'新しいパスワード（確認）'}
        />
        <button
          type='submit'
          className={`submit-button ${
            disabledFlag ? 'submit-button-disabled' : ''
          }`}
          disabled={disabledFlag}
        >
          変更
        </button>
      </form>
      {errorFlag && <ErrorMessage message={PASSWORD_UPDATE_ERROR} />}
    </>
  );
};

export default ChangePassword;
