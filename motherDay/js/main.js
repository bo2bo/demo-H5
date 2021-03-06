/**
 * Created by LY 博 BO。 on 2017/10/26.
 */
define("app/TD", [], function () {
    var e = e || {};
    return e.ajax = function (e, t, n) {
        $.ajax({
            type: e.type || "GET", url: e.url, dataType: "json", data: e.data || "", success: function (e) {
                e.status == 1 ? t && t(e.data) : n && n(e.message)
            }, error: function (e, t, r) {
                n && n("网络连接不稳定，请重试或刷新页面！")
            }
        })
    }, e.wxShare = function (t, n) {
        wx.onMenuShareTimeline({
            title: t.title, link: t.link, imgUrl: t.img, success: function () {
                n && n(), e.ajax({type: "POST", url: t.track, data: {btn: "2"}}, function (e) {
                    console.log(e)
                })
            }, cancel: function () {
            }
        }), wx.onMenuShareAppMessage({
            title: t.desc, desc: t.title, link: t.link, imgUrl: t.img, success: function () {
                n && n(), e.ajax({type: "POST", url: t.track, data: {btn: "1"}}, function (e) {
                    console.log(e)
                })
            }, cancel: function () {
            }
        })
    }, e.initWxApi = function (t, n) {
        wx.config({
            debug: !1,
            appId: t.appId,
            timestamp: t.timestamp,
            nonceStr: t.nonceStr,
            signature: t.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice"]
        }), wx.ready(function () {
            e.wxShare(t.share)
        })
    }, e.preload = function (t) {
        var n = this;
        this.loading = null, this.loaded = null, this.fail = null;
        var r = t.imgs ? t.imgs.length : 0, i = t.ajaxs ? t.ajaxs.length : 0, s = r + i, o = 0, u = [], a = function () {
            var e = function () {
                o++, o == s ? (n.loading && n.loading(100), n.loaded && n.loaded(u)) : n.loading && n.loading(Math.round(o / s * 100))
            };
            for (var i = 0; i < r; i++) {
                var a = new Image;
                a.onload = a.onerror = e, a.src = t.imgs[i], u.push(a)
            }
        }, f = function () {
            var r = !1;
            t.ajax.forEach(function (t) {
                e.ajax({url: t.url, type: t.type || "GET", data: t.data || ""}, function (e) {
                    return function (t) {
                        if (r)return;
                        o++, o == s ? n.loaded && n.loaded(u) : n.loading && n.loading(Math.round(o / s * 100)), e.succback && e.succback(t)
                    }
                }(t), function (e) {
                    return function (t) {
                        r = !0, n.fail && n.fail({msg: t, url: e.url})
                    }
                }(t))
            })
        };
        this.init = function () {
            if (s == 0) {
                this.loaded && this.loaded(t);
                return
            }
            r !== 0 && a(), i !== 0 && f()
        }
    }, e
}), define("app/Config", [], function () {
    var e = e || {};
    return e.URL_initSDK = "http://ttcq.treedom.cn/back/index.php?m=index&c=wechat&a=signature", e.URL_uploadVoice = "http://ttcq.treedom.cn/back/index.php?m=index&c=index&a=upload", e.URL_trackShare = "http://ttcq.treedom.cn/back/index.php?m=index&c=index&a=track", e.defShare = {
        title: "mom",
        desc: "mom",
        link: location.href,
        img: "img/share.jpg",
        track: e.URL_trackShare
    }, e.mumShare = {
        title: "2222",
        desc: "22222",
        link: null,
        img: "img/share.jpg",
        track: e.URL_trackShare
    }, e.music = {
        bg: "img/audio_bg.mp3",
        popup: "img/popup.mp3",
        rewind: "img/rewind.mp3",
        press: "img/press.mp3",
        error: "img/error.mp3",
        slide: "img/slide.mp3",
        open: "img/open.mp3"
    }, e.audioPre = "http://tx-md.oss-cn-shenzhen.aliyuncs.com/upload/mp3/", e.coverPre = "img/", e.audios = [{
        audioUrl: "img/audio_guide.mp3",
        audioLen: 22,
        cover: "img/bg_tape_blank.png"
    }, {audioUrl: "img/audio_dnbs.mp3", audioLen: 44, cover: "img/bg_tape_dnbs.png"}, {
        audioUrl: "img/audio_ns.mp3",
        audioLen: 33,
        cover: "img/bg_tape_wr.png"
    }, {audioUrl: "img/audio_pdm.mp3", audioLen: 30, cover: "img/bg_tape_pdm.png"}, {
        audioUrl: "img/audio_wrm.mp3",
        audioLen: 38,
        cover: "img/bg_tape_ns.png"
    }, {
        audioUrl: "img/audio_ygm.mp3",
        audioLen: 41,
        cover: "img/bg_tape_yg.png"
    }], e.makePageImgs = ["img/bg_loading_zhuan.png", "img/bg_loading.png", "img/bg_btn_change.png", "img/bg_btn_open_recorder.png", "img/bg_btn_share_mum.png", "img/bg_btn_share.png", "img/bg_complete_btn.png", "img/bg_first_txt.png", "img/bg_icon_phone.png", "img/bg_icon_recorder.png", "img/bg_logo.png", "img/bg_mailer_box.png", "img/bg_mailer_cover.png", "img/bg_mailer.png", "img/bg_main.jpg", "img/bg_music_offon.png", "img/bg_play_btn.png", "img/bg_record_btn.png", "img/bg_recorder_main.png", "img/bg_second_txt.png", "img/bg_share_tofriend.png", "img/bg_tape_band.png", "img/bg_tape_time.png", "img/bg_tape_zhuan.png", "img/bg_third_txt.png", "img/bg_zhou.png"], e.playPageImgs = ["img/bg_loading_zhuan.png", "img/bg_loading.png", "img/bg_backhome_btn.png", "img/bg_gift_cover_center.png", "img/bg_mailer_bar_right.png", "img/bg_mailer_bar_left.png", "img/bg_gift_cover.jpg", "img/bg_main_mum.png", "img/bg_main.jpg", "img/bg_recorder_main.png", "img/bg_music_offon.png", "img/bg_replay_btn.png", "img/bg_share_btn.png", "img/bg_share_tofriend.png", "img/bg_tape_band.png", "img/bg_tape_time.png", "img/bg_tape_zhuan.png", "img/bg_zhou.png"], e
}), define("app/Global", [], function () {
    var e = e || {};
    return e.isMakePagePreload = !1, e.isPlayPagePreload = !1, e.bgMusic = null, e.audioError = null, e.audioPopup = null, e.audioPress = null, e.audioRewind = null, e.audioSlide = null, e.audioOpen = null, e
}), function (e, t) {
    typeof define == "function" && define.amd ? define("lib/shake", [], function () {
        return t(e, e.document)
    }) : typeof module != "undefined" && module.exports ? module.exports = t(e, e.document) : e.Shake = t(e, e.document)
}(typeof window != "undefined" ? window : this, function (e, t) {
    "use strict";
    function n(n) {
        this.hasDeviceMotion = "ondevicemotion" in e, this.options = {threshold: 15, timeout: 1e3};
        if (typeof n == "object")for (var r in n)n.hasOwnProperty(r) && (this.options[r] = n[r]);
        this.lastTime = new Date, this.lastX = null, this.lastY = null, this.lastZ = null;
        if (typeof t.CustomEvent == "function")this.event = new t.CustomEvent("shake", {
            bubbles: !0,
            cancelable: !0
        }); else {
            if (typeof t.createEvent != "function")return !1;
            this.event = t.createEvent("Event"), this.event.initEvent("shake", !0, !0)
        }
    }

    return n.prototype.reset = function () {
        this.lastTime = new Date, this.lastX = null, this.lastY = null, this.lastZ = null
    }, n.prototype.start = function () {
        this.reset(), this.hasDeviceMotion && e.addEventListener("devicemotion", this, !1)
    }, n.prototype.stop = function () {
        this.hasDeviceMotion && e.removeEventListener("devicemotion", this, !1), this.reset()
    }, n.prototype.devicemotion = function (t) {
        var n = t.accelerationIncludingGravity, r, i, s = 0, o = 0, u = 0;
        if (this.lastX === null && this.lastY === null && this.lastZ === null) {
            this.lastX = n.x, this.lastY = n.y, this.lastZ = n.z;
            return
        }
        s = Math.abs(this.lastX - n.x), o = Math.abs(this.lastY - n.y), u = Math.abs(this.lastZ - n.z);
        if (s > this.options.threshold && o > this.options.threshold || s > this.options.threshold && u > this.options.threshold || o > this.options.threshold && u > this.options.threshold)r = new Date, i = r.getTime() - this.lastTime.getTime(), i > this.options.timeout && (e.dispatchEvent(this.event), this.lastTime = new Date);
        this.lastX = n.x, this.lastY = n.y, this.lastZ = n.z
    }, n.prototype.handleEvent = function (e) {
        if (typeof this[e.type] == "function")return this[e.type](e)
    }, n
}), function (e) {
    function n(e) {
        return e && (e = e.toString().replace(t.pluses, "%20"), e = decodeURIComponent(e)), e
    }

    function r(e) {
        var n = t.uri_parser, r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "isColonUri", "relative", "path", "directory", "file", "query", "anchor"], i = n.exec(e || ""), s = {};
        return r.forEach(function (e, t) {
            s[e] = i[t] || ""
        }), s
    }

    function i(e) {
        var r, i, s, o, u, a, f, l = [];
        if (typeof e == "undefined" || e === null || e === "")return l;
        e.indexOf("?") === 0 && (e = e.substring(1)), i = e.toString().split(t.query_separator);
        for (r = 0, f = i.length; r < f; r++)s = i[r], o = s.indexOf("="), o !== 0 && (u = n(s.substring(0, o)), a = n(s.substring(o + 1)), l.push(o === -1 ? [s, null] : [u, a]));
        return l
    }

    function s(e) {
        this.uriParts = r(e), this.queryPairs = i(this.uriParts.query), this.hasAuthorityPrefixUserPref = null
    }

    var t = {
        starts_with_slashes: /^\/+/,
        ends_with_slashes: /\/+$/,
        pluses: /\+/g,
        query_separator: /[&;]/,
        uri_parser: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@]*))?)?@)?(\[[0-9a-fA-F:.]+\]|[^:\/?#]*)(?::(\d+|(?=:)))?(:)?)((((?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    };
    Array.prototype.forEach || (Array.prototype.forEach = function (e, t) {
        var n, r;
        if (this == null)throw new TypeError(" this is null or not defined");
        var i = Object(this), s = i.length >>> 0;
        if (typeof e != "function")throw new TypeError(e + " is not a function");
        arguments.length > 1 && (n = t), r = 0;
        while (r < s) {
            var o;
            r in i && (o = i[r], e.call(n, o, r, i)), r++
        }
    }), ["protocol", "userInfo", "host", "port", "path", "anchor"].forEach(function (e) {
        s.prototype[e] = function (t) {
            return typeof t != "undefined" && (this.uriParts[e] = t), this.uriParts[e]
        }
    }), s.prototype.hasAuthorityPrefix = function (e) {
        return typeof e != "undefined" && (this.hasAuthorityPrefixUserPref = e), this.hasAuthorityPrefixUserPref === null ? this.uriParts.source.indexOf("//") !== -1 : this.hasAuthorityPrefixUserPref
    }, s.prototype.isColonUri = function (e) {
        if (typeof e == "undefined")return !!this.uriParts.isColonUri;
        this.uriParts.isColonUri = !!e
    }, s.prototype.query = function (e) {
        var t = "", n, r, s;
        typeof e != "undefined" && (this.queryPairs = i(e));
        for (n = 0, s = this.queryPairs.length; n < s; n++)r = this.queryPairs[n], t.length > 0 && (t += "&"), r[1] === null ? t += r[0] : (t += r[0], t += "=", typeof r[1] != "undefined" && (t += encodeURIComponent(r[1])));
        return t.length > 0 ? "?" + t : t
    }, s.prototype.getQueryParamValue = function (e) {
        var t, n, r;
        for (n = 0, r = this.queryPairs.length; n < r; n++) {
            t = this.queryPairs[n];
            if (e === t[0])return t[1]
        }
    }, s.prototype.getQueryParamValues = function (e) {
        var t = [], n, r, i;
        for (n = 0, i = this.queryPairs.length; n < i; n++)r = this.queryPairs[n], e === r[0] && t.push(r[1]);
        return t
    }, s.prototype.deleteQueryParam = function (e, t) {
        var r = [], i, s, o, u, a;
        for (i = 0, a = this.queryPairs.length; i < a; i++)s = this.queryPairs[i], o = n(s[0]) === n(e), u = s[1] === t, (arguments.length === 1 && !o || arguments.length === 2 && (!o || !u)) && r.push(s);
        return this.queryPairs = r, this
    }, s.prototype.addQueryParam = function (e, t, n) {
        return arguments.length === 3 && n !== -1 ? (n = Math.min(n, this.queryPairs.length), this.queryPairs.splice(n, 0, [e, t])) : arguments.length > 0 && this.queryPairs.push([e, t]), this
    }, s.prototype.hasQueryParam = function (e) {
        var t, n = this.queryPairs.length;
        for (t = 0; t < n; t++)if (this.queryPairs[t][0] == e)return !0;
        return !1
    }, s.prototype.replaceQueryParam = function (e, t, r) {
        var i = -1, s = this.queryPairs.length, o, u;
        if (arguments.length === 3) {
            for (o = 0; o < s; o++) {
                u = this.queryPairs[o];
                if (n(u[0]) === n(e) && decodeURIComponent(u[1]) === n(r)) {
                    i = o;
                    break
                }
            }
            i >= 0 && this.deleteQueryParam(e, n(r)).addQueryParam(e, t, i)
        } else {
            for (o = 0; o < s; o++) {
                u = this.queryPairs[o];
                if (n(u[0]) === n(e)) {
                    i = o;
                    break
                }
            }
            this.deleteQueryParam(e), this.addQueryParam(e, t, i)
        }
        return this
    }, ["protocol", "hasAuthorityPrefix", "isColonUri", "userInfo", "host", "port", "path", "query", "anchor"].forEach(function (e) {
        var t = "set" + e.charAt(0).toUpperCase() + e.slice(1);
        s.prototype[t] = function (t) {
            return this[e](t), this
        }
    }), s.prototype.scheme = function () {
        var e = "";
        return this.protocol() ? (e += this.protocol(), this.protocol().indexOf(":") !== this.protocol().length - 1 && (e += ":"), e += "//") : this.hasAuthorityPrefix() && this.host() && (e += "//"), e
    }, s.prototype.origin = function () {
        var e = this.scheme();
        this.userInfo() && this.host() && (e += this.userInfo(), this.userInfo().indexOf("@") !== this.userInfo().length - 1 && (e += "@"));
        if (this.host()) {
            e += this.host();
            if (this.port() || this.path() && this.path().substr(0, 1).match(/[0-9]/))e += ":" + this.port()
        }
        return e
    }, s.prototype.addTrailingSlash = function () {
        var e = this.path() || "";
        return e.substr(-1) !== "/" && this.path(e + "/"), this
    }, s.prototype.toString = function () {
        var e, n = this.origin();
        return this.isColonUri() ? this.path() && (n += ":" + this.path()) : this.path() ? (e = this.path(), !t.ends_with_slashes.test(n) && !t.starts_with_slashes.test(e) ? n += "/" : (n && n.replace(t.ends_with_slashes, "/"), e = e.replace(t.starts_with_slashes, "/")), n += e) : this.host() && (this.query().toString() || this.anchor()) && (n += "/"), this.query().toString() && (n += this.query().toString()), this.anchor() && (this.anchor().indexOf("#") !== 0 && (n += "#"), n += this.anchor()), n
    }, s.prototype.clone = function () {
        return new s(this.toString())
    }, typeof define == "function" && define.amd ? define("lib/Uri", [], function () {
        return s
    }) : typeof module != "undefined" && typeof module.exports != "undefined" ? module.exports = s : e.Uri = s
}(this), define("app/pageMake", ["app/TD", "app/Config", "app/Global", "lib/shake", "lib/Uri"], function (e, t, n, r, i) {
    var s = $("#pageMake"), o = null, u = null, a = !0, f = null, l = null, c = null, h = t.audios, p = 0, d = function (i) {
        var c = this, d = s.find("#btnRecord"), v = s.find("#btnPlay"), m = s.find("#btnUpdata"), g = s.find("#btnChange"), y = s.find(".m-recorder"), b = s.find(".m-tape-box"), w = s.find(".m-tape.e1").find(".inner"), E = s.find(".m-tape.e1"), S = s.find(".m-tape.e2"), x = E.find(".time"), T = y.find(".music-offon"), N = $(".m-uploading"), C = !1, k = !1, L = !1, A = !1, O = !0, M = null, _ = null, D = null, P = function () {
            D = D > 0 ? D - 1 : 0, x.text(D + '"')
        }, H = function () {
            x.text(f + '"'), f++
        };
        this.shakeObj = null;
        var B = function (e) {
            L = !1, M = e.localId, d.removeClass("on"), y.removeClass("move"), w.removeClass("move"), D = f, o = f, clearInterval(_), x.text(D + '"'), a && (n.bgMusic.play(), T.addClass("on")), n.audioPopup.play(), c.shakeObj.start()
        }, j = function (e) {
            e.preventDefault();
            var t = this, r = function (e) {
                if (C || A) {
                    $(t).addClass("none"), n.audioError.play(), setTimeout(function () {
                        $(t).removeClass("none")
                    }, 1e3);
                    return
                }
                L = !0, $(t).addClass("on"), y.addClass("move"), w.addClass("move"), c.shakeObj.stop(), n.audioPress.play(), f = 0, _ = setInterval(H, 1e3), a && (n.bgMusic.pause(), T.removeClass("on")), wx.startRecord()
            }, i = function (e) {
                wx.stopRecord({success: B})
            };
            e.preventDefault(), L ? i(e) : r(e)
        }, F = function (e) {
            C = !1, v.removeClass("on"), y.removeClass("move"), w.removeClass("move"), D = f, clearInterval(_), x.text(D + '"'), a && (n.bgMusic.play(), T.addClass("on")), n.audioPopup.play()
        }, I = function (e) {
            e.preventDefault();
            var t = function () {
                var e = function () {
                    n.audioPress.play(), setTimeout(function () {
                        M ? wx.playVoice({localId: M}) : l.play(), _ = setInterval(P, 1e3)
                    }, 1e3)
                };
                if (L)return v.addClass("none"), setTimeout(function () {
                    v.removeClass("none")
                }, 1e3), n.audioError.play(), !1;
                v.addClass("on"), O ? (y.addClass("move"), w.addClass("move"), e()) : (k = !0, y.addClass("return"), w.addClass("return"), n.audioRewind.play(), setTimeout(function () {
                    y.removeClass("return"), w.removeClass("return")
                }, 2e3), setTimeout(function () {
                    y.addClass("move"), w.addClass("move"), k = !1, e()
                }, 2500)), a && (n.bgMusic.pause(), T.removeClass("on")), C = !0, O = !1
            };
            if (k || A)return !1;
            C ? (M ? wx.stopVoice({localId: M}) : (l.pause(), l.src = h[p].audioUrl), F()) : t()
        }, q = function (r) {
            r.preventDefault();
            if (!M || L || A || C)return m.addClass("none"), setTimeout(function () {
                m.removeClass("none")
            }, 1e3), n.audioError.play(), !1;
            m.addClass("on"), v.removeClass("on"), n.audioPress.play(), N.show(), wx.uploadVoice({
                localId: M,
                isShowProgressTips: 0,
                success: function (n) {
                    var r = n.serverId;
                    e.ajax({url: t.URL_uploadVoice, type: "POST", data: {media_id: r}}, function (e) {
                        u = e.ts, m.removeClass("on"), N.hide(), i && i({cover: h[p].cover, audioLen: o, vName: e.ts})
                    }, function (e) {
                        alert(e + "成功！！！"), m.reomveClass("on"), N.hide()
                    })
                },
                fail: function () {
                    alert("失败咯。。。"), m.removeClass("on"), N.hide()
                }
            })
        }, R = function (e) {
            E.find(".tape-main").css("background-image", "url(" + h[e].cover + ")"), E.find(".time").text(h[e].audioLen + '"'), f = h[e].audioLen, D = f, l.src = h[e].audioUrl
        }, U = function (e) {
            S.find(".tape-main").css("background-image", "url(" + h[e].cover + ")"), S.find(".time").text(h[e].audioLen + '"')
        }, z = function (e) {
            if (L)return e && e(), !1;
            C && (M ? (wx.stopVoice({localId: M}), F()) : l.pause()), M && (M = null), A = !0, b.addClass("change"), n.audioSlide.play(), setTimeout(function () {
                A = !1, p = p + 1 < h.length ? p + 1 : 0, R(p), b.removeClass("change");
                var t = p + 1 < h.length ? p + 1 : 0;
                U(t), v.trigger("touchstart"), e && e()
            }, 1500)
        }, W = function (e) {
            if (C || L)return;
            a ? (a = !1, T.removeClass("on"), n.bgMusic.pause()) : (a = !0, T.addClass("on"), n.bgMusic.play())
        }, X = function (e) {
            e.preventDefault(), g.addClass("on"), g.off("touchstart", X), z(function () {
                g.removeClass("on"), g.on("touchstart", X)
            })
        }, V = function () {
            l = new Audio, R(p), U(p + 1), c.shakeObj = new r({threshold: 15, timeout: 1500})
        };
        V(), d.on("touchstart", j), wx.onVoiceRecordEnd({complete: B}), v.on("touchstart", I), l.addEventListener("pause", F), l.addEventListener("ended", F), wx.onVoicePlayEnd({success: F}), m.on("touchstart", q), T.on("click", W), g.on("touchstart", X), window.addEventListener("shake", z, !1), this.shakeObj.start()
    }, v = function (r) {
        r.name = "";
        var o = s.find(".btn-share-tomum"), u = s.find(".btn-share"), a = s.find(".mailer-paper .input input"), f = s.find(".m-float-share-mum"), l = s.find(".m-float-share-friend"), c = function (n) {
            var s = new i(location.href), o = s.port() ? ":" + s.port() : "", u = s.protocol() + "://" + s.host() + o + s.path(), a = "?cover=" + encodeURIComponent(r.cover) + "&len=" + encodeURIComponent(r.audioLen) + "&vName=" + encodeURIComponent(r.vName) + "&name=" + encodeURIComponent(r.name), f = "#/play", l = u + a + f;
            e.wxShare({
                title: t.mumShare.title,
                desc: t.mumShare.desc,
                link: l,
                img: t.mumShare.img,
                track: t.mumShare.track
            }, n)
        }, h = function () {
            l.hide(), l.off("click", h)
        }, p = function () {
            l.show(), l.on("click", h)
        }, d = function () {
            v(), o.off("click", m), s.find(".m-mailer-box").hide(), s.find(".m-tape-box").hide(), s.find(".m-section-share").show(), u.on("click", p), e.wxShare(t.defShare)
        }, v = function () {
            f.hide(), f.off("click", v)
        }, m = function () {
            r.name = a.val(), c(d), f.show(), f.on("click", v)
        }, g = function () {
            s.addClass("mailer-show"), s.find(".m-mailer-box").show(), setTimeout(function () {
                n.audioSlide.play()
            }, 500), setTimeout(function () {
                n.audioSlide.play()
            }, 1500), o.on("click", m)
        };
        g()
    }, m = function () {
        c || (c = new d(v))
    }, g = function () {
        var e = s.find(".m-section-first"), t = s.find(".btn-open-recorder"), r = function (n) {
            var o = $(n.target);
            o.hasClass("txt2") ? s.removeClass("first-animation-in").addClass("first-animation-out") : o.hasClass("txt6") ? t.on("click", i) : o.hasClass("m-tape-box") && (s.removeClass("first-animation-out").removeClass("recorder-animation-in"), e.hide(), s.off("webkitAnimationEnd", r), m())
        }, i = function (e) {
            s.find(".m-tape.e1 .tape-main").css("background-image", "url(" + h[p].cover + ")"), s.find(".m-tape.e1 .time").text(h[p].audioLen + '"'), s.find(".m-recorder").show(), s.find(".m-tape-box").show(), s.addClass("recorder-animation-in"), setTimeout(function () {
                n.audioSlide.play()
            }, 1e3), t.off("click", i)
        };
        s.show(), e.show(), n.bgMusic.play(), $(document).one("touchstart", function (e) {
            n.bgMusic.play()
        }), s.addClass("first-animation-in"), s.on("webkitAnimationEnd", r)
    }, y = function (r) {
        var i = $(".m-loading"), s = i.find(".loadProcess .inner");
        n.bgMusic && (n.bgMusic.pause(), n.bgMusic = null), n.bgMusic = new Audio, n.bgMusic.loop = !0, n.bgMusic.src = t.music.bg, n.audioError = n.audioError || new Audio(t.music.error), n.audioPopup = n.audioPopup || new Audio(t.music.popup), n.audioPress = n.audioPress || new Audio(t.music.press), n.audioRewind = n.audioRewind || new Audio(t.music.rewind), n.audioSlide = n.audioSlide || new Audio(t.music.slide);
        if (!n.isMakePagePreload) {
            i.show();
            var o = t.makePageImgs, u = [];
            for (var a = 0; a < t.audios.length; a++)u.push(t.audios[a].cover);
            o = o.concat(u);
            var f = new e.preload({imgs: o});
            f.loading = function (e) {
                s.css("width", e + "%")
            }, f.loaded = function (e) {
                i.hide(), n.isMakePagePreload = !0, r && r()
            }, f.init()
        } else r && r()
    }, b = function () {
        console.log("pageMake"), y(function () {
            g()
        })
    };
    return b
}), define("app/pagePlay", ["app/TD", "app/Config", "app/Global", "lib/Uri"], function (e, t, n, r) {
    var i = $("#pagePlay"), s = null, o = null, u = null, a = null, f = !0, l = null, c = null, h = function () {
        var a = this, c = i.find("#btnPlay"), h = i.find("#btnShare"), p = i.find("#btnHome"), d = i.find(".m-recorder"), v = i.find(".m-tape-box"), m = i.find(".m-tape.e1").find(".inner"), g = i.find(".m-float-share-friend"), y = m.find(".time"), b = i.find(".music-offon"), w = !1, E = !0, S = null, x = null, T = function () {
            x = x > 0 ? x - 1 : 0, y.text(x + '"')
        }, N = function () {
            w = !1, c.removeClass("on"), d.removeClass("move"), m.removeClass("move"), x = o, clearInterval(S), y.text(x + '"'), n.audioPopup.play(), f && (n.bgMusic.play(), b.addClass("on"))
        }, C = function (e) {
            e.preventDefault();
            var t = function () {
                var e = function () {
                    n.audioPress.play(), setTimeout(function () {
                        l.play(), S = setInterval(T, 1e3)
                    }, 1e3)
                };
                c.addClass("on"), E ? (d.addClass("move"), m.addClass("move"), e()) : (d.addClass("return"), m.addClass("return"), n.audioRewind.play(), setTimeout(function () {
                    d.removeClass("return"), m.removeClass("return")
                }, 2e3), setTimeout(function () {
                    d.addClass("move"), m.addClass("move"), e()
                }, 2500), n.audioRewind.play()), f && (n.bgMusic.pause(), b.removeClass("on")), w = !0, E = !1
            };
            w ? (l.pause(), l.src = u, N()) : t()
        }, k = function () {
            m.find(".tape-main").css("background-image", "url(" + s + ")"), y.text(o + '"'), x = o, l.src = u
        }, L = function (e) {
            if (w)return;
            f ? (f = !1, b.removeClass("on"), n.bgMusic.pause()) : (f = !0, b.addClass("on"), n.bgMusic.play())
        }, A = function (r) {
            r.preventDefault(), h.addClass("on"), setTimeout(function () {
                h.removeClass("on")
            }, 500), g.show(), n.audioPress.play(), e.wxShare({
                title: t.mumShare.title,
                desc: t.mumShare.desc,
                link: location.href,
                img: t.mumShare.img,
                track: t.mumShare.track
            })
        }, O = function () {
            l = new Audio, k()
        };
        O(), c.on("touchstart", C), l.addEventListener("pause", N), l.addEventListener("ended", N), h.on("touchstart", A), g.on("click", function (e) {
            e.preventDefault(), g.hide()
        }), p.on("touchstart", function (e) {
            e.preventDefault(), n.bgMusic.pause(), n.bgMusic = null, w && c.trigger("touchstart");
            var t = new r(location.href), i = t.port() ? ":" + t.port() : "", s = t.protocol() + "://" + t.host() + i + t.path(), o = "#/make", u = s + o;
            location.href = u
        }), b.on("click", L)
    }, p = function () {
        c || (c = new h)
    }, d = function () {
        var e = i.find(".m-gift-cover"), t = i.find(".m-recorder"), r = i.find(".m-tape-box"), s = null, o = null, u = function (t) {
            t.preventDefault(), s > o ? (i.addClass("mum-recorder-show"), n.audioOpen.play(), setTimeout(function () {
                n.audioSlide.play()
            }, 2500), p()) : e.on("touchstart", f), $(document).off("touchmove", a), $(document).off("touchend", u)
        }, a = function (e) {
            e.preventDefault();
            var t = e.targetTouches[0];
            o = t.pageY
        }, f = function (t) {
            t.preventDefault();
            var n = t.targetTouches[0];
            s = n.pageY, $(document).on("touchmove", a), $(document).on("touchend", u), e.off("touchstart", f)
        }, l = function (t) {
            var n = $(t.target);
            n.hasClass("cover-bg") && e.hide()
        };
        i.show(), e.show(), t.show(), r.show(), n.bgMusic.play(), i.on("webkitAnimationEnd", l), $(document).one("touchstart", function (e) {
            e.preventDefault(), n.bgMusic.play()
        }), e.on("touchstart", f)
    }, v = function (r) {
        var i = $(".m-loading"), o = i.find(".loadProcess .inner");
        n.bgMusic && (n.bgMusic.pause(), n.bgMusic = null), n.bgMusic = new Audio, n.bgMusic.loop = !0, n.bgMusic.src = t.music.bg, n.audioError = n.audioError || new Audio(t.music.error), n.audioPopup = n.audioPopup || new Audio(t.music.popup), n.audioPress = n.audioPress || new Audio(t.music.press), n.audioRewind = n.audioRewind || new Audio(t.music.rewind), n.audioSlide = n.audioSlide || new Audio(t.music.slide), n.audioOpen = n.audioOpen || new Audio(t.music.open);
        if (!n.isPlayPagePreload) {
            i.show();
            var u = t.playPageImgs, a = [s];
            u = u.concat(a);
            var f = new e.preload({imgs: u});
            f.loading = function (e) {
                o.css("width", e + "%")
            }, f.loaded = function (e) {
                i.hide(), n.isPlayPagePreload = !0, r && r()
            }, f.init()
        } else r && r()
    }, m = function () {
        console.log("pagePlay");
        var e = new r(location.href);
        s = decodeURIComponent(e.getQueryParamValue("cover")), o = parseInt(decodeURIComponent(e.getQueryParamValue("len"))), u = t.audioPre + decodeURIComponent(e.getQueryParamValue("vName")) + ".mp3", a = decodeURIComponent(e.getQueryParamValue("name")), v(function () {
            d()
        })
    };
    return m
}), require(["app/TD", "app/Config", "app/pageMake", "app/pagePlay"], function (e, t, n, r) {
    var i = null, s = null, o = {make: $("#pageMake"), play: $("#pagePlay")}, u = {
        "/make": n,
        "/play": r
    }, a = function () {
        e.ajax({url: t.URL_initSDK, type: "POST", data: {url: encodeURI(location.href)}}, function (n) {
            n.share = t.defShare, e.initWxApi(n)
        }, function (e) {
            console.log(e)
        }), i = new Router(u), i.configure({
            before: function () {
                var e = this.getRoute()[0];
                if (s === e)return !1;
                for (var t in o)if (o.hasOwnProperty(t)) {
                    var n = o[t];
                    n.hide()
                }
                s = e
            }, notfound: function () {
                location.hash = "#/make"
            }
        }), i.init("/make"), $(document).on("touchmove", function (e) {
            e.preventDefault()
        })
    };
    a()
}), define("main", function () {
});