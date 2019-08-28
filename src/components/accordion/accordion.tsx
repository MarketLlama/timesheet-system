import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import ExpandMore from "@material-ui/icons/ExpandMore";

import { accordionStyle } from "../../assets/jss";

interface CollapseItems {
    title: string;
    content: JSX.Element;
}

export interface AccordionProps extends WithStyles<typeof accordionStyle> {
    active?: number;
    collapseItems: CollapseItems[];
}

export interface AccordionState {
    active: number;
}

class Accordion extends React.Component<AccordionProps, AccordionState> {
    public static defaultProps: Partial<AccordionProps> = {
        active : -1,
    };
    constructor(props) {
        super(props);
        this.state = {
            active: props.active,
        };
    }
    public render() {
        const { classes, collapseItems } = this.props;
        return (
            <div className={classes.root}>
                {collapseItems.map((prop, key) => {
                    return (
                        <ExpansionPanel
                            expanded={this.state.active === key}
                            onChange={this._handleChange(key)}
                            key={key}
                            classes={{
                                root: classes.expansionPanel,
                                expanded: classes.expansionPanelExpanded,
                            }}
                        >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore />}
                                classes={{
                                    root: classes.expansionPanelSummary,
                                    expanded: classes.expansionPanelSummaryExpaned,
                                    content: classes.expansionPanelSummaryContent,
                                    expandIcon: classes.expansionPanelSummaryExpandIcon,
                                }}
                            >
                                <h4 className={classes.title}>{prop.title}</h4>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                                {prop.content}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })}
            </div>
        );
    }
    private _handleChange = (panel) => (event, expanded) => {
        this.setState({
            active: expanded ? panel : -1,
        });
    }
}

(Accordion as React.ComponentClass<AccordionProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    // index of the default active collapse
    active: PropTypes.number,
    collapses: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.node,
        }),
    ).isRequired,
} as any;

export default withStyles(accordionStyle)(Accordion);
