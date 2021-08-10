import React from 'react';
import styled from 'styled-components';
import Pic from '../profile_pic.jpg';
import SocialBox from '../social-box';
import FlexWrapper from '../flex-wrapper';

const FooterWrapper = styled.div`
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    padding: 3rem 0;
`

const ProfilePic = styled.img`
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 2rem;
`
const StyledText = styled.p`
    color: #8E8E8E;
    font-size: 0.8rem;
    margin: 0;
    margin-top: 1rem;
    line-height: 1.5;
`
const StyledHeading = styled.h1`
    font-size: 1.3rem;
    font-weight: 400;
    margin-bottom: 0.3rem;
    margin-top: 0;
`

const SocialTag = styled.a`
    font-size: 0.8rem;
    font-weight: 400;
    color: #000;
`

const BlankWrapper = styled.div`
    margin-right: ${p => `${p.margin}px` || 0};
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <BlankWrapper>
                <FlexWrapper>
                    <ProfilePic src={Pic} />
                    <BlankWrapper margin='100'>
                        <StyledHeading>By Rahul Gupta</StyledHeading>
                        <SocialTag href='https://www.instagram.com/rhgpt_/' target='_blank'>@rhgpt_</SocialTag>
                        <StyledText>Sorting Visualizer is a personal project <br /> I built with React</StyledText>
                    </BlankWrapper>
                </FlexWrapper>
            </BlankWrapper>
            <SocialBox color="#000" alignment='row' />
        </FooterWrapper>
    )
}

export default Footer;