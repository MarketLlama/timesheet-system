
// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
// @material-ui/icons
// core components
import { cardFooterStyle } from "../../assets/jss";

export interface CardFooterProps extends WithStyles<typeof cardFooterStyle> {
    className?: string;
    plain?: boolean;
    profile?: boolean;
    pricing?: boolean;
    testimonial?: boolean;
    stats?: boolean;
    chart?: boolean;
    product?: boolean;
    [rest: string]: any;
}

class CardFooter extends React.Component<CardFooterProps> {
    constructor(props: CardFooterProps) {
        super(props);
    }
    public render() {
        const {
            classes,
            className,
            children,
            plain,
            profile,
            pricing,
            testimonial,
            stats,
            chart,
            product,
            ...rest
          } = this.props;
        const cardFooterClasses = classNames({
            [classes.cardFooter]: true,
            [classes.cardFooterPlain]: plain,
            [classes.cardFooterProfile]: profile || testimonial,
            [classes.cardFooterPricing]: pricing,
            [classes.cardFooterTestimonial]: testimonial,
            [classes.cardFooterStats]: stats,
            [classes.cardFooterChart]: chart || product,
            [className ? className : ""]: className !== undefined,
          });
        return (
            <div className={cardFooterClasses} {...rest}>
              {children}
            </div>
          );
    }
}

(CardFooter as React.ComponentClass<CardFooterProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    pricing: PropTypes.bool,
    testimonial: PropTypes.bool,
    stats: PropTypes.bool,
    chart: PropTypes.bool,
    product: PropTypes.bool,
} as any;

export default withStyles(cardFooterStyle)(CardFooter);
