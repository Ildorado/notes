import React from 'react';
import './notes.scss';

import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlusCircle, faMinusCircle, faTrashAlt, faExchangeAlt, faFileAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { newNote, noteTextChange, deleteNote } from './actions';
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
  handleChange = event => {
    console.log('this.props in handleChange:', this.props);
    this.props.dispatch(noteTextChange(this.props.index, event.target.value));
  }
  handleDelete = event => {
    this.props.dispatch(deleteNote(this.props.index));
  }
  render() {
    console.log('this.props:', this.props)
    return (
      <div className="note-node">
        <textarea className="note-node__textarea" value={this.props.note} onChange={this.handleChange} ></textarea>
        <input className="note-node__tags" type="text" placeholder="tags are here..."></input>
        <button className="note-note__delete" onClick={this.handleDelete}><FontAwesomeIcon icon="times-circle" /></button>
      </div>
    );
  }
}
class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    }
  };
  handleChange = event => {
    this.setState({
      value: event.target.value
    })
  }
  newTag = () => {
    this.props.dispatch(newNote());
  }
  render() {
    console.log(this.props);
    return (
      <main className="notes-window">
        <input type="text" className="tags-filter" placeholder="tags filter ..."></input>
        <div className="notes-toolbar">
          <button name="newTag" type="button" className="button" title="new note" onClick={this.newTag}> <FontAwesomeIcon icon="file-alt" /></button>
        </div>
        <ul className="notes-container">
          {
            this.props.notes.notes.map((data, index) => (
              <Note key={data.id} index={index} note={data.note} tags={data.tags} dispatch={this.props.dispatch}></Note>
            ))
          }
        </ul>
      </main>
    );
  }
}
export default connect(mapStateToProps)(Notes);
