import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

// core components
import { GridContainer, GridItem} from "../grid";

import { instructionStyle } from "../../assets/jss";

export interface InstructionProps extends WithStyles<typeof instructionStyle> {
    title: JSX.Element;
    text: JSX.Element;
    image: string;
    imageAlt?: string;
    className?: string;
    imageClassName?: string;
}

class Instruction extends React.Component<InstructionProps> {
    public static defaultProps: Partial<InstructionProps> = {
        imageAlt: "...",
    };

    public render() {
        const {
            classes,
            title,
            text,
            image,
            className,
            imageClassName,
            imageAlt,
          } = this.props;
        const instructionClasses = cx({
            [classes.instruction]: true,
            [className ? className : ""]: className !== undefined,
          });
        const pictureClasses = cx({
            [classes.picture]: true,
            [imageClassName ? imageClassName : ""]: imageClassName !== undefined,
          });
        return (
            <div className={instructionClasses}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <div className={pictureClasses}>
                    <img src={image} alt={imageAlt} className={classes.image} />
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          );
    }
}

(Instruction as React.ComponentClass<InstructionProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.node.isRequired,
    text: PropTypes.node.isRequired,
    image: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
} as any;

export default withStyles(instructionStyle)(Instruction);
