type CfgType = {
  rootId?: string;
  id?: string;
  parentId?: string;
  children?: string;
  leaf?: string;
}

type BackCategoryItem = {
  cate: string;
}

interface CategoryItem {
  categoryId: number;
  categoryName: string;
  level: number;
  parentId: number;
  backCategoryList: BackCategoryItem[]
}

interface ICategoryItem extends CategoryItem {
  children?: ICategoryItem[]
}

// 平铺结构转树状结构
function list2Tree(list: CategoryItem[], cfg: CfgType): ICategoryItem[] {
  let nodes = {}, parentNodes = {}
  let prop = Object.assign({
      rootId: 'root',
      id: 'id',
      parentId: 'parentId',
      children: 'children',
      leaf: 'leaf',
  }, cfg)
  list.forEach((node) => {
      let id = node[prop.id];
      let parentId = node[prop.parentId] || prop.rootId;
      nodes[id] = node
      if (parentId) {
          parentNodes[parentId] = parentNodes[parentId] || []
          parentNodes[parentId].push(node)
      }
  })

  Object.keys(nodes).forEach(id => {
      let node = nodes[id]
      if (parentNodes[id]) {
          node[prop.children] = parentNodes[id]
      }
      // else {
      //     node[prop.leaf] = true
      // }
  })

  return parentNodes[prop.rootId]
}

// Test
const list: CategoryItem[] = [
  {
    categoryId: 1,
    categoryName: '1',
    level: 1,
    parentId: 0,
    backCategoryList: [
      {
        cate: '1-1',
      },
      {
        cate: '1-2',
      },
      {
        cate: '1-3',
      },
    ],
  },
  {
    categoryId: 2,
    categoryName: '2',
    level: 2,
    parentId: 1,
    backCategoryList: [
      {
        cate: '2-1',
      },
      {
        cate: '2-2',
      },
      {
        cate: '2-3',
      },
    ],
  },
  {
    categoryId: 3,
    categoryName: '3',
    level: 3,
    parentId: 2,
    backCategoryList: [
      {
        cate: '3-1',
      },
      {
        cate: '3-2',
      },
      {
        cate: '3-3',
      },
    ],
  }
]

const result = list2Tree(list, { id: 'categoryId' })
console.log(result);
