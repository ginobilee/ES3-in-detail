// return <Dict>
// {
//   [pair]:  {
//      low: { exchange<string>, price<number> },
//      high: { exchange<string>, price<number> },
//    },
// }
{
  /* Implement function: */
}
function scan() {
  var result = {}
  // 1. get all markets by api: https://api.cryptowat.ch/markets
  getMarkets().then(function(markets) {
    var pairs = remapMarketsByPair(markets)
    var _loop_1 = function(pair) {
      var minmax = []
      var getAllOrders = []
      for (var _i = 0, _a = pair.orders; _i < _a.length; _i++) {
        var order = _a[_i]
        getAllOrders.push(requestOrder(order, minmax))
      }
      Promise.all(getAllOrders).then(function() {
        var match = getMinMaxOfOrders(minmax)
        if (!match) {
          result[pair.name] = match
        }
      })
    }
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
      var pair = pairs_1[_i]
      _loop_1(pair)
    }
  })
  return result
}
function getMarkets() {
  return fetch("https://api.cryptowat.ch/markets")
}
function remapMarketsByPair(markets) {
  var pairs = {}
  for (var _i = 0, _a = markets.result; _i < _a.length; _i++) {
    var r = _a[_i]
    if (!r.active) {
      continue
    }
    if (!pairs[r.pair]) {
      pairs[r.pair] = [r]
    } else {
      pairs[r.pair].push(r)
    }
  }
  var results = []
  for (var k in pairs) {
    if (pairs.hasOwnProperty(k)) {
      results.push({
        name: k,
        orders: pairs[k]
      })
    }
  }
  return results
}
/**
 * 获取某个 exchange 对于某个 pair 的报价峰值
 *
 * @param {*} order
 * @param {*} minmax
 */
function requestOrder(order, minmax) {
  var uri = "https://api.cryptowat.ch/markets/{order.exchange}/{order.pair}/orderbook"
  return fetch(uri).then(function(orderbook) {
    var _a = orderbook.result,
      asks = _a.asks,
      bids = _a.bids
    var min = getMinOrder(asks)
    var max = getMaxOrder(bids)
    minmax.push({
      exchange: order.exchange,
      pair: order.pair,
      min: min,
      max: max
    })
  })
}
function getMinOrder(arr) {
  var min = arr[0][0]
  for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var r = arr_1[_i]
    if (r[0] < min) {
      min = r[0]
    }
  }
  return min
}
function getMaxOrder(arr) {
  var max = arr[0][0]
  for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
    var r = arr_2[_i]
    if (r[0] > max) {
      max = r[0]
    }
  }
  return max
}
function getMinMaxOfOrders(minmax) {
  var min = minmax[0]
  var max = minmax[0]
  for (var _i = 0, minmax_1 = minmax; _i < minmax_1.length; _i++) {
    var r = minmax_1[_i]
    if (r.min < min[0]) {
      min = r
    }
    if (r.max > max[0]) {
      max = r
    }
  }
  if (min.min < max.max) {
    return {
      low: { exchange: min.exchange, price: min.min },
      high: { exchange: max.exchange, price: max.max }
    }
  } else {
    return null
  }
}

const rr = scan()
console.log(rr)
