import { 
  SAVE_TO_DRIVE,
  FETCH_DRIVE_FOLDERS,
  DRIVE_FOLDERS_FETCHED,
  SET_GOOGLE_TOKEN,
  SET_FILE_NAME,
  SET_FILE_FOLDER
} from '../actions/drive';

const initialDrive = {
  googleToken: null,
  googleAuthUrl: window.__INITIAL_STATE__.googleAuthUrl,
  folders: null,
  folderId: null,
  fileName: ''
};

export default (state = initialDrive, action) => {
  switch (action.type) {
    case DRIVE_FOLDERS_FETCHED:
      return Object.assign({}, state, { folders: action.folders });

    case SET_GOOGLE_TOKEN:
      return Object.assign({}, state, { googleToken: action.googleToken });

    case SET_FILE_NAME:
      return Object.assign({}, state, { fileName: action.fileName });

    case SET_FILE_FOLDER:
      return Object.assign({}, state, { folderId: (action.folderId === state.folderId) ? null : action.folderId });
      
    default:
      return state;
  }
};