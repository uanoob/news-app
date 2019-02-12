import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Card from '@material-ui/core/Card';
import AuthorPage, { AuthorPageComponent } from '../AuthorPage';

describe('AuthorPageComponent', () => {
  const initialState = {
    articleDialog: false,
  };
  const props = {
    classes: {
      container: '',
    },
    match: {
      isExact: true,
      path: 'test-path',
      url: 'test-url',
      params: {
        id: 'test-is-author-id',
      },
    },
    userId: 'test-is-author-id',
    userName: 'test-userName',
    userEmail: 'test-userEmail',
  };

  describe('initialize AuthorPageComponent', () => {
    it('render correctly AuthorPageComponent component', () => {
      const wrapper = shallow(<AuthorPageComponent {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('initialize AuthorPageComponent with initial state', () => {
      const wrapper = shallow(<AuthorPageComponent {...props} />);
      expect(wrapper.state()).toEqual(initialState);
    });
  });
  describe('render <Card /> if user is author', () => {
    it('render <Card />', () => {
      const wrapper = shallow(<AuthorPageComponent {...props} />);
      expect(wrapper.find(Card)).toHaveLength(1);
    });
  });
  describe('not render <Card /> if user not author', () => {
    const nextProps = {
      ...props,
      match: {
        isExact: true,
        path: 'test-path',
        url: 'test-url',
        params: {
          id: 'test-not-author-id',
        },
      },
    };
    const wrapper = shallow(<AuthorPageComponent {...nextProps} />);
    it('not render <Card />', () => {
      expect(wrapper.find(Card)).toHaveLength(0);
    });
  });
  describe('AuthorPage: mapStateToProps', () => {
    const mockStore = configureMockStore();
    const initialStoreState = {
      user: {
        user: {
          _id: 'test-user-id',
        },
      },
    };
    let store;
    beforeEach(() => {
      store = mockStore(initialStoreState);
    });
    it('the state values were correctly passed as props', () => {
      const wrapper = shallow(<AuthorPage {...props} store={store} />);
      expect(wrapper.props().store.getState()).toEqual(initialStoreState);
    });
  });
});
