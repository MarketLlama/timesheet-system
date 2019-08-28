import { createStyles, Theme } from '@material-ui/core/styles';
import { headShake } from 'react-animations';
import { cardTitle, container, grayColor, whiteColor } from '.';

const loginPageStyle = (theme: Theme) =>
    createStyles({
        container: {
            ...container,
            zIndex: 4,
            [theme.breakpoints.down('sm')]: {
                paddingBottom: '100px',
            },
        },
        cardTitle: {
            ...cardTitle,
            color: whiteColor,
        },
        textCenter: {
            textAlign: 'center',
        },
        justifyContentCenter: {
            justifyContent: 'center !important',
        },
        customButtonClass: {
            '&,&:focus,&:hover': {
                color: whiteColor,
            },
            marginLeft: '5px',
            marginRight: '5px',
        },
        inputAdornment: {
            marginRight: '18px',
        },
        inputAdornmentIcon: {
            color: grayColor[6],
        },
        cardHidden: {
            opacity: 0,
            transform: 'translate3d(0, -60px, 0)',
        },
        cardHeader: {
            marginBottom: '20px',
        },
        socialLine: {
            padding: '0.9375rem 0',
        },
        '@keyframes headShake': {
            '0%': {
                transform: 'translateX(0)',
            },
            '6.5%': {
                transform: 'translateX(-6px) rotateY(-9deg)',
            },
            '18.5%': {
                transform: 'translateX(5px) rotateY(7deg)',
            },
            '31.5%': {
                transform: 'translateX(-3px) rotateY(-5deg)',
            },
            '43.5%': {
                transform: 'translateX(2px) rotateY(3deg)',
            },
            '50%': {
                transform: 'translateX(0)',
            },
        },
        headShake: {
            animationName: '$headShake',
            animationDuration: '1s',
        },
    });

export { loginPageStyle };
