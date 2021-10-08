// SET UP
const fs = require('fs');
const regionData = require('../../data/region');
const planActionData = require('../../data/csr/planAction/planAction');

// ERROR
const { newError } = require('../../util/error');

// JSON
const region = JSON.parse(
	fs.readFileSync(`${__dirname}/../../static/json/region.json`)
);
const province = JSON.parse(
	fs.readFileSync(`${__dirname}/../../static/json/province.json`)
);
const csr = JSON.parse(
	fs.readFileSync(`${__dirname}/../../static/json/csr.json`)
);

function getRegionCode(reg) {
	for (let i = 0; i < region.length; i++) {
		const regElement = region[i];
		if (regElement.region === reg) {
			return regElement.codeRegion;
		}
	}
}

function getProvinceList(reg) {
	var list = [];
	for (let i = 0; i < province.length; i++) {
		const provinceElement = province[i];
		if (provinceElement.region === reg) {
			list.push(provinceElement.codeProvince);
		}
	}
	return list;
}

function getDataInitPlanActionProvince(list) {
	var datainit = {};
	for (let i = 0; i < list.length; i++) {
		const listElement = list[i];
		datainit[listElement] = {
			population: {
				population: {
					cible: 0,
					habitantMoins3km: 0,
					habitantEntre3km6km: 0,
					habitantEntre6km10km: 0,
					habitantPlus10km: 0,
				},
				distanceMoyenneRouteProche: 0,
				indiceSynthetiqueFecondite: 0,
				naissancesAttendues: 0,
				far: 0,
				fmar: 0,
				enfant: {
					moins1ans: 0,
					moins5ans: 0,
				},
				femmeEnceinte: 0,
				personneAge: 0,
			},
			programme: {},
			pdr: {},
			ressource: {
				ms: {},
				commune: {},
			},
			ressourceHumain: {
				fix: {
					medecin: 0,
					infirmier: 0,
					sageFemme: 0,
					technicien: 0,
					chauffeur: 0,
					appuie: 0,
				},
				mobile: {
					medecin: 0,
					infirmier: 0,
					sageFemme: 0,
					technicien: 0,
					chauffeur: 0,
					appuie: 0,
				},
			},
		};
	}
	return datainit;
}

function getProvinceCode(pro) {
	for (let i = 0; i < province.length; i++) {
		const provinceElement = province[i];
		if (provinceElement.province === pro) {
			return provinceElement.codeProvince;
		}
	}
}

