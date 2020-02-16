# ojet component template

## Usage
Refer to the oj.Composite jsdoc
http://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.Composite.html

>> if data is invalid <less than the data required for one group>, no data is shown in the graph
>> if data is invalid <Incomplete groups>, data is shown incomplete

>> I am fetching data using native javaScript method "fetch" as the examples for API call using Oracle Jet were not clear

Data Inputs for test:

>> Bar/Pie/Area charts: %python print("Series 1\tSeries 2\tSeries 3\t91\n12\n35\n22\n71\n23");
>> Plot Box/Scatter chart:  %python print("Series 1\tSeries 2\tSeries 3\t3\n28\n59\n8\n12\n17\n40\n3\n28\n59\n8\n12\n17\n40\n3\n28\n59\n8\n12\n17\n40");

Series Settings

>> To change color, type color hex or string
