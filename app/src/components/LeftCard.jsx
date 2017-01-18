import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as mapDirectionsActions from '../reducers/mapDirections';
import * as mapLocationActions from '../reducers/mapLocation';
import * as domActions from '../reducers/dom'

@connect(state => {
    return {mapLocation: state.mapLocation, dom: state.dom}
})
export class Locate extends Component {
    constructor(props) {
        super(props)
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.mapSearchLocation = this.mapSearchLocation.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
    }

    updateSearchValue(e) {
        let {dispatch} = this.props
        dispatch(domActions.changeActiveElementIfNeeded(e));
        dispatch(mapLocationActions.changeSearchTxt(e.target.value));
        dispatch(mapLocationActions.fetchAutocompleteIfNeeded())
    }

    toggleActive(e) {
        let {dispatch} = this.props
        dispatch(domActions.changeActiveElementIfNeeded(e));
    }

    mapSearchLocation() {
        let {dispatch} = this.props
        dispatch(mapLocationActions.fetchTextSearchIfNeeded())
    }

    render() {
        let {mapLocation, dom} = this.props

        return (
            <nav className="panel">
                <div className="panel-block">
                    <p className="control">
                        <input ref="locate_input" value={mapLocation.searchTxt} className="input" type="text" placeholder="Location" onBlur={e => this.toggleActive(e)} onChange={e => this.updateSearchValue(e)}/>
                    </p>
                </div>
                <Autocomplete refs={_.map(this.refs)}/>
                <div className="panel-block">
                    <button onMouseDown={this.mapSearchLocation} className={`button is-primary is-outlined is-fullwidth` + (mapLocation.isFetching && ' is-loading' || '')}>
                        Search
                    </button>
                </div>
            </nav>
        )
    }
}

@connect(state => {
    return {mapLocation: state.mapLocation, dom: state.dom}
})
export class Autocomplete extends Component {
    constructor(props) {
        super(props)
        this.selectPrediction = this.selectPrediction.bind(this);
    }

    selectPrediction(i) {
        let {dispatch, mapLocation} = this.props
        let {place_id, description} = mapLocation.autocomplete[i]
        dispatch(mapLocationActions.changeSearchTxt(description));
        dispatch(mapLocationActions.fetchPlaceDetailIfNeeded(place_id)).then(resp => {
            dispatch(mapLocationActions.changePlaceId(place_id))
        })
    }

    render() {
        let {mapLocation, refs, dom} = this.props
        let showAutocomplete = _.includes(refs, dom.activeElement)
        const autocomplete = _.map(mapLocation.autocomplete, (prediction, i) => (
            <a key={`${i}`} className="panel-block" onMouseDown={(e) => this.selectPrediction(i)}>
                {prediction.description}
            </a>
        ))
        return (
            <div>
                {showAutocomplete && !_.isEmpty(mapLocation.searchTxt) && !_.isEmpty(mapLocation.autocomplete) && autocomplete}
            </div>
        )
    }
}