// DATA REGION
async function dataRegion(region) {
	try {
		var codeRegion = getRegionCode(region),
			data = {
				[codeRegion]: {
					population: {
						population: {
							cible: 0,
							habitantMoins3km: 0,
							habitantEntre3km6km: 0,
							habitantEntre6km10km: 0,
							habitantPlus10km: 0,
						},
						distanceMoyenneRouteProche: 0,
						indiceSynthetiqueFecondite: 0,
						naissancesAttendues: 0,
						far: 0,
						fmar: 0,
						enfant: {
							moins1ans: 0,
							moins5ans: 0,
						},
						femmeEnceinte: 0,
						personneAge: 0,
					},
					programme: {},
					pdr: {},
					ressource: {
						ms: {},
						commune: {},
					},
					ressourceHumain: {
						fix: {
							medecin: 0,
							infirmier: 0,
							sageFemme: 0,
							technicien: 0,
							chauffeur: 0,
							appuie: 0,
						},
						mobile: {
							medecin: 0,
							infirmier: 0,
							sageFemme: 0,
							technicien: 0,
							chauffeur: 0,
							appuie: 0,
						},
					},
				},
			},
			planAction = await planActionData.getPlanActionByRegionAndYear(
				region
			);
		// ------------------------
		// planAction
		for (let j = 0; j < planAction.length; j++) {
			const planActionElement = planAction[j];
			// POPULATION
			data[codeRegion].population.population.cible +=
				planActionElement.population.population.cible;
			data[codeRegion].population.population.habitantMoins3km +=
				planActionElement.population.population.habitantMoins3km;
			data[codeRegion].population.population.habitantEntre3km6km +=
				planActionElement.population.population.habitantEntre3km6km;
			data[codeRegion].population.population.habitantEntre6km10km +=
				planActionElement.population.population.habitantEntre6km10km;
			data[codeRegion].population.population.habitantPlus10km +=
				planActionElement.population.population.habitantPlus10km;
			data[codeRegion].population.distanceMoyenneRouteProche +=
				planActionElement.population.distanceMoyenneRouteProche;
			data[codeRegion].population.indiceSynthetiqueFecondite +=
				planActionElement.population.indiceSynthetiqueFecondite;
			data[codeRegion].population.naissancesAttendues +=
				planActionElement.population.naissancesAttendues;
			data[codeRegion].population.far += planActionElement.population.far;
			data[codeRegion].population.fmar +=
				planActionElement.population.fmar;
			data[codeRegion].population.enfant.moins1ans +=
				planActionElement.population.enfant.moins1ans;
			data[codeRegion].population.enfant.moins5ans +=
				planActionElement.population.enfant.moins5ans;
			data[codeRegion].population.femmeEnceinte +=
				planActionElement.population.femmeEnceinte;
			data[codeRegion].population.personneAge +=
				planActionElement.population.personneAge;
			// RESSOURCE
			for (let r = 0; r < planActionElement.ressource.length; r++) {
				const ressourceElement = planActionElement.ressource[r];
				if (ressourceElement.appartenance === 'Commune') {
					if (
						data[codeRegion].ressource.commune[
							planActionElement.csr.cs
						]
					) {
						data[codeRegion].ressource.commune[
							planActionElement.csr.cs
						].push({
							type: ressourceElement.type,
							age: ressourceElement.age,
							besoinUsm: ressourceElement.besoinUsm,
							budget: ressourceElement.budget,
							observation: ressourceElement.observation,
							csr: {
								name: planActionElement.csr.csr,
								category: planActionElement.csr.category,
							},
						});
					} else {
						data[codeRegion].ressource.commune[
							planActionElement.csr.cs
						] = [];
						data[codeRegion].ressource.commune[
							planActionElement.csr.cs
						].push({
							type: ressourceElement.type,
							age: ressourceElement.age,
							besoinUsm: ressourceElement.besoinUsm,
							budget: ressourceElement.budget,
							observation: ressourceElement.observation,
							csr: {
								name: planActionElement.csr.csr,
								category: planActionElement.csr.category,
							},
						});
					}
				} else if (
					ressourceElement.appartenance === 'Ministre de la santé'
				) {
					if (
						data[codeRegion].ressource.ms[planActionElement.csr.cs]
					) {
						data[codeRegion].ressource.ms[
							planActionElement.csr.cs
						].push({
							type: ressourceElement.type,
							age: ressourceElement.age,
							besoinUsm: ressourceElement.besoinUsm,
							budget: ressourceElement.budget,
							observation: ressourceElement.observation,
							csr: {
								name: planActionElement.csr.csr,
								category: planActionElement.csr.category,
							},
						});
					} else {
						data[codeRegion].ressource.ms[
							planActionElement.csr.cs
						] = [];
						data[codeRegion].ressource.ms[
							planActionElement.csr.cs
						].push({
							type: ressourceElement.type,
							age: ressourceElement.age,
							besoinUsm: ressourceElement.besoinUsm,
							budget: ressourceElement.budget,
							observation: ressourceElement.observation,
							csr: {
								name: planActionElement.csr.csr,
								category: planActionElement.csr.category,
							},
						});
					}
				}
			}
			// ressource humain
			data[codeRegion].ressourceHumain.fix.medecin +=
				planActionElement.ressourceHumain.fix.medecin;
			data[codeRegion].ressourceHumain.fix.infirmier +=
				planActionElement.ressourceHumain.fix.infirmier;
			data[codeRegion].ressourceHumain.fix.sageFemme +=
				planActionElement.ressourceHumain.fix.sageFemme;
			data[codeRegion].ressourceHumain.fix.technicien +=
				planActionElement.ressourceHumain.fix.technicien;
			data[codeRegion].ressourceHumain.fix.chauffeur +=
				planActionElement.ressourceHumain.fix.chauffeur;
			data[codeRegion].ressourceHumain.fix.appuie +=
				planActionElement.ressourceHumain.fix.appuie;
			data[codeRegion].ressourceHumain.mobile.medecin +=
				planActionElement.ressourceHumain.mobile.medecin;
			data[codeRegion].ressourceHumain.mobile.infirmier +=
				planActionElement.ressourceHumain.mobile.infirmier;
			data[codeRegion].ressourceHumain.mobile.sageFemme +=
				planActionElement.ressourceHumain.mobile.sageFemme;
			data[codeRegion].ressourceHumain.mobile.technicien +=
				planActionElement.ressourceHumain.mobile.technicien;
			data[codeRegion].ressourceHumain.mobile.chauffeur +=
				planActionElement.ressourceHumain.mobile.chauffeur;
			data[codeRegion].ressourceHumain.mobile.appuie +=
				planActionElement.ressourceHumain.mobile.appuie;
			// PDR
			for (let p = 0; p < planActionElement.programme.length; p++) {
				const programmeElement = planActionElement.programme[p];
				if (data[codeRegion].pdr[planActionElement.csr.province]) {
					if (
						data[codeRegion].pdr[planActionElement.csr.province][
							planActionElement.csr.commune
						]
					) {
						data[codeRegion].pdr[planActionElement.csr.province][
							planActionElement.csr.commune
						].push({
							pdr: programmeElement.pdr,
							localite: programmeElement.localite,
						});
					} else {
						data[codeRegion].pdr[planActionElement.csr.province][
							planActionElement.csr.commune
						] = [];
						data[codeRegion].pdr[planActionElement.csr.province][
							planActionElement.csr.commune
						].push({
							pdr: programmeElement.pdr,
							localite: programmeElement.localite,
						});
					}
				} else {
					data[codeRegion].pdr[planActionElement.csr.province] = {};
					data[codeRegion].pdr[planActionElement.csr.province][
						planActionElement.csr.commune
					] = [];
					data[codeRegion].pdr[planActionElement.csr.province][
						planActionElement.csr.commune
					].push({
						pdr: programmeElement.pdr,
						localite: programmeElement.localite,
					});
				}
			}
			// PROGRAMME
			for (let p = 0; p < planActionElement.programme.length; p++) {
				const programmeElement = planActionElement.programme[p];
				if (
					data[codeRegion].programme[planActionElement.csr.province]
				) {
					if (
						data[codeRegion].programme[
							planActionElement.csr.province
						][planActionElement.csr.commune]
					) {
						data[codeRegion].programme[
							planActionElement.csr.province
						][planActionElement.csr.commune].push({
							pdr: programmeElement.pdr,
							t1: programmeElement.t1,
							t2: programmeElement.t2,
							t3: programmeElement.t3,
							t4: programmeElement.t4,
						});
					} else {
						data[codeRegion].programme[
							planActionElement.csr.province
						][planActionElement.csr.commune] = [];
						data[codeRegion].programme[
							planActionElement.csr.province
						][planActionElement.csr.commune].push({
							pdr: programmeElement.pdr,
							t1: programmeElement.t1,
							t2: programmeElement.t2,
							t3: programmeElement.t3,
							t4: programmeElement.t4,
						});
					}
				} else {
					data[codeRegion].programme[planActionElement.csr.province] =
						{};
					data[codeRegion].programme[planActionElement.csr.province][
						planActionElement.csr.commune
					] = [];
					data[codeRegion].programme[planActionElement.csr.province][
						planActionElement.csr.commune
					].push({
						pdr: programmeElement.pdr,
						t1: programmeElement.t1,
						t2: programmeElement.t2,
						t3: programmeElement.t3,
						t4: programmeElement.t4,
					});
				}
			}
		}
		return data;
	} catch (error) {
		console.log(error);
		throw newError(500, "quelque chose s'est mal passé");
	}
}

