// @TODO: YOUR CODE HERE!


// You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

// Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the `app.js` file of your homework directory—make sure you pull in the data from `data.csv` by using the `d3.csv` function. Your scatter plot should ultimately appear like the image at the top of this section.

    // * Include state abbreviations in the circles.

    // * Create and situate your axes and labels to the left and bottom of the chart.

    // * Note: You'll need to use `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in your web browser.

var svgWidth = 850;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("class", "chart");

// Add axes
// Create the hook for the X Axis
svg.append('g').attr('class','xText');

var xText = d3.select('.xText')

    xText.attr('transform', `translate(480, 600)`)

    xText.append('text')
    .attr('x', 0)
    .attr('y', -20)
    .attr('data-name', 'age')
    .attr('data-axis', 'x')
    .attr('class', 'aText active x')
    .text('Age')


// Do the same for the Y Axis
svg.append('g').attr('class', 'yText');

var yText = d3.select('yText')

    yText.attr('transform', `translate(60, 590)rotate(-90)`);

    yText.append('text')
        .attr('y', 26)
        .attr('data-name', 'smokes')
        .attr('data-axis', 'y')
        .attr('class', 'aText active y')
        .text('Percentage of Population that Smokes (%)')


//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`Percent Smoking in ${d.state}: ${d[chosenXAxis]}`);
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

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv", function(data) {
    // Call and nest the data columns we want to grab
    var yData = 'smokes';
    var xData = 'age';

    console.log(data);

    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.age), d3.max(data, d => d.age)]) 
    .range([130, 830]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.smokes)]) // Setting the minimum at zero because it's a percentage that can't go below zero
    .range([height, 0]);

    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    svg.append('g')
    .call(xAxis)
    .attr('class', 'xAxis')
    .attr('transform', `translate(0, 547)`);

    svg.append('g')
    .call(yAxis)
    .attr('class', 'yAxis')
    .attr('transform', `translate(130, 0)`);

    var circles = svg.selectAll('g circles').data(data).enter();

    circles
    .append('circle')
    .attr('cx', d => xScale(d[xData]))
    .attr('cy', d => yScale(d[yData]))
    .attr('r', 5)
    .attr('class', d => 'stateCircle ' + d.abbr);
});


  // parse data
//   data.forEach(function(datum) {
//     datum.age = +data.age;
//     datum.smokes = +data.smokes;
//   });
// function visualize(data) {
//   // xLinearScale function above csv import
//   var xLinearScale = xScale(data, chosenXAxis);

//   // Create y scale function
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.smokes)])
//     .range([height, 0]);

//   // Create initial axis functions
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // append x axis
//   var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // append y axis
//   chartGroup.append("g")
//     .call(leftAxis);

//   // append initial circles
//   var circlesGroup = chartGroup.selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.age))
//     .attr("cy", d => yLinearScale(d.smokes))
//     .attr("r", 5)
//     .append('text').text(d => d.abbr);

//   var circles = svg.selectAll('g circles').data(data).enter()

//   circles
//     .append('circle')
//     .attr('cx', d => xScale(d['age']))
//     .attr('cy', d => yScale(d['smokes']))
//     .attr('r', 5)
//     .attr('class', d => 'stateCircle ' + d.abbr);

//   // Create labels for the axes
//   chartGroup.append('g').attr('transform', `translate(${width/2}, ${height + 20})`)
//     .append("text")
//     .attr('x', 0)
//     .attr('y', 20)
//     .attr('value')
//     // .classed('active', true)
//     // .text('Age')

//   // append y axis
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Percentage of People Smoking (%)");

//   // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

// }
