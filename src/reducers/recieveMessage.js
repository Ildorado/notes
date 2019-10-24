
const messageReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADDMESSAGE':
      return state.concat(action.payload)
    case 'ADDFIRSTMESSAGE': {
      if (action.payload.length > 100) {
        return action.payload.reverse().slice(0, 100);
      }
      else {
         return action.payload.reverse()
         }
    }
    default:
      return state
  }
}
export default messageReducer; 
