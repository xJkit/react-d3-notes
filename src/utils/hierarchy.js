/** Util functions to map hierarchy data to normal links and nodes */
/**
 * nodes data structure:
 * const data = {
 *  nodes: [{ id: 1}, {id: 2}, {id: 3}, ...],
 *  links: [{ source: 1, target: 2}, {source: 1, target: 3}, ...],
 * }
 */

export const flattenHrchyToNodes = data => {
  // name, value are required
  // if no isLeaf is provided, it is false by default
  if ('name' in data && 'value' in data) {
    const {
      name,
      value,
      isLeaf = false,
      children,
    } = data;
    const nodes = [{ name, value, isLeaf }, ...children];
    return nodes;
  }
  return [];
};

export const flattenHrchyToLinks = data => {
  if ('name' in data && 'value' in data) {
    const {
      value,
      children = []
    } = data;
    const source = value;
    const links = children.map(child => ({
      source,
      target: child.value,
    }));
    return links;
  }
  return [];
};

export const appendNodes = (prevNodes, newNodes) => {
  const parentNode = newNodes[0];
  const otherNodes = newNodes.splice(1, newNodes.length);
  const isParentInPrevNodes = Boolean(prevNodes.filter(node => node.name === parentNode.name).length);
  if (isParentInPrevNodes) {
    return [ ...prevNodes, ...otherNodes ];
  }
  return [ ...prevNodes, ...newNodes ];
};

export const appendLinks = (prevLinks, newLinks) => {
  return [ ...prevLinks, ...newLinks ];
};