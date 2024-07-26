import CheckPassValidate from './components/CheckPassValidate';

/**
 * 確認パスワード欄のコンポーネント
 * @param {string} passState 新しいパスワードの入力値
 * @param {string, function} checkPassState 確認パスワードの状態管理
 * @param {boolean, function} checkPassErrorFlag 確認パスワードのエラーフラグの状態管理
 * @param {string} placeholder プレースホルダー
 */
const ChangeCheckNewPassword = ({
  passState,
  checkPassState,
  checkPassErrorFlag,
  placeholder,
}) => {
  return (
    <>
      <CheckPassValidate
        passState={passState}
        checkPassState={checkPassState}
        checkPassErrorFlag={checkPassErrorFlag}
        placeholder={placeholder}
      />
    </>
  );
};

export default ChangeCheckNewPassword;
