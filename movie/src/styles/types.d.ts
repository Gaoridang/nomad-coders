import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };

    fonts: {
      eng: string;
      kor: string;
    };
  }
}
