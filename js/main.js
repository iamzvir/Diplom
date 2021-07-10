$(document).ready(function() {
    // Sticky header

    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll < 80) {
            $(".header-top").removeClass("sticky-bar");

        } else {
            $(".header-top").addClass("sticky-bar");

        }
    });

    // Slider header

    $('.slider-content__wrapper').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        appendDots: $('.carousel-ind'),
        asNavFor: '.slider-img'
    });


    $('.slider-img').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slider-content__wrapper',
    });

    //  Scroll to section

    $('.small-btn').click(function() {
        var scrollName = $(this).attr('data-scroll'),
            scrollElem = $(scrollName),
            scrollTop = scrollElem.offset().top;

        $('html, body').animate({
            scrollTop: scrollTop
        }, 500);
    });

    // Preloder 
    $(window).on('load', function() {
        $('#preloader-active').delay(450).fadeOut('slow');
        $('body').delay(450).css({
            'overflow': 'visible'
        });
    });

    // кнопка отправки формы

    $('[data-submit]').on('click', function(e) {
        console.log('aaaaaa');
        e.preventDefault();
        $(this).parent('form').submit();
    });

    $.validator.addMethod('regex', function(value, element, regexp) {
        let regExsp = new RegExp(regexp);
        return this.optional(element) || regExsp.test(value)
    }, 'pleace check your input');


    $('.form').each(function() {
        $(this).validate({
            rules: {
                name: {
                    required: true,
                    regex: "^[A-Za-z]{1,32}$"
                },
                email: {
                    required: true,
                    email: true,
                },
                phone: {
                    required: true,
                    regex: '^\\+?[0-9]+$'
                },
            },
            messages: {
                name: 'Введите имя правильно',
                email: 'Введите правильно Ваш email',
                phone: 'Введите правильно Ваш номер'
            },
            submitHandler: function(form) {
                $('#preloader-active').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    case 'search-box':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function() {

                            });
                        break;
                    case 'form':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize()
                            })
                            .done(function() {
                                console.log('Succes');
                            })
                            .fail(function() {
                                console.log('Fail')
                            })
                            .always(function() {
                                $('#staticBackdrop').modal('hide');
                                $('#message').modal('show');
                            });

                }
            }
        });

    });
});