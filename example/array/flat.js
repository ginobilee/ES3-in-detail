// [1,[2,3]] ==》 [1,2,3]
function flatArray(arr) {
  if (!Array.isArray(arr)) {
    return []
  }
  let result = []
  for (let e of arr) {
    if (Array.isArray(e)) {
      result = result.concat(flatArray(e))
    } else {
      result.push(e)
    }
  }
  return result
}

//test
const log = console.log
log(flatArray([1, [2, 3]]).join(", "))
