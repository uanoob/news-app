import React from 'react';
import { shallow } from 'enzyme';
import { SignUpFormComponent } from '../SignUpForm';

describe('SignUp', () => {
  const mockSignUp = jest.fn();
  const initialState = {
    name: '',
    nameTouched: false,
    nameIsValid: false,
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
    onSignUp: mockSignUp,
  };
  const wrapper = shallow(<SignUpFormComponent {...props} />);

  it('render correctly SignUpFormComponent component', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('initialize SignUpFormComponent with initial state', () => {
    expect(wrapper.state()).toEqual(initialState);
  });
  describe('valid name input', () => {
    const name = 'doe';
    const event = {
      target: { name: 'name', value: name },
      preventDefault: () => {},
    };
    beforeEach(() => {
      wrapper.find('#outlined-name-input').simulate('change', event);
    });

    it('updates name field in state', () => {
      expect(wrapper.state('name')).toEqual(name);
    });
    it('updates nameTouched field in state', () => {
      expect(wrapper.state('nameTouched')).toEqual(true);
    });
    it('updates nameIsValid field in state', () => {
      expect(wrapper.state('nameIsValid')).toEqual(true);
    });
  });
  describe('invalid name input', () => {
    const name = 'do';
    const event = {
      target: { name: 'name', value: name },
      preventDefault: () => {},
    };
    beforeEach(() => {
      wrapper.find('#outlined-name-input').simulate('change', event);
    });

    it('updates name field in state', () => {
      expect(wrapper.state('name')).toEqual(name);
    });
    it('updates nameTouched field in state', () => {
      expect(wrapper.state('nameTouched')).toEqual(true);
    });
    it('updates nameIsValid field in state', () => {
      expect(wrapper.state('nameIsValid')).toEqual(false);
    });
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
    it('calls the onSignUp', () => {
      expect(mockSignUp).toBeCalledTimes(1);
    });
  });
  describe('when clicking the Sign Up button', () => {
    const event = { preventDefault: () => {} };
    beforeEach(() => {
      wrapper.find('#signup-button').simulate('click', event);
    });
    it('calls the onSignUp', () => {
      expect(mockSignUp).toBeCalledTimes(1);
    });
  });
});
