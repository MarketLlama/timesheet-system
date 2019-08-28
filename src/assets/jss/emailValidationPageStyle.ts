import { createStyles } from '@material-ui/core/styles';
import {
    blackColor,
    cardTitle,
    container,
    customCheckboxRadioSwitch,
    grayColor,
    hexToRgb,
} from '.';

const emailValidationPageStyle = createStyles({
    ...customCheckboxRadioSwitch,
    cardTitle: {
        ...cardTitle,
        textAlign: 'center',
    },
    container: {
        ...container,
        position: 'relative',
        zIndex: 3,
        // paddingTop: "23vh"
    },
    cardHidden: {
        opacity: 0,
        transform: 'translate3d(0, -60px, 0)',
    },
    cardSignup: {
        borderRadius: '6px',
        boxShadow:
            '0 16px 24px 2px rgba(' +
            hexToRgb(blackColor) +
            ', 0.14), 0 6px 30px 5px rgba(' +
            hexToRgb(blackColor) +
            ', 0.12), 0 8px 10px -5px rgba(' +
            hexToRgb(blackColor) +
            ', 0.2)',
        // marginBottom: "100px",
        padding: '40px 0px',
        transform: 'translate3d(' + hexToRgb(blackColor) + ')',
        transition: 'all 300ms linear',
        marginTop: '15vh',
    },
    center: {
        textAlign: 'center',
    },
    right: {
        textAlign: 'right',
    },
    left: {
        textAlign: 'left',
    },
    form: {
        padding: '0 20px',
        position: 'relative',
    },
    socialTitle: {
        fontSize: '18px',
    },
    inputAdornment: {
        marginRight: '18px',
        position: 'relative',
    },
    inputAdornmentIcon: {
        color: grayColor[6],
    },
    customFormControlClasses: {
        margin: '0 12px',
    },
    checkboxLabelControl: {
        margin: '0',
    },
    checkboxLabel: {
        marginLeft: '6px',
        color: 'rgba(' + hexToRgb(blackColor) + ', 0.26)',
    },
});

export { emailValidationPageStyle };
