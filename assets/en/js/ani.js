let ani = {
  init: function () {
    // 새로고침시 맨위로
    setTimeout(() => {
      ani.scrollTop();
    }, 100);
    // 맨위로 버튼 클릭시 맨 위로
    $(".scrolltop").click(function () {
      ani.scrollTop();
    });

    // news
    // 버튼클릭하면 파란불들어오기
    $(".divide > div").each(function (idx, ele) {
      ani.blueCircle(ele);
    });

    // help
    // slide 열고 닫기 클래스 on주면 열림
    ani.siblingsSlide("#faq_list-container .faq-slide li");

    // main 애니
    ani.mainAni();

    // swiper
    ani.swiperAni();

    // scroll
    let windW = $(window).width();
    let winSW = window.screen.width;
    let targetW = ($(".news-target").width() / 100) * 40;
    let end = targetW - (windW - winSW);

    // let timer;
    // function resizeDone(){
    // }
    // $(window).on('scroll',function(){
    //   clearTimeout(timer);
    //   timer = setTimeout(resizeDone , 150)
    // })
    ani.scrollTopBtn();
    ani.gsapAni();
    ani.horizontalScroll(end);


    // 스크롤매직
    if(!$('.t1').length){
      return;
    }
    else{
      ani.sqOn(".txtwrap1",1,176,$('.txtwrap2'))
      ani.sqOn(".txtwrap2",176,351,$('.txtwrap3'))
      ani.sqOn(".txtwrap3",351,526,$('.startbanner'))
  
      ani.fixbx('.t1')
      ani.fixbx('.t2')
      ani.fixbx('.t3')
  
      $(window).scroll(function(){
          let wH = $(window).scrollTop()
          if(wH == 0) $('.txt').removeClass('on')
          ani.chgColor($('.t1'),$('.txtwrap1'),wH)
          ani.chgColor($('.t2'),$('.txtwrap2'),wH)
          ani.chgColor($('.t3'),$('.txtwrap3'),wH)
      })
    }
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
  siblingsSlide: function (target) {
    $(target).click(function () {
      let li = $(target);
      let allListOn = li.hasClass("on");
      let thisOn = $(this).hasClass("on");
      if (allListOn) {
        li.removeClass("on");
        $(this).addClass("on");
      } else {
        $(this).addClass("on");
      }
      if (thisOn) {
        $(this).toggleClass("on");
      }
    });
  },
  mainAni: function () {
    let width1600 = window.matchMedia("(max-width : 1600px)");
    $(window).resize(function () {
      if (width1600.matches == false) {
        $(".sub-menu").removeClass("open");
        initArrow();
        $(".gnb").removeClass("mobile");
      }
    });

    // 네비게이션 오버시
    $(".nav").hover(
      function () {
        let smenuLiHeight = $(".sub-menu li").height();
        let smenuArr = [];
        let headerwrapH = $(".headerwrap").height();
        $(".sub-menu").each(function (idx, ele) {
          smenuArr.push($(this).find("li").length);
        });
        smenuArr = Math.max.apply(null, smenuArr);
        if (width1600.matches == false) {
          $(".sub-menu").css({
            height: smenuLiHeight * smenuArr + 10 + "px",
          });
          $(".headerwrap").css({
            height: smenuLiHeight * smenuArr + headerwrapH + 10 + "px",
          });
        }
      },
      // 네비게이션 오버 뗐을때
      function () {
        if (width1600.matches == false) {
          $(".sub-menu").css({
            height: "",
          });
          $(".headerwrap").css({ height: "100px" });
        }
      }
    );

    // 모바일기준 서브메뉴 띄우기 + 사라지기
    $(".btn-drawer").click(function () {
      $(".gnb").toggleClass("mobile");
      $(this).find("span").toggleClass("show");

      $("body").toggleClass("oh");
    });
    // 1600px 아래일때 nav 클릭함수
    $(".main-menu").click(function () {
      if (width1600.matches == true) {
        initList($(this));
        siblingsInitArrow($(this));
        arrow($(this));
      }
    });
    // 화살표 위로가르키기
    function arrowUp(target) {
      target.find(".arrow").eq(0).removeClass("show");
      target.find(".arrow").eq(1).addClass("show");
    }
    // 화살표 아래로 가르키기
    function arrowDown(target) {
      target.find(".arrow").eq(1).removeClass("show");
      target.find(".arrow").eq(0).addClass("show");
    }
    // 화살표 조건에 맞게 분포한 함수
    function arrow(target) {
      if (target.find(".arrow").eq(0).hasClass("show") == true) {
        arrowUp(target);
        listDown(target);
      } else if (target.find(".arrow").eq(0).hasClass("show") == false) {
        arrowDown(target);
        listUp(target);
      }
    }
    // 리스트 아래로펼치기
    function listDown(target) {
      target.find(".sub-menu").addClass("open");
    }
    // 리스트 위로 올라오기
    function listUp(target) {
      target.find(".sub-menu").removeClass("open");
    }
    // 모든리스트 위로 올라오기
    function initList(target) {
      target.siblings().find(".sub-menu").removeClass("open");
    }
    // 누른애 빼고 모든화살표 초기화
    function siblingsInitArrow(target) {
      target.siblings().find(".arrow:odd").removeClass("show");
      target.siblings().find(".arrow:even").addClass("show");
    }
    function initArrow() {
      $(".arrow:odd").removeClass("show");
      $(".arrow:even").addClass("show");
    }

    // ko en 버튼 누를시 회색 동그라미 옮겨가기
    $(".btn-lang").click(function () {
      $(".btn-lang").removeClass("active");
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
  horizontalScroll: function (end) {
    if (!$(".news").length) {
      return;
    } else {
      gsap.registerPlugin(ScrollTrigger);
      // 가로스크롤 되게하기
      ScrollTrigger.matchMedia({
        // 반응형 768넘어가면 이벤트먹게
        "(min-width : 768px)": function () {
          let ex = gsap
            .timeline({
              // 타임라인에 추가할 수 있다!
              scrollTrigger: {
                trigger: ".news", // trigger 대상
                pin: true, // trigger 고정 스티키기능 - 가로스크롤할거면 필수
                anticipatePin: 1,
                start: "top top", // trigger가 viewport 상단에 닿을때 시작
                end: "+=1500", // 시작지점에서 500px를 스크롤한 후 끝
                scrub: 1, // 애니메이션 부드럽게 진행
              },
            })
            .to(".news-target", {
              left: -end + "px",
            });
        },
      });
    }
  },
  gsapAni: function () {
    if (!$(".startbanner").length) {
      return;
    } else {
      // startbanner 부분 가운데 텍스트박스가 스크롤에 맞춰 올라오게 설정
      let ex2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".startbanner",
          // pin : true, // 활성상태에서 트리거 요소 고정
          duration: 10000,
          start: "-=200", // 트리거 상단이 뷰포트 상단에 닿을 때
          end: "+=300", // 시작부분에서 x px 까지 스크롤 한 후 종료
          scrub: 1, // 부드러운 스크러빙, 스크롤바를 잡는데 1초가 걸린다.
        },
      });
      ex2.from(".startbanner-txtbx", { y: 100, opacity: 0, duration: 1 });
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
      image.push(`../../../assets/en/images/sequence/sequence_${i}.jpg`);
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
  chgColor: function (target, deop, wH) {
    let a = target.offset().top;
    let b = wH - a; // 현재스크롤값 에서 a를 뺀 값
    let c = target.height(); // 타겟요소의 본연의 높이값
    let d = deop.offset().top; // 타겟요소를 덮고있는 요소의 DOM에서의 거리
    let e = a - d; // 글씨 바뀌는 기준이 될 변수

    if (b == 0) {
      if (e > 0 && e < (c / 3) * 1) {
        target.find(".txt1").siblings().removeClass("on");
        target.find(".txt1").addClass("on");
      } else if (e > (c / 3) * 1 && e < (c / 3) * 2) {
        target.find(".txt2").siblings().removeClass("on");
        target.find(".txt2").addClass("on");
      } else if (e > (c / 3) * 2 && e !== 0) {
        target.find(".txt3").siblings().removeClass("on");
        target.find(".txt3").addClass("on");
      }
      if (e > c) {
        target.find(".txt").removeClass("on");
      }
      if (e == 0) {
        target.find(".txt3").find(".txt").removeClass("on");
      }
      if (deop.offset().top >= wH) {
        target.find(".txt").removeClass("on");
      }
    } else {
      target.find(".txt3").find(".txt").removeClass("on");
    }
  },
};

$(function () {
  ani.init();
});
