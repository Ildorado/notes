import React from 'react';
import './notes.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TagsInput from 'react-tagsinput'
import Highlighter from "react-highlight-words"
import { noteTextChange, deleteNote, changeTags } from './actions';
library.add(fab, faTimesCircle)
class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
        }
    }
    handleChange = event => {
        let result = event.target.value;
        if (result.match(/#[\w\d]+\W/g) !== null) {
            let newTags = result.match(/#[\w\d]+\W/g);
            newTags.forEach(newTag => {
                let newTagTrimmed = newTag.slice(0,-1).slice(1);
                if (this.props.tags.includes(newTagTrimmed) === false) {
                    this.props.dispatch(changeTags(this.props.index, this.props.tags.concat(newTagTrimmed)));
                }
            })
        }
        this.props.dispatch(noteTextChange(this.props.index, result));
    }
    handleTagsChange = (tags, changed) => {
        changed.forEach(item => {
            if (!tags.includes(item)) {
                let newNote = this.props.note;
                let regEx = new RegExp(`#${item}`, 'gi');
                while (newNote.match(regEx) !== null) {
                    newNote = newNote.replace(regEx, `${item}`);
                }
                this.props.dispatch(noteTextChange(this.props.index, newNote));
            }
        })
        this.props.dispatch(changeTags(this.props.index, tags));

    }
    handleDelete = event => {
        this.props.dispatch(deleteNote(this.props.index));
    }
    ifInSearch() {
        if (this.props.searchTags.length === 0) {
            return true;
        }
        for (let i = 0; i < this.props.searchTags.length; i++) {
            if (!this.props.tags.includes(this.props.searchTags[i])) {
                return false;
            }
        }
        return true
    }
    onFocusOn = () => {
        this.setState({
            focus: true
        })
    }
    onFocusOff = () => {
        this.setState({
            focus: false
        })
    }
    render() {
        if (this.ifInSearch()) {
            return (
                <div className="note-node" onBlur={this.onFocusOff}>
                    {this.state.focus === true ?
                        (<textarea className="note-node__textarea" value={this.props.note} onChange={this.handleChange} >
                        </textarea>)
                        : (<Highlighter
                            onFocus={this.onFocusOn}
                            className="HighLight"
                            highlightClassName="YourHighlightClass"
                            searchWords={this.props.tags}
                            autoEscape={true}
                            textToHighlight={this.props.note}
                            tabIndex='1'
                        />)}
                    <TagsInput className="tags-filter" value={this.props.tags} inputProps={{
                        className: 'react-tagsinput-input',
                        placeholder: ''
                    }} onChange={this.handleTagsChange.bind(this)}></TagsInput>
                    <button className="note-note__delete" onClick={this.handleDelete}>
                        <FontAwesomeIcon style={{ 'fontSize': '1rem' }} icon="times-circle" />
                    </button>
                </div>
            );
        } else { return null }
    }
}
export default Note;