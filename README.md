# ojet component template

## Usage
Refer to the oj.Composite jsdoc
http://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.Composite.html

[PART 1][Branch master]

Data Inputs for test:

- Bar/Pie/Area charts: "Series 1\tSeries 2\tSeries 3\t91\n12\n35\n22\n71\n23\d";
- Plot Box/Scatter chart:  "Series 1\tSeries 2\tSeries 3\t3\n28\n59\n8\n12\n17\n40\n3\n28\n59\n8\n12\n17\n40\n3\n28\n59\n8\n12\n17\n40\d";


- Branch "master" contains code implementation for the 1st frontend part of the code challenge
- Business logic to generate the charts is implemented at the level of the frontend

Data checks

- Series are selected by "\t" and data by "\n"

[PART 2][Branch data-api-call]

- Branch "data-api-call" contains code implementation for the 2st frontend part of the code challenge
- Business logic to generate the charts is gotten from the backend server

Data checks

- if data is invalid <less than the data required for one group>, no data is shown in the graph
- if data is invalid <Incomplete groups>, data is shown incomplete

Data Inputs for test:

- Bar/Pie/Area charts: %python print("Series 1\tSeries 2\tSeries 3\t91\n12\n35\n22\n71\n23");
- Plot Box/Scatter chart:  %python print("Series 1\tSeries 2\tSeries 3\t3\n28\n59\n8\n12\n17\n40\n3\n28\n59\n8\n12\n17\n40\n3\n28\n59\n8\n12\n17\n40");

Series Settings

- To change color, type color hex or string

Cors Issue

- In case of cors issue to connect to the backend services, please disable the security check in the browser.
- Here is the link on how to do it for Chrome: https://www.thegeekstuff.com/2016/09/disable-same-origin-policy/ 
