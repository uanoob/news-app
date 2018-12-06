import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import List from '@material-ui/core/List';
import Comments, { CommentsComponent } from '../Comments';
import Preloader from '../../../containers/preloader/Preloader';

describe('Comments', () => {
  const props = {
    classes: { root: '' },
    comments: [],
    articleId: '',
    isLoading: false,
    isLoaded: false,
    errorMsg: null,
    onGetAllCommentsByArticleId: () => {},
    onClearComments: () => {},
  };

  describe('CommentsComponent initial', () => {
    const mockGetAllCommentsByArticleId = jest.fn();
    const nextProps = {
      ...props,
      onGetAllCommentsByArticleId: mockGetAllCommentsByArticleId,
    };
    const wrapper = shallow(<CommentsComponent {...nextProps} />);

    it('render correctly CommentsComponent', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('onGetAllCommentsByArticleId method should have been called', () => {
      expect(mockGetAllCommentsByArticleId).toBeCalledTimes(1);
    });
    it('not render <List />', () => {
      expect(wrapper.find(List)).toHaveLength(0);
    });
    it('not render <Preloader />', () => {
      expect(wrapper.find(Preloader)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('#error-message')).toHaveLength(0);
    });
  });

  describe('CommentsComponent isLoading', () => {
    const nextProps = {
      ...props,
      isLoading: true,
    };
    const wrapper = shallow(<CommentsComponent {...nextProps} />);

    it('render correctly CommentsComponent', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('render Preloader', () => {
      expect(wrapper.find(Preloader)).toHaveLength(1);
    });
    it('not render <List />', () => {
      expect(wrapper.find(List)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('#error-message')).toHaveLength(0);
    });
  });

  describe('CommentsComponent Loaded & comments array empty', () => {
    const nextProps = {
      ...props,
      isLoading: false,
      isLoaded: true,
    };
    const wrapper = shallow(<CommentsComponent {...nextProps} />);

    it('render correctly CommentsComponent', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('not render Preloader', () => {
      expect(wrapper.find(Preloader)).toHaveLength(0);
    });
    it('not render <List />', () => {
      expect(wrapper.find(List)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('#error-message')).toHaveLength(0);
    });
    it('render No comments yep', () => {
      expect(wrapper.find('#empty-message')).toHaveLength(1);
    });
  });

  describe('CommentsComponent render <List />', () => {
    const nextProps = {
      ...props,
      comments: [
        {
          _id: 'PropTypes.string.isRequired',
          text: 'PropTypes.string.isRequired',
          author_id: 'PropTypes.string.isRequired',
          author_name: 'PropTypes.string.isRequired',
          article_id: 'PropTypes.string.isRequired',
          created_at: 'PropTypes.string.isRequired',
          updated_at: 'PropTypes.string.isRequired',
        },
      ],
      isLoading: false,
      isLoaded: true,
    };
    const wrapper = shallow(<CommentsComponent {...nextProps} />);

    it('render correctly CommentsComponent', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders <List /> template', () => {
      expect(wrapper.find(List)).toHaveLength(1);
    });
    it('not render <Preloader />', () => {
      expect(wrapper.find(Preloader)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('#error-message')).toHaveLength(0);
    });
  });

  describe('CommentsComponent with errorMsg', () => {
    const nextProps = {
      ...props,
      errorMsg: 'Something going wrong',
    };
    const wrapper = shallow(<CommentsComponent {...nextProps} />);

    it('render correctly CommentsComponent', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders errorMsg', () => {
      expect(wrapper.find('#error-message').text()).toEqual(nextProps.errorMsg);
    });
  });

  describe('CommentsComponentWillUnmount', () => {
    const mockClearComments = jest.fn();
    const nextProps = {
      ...props,
      onClearComments: mockClearComments,
    };
    const wrapper = shallow(<CommentsComponent {...nextProps} />);
    it('render correctly CommentsComponent', () => {
      expect(wrapper).toMatchSnapshot();
    });
    wrapper.unmount();
    it('dispatches clearComments method', () => {
      expect(mockClearComments).toBeCalledTimes(1);
    });
  });

  describe('Comments: mapStateToProps & mapDispatchToProps', () => {
    const mockStore = configureMockStore();
    const getAllCommentsByArticleId = () => ({
      type: 'GET_ALL_COMMENTS_BY_ARTICLE_ID',
    });
    const comments = [
      {
        _id: 'PropTypes.string.isRequired',
        text: 'PropTypes.string.isRequired',
        author_id: 'PropTypes.string.isRequired',
        author_name: 'PropTypes.string.isRequired',
        article_id: 'PropTypes.string.isRequired',
        created_at: 'PropTypes.string.isRequired',
        updated_at: 'PropTypes.string.isRequired',
      },
    ];
    const initialState = {
      comments,
      isLoading: false,
      isLoaded: false,
    };
    const store = mockStore(initialState);
    const wrapper = shallow(<Comments store={store} />);
    it('the state values were correctly passed as props', () => {
      expect(wrapper.props().store.getState()).toEqual(initialState);
    });
    it('the store dispatched the expected actions', () => {
      store.dispatch(getAllCommentsByArticleId());
      const actions = store.getActions();
      const expectedPayload = { type: 'GET_ALL_COMMENTS_BY_ARTICLE_ID' };
      expect(actions).toEqual([expectedPayload]);
    });
  });
});
