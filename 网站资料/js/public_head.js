(function ($){
	/* 城市选择 */  
	$('.city-location').hover(
		function (){
			$(this).addClass('hover');
		},
		function (){
			$(this).removeClass('hover');
		}
	);
	
	$("#_j_category_nav").on('mouseenter',function(){
		$(this).addClass('category-nav-on');
	}).on('mouseleave',function(){
		$(this).removeClass('category-nav-on');
	});
        
        //侧边栏购物车数量 
        function setCartNum(){
            var url = "http://www.zol.com/index.php?c=Ajax_ShopCart&a=GetCartNumber&callback=?&t="+Math.random();
            $.getJSON(
                url,
                {},
                function(data){
                    $("#cart-total").html(data.cartNumber);
                    $(".quick-entry .number").html(data.cartNumber);
                }
            );
        }
        setCartNum();

	// 分类导航后加载
	$(document).ready(function(){
		
		var nav = function(){
			var navItems = $('#J_CategoryItems')
			var navDropdown = $('#J_CategoryDropdown')

			var timer = null
			navItems.parent().on('mouseleave', function(e){
				navItems.find('.item').removeClass('hover')
			})
			navDropdown.on({
				'mouseenter': function(){
					if(timer) clearTimeout(timer)
					$(this).show()
				},
				'mouseleave': function(){
					$(this).hide()
					navItems.find('.item').removeClass('hover')
				}
			})

			navItems.menuAim({
				rowSelector: '> .item',
				activate: function(item){
					$(item).addClass('hover').siblings().removeClass('hover')
					var index = $(item).attr('data-index')
					navDropdown.show().find('#category-item-'+index)
							   .show().siblings().hide()
				},
				deactivate: function(){
					if(timer) clearTimeout(timer)
					navDropdown.hide()
				},
				exitMenu: function(){
					return true
				},
				enter: function(){
					navDropdown.show()
				}
			})
		}

		nav();
	})

var searchFunction = {
		searchKeyword: null,
		searchButton: null,
		searchHistory: null,
		searchHistoryList: null,
		searchHistoryListDel: null,
		searchHistoryListClose: null,
		getHistoryList: function () {
			if (typeof jQuery == "undefined") {
					return false;
			} else {
				var url = "http://www.zol.com/index.php?c=Ajax_PublicHead&a=AjaxGetSearchHistory&callback=?&t=" + Math.random();
				$.getJSON(url, function (data) {
						if (data.msg) {
								if($('.search').has('.search-history')){
										$('.search-history').remove()
								}
								$(".search").append(data.msg);
								searchFunction.getElements();
								searchFunction.eventListener();
						}
				});	
      }
    },
		getElements: function () {
				searchFunction.searchKeyword = document.querySelector(".search .search-text");
				searchFunction.searchButton = document.querySelector(".search .search-btn");
				searchFunction.searchHistory = document.querySelector(".search-history");
				searchFunction.searchHistoryList = document.querySelectorAll(".search-history ul li");
				searchFunction.searchHistoryListLength = document.querySelectorAll(".search-history ul li").length;
				searchFunction.searchHistoryListDel = document.querySelectorAll(".search-history ul li .delete");
				searchFunction.searchHistoryListClose = document.querySelector(".search-history .close");
				
		},
		eventListener: function () {
				
				searchFunction.searchKeyword.addEventListener("focus", function () {
						searchFunction.showHistory();
				});
				searchFunction.searchKeyword.addEventListener("click", function () {
						searchFunction.showHistory();
				});
				var index_key = -1;
				searchFunction.searchKeyword.addEventListener("keydown", function (e) {                   
						if (window.event) {
								e = window.event;
						}
						var keyNumber = e.keyCode;
						
						if (38 == keyNumber) {
								if(index_key<=0){
										index_key = searchFunction.searchHistoryListLength - 1;
								}else{
										index_key--;
								}
								$(".search ul li:eq("+index_key+")").siblings().removeClass('search-history-selected').end().addClass('search-history-selected');
								$(".search ul li:eq("+index_key+")").children('.delete').show();
								$(".search ul li:eq("+index_key+")").siblings().children('.delete').hide();
								var keyword = $(".search ul li:eq("+index_key+")").attr('keyword');
								$('.search .search-text').val(keyword);
								var tongjiVaule = $(".search ul li:eq("+index_key+")").attr('tongji');
								$('input[name="spm"]').val(tongjiVaule);
						}else if(40 == keyNumber){
								if(index_key == (searchFunction.searchHistoryListLength - 1)){
										index_key = 0;
								}else{
										index_key++;
								}
								$(".search ul li:eq("+index_key+")").siblings().removeClass('search-history-selected').end().addClass('search-history-selected');
								$(".search ul li:eq("+index_key+")").children('.delete').show();
								$(".search ul li:eq("+index_key+")").siblings().children('.delete').hide();
								var keyword = $(".search ul li:eq("+index_key+")").attr('keyword');
								$('.search .search-text').val(keyword);
								var tongjiVaule = $(".search ul li:eq("+index_key+")").attr('tongji');
								$('input[name="spm"]').val(tongjiVaule);
						}else {
						}
				});
// 搜索相关
			$('.search').on('mouseover','.search-history ul li',function(){
					index_key = $(this).index();
					$(this).siblings().removeClass('search-history-selected').end().addClass('search-history-selected');
					$(this).children('.delete').show();
					$(this).siblings().children('.delete').hide();
					var tongjiVaule = $(this).attr('tongji');
					$('input[name="spm"]').val(tongjiVaule);
			});
			$('.search').on('mouseout','.search-history',function(){
					$('input[name="spm"]').val('921');
			});
			searchFunction.searchKeyword.addEventListener('keyup',function(e){
					var searchKeywordVal    = searchFunction.searchKeyword.value;
					var searchKeywordLength = searchFunction.searchKeyword.value.length;
					if (window.event) {
							e = window.event;
					}
					var keyNumber = e.keyCode;
					if((8 == keyNumber) && (searchKeywordLength == 0)){
							/* 历史记录*/
							var url  = "http://www.zol.com/index.php?c=Ajax_PublicHead&a=AjaxGetSearchHistory&callback=?&t=" + Math.random()+"&debug=yes";
							$.getJSON(url, function (data) {
									if (data.msg) {
											if($('.search').has('.search-history')){
													$('.search-history').remove();
											}
											$(".search").append(data.msg);
											$('.search-history').css('display','block');
											searchFunction.getElements();
											index_key = -1;
									}
							});
							if(searchFunction.searchKeyword.value.length == 0){
									$('input[name="spm"]').val('921');
							}
					}else{
							/*关联记录 */
							if(searchKeywordLength > 2 && (keyNumber != 37) && (keyNumber != 38) && (keyNumber != 39) && (keyNumber != 40) && (keyNumber != 13)){
									var url  = "http://www.zol.com/index.php?c=Ajax_PublicHead&a=AjaxGetRelatedSearchHistory&callback=?&t=" + Math.random()+"&debug=yes";
									var data = {keyword:searchKeywordVal};
									$.getJSON(url, data, function (data) {
											if (data.msg) {
													if($('.search').has('.search-history')){
															$('.search-history').remove();
													}
													$(".search").append(data.msg);
													$('.search-history').css('display','block');
													searchFunction.getElements();
													index_key = -1;
											}
									});
							}
					}
			}); 
			
			searchFunction.searchKeyword.addEventListener("click", function (e) {
					searchFunction.stopPropagation(e);
			});
			$(document).click(function(event){
					index_key = -1;
					$('.search-history ul li').siblings().removeClass('search-history-selected');
					$('.search-history ul li').siblings().children('.delete').hide();
					searchFunction.hideHistory();
					
			});
			searchFunction.searchHistoryListClose.addEventListener("click", function () {
					searchFunction.hideHistory();
			});
			$('.search').on('click','.search-history ul li',function(){
					$(".search .search-text").val($(this).attr("keyword"));
					$(".search .search-btn").click();
			});
			$('.search').on('click','.search-history ul li .delete',function(e){
					e = e || window.event;
					if (e.stopPropagation) {
									e.stopPropagation();
					} else {
									e.cancelBubble = true;
					}
					var _this = $(this);
					var dataId = _this.attr("data-id");
					var url = "http://www.zol.com/index.php?c=Ajax_PublicHead&a=AjaxDeleteSearchHistory&callback=?&t=" + Math.random();
					$.getJSON(url, {dataId: dataId}, function (data) {
							if (data.flag) {
									_this.parent("li").remove();
									searchFunction.searchHistoryListLength = searchFunction.searchHistoryListLength - 1;
									var index_key1 = index_key + 1;
									$(".search ul li:eq("+index_key1+")").siblings().removeClass('search-history-selected').end().addClass('search-history-selected');
									$(".search ul li:eq("+index_key1+")").children('.delete').show();
									$(".search ul li:eq("+index_key1+")").siblings().children('.delete').hide();
									$('.search .search-text').focus();
							}
					});
			});
			},
			showHistory: function () {
			searchFunction.searchHistory.style.display = "block";
			},
			hideHistory: function () {
			searchFunction.searchHistory.style.display = "none";
			},
			stopPropagation: function (e) {
			e = e || window.event;
			if (e.stopPropagation) {
					e.stopPropagation();
			} else {
					e.cancelBubble = true;
			}
			}
			};
			searchFunction.getHistoryList();
	
		var __Window = $(window);
		var __Body = $(document);
		var topNavObj = {};
		/* 获取屏幕高度 */
		topNavObj.getClientHeight = function () {
				var clientHeight = __Window.height();
				this.winHeight = parseInt(clientHeight);
				return this.winHeight;
		};
		/* 获取当前页面已滚动的高度 */
		topNavObj.getScrollHeight = function () {
				var scrollTop = __Body.scrollTop();
				this.scrollTop = parseInt(scrollTop);
				return this.scrollTop;
		};
		/* 初始化调用 */
		topNavObj.init = function () {
				this.getClientHeight();
		};
		/* 滚动事件监听 */
		topNavObj.init();
		var topNavDiv = $("#search_layer_fixed"),
                    leftNavDiv = $('#J_fixedNavBar');
		__Window.scroll(function () {
				var hasScrollTop = topNavObj.getScrollHeight();
				if (hasScrollTop > topNavObj.winHeight) {
						topNavDiv.show();
                                                leftNavDiv.show();
				} else {
						topNavDiv.fadeOut(300);
                                                leftNavDiv.fadeOut(300);
				}
		});
		
	})(window.$ || window.jQuery);
