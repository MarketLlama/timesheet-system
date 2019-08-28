// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
// @material-ui/icons
// core components
import { cardBodyStyle } from "../../assets/jss";

export interface CardBodyProps extends WithStyles<typeof cardBodyStyle> {
    className?: string;
    background?: boolean;
    plain?: boolean;
    formHorizontal?: boolean;
    pricing?: boolean;
    signup?: boolean;
    color?: boolean;
    profile?: boolean;
    calendar?: boolean;
    [rest: string]: any;
}

class CardBody extends React.Component<CardBodyProps> {
    constructor(props: CardBodyProps) {
        super(props);
    }
    public render() {
        const {
            classes,
            className,
            children,
            background,
            plain,
            formHorizontal,
            pricing,
            signup,
            color,
            profile,
            calendar,
            ...rest
          } = this.props;
        const cardBodyClasses = classNames({
            [classes.cardBody]: true,
            [classes.cardBodyBackground]: background,
            [classes.cardBodyPlain]: plain,
            [classes.cardBodyFormHorizontal]: formHorizontal,
            [classes.cardPricing]: pricing,
            [classes.cardSignup]: signup,
            [classes.cardBodyColor]: color,
            [classes.cardBodyProfile]: profile,
            [classes.cardBodyCalendar]: calendar,
            [className ? className : ""]: className !== undefined,
          });
        return (
            <div className={cardBodyClasses} {...rest}>
              {children}
            </div>
          );
    }
}

(CardBody as React.ComponentClass<CardBodyProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    background: PropTypes.bool,
    plain: PropTypes.bool,
    formHorizontal: PropTypes.bool,
    pricing: PropTypes.bool,
    signup: PropTypes.bool,
    color: PropTypes.bool,
    profile: PropTypes.bool,
    calendar: PropTypes.bool,
} as any;

export default withStyles(cardBodyStyle)(CardBody);
