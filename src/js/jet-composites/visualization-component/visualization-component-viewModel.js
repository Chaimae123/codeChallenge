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

            // Chart settings
            self.color = ko.observable();
            self.borderColor = ko.observable();
            self.series = ko.observableArray([]);
            self.selectVal = ko.observable();
            self.optionsDP = new oj.ArrayDataProvider(self.series, { keyAttributes: 'value' });

            function chartType(type){
                switch (type) {
                    case "area":
                    case "bar":
                    case "pie":
                        return postData(type, "/bar-chart");
                    case "boxPlot":
                        return postData(type, "/plotbox-chart");
                    default:
                        return postData(type, "/scatter-chart");
                }
            }

            function postData(type, url) {
                self.chartType(type);
                self.dataInput([]);
                self.series([]);
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({code: self.dataSet()});
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                };

                fetch(`http://localhost:8080/execute${url}`, requestOptions)
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
                chartType(type);
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
