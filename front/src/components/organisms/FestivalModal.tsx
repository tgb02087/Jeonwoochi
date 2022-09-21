import { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Sheet from '../atoms/Sheet';
import Text from '../atoms/Text';
import FestivalInfos from './FestivalInfos';
import TitleCancelHeader from './TitleCancelHeader';

interface PropTypes {
  info:
    | {
        title: string;
        period: string;
        festivalUrl: string;
        posterUrl: string;
        description: string;
      }
    | undefined;
  setState: Dispatch<SetStateAction<boolean>>;
}
const StyledFestivalModal = styled.div`
  ${tw`absolute `}
  width: 40vw;
  height: 30vw;
  top: 20%;
  right: 1rem;
`;
const InnerSheet = styled.div`
  ${tw`flex flex-col`}
  width: 100%;
  padding: 1rem;
  gap: 1rem;
`;
const SheetBody = styled.div`
  ${tw`flex`}
  gap: 1rem;
`;
const LeftBody = styled.div`
  width: 20vw;
`;
const RightBody = styled.div`
  ${tw`flex flex-col justify-between items-center`}
  width: 20vw;
  height: 50vh;
  gap: 1rem;
`;
/**
 * 축제 별 모달 컴포넌트
 * Sheet 안에 Header, Body로 나뉘고
 * LeftBody에는 포스터, RightBody에는 축제 정보
 *
 * @author jojo
 */
const FestivalModal = ({ info, setState }: PropTypes) => {
  return (
    <StyledFestivalModal>
      <Sheet>
        {info ? (
          <InnerSheet>
            <TitleCancelHeader
              setState={setState}
              title={info.title}
              color="white"
            />
            <SheetBody>
              <LeftBody>
                <Image src={info.posterUrl} alt="poster" />
              </LeftBody>
              <RightBody>
                <FestivalInfos info={info} />
                <Button isText>
                  <Text message={'상세보기'} />
                </Button>
              </RightBody>
            </SheetBody>
          </InnerSheet>
        ) : (
          <Text color="white" message={'로딩 중입니다...'} />
        )}
      </Sheet>
    </StyledFestivalModal>
  );
};

export default FestivalModal;
