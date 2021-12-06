import {
    GET_CONTRACTS,
    CONTRATOS,
    GET_USERS,
    GET_USER_BY_ID,
    POST_SING_UP,
    SEND_LOGIN,
    GET_CONTRACT_BY_ID,
    PREVIEW_CONTRACT,
    REMOVE_CONTRACT,
    EDIT_USER,
    SET_FILTER_DURATIONH,
    SET_FILTER_DURATIONL,
    SET_FILTER_CATEGORY,
    SET_FILTER_STATE,
    SET_FILTER_TYPE,
    SET_AUTHOR,
    SET_NAME,
    SET_PROFILE_IMAGE

} from "../actions";

const initialState = {
    users: [],
    contracts: [],
    user: {},
    contract: {},
    contratos: [],
    preview: {},
    verified: false,
    profileImage: ""
    // profileImage: "/images/silueta.png"
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case SET_PROFILE_IMAGE:
            return {
                ...state,
                profileImage: action.payload
            }

        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }

        case GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload
            }

        case GET_CONTRACTS:
            return {
                ...state,
                contracts: action.payload
            }

        case CONTRATOS:
            return {
                ...state,
                contratos: action.payload
            }

        case GET_CONTRACT_BY_ID:
            return {
                ...state,
                contract: action.payload
            }

        case PREVIEW_CONTRACT:
            return {
                ...state,
                preview: action.payload
            }
        case REMOVE_CONTRACT:
            // ????????????????????
            let filtered = state.contracts.filter(elementContract => {
                return console.log('elementContract', elementContract)
            })

            return {
                ...state,
                contracts: filtered
            }

        case POST_SING_UP:
            return {
                ...state
            }
        case SEND_LOGIN:
            return {
                ...state,
                user: action.payload
            };

        case EDIT_USER:
            return {
                ...state,
                user: action.payload
            };

        case SET_FILTER_DURATIONH:
            return {
                ...state,
                filterDurationH: action.payload
            }

        case SET_FILTER_DURATIONL:
            return {
                ...state,
                filterDurationL: action.payload
            }

        case SET_FILTER_CATEGORY:
            return {
                ...state,
                filterCategory: action.payload
            }

        case SET_FILTER_STATE:
            return {
                ...state,
                filterState: action.payload
            }

        case SET_FILTER_TYPE:
            return {
                ...state,
                filterType: action.payload
            }

        case SET_AUTHOR:
            return {
                ...state,
                author: action.payload
            }

        case SET_NAME:
            return {
                ...state,
                name: action.payload
            }

        default: return state
    }
}
