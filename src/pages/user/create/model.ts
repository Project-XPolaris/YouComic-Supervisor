

export interface CreateUserModelStateType {
}

export interface CreateUserModelType {
    namespace: string,
    reducers: {}
    state: CreateUserModelStateType
    effects: {}
    subscriptions: {}
}

const CreateUserModel: CreateUserModelType = {
    namespace: 'createUser',
    state: {},
    subscriptions: {},
    effects: {},
    reducers: {},

};
export default CreateUserModel;
