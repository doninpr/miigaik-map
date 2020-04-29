import React from "react";
import { connect } from "react-redux";
import $ from 'jquery';
import MapBox from "./components/MapBox/MapBox";
import FloorSwitcher from "./components/FloorSwitcher/FloorSwitcher";
import InfoBlock from "./components/InfoBlock/InfoBlock";
import BottomBar from "./components/BottomBar/BottomBar";
import ModalComponent from "./components/Modals/ModalComponent/ModalComponent";
import { MAPBOX } from "./constants";
import { changeWindowSize } from './redux/actions';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImg from "./images/logo.png";

class App extends React.Component {
  	constructor(props) {
  		super(props);
  		this.props = props;

  		this.changeWindowSizeState = props.changeWindowSize;
  	}

  	componentWillMount(){
  		const changeWindowSizeState = () => {
  			const width = $(window).width();
  			const height = $(window).height();
  			this.changeWindowSizeState(width, height);
  		}

  		changeWindowSizeState();

  		const _this = this;
  		$(window).on('resize', function(){
  			changeWindowSizeState();
  		});
	}

  	render() {
  		return (
			<div className="railroads-app">
        <MapBox mapboxApiAccessToken={ MAPBOX.API_TOKEN } />
        {this.props.floorToView !== undefined &&
          <FloorSwitcher />
        }
        <div className="header_logo">
          <img src={logoImg} />
        </div>
        <BottomBar />
        <ModalComponent />
			</div>
		);
  	}
}

const mapStateToProps = state => {
  return {
    floorToView: state.mapbox.floors.floorToView,
    routeOnMap: state.apollo.route.isOnMap,
  };
};

export default connect(
  mapStateToProps,
  { changeWindowSize },
)(App);