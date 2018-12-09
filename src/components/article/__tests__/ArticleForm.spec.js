import React from 'react';
import { shallow } from 'enzyme';
import { ArticleFormComponent } from '../ArticleForm';

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
    describe('when clicking the Send button and no articleId', () => {
      const event = { preventDefault: () => {} };
      wrapper.find('#submit-article-button').simulate('click', event);
      it('calls the onCreateArticle', () => {
        expect(mockCreateArticle).toBeCalledTimes(1);
      });
    });
  });

  describe('ArticlesComponent submit + articleId', () => {
    const nextProps = {
      ...props,
      articleId: '123',
    };
    const wrapper = shallow(<ArticleFormComponent {...nextProps} />);
    describe('when clicking the Send button and articleId', () => {
      const event = { preventDefault: () => {} };
      wrapper.find('#submit-article-button').simulate('click', event);
      it('calls the onUpdateArticle', () => {
        expect(mockUpdateArticle).toBeCalledTimes(1);
      });
    });
  });
});
