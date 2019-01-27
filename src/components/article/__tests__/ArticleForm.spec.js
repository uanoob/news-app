import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ArticleForm, { ArticleFormComponent } from '../ArticleForm';

describe('ArticleForm', () => {
  const mockCreateArticle = jest.fn();
  const mockUpdateArticle = jest.fn();
  const mockHandleDialogClick = jest.fn();
  const mockClearInputField = jest.fn();
  const mockHandleCancelClick = jest.fn();
  const initialState = {
    title: '',
    titleInputTouched: false,
    titleInputValid: false,
    text: '',
    textInputTouched: false,
    textInputValid: false,
  };
  const props = {
    classes: {
      container: '',
      textField: '',
      button: '',
      rightIcon: '',
    },
    articleId: '',
    articleTitle: '',
    articleText: '',
    onCreateArticle: mockCreateArticle,
    onUpdateArticle: mockUpdateArticle,
    handleDialogClick: mockHandleDialogClick,
    clearInputField: mockClearInputField,
    handleCancelClick: mockHandleCancelClick,
    userId: 'PropTypes.string.isRequired',
    userName: 'PropTypes.string.isRequired',
    dialog: false,
    header: 'PropTypes.string.isRequired',
    description: 'PropTypes.string.isRequired',
  };

  describe('ArticlesFormComponent initial', () => {
    const wrapper = shallow(<ArticleFormComponent {...props} />);

    it('render correctly ArticleFormComponent component', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('initialize ArticleFormComponent with initial state', () => {
      expect(wrapper.state()).toEqual(initialState);
    });
  });

  describe('ArticlesFormComponent checked input', () => {
    const wrapper = shallow(<ArticleFormComponent {...props} />);
    describe('valid title input', () => {
      const title = 'Enzyme';
      const event = {
        target: { name: 'title', value: title },
        preventDefault: () => {},
      };
      beforeEach(() => {
        wrapper.find('#article-title-input').simulate('change', event);
      });

      it('updates title field in state', () => {
        expect(wrapper.state('title')).toEqual(title);
      });
      it('updates titleInputTouched field in state', () => {
        expect(wrapper.state('titleInputTouched')).toEqual(true);
      });
      it('updates titleInputValid field in state', () => {
        expect(wrapper.state('titleInputValid')).toEqual(true);
      });
    });

    describe('invalid title input', () => {
      const title = 'd';
      const event = {
        target: { name: 'title', value: title },
        preventDefault: () => {},
      };
      beforeEach(() => {
        wrapper.find('#article-title-input').simulate('change', event);
      });

      it('updates title field in state', () => {
        expect(wrapper.state('title')).toEqual(title);
      });
      it('updates titleInputTouched field in state', () => {
        expect(wrapper.state('titleInputTouched')).toEqual(true);
      });
      it('updates titleInputValid field in state', () => {
        expect(wrapper.state('titleInputValid')).toEqual(false);
      });
    });

    describe('valid text input', () => {
      const text = 'Enzyme is a JavaScript Testing utility for React'
        + ' that makes it easier to assert, manipulate,'
        + 'and traverse your React Components output.';
      const event = {
        target: { name: 'text', value: text },
        preventDefault: () => {},
      };
      beforeEach(() => {
        wrapper.find('#article-text-input').simulate('change', event);
      });

      it('updates text field in state', () => {
        expect(wrapper.state('text')).toEqual(text);
      });
      it('updates textInputTouched field in state', () => {
        expect(wrapper.state('textInputTouched')).toEqual(true);
      });
      it('updates textInputValid field in state', () => {
        expect(wrapper.state('textInputValid')).toEqual(true);
      });
    });

    describe('invalid text input', () => {
      const text = 'Enzyme is a';
      const event = {
        target: { name: 'text', value: text },
        preventDefault: () => {},
      };
      beforeEach(() => {
        wrapper.find('#article-text-input').simulate('change', event);
      });

      it('updates text field in state', () => {
        expect(wrapper.state('text')).toEqual(text);
      });
      it('updates textInputTouched field in state', () => {
        expect(wrapper.state('textInputTouched')).toEqual(true);
      });
      it('updates textInputValid field in state', () => {
        expect(wrapper.state('textInputValid')).toEqual(false);
      });
    });
  });

  describe('ArticlesComponent submit', () => {
    const wrapper = shallow(<ArticleFormComponent {...props} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'clearInputField');
    describe('when clicking the Send button and no articleId', () => {
      const event = { preventDefault: () => {} };
      wrapper.find('#article-submit-button').simulate('click', event);
      it('calls the onCreateArticle', () => {
        expect(mockCreateArticle).toBeCalledTimes(1);
      });
      it('calls clearInputField', () => {
        expect(instance.clearInputField).toBeCalledTimes(1);
      });
      it('set state to initialState', () => {
        expect(wrapper.state()).toEqual(initialState);
      });
    });
  });

  describe('ArticlesComponent submit + articleId', () => {
    const nextProps = {
      ...props,
      articleId: '123',
    };
    const wrapper = shallow(<ArticleFormComponent {...nextProps} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'clearInputField');
    describe('when clicking the Send button and articleId', () => {
      const event = { preventDefault: () => {} };
      wrapper.find('#article-submit-button').simulate('click', event);
      it('calls the onUpdateArticle', () => {
        expect(mockUpdateArticle).toBeCalledTimes(1);
      });
      it('calls clearInputField', () => {
        expect(instance.clearInputField).toBeCalledTimes(1);
      });
      it('set state to initialState', () => {
        expect(wrapper.state()).toEqual(initialState);
      });
    });
  });
  describe('ArticleFormComponent cancel', () => {
    const wrapper = shallow(<ArticleFormComponent {...props} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'clearInputField');
    describe('when clicking the Cancel button', () => {
      wrapper.find('#article-cancel-button').simulate('click');
      it('calls clearInputField', () => {
        expect(instance.clearInputField).toBeCalledTimes(1);
      });
    });
  });
  describe('ArticleFormComponent componentWillReceiveProps', () => {
    const nextProps = {
      ...props,
      articleTitle: 'Test title',
    };
    const wrapper = shallow(<ArticleFormComponent {...props} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'componentWillReceiveProps');
    it('Component should call componentWillReceiveProps on update', () => {
      expect(instance.componentWillReceiveProps).toBeCalledTimes(0);
      wrapper.setProps(nextProps);
      expect(instance.componentWillReceiveProps).toBeCalledTimes(1);
    });
    it('update state title field', () => {
      expect(wrapper.state('title')).toEqual(nextProps.articleTitle);
    });
  });
  describe('ArticleForm mapStateToProps & mapDispatchToProps', () => {
    const mockStore = configureMockStore();
    const createArticle = () => ({
      type: 'CREATE_ARTICLE',
    });
    const updateArticle = () => ({
      type: 'UPDATE_ARTICLE',
    });
    const user = {
      user: {
        _id: 'testid',
        name: 'testname',
      },
    };
    const initialStateRedux = {
      user,
    };
    let store;
    let wrapper;
    beforeEach(() => {
      store = mockStore(initialStateRedux);
      wrapper = shallow(<ArticleForm store={store} />);
    });
    it('the state values were correctly passed as props', () => {
      expect(wrapper.props().store.getState()).toEqual(initialStateRedux);
    });
    it('the store dispatched the action CREATE_ARTICLE', () => {
      store.dispatch(createArticle());
      const actions = store.getActions();
      const expectedPayload = { type: 'CREATE_ARTICLE' };
      expect(actions).toEqual([expectedPayload]);
    });
    it('the store dispatched the action UPDATE_ARTICLE', () => {
      store.dispatch(updateArticle());
      const actions = store.getActions();
      const expectedPayload = { type: 'UPDATE_ARTICLE' };
      expect(actions).toEqual([expectedPayload]);
    });
  });
});
