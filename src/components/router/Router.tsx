// @Vendors
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

// @Views
import VideoOverview from 'views/videoOverview/VideoOverview';

// @Constants
import { StoreState } from 'constants/stateTypes';
import { SliderRef } from 'constants/types';

// @Components
import FooterBar from 'components/footerBar/FooterBar';
import Topbar from 'components/topbar/Topbar';

// @Styles
import styles from './Router.module.scss';

// @Proptypes
interface StateProps {
  registeredSliders: SliderRef[];
}

type PropTypes = StateProps;

const Routes: React.FunctionComponent<PropTypes> = (props: PropTypes) => (
  <Router>
    <div className={styles.container}>
      <Topbar
        anchors={props.registeredSliders}/>
      <Route path="/" exact component={VideoOverview} />
      <FooterBar />
    </div>
  </Router>
);

const mapStateToProps = (state: StoreState): StateProps => ({
  registeredSliders: state.slidersReducer.registeredSliders
});

const mapDispatchToProps = (): {} => ({});

export default connect<StateProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
