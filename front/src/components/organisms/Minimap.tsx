import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import BootScene from '../../game/BootScene';
import { MapData } from '../../mocks/handlers/festival_list';
import { convertXYGameToMinimap } from '../../utils/convertXYGameToMinimap';
import Image from '../atoms/Image';

interface StyledObjectTypes {
  x: number;
  y: number;
  isPlayer?: boolean;
  focused?: boolean;
}
interface PropTypes extends StyledObjectTypes {
  festivalList: Array<MapData[]> | undefined;
  focusedIdx: number;
  selectedFestivals: MapData[] | undefined;
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
  width: 0.3rem;
  height: 0.3rem;
  ${({ x, y }) => css`
    left: ${x - 5}px;
    top: ${y - 3}px;
  `}
  background-color: ${({ isPlayer, focused }) =>
    isPlayer ? 'red' : focused ? 'gold' : '#A9A9A9'};
  ${({ isPlayer }) =>
    isPlayer &&
    css`
      z-index: 1;
    `}
  ${({ isPlayer, focused }) =>
    (isPlayer || focused) &&
    css`
      width: 0.5rem;
      height: 0.5rem;
    `}
  border-radius: 50%;
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
  festivalList,
  focusedIdx,
  selectedFestivals,
}: // 얘를 받아와서 어떻게 뿌려주지~~~?
PropTypes) => {
  const playerLocation = convertXYGameToMinimap(x, y);

  return (
    <StyledMinimap>
      <Image src="/images/map/minimap.png" alt="minimap" />
      {x === 0 && y === 0 ? null : (
        <StyledObject x={playerLocation.x} y={playerLocation.y} isPlayer />
      )}
      {festivalList &&
        festivalList.map((festivals: MapData[], idx: number) => {
          const locationInGame = BootScene.convertLatLngToXY(festivals[0]);
          const locationInMinimap = convertXYGameToMinimap(
            locationInGame.x,
            locationInGame.y,
          );
          const isFocused = festivals.some(
            festival => festival.id === focusedIdx,
          );

          return (
            <StyledObject
              x={locationInMinimap.x}
              y={locationInMinimap.y}
              focused={isFocused}
              key={locationInMinimap.x * locationInMinimap.y + idx}
            />
          );
        })}
    </StyledMinimap>
  );
};

export default React.memo(Minimap);
