const socket = io();
let treeData = [];
let root, svg;

document.getElementById('censusDropdown').addEventListener('change', function () {
  const census = this.value;
  if (census) {
    socket.emit('selectCensus', census);
  }
});

socket.on('initialTree', (data) => {
  treeData = data;
  renderTree();
});

socket.on('updateNode', (updatedNode) => {
  updateTreeNode(treeData, updatedNode.path, updatedNode.completed);
  renderTree();
});

function updateTreeNode(nodes, path, completed) {
  for (let node of nodes) {
    if (node.name.includes(path[path.length - 1])) {
      node.completed = completed;
    }
    if (node.children) {
      updateTreeNode(node.children, path, completed);
    }
  }
}

function renderTree() {
  d3.select('#tree').html('');
  const width = 960, height = 600;

  svg = d3.select("#tree")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const root = d3.hierarchy({ children: treeData }, d => d.children);
  const treeLayout = d3.tree().size([height, width - 200]);
  treeLayout(root);

  const g = svg.append("g").attr("transform", "translate(100,0)");

  const link = g.selectAll(".link")
    .data(root.links())
    .enter().append("line")
    .attr("stroke", "#555")
    .attr("x1", d => d.source.y)
    .attr("y1", d => d.source.x)
    .attr("x2", d => d.target.y)
    .attr("y2", d => d.target.x);

  const node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
    .attr("r", 6)
    .style("fill", d => d.data.completed ? "green" : "red");

  node.append("text")
    .attr("dy", 3)
    .attr("x", d => d.children ? -10 : 10)
    .style("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);
}
