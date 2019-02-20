/**
 * 多个不同重量、不同价值的物品要放入一个固定容积的容器中，如何使得容器中物品总价值最大？
 */

function padStart(str, l, s) {
  if (str.length < l) {
    const arr = []
    for (let i = 0; i < l - str.length; i++) {
      arr[i] = s
    }
    return arr.join("").concat(str)
  }
  return str
}

interface good {
  value: number
  weight: number
} 

function getMaxValue(goods: good[] ,  space: number ): number {
  // 将第k个元素作为准备加入袋中的元素，此前的可选元素为 prevGoods, 此前的最大价值为 result = getMaxValue(prevGoods, number). 考虑是否应该将其加入取决于: 加入该元素后袋中物品的总重量是否更大
  // 1. 假设加入该元素。那么袋中的空间就为 number - weightK, 需要得到 vOfRemainSpace = getMaxValue(prevGoods, number - weight); 然后就可以得到最大的价值 r = valueK + vOfRemainSpace
  // 2. 将 r 与 result 比较，如果更大，那么应该选择加入该元素，同时更新 result
  //    1. 为了方便计算 vOfRemainSpace，应该将每次得到的 result 存储起来。储存的纬度应该是: goods(物品列表) / space，即为一个二维数组结构。每次goods中有了一个新的元素，都将 space 从1开始计算一遍，填充该数组。

  // todo: 最好再加上对数据类型的校验
  // 边界: goods 为 空 空数组, space <= 0 
  if (space <= 0 || !goods || goods.length === 0) {
    return 0
  }
  let l = goods.length, vTable: Array<Array<number>> = []

  for (let i = 0; i < l; i++) {
    vTable.push([0])
    for (let s = 1; s <= space; s++) {
      vTable[i].push(0)
    }
  }
  for (let i = 0; i < l; i++) {
    for (let s = 0; s <= space; s++) {
      if (i === 0) {
        let firstGood = goods[0]
        vTable[i][s] = firstGood.weight <= s ? firstGood.value : 0
      } else {
        let good = goods[i]
        const vOfRemainSpace = good.weight <= s ? vTable[i-1][s-good.weight] : 0
        if (good.weight <= s) {
          const vWithGoodInSpace = good.value + vOfRemainSpace
          vTable[i][s] = vWithGoodInSpace > vTable[i-1][s] ? vWithGoodInSpace : vTable[i-1][s]
        } else {
          vTable[i][s] = vTable[i-1][s]
        }
      }
    }
    console.log(
      vTable[i]
        .map(e => {
          const s = e.toString()
          return padStart(s, 3, " ")
        })
        .join(", ")
    )
  }  
  console.log("---")
  return vTable[l-1][space]
}


// tc
const log = console.log
log(getMaxValue([{value: 2, weight: 5}, {value: 3, weight: 8}], 3) === 0)
log(getMaxValue([{value: 2, weight: 5}, {value: 3, weight: 8}], 5) === 2)
log(getMaxValue([{value: 2, weight: 5}, {value: 3, weight: 8}], 8) === 3)
log(getMaxValue([{value: 2, weight: 5}, {value: 3, weight: 8}], 13) === 5)
log(getMaxValue([{value: 5, weight: 2}, {value: 3, weight: 3}], 3) === 5)
log(getMaxValue([{value: 5, weight: 2}, {value: 5, weight: 2}, {value: 3, weight: 3}, {value: 5, weight: 5} ], 10) === 15)