import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ErrorMessage from './ErrorMessage';

/**
 * 現在のパスワードのコンポーネント
 *
 * @param {string} inputPassState 現在のパスワードの状態管理
 * @param {boolean} inputPassErrorFlag 現在のパスワードのエラーフラグの状態管理
 */
const ChangeInputPassword = ({ inputPassState, inputPassErrorFlag }) => {
  const [inputPass, setInputPass] = inputPassState; // 現在のパスワードの状態管理
  const [errorFlag, setErrorFlag] = inputPassErrorFlag; // 現在のパスワードのエラーフラグの状態管理
  const [isFirstInputPass, setIsFirstInputPass] = useState(false); // 現在のパスワードの初期入力フラグの状態管理

  const authUserProfile = useSelector((state) => state.user.authUserProfile);

  /**
   * バリデーションチェック関数を呼び出す処理
   *
   * @validateInputPass 現在のパスワードのバリデーションチェック関数
   * @param {string} inputPass 現在のパスワードの入力値
   * @param {boolean} isFirstInputPass 現在のパスワードの初期入力フラグ
   */
  useEffect(() => {
    validateInputPass();
  }, [inputPass, isFirstInputPass]);

  /**
   * 現在のパスワードのバリデーションチェック関数
   *
   * @param {string} inputPass 現在のパスワードの入力値
   * @param {Object} authUserProfile ユーザ情報(store)
   * @param {function} setErrorFlag 現在のパスワードのエラーフラグ
   */
  const validateInputPass = () => {
    if (inputPass !== authUserProfile.pass) {
      setErrorFlag(true);
    } else {
      setErrorFlag(false);
    }
  };

  return (
    <>
      <input
        type='password'
        placeholder='現在のパスワード'
        value={inputPass}
        onChange={(e) => {
          setInputPass(e.target.value);
        }}
        onBlur={() => setIsFirstInputPass(true)}
        className='input-field'
      />
      {isFirstInputPass && errorFlag && (
        <ErrorMessage message={'現在のパスワードと一致していません'} />
      )}
    </>
  );
};

export default ChangeInputPassword;
