import React, { useEffect } from 'react';

import { useQuery } from 'react-query';
import axios from 'axios';
import { MapData } from '../../recoil/atoms';

import { Link } from 'react-router-dom';

const Main = () => {
  useQuery<MapData[]>(['Maps'], async () => {
    const response = await axios.get('/maps');
    return response.data;
  });

  return (
    <>
      <div>main</div>
      <Link to={'/map/2'}> map 페이지</Link>
    </>
  );
};

export default Main;
