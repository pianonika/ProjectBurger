import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import s from './register.module.less';
import { Button, Input, PasswordInput, } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '@models/hooks';
import { register } from '@store/auth/action';
import { useForm } from '../../hooks/useForm';
export function RegisterPage() {
    var dispatch = useAppDispatch();
    var _a = useForm({
        email: '',
        password: '',
        name: '',
        passwordRepeat: '',
        isValid: 'true',
    }), values = _a.values, handleChange = _a.handleChange;
    var submitForm = function (e) {
        var data = {
            email: values.email,
            password: values.password,
            name: values.name,
        };
        e.preventDefault();
        dispatch(register(data));
    };
    var checkValidPasswordRepeat = function () {
        return values.password === values.passwordRepeat;
    };
    return (_jsxs("div", { className: 'page_wrapper', children: [_jsx("h1", { className: 'text text_type_main-medium page_header', children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }), _jsxs("div", { className: 'page_content', children: [_jsx("div", { className: 'page_content__left' }), _jsxs("div", { className: 'page_content__center', children: [_jsxs("form", { className: s.form, onSubmit: submitForm, children: [_jsx("div", { className: s.form_field, children: _jsx(Input, { placeholder: '\u0418\u043C\u044F', value: values.name, name: 'name', onChange: handleChange }) }), _jsx("div", { className: s.form_field, children: _jsx(Input, { placeholder: 'Email', value: values.email, name: 'email', onChange: handleChange }) }), _jsx("div", { className: s.form_field, children: _jsx(Input, { placeholder: '\u041F\u0430\u0440\u043E\u043B\u044C', value: values.password, name: 'password', onChange: handleChange }) }), _jsx("div", { className: s.form_field, children: _jsx(PasswordInput, { placeholder: '\u041F\u0430\u0440\u043E\u043B\u044C', value: values.passwordRepeat, name: 'passwordRepeat', onChange: handleChange, checkValid: checkValidPasswordRepeat, errorText: '\u041F\u0430\u0440\u043E\u043B\u0438 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442' }) }), _jsx("div", { className: s.form_field, children: _jsx(Button, { htmlType: 'submit', type: 'primary', children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" }) })] }), _jsxs("p", { className: s.form_comment, children: ["\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u044B? ", _jsx(Link, { to: '/login', children: "\u0412\u043E\u0439\u0442\u0438" })] })] }), _jsx("div", { className: 'page_content__right' })] })] }));
}
//# sourceMappingURL=register.js.map