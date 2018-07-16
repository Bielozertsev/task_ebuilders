window.onload = pageLoad;

function pageLoad() {

    var expandBtn = document.getElementsByClassName("js-wholeSliderExpand"),
        slides = document.querySelectorAll('.js-wholeSliderItem'),
        orderInterval = null,
        wholeSlideInterval = null,
        currentSlide = 0;

    //open right block function
    function expanding() {
        var $this = event.target;

        var element = $this.closest('.expanded'),
            mainWrap = $this.closest('.js-wholeSliderItem'),
            numbers = mainWrap.querySelector('.js-productsSliderList'),
            list = Array.from(numbers.children);

        if (typeof(element) != 'undefined' && element != null) {
            mainWrap.classList.add('closed');
            mainWrap.classList.remove('expanded');

            list.forEach(function (el, index) {
                numbers.appendChild(el);
                el.style.setProperty("--place", (list.length - 1) - index);
            });

            wholeSlideInterval = setInterval(nextSlide, 4000);
        }
        else {
            mainWrap.classList.remove('closed');
            mainWrap.classList.add('expanded');
            list.forEach(function (el, index) {
                numbers.appendChild(el);
                el.style.setProperty("--place", index)
            });
            clearInterval(wholeSlideInterval);
            wholeSlideInterval = null;
        }
    }

    //run interval for randomly changing items
    function intervalSetting() {
        var $this = event.target;

        var element = $this.closest('.expanded'),
            mainWrap = $this.closest('.js-wholeSliderItem'),
            numbers = mainWrap.querySelector('.js-productsSliderList'),
            list = Array.from(numbers.children);

        if (typeof(element) != 'undefined' && element != null && orderInterval === null) {
            orderInterval = setInterval(function () {
                chageOrder(numbers, list);
            }, 2000);
        }
        else {
            clearInterval(orderInterval);
            orderInterval = null;
        }
    }

    //randomly changing items
    function chageOrder(numbers, list) {
        list.sort(function (a, b) {
            return -1 + Math.random() * 3;
        });

        while (numbers.children.length > 0) {
            numbers.removeChild(numbers.children[0]);
        }

        list.forEach(function (el, index) {
            numbers.appendChild(el);
            el.style.setProperty("--place", index);
        });
    }

    //whole page slider
    function nextSlide() {
        slides[currentSlide].classList.remove('showing');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('showing');
    }
    wholeSlideInterval = setInterval(nextSlide, 5000);

    //click event for expand button
    for (var i = 0; i < expandBtn.length; i++) {
        expandBtn[i].addEventListener('click', function() {
            expanding();
            intervalSetting();
        });
    }


}




