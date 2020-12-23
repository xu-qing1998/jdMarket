function $(class){
				return document.getElementsByClassName(class);
			}
  
  /**
   * 给指定id对应的元素绑定点击监听
   * @param {Object} id
   * @param {Object} callback
   */
  function click(class, callback) {
    $(class).onclick = callback;
  }

  window.onload = function () {

    var listDiv = $("imglist");
    var totalTime = 400;
    /*换页的总时间*/
    var intervalTime = 20;/*//移动的间隔时间*/
    var intervalId;/*//循环定时器的id(翻页中的不移动)*/
    var imgCount = 7; /*//图片的个数*/
    var moveing = false; /*//是否正在移动中*/
    var index = 0;/*//当前显示图片的下标(从0开始到imgCount-1)*/
    var buttonSpans = $("food-banner-nav").children; /*//所有标识圆点标签的集合*/
    var containerDiv = $("food-banner-list");
    var intervalId2; /*//循环定时器的id(自动翻页)*/

    /*//给下一页绑定点击监听*/
    click("food-banner-left", function () {
      /*//切换到下一页*/
      nextPage(true);
    });

    /*//给上一页绑定点击监听*/
  
    click("food-banner-left", function () {
      /*//切换到上一页*/
      nextPage(false);
    });

    /*//给所有的提示圆点绑定点击监听*/
    clickButtons();

    /*//启动定时自动翻页*/
    autoNextPage();
    /*//给容器div绑定鼠标移入的监听: 停止自动翻页*/
    containerDiv.onmouseover = function () {
      clearInterval(intervalId2);
    }
    /*//给容器div绑定鼠标移出的监听: 启动自动翻页*/
    containerDiv.onmouseout = function () {
      autoNextPage();
    };

    /**
     * 启动定时自动翻页
     */
    function autoNextPage() {
      intervalId2 = setInterval(function () {
        nextPage(true);
      }, 3000);
    }

    /**
     * 切换到下一页/上一页
     * true 下
     * false 上
     * index 目标页
     * @param {Object} next true
     */
    function nextPage(next) {

     /* //如果正在移动, 直接结束*/
      if (moveing) {
        return;
      }
     /* //标识正在移动*/
      moveing = true;

      /*//需要进行的总偏移量*/
      var offset;
      if (typeof next === 'boolean') {
        offset = next ? -600 : 600;
      } else {
        offset = -600 * (next - index);
      }
      //var offset = next ? -600 : 600;
      /*//每个小移动需要做的偏移量*/
      var itemOffset = offset / (totalTime / intervalTime);
      /*//切换完成时div的left的坐标*/
      var targetLeft = listDiv.offsetLeft + offset;
      /*//循环定时器*/
      intervalId = setInterval(function () {
        //var currentLeft = listDiv.offsetLeft;
        /*//得到当前这次偏移的样式left坐标*/
        var left = listDiv.offsetLeft + itemOffset;
        /*//如果已经到达目标位置*/
        if (left == targetLeft) {
          /*//移除定时器*/
          clearInterval(intervalId);

          /*//如果当前到达的是最左边的图片, 跳转到右边第二张图片的位置*/
          if (left == 0) {
            left = -imgCount * 600;
          } else if (left == -600 * (imgCount + 1)) {//如果当前到达的是最右边的图片, 跳转到左边第二张图片的位置
            left = -600;
          }
          /*//标识没有移动了*/
          moveing = false;
        }
        /*//指定div新的left坐标*/
        listDiv.style.left = left + "px";
      }, intervalTime);

      /*//更新标识圆点*/
      updateButtons(next);
    }

    /**
     * 更新标识圆点
     * @param {Object} next
     */
    function updateButtons(next) {
      /*//将当前的圆点更新为一般圆点*/
      buttonSpans[index].removeAttribute("class");
      /*//计算出目标圆点的下标*/
      var targetIndex;
      if (typeof next == 'boolean') {
        if (next) {
          targetIndex = index + 1;
          if (targetIndex == imgCount) {
            targetIndex = 0;
          }
        } else {
          targetIndex = index - 1;
          if (targetIndex == -1) {
            targetIndex = imgCount - 1;
          }
        }
      } else {
        targetIndex = next;
      }
      /*//将标圆点的下标更新为当前下标*/
      index = targetIndex;
      /*//将目标圆点设置为当前圆点*/
      buttonSpans[index].className = 'on';
    }

    /**
     * 给所有的圆点设置点击监听
     */
    function clickButtons() {
      for (var i = 0, length = buttonSpans.length; i < length; i++) {

        buttonSpans[i].index = i;
        buttonSpans[i].onclick = function () {
          nextPage(this.index);
        };

        /*
         (function (index) {
         buttonSpans[index].onclick = function () {
         nextPage(index);
         };
         })(i);
         */
      }
    }
  };