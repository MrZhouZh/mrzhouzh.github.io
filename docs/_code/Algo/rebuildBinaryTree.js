function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

/**
 * 已知前序中序遍历, 重建二叉树
 * @param {number[]} preorder 
 * @param {number[]} inorder 
 * @param {string} mark 不必要
 * @returns 
 */
var buildTree = function(preorder, inorder, mark = 'init') {
  if(preorder.length === 0 || inorder.length === 0) return null
  console.log('mark --', mark)
  console.log('preorder --', preorder)
  console.log('inorder --', inorder)

  const rootVal = preorder[0]
  const node = new TreeNode(rootVal)
  let i = 0
  for(; i < inorder.length; ++i) {
      if (inorder[i] === rootVal) {
          break
      }
  }
  console.log('i --', i)

  node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i + 1), 'left')
  node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1), 'right')

  return node
};

/**
 * 已知后序中序遍历, 重建二叉树
 * @param {number[]} preorder 
 * @param {number[]} inorder 
 * @returns 
 * 后:[9,15,7,20,3]
 * 中:[9,3,15,20,7]
 */
const buildTree2 = (postorder, inorder) => {
  if (postorder.length === 0) return null

  const val = postorder[postorder.length - 1]
  const node = new TreeNode(val)
  
  let i = 0
  for (; i < inorder.length; ++i) {
    if (inorder[i] === val) {
      break
    }
  }

  node.left = buildTree2(postorder.slice(0, i), inorder.slice(0, i))
  node.right = buildTree2(postorder.slice(i, postorder.length - 1), inorder.slice(i + 1))

  return node
}

const preorder = [3,9,20,15,7]
const inorder = [9,3,15,20,7]
const postorder = [9,15,7,20,3]
const tree = buildTree(preorder, inorder)
const tree2 = buildTree2(postorder, inorder)

function postOrder(root) {
  // const res = []
  // function traverse(node) {
  //   if (!node) return
  //   traverse(node.left)
  //   traverse(node.right)
  //   res.push(node.val)
  // }
  // traverse(root)
  // return res
  // 迭代
  if (!root) return null
  const res = []
  const stack = [root]
  while(stack.length) {
    const node = stack.pop()
    res.unshift(node.val)
    if (node.left) {
      stack.push(node.left)
    }
    if (node.right) {
      stack.push(node.right)
    }
  }
  return res
}

console.log('post order', postOrder(tree))

console.log('build tree -- ', tree)
