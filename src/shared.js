// eslint-disable
import format from "date-fns/format";

function addDays(ths, days) {
    var date = new Date(ths.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var getDates = function (startDate, stopDate, dformat) {
    startDate = new Date(startDate);
    stopDate = new Date(stopDate);
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(format(new Date(currentDate), dformat));
        currentDate = addDays(currentDate, 1);
    }
    return dateArray;
}

var adjustTableWidth = function () {

    document.querySelectorAll('.tablehead-js').forEach(function (thead) {
        var tableRows = thead.parentElement.querySelectorAll('.tablerow-js');
        var th = thead.querySelector('tr').children;

        tableRows.forEach(function (tr) {
            var tableIds = tr.children;
            var idx = 0;
            tableIds.forEach(function (td) {

                var width = 0;

                if (td.hasAttribute('colspan')) {

                    var colspan = Number(td.getAttribute('colspan'));

                    for (var j = idx; j < colspan; j++) {
                        width += th[j].offsetWidth;
                        idx++;
                    }

                }
                else {
                    width += th[idx].offsetWidth;
                    idx++;
                }

                td.style.width = width + 'px';

            });
        });

    });

}

export default {
    adjustTableWidth,
    getDates
}

window.addEventListener('resize', function () { adjustTableWidth() });