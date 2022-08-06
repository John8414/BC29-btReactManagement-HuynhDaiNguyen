import { ADD_USER, DELETE_USER, EDIT_USER, UPDATE_USER } from '../types/user';

let userLocalStorage = JSON.parse(localStorage.getItem('USER'));

if (!userLocalStorage) {
    userLocalStorage = [

        {
            id: '1',
            username: 'ManHD',
            fullname: 'Huỳnh Đại Mẫn',
            email: 'haha@gmail.com',
            password: 'iiii',
            phonenumber: '0777777777',
            type: 'Client',
        },
        {
            id: '2',
            username: 'HuuHD',
            fullname: 'Huỳnh Đại Hữu',
            email: 'hehe@gmail.com',
            password: '1234545678',
            phonenumber: '0999999999',
            type: 'Client',
        },
        {
            id: '3',
            username: 'ThanhHD',
            fullname: 'Huỳnh Đại Thanh',
            email: 'hihi@gmail.com',
            password: '1234567',
            phonenumber: '0888888888',
            type: 'Admin',
        },
        {
            id: '4',
            username: 'NguyenHD',
            fullname: 'Huỳnh Đại Nguyên',
            email: 'hoho@gmail.com',
            password: '1234567',
            phonenumber: '0222222222',
            type: 'Admin',
        },
    ];
}

const DEFAULT_STATE = {
    userList: userLocalStorage,
    selectedUser: null,
};

export const userReducer = (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case ADD_USER: {
            const data = [...state.userList];

            data.push({ ...payload, id: Date.now() });

            localStorage.setItem('USER', JSON.stringify(data));

            state.userList = data;

            return { ...state };
        }

        case DELETE_USER: {
            const data = [...state.userList];

            const index = data.findIndex((ele) => ele.id === payload);

            if (index !== -1) {
                data.splice(index, 1);
            }

            localStorage.setItem('USER', JSON.stringify(data));

            state.userList = data;

            return { ...state };
        }

        case EDIT_USER: {
            state.selectedUser = payload;
            return { ...state };
        }

        case UPDATE_USER: {
            const data = [...state.userList];

            const index = data.findIndex((ele) => payload.username === ele.username);

            if (index !== -1) {
                data[index] = payload;
            }

            state.userList = data;

            return { ...state };
        }
        default:
            return state;
    }
};
