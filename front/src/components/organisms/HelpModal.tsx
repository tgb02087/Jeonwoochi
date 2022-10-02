import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Sheet from '../atoms/Sheet';
import Text from '../atoms/Text';
import TitleCancelHeader from './TitleCancelHeader';

interface PropTypes {
  setState: Dispatch<SetStateAction<boolean>>;
}
const StyledHelpModal = styled.div`
  width: 40vw;
  z-index: 1;
`;
const InnerSheet = styled.div`
  ${tw`flex flex-col`}
  width: 100%;
  height: 60vh;
  gap: 2rem;
`;
const SheetHeader = styled.div`
  height: 5vh;
`;
const SheetBody = styled.div`
  ${tw`flex flex-col justify-around items-center`}
  height: 55vh;
`;
const BodyLine = styled.div``;

/**
 * 축제 요청 리스트를 확인하는 모달. 관리자만 접근 가능.
 *
 * @author jojo
 */
const HelpModal = ({ setState }: PropTypes) => {
  return (
    <StyledHelpModal>
      <Sheet transparent>
        <InnerSheet>
          <SheetHeader>
            <TitleCancelHeader
              setState={setState}
              title="도움말"
              color="white"
            />
          </SheetHeader>
          <SheetBody>
            <BodyLine>
              <Text message="방향키를 이용해 캐릭터를 움직여 보세요!" />
            </BodyLine>
            <BodyLine>
              <Text message="Z 키를 눌러 축지법을 사용할 수 있습니다" />
            </BodyLine>
            <BodyLine>
              <Text message="X 키를 눌러 허공 답보를 할 수 있습니다" />
            </BodyLine>
            <BodyLine>
              <Text message="두 스킬을 같이 사용할 수도 있습니다" />
            </BodyLine>
          </SheetBody>
        </InnerSheet>
      </Sheet>
    </StyledHelpModal>
  );
};

export default HelpModal;
