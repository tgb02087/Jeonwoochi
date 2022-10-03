/**
 *
 * @param x
 * @param y
 *
 * @author: jojo
 */

export const convertXYGameToMinimap = (x: number, y: number) => {
  return {
    x: (x * 300) / 25600,
    y: (y * 262.8052598622417) / 22400,
  };
};
