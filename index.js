
var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true){
        console.log('Element is fully visible in screen');
        console.log(entries[0]);
        entries[0].target.style.visibility = "visible";
        entries[0].target.classList.add('animate__animated','animate__fadeInUp');
    }
}, { threshold: [1] });

window.onload = function () {
    observer.observe(document.querySelector('#bubbles'));
}
$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      document.getElementsByClassName("navbar")[0].style.height = '3.5rem';
      document.getElementsByClassName("navbar")[0].style.backgroundColor = 'rgb(0,0,0,0.5)';
    } else {
        document.getElementsByClassName("navbar")[0].style.height = '6rem';
        document.getElementsByClassName("navbar")[0].style.backgroundColor = 'transparent';
    }
  });

$(document).ready( function() {
var 
dom = {
    body: $('body'),
    title: $('points'),
    bar: $('.progress'),
    line: document.createElement('div')
};
barHeight = dom.bar.height();
bodyHeight = dom.body.height();
$(window).on('resize', function() {
    barHeight = dom.bar.height();
    bodyHeight = dom.body.height();
});
scrollTop = $(window).scrollTop();
$(window).on('scroll', function() {
    scrollTop = $(window).scrollTop();
}); 
dom.bar.append(dom.line);
$(dom.line).css({
    'background': 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(15,59,115,0.87) 73%, rgba(22,136,138,1) 100%)',
    'width':      '8px',
    'position':   'relative',
    '-webkit-border-radius': '0 0 10px 10px',
    'border-radius': '0 0 10px 10px'
});

function addPoints() {
    dom.bar.find('.point').remove();
    for ( var i = 0; i < dom.title.length; i++ ) {
    var
    item = dom.title[i],
        itemPosition = $(item).position().top,
        percent = ( itemPosition / ( bodyHeight - barHeight ) );
    pointPosition = ( ( percent * 100 ) < 100 ) ? percent * 100 : 98;

    dom.point = document.createElement('span');

    $(dom.point).addClass('point');
    $.data( dom.point, 'label', item );
    $(dom.point).appendTo(dom.bar)
        .css( 'top', pointPosition + '%' );
    }
    addPointEvents();
}

function addPointEvents() {
    dom.point = $('.point');

    dom.point.click(function() {
    var label = $.data(this, 'label');
    $(window).scrollTop( $(label).offset().top );
    })
    dom.point.hover( 
    function() {             	
        var titlebox = document.createElement('div'),
            label = $.data(this, 'label');

        $(titlebox).appendTo(dom.body);
        $(titlebox).addClass('titlebox');
        $(titlebox).text( $(label).text() );
        $(titlebox).css( 'top', $(this).position().top )
        .animate({
        'left': '30px',
        'opacity': '1'
        }, 50);
    },
    function() {
        dom.body.find('.titlebox')
        .animate({
        'left': '60px',
        'opacity': '0.4'
        }, 50, function () {
        $(this).remove();
        })
    }
    );
}

function progress(e) {
    var 
    percent = scrollTop / ( bodyHeight - barHeight ),
        value = percent * 100;
    dom.bar.find('div').css({ 'height': value + '%' });

    $(dom.point).each(function() {
    var label = $.data(this, 'label');

    if ( $(label).offset().top <= scrollTop + 3 ) {
        $(this).addClass('active');
    } else {
        $(this).removeClass('active');
    }
    })
}


addPoints();
progress();

$(window).on('resize', addPoints);
$(window).on('scroll', progress);

})