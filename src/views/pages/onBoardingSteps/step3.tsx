import React from 'react';

// @material-ui/core components
import { createStyles, WithStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import { GridContainer, GridItem } from '../../../components/grid';
import { CustomInput } from '../../../components/inputs';

import { customSelectStyle } from '../../../assets/jss';

const style = createStyles({
    infoText: {
        fontWeight: 300,
        margin: '10px 0 30px',
        textAlign: 'center',
    },
    ...customSelectStyle,
});

export interface IStep3Props extends WithStyles<typeof style> {}

export interface IStep3State {
    streetName: string;
    streetNumber: string;
    city: string;
    country: string;
}

class Step3 extends React.Component<IStep3Props, IStep3State> {
    constructor(props: IStep3Props) {
        super(props);
        this.state = {
            city: '',
            country: '',
            streetName: '',
            streetNumber: '',
        };
    }
    public render() {
        const { classes } = this.props;
        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={12}>
                    <h4 className={classes.infoText}>
                        Are you living in a nice area?
                    </h4>
                </GridItem>
                <GridItem xs={12} sm={7}>
                    <CustomInput
                        labelText="Street Name"
                        id="streetname"
                        value={this.state.streetName}
                        onChange={event =>
                            this.setState({
                                streetName: event.target.value as string,
                            })
                        }
                        formControlProps={{
                            fullWidth: true,
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={3}>
                    <CustomInput
                        labelText="Street No."
                        id="streetno"
                        value={this.state.streetNumber}
                        onChange={event =>
                            this.setState({
                                streetNumber: event.target.value as string,
                            })
                        }
                        formControlProps={{
                            fullWidth: true,
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={5}>
                    <CustomInput
                        labelText="City"
                        id="city"
                        value={this.state.city}
                        onChange={event =>
                            this.setState({
                                city: event.target.value as string,
                            })
                        }
                        formControlProps={{
                            fullWidth: true,
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={5}>
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                    >
                        <InputLabel
                            htmlFor="simple-select"
                            className={classes.selectLabel}
                        >
                            Choose Country
                        </InputLabel>
                        <Select
                            MenuProps={{
                                className: classes.selectMenu,
                            }}
                            classes={{
                                select: classes.select,
                            }}
                            value={this.state.country}
                            onChange={event =>
                                this.setState({
                                    country: event.target.value as string,
                                })
                            }
                            inputProps={{
                                name: 'simpleSelect',
                                id: 'simple-select',
                            }}
                        >
                            <MenuItem
                                disabled
                                classes={{
                                    root: classes.selectMenuItem,
                                }}
                            >
                                Country
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                }}
                                value="2"
                            >
                                France
                            </MenuItem>
                            <MenuItem
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected,
                                }}
                                value="3"
                            >
                                Romania
                            </MenuItem>
                        </Select>
                    </FormControl>
                </GridItem>
            </GridContainer>
        );
    }
    public isValidated() {
        return true;
    }
    private _sendState() {
        return this.state;
    }
}

export default withStyles(style)(Step3);
