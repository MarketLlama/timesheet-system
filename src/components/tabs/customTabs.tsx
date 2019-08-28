// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";

// material-ui components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
// core components
import { Card , CardBody, CardHeader } from "../../components/card";

import { customTabsStyle } from "../../assets/jss";

interface ITab {
    tabName: string;
    tabIcon?: Function;
    tabContent: JSX.Element;
}

export interface CustomTabsProps extends WithStyles<typeof customTabsStyle> {
    headerColor: ColorType;
    title: string;
    tabs: ITab[];
    plainTabs?: boolean;
}

export interface CustomTabsState {
    value: number;
}

class CustomTabs extends React.Component<CustomTabsProps, CustomTabsState> {
    constructor(props: CustomTabsProps) {
        super(props);
        this.state = { value: 0 };
    }

    public render() {
        const {
            classes,
            headerColor,
            plainTabs,
            tabs,
            title } = this.props;
        const cardTitle = classNames({
            [classes.cardTitle]: true,
            [classes.cardTitleRTL]: false,
        });
        return (
            <Card plain={plainTabs}>
                <CardHeader color={headerColor} plain={plainTabs}>
                    {title !== undefined ? (
                        <div className={cardTitle}>{title}</div>
                    ) : null}
                    <Tabs
                        value={this.state.value}
                        onChange={this._handleChange}
                        classes={{
                            root: classes.tabsRoot,
                            indicator: classes.displayNone,
                        }}
                    >
                        {tabs.map((prop, key) => {
                            let icon = {};
                            if (prop.tabIcon) {
                                icon = {
                                    icon: <prop.tabIcon />,
                                };
                            }
                            return (
                                <Tab
                                    classes={{
                                        root: classes.tabRootButton,
                                        selected: classes.tabSelected,
                                        wrapper: classes.tabWrapper,
                                    }}
                                    key={key}
                                    label={prop.tabName}
                                    {...icon}
                                />
                            );
                        })}
                    </Tabs>
                </CardHeader>
                <CardBody>
                    {tabs.map((prop, key) => {
                        if (key === this.state.value) {
                            return <div key={key}>{prop.tabContent}</div>;
                        }
                        return null;
                    })}
                </CardBody>
            </Card>
        );
    }
    private _handleChange = (event, value) => {
        this.setState({ value });
    }
}

export default CustomTabs;
