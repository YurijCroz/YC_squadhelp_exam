import React, { Component } from 'react';
import styles from './Footer.module.sass';
import CONSTANTS from '../../constants';

class Footer extends Component {
    topFooterItemsRender = (item) => (
      <nav key={item.title}>
        <h4>{item.title}</h4>
        {item.items.map((i) => <a key={i} href="https://google.com">{i}</a>)}
      </nav>
    );

    topFooterRender() {
      return CONSTANTS.FooterItems.map((item) => this.topFooterItemsRender(item));
    }

    render() {
      return (
        <footer className={styles.footerContainer}>
          <section className={styles.footerTop}>
            <section>
              {this.topFooterRender()}
            </section>
          </section>
        </footer>
      );
    }
}

export default Footer;
