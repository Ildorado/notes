import React from 'react';
import './notes.scss';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlusCircle, faMinusCircle, faTrashAlt, faExchangeAlt, faFileAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TagsInput from 'react-tagsinput'
import { newNote, noteTextChange, deleteNote, changeTags } from './actions';
import Highlighter from "react-highlight-words";
library.add(fab, faPlusCircle, faMinusCircle, faTrashAlt, faExchangeAlt, faFileAlt, faTimesCircle)
//  { notes:[ {id note,tags},{id note,tags},{id note,tags} ] }
const mapStateToProps = state => {
  if (state.notes === false) {
    return { notes: [] };
  }
  return {
    notes: state.notes
  };
}
class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
    }
  }
  handleChange = event => {
    let result = event.target.value;
    if (result.match(/#\S+\s/g) !== null) {
      let newTags = result.match(/#\S+\s/g);
      newTags.forEach(newTag => {
        let newTagTrimmed = newTag.trim().slice(1);
        if (this.props.tags.includes(newTagTrimmed) === false) {
          this.props.dispatch(changeTags(this.props.index, this.props.tags.concat(newTagTrimmed)));
        }
        result = result.replace('#', '');
      })
    }
    this.props.dispatch(noteTextChange(this.props.index, result));
  }
  handleTagsChange = (tags) => {
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
  onFocusOn() {
    this.setState({
      focus: true,
    })
  }
  onFocusOff() {
    this.setState({
      focus: false
    })
  }

  render() {
    if (this.ifInSearch()) {
      return (
        <div className="note-node" onMouseLeave={this.onFocusOff.bind(this)} onClick={this.onFocusOn.bind(this)}>
          {this.state.focus ? (<textarea className="note-node__textarea" value={this.props.note} onChange={this.handleChange} >
          </textarea>) : (<Highlighter
          className ="HighLight"
            highlightClassName="YourHighlightClass"
            searchWords={this.props.tags}
            autoEscape={true}
            textToHighlight={this.props.note}
          />)}
          {/* <textarea className="note-node__textarea" value={this.props.note} onChange={this.handleChange} >
          </textarea> */}
          <TagsInput className="tags-filter" value={this.props.tags} inputProps={{
            className: 'react-tagsinput-input',
            placeholder: ''
          }} onChange={this.handleTagsChange.bind(this)}></TagsInput>
          <button className="note-note__delete" onClick={this.handleDelete}><FontAwesomeIcon icon="times-circle" /></button>
        </div>
      );
    } else { return null }
  }
}
class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tags: [] }
  };
  handleChange = event => {
    this.setState({
      value: event.target.value
    })
  }
  newNoteSend = () => {
    this.props.dispatch(newNote());
  }
  handleTagsChange(tags) {
    this.setState({ tags })
  }
  render() {
    return (
      <main className="notes-window">
        <TagsInput className="tags-filter" value={this.state.tags} inputProps={{
          className: 'react-tagsinput-input search-tags',
          placeholder: 'search tags...'
        }} onChange={this.handleTagsChange.bind(this)}></TagsInput>
        <div className="notes-toolbar">
          <button name="newTag" type="button" className="button" title="new note" onClick={this.newNoteSend}> <FontAwesomeIcon icon="file-alt" /></button>
        </div>
        <ul className="notes-container">
          {
            this.props.notes.notes.map((data, index) => (
              <Note key={data.id} index={index} note={data.note} tags={data.tags} searchTags={this.state.tags} dispatch={this.props.dispatch}></Note>
            ))
          }
        </ul>
      </main>
    );
  }
}
export default connect(mapStateToProps)(Notes);
