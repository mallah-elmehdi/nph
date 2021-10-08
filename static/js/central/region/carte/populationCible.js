$(document).ready(function () {
	// VARIABLES
	var wholeData = $('#dataRegion').data('carte'),
		title = $('#title').text().split(' - ')[1],
		// init data
		dataPopulationCible = wholeData.populationCible.data,
		dataPopulationHabitantMoins3km =
			wholeData.populationHabitantMoins3km.data,
		dataPopulationHabitantEntre3km6km =
			wholeData.populationHabitantEntre3km6km.data,
		dataPopulationHabitantEntre6km10km =
			wholeData.populationHabitantEntre6km10km.data,
		dataPopulationHabitantPlus10km =
			wholeData.populationHabitantPlus10km.data,
		dataEnfantMoins1ans = wholeData.enfantMoins1ans.data,
		dataEnfantMoins5ans = wholeData.enfantMoins5ans.data,
		dataNaissancesAttendues = wholeData.naissancesAttendues.data,
		dataFar = wholeData.far.data,
		dataFmar = wholeData.fmar.data,
		dataFemmeEnceinte = wholeData.femmeEnceinte.data,
		dataDistanceMoyenneRouteProche =
			wholeData.distanceMoyenneRouteProche.data,
		dataIndiceSynthetiqueFecondite =
			wholeData.indiceSynthetiqueFecondite.data,
		dataPersonneAge = wholeData.personneAge.data,
		// other
		max = undefined,
		scale = ['#BDFFAD', '#187a00'],
		data = getData([dataPopulationCible]),
		table = 5;
	// MAP
	$('#region-map').vectorMap({
		map: 'region',
		series: {
			regions: [
				{
					values: data,
					scale,
					normalizeFunction: 'polynomial',
					max,
					legend: {
						horizontal: true,
						labelRender: function (v) {
							return v;
						},
					},
				},
			],
		},
		regionStyle: {
			initial: {
				stroke: '#000000',
				'stroke-width': 8,
			},
			hover: {
				stroke: '#000000',
				'stroke-width': 8,
				fill: '#6294ed',
			},
		},
		backgroundColor: '#a5bfdd',
		regionLabelStyle: {
			initial: {
				fill: '#000000',
			},
		},
		onRegionTipShow: function (event, label, code) {
			if (table === 5) {
				label.html(
					`
					<div class="bg-white shadow-sm p-1 rounded">
					<table class="table table-sm table-bordered fs-8 text-dark">
						<tbody>
							<tr>
								<th colspan="2" class="text-center">${label.html()}</th>
							</tr>
							
							<tr>
								<th colspan="2" class="text-center">${title} : <span class="fs-7"><span class="badge bg-5">${
						data[code]
					}</span></span></th>
							</tr>
							
							<tr>
								<td>Population habitant à moins de 3km</td>
								<td class="fs-7 text-center"><span class="badge bg-5">${
									dataPopulationHabitantMoins3km[code]
								}</span></td>
							</tr>
							
							<tr>
								<td>Population habitant entre 3km et 6km</td>
								<td class="fs-7 text-center"><span class="badge bg-5">${
									dataPopulationHabitantEntre3km6km[code]
								}</span></td>
							</tr>
							
							<tr>
								<td>Population habitant entre 6km et 10km</td>
								<td class="fs-7 text-center"><span class="badge bg-5">${
									dataPopulationHabitantEntre6km10km[code]
								}</span></td>
							</tr>
							
							<tr>
								<td>Population habitant à plus de 10km</td>
								<td class="fs-7 text-center"><span class="badge bg-5">${
									dataPopulationHabitantPlus10km[code]
								}</span></td>
							</tr>
						</tbody>
					</table>
					</div>
					`
				);
			} else if (table === 3) {
				label.html(
					`
					<div class="bg-white shadow-sm p-1 rounded">
					<table class="table table-sm table-bordered fs-8 text-dark">
						<tbody>
							<tr>
								<th colspan="2" class="text-center">${label.html()}</th>
							</tr>
							
							<tr>
								<th colspan="2" class="text-center">${title} : <span class="fs-7"><span class="badge bg-5">${
						data[code]
					}</span></span></th>
							</tr>
							
							<tr>
								<td>Enfants moins de 1ans</td>
								<td class="fs-7 text-center"><span class="badge bg-5">${
									dataEnfantMoins1ans[code]
								}</span></td>
							</tr>
							
							<tr>
								<td>Enfants moins de 5ans</td>
								<td class="fs-7 text-center"><span class="badge bg-5">${
									dataEnfantMoins5ans[code]
								}</span></td>
							</tr>
							
							<tr>
								<td>Naissances attendues</td>
								<td class="fs-7 text-center"><span class="badge bg-5">${
									dataNaissancesAttendues[code]
								}</span></td>
							</tr>
						</tbody>
					</table>
					</div>
					`
				);
			} else if (table === 3.1) {
				label.html(
					`
					<div class="bg-white shadow-sm p-1 rounded">
					<table class="table table-sm table-bordered fs-8 text-dark">
						<tbody>
							<tr>
								<th colspan="2" class="text-center">${label.html()}</th>
							</tr>
							
							<tr>
								<th colspan="2" class="text-center">${title} : <span class="fs-7"><span class="badge bg-5">${
						data[code]
					}</span></span></th>
							</tr>
							
							<tr>
								<td>Nombre de FAR</td>
								<td class="fs-7 text-center"><span class="badge bg-5">${
									dataFar[code]
								}</span></td>
							</tr>
							
							<tr>
								<td>Nombre de FMAR</td>
								<td class="fs-7 text-center"><span class="badge bg-5">${
									dataFmar[code]
								}</span></td>
							</tr>
							
							<tr>
								<td>Femmes enceintes</td>
								<td class="fs-7 text-center"><span class="badge bg-5">${
									dataFemmeEnceinte[code]
								}</span></td>
							</tr>
						</tbody>
					</table>
					</div>
					`
				);
			} else if (table === 1) {
				label.html(
					`
					<div class="bg-white shadow-sm p-1 rounded">
					<table class="table table-sm table-bordered fs-8 text-center text-dark">
						<tbody>
							<tr>
								<th colspan="3">${label.html()}</th>
							</tr>
							<tr>
								<th colspan="3">${title} : <span class="fs-7"> <span class="badge bg-5">${
						dataDistanceMoyenneRouteProche[code]
					} Km</span></span></th>
							</tr>
						</tbody>
					</table>
					</div>
					`
				);
			} else if (table === 1.1) {
				label.html(
					`
					<div class="bg-white shadow-sm p-1 rounded">
					<table class="table table-sm table-bordered fs-8 text-center text-dark">
						<tbody>
							<tr>
								<th colspan="3">${label.html()}</th>
							</tr>
							<tr>
								<th colspan="3">${title} : <span class="fs-7"> <span class="badge bg-5">${
						dataIndiceSynthetiqueFecondite[code]
					}</span></span></th>
							</tr>
						</tbody>
					</table>
					</div>
					`
				);
			} else if (table === 1.2) {
				label.html(
					`
					<div class="bg-white shadow-sm p-1 rounded">
					<table class="table table-sm table-bordered fs-8 text-center text-dark">
						<tbody>
							<tr>
								<th colspan="3">${label.html()}</th>
							</tr>
							<tr>
								<th colspan="3">${title} : <span class="fs-7"> <span class="badge bg-5">${
						dataPersonneAge[code]
					}</span></span></th>
							</tr>
						</tbody>
					</table>
					</div>
					`
				);
			}
		},
	});
	// GET DATA
	function getData(dataset) {
		var data = {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
			7: 0,
			8: 0,
			9: 0,
			10: 0,
			11: 0,
			12: 0,
		};
		for (let i = 0; i < dataset.length; i++) {
			var dataElement = dataset[i];
			for (const key in dataElement) {
				data[key] += dataElement[key];
			}
		}
		return data;
	}
	// GET THE MAX VALUE OF ARRAY
	function getMax(data) {
		var max = 0;
		for (let i = 0; i < data.length; i++) {
			var element = data[i];
			if (element > max) max = element;
		}
	}
	// EVENT LISTNER
	$('input[type=radio][name=data]').change(function () {
		// get the map
		var map = $('#region-map').vectorMap('get', 'mapObject');
		// get the title for tooltip /
		title = $(this).next('span').text();
		// change the title in the tooltip
		$('#title').text($('#title').text().split(' - ')[0] + ' - ' + title);
		// hide the dropdown
		$('.dropdown-toggle').dropdown('hide');
		// ----------------------------------------------------
		// change te data
		if (this.value === 'populationCible') {
			data = getData([dataPopulationCible]);
			table = 5;
		} else if (this.value === 'enfant') {
			data = getData([
				dataEnfantMoins1ans,
				dataEnfantMoins5ans,
				dataNaissancesAttendues,
			]);
			table = 3;
		} else if (this.value === 'femme') {
			data = getData([dataFar, dataFmar, dataFemmeEnceinte]);
			table = 3.1;
		} else if (this.value === 'distanceMoyenneRouteProche') {
			data = getData([dataDistanceMoyenneRouteProche]);
			table = 1;
		} else if (this.value === 'indiceSynthetiqueFecondite') {
			data = getData([dataIndiceSynthetiqueFecondite]);
			table = 1.1;
		} else if (this.value === 'personneAge') {
			data = getData([dataPersonneAge]);
			table = 1.2;
		}
		// ----------------------------------------------------
		// apply changes
		map.series.regions[0].params.max = getMax(data);
		map.series.regions[0].setValues(data);
		map.series.regions[0].legend.render();
	});
});
