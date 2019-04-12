(function ($){
	
	// 弹层
	window.layerTuan = (function (){

		// 实例容器
		var instance;
		var layerTem = '<span class="layerbox-tuan_closebtn">×</span>\
						<div class="layerbox-tuan_item layerbox-tuan_itemmap">\
							<div class="layerbox-tuan_header">\
								<span class="layerbox-tuan_header_line"></span>\
								<h3>选择门店</h3>\
							</div>\
							<div class="layerbox-tuan_filter clearfix">\
								<div class="layerbox-tuan_selectbox">\
									<input type="text" value="北京市" class="layerbox-tuan_selectbox_label" readonly="readonly" autocomplete="off" disabled="disabled">\
								</div>\
								<div class="layerbox-tuan_selectbox">\
									<input data-id="" type="text" value="海淀区" readonly="readonly" autocomplete="off" class="layerbox-tuan_selectbox_label">\
									<ul class="layerbox-tuan_selectbox_pop" style="display: none"></ul>\
								</div>\
							</div>\
							<div class="layerbox-tuan_shopbox">\
								<ul class="layerbox-tuan_shoplist"></ul>\
								<div class="layerbox-tuan_page"></div>\
							</div>\
							<div class="layerbox-tuan_shopmap" id="layerboxTuanShopmap">\
							</div>\
						</div>';

		var layerBuy = '<div class="layerbox-tuan_item layerbox-tuan_itembuy">\
							<div class="layerbox-tuan_header">\
								<span class="layerbox-tuan_header_line"></span>\
								<h3>预约购买</h3>\
							</div>\
							<div class="layerbox_bespoke_header"><h3></h3><span class="layerbox_bespoke_elseshopbtn">选择其他门店 &gt;</span></div>\
							<div class="layerbox_bespoke">\
					            <form name="to-store-form" id="to-store-form" onsubmit="return false;">\
					                <div class="clearfix">\
					                    <div class="order-left">\
					                        <dl class="list-item linkman">\
					                            <dt><i>*</i>您的称呼:</dt>\
					                            <dd>\
					                                <input class="text" type="text" name="linkName" value="" maxlength="10">\
					                                <label class="radio" for=""><input name="dsex" value="1" type="radio">女士</label>\
					                                <label class="radio" for=""><input name="dsex" value="2" type="radio" checked="">男士</label>\
					                                <div class="wrond-tip" id="linkman-wrond-tip">请填写您的称呼</div>\
					                            </dd>\
					                        </dl>\
					                        <dl class="list-item phone">\
					                            <dt><i>*</i>手机号:</dt>\
					                            <dd>\
					                                <input class="text" type="text" name="mobile" value="" maxlength="11">\
					                                <span class="send-code" id="store-send-code">发送验证码</span>\
					                                <div class="wrond-tip" id="mobile-wrond-tip">请填写您的手机号</div>\
					                            </dd>\
					                        </dl>\
					                        <dl class="list-item">\
					                            <dt><i>*</i>验证码:</dt>\
					                            <dd>\
					                                <input class="text" type="text" name="verifyCode" value="" maxlength="6">\
					                                <div class="wrond-tip" id="code-wrond-tip">验证码错误</div>\
					                            </dd>\
					                        </dl>\
					                        <dl class="list-item">\
					                            <dt>留言:</dt>\
					                            <dd>\
					                                <textarea placeholder="可以留言给商家" name="storeOrderNotice" maxlength="20" fn="limit" limit="20" tipsid="to-store-notice-tips"></textarea>\
					                                <span class="num"><em id="to-store-notice-tips">0</em>/20</span>\
					                            </dd>\
					                        </dl>\
					                    </div>\
					                    <div class="order-right wStore-business-contain">\
					                        <dl class="clearfix address">\
					                            <dt>所在地区:</dt>\
					                            <dd><span class="address-area"></span></dd>\
					                        </dl>\
					                        <dl class="clearfix address">\
					                            <dt>商家地址:</dt>\
					                            <dd>\
					                                <span class="address-text"></span>\
					                            </dd>\
					                        </dl>\
					                        <dl>\
					                            <dt>预约方式:</dt>\
					                            <dd>\
					                                <label><input class="radio" type="radio" checked="">免费获取预约码<span class="gray-color" style="font-size: 12px;">(凭码购买获到店优惠)</span></label>\
					                            </dd>\
					                        </dl>\
					                    </div>\
					                </div>\
					                <div class="layerbox_bespoke-button">\
					                    <button type="submit" id="submit-store-buy-order">提交预约</button>\
					                    <button class="cancle submit-store-buy-order-cancle">取消</button>\
					                </div>\
					            </form>\
					        </div>\
						</div>';

		// 创建弹层（实例）
		function SingLeton(args){
                    this.options = {};

                    this.layer = $('<div class="layerbox-tuan">').appendTo(document.body);
                    this.layer.html(layerTem);
                    this.layer.append(layerBuy);
                    this.options = $.extend(this.options, args);
                    this.init();

                }; 

		SingLeton.prototype = {
                    show: function (arg){				
                        this.layer.show();				
                    },
			// 获取城市数据
			_getCity:function(){
				var _this = this;
				$.ajax({
					type : "GET",
					url : _this.options.addressUrl,
					dataType:'json',
					data:{
                                            provinceId: _this.options.provinceId		
					}, 
					error : function(){},
					success : function(data){
                                            if (data.status){
                                                var dataCity = data.info,
                                                        str = '';
                                                var key = 0;
                                                for (var i in dataCity){
                                                    if(!key) {
                                                        var key = i;
                                                    }
                                                    str += '<li data-city="'+ dataCity[i].cityId +'" data-province="'+ dataCity[i].provinceId +'">'+ dataCity[i].name +'</li>';
                                                }

                                                $('.layerbox-tuan_selectbox_pop').html(str);	// 区
                                                _this.options.cityId = $('.layerbox-tuan_selectbox_pop li').eq(0).attr('data-city');
                                                $('.layerbox-tuan_selectbox_label').eq(0).val(dataCity[key].provinceName);
                                                $('.layerbox-tuan_selectbox_label').eq(1).val(dataCity[key].name);
                                                if(_this.options.provinceId != 1) {
                                                    console.log(_this.options.provinceId);
                                                    $('.layerbox-tuan_selectbox_label').eq(1).attr("readonly","readonly");
                                                    $('.layerbox-tuan_selectbox_label').eq(1).attr("disabled","disabled");
                                                }
                                                $.SelectShow();
                                                _this._getWareData();
                                            }
					}
				});		

			},
			// 获取门店产品数据
			_getWareData:function(pageNum){
				var _this = this;
				var pageCur = pageNum || 1;
                               
				$.ajax({
					type : "GET",
					url : _this.options.gainUrl,
					dataType:'json',
					data:{
						merchantId: _this.options.storeId,		// 门店ID
						goodsId: _this.options.goodsId,		// 商品ID 
						provinceId: _this.options.provinceId,		// 省ID
						cityId: _this.options.cityId,		// 市ID 
						page: pageCur			// 当前页数
					}, 
					error : function(){},
					success : function(data){
                                                
						// 设置分页
						_this._setPage(data.page);
						// 设置产品
						_this._setWare(data.data);
						// 设置地图
						_this._setMap(data.data);
						
					}
				});
			},
			// 设置分页
			_setPage:function (pageData){

				var pageCur = pageData.cur || 1,
					pageSum = pageData.sum;
				var str=''; 
				if (1 == pageSum){
					str += '<span class="no-prev">上一页</span><span class="current">1</span><span class="no-next">下一页</span>';
				}else {
					if (pageCur > 1){
						var prevPage = (pageCur - 1);                 
							str += '<a href="javascript:void(0)" class="prev" dataPageCur = '+ prevPage +'>上一页</a>';
					}
					else{
						str += '<span class="no-prev">上一页</span>';
					}

					if (pageSum <= 3){
						for (var i = 1; i<= pageSum; i++){
							if (pageCur == i){
								str += '<span class="current">'+i+'</span>';
							}else{                                
								str += '<a href="javascript:void(0)" dataPageCur = '+ i +'>'+i+'</a>';
							}                            
						}
					}else{
						if (pageCur <= 3){
							for (var i = 1; i<= 3; i++){
								if (pageCur == i){
									str += '<span class="current">'+i+'</span>';
								}else{                                    
									str += '<a href="javascript:void(0)" dataPageCur = '+ i +'>'+i+'</a>';
								}                            
							}                            
							str += '...';                            
						}else{
							str += '...';
							var start = pageCur - 1;
							var end   = pageCur + 1;
							if (end >= pageSum){
								end = pageSum;
							}
							for (var i = start; i <= end; i++){
								if (pageCur == i){
									str += '<span class="current">'+i+'</span>';
								}else{                                    
									str += '<a href="javascript:void(0)" dataPageCur = '+ i +'>'+i+'</a>';
								}                              
							}
							if(pageCur != pageSum){
								str += '...';
							}
						}
					}

					if (pageCur == pageSum){
						str += '<span class="no-prev">下一页</span>';
					}else{
						var nextPage = (pageCur + 1);
						str += '<a href="javascript:void(0)" class="next" dataPageCur = '+ nextPage +'>下一页</a>';
					}                    
				};
				$('.layerbox-tuan_page').html(str);		// 分页
			},
			// 设置产品
			_setWare: function (goodsData){

				var str = '';
				for (var i = 0; i < goodsData.length; i++){
					str += '<li>\
								<span class="layerbox-tuan_shoplist_num">'+ (i+1) +'</span>\
								<h4>'+ goodsData[i].title +'</h4>\
								<p>'+ goodsData[i].address +'</p>\
								<div data-merid="'+ goodsData[i].sid +'" data-merids="'+ goodsData[i].id +'" class="layerbox-tuan_shoplist_gobtn">到这去</div>\
							</li>'
				};

				$('.layerbox-tuan_shoplist').html(str);		// 产品

			},
			// 绑定事件			
			_bindEvent:function (){
				var _this = this;

				// 翻页
				$('.layerbox-tuan_page').on('click','a',function (){
					var dataPageNum = $(this).attr('dataPageCur');
					_this._getWareData(dataPageNum);
				});

				// 到店预约
				$('.layerbox-tuan_shoplist').on('click','.layerbox-tuan_shoplist_gobtn',function (){
					var merid  = $(this).data('merid');
                                        var merids = $(this).data('merids');
					_this.createBespoke(merid,merids,_this.options.goodsId,_this.options.skuId);
				});

				// 关闭
				$('.layerbox-tuan_closebtn').on('click',function (){
					$('.layerbox-tuan').remove();
				});
                                // 关闭
				$('.submit-store-buy-order-cancle').on('click',function (){
					$('.layerbox-tuan_itembuy').css('top','540px');
				});

				// 去选择区域
				$('.layerbox-tuan_selectbox_pop').on('click','li',function (){
					_this.options.cityId = $(this).attr('data-city');
					_this._getWareData();
				});


			},

			// 百度地图
			_setMap: function (goodsData){
                                var x = goodsData[0]['x']
                                var y = goodsData[0]['y']
				var map = new BMap.Map(layerboxTuanShopmap) // 创建百度地图实例
				map.enableScrollWheelZoom(true);
				map.centerAndZoom(new BMap.Point(x, y), 11);  // 初始化地图,设置中心点坐标和地图级别

				// 自定义函数 添加地图标识
				function addMarker(point,icon){
					var marker = new BMap.Marker(point,icon);
					map.addOverlay(marker);		// 将标注添加到地图中
				}

				for (var i = 0; i < goodsData.length; i++){
					
					var pt = new BMap.Point(goodsData[i]['x'], goodsData[i]['y']);
					var myIcon = new BMap.Icon('http://icon.zol-img.com.cn/newshop/shop/index/icon'+ (i + 1) +'.png', new BMap.Size(21,31));
					addMarker(pt, {icon: myIcon});           
				}


			},

			createBespoke:function(merchantId,merchantIds,goodsId,skuId){
				var _this = this;
				if(!merchantId && !goodsId) return;
				$.ajax({
					type: "get",
					url: "/index.php?c=IndexNew&a=AjaxGetMerchantInfo",// /index.php?goosd_id=XXX&mer_id=XXX
					data: {'merchantId':merchantId,'merchantIds':merchantIds,'goodsId':goodsId},
					dataType: "json",
					success:function(data){
						$('.layerbox-tuan_itembuy .layerbox_bespoke_header h3').html(data[merchantId]['name']);
						$('.layerbox-tuan_itembuy .address-area').html(data[merchantId]['area']);
						$('.layerbox-tuan_itembuy .address-text').html(data[merchantId]['address']);
						$('.layerbox-tuan_itembuy').css('top','0');
						
						//预约购买变量
						toStoreBuyParams    = {
						    overNode:$(".layer-overlay-tuan"),
						    inputNode:$(".to-store-layer"),
						    submitNode:$("#to-store-form"),
						    nameNode:$("input[name=linkName]"),
						    mobileNode:$("input[name=mobile]"),
						    codeNode:$("input[name=verifyCode]"),
						    codeTimeNode:$("#store-send-code"),
						    noticeNode:$(":input[name=storeOrderNotice]"),
						    sendCodeUrl:"/index.php?c=IndexNew&a=AjaxSendVerifyCode",
						    submitOrderUrl:"/index.php?c=IndexNew&a=AjaxSaveReachStoreOrder",
						    linkWrondNode:$("#linkman-wrond-tip"),
						    mobileWrondNode:$("#mobile-wrond-tip"),
						    codeWrondNode:$("#code-wrond-tip"),
						    maxTime:60 //倒计时秒数
						};
						var goodsToStoreBuy = new ToStoreBuy(merchantId,goodsId,skuId);

					},
					error:function(){
						// alert(data.msg);
					}
				});
			},

                    init: function (){
                        this._getCity();
                        this._bindEvent();
                    }
		};


		//预约购买变量
		var toStoreBuyParams    = {};
                // 预约购买操作对象
		function ToStoreBuy(merchantId,goodsId,skuId){
		    this.merchantId = merchantId,
		    this.goodsId    = goodsId;
                    this.skuId      = skuId;
		    this.init();
		};
		ToStoreBuy.prototype    = {
		    init:function(){
		        //发送验证码操作
		        this.bindSendCode();
		        //提交绑定
		        this.bindSubmit();
		        //关闭绑定
		        this.bindBack();
		        //绑定字符串统计
		        this.bindLimitFont();
		    },
		    stopPropagation:function(e) {
		        if (e.stopPropagation){ 
		            e.stopPropagation();
		        }else{ 
		            e.cancelBubble = true;
		        }  
		    },
		    //绑定发送验证码操作 
		    bindSendCode:function(){
		        var _self   = this;
		        $("#store-send-code").click(function(e){
		            var mobile  = toStoreBuyParams.mobileNode.val(),
		                flag    = _self.checkMobile(mobile);
		            if($(this).hasClass("dafault-code")){
		                return false;
		            }
		            if(flag){
		                _self.sendCode(mobile);
		            }
		            _self.stopPropagation(e);
		        });
		    },
		    //绑定提交
		    bindSubmit:function(){
		        var _self       = this;
		        $("#submit-store-buy-order").click(function(e){
		            var linkName    = toStoreBuyParams.nameNode.val(),
		                linkFlag    = _self.checkName(linkName),
		                mobile      = toStoreBuyParams.mobileNode.val(),
		                mobileFlag  = _self.checkMobile(mobile),
		                code        = toStoreBuyParams.codeNode.val(),
		                codeFlag    = _self.checkCode(code),
		                sex         = $("input[name=dsex]:checked").val(),
		                buyerNotice = toStoreBuyParams.noticeNode.val();
		                
		            if(sex != '1' && sex != '2'){
		                alert("请选择性别");
		                return false;
		            }
		            if(!linkFlag || !mobileFlag || !codeFlag){
		                return false;
		            }
		            
		            //提交操作
		            submitData      = {
		                linkName:linkName,
		                mobile:mobile,
		                code:code,
		                sex:sex,
		                buyerNotice:buyerNotice,
		                merchantId:_self.merchantId,
		                goodsId:_self.goodsId,
                                skuId:_self.skuId,
		                suitId:_self.suitId
		            };
		            
		            $.getJSON(toStoreBuyParams.submitOrderUrl, submitData, function(backdata){
		                if(backdata.flag){
                                    alert(backdata.msg);
                                    $('.layerbox-tuan').remove();
		                }else{
		                    alert(backdata.msg);
		                }
		            });
		            
		            _self.stopPropagation(e);
		            
		            return false;
		        })
		    },
		    //绑定关闭操作
		    bindBack:function(){
		        $(".layerbox_bespoke_elseshopbtn").click(function(){		            
					$('.layerbox-tuan_itembuy').css('top','540px');
		        });
		    },
		    //字符限制
		    bindLimitFont:function(){
		        var _self   = this;
		        //字数计算（商品名称 套装描述等）
		        $("[fn='limit']").keyup(function(){
		            var limit       = $(this).attr('limit');
		            var limitTips   = $(this).attr('tipsId');
		            var value       = $(this).val();
		            var valueLength = value.length;
		            if(valueLength > limit){
		                $("#"+limitTips).css("color","#ff0000");
		            }else{
		                $("#"+limitTips).css("color","");
		            }
		            //回显
		            $("#"+limitTips).text(valueLength);
		        });
		    },
		    //汉字长度判断[中文算2个字符，英文算1个字符]
		    getCharLength:function(str){
		        var cnLength    = 0;
		        for(var i=0; i<str.length; i++){
		            var words   = str.substring(i,i+1);
		            if(escape(words).indexOf("%u") == -1){
		                cnLength    =  cnLength+1;
		            }else{
		                cnLength    =  cnLength+2;
		            }
		        }
		        
		        return Math.ceil(cnLength/2);
		    },
		    //检查手机号
		    checkMobile:function(mobile){
		        if(typeof mobile == 'undefined'){
		            mobile  = toStoreBuyParams.mobileNode.val();
		        }
		        if(!mobile.length){
		            toStoreBuyParams.mobileWrondNode.html("手机号不能为空").show();
		            return false;
		        }
		        if(!/^1[3|4|5|7|8]{1}[0-9]{9}$/.test(mobile)){
		            toStoreBuyParams.mobileWrondNode.html("手机号格式不正确").show();
		            return false;
		        }
		        toStoreBuyParams.mobileWrondNode.hide();
		        return true;
		    },
		    //发送校验码
		    sendCode:function(mobile){
		        var _self   = this;
		        if(typeof mobile == 'undefined'){
		            mobile  = toStoreBuyParams.mobileNode.val();
		        }
		        
		        $.getJSON(toStoreBuyParams.sendCodeUrl, {mobile:mobile}, function(backdata){
		            //倒计时开始
		            if(backdata.flag){
		                _self.countDown();
		            }else{
		                alert(backdata.msg);
		                return false;
		            }
		        });
		    },
		    //倒计时 
		    countDown:function(){
		        var codeTimeNode    = toStoreBuyParams.codeTimeNode, 
		            oldTips         = codeTimeNode.html(),
		            maxTime         = toStoreBuyParams.maxTime;
		        //不可点击
		        codeTimeNode.addClass("dafault-code");
		        var codeTimeCount   = setInterval(function(){
		            maxTime--;
		            codeTimeNode.html('<em id="store-count-down">'+maxTime+'</em>s后重新获取');
		            if(!maxTime){
		                //重置倒计时
		                clearTimeout(codeTimeCount);
		                codeTimeNode.removeClass("dafault-code");
		                codeTimeNode.html(oldTips);
		            }
		        },1000);
		    },
		    //检查姓名
		    checkName:function(linkName){
		        if(typeof linkName == 'undefined'){
		            linkName    = toStoreBuyParams.nameNode.val();
		        }
		        if(!linkName.length){
		            toStoreBuyParams.linkWrondNode.html("请填写您的称呼").show();
		            return false;
		        }
		        if(linkName.length > 10){
		            toStoreBuyParams.linkWrondNode.html("称呼不能超过10个字符").show();
		            return false;
		        }
		        toStoreBuyParams.linkWrondNode.hide();
		        return true;
		    },
		    //检查验证码
		    checkCode:function(code){
		        if(typeof code == 'undefined'){
		            code    = toStoreBuyParams.codeNode;
		        }
		        if(!code.length){
		            toStoreBuyParams.codeWrondNode.html("验证码不能为空").show();
		            return false;
		        }
		        if(!/^[0-9]{6}$/.test(code)){
		            toStoreBuyParams.codeWrondNode.html("验证码错误").show();
		            return false;
		        }
		        toStoreBuyParams.codeWrondNode.hide();
		        return true;
		    }
		};

            var _static = {
                name: '预约弹层',

                // 创建弹层
                create: function (args){
                    instance = new SingLeton(args);
                    return instance;
                }
            };

        return _static;


	})();
})(window.$ || window.jQuery);
