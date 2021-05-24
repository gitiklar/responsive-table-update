export const ADD_NEW_ROW = 'ADD_NEW_ROW';
export const NEW_COLUMNS = 'NEW_COLUMNS';

export const addNewRow = data => {
    return { type: ADD_NEW_ROW , payload: data };
}

export const newColumns = columns => {
    return { type: NEW_COLUMNS , payload: columns }; 
}