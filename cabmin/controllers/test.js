/**
 * Created by igor on 04.10.16.
 */

var list = {
	test : {
		method : (req, res) => {
			res.render('helloy');
		},
		title : 'Helloy',
		showInMenu : true,
		dropmenu : false
	}
};

var list2 = {
	init : () => {
		// TODO: clear
		console.log('CALLL') ;
	}
};

module.exports = list2;
//module.exports.init = () => list2;

