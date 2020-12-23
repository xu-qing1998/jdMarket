
"use strict";
var LoopSlider = {
	currentIndex: 0,
	moveDis: 0,
	selector: "",
	max: 0,
	delay:800,
	duration: 300,
	easing: "ease",
	init: function(obj) {
		var _t = this;
		_t.selector = obj.el;
		$(function() {
			if (obj.easing != null)
				_t.easing = obj.easing;
			_t.duration = obj.duration;
			//initstall elements!
			_t.delay = obj.autoplay;
			if(_t.delay||_t.dalay<=0){
				_t.autoplay();
			}
			const imgs = $(obj.el).children();
			_t.moveDis = $(obj.el).width();
			_t.max = imgs.length;
			imgs.wrap("<div class='slide-frame'></div>");
			const f_clone = $(".slide-frame:first").clone();
			f_clone.insertAfter($(".slide-frame:last"));
			$(".slide-frame").wrapAll("<div class='slider-bar'></div>");
			$(".slider-bar").wrap("<div class='slider-shade'></div>")
			$(".slider-bar").css({
				overflow: "hidden",
				position: "absolute",
				left: 0,
				height: "100%",
				width: `${_t.moveDis*(imgs.length + 2)}px`
			});
			$(".slide-frame").css({
				width: `${_t.moveDis}px`,
				overflow: "hidden",
				height: "100%",
				float: "left"
			});

			$(obj.el).append("<div class='" + obj.navigator.nextEl.replace(".", "") + "'> > </div>");
			$(obj.el).append("<div class='" + obj.navigator.prevEl.replace(".", "") + "'> < </div>")
			$(obj.el).append("<div class='points'></div>");
			for (let i = 0; i < imgs.length; i++) {
				if (i == 0) {
					$(".points").append("<li class='active'></li>");
				} else {
					$(".points").append("<li></li>");
				}
			}
			_t.selector = $(".slider-bar");
			var EventListen = () => {
				$(obj.navigator.nextEl).click(() => {
					_t.next(_t);
				});
				$(obj.navigator.prevEl).click(() => {
					_t.prev(_t)
				});
			}
			EventListen();
			_t.pointsClick(_t);
		});
		$(window).resize(function(){
			$(".slider-bar").css({
				transition:"all 0s"
			});
		});
	},
	time :null,
	id:null,
	autoplay:function(){
		var _t = this;
		$(_t.selector).hover(function(){
			clearTimeout(_t.time);
			cancelAnimationFrame(_t.id);
		},function(){
			play();
		});
		var play = function(){
			_t.time = setTimeout(function(){
				_t.id = requestAnimationFrame(play);
				_t.next(_t);
			},_t.delay);
		}
		play();
	},
	prev: function(t) {
		t.currentIndex--;
		if (t.currentIndex < 0) {
			t.backCall(true, t);
			t.currentIndex = t.max - 1;
		} else {
			t.slideGoTo(t.currentIndex, t)
		}
		t.aimPoint(t.currentIndex, false);
	},
	next: (t) => {
		t.currentIndex++;
		let pageIndex = t.currentIndex;
		if (t.currentIndex > t.max) {
			t.backCall(false, t);
			t.currentIndex = 1;
		} else {
			t.slideGoTo(t.currentIndex, t)
		}
		t.aimPoint(t.currentIndex, true);
	},

	backCall: (os, _this) => {
		if (os) {
			_this.selector.css({
				transform: `translate3d(-${_this.max*_this.moveDis}px,0px,0px)`,
				transition: "all 0s"
			});
			_this.slideTo(_this, (_this.max - 1) * _this.moveDis)
		} else {
			//Right
			_this.selector.css({
				transform: `translate3d(0px,0px,0px)`,
				transition: "all 0s"
			});
			_this.slideTo(_this, _this.moveDis);
		}
	},
	slideTo: (t, backposition) => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				t.selector.css({
					transform: `translate3d(-${backposition}px,0px,0px)`,
					transition: `all ${t.duration}ms ${t.easing}`
				});
			})
		})
	},
	perIndex: 0,
	aimPoint: function(index, bool) {
		if (bool) {
			this.perIndex += 1;
		} else {
			this.perIndex -= 1;
		}
		if (this.perIndex >= this.max) {
			this.perIndex = 0;
		} else if (this.perIndex < 0) {
			this.perIndex = this.max - 1;
		}
		this.activePoint(this.perIndex);
	},
	activePoint: function(index) {
		$(".points li").eq(index).addClass("active").siblings("li").removeClass("active");
	},
	pointsClick: function(t) {
		$(".points li").hover(function() {
			t.slideGoTo($(this).index(), t);
		});
	},
	slideGoTo: function(index, t) {
		t.selector.css({
			transform: `translate3d(-${index * t.moveDis}px,0px,0px)`,
			transition: `all ${t.duration}ms ${t.easing}`
		});
		t.activePoint(index);
	},
}
