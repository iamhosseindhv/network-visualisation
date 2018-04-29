import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const defaultSetting = {
    renderLabel: true,
    staticGraph: false,
}

const constants = {
    GRAPH: 0,
    NODE: 1,
    LINK: 2,
}


class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            graph: {
                staticGraph: defaultSetting.staticGraph,
            },
            node: {
                renderLabel: defaultSetting.renderLabel,
            },
            link: {},
        }
    }

    componentWillMount = () => { this.formDidChange() }

    formDidChange = () => { this.props.onChange(this.state); }

    handleChange = (position, name) => event => {
        switch (position) {
            case constants.GRAPH:
                var graph = { ...this.state.graph }
                graph[name] = event.target.checked;
                this.setState({ graph }, () => this.formDidChange());
                break;
            case constants.NODE:
                var node = { ...this.state.node }
                node[name] = event.target.checked;
                this.setState({ node }, () => this.formDidChange());
                break;
            case constants.LINK:
                var link = { ...this.state.link }
                link[name] = event.target.checked;
                this.setState({ link }, () => this.formDidChange());
                break;
            default:
                break;
        }
    };

    /*
    // TODO: modify the function below and replace
    // code in handleChang to avoide code duplication
    updateState = (source, name, event) => {
        var dest = { ...this.state[source] }
        // console.log(dest);
        dest[name] = event.target.checked;
        // console.log(dest);
        console.log(this.state);
        this.setState({ source: dest }, () => {
            console.log(this.state);
            this.formDidChange()
        });
    }*/

    render() {
        const {
            children,
            classes,
            theme,
        } = this.props;

        return (
            <div>
                <ListItem>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Configurations" />
                </ListItem>
                <Divider />
                <ListItem >
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked={defaultSetting.renderLabel}
                                    checked={this.state.node.renderLabel}
                                    onChange={this.handleChange(constants.NODE, 'renderLabel')}
                                    value="renderLabel"
                                />
                            }
                            label="Render Labels"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked={defaultSetting.staticGraph}
                                    checked={this.state.graph.staticGraph}
                                    onChange={this.handleChange(constants.GRAPH, 'staticGraph')}
                                    value="staticGraph"
                                />
                            }
                            label="Static Graph"
                        />
                    </FormGroup>
                </ListItem>
            </div>
        )
    }
}

Form.propTypes = {
    /**
     * The contents of the drawer.
     */
    children: PropTypes.node,
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object.isRequired,
    /**
     * @ignore
     */
    theme: PropTypes.object.isRequired,
    /**
     * @param {object} event The event source of the callback
     */
    onChange: PropTypes.func,
};

export default withStyles({ withTheme: true })(Form);