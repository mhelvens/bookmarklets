(function ($) {


	/* styling */
	$('<style>' +
	'.highlighted-row > td { background-color: #ffaaaa !important }' +
	'.highlighted-row > th { background-color: #ff9999 !important }' +
	'</style>').appendTo('body');


	/* all relevant tables */
	var tables = $('table.wikitable.sortable');


	/* convenience functions */
	function tableToProperties(table) {
		var result = [];
		$(table).find('thead > tr > th').each(function (index, element) {
			result[index] = $(element).text();
			result[$(element).text()] = index;
		});
		return result;
	}
	function eachProductWithName(productName, fn) {
		tables.find('> tbody > tr').each(function (index, row) {
			var rowName = $(row).find('th').text();
			if (rowName === productName) {
				fn($(row));
			}
		});
	}
	function eachProductWithPropertyValue(property, value, fn) {
		tables.each(function (index, table) {
			var properties = tableToProperties(table);
			var column = properties[property];

			$(table).find('> tbody > tr').each(function (rowIndex, row) {
				var rowValue = $($(row).children()[column]).text();
				if (rowValue === value) {
					fn($(row));
				}
			});
		});
	}


	/* html for the buttons */
	var buttonCode = '<a href="#" style="color: red; border: solid 1px red; display: block; height: 10px; width: 10px; position: absolute; top: 2px; right: 2px;"></a>';


	/* put in all the buttons */
	tables.each(function (index, table) {
		var properties = tableToProperties(table);

		$(table).find('> tbody > tr').each(function (rowIndex, row) {

			/* product hider */
			(function () {
				var th = $(row).find('> th');
				var productName = th.text();
				var hiderButton = $(buttonCode).appendTo(th.css('position', 'relative'));
				hiderButton.click(function () {
					eachProductWithName(productName, function (row) { row.hide() });
				});
				hiderButton.on('mouseover', function () {
					eachProductWithName(productName, function (row) { row.addClass('highlighted-row') });
				});
				hiderButton.on('mouseout', function () {
					eachProductWithName(productName, function (row) { row.removeClass('highlighted-row') });
				});
			}());

			/* property value hider */
			$(row).children().each(function (columnIndex, cell) {
				if (columnIndex === 0) { return }
				var hiderButton = $(buttonCode).appendTo($(cell).css('position', 'relative'));
				hiderButton.click(function () {
					eachProductWithPropertyValue(properties[columnIndex], $(cell).text(), function (row) { row.hide() });
				});
				hiderButton.on('mouseover', function () {
					eachProductWithPropertyValue(properties[columnIndex], $(cell).text(), function (row) { row.addClass('highlighted-row') });
				});
				hiderButton.on('mouseout', function () {
					eachProductWithPropertyValue(properties[columnIndex], $(cell).text(), function (row) { row.removeClass('highlighted-row') });
				});
			});

		});


	});


}(jQuery));
