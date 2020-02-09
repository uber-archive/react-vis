/**
 * Find branch in tree by omen pair - key-value
 * @param {Object} omen - how to find branch. Example - { id: 123456 }
 * @param {Object} options [{children: 'children', returnChild: true}];
 * @param {Boolean} options.returnChild - return whole branch or not
 * if true return branch started from found child,
 * @returns {Object} if options.returnChild true - return branch started from found child,
 * else - return whole branch where child founded.
 */
export function findBranchByOmen(omen, options) {
  const [[omenProp, omenValue]] = Object.entries(omen);
  const opt = {
    children: 'children',
    returnChild: true,
    ...options
  };

  function _findBranch(tree) {
    if (omenValue === tree[omenProp]) {
      return tree;
    }

    /* Needed for recursive reduce and find */
    if (!tree[opt.children]) {
      return false;
    };

    return opt.returnChild
      ? tree[opt.children].reduce((result, branch) => _findBranch(branch) || result, false)
      : tree[opt.children].find(branch => _findBranch(branch));
  }

  return data => _findBranch(data);
}

/**
 * Fold children, and recalculate weights on leaves.
 * Used to create tree slice of the required depth
 * @param {Object} tree
 * @param {Object} options
 * @param {String} options.children - the field where to take children
 * @param {String} options.value - the field where the values will be written
 * @param {String} options.maxLevel - the maximum depth of leaf
 * @param {String} options.clearValues [false] - if true - values saved only on leaves
 *
 * @returns {Object} folded tree
 */
export function foldChildren(tree, options, level = 0) {
  const opt = {
    children: 'children',
    value: 'value',
    maxLevel: 2,
    clearValues: false,
    ...options
  };

  const calcLeafWeight = chld => chld.reduce(
    (summ, c) => (
      c[opt.children]
      ? calcLeafWeight(c[opt.children])
      : c[opt.value]
    ) + summ,
  0);

  const hasChildren = tree[opt.children] && tree[opt.children].length > 0;
  if (!hasChildren) {
    return tree
  };

  if (level < opt.maxLevel) {
    const getWithout = (data, exception) => {
      const {[exception]: omit, ...rest} = data; // eslint-disable-line no-unused-vars
      return rest;
    };

    return {
      ...(opt.clearValues ? getWithout(tree, opt.value) : tree),
      [opt.children]: tree[opt.children].map(child => foldChildren(child, options, level + 1))
    }
  }

  const {[opt.children]: omit, ...leaf} = tree;
  leaf.value = calcLeafWeight(omit);
  return leaf;
}

/**
 * Generate unique color for item based on his name and value.
 * (Value affects transparency, name affects color)
 * @param {Object} item
 * @param {String} item.name
 * @param {Number} item.value
 * @param {Number} s [80] - saturation
 * @param {Number} l [50] - lightness
 *
 * @returns {String} in css format: hsla(H,S,L,A)
 */
export function colorFromValue(item, s = 80, l = 50) {
  if (!item.value) {
    return;
  }
  const str = item.name;
  const val = item.value;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `hsla(${hash % 360}, ${s}%, ${l}%, ${val ? 0.6 : 0})`;
}