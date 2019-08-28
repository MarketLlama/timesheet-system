import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { tableStyle } from "../../assets/jss";

export interface CustomTableProps extends WithStyles<typeof tableStyle> {
    tableHeaderColor: ColorType;
    tableHead: string[];
    tableData: any[];
    hover: boolean;
    coloredColumns: number[];
    colorsColumns: ColorType[];
    customCellClasses: string[];
    customClassesForCells: number[];
    customHeadCellClasses: string[];
    customHeadClassesForCells: number[];
    striped: boolean;
    tableShopping: boolean;
}

class CustomTable extends React.Component<CustomTableProps> {
    public static defaultProps: Partial<CustomTableProps> = {
        tableHeaderColor: "gray",
        hover: false,
        coloredColumns: [],
        colorsColumns: [],
        striped: false,
        customCellClasses: [],
        customClassesForCells: [],
        customHeadCellClasses: [],
        customHeadClassesForCells: [],
    };
    constructor(props: CustomTableProps) {
        super(props);
    }
    public render() {
        const {
            classes,
            tableHead,
            tableData,
            hover,
            colorsColumns,
            tableHeaderColor,
            coloredColumns,
            customCellClasses,
            customClassesForCells,
            striped,
            tableShopping,
            customHeadCellClasses,
            customHeadClassesForCells,
        } = this.props;
        return (
            <div className={classes.tableResponsive}>
                <Table className={classes.table}>
                    {tableHead !== undefined ? (
                        <TableHead className={classes[tableHeaderColor]}>
                            <TableRow className={classes.tableRow}>
                                {tableHead.map((prop, key) => {
                                    const tableCellClasses =
                                        classes.tableHeadCell +
                                        " " +
                                        classes.tableCell +
                                        " " +
                                        cx({
                                            [customHeadCellClasses[
                                                customHeadClassesForCells.indexOf(key)
                                            ]]: customHeadClassesForCells.indexOf(key) !== -1,
                                            [classes.tableShoppingHead]: tableShopping,
                                            [classes.tableHeadFontSize]: !tableShopping,
                                        });
                                    return (
                                        <TableCell className={tableCellClasses} key={key}>
                                            {prop}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                    ) : null}
                    <TableBody>
                        {tableData.map((prop, key) => {
                            let rowColor: string = "";
                            let rowColored = false;
                            if (prop.color !== undefined) {
                                rowColor = prop.color;
                                rowColored = true;
                                prop = prop.data;
                            }
                            // Converts the string to a key of the class jss
                            const rowColorClassName = (rowColor + "Row") as keyof typeof classes;

                            const tableRowClasses = cx({
                                [classes.tableRowHover]: hover,
                                [classes[rowColorClassName]]: rowColored,
                                [classes.tableStripedRow]: striped && key % 2 === 0,
                            });
                            if (prop.total) {
                                return (
                                    <TableRow key={key} hover={hover} className={tableRowClasses}>
                                        <TableCell
                                            className={classes.tableCell}
                                            colSpan={prop.colspan}
                                        />
                                        <TableCell
                                            className={classes.tableCell + " " + classes.tableCellTotal}
                                        >
                                            Total
                                        </TableCell>
                                        <TableCell
                                            className={
                                                classes.tableCell + " " + classes.tableCellAmount
                                            }
                                        >
                                            {prop.amount}
                                        </TableCell>
                                        {tableHead.length - (prop.colspan - 0 + 2) > 0 ? (
                                            <TableCell
                                                className={classes.tableCell}
                                                colSpan={tableHead.length - (prop.colspan - 0 + 2)}
                                            />
                                        ) : null}
                                    </TableRow>
                                );
                            }
                            if (prop.purchase) {
                                return (
                                    <TableRow key={key} hover={hover} className={tableRowClasses}>
                                        <TableCell
                                            className={classes.tableCell}
                                            colSpan={prop.colspan}
                                        />
                                        <TableCell
                                            className={classes.tableCell + " " + classes.right}
                                            colSpan={prop.col.colspan}
                                        >
                                            {prop.col.text}
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                            return (
                                <TableRow
                                    key={key}
                                    hover={hover}
                                    className={classes.tableRow + " " + tableRowClasses}
                                >
                                    {prop.map((prop: any, key: number) => {
                                        const tableCellClasses =
                                            classes.tableCell +
                                            " " +
                                            cx({
                                                [classes[colorsColumns[coloredColumns.indexOf(key)]]]:
                                                    coloredColumns.indexOf(key) !== -1,
                                                [customCellClasses[customClassesForCells.indexOf(key)]]:
                                                    customClassesForCells.indexOf(key) !== -1,
                                            });
                                        return (
                                            <TableCell className={tableCellClasses} key={key}>
                                                {prop}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

(CustomTable as React.ComponentClass<CustomTableProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray",
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
    tableData: PropTypes.array,
    hover: PropTypes.bool,
    coloredColumns: PropTypes.arrayOf(PropTypes.number),
    // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
    colorsColumns: PropTypes.array,
    customCellClasses: PropTypes.arrayOf(PropTypes.string),
    customClassesForCells: PropTypes.arrayOf(PropTypes.number),
    customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
    customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
    striped: PropTypes.bool,
    // this will cause some changes
    tableShopping: PropTypes.bool,
} as any;

export default withStyles(tableStyle)(CustomTable);
