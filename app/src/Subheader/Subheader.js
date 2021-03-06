import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    subheading: {
        paddingLeft: theme.spacing.unit,
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.typography.caption.color,
        marginTop: theme.spacing.unit - 1,
    },
});


class Subheader extends Component {
    render() {
        const { 
            classes,
            id,
            title,
            icon,
            listStyle,
        } = this.props;
        return (
            <ListItem className={listStyle}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <Typography className={classes.subheading} id={id}>
                    {title}
                </Typography>
            </ListItem>
        );
    }
}


Subheader.propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object.isRequired,
    /**
     * @ignore
     */
    theme: PropTypes.object.isRequired,
    /**
     * Just a sensible id 
     */
    id: PropTypes.string.isRequired,
    /**
     * The actual text of the subheader 
     */
    title: PropTypes.string.isRequired,
    /**
     * An icon component (e.g. <SearchIcon />)
     */
    icon: PropTypes.node.isRequired,
    /**
     * styling applied to the list item e.g. padding: 0
     */
    listStyle: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(Subheader);