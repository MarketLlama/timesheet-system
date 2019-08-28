// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import React, { createRef } from 'react';

import { ReferenceObject } from 'popper.js';

// @material-ui/core components
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
// core components
import { Button } from '../customButtons';

import { customDropdownStyle } from '../../assets/jss';

export interface CustomDropdownProps
    extends WithStyles<typeof customDropdownStyle> {
    hoverColor?: ColorType;
    buttonText?: JSX.Element | string;
    buttonIcon?: any;
    dropdownList: any[];
    buttonProps?: any;
    dropup?: boolean;
    dropdownHeader?: JSX.Element | string;
    caret?: boolean;
    dropPlacement?: DropPlacementType;
    noLiPadding?: boolean;
    innerDropDown?: boolean;
    navDropdown?: boolean;
    onClick?: Function;
}

export interface CustomDropdownState {
    isOpen: boolean;
}

class CustomDropdown extends React.Component<
    CustomDropdownProps,
    CustomDropdownState
> {
    private _anchorEl!: ReferenceObject;
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }
    public render() {
        const { isOpen } = this.state;
        const {
            classes,
            buttonText,
            buttonIcon,
            dropdownList,
            buttonProps,
            dropup,
            dropdownHeader,
            caret,
            hoverColor,
            dropPlacement,
            noLiPadding,
            innerDropDown,
            navDropdown,
        } = this.props;
        const caretClasses = classNames({
            [classes.caret]: true,
            [classes.caretDropup]: dropup && !isOpen,
            [classes.caretActive]: isOpen && !dropup,
            [classes.caretRTL]: false,
        });
        const dropdownItem = classNames({
            [classes.dropdownItem]: true,
            [classes[hoverColor + 'Hover']]: true,
            [classes.noLiPadding]: noLiPadding,
            [classes.dropdownItemRTL]: false,
        });
        const dropDownMenu = (
            <MenuList role="menu" className={classes.menuList}>
                {dropdownHeader !== undefined ? (
                    <MenuItem
                        onClick={() => this._handleCloseMenu(dropdownHeader)}
                        className={classes.dropdownHeader}
                    >
                        {dropdownHeader}
                    </MenuItem>
                ) : null}
                {dropdownList.map((prop, key) => {
                    if (prop.divider) {
                        return (
                            <Divider
                                key={key}
                                onClick={() => this._handleCloseMenu('divider')}
                                className={classes.dropdownDividerItem}
                            />
                        );
                    } else if (prop.ref === 'multi') {
                        return (
                            <MenuItem
                                key={key}
                                className={dropdownItem}
                                style={{ overflow: 'visible', padding: 0 }}
                            >
                                {prop}
                            </MenuItem>
                        );
                    }
                    return (
                        <MenuItem
                            key={key}
                            onClick={() => this._handleCloseMenu(prop)}
                            className={dropdownItem}
                        >
                            {prop}
                        </MenuItem>
                    );
                })}
            </MenuList>
        );
        return (
            <div
                className={
                    innerDropDown ? classes.innerManager : classes.manager
                }
            >
                <div className={buttonText !== undefined ? '' : classes.target}>
                    <Button
                        aria-label="Notifications"
                        aria-owns={isOpen ? 'menu-list' : null}
                        aria-haspopup="true"
                        buttonRef={node => {
                            this._anchorEl = node;
                        }}
                        {...buttonProps}
                        onClick={this._handleClick}
                    >
                        {buttonIcon !== undefined ? (
                            <this.props.buttonIcon
                                className={classes.buttonIcon}
                            />
                        ) : null}
                        {buttonText !== undefined ? buttonText : null}
                        {caret ? <b className={caretClasses} /> : null}
                    </Button>
                </div>
                <Popper
                    open={isOpen}
                    anchorEl={this._anchorEl}
                    transition
                    disablePortal
                    placement={dropPlacement}
                    className={classNames({
                        [classes.popperClose]: !isOpen,
                        [classes.pooperResponsive]: true,
                        [classes.pooperNav]: isOpen && navDropdown,
                    })}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            in={isOpen}
                            style={
                                dropup
                                    ? { transformOrigin: '0 100% 0' }
                                    : { transformOrigin: '0 0 0' }
                            }
                        >
                            <Paper className={classes.dropdown}>
                                {innerDropDown ? (
                                    dropDownMenu
                                ) : (
                                    <ClickAwayListener
                                        onClickAway={this._handleClose}
                                    >
                                        {dropDownMenu}
                                    </ClickAwayListener>
                                )}
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    }

    private _handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    private _handleClose = event => {
        this.setState({ isOpen: false });
    };
    private _handleCloseMenu(param) {
        this.setState({ isOpen: false });
        if (this.props && this.props.onClick) {
            this.props.onClick(param);
        }
    }
}
(CustomDropdown as React.ComponentClass<CustomDropdownProps>).propTypes = {
    classes: PropTypes.object.isRequired,
    hoverColor: PropTypes.oneOf([
        'dark',
        'primary',
        'info',
        'success',
        'warning',
        'danger',
        'rose',
    ]),
    buttonText: PropTypes.node,
    buttonIcon: PropTypes.func,
    dropdownList: PropTypes.array,
    buttonProps: PropTypes.object,
    dropup: PropTypes.bool,
    dropdownHeader: PropTypes.node,
    caret: PropTypes.bool,
    dropPlacement: PropTypes.oneOf([
        'bottom',
        'top',
        'right',
        'left',
        'bottom-start',
        'bottom-end',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'left-start',
        'left-end',
    ]),
    noLiPadding: PropTypes.bool,
    innerDropDown: PropTypes.bool,
    navDropdown: PropTypes.bool,
    // This is a function that returns the clicked menu item
    onClick: PropTypes.func,
} as any;

export default withStyles(customDropdownStyle)(CustomDropdown);
