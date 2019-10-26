import React from 'react';
import './notes.scss';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput'
import { newNote} from './actions';
import Note from './note'
//  { notes:[ {id note,tags},{id note,tags},{id note,tags} ] }
const mapStateToProps = state => {
  if (state.notes === false) {
    return { notes: [] };
  }
  return {
    notes: state.notes,
    
  };
}

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    }
    this.notesRef = React.createRef();

  };
  handleChange = event => {
    this.setState({
      value: event.target.value
    })
  }
  newNoteSend = () => {
    this.props.dispatch(newNote());
    this.scrollToTop();
  }
  scrollToTop = () => {
    this.notesRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  handleTagsChange(tags,changed,changedIndexes) {
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
          <button name="newTag" type="button" className="notes-toolbar__button" title="new note" onClick={this.newNoteSend}> New Tag
          </button>
        </div>
        <div className="notes-wrapper" ref={this.notesRef}>
          <ul className="notes-container">
            {
              this.props.notes.notes.map((data, index) => (
                <Note key={data.id} index={index} note={data.note}  tags={data.tags} searchTags={this.state.tags} dispatch={this.props.dispatch}></Note>
              ))
            }
          </ul>
        </div>
      </main>
    );
  }
}
export default connect(mapStateToProps)(Notes);
