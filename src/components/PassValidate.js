import { useEffect, useState } from 'react';
import {
  UPPERCASE_REGEX,
  LOWERCASE_REGEX,
  DIGIT_REGEX,
  SPECIAL_CHAR_REGEX,
  PASSWORD_CRITERIA_ERROR_MESSAGE,
} from '../consts/const';
import ErrorMessage from './ErrorMessage';

/**
 * パスワードバリデーションのコンポーネント
 *
 * @param {string, function} passState パスワードの状態管理
 * @param {boolean, function} passErrorFlag パスワードのエラーフラグの状態管理
 * @param {string} placeholder プレースホルダー
 */
const PassValidate = ({ passState, passErrorFlag, placeholder }) => {
  const [pass, setPass] = passState; // パスワードの状態管理(props)
  const [errorFlag, setErrorFlag] = passErrorFlag; // パスワードのエラーフラグの状態管理(props)
  const [isFirstInputPass, setIsFirstInputPass] = useState(false); // パスワードの初期入力フラグの状態管理

  // 入力条件の各エラーフラグ
  const [validation, setValidation] = useState({
    isLengthValid: false, //10文字以上
    hasUppercase: false, //大文字
    hasLowercase: false, //小文字
    hasDegit: false, //数字
    hasSpecialChar: false, //記号
  });

  /**
   * パスワードの入力値のバリデーションチェック関数
   *
   * @param {string} pass パスワードの入力値
   * @newInputValidation パスワードの各入力条件のバリデーションチェックが格納されているオブジェクト
   * @setValidation 入力条件の各エラーフラグの更新関数
   * @passwordFullyValidate パスワードの入力条件がすべて通っているか確認し、エラーフラグを切り替える関数
   */
  const validatePassword = () => {
    const newInputValidation = {
      isLengthValid: String(pass).length >= 10,
      hasUppercase: UPPERCASE_REGEX.test(pass),
      hasLowercase: pass ? LOWERCASE_REGEX.test(pass) : false,
      hasDegit: DIGIT_REGEX.test(pass),
      hasSpecialChar: SPECIAL_CHAR_REGEX.test(pass),
    };
    setValidation(newInputValidation);
    passwordFullyValidate(newInputValidation);
  };

  /**
   * エラーフラグを切り替える関数
   *
   * @param {object} newValidation パスワードの各入力条件のチェック結果が格納されているオブジェクト
   * @param {function} setErrorFlag パスワード入力値のエラーフラグの更新関数
   * @isPasswordFullyValidated 引数のオブジェクトのvalue値がすべてtrueであるかの真偽値
   */
  const passwordFullyValidate = (newValidation) => {
    const isPasswordFullyValidated =
      Object.values(newValidation).every(Boolean);
    setErrorFlag(!isPasswordFullyValidated);
  };

  /**
   * パスワード入力値が更新されたとき、バリデーションチェック関数を呼び出す
   *
   * @validatePassword パスワードの入力値のバリデーションチェック関数
   * @param {string} pass パスワードの入力値
   */
  useEffect(() => {
    validatePassword();
  }, [pass]);

  return (
    <>
      <input
        type='password'
        placeholder={placeholder}
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
        }}
        onBlur={() => setIsFirstInputPass(true)}
      />
      {isFirstInputPass && errorFlag && (
        <ErrorMessage message={PASSWORD_CRITERIA_ERROR_MESSAGE} />
      )}
      <ul className='list-container'>
        <li className={`lengthValid-${validation.isLengthValid}`}>
          10文字以上
        </li>
        <li className={`uppercase-${validation.hasUppercase}`}>半角大文字</li>
        <li className={`lowercase-${validation.hasLowercase}`}>半角小文字</li>
        <li className={`degit-${validation.hasDegit}`}>半角数値</li>
        <li className={`special-char-${validation.hasSpecialChar}`}>
          半角記号
        </li>
      </ul>
    </>
  );
};

export default PassValidate;
