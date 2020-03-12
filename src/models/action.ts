import {Effect, Subscription} from 'dva';
import {Reducer} from 'redux';

export interface ActionModelStateType {
}

export interface ActionModelType {
    namespace: string,
    reducers: {}
    state: ActionModelStateType
    effects: {}
    subscriptions: {}
}

const ActionModel: ActionModelType = {
    namespace: 'action',
    state: {},
    subscriptions: {},
    effects: {},
    reducers: {},

};
export default ActionModel;
