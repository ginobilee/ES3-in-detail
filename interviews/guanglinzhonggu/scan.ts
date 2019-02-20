/**
1. get all markets by api: https://api.cryptowat.ch/markets
2.  sort the result with pair as id
3. for (let pair of pairs) {
    const minmax = []
    for (let order of pair.orders) {
      get order book of the order
      get min(ask) and max(bid)
      minmax.push(min, max)
    }
    calculate the min and max
  }
 */
interface PairRecord {
  exchange: string;
  price: number;
}
interface Match<T> {
  low: T;
  high: T;
}
interface Order {
  id: number;
  exchange: string;
  pair: string;
  active: boolean;
  route: string;
}
interface Pair {
  name: string;
  orders: Array<Order>;
}
interface MinMaxOfOrderBook {
  exchange: string;
  pair: string;
  min: number; // min of asks
  max: number; // max of bids
}
function scan() {
  const result = {}
  // 1. get all markets by api: https://api.cryptowat.ch/markets
  getMarkets().then(markets => {
    // 2. remap the structure
    const pairs = remapMarketsByPair(markets)
    const promises = []
    // 3. get minmax for each pair
    for (let pair of pairs) {
      promises.push(getSingleMatch(pair, result))
    }
    // 4. return after all pairs are done
    Promise.all(promises).then(() => {
      return result
    })
  })

  return result
}
/**
 * 对于每个pair， 获取不同exchange的orderbook，计算得到峰值
 * 
 * @param pair 
 * @param result 
 */
function getSingleMatch(pair, result) {
  return new Promise(resolve => {
    const minmax: Array<MinMaxOfOrderBook> = []
    const getAllOrders = []
    for (let order of pair.orders) {
      getAllOrders.push(requestOrder(order, minmax))
    }
    Promise.all(getAllOrders).then(() => {
      const match: Match<PairRecord> = getMinMaxOfOrders(minmax)
      if (!!match) {
        result[pair.name] = match
      }
      resolve()
    })
  })
}
function getMarkets() {
  return fetched("https://api.cryptowat.ch/markets")
}
function remapMarketsByPair(markets): Array<Pair> {
  const pairs = {}
  for (let r of markets.result) {
    if (!r.active) {
      continue
    }
    if (!pairs[r.pair]) {
      pairs[r.pair] = [r]
    } else {
      pairs[r.pair].push(r)
    }
  }
  const results = []
  for (let k in pairs) {
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
  const uri = `https://api.cryptowat.ch/markets/${order.exchange}/${order.pair}/orderbook`
  return fetched(uri).then(orderbook => {
    const { asks, bids } = orderbook.result
    const min = getMinOrder(asks)
    const max = getMaxOrder(bids)
    minmax.push({
      exchange: order.exchange,
      pair: order.pair,
      min,
      max
    })
  })
}
function getMinOrder(arr) {
  let min = arr[0][0]
  for (let r of arr) {
    if (r[0] < min) {
      min = r[0]
    }
  }
  return min
}

function getMaxOrder(arr) {
  let max = arr[0][0]
  for (let r of arr) {
    if (r[0] > max) {
      max = r[0]
    }
  }
  return max
}
/**
 * 根据每个 exchange 的峰值输出该pair 的峰值
 * 
 * @param minmax 
 */
function getMinMaxOfOrders(minmax: Array<MinMaxOfOrderBook>) {
  let min = minmax[0]
  let max = minmax[0]
  for (let r of minmax) {
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
function fetched(uri) {
  return fetch(uri)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      throw response
    })
    .then(response => {
      let contentType = response.headers.get("content-type")

      if (contentType && contentType.includes("application/json")) {
        return response.json()
      }
      throw new TypeError("返回的数据类型出错!")
    })
}