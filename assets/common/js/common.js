// Loading... 텍스트 인터벌 변수
let gbgb;
let common = {
  // gnb 길이 넣어줄 배열 생성
  gnbArr: [],
  
  init: function () {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
    
    
    // gnb 초기 실행
    common.gnbFnc();
    common.depthScroll(); // 2024-02-15 추가
  },

  // gnb
  // 2023-11-17 수정
  gnbFnc: function () {

    // 모바일 drawer 버튼 제어 
    // 2023-11-17 수정
    $(".btn-drawer").on("click", function () {

      let a = $(this).hasClass('active')
      if( a == false){ // 모바일 gnb 열때
        $(this).addClass('active')
        $('#header').addClass('open')
        $('body').css({overflow : 'hidden'});
        
      } else { // 모바일 gnb 닫을때
        $(this).removeClass('active')
        $('#header').removeClass('open')
        $('body').css({overflow : 'visible'});
      }
    });

    // 네비게이션바 클릭시
    $('.nav-toggle').click(function(e){
      
      let isMobile = matchMedia("screen and (max-width : 1023px)").matches
      let subDisplay = $(this).next().css("display")
      if(isMobile){
        if(subDisplay == 'block') {
          $('.sub-menu').slideUp("fast")
          $('.main-menu').removeClass("fold");
        }
        else {
          $('.sub-menu').slideUp("fast")
          $('.main-menu').removeClass("fold");
          $(this).next().slideToggle("fast")
          $(this).parent().addClass("fold");
        }
      }
      // 태그 내에 링크 없을 시 이벤트 막기
      if (!$(this).attr("href") || $(this).attr("href") == "#") {
        e.preventDefault();
      }
    })

    // 지구본 마우스 클릭시
    $('.lang').click(function(e){
      let hasActive = $('.lang').hasClass('active')
      if(hasActive){
        $('.lang').removeClass('active')
      } else {
        $('.lang').addClass('active')
      }

      // 태그 내에 링크 없을 시 이벤트 막기
      if (!$(this).attr("href") || $(this).attr("href") == "#") {
        e.preventDefault();
      }
    })
    

		// 윈도우 리사이징 할때마다 체크
    $(window).on("resize.gnb-menu", function () {

			// 서브 메뉴들의 길이를 배열에 담음
      $(".nav > .main-menu").find(".sub-menu").each(function () {
				common.gnbArr.push($(this).outerHeight());
			});

      // 모바일 사이즈 일때
      if (matchMedia("screen and (max-width: 1023px)").matches) {
        console.log('mobile')
        // 모바일일때 높이값 초기화
				$(".sub-bg, .sub-menu").css("height", "auto");
				// 모바일 시 기본 닫혀있는 클래스 추가
        $("#header").removeClass("open");
        $('.btn-drawer').removeClass('active')
        $(".nav-toggle").next().slideUp("fast");
        $(".nav-toggle").parent().removeClass("fold");
        // 모바일 시 mouseenter, leave 되는거 차단
        $(".nav > .main-menu").off("mouseenter")
        $(".nav > .main-menu").off("mouseleave")

      }  else {
        console.log('pc')
				// pc일때 모바일 기본 숨김 클래스 제거
        // $(".gnb").removeClass("close");
				
				// pc 일때 마우스 호버 제어
        $(".nav > .main-menu").each(function () {
          $(this).on("mouseenter", function () {
						$(".sub-bg").addClass("on");
						$(".gnb").addClass("hover");
            $('.sub-menu').show()
					})
					.on("mouseleave", function () {
						$(".sub-bg").removeClass("on");
						$(".gnb").removeClass("hover");
            $('.sub-menu').hide()
					});
        });
				// pc일때 서브 메뉴중 가장 긴 높이로 맞춰 줌
        $(".sub-bg, .sub-menu").css("height", Math.max.apply(null, common.gnbArr));
      }
    });

		// 리사이징 초기 실행 트리거
    $(window).trigger("resize.gnb-menu");

		// 스크롤시 쉐도우 처리 + 네비게이션 색상변화
    // 서브페이지에서는 active처리가 필요없게되 
    // 이 코드를 메인에서만 적용하고 서브페이지는 active를 주고 시작하는 것으로 하였음
		$(window).on("scroll resize", function () {
      var wt = $(window).scrollTop();
      if($('.main-section').length > 0){
        if (wt > 100) {
          $("#header").addClass("scroll");
          $("#header").addClass("active");
        } else {
          $("#header").removeClass("scroll");
          $("#header").removeClass("active");
        }
      }
		});

		$(window).trigger("scroll");
  },

	 // 모달 팝업 띄우기
	openModalPopup:function( tar ) {

    // 태그 내에 링크 없을 시 이벤트 막기
    if (!$(this).attr("href") || $(this).attr("href") == "#") {
      event.preventDefault();
    }
    
		let _tar = $("." + tar);
						
		$("body").append("<div class='modal'>");
		$("body").css("position", "absolute").css("overflow", "hidden");
		$(".modal").show();

		_tar.show();
	},

	// 모달 팝업 닫기
	closeModalPopup:function() {
		$(".modal").remove();
    // let a = matchMedia('screen and (max-width : 1023px').matches
    // let b = $('.gnb').hasClass('close')
    // a == true && b == false ? null : 
		$("body").css("position", "relative").css("overflow", "auto")
		$(".popup").hide()
	},

  // 채널톡 새창 열기
  channelTalk : function(){
    window.open('https://neulcare.channel.io/home','_blank');
  },

  // 2024-02-15 추가
  // 스크롤 시 depth 클래스 추가
  depthScroll:function() {
    $(window).scroll(function() {
      let scroll = $(window).scrollTop();
      if(scroll >= 100) {
        $(".depth").addClass("sticky");
      } else {
        $(".depth").removeClass("sticky");
      }
    });
  },

  // 로딩 팝업 띄우기
  openLoadingPopup : function(){
    let loading = `
    <div class="loading">
      <div class="loading-ring"></div>
      <div class="loading-ring"></div>
      <div class="loading-ring"></div>
      <div class="loading-ring"></div>
      <div class="loading-ring"></div>
      <div class="loading-txt">Loading</div>
    </div>
    `

    $("body").append("<div class='modal'>");
    $('body').append(loading)
    $("body").css("position", "absolute").css("overflow", "hidden");
		$(".modal").show();

    let i = 0;
    let LoadingArr = ['Loading.','Loading..','Loading...']
    let chgLoading = () => {
      if(i > LoadingArr.length){
        i = 0
      }
      $('.loading-txt').text(LoadingArr[i])
      i++;
    }
    gbgb = setInterval(chgLoading,400)
  },
  // 로딩 팝업 닫기
  closeLoadingPopup : function () {
    $(".modal").remove();
    $('.loading').remove();
		$("body").css("position", "relative").css("overflow", "auto");
    // Loading... 실행 멈춤 
    clearInterval(gbgb)
  },
};

$(function () {
  common.init();
});