// DATA REGION
async function dataProvince(region, provinceList) {
	try {
		var data = getDataInitPlanActionProvince(provinceList),
			planAction = await planActionData.getPlanActionByRegionAndYear(
				region
			);
		// ------------------------
		// province
		for (let i = 0; i < provinceList.length; i++) {
			const provinceListElement = provinceList[i];
			// planAction
			for (let j = 0; j < planAction.length; j++) {
				const planActionElement = planAction[j];
				if (
					provinceListElement ===
					getProvinceCode(planActionElement.csr.province)
				) {
					// POPULATION
					data[provinceListElement].population.population.cible +=
						planActionElement.population.population.cible;
					data[
						provinceListElement
					].population.population.habitantMoins3km +=
						planActionElement.population.population.habitantMoins3km;
					data[
						provinceListElement
					].population.population.habitantEntre3km6km +=
						planActionElement.population.population.habitantEntre3km6km;
					data[
						provinceListElement
					].population.population.habitantEntre6km10km +=
						planActionElement.population.population.habitantEntre6km10km;
					data[
						provinceListElement
					].population.population.habitantPlus10km +=
						planActionElement.population.population.habitantPlus10km;
					data[
						provinceListElement
					].population.distanceMoyenneRouteProche +=
						planActionElement.population.distanceMoyenneRouteProche;
					data[
						provinceListElement
					].population.indiceSynthetiqueFecondite +=
						planActionElement.population.indiceSynthetiqueFecondite;
					data[provinceListElement].population.naissancesAttendues +=
						planActionElement.population.naissancesAttendues;
					data[provinceListElement].population.far +=
						planActionElement.population.far;
					data[provinceListElement].population.fmar +=
						planActionElement.population.fmar;
					data[provinceListElement].population.enfant.moins1ans +=
						planActionElement.population.enfant.moins1ans;
					data[provinceListElement].population.enfant.moins5ans +=
						planActionElement.population.enfant.moins5ans;
					data[provinceListElement].population.femmeEnceinte +=
						planActionElement.population.femmeEnceinte;
					data[provinceListElement].population.personneAge +=
						planActionElement.population.personneAge;
					// RESSOURCE
					for (
						let r = 0;
						r < planActionElement.ressource.length;
						r++
					) {
						const ressourceElement = planActionElement.ressource[r];
						if (ressourceElement.appartenance === 'Commune') {
							if (
								data[provinceListElement].ressource.commune[
									planActionElement.csr.cs
								]
							) {
								data[provinceListElement].ressource.commune[
									planActionElement.csr.cs
								].push({
									type: ressourceElement.type,
									age: ressourceElement.age,
									besoinUsm: ressourceElement.besoinUsm,
									budget: ressourceElement.budget,
									observation: ressourceElement.observation,
									csr: {
										name: planActionElement.csr.csr,
										category:
											planActionElement.csr.category,
									},
								});
							} else {
								data[provinceListElement].ressource.commune[
									planActionElement.csr.cs
								] = [];
								data[provinceListElement].ressource.commune[
									planActionElement.csr.cs
								].push({
									type: ressourceElement.type,
									age: ressourceElement.age,
									besoinUsm: ressourceElement.besoinUsm,
									budget: ressourceElement.budget,
									observation: ressourceElement.observation,
									csr: {
										name: planActionElement.csr.csr,
										category:
											planActionElement.csr.category,
									},
								});
							}
						} else if (
							ressourceElement.appartenance ===
							'Ministre de la santé'
						) {
							if (
								data[provinceListElement].ressource.ms[
									planActionElement.csr.cs
								]
							) {
								data[provinceListElement].ressource.ms[
									planActionElement.csr.cs
								].push({
									type: ressourceElement.type,
									age: ressourceElement.age,
									besoinUsm: ressourceElement.besoinUsm,
									budget: ressourceElement.budget,
									observation: ressourceElement.observation,
									csr: {
										name: planActionElement.csr.csr,
										category:
											planActionElement.csr.category,
									},
								});
							} else {
								data[provinceListElement].ressource.ms[
									planActionElement.csr.cs
								] = [];
								data[provinceListElement].ressource.ms[
									planActionElement.csr.cs
								].push({
									type: ressourceElement.type,
									age: ressourceElement.age,
									besoinUsm: ressourceElement.besoinUsm,
									budget: ressourceElement.budget,
									observation: ressourceElement.observation,
									csr: {
										name: planActionElement.csr.csr,
										category:
											planActionElement.csr.category,
									},
								});
							}
						}
					}
					// ressource humain
					data[provinceListElement].ressourceHumain.fix.medecin +=
						planActionElement.ressourceHumain.fix.medecin;
					data[provinceListElement].ressourceHumain.fix.infirmier +=
						planActionElement.ressourceHumain.fix.infirmier;
					data[provinceListElement].ressourceHumain.fix.sageFemme +=
						planActionElement.ressourceHumain.fix.sageFemme;
					data[provinceListElement].ressourceHumain.fix.technicien +=
						planActionElement.ressourceHumain.fix.technicien;
					data[provinceListElement].ressourceHumain.fix.chauffeur +=
						planActionElement.ressourceHumain.fix.chauffeur;
					data[provinceListElement].ressourceHumain.fix.appuie +=
						planActionElement.ressourceHumain.fix.appuie;
					data[provinceListElement].ressourceHumain.mobile.medecin +=
						planActionElement.ressourceHumain.mobile.medecin;
					data[
						provinceListElement
					].ressourceHumain.mobile.infirmier +=
						planActionElement.ressourceHumain.mobile.infirmier;
					data[
						provinceListElement
					].ressourceHumain.mobile.sageFemme +=
						planActionElement.ressourceHumain.mobile.sageFemme;
					data[
						provinceListElement
					].ressourceHumain.mobile.technicien +=
						planActionElement.ressourceHumain.mobile.technicien;
					data[
						provinceListElement
					].ressourceHumain.mobile.chauffeur +=
						planActionElement.ressourceHumain.mobile.chauffeur;
					data[provinceListElement].ressourceHumain.mobile.appuie +=
						planActionElement.ressourceHumain.mobile.appuie;
					// PDR
					for (
						let p = 0;
						p < planActionElement.programme.length;
						p++
					) {
						const programmeElement = planActionElement.programme[p];

						if (
							data[provinceListElement].pdr[
								planActionElement.csr.commune
							]
						) {
							data[provinceListElement].pdr[
								planActionElement.csr.commune
							].push({
								pdr: programmeElement.pdr,
								localite: programmeElement.localite,
							});
						} else {
							data[provinceListElement].pdr[
								planActionElement.csr.commune
							] = [];
							data[provinceListElement].pdr[
								planActionElement.csr.commune
							].push({
								pdr: programmeElement.pdr,
								localite: programmeElement.localite,
							});
						}
					}
					// PROGRAMME
					for (
						let p = 0;
						p < planActionElement.programme.length;
						p++
					) {
						const programmeElement = planActionElement.programme[p];

						if (
							data[provinceListElement].programme[
								planActionElement.csr.commune
							]
						) {
							data[provinceListElement].programme[
								planActionElement.csr.commune
							].push({
								pdr: programmeElement.pdr,
								t1: programmeElement.t1,
								t2: programmeElement.t2,
								t3: programmeElement.t3,
								t4: programmeElement.t4,
							});
						} else {
							data[provinceListElement].programme[
								planActionElement.csr.commune
							] = [];
							data[provinceListElement].programme[
								planActionElement.csr.commune
							].push({
								pdr: programmeElement.pdr,
								t1: programmeElement.t1,
								t2: programmeElement.t2,
								t3: programmeElement.t3,
								t4: programmeElement.t4,
							});
						}
					}
				}
			}
		}
		return data;
	} catch (error) {
		console.log(error);
		throw newError(500, "quelque chose s'est mal passé");
	}
}

