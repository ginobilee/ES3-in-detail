const log = console.log
const original = "012345"
log(original.substring(-1) === "012345")
log(original.substring(1, 3) === "12")

// slice
log(original.slice(1, 3) === original.substring(1, 3))
log(original.slice(1) === original.substring(1))
log(original.slice(-1) !== original.substring(-1))
log(original.slice(-1) === "5")
log(original.slice(1, 7) === original.substring(1, 7))
log(original.slice(5, 3))
log(original.slice(5, 3) === original.substring(5, 3))
log(original.slice(-1))
log(original.slice(-1, 3))
log(original.substring(5, 3))
