import main_indoor2 from './main/floors/indoor/2.geojson';
import main_indoor3 from './main/floors/indoor/3.geojson';
import main_indoor4 from './main/floors/indoor/4.geojson';
import main_indoor5 from './main/floors/indoor/5.geojson';
import main_indoor6 from './main/floors/indoor/6.geojson';
import main_outer2 from './main/floors/outer/2.geojson';
import main_outer3 from './main/floors/outer/3.geojson';
import main_outer4 from './main/floors/outer/4.geojson';
import main_outer5 from './main/floors/outer/5.geojson';
import main_outer6 from './main/floors/outer/5.geojson';
import main_points2 from './main/floors/points/4.geojson';
import main_points3 from './main/floors/points/4.geojson';
import main_points4 from './main/floors/points/4.geojson';
import main_points5 from './main/floors/points/5.geojson';
import main_points6 from './main/floors/points/6.geojson';



export const floorsGeometry = {
	"main": {
		"2": {
			"indoor": main_indoor2,
			"outer": main_outer2,
			"points": main_points2,
		},
		"3": {
			"indoor": main_indoor3,
			"outer": main_outer3,
			"points": main_points3,
		},
		"4": {
			"indoor": main_indoor4,
			"outer": main_outer4,
			"points": main_points4,
		},
		"5": {
			"indoor": main_indoor5,
			"outer": main_outer5,
			"points": main_points5,
		},
		"6": {
			"indoor": main_indoor6,
			"outer": main_outer6,
			"points": main_points6,
		},
	},
}