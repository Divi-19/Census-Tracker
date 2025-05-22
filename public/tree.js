const socket = io();

// Handle dropdown change
document.getElementById("censusSelect").addEventListener("change", function () {
  const selected = this.value;

  if (selected) {
    socket.emit("getCensusData", selected);
  } else {
    document.getElementById("tree-container").innerHTML = ""; // Clear tree
  }
});

// Receive data from server and render tree
socket.on("censusData", function (data) {
  renderTree(data);
});

function renderTree(data) {
  const container = d3.select("#tree-container");
  container.selectAll("*").remove(); // Clear previous content

  const width = 800;
  const height = 400;

  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(50,50)");

  const root = d3.hierarchy(data);
  const treeLayout = d3.tree().size([width - 100, height - 100]);
  treeLayout(root);

  // Draw links
  svg.selectAll("line")
    .data(root.links())
    .enter()
    .append("line")
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y)
    .attr("stroke", "#ccc");

  // Draw nodes
  svg.selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 6)
    .attr("fill", "#4682b4");

  // Draw labels
  svg.selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
    .attr("x", d => d.x + 10)
    .attr("y", d => d.y)
    .text(d => d.data.name);
}
