import React from 'react';
import { shallow } from 'enzyme';
import List from '@material-ui/core/List';
import { Articles } from '../Articles';
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

  describe('Articles componentDidMount', () => {
    const mockGetArticles = jest.fn();
    const wrapper = shallow(<Articles {...props} />);
    wrapper.instance().getArticles = mockGetArticles;
    wrapper.instance().componentDidMount();
    it('getArticles method should have been called', () => {
      expect(mockGetArticles).toBeCalledTimes(1);
    });
  });

  describe('Articles initial', () => {
    const mockGetAllArticles = jest.fn();
    const nextProps = {
      ...props,
      onGetAllArticles: mockGetAllArticles,
    };
    const wrapper = shallow(<Articles {...nextProps} />);

    it('renders properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('dispatches the onGetAllArticles method', () => {
      expect(mockGetAllArticles).toHaveBeenCalledTimes(1);
    });
    it('not render <List />', () => {
      expect(wrapper.find(List)).toHaveLength(0);
    });
    it('not render <Preloader />', () => {
      expect(wrapper.find(Preloader)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('span')).toHaveLength(0);
    });
  });

  describe('Articles initial + authorId', () => {
    const mockGetArticlesByAuthorId = jest.fn();
    const nextProps = {
      ...props,
      authorId: '123',
      onGetArticlesByAuthorId: mockGetArticlesByAuthorId,
    };
    const wrapper = shallow(<Articles {...nextProps} />);
    it('renders properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('dispatches getArticlesByAuthorId method', () => {
      expect(mockGetArticlesByAuthorId).toBeCalledTimes(1);
      expect(mockGetArticlesByAuthorId).toBeCalledWith(nextProps.authorId);
    });
  });

  describe('Articles isLoading', () => {
    const nextProps = {
      ...props,
      isLoading: true,
    };
    const wrapper = shallow(<Articles {...nextProps} />);

    it('renders properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('render Preloader', () => {
      expect(wrapper.find(Preloader)).toHaveLength(1);
    });
    it('not render <List />', () => {
      expect(wrapper.find(List)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('span')).toHaveLength(0);
    });
  });

  describe('Articles render <List />', () => {
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
    const wrapper = shallow(<Articles {...nextProps} />);

    it('renders properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders <List /> template', () => {
      expect(wrapper.find(List)).toHaveLength(1);
    });
    it('not render <Preloader />', () => {
      expect(wrapper.find(Preloader)).toHaveLength(0);
    });
    it('not render errorMsg', () => {
      expect(wrapper.find('span')).toHaveLength(0);
    });
  });

  describe('Articles with errorMsg', () => {
    const nextProps = {
      ...props,
      errorMsg: 'Something going wrong',
    };
    const wrapper = shallow(<Articles {...nextProps} />);

    it('renders properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('renders errorMsg', () => {
      expect(wrapper.find('span').text()).toEqual(nextProps.errorMsg);
    });
  });

  describe('Articles componentWillUnmount', () => {
    const mockClearArticles = jest.fn();
    const nextProps = {
      ...props,
      onClearArticles: mockClearArticles,
    };
    const wrapper = shallow(<Articles {...nextProps} />);
    it('renders properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    wrapper.unmount();
    it('dispatches clearArticles method', () => {
      expect(mockClearArticles).toBeCalledTimes(1);
    });
  });
});
