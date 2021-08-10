import styled from 'styled-components';
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';


const SocialWrapper = styled.div`
    display: flex;
    flex-direction: ${p => p.alignment || 'row'};
    justify-content: space-between;
    align-items: center;
    ${p => p.alignment === 'row' ? 'width' : 'height'}: 150px;
`

export const SocialLink = styled.a`
    color: #fff;
    font-size: 26px;

    &:hover {
        color: white;
    }
`

const SocialBox = ({ color, alignment }) => {
    return (
        <IconContext.Provider value={{ color: color }}>
            <SocialWrapper alignment={alignment} >
                <SocialLink href="https://github.com/rahulgpt" target="_blank">
                    <FaGithub />
                </SocialLink>
                <SocialLink href="https://www.instagram.com/rhgpt_/" target="_blank">
                    <FaInstagram />
                </SocialLink>
                <SocialLink href="https://twitter.com/RHGPT" target="_blank">
                    <FaTwitter />
                </SocialLink>
            </SocialWrapper>
        </IconContext.Provider >
    )
}

export default SocialBox;