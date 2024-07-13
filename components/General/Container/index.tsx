import { styled } from "styled-components";

/**
 * Komponen ini digunakan untuk styling main page
 */
export const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #d5dff1;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
