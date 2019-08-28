import React from 'react';
// react component for creating dynamic tables
import ReactTable from 'react-table';

import TimeSheetService, {
    ITimeSheet,
    IWeek,
} from '../../services/timeSheetService';

// @material-ui/core components
import { createStyles, WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import Assignment from '@material-ui/icons/Assignment';
import WarningIcon from '@material-ui/icons/Warning';
import AddAlert from '@material-ui/icons/AddAlert';
// core components
import {
    Card,
    CardBody,
    CardHeader,
    CardIcon,
    CardFooter,
} from '../../components/card';
import { SnackBar } from '../../components/snackbar';
import { CustomDropdown } from '../../components/customDropdowns';
import { Button } from '../../components/customButtons';
import { GridContainer, GridItem } from '../../components/grid';
import { CustomInput } from '../../components/inputs';
import { Table } from '../../components/table';

import { cardTitle } from '../../assets/jss';

const styles = createStyles({
    customCardContentClass: {
        paddingLeft: '0',
        paddingRight: '0',
    },
    cardIconTitle: {
        ...cardTitle,
        marginTop: '15px',
        marginBottom: '0px',
    },
    center: {
        justifyContent: 'flex-end',
    },
    denseInput: {
        paddingTop: '0',
    },
    inputAdornment: {
        position: 'relative',
    },
    inputAdornmentIcon: {
        color: '#555',
    },
});

export interface TimeSheetInputProps extends WithStyles<typeof styles> {}

export interface TimeSheetInputState {
    showError: boolean;
    showSaveConfirmation: boolean;
    weeks?: IWeek[];
    [x: string]: any;
}

interface tableRow {
    day: string;
    isWeekend: boolean;
}

const daysOfWeek: tableRow[] = [
    { day: 'Monday', isWeekend: false },
    { day: 'Tuesday', isWeekend: false },
    { day: 'Wednesday', isWeekend: false },
    { day: 'Thursday', isWeekend: false },
    { day: 'Friday', isWeekend: false },
    { day: 'Saturday', isWeekend: true },
    { day: 'Sunday', isWeekend: true },
];

class TimeSheetInput extends React.Component<
    TimeSheetInputProps,
    TimeSheetInputState
> {
    constructor(props: TimeSheetInputProps) {
        super(props);
        this.state = {
            showError: false,
            showSaveConfirmation: false,
            MondayInput: 0,
            TuesdayInput: 0,
            WednesdayInput: 0,
            ThursdayInput: 0,
            FridayInput: 0,
            SaturdayInput: 0,
            SundayInput: 0,
        };
    }

    public componentDidMount() {
        this._getWeeks();
    }
    public render() {
        const { classes } = this.props;
        const { weeks } = this.state;

        let tableData: any[] = [];
        daysOfWeek.map(tableRow => {
            tableData.push({
                color: tableRow.isWeekend ? 'gray' : '',
                data: [
                    new Date().toDateString(),
                    tableRow.day,
                    <CustomInput
                        formControlProps={{
                            fullWidth: true,
                            className: classes.denseInput,
                        }}
                        success={this.state[`${tableRow.day}InputError`]}
                        error={this.state[`${tableRow.day}InputError`]}
                        inputProps={{
                            onChange: event =>
                                this._validateInput(
                                    event.target.value,
                                    `${tableRow.day}Input`
                                ),
                            type: 'number',
                            defaultValue: 0,
                        }}
                    />,
                ],
            });
        });
        return (
            <GridContainer>
                <GridItem xs={12}>
                    <CustomDropdown
                        hoverColor="primary"
                        buttonText="Week of Timesheet"
                        buttonProps={{
                            fullWidth: false,
                            style: { marginBottom: '0' },
                            color: 'primary',
                        }}
                        dropdownHeader="Select week of Timesheet"
                        dropdownList={
                            weeks
                                ? weeks.map(week => {
                                      return week.title;
                                  })
                                : []
                        }
                    />
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment />
                            </CardIcon>
                            <h3 className={classes.cardIconTitle}>Timesheet</h3>
                        </CardHeader>
                        <CardBody>
                            <Table
                                hover
                                tableHeaderColor="primary"
                                tableHead={['Date', 'Day', 'Worked']}
                                tableData={tableData}
                            />
                        </CardBody>
                        <CardFooter className={classes.center}>
                            <Button
                                color="primary"
                                onClick={this._saveTimeSheet}
                            >
                                Save
                            </Button>
                        </CardFooter>
                        <SnackBar
                            place="bl"
                            color="danger"
                            icon={WarningIcon}
                            message="Unable to save form, inputs must be between 0-1."
                            open={this.state.showError}
                            closeNotification={() =>
                                this.setState({ showError: false })
                            }
                            close
                        />
                        <SnackBar
                            place="bl"
                            color="info"
                            icon={AddAlert}
                            message="Timesheet has been saved but not submitted"
                            open={this.state.showSaveConfirmation}
                            closeNotification={() =>
                                this.setState({ showSaveConfirmation: false })
                            }
                            close
                        />
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
    private _verifyNumberInput = (value: number) => {
        if (value >= 0 && value <= 1) {
            return true;
        } else {
            return false;
        }
    };
    private _validateInput = (value: number, stateKey: string) => {
        const stateErrorKey = (stateKey + 'Error') as keyof TimeSheetInputState;
        if (this._verifyNumberInput(value)) {
            const s = {
                [stateErrorKey]: false,
            };
            this.setState(s);
        } else {
            const s = {
                [stateErrorKey]: true,
            };
            this.setState(s);
        }
        const ss = {
            [stateKey]: value,
        };
        this.setState(ss);
    };
    private _saveTimeSheet = async () => {
        if (
            this.state.MondayInputError ||
            this.state.TuesdayInputError ||
            this.state.WednesdayInputError ||
            this.state.ThursdayInputError ||
            this.state.FridayInputError ||
            this.state.SaturdayInputError ||
            this.state.SundayInputError
        ) {
            this.setState({
                showError: true,
            });
        } else {
            const timeSheetService = new TimeSheetService();
            await timeSheetService.saveTimeSheet({
                monday: this.state.MondayInput as number,
                tuesday: this.state.TuesdayInput as number,
                wednesday: this.state.WednesdayInput as number,
                thursday: this.state.ThursdayInput as number,
                friday: this.state.FridayInput as number,
                saturday: this.state.SaturdayInput as number,
                sunday: this.state.SundayInput as number,
                approved: false,
                dateStarting: new Date(),
            });
            this.setState({
                showError: false,
                showSaveConfirmation: true,
            });
        }
    };

    private _getWeeks = async () => {
        const timeSheetService = new TimeSheetService();
        const weeks: IWeek[] = await timeSheetService.getWeeks();
        this.setState({ weeks });
    };
}

export default withStyles(styles)(TimeSheetInput);
