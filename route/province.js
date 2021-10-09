// --- SET UP
const express = require('express');
const router = express.Router();

// --- HAMDLER
const pdrVisite = require('../handler/province/dashboard/pdrVisite');
const populationCible = require('../handler/province/dashboard/populationCible');
const ressource = require('../handler/province/dashboard/ressource');
const santeMaternelle = require('../handler/province/dashboard/santeMaternelle');
const santeInfantile = require('../handler/province/dashboard/santeInfantile');
const planificationFamiliale = require('../handler/province/dashboard/planificationFamiliale');
const santeScolaire = require('../handler/province/dashboard/santeScolaire');
const consultationMedical = require('../handler/province/dashboard/consultationMedical');
const maladieDepiste = require('../handler/province/dashboard/maladieDepiste');
const planAction = require('../handler/province/planAction');
const rapport = require('../handler/province/rapport');
const dashboardUtilHandler = require('../handler/province/util');
const utilHandler = require('../handler/util');
const authHandler = require('../handler/auth');
const errorHandler = require('../handler/error');
// -------------

// redirect to dashboard
router.route('/').get(utilHandler.redirect, errorHandler.throwError);

// redirction to charts
router
	.route('/:id')
	.get(authHandler.protector, dashboardUtilHandler.dashboardRedirect, errorHandler.throwError);

// redirction to charts
router
	.route('/:id/tableau-de-bord')
	.get(authHandler.protector, dashboardUtilHandler.dashboardRedirect, errorHandler.throwError);

// pdrVisite
router
	.route('/:id/tableau-de-bord/taux-de-couverture-des-pdr')
	.get(authHandler.protector, pdrVisite.pdrVisite, errorHandler.throwError);

// populationCible
router
	.route('/:id/tableau-de-bord/population-cible')
	.get(authHandler.protector, populationCible.populationCible, errorHandler.throwError);

// ressource
router
	.route('/:id/tableau-de-bord/ressource')
	.get(authHandler.protector, ressource.ressource, errorHandler.throwError);
// santeMaternelle
router
	.route('/:id/tableau-de-bord/sante-maternelle')
	.get(authHandler.protector, santeMaternelle.santeMaternelle, errorHandler.throwError);
// santeInfantile
router
	.route('/:id/tableau-de-bord/sante-infantile')
	.get(authHandler.protector, santeInfantile.santeInfantile, errorHandler.throwError);
// planificationFamiliale
router
	.route('/:id/tableau-de-bord/planification-familiale')
	.get(authHandler.protector, planificationFamiliale.planificationFamiliale, errorHandler.throwError);
// santeScolaire
router
	.route('/:id/tableau-de-bord/sante-scolaire')
	.get(authHandler.protector, santeScolaire.santeScolaire, errorHandler.throwError);
// consultationMedical
router
	.route('/:id/tableau-de-bord/consultation-medical')
	.get(authHandler.protector, consultationMedical.consultationMedical, errorHandler.throwError);
// maladieDepiste
router
	.route('/:id/tableau-de-bord/maladie-depiste')
	.get(authHandler.protector, maladieDepiste.maladieDepiste, errorHandler.throwError);

// ------------------------------------------------------------------------------------------------

// plan d'action
router.route('/:id/plan-action').get(
	authHandler.protector,
	planAction.planAction,
	errorHandler.throwError
);

// rapport
router.route('/:id/trimestre/:trimestre').get(
	authHandler.protector,
	rapport.rapport,
	errorHandler.throwError
);

// settings
router.route('/:id/settings').get(
	authHandler.protector,
	dashboardUtilHandler.settings,
	errorHandler.throwError
);

module.exports = router;