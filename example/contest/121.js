// /**
//  * @param {number[]} A
//  * @return {number[]}
//  */
// var sortedSquares = function(A) {
//   // 1. 遍历数组，如果小于0，push进负数组，
//   // 2. 用一个新数组 对数组进行绝对值排序？
//   let boundary = 0
//   const l = A.length
//   for (let i = 0; i < l; i++) {
//     if (A[i] >= 0) {
//       boundary = i
//       break
//     }
//   }

//   const result = []
//   let idxOfMinus = boundary - 1,
//     idxOfPositive = boundary
//   while (idxOfMinus >= 0 || idxOfPositive < l) {
//     let productOfMinus = -1,
//       productOfPositive = -1
//     if (idxOfMinus < 0) {
//       productOfPositive = Math.pow(A[idxOfPositive], 2)
//       result.push(productOfPositive)
//       idxOfPositive++
//       continue
//     }
//     if (idxOfPositive >= l) {
//       productOfMinus = Math.pow(A[idxOfMinus], 2)
//       result.push(productOfMinus)
//       idxOfMinus--
//       continue
//     }

//     productOfPositive = Math.pow(A[idxOfPositive], 2)
//     productOfMinus = Math.pow(A[idxOfMinus], 2)
//     if (productOfMinus < productOfPositive) {
//       result.push(productOfMinus)
//       idxOfMinus--
//     } else {
//       result.push(productOfPositive)
//       idxOfPositive++
//     }
//   }

//   return result
// }

const log = console.log
// log(sortedSquares([-4, -1, 0, 3, 10]))
// log(sortedSquares([-14, -1, 0, 3, 10]))
// /**
//  * @param {number[]} A
//  * @return {number}
//  */
// var maxTurbulenceSize = function(A) {
//   the key is: when fail, start from current index(the middle one); unless the current length < 2
//   let i = 0,
//     result = 0,
//     l = A.length,
//     currentLength = 0,
//     tailStack = []

//   while (i < l) {
//     const stackLength = tailStack.length
//     if (stackLength === 0) {
//       currentLength = 1
//     } else if (stackLength === 1) {
//       if (A[i] - tailStack[0] !== 0) {
//         currentLength++
//       } else {
//         tailStack.shift()
//         currentLength = 1
//       }
//     } else if (stackLength === 2) {
//       const match = (A[i] - tailStack[1]) * (tailStack[1] - tailStack[0]) < 0

//       if (match) {
//         tailStack.shift()
//         currentLength++
//       } else {
//         if (A[i] - tailStack[1] !== 0) {
//           tailStack.shift()
//           currentLength = 2
//         } else {
//           tailStack.shift()
//           tailStack.shift()
//           currentLength = 1
//         }
//       }
//     }
//     tailStack.push(A[i])
//     i++
//     if (currentLength > result) {
//       result = currentLength
//     }
//   }
//   return result
// }
// log(maxTurbulenceSize([1, 1]))
// log(maxTurbulenceSize([1]))
// log(maxTurbulenceSize([9, 4, 2, 10, 7, 8, 8, 1, 9]))
// log(maxTurbulenceSize([4, 8, 12, 16]))

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// /**
//  * @param {TreeNode} root
//  * @return {number}
//  */
// function distributeCoins(root) {
//   function TreeNode(val) {
//     this.val = val
//     this.left = this.right = null
//   }
//   function parseArrToTree(arr) {
//     const stack = []
//     for (let i = 0, l = arr.length; i < l; i++) {
//       const node = arr[i] === null ? null : new TreeNode(arr[i])
//       stack.push(node)
//       const parentIndex = Math.floor((i + 1) / 2) - 1
//       if (parentIndex < 0) {
//         continue
//       }
//       if (i % 2 === 0) {
//         stack[parentIndex].right = node
//       } else {
//         stack[parentIndex].left = node
//       }
//     }
//     return stack[0]
//   }
//   function getNodeInfo(node) {
//     let lCount = 0
//     let lCoin = 0
//     let rCount = 0
//     let rCoin = 0
//     let lMove = 0
//     let rMove = 0
//     let ccount = 0
//     let ccoin = 0
//     let cmove = 0
//     if (!!node.left) {
//       const result = getNodeInfo(node.left)
//       lCount = result[0]
//       lCoin = result[1]
//       lMove = result[2]
//     }
//     if (!!node.right) {
//       const result = getNodeInfo(node.right)
//       rCount = result[0]
//       rCoin = result[1]
//       rMove = result[2]
//     }
//     ccount = lCount + rCount + 1
//     ccoin = lCoin + rCoin + node.val
//     cmove = lMove + rMove + Math.abs(ccount - ccoin)
//     return [ccount, ccoin, cmove]
//   }
//   if (!root || !root.length) {
//     return 0
//   }
//   const listHead = parseArrToTree(root)

//   const [count, coin, move] = getNodeInfo(listHead)
//   return move
// }
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var distributeCoins = function(root) {
  function TreeNode(val) {
    this.val = val
    this.left = this.right = null
  }
  function parseArrToTree(arr) {
    const stack = []
    for (let i = 0, l = arr.length; i < l; i++) {
      const node = arr[i] === null ? null : new TreeNode(arr[i])
      stack.push(node)
      const parentIndex = Math.floor((i + 1) / 2) - 1
      if (parentIndex < 0) {
        continue
      }
      if (i % 2 === 0) {
        stack[parentIndex].right = node
      } else {
        stack[parentIndex].left = node
      }
    }
    return stack[0]
  }
  function getNodeInfo(node) {
    let lCount = 0
    let lCoin = 0
    let rCount = 0
    let rCoin = 0
    let lMove = 0
    let rMove = 0
    let ccount = 0
    let ccoin = 0
    let cmove = 0
    if (!!node.left) {
      const result = getNodeInfo(node.left)
      lCount = result[0]
      lCoin = result[1]
      lMove = result[2]
    }
    if (!!node.right) {
      const result = getNodeInfo(node.right)
      rCount = result[0]
      rCoin = result[1]
      rMove = result[2]
    }
    ccount = lCount + rCount + 1
    ccoin = lCoin + rCoin + node.val
    cmove = lMove + rMove + Math.abs(ccount - ccoin)
    return [ccount, ccoin, cmove]
  }
  if (!root || !root.length) {
    return 0
  }
  const listHead = parseArrToTree(root)

  const [count, coin, move] = getNodeInfo(listHead)
  return move
}
log(distributeCoins([1, 0, 0, null, 3]))
log(distributeCoins([3, 0, 0]))
