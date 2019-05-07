import store from "../store"
import {setTimeout} from "timers";

export const fetch_post = () => {
    return {type: "FETCH_USER"}
}

export const received_post = (post) => {
    return {type: "FETCHED_USER", data: post}
}

export const receive_error = () => {
    return {type: "RECEIVE_ERROR"};
};

export const thunk_action_creator = username => {
    const user = username.replace(/\s/g, "")
    store.dispatch(fetch_post());
    return function (dispatch) {
        setTimeout(() => {
            return fetch(`https://api.github.com/users/${user}`)
                .then(data => data.json())
                .then(data => {
                    console.log("data", data)
                    if (data.message === "Not found") {
                        throw new Error("No such user found!!")
                    } else 
                        dispatch(received_post(data))

                })
                .catch(err => dispatch(receive_error()))
        }, 200);
    }
}
