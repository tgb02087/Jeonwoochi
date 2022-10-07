import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { MapData } from '../../mocks/handlers/festival_list';
import Link from '../atoms/Link';
import Text from '../atoms/Text';

interface PropTypes {
  info: MapData;
  size: number;
}
const StyledFestivalInfos = styled.div`
  width: 100%;
  ${tw`flex flex-col`}
  overflow-x: hidden;
  overflow-y: auto;
  gap: 1rem;
`;
/**
 * 축제 정보 컴포넌트
 * 기간, 축제 url, 요약
 *
 * @author jojo
 */
const FestivalInfos = ({ info, size }: PropTypes) => {
  const homepage = info?.homepage.split('"')[1];
  return (
    <StyledFestivalInfos>
      <Text
        message={info?.startDate + ' ~ ' + info?.endDate}
        color={'white'}
        size={size}
      />
      <Link href={homepage} color="skyblue" size={size}>
        {homepage}
      </Link>
      <Text
        message={info?.description.replaceAll('<br>', '. ')}
        color={'white'}
        size={size}
      />
    </StyledFestivalInfos>
  );
};

export default FestivalInfos;
