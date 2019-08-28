// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
// @material-ui/icons
// core components
import { cardTextStyle } from "../../assets/jss";

export interface CardTextProps extends WithStyles<typeof cardTextStyle> {
    className: string;
    color: ColorType;
    [rest: string]: any;
}

class CardText extends React.Component<CardTextProps> {
    constructor(props: CardTextProps) {
        super(props);
    }
    public render() {
        const { classes, className, children, color, ...rest } = this.props;
        const textColor  = (color + "CardHeader") as keyof typeof cardTextStyle;
        const cardTextClasses = classNames({
          [classes.cardText]: true,
          [classes[textColor]]: color,
          [className]: className !== undefined,
        });
        return (
          <div className={cardTextClasses} {...rest}>
            {children}
          </div>
        );
    }
}

(CardText as React.ComponentClass<CardTextProps>).propTypes = {
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
} as any;

export default withStyles(cardTextStyle)(CardText);
