import { ACTION_STAR_POPULAR, ACTION_STAR_TREND } from "./action"

const defaultState = {
    popStarFlag: false,
    trendStarFlag: false,
}
export default (state = defaultState, action) => {
    console.log(state, action)
    if (action.type === ACTION_STAR_POPULAR) {
        //reducer只能接受state，不能改变state
        let newState = JSON.parse(JSON.stringify(state))
        newState.popStarFlag = true
        return newState
    }
    if (action.type === ACTION_STAR_TREND) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.trendStarFlag = true
        return newState
    }
    return state
}