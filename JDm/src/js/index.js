
import '@/css/base.css';
// import '@/css/index.css';
import '@/css/index.less';
import $ from 'zepto';

  // 热更新
  if(module.hot){
      module.hot.accept()
  }
  
  const search = function(){

   let doc = document;

   let [search,banner] = [doc.querySelector('.jd_header_box'),doc.querySelector('.jd_banner')];

   /*距离范围*/
   let height = banner.offsetHeight;

   window.onscroll = () => {
      /*当前页面距离*/
     let top = doc.documentElement.scrollTop;

     let opacity = 0;

      if(top > height){
      	// 滚动距离超过轮播图距离，保持不变
      	opacity = 0.85;
      	}
      	//当滚动距离随着离顶部距离变大，透明度变大
        opacity = 0.85*(top/height);

      search.style.background = "rgba(216,80,92,"+opacity+")";
  }

};

 const banner = () =>{
    // Es6
    let doc = document;
    let banner = doc.querySelector('.jd_banner');

    let width = banner.offsetWidth;

    let imageBox=banner.querySelector('ul:first-child');

    let pointBox=banner.querySelector('ul:last-child');

    let points=pointBox.querySelectorAll('li');

   /*添加过渡*/
    let addTransition =  () =>{
        imageBox.style.webkitTransition = "all .2s";
        imageBox.style.transition = "all .2s";
    };
    /*删除过渡*/
    let removeTransition =  () => {
        imageBox.style.webkitTransition = "none";
        imageBox.style.transition = "none";
    };
    /*改变位置*/
    let setTranslateX = (translateX) => {
        imageBox.style.webkitTransform = "translateX("+translateX+"px)";
        imageBox.style.transform = "translateX("+translateX+"px)";
    };


   // 无缝滚动和无缝滑动 (定时器，过渡，位移)
   let index = 1;
   let timer = setInterval(function(){
           index++;

   	    addTransition();

        setTranslateX(-index*width);

   }, 3000);

     //绑定过渡结束事件
   banner.addEventListener('transitionend', function(){
         //无缝滚动
          if(index>=9){
          	 index=1;

   	     removeTransition();

         setTranslateX(-index*width);
          }
          //无缝滑动
          else if(index<=0){
          	//定位到第八张
             index=8;
            // 清除过渡
            removeTransition();
            setTranslateX(-index*width);
          }
         /*index 1-8  索引范围*/
        /*point 0-7 */
        setPoint();
   });

       /*.点随之滚动起来     （改变当前点元素的样式）*/
    let setPoint = () => {
        /*把所有点的样式清除*/
        for(let i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
           /* points[i].classList.remove('now');*/
        }
        points[index-1].className = "now";
    };

     /*图片滑动 touch事件）*/

     //记录开始的x坐标
    let startX = 0;
    let moveX = 0;
    let distanceX = 0;
    //  记录是否点击
    let isMove = false;

    banner.addEventListener('touchstart',function(e){

        clearInterval(timer);
        // 当前的触摸点 touches
        //记录当前位置
        startX = e.touches[0].clientX;
    });
    banner.addEventListener('touchmove',function(e){
        isMove = true;
        moveX = e.touches[0].clientX;
        //当distanceX 大于0的时候 向右滑动 否则反之
        distanceX = moveX - startX;/*distanceX  值  正负*/

        /*算出当前图片盒子需要定位的位置*/
        /*将要去做定位*/
        let currX = -index*width + distanceX;

        removeTransition();

        setTranslateX(currX);

    });
    banner.addEventListener('touchend',function(e){

        /*当超过了一定的距离的时候 */
        if(isMove && (Math.abs(distanceX) > width/3)){
            /*5.当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）*/
            if(distanceX > 0){
                index --;/*向右滑  上一张*/
            }else{
                index ++;/*向左滑 下一张*/
            }
            addTransition();
            setTranslateX(-index * width);
        }
        /*当不超过一定的滑动距离的时候*/
        else {
            /*当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）*/
            addTransition();
            setTranslateX(-index * width);
        }

        /*重置*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*添加定时器*/
        clearInterval(timer);
        timer = setInterval(function(){

            index  ++ ;
            /*定位  过渡来做定位的  这样才有动画*/
            addTransition();

            setTranslateX(-index*width);
        },4000);
    });
}


   // 横向滑动
 const infeed = function(){

    let doc = document;
    let parent = doc.querySelector('.product_box_con');
    let banner = doc.querySelector('#infeed');

    let parentWidth = parent.offsetWidth;
    let bannerWidth = banner.offsetWidth;

     let addTransition = function () {
         banner.style.webkitTransition = "all .2s";
         banner.style.transition = "all .2s";
     };

     let removeTransition = function () {
         banner.style.webkitTransition = "none";
         banner.style.transition = "none";
     };

     let setTranslateX = function (translateX) {
         banner.style.webkitTransform = "translateX(" + translateX + "px)";
         banner.style.transform = "translateX(" + translateX + "px)";
     };

    //最大的定位区间
    let maxPosition = 0;
    //最小的定位区间
    let minPosition = parentWidth-bannerWidth;
      /*滑动区间*/
      // 最大滑动区间
    let maxSwipe = maxPosition + 100;
      // 最小滑动区间
    let minSwipe = minPosition - 100;
 
    let startX = 0;
    let moveX = 0;
    let distanceX = 0;

    /*记录当前定位*/
    let currX = 0;

    banner.addEventListener('touchstart',function(e){

        startX = e.touches[0].clientX;
    });
    
    banner.addEventListener('touchmove',function(e){

        moveX = e.touches[0].clientX;

        distanceX = moveX - startX;

         /*.在一定的区间范围内  滑动  通过控制  滑动定位的区间的实现*/
        /*我们将要去做定位的位置 要在  滑动区间范围内*/
        if((currX + distanceX) < maxSwipe && (currX + distanceX) > minSwipe){
            /*删除过渡*/
           console.log(currX)
            removeTransition();
            /*做定位*/
            setTranslateX(currX + distanceX);
        }

    })

    /*避免模拟器上的bug问题   事件冒泡机制*/
    window.addEventListener('touchend',function(){
        /*3.在一定的区间内 做定位     定位区间*/
        /*将要定位的位置 大于  最大定位的时候*/
        if((currX + distanceX) > maxPosition){          // 左边吸附回去

            currX = maxPosition;

            addTransition();

            setTranslateX(currX);
        }
        /*将要定位的位置 小于  最小定位的时候*/
        else  if ((currX + distanceX) < minPosition){   //  右边吸附回去
            currX = minPosition;

            addTransition();

            setTranslateX(currX);
        }
        /*正常*/
        else {
            /*设置当前的定位*/
            currX = currX + distanceX;
        }

        /*重置参数*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });

  }

// 倒计时
  const downTime = function(){
    let doc = document;
    /*需要倒计时的时间*/
    let time = 5 * 60 * 60 ;
    let skTime = doc.querySelector('.sk_time');
    let spans = skTime.querySelectorAll('span');
    //初始化
    setInterval(timer,1000);

    function timer(){
      	if(time <= 0){
            clearInterval(timer);
            return false;
        }
        time -- ;

        let h = Math.floor(time/3600);
        let m = Math.floor(time%3600/60);
        let s = time%60;

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
    };
    timer();

}


   function move() {
         let doc = document;
         let data = [
            {msg:'小藏獒给奶奶养了一个月，再见却不认识了'},
            {msg:'为什么现在很多的车，都取消了雾灯？'},
            {msg:'花十万装修的新房，客厅太好看了！'},
            {msg:'为什么酒店的床尾要放一块布？涨知识了！'},
            {msg:'买了20年鞋子，才知道鞋盒里白布这样'},
            {msg:'小藏獒给奶奶养了一个月，再见却不认识了'}
         ];
        let box1 = doc.querySelector('.box1');
        let box = doc.querySelector('.box');
        let index = 0;
        let timer;
        let fragment = doc.createDocumentFragment();

       for (const iterator of data) {
           box.innerHTML += '<li class="inner">' + iterator.msg + '</li>';
           fragment.appendChild(box);
        }
        box1.appendChild(fragment)

      
       timer = setInterval(() => {
         index++;

           box.style.transition = 'all 0.6s';
          // 位移
           box.style.transform = 'translateY('+(-index*box1.offsetHeight)+'px)';
        },3000)
       
        box.addEventListener('transitionend',() =>{

             if(index >= 5){

               index = 0;

             box.style.transition = 'none';
             // 位移
             box.style.transform='translateY('+(-index*box1.offsetHeight)+'px)';

             }
        });
  };

  // 图片加载
 function load(){

     let doc = document.documentElement;
     let Doc = document;
  window.addEventListener('scroll',function(){

      let [html,clientH,scrollTop,scrollHeight] = [null,doc.clientHeight,
        doc.scrollTop,doc.scrollHeight]
      let fragment = Doc.createDocumentFragment();
    //  当滚动到指定位置加载默认图片和指定加载图片的位置
     if(clientH + scrollTop + 100 > scrollHeight && scrollTop< 2000){
         $.ajax({
           url: './data.json',
           type: "get",
           dataType: "json",
           data: null,
           cache: false,  // 是否走缓存item
           success(data) {
             for (let i = 0; i < data.length; i++) {
                    let div = Doc.createElement('div');
                    div.innerHTML += `<img src="./images/dafult1-1.png" data-src="${data[i].img}" class="Img">
                <p class="product_info">${data[i].title}</p>
                    <span class="price">${data[i].price}</span>`
                    fragment.appendChild(div)
               };
               Doc.querySelector('.recommend').appendChild(fragment)
            },
            error(err) {
               console.log(err);
            }
           });
       }
       let parent = Doc.querySelector('.recommend');
       let Img = parent.querySelectorAll('img');
       //console.log(Img)
       delayLoad(Img);
    });

 }

function delayLoad(imgList) {

    let doc = document;

    let [scrollTop,clientHeight,timer] = [doc.documentElement.scrollTop,
                                          doc.documentElement.clientHeight,null]
    window.addEventListener('scroll',() => {
      
     for (let i = 0; i < imgList.length; i++) {
        // 当滚动到指定位置加载图片
        if (scrollTop + clientHeight >= imgList[i].offsetTop + imgList[i].offsetHeight) {
            // 监听img
            let img = new Image;
            
            img.src = imgList[i].getAttribute("data-src");
            img.index = i;
           
            // 加载img onload事件
            img.onload = function () {
                imgList[this.index].src = this.src;
                //img = null;
            }

          imgList[i].style.opacity = 1;

         }
       }
    })
}

  // 改变窗口重新刷新
    window.addEventListener("resize",() => {

        window.location.reload();

    },false)



search();

banner();

downTime();

move();

load();

infeed();






