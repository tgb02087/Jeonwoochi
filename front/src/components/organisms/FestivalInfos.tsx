import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Link from '../atoms/Link';
import Text from '../atoms/Text';

interface PropTypes {
  info: {
    title: string;
    period: string;
    festivalUrl: string;
    posterUrl: string;
    description: string;
  };
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
  return (
    <StyledFestivalInfos>
      <Text message={info.period} color={'white'} size={size} />
      <Link href={info.festivalUrl} color="white" size={size}>
        {info.festivalUrl}
      </Link>
      <Text message={info.description} color={'white'} size={size} />
    </StyledFestivalInfos>
  );
};

export default FestivalInfos;
