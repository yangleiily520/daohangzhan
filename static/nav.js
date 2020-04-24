function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

$(function(){ 
    $.getJSON("static/nav.json",function(data){ //获取数据并填充页面
      var strHtml = "";
      $.each(data,function(infoIndex,info){  
        var navstr =  "";
        var navtitle = "";
        strHtml += "<li><a href='#" + info["_id"] + "'><span class ='" +info["icon"] + "'></span>" + info["classify"] + "</a></li>" ;
        navtitle += "<div class='box'><a href='#' id='" +info["_id"] + "'></a> <div class='sub-category'> <div><span class='"  + info["icon"] + "'></span>" + info["classify"] +"</div> </div><div>";
        $.each(info["sites"],function(i,str){
          if (str["logo"] == "no-logo"){
            str["logo"]="static/logo.svg";
          }
          navstr += '<a target="_blank" href="' + str["href"]+ '">';
          navstr += '<div class="item">';
          navstr += '    <div class="logo">'
          navstr +='       <img src="' + str["logo"] + '">' + str["name"] + ' </div>';
          navstr +='   <div class="desc">'+ str["desc"] + '</div>';
          navstr += '</div>      </a>';
        })
        navstr = navtitle + navstr + '</div>';
         $(".footer").before(navstr);//创建内容页
      }) 
      $("#navItem").append(strHtml);//创建左侧导航栏
    }) 
    

    //渲染自定义模块
    if (getQueryVariable('p') != ""){
        $.getJSON(getQueryVariable('p'),function(data){ //获取自定义数据并填充页面
        var f = getQueryVariable('f')
        var strHtml = "";
        if(f != ""){
          var model = data.filter(function (e) { return e.filter == f; });
          console.log(model);
          $.each(model,function(infoIndex,info){  
            var navstr =  "";
            var navtitle = "";
            strHtml += "<li><a href='#" + info["_id"] + "'><span class ='" +info["icon"] + "'></span>" + info["classify"] + "[自定义]</a></li>" ;
            navtitle += "<div class='box box_user'><a href='#' id='" +info["_id"] + "'></a> <div class='sub-category'> <div><i class='"  + info["icon"] + "'></i>" + info["classify"] +"[自定义]</div> </div><div>";
            $.each(info["sites"],function(i,str){
              if (str["logo"] == "no-logo"){
                str["logo"]="static/logo.svg";
              }
              navstr += '<a target="_blank" href="' + str["href"]+ '">';
              navstr += '<div class="item item_user">';
              navstr += '    <div class="logo">'
              navstr +='       <img src="' + str["logo"] + '">' + str["name"] + ' </div>';
              // navstr +='   <div class="desc">'+ str["desc"] + '</div>';
              navstr += '</div>      </a>';
            })
            navstr = navtitle + navstr + '</div>';
            $(".about").after(navstr);//插入自定义内容
          })
        }
        else{
          $.each(data,function(infoIndex,info){  

            var navstr =  "";
            var navtitle = "";
            strHtml += "<li><a href='#" + info["_id"] + "'><span class ='" +info["icon"] + "'></span>" + info["classify"] + "[自定义]</a></li>" ;
            navtitle += "<div class='box box_user'><a href='#' id='" +info["_id"] + "'></a> <div class='sub-category'> <div><i class='"  + info["icon"] + "'></i>" + info["classify"] +"[自定义]</div> </div><div>";
            $.each(info["sites"],function(i,str){
              if (str["logo"] == "no-logo"){
                str["logo"]="static/logo.svg";
              }
              navstr += '<a target="_blank" href="' + str["href"]+ '">';
              navstr += '<div class="item item_user">';
              navstr += '    <div class="logo">'
              navstr +='       <img src="' + str["logo"] + '">' + str["name"] + ' </div>';
              //navstr +='   <div class="desc">'+ str["desc"] + '</div>';
              navstr += '</div>      </a>';
            })
            navstr = navtitle + navstr + '</div>';
            $(".about").after(navstr);//插入自定义内容
          }) 
        }
        
        $("#navItem").prepend(strHtml);//插入左侧自定义导航栏
      })

    }
    //導航欄滑動定位
    var href = "";
    var pos = "";
    $(".nav-item ").on('click','li',function(e){ //左栏定位
      $(".nav-item li a").each(function () {
          $(this).removeClass("active");
      });

      $(this).children().addClass("active");

      e.preventDefault(); //取消a屬性默認動作，改用滑動定位
      href = $(this).children().attr("href");
      pos = $(href).position().top - 30;
      console.log($(href));
      $("html,body").animate({ scrollTop: pos }, 500);

      //導航欄手機端隱藏
      var oMenu = document.getElementById('menu');
      var oBtn = oMenu.getElementsByTagName('a')[0];
      var oLeftBar = document.getElementById('leftBar');
      oBtn.onclick = function () {
          if (oLeftBar.offsetLeft == 0) {
              oLeftBar.style.left = -249 + 'px';
          } else {
              oLeftBar.style.left = 0 + 'px';
          }
          if (document.documentElement.clientWidth <= 600) {
              document.onclick = function () {
                  if (oLeftBar.offsetLeft == 0) {
                      oLeftBar.style.left = -249 + 'px';
                  }
              }
          }
      }   
      
      //滑动到顶部
      $(window).scroll(function () {
          if ($(window).scrollTop() >= 200) {
              $('#fixedBar').fadeIn(300);
          } else {
              $('#fixedBar').fadeOut(300);
          }
      });
      $('#fixedBar').click(function () {
          $('html,body').animate({
              scrollTop: '0px'
          }, 800);
      })

    });
  

  
  
}) 