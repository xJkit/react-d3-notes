
// generate initial nodes

export const genNodesAndLinks = (count = 0) => {
  const nodeCount = count || Math.ceil(Math.random() * 20);
  const nodes = [];
  const links = [];

  // generate random nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      r: 10,
      x: 0,
      y: 0
    });
  }
  // generate initial links
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

  return { nodes, links };
}
