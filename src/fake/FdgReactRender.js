const nodeCount = 20;
const nodes = [];

// generate 'nodeCount' nodes

for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    r: 10,
    x: 0,
    y: 0
  });
}

const links = [];

for (let i = 0; i < nodeCount; i++) {
  let target = 0;
  do {
    target = Math.floor(Math.random() * nodeCount)
  } while(target === i)

  links.push({
    source: i,
    target,
  });
}

module.exports = { nodes, links };