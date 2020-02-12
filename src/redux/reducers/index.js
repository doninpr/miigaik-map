import { combineReducers } from "redux";
import mapbox from "./mapbox";
import window from "./window";
import apollo from "./apollo";
import floorSwitcher from "./floorSwitcher";
import infoBlock from "./infoBlock";


export default combineReducers({
	mapbox,
	window,
	floorSwitcher,
	infoBlock
});
