import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import PreviousPageLink from './PreviousPageLink';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div>
      {children}
      {/* '/mypage/newPost' と '/mypage/changepass' の場合に PreviousPageLink を表示 */}
      {(location.pathname === '/mypage/newPost' ||
        location.pathname === '/mypage/changepass') && <PreviousPageLink />}

      {/* 上記以外の特定のパスでは Footer を表示しない */}
      {location.pathname !== '/' &&
        location.pathname !== '/mypage' &&
        location.pathname !== '/mypage/newPost' &&
        location.pathname !== '/mypage/changepass' && <Footer />}
    </div>
  );
};

export default Layout;
