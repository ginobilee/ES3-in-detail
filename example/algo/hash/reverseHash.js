function backSorted(arr) {
  return arr.filter(a => a >= 0).sort((a, b) => b - a)
}
function saveDep(dep, arr, i, j) {
  if ((d = dep[arr[i]])) {
    d.push(arr[j])
  } else {
    dep[arr[i]] = [arr[j]]
  }
}
function mod(i, N) {
  if (N === 0) {
    return i
  }
  while (i >= N) {
    i -= N
  }
  while (i < 0) {
    i += N
  }
  return i
}
function reverseHash(arr) {
  // validate

  const N = arr.length
  // 1. sort the nums from max to min, save into another array: sorted
  const sorted = backSorted(arr)

  // 2. calculate the dependancy of each element according to arr, save as dep[ele] = [...]
  const dep = {}
  for (let i = 0; i < N; i++) {
    if (arr[i] < 0) {
      continue
    }
    const d = mod(i - mod(arr[i], N), N)
    for (let j = d; j > 0; j--) {
      saveDep(dep, arr, i, mod(i - j, N))
    }
  }

  // 3. save visit state of each element in visited[e]
  const visited = {}

  // 4. iterate array 'sorted', put the least ele of no dependancy or all-dependancy-visited into result
  let t = 0
  const result = []
  while (sorted.length) {
    let l = sorted.length,
      c = l - 1
    // find the least of non-dependancy or all-dependancy-visited
    while (c >= 0) {
      if (!dep[sorted[c]] || dep[sorted[c]].length === 0) {
        break
      } else {
        let allDepVisited = true
        const ele = sorted[c]
        for (let k = 0; k < dep[ele].length; k++) {
          if (!visited[dep[ele][k]]) {
            allDepVisited = false
            break
          }
        }
        if (allDepVisited) {
          break
        }
      }
      c--
    }
    // c should always be little than l
    const ele = sorted[c]
    sorted.splice(c, 1)
    visited[ele] = true
    result.push(ele)
  }
  return result
}

const log = console.log
log(reverseHash([33, 1, 13, 12, 34, 38, 27, 22, 32, -1, 21]))
log(reverseHash([-1, -1, 13442, 17453, 25364, 10545, 27094, 17117, 17228, 13133]))
