import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: #171717;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 80vh;
    margin: auto;
`;

export const Value = styled.span`
    color: white;
    margin-bottom: 0.5rem;
    font-weight: 500;
`;

export const Bar = styled.div`
    background-color: #cb6bf9;
    width: 1.4em; // 1.4
    height: ${(p) => `${p.height * 10}px` || 0};
    border-radius: 50px 50px 0 0;
`;

export const BarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    //margin-right: 0.6rem; // 0.6
    position: absolute;
    bottom: 0px;
`;

export const Container = styled.div`
    //border: 1px solid white;
    position: relative;
    height: 413px;
    width: ${(p) => `${p.length * 30}px`}; ;
`;

export const ScreenSizeWarning = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 10;
    display: none;
    background-color: #1b1b1b;
    padding: 1rem;
`;
