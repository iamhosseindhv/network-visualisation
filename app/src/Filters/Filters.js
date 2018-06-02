import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Subheader from '../Subheader/Subheader';
import Utils from '../utils/communications';
import styles from './Filters.styles';

const genderDatasource = ['Male', 'Female'].map((gender, i) => {
    return <MenuItem key={i} value={gender.toLowerCase()}>{gender}</MenuItem>
});

const ageDatasource = ['20-25', '25-30', '30-40', '40-50', '50-60', '60-100'].map((age, i) => {
    return <MenuItem key={i} value={age}>{age}</MenuItem>
});

class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            availableGraphs: [],
            currentGraph: '',
            disableFilters: true,
            graphData: {
                gender: '',
                location: '',
                age_range: '',
                occupation: [],
            },
        };
    };

    updateGraphData = () => {
        const selectedGraph = this.state.availableGraphs.find(graph => graph.name === this.state.currentGraph);
        const query = {
            graph_id: selectedGraph.id,
            ...this.state.graphData,
        };
        Utils.getGraphData(query)
            .then(graphData => this.props.onChangeData(graphData))
            .catch(this.handleError);
    };

    handleError = (err) => {
        // here you may present a snackBar to tell the user something has gone wrong,
        // but for now just console.log
        console.log(err);
    };

    handleChange = event => {
        const isGraphChange = event.target.name === 'currentGraph';
        var newState = Object.assign({}, this.state);
        if (isGraphChange) {
            newState.currentGraph = event.target.value;
            newState.disableFilters = false;
        } else {
            newState.graphData[event.target.name] = event.target.value;
        }
        this.setState(newState, () => {
            this.updateGraphData();
        });
    };

    componentDidMount = () => {
        Utils.getAvailableGraphs()
            .then(data => this.setState({ availableGraphs: data }))
            .catch(this.handleError);
    };

    render() {
        const { classes, open } = this.props;
        const formControlClassName = classNames(classes.formControl, open ? classes.formControlMoveLeft : classes.formControlMoveRight);
        return (
            <Fragment>
                <Subheader id="graph-search" title="Search" icon={<SearchIcon />} />
                <ListItem>
                    <form className={classes.root}>
                        <FormControl fullWidth="true" className={formControlClassName}>
                            <InputLabel htmlFor="currentGraph">Choose your graph</InputLabel>
                            <Select
                                value={this.state.currentGraph}
                                onChange={this.handleChange}
                                inputProps={{ name: "currentGraph", id: "currentGraph" }}
                            >
                                {this.state.availableGraphs.map(graph => {
                                    return <MenuItem key={graph.id} value={graph.name}>{graph.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <FormGroup row>
                            <FormControl className={classNames(formControlClassName, classes.formControlLeft)} disabled={this.state.disableFilters}>
                                <InputLabel htmlFor="gender">Gender</InputLabel>
                                <Select
                                    value={this.state.graphData.gender}
                                    onChange={this.handleChange}
                                    inputProps={{ name: "gender", id: "gender" }}
                                >
                                    {genderDatasource}
                                </Select>
                            </FormControl>
                            <FormControl className={classNames(formControlClassName, classes.formControlRight)} disabled={this.state.disableFilters}>
                                <InputLabel htmlFor="age_range">Age</InputLabel>
                                <Select
                                    value={this.state.graphData.age_range}
                                    onChange={this.handleChange}
                                    inputProps={{ name: "age_range", id: "age_range" }}
                                >
                                    {ageDatasource}
                                </Select>
                            </FormControl>
                        </FormGroup>
                    </form>
                </ListItem >
            </Fragment>
        );
    }
}

Filters.propTypes = {
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object.isRequired,
    /**
     * @ignore
     */
    theme: PropTypes.object.isRequired,
    /**
     * Whether the left drawer is open or not.
     * Needed for transition of input elements
     */
    open: PropTypes.bool.isRequired,
    /**
     * @param {object} event The event source of the callback
     */
    onChangeData: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Filters);