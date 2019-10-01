// @TODO: YOUR CODE HERE!

// You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

// Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the `app.js` file of your homework directory—make sure you pull in the data from `data.csv` by using the `d3.csv` function. Your scatter plot should ultimately appear like the image at the top of this section.

    // * Include state abbreviations in the circles.

    // * Create and situate your axes and labels to the left and bottom of the chart.

    // * Note: You'll need to use `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in your web browser.


var svgWidth = 800;
var svgHeight = 600;

// // Gave up on trying to get the formulas to work
// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 100
// };

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "chart");

/// Add Axes Titles
// Create the hook for the X Title
svg.append("g").attr("class", "xlabel");
var xlabel = d3.select(".xlabel");

  xlabel.attr("transform", `translate(350, 550)`);

xlabel.append("text")
.attr('x', 0)
.attr("y", -20)
.attr("data-name", "age")
.attr("data-axis", "x")
.classed("active", true)
.text('Average Age of Residents (Years)');

svg.append("g").attr("class", "ylabel");

// Do the same for the Y Label
var ylabel = d3.select(".ylabel");

  ylabel.attr("transform", `translate(100, 200)rotate(-90)`);

ylabel
  .append("text")
  .attr("y", -20)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .classed("active", true)
  .text("Percent of Population that Smokes (%)");

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(data) {

  // Set the variables that we will use to extract the information
  var xData = "age";
  var yData = "smokes";

  // Confirm that we're getting something out of the csv
  console.log(data);

  //  // Generate the axes as a function of the data
  // Parsefloat is needed to interpret the results of the data pull
  var xScale = d3.scaleLinear()
  .domain([29, d3.max(data, d => parseFloat(d[xData]) + 2)])
  .range([130, 800]);

  var yScale = d3.scaleLinear()
  .domain([7, d3.max(data, d => parseFloat(d[yData]) + 2)])
  .range([470, 20]);

  // Define the axes using the scales deployed above
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  // Deploy the axes by appending them to a group
  // xAxis
  svg.append("g")
  .call(xAxis)
  .attr("class", "xAxis")
  .attr("transform", `translate(0, 470)`);
  
  //yAxis
  svg.append("g")
  .call(yAxis)
  .attr("class", "yAxis")
  .attr("transform", `translate(130, 0)`);

  // Finally, creating the circles 
  // append initial circles
  var circlesGroup = svg.selectAll("g circlesGroup").data(data).enter();

  // Make sure to not just go and append this in one big object or it won't work
  circlesGroup.append("circle")
  .attr("cx", d => xScale(d[xData]))
  .attr("cy", d => yScale(d[yData]))
  .attr("r", 10)
  // class stateCircle is defined in the CSS to be used for the circles presumably
  .attr("class", d=> 'stateCircle ' + d.abbr);

    
  // Creating the text taht will overlay our circles with the state abbrevation
  circlesGroup.append("text")
  .text(d => d.abbr)
  .attr("dx", d => xScale(d[xData]) - 5)
  .attr("dy", d => yScale(d[yData]) + 10 / 2.5)
  .attr("font-size", 7)
  // stateText is defined for the text of these bubbles
  .classed('stateText')

  // // abortive attempt to incorporate d3.tip from the hairband exercise
  //   var toolTip = d3.tip()
  //     .attr("class", "tooltip")
  //     .offset([80, -60])
  //     .html(function(d) {
  //       return (`Percent Smoking in ${d.state}: ${d[xData]}`);
  //     });

  //   circlesGroup.call(toolTip);

  //   circlesGroup.on("mouseover", function(data) {
  //     toolTip.show(data);
  //   })
  //     // onmouseout event
  //     .on("mouseout", function(data, index) {
  //       toolTip.hide(data);
  //     });

  //   return circlesGroup;
  // }

});