import React from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSong';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { song } = this.props.data
        if (!song) return <div> <i className="material-icons">loop</i></div>
        return (
            <div>
                <Link to='/'> back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id} />
            </div>
        )
    }
}



export default graphql(query, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);