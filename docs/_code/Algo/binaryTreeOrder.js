const binaryTreeOrder = {
  // 前序遍历
  preOrder(root) {
    // const res = []
    // function traverse(node) {
    //   if (!node) return
    //   res.push(node.val)
    //   traverse(node.left)
    //   traverse(node.right)
    // }
    // traverse(root)
    // return res
    // 迭代
    if (!root) return []
    const stack = [root]
    const res = []
    while(stack.length) {
      const node = stack.pop()
      res.push(node.val)
      if (node.right) {
        stack.push(node.right)
      }
      if (node.left) {
        stack.push(node.left)
      }
    }
    return res
  },
  // 中序遍历
  inOrder(root) {
    // const res = []
    // function traverse(node) {
    //   if (!node) return
    //   traverse(node.left)
    //   res.push(node.val)
    //   traverse(node.right)
    // }
    // traverse(root)
    // return res
    // 迭代
    if(!root) return []
    const stack = [root]
    let cur = root
    const res = []
    while(stack.length || cur) {
      // 左节点先入栈
      while(cur) {
        stack.push(cur)
        cur = cur.left
      }
      const node = stack.pop()
      res.push(node.val)
      if (node.tight !== null) {
        cur = cur.right
      }
    }
  },
  // 后序遍历
  postOrder(root) {
    // 
  }
}
