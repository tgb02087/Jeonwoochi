import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Text from '../atoms/Text';

interface PropTypes {
  info: {
    title: string;
    period: string;
    festivalUrl: string;
    posterUrl: string;
    description: string;
  };
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
const FestivalInfos = ({ info }: PropTypes) => {
  return (
    <StyledFestivalInfos>
      <Text message={info.period} color={'white'} size={1.3} />
      <Text message={info.festivalUrl} color={'white'} size={1.3} />
      <Text message={info.description} color={'white'} size={1.3} />
    </StyledFestivalInfos>
  );
};

export default FestivalInfos;
