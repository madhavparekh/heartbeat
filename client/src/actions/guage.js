import request from "superagent";

import { GuageTypes as types } from "../action-types";

const fetchGuageObjects = guages => {
    console.log(guages)
    return {
        type: types.FETCH_GUAGE_OBJECTS,
        guages,
    };
};

export function fetchGuages() {
    return async dispatch => {
        try {
            const guagesFromAPI = await request.get(
                "http://localhost:3001/api/gauges"
            );
            console.log(guagesFromAPI.body);
            // pretent this is an api call...
            dispatch(fetchGuageObjects(guagesFromAPI.body));
        } catch (e) {
            throw e;
        }
    };
}