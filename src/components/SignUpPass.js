import PassValidate from './PassValidate';

/**
 * パスワードのコンポーネント
 *
 * @param {string, function} passState パスワードの状態管理
 * @param {boolean, function} passErrorFlag パスワードのエラーフラグの状態管理
 */
const SignUpPass = ({ passState, passErrorFlag }) => {
  return (
    <>
      <PassValidate
        passState={passState}
        passErrorFlag={passErrorFlag}
        placeholder={'パスワード'}
      />
    </>
  );
};

export default SignUpPass;
