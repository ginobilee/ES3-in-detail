// 1. 请用react和vue分别实现一个浮层弹窗组件（类似element-ui 和 antd 中的弹窗组件）

/* ---------------------- React ------------------------- */
// React Component
import React from 'react'

const Popup = props => {
  const { className, visible } = props
  const visibleStyle = { visibility: visible ? 'visible' : 'hidden' }
  return (
    <div
      style={visibleStyle}
      className={
        className ? `${className} popupModalWrapper` : 'popupModalWrapper'
      }
    >
      {props.children}
    </div>
  )
}

export default Popup

// style
.popupModalWrapper{
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: rgba(99, 99, 99, 0.1);
	z-index: 999;
}

// usecase
<Popup visible={true} className="myPopup">
  <p>text</p>
</Popup>



/* ---------------------- Vue ------------------------- */
<template>
  <div ref='popup' class="popup" @click='clicked'>
    <slot name='main'></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  mounted () {
    if (this.top) {
      this.$refs.popup.style.top = this.top + 'px'
    }
    if (this.bgc) {
      this.$refs.popup.style.backgroundColor = this.bgc
    }
    if (this.zindex) {
      this.$refs.popup.style.zIndex = this.zindex
    }
    if (this.position) {
      this.$refs.popup.style.position = this.position
    }
  },
  props: ['top', 'bgc', 'zindex', 'position'],
  methods: {
    clicked: function (e) {
      this.$emit('closePopup')
    }
  }
}
</script>

<style lang='scss' scoped>
.popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(99, 99, 99, 0.1);

	z-index: 999;
}
</style>

 