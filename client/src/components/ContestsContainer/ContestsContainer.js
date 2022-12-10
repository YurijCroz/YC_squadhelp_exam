import React from 'react';
import { withRouter } from 'react-router';
import styles from './ContestContainer.module.sass';
import Spinner from '../Spinner/Spinner';

class ContestsContainer extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

    scrollHandler = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        if (this.props.haveMore) {
          this.props.loadMore(this.props.children.length);
        }
      }
    };

    render() {
      const { isFetching } = this.props;
      if (!isFetching && this.props.children.length === 0) {
        return <section className={styles.notFound}>Nothing not found</section>;
      } return (
        <section>
          {this.props.children}
          {isFetching && <section className={styles.spinnerContainer}><Spinner /></section>}
        </section>
      );
    }
}

export default ContestsContainer;
