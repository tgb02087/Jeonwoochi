import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import LoginKakaoRedirect from './components/pages/LoginKakaoRedirect';
import Interest from './components/pages/Interest';
import MapAPI from './components/pages/MapAPI';
import { userInfo } from './recoil/atoms/userInfo';

/**
 * useQuery와 useRecoilState와 같은 훅을 App 컴포넌트에서 사용할 수 없어서
 * 라우트 부분만 따로 분리한 래퍼 컴포넌트
 *
 * @author Sckroll
 */
const RouteWrapper = () => {
  const userData = useRecoilValue(userInfo);

  return (
    <BrowserRouter>
      <Routes>
        {userData ? (
          <>
            <Route path="/" element={<Navigate replace to="/game" />}></Route>
            <Route
              path="/login"
              element={<Navigate replace to="/game" />}
            ></Route>
            <Route
              path="/login/kakao"
              element={<Navigate replace to="/game" />}
            ></Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate replace to="/login" />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/login/kakao" element={<LoginKakaoRedirect />}></Route>
          </>
        )}
        <Route path="/game" element={<Main />}></Route>
        <Route path="/interest" element={<Interest />}></Route>
        <Route path="/map/:id" element={<MapAPI />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteWrapper;
