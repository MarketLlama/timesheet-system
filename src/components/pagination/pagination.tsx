import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

// @material-ui/core components
import Button from "@material-ui/core/Button";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { paginationStyle } from "../../assets/jss";

type PageTextType = "PREV" | "NEXT" | "..." | number;

interface IPage {
    active: boolean;
    disabled: boolean;
    text: PageTextType;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface PaginationProps extends WithStyles<typeof paginationStyle> {
    pages: IPage[];
    color: ColorType;
}

class Pagination extends React.Component<PaginationProps> {
    public render() {
        const { classes, pages, color } = this.props;
        return (
            <ul className={classes.pagination}>
                {pages.map((prop, key) => {
                    const paginationLink = cx({
                        [classes.paginationLink]: true,
                        [classes[color]]: prop.active,
                        [classes.disabled]: prop.disabled,
                    });
                    return (
                        <li className={classes.paginationItem} key={key}>
                            {prop.onClick !== undefined ? (
                                <Button onClick={prop.onClick} className={paginationLink}>
                                    {prop.text}
                                </Button>
                            ) : (
                                    <Button
                                        onClick={() => console.log("you've clicked " + prop.text)}
                                        className={paginationLink}
                                    >
                                        {prop.text}
                                    </Button>
                                )}
                        </li>
                    );
                })}
            </ul>
        );
    }
}

(Pagination as React.ComponentClass<PaginationProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        text: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.oneOf(["PREV", "NEXT", "..."]),
        ]).isRequired,
        onClick: PropTypes.func,
      }),
    ).isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
} as any;

export default withStyles(paginationStyle)(Pagination);
