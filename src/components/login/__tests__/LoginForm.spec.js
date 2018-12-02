import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from '../LoginForm';

describe('Login', () => {
  const mockLogin = jest.fn();
  const initialState = {
    email: '',
    emailTouched: false,
    emailIsValid: false,
    password: '',
    passwordTouched: false,
    passwordIsValid: false,
  };
  const props = {
    classes: {
      container: '',
      textField: '',
    },
    onLogin: mockLogin,
  };
  const wrapper = shallow(<LoginForm {...props} />);

  it('render correctly LoginForm component', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('initialize LoginForm with initial state', () => {
    expect(wrapper.state()).toEqual(initialState);
  });
  describe('valid email input', () => {
    const email = 'doe@icloud.com';
    const event = {
      target: { name: 'email', value: email },
      preventDefault: () => {},
    };
    beforeEach(() => {
      wrapper.find('#outlined-email-input').simulate('change', event);
    });

    it('updates email field in state', () => {
      expect(wrapper.state('email')).toEqual(email);
    });
    it('updates emailTouched field in state', () => {
      expect(wrapper.state('emailTouched')).toEqual(true);
    });
    it('updates emailIsValid field in state', () => {
      expect(wrapper.state('emailIsValid')).toEqual(true);
    });
  });
  describe('invalid email input', () => {
    const email = 'doe@icloud';
    const event = {
      target: { name: 'email', value: email },
      preventDefault: () => {},
    };
    beforeEach(() => {
      wrapper.find('#outlined-email-input').simulate('change', event);
    });

    it('updates email field in state', () => {
      expect(wrapper.state('email')).toEqual(email);
    });
    it('updates emailTouched field in state', () => {
      expect(wrapper.state('emailTouched')).toEqual(true);
    });
    it('updates emailIsValid field in state', () => {
      expect(wrapper.state('emailIsValid')).toEqual(false);
    });
  });
  describe('valid password input', () => {
    const password = 'password';
    const event = {
      target: { name: 'password', value: password },
      preventDefault: () => {},
    };
    beforeEach(() => {
      wrapper.find('#outlined-password-input').simulate('change', event);
    });

    it('updates password field in state', () => {
      expect(wrapper.state('password')).toEqual(password);
    });
    it('updates passwordTouched field in state', () => {
      expect(wrapper.state('passwordTouched')).toEqual(true);
    });
    it('updates passwordIsValid field in state', () => {
      expect(wrapper.state('passwordIsValid')).toEqual(true);
    });
  });
  describe('invalid password input', () => {
    const password = 'pa';
    const event = {
      target: { name: 'password', value: password },
      preventDefault: () => {},
    };
    beforeEach(() => {
      wrapper.find('#outlined-password-input').simulate('change', event);
    });

    it('updates password field in state', () => {
      expect(wrapper.state('password')).toEqual(password);
    });
    it('updates passwordTouched field in state', () => {
      expect(wrapper.state('passwordTouched')).toEqual(true);
    });
    it('updates passwordIsValid field in state', () => {
      expect(wrapper.state('passwordIsValid')).toEqual(false);
    });
  });
  describe('when submiting the form', () => {
    const event = { preventDefault: () => {} };
    beforeEach(() => {
      wrapper.find('form').simulate('submit', event);
    });
    it('calls the onLogin', () => {
      expect(mockLogin).toBeCalledTimes(1);
    });
  });
  describe('when clicking the login button', () => {
    const event = { preventDefault: () => {} };
    beforeEach(() => {
      wrapper.find('#submit-button').simulate('click', event);
    });
    it('calls the onLogin', () => {
      expect(mockLogin).toBeCalledTimes(1);
    });
  });
});
