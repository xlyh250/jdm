// import '@/css/category.css'
import '@/css/base.css'
import '@/css/category.less'

import BScroll from 'better-scroll'

	 // 热更新
	  if(module.hot){
	      module.hot.accept()
	  }

window.onload = function () {

    //左侧滑动
    leftswipe();
    
}

var leftswipe = function () {
      
    //1.上下滑动 (touch事件，位移)
    let parentBox = document.querySelector('.jd_category_left');

    let childBox = parentBox.querySelector('ul');
    new BScroll(parentBox,{
            scrollY: true    
        })

}
