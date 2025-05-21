function buildTree(data) {
  const pathMap = {};
  const root = [];

  // Build lookup map
  data.forEach(item => {
    const key = item.path.join('/');
    pathMap[key] = { ...item, children: [] };
  });

  // Build tree
  data.forEach(item => {
    const key = item.path.join('/');
    const parentKey = item.parent_path.join('/');
    if (parentKey && pathMap[parentKey]) {
      pathMap[parentKey].children.push(pathMap[key]);
    } else if (!item.parent_path.length) {
      root.push(pathMap[key]);
    }
  });

  return root;
}

function formatTreeNodes(nodes) {
  return nodes.map(node => ({
    name: `${capitalize(node.type)}: ${node.value}`,
    completed: node.completed,
    children: formatTreeNodes(node.children)
  }));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = { buildTree, formatTreeNodes };
