import {Reducer} from 'redux';

export interface ImageEditorModelStateType {
  imageURL?:string
}

export interface ImageEditorModelType {
    namespace: string,
    reducers: {
      setEditorImageURL:Reducer
    }
    state: ImageEditorModelStateType
    effects: {}
    subscriptions: {}

}

const ImageEditorModel: ImageEditorModelType = {
    namespace: 'editor',
    state: {
      imageURL:"http://192.168.123.121:8080/assets/books/6939/page_0.png?t=1580111117"
    },
    subscriptions: {},
    effects: {},
    reducers: {
      setEditorImageURL(state,{payload:{url}}){
        return{
          ...state,
          imageURL:url
        }
      }
    },

};
export default ImageEditorModel;
