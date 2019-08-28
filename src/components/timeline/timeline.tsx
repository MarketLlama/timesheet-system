import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

// core components

import { Badge } from "../badges";

import { timelineStyle } from "../../assets/jss";

interface ITimeLineStory {
    inverted: boolean;
    badgeColor: ColorType;
    badgeIcon: React.ComponentType<SvgIconProps>;
    title: string;
    titleColor: ColorType;
    body: JSX.Element;
    footerTitle: string;
    footer?: undefined;
}

export interface TimeLineProps extends WithStyles<typeof timelineStyle> {
    stories: ITimeLineStory[];
    simple: boolean;
}

class TimeLine extends React.Component<TimeLineProps> {

    public render() {
        const { classes, stories, simple } = this.props;
        const timelineClass =
            classes.timeline +
            " " +
            cx({
                [classes.timelineSimple]: simple,
            });
        return (
            <ul className={timelineClass}>
                {stories.map((prop, key) => {
                    const panelClasses =
                        classes.timelinePanel +
                        " " +
                        cx({
                            [classes.timelinePanelInverted]: prop.inverted || simple,
                            [classes.timelineSimplePanel]: simple,
                        });
                    const timelineBadgeClasses =
                        classes.timelineBadge +
                        " " +
                        classes[prop.badgeColor] +
                        " " +
                        cx({
                            [classes.timelineSimpleBadge]: simple,
                        });
                    return (
                        <li className={classes.item} key={key}>
                            {prop.badgeIcon ? (
                                <div className={timelineBadgeClasses}>
                                    <prop.badgeIcon className={classes.badgeIcon} />
                                </div>
                            ) : null}
                            <div className={panelClasses}>
                                {prop.title ? (
                                    <div className={classes.timelineHeading}>
                                        <Badge color={prop.titleColor}>{prop.title}</Badge>
                                    </div>
                                ) : null}
                                <div className={classes.timelineBody}>{prop.body}</div>
                                {prop.footerTitle ? (
                                    <h6 className={classes.footerTitle}>{prop.footerTitle}</h6>
                                ) : null}
                                {prop.footer ? <hr className={classes.footerLine} /> : null}
                                {prop.footer ? (
                                    <div className={classes.timelineFooter}>{prop.footer}</div>
                                ) : null}
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

(TimeLine as React.ComponentClass<TimeLineProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    stories: PropTypes.arrayOf(PropTypes.object).isRequired,
    simple: PropTypes.bool,
} as any;

export default withStyles(timelineStyle)(TimeLine);
