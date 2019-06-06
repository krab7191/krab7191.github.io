var TO;
var count = 0;
var counterElem = document.getElementById('redirectCounter');

const showSiteMigrateModal = () => {
    const div = document.getElementById('siteMigrateModal');
    div.style.display = 'block';
    TO.clearInterva();
    TO = window.setInterval(function () {
        counterElem.textContent = count;
        if (count === 5) {
            window.location.href = 'https://www.karstenrabe.dev/';
        }
        count++;
    }, 1000);
}


$(function () {
    const url = window.location.href;
    console.log(url);
    if (url === 'https://krab7191.github.io/') {
        showSiteMigrateModal();
    }

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    $('.link-scroll').on('click', function (e) {
        $(".navbar-toggler").click();
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
    });

    $('body').scrollspy({
        target: '#navbarcollapse',
        offset: 80
    });

    $(window).scroll(() => {

        const scroll = $(this).scrollTop();

        if ($(window).width() > 1250) {
            $('.parallax').css({
                'background-position': 'left -' + scroll / 8 + 'px'
            });
        } else {
            $('.parallax').css({
                'background-position': 'center center'
            });
        }
    });

    $('#filter a').click(function (e) {
        e.preventDefault();

        $('#filter li').removeClass('active');
        $(this).parent('li').addClass('active');

        var categoryToFilter = $(this).attr('data-filter');

        $('.reference-item').each(function () {

            if ($(this).data('category') === categoryToFilter || categoryToFilter === 'all') {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    });

    $('.reference a').on('click', function (e) {

        e.preventDefault();

        var title = $(this).find('.reference-title').text(),
            description = $(this).siblings('.reference-description').html();

        $('#detail-title').text(title);
        $('#detail-content').html(description);

        var images = $(this).siblings('.reference-description').data('images').split(',');
        if (images.length > 0) {
            sliderContent = '';
            for (let i = 0; i < images.length; ++i) {
                sliderContent = sliderContent + '<div class="item"><img src=' + images[i] + ' alt="" class="img-fluid"></div>';
            }
        } else {
            sliderContent = '';
        }

        openReference(sliderContent);

    });

    function openReference(sliderContent) {
        $('#detail').slideDown();
        $('#references-masonry').slideUp();


        if (sliderContent !== '') {

            const slider = $('#detail-slider');

            if (slider.hasClass('owl-loaded')) {
                slider.trigger('replace.owl.carousel', sliderContent);
            } else {
                slider.html(sliderContent);
                slider.owlCarousel({
                    nav: false,
                    dots: true,
                    items: 1
                });

            }
        }
    }


    function closeReference() {
        $('#references-masonry').slideDown();
        $('#detail').slideUp();
    }

    $('#filter a, #detail .close').on('click', () => {
        closeReference();
    });

    delayTime = 0;

    $('[data-animate]').waypoint(function (direction) {
        delayTime += 100;

        const element = $(this.element);

        $(this.element).delay(delayTime).queue(next => {
            element.addClass('animated');
            element.addClass(element.data('animate'));
            delayTime = 0;
            next();
        });

        this.destroy();

    }, {
            offset: '90%'
        });

    $('[data-animate-hover]').hover(() => {
        $(this).css({
            opacity: 1
        });
        $(this).addClass('animated');
        $(this).removeClass($(this).data('animate'));
        $(this).addClass($(this).data('animate-hover'));
    }, () => {
        $(this).removeClass('animated');
        $(this).removeClass($(this).data('animate-hover'));
    });

});
