/*
 功能说明:
 1. 点击向右(左)的图标, 平滑切换到下(上)一页
 2. 无限循环切换: 第一页的上一页为最后页, 最后一页的下一页是第一页
 3. 每隔3s自动滑动到下一页
 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
 5. 切换页面时, 下面的圆点也同步更新
 6. 点击圆点图标切换到对应的页

 bug: 快速点击下一页时, 有问题
 */
$(function () {
  var $container = $('#image-lunbo')
  var $list = $('#secondcontainer')
  var $points = $('#pointasecond>a')
  var TIME = 400 // 移动的总时间
  var ITEM_TIME = 20 //单元移动的间隔时间
  var PAGE_WIDTH = 100 // 一页的宽度
  var imgCount = $points.length //图片的数量
  var index = 0 //当前圆点的下标
  var moving = false //是否正在翻页中



  // 3. 每隔3s自动滑动到下一页
  var intervalId = setInterval(function () {
    nextPage(true)
  }, 1000)

  // 4. 当鼠标进入图片区域时, 自动切换停止, 当鼠标离开后,又开始自动切换
  $container.hover(function () {
    clearInterval(intervalId)
  }, function () {
    intervalId = setInterval(function () {
      nextPage(true)
    }, 1000)
  })

  // 6. 点击圆点图标切换到对应的页
  $points.mouseenter(function () {
    var targetIndex = $(this).index()
    if(targetIndex!=index) {
      nextPage(targetIndex)
    }
  })

  /**
   * 平滑翻页
   * @param next
   *  true: 翻到下一页
   *  false: 翻到上一页
   *  数值: 翻到指定页
   */
  function nextPage (next) {
    
    if(moving) {
      return
    }
    moving = true // 标识正在翻页中

    var offset = 0 //移动的总距离
    // 计算offset
    if(typeof next==='boolean') {
      offset = next ? -PAGE_WIDTH : PAGE_WIDTH
    } else {
      offset = -PAGE_WIDTH * (next - index)
    }

    // 计算单元移动的距离
    var itemOffset = offset/(TIME/ITEM_TIME)
    // 当前的left
    var currLeft = $list.position().left
    // 目标的left
    var targetLeft = currLeft + offset
    // 启动循环定时器不断移动, 到达目标位置时清除定时器
    var intervalId = setInterval(function () {
      // 计算当前要设置的left
      currLeft += itemOffset
      if(currLeft===targetLeft) {
        //清除定时器
        clearInterval(intervalId)
        //标识翻页完成
        moving = false

        // 如果滑动到了最左边的图片, 直接跳转到最右边的第2张图片
        if(currLeft===0) {
          currLeft = -PAGE_WIDTH * imgCount
        } else if(currLeft===-PAGE_WIDTH*(imgCount+1)) {
          // 如果滑动到了最右边的图片, 直接跳转到最左边的第2张图片
          currLeft = -PAGE_WIDTH
        }
      }
      // 更新$list的left样式
      $list.css({
        left: currLeft
      })
    }, ITEM_TIME)

    // 5. 切换页面时, 下面的圆点也同步更新
    updatePoints(next)
  }

  /**
   * 更新标识圆点
   * @param next
   */
  function updatePoints (next) {
    var targetIndex = 0
    // 计算目标下标
    if(typeof next==='boolean') {
      if(next) {
        targetIndex = index + 1
        if(targetIndex===imgCount) {
          targetIndex = 0
        }
      } else {
        targetIndex = index-1
        if(targetIndex===-1) {
          targetIndex = imgCount-1
        }
      }
    } else {
      targetIndex = next
    }
    // 移除当前下标元素的class
    $points[index].className = ''
    // 给目标下标的元素指定class
    $points[targetIndex].className = 'on'
    //更新当前下标
    index = targetIndex
  }
})