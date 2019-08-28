import React from "react";

// @material-ui/core components
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";

import { createStyles, WithStyles } from "@material-ui/core";
// components
import { GridContainer, GridItem } from "../../../components/grid";

import { customCheckboxRadioSwitch, customSelectStyle } from "../../../assets/jss";

const style = createStyles({
  infoText: {
    fontWeight: 300,
    margin: "10px 0 30px",
    textAlign: "center",
  },
  inputAdornmentIcon: {
    color: "#555",
  },
  choice: {
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
  },
  ...customSelectStyle,
  ...customCheckboxRadioSwitch,
});

export interface IStep2Props extends WithStyles<typeof style> { }

export interface IStep2State {
  workLocation: string;
  design: boolean;
  pm: boolean;
  develop: boolean;
  arch: boolean;
  testing: boolean;
  security: boolean;
  exec: boolean;
  pa: boolean;
  finance: boolean;
  infrastructure: boolean;
  releaseManagement: boolean;
  other: boolean;
}

class Step2 extends React.Component<IStep2Props, IStep2State> {
  constructor(props: IStep2Props) {
    super(props);
    this.state = {
      workLocation: "",
      design: false,
      pm: false,
      develop: false,
      arch: false,
      testing: false,
      security: false,
      exec: false,
      pa: false,
      finance: false,
      infrastructure: false,
      releaseManagement: false,
      other: false,
    };
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <h4 className={classes.infoText}>What are you doing?</h4>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12} lg={10}>
            <GridContainer>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.design}
                    onChange={(event) => { this.setState({ design: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-pencil-alt " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-pencil-alt " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Designer</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.pm}
                    onChange={(event) => { this.setState({ pm: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-tasks " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-tasks " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Project Management</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.arch}
                    onChange={(event) => { this.setState({ arch: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-project-diagram " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-project-diagram " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Architecture</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.testing}
                    onChange={(event) => { this.setState({ testing: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-vials " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-vials " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Testing</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.security}
                    onChange={(event) => { this.setState({ security: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-user-secret " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-user-secret " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Security</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.exec}
                    onChange={(event) => { this.setState({ exec: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-user-tie " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-user-tie " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Executive Duties</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.pa}
                    onChange={(event) => { this.setState({ pa: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-chart-line " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-chart-line " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Project Administration</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.finance}
                    onChange={(event) => { this.setState({ finance: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-file-invoice-dollar " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-file-invoice-dollar " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Finance / Procurement</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.infrastructure}
                    onChange={(event) => { this.setState({ infrastructure: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-server " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-server " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Infrastructure</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.releaseManagement}
                    onChange={(event) => { this.setState({ releaseManagement: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={
                          "fas fa-sync-alt " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    icon={
                      <i
                        className={
                          "fas fa-sync-alt " + classes.iconCheckboxIcon
                        }
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Release / Change Management</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.develop}
                    onChange={(event) => { this.setState({ develop: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={"fas fa-terminal " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fas fa-terminal " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Development</h6>
                </div>
              </GridItem>
              <GridItem xs={6} sm={3}>
                <div className={classes.choice}>
                  <Checkbox
                    tabIndex={-1}
                    checked={this.state.other}
                    onChange={(event) => { this.setState({ other: event.target.checked }); }}
                    checkedIcon={
                      <i
                        className={"fas fa-meh-rolling-eyes " + classes.iconCheckboxIcon}
                      />
                    }
                    icon={
                      <i
                        className={"fas fa-meh-rolling-eyes " + classes.iconCheckboxIcon}
                      />
                    }
                    classes={{
                      checked: classes.iconCheckboxChecked,
                      root: classes.iconCheckbox,
                    }}
                  />
                  <h6>Other</h6>
                </div>
                <FormControl fullWidth className={classes.selectFormControl}>
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}
                  >
                    Choose City
                      </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    classes={{
                      select: classes.select,
                    }}
                    value={this.state.workLocation}
                    onChange={(event) => { this.setState({ workLocation: event.target.value as string }); }}
                    inputProps={{
                      name: "simpleSelect",
                      id: "simple-select",
                    }}
                  >
                    <MenuItem
                      disabled
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Choose City
                        </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value="2"
                    >
                      Paris
                        </MenuItem>
                    <MenuItem
                      classes={{
                        root: classes.selectMenuItem,
                        selected: classes.selectMenuItemSelected,
                      }}
                      value="3"
                    >
                      Bucharest
                        </MenuItem>
                  </Select>
                </FormControl>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
  public isValidated() {
    return true;
  }
  private _sendState() {
    return this.state;
  }
}

export default withStyles(style)(Step2);
