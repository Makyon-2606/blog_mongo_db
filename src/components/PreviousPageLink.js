import { useNavigate } from 'react-router-dom';

const PreviousPageLink = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault(); // デフォルトのリンク動作を阻止
    navigate(-1); // 一つ前のページに戻る
  };

  return (
    <footer className='footer'>
      {/* リンクとしてスタイリングされた戻る機能 */}
      <a href='#' onClick={handleClick} className='previous-link'>
        戻る
      </a>
    </footer>
  );
};

export default PreviousPageLink;
