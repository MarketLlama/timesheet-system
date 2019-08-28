// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import PropTypes from "prop-types";
import React, {createRef} from "react";

let ps: { destroy: () => void; };

export interface SidebarWrapperProps {
    className: string;
    user?: JSX.Element;
    headerLinks?: JSX.Element;
    links?: JSX.Element;
}

class SidebarWrapper extends React.Component<SidebarWrapperProps> {
    private _sidebarWrapper = createRef<HTMLDivElement>();
    constructor(props: SidebarWrapperProps) {
        super(props);
    }
    public componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1 && this._sidebarWrapper.current != null) {
            ps = new PerfectScrollbar(this._sidebarWrapper.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
    }
    public componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }
    public render() {
        const { className, user, headerLinks, links } = this.props;
        return (
            <div className={className} ref={this._sidebarWrapper}>
                {user}
                {headerLinks}
                {links}
            </div>
        );
    }
}

export default SidebarWrapper;
