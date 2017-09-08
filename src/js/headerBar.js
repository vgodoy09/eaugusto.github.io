(function () {
    'use strict';

    var post = document.querySelector('.post-content');

    if (post) {
        var lastScrollTop = 0;

        var header = document.querySelector('.bar-header');

        document.addEventListener('scroll', function() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                header.style.top = '-100%';
            } else {
                header.style.top = '0%';
            }

            lastScrollTop = scrollTop;
        });
    }
})();
