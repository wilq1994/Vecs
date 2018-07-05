export const SAVE_TO_DRIVE = 'SAVE_TO_DRIVE';
export const FETCH_DRIVE_FOLDERS = 'FETCH_DRIVE_FOLDERS';
export const DRIVE_FOLDERS_FETCHED = 'DRIVE_FOLDERS_FETCHED';
export const SET_GOOGLE_TOKEN = 'SET_GOOGLE_TOKEN';
export const SET_FILE_NAME = 'SET_FILE_NAME';
export const SET_FILE_FOLDER = 'SET_FILE_FOLDER';


export function saveToCloud(image){
  return function(dispatch, state){
    const { fileName, folderId, googleToken } = state.drive;
    emit({
      type: SAVE_TO_DRIVE,
      fileName,
      folderId,
      image,
      token: googleToken
    })
  }
}

export function fetchDriveFolders(){
  return function(dispatch, state){
    const { googleToken } = state.drive;
    emit({
      type: FETCH_DRIVE_FOLDERS,
      token: googleToken
    })
  }
}

export function driveFoldersFetched(folders){
  return {
    type: DRIVE_FOLDERS_FETCHED,
    folders
  }
}

export function setGoogleToken(googleToken){
  return {
    type: SET_GOOGLE_TOKEN,
    googleToken
  }
}

export function setFileName(fileName){
  return {
    type: SET_FILE_NAME,
    fileName
  }
}

export function setFileFolder(folderId){
  return {
    type: SET_FILE_FOLDER,
    folderId
  }
}