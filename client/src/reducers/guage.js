import { GuageTypes as types } from "../action-types";
import objectAssign from "object-assign";

type STATE = {};
type ACTION = {};
const initialState: STATE = {
    guages: [],
};

export default function (state: STATE = initialState, action: ACTION) {
    switch (action.type) {
        case types.FETCH_GUAGE_OBJECTS:
            return objectAssign({}, state, { guages: action.guages });

        default:
            return state;
    }
}
