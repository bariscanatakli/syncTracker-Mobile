import { combineReducers } from 'redux';
import userReducer from './users/userReducer';

const rootReducer = combineReducers({
    user: userReducer
    // other reducers...
});

export default rootReducer;
