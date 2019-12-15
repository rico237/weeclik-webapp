import { eventConstants } from '../../constants';

export function allEvent(state = {}, action) {
    switch (action.type) {
        case eventConstants.FINISH_UPLOAD:
            return {
                finish_upload_movie: true
            }
    
        default:
            return state;
    }
}