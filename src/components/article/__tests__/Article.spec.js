import React from 'react';
import { shallow } from 'enzyme';
import { ArticleComponent } from '../Article';
import Preloader from '../../../containers/preloader/Preloader';

describe('Article', () => {
  // const initialState = {
  //   expanded: false,
  //   articleDialog: false,
  //   commentDialog: false,
  // };
  const mockDeleteArticle = jest.fn();
  const mockClearArticle = jest.fn();
  const props = {
    classes: {
      card: '',
      actions: '',
      expand: '',
      expandOpen: '',
      avatar: '',
    },
    article: {
      _id: '',
      title: '',
      text: '',
      author_id: 'test_author_id',
      author_name: '',
      created_at: '',
      updated_at: '',
    },
    history: { push: () => {} },
    userId: '',
    onDeleteArticle: mockDeleteArticle,
    onClearArticle: mockClearArticle,
    currentArticleId: '',
    isLoading: false,
  };

  describe('ArticleComponent initial', () => {
    const wrapper = shallow(<ArticleComponent {...props} />);
    it('render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('not render <Preloader />', () => {
      expect(wrapper.find(Preloader)).toHaveLength(0);
    });
  });
  describe('ArticleComponent isLoading', () => {
    const nextProps = {
      ...props,
      isLoading: true,
    };
    const wrapper = shallow(<ArticleComponent {...nextProps} />);
    it('render <Preloader />', () => {
      expect(wrapper.find(Preloader)).toHaveLength(1);
    });
  });
  describe('ArticleComponent componentWillUnmount', () => {
    const wrapper = shallow(<ArticleComponent {...props} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleClearArticle');
    wrapper.unmount();
    it('method handleClearArticle should have to be called', () => {
      expect(instance.handleClearArticle).toBeCalledTimes(1);
    });
  });
  describe('ArticleComponent & userId', () => {
    const nextProps = {
      ...props,
      userId: 'test_author_id',
    };
    const wrapper = shallow(<ArticleComponent {...nextProps} />);
    describe('when clicking the Delete button', () => {
      wrapper.find('#article-delete-button').simulate('click');
      it('method onDeleteArticle should been called', () => {
        expect(mockDeleteArticle).toBeCalledTimes(1);
      });
    });
  });
});