async function tauxDataRegion(region) {
	try {
		var data = {},
			planAction = await planActionData.getPlanActionByRegionAndYear(
				region
			),
			listData = {
				1: [],
				2: [],
				3: [],
				4: [],
				5: [],
				6: [],
				7: [],
				8: [],
				9: [],
				10: [],
				11: [],
				12: [],
			};
		for (let i = 0; i < csr.length; i++) {
			const csrElement = csr[i];
			var exist = false;
			// planAction
			for (let j = 0; j < planAction.length; j++) {
				const planActionElement = planAction[j];
				// -----------------------------------
				if (
					planActionElement.csr.region === csrElement.region &&
					planActionElement.csr.province === csrElement.province &&
					planActionElement.csr.csr === csrElement.name
				) {
					exist = true;
				}
			}
			if (exist) {
				listData[csrElement.codeRegion].push(100);
			} else {
				listData[csrElement.codeRegion].push(0);
			}
		}
		for (const key in listData) {
			const array = listData[key];
			var res,
				total = 0;
			for (let a = 0; a < array.length; a++) {
				total += array[a];
			}
			if (array.length) res = parseFloat(total / array.length);
			if (res === 0) {
				data[key] = 0;
			} else if (res < 1) {
				data[key] = res.toFixed(1);
			} else {
				data[key] = parseInt(res);
			}
		}
		return data;
	} catch (error) {
		console.log(error);
		throw newError(500, "quelque chose s'est mal passé");
	}
}

