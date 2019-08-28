import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

// core components
import { Card, CardAvatar, CardBody, CardFooter } from "../../components/card";
import { Button } from "../../components/customButtons";
import { CustomInput } from "../../components/inputs";

import avatar from "../../assets/img/faces/avatar.jpg";

import { lockScreenPageStyle } from "../../assets/jss";

export interface LockScreenPageProps
  extends WithStyles<typeof lockScreenPageStyle> {}

export interface LockScreenPageState {
  cardAnimation: string;
}

class LockScreenPage extends React.Component<
  LockScreenPageProps,
  LockScreenPageState
> {
  public timeOutFunction!: NodeJS.Timeout;
  constructor(props: LockScreenPageProps) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimation: "cardHidden"
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
        <form>
          <Card
            profile
            className={
              classes.customCardClass + " " + classes[this.state.cardAnimation]
            }
          >
            <CardAvatar profile className={classes.cardAvatar}>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>Tania Andrew</h4>
              <CustomInput
                labelText="Enter Password"
                id="company-disabled"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "password"
                }}
              />
            </CardBody>
            <CardFooter className={classes.justifyContentCenter}>
              <Button color="rose" round>
                Unlock
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    );
  }
}

(LockScreenPage as React.ComponentClass<LockScreenPageProps>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(lockScreenPageStyle)(LockScreenPage);
