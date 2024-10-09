(function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
        'gtm.start':
            new Date().getTime(), event: 'gtm.js'
    }); var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-WBJ97DL');

!function (e) {
    if (!window.pintrk) {
        window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))
        }; var
            n = window.pintrk; n.queue = [], n.version = "3.0"; var
                t = document.createElement("script"); t.async = !0, t.src = e; var
                    r = document.getElementsByTagName("script")[0];
        r.parentNode.insertBefore(t, r)
    }
}("https://s.pinimg.com/ct/core.js");
pintrk('load', '2613816880133');
pintrk('page');