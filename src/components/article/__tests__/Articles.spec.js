import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import List from '@material-ui/core/List';
import Articles, { ArticlesComponent } from '../Articles';
import Preloader from '../../../containers/preloader/Preloader';

describe('Articles', () => {
  const props = {
    classes: { root: '' },
    articles: [],
    authorId: '',
    isLoading: false,
    isLoaded: false,
    errorMsg: null,
    onGetAllArticles: () => {},
    onGetArticlesByAuthorId: () => {},
    onClearArticles: () => {},
  };

  describe('ArticlesComponent initial', () => {
    const mockGetAllArticles = jest.fn();
    const nextProps = {
      ...props,
      onGetAllArticles: mockGetAllArticles,
    };
    const wrapper = shallow(<ArticlesComponent {...nextProps} />);

    it('render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('onGetAllArticles method should have been called', () => {
      expect(mockGetAllArticles).toHaveBeenCalledTimes(1);
    });
    it('not render <List />', () => {
      expect(wrapper.find(List)).toHaveLength(0);
    });
    it('not render <Preloader />', () => {
      expect(wrapper.find(Preloader)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('#articles-error-message')).toHaveLength(0);
    });
  });

  describe('ArticlesComponent initial + authorId', () => {
    const mockGetArticlesByAuthorId = jest.fn();
    const nextProps = {
      ...props,
      authorId: '123',
      onGetArticlesByAuthorId: mockGetArticlesByAuthorId,
    };
    const wrapper = shallow(<ArticlesComponent {...nextProps} />);
    it('render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('onGetArticlesByAuthorId method should have been called', () => {
      expect(mockGetArticlesByAuthorId).toBeCalledTimes(1);
    });
    it('onGetArticlesByAuthorId should have been called with params', () => {
      expect(mockGetArticlesByAuthorId).toBeCalledWith(nextProps.authorId);
    });
  });

  describe('ArticlesComponent isLoading', () => {
    const nextProps = {
      ...props,
      isLoading: true,
    };
    const wrapper = shallow(<ArticlesComponent {...nextProps} />);

    it('render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('render Preloader', () => {
      expect(wrapper.find(Preloader)).toHaveLength(1);
    });
    it('not render <List />', () => {
      expect(wrapper.find(List)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('#articles-error-message')).toHaveLength(0);
    });
  });

  describe('ArticlesComponent Loaded & articles array empty', () => {
    const nextProps = {
      ...props,
      isLoading: false,
      isLoaded: true,
    };
    const wrapper = shallow(<ArticlesComponent {...nextProps} />);

    it('render correctly ArticlesComponent', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('not render Preloader', () => {
      expect(wrapper.find(Preloader)).toHaveLength(0);
    });
    it('not render <List />', () => {
      expect(wrapper.find(List)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('#articles-error-message')).toHaveLength(0);
    });
    it('render No articles yep', () => {
      expect(wrapper.find('#articles-empty-message')).toHaveLength(1);
    });
  });

  describe('ArticlesComponent render <List />', () => {
    const nextProps = {
      ...props,
      articles: [
        {
          _id: 'PropTypes.string.isRequired',
          title: 'PropTypes.string.isRequired',
          text: 'PropTypes.string.isRequired',
          author_id: 'PropTypes.string.isRequired',
          author_name: 'PropTypes.string.isRequired',
          created_at: 'PropTypes.string.isRequired',
          updated_at: 'PropTypes.string.isRequired',
        },
      ],
      isLoading: false,
      isLoaded: true,
    };
    const wrapper = shallow(<ArticlesComponent {...nextProps} />);

    it('render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders <List /> template', () => {
      expect(wrapper.find(List)).toHaveLength(1);
    });
    it('not render <Preloader />', () => {
      expect(wrapper.find(Preloader)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('#articles-error-message')).toHaveLength(0);
    });
  });

  describe('ArticlesComponent with errorMsg', () => {
    const nextProps = {
      ...props,
      errorMsg: 'Something going wrong',
    };
    const wrapper = shallow(<ArticlesComponent {...nextProps} />);

    it('render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders errorMsg', () => {
      expect(wrapper.find('#articles-error-message').text()).toEqual(
        nextProps.errorMsg,
      );
    });
  });

  describe('ArticlesComponent componentWillUnmount', () => {
    const mockClearArticles = jest.fn();
    const nextProps = {
      ...props,
      onClearArticles: mockClearArticles,
    };
    const wrapper = shallow(<ArticlesComponent {...nextProps} />);
    it('render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    wrapper.unmount();
    it('dispatches clearArticles method', () => {
      expect(mockClearArticles).toBeCalledTimes(1);
    });
  });

  describe('Articles: mapStateToProps & mapDispatchToProps', () => {
    const mockStore = configureMockStore();
    const getAllArticles = () => ({
      type: 'GET_ALL_ARTICLES',
    });
    const getArticlesByAuthorId = () => ({
      type: 'GET_ARTICLES_BY_AUTHOR_ID',
    });
    const clearArticles = () => ({
      type: 'CLEAR_ARTICLES',
    });
    const articles = [
      {
        _id: 'PropTypes.string.isRequired',
        title: 'PropTypes.string.isRequired',
        text: 'PropTypes.string.isRequired',
        author_id: 'PropTypes.string.isRequired',
        author_name: 'PropTypes.string.isRequired',
        created_at: 'PropTypes.string.isRequired',
        updated_at: 'PropTypes.string.isRequired',
      },
    ];
    const initialState = {
      articles,
      isLoading: false,
      isLoaded: false,
    };
    let store;
    let wrapper;
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = shallow(<Articles store={store} />);
    });
    it('the state values were correctly passed as props', () => {
      expect(wrapper.props().store.getState()).toEqual(initialState);
    });
    it('the store dispatched the action: GET_ALL_ARTICLES', () => {
      store.dispatch(getAllArticles());
      const actions = store.getActions();
      const expectedPayload = { type: 'GET_ALL_ARTICLES' };
      expect(actions).toEqual([expectedPayload]);
    });
    it('the store dispatched the action: GET_ARTICLES_BY_AUTHOR_ID', () => {
      store.dispatch(getArticlesByAuthorId());
      const actions = store.getActions();
      const expectedPayload = { type: 'GET_ARTICLES_BY_AUTHOR_ID' };
      expect(actions).toEqual([expectedPayload]);
    });
    it('the store dispatched the action: CLEAR_ARTICLES', () => {
      store.dispatch(clearArticles());
      const actions = store.getActions();
      const expectedPayload = { type: 'CLEAR_ARTICLES' };
      expect(actions).toEqual([expectedPayload]);
    });
  });
});
