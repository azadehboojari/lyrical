import React, { Component } from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import '../style/style.css';


class LyricList extends Component {

    onDelete(id) {
        console.log(this.props)
        this.props.deleteLyrics({
            variables: { id }
        }).then(window.location.reload())
    }

    onLike(id, likes) {
        this.props.addLikes({
            variables: { id },
            optimisticResponse: {
                __typename: "Mutation",
                likeLyric: {
                    id: id,
                    __typename: "LyricType",
                    likes: likes + 1
                }
            }
        })
    }


    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    <i className="material-icons" onClick={() => this.onDelete(id)} >delete</i>
                    {content}
                    <div className="vote-box">
                        {likes}
                        <i className="material-icons"
                            onClick={() => this.onLike(id, likes)}
                        > thumb_up </i>

                    </div>

                </li>
            )
        })
    }
    render() {
        if (!this.props.lyrics) return <div> Loading... </div>
        return (
            <div>
                <ul className="collection">
                    {this.renderLyrics()}
                </ul>

            </div>
        )
    }
}
const add = gql`
    mutation LikeThe($id: ID){
        likeLyric(id: $id){
        id
        likes
        }
    }
`;
const deleteL = gql`
    mutation delete($id: ID){
        deleteLyric(id: $id){
        id
        }
    }
`;
export default compose(
    graphql(add, { name: "addLikes" }),
    graphql(deleteL, { name: "deleteLyrics" })
)(LyricList);