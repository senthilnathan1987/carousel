/*******************************************************************************
 jquery.carousel
 Senthilnathan
 email: senthilnathan1987@live.com
 ******************************************************************************/

/*
 * Name:jquery.carousel
 * Version: 1.0
 */


if (typeof Object.create !== "function") {
    Object.create = function (e) {
        function t() {}
        t.prototype = e;
        return new t
    }
}(function (e) {
    var t = e.browser.msie && e.browser.version.substr(0, 1) < 9;
    var n = {
        settings: {
            itemsPerPage: 1,
            itemsPerTransition: 1,
            maxItemsPerSlide: 8,
            noOfRows: 1,
            nextPrevLinks: true
        },
        init: function (t, n) {
            if (!t.length) {
                return false
            }
            this.options = e.extend({}, this.settings, n);
            this.itemIndex = 0;
            this.container = t;
            this.runner = this.container.find("ul");
            this.items = this.runner.children("li");
            this.noOfItems = this.items.length;
            this.calculateItems();
            this.SetContainerWidth();
            if (this.noOfItems <= this.options.itemsPerPage) {
                return false
            }
            this.insertMask();
            this.noOfPages = Math.ceil((this.noOfItems - this.options.itemsPerPage) / this.options.itemsPerTransition) + 1;
            if (this.options.nextPrevLinks) {
                this.insertNextPrevLinks()
            }
            this.updateBtnState()
        },
        insertMask: function () {
            this.runner.wrap('<div class="mask" />');
            this.mask = this.container.find("div.mask");
            var e = this.runner.outerHeight(true);
            this.mask = this.container.find("div.mask");
            this.mask.height(e)
        },
        calculateItems: function () {
            var e = this.itemIndex;
            var t = this.container.find(".productList").size();
            var n = this.items.eq(this.itemIndex).find(".productList").size();
            var r = this.options.maxItemsPerSlide;
            var i = r * e + n;
            var s = i - n + 1;
            this.container.parent().find(".totalitems").html(t);
            this.container.parent().find(".endItemCount").html(i);
            this.container.parent().find(".startItemCount").html(s)
        },
        SetContainerWidth: function () {
            this.noOfItems = Math.round(this.noOfItems / this.options.noOfRows);
            var e = this.items.outerWidth(true) * this.noOfItems;
            this.runner.width(e)
        },
        insertNextPrevLinks: function () {
            this.prevLink = e('<a href="#" class="navPrev">Prev</a>').bind("click.carousel", e.proxy(this, "prevItem")).appendTo(this.container);
            this.nextLink = e('<a href="#" class="navNext">Next</a>').bind("click.carousel", e.proxy(this, "nextItem")).appendTo(this.container)
        },
        nextItem: function () {
            this.itemIndex = this.itemIndex + this.options.itemsPerTransition;
            this.animate();
            return false
        },
        prevItem: function () {
            this.itemIndex = this.itemIndex - this.options.itemsPerTransition;
            this.animate();
            return false
        },
        updateBtnState: function () {
            if (this.options.nextPrevLinks) {
                this.nextLink.add(this.prevLink).removeClass("prevdisabled");
                this.nextLink.add(this.prevLink).removeClass("nextdisabled");
                if (this.itemIndex === this.noOfItems - this.options.itemsPerPage) {
                    this.nextLink.addClass("nextdisabled")
                } else {
                    if (this.itemIndex === 0) {
                        this.prevLink.addClass("prevdisabled")
                    }
                }
            }
        },
        animate: function () {
            var n, r;
            if (this.itemIndex > this.noOfItems - this.options.itemsPerPage) {
                this.itemIndex = this.noOfItems - this.options.itemsPerPage
            }
            if (this.itemIndex < 0) {
                this.itemIndex = 0
            }
            var i = this.itemIndex;
            var s = this.items.eq(this.itemIndex).find(".productList").size();
            var o = this.options.maxItemsPerSlide;
            var u = o * i + s;
            var f = u - s + 1;
            var l = this.container.find(".productList").size();
            e(".maintainHover .startItemCount").html(f);
            e(".maintainHover .endItemCount").html(u);
            e(".maintainHover .totalitems").html(l);
            n = this.items.eq(this.itemIndex);
            r = n.position();
            if (t) {
                this.runner.stop().animate({
                    left: -r.left
                }, "normal", "swing")
            } else {
                this.mask.stop().animate({
                    scrollLeft: r.left
                }, "normal", "swing")
            }
            this.updateBtnState()
        }
    };
    e.fn.carousel = function (t) {
        return this.each(function () {
            var r = Object.create(n);
            r.init(e(this), t);
            e.data(this, "carousel", r)
        })
    }
})(jQuery)