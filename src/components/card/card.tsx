// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
// @material-ui/icons

// core components
import { cardStyle } from "../../assets/jss";

export interface CardProps extends WithStyles<typeof cardStyle> {
    className?: string;
    plain?: boolean;
    profile?: boolean;
    blog?: boolean;
    raised?: boolean;
    background?: boolean;
    pricing?: boolean;
    color: ColorType;
    product?: boolean;
    testimonial?: boolean;
    chart?: boolean;
    login?: boolean;
    [rest: string]: any;
}

class Card extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
    }
    public render() {
        const {
            classes,
            className,
            children,
            plain,
            profile,
            blog,
            raised,
            background,
            pricing,
            color,
            product,
            testimonial,
            chart,
            login,
            ...rest
        } = this.props;

        const cardColor = color as keyof typeof cardStyle;

        const cardClasses = classNames({
            [classes.card]: true,
            [classes.cardPlain]: plain,
            [classes.cardProfile]: profile || testimonial,
            [classes.cardBlog]: blog,
            [classes.cardRaised]: raised,
            [classes.cardBackground]: background,
            [classes.cardPricingColor]:
                (pricing && color !== undefined) || (pricing && background !== undefined),
            [classes[cardColor]]: color,
            [classes.cardPricing]: pricing,
            [classes.cardProduct]: product,
            [classes.cardChart]: chart,
            [classes.cardLogin]: login,
            [className ? className : ""]: className !== undefined,
        });
        return (<div className={cardClasses} {...rest}>
            {children}
        </div>);
    }
}

(Card as React.ComponentClass<CardProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    blog: PropTypes.bool,
    raised: PropTypes.bool,
    background: PropTypes.bool,
    pricing: PropTypes.bool,
    testimonial: PropTypes.bool,
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "rose",
    ]),
    product: PropTypes.bool,
    chart: PropTypes.bool,
    login: PropTypes.bool,
} as any;

export default withStyles(cardStyle)(Card);
