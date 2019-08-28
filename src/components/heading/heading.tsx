import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { headingStyle } from "../../assets/jss";

export interface HeadingProps extends WithStyles<typeof headingStyle> {
    title: JSX.Element;
    category: JSX.Element;
    textAlign: TextAlign;
}

class Heading extends React.Component<HeadingProps> {
    constructor(props: HeadingProps) {
        super(props);
    }
    public render() {
        const { textAlign, category, title, classes } = this.props;
        const heading =
            classes.heading +
            " " +
            cx({
                [classes[textAlign + "TextAlign"]]: textAlign !== undefined,
            });
        if (title !== undefined || category !== undefined) {
            return (
                <div className={heading}>
                    {title !== undefined ? (
                        <h3 className={classes.title}>{title}</h3>
                    ) : null}
                    {category !== undefined ? (
                        <p className={classes.category}>{category}</p>
                    ) : null}
                </div>
            );
        }
        return null;
    }
}

(Heading as React.ComponentClass<HeadingProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.node,
    category: PropTypes.node,
    textAlign: PropTypes.oneOf(["right", "left", "center"]),
  } as any;

export default withStyles(headingStyle)(Heading);

