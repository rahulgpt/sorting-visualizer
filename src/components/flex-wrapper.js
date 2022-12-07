import styled from "styled-components";

const FlexWrapper = styled.div`
    display: flex;
    justify-content: ${(p) => p.justifyContent || "center"};
    align-items: ${(p) => p.alignItems || "center"};
    margin: ${(p) => p.margin || 0};
    gap: ${(p) => p.gap || 0};
`;
export default FlexWrapper;
