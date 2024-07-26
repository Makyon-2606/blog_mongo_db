// 正規表現_文字
export const GENERAL_TEXT_VALIDATION_PATTERN =
  /[^\wぁ-んァ-ン一-龥Ａ-Ｚａ-ｚ., -@]/;
export const EMAIL_VALIDATION_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 正規表現_パスワード条件
export const UPPERCASE_REGEX = /[A-Z]/;
export const LOWERCASE_REGEX = /[a-z]/;
export const DIGIT_REGEX = /\d/;
export const SPECIAL_CHAR_REGEX = /[-!"#$%&'()*+,.\/:;<=>?@\[\]^_`{|}~]/;

// エラーメッセージ
export const NAME_REQUIRED = '氏名を入力してください';
export const BIRTHDATE_REQUIRED = '生年月日を正しく入力してください';
export const NAME_MAX_LENGTH = '20文字以内で入力してください';
export const NAME_INVALID_CHARS = '使用できない文字が含まれています';
export const EMAIL_INVALID = '正しいメールアドレスを入力してください';
export const PASSWORD_CRITERIA_ERROR_MESSAGE =
  '下記すべての条件を満たしたパスワードを設定してください';
export const PASSWORD_MISMATCH = '設定したパスワードと異なっています';
export const EMAIL_ALREADY_REGISTERED = '既に登録されているメールアドレスです';
export const INVALID_EMAIL_OR_PASSWORD_MESSAGE =
  'メールアドレス、またはパスワードが正しくありません';
export const NETWORK_ERROR = 'ネットワークエラーが発生しました';
export const FETCH_DATA_FAILURE = 'データの取得に失敗しました';
export const FETCH_BLOG_DATA_FAILURE = 'ブログデータの取得に失敗しました';
export const PASSWORD_UPDATE_ERROR = 'パスワードの更新に失敗しました。';

// エンドポイント
export const ENDPOINT_USER = 'http://localhost:3001/user';
export const ENDPOINT_BLOG = 'http://localhost:3001/blog';
