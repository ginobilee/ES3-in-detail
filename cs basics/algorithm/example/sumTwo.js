var twoSum = function(nums, target) {
  const map = Object.create(null)
  for (let i = 0, l = nums.length; i < l; i++) {
    const complement = target - nums[i]
    if (map[complement] !== undefined) {
      return [map[complement], i]
    } else {
      map[nums[i]] = i
    }
  }
  throw new Error("not found")
}

console.log(twoSum([0, 3, 4, 0], 0))
console.log(twoSum([3, 3], 6))
console.log(twoSum([2, 7, 11, 15], 9))
