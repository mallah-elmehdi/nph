// SET UP
const santeMaternelle = require('../../../model/csr/rapport/santeMaternelle');

// ERROR
const { newError } = require('../../../util/error');

async function getSanteMaternelleBySortie(sortie) {
	try {
		return await santeMaternelle.findOne({
			sortie,
		});
	} catch (error) {
		console.log(error);
		throw newError(500, "quelque chose s'est mal passé");
	}
}

// GET
async function getSanteMaternelleById(id) {
	try {
		return await santeMaternelle.findById(id).select('-csr');
	} catch (error) {
		console.log(error);
		throw newError(500, "quelque chose s'est mal passé");
	}
}

// ADD
async function addSanteMaternelle(csr, sortie, trimestre, body) {
	try {
		// update the body
		body.csr = csr;
		body.trimestre = trimestre;
		body.sortie = sortie;
		body.femmePriseCharge =
			parseInt(body.autreConsultation) +
			parseInt(body.garDepiste) +
			parseInt(body.femmeExaminePostNatal) +
			parseInt(body.vat) +
			parseInt(body.cpn.nouvelleInscrite.t1) +
			parseInt(body.cpn.nouvelleInscrite.t2) +
			parseInt(body.cpn.nouvelleInscrite.t3) +
			parseInt(body.cpn.ancienneInscrite.t1) +
			parseInt(body.cpn.ancienneInscrite.t2) +
			parseInt(body.cpn.ancienneInscrite.t3);
		// edit document
		// add document
		var document = await santeMaternelle.create(body);
		// return the id of document
		return document.id;
	} catch (error) {
		console.log(error);
		throw newError(500, "quelque chose s'est mal passé");
	}
}

// EDIT
async function editSanteMaternelleById(id, body) {
	try {
		body.femmePriseCharge =
			parseInt(body.autreConsultation) +
			parseInt(body.garDepiste) +
			parseInt(body.femmeExaminePostNatal) +
			parseInt(body.vat) +
			parseInt(body.cpn.nouvelleInscrite.t1) +
			parseInt(body.cpn.nouvelleInscrite.t2) +
			parseInt(body.cpn.nouvelleInscrite.t3) +
			parseInt(body.cpn.ancienneInscrite.t1) +
			parseInt(body.cpn.ancienneInscrite.t2) +
			parseInt(body.cpn.ancienneInscrite.t3);
		// edit document
		var document = await santeMaternelle.findByIdAndUpdate(id, body);
		// return the id of document
		return document.id;
	} catch (error) {
		console.log(error);
		throw newError(500, "quelque chose s'est mal passé");
	}
}

// DELETE
async function deleteSanteMaternelleById(id) {
	try {
		// delete document
		return await santeMaternelle.findByIdAndDelete(id);


	} catch (error) {
		console.log(error);
		throw newError(500, "quelque chose s'est mal passé");
	}
}

// OUTPUT
module.exports = {
	getSanteMaternelleBySortie,
	addSanteMaternelle,
	getSanteMaternelleById,
	editSanteMaternelleById,
	deleteSanteMaternelleById,
};