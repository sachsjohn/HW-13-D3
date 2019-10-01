
// var svgWidth = 825;
// var svgHeight = 650;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 100
// };

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight)
//   .attr("class", "chart");

// // Add axes
// // Create the hook for the X Axis
// svg.append('g').attr('class','xText');

// var xText = d3.select('.xText')

//     xText.attr('transform', `translate(480, 600)`)

//     xText.append('text')
//     .attr('x', 0)
//     .attr('y', -20)
//     .attr('data-name', 'age')
//     .attr('data-axis', 'x')
//     .attr('class', 'aText active x')
//     .text('Age')


// // Do the same for the Y Axis
// svg.append('g').attr('class', 'yText');

// var yText = d3.select('yText')

//     yText.attr('transform', `translate(60, 590)rotate(-90)`);

//     yText.append('text')
//         .attr('y', 26)
//         .attr('data-name', 'smokes')
//         .attr('data-axis', 'y')
//         .attr('class', 'aText active y')
//         .text('Percentage of Population that Smokes (%)')


// //   var toolTip = d3.tip()
// //     .attr("class", "tooltip")
// //     .offset([80, -60])
// //     .html(function(d) {
// //       return (`Percent Smoking in ${d.state}: ${d[chosenXAxis]}`);
// //     });

// //   circlesGroup.call(toolTip);

// //   circlesGroup.on("mouseover", function(data) {
// //     toolTip.show(data);
// //   })
// //     // onmouseout event
// //     .on("mouseout", function(data, index) {
// //       toolTip.hide(data);
// //     });

// //   return circlesGroup;
// // }

// // Retrieve data from the CSV file and execute everything below
// d3.csv("assets/data/data.csv", function(data) {
//     // Call and nest the data columns we want to grab
//     var yData = 'smokes';
//     var xData = 'age';

//     console.log(data);

//     var xScale = d3.scaleLinear()
//     .domain([29, d3.max(data, d => d[xdata])]) 
//     .range([0, 825]);

//     var yScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d[ydata])])
//     .range([550, 0]);

//     var xAxis = d3.axisBottom(xScale);
//     var yAxis = d3.axisLeft(yScale);

//     svg.append('g')
//     .call(xAxis)
//     .attr('class', 'xAxis')
//     .attr('transform', `translate(0, 547)`);

//     svg.append('g')
//     .call(yAxis)
//     .attr('class', 'yAxis')
//     .attr('transform', `translate(130, 0)`);

//     var theCircles = svg.selectAll('g theCircles').data(data).enter();

//     console.log(xScale(data[xData]));

//     theCircles
//     .append('circle')
//     .attr('cx', d => xScale(d[xData]))
//     .attr('cy', d => yScale(d[yData]))
//     .attr('r', 5)
//     .attr('class', d => 'stateCircle ' + d.abbr);
//     console.log(theCircles);
// });

///////////////////////////////////////////////////////////

// @TODO: YOUR CODE HERE!

// You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

// Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the `app.js` file of your homework directory—make sure you pull in the data from `data.csv` by using the `d3.csv` function. Your scatter plot should ultimately appear like the image at the top of this section.

    // * Include state abbreviations in the circles.

    // * Create and situate your axes and labels to the left and bottom of the chart.

    // * Note: You'll need to use `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in your web browser.

var width = 800;
var height = 600;

// Margin spacing for graph
var margin = 20;

// space for placing words
var labelArea = 110;

// padding for the text at the bottom and left axes
var tPadBot = 40;
var tPadLeft = 40;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

var circRadius;
function crGet() {
  if (width <= 530) {
    circRadius = 5;
  }
  else {
    circRadius = 10;
  }
}
crGet();

svg.append("g").attr("class", "xText");
// xText will allows us to select the group without excess code.
var xText = d3.select(".xText");

// We give xText a transform property that places it at the bottom of the chart.
// By nesting this attribute in a function, we can easily change the location of the label group
// whenever the width of the window changes.

  xText.attr(
    "transform",
    "translate(" +
      ((width - labelArea) / 2 + labelArea) +
      ", " +
      (height - margin - tPadBot) +
      ")"
  );


xText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .classed('active', true)
  .text("In Poverty (%)");

var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

svg.append("g").attr("class", "yText");

// yText will allows us to select the group without excess code.
var yText = d3.select(".yText");

// Like before, we nest the group's transform attr in a function
// to make changing it on window change an easy operation.
function yTextRefresh() {
  yText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );
}
yTextRefresh();

// Now we append the text.
// 1. Obesity
yText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Obese (%)");


d3.csv("assets/data/data.csv").then(function(data) {
  // Visualize the data
  visualize(data);
});


function visualize(theData) {
  // PART 1: Essential Local Variables and Functions
  // =================================
  // curX and curY will determine what data gets represented in each axis.
  // We designate our defaults here, which carry the same names
  // as the headings in their matching .csv data file.
  var curX = "poverty";
  var curY = "obesity";

  // We also save empty variables for our the min and max values of x and y.
  // this will allow us to alter the values in functions and remove repetitious code.
  var xMin;
  var xMax;
  var yMin;
  var yMax;


  function xMinMax() {
    // min will grab the smallest datum from the selected column.
    xMin = d3.min(theData, function(d) {
      return parseFloat(d[curX]) * 0.90;
    });

    // .max will grab the largest datum from the selected column.
    xMax = d3.max(theData, function(d) {
      return parseFloat(d[curX]) * 1.10;
    });
  }

  // b. change the min and max for y
  function yMinMax() {
    // min will grab the smallest datum from the selected column.
    yMin = d3.min(theData, function(d) {
      return parseFloat(d[curY]) * 0.90;
    });

    // .max will grab the largest datum from the selected column.
    yMax = d3.max(theData, function(d) {
      return parseFloat(d[curY]) * 1.10;
    });
  }


  xMinMax();
  yMinMax();

  var xScale = d3
  .scaleLinear()
  .domain([xMin, xMax])
  .range([margin + labelArea, width - margin]);
  var yScale = d3
  .scaleLinear()
  .domain([yMin, yMax])
  // Height is inverses due to how d3 calc's y-axis placement
  .range([height - margin - labelArea, margin]);

  // We pass the scales into the axis methods to create the axes.
  // Note: D3 4.0 made this a lot less cumbersome then before. Kudos to mbostock.
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);



  function tickCount() {
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }
  tickCount();


  svg
  .append("g")
  .call(xAxis)
  .attr("class", "xAxis")
  .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  svg
  .append("g")
  .call(yAxis)
  .attr("class", "yAxis")
  .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

  // Now let's make a grouping for our dots and their labels.
  var theCircles = svg.selectAll("g theCircles").data(theData).enter();

  // We append the circles for each row of data (or each state, in this case).
  theCircles
    .append("circle")
    // These attr's specify location, size and class.
    .attr("cx", function(d) {
      return xScale(d[curX]);
    })
    .attr("cy", function(d) {
      return yScale(d[curY]);
    })
    .attr("r", circRadius)
    .attr("class", function(d) {
      return "stateCircle " + d.abbr;
    })

    
  
  theCircles
  .append("text")
  // We return the abbreviation to .text, which makes the text the abbreviation.
  .text(function(d) {
    return d.abbr;
  })
  // Now place the text using our scale.
  .attr("dx", function(d) {
    return xScale(d[curX]);
  })
  .attr("dy", function(d) {
    // When the size of the text is the radius,
    // adding a third of the radius to the height
    // pushes it into the middle of the circle.
    return yScale(d[curY]) + circRadius / 2.5;
  })
  .attr("font-size", circRadius)
  .attr("class", "stateText")

}