// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
// @material-ui/icons
// core components
import { cardHeaderStyle } from "../../assets/jss";

export interface CardHeaderProps extends WithStyles<typeof cardHeaderStyle> {
    className?: string;
    color: ColorType;
    plain?: boolean;
    image?: boolean;
    contact?: boolean;
    signup?: boolean;
    stats?: boolean;
    icon?: boolean;
    text?: boolean;
    [rest: string]: any;
}

class CardHeader extends React.Component<CardHeaderProps> {
    constructor(props: CardHeaderProps) {
        super(props);
    }
    public render() {
        const {
            classes,
            className,
            children,
            color,
            plain,
            image,
            contact,
            signup,
            stats,
            icon,
            text,
            ...rest
          } = this.props;
        const headerColor = (color + "CardHeader") as keyof typeof cardHeaderStyle;
        const cardHeaderClasses = classNames({
            [classes.cardHeader]: true,
            [classes[headerColor]]: color,
            [classes.cardHeaderPlain]: plain,
            [classes.cardHeaderImage]: image,
            [classes.cardHeaderContact]: contact,
            [classes.cardHeaderSignup]: signup,
            [classes.cardHeaderStats]: stats,
            [classes.cardHeaderIcon]: icon,
            [classes.cardHeaderText]: text,
            [className ? className : ""]: className !== undefined,
          });
        return (
            <div className={cardHeaderClasses} {...rest}>
              {children}
            </div>
          );
    }
}

(CardHeader as React.ComponentClass<CardHeaderProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf([
      "warning",
      "success",
      "danger",
      "info",
      "primary",
      "rose",
    ]),
    plain: PropTypes.bool,
    image: PropTypes.bool,
    contact: PropTypes.bool,
    signup: PropTypes.bool,
    stats: PropTypes.bool,
    icon: PropTypes.bool,
    text: PropTypes.bool,
} as any;

export default withStyles(cardHeaderStyle)(CardHeader);
