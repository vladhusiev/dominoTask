$(document).ready(function() {
    var undoBtn = $('.undo');
    var redoBtn = $('.redo');
    var newDominoBtn = $('.new-domino');
    var domino = $('.container > .domino');
    var dominoTop = $('.container > .domino > .upper');
    var dominoBot = $('.container > .domino > .lower');
    var dominoList = $('.list');
    var rotate = 0;

    dotsObj = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6
    }

    init();
    function init() {
        rotateLeft();
        rotateRight();
        scaleChange();
        animationChange();
        newDomino();
        addDots();
        dominoList.hide();
    }

    function rotateLeft() {
        undoBtn.click(function(e) {
            e.preventDefault();
            rotate -= 90;
            domino.css('transform', 'rotate(' + rotate +'deg)');
        })
    }

    function rotateRight() {
        redoBtn.click(function(e) {
            e.preventDefault();
            rotate += 90;
            domino.css('transform', 'rotate(' + rotate +'deg)');
        })
    }

    function scaleChange() {
        var scale = 1;
        var scaleInput = $('input[name="scale"]');
        scaleInput.on('change', function() {
           scale = 1 + scaleInput.val() / 20;
           domino.css('transform', 'scale('+ scale +')');
        })
    }

    function animationChange() {
        var transition = 1;
        var animInput = $('input[name="speed"]');
        animInput.on('change', function() {
            transition = 1 - animInput.val() / 10;
            domino.css('transition', transition + 's ease-in-out');
        })
    }

    function addDots() {
        $.each(dotsObj, function(key, value) {
            if ($('.dots').hasClass(key)) {
                for (var i = 0; i < value; i++)
                $('.dots.' + key +'').append('<div class = "dot"></dot>');
            }
        });
    }

    function updateDots(el) {
        $(el).empty();
        return $.each(dotsObj, function(key, value) {
            if ($(el).hasClass(key) && $(el).hasClass('upper')) {
                for (var i = 0; i < value; i++)
                $('.container .dots.upper').append('<div class = "dot"></dot>');
            }
            else if ($(el).hasClass(key) && $(el).hasClass('lower')) {
                for (var i = 0; i < value; i++)
                $('.container .dots.lower').append('<div class = "dot"></dot>');
            }
        });
    }


    function newDomino() {
        newDominoBtn.click(function() {
            dominoList.slideToggle();
        });
        $('body').on('click', function(e) {
            if ($(e.target).hasClass('upper')) {
                dominoTop.removeClass();
                dominoTop.addClass($(e.target).prop('class'));
                updateDots(dominoTop);
            }
            if ($(e.target).hasClass('lower')) {
                dominoBot.removeClass();
                dominoBot.addClass($(e.target).prop('class'));
                updateDots(dominoBot);
            }
        })
    }
});