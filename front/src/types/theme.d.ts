import { Theme } from '../styles/theme';
import { CSSObject, CSSProp } from 'styled-components';

// ThemeProvider에 추가할 theme 타입 선언
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

// 각 요소의 css 속성에 추가할 CSS 값 타입 선언
// styled-components + TailwindCSS에서 활용하는 방식인지 확실치 않아서
// 우선 아래 코드를 유지하기로 했음
declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}
