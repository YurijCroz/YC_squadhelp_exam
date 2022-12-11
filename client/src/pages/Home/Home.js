import React from "react";
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
import FlexibleContainer from "../../components/FlexibleContainer/FlexibleContainer.jsx";
import flexibleContent from "./flexibleContent.json";
import AnimationText from "./AnimationText";

const Home = ({ isFetching }) => {
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
                <AnimationText />
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
              <div style={{ position: "relative" }}>
                <SlideBar
                  images={carouselConstants.mainSliderImages}
                  carouselType={carouselConstants.MAIN_SLIDER}
                />
              </div>
            </section>
            <article className={styles.container__description}>
              <h2 className={styles.blueUnderline}>Why Squadhelp?</h2>
              <SpreadCards cards={cardsContent} />
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
            <FlexibleContainer
              content={flexibleContent.stepOne}
              rowReverse={true}
            />
            <FlexibleContainer
              content={flexibleContent.stepTwo}
              backgroundColor={"#28D2D0"}
              color={"white"}
            />
            <FlexibleContainer
              content={flexibleContent.stepThree}
              backgroundColor={"#FAFAFA"}
              rowReverse={true}
            />
            <article className={styles.headerBar}>
              <h3>Names For Sale</h3>
              <p className={styles.blueUnderline}>
                Not interested in launching a contest? Purchase a name instantly
                from our hand-picked collection of premium names. Price includes
                a complimentary Trademark Report, a Domain name as well as a
                Logo design
              </p>
            </article>
            <section style={{ position: "relative" }}>
              <SlideBar
                images={carouselConstants.exampleSliderImages}
                carouselType={carouselConstants.EXAMPLE_SLIDER}
              />
            </section>
            <section className={styles.button}>
              <Link className={styles.button__link} to="/dashboard">
                DASHBOARD
              </Link>
            </section>
            <article className={styles.blueContainer}>
              <h2 className={styles.whiteUnderline}>What our customers say</h2>
              <div style={{ position: "relative" }}>
                <SlideBar
                  images={carouselConstants.feedbackSliderImages}
                  carouselType={carouselConstants.FEEDBACK_SLIDER}
                />
              </div>
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
