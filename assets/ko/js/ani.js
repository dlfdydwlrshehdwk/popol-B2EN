let ani = {
  init: function () {
    // 새로고침시 맨위로
    // setTimeout(() => {
    //   ani.scrollTop();
    // }, 100);
    // 맨위로 버튼 클릭시 맨 위로

    // news
    // 버튼클릭하면 파란불들어오기
    $(".swiper-slide").each(function (idx, ele) {
      ani.blueCircle(ele);
    });

    // swiper
    ani.swiperAni();
    
    ani.scrollTopBtn();

    ani.typosq() // 잠시주석 섹션2 테스트중 231012 오전
    ani.gsapAni() // gsap애니 모음 실행

    // 스크롤매직 - 사용하는 코드이나 타이포시퀀스 테스트중으로 인한 주석처리
    // if(!$('.t1').length){
    //   return;
    // }
    // else{
    //   ani.sqOn(".tit-wrap.set1",1,176,$('.tit-wrap.set2'))
    //   ani.sqOn(".tit-wrap.set2",176,351,$('.tit-wrap.set3'))
    //   ani.sqOn(".tit-wrap.set3",351,526,$('.start-banner'))
      
    //   ani.fixbx('.t1')
    //   ani.fixbx('.t2')
    //   ani.fixbx('.t3')
      
    //   $(window).scroll(function(){
    //       ani.chgColor($('.set1'),$('.t1'))
    //       ani.chgColor($('.set2'),$('.t2'))
    //       ani.chgColor($('.set3'),$('.t3'))
    //   })
    // }
    // 여기까지
  },
  scrollTop: function () {
    $(window).scrollTop(0);
  },
  blueCircle: function (target) {
    let tg = $(target);

    tg.click(function (e) {
      e.preventDefault();
      $(this).parent().find("div").removeClass("active");
      $(this).addClass("active");
    });
  },
  
  swiperAni: function () {
    $(".swiper").each(function (idx, ele) {
      const swiper = new Swiper(ele, {
        slidesPerView: "auto",
        slideToClickedSlide: true,
        grabCursor: true,
      });
    });

    $(".divide").draggable();
  },
  horizontalScroll: function () {
    if (!$(".news").length) {
      return;
    } else {
      let windW = $(window).width();
      let targetW = $(".news-target").width();
      let ww = parseInt($(".news").css("padding-right"));
      let end = targetW - windW + ww + ww / 2;

      gsap.registerPlugin(ScrollTrigger);

      gsap.timeline({
        scrollTrigger : {
          trigger : '.news',
          start : '-50%',
          end : '0%',
          scrub : 1,
          // markers : true
        }
      })
      .fromTo('.news-content',{y:100,autoAlpha : 0},{y:0,autoAlpha : 1})

      ScrollTrigger.matchMedia({
        // width 768px 이상일시만 애니메이션 
        "(min-width : 768px)": function () {
          let nowW = $(window).width();
          let startW = $(window).width();
          let tween = gsap
            .timeline({
              default : {duration : 1},
              scrollTrigger: {
                trigger: ".news",
                pin: true,
                anticipatePin: 0,
                start: "top top",
                end: "+=1500",
                scrub: 1,
                // markers : true,
                onUpdate : () => {
                  $(window).resize(() => {
                    nowW = $(window).width();
                  if (nowW != startW) {
                    let windW = $(window).width();
                    let targetW = $(".news-target").width();
                    let ww = parseInt($(".news").css("padding-right"));
                    let end = targetW - windW + ww + ww / 2;
                    $('.news-target').css({left : -end})
                    tween.clear(true)
                    tween.add(gsap.fromTo(".news-target",{left : 0},{left: -end + "px"}))
                  }
                })
                }
              },
            })
            .to(".news-target", {
              left: -end + "px"
            })
        },
      });
    }
  },
  gsapAni: function () {
    let startbanner1 = $('.start-banner-txt').eq(0)


    if (!$(".start-banner").length) {
      return;
    } else {
      let starbanner1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".start-banner",
          start: "top 20%",
          end: "+=300",
          scrub: 1,
        },
      });
      starbanner1.from(startbanner1, { y: 100, opacity: 0, duration: 1 });
    }
  },
  scrollTopBtn: function () {
    let windowH = $(window).scrollTop();
    let scrolltopbtn = $(".scrolltop");
    let wrapH = $("#wrap").height();
    let footerH = $(".footer").innerHeight();
    let target_scrolltop = wrapH - footerH - $(window).height();
    if (windowH > target_scrolltop) {
      scrolltopbtn.css({
        transition: ".3s",
        bottom: footerH + 30 + "px",
      });
    } else {
      $(".scrolltop").css({
        transition: ".3s",
        bottom: "5%",
      });
    }
    if (windowH > $(window).height()) {
      $(".scrolltop").css({ display: "flex" });
      scrolltopon();
    } else {
      scrolltopoff();
      $(".scrolltop").css({ display: "none" });
    }
    function scrolltopon() {
      $(".scrolltop").stop().animate({ opacity: 1 }, 100);
    }
    function scrolltopoff() {
      $(".scrolltop").stop().animate({ opacity: 0 }, 100);
    }
  },
  sq: function (trele, start, end, next) {
    let wH = $(window).height();
    let image = [];
    let obj = { curimg: 0 };
    for (let i = start; i < end; i++) {
      image.push(`../../assets/ko/images/sequence/sequence_${i}.jpg`);
    }

    let controller = new ScrollMagic.Controller();

    let tween = TweenMax.to(obj, 0.3, {
      curimg: image.length - 1,
      roundProps: "curimg",
      repeat: 0,
      immediateRender: false,
      ease: Linear.easeNone,
      onUpdate: function () {
        $(".testimg").attr("src", image[obj.curimg]);
      },
      onComplete: () => {
        $(".bg-section").css({ display: "none" });
        $(window).scrollTop(next.offset().top - 50);
      },
    });
    let scene = new ScrollMagic.Scene({
      triggerElement: trele,
      duration: "100%",
      triggerHook: 0,
      offset: wH,
    })
      .setTween(tween)
      .addTo(controller);
  },
  fixbx: function (target) {
    let controller = new ScrollMagic.Controller();
    let tween = TweenMax.to(target, 0.001, {
      onComplete: () => {
        $(".txt").removeClass("on");
      },
    });
    let scene = new ScrollMagic.Scene({
      triggerElement: target,
      duration: "200%",
      triggerHook: 0,
    })
      .setTween(tween)
      .addTo(controller)
      .setPin(target);
  },
  sqOn: function (trigger, startN, endN, next) {
    let wH = $(window).height();
    let controller2 = new ScrollMagic.Controller();
    let tween_on = TweenMax.to(".bg-section", 0.1, {
      display: "block",
      onComplete: ani.sq(trigger, startN, endN, next),
    });
    let scene = new ScrollMagic.Scene({
      triggerElement: trigger,
      duration: "100%",
      offset: wH,
      triggerHook: 0,
    })
      .setTween(tween_on)
      .addTo(controller2);
  },
  chgColor : function(trg,tg){
    let wH = Math.round($(window).scrollTop())
        let target = tg;
        let trigger = Math.round(trg.offset().top)
        let targetH = Math.round(tg.height())
        let condition = wH - trigger;

        if(wH < trigger) target.find('.txt').removeClass('on')
        
        if(wH > 0 && condition >= targetH / 3 * 0) {
          target.find(".txt1").siblings().removeClass("on");
          target.find(".txt1").addClass("on");
        }
        if(wH > 0 && condition >= targetH / 3 * 1) {
          target.find(".txt2").siblings().removeClass("on");
          target.find(".txt2").addClass("on");
        }
        if(wH > 0 && condition >= targetH / 3 * 2) {
          target.find(".txt3").siblings().removeClass("on");
          target.find(".txt3").addClass("on");
        }
        if(wH > 0 && condition >= targetH / 3 * 3) {
         target.find('.txt').removeClass('on')
        }

        if(wH === 0){ $('.txt').removeClass('on')}
  },
  typosq : function(){
    // 타이포시퀀스용 테스트

    let image = [];
    let obj = { curimg: 0 };
    for (let i = 71; i < 704; i++) {
      i = i.toString().padStart(3,'0');
      image.push(`../../assets/common/images/sequence/LOW15fps/[ NEUL Digital Healthcare ] Brand Site (New)_v4.0.FIN_Sequence_LOW_15fps_00${i}.jpg`);
    }
  
    let controller = new ScrollMagic.Controller();

    let tween = TweenMax.to(obj, 0.3, {
      curimg: image.length - 1,
      roundProps: "curimg",
      repeat: 0,
      immediateRender: true,
      ease: Linear.easeNone,
      onUpdate: function () {
        $(".testimg").attr("src", image[obj.curimg]);
      },
      onComplete: () => {
        $(window).scrollTop($('.trg2').offset().top - 100);
      }
    });
    let scene = new ScrollMagic.Scene({
      triggerElement: '.test1',
      duration: "1500%", // 뷰포트기준 현재 15배 1500vh
      triggerHook: 0,
    })
      .setTween(tween)
      .addTo(controller)
      .setPin(".test1")
      .on("start end",() => {
        $('.trg').css({opacity : 1})
      })
      .on("leave",() => {
        $('.trg').css({opacity : 0})
      })
  },
  numberWithCommas : function(x){
    return x.toLocaleString();
  },
  // gsap 애니메이션 모음
  gsapAni : function(){
    console.log('asf')
     let ani1 = gsap.timeline({defaults : {duration : 1}});
     ani1
     .fromTo(".ani-section .content1",{autoAlpha : 0 },{autoAlpha:1})
    //  .fromTo('.start-txt1',{y : 100 , autoAlpha : 0},{y : 0 , autoAlpha : 1})
    //  .fromTo('.start-content1',{scale : 1, autoAlpha : 1},{scale : 3 , autoAlpha : 0})
    //  .fromTo('.start-content2',{autoAlpha : 0},{autoAlpha:1},"<")
    //  .fromTo('.start-txt2',{y : 100,autoAlpha : 0},{y : 0, autoAlpha : 1})
    //  .fromTo('.start-txt2',{scale : 1, autoAlpha : 1},{scale : 3 , autoAlpha : 0})
 
     ScrollTrigger.create({
       animation : ani1,
       trigger : ".ani1",
       start : "0%",
       end : "400%",
       scrub : true,
       pin : true,
       anticipatePin : 1,
   })
 
//    let ani2 = gsap.timeline({default : {duration : 1}});
//    let content3Tit1 = $('.start-content3 .tit1')
//    let content3Imgset = $('.start-content3 .img-set')
//    let content3Inner1 = $('.start-content3 .img1 .inner-img')
//    let content3Tit2 = $('.start-content3 .tit2')
//    let content3Img1 = $('.start-content3 .img1')
//    let content3Img2 = $('.start-content3 .img2')
//    let content3Inner2 = $('.start-content3 .img2 .inner-img')
//    let content4Tit = $('.start-content4 .start-banner-txt')
 
//    ani2
//    .fromTo('.start-content3',{y : 100,autoAlpha : 0},{y : 0 , autoAlpha : 1})
//    .fromTo(content3Tit1, {autoAlpha : 0} , {autoAlpha : 1},"<")
//    .fromTo(content3Imgset , {xPercent : 100,autoAlpha :0} ,{xPercent : 0,autoAlpha : 1} , "<")
//    .fromTo(content3Inner1 , {scale : 0} ,{scale : 1},"+=1" )
 
//    .fromTo(content3Tit1, {y : 0 ,autoAlpha : 1} ,{y : -20 , autoAlpha : 0},"+=1")
 
//    .fromTo(content3Tit2,{y : 30,autoAlpha : 0},{y : 0 , autoAlpha : 1})
//    .fromTo(content3Img1,{autoAlpha : 1,xPercent:0},{autoAlpha : 0,xPercent:-20},"<")
//    .fromTo(content3Img2,{autoAlpha : 0, xPercent : 20},{autoAlpha : 1, xPercent : 0},"<")
//    .fromTo(content3Inner2,{scale : 0},{scale : 1},"+=1")
//    .to(content3Inner2,{scale : 1,duration:2})
 
//    .fromTo('.start-content4',{yPercent : 100},{yPercent : 0,duration:2})
//    .to('.start-content4',{yPercent : 0,duration:2})
//    .fromTo(content4Tit,{y : 100 ,autoAlpha : 0},{y:0,autoAlpha:1},"<")
 
//    ScrollTrigger.create({
//      animation : ani2,
//      trigger : '.qwer2',
//      start : '0%',
//      end : '600%',
//      scrub : true,
//      pin : true,
//      anticipatePin : 1,
//      // markers : true
//    })
 
 
//    let content5Imgset = $('.start-content5 .img-set')
//    let content5Tit1 = $('.start-content5 .tit1')
//    let content5Img1 = $('.start-content5 .img1')
//    let content5Img2 = $('.start-content5 .img2')
//    let content5Img3 = $('.start-content5 .img3')
//    let content5Img4 = $('.start-content5 .img4')
//    let content5Inner1 = $('.start-content5 .img1 .inner-img')
//    let content5Inner4 = $('.start-content5 .img4 .inner-img')
//    let content5Tit2 = $('.start-content5 .tit2')
//    let content5Tit3 = $('.start-content5 .tit3')
//    let content5Tit4 = $('.start-content5 .tit4')
//    let content5Img2Txt = $('.start-content5 .img2 .txt')
//    let content5Img2Bar = $('.start-content5 .img2 .bar')
//    let content6Tit = $('.start-content6 .start-banner-txt')
 
//    let ani3 = gsap.timeline({default : {duration : 1}})
 
//    ani3
//    .fromTo('.start-content5',{autoAlpha : 0},{autoAlpha : 1})
//    .fromTo(content5Tit1 , {autoAlpha : 0 , y : 100} ,{autoAlpha : 1 , y : 0},"<")
//    .fromTo(content5Imgset , {autoAlpha : 0 , xPercent : 100}, {autoAlpha : 1, xPercent : 0},"<")
//    .fromTo(content5Inner1,{scale : 0},{delay : 0.7,scale : 1,duration:.3})
 
//    .fromTo(content5Tit1,{y : 0,autoAlpha:1},{delay : 0.7,y : -20,autoAlpha:0,
//    onComplete : () => {
//      console.log('fd')
//      gsap.to(content5Img2Bar,0,{rotation : 0})
//      content5Img2Txt.text(0 + '%');
//  }})
 
//    .fromTo(content5Tit2,{y : 30,autoAlpha:0},{y :0,autoAlpha:1})
//    .fromTo(content5Img1,{autoAlpha : 1,xPercent:0},{autoAlpha : 0,xPercent:-20},"<")
//    .fromTo(content5Img2,{autoAlpha : 0, xPercent : 20},{autoAlpha : 1, xPercent : 0,
//      onComplete : ()=>{
//        console.log('d')
//        $({ val : 0}).animate({ val : 100}, {
//          duration: 2000,
         
//          step: function() {
//            var num = ani.numberWithCommas(Math.floor(this.val));
//            content5Img2Txt.text(num + '%');
//          },
//          complete: function() {
//            var num = ani.numberWithCommas(Math.floor(this.val));
//            content5Img2Txt.text(num + '%');
//          }
//        })
 
//        gsap.fromTo(content5Img2Bar,2,{rotation : 0},{rotation : 180})
//      }
//    },"<")
 
//    .fromTo(content5Tit2,{y:0,autoAlpha:1},{delay : 0.7,y:-30,autoAlpha:0,
//      onComplete : () => {
//        // gsap.to(content5Img3)
//      }
//    })
//    .fromTo(content5Tit3,{y: 30,autoAlpha:0},{y:0,autoAlpha:1})
//    .fromTo(content5Img2,{autoAlpha:1,xPercent:0},{autoAlpha:0,xPercent:-20,},"<")
//    .fromTo(content5Img3,{autoAlpha:0,xPercent:20},{autoAlpha:1,xPercent:0,
//      // onComplete : () => {
//      //   console.log('asf')
//      //   gsap.fromTo(content5Img3,1,{scale : 0.6},{scale : 1})
//      // }
//    },"<")
 
 
//    .fromTo(content5Tit3,{y:0,autoAlpha:1},{delay : 0.7,y:-30,autoAlpha:0})
//    .fromTo(content5Tit4,{y: 30,autoAlpha:0},{y:0,autoAlpha:1})
//    .fromTo(content5Img3,{autoAlpha:1,xPercent:0},{autoAlpha:0,xPercent:-20},"<")
//    .fromTo(content5Img4,{autoAlpha:0,xPercent:20},{autoAlpha:1,xPercent:0},"<")
 
//    .fromTo(content5Inner4,{scale:0},{delay:0.7,scale:1,duration:.3})
//    .to(content5Inner4,{scale:1,duration:1})
 
//    .fromTo('.start-content6',{yPercent : 100},{yPercent : 0,duration:2})
//    .to('.start-content6',{yPercent : 0,duration : 2})
//    .fromTo(content6Tit,{y : 100,autoAlpha:0},{y:0,autoAlpha:1},"<")
 
 
//    ScrollTrigger.create({
//      animation : ani3,
//      trigger : '.qwer3',
//      start : "0%",
//      end : '1000%',
//      scrub : true,
//      pin : true,
//      anticipatePin : 1,
//    })
 
 
//    let content7Img1 = $('.start-content7 .prbg .img1')
//    let content7Img2 = $('.start-content7 .prbg .img2')
//    let content7Img3 = $('.start-content7 .prbg .img3')
//    let content7txt = $('.start-content7 .txt-set')
 
//    let ani4 = gsap.timeline({default : {duration : 1}})
 
//    ani4
//    // .fromTo('.start-content7',{autoAlpha : 0},{autoAlpha : 1})
//    .fromTo(content7txt , {y : 100 , autoAlpha : 0} ,{y  :0 , autoAlpha : 1})
 
//    .fromTo(content7Img1 , {autoAlpha:1},{duration : 1.5,autoAlpha:0})
//    .fromTo(content7Img2 , {autoAlpha:0},{delay : 0.3,autoAlpha:1}, "<")
 
//    .fromTo(content7Img2 , {autoAlpha:1},{duration:1.5,autoAlpha:0})
//    .fromTo(content7Img3 , {autoAlpha:0},{delay : 0.3,autoAlpha:1}, "<")
   
 
//    ScrollTrigger.create({
//      animation : ani4,
//      trigger : '.qwer4',
//      start : "0%",
//      end : "600%",
//      scrub : true,
//      pin : true,
//      anticipatePin : 1
//    })
 
 
 
  }
};

$(function () {
  ani.init();
});
