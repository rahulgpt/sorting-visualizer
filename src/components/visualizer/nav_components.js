import styled from 'styled-components';
import { FiRefreshCw } from 'react-icons/fi';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

export const NavWrapper = styled.div`
    max-width: 100vw;
    background: linear-gradient(to right, #7e61b6 0%, #d75d5e 100%);
    padding: 2rem;
`

export const Logo = styled.a`
    color: white;
    font-size: 2rem;
    font-weight: 600;
`

export const NavElement = styled.button`
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    margin-right: 2rem;
    transition: color 0.15s ease-in-out;

    &:hover {
        color: white;
    }

    &:disabled {
        cursor: default;
        color: hsla(0,0%,100%,.85);
    }
`

export const ResetIcon = styled(FiRefreshCw)`
    transition: transform 0.5s ease-in-out;

    &:hover {
        ${p => p.disabled ?
        '' :
        'transform: rotate(90deg); cursor: pointer;'
    }
    }
`



export const VSlider = withStyles({
    root: {
        width: '200px',
        color: '#6b5b95',
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },

    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

// export function ValueLabelComponent(props) {
//     const { children, open, value } = props;

//     return (
//         <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
//             {children}
//         </Tooltip>
//     );
// }