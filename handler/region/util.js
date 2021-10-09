// SET UP
const regionData = require('../../data/region');

// ERROR
const { newError } = require('../../util/error');

// redirection
async function dashboardRedirect(req, res, next) {
	try {
		// collect data
		return res.redirect(req.baseUrl + '/' + req.params.id + '/tableau-de-bord/taux-de-couverture-des-pdr')
	} catch (error) {
		console.log(error);
		return next(newError(500, "quelque chose s'est mal passé"));
	}
}

// SETTINGS
async function settings(req, res, next) {
	try {
		// collect data
		var data = {};
		// get the document of the region
		data.document = await regionData.getDocument(req.params.id);
		// render the page
		res.status(200).render('region/settings', {
			title: data.document.region + ' | Paramètres',
			data,
		});
	} catch (error) {
		console.log(error);
		return next(error);
	}
}

module.exports = {
	dashboardRedirect,
	settings
};