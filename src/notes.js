import React from 'react';
import './notes.scss';
import { connect } from 'react-redux';
import { } from './actions';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPlusCircle, faMinusCircle, faTrashAlt, faExchangeAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fab, faPlusCircle, faMinusCircle, faTrashAlt, faExchangeAlt, faFileAlt)
const mapStateToProps = state => {
  return {
    // userName: state.userName,
    // groupMessage: state.groupMessage
  };
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
  render() {
    return (
      <main className="notes-window">
        <div className="tags-controller">
          <div className="tags-toolbar">
            <button name="newTag" type="button" className="button" title="new tag"> <FontAwesomeIcon icon="plus-circle" /></button>
            <button name="deleteTag" type="button" className="button" title="delete tag"> <FontAwesomeIcon icon="minus-circle" /></button>
          </div>
          <div className="tags-controller__tag">Test tag</div>
        </div>
        <div className="notes-controller">
          <div className="notes-toolbar">
            <button name="newTag" type="button" className="button" title="new note"> <FontAwesomeIcon icon="file-alt" /></button>
            <button name="newTag" type="button" className="button" title="delete note"> <FontAwesomeIcon icon="trash-alt" /></button>
            <button name="newTag" type="button" className="button" title="rename note"> <FontAwesomeIcon icon="exchange-alt" /></button>
          </div>
          <div className="notes-list">
            <div className="note-node" tabIndex="-1">This is test note</div>
            <div className="note-node" tabIndex="-1">This is test note</div>
            <div className="note-node" tabIndex="-1"> This is test note</div>
            <div className="note-node" tabIndex="-1">This is test note</div>
          </div>
        </div>
        <form className="notes-editing">
          <textarea class="textarea" value={this.state.value} onChange ={this.handleChange} ></textarea>
        </form>
      </main>
    );
  }
}
export default connect(mapStateToProps)(Notes);
