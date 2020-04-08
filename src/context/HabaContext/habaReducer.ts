import { STK_PUSH, SHOW_ERROR, START_LOADING, STOP_LOADING, SHOW_MESSAGE, RESET_STATE } from './types';

export default (state: any, { type, payload }: any): any => {
  switch (type) {
    case STK_PUSH:
      return {
        ...state,
        loading: true,
      };

    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SHOW_MESSAGE:
      return {
        ...state,
        toastMsg: payload,
      };
    case SHOW_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    // We reset state so that the toasts don't appear multiple times
    case RESET_STATE: {
      return {
        ...state,
        loading: false,
        error: null,
        toastMsg: null,
      };
    }
    default:
      return state;
  }
};
