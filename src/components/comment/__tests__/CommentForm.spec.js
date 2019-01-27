import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import CommentForm, { CommentFormComponent } from '../CommentForm';

describe('CommentForm', () => {
  const mockCreateComment = jest.fn();
  const mockUpdateComment = jest.fn();
  const mockHandleDialogClick = jest.fn();
  const initialState = {
    comment: '',
    commentInputTouched: false,
    commentInputValid: false,
  };
  const props = {
    classes: {
      container: '',
      textField: '',
    },
    articleId: '',
    onCreateComment: mockCreateComment,
    onUpdateComment: mockUpdateComment,
    userId: 'PropTypes.string.isRequired',
    userName: 'PropTypes.string.isRequired',
    dialog: false,
    handleDialogClick: mockHandleDialogClick,
    title: 'PropTypes.string.isRequired',
    description: 'PropTypes.string.isRequired',
    commentId: '',
    commentText: 'PropTypes.string',
  };

  describe('CommentFormComponent initial', () => {
    const wrapper = shallow(<CommentFormComponent {...props} />);
    it('render correctly CommentFormComponent', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('initialize CommentFormComponent with initial state', () => {
      expect(wrapper.state()).toEqual(initialState);
    });
  });
  describe('CommentFormComponent checked input', () => {
    const wrapper = shallow(<CommentFormComponent {...props} />);
    describe('valid comment text field input', () => {
      const comment = 'GraphQl for beginners';
      const event = {
        target: {
          value: comment,
        },
        preventDefault: () => {},
      };
      beforeEach(() => {
        wrapper.find('#comment-textfield-input').simulate('change', event);
      });
      it('updates comment field in state', () => {
        expect(wrapper.state('comment')).toEqual(comment);
      });
      it('updates commentInputTouched field in state', () => {
        expect(wrapper.state('commentInputTouched')).toEqual(true);
      });
      it('updates commentInputValid field in state', () => {
        expect(wrapper.state('commentInputValid')).toEqual(true);
      });
    });
    describe('invalid comment text field input', () => {
      const comment = 'g';
      const event = {
        target: {
          value: comment,
        },
        preventDefault: () => {},
      };
      beforeEach(() => {
        wrapper.find('#comment-textfield-input').simulate('change', event);
      });
      it('updates comment field in state', () => {
        expect(wrapper.state('comment')).toEqual(comment);
      });
      it('updates commentInputTouched field in state', () => {
        expect(wrapper.state('commentInputTouched')).toEqual(true);
      });
      it('updates commentInputValid field in state', () => {
        expect(wrapper.state('commentInputValid')).toEqual(false);
      });
    });
  });
  describe('CommentFormComponent submit', () => {
    const wrapper = shallow(<CommentFormComponent {...props} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'clearTextField');
    describe('when clicking the Send button and no commentId', () => {
      const event = { preventDefault: () => {} };
      wrapper.find('#comment-submit-button').simulate('click', event);
      it('calls the onCreateComment', () => {
        expect(mockCreateComment).toBeCalledTimes(1);
      });
      it('calls clearTextField', () => {
        expect(instance.clearTextField).toBeCalledTimes(1);
      });
      it('set state to initialState', () => {
        expect(wrapper.state()).toEqual(initialState);
      });
    });
  });
  describe('CommentFormComponent submit + commentId', () => {
    const nextProps = {
      ...props,
      commentId: '123',
    };
    const wrapper = shallow(<CommentFormComponent {...nextProps} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'clearTextField');
    describe('when clicking the Send button and commentId', () => {
      const event = { preventDefault: () => {} };
      wrapper.find('#comment-submit-button').simulate('click', event);
      it('calls onUpdateComment', () => {
        expect(mockUpdateComment).toBeCalledTimes(1);
      });
      it('calls clearTextField', () => {
        expect(instance.clearTextField).toBeCalledTimes(1);
      });
      it('set state to initialState', () => {
        expect(wrapper.state()).toEqual(initialState);
      });
    });
  });
  describe('CommentFormComponent cancel', () => {
    const wrapper = shallow(<CommentFormComponent {...props} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'clearTextField');
    describe('when clicking the Cancel button', () => {
      wrapper.find('#comment-cancel-button').simulate('click');
      it('calls clearTextField', () => {
        expect(instance.clearTextField).toBeCalledTimes(1);
      });
    });
  });
  describe('CommentForm mapStateToProps & mapDispatchToProps', () => {
    const mockStore = configureMockStore();
    const createComment = () => ({
      type: 'CREATE_COMMENT',
    });
    const updateComment = () => ({
      type: 'UPDATE_COMMENT',
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
      wrapper = shallow(<CommentForm store={store} />);
    });
    it('the state values were correctly passed as props', () => {
      expect(wrapper.props().store.getState()).toEqual(initialStateRedux);
    });
    it('the store dispatched the action CREATE_COMMENT', () => {
      store.dispatch(createComment());
      const actions = store.getActions();
      const expectedPayload = { type: 'CREATE_COMMENT' };
      expect(actions).toEqual([expectedPayload]);
    });
    it('the store dispatched the action UPDATE_COMMENT', () => {
      store.dispatch(updateComment());
      const actions = store.getActions();
      const expectedPayload = { type: 'UPDATE_COMMENT' };
      expect(actions).toEqual([expectedPayload]);
    });
  });
});
