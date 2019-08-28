// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
import SwipeableViews from "react-swipeable-views";

// material-ui components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

// core components
import { GridContainer, GridItem } from "../grid";

import { navPillsStyle } from "../../assets/jss";

interface ITab {
    tabButton: string;
    tabIcon: React.ComponentType<SvgIconProps>;
    tabContent: JSX.Element;
}

interface  IHorizontalLayout {
    tabsGrid: any;
    contentGrid: any;
}

export interface NavPillsProps extends WithStyles<typeof navPillsStyle> {
    active: number;
    tabs: ITab[];
    color: ColorType;
    direction: string;
    horizontal: IHorizontalLayout;
    alignCenter: boolean;
}

export interface NavPillsState {
    active: number;
}

class NavPills extends React.Component<NavPillsProps, NavPillsState> {
    constructor(props: NavPillsProps) {
        super(props);
        this.state = {
            active: props.active,
        };
    }
    public render() {
        const {
            classes,
            tabs,
            direction,
            color,
            horizontal,
            alignCenter,
        } = this.props;
        const flexContainerClasses = classNames({
            [classes.flexContainer]: true,
            [classes.horizontalDisplay]: horizontal !== undefined,
        });
        const tabButtons = (
            <Tabs
                classes={{
                    root: classes.root,
                    fixed: classes.fixed,
                    flexContainer: flexContainerClasses,
                    indicator: classes.displayNone,
                }}
                value={this.state.active}
                onChange={this._handleChange}
                centered={alignCenter}
            >
                {tabs.map((prop, key) => {
                    let icon = {};
                    if (prop.tabIcon !== undefined) {
                        icon = <prop.tabIcon className={classes.tabIcon} />;
                    }
                    const pillsClasses = classNames({
                        [classes.pills]: true,
                        [classes.horizontalPills]: horizontal !== undefined,
                        [classes.pillsWithIcons]: prop.tabIcon !== undefined,
                    });
                    return (
                        <Tab
                            label={prop.tabButton}
                            key={key}
                            {...icon}
                            classes={{
                                root: pillsClasses,
                                // labelContainer: classes.labelContainer,
                                // label: classes.label,
                                selected: classes[color],
                            }}
                        />
                    );
                })}
            </Tabs>
        );
        const tabContent = (
            <div className={classes.contentWrapper}>
                <SwipeableViews
                    axis={direction === "rtl" ? "x-reverse" : "x"}
                    index={this.state.active}
                    onChangeIndex={this._handleChangeIndex}
                    style={{ overflowY: "hidden" }}
                >
                    {tabs.map((prop, key) => {
                        return (
                            <div className={classes.tabContent} key={key}>
                                {prop.tabContent}
                            </div>
                        );
                    })}
                </SwipeableViews>
            </div>
        );
        return horizontal !== undefined ? (
            <GridContainer>
                <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
                <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
            </GridContainer>
        ) : (
                <div>
                    {tabButtons}
                    {tabContent}
                </div>
            );
    }
    private _handleChange = (event, active) => {
        this.setState({ active });
    }
    private _handleChangeIndex = (index) => {
        this.setState({ active: index });
    }
}

(NavPills as React.ComponentClass<NavPillsProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    // index of the default active pill
    active: PropTypes.number,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        tabButton: PropTypes.string,
        tabIcon: PropTypes.func,
        tabContent: PropTypes.node,
      }),
    ).isRequired,
    color: PropTypes.oneOf([
      "primary",
      "warning",
      "danger",
      "success",
      "info",
      "rose",
    ]),
    direction: PropTypes.string,
    horizontal: PropTypes.shape({
      tabsGrid: PropTypes.object,
      contentGrid: PropTypes.object,
    }),
    alignCenter: PropTypes.bool,
} as any;

export default withStyles(navPillsStyle)(NavPills);
