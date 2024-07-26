import { useCallback, useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { EMAIL_INVALID, EMAIL_VALIDATION_PATTERN } from '../consts/const';

/**
 * メールアドレスのコンポーネント
 *
 * @param {string, function} emailState アドレスの状態管理
 * @param {boolean, function} emailErrorFlag アドレスのエラーフラグの状態管理
 */
const SignUpEmail = ({ emailState, emailErrorFlag }) => {
  const [email, setEmail] = emailState; // アドレスの状態管理(props)
  const [errorFlag, setErrorFlag] = emailErrorFlag; // アドレスのエラーフラグの状態管理(props)
  const [isFirstInputEmail, setIsFirstInputEmail] = useState(false); // アドレスの初期入力フラグの状態管理

  /**
   * アドレスのバリデーションチェック関数
   *
   * @param {string} email アドレスの入力値
   * @param {function} setErrorFlag アドレスのエラーフラグの更新関数
   * @isEmailValid 正しいアドレス形式であるかの真偽値
   */
  const validateEmail = useCallback(() => {
    const isEmailValid = EMAIL_VALIDATION_PATTERN.test(email);

    setErrorFlag(!isEmailValid);
  }, [email]);

  /**
   * バリデーションチェック関数を呼び出す処理
   *
   * @validateEmail アドレスのバリデーションチェック関数
   * @param {email} email アドレスの入力値
   */
  useEffect(() => {
    validateEmail();
  }, [email]);

  return (
    <>
      <input
        type='email'
        placeholder='メールアドレス'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onBlur={() => {
          setIsFirstInputEmail(true);
        }}
      />
      {isFirstInputEmail && errorFlag && (
        <ErrorMessage message={EMAIL_INVALID} />
      )}
    </>
  );
};

export default SignUpEmail;
