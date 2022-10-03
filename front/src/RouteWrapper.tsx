import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import LoginKakaoRedirect from './components/pages/LoginKakaoRedirect';
import Interest from './components/pages/Interest';
import MapAPI from './components/pages/MapAPI';
import checkAuth from './api/checkAuth';
import { userInfo } from './recoil/atoms/userInfo';
import refreshAccessToken from './api/refreshAccessToken';

/**
 * useQuery와 useRecoilState와 같은 훅을 App 컴포넌트에서 사용할 수 없어서
 * 라우트 부분만 따로 분리한 래퍼 컴포넌트
 *
 * @author Sckroll
 */
const RouteWrapper = () => {
  const [userData, setUserData] = useRecoilState(userInfo);
  const [refetchInterval, setRefetchInteval] = useState(1000 * 60 * 60 * 3);

  // 로그인 상태 체크 및 토큰 재발행
  // 우선 임의로 3시간 간격으로 두었음
  useQuery(
    ['checkAuthState'],
    async () => {
      try {
        // 헤더에 저장한 토큰으로 로그인 여부 확인
        const data = await checkAuth();
        setUserData(data);
      } catch (e) {
        // 헤더에 토큰이 없는 경우 쿠키에 있는 리프레시 토큰으로 토큰 재발행
        console.log('토큰 재발행');
        await refreshAccessToken();
        const data = await checkAuth();
        setUserData(data);
      }
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchInterval,
      onError() {
        setRefetchInteval(0);
      },
    },
  );

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
