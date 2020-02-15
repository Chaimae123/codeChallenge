/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';
define(
    ['knockout', 'ojL10n!./resources/nls/visualization-component-strings', 'ojs/ojcontext', 'ojs/ojknockout',
        'ojs/ojformlayout', 'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojchart', 'ojs/ojtoolbar', 'ojs/ojarraydataprovider',
        'ojs/ojlabel', "ojs/ojselectcombobox", 'ojs/ojnavigationlist',  "ojs/ojoption", , 'ojs/ojmodel'],
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

            // let string = "Series 1\tSeries 2\tSeries 3\t91\n12\n35\n22\n71\n23\d"; // bar chart
            // let string = "Series 1\tSeries 2\tSeries 3\t3\n28\n59\n8\n12\n17\n40\n3\n28\n59\n8\n12\n17\n40\n3\n28\n59\n8\n12\n17\n40\d"; // plot box & scatter chart


            // Chart settings
            self.color = ko.observable();
            self.borderColor = ko.observable();
            self.series = ko.observableArray([]);
            self.selectVal = ko.observable();
            self.optionsDP = new oj.ArrayDataProvider(self.series, { keyAttributes: 'value' });

            function postData(type) {
                self.chartType(type);
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({code: self.dataSet()});
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                };

                fetch("http://localhost:8080/execute/bar-chart", requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        self.series([]);
                        self.dataInput(result.data);
                        result.series.map((element) => {
                            self.series().push({
                                value: element, label: element
                            })
                        });
                    })
                    .catch(error => console.error('error', error));
            }

            self.submitDataClick = function(event, type)
            {

                postData(type);
            };

            // Method to change graph orientation
            self.changeOrientationVertical = function(){
                self.orientationValue("vertical");
            };
            self.changeOrientationHorizontal = function(){
                self.orientationValue("horizontal");
            };

            self.changeOrientationStack = function(){
                self.stackValue() === "off" ? self.stackValue("on") : self.stackValue("off");
            };
            self.setThreeDPie = function(){
                self.threeDValue("on");
            }
        }
        return ViewModel;
});
