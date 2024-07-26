import { useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { BIRTHDATE_REQUIRED } from '../consts/const';

/**
 * 生年月日のコンポーネント
 *
 * @param {string, function} birthdayState 生年月日の状態管理
 * @param {boolean} birthdayErrorFlag 生年月日のエラーフラグ
 */
const SignUpBirthday = ({ birthdayState, birthdayErrorFlag }) => {
  const [birthday, setBirthday] = birthdayState; // 生年月日の状態管理(props)
  const [errorFlag, setErrorFlag] = birthdayErrorFlag; // 生年月日のエラーフラグの状態管理(props)
  const [isFirstInputBirthday, setIsFirstInputBirthday] = useState(false); // 生年月日の初期入力フラグの状態管理

  /**
   * 生年月日の入力値に応じて生年月日のエラーフラグを切り替える処理
   *
   * @param {date} birthday 生年月日の入力値
   * @param {function} setErrorFlag 生年月日のエラーフラグの更新関数
   */
  useEffect(() => {
    birthday ? setErrorFlag(false) : setErrorFlag(true);
  }, [birthday]);

  return (
    <>
      <input
        type='date'
        placeholder='生年月日'
        value={birthday}
        onChange={(e) => {
          setBirthday(e.target.value);
        }}
        onBlur={() => setIsFirstInputBirthday(true)}
      />
      {isFirstInputBirthday && errorFlag && (
        <ErrorMessage message={BIRTHDATE_REQUIRED} />
      )}
    </>
  );
};

export default SignUpBirthday;
