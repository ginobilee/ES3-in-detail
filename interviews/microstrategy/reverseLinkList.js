function Node(val, next) {
  this.val = val;
  this.next = next || null;
}

function linkList(arr) {
  if (!Array.isArray(arr)) {
    return null;
  }
  let head = null,
    prev = head;
  arr.forEach((e, i) => {
    let node = new Node(e, null);
    if (i === 0) {
      head = node;
      prev = head;
    } else {
      prev.next = node;
      prev = node;
    }
  });
  return head;
}
const isGroupHead = index => index % 3 === 1;
const isGroupTail = index => index % 3 === 0;
function reverseWithInterval2(root, n) {
  // 保存当前节点为nextTail。遍历链表，同时l自减，如果此时l对n取模为1，则将它指向currentTail，并将nextTail = prevTail。
  let head = null,
    lastGroupTail = null,
    currentGroupTail = null,
    prev = null,
    current = root,
    next = null,
    index = 1;
  while (current !== null) {
    if (isGroupHead(index)) {
      currentGroupTail = current;
    } else if (isGroupTail(index) || current.next === null) {
      if (lastGroupTail) {
        lastGroupTail.next = current;
      } else {
        head = current;
      }
      lastGroupTail = currentGroupTail;
    }
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;

    if (isGroupTail(index)) {
      prev = null;
    }
    index++;
  }
  return head;
}
function reverseWithInterval(root, n) {
  // 首先反转链表
  const { reversedRoot, index: i } = reverse(root);
  // 保存当前节点为nextTail。遍历链表，同时l自减，如果此时l对n取模为1，则将它指向currentTail，并将nextTail = prevTail。
  let tail = null,
    current = reversedRoot,
    nextTail = reversedRoot;
  let index = i;
  while (index >= 0) {
    nextTail = current;
    while (index % n !== 0) {
      index--;
      current = current.next;
    }
    let next = current.next;
    current.next = tail;
    current = next;
    tail = nextTail;
    index--;
  }
  return nextTail;
}

function reverse(root) {
  let l = 0;
  if (!root) {
    return { reversedRoot: null, index: 0 };
  }
  let current = root,
    prev = null,
    next = null;

  while (current !== null) {
    l++;
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return { reversedRoot: prev, index: l - 1 };
}

const arr = [1, 2, 3];
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];

const root1 = reverseWithInterval(linkList(arr), 3);
const root2 = reverseWithInterval(linkList(arr1), 3);
logLinkList(root1);
logLinkList(root2);
logLinkList(reverseWithInterval2(linkList(arr1), 3));

function logLinkList(head) {
  let current = head;
  while (current !== null) {
    console.log(current.val + "->");
    current = current.next;
  }
  console.log("null");
}
