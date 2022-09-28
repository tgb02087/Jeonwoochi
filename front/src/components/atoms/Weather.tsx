interface PropTypes {
  code: string;
}

import Sunny from '../../icons/Sunny';
import SunnyNCloudy from '../../icons/SunnyNCloudy';
import Cloudy from '../../icons/Cloudy';
import Rainy from '../../icons/Rainy';
import Snowy from '../../icons/Snowy';
/**
 *
 * @description
 * 날씨 코드 1 ~ 8을 params로 받아 해당하는 날씨 아이콘을 리턴
 * @example
 * <Weather code="1"/>
 *
 * @author jojo
 */

const Weather = ({ code }: PropTypes) => {
  switch (code) {
    case '1':
      return <Sunny />;
    case '3':
      return <SunnyNCloudy />;
    case '4':
      return <Cloudy />;
    case '7':
      return <Snowy />;
    default:
      return <Rainy />;
  }
};

export default Weather;
