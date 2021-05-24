import produce from 'immer';
import { ADD_NEW_ROW } from '../actions';

const initialState = {
    userDetailsArray: [{
        IDNumber: "203483924",
        employeeName: "יואב שרון",
        exceptionalHours: 1,
        hours: 1,
        manualHours: 10,
        totalHours: 100,
    },
    {
        IDNumber: "203483924",
        employeeName: "יואב שרון",
        exceptionalHours: 2,
        hours: 2,
        manualHours: 20,
        totalHours: 200,
    },
    {
        IDNumber: "203483924",
        employeeName: "יואב שרון",
        exceptionalHours: 3,
        hours: 3,
        manualHours: 30,
        totalHours: 300,
    },
    {
        IDNumber: "203483924",
        employeeName: "יואב שרון",
        exceptionalHours: 4,
        hours: 4,
        manualHours: 40,
        totalHours: 400,
    },],
};

export default produce((state , action) => {
    switch(action.type) {
        case ADD_NEW_ROW: 
            state.userDetailsArray.push(action.payload);
            break;
    }
} , initialState);