import { useEffect, useState } from 'react';
import ErrorMessage from './ErrorMessage';
import {
  GENERAL_TEXT_VALIDATION_PATTERN,
  NAME_REQUIRED,
  NAME_MAX_LENGTH,
  NAME_INVALID_CHARS,
} from '../consts/const';

/**
 * 氏名のコンポーネント
 *
 * @param {string, function} nameState 氏名の状態管理
 * @param {boolean, function} nameErrorFlag 氏名のエラーフラグの状態管理
 */
const SignUpName = ({ nameState, nameErrorFlag }) => {
  const [name, setName] = nameState; // 氏名の状態管理(props)
  const [errorFlag, setErrorFlag] = nameErrorFlag; // 氏名のエラーフラグの状態管理(props)
  const [isFirstInputName, setIsFirstInputName] = useState(false); // 氏名の初期入力フラグの状態管理
  const [errorMessage, setErrorMessage] = useState(''); // 氏名のエラーメッセージの状態管理

  /**
   * 氏名のバリデーションオブジェクト
   *
   * @param {string} name 氏名の入力値
   * @nemeが入力されているか／エラーメッセージ
   * @nemeが20文字以上であるか／エラーメッセージ
   * @nemeに許容されていない特殊文字があるか／エラーメッセージ
   */
  const validationNameRules = [
    {
      test: (name) => !name,
      message: NAME_REQUIRED,
    },
    {
      test: (name) => name.length > 20,
      message: NAME_MAX_LENGTH,
    },
    {
      test: (name) => GENERAL_TEXT_VALIDATION_PATTERN.test(name),
      message: NAME_INVALID_CHARS,
    },
  ];

  /**
   * 氏名のバリデーションチェック関数
   *
   * @param {string} name 氏名の入力値
   * @param {function} setErrorMessage 氏名のエラーメッセージの更新関数
   * @param {function} setErrorFlag 氏名のエラーフラグの更新関数
   * @rule validationNameRules配列から「最初にテスト条件を満たす」ルールを見つけて、格納している変数
   * @validationNameRules 氏名欄のバリデーションオブジェクト
   * @message rule.testの真偽値がtruthyだった場合、rule.messageを格納する変数
   */
  const validateName = () => {
    const rule = validationNameRules.find((rule) => rule.test(name));
    console.log(rule);
    const message = rule ? rule.message : '';

    setErrorMessage(message);
    setErrorFlag(Boolean(message));
  };

  /**
   * バリデーションチェック関数を呼び出す処理
   *
   * @validateName 氏名のバリデーションチェック関数
   * @param {string} name 氏名の入力値
   */
  useEffect(() => {
    validateName();
  }, [name]);

  return (
    <>
      <input
        type='text'
        placeholder='氏名（20文字以内）'
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onBlur={() => setIsFirstInputName(true)}
      />
      {isFirstInputName && errorFlag && <ErrorMessage message={errorMessage} />}
    </>
  );
};

export default SignUpName;
