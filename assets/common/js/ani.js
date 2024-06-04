// 전역변수
let animation2;
let animation3_1;
let animation3_2;
let animation4_1;
let animation4_2;
let animation5;
let animation6;
let animation7;
let ani = {
  init: function () {
    // about,service,product 스크롤시 간단 등장애니메이션
    ani.contentScroll()
    
    // 보도자료,뉴스레터 버튼클릭하면 파란불들어오기 - 현재 스와이퍼 쓰지않음
    // $(".swiper-slide").each(function (idx, ele) {
    //   ani.blueCircle(ele);
    // });

    // swiper 기본셋팅 - 현재 스와이퍼 쓰지않음
    // ani.swiperAni();

    // 인트로 
    ani.introSection();

    // 채팅아이콘 위치
    ani.chattingIcon();

    // gsap애들 선셋팅
    ani.initAnimationSet();

    // 스크롤위치 기억
    ani.rememberScrollTop();

    // about,service,product 섹션 스크롤
    ani.sectionMoveScroll(); // about,product
    ani.hasDepthMoveSection(); // service

    // 메인페이지에서만 적용
    if($('.main-section').length > 0){

    let isMobile = matchMedia("screen and (max-width : 1023px)").matches
    const scrollY = parseInt(sessionStorage.getItem("scrollY"));
    if(isMobile){
      ani.animation()
    } else {
      // 맨위로 이동 후 저장된 스크롤값이 있다면 스크롤값으로 이동
      gsap.to(window, {duration : 0.1,scrollTo : 0,
        onStart : () => {
          
        },
        onComplete : () => {
          if(scrollY && scrollY > 0){
            gsap.to(window, { delay:.1,duration: 1, scrollTo: scrollY,
              onComplete : ()=>{
                $("body").css("position", "relative").css("overflow", "auto")
                ani.animation();
                $('.intro-section .tit-set').css({opacity : 1})
              },
              onUpdate : () => {
                $("body").css("position", "absolute").css("overflow", "hidden");
                $('.intro-section .tit-set').css({opacity : 0})
              }
            })
          } else {
            ani.animation()
          }
        }
      })
    }

    // 메인페이지 리사이즈
    let i = matchMedia("screen and (max-width : 1023px)").matches ? 0 : 1
    $(window).resize(function(){
      let isMobile = matchMedia("screen and (max-width : 1023px)").matches
      
      if(isMobile){
        if(i == 0) return
        else {
          i = 0;
          gsap.to(window, {duration: 0, scrollTo: 0 });
          animation2.time(0).pause()
          animation3_1.time(0).pause()
          animation3_2.time(0).pause()
          animation4_1.time(0).pause()
          animation4_2.time(0).pause()
          animation5.time(0).pause()
          animation6.time(0).pause()
          animation7.time(0).pause()
        }
      } 
      if(!isMobile) {
        if(i) return
        else {
          i = 1;
          let scrollYY = sessionStorage.getItem('scrollY')
          if(scrollYY !== 0) {
            gsap.to(window, {duration : 0.1,scrollTo : 0,
              onStart : () => {
                $('.intro-section .tit-set').css({opacity : 0})
              },
              onComplete : () => {
                if(scrollYY && scrollYY > 0){
                  gsap.to(window, { delay:.1,duration: 1, scrollTo: scrollYY,
                    onComplete : ()=>{
                      $("body").css("position", "relatsve").css("overflow", "auto")
                      $('.intro-section .tit-set').css({opacity : 1})
                      if($(window).scrollTop() > $('.main-section.process.dt-only').offset().top - $(window).height() / 100 * 60){
                        animation4_1.play()
                      }
                    },
                    onUpdate : () => {
                      $("body").css("position", "absolute").css("overflow", "hidden");
                    }
                  })
                }
              }
            })
          } 
          if (scrollY == 0) {
            gsap.to(window, {duration: 0, scrollTo: 0 });
          }
        }
      }
    })

    }

    // 로고누르면 저장된 스크롤위치 0 으로 
    $('.logo').click(function(){
      sessionStorage.setItem("scrollY",0)
    })

    // 실버케어 슬라이드에 마우스 엔터시 흐르는 애니메이션 정지 리브시 진행 
    $('.main-section.silvercare .slide').on('mouseenter',function(){
      if(matchMedia("screen and (max-width : 1023px)").matches) return
      $(this).css({animationPlayState:'paused'})
    })
    $('.main-section.silvercare .slide').on('mouseleave',function(){
      if(matchMedia("screen and (max-width : 1023px)").matches) return
      $(this).css({animationPlayState:'running'})
    })
  },

  // 보도자료,뉴스레터 상단메뉴 버튼클릭하면 파란불들어오기 - 현재 스와이퍼 사용되고있지않음
  blueCircle: function (target) {
    let tg = $(target);
    // 클래스 active 주면 파란불
    tg.click(function (e) {
      e.preventDefault();
      $(this).parent().find("div").removeClass("active");
      $(this).addClass("active");
    });
  },
  // 스와이퍼 기본값 셋팅 - 현재 스와이퍼 사용되고 있지 않음
  swiperAni: function () {
    if($('.swiper').length !== 0){
        const swiper = new Swiper('.swiper', {
          slidesPerView: "auto",
          slideToClickedSlide: true,
        });
      // 모바일시 드래그기능 잘먹히게
      $(".swiper-wrapper").draggable();
    }
  },
  // 숫자 3단위마다 콤마 찍어주는 기능
  numberWithCommas: function (num) {
    return num.toLocaleString();
  },
  // 메인페이지 인트로섹션 텍스트 애니메이션
  introSection : function () {
    if($('.intro-section')){
      // 비디오 3개 담은 변수
      let introVideo = $('.video')
      let nowVideo; // 현재 dt,mid,mb 어느거 영상 출력중인지 담을 변수
      let i; // 한번만실행하기위한 변수 셋팅
      let spans = `
      .intro-section .set1 .txt1 .span1,
      .intro-section .set1 .txt2 .span1,
      .intro-section .set1 .txt2 .span2,
      .intro-section .set1 .txt3 .span1,
      .intro-section .set1 .txt3 .span2,
      .intro-section .set2 .txt1 .span1,
      .intro-section .set2 .txt2 .span1,
      .intro-section .set2 .txt2 .span2,
      .intro-section .set2 .txt3 .span1,
      .intro-section .set2 .txt3 .span2,
      .intro-section .set2 .txt3 .span3,
      .intro-section .set3 .txt1 .span1,
      .intro-section .set3 .txt2 .span1,
      .intro-section .set3 .txt2 .span2,
      .intro-section .set3 .txt3 .span1,
      .intro-section .set3 .txt3 .span2,
      .intro-section .set3 .txt3 .span3,
      .intro-section .set4 .txt1 .span1,
      .intro-section .set4 .txt1 .span2,
      .intro-section .set4 .txt1 .span3,
      .intro-section .set4 .txt2 .span1,
      .intro-section .set4 .txt2 .span2,
      .intro-section .set4 .txt3 .span1,
      .intro-section .set4 .txt3 .span2,
      .intro-section .set5 .txt1 .span1,
      .intro-section .set5 .txt1 .span2,
      .intro-section .set5 .txt2 .span1,
      .intro-section .set5 .txt2 .span2,
      .intro-section .set6 .txt1 .span1,
      .intro-section .set6 .txt2 .span1,
      .intro-section .set6 .txt2 .span2
      `

      // 초기화 함수
      function initVideo(element){
        element.each((idx)=>{
          element.get(0).pause()
          element.eq(idx).get(0).currentTime = 0;
          
          // 영상에 35개의 애니메이션을 사용했고 
          // 영상의 시간의 지남에 따라 이벤트를 겹치지 않고 한번만 사용하기위해 만듬
          i = []
          for(let q = 0; q <35; q++ ){
            i.push(1)
          }

          // 기존셋팅값
          gsap.set('.intro-section .tit-section',{color : '#1E1E1E'})
          gsap.set( spans ,{autoAlpha : 0})
          $('.intro-section .set1,.intro-section .set2,.intro-section .set3,.intro-section .set4,.intro-section .set5,.intro-section .set6')
          .css('opacity', 1)
        })
      } initVideo(introVideo)

      // 동영상+gsap 실행 함수 만들기
      function startVideo(element){
        element.get(0).play()
      }
      
      $(window).resize(function(){
        
        introVideo.each((idx)=>{
          // 3개중 db인애를 찾음
          if(introVideo.eq(idx).css('display') == 'block'){
            // 리사이즈 연속실행 방지
            if(nowVideo == idx) return
            else {
              initVideo(introVideo)
              nowVideo = idx
              startVideo(introVideo.eq(nowVideo))

              // 영상이 재생되면 이부분이 체크해줌
              introVideo.eq(nowVideo).on('timeupdate',function(e){
                let cTime = e.target.currentTime.toFixed(3) // 현재영상시간
                
                if(cTime > 0 && i[0]){ // scene1 늘
                  if(!i[0]) return
                  i[0] = 0
                  gsap
                  .fromTo('.intro-section .set1 .txt1 .span1',1,{autoAlpha : 0.7},{autoAlpha : 1})
                  gsap
                  .fromTo('.intro-section .set1 .txt1 .span1',2.5,{scale:.9,y : 50},{scale : 1, y:0})
                }
                if(cTime >= 1 && i[1]){ // scene1 더
                  if(!i[1]) return
                  i[1] = 0
                  gsap
                  .fromTo('.intro-section .set1 .txt2 .span1',1,{autoAlpha : 0.7,scale:.9,y : 50},{ease: "power1.out",autoAlpha : 1,scale : 1, y:0})
                }
                if(cTime >= 1.2 && i[2]){ // scene1 건강한
                  if(!i[2]) return
                  i[2] = 0
                  gsap
                  .fromTo('.intro-section .set1 .txt2 .span2',1,{autoAlpha : 0.7,scale:.9,y : 50},{autoAlpha : 1,scale : 1, y:0})
                }
                if(cTime >= 1.4 && i[3]){ // scene1 삶을
                  if(!i[3]) return
                  i[3] = 0
                  gsap
                  .fromTo('.intro-section .set1 .txt3 .span1',1,{autoAlpha : 0.7,scale:.9,y : 50},{autoAlpha : 1,scale : 1, y:0})
                }
                if(cTime >= 1.7 && i[4]){ // scene1 위해
                  if(!i[4]) return
                  i[4] = 0
                  gsap
                  .fromTo('.intro-section .set1 .txt3 .span2',1,{autoAlpha : 0.7,scale:.9,y : 50},{autoAlpha : 1,scale : 1, y:0})
                }
                if(cTime >= 2.7 && i[5]){ // scene1 늘 더 건강한 삶을 위해 칼라 변경
                  if(!i[5]) return
                  i[5] = 0
                  gsap
                  .fromTo('.intro-section .tit-section',1, {color : '#1E1E1E'},{color : 'white'})
                }
                if(cTime >= 10 && i[6]){ // scene1 늘 더 건강한 삶을 위해 텍스트 투명
                  if(!i[6]) return
                  i[6] = 0
                  
                  $('.intro-section .set1').css('opacity', 0)
                }
                if(cTime >= 11.8 && i[7]){ // scene2  늘
                  if(!i[7]) return
                  i[7] = 0
                  gsap
                  .fromTo('.intro-section .set2 .txt1 .span1',2,{autoAlpha : 0.7,y:50},{duration : 2.5,autoAlpha : 1,y:0})
                }
                if(cTime >= 12.8 && i[8]){ // scene2 더
                  if(!i[8]) return
                  i[8] = 0
                  gsap
                  .fromTo('.intro-section .set2 .txt2 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 13.1 && i[9]){ // scene2 행복한
                  if(!i[9]) return
                  i[9] = 0
                  gsap
                  .fromTo('.intro-section .set2 .txt2 .span2',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 13.5 && i[10]){ // scene2 미래를
                  if(!i[10]) return
                  i[10] = 0
                  gsap
                  .fromTo('.intro-section .set2 .txt3 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 13.7 && i[11]){ // scene2 위해
                  if(!i[11]) return
                  i[11] = 0
                  gsap
                  .fromTo('.intro-section .set2 .txt3 .span2',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 16.9 && i[12]){ // scene2 늘 더 행복한 미래를 위해 투명
                  if(!i[12]) return
                  i[12] = 0
                  
                  $('.intro-section .set2').css('opacity', 0)
                }
                if(cTime >= 19 && i[13]){ // scene 3 늘 19
                  if(!i[13]) return
                  i[13] = 0
                  gsap
                  .fromTo('.intro-section .set3 .txt1 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 19.9 && i[14]){ // scene 3 더 19.9
                  if(!i[14]) return
                  i[14] = 0
                  gsap
                  .fromTo('.intro-section .set3 .txt2 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 20.4 && i[15]){ // scene 3 좋은 20.4
                  if(!i[15]) return
                  i[15] = 0
                  gsap
                  .fromTo('.intro-section .set3 .txt2 .span2',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 20.6 && i[16]){ // scene 3 서비스를 20.6
                  if(!i[16]) return
                  i[16] = 0
                  gsap
                  .fromTo('.intro-section .set3 .txt3 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 20.9 && i[17]){ // scene 3 위해 20.9
                  if(!i[17]) return
                  i[17] = 0
                  gsap
                  .fromTo('.intro-section .set3 .txt3 .span2',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 23.8 && i[18]){ // scene3 늘 더 좋은 서비스를 위해 텍스트 투명 24
                  if(!i[18]) return
                  i[18] = 0
                  
                  $('.intro-section .set3').css('opacity', 0)
                }
                if(cTime >= 26 && i[19]){ // scene 4 늘 26
                  if(!i[19]) return
                  i[19] = 0
                  gsap
                  .fromTo('.intro-section .set4 .txt1 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 26.5 && i[20]){ // scene 4 우리 26.5
                  if(!i[20]) return
                  i[20] = 0
                  gsap
                  .fromTo('.intro-section .set4 .txt1 .span2',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 27 && i[21]){ // scene 4 모두의 27
                  if(!i[21]) return
                  i[21] = 0
                  gsap
                  .fromTo('.intro-section .set4 .txt1 .span3',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 27.3 && i[22]){ // scene 4 보다 27.3
                  if(!i[22]) return
                  i[22] = 0
                  gsap
                  .fromTo('.intro-section .set4 .txt2 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 27.5 && i[23]){ // scene 4 나은 27.5
                  if(!i[23]) return
                  i[23] = 0
                  gsap
                  .fromTo('.intro-section .set4 .txt2 .span2',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 27.7 && i[24]){ // scene 4 케어를 27.7
                  if(!i[24]) return
                  i[24] = 0
                  gsap
                  .fromTo('.intro-section .set4 .txt3 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 27.7 && i[25]){ // scene 4 위해 27.8
                  if(!i[25]) return
                  i[25] = 0
                  gsap
                  .fromTo('.intro-section .set4 .txt3 .span2',1,{autoAlpha : 0.7,y:50},{delay:0.2,duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 30.8 && i[26]){ // scene4 늘 우리 모두의 보다 나은 케어를  텍스트 투명 31.1
                  if(!i[26]) return
                  i[26] = 0
                  $('.intro-section .set4').css('opacity', 0)
                }
                if(cTime >= 33.1 && i[27]){ // scene 5 한발 33.1
                  if(!i[27]) return
                  i[27] = 0
                  gsap
                  .fromTo('.intro-section .set5 .txt1 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 34.2 && i[28]){ // scene 5 앞선 34.2
                  if(!i[28]) return
                  i[28] = 0
                  gsap
                  .fromTo('.intro-section .set5 .txt1 .span2',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 34.5 && i[29]){ // scene 5 돌봄을 34.5
                  if(!i[29]) return
                  i[29] = 0
                  gsap
                  .fromTo('.intro-section .set5 .txt2 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 35 && i[30]){ // scene 5 향합니다. 35
                  if(!i[30]) return
                  i[30] = 0
                  gsap
                  .fromTo('.intro-section .set5 .txt2 .span2',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 37.8 && i[31]){ // scene5 한발 앞선 돌봄을 향합니다  텍스트 투명 38
                  if(!i[31]) return
                  i[31] = 0
                  $('.intro-section .set5').css('opacity', 0)
                }
                if(cTime >= 40.3 && i[32]){ // scene 6 NEUL 40.3
                  if(!i[32]) return
                  i[32] = 0
                  gsap
                  .fromTo('.intro-section .set6 .txt1 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 41.4 && i[33]){ // scene 6 SIVLER 41.4
                  if(!i[33]) return
                  i[33] = 0
                  gsap
                  .fromTo('.intro-section .set6 .txt2 .span1',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }
                if(cTime >= 41.6 && i[34]){ // scene 6 CARE 41.6
                  if(!i[34]) return
                  i[34] = 0
                  gsap
                  .fromTo('.intro-section .set6 .txt2 .span2',1,{autoAlpha : 0.7,y:50},{duration : 1,autoAlpha : 1,y:0})
                }

                // 영상이 종료되면 체크후 초기화 + 실행
                if(introVideo.eq(nowVideo).prop('ended')){
                  $('.intro-section .set6').css('opacity', 0)
                  initVideo(introVideo)
                  startVideo(introVideo.eq(nowVideo))
                }
              })
            }
          } 
        })
      })
      // 리사이즈 강제실행
      $(window).trigger('resize')
    }
  },
  initAnimationSet : function () {
    // 애니메이션 기본값 셋팅
    if($('.main-section').length > 0){
      // 이 부분에서 리사이즈로 각각의 초기값을 지정해도 좋음.
      // 단! 그렇다면 애니메이션 함수에서는 fromTo가 아닌 to로 사용하도록 교체
      gsap.set('.main-section.introduction .tit-set',{autoAlpha:0,y:50})
      gsap.set('.main-section.introduction .content',{autoAlpha:0,y:50})
      gsap.set('.main-section.silvercare .content-top',{autoAlpha:0})
      gsap.set('.main-section.silvercare .content-top',{y:50})
      gsap.set('.main-section.silvercare .content-bottom',{autoAlpha : 0})
      gsap.set('.main-section.silvercare .slide',{autoAlpha : 0})
      gsap.set('.main-section.silvercare .content-bottom',{y:50})
      gsap.set('.main-section.process.dt-only .wrap',{autoAlpha : 0})
      gsap.set('.main-section.process.dt-only .wrap > .tit-set',{y : 50})
      gsap.set('.main-section.process.mobile-only .content',{autoAlpha : 0})
      gsap.set('.main-section.process.mobile-only .wrap > .tit-set',{y : 50})
      gsap.set('.main-section.smartband .tit-set',{autoAlpha : 0,y:50})
      gsap.set('.main-section.smartband img',{y : 0},)
      gsap.set('.main-section.smartband img',{scale : 1})
      gsap.set('.main-section.new > div > .tit-set',{autoAlpha : 0,y : 50})
      gsap.set('.main-section.new .content',{autoAlpha : 0,yPercent: 10})
      gsap.set('.main-section.contact .row-content > .tit-set',{autoAlpha : 0,y : 50})
      gsap.set('.main-section.contact .contact-con',{autoAlpha : 0})
    }
  },
  animation : function(){
    /* 
      gsap.timeline().
      fromTo(요소, 애니메이션시간,{시작조건},{애니끝조건},실행타이밍시간(셋팅 안되어있으면 순차적 애니메이션))

      * 스크롤트리거 만들기 (스크롤애니메이션)
      ScrollTirgger.create({
        animation : gsap.timeline변수이름,
        trigger : 요소클래스명 or 아이디명 or 변수 (트리거를 기준으로 애니메이션실행),
        start : 'top or bottom 0% - 100%' (화면에 보이는 세로값을 기준),
      })

      * gsap.timeline() 제어
        시작 play() , 멈춤 pause() , 재시작 restart() , 진행도0으로 time(0)
    */
    if($('.main-section').length > 0){

    animation2 = gsap.timeline()
    animation2.
    fromTo('.main-section.introduction .tit-set',1,{autoAlpha:0,y:50},{autoAlpha:1,y:0})
    animation2.
    fromTo('.main-section.introduction .content',1,{autoAlpha:0,y:50},{autoAlpha:1,y:0},.5)

    ScrollTrigger.create({
      animation : animation2,
      trigger : '.main-section.introduction',
      start : 'top 60%',
    })

    animation3_1 = gsap.timeline()
    animation3_1.
    fromTo('.main-section.silvercare .content-top',2,{autoAlpha : 0},{autoAlpha : 1})
    animation3_1.
    fromTo('.main-section.silvercare .content-top',1,{y:50},{y:0},0)

    ScrollTrigger.create({
      animation : animation3_1,
      trigger : '.main-section.silvercare',
      start : 'top 60%'
    })

    animation3_2 = gsap.timeline()
    animation3_2.
    fromTo('.main-section.silvercare .content-bottom',2,{autoAlpha : 0},{autoAlpha : 1})
    animation3_2.
    fromTo('.main-section.silvercare .content-bottom',1,{y:50},{y:0},0)
    animation3_2.
    fromTo('.main-section.silvercare .slide',2,{autoAlpha : 0},{autoAlpha : 1,
      onEnter : () => {
        $('.main-section.silvercare .slide').css({animationPlayState : 'running'})
      }
    },.5)

    ScrollTrigger.create({
      animation : animation3_2,
      trigger : '.main-section.silvercare .content-bottom',
      start : 'top 60%',

    })

    animation4_1 = gsap.timeline()
    animation4_1.
    fromTo('.main-section.process.dt-only .wrap',2,{autoAlpha : 0},{autoAlpha : 1},0)
    animation4_1.
    fromTo('.main-section.process.dt-only .wrap > .tit-set',2,{autoAlpha : 0,y : 50},{delay : .5,autoAlpha : 1,y : 0},0)

    ScrollTrigger.create({
      animation : animation4_1,
      trigger : '.main-section.process',
      start : 'top 60%'
    })

    animation4_2 = gsap.timeline()
    animation4_2.
    fromTo('.main-section.process.mobile-only .wrap > .tit-set',2,{autoAlpha : 0,y : 50},{autoAlpha : 1,y : 0},0)
    animation4_2.
    fromTo('.main-section.process.mobile-only .content',2,{autoAlpha : 0},{autoAlpha : 1},0.5)

    ScrollTrigger.create({
      animation : animation4_2,
      trigger : '.main-section.process.mobile-only',
      start : 'top 60%',
    })

    animation5 = gsap.timeline()
    animation5.
    fromTo('.main-section.smartband .tit-set',2,{autoAlpha : 0,y:50},{autoAlpha:1,y:0})
    animation5.
    fromTo('.main-section.smartband img',2,{y : 0},{y : -$('.main-section.smartband img').height() / 20},0)
    animation5.
    fromTo('.main-section.smartband img',4,{scale : 1},{scale : 1.1},0)

    ScrollTrigger.create({
      animation : animation5,
      trigger : '.main-section.smartband',
      start : 'top 60%',
    })
    
    animation6 = gsap.timeline()
    animation6.
    fromTo('.main-section.new > div > .tit-set',2,{autoAlpha : 0,y : 50},{autoAlpha : 1,y : 0})
    animation6.
    fromTo('.main-section.new .content',2,{autoAlpha : 0,yPercent: 10},{autoAlpha : 1,yPercent : 0},0.5)

    ScrollTrigger.create({
      animation : animation6,
      trigger : '.main-section.new',
      start : 'top 60%',
    })

    animation7 = gsap.timeline()
    animation7.
    fromTo('.main-section.contact .row-content > .tit-set',1,{autoAlpha : 0,y : 50},{autoAlpha : 1,y : 0},0)
    animation7.
    fromTo('.main-section.contact .contact-con',1,{autoAlpha : 0},{autoAlpha : 1,
      onStart : () => {
        $('.main-section.contact .marquee').css({ 'animationPlayState' : 'running'})
      }
    },0.5)

    ScrollTrigger.create({
      animation : animation7,
      trigger : '.main-section.contact',
      start : 'top 60%',
    })


    $(window).scroll(function(){

      let isMobile = matchMedia("screen and (max-width : 1023px)").matches
      if(isMobile){
        // 모바일일때

      } else {
        // dt일때

        // 애니메이션 초기화 되는 부분
        let wh = $(window).scrollTop()
        if(wh <= $('.intro-section').offset().top){
          animation2.time(0).pause()
          animation3_1.time(0).pause()
          animation3_2.time(0).pause()
        }
        if(wh < $('.main-section.silvercare').offset().top){
          animation4_1.time(0).pause()
          animation4_2.time(0).pause()
          animation5.time(0).pause()
        }
        if(wh < $('.main-section.process').offset().top){
          animation6.time(0).pause()
        }
        if(wh < $('.main-section.smartband').offset().top){
          animation7.time(0).pause()
        }
        }
    })
    $(window).trigger('scroll')
  }
  },
  rememberScrollTop : function () {

    // 1024이상의 해상도일때 현재 스크롤값을 기억해 세션스토리지에 넣는다.
    // 메인페이지에서 새로고침시 원래의 스크롤위치로 이동하기 위해

    let scrollHeight = 0;
    $(window).scroll(function(){
      if(!matchMedia("screen and (max-width : 1023px)").matches){

        scrollHeight = $(window).scrollTop()
        
        sessionStorage.setItem("scrollY",scrollHeight)
      }
    })
  },
  chattingIcon : function() {
    if($('.chatting').length > 0){
      // 채팅문의 아이콘 스크롤 위치에 따른 색상변화
      let wH = 0
      let c = $('.chatting').height()
      let chat_trg1 = $('.main-section.introduction').offset().top
      let chat_trg1_H = $('.main-section.introduction').innerHeight()
      let chat_trg2 = $('.main-section.silvercare').offset().top
      let chat_trg2_H = $('.main-section.silvercare').innerHeight()
      let chat_trg3 = $('.main-section.process').offset().top
      let chat_trg3_H = $('.main-section.process').innerHeight()
      let chat_trg4 = $('.main-section.smartband').offset().top
      let chat_trg4_H = $('.main-section.smartband').innerHeight()
      let chat_trg5 = $('.main-section.new').offset().top
      let chat_trg5_H = $('.main-section.new').innerHeight()
      let chat_trg6 = $('.main-section.inquiry').offset().top
      let chat_trg6_H = $('.main-section.inquiry').innerHeight()
      let chat_trg8 = $('.main-section.contact').offset().top
      let chat_trg8_H = $('.main-section.contact').innerHeight()
      let chat_trg7 = $('#footer').offset().top
      let chat_trg7_H = $('#footer').innerHeight()
      $(window).scroll(function(){
        wH = $(window).scrollTop()
        let a = $('.chatting').offset().top
        let d = a + c

        if(d < $('.intro-section').height() + $('#header').height()){
          $('.chatting').removeClass('white')
          $('.chatting').addClass('blue')
        }
        if(a > chat_trg1 && a < chat_trg1 + chat_trg1_H){
          $('.chatting').removeClass('white')
          $('.chatting').addClass('blue')
        }
        if(a > chat_trg2 && a < chat_trg2 + chat_trg2_H){
          $('.chatting').removeClass('blue')
          $('.chatting').addClass('white')
        }
        if(a > chat_trg3 && a < chat_trg3 + chat_trg3_H){
          $('.chatting').removeClass('white')
          $('.chatting').addClass('blue')
        }
        if(a > chat_trg5 && a < chat_trg5 + chat_trg5_H){
          $('.chatting').removeClass('white')
          $('.chatting').addClass('blue')
        }
        if(a > chat_trg6 && a < chat_trg6 + chat_trg6_H){
          $('.chatting').removeClass('blue')
          $('.chatting').addClass('white')
        }
        if(a > chat_trg8 && a < chat_trg8 + chat_trg8_H){
          $('.chatting').removeClass('white')
          $('.chatting').addClass('blue')
        }
        if(a > chat_trg7 && a < chat_trg7 + chat_trg7_H){
          $('.chatting').removeClass('white')
          $('.chatting').addClass('blue')
        }

      })

      // 리사이즈시 기존값들 재할당
      $(window).resize(function(){

        c = $('.chatting').height()
        chat_trg1 = $('.main-section.introduction').offset().top
        chat_trg1_H = $('.main-section.introduction').innerHeight()
        chat_trg2 = $('.main-section.silvercare').offset().top
        chat_trg2_H = $('.main-section.silvercare').innerHeight()
        chat_trg3 = $('.main-section.process').offset().top
        chat_trg3_H = $('.main-section.process').innerHeight()
        chat_trg4 = $('.main-section.smartband').offset().top
        chat_trg4_H = $('.main-section.smartband').innerHeight()
        chat_trg5 = $('.main-section.new').offset().top
        chat_trg5_H = $('.main-section.new').innerHeight()
        chat_trg6 = $('.main-section.inquiry').offset().top
        chat_trg6_H = $('.main-section.inquiry').innerHeight()
        chat_trg8 = $('.main-section.contact').offset().top
        chat_trg8_H = $('.main-section.contact').innerHeight()
        chat_trg7 = $('#footer').offset().top
        chat_trg7_H = $('#footer').innerHeight()

      })
      $(window).trigger('scroll')
    }
  },
  contentScroll : function contentScroll() {
    let eventTarget = $('.trigger')
    
    eventTarget.each((idx,element)=>{
    let controller = new ScrollMagic.Controller();
    const tween = new TimelineMax();
    tween
    .from(element.children, 1, { autoAlpha: 0, y: 150,delay : .3 })
      
    new ScrollMagic.Scene({
      triggerElement: element,
      triggerHook: ".8",
      // offset: '50',
    })
    .setTween(tween)
    .addTo(controller)
    // .addIndicators()
    })

  },
  moveSection : function moveSection(duration,targetHeight,callback) { // 페이지내에서 스크롤 이동하는 함수 (이동시간,이동할스크롤값,콜백함수)
    $('html,body')
    .stop()
    .animate({ scrollTop: targetHeight },duration * 1000,callback)
  },
  sectionMoveScroll : function sectionMoveScroll(){
    let lastScrollY = 0; // 마지막 스크롤값
    let ableScroll = true; // 스크롤이벤트 가능여부 변수 true면 스크롤이벤트가 되게끔

    $(window).scroll(() => {
      let winWidth = window.innerWidth; // 현재 화면 가로값 // 모바일에서는 실행안되게 하기
      const scrollY = window.scrollY; // 현재 스크롤값
      const direction = scrollY > lastScrollY ? "down" : scrollY == lastScrollY ? "" : "up"; // 이전의 스크롤 위치와 비교하기
      if(winWidth > 1023){
        if($('.main.company').length){
          let headerHeight = $('#header').height();
          let subTitleHeight = $('.depth').length >= 1 ? $('.depth').height() + $('.subtitle').innerHeight() : $('.subtitle').innerHeight();
          let section1Top = $('.section1').offset().top;
          let section2Top = $('.section2').offset().top;

          if(direction === "down"){ // 스크롤 내릴때
            let tg1 = subTitleHeight - headerHeight
            let tg2 = $('.section1').innerHeight() - headerHeight

            let move2 = $('.depth').length >= 1 ? $('.section2').offset().top - headerHeight - $('.depth').innerHeight() : $('.section2').offset().top - headerHeight
            if(scrollY >= 0 && scrollY < tg1 && ableScroll){
              ableScroll = false
              ani.moveSection(.6,tg1,()=>{ableScroll = true})
            }
            else if (scrollY > tg1 && scrollY < tg2 && ableScroll){
              ableScroll = false
              ani.moveSection(.6,move2,()=>{ableScroll = true})
            }
          } else { // 스크롤 올릴때
            
            let tg1 = section1Top - headerHeight
            let tg2 = section2Top - headerHeight

            if(scrollY < tg2 && ableScroll ){
              if(scrollY > tg1){
                ableScroll = false
                ani.moveSection(.6,tg1,()=>{ableScroll = true})
              } else if(scrollY < tg1 && ableScroll) {
                ableScroll = false
                ani.moveSection(.6,$('.subtitle').offset().top,()=>{ableScroll = true})
              }
            }
          }
        }

        // if($('.main.silvercare').length || $('.main.assessment').length){
        //   let headerHeight = $('#header').height();
        //   let subTitleInnerHeight = $('.depth').height() + $('.subtitle').innerHeight(); 
        //   let section2Top = $('.section2').offset().top;
        //   let depthInnerHeight = $('.depth').innerHeight() 
        //   // if(direction == "down"){ // 스크롤 내릴때
        //   //   let tg1 = subTitleInnerHeight - headerHeight 
        //   //   let tg2 = $('.section1').innerHeight() - headerHeight

        //   //   let move2 = $('.section2').offset().top - headerHeight - $('.depth').innerHeight()
        //   //   if(scrollY >= 0 && scrollY < tg1 && ableScroll){
        //   //     ableScroll = false
        //   //     ani.moveSection(.6,tg1,()=>{ableScroll = true})
        //   //   }
        //   //   else if (scrollY > tg1 && scrollY < tg2 && ableScroll){
        //   //     ableScroll = false
        //   //     ani.moveSection(.6,move2,()=>{ableScroll = true})
        //   //   }
        //   // } else { // 스크롤 올릴때

        //   //   let tg1 = subTitleInnerHeight - headerHeight
        //   //   let tg2 = section2Top - headerHeight - depthInnerHeight
        //   //   if(scrollY < tg2){
        //   //       if(scrollY > tg1 && ableScroll){
        //   //         ableScroll = false
        //   //         ani.moveSection(.6,tg1,()=>{ableScroll = true})
        //   //       } 
        //   //       if(scrollY < tg1 && ableScroll) {
        //   //         ableScroll = false
        //   //         ani.moveSection(.6,0,()=>{ableScroll = true})
        //   //       }
        //   //   }
        //   // }




        // }

        if($('.main.band').length){ // 밴드 구조달라서 따로 분기
          if(direction === "down"){ // 스크롤 내릴때
            if(scrollY >= 0 && scrollY < $('.section1').height() && ableScroll){
              ableScroll = false
              ani.moveSection(.6,$('.section1').height(),()=>{ableScroll = true})
            }
          } else { // 스크롤 올릴때
            if(scrollY < $('.section2').offset().top - $('#header').height() && ableScroll ){
              ableScroll = false
              ani.moveSection(.6,0,()=>ableScroll = true)
            }
          }
        }

      }
      // 현재의 스크롤 값을 저장
      lastScrollY = scrollY;
      // console.log(lastScrollY,scrollY)
    });
  },
  hasDepthMoveSection : function hasDepthMoveSection(){
    let able = true // 스크롤 애니메이션 중복실행방지 변수
    if($('.main.silvercare').length || $('.main.assessment').length){

      gsap.to(window, {scrollTrigger : {
        trigger : $("#header"),
        endTrigger :$(".uptrg"),
        start : "top top",
        onEnter : () => { // 최상단에서 뎁스가 스티키되는부분까지 가는
          if(window.innerWidth > 1023){
            if(able){
            if(able == false) return;
            able=false; 
            gsap.to(window,{duration: .6, scrollTo:()=>{ return $('.section1').offset().top - $('#header').height() - $('.depth').innerHeight() },onComplete:()=>{able = true}})
            }
          }
        },
        onEnterBack : () => { // 뎁스가 스티키된 곳에서 최상단으로 가는
          if(window.innerWidth > 1023){
            if(able == false) return;
            able=false; 
            gsap.to(window,{duration: .6, scrollTo:0,onComplete:()=>{able=true}})
          }
        }
      } });

      gsap.to(window,{
        scrollTrigger : {
          trigger : $('.trggg'),
          start : "top top",
          onEnter : () => { // 스티키 걸친부분에서 섹션2 가 보여지는 부분까지 가는
            if(window.innerWidth > 1023){
              if(able){
                if(able == false) return;
                able=false; 
                gsap.to(window,{duration: .6, scrollTo: ()=>{return $('.section2').offset().top -$('#header').height() - $('.depth').innerHeight()},onComplete:()=>{able = true}})
              }
            }
          },
        }
      })

      gsap.to(window,{
        scrollTrigger : {
          trigger : $(".section2"),
          start:`top +=${$('.depth').innerHeight() + $('#header').height()}`,
          end : `top +=${$('.depth').innerHeight() + $('#header').height()}`,
          onEnterBack : () => { // 섹션2가 보이는 부분에서 스티키걸치는곳까지 가는
            if(window.innerWidth > 1023){
              if(able == false) return;
              able=false; 
              gsap.to(window,{duration: .6, scrollTo:()=>{ return $('#header').height() + $('.depth').innerHeight()},onComplete:()=>{able=true}})
            }
          }
        }
      })
    }
  }
};

$(function () {
  ani.init();
});