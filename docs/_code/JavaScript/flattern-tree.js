const flatternTree = (tree, data) => {
  data.push(tree.value)
  if (tree.children.length > 0) {
    for (let i = 0; i < tree.children.length; i++) {
      flatternTree(tree.children[i], data)
    }
  }

  return data
}

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [
        {
          value: 4,
          children: []
        },
        {
          value: 5,
          children: []
        }
      ]
    },
    {
      value: 3,
      children: [
        {
          value: 6,
          children: []
        },
        {
          value: 7,
          children: [
            {
              value: 8,
              children: []
            }
          ]
        }
      ]
    }
  ]
}
const data = []

const res = flatternTree(tree, data)

console.log('flattern tree:', res)
// [1, 2, 3, 4, 5, 6, 7, 8]
