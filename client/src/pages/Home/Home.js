import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import CONSTANTS from "../../constants";
import SlideBar from "../../components/SlideBar/SlideBar";
import Footer from "../../components/Footer/Footer";
import styles from "./Home.module.sass";
import carouselConstants from "../../carouselConstants";
import Spinner from "../../components/Spinner/Spinner";
import SpreadCards from "../../components/SpreadCards/SpreadCards.jsx";
import cardsContent from "./cardsContent.json";

const Home = (props) => {
  const [index, setIndex] = useState(0);
  const [styleName, setStyle] = useState(styles.headline__static);
  let timeout;

  useEffect(() => {
    timeout = setInterval(() => {
      setIndex(index + 1);
      setStyle(styles.headline__isloading);
    }, 3000);
    return () => {
      setStyle(styles.headline__static);
      clearInterval(timeout);
    };
  });

  const { isFetching } = props;
  const text =
    CONSTANTS.HEADER_ANIMATION_TEXT[
      index % CONSTANTS.HEADER_ANIMATION_TEXT.length
    ];
  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <main className={styles.container}>
            <article className={styles.headerBar}>
              <section className={styles.headline}>
                <span>Find the Perfect Name for</span>
                <span className={styleName}>{text}</span>
              </section>
              <p>
                Launch a naming contest to engage hundreds of naming experts as
                you’re guided through our agency-level naming process. Or,
                explore our hand-picked collection of premium names available
                for immediate purchase
              </p>
              <div className={styles.button}>
                <Link className={styles.button__link} to="/dashboard">
                  DASHBOARD
                </Link>
              </div>
            </article>
            <section className={styles.greyContainer}>
              <SlideBar
                images={carouselConstants.mainSliderImages}
                carouselType={carouselConstants.MAIN_SLIDER}
              />
            </section>
            <article className={styles.container__description}>
              <h2 className={styles.blueUnderline}>Why Squadhelp?</h2>
              <SpreadCards cards={cardsContent}/>
            </article>
            <article className={styles.greyContainer}>
              <section className={styles.adv}>
                <article className={styles.images}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/Forbes-inactive.png`}
                    alt="forbes"
                  />
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/Forbes-active.png`}
                    alt="forbes"
                  />
                </article>
                <article className={styles.images}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/the_next_web_inactive.png`}
                    alt="web"
                  />
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/the_next_web_active.png`}
                    alt="web"
                  />
                </article>
                <article className={styles.images}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/mashable-inactive.png`}
                    alt="mashable"
                  />
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/mashable-active.png`}
                    alt="mashable"
                  />
                </article>
              </section>
              <section className={styles.stats}>
                <article>
                  <p>119,525</p>
                  <span>Creatives</span>
                </article>
                <article>
                  <p>21,875</p>
                  <span>Customers</span>
                </article>
                <article>
                  <p>85</p>
                  <span>Industries</span>
                </article>
              </section>
            </article>
            <h2>How Do Name Contest Work?</h2>
            <section className={styles.whiteContainer}>
              <section className={styles.stepReverse}>
                <article>
                  <h3>Step 1: Launch a Naming Contest</h3>
                  <p>
                    <i className="fas fa-check" />
                    <span>
                      Start your project right with our proven Naming Brief
                      template
                    </span>
                  </p>
                  <p>
                    <i className="fas fa-check" />
                    <span>
                      We’ll walk you through exactly what you need to share
                      about your project in order to get an awesome Name
                    </span>
                  </p>
                </article>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}gif/1-compressed.gif`}
                  alt="compressed"
                />
              </section>
            </section>
            <section className={styles.greenContainer}>
              <section className={styles.step}>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}gif/2-compressed-new.gif`}
                  alt="compressed"
                />
                <article className={styles.greenStep}>
                  <h3>Step 2: Ideas start pouring in within minutes</h3>
                  <p>
                    <i className="fas fa-check" />
                    <span>
                      100s of naming experts start submitting name ideas
                    </span>
                  </p>
                  <p>
                    <i className="fas fa-check" />
                    <span>
                      Names automatically checked for URL availability
                    </span>
                  </p>
                </article>
              </section>
            </section>
            <section className={styles.greyContainer}>
              <section className={styles.stepReverse}>
                <article>
                  <h3>Step 3: Rate Entries & Brainstorm with Creatives</h3>
                  <p>
                    <i className="fas fa-check" />
                    <span>Provide instant feedback on Names</span>
                  </p>
                  <p>
                    <i className="fas fa-check" />
                    <span>
                      Send private feedback or public messages to all creatives
                    </span>
                  </p>
                  <p>
                    <i className="fas fa-check" />
                    <span>
                      The more entries you rate - the submissions get better and
                      better
                    </span>
                  </p>
                </article>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}gif/3-compressed.gif`}
                  alt="compressed"
                />
              </section>
            </section>
            <article className={styles.headerBar}>
              <h3>Names For Sale</h3>
              <p className={styles.blueUnderline}>
                Not interested in launching a contest? Purchase a name instantly
                from our hand-picked collection of premium names. Price includes
                a complimentary Trademark Report, a Domain name as well as a
                Logo design
              </p>
            </article>
            <SlideBar
              images={carouselConstants.exampleSliderImages}
              carouselType={carouselConstants.EXAMPLE_SLIDER}
            />
            <section className={styles.button}>
              <Link className={styles.button__link} to="/dashboard">
                DASHBOARD
              </Link>
            </section>
            <article className={styles.blueContainer}>
              <h2 className={styles.whiteUnderline}>What our customers say</h2>
              <SlideBar
                images={carouselConstants.feedbackSliderImages}
                carouselType={carouselConstants.FEEDBACK_SLIDER}
              />
            </article>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { isFetching } = state.userStore;
  return { isFetching };
};

export default connect(mapStateToProps, null)(Home);
