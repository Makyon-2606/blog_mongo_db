import CheckPassValidate from './CheckPassValidate';

/**
 * 確認パスワードのコンポーネント
 *
 * @param {string} passState パスワードの入力値
 * @param {string, function} checkPassState 確認パスワードの状態管理
 * @param {boolean, function} checkPassErrorFlag 確認パスワードのエラーフラグの状態管理
 */
const SignUpCheckPass = ({ passState, checkPassState, checkPassErrorFlag }) => {
  return (
    <>
      <CheckPassValidate
        passState={passState}
        checkPassState={checkPassState}
        checkPassErrorFlag={checkPassErrorFlag}
        placeholder={'確認パスワード'}
      />
    </>
  );
};
export default SignUpCheckPass;