async function tauxDataProvince(region) {
	try {
		var data = {},
			planAction = await planActionData.getPlanActionByRegionAndYear(
				region
			),
			listData = {
				1: [],
				2: [],
				3: [],
				4: [],
				5: [],
				6: [],
				7: [],
				8: [],
				9: [],
				10: [],
				11: [],
				12: [],
				13: [],
				14: [],
				15: [],
				16: [],
				17: [],
				18: [],
				19: [],
				20: [],
				21: [],
				22: [],
				23: [],
				24: [],
				25: [],
				26: [],
				27: [],
				28: [],
				29: [],
				30: [],
				31: [],
				32: [],
				33: [],
				34: [],
				35: [],
				36: [],
				37: [],
				38: [],
				39: [],
				40: [],
				41: [],
				42: [],
				43: [],
				44: [],
				45: [],
				46: [],
				47: [],
				48: [],
				49: [],
				50: [],
				51: [],
				52: [],
				53: [],
				54: [],
				55: [],
				56: [],
				57: [],
				58: [],
				59: [],
				60: [],
				61: [],
				62: [],
				63: [],
				64: [],
				65: [],
				66: [],
				67: [],
				68: [],
				69: [],
				70: [],
				71: [],
				72: [],
				73: [],
				74: [],
				75: [],
			};
		for (let i = 0; i < csr.length; i++) {
			const csrElement = csr[i];
			var exist = false;
			// planAction
			for (let j = 0; j < planAction.length; j++) {
				const planActionElement = planAction[j];
				// -----------------------------------
				if (
					planActionElement.csr.region === csrElement.region &&
					planActionElement.csr.province === csrElement.province &&
					planActionElement.csr.csr === csrElement.name
				) {
					exist = true;
				}
			}
			if (exist) {
				listData[csrElement.codeProvince].push(100);
			} else {
				listData[csrElement.codeProvince].push(0);
			}
		}
		for (const key in listData) {
			const array = listData[key];
			var res,
				total = 0;
			if (!array.length) listData[key].push(0);
			for (let a = 0; a < array.length; a++) {
				total += array[a];
			}
			res = parseFloat(total / array.length);
			if (res === 0) {
				data[key] = 0;
			} else if (res < 1) {
				data[key] = res.toFixed(1);
			} else {
				data[key] = parseInt(res);
			}
		}
		return data;
	} catch (error) {
		console.log(error);
		throw newError(500, "quelque chose s'est mal passé");
	}
}

// get the dashbord
async function planAction(req, res, next) {
	try {
		// collect data
		var data = {},
			today = new Date(),
			provinceList;
		// get the document of the region
		data.document = await regionData.getDocument(req.params.id);
		// list province
		provinceList = getProvinceList(data.document.region);
		// taux de remplissage
		data.carte = {
			region: await tauxDataRegion(data.document.region),
			province: await tauxDataProvince(data.document.region),
		};
		// pla action
		data.planAction = {
			region: await dataRegion(data.document.region),
			province: await dataProvince(data.document.region, provinceList),
		};
		// render the page
		res.status(200).render('region/planAction', {
			title:
				'Tableau de bord | Plan Action | ' +
				today.getFullYear(),
			url: req.originalUrl,
			data,
			region,
			province,
			provinceList,
			page: 'planAction',
			listItem: 'planAction',
		});
	} catch (error) {
		console.log(error);
		return next(newError(500, "quelque chose s'est mal passé"));
	}
}

// output
module.exports = {
	planAction,
};
