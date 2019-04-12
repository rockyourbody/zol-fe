(function ($) { 
	$(function(){
		/* 城市选择 */ 
		$('.city-location').hover(
			function (){
				$(this).addClass('hover');
			},
			function (){
				$(this).removeClass('hover');
			}

		);	
                $('.close-btn').click(function(){
                    $('.evaluate-layer_main h4').html('');
                    $('#iframe').contents().find("body").html('');
                });
		// 焦点图
		var focusSilde = $('#J_FocusSlider')
		if(focusSilde.find('li').length > 1){
			var _focusbxSlider = focusSilde.bxSlider({
				mode : 'fade',
				auto: true,
				prevText: '<span class="bg_mask"></span><span class="arrow"></span>',
				nextText: '<span class="bg_mask"></span><span class="arrow"></span>'
			});
			$('.focus-box .bx-wrapper').on({
				'mouseenter': function(){
					_focusbxSlider.stopAuto();
				},
				'mouseleave': function(){
					_focusbxSlider.startAuto();
				}
			});
		}


		//团购焦点图
		var tuanSilde = $('#J_tuanSlider')
		if(tuanSilde.find('ul').length > 1){
			var _recbxSlider = tuanSilde.bxSlider({
				auto: true,
				nextText: '',
				prevText: '',
				speed : 800
			})
			$('.tuan-slide').on({
				'mouseenter': function(){
					_recbxSlider.stopAuto()
				},
				'mouseleave': function(){
					_recbxSlider.startAuto()
				}
			})
			$('.tuan-slide .bx-wrapper').on({
				'mouseenter': function(){
					$(this).parent().css('overflow','visible')
					$(this).find('.bx-controls-direction').fadeIn()
				},
				'mouseleave': function(){
					$(this).find('.bx-controls-direction').fadeOut('fast')
				} 
			})
		}

		//设置悬浮框的位置
		var fixedNavBarTop =  $('#J_tuanSection').offset().top + 194;
		$('#J_fixedNavBar').css('top',fixedNavBarTop + 'px');
		$(window).scroll(function () {
		  if($(window).scrollTop() >= (fixedNavBarTop-68)){
		  	$('#J_fixedNavBar').css({'position':'fixed','top':'68px'});
		  }else{
		  	$('#J_fixedNavBar').css({'position':'absolute','top':fixedNavBarTop + 'px'});
		  }
		});

		/* wen.xudong's js start */
		/* 栏目模块区域焦点图 */
		var columnFocus = {};
		$('.column-focus_list').each(function (index) {
			var oName = 'columnFocus' + index;
			columnFocus[oName] = $(this).bxSlider({
				auto: true,
				autoHover: true,
				prevText: '',
				nextText: '',
				speed: 1000
			});
			$('.column-focus').eq(index).mouseout(function () {
				columnFocus[oName].startAuto();
			});
		});


		/* 数码选择 */
		$('.column-box_tab').each(function () {
			var tab = $(this).find('.column-hd_tab .tab-btn');
			var con = $(this).find('.column-con_tab .tab-con');
			tab.on('click', function () {
				$(this).addClass('cur').siblings().removeClass('cur');
				var oIndex = $(this).index();
				con.eq(oIndex).addClass('cur').siblings().removeClass('cur');
				$.each(columnFocus, function (item) {
					columnFocus[item].reloadSlider();
				});
			});
		});


		// 评测弹层
		var evaluate = {
			// options: {
			// 	// 滚动条缓存
			// 	evaluateScrollBar: null
			// },

			event: function () {
				var _this = this;

				// tab
				$('.evaluate-hd_tab').on('click', '.tab-btn', function () {
					$(this).addClass('cur').siblings().removeClass('cur');
				});

				// 关闭
				$('.evaluate-layer_hd').on('click', '.close-btn', function () {
					$('.evaluate-layer').hide();
				});

				// 同城购评测查看
				$('.citywide-ware_list').on('click', '.ware-detail .function-icon', function () {
					var seeType = $(this).attr('dataSeeType');
					_this.see(seeType);
					
				});

				// 其他栏目评测查看
				$('.function-upward_region').on('click', '.ware-detail a', function () {
					var seeType = $(this).attr('dataSeeType');
					_this.see(seeType);
				});
				
				// 团购评测查看
				$('.tuan-slide').on('click', '.tuan-pro-picside a', function () {
					var seeType = $(this).attr('dataSeeType');
					_this.see(seeType);
				});
                                // 智能精选
                                $('.noopsyche-inner').on('click', '.noopsyche-pro-list .ware-detail a', function () {
					var seeType = $(this).attr('dataSeeType');
					_this.see(seeType);
				});

			},
			// 查看响应
			see: function (num) {
				$('.evaluate-layer').show();
				$('.evaluate-hd_tab .tab-btn').eq(num).addClass('cur').siblings().removeClass('cur');
			},

			init: function () {
				this.event();
			}
		};
		evaluate.init();

        var domEleSta={
			aFloorNav:$('.fixed-nav-bar .floor'),
			aMoudle:$('.floor-moudle'),
			oTop:$('.back-top')
		};
		var stair={
			aEvent:{
				goTop:function (){
					$('body,html').animate({'scrollTop':0},700);
				},
				floor:function (event){
					var ele=event.data;
					var t=ele.aMoudle.eq($(this).index()).offset().top;
					t-=50;
					$('body,html').animate({'scrollTop':t},500);
				}
			},
			anchor:function (ele){
				ele.oTop.click(ele,stair.aEvent.goTop);
				ele.aFloorNav.click(ele,stair.aEvent.floor);
			},
			init:function (ele){
				stair.anchor(ele);
			}
		};
		stair.init(domEleSta);

		// 到店玩
		(function (){

			var arrivalBox = $('.arrival_ware-list'),
				arrivalItem = $('.arrival_ware-list .item'),
				arrivalTl = $('.arrival_ware-list .tl'),
				now = 0;

			function arrivalReset(){
				arrivalItem.each(function (i) {
					if (i !=0) {
						arrivalItem.eq(i).css('left', 806 + (i-1) * 60 + 'px');
					}
				});			
			};

			function arrivalHover (curIndex){
				arrivalItem.each(function (i) {
					arrivalItem.eq(i).removeClass('cur');
					if (curIndex >= i) {
						arrivalItem.eq(i).stop().animate({left: i * 60})
					}
					else {
						arrivalItem.eq(i).stop().animate({left: 806 + (i -1) * 60})
					}
				});
				arrivalItem.eq(curIndex).addClass('cur');
			};

			arrivalTl.mouseover(function (){
				arrivalHover($(this).index('.arrival_ware-list .tl'));
			});

			arrivalReset();			
		})();
		/* wen.xudong's js end */

		// add by jialp at 20170811		
		$.fn.getLazyArea=function(){
	        var lazyarea = $(this).children('textarea');
	        if(lazyarea.length == 1) {
	            lazyarea.hide();
	            var lazyhtml = lazyarea.val();
	            $(this).html(lazyhtml);
	        }
	    };

		$.fn.lazyNavi=function(nor,act,tm,flag,event_type){
	        var navi_over  = '';
	        if(event_type){
	            $(this).children().click(function(){
	                var self = this;
	                navi_over = setTimeout(function(){
	                    if($(self) == null || $(self).attr("rel") == null) return;
	                    if($(self).hasClass(nor) || !$(self).hasClass(act)){
	                        if(act) {
	                            act_class = '.'+act;
	                        } else {
	                            act_class = '[class="'+act+'"]';
	                        }
	                        var act_navi = $(self).siblings(act_class);
	                        if(act) {
	                            act_navi.removeClass(act);
	                        }
	                        if(nor) {
	                            act_navi.addClass(nor);
	                        }
	                        var rel_div = act_navi.attr("rel");
	                        $("#"+rel_div).hide();
	                        var now_div =$(self).attr("rel");
	                        if(nor) {
	                            $(self).removeClass(nor);
	                        }
	                        if(act) {
	                            $(self).addClass(act);
	                        }
	                        if(flag) {
	                            $("#"+now_div).getLazyArea();
	                        }
	                        $("#"+now_div).show();
	                    }
	                },tm);
	            });
	        }else{
	            $(this).children().mouseover(function(){
	                var self = this;
	                navi_over = setTimeout(function(){
	                    if($(self) == null || $(self).attr("rel") == null) return;
	                    if($(self).hasClass(nor) || !$(self).hasClass(act)){ 
	                        if(act) {
	                            act_class = '.'+act;
	                        } else {
	                            act_class = '[class="'+act+'"]';
	                        }
	                        var act_navi = $(self).siblings(act_class);
	                        if(act) {
	                            act_navi.removeClass(act);
	                        }
	                        if(nor) {
	                            act_navi.addClass(nor);
	                        }
	                        var rel_div = act_navi.attr("rel");
	                        $("#"+rel_div).hide();
	                        var now_div =$(self).attr("rel");
	                        if(nor) {
	                            $(self).removeClass(nor);
	                        }
	                        if(act) {
	                            $(self).addClass(act);
	                        }
	                        if(flag) {
	                            $("#"+now_div).getLazyArea();
	                        }
	                        $("#"+now_div).show();
	                        if(act=='category-item-active'){
	                            $(self).removeClass('category-item-hover');  
	                        }
	                        
	                    }
	                },tm);
	            });
	        }
	        $(this).children().mouseout(function(){
	            if(navi_over) {
	                clearTimeout(navi_over);
	            }
	        });
	    };

		// 智能精选 焦点图 J_noopsycheSlide
		$('.switc').lazyNavi("","active",100,1);


		// 到店团
		$('.tuan_ware-arrival').on('click','.arrival-btn',function (){
                    var merId   = $(this).attr('data-merid');
                    var goodsId = $(this).attr('data-goodsid');
                    var skuId   = $(this).attr('data-skuid');
                    var provinceId = $(this).attr('data-proid');
			var tuan = layerTuan.create({
				'storeId':merId,	// 门店ID
				'goodsId':goodsId,	// 商品ID
                                'skuId':skuId,
				'provinceId': provinceId,	// 省ID
				'addressUrl': '/index.php?c=IndexNew&a=AjaxGetCityInfo', 	// 获取区域
				'gainUrl': '/index.php?c=IndexNew&a=AjaxGetTcgShop', 	// 获取区域店面
				'subUrl': '/index.php?c=IndexNew&a=AjaxSaveReachStoreOrder'   //提交地址
			});
		});

	});
})(window.$ || window.jQuery);