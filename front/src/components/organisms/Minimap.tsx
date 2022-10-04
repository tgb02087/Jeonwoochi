import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import BootScene from '../../game/BootScene';
import { convertXYGameToMinimap } from '../../utils/convertXYGameToMinimap';
import Image from '../atoms/Image';

interface StyledObjectTypes {
  x: number;
  y: number;
  isPlayer?: boolean;
  focused?: boolean;
}
interface PropTypes extends StyledObjectTypes {
  festivalList: any;
  openedSideBar: boolean;
  focusedIdx: number;
}
const StyledMinimap = styled.div`
  ${tw`absolute`}
  width: 300px;
  left: 1rem;
  bottom: 1rem;
  //   border: 5px solid white;
`;
const StyledObject = styled.div<StyledObjectTypes>`
  ${tw`absolute`}
  ${({ x, y }) => css`
    left: ${x - 5}px;
    top: ${y - 3}px;
  `}
  background-color: ${({ isPlayer, focused }) =>
    isPlayer ? 'red' : focused ? 'gold' : 'blue'};
  ${({ isPlayer }) =>
    isPlayer &&
    css`
      z-index: 1;
    `}
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
`;

/**
 * 현재 player의 좌표와 미니맵에 띄울 festivalList를 받아와 렌더링합니다.
 * StyledObject에는 isPlayer라는 boolean타입 변수를 주면 z-index:1, color:red로 렌더링됩니다.
 * isPlayer가 없으면 축제 오브젝트로 color:blue만 렌더링됩니다.
 * focusedIdx와 축제 오브젝트의 idx가 같으면 color:gold로 강조 표시 렌더링이 됩니다.
 * React.memo로 컴포넌트를 래핑해 캐릭터 좌표(props)가 변하지 않을 때는 리렌더링하지 않습니다.
 *
 * author: jojo
 */
const Minimap = ({
  x,
  y,
  openedSideBar,
  festivalList,
  focusedIdx,
}: PropTypes) => {
  const playerLocation = convertXYGameToMinimap(x, y);
  return (
    <StyledMinimap>
      <Image src="/images/map/minimap.png" alt="minimap" />
      {x === 0 && y === 0 ? null : (
        <StyledObject x={playerLocation.x} y={playerLocation.y} isPlayer />
      )}
      {openedSideBar &&
        festivalList &&
        festivalList.map((festival: any, idx: number) => {
          const locationInGame = BootScene.convertLatLngToXY(festival);
          const locationInMinimap = convertXYGameToMinimap(
            locationInGame.x,
            locationInGame.y,
          );
          return (
            <StyledObject
              x={locationInMinimap.x}
              y={locationInMinimap.y}
              focused={focusedIdx === idx ? true : false}
            />
          );
        })}
    </StyledMinimap>
  );
};

export default React.memo(Minimap);
