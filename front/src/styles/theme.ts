const color = {
  primaryColor: 'blue',
};
const flex = {
  rowCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
    `,
  columnCenter: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
  `,
};

export const theme = {
  color,
  flex,
};

export type Theme = typeof theme;
