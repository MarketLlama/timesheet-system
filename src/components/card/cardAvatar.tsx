// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";

import { cardAvatarStyle } from "../../assets/jss";

export interface CardAvatarProps extends WithStyles<typeof cardAvatarStyle> {
    className?: string;
    plain?: boolean;
    profile?: boolean;
    testimonial?: boolean;
    testimonialFooter?: boolean;
    [rest: string]: any;
}

class CardAvatar extends React.Component<CardAvatarProps> {
    constructor(props: CardAvatarProps) {
        super(props);
    }
    public render() {
        const {
            classes,
            children,
            className,
            plain,
            profile,
            testimonial,
            testimonialFooter,
            ...rest
        } = this.props;
        const cardAvatarClasses = classNames({
            [classes.cardAvatar]: true,
            [classes.cardAvatarProfile]: profile,
            [classes.cardAvatarPlain]: plain,
            [classes.cardAvatarTestimonial]: testimonial,
            [classes.cardAvatarTestimonialFooter]: testimonialFooter,
            [className ? className : ""]: className !== undefined,
        });
        return (<div className={cardAvatarClasses} {...rest}>
            {children}
        </div>);
    }
}

(CardAvatar as React.ComponentClass<CardAvatarProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    profile: PropTypes.bool,
    plain: PropTypes.bool,
    testimonial: PropTypes.bool,
    testimonialFooter: PropTypes.bool,
} as any;

export default withStyles(cardAvatarStyle)(CardAvatar);
