import request from "superagent";

import { GuageTypes as types } from "../action-types";

const fetchGuageObjects = guages => {
    return {
        type: types.FETCH_GUAGE_OBJECTS,
        guages,
    };
};

export function fetchGuages(river) {
    return async dispatch => {
        try {
            const guagesFromAPI = await request.get(
                "https://ron-swanson-quotes.herokuapp.com/v2/quotes/" + river 
            );
            // pretent this is an api call...
            dispatch(fetchGuageObjects(guagesFromAPI.body));
        } catch (e) {
            throw e;
        }
    };
}