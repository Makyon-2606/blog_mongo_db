import PassValidate from './components/PassValidate';

/**
 * 新しいパスワードのコンポーネント
 * @param {string, function} newPassState 新しいパスワードの状態管理
 * @param {boolean, function} newPassErrorFlag 新しいパスワードのエラーフラグの状態管理
 * @param {string} placeholder プレースホルダー
 */
const ChangeNewPassword = ({ newPassState, newPassErrorFlag, placeholder }) => {
  return (
    <>
      <PassValidate
        passState={newPassState}
        passErrorFlag={newPassErrorFlag}
        placeholder={placeholder}
      />
    </>
  );
};

export default ChangeNewPassword;
