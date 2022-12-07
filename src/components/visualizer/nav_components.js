import styled from "styled-components";
import { FiRefreshCw } from "react-icons/fi";
import { BsStopCircle } from "react-icons/bs";

export const NavWrapper = styled.div`
    max-width: 100vw;
    background: linear-gradient(to right, #7e61b6 0%, #d75d5e 100%);
    padding: 2rem;
`;

export const Logo = styled.a`
    color: white;
    font-size: 2rem;
    font-weight: 600;
`;

export const NavElement = styled.button`
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    margin-right: ${(p) => p.marginRight || "2rem"};
    transition: color 0.15s ease-in-out;
    cursor: ${(p) => p.cursor || ""};

    &:hover {
        color: white;
    }

    &:disabled {
        cursor: default;
        color: hsla(0, 0%, 100%, 0.85);
    }
`;

export const ResetIcon = styled(FiRefreshCw)`
    transition: transform 0.2s linear;
    height: 28px;

    &:hover {
        ${(p) => (p.disabled ? "" : "transform: rotate(90deg); cursor: pointer;")}
    }
`;

export const StopIcon = styled(BsStopCircle)`
    height: 28px;
    width: 28px;
    color: white;
    cursor: pointer;
`;
