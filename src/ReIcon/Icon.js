import React, {Component} from "react";
import PropTypes from "prop-types";

class ReIcon extends Component{
    render() {
        const {variant, size, children} = this.props;
        const type = (variant === "material-icons" || undefined || null) ? "material-icons": `material-icons-${variant}`;
        return(
            <>
                <span {...this.props} className={type}>{children}</span>
            </>
        )
    }
}


ReIcon.propTypes = {
    children: PropTypes.string,
    variant: PropTypes.oneOf(['material-icons', 'outlined', 'round']),
    size: PropTypes.number,
};

ReIcon.defaultProps = {
    children: "not_interested",
    variant: "material-icons"
};
export default ReIcon;