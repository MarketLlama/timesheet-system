// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
// @material-ui/icons
// core components
import { cardIconStyle } from "../../assets/jss";

export interface CardIconProps extends WithStyles<typeof cardIconStyle> {
    className: string;
    color: ColorType;
    [rest: string]: any;
}

class CardIcon extends React.Component<CardIconProps> {
    constructor(props: CardIconProps) {
        super(props);
    }
    public render() {
        const { classes, className, children, color, ...rest } = this.props;
        const iconColor = (color + "CardHeader") as keyof typeof cardIconStyle;
        const cardIconClasses = classNames({
          [classes.cardIcon]: true,
          [classes[iconColor]]: color,
          [className]: className !== undefined,
        });
        return (
          <div className={cardIconClasses} {...rest}>
            {children}
          </div>
        );
    }
}

(CardIcon as React.ComponentClass<CardIconProps>).propTypes = {
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

export default withStyles(cardIconStyle)(CardIcon);
