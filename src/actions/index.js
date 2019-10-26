
export const newNote = () => {
    return { type: 'NEWNOTE' }
}
export const noteTextChange = (index, text) => {
    return {
        type: 'NOTETEXTCHANGE',
        index: index,
        text: text,
    }
}
export const deleteNote = (index) => {
    return {
        type: 'DELETENOTE',
        index: index,
    }
}
export const changeTags = (index, tags) => {
    return {
        type: 'CHANGETAGS',
        index: index,
        tags: tags,
    }
}