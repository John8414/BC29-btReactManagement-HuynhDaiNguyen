import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addUserAction, updateUserAction } from '../Store/actions/user';

const DEFAULT_VALUE = {
    id: '',
    username: '',
    fullname: '',
    email: '',
    password: '',
    phonenumber: '',
    type: 'Client',
};

export default function Register() {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.userReducer);

    const [values, setValues] = useState(DEFAULT_VALUE);
    const [errors, setErrors] = useState(DEFAULT_VALUE);

    const formRef = useRef(null);

    useEffect(() => {
        if (userState.selectedUser) {
            setValues(userState.selectedUser);
        }
    }, [userState.selectedUser]);

    const handleChange = (event) => {
        const { value, name } = event.target;

        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!event.target.checkValidity()) {
            return;
        }

        const index = userState.userList.findIndex((ele) => ele.username === values.username);

        if (index !== -1) {
            dispatch(updateUserAction(values));
        } else {
            dispatch(addUserAction(values));
        }

        setValues(DEFAULT_VALUE);
    };

    const handleBlur = (event) => {
        let message = '';
        const {
            name,
            title,
            maxLength,
            minLength,
            validity: {
                patternMismatch,
                tooLong,
                tooShort,
                valueMissing,
            },
        } = event.target;

        if (title === 'Phone Number' && patternMismatch) {
            message = `Số điện thoại chỉ được nhập số eg: 1234567890`;
        }
        if (title === 'Email' && patternMismatch) {
            message = `Email phải nhập đúng cấu trúc eg: haha@mail.com`;
        }

        if (tooLong || tooShort) {
            message = `Vui lòng nhập từ ${minLength} đến ${maxLength} ký tự`;
        }

        if (valueMissing) {
            message = `Vui lòng nhập ${title}`;
        }

        setErrors({ ...errors, [name]: message });

    };

    // const handleReset = () => {
    //     // event.preventDefault();

    //     setValues(DEFAULT_VALUE);
    // };


    const { username, fullname, email, password, phonenumber, type } = values || {};

    return (
        <div className="card p-0">
            <div className="card-header bg-warning text-white font-weight-bold">REGISTER FORM</div>
            <span className='text-danger text-center'>(*) are required fills</span>
            <div className="card-body">
                <form ref={formRef} noValidate onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Username</label>
                                <span className='text-danger'>*</span>
                                <input
                                    title="Username"
                                    onBlur={handleBlur}
                                    required
                                    minLength={4}
                                    maxLength={20}
                                    value={username}
                                    name="username"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                {errors.username && (
                                    <p className="text-danger">{errors.username}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Full Name</label>
                                <span className='text-danger'>*</span>
                                <input
                                    pattern="^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$"
                                    title="Full Name"
                                    onBlur={handleBlur}
                                    required
                                    minLength={5}
                                    maxLength={20}
                                    value={fullname}
                                    name="fullname"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                {errors.fullname && (
                                    <p className="text-danger">{errors.fullname}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Password</label>
                                <span className='text-danger'>*</span>
                                <input
                                    title="Password"
                                    minLength={4}
                                    maxLength={20}
                                    onBlur={handleBlur}
                                    required
                                    value={password}
                                    name="password"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                {errors.password && (
                                    <p className="text-danger">{errors.password}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <span className='text-danger'>*</span>
                                <input
                                    title="Phone Number"
                                    onBlur={handleBlur}
                                    pattern='[0-9]{4}[0-9]{3}[0-9]{3}'
                                    required
                                    value={phonenumber}
                                    name="phonenumber"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />
                                {errors.phonenumber && (
                                    <p className="text-danger">{errors.phonenumber}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Email</label>
                                <span className='text-danger'>*</span>
                                <input
                                    title="Email"
                                    pattern="^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$"
                                    onBlur={handleBlur}
                                    required
                                    value={email}
                                    name="email"
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control"
                                />{' '}
                                {errors.email && <p className="text-danger">{errors.email}</p>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label>Type</label>
                                <span className='text-danger'>*</span>
                                <select
                                    onBlur={handleBlur}
                                    required
                                    value={type}
                                    name="type"
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option>Client</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button
                        disabled={!formRef.current?.checkValidity()}
                        type="submit"
                        className="btn btn-warning mr-2"
                    >
                        SAVE
                    </button>
                    <button
                        onClick={() => setValues(DEFAULT_VALUE)}
                        className="btn btn-outline-danger"
                    >
                        RESET
                    </button>
                </form>
            </div>
        </div>
    );
}
