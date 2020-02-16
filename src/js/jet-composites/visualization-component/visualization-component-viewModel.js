/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'ojL10n!./resources/nls/visualization-component-strings', 'ojs/ojcontext', 'ojs/ojknockout',
        'ojs/ojformlayout', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojarraydataprovider',
        'ojs/ojlabel', "ojs/ojselectcombobox", 'ojs/ojnavigationlist',  "ojs/ojoption"],
    function (ko, ArrayDataProvider, componentStrings, Context) {
        function ViewModel()
        {
            let self = this;
            self.submitDataClick = ko.observable();
            self.chartType = ko.observable();
            self.threeDValue = ko.observable('off');
            self.setThreeDPie = ko.observable();
            self.stackValue = ko.observable('off');
            self.orientationValue = ko.observable('vertical');

            self.dataSet = ko.observable();
            self.dataInput = ko.observableArray();
            self.dataProvider = new oj.ArrayDataProvider(self.dataInput, {keyAttributes: 'id', implicitSort: [{attribute: 'value', direction: 'ascending'}]});

            // Chart settings
            self.color = ko.observable();
            self.borderColor = ko.observable();
            self.series = ko.observableArray([]);
            self.selectVal = ko.observable();
            self.optionsDP = new oj.ArrayDataProvider(self.series, { keyAttributes: 'value' });


            /*   ***** Get series array from input string ******    */
            function getSeriesFromInput(dataString){
                let dataSplit = dataString.split("\\t");
                let values = [];
                let series = [];

                for (let i=0; i<dataSplit.length; i++){
                    if (!dataSplit[i].includes("\\n")){
                        series.push(dataSplit[i]);
                    }else{
                        const val = dataSplit[i].split("\\d")[0];
                        val.split("\\n").forEach(element  =>  values.push(Number(element)));
                    }
                }
                return {series, values};
            }

            /*      ***** Scatter Chart *****     */
            function formatScatterChartData(series, values){
                let data = [];
                let k = 0;
                let totalGroups = values.length / series.length;
                while (k + 9 <values.length){
                    for (let j=0; j<series.length; j++){
                        data.push({
                            id: k,
                            series: series[j],
                            group: "Group " + totalGroups,
                            x: values[k++],
                            y: values[k++],
                            z: values[k++],
                        });
                    }
                    totalGroups--;
                }
                return data;
            }

            /*   ***** Box Plot *****    */
            function generateBoxPlotData(series, values){
                let data = [];
                let k = 0;
                let totalGroups = Math.round(values.length / 7);
                while (k<values.length){ // k+7 ?
                    for (let j=0; j<series.length; j++) {
                        if (k + 7 < values.length) {
                            data.push({
                                id: k,
                                series: series[j],
                                group: "Group " + (Math.round(totalGroups) - 1),
                                low: values[k++],
                                high: values[k++],
                                z: values[k++],
                                q1: values[k++],
                                q2: values[k++],
                                q3: values[k++],
                                outliers: j === series.length - 1 || values.length - k < 7 ? values.splice(k) : [values[k++]],
                            });
                        }
                    }
                    totalGroups--;
                }
                return data;
            }

            /*   ***** Bar chart ******    */
            function generateChartData(series, values){
                let data = [];
                let k = 0;
                let totalGroups = Math.round(values.length / series.length);
                while (k < values.length){
                    for (let j=0; j<series.length; j++) {
                        if (k < values.length && values.length !== null) {
                            data.push({
                                id: k,
                                series: series[j],
                                group: "Group " + totalGroups,
                                value: values[k]
                            });
                            k++;
                        }
                    }
                    totalGroups--;
                }
                return data;
            }

            function chartType(type, data){
                self.chartType(type);
                switch (type) {
                    case "area":
                    case "bar":
                    case "pie":
                        return generateChartData(data.series, data.values);
                    case "boxPlot":
                        return generateBoxPlotData(data.series, data.values);
                    default:
                        return formatScatterChartData(data.series, data.values);
                }
            }

            self.submitDataClick = function(event, type)
            {
                const datax = getSeriesFromInput(self.dataSet());
                self.series([]);
                datax.series.map((element) => {
                    self.series().push({
                        value: element, label: element
                    })
                });

                const returnedData = chartType(type, datax);
                self.dataInput(returnedData);
            };

            // Method to change graph orientation
            self.changeOrientationVertical = function(){
                self.orientationValue("vertical");
            };
            self.changeOrientationHorizontal = function(){
                self.orientationValue("horizontal");
            };

            self.changeOrientationStack = function(){
                self.stackValue("on");
            };

            self.changeOrientationUntack = function(){
                self.stackValue("off");
            };
            self.setThreeDPie = function(){
                self.threeDValue() === "off" ? self.threeDValue("on") : self.threeDValue("off");
            }
        }
        return ViewModel;
});
