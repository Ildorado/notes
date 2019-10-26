import shortid from 'shortid';
import { combineReducers } from 'redux';
//  { notes:[ {id,note,tags},{id,note,tags},{id,note,tags} ] }
const notesReducer = (state = { notes: [] }, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'NEWNOTE':
            newState.notes.push({ id: shortid.generate(), note: '', tags: [] })
            return newState;
        case 'NOTETEXTCHANGE':
            newState.notes[action.index].note = action.text;
            return newState;
        case 'DELETENOTE':
            newState.notes.splice(action.index, 1);
            return newState;
        case 'CHANGETAGS':
            newState.notes[action.index].tags = action.tags;
            return newState;
        default:
            return state
    }
}
const rootReducer = combineReducers({
    notes: notesReducer,
    // messageText: setMessageReducer
})
export default rootReducer;