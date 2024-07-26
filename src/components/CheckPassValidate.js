import { useCallback, useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { PASSWORD_MISMATCH } from '../consts/const';

/**
 * 確認パスワードバリデーションのコンポーネント
 *
 * @param {string, function} passState パスワードの入力値
 * @param {string, function} checkPassState 確認パスワードの状態管理
 * @param {boolean} checkPassErrorFlag  確認パスワードのエラーフラグの状態管理
 * @param {string} placeholder プレースホルダー
 */
const CheckPassValidate = ({
  passState,
  checkPassState,
  checkPassErrorFlag,
  placeholder,
}) => {
  const pass = passState; // パスワードの入力値(props)
  const [checkPass, setCheckPass] = checkPassState; // 確認パスワードの状態管理props)
  const [errorFlag, setErrorFlag] = checkPassErrorFlag; // 確認パスワードのエラーフラグの状態管理(props)
  const [isFirstInputPass, setIsFirstInputPass] = useState(false); // 確認パスワードの初期入力フラグの状態管理

  /**
   * 確認パスワードをバリデーションチェックする関数
   *
   * @param {string} pass パスワードの入力値
   * @param {string} checkPass 確認パスワードの入力値
   * @param {function} setErrorFlag 確認パスワードのエラーフラグの更新関数
   */
  const validatePassword = useCallback(() => {
    pass === checkPass ? setErrorFlag(false) : setErrorFlag(true);
  }, [pass, checkPass]);

  /**
   * バリデーションチェック関数を実行する処理
   *
   * @validatePassword 確認パスワードをバリデーションチェックする関数
   * @param {string} pass パスワードの入力値
   * @param {string} checkPass 確認パスワードの入力値
   * @param {boolean} isFirstInputPass 確認パスワードの初期入力フラグ
   */
  useEffect(() => {
    validatePassword();
  }, [pass, checkPass, isFirstInputPass]);

  return (
    <>
      <input
        type='password'
        placeholder={placeholder}
        value={checkPass}
        onChange={(e) => {
          setCheckPass(e.target.value);
        }}
        onBlur={() => setIsFirstInputPass(true)}
      />
      {isFirstInputPass && errorFlag && (
        <ErrorMessage message={PASSWORD_MISMATCH} />
      )}
    </>
  );
};

export default CheckPassValidate;
