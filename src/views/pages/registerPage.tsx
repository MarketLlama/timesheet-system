import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import CalendarToday from "@material-ui/icons/CalendarToday";
import Check from "@material-ui/icons/Check";
import Email from "@material-ui/icons/Email";
import Group from "@material-ui/icons/Group";
import LockOutline from "@material-ui/icons/LockOutlined";
import Timeline from "@material-ui/icons/Timeline";

// core components
import { Card, CardBody } from "../../components/card";
import { Button } from "../../components/customButtons";
import { GridContainer, GridItem } from "../../components/grid";
import { InfoArea } from "../../components/infoArea";
import { CustomInput } from "../../components/inputs";

import { registerPageStyle } from "../../assets/jss";

export interface RegisterPageProps extends WithStyles<typeof registerPageStyle> { }

export interface RegisterPageState {
    checked: number[];
    userEmail: string;
    password: string;
    cardAnimation: string;
}

class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {
    public timeOutFunction!: NodeJS.Timeout;
    constructor(props: RegisterPageProps) {
        super(props);
        this.state = {
            checked: [],
            userEmail: "",
            password: "",
            cardAnimation: "cardHidden",
        };
    }
    public componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        this.timeOutFunction = setTimeout(() => {
            this.setState({ cardAnimation: "" });
        }, 700);

    }
    public componentWillUnmount() {
        clearTimeout(this.timeOutFunction);
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={10}>
                        <Card className={classes[this.state.cardAnimation] + " " + classes.cardSignup}>
                            <h2 className={classes.cardTitle}>Register</h2>
                            <CardBody>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={5}>
                                        <InfoArea
                                            title="Easy Electronic Timesheets"
                                            description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                                            icon={Timeline}
                                            iconColor="info"
                                        />
                                        <InfoArea
                                            title="Weekly Timesheet Reminders"
                                            description="We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
                                            icon={CalendarToday}
                                            iconColor="primary"
                                        />
                                        <InfoArea
                                            title="Easy Onboarding"
                                            description="There is also a Fully Customizable CMS Admin Dashboard for this product."
                                            icon={Group}
                                            iconColor="warning"
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={8} md={5}>
                                        <div className={classes.center}>
                                            <Button justIcon round color="twitter">
                                                <i className="fab fa-twitter" />
                                            </Button>
                                            {` `}
                                            <Button justIcon round color="dribbble">
                                                <i className="fab fa-dribbble" />
                                            </Button>
                                            {` `}
                                            <Button justIcon round color="facebook">
                                                <i className="fab fa-facebook-f" />
                                            </Button>
                                            {` `}
                                            <h4 className={classes.socialTitle}>or be classical</h4>
                                        </div>
                                        <form className={classes.form}>
                                            <CustomInput
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses,
                                                }}
                                                inputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <Email className={classes.inputAdornmentIcon} />
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Email...",
                                                }}
                                            />
                                            <CustomInput
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses,
                                                }}
                                                inputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <LockOutline className={classes.inputAdornmentIcon} />
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Password...",
                                                    type: "password",
                                                }}
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    root: classes.checkboxLabelControl,
                                                    label: classes.checkboxLabel,
                                                }}
                                                control={
                                                    <Checkbox
                                                        tabIndex={-1}
                                                        onClick={() => this._handleToggle(1)}
                                                        checkedIcon={
                                                            <Check className={classes.checkedIcon} />
                                                        }
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot,
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <span>
                                                        I agree to the{" "}
                                                        <a href="#pablo">terms and conditions</a>.
                                  </span>
                                                }
                                            />
                                            <div className={classes.center}>
                                                <Button round color="primary">
                                                    Get started
                                </Button>
                                            </div>
                                        </form>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }

    private _handleToggle = (value: number) => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    }
}

(RegisterPage as React.ComponentClass<RegisterPageProps>).propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default withStyles(registerPageStyle)(RegisterPage);
