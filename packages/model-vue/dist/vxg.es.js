import { defineComponent as Ve, computed as ce, openBlock as de, createBlock as Me, withCtx as pe, createVNode as ie, createElementBlock as we, Fragment as Fe, renderList as Dt, createTextVNode as Te, toDisplayString as Oe, createElementVNode as De, createCommentVNode as _e, ref as ke, renderSlot as rn, resolveComponent as Ge, watch as Ce, normalizeClass as zt, onMounted as Bt, onUnmounted as Qe, unref as ue, withDirectives as sn, vShow as an, normalizeStyle as on, isRef as Xe, withModifiers as ln, setBlockTracking as Ue, resolveDynamicComponent as Ft, nextTick as cn, mergeProps as It, toHandlers as jt, getCurrentInstance as un } from "vue";
import { VIcon as Ne } from "vuetify/components/VIcon";
import { useRouter as et, useRoute as Gt } from "vue-router";
import { VBtn as He } from "vuetify/components/VBtn";
import { VFooter as dn } from "vuetify/components/VFooter";
import { VRow as qt, VCol as Ze, VContainer as Jt, VSpacer as Vt } from "vuetify/components/VGrid";
import { useStore as Le } from "vuex";
import { VSelect as Wt } from "vuetify/components/VSelect";
import { VCard as pn, VCardTitle as fn, VCardText as Lt, VCardActions as mn } from "vuetify/components/VCard";
import { VForm as hn } from "vuetify/components/VForm";
import { VTextField as Yt } from "vuetify/components/VTextField";
import { VApp as gn } from "vuetify/components/VApp";
import { VExpansionPanels as vn, VExpansionPanel as xn, VExpansionPanelTitle as bn, VExpansionPanelText as kn } from "vuetify/components/VExpansionPanel";
import { VCombobox as At } from "vuetify/components/VCombobox";
import { VDivider as Ye } from "vuetify/components/VDivider";
import { VNavigationDrawer as yn } from "vuetify/components/VNavigationDrawer";
import { VSheet as Sn } from "vuetify/components/VSheet";
import { VTooltip as Nt } from "vuetify/components/VTooltip";
import { VAppBar as wn } from "vuetify/components/VAppBar";
import { VMain as _n } from "vuetify/components/VMain";
var qe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Je(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Zt = { exports: {} };
(function(n, u) {
  (function(i) {
    n.exports = i();
  })(function() {
    var i = { exports: {} };
    (function(P) {
      (function() {
        (function(T) {
          typeof i.exports == "object" ? i.exports = T() : (typeof window < "u" ? window : P !== void 0 ? P : typeof self < "u" ? self : this).Gex = T();
        })(function() {
          var T = { exports: {} };
          Object.defineProperty(T.exports, "__esModule", { value: !0 }), T.exports.Gex = void 0;
          class _ {
            constructor(w) {
              this.desc = "", this.gexmap = {}, w != null && (Array.isArray(w) ? w : [w]).forEach((z) => {
                this.gexmap[z] = this.re(this.clean(z));
              });
            }
            dodgy(w) {
              return w == null || Number.isNaN(w);
            }
            clean(w) {
              let z = "" + w;
              return this.dodgy(w) ? "" : z;
            }
            match(w) {
              w = "" + w;
              let z = !1, J = Object.keys(this.gexmap);
              for (let I = 0; I < J.length && !z; I++) z = !!this.gexmap[J[I]].exec(w);
              return z;
            }
            on(w) {
              if (w == null) return null;
              let z = typeof w;
              if (z === "string" || z === "number" || z === "boolean" || w instanceof Date || w instanceof RegExp) return this.match(w) ? w : null;
              if (Array.isArray(w)) {
                let J = [];
                for (let I = 0; I < w.length; I++) !this.dodgy(w[I]) && this.match(w[I]) && J.push(w[I]);
                return J;
              }
              {
                let J = {};
                for (let I in w) Object.prototype.hasOwnProperty.call(w, I) && this.match(I) && (J[I] = w[I]);
                return J;
              }
            }
            esc(w) {
              let z = this.clean(w);
              return (z = z.replace(/\*/g, "**")).replace(/\?/g, "*?");
            }
            escregexp(w) {
              return w ? ("" + w).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : "";
            }
            re(w) {
              if (w === "" || w) return w = "^" + (w = (w = (w = (w = (w = this.escregexp(w)).replace(/\\\*/g, "[\\s\\S]*")).replace(/\\\?/g, "[\\s\\S]")).replace(/\[\\s\\S\]\*\[\\s\\S\]\*/g, "\\*")).replace(/\[\\s\\S\]\*\[\\s\\S\]/g, "\\?")) + "$", new RegExp(w);
              {
                let z = Object.keys(this.gexmap);
                return z.length == 1 ? this.gexmap[z[0]] : { ...this.gexmap };
              }
            }
            toString() {
              let w = this.desc;
              return w != "" ? w : this.desc = "Gex[" + Object.keys(this.gexmap) + "]";
            }
            inspect() {
              return this.toString();
            }
          }
          function R(C) {
            return new _(C);
          }
          return T.exports.Gex = R, T.exports = R, T.exports.Gex = R, T.exports.default = R, T.exports;
        });
      }).call(this);
    }).call(this, typeof qe < "u" ? qe : typeof self < "u" ? self : typeof window < "u" ? window : {}), i = i.exports;
    var s, h, r, p, O, g, v, d, se, fe = {}, ee = this && this.__classPrivateFieldGet || function(P, T, _, R) {
      if (_ === "a" && !R) throw new TypeError("Private accessor was defined without a getter");
      if (typeof T == "function" ? P !== T || !R : !T.has(P)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return _ === "m" ? R : _ === "a" ? R.call(P) : R ? R.value : T.get(P);
    };
    Object.defineProperty(fe, "__esModule", { value: !0 }), fe.IntervalMatcher = fe.GexMatcher = void 0, fe.GexMatcher = class {
      constructor() {
      }
      make(P, T) {
        if (typeof T == "string" && T.match(/[*?]/)) {
          let _ = (0, i.Gex)(T);
          return { kind: "gex", match: (R) => _.on(R) != null, fix: T, meta: {}, same(R) {
            return R != null && R.kind === this.kind && R.fix === this.fix;
          } };
        }
      }
      scan(P, T) {
        let _ = P.filter((R) => R.fix === "*").length > 0;
        return { complete: _, sound: _, gaps: [], overs: [], why: "no-star" };
      }
    };
    const ge = new RegExp(["^/s*", "(=*[<>/(/[]?=*)?/s*([-+0-9a-fA-FeEoOxX]+(/.([0-9a-fA-FeEoOxX]+))?)([/)/]]?)(/s*(,|&+|/|+|/./.)/s*(=*[<>]?=*)/s*([-+.0-9a-fA-FeEoOxX]+)/s*([/)/]]?))?/s*$"].join("").replace(/\//g, "\\"));
    class oe {
      constructor() {
        this.kind = "interval", s.set(this, (T, _) => function(R) {
          return T(R) && _(R);
        }), h.set(this, (T, _) => function(R) {
          return T(R) || _(R);
        }), r.set(this, (T) => function(_) {
          return !1;
        }), p.set(this, (T) => function(_) {
          return !1;
        }), O.set(this, (T) => function(_) {
          return _ > T;
        }), g.set(this, (T) => function(_) {
          return _ >= T;
        }), v.set(this, (T) => function(_) {
          return _ < T;
        }), d.set(this, (T) => function(_) {
          return _ <= T;
        }), se.set(this, (T) => function(_) {
          return _ === T;
        });
      }
      make(T, _) {
        if (typeof _ == "string" && _.match(/[=<>.[()\]]/)) {
          let R = _.match(ge);
          if (R != null) {
            let C = oe.normop(R[1]) || oe.normop(R[5]), w = oe.normop(R[8]) || oe.normop(R[10]), z = ee(this, C === "=" ? se : C === "<" || C === ")" ? v : C === "<=" || C === "]" ? d : C === ">" || C === "(" ? O : C === ">=" || C === "[" ? g : p, "f"), J = Number(R[2]), I = R[9] == null ? NaN : Number(R[9]), x = R[7], q = x == null ? ee(this, h, "f") : x.substring(0, 1) === "&" || x.substring(0, 1) === "," ? ee(this, s, "f") : ee(this, h, "f");
            x === ".." && (q = ee(this, s, "f"), z = ee(this, p, "f") === z ? ee(this, g, "f") : z, w = w === "" ? "<=" : w);
            let $ = ee(this, w == null ? r : w === "=" ? se : w === "<" || w === ")" ? v : w === "<=" || w === "]" ? d : w === ">" ? O : w === ">=" ? g : p, "f");
            if (J === I && (C === "=" && w != null ? (I = NaN, $ = ee(this, r, "f"), z = w.includes("<") ? ee(this, d, "f") : w.includes(">") ? ee(this, g, "f") : w.includes("=") ? ee(this, se, "f") : ee(this, p, "f")) : w === "=" && C != null && (I = NaN, $ = ee(this, r, "f"), z = C.includes("<") ? ee(this, d, "f") : C.includes(">") ? ee(this, g, "f") : ee(this, p, "f"))), ee(this, p, "f") !== z && ee(this, r, "f") === $ && (ee(this, v, "f") === z || ee(this, d, "f") === z ? ($ = z, I = J, z = ee(this, g, "f"), J = Number.NEGATIVE_INFINITY, q = ee(this, s, "f")) : ee(this, O, "f") !== z && ee(this, g, "f") !== z || ($ = ee(this, d, "f"), I = Number.POSITIVE_INFINITY, q = ee(this, s, "f"))), !isNaN(I) && I < J) {
              let N = $, c = I;
              I = J, J = c, x !== ".." && ($ = z, z = N);
            }
            let M = z(J), k = $(I), j = q(M, k);
            return { kind: "interval", fix: _, meta: { jo: j.name, o0: M.name, n0: J, o1: k.name, n1: I }, match: (N) => {
              let c = !1, e = parseFloat(N);
              return isNaN(e) || (c = j(e)), c;
            }, same(N) {
              return N != null && N.kind === this.kind && N.meta.jo === this.meta.jo && N.meta.o0 === this.meta.o0 && N.meta.n0 === this.meta.n0 && N.meta.o1 === this.meta.o1 && N.meta.n1 === this.meta.n1;
            } };
          }
        }
      }
      scan(T, _) {
        let R = { complete: !1, sound: !1, gaps: [], overs: [], lower: null, upper: null }, C = Number.NEGATIVE_INFINITY, w = Number.POSITIVE_INFINITY, z = this.half_intervals(T);
        z.reduce((I, x) => {
          let q = x.o === "eq", $ = x.o === "lt", M = x.o === "lte", k = x.o === "gt", j = x.o === "gte", N = x.n;
          if (I.lower == null) {
            let c = { n: C, o: "gte" };
            I.lower = c, I.upper = x, C == N && j || (k || j ? I.gaps.push([c, { n: N, o: k ? "lte" : "lt", m: 0 }]) : q && I.gaps.push([c, { n: N, o: "lte", m: 1 }]));
          } else {
            let c = I.upper.o === "eq", e = I.upper.o === "lt", t = I.upper.o === "lte", y = I.upper.n, f = I.upper;
            N === y ? e && (j || q) || (t || c) && k || (c || e || t) && I.gaps.push([{ n: y, o: c || t ? "gt" : "gte", m: 2, d: { u: f, h: x } }, { n: N, o: q || j ? "lt" : "lte", m: 3 }]) : y < N ? $ || M || (c || e || t) && I.gaps.push([{ n: y, o: c || t ? "gt" : "gte", m: 4 }, { n: N, o: q || j ? "lt" : "lte", m: 5 }]) : I.overs.push([{ n: N, o: q || j ? "gte" : "gt", m: 10 }, { n: y, o: c || t ? "lte" : "lt", m: 11 }]), I.upper = x;
          }
          return I;
        }, R);
        let J = 0 < z.length && z[z.length - 1];
        return J && w !== J.n && J.o !== "gt" && J.o !== "gte" && R.gaps.push([{ n: J.n, o: J.o === "eq" || J.o === "lte" ? "gt" : "gte", m: 6 }, { n: w, o: "lte", m: 7 }]), R.complete = R.gaps.length === 0, R.sound = R.overs.length === 0, R;
      }
      half_intervals(T) {
        let _ = [];
        for (let C of T) _.push([{ n: C.meta.n0, o: C.meta.o0 }, { n: C.meta.n1, o: C.meta.o1 }]);
        var R = ["lt", "lte", "eq", "gte", "gt"];
        return _.map((C) => [isNaN(C[0].n) || C[0].n == null ? null : C[0], isNaN(C[1].n) || C[1].n == null ? null : C[1]].filter((w) => w != null)).sort((C, w) => {
          if (C[0].n < w[0].n) return -1;
          if (w[0].n < C[0].n) return 1;
          var z = R.indexOf(C[0].o), J = R.indexOf(w[0].o);
          if (z < J) return -1;
          if (J < z) return 1;
          if (C[1].n < w[1].n) return -1;
          if (w[1].n < C[1].n) return 1;
          var I = R.indexOf(C[1].o), x = R.indexOf(w[1].o);
          return I < x ? -1 : x < I ? 1 : 0;
        }).reduce((C, w) => C.concat(...w), []);
      }
    }
    fe.IntervalMatcher = oe, s = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), g = /* @__PURE__ */ new WeakMap(), v = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), oe.normop = (P) => P == null ? null : ((P.match(/([<>\(\)\[\]])/) || [])[1] || "") + ((P.match(/(=)/) || [])[1] || "");
    var K = { exports: {} };
    function G(P) {
      var T = {}, _ = {};
      let R = [];
      return (P = P || {}).gex && R.push(new fe.GexMatcher()), P.interval && R.push(new fe.IntervalMatcher()), T.top = function() {
        return _;
      }, T.add = function(C, w) {
        C = { ...C };
        var z = typeof P == "function" ? P.call(T, C, w) : null, J = Object.keys(C).filter((c) => C[c] != null).sort();
        J.forEach(function(c) {
          C[c] = String(C[c]);
        });
        for (var I, x = _, q = 0; q < J.length; q++) {
          var $ = J[q], M = C[$];
          let c = R.reduce((e, t) => e || t.make($, M), void 0);
          if ((I = x.v) && $ == x.k) if (c) {
            var k = (N = x.g = x.g || {})[$] = N[$] || [];
            x = (c = k.find((e) => e.same(c)) || (k.push(c), c)).keymap || (c.keymap = {});
          } else x = I[M] || (I[M] = {});
          else if (x.k) if ($ < x.k) {
            var j = x.s;
            N = x.g, x.s = { k: x.k, v: x.v }, j && (x.s.s = j), N && (x.s.g = N), x.g && (x.g = {}), x.k = $, x.v = {}, c ? (k = (N = x.g = x.g || {})[$] = N[$] || [], x = (c = k.find((e) => e.same(c)) || (k.push(c), c)).keymap || (c.keymap = {})) : x = x.v[M] = {};
          } else x = x.s || (x.s = {}), q--;
          else if (x.k = $, x.v = {}, c) {
            var N;
            k = (N = x.g = x.g || {})[$] = N[$] || [], x = (c = k.find((e) => e.same(c)) || (k.push(c), c)).keymap || (c.keymap = {});
          } else x = x.v[M] = {};
        }
        return w !== void 0 && x && (x.d = w, z && (x.f = typeof z == "function" ? z : z.find, x.r = typeof z.remove == "function" ? z.remove : void 0)), T;
      }, T.findexact = function(C) {
        return T.find(C, !0);
      }, T.find = function(C, w, z) {
        if (C == null) return null;
        var J = _, I = _.d === void 0 ? null : _.d, x = _.f, q = null, $ = [], M = {}, k = Object.keys(C).length, j = [];
        _.d !== void 0 && j.push(_.d);
        do {
          if (q = J.k, J.v) {
            var N = C[q], c = J.v[N];
            if (!c && J.g && J.g[q]) {
              for (var e = J.g[q], t = 0; t < e.length; t++) if (e[t].match(N)) {
                c = e[t].keymap;
                break;
              }
            }
            c ? (M[q] = !0, J.s && $.push(J.s), I = c.d === void 0 ? w ? null : I : c.d, z && c.d !== void 0 && j.push(c.d), x = c.f, J = c) : J = J.s;
          } else J = null;
          J == null && 0 < $.length && (I == null || z && !w) && (J = $.pop());
        } while (J);
        return w ? Object.keys(M).length !== k && (I = null) : I == null && _.d !== void 0 && (I = _.d), x && (I = x.call(T, C, I)), z ? j : I;
      }, T.remove = function(C) {
        var w, z = _, J = null, I = [];
        do
          if (w = z.k, z.v || z.g) {
            if (z.v) {
              var x = z.v[C[w]];
              x && I.push({ km: z, v: C[w] });
            }
            if (x == null && z.g) {
              let M = z.g[w] || [];
              for (let k = 0; k < M.length; k++) if (M[k].fix === C[w]) {
                I.push({ km: z, v: C[w], mv: M[k] }), x = M[k].keymap;
                break;
              }
            }
            x ? (J = x.d, z = x) : z = z.s;
          } else z = null;
        while (z);
        if (J !== void 0) {
          var q = I[I.length - 1];
          if (q && q.km && q.km.v) {
            var $ = q.km.v[q.v] || q.mv && q.mv.keymap;
            !$ || $.r && !$.r(C, $.d) || delete $.d;
          }
        }
      }, T.list = function(C, w) {
        C = C || {};
        var z = [];
        return _.d && z.push({ match: {}, data: _.d, find: _.f }), function J(I, x, q, $) {
          if (I.v) {
            var M, k = I.k, j = (0, i.Gex)(C ? C[k] == null ? w ? null : "*" : C[k] : "*"), N = { ...x }, c = { ...q };
            for (var e in I.v) if (e === C[k] || !w && C[k] == null || j.on(e)) {
              var t = { ...N };
              t[k] = e;
              var y = { ...c };
              delete y[k], M = I.v[e], Object.keys(y).length === 0 && M && M.d && $.push({ match: t, data: M.d, find: M.f }), M && M.v != null && J(M, { ...t }, { ...y }, $);
            }
            (M = I.s) && J(M, { ...N }, { ...c }, $);
          }
        }(_, {}, { ...C }, z), z;
      }, T.toString = function(C, w) {
        var z = C === !0 || !!w, J = typeof C == "function" ? C : function($) {
          return typeof $ == "function" ? "<" + $.name + ">" : "<" + $ + ">";
        };
        function I($, M) {
          for (var k = 0; k < M; k++) $.push(" ");
        }
        var x = [], q = [];
        return function $(M, k, j, N) {
          var c;
          if (M.d !== void 0 && (k.push(" " + J(M.d)), x.push(N.join(", ") + " -> " + J(M.d))), M.k && (k.push(`
`), I(k, j), k.push(M.k + ":")), (M.v || M.s || M.g) && j++, M.v) for (var e = Object.keys(M.v).sort(), t = 0; t < e.length; t++) {
            var y = e[t];
            k.push(`
`), I(k, j), k.push(y + " ->"), (c = N.slice()).push(M.k + "=" + y), $(M.v[y], k, j + 1, c);
          }
          if (M.g) for (e = Object.keys(M.g).sort(), t = 0; t < e.length; t++) for (var f = M.g[e[t]], A = 0; A < f.length; A++) {
            var U = f[A];
            k.push(`
`), I(k, j), k.push(U.fix + " ~>"), (c = N.slice()).push(M.k + "~" + U.fix), $(U.keymap, k, j + 1, c);
          }
          M.s && (k.push(`
`), I(k, j), k.push("|"), c = N.slice(), $(M.s, k, j + 1, c));
        }(_, q, 0, []), z ? q.join("") : x.join(`
`);
      }, T.inspect = T.toString, T.toJSON = function(C) {
        return JSON.stringify(_, function(w, z) {
          return typeof z == "function" ? "[Function]" : z;
        }, C);
      }, T;
    }
    function L(P) {
      return new G(P);
    }
    return Object.defineProperty(K.exports, "__esModule", { value: !0 }), K.exports.Gex = K.exports.Patrun = void 0, Object.defineProperty(K.exports, "Gex", { enumerable: !0, get: function() {
      return i.Gex;
    } }), K.exports.Patrun = G, K.exports = L, K.exports.Patrun = G, K.exports.Gex = i.Gex, K.exports.default = L, K = K.exports;
  });
})(Zt);
var Mn = Zt.exports;
const Tn = /* @__PURE__ */ Je(Mn);
var Kt = { exports: {} };
(function(n, u) {
  (function(i) {
    n.exports = i();
  })(function() {
    var i = function(c) {
      var e;
      return function(t) {
        return e || c(e = { exports: {}, parent: t }, e.exports), e.exports;
      };
    }, s = i(function(c, e) {
      Object.defineProperty(e, "__esModule", { value: !0 }), e.values = e.keys = e.omap = e.str = e.prop = e.normalt = e.parserwrap = e.trimstk = e.tokenize = e.srcfmt = e.snip = e.regexp = e.mesc = e.makelog = e.isarr = e.filterRules = e.extract = e.escre = e.errinject = e.errdesc = e.entries = e.defprop = e.deep = e.configure = e.clone = e.clean = e.charset = e.badlex = e.assign = e.S = e.JsonicError = void 0;
      const t = h({}), y = (o) => o == null ? [] : Object.keys(o);
      e.keys = y, e.values = (o) => o == null ? [] : Object.values(o);
      const f = (o) => o == null ? [] : Object.entries(o);
      e.entries = f;
      const A = (o, ...a) => Object.assign(o ?? {}, ...a);
      e.assign = A, e.isarr = (o) => Array.isArray(o);
      const U = Object.defineProperty;
      e.defprop = U;
      const b = (o, a) => Object.entries(o || {}).reduce((l, X) => {
        let W = a ? a(X) : X;
        W[0] === void 0 ? delete l[X[0]] : l[W[0]] = W[1];
        let Q = 2;
        for (; W[Q] !== void 0; ) l[W[Q]] = W[Q + 1], Q += 2;
        return l;
      }, {});
      e.omap = b;
      const m = { indent: "  ", space: " ", Object: "Object", Array: "Array", object: "object", string: "string", function: "function", unexpected: "unexpected", map: "map", list: "list", elem: "elem", pair: "pair", val: "val", node: "node", no_re_flags: r.EMPTY, unprintable: "unprintable", invalid_ascii: "invalid_ascii", invalid_unicode: "invalid_unicode", invalid_lex_state: "invalid_lex_state", unterminated_string: "unterminated_string", unterminated_comment: "unterminated_comment", lex: "lex", parse: "parse", error: "error", none: "none", imp_map: "imp,map", imp_list: "imp,list", imp_null: "imp,null", end: "end", open: "open", close: "close", rule: "rule", stack: "stack", nUll: "null", name: "name", make: "make" };
      e.S = m;
      class D extends SyntaxError {
        constructor(a, l, X, W, Q) {
          let he = re(a, l = F({}, l), X, W, Q);
          super(he.message), A(this, he), Y(this);
        }
        toJSON() {
          return { ...this, __error: !0, name: this.name, message: this.message, stack: this.stack };
        }
      }
      function te(o, a, l) {
        let X = a.t, W = X[o];
        return W == null && r.STRING === typeof o && (X[W = a.tI++] = o, X[o] = W, X[o.substring(1)] = W, l != null && A(l.token, a.t)), W;
      }
      function S(o, ...a) {
        return new RegExp(a.map((l) => l.esc ? Z(l.toString()) : l).join(r.EMPTY), o ?? "");
      }
      function Z(o) {
        return o == null ? "" : o.replace(/[-\\|\]{}()[^$+*?.!=]/g, "\\$&").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/\n/g, "\\n");
      }
      function F(o, ...a) {
        let l = m.function === typeof o, X = o != null && (m.object === typeof o || l);
        for (let W of a) {
          let Q, he = m.function === typeof W, xe = W != null && (m.object === typeof W || he);
          if (X && xe && !he && Array.isArray(o) === Array.isArray(W)) for (let me in W) o[me] = F(o[me], W[me]);
          else o = W === void 0 ? o : he ? W : xe ? m.function === typeof (Q = W.constructor) && m.Object !== Q.name && m.Array !== Q.name ? W : F(Array.isArray(W) ? [] : {}, W) : W, l = m.function === typeof o, X = o != null && (m.object === typeof o || l);
        }
        return o;
      }
      function H(o, a, l, X, W, Q) {
        let he = { code: a, details: l, token: X, rule: W, ctx: Q };
        return o == null ? "" : o.replace(/\$([\w_]+)/g, (xe, me) => {
          let Se = JSON.stringify(he[me] != null ? he[me] : l[me] != null ? l[me] : Q.meta && Q.meta[me] != null ? Q.meta[me] : X[me] != null ? X[me] : W[me] != null ? W[me] : Q.opts[me] != null ? Q.opts[me] : Q.cfg[me] != null ? Q.cfg[me] : Q[me] != null ? Q[me] : "$" + me);
          return Se ?? "";
        });
      }
      function Y(o) {
        o.stack && (o.stack = o.stack.split(`
`).filter((a) => !a.includes("jsonic/jsonic")).map((a) => a.replace(/    at /, "at ")).join(`
`));
      }
      function ae(o, a, l) {
        let X = 0 < l.sI ? l.sI : 0, W = 0 < l.rI ? l.rI : 1, Q = 0 < l.cI ? l.cI : 1, he = l.src == null ? r.EMPTY : l.src, xe = o.substring(Math.max(0, X - 333), X).split(`
`), me = o.substring(X, X + 333).split(`
`), Se = 2 + (r.EMPTY + (W + 2)).length, ye = W < 3 ? 1 : W - 2, $e = (Pe) => "\x1B[34m" + (r.EMPTY + ye++).padStart(Se, " ") + " | \x1B[0m" + (Pe ?? r.EMPTY), Ee = xe.length;
        return [2 < Ee ? $e(xe[Ee - 3]) : null, 1 < Ee ? $e(xe[Ee - 2]) : null, $e(xe[Ee - 1] + me[0]), " ".repeat(Se) + "   " + " ".repeat(Q - 1) + "\x1B[31m" + "^".repeat(he.length || 1) + " " + a + "\x1B[0m", $e(me[1]), $e(me[2])].filter((Pe) => Pe != null).join(`
`);
      }
      function re(o, a, l, X, W) {
        try {
          let Q = W.cfg, he = W.meta, xe = H(Q.error[o] || Q.error.unknown, o, a, l, X, W);
          m.function === typeof Q.hint && (Q.hint = { ...Q.hint(), ...Q.hint });
          let me = ["\x1B[31m[jsonic/" + o + "]:\x1B[0m " + xe, "  \x1B[34m-->\x1B[0m " + (he && he.fileName || "<no-file>") + ":" + l.rI + ":" + l.cI, ae(W.src(), xe, l), "", H((Q.hint[o] || Q.hint.unknown || "").trim().split(`
`).map((ye) => "  " + ye).join(`
`), o, a, l, X, W), "", "  \x1B[2mhttps://jsonic.senecajs.org\x1B[0m", "  \x1B[2m--internal: rule=" + X.name + "~" + X.state + "; token=" + te(l.tin, W.cfg) + (l.why == null ? "" : "~" + l.why) + "; plugins=" + W.plgn().map((ye) => ye.name).join(",") + `--\x1B[0m
`].join(`
`), Se = { internal: { token: l, ctx: W } };
          return Se = { ...Object.create(Se), message: me, code: o, details: a, meta: he, fileName: he ? he.fileName : void 0, lineNumber: l.rI, columnNumber: l.cI };
        } catch (Q) {
          return console.log(Q), {};
        }
      }
      function V(o) {
        return typeof o.debug.print.src == "function" ? o.debug.print.src : (a, l) => a == null ? r.EMPTY : (l = JSON.stringify(a)).substring(0, o.debug.maxlen) + (o.debug.maxlen < l.length ? "..." : r.EMPTY);
      }
      function ne(o, a = 44) {
        let l;
        try {
          l = typeof o == "object" ? JSON.stringify(o) : "" + o;
        } catch {
          l = "" + o;
        }
        return le(a < l.length ? l.substring(0, a - 3) + "..." : l, a);
      }
      function le(o, a = 5) {
        return o === void 0 ? "" : ("" + o).substring(0, a).replace(/[\r\n\t]/g, ".");
      }
      function E(...o) {
        return o == null ? {} : o.filter((a) => a !== !1).map((a) => typeof a == "object" ? y(a).join(r.EMPTY) : a).join(r.EMPTY).split(r.EMPTY).reduce((a, l) => (a[l] = l.charCodeAt(0), a), {});
      }
      function B(o) {
        for (let a in o) o[a] == null && delete o[a];
        return o;
      }
      e.JsonicError = D, e.configure = function(o, a, l) {
        var X, W, Q, he, xe, me, Se, ye, $e, Ee, Pe, Ae, Ie, ze, We, nt, rt, st, at, ot, it, lt, ct, ut, dt, pt, ft, mt, ht, gt, vt, xt, bt, kt, yt, St, wt, _t, Mt, Tt, Ct;
        const ve = a || {};
        ve.t = ve.t || {}, ve.tI = ve.tI || 1;
        const Be = (be) => te(be, ve);
        l.standard$ !== !1 && (Be("#BD"), Be("#ZZ"), Be("#UK"), Be("#AA"), Be("#SP"), Be("#LN"), Be("#CM"), Be("#NR"), Be("#ST"), Be("#TX"), Be("#VL")), ve.fixed = { lex: !!(!((X = l.fixed) === null || X === void 0) && X.lex), token: l.fixed ? b(B(l.fixed.token), ([be, je]) => [je, te(be, ve)]) : {}, ref: void 0 }, ve.fixed.ref = b(ve.fixed.token, ([be, je]) => [be, je]), ve.fixed.ref = Object.assign(ve.fixed.ref, b(ve.fixed.ref, ([be, je]) => [je, be])), ve.tokenSet = l.tokenSet ? Object.keys(l.tokenSet).reduce((be, je) => (be[je] = l.tokenSet[je].filter((Et) => Et != null).map((Et) => Be(Et)), be), { ...ve.tokenSet }) : {}, ve.tokenSetDerived = { ignore: Object.fromEntries((((W = l.tokenSet) === null || W === void 0 ? void 0 : W.ignore) || []).map((be) => [Be(be), !0])) }, ve.space = { lex: !!(!((Q = l.space) === null || Q === void 0) && Q.lex), chars: E((he = l.space) === null || he === void 0 ? void 0 : he.chars) }, ve.line = { lex: !!(!((xe = l.line) === null || xe === void 0) && xe.lex), chars: E((me = l.line) === null || me === void 0 ? void 0 : me.chars), rowChars: E((Se = l.line) === null || Se === void 0 ? void 0 : Se.rowChars), single: !!(!((ye = l.line) === null || ye === void 0) && ye.single) }, ve.text = { lex: !!(!(($e = l.text) === null || $e === void 0) && $e.lex), modify: (((Ee = ve.text) === null || Ee === void 0 ? void 0 : Ee.modify) || []).concat([(Pe = l.text) === null || Pe === void 0 ? void 0 : Pe.modify].flat()).filter((be) => be != null) }, ve.number = { lex: !!(!((Ae = l.number) === null || Ae === void 0) && Ae.lex), hex: !!(!((Ie = l.number) === null || Ie === void 0) && Ie.hex), oct: !!(!((ze = l.number) === null || ze === void 0) && ze.oct), bin: !!(!((We = l.number) === null || We === void 0) && We.bin), sep: ((nt = l.number) === null || nt === void 0 ? void 0 : nt.sep) != null && l.number.sep !== "", exclude: (rt = l.number) === null || rt === void 0 ? void 0 : rt.exclude, sepChar: (st = l.number) === null || st === void 0 ? void 0 : st.sep }, ve.value = { lex: !!(!((at = l.value) === null || at === void 0) && at.lex), map: f(((ot = l.value) === null || ot === void 0 ? void 0 : ot.map) || {}).reduce((be, je) => (je[1] == null || (be[je[0]] = je[1]), be), {}) }, ve.rule = { start: ((it = l.rule) === null || it === void 0 ? void 0 : it.start) == null ? "val" : l.rule.start, maxmul: ((lt = l.rule) === null || lt === void 0 ? void 0 : lt.maxmul) == null ? 3 : l.rule.maxmul, finish: !!(!((ct = l.rule) === null || ct === void 0) && ct.finish), include: !((ut = l.rule) === null || ut === void 0) && ut.include ? l.rule.include.split(/\s*,+\s*/).filter((be) => be !== "") : [], exclude: !((dt = l.rule) === null || dt === void 0) && dt.exclude ? l.rule.exclude.split(/\s*,+\s*/).filter((be) => be !== "") : [] }, ve.map = { extend: !!(!((pt = l.map) === null || pt === void 0) && pt.extend), merge: (ft = l.map) === null || ft === void 0 ? void 0 : ft.merge }, ve.list = { property: !!(!((mt = l.list) === null || mt === void 0) && mt.property) };
        let $t = Object.keys(ve.fixed.token).sort((be, je) => je.length - be.length).map((be) => Z(be)).join("|"), Ot = !((ht = l.comment) === null || ht === void 0) && ht.lex ? (l.comment.marker || []).filter((be) => be.lex).map((be) => Z(be.start)).join("|") : "", Rt = ["([", Z(y(E(ve.space.lex && ve.space.chars, ve.line.lex && ve.line.chars)).join("")), "]", (typeof l.ender == "string" ? l.ender.split("") : Array.isArray(l.ender) ? l.ender : []).map((be) => "|" + Z(be)).join(""), $t === "" ? "" : "|", $t, Ot === "" ? "" : "|", Ot, "|$)"];
        return ve.rePart = { fixed: $t, ender: Rt, commentStart: Ot }, ve.re = { ender: S(null, ...Rt), rowChars: S(null, Z((gt = l.line) === null || gt === void 0 ? void 0 : gt.rowChars)), columns: S(null, "[" + Z((vt = l.line) === null || vt === void 0 ? void 0 : vt.chars) + "]", "(.*)$") }, ve.lex = { empty: !!(!((xt = l.lex) === null || xt === void 0) && xt.empty), emptyResult: (bt = l.lex) === null || bt === void 0 ? void 0 : bt.emptyResult, match: !((kt = l.lex) === null || kt === void 0) && kt.match ? l.lex.match.map((be) => {
          let je = be(ve, l);
          return je.maker = be, je;
        }) : [] }, ve.debug = { get_console: ((yt = l.debug) === null || yt === void 0 ? void 0 : yt.get_console) || (() => console), maxlen: ((St = l.debug) === null || St === void 0 ? void 0 : St.maxlen) == null ? 99 : l.debug.maxlen, print: { config: !!(!((_t = (wt = l.debug) === null || wt === void 0 ? void 0 : wt.print) === null || _t === void 0) && _t.config), src: (Tt = (Mt = l.debug) === null || Mt === void 0 ? void 0 : Mt.print) === null || Tt === void 0 ? void 0 : Tt.src } }, ve.error = l.error || {}, ve.hint = l.hint || {}, !((Ct = l.config) === null || Ct === void 0) && Ct.modify && y(l.config.modify).forEach((be) => l.config.modify[be](ve, l)), ve.debug.print.config && ve.debug.get_console().dir(ve, { depth: null }), ve.result = { fail: [] }, l.result && (ve.result.fail = [...l.result.fail]), A(o.options, l), A(o.token, ve.t), A(o.fixed, ve.fixed.ref), ve;
      }, e.tokenize = te, e.mesc = function(o, a) {
        return (a = new String(o)).esc = !0, a;
      }, e.regexp = S, e.escre = Z, e.deep = F, e.errinject = H, e.trimstk = Y, e.extract = ae, e.errdesc = re, e.badlex = function(o, a, l) {
        let X = (W) => {
          let Q = o.next(W);
          if (a === Q.tin) {
            let he = {};
            throw Q.use != null && (he.use = Q.use), new D(Q.why || m.unexpected, he, Q, W, l);
          }
          return Q;
        };
        return X.src = o.src, X;
      }, e.makelog = function(o, a) {
        var l, X, W;
        let Q = (W = (X = (l = o.opts) === null || l === void 0 ? void 0 : l.plugin) === null || X === void 0 ? void 0 : X.debug) === null || W === void 0 ? void 0 : W.trace;
        if (a || Q) if (typeof a?.log == "number" || Q) {
          let he = !1, xe = a?.log;
          (xe === -1 || Q) && (xe = 1, he = !0), o.log = (...me) => {
            if (he) {
              let Se = me.filter((ye) => m.object != typeof ye).map((ye) => m.function == typeof ye ? ye.name : ye).join(m.indent);
              o.cfg.debug.get_console().log(Se);
            } else o.cfg.debug.get_console().dir(me, { depth: xe });
          };
        } else typeof a.log == "function" && (o.log = a.log);
        return o.log;
      }, e.srcfmt = V, e.str = ne, e.snip = le, e.clone = function(o) {
        return F(Object.create(Object.getPrototypeOf(o)), o);
      }, e.charset = E, e.clean = B, e.filterRules = function(o, a) {
        let l = ["open", "close"];
        for (let X of l) o.def[X] = o.def[X].map((W) => (W.g = typeof W.g == "string" ? (W.g || "").split(/\s*,+\s*/) : W.g || [], W)).filter((W) => a.rule.include.reduce((Q, he) => Q || W.g != null && W.g.indexOf(he) !== -1, a.rule.include.length === 0)).filter((W) => a.rule.exclude.reduce((Q, he) => Q && (W.g == null || W.g.indexOf(he) === -1), !0));
        return o;
      }, e.normalt = function(o) {
        if (o.c != null) {
          let a = o.c.n, l = o.c.d;
          a == null && l == null || (o.c = function(X) {
            let W = !0;
            if (a != null) for (let Q in a) W = W && (X.n[Q] == null || X.n[Q] <= (a[Q] == null ? 0 : a[Q]));
            return l != null && (W = W && X.d <= l), W;
          }, a != null && (o.c.n = a), l != null && (o.c.d = l));
        }
        if (r.STRING === typeof o.g && (o.g = o.g.split(/\s*,\s*/)), o.s && o.s.length !== 0) {
          const a = (xe) => xe.flat().filter((me) => typeof me == "number"), l = (xe, me) => xe.filter((Se) => 31 * me <= Se && Se < 31 * (me + 1)), X = (xe, me) => xe.reduce((Se, ye) => 1 << ye - (31 * me + 1) | Se, 0), W = a([o.s[0]]), Q = a([o.s[1]]), he = o;
          he.S0 = 0 < W.length ? new Array(Math.max(...W.map((xe) => 1 + xe / 31 | 0))).fill(null).map((xe, me) => me).map((xe) => X(l(W, xe), xe)) : null, he.S1 = 0 < Q.length ? new Array(Math.max(...Q.map((xe) => 1 + xe / 31 | 0))).fill(null).map((xe, me) => me).map((xe) => X(l(Q, xe), xe)) : null;
        } else o.s = null;
        return o;
      }, e.prop = function(o, a, l) {
        let X = o;
        try {
          let W, Q = a.split(".");
          for (let he = 0; he < Q.length; he++) W = Q[he], he < Q.length - 1 && (o = o[W] = o[W] || {});
          return l !== void 0 && (o[W] = l), o[W];
        } catch {
          throw new Error("Cannot " + (l === void 0 ? "get" : "set") + " path " + a + " on object: " + ne(X) + (l === void 0 ? "" : " to value: " + ne(l, 22)));
        }
      }, e.parserwrap = function(o) {
        return { start: function(a, l, X, W) {
          try {
            return o.start(a, l, X, W);
          } catch (Q) {
            if (Q.name === "SyntaxError") {
              let he = 0, xe = 0, me = 0, Se = r.EMPTY, ye = Q.message.match(/^Unexpected token (.) .*position\s+(\d+)/i);
              if (ye) {
                Se = ye[1], he = parseInt(ye[2]), xe = a.substring(0, he).replace(/[^\n]/g, r.EMPTY).length;
                let Ee = he - 1;
                for (; -1 < Ee && a.charAt(Ee) !== `
`; ) Ee--;
                me = Math.max(a.substring(Ee, he).length, 0);
              }
              let $e = Q.token || (0, t.makeToken)("#UK", te("#UK", l.internal().config), void 0, Se, (0, t.makePoint)(Se.length, he, Q.lineNumber || xe, Q.columnNumber || me));
              throw new D(Q.code || "json", Q.details || { msg: Q.message }, $e, {}, Q.ctx || { uI: -1, opts: l.options, cfg: l.internal().config, token: $e, meta: X, src: () => a, root: () => {
              }, plgn: () => l.internal().plugins, rule: { name: "no-rule" }, sub: {}, xs: -1, v2: $e, v1: $e, t0: $e, t1: $e, tC: -1, rs: [], rsI: 0, next: () => $e, rsm: {}, n: {}, log: X ? X.log : void 0, F: V(l.internal().config), use: {}, NORULE: { name: "no-rule" }, NOTOKEN: { name: "no-token" } });
            }
            throw Q;
          }
        } };
      };
    }), h = i(function(c, e) {
      Object.defineProperty(e, "__esModule", { value: !0 }), e.makeTextMatcher = e.makeNumberMatcher = e.makeCommentMatcher = e.makeStringMatcher = e.makeLineMatcher = e.makeSpaceMatcher = e.makeFixedMatcher = e.makeToken = e.makePoint = e.makeLex = e.makeNoToken = void 0;
      const t = s({});
      class y {
        constructor(te, S, Z, F) {
          this.len = -1, this.sI = 0, this.rI = 1, this.cI = 1, this.token = [], this.len = te, S != null && (this.sI = S), Z != null && (this.rI = Z), F != null && (this.cI = F);
        }
        toString() {
          return "Point[" + [this.sI + "/" + this.len, this.rI, this.cI] + (0 < this.token.length ? " " + this.token : "") + "]";
        }
        [r.INSPECT]() {
          return this.toString();
        }
      }
      const f = (...D) => new y(...D);
      e.makePoint = f;
      class A {
        constructor(te, S, Z, F, H, Y, ae) {
          this.isToken = !0, this.name = r.EMPTY, this.tin = -1, this.val = void 0, this.src = r.EMPTY, this.sI = -1, this.rI = -1, this.cI = -1, this.len = -1, this.name = te, this.tin = S, this.src = F, this.val = Z, this.sI = H.sI, this.rI = H.rI, this.cI = H.cI, this.use = Y, this.why = ae, this.len = F == null ? 0 : F.length;
        }
        resolveVal(te, S) {
          return typeof this.val == "function" ? this.val(te, S) : this.val;
        }
        bad(te, S) {
          return this.err = te, S != null && (this.use = (0, t.deep)(this.use || {}, S)), this;
        }
        toString() {
          return "Token[" + this.name + "=" + this.tin + " " + (0, t.snip)(this.src) + (this.val === void 0 || this.name === "#ST" || this.name === "#TX" ? "" : "=" + (0, t.snip)(this.val)) + " " + [this.sI, this.rI, this.cI] + (this.use == null ? "" : " " + (0, t.snip)("" + JSON.stringify(this.use).replace(/"/g, ""), 22)) + (this.err == null ? "" : " " + this.err) + (this.why == null ? "" : " " + (0, t.snip)("" + this.why, 22)) + "]";
        }
        [r.INSPECT]() {
          return this.toString();
        }
      }
      const U = (...D) => new A(...D);
      function b(D, te, S) {
        let Z = D.pnt, F = te;
        if (D.cfg.fixed.lex && S != null && 0 < S.length) {
          let H, Y = D.cfg.fixed.token[S];
          Y != null && (H = D.token(Y, void 0, S, Z)), H != null && (Z.sI += H.src.length, Z.cI += H.src.length, te == null ? F = H : Z.token.push(H));
        }
        return F;
      }
      e.makeToken = U, e.makeNoToken = () => U("", -1, void 0, r.EMPTY, f(-1)), e.makeFixedMatcher = (D, te) => {
        let S = (0, t.regexp)(null, "^(", D.rePart.fixed, ")");
        return function(Z) {
          let F = D.fixed;
          if (!F.lex) return;
          let H = Z.pnt, Y = Z.src.substring(H.sI).match(S);
          if (Y) {
            let ae = Y[1], re = ae.length;
            if (0 < re) {
              let V, ne = F.token[ae];
              return ne != null && (V = Z.token(ne, void 0, ae, H), H.sI += re, H.cI += re), V;
            }
          }
        };
      }, e.makeCommentMatcher = (D, te) => {
        let S = te.comment;
        D.comment = { lex: !!S && !!S.lex, marker: (S?.marker || []).map((H) => {
          let Y = { start: H.start, end: H.end, line: !!H.line, lex: !!H.lex, suffixMatch: void 0 };
          return Y.getSuffixMatch = H.suffix ? () => {
            if (H.suffix instanceof Function) return Y.suffixMatch = H.suffix;
            let ae = (Array.isArray(H.suffix) ? H.suffix : [H.suffix]).map((V) => D.lex.match.find((ne) => {
              var le;
              return ((le = ne.maker) === null || le === void 0 ? void 0 : le.name) == V;
            })).filter((V) => V != null), re = (...V) => {
              ae.map((ne) => ne(...V));
            };
            return (0, t.defprop)(re, "name", { value: "" + H.suffix }), re;
          } : void 0, Y;
        }) };
        let Z = D.comment.lex ? D.comment.marker.filter((H) => H.lex && H.line) : [], F = D.comment.lex ? D.comment.marker.filter((H) => H.lex && !H.line) : [];
        return function(H, Y) {
          if (!D.comment.lex) return;
          let ae = H.pnt, re = H.src.substring(ae.sI), V = ae.rI, ne = ae.cI;
          for (let le of Z) if (re.startsWith(le.start)) {
            let E = re.length, B = le.start.length;
            for (ne += le.start.length; B < E && !D.line.chars[re[B]]; ) ne++, B++;
            let o = re.substring(0, B), a = H.token("#CM", void 0, o, ae);
            return ae.sI += o.length, ae.cI = ne, le.suffixMatch ? le.suffixMatch(H, Y) : le.getSuffixMatch && (le.suffixMatch = le.getSuffixMatch(), le.suffixMatch && le.suffixMatch(H, Y)), a;
          }
          for (let le of F) if (re.startsWith(le.start)) {
            let E = re.length, B = le.start.length, o = le.end;
            for (ne += le.start.length; B < E && !re.substring(B).startsWith(o); ) D.line.rowChars[re[B]] && (V++, ne = 0), ne++, B++;
            if (re.substring(B).startsWith(o)) {
              ne += o.length;
              let a = re.substring(0, B + o.length), l = H.token("#CM", void 0, a, ae);
              return ae.sI += a.length, ae.rI = V, ae.cI = ne, l;
            }
            return H.bad(t.S.unterminated_comment, ae.sI, ae.sI + 9 * le.start.length);
          }
        };
      }, e.makeTextMatcher = (D, te) => {
        let S = (0, t.regexp)(D.line.lex ? null : "s", "^(.*?)", ...D.rePart.ender);
        return function(Z) {
          let F = D.text, H = Z.pnt, Y = Z.src.substring(H.sI), ae = D.value.map, re = Y.match(S);
          if (re) {
            let V = re[1], ne = re[2], le;
            if (V != null) {
              let E = V.length;
              if (0 < E) {
                let B;
                D.value.lex && (B = ae[V]) !== void 0 ? (le = Z.token("#VL", B.val, V, H), H.sI += E, H.cI += E) : F.lex && (le = Z.token("#TX", V, V, H), H.sI += E, H.cI += E);
              }
            }
            if (le && (le = b(Z, le, ne)), le && 0 < D.text.modify.length) {
              const E = D.text.modify;
              for (let B = 0; B < E.length; B++) le.val = E[B](le.val, Z, D, te);
            }
            return le;
          }
        };
      }, e.makeNumberMatcher = (D, te) => {
        let S = D.number, Z = (0, t.regexp)(null, ["^([-+]?(0(", [S.hex ? "x[0-9a-fA-F_]+" : null, S.oct ? "o[0-7_]+" : null, S.bin ? "b[01_]+" : null].filter((H) => H != null).join("|"), ")|[.0-9]+([0-9_]*[0-9])?)", "(\\.[0-9]?([0-9_]*[0-9])?)?", "([eE][-+]?[0-9]+([0-9_]*[0-9])?)?"].join("").replace(/_/g, S.sep ? (0, t.escre)(S.sepChar) : ""), ")", ...D.rePart.ender), F = S.sep ? (0, t.regexp)("g", (0, t.escre)(S.sepChar)) : void 0;
        return function(H) {
          if (!(S = D.number).lex) return;
          let Y = H.pnt, ae = H.src.substring(Y.sI), re = D.value.map, V = ae.match(Z);
          if (V) {
            let ne = V[1], le = V[9], E, B = !0;
            if (ne != null && (B = !D.number.exclude || !ne.match(D.number.exclude))) {
              let o = ne.length;
              if (0 < o) {
                let a;
                if (D.value.lex && (a = re[ne]) !== void 0) E = H.token("#VL", a.val, ne, Y);
                else {
                  let l = F ? ne.replace(F, "") : ne, X = +l;
                  if (isNaN(X)) {
                    let W = l[0];
                    W !== "-" && W !== "+" || (X = (W === "-" ? -1 : 1) * +l.substring(1));
                  }
                  isNaN(X) || (E = H.token("#NR", X, ne, Y), Y.sI += o, Y.cI += o);
                }
              }
            }
            return B && (E = b(H, E, le)), E;
          }
        };
      }, e.makeStringMatcher = (D, te) => {
        let S = te.string || {};
        return D.string = D.string || {}, D.string = (0, t.deep)(D.string, { lex: !!S?.lex, quoteMap: (0, t.charset)(S.chars), multiChars: (0, t.charset)(S.multiChars), escMap: (0, t.clean)({ ...S.escape }), escChar: S.escapeChar, escCharCode: S.escapeChar == null ? void 0 : S.escapeChar.charCodeAt(0), allowUnknown: !!S.allowUnknown, replaceCodeMap: (0, t.omap)((0, t.clean)({ ...S.replace }), ([Z, F]) => [Z.charCodeAt(0), F]), hasReplace: !1 }), D.string.hasReplace = 0 < (0, t.keys)(D.string.replaceCodeMap).length, function(Z) {
          let F = D.string;
          if (!F.lex) return;
          let { quoteMap: H, escMap: Y, escChar: ae, escCharCode: re, multiChars: V, allowUnknown: ne, replaceCodeMap: le, hasReplace: E } = F, { pnt: B, src: o } = Z, { sI: a, rI: l, cI: X } = B, W = o.length;
          if (H[o[a]]) {
            const Q = o[a], he = a, xe = l, me = V[Q];
            ++a, ++X;
            let Se, ye = [];
            for (; a < W; a++) {
              X++;
              let Ee = o[a];
              if (Se = void 0, Q === Ee) {
                a++;
                break;
              }
              if (ae === Ee) {
                X++;
                let Pe = Y[o[++a]];
                if (Pe != null) ye.push(Pe);
                else if (o[a] === "x") {
                  a++;
                  let Ae = parseInt(o.substring(a, a + 2), 16);
                  if (isNaN(Ae)) return a -= 2, X -= 2, B.sI = a, B.cI = X, Z.bad(t.S.invalid_ascii, a, a + 4);
                  let Ie = String.fromCharCode(Ae);
                  ye.push(Ie), a += 1, X += 2;
                } else if (o[a] === "u") {
                  let Ae = o[++a] === "{" ? (a++, 1) : 0, Ie = Ae ? 6 : 4, ze = parseInt(o.substring(a, a + Ie), 16);
                  if (isNaN(ze)) return a = a - 2 - Ae, X -= 2, B.sI = a, B.cI = X, Z.bad(t.S.invalid_unicode, a, a + Ie + 2 + 2 * Ae);
                  let We = String.fromCodePoint(ze);
                  ye.push(We), a += Ie - 1 + Ae, X += Ie + Ae;
                } else {
                  if (!ne) return B.sI = a, B.cI = X - 1, Z.bad(t.S.unexpected, a, a + 1);
                  ye.push(o[a]);
                }
              } else if (E && (Se = le[o.charCodeAt(a)]) !== void 0) ye.push(Se), X++;
              else {
                let Pe = a, Ae = Q.charCodeAt(0), Ie = o.charCodeAt(a);
                for (; (!E || (Se = le[Ie]) === void 0) && a < W && 32 <= Ie && Ae !== Ie && re !== Ie; ) Ie = o.charCodeAt(++a), X++;
                if (X--, Se === void 0 && Ie < 32) {
                  if (!me || !D.line.chars[o[a]]) return B.sI = a, B.cI = X, Z.bad(t.S.unprintable, a, a + 1);
                  D.line.rowChars[o[a]] && (B.rI = ++l), X = 1, ye.push(o.substring(Pe, a + 1));
                } else ye.push(o.substring(Pe, a)), a--;
              }
            }
            if (o[a - 1] !== Q || B.sI === a - 1) return B.rI = xe, Z.bad(t.S.unterminated_string, he, a);
            const $e = Z.token("#ST", ye.join(r.EMPTY), o.substring(B.sI, a), B);
            return B.sI = a, B.rI = l, B.cI = X, $e;
          }
        };
      }, e.makeLineMatcher = (D, te) => function(S) {
        if (!D.line.lex) return;
        let { chars: Z, rowChars: F } = D.line, { pnt: H, src: Y } = S, { sI: ae, rI: re } = H, V = D.line.single, ne;
        for (V && (ne = {}); Z[Y[ae]] && !(ne && (ne[Y[ae]] = (ne[Y[ae]] || 0) + 1, V && 1 < ne[Y[ae]])); ) re += F[Y[ae]] ? 1 : 0, ae++;
        if (H.sI < ae) {
          let le = Y.substring(H.sI, ae);
          const E = S.token("#LN", void 0, le, H);
          return H.sI += le.length, H.rI = re, H.cI = 1, E;
        }
      }, e.makeSpaceMatcher = (D, te) => function(S) {
        if (!D.space.lex) return;
        let { chars: Z } = D.space, { pnt: F, src: H } = S, { sI: Y, cI: ae } = F;
        for (; Z[H[Y]]; ) Y++, ae++;
        if (F.sI < Y) {
          let re = H.substring(F.sI, Y);
          const V = S.token("#SP", void 0, re, F);
          return F.sI += re.length, F.cI = ae, V;
        }
      };
      class m {
        constructor(te) {
          this.src = r.EMPTY, this.ctx = {}, this.cfg = {}, this.pnt = f(-1), this.ctx = te, this.src = te.src(), this.cfg = te.cfg, this.pnt = f(this.src.length);
        }
        token(te, S, Z, F, H, Y) {
          let ae, re;
          return typeof te == "string" ? (re = te, ae = (0, t.tokenize)(re, this.cfg)) : (ae = te, re = (0, t.tokenize)(te, this.cfg)), U(re, ae, S, Z, F || this.pnt, H, Y);
        }
        next(te) {
          let S, Z, F = this.pnt, H = F.sI;
          if (F.end) S = F.end;
          else if (0 < F.token.length) S = F.token.shift();
          else if (F.len <= F.sI) F.end = this.token("#ZZ", void 0, "", F), S = F.end;
          else {
            for (let Y of this.cfg.lex.match) if (S = Y(this, te)) {
              Z = Y;
              break;
            }
            S = S || this.token("#BD", void 0, this.src[F.sI], F, void 0, "unexpected");
          }
          return this.ctx.log && this.ctx.log(t.S.indent.repeat(te.d) + t.S.lex, (0, t.tokenize)(S.tin, this.cfg), this.ctx.F(S.src), F.sI, F.rI + ":" + F.cI, Z?.name || "none", this.ctx.F(this.src.substring(H, H + 16))), this.ctx.sub.lex && this.ctx.sub.lex.map((Y) => Y(S, te, this.ctx)), S;
        }
        tokenize(te) {
          return (0, t.tokenize)(te, this.cfg);
        }
        bad(te, S, Z) {
          return this.token("#BD", void 0, 0 <= S && S <= Z ? this.src.substring(S, Z) : this.src[this.pnt.sI], void 0, void 0, te);
        }
      }
      e.makeLex = (...D) => new m(...D);
    }), r = {};
    Object.defineProperty(r, "__esModule", { value: !0 }), r.STRING = r.INSPECT = r.EMPTY = r.AFTER = r.BEFORE = r.CLOSE = r.OPEN = void 0, r.OPEN = "o", r.CLOSE = "c", r.BEFORE = "b", r.AFTER = "a", r.EMPTY = "", r.INSPECT = Symbol.for("nodejs.util.inspect.custom"), r.STRING = "string";
    var p = {};
    Object.defineProperty(p, "__esModule", { value: !0 }), p.defaults = void 0;
    const O = h({}), g = { tag: "-", fixed: { lex: !0, token: { "#OB": "{", "#CB": "}", "#OS": "[", "#CS": "]", "#CL": ":", "#CA": "," } }, tokenSet: { ignore: ["#SP", "#LN", "#CM"], val: ["#TX", "#NR", "#ST", "#VL"], key: ["#TX", "#NR", "#ST", "#VL"] }, space: { lex: !0, chars: " 	" }, line: { lex: !0, chars: `\r
`, rowChars: `
`, single: !1 }, text: { lex: !0 }, number: { lex: !0, hex: !0, oct: !0, bin: !0, sep: "_", exclude: void 0 }, comment: { lex: !0, marker: [{ line: !0, start: "#", lex: !0 }, { line: !0, start: "//", lex: !0 }, { line: !1, start: "/*", end: "*/", lex: !0 }] }, string: { lex: !0, chars: "'\"`", multiChars: "`", escapeChar: "\\", escape: { b: "\b", f: "\f", n: `
`, r: "\r", t: "	", v: "\v", '"': '"', "'": "'", "`": "`", "\\": "\\", "/": "/" }, allowUnknown: !0 }, map: { extend: !0, merge: void 0 }, list: { property: !0 }, value: { lex: !0, map: { true: { val: !0 }, false: { val: !1 }, null: { val: null } } }, ender: [], plugin: {}, debug: { get_console: () => console, maxlen: 99, print: { config: !1, src: void 0 } }, error: { unknown: "unknown error: $code", unexpected: "unexpected character(s): $src", invalid_unicode: "invalid unicode escape: $src", invalid_ascii: "invalid ascii escape: $src", unprintable: "unprintable character: $src", unterminated_string: "unterminated string: $src", unterminated_comment: "unterminated comment: $src", unknown_rule: "unknown rule: $rulename" }, hint: function(c = (t, y = "replace") => t[y](/[A-Z]/g, (f) => " " + f.toLowerCase())[y](/[~%][a-z]/g, (f) => (f[0] == "~" ? " " : "") + f[1].toUpperCase()), e = `~sinceTheErrorIsUnknown,ThisIsProbablyABugInsideJsonic
itself,OrAPlugin.~pleaseConsiderPostingAGithubIssue -Thanks!

~code: $code,~details: 
$details|~theCharacter(s) $srcWereNotExpectedAtThisPointAsTheyDoNot
matchTheExpectedSyntax,EvenUnderTheRelaxedJsonicRules.~ifIt
isNotObviouslyWrong,TheActualSyntaxErrorMayBeElsewhere.~try
commentingOutLargerAreasAroundThisPointUntilYouGetNoErrors,
thenRemoveTheCommentsInSmallSectionsUntilYouFindThe
offendingSyntax.~n%o%t%e:~alsoCheckIfAnyPluginsYouAreUsing
expectDifferentSyntaxInThisCase.|~theEscapeSequence $srcDoesNotEncodeAValidUnicodeCodePoint
number.~youMayNeedToValidateYourStringDataManuallyUsingTest
codeToSeeHow~javaScriptWillInterpretIt.~alsoConsiderThatYour
dataMayHaveBecomeCorrupted,OrTheEscapeSequenceHasNotBeen
generatedCorrectly.|~theEscapeSequence $srcDoesNotEncodeAValid~a%s%c%i%iCharacter.~you
mayNeedToValidateYourStringDataManuallyUsingTestCodeToSee
how~javaScriptWillInterpretIt.~alsoConsiderThatYourDataMay
haveBecomeCorrupted,OrTheEscapeSequenceHasNotBeenGenerated
correctly.|~stringValuesCannotContainUnprintableCharacters (characterCodes
below 32).~theCharacter $srcIsUnprintable.~youMayNeedToRemove
theseCharactersFromYourSourceData.~alsoCheckThatItHasNot
becomeCorrupted.|~thisStringHasNoEndQuote.|~thisCommentIsNeverClosed.|~noRuleNamed $rulenameIsDefined.~thisIsProbablyAnErrorInThe
grammarOfAPlugin.`.split("|")) {
      return "unknown|unexpected|invalid_unicode|invalid_ascii|unprintable|unterminated_string|unterminated_comment|unknown_rule".split("|").reduce((t, y, f) => (t[y] = c(e[f]), t), {});
    }, lex: { match: [O.makeFixedMatcher, O.makeSpaceMatcher, O.makeLineMatcher, O.makeStringMatcher, O.makeCommentMatcher, O.makeNumberMatcher, O.makeTextMatcher], empty: !0, emptyResult: void 0 }, rule: { start: "val", finish: !0, maxmul: 3, include: "", exclude: "" }, result: { fail: [] }, config: { modify: {} }, parser: { start: void 0 } };
    p.defaults = g;
    var v = {};
    Object.defineProperty(v, "__esModule", { value: !0 }), v.Parser = v.makeRuleSpec = v.makeRule = void 0;
    const d = s({}), se = h({});
    class fe {
      constructor(e, t, y) {
        this.id = -1, this.name = r.EMPTY, this.node = null, this.state = r.OPEN, this.n = /* @__PURE__ */ Object.create(null), this.d = -1, this.use = /* @__PURE__ */ Object.create(null), this.keep = /* @__PURE__ */ Object.create(null), this.bo = !1, this.ao = !1, this.bc = !1, this.ac = !1, this.os = 0, this.cs = 0, this.id = t.uI++, this.name = e.name, this.spec = e, this.child = t.NORULE, this.parent = t.NORULE, this.prev = t.NORULE, this.o0 = t.NOTOKEN, this.o1 = t.NOTOKEN, this.c0 = t.NOTOKEN, this.c1 = t.NOTOKEN, this.node = y, this.d = t.rsI, this.bo = e.def.bo != null, this.ao = e.def.ao != null, this.bc = e.def.bc != null, this.ac = e.def.ac != null;
      }
      process(e) {
        return this.spec.process(this, e, this.state);
      }
      toString() {
        return "[Rule " + this.name + "~" + this.id + "]";
      }
    }
    const ee = (...c) => new fe(...c);
    v.makeRule = ee;
    class ge {
      constructor() {
        this.p = r.EMPTY, this.r = r.EMPTY, this.b = 0;
      }
    }
    const oe = (...c) => new ge(...c), K = oe(), G = oe();
    class L {
      constructor(e, t) {
        this.name = r.EMPTY, this.def = { open: [], close: [], bo: [], bc: [], ao: [], ac: [] }, this.cfg = e, this.def = Object.assign(this.def, t), this.def.open = (this.def.open || []).filter((y) => y != null), this.def.close = (this.def.close || []).filter((y) => y != null);
        for (let y of [...this.def.open, ...this.def.close]) (0, d.normalt)(y);
      }
      tin(e) {
        return (0, d.tokenize)(e, this.cfg);
      }
      add(e, t, y) {
        let f = y?.append ? "push" : "unshift", A = ((0, d.isarr)(t) ? t : [t]).filter((m) => m != null && typeof m == "object").map((m) => (0, d.normalt)(m)), U = e === "o" ? "open" : "close", b = this.def[U];
        if (b[f](...A), y) {
          if (y.delete) for (let m = 0; m < y.delete.length; m++) b[(b.length + y.delete[m]) % b.length] = null;
          if (y.move) for (let m = 0; m < y.move.length; m += 2) {
            let D = (b.length + y.move[m]) % b.length, te = (b.length + y.move[m + 1]) % b.length, S = b[D];
            b.splice(D, 1), b.splice(te, 0, S);
          }
          this.def[U] = b.filter((m) => m != null);
        }
        return (0, d.filterRules)(this, this.cfg), this;
      }
      open(e, t) {
        return this.add("o", e, t);
      }
      close(e, t) {
        return this.add("c", e, t);
      }
      action(e, t, y, f) {
        let A = this.def[t + y];
        return e ? A.push(f) : A.unshift(f), this;
      }
      bo(e, t) {
        return this.action(!t || !!e, r.BEFORE, r.OPEN, t || e);
      }
      ao(e, t) {
        return this.action(!t || !!e, r.AFTER, r.OPEN, t || e);
      }
      bc(e, t) {
        return this.action(!t || !!e, r.BEFORE, r.CLOSE, t || e);
      }
      ac(e, t) {
        return this.action(!t || !!e, r.AFTER, r.CLOSE, t || e);
      }
      clear() {
        return this.def.open.length = 0, this.def.close.length = 0, this.def.bo.length = 0, this.def.ao.length = 0, this.def.bc.length = 0, this.def.ac.length = 0, this;
      }
      process(e, t, y) {
        let f = r.EMPTY, A = t.F, U = y === "o", b = U ? e : t.NORULE, m = this.def, D = U ? m.open : m.close, te = U ? e.bo ? m.bo : null : e.bc ? m.bc : null;
        if (te) {
          let Y;
          for (let ae = 0; ae < te.length; ae++) if ((Y = te[ae].call(this, e, t, b, Y)) != null && Y.isToken && Y?.err) return this.bad(Y, e, t, { is_open: U });
        }
        let S = 0 < D.length ? this.parse_alts(U, D, e, t) : G;
        if (S.h && (S = S.h(e, t, S, b) || S, f += "H"), S.e) return this.bad(S.e, e, t, { is_open: U });
        if (S.n) for (let Y in S.n) e.n[Y] = S.n[Y] === 0 ? 0 : (e.n[Y] == null ? 0 : e.n[Y]) + S.n[Y];
        if (S.u && (e.use = Object.assign(e.use, S.u)), S.k && (e.keep = Object.assign(e.keep, S.k)), S.a) {
          f += "A";
          let Y = S.a.call(this, e, t, S);
          if (Y && Y.isToken && Y.err) return this.bad(Y, e, t, { is_open: U });
        }
        if (S.p) {
          t.rs[t.rsI++] = e;
          let Y = t.rsm[S.p];
          if (!Y) return this.bad(this.unknownRule(t.t0, S.p), e, t, { is_open: U });
          (b = e.child = ee(Y, t, e.node)).parent = e, b.n = { ...e.n }, 0 < Object.keys(e.keep).length && (b.keep = { ...e.keep }), f += "@p:" + S.p;
        } else if (S.r) {
          let Y = t.rsm[S.r];
          if (!Y) return this.bad(this.unknownRule(t.t0, S.r), e, t, { is_open: U });
          (b = ee(Y, t, e.node)).parent = e.parent, b.prev = e, b.n = { ...e.n }, 0 < Object.keys(e.keep).length && (b.keep = { ...e.keep }), f += "@r:" + S.r;
        } else U || (b = t.rs[--t.rsI] || t.NORULE), f += "Z";
        let Z = U ? e.ao ? m.ao : null : e.ac ? m.ac : null;
        if (Z) {
          let Y;
          for (let ae = 0; ae < Z.length; ae++) if ((Y = Z[ae].call(this, e, t, b, Y)) != null && Y.isToken && Y?.err) return this.bad(Y, e, t, { is_open: U });
        }
        b.why = f, t.log && t.log(d.S.indent.repeat(e.d) + d.S.node + d.S.space, e.state.toUpperCase(), (e.prev.id + "/" + e.parent.id + "/" + e.child.id).padEnd(12), e.name + "~" + e.id, "w=" + f, "n:" + (0, d.entries)(e.n).filter((Y) => Y[1]).map((Y) => Y[0] + "=" + Y[1]).join(";"), "u:" + (0, d.entries)(e.use).map((Y) => Y[0] + "=" + Y[1]).join(";"), "k:" + (0, d.entries)(e.keep).map((Y) => Y[0] + "=" + Y[1]).join(";"), "<" + A(e.node) + ">");
        let F = 0, H = e[U ? "os" : "cs"] - (S.b || 0);
        for (; F++ < H; ) t.next();
        return r.OPEN === e.state && (e.state = r.CLOSE), b;
      }
      parse_alts(e, t, y, f) {
        let A = K;
        A.b = 0, A.p = r.EMPTY, A.r = r.EMPTY, A.n = void 0, A.h = void 0, A.a = void 0, A.u = void 0, A.k = void 0, A.e = void 0;
        let U, b = null, m = 0, D = f.cfg.t, te = 1 << D.AA - 1, S = t.length;
        for (m = 0; m < S; m++) {
          b = t[m];
          let F = f.t0.tin, H = !1, Y = !1;
          if (U = !0, b.S0 && (H = !0, (U = b.S0[F / 31 | 0] & (1 << F % 31 - 1 | te)) && (Y = b.S1 != null, b.S1))) {
            Y = !0;
            let ae = f.t1.tin;
            U = b.S1[ae / 31 | 0] & (1 << ae % 31 - 1 | te);
          }
          if (e ? (y.o0 = H ? f.t0 : f.NOTOKEN, y.o1 = Y ? f.t1 : f.NOTOKEN, y.os = (H ? 1 : 0) + (Y ? 1 : 0)) : (y.c0 = H ? f.t0 : f.NOTOKEN, y.c1 = Y ? f.t1 : f.NOTOKEN, y.cs = (H ? 1 : 0) + (Y ? 1 : 0)), U && b.c && (U = U && b.c(y, f, A)), U) break;
          b = null;
        }
        U || D.ZZ === f.t0.tin || (A.e = f.t0), b && (A.n = b.n != null ? b.n : A.n, A.h = b.h != null ? b.h : A.h, A.a = b.a != null ? b.a : A.a, A.u = b.u != null ? b.u : A.u, A.k = b.k != null ? b.k : A.k, A.g = b.g != null ? b.g : A.g, A.e = b.e && b.e(y, f, A) || void 0, A.p = b.p != null ? typeof b.p == "string" ? b.p : b.p(y, f, A) : A.p, A.r = b.r != null ? typeof b.r == "string" ? b.r : b.r(y, f, A) : A.r, A.b = b.b != null ? typeof b.b == "number" ? b.b : b.b(y, f, A) : A.b);
        let Z = m < t.length;
        return f.log && f.log(d.S.indent.repeat(y.d) + d.S.parse, y.state.toUpperCase(), (y.prev.id + "/" + y.parent.id + "/" + y.child.id).padEnd(12), y.name + "~" + y.id, Z ? "alt=" + m : "no-alt", Z && A.g ? "g:" + A.g + " " : "", (Z && A.p ? "p:" + A.p + " " : "") + (Z && A.r ? "r:" + A.r + " " : "") + (Z && A.b ? "b:" + A.b + " " : ""), (r.OPEN === y.state ? [y.o0, y.o1].slice(0, y.os) : [y.c0, y.c1].slice(0, y.cs)).map((F) => F.name + "=" + f.F(F.src)).join(" "), "c:" + (b && b.c ? U : r.EMPTY), "n:" + (0, d.entries)(A.n).map((F) => F[0] + "=" + F[1]).join(";"), "u:" + (0, d.entries)(A.u).map((F) => F[0] + "=" + F[1]).join(";"), "k:" + (0, d.entries)(A.k).map((F) => F[0] + "=" + F[1]).join(";"), m < t.length && b.s ? "[" + b.s.map((F) => Array.isArray(F) ? F.map((H) => D[H]).join("|") : D[F]).join(" ") + "]" : "[]", A), A;
      }
      bad(e, t, y, f) {
        throw new d.JsonicError(e.err || d.S.unexpected, { ...e.use, state: f.is_open ? d.S.open : d.S.close }, e, t, y);
      }
      unknownRule(e, t) {
        return e.err = "unknown_rule", e.use = e.use || {}, e.use.rulename = t, e;
      }
    }
    const P = (...c) => new L(...c);
    v.makeRuleSpec = P;
    class T {
      constructor(e, t) {
        this.rsm = {}, this.options = e, this.cfg = t;
      }
      rule(e, t) {
        if (e == null) return this.rsm;
        let y = this.rsm[e];
        if (t === null) delete this.rsm[e];
        else if (t !== void 0) {
          y = this.rsm[e] = this.rsm[e] || P(this.cfg, {}), (y = this.rsm[e] = t(this.rsm[e], this.rsm) || this.rsm[e]).name = e;
          for (let f of [...y.def.open, ...y.def.close]) (0, d.normalt)(f);
          return;
        }
        return y;
      }
      start(e, t, y, f) {
        let A, U = (0, se.makeToken)("#ZZ", (0, d.tokenize)("#ZZ", this.cfg), void 0, r.EMPTY, (0, se.makePoint)(-1)), b = (0, se.makeNoToken)(), m = { uI: 0, opts: this.options, cfg: this.cfg, meta: y || {}, src: () => e, root: () => A.node, plgn: () => t.internal().plugins, rule: {}, sub: t.internal().sub, xs: -1, v2: U, v1: U, t0: U, t1: U, tC: -2, next: ae, rs: [], rsI: 0, rsm: this.rsm, log: void 0, F: (0, d.srcfmt)(this.cfg), use: {}, NOTOKEN: b, NORULE: {} };
        m = (0, d.deep)(m, f);
        let D = ((ne) => ee(P(ne.cfg, {}), ne))(m);
        if (m.NORULE = D, m.rule = D, (0, d.makelog)(m, y), e === "") {
          if (this.cfg.lex.empty) return this.cfg.lex.emptyResult;
          throw new d.JsonicError(d.S.unexpected, { src: e }, m.t0, D, m);
        }
        let te = (ne) => (0, d.tokenize)(ne, this.cfg), S = (0, d.badlex)((0, se.makeLex)(m), (0, d.tokenize)("#BD", this.cfg), m), Z = this.rsm[this.cfg.rule.start];
        if (Z == null) return;
        let F = ee(Z, m);
        A = F;
        let H = 2 * (0, d.keys)(this.rsm).length * S.src.length * 2 * m.cfg.rule.maxmul, Y = m.cfg.tokenSetDerived.ignore;
        function ae() {
          let ne, le;
          m.v2 = m.v1, m.v1 = m.t0, m.t0 = m.t1;
          do
            le = S(F), m.tC++;
          while (Y[le.tin] && (ne = le));
          return le.ignored = ne, m.t1 = le, m.t0;
        }
        ae(), ae();
        let re = 0;
        for (; D !== F && re < H; ) m.sub.rule && m.sub.rule.map((ne) => ne(F, m)), m.log && m.log(`
` + d.S.indent.repeat(F.d) + d.S.stack, m.rs.slice(0, m.rsI).map((ne) => ne.name + "~" + ne.id).join("/"), "<<" + m.F(A.node) + ">>", m.rs.slice(0, m.rsI).map((ne) => "<" + m.F(ne.node) + ">").join(" "), F, m), m.log && m.log(d.S.indent.repeat(F.d) + d.S.rule + d.S.space, F.state.toUpperCase(), (F.prev.id + "/" + F.parent.id + "/" + F.child.id).padEnd(12), F.name + "~" + F.id, "[" + m.F(m.t0.src) + " " + m.F(m.t1.src) + "]", "n:" + (0, d.entries)(F.n).filter((ne) => ne[1]).map((ne) => ne[0] + "=" + ne[1]).join(";"), "u:" + (0, d.entries)(F.use).map((ne) => ne[0] + "=" + ne[1]).join(";"), "k:" + (0, d.entries)(F.keep).map((ne) => ne[0] + "=" + ne[1]).join(";"), "[" + te(m.t0.tin) + " " + te(m.t1.tin) + "]", F, m), m.rule = F, F = F.process(m), re++;
        if ((0, d.tokenize)("#ZZ", this.cfg) !== m.t0.tin) throw new d.JsonicError(d.S.unexpected, {}, m.t0, D, m);
        const V = m.root();
        if (this.cfg.result.fail.includes(V)) throw new d.JsonicError(d.S.unexpected, {}, m.t0, D, m);
        return V;
      }
      clone(e, t) {
        let y = new T(e, t);
        return y.rsm = Object.keys(this.rsm).reduce((f, A) => (f[A] = (0, d.filterRules)(this.rsm[A], this.cfg), f), {}), y;
      }
    }
    v.Parser = T;
    var _ = {};
    function R(c) {
      const e = c.token.OB, t = c.token.CB, y = c.token.OS, f = c.token.CS, A = c.token.CL, U = c.token.CA, b = c.token.TX, m = c.token.ST, D = c.token.ZZ, te = c.config(), S = te.tokenSet.val, Z = te.tokenSet.key, F = c.util.deep, H = (re, V) => {
        if (!V.cfg.rule.finish) return V.t0.src = "END_OF_SOURCE", V.t0;
      }, Y = (re) => {
        const V = re.o0, ne = m === V.tin || b === V.tin ? V.val : V.src;
        re.use.key = ne;
      };
      c.rule("val", (re) => {
        re.bo((V) => V.node = void 0).open([{ s: [e], p: "map", b: 1, g: "map,json" }, { s: [y], p: "list", b: 1, g: "list,json" }, { s: [S], g: "val,json" }]).close([{ s: [D], g: "end,json" }, { b: 1, g: "more,json" }]).bc((V, ne) => {
          V.node = V.node === void 0 ? V.child.node === void 0 ? V.os === 0 ? void 0 : V.o0.resolveVal(V, ne) : V.child.node : V.node;
        });
      }), c.rule("map", (re) => {
        re.bo((V) => {
          V.node = {};
        }).open([{ s: [e, t], g: "map,json" }, { s: [e], p: "pair", n: { pk: 0 }, g: "map,json,pair" }]);
      }), c.rule("list", (re) => {
        re.bo((V) => {
          V.node = [];
        }).open([{ s: [y, f], g: "list,json" }, { s: [y], p: "elem", g: "list,elem,json" }]);
      }), c.rule("pair", (re) => {
        re.open([{ s: [Z, A], p: "val", u: { pair: !0 }, a: Y, g: "map,pair,key,json" }]).bc((V, ne) => {
          V.use.pair && (V.use.prev = V.node[V.use.key], V.node[V.use.key] = V.child.node);
        }).close([{ s: [t], g: "map,pair,json" }, { s: [U], r: "pair", g: "map,pair,json" }, { s: [D], e: H, g: "map,pair,json" }]);
      }), c.rule("elem", (re) => {
        re.open([{ p: "val", u: { elem: !0 }, g: "list,elem,val,json" }]).bc((V) => {
          V.use.elem && V.node.push(V.child.node);
        }).close([{ s: [U], r: "elem", g: "list,elem,json" }, { s: [f], g: "list,elem,json" }, { s: [D], e: H, g: "list,elem,json" }]);
      });
      const ae = (re, V) => {
        let ne = re.use.key, le = re.child.node;
        const E = re.use.prev;
        le = le === void 0 ? null : le, re.node[ne] = E == null ? le : V.cfg.map.merge ? V.cfg.map.merge(E, le) : V.cfg.map.extend ? F(E, le) : le;
      };
      c.rule("val", (re) => {
        re.open([{ s: [Z, A], p: "map", b: 2, n: { pk: 1 }, g: "pair,jsonic" }, { s: [S], g: "val,json" }, { s: [[t, f]], b: 1, g: "val,imp,null,jsonic" }, { s: [U], c: { n: { il: 0 } }, p: "list", b: 1, g: "list,imp,jsonic" }, { s: [U], b: 1, g: "list,val,imp,null,jsonic" }], { append: !0, delete: [2] }).close([{ s: [[t, f]], b: 1, g: "val,json,close" }, { s: [U], c: { n: { il: 0, pk: 0 } }, n: { il: 1 }, r: "elem", a: (V) => V.node = [V.node], g: "list,val,imp,comma,jsonic" }, { c: { n: { il: 0, pk: 0 } }, n: { il: 1 }, r: "elem", a: (V) => V.node = [V.node], g: "list,val,imp,space,jsonic", b: 1 }], { append: !0, move: [1, -1] });
      }), c.rule("map", (re) => {
        re.bo((V) => {
          V.n.il = 1 + (V.n.il ? V.n.il : 0), V.n.im = 1 + (V.n.im ? V.n.im : 0);
        }).open([{ s: [Z, A], p: "pair", b: 2, g: "pair,list,val,imp" }], { append: !0 });
      }), c.rule("list", (re) => {
        re.bo((V) => {
          V.n.il = 1 + (V.n.il ? V.n.il : 0), V.n.pk = 1 + (V.n.pk ? V.n.pk : 0), V.n.im = 1 + (V.n.im ? V.n.im : 0);
        }).open([{ s: [U], p: "elem", b: 1, g: "list,elem,val,imp" }, { p: "elem", g: "list,elem" }], { append: !0 });
      }), c.rule("pair", (re) => {
        re.open([{ s: [U], g: "map,pair,comma" }], { append: !0 }).bc((V, ne) => {
          V.use.pair && ae(V, ne);
        }).close([{ s: [t], c: { n: { pk: 0 } }, g: "map,pair,json" }, { s: [U, t], c: { n: { pk: 0 } }, g: "map,pair,comma,jsonic" }, { s: [U], c: { n: { pk: 0 } }, r: "pair", g: "map,pair,json" }, { s: [U], c: { n: { im: 1 } }, r: "pair", g: "map,pair,jsonic" }, { s: [S], c: { n: { pk: 0 } }, r: "pair", b: 1, g: "map,pair,imp,jsonic" }, { s: [S], c: { n: { im: 1 } }, r: "pair", b: 1, g: "map,pair,imp,jsonic" }, { s: [[t, U, ...S]], b: 1, g: "map,pair,imp,path,jsonic" }, { s: [f], b: 1, g: "list,pair,imp,jsonic" }, { s: [D], e: H, g: "map,pair,json" }], { append: !0, delete: [0, 1, 2] });
      }), c.rule("elem", (re) => {
        re.open([{ s: [U, U], b: 2, a: (V) => V.node.push(null), g: "list,elem,imp,null,jsonic" }, { s: [U], a: (V) => V.node.push(null), g: "list,elem,imp,null,jsonic" }, te.list.property && { s: [Z, A], p: "val", n: { pk: 1 }, u: { elem: !1 }, a: Y, g: "elem,pair,jsonic" }]).bc((V, ne) => {
          V.use.elem === !1 && (V.use.prev = V.node[V.use.key], ae(V, ne));
        }).close([{ s: [U, f], g: "list,elem,comma.jsonic" }, { s: [U], r: "elem", g: "list,elem,json" }, { s: [[...S, e, y]], r: "elem", b: 1, g: "list,elem,imp,jsonic" }, { s: [f], g: "list,elem,json" }, { s: [D], e: H, g: "list,elem,json" }], { delete: [-1, -2, -3] });
      });
    }
    Object.defineProperty(_, "__esModule", { value: !0 }), _.makeJSON = _.grammar = void 0, _.grammar = R, _.makeJSON = function(c) {
      let e = c.make({ grammar$: !1, text: { lex: !1 }, number: { hex: !1, oct: !1, bin: !1, sep: null, exclude: /^00+/ }, string: { chars: '"', multiChars: "", allowUnknown: !1, escape: { v: null } }, comment: { lex: !1 }, map: { extend: !1 }, lex: { empty: !1 }, rule: { finish: !1, include: "json" }, result: { fail: [void 0, NaN] }, tokenSet: { key: ["#ST", null, null, null] } });
      return R(e), e;
    };
    var C = {};
    Object.defineProperty(C, "__esModule", { value: !0 }), C.Debug = void 0;
    const w = (c, e) => {
      const { keys: t, values: y, entries: f } = c.util;
      c.debug = { describe: function() {
        var U;
        let b = (U = c.options.lex) === null || U === void 0 ? void 0 : U.match, m = c.rule();
        return ["========= RULES =========", J(c, t(m), m), `
`, "========= ALTS =========", y(m).map((D) => "  " + D.name + `:
` + z(c, D, "open") + z(c, D, "close")).join(`

`), `
`, "========= LEXER =========", "  " + (b && b.map((D) => D.name) || []).join(`
  `), `
`, `
`, "========= PLUGIN =========", "  " + c.internal().plugins.map((D) => D.name + (D.options ? f(D.options).reduce((te, S) => te + `
    ` + S[0] + ": " + JSON.stringify(S[1]), "") : "")).join(`
  `), `
`].join(`
`);
      } };
      const A = c.use.bind(c);
      c.use = (...U) => {
        let b = A(...U);
        return e.print && b.internal().config.debug.get_console().log(b.debug.describe()), b;
      };
    };
    function z(c, e, t) {
      const { entries: y } = c.util;
      return e.def[t].length === 0 ? "" : "    " + t.toUpperCase() + `:
` + e.def[t].map((f, A) => {
        var U, b;
        return "      " + ("" + A).padStart(5, " ") + " " + ("[" + (f.s || []).map((m) => typeof m == "number" ? c.token[m] : "[" + m.map((D) => c.token[D]) + "]").join(" ") + "] ").padEnd(32, " ") + (f.r ? " r=" + (typeof f.r == "string" ? f.r : "<F>") : "") + (f.p ? " p=" + (typeof f.p == "string" ? f.p : "<F>") : "") + (f.r || f.p ? "" : "	") + "	" + (f.b == null ? "" : "b=" + f.b) + "	" + (f.n == null ? "" : "n=" + y(f.n).map(([m, D]) => m + ":" + D)) + "	" + (f.a == null ? "" : "A") + (f.c == null ? "" : "C") + (f.h == null ? "" : "H") + "	" + (((U = f.c) === null || U === void 0 ? void 0 : U.n) == null ? "	" : " CN=" + y(f.c.n).map(([m, D]) => m + ":" + D)) + (((b = f.c) === null || b === void 0 ? void 0 : b.d) == null ? "" : " CD=" + f.c.d) + (f.g ? "	g=" + f.g : "");
      }).join(`
`) + `
`;
    }
    function J(c, e, t) {
      const { values: y, omap: f } = c.util;
      return e.reduce((A, U) => A += "  " + U + `:
    ` + y(f({ op: I(t, U, "open", "p"), or: I(t, U, "open", "r"), cp: I(t, U, "close", "p"), cr: I(t, U, "close", "r") }, ([b, m]) => [1 < m.length ? b : void 0, b + ": " + m])).join(`
    `) + `
`, "");
    }
    function I(c, e, t, y) {
      return [...new Set(c[e].def[t].filter((f) => f[y]).map((f) => f[y]).map((f) => typeof f == "string" ? f : "<F>"))].join(" ");
    }
    C.Debug = w, w.defaults = { print: !0, trace: !1 };
    var x = { exports: {} };
    Object.defineProperty(x.exports, "__esModule", { value: !0 }), x.exports.EMPTY = x.exports.AFTER = x.exports.BEFORE = x.exports.CLOSE = x.exports.OPEN = x.exports.makeTextMatcher = x.exports.makeNumberMatcher = x.exports.makeCommentMatcher = x.exports.makeStringMatcher = x.exports.makeLineMatcher = x.exports.makeSpaceMatcher = x.exports.makeFixedMatcher = x.exports.makeLex = x.exports.makeRuleSpec = x.exports.makeRule = x.exports.makePoint = x.exports.makeToken = x.exports.make = x.exports.util = x.exports.Debug = x.exports.Parser = x.exports.JsonicError = x.exports.Jsonic = void 0, Object.defineProperty(x.exports, "OPEN", { enumerable: !0, get: function() {
      return r.OPEN;
    } }), Object.defineProperty(x.exports, "CLOSE", { enumerable: !0, get: function() {
      return r.CLOSE;
    } }), Object.defineProperty(x.exports, "BEFORE", { enumerable: !0, get: function() {
      return r.BEFORE;
    } }), Object.defineProperty(x.exports, "AFTER", { enumerable: !0, get: function() {
      return r.AFTER;
    } }), Object.defineProperty(x.exports, "EMPTY", { enumerable: !0, get: function() {
      return r.EMPTY;
    } });
    const q = s({});
    Object.defineProperty(x.exports, "JsonicError", { enumerable: !0, get: function() {
      return q.JsonicError;
    } });
    const $ = h({});
    Object.defineProperty(x.exports, "makePoint", { enumerable: !0, get: function() {
      return $.makePoint;
    } }), Object.defineProperty(x.exports, "makeToken", { enumerable: !0, get: function() {
      return $.makeToken;
    } }), Object.defineProperty(x.exports, "makeLex", { enumerable: !0, get: function() {
      return $.makeLex;
    } }), Object.defineProperty(x.exports, "makeFixedMatcher", { enumerable: !0, get: function() {
      return $.makeFixedMatcher;
    } }), Object.defineProperty(x.exports, "makeSpaceMatcher", { enumerable: !0, get: function() {
      return $.makeSpaceMatcher;
    } }), Object.defineProperty(x.exports, "makeLineMatcher", { enumerable: !0, get: function() {
      return $.makeLineMatcher;
    } }), Object.defineProperty(x.exports, "makeStringMatcher", { enumerable: !0, get: function() {
      return $.makeStringMatcher;
    } }), Object.defineProperty(x.exports, "makeCommentMatcher", { enumerable: !0, get: function() {
      return $.makeCommentMatcher;
    } }), Object.defineProperty(x.exports, "makeNumberMatcher", { enumerable: !0, get: function() {
      return $.makeNumberMatcher;
    } }), Object.defineProperty(x.exports, "makeTextMatcher", { enumerable: !0, get: function() {
      return $.makeTextMatcher;
    } }), Object.defineProperty(x.exports, "makeRule", { enumerable: !0, get: function() {
      return v.makeRule;
    } }), Object.defineProperty(x.exports, "makeRuleSpec", { enumerable: !0, get: function() {
      return v.makeRuleSpec;
    } }), Object.defineProperty(x.exports, "Parser", { enumerable: !0, get: function() {
      return v.Parser;
    } }), Object.defineProperty(x.exports, "Debug", { enumerable: !0, get: function() {
      return C.Debug;
    } });
    const M = { tokenize: q.tokenize, srcfmt: q.srcfmt, clone: q.clone, charset: q.charset, trimstk: q.trimstk, makelog: q.makelog, badlex: q.badlex, extract: q.extract, errinject: q.errinject, errdesc: q.errdesc, configure: q.configure, parserwrap: q.parserwrap, mesc: q.mesc, escre: q.escre, regexp: q.regexp, prop: q.prop, str: q.str, clean: q.clean, deep: q.deep, omap: q.omap, keys: q.keys, values: q.values, entries: q.entries };
    function k(c, e) {
      if (c === "json") return (0, _.makeJSON)(j);
      let t = { parser: {}, config: {}, plugins: [], sub: { lex: void 0, rule: void 0 }, mark: Math.random() }, y = (0, q.deep)({}, e ? { ...e.options } : c?.defaults$ === !1 ? {} : p.defaults, c || {}), f = function(b, m, D) {
        var te;
        if (q.S.string === typeof b) {
          let S = f.internal();
          return (!((te = A.parser) === null || te === void 0) && te.start ? (0, q.parserwrap)(A.parser) : S.parser).start(b, f, m, D);
        }
        return b;
      }, A = (b) => {
        if (b != null && q.S.object === typeof b) {
          (0, q.deep)(y, b), (0, q.configure)(f, t.config, y);
          let m = f.internal().parser;
          t.parser = m.clone(y, t.config);
        }
        return { ...f.options };
      }, U = { token: (b) => (0, q.tokenize)(b, t.config, f), fixed: (b) => t.config.fixed.ref[b], options: (0, q.deep)(A, y), config: () => (0, q.deep)(t.config), parse: f, use: function(b, m) {
        const D = b.name.toLowerCase(), te = (0, q.deep)({}, b.defaults || {}, m || {});
        f.options({ plugin: { [D]: te } });
        let S = f.options.plugin[D];
        return f.internal().plugins.push(b), b.options = S, b(f, S) || f;
      }, rule: (b, m) => f.internal().parser.rule(b, m) || f, lex: (b) => {
        let m = y.lex.match;
        m.unshift(b), f.options({ lex: { match: m } });
      }, make: (b) => k(b, f), empty: (b) => k({ defaults$: !1, standard$: !1, grammar$: !1, ...b || {} }), id: "Jsonic/" + Date.now() + "/" + ("" + Math.random()).substring(2, 8).padEnd(6, "0") + (A.tag == null ? "" : "/" + A.tag), toString: () => U.id, sub: (b) => (b.lex && (t.sub.lex = t.sub.lex || [], t.sub.lex.push(b.lex)), b.rule && (t.sub.rule = t.sub.rule || [], t.sub.rule.push(b.rule)), f), util: M };
      if ((0, q.defprop)(U.make, q.S.name, { value: q.S.make }), (0, q.assign)(f, U), (0, q.defprop)(f, "internal", { value: () => t }), e) {
        for (let m in e) f[m] === void 0 && (f[m] = e[m]);
        f.parent = e;
        let b = e.internal();
        t.config = (0, q.deep)({}, b.config), (0, q.configure)(f, t.config, y), (0, q.assign)(f.token, t.config.t), t.plugins = [...b.plugins], t.parser = b.parser.clone(y, t.config);
      } else t.config = (0, q.configure)(f, void 0, y), t.plugins = [], t.parser = new v.Parser(y, t.config), y.grammar$ !== !1 && (0, _.grammar)(f);
      return f;
    }
    x.exports.util = M, x.exports.make = k;
    let j, N = j = k();
    return x.exports.Jsonic = N, delete j.options, delete j.use, delete j.rule, delete j.lex, delete j.token, delete j.fixed, j.Jsonic = j, j.JsonicError = q.JsonicError, j.Parser = v.Parser, j.Debug = C.Debug, j.makeLex = $.makeLex, j.makeToken = $.makeToken, j.makePoint = $.makePoint, j.makeRule = v.makeRule, j.makeRuleSpec = v.makeRuleSpec, j.makeFixedMatcher = $.makeFixedMatcher, j.makeSpaceMatcher = $.makeSpaceMatcher, j.makeLineMatcher = $.makeLineMatcher, j.makeStringMatcher = $.makeStringMatcher, j.makeCommentMatcher = $.makeCommentMatcher, j.makeNumberMatcher = $.makeNumberMatcher, j.makeTextMatcher = $.makeTextMatcher, j.OPEN = r.OPEN, j.CLOSE = r.CLOSE, j.BEFORE = r.BEFORE, j.AFTER = r.AFTER, j.EMPTY = r.EMPTY, j.util = M, j.make = k, x.exports.default = N, x.exports = x.exports.Jsonic, x = x.exports;
  });
})(Kt);
var Cn = Kt.exports;
const $n = /* @__PURE__ */ Je(Cn), On = {
  allow: {
    match: [],
    modify: (n) => n
  }
};
function En(n, u) {
  if (!n || !u) return !1;
  for (const i in n) {
    if (!(i in u))
      return !1;
    const s = n[i], h = u[i];
    if (Array.isArray(s) && Array.isArray(h)) {
      if (!s.some((p) => h.includes(p)) && !h.includes("*"))
        return !1;
    } else if (s !== h && h !== "*")
      return !1;
  }
  return !0;
}
class In {
  /**
   * Create a new Vxg instance
   * @param {Object} config - Configuration options
   */
  constructor(u = {}) {
    this.allowPatterns = [], this.cmp = {}, this.state = {
      cmp: {},
      ent: {
        meta: {}
      }
    }, this._store = null, this._storeType = null, this.memoizedAllow = /* @__PURE__ */ new Map(), this.match = {
      allow: new Tn({ gex: !0 })
    }, this.configure(u);
  }
  /**
   * Configure the Vxg instance
   * @param {Object} customConfig - Custom configuration to merge
   */
  configure(u) {
    this.config = Object.assign({}, On, u), this.config.allow = this.config.allow || {}, this.config.allow.modify = this.config.allow.modify || ((i) => i), this.config.allow.match = this.config.allow.match || [], this.allowPatterns = [...this.config.allow.match];
    for (const i of this.config.allow.match)
      this.match.allow.add(i, { allow: !0 });
  }
  /**
   * Check if a match pattern is allowed
   * @param {Object|Array|String} match - Pattern to check
   * @returns {boolean} True if allowed
   * 
   * @example
   * ```js
   * vxg.allow({ role: 'admin' })
   * vxg.allow([{ role: 'admin' }, { role: 'editor' }])
   * vxg.allow('{ role: "admin" }')
   * ```
   */
  allow(u) {
    const i = JSON.stringify(u);
    if (this.memoizedAllow.has(i))
      return this.memoizedAllow.get(i);
    let s;
    try {
      s = typeof u == "string" ? $n(u) : u;
    } catch (r) {
      return console.warn("[Vxg] Invalid match pattern:", u, r), this.memoizedAllow.set(i, !1), !1;
    }
    const h = Array.isArray(s) ? s : [s];
    for (const r of h) {
      if (!r || typeof r != "object")
        continue;
      const p = this.config.allow.modify({ ...r });
      for (const O of this.allowPatterns)
        if (En(p, O))
          return this.memoizedAllow.set(i, !0), !0;
    }
    return this.memoizedAllow.set(i, !1), !1;
  }
  /**
   * Get component state
   * @param {string} name - Component name
   * @returns {Object} Component state
   */
  getComponentState(u) {
    return this.state.cmp[u] || {};
  }
  /**
   * Set component flags
   * @param {string} name - Component name
   * @param {Object} flags - Flags to set (show, allow, etc.)
   * 
   * @example
   * ```js
   * vxg.setComponentFlags('basic-head', { show: true })
   * vxg.setComponentFlags('basic-side', { show: false, allow: { edit: true } })
   * ```
   */
  setComponentFlags(u, i) {
    this.state.cmp[u] || (this.state.cmp[u] = {}), Object.assign(this.state.cmp[u], i), this._store && this._syncToStore(u, i);
  }
  /**
   * Get nested state value by path
   * @param {string} path - Dot-separated path (e.g., 'cmp.basic-head.show')
   * @returns {*} Value at path
   */
  get(u) {
    const i = u.split(".");
    let s = this.state;
    for (const h of i)
      if (s && typeof s == "object")
        s = s[h];
      else
        return;
    return s;
  }
  /**
   * Set nested state value by path
   * @param {string} path - Dot-separated path
   * @param {*} value - Value to set
   * 
   * @example
   * ```js
   * vxg.set('cmp.basic-head.show', true)
   * vxg.set('ent.meta.name', 'My Entity')
   * ```
   */
  set(u, i) {
    const s = u.split("."), h = s.pop();
    let r = this.state;
    for (const p of s)
      (!r[p] || typeof r[p] != "object") && (r[p] = {}), r = r[p];
    r[h] = i, this._store && this._syncToStore(u, i);
  }
  /**
   * Connect to a Vuex or Pinia store
   * @param {Object} store - Vuex or Pinia store instance
   * @private
   */
  connectStore(u) {
    this._store = u, this._storeType = this._detectStoreType(u), this._storeType === "vuex4" ? this._connectVuex(u) : this._storeType === "pinia" ? this._connectPinia(u) : console.warn("[Vxg] Unknown store type, store integration disabled");
  }
  /**
   * Detect store type (Vuex 4 or Pinia)
   * @param {Object} store - Store instance
   * @returns {string} 'vuex4', 'pinia', or 'unknown'
   * @private
   */
  _detectStoreType(u) {
    return typeof u.commit == "function" && typeof u.dispatch == "function" ? "vuex4" : u._s && typeof u._s.get == "function" ? "pinia" : "unknown";
  }
  /**
   * Connect to Vuex 4 store
   * @param {Object} store - Vuex store instance
   * @private
   */
  _connectVuex(u) {
    u.subscribe((i, s) => {
      if (i.type.startsWith("vxg/")) {
        const h = i.type.replace("vxg/", "");
        this._handleStoreChange(h, i.payload, s);
      }
    }), this.commit = (i, s) => u.commit(`vxg/${i}`, s), this.dispatch = (i, s) => u.dispatch(`vxg/${i}`, s);
  }
  /**
   * Connect to Pinia store
   * @param {Object} pinia - Pinia instance
   * @private
   */
  _connectPinia(u) {
    const i = u._s.get("vxg");
    if (!i) {
      console.warn('[Vxg] Pinia store "vxg" not found. Create it using defineStore("vxg", ...)');
      return;
    }
    i.$subscribe((s, h) => {
      this._handleStoreChange(s.storeId, s, h);
    }), this.updateStore = (s) => {
      i.$patch(s);
    };
  }
  /**
   * Handle store changes and sync to Vxg state
   * @param {string} path - State path
   * @param {*} payload - Change payload
   * @param {Object} state - New state
   * @private
   */
  _handleStoreChange(u, i, s) {
    s.vxg && (this.state = { ...s.vxg });
  }
  /**
   * Sync Vxg state changes to store
   * @param {string} path - State path
   * @param {*} value - New value
   * @private
   */
  _syncToStore(u, i) {
    this._storeType === "vuex4" && this.commit ? this.commit("SET_VXG_STATE", { path: u, value: i }) : this._storeType === "pinia" && this.updateStore && this.updateStore({ [u]: i });
  }
  /**
   * Register a component
   * @param {string} name - Component name
   * @param {Object} component - Component definition
   */
  registerComponent(u, i) {
    this.cmp[u] = i;
  }
  /**
   * Clear memoization cache
   */
  clearCache() {
    this.memoizedAllow.clear();
  }
}
function _s(n = {}) {
  return {
    namespaced: !0,
    state: () => ({
      cmp: {},
      ent: {
        meta: {}
      },
      ...n
    }),
    mutations: {
      /**
       * Set component flags
       */
      SET_COMPONENT_FLAGS(u, { name: i, flags: s }) {
        u.cmp[i] || (u.cmp[i] = {}), Object.assign(u.cmp[i], s);
      },
      /**
       * Set nested state value
       */
      SET_VXG_STATE(u, { path: i, value: s }) {
        const h = i.split("."), r = h.pop();
        let p = u;
        for (const O of h)
          (!p[O] || typeof p[O] != "object") && (p[O] = {}), p = p[O];
        p[r] = s;
      },
      /**
       * Set entire state
       */
      SET_STATE(u, i) {
        Object.assign(u, i);
      },
      /**
       * Reset state to initial
       */
      RESET_STATE(u) {
        u.cmp = {}, u.ent = { meta: {} };
      }
    },
    actions: {
      /**
       * Update component flags
       */
      updateComponentFlags({ commit: u }, { name: i, flags: s }) {
        u("SET_COMPONENT_FLAGS", { name: i, flags: s });
      },
      /**
       * Update state by path
       */
      updateState({ commit: u }, { path: i, value: s }) {
        u("SET_VXG_STATE", { path: i, value: s });
      },
      /**
       * Reset all state
       */
      resetState({ commit: u }) {
        u("RESET_STATE");
      }
    },
    getters: {
      /**
       * Get component state by name
       */
      componentState: (u) => (i) => u.cmp[i] || {},
      /**
       * Get all component states
       */
      allComponents: (u) => u.cmp,
      /**
       * Get entity metadata
       */
      entityMeta: (u) => u.ent?.meta || {},
      /**
       * Get state by path
       */
      getByPath: (u) => (i) => {
        const s = i.split(".");
        let h = u;
        for (const r of s)
          if (h && typeof h == "object")
            h = h[r];
          else
            return;
        return h;
      }
    }
  };
}
function Ms(n, u = {}) {
  return n("vxg", {
    state: () => ({
      cmp: {},
      ent: {
        meta: {}
      },
      ...u
    }),
    getters: {
      /**
       * Get component state by name
       */
      componentState: (i) => (s) => i.cmp[s] || {},
      /**
       * Get all component states
       */
      allComponents: (i) => i.cmp,
      /**
       * Get entity metadata
       */
      entityMeta: (i) => i.ent?.meta || {},
      /**
       * Get state by path
       */
      getByPath: (i) => (s) => {
        const h = s.split(".");
        let r = i;
        for (const p of h)
          if (r && typeof r == "object")
            r = r[p];
          else
            return;
        return r;
      }
    },
    actions: {
      /**
       * Set component flags
       */
      setComponentFlags(i, s) {
        this.cmp[i] || (this.cmp[i] = {}), Object.assign(this.cmp[i], s);
      },
      /**
       * Set state by path
       */
      setByPath(i, s) {
        const h = i.split("."), r = h.pop();
        let p = this;
        for (const O of h)
          (!p[O] || typeof p[O] != "object") && (p[O] = {}), p = p[O];
        p[r] = s;
      },
      /**
       * Reset all state
       */
      resetState() {
        this.cmp = {}, this.ent = { meta: {} };
      }
    }
  });
}
class jn {
  constructor(u, i) {
    this.vxg = u, this.store = i, this.storeType = u._detectStoreType(i);
  }
  /**
   * Connect the store to Vxg
   */
  connect() {
    this.vxg.connectStore(this.store);
  }
  /**
   * Get component state
   */
  getComponentState(u) {
    return this.storeType === "vuex4" ? this.store.getters["vxg/componentState"](u) : this.storeType === "pinia" ? this.store.componentState(u) : {};
  }
  /**
   * Set component flags
   */
  setComponentFlags(u, i) {
    this.storeType === "vuex4" ? this.store.dispatch("vxg/updateComponentFlags", { name: u, flags: i }) : this.storeType === "pinia" && this.store.setComponentFlags(u, i);
  }
  /**
   * Get entire Vxg state
   */
  getVxgState() {
    return this.storeType === "vuex4" ? this.store.state.vxg : this.storeType === "pinia" ? {
      cmp: this.store.cmp,
      ent: this.store.ent
    } : { cmp: {}, ent: { meta: {} } };
  }
  /**
   * Get state by path
   */
  getState(u) {
    if (this.storeType === "vuex4")
      return this.store.getters["vxg/getByPath"](u);
    if (this.storeType === "pinia")
      return this.store.getByPath(u);
  }
}
const Nn = /* @__PURE__ */ Ve({
  __name: "BasicLed",
  props: {
    status: { default: "off" },
    spec: { default: () => ({}) },
    param: { default: () => ({}) }
  },
  setup(n) {
    const u = n, i = ce(() => {
      if (u.status && u.status !== "off")
        return u.status;
      if (u.spec?.status)
        return u.spec.status;
      if (u.spec?.field && u.param?.item) {
        const r = u.param.item[u.spec.field];
        if (r)
          return r;
      }
      return "off";
    }), s = ce(() => {
      switch (i.value) {
        case "on":
          return "green";
        case "warning":
          return "orange";
        case "error":
          return "red";
        case "off":
        default:
          return "grey";
      }
    }), h = ce(() => "mdi-circle");
    return (r, p) => (de(), Me(Ne, {
      color: s.value,
      icon: h.value
    }, null, 8, ["color", "icon"]));
  }
}), Re = (n, u) => {
  const i = n.__vccOpts || n;
  for (const [s, h] of u)
    i[s] = h;
  return i;
}, Pn = /* @__PURE__ */ Re(Nn, [["__scopeId", "data-v-da4e0332"]]), An = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pn
}, Symbol.toStringTag, { value: "Module" }));
var Xt = { exports: {} };
(function(n, u) {
  (function(i, s) {
    n.exports = s();
  })(qe, function() {
    var i = 1e3, s = 6e4, h = 36e5, r = "millisecond", p = "second", O = "minute", g = "hour", v = "day", d = "week", se = "month", fe = "quarter", ee = "year", ge = "date", oe = "Invalid Date", K = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, G = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, L = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function($) {
      var M = ["th", "st", "nd", "rd"], k = $ % 100;
      return "[" + $ + (M[(k - 20) % 10] || M[k] || M[0]) + "]";
    } }, P = function($, M, k) {
      var j = String($);
      return !j || j.length >= M ? $ : "" + Array(M + 1 - j.length).join(k) + $;
    }, T = { s: P, z: function($) {
      var M = -$.utcOffset(), k = Math.abs(M), j = Math.floor(k / 60), N = k % 60;
      return (M <= 0 ? "+" : "-") + P(j, 2, "0") + ":" + P(N, 2, "0");
    }, m: function $(M, k) {
      if (M.date() < k.date()) return -$(k, M);
      var j = 12 * (k.year() - M.year()) + (k.month() - M.month()), N = M.clone().add(j, se), c = k - N < 0, e = M.clone().add(j + (c ? -1 : 1), se);
      return +(-(j + (k - N) / (c ? N - e : e - N)) || 0);
    }, a: function($) {
      return $ < 0 ? Math.ceil($) || 0 : Math.floor($);
    }, p: function($) {
      return { M: se, y: ee, w: d, d: v, D: ge, h: g, m: O, s: p, ms: r, Q: fe }[$] || String($ || "").toLowerCase().replace(/s$/, "");
    }, u: function($) {
      return $ === void 0;
    } }, _ = "en", R = {};
    R[_] = L;
    var C = "$isDayjsObject", w = function($) {
      return $ instanceof x || !(!$ || !$[C]);
    }, z = function $(M, k, j) {
      var N;
      if (!M) return _;
      if (typeof M == "string") {
        var c = M.toLowerCase();
        R[c] && (N = c), k && (R[c] = k, N = c);
        var e = M.split("-");
        if (!N && e.length > 1) return $(e[0]);
      } else {
        var t = M.name;
        R[t] = M, N = t;
      }
      return !j && N && (_ = N), N || !j && _;
    }, J = function($, M) {
      if (w($)) return $.clone();
      var k = typeof M == "object" ? M : {};
      return k.date = $, k.args = arguments, new x(k);
    }, I = T;
    I.l = z, I.i = w, I.w = function($, M) {
      return J($, { locale: M.$L, utc: M.$u, x: M.$x, $offset: M.$offset });
    };
    var x = function() {
      function $(k) {
        this.$L = z(k.locale, null, !0), this.parse(k), this.$x = this.$x || k.x || {}, this[C] = !0;
      }
      var M = $.prototype;
      return M.parse = function(k) {
        this.$d = function(j) {
          var N = j.date, c = j.utc;
          if (N === null) return /* @__PURE__ */ new Date(NaN);
          if (I.u(N)) return /* @__PURE__ */ new Date();
          if (N instanceof Date) return new Date(N);
          if (typeof N == "string" && !/Z$/i.test(N)) {
            var e = N.match(K);
            if (e) {
              var t = e[2] - 1 || 0, y = (e[7] || "0").substring(0, 3);
              return c ? new Date(Date.UTC(e[1], t, e[3] || 1, e[4] || 0, e[5] || 0, e[6] || 0, y)) : new Date(e[1], t, e[3] || 1, e[4] || 0, e[5] || 0, e[6] || 0, y);
            }
          }
          return new Date(N);
        }(k), this.init();
      }, M.init = function() {
        var k = this.$d;
        this.$y = k.getFullYear(), this.$M = k.getMonth(), this.$D = k.getDate(), this.$W = k.getDay(), this.$H = k.getHours(), this.$m = k.getMinutes(), this.$s = k.getSeconds(), this.$ms = k.getMilliseconds();
      }, M.$utils = function() {
        return I;
      }, M.isValid = function() {
        return this.$d.toString() !== oe;
      }, M.isSame = function(k, j) {
        var N = J(k);
        return this.startOf(j) <= N && N <= this.endOf(j);
      }, M.isAfter = function(k, j) {
        return J(k) < this.startOf(j);
      }, M.isBefore = function(k, j) {
        return this.endOf(j) < J(k);
      }, M.$g = function(k, j, N) {
        return I.u(k) ? this[j] : this.set(N, k);
      }, M.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, M.valueOf = function() {
        return this.$d.getTime();
      }, M.startOf = function(k, j) {
        var N = this, c = !!I.u(j) || j, e = I.p(k), t = function(te, S) {
          var Z = I.w(N.$u ? Date.UTC(N.$y, S, te) : new Date(N.$y, S, te), N);
          return c ? Z : Z.endOf(v);
        }, y = function(te, S) {
          return I.w(N.toDate()[te].apply(N.toDate("s"), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(S)), N);
        }, f = this.$W, A = this.$M, U = this.$D, b = "set" + (this.$u ? "UTC" : "");
        switch (e) {
          case ee:
            return c ? t(1, 0) : t(31, 11);
          case se:
            return c ? t(1, A) : t(0, A + 1);
          case d:
            var m = this.$locale().weekStart || 0, D = (f < m ? f + 7 : f) - m;
            return t(c ? U - D : U + (6 - D), A);
          case v:
          case ge:
            return y(b + "Hours", 0);
          case g:
            return y(b + "Minutes", 1);
          case O:
            return y(b + "Seconds", 2);
          case p:
            return y(b + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, M.endOf = function(k) {
        return this.startOf(k, !1);
      }, M.$set = function(k, j) {
        var N, c = I.p(k), e = "set" + (this.$u ? "UTC" : ""), t = (N = {}, N[v] = e + "Date", N[ge] = e + "Date", N[se] = e + "Month", N[ee] = e + "FullYear", N[g] = e + "Hours", N[O] = e + "Minutes", N[p] = e + "Seconds", N[r] = e + "Milliseconds", N)[c], y = c === v ? this.$D + (j - this.$W) : j;
        if (c === se || c === ee) {
          var f = this.clone().set(ge, 1);
          f.$d[t](y), f.init(), this.$d = f.set(ge, Math.min(this.$D, f.daysInMonth())).$d;
        } else t && this.$d[t](y);
        return this.init(), this;
      }, M.set = function(k, j) {
        return this.clone().$set(k, j);
      }, M.get = function(k) {
        return this[I.p(k)]();
      }, M.add = function(k, j) {
        var N, c = this;
        k = Number(k);
        var e = I.p(j), t = function(A) {
          var U = J(c);
          return I.w(U.date(U.date() + Math.round(A * k)), c);
        };
        if (e === se) return this.set(se, this.$M + k);
        if (e === ee) return this.set(ee, this.$y + k);
        if (e === v) return t(1);
        if (e === d) return t(7);
        var y = (N = {}, N[O] = s, N[g] = h, N[p] = i, N)[e] || 1, f = this.$d.getTime() + k * y;
        return I.w(f, this);
      }, M.subtract = function(k, j) {
        return this.add(-1 * k, j);
      }, M.format = function(k) {
        var j = this, N = this.$locale();
        if (!this.isValid()) return N.invalidDate || oe;
        var c = k || "YYYY-MM-DDTHH:mm:ssZ", e = I.z(this), t = this.$H, y = this.$m, f = this.$M, A = N.weekdays, U = N.months, b = N.meridiem, m = function(S, Z, F, H) {
          return S && (S[Z] || S(j, c)) || F[Z].slice(0, H);
        }, D = function(S) {
          return I.s(t % 12 || 12, S, "0");
        }, te = b || function(S, Z, F) {
          var H = S < 12 ? "AM" : "PM";
          return F ? H.toLowerCase() : H;
        };
        return c.replace(G, function(S, Z) {
          return Z || function(F) {
            switch (F) {
              case "YY":
                return String(j.$y).slice(-2);
              case "YYYY":
                return I.s(j.$y, 4, "0");
              case "M":
                return f + 1;
              case "MM":
                return I.s(f + 1, 2, "0");
              case "MMM":
                return m(N.monthsShort, f, U, 3);
              case "MMMM":
                return m(U, f);
              case "D":
                return j.$D;
              case "DD":
                return I.s(j.$D, 2, "0");
              case "d":
                return String(j.$W);
              case "dd":
                return m(N.weekdaysMin, j.$W, A, 2);
              case "ddd":
                return m(N.weekdaysShort, j.$W, A, 3);
              case "dddd":
                return A[j.$W];
              case "H":
                return String(t);
              case "HH":
                return I.s(t, 2, "0");
              case "h":
                return D(1);
              case "hh":
                return D(2);
              case "a":
                return te(t, y, !0);
              case "A":
                return te(t, y, !1);
              case "m":
                return String(y);
              case "mm":
                return I.s(y, 2, "0");
              case "s":
                return String(j.$s);
              case "ss":
                return I.s(j.$s, 2, "0");
              case "SSS":
                return I.s(j.$ms, 3, "0");
              case "Z":
                return e;
            }
            return null;
          }(S) || e.replace(":", "");
        });
      }, M.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, M.diff = function(k, j, N) {
        var c, e = this, t = I.p(j), y = J(k), f = (y.utcOffset() - this.utcOffset()) * s, A = this - y, U = function() {
          return I.m(e, y);
        };
        switch (t) {
          case ee:
            c = U() / 12;
            break;
          case se:
            c = U();
            break;
          case fe:
            c = U() / 3;
            break;
          case d:
            c = (A - f) / 6048e5;
            break;
          case v:
            c = (A - f) / 864e5;
            break;
          case g:
            c = A / h;
            break;
          case O:
            c = A / s;
            break;
          case p:
            c = A / i;
            break;
          default:
            c = A;
        }
        return N ? c : I.a(c);
      }, M.daysInMonth = function() {
        return this.endOf(se).$D;
      }, M.$locale = function() {
        return R[this.$L];
      }, M.locale = function(k, j) {
        if (!k) return this.$L;
        var N = this.clone(), c = z(k, j, !0);
        return c && (N.$L = c), N;
      }, M.clone = function() {
        return I.w(this.$d, this);
      }, M.toDate = function() {
        return new Date(this.valueOf());
      }, M.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, M.toISOString = function() {
        return this.$d.toISOString();
      }, M.toString = function() {
        return this.$d.toUTCString();
      }, $;
    }(), q = x.prototype;
    return J.prototype = q, [["$ms", r], ["$s", p], ["$m", O], ["$H", g], ["$W", v], ["$M", se], ["$y", ee], ["$D", ge]].forEach(function($) {
      q[$[1]] = function(M) {
        return this.$g(M, $[0], $[1]);
      };
    }), J.extend = function($, M) {
      return $.$i || ($(M, x, J), $.$i = !0), J;
    }, J.locale = z, J.isDayjs = w, J.unix = function($) {
      return J(1e3 * $);
    }, J.en = R[_], J.Ls = R, J.p = {}, J;
  });
})(Xt);
var Dn = Xt.exports;
const tt = /* @__PURE__ */ Je(Dn);
var Qt = { exports: {} };
(function(n, u) {
  (function(i, s) {
    n.exports = s();
  })(qe, function() {
    return function(i, s, h) {
      i = i || {};
      var r = s.prototype, p = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function O(v, d, se, fe) {
        return r.fromToBase(v, d, se, fe);
      }
      h.en.relativeTime = p, r.fromToBase = function(v, d, se, fe, ee) {
        for (var ge, oe, K, G = se.$locale().relativeTime || p, L = i.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], P = L.length, T = 0; T < P; T += 1) {
          var _ = L[T];
          _.d && (ge = fe ? h(v).diff(se, _.d, !0) : se.diff(v, _.d, !0));
          var R = (i.rounding || Math.round)(Math.abs(ge));
          if (K = ge > 0, R <= _.r || !_.r) {
            R <= 1 && T > 0 && (_ = L[T - 1]);
            var C = G[_.l];
            ee && (R = ee("" + R)), oe = typeof C == "string" ? C.replace("%d", R) : C(R, d, _.l, K);
            break;
          }
        }
        if (d) return oe;
        var w = K ? G.future : G.past;
        return typeof w == "function" ? w(oe) : w.replace("%s", oe);
      }, r.to = function(v, d) {
        return O(v, d, this, !0);
      }, r.from = function(v, d) {
        return O(v, d, this);
      };
      var g = function(v) {
        return v.$u ? h.utc() : h();
      };
      r.toNow = function(v) {
        return this.to(g(this), v);
      }, r.fromNow = function(v) {
        return this.from(g(this), v);
      };
    };
  });
})(Qt);
var Bn = Qt.exports;
const Vn = /* @__PURE__ */ Je(Bn);
var en = { exports: {} };
(function(n, u) {
  (function(i, s) {
    n.exports = s();
  })(qe, function() {
    var i = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, s = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, h = /\d/, r = /\d\d/, p = /\d\d?/, O = /\d*[^-_:/,()\s\d]+/, g = {}, v = function(K) {
      return (K = +K) + (K > 68 ? 1900 : 2e3);
    }, d = function(K) {
      return function(G) {
        this[K] = +G;
      };
    }, se = [/[+-]\d\d:?(\d\d)?|Z/, function(K) {
      (this.zone || (this.zone = {})).offset = function(G) {
        if (!G || G === "Z") return 0;
        var L = G.match(/([+-]|\d\d)/g), P = 60 * L[1] + (+L[2] || 0);
        return P === 0 ? 0 : L[0] === "+" ? -P : P;
      }(K);
    }], fe = function(K) {
      var G = g[K];
      return G && (G.indexOf ? G : G.s.concat(G.f));
    }, ee = function(K, G) {
      var L, P = g.meridiem;
      if (P) {
        for (var T = 1; T <= 24; T += 1) if (K.indexOf(P(T, 0, G)) > -1) {
          L = T > 12;
          break;
        }
      } else L = K === (G ? "pm" : "PM");
      return L;
    }, ge = { A: [O, function(K) {
      this.afternoon = ee(K, !1);
    }], a: [O, function(K) {
      this.afternoon = ee(K, !0);
    }], Q: [h, function(K) {
      this.month = 3 * (K - 1) + 1;
    }], S: [h, function(K) {
      this.milliseconds = 100 * +K;
    }], SS: [r, function(K) {
      this.milliseconds = 10 * +K;
    }], SSS: [/\d{3}/, function(K) {
      this.milliseconds = +K;
    }], s: [p, d("seconds")], ss: [p, d("seconds")], m: [p, d("minutes")], mm: [p, d("minutes")], H: [p, d("hours")], h: [p, d("hours")], HH: [p, d("hours")], hh: [p, d("hours")], D: [p, d("day")], DD: [r, d("day")], Do: [O, function(K) {
      var G = g.ordinal, L = K.match(/\d+/);
      if (this.day = L[0], G) for (var P = 1; P <= 31; P += 1) G(P).replace(/\[|\]/g, "") === K && (this.day = P);
    }], w: [p, d("week")], ww: [r, d("week")], M: [p, d("month")], MM: [r, d("month")], MMM: [O, function(K) {
      var G = fe("months"), L = (fe("monthsShort") || G.map(function(P) {
        return P.slice(0, 3);
      })).indexOf(K) + 1;
      if (L < 1) throw new Error();
      this.month = L % 12 || L;
    }], MMMM: [O, function(K) {
      var G = fe("months").indexOf(K) + 1;
      if (G < 1) throw new Error();
      this.month = G % 12 || G;
    }], Y: [/[+-]?\d+/, d("year")], YY: [r, function(K) {
      this.year = v(K);
    }], YYYY: [/\d{4}/, d("year")], Z: se, ZZ: se };
    function oe(K) {
      var G, L;
      G = K, L = g && g.formats;
      for (var P = (K = G.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(J, I, x) {
        var q = x && x.toUpperCase();
        return I || L[x] || i[x] || L[q].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function($, M, k) {
          return M || k.slice(1);
        });
      })).match(s), T = P.length, _ = 0; _ < T; _ += 1) {
        var R = P[_], C = ge[R], w = C && C[0], z = C && C[1];
        P[_] = z ? { regex: w, parser: z } : R.replace(/^\[|\]$/g, "");
      }
      return function(J) {
        for (var I = {}, x = 0, q = 0; x < T; x += 1) {
          var $ = P[x];
          if (typeof $ == "string") q += $.length;
          else {
            var M = $.regex, k = $.parser, j = J.slice(q), N = M.exec(j)[0];
            k.call(I, N), J = J.replace(N, "");
          }
        }
        return function(c) {
          var e = c.afternoon;
          if (e !== void 0) {
            var t = c.hours;
            e ? t < 12 && (c.hours += 12) : t === 12 && (c.hours = 0), delete c.afternoon;
          }
        }(I), I;
      };
    }
    return function(K, G, L) {
      L.p.customParseFormat = !0, K && K.parseTwoDigitYear && (v = K.parseTwoDigitYear);
      var P = G.prototype, T = P.parse;
      P.parse = function(_) {
        var R = _.date, C = _.utc, w = _.args;
        this.$u = C;
        var z = w[1];
        if (typeof z == "string") {
          var J = w[2] === !0, I = w[3] === !0, x = J || I, q = w[2];
          I && (q = w[2]), g = this.$locale(), !J && q && (g = L.Ls[q]), this.$d = function(j, N, c, e) {
            try {
              if (["x", "X"].indexOf(N) > -1) return new Date((N === "X" ? 1e3 : 1) * j);
              var t = oe(N)(j), y = t.year, f = t.month, A = t.day, U = t.hours, b = t.minutes, m = t.seconds, D = t.milliseconds, te = t.zone, S = t.week, Z = /* @__PURE__ */ new Date(), F = A || (y || f ? 1 : Z.getDate()), H = y || Z.getFullYear(), Y = 0;
              y && !f || (Y = f > 0 ? f - 1 : Z.getMonth());
              var ae, re = U || 0, V = b || 0, ne = m || 0, le = D || 0;
              return te ? new Date(Date.UTC(H, Y, F, re, V, ne, le + 60 * te.offset * 1e3)) : c ? new Date(Date.UTC(H, Y, F, re, V, ne, le)) : (ae = new Date(H, Y, F, re, V, ne, le), S && (ae = e(ae).week(S).toDate()), ae);
            } catch {
              return /* @__PURE__ */ new Date("");
            }
          }(R, z, C, L), this.init(), q && q !== !0 && (this.$L = this.locale(q).$L), x && R != this.format(z) && (this.$d = /* @__PURE__ */ new Date("")), g = {};
        } else if (z instanceof Array) for (var $ = z.length, M = 1; M <= $; M += 1) {
          w[1] = z[M - 1];
          var k = L.apply(this, w);
          if (k.isValid()) {
            this.$d = k.$d, this.$L = k.$L, this.init();
            break;
          }
          M === $ && (this.$d = /* @__PURE__ */ new Date(""));
        }
        else T.call(this, _);
      };
    };
  });
})(en);
var Rn = en.exports;
const Fn = /* @__PURE__ */ Je(Rn);
var tn = { exports: {} };
(function(n, u) {
  (function(i, s) {
    n.exports = s();
  })(qe, function() {
    var i = "minute", s = /[+-]\d\d(?::?\d\d)?/g, h = /([+-]|\d\d)/g;
    return function(r, p, O) {
      var g = p.prototype;
      O.utc = function(oe) {
        var K = { date: oe, utc: !0, args: arguments };
        return new p(K);
      }, g.utc = function(oe) {
        var K = O(this.toDate(), { locale: this.$L, utc: !0 });
        return oe ? K.add(this.utcOffset(), i) : K;
      }, g.local = function() {
        return O(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var v = g.parse;
      g.parse = function(oe) {
        oe.utc && (this.$u = !0), this.$utils().u(oe.$offset) || (this.$offset = oe.$offset), v.call(this, oe);
      };
      var d = g.init;
      g.init = function() {
        if (this.$u) {
          var oe = this.$d;
          this.$y = oe.getUTCFullYear(), this.$M = oe.getUTCMonth(), this.$D = oe.getUTCDate(), this.$W = oe.getUTCDay(), this.$H = oe.getUTCHours(), this.$m = oe.getUTCMinutes(), this.$s = oe.getUTCSeconds(), this.$ms = oe.getUTCMilliseconds();
        } else d.call(this);
      };
      var se = g.utcOffset;
      g.utcOffset = function(oe, K) {
        var G = this.$utils().u;
        if (G(oe)) return this.$u ? 0 : G(this.$offset) ? se.call(this) : this.$offset;
        if (typeof oe == "string" && (oe = function(_) {
          _ === void 0 && (_ = "");
          var R = _.match(s);
          if (!R) return null;
          var C = ("" + R[0]).match(h) || ["-", 0, 0], w = C[0], z = 60 * +C[1] + +C[2];
          return z === 0 ? 0 : w === "+" ? z : -z;
        }(oe), oe === null)) return this;
        var L = Math.abs(oe) <= 16 ? 60 * oe : oe;
        if (L === 0) return this.utc(K);
        var P = this.clone();
        if (K) return P.$offset = L, P.$u = !1, P;
        var T = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
        return (P = this.local().add(L + T, i)).$offset = L, P.$x.$localOffset = T, P;
      };
      var fe = g.format;
      g.format = function(oe) {
        var K = oe || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return fe.call(this, K);
      }, g.valueOf = function() {
        var oe = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * oe;
      }, g.isUTC = function() {
        return !!this.$u;
      }, g.toISOString = function() {
        return this.toDate().toISOString();
      }, g.toString = function() {
        return this.toDate().toUTCString();
      };
      var ee = g.toDate;
      g.toDate = function(oe) {
        return oe === "s" && this.$offset ? O(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : ee.call(this);
      };
      var ge = g.diff;
      g.diff = function(oe, K, G) {
        if (oe && this.$u === oe.$u) return ge.call(this, oe, K, G);
        var L = this.local(), P = O(oe).local();
        return ge.call(L, P, K, G);
      };
    };
  });
})(tn);
var Ln = tn.exports;
const Yn = /* @__PURE__ */ Je(Ln);
tt.extend(Vn);
tt.extend(Fn);
tt.extend(Yn);
function Un() {
  return tt().year();
}
const Hn = {
  key: 0,
  class: "ml-2"
}, zn = /* @__PURE__ */ Ve({
  __name: "BasicFoot",
  props: {
    links: { default: () => [] },
    version: { default: "" },
    copyright: { default: "© PlantQuest" }
  },
  emits: ["linkClick"],
  setup(n, { emit: u }) {
    const i = u, s = et(), h = ce(() => Un()), r = (p) => {
      p.route ? s.push(p.route) : p.href && window.open(p.href, "_blank"), i("linkClick", p);
    };
    return (p, O) => (de(), Me(dn, {
      app: "",
      class: "basic-footer"
    }, {
      default: pe(() => [
        ie(qt, null, {
          default: pe(() => [
            ie(Ze, null, {
              default: pe(() => [
                (de(!0), we(Fe, null, Dt(n.links, (g) => (de(), Me(He, {
                  key: g.id,
                  variant: "text",
                  onClick: (v) => r(g)
                }, {
                  default: pe(() => [
                    Te(Oe(g.label), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick"]))), 128))
              ]),
              _: 1
            }),
            ie(Ze, { class: "text-right" }, {
              default: pe(() => [
                De("span", null, Oe(n.copyright) + " " + Oe(h.value), 1),
                n.version ? (de(), we("span", Hn, "v" + Oe(n.version), 1)) : _e("", !0)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }));
  }
}), Gn = /* @__PURE__ */ Re(zn, [["__scopeId", "data-v-b418d0f4"]]), qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gn
}, Symbol.toStringTag, { value: "Module" })), Jn = /* @__PURE__ */ Ve({
  __name: "BasicFieldPick",
  props: {
    field: { default: () => ({ name: "", title: "", kind: {} }) },
    param: { default: () => ({ item: {} }) },
    modelValue: { default: void 0 },
    label: { default: "" },
    disabled: { type: Boolean, default: !1 },
    multiple: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(n, { expose: u, emit: i }) {
    const s = n, h = i, r = Le(), p = ke(!1), O = ce(() => s.param.item || {}), g = ce(() => s.field.custom || {}), v = ce(() => g.value.allow || (() => !0)), d = ce(() => r?.state?.current_user || null), se = (L) => g.value.field?.[L.name]?.filter || (() => !0), fe = ce(() => {
      const L = s.field;
      let T = (L.kind ? Object.entries(L.kind) : []).filter(se(L)).map(([_, R]) => ({
        text: R.title,
        value: _
      }));
      return d.value && (d.value.profile === "sea" && (T = T.filter((_) => _.value !== "gea")), d.value.profile === "ob" && (T = T.filter(
        (_) => _.value !== "gea" && _.value !== "sea"
      ))), T;
    }), ee = ce(() => fe.value), ge = ce(() => s.label || s.field.title || ""), oe = ce(() => s.disabled || s.field.readonly || !v.value("edit")), K = (L) => {
      s.field && O.value && (O.value[s.field.name] = L), h("update:modelValue", L), h("change", L);
    };
    return u({
      allow: (...L) => v.value(...L)
    }), (L, P) => (de(), Me(Wt, {
      "model-value": n.modelValue,
      items: ee.value,
      label: ge.value,
      disabled: oe.value,
      multiple: n.multiple,
      loading: p.value,
      "item-title": "text",
      "item-value": "value",
      variant: "outlined",
      "onUpdate:modelValue": K
    }, null, 8, ["model-value", "items", "label", "disabled", "multiple", "loading"]));
  }
}), Wn = /* @__PURE__ */ Re(Jn, [["__scopeId", "data-v-31a0cfbc"]]), Zn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wn
}, Symbol.toStringTag, { value: "Module" })), Kn = {
  props: {
    user: Object
  },
  data() {
    return {
      state: "empty",
      valid: !1,
      email: "",
      password: "",
      emailRules: [
        (n) => !!n || "E-mail is required",
        (n) => /.+@.+\..+/.test(n) || "E-mail must be valid"
      ],
      passwordRules: [
        (n) => !!n || "Password is required"
      ],
      stateMessage: {
        signin: "Signing in...",
        fail: "Signin details are incorrect. Please try again."
      }
    };
  },
  created() {
  },
  computed: {},
  methods: {
    signin() {
      this.state = "signin", this.$store.dispatch("signin_user", {
        email: this.email,
        password: this.password
      }).then(({ ok: n }) => {
        n || (this.state = "fail");
      });
    }
  }
};
function Xn(n, u, i, s, h, r) {
  return de(), we("div", null, [
    i.user ? rn(n.$slots, "default", { key: 0 }) : (de(), Me(Jt, { key: 1 }, {
      default: pe(() => [
        ie(qt, null, {
          default: pe(() => [
            ie(Ze),
            ie(Ze, null, {
              default: pe(() => [
                ie(pn, { xstyle: "max-width:40vw" }, {
                  default: pe(() => [
                    ie(fn, null, {
                      default: pe(() => [...u[3] || (u[3] = [
                        Te("Sign In", -1)
                      ])]),
                      _: 1
                    }),
                    ie(hn, {
                      ref: "form",
                      modelValue: h.valid,
                      "onUpdate:modelValue": u[2] || (u[2] = (p) => h.valid = p),
                      "lazy-validation": ""
                    }, {
                      default: pe(() => [
                        ie(Lt, null, {
                          default: pe(() => [
                            ie(Yt, {
                              modelValue: h.email,
                              "onUpdate:modelValue": u[0] || (u[0] = (p) => h.email = p),
                              rules: h.emailRules,
                              label: "Email",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "rules"]),
                            ie(Yt, {
                              modelValue: h.password,
                              "onUpdate:modelValue": u[1] || (u[1] = (p) => h.password = p),
                              rules: h.passwordRules,
                              label: "Password",
                              required: "",
                              type: "password",
                              outlined: ""
                            }, null, 8, ["modelValue", "rules"])
                          ]),
                          _: 1
                        }),
                        h.state != "empty" ? (de(), Me(Lt, { key: 0 }, {
                          default: pe(() => [
                            Te(Oe(h.stateMessage[h.state]), 1)
                          ]),
                          _: 1
                        })) : _e("", !0),
                        ie(mn, null, {
                          default: pe(() => [
                            ie(Vt),
                            ie(He, {
                              disabled: !h.valid,
                              onClick: r.signin
                            }, {
                              default: pe(() => [...u[4] || (u[4] = [
                                Te(" Sign In ", -1)
                              ])]),
                              _: 1
                            }, 8, ["disabled", "onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            ie(Ze)
          ]),
          _: 1
        })
      ]),
      _: 1
    }))
  ]);
}
const Qn = /* @__PURE__ */ Re(Kn, [["render", Xn]]), er = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qn
}, Symbol.toStringTag, { value: "Module" })), tr = {
  props: ["logo"],
  data() {
    return {
      spec: this.$model.main.app.web
    };
  },
  created() {
    console.log("BasicAdmin side", this.spec.parts);
  },
  computed: {
    showSide() {
      return this.$store.state.vxg.cmp.BasicSide.show;
    }
  },
  methods: {
    action(n, u) {
      this.$emit("action", { part: n, event: u });
    }
  }
};
function nr(n, u, i, s, h, r) {
  const p = Ge("vxg-basic-head"), O = Ge("vxg-basic-side"), g = Ge("vxg-basic-main"), v = Ge("vxg-basic-foot");
  return de(), Me(gn, { id: "app" }, {
    default: pe(() => [
      ie(p, {
        spec: h.spec.parts.head,
        logo: i.logo,
        onAction: u[0] || (u[0] = (d) => r.action("BasicHead", d))
      }, null, 8, ["spec", "logo"]),
      r.showSide ? (de(), Me(O, {
        key: 0,
        spec: h.spec.parts.side,
        logo: i.logo,
        onAction: u[1] || (u[1] = (d) => r.action("BasicSide", d))
      }, null, 8, ["spec", "logo"])) : _e("", !0),
      ie(g, {
        spec: h.spec.parts.main
      }, null, 8, ["spec"]),
      ie(v, {
        spec: h.spec.parts.foot
      }, null, 8, ["spec"])
    ]),
    _: 1
  });
}
const rr = /* @__PURE__ */ Re(tr, [["render", nr]]), sr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rr
}, Symbol.toStringTag, { value: "Module" }));
function ar() {
  const n = Le(), u = ce(
    () => n.state.vxg?.cmp?.BasicSide?.show || !1
  ), i = ce(
    () => n.state.vxg?.cmp?.BasicSide?.content || null
  ), s = (g) => {
    const v = g !== void 0 ? g : !u.value;
    return n.dispatch("set_cmp_flags", {
      name: "BasicSide",
      flags: { show: v }
    });
  }, h = () => n.dispatch("set_cmp_flags", {
    name: "BasicSide",
    flags: { show: !0 }
  }), r = () => n.dispatch("set_cmp_flags", {
    name: "BasicSide",
    flags: { show: !1 }
  });
  return {
    isOpen: u,
    content: i,
    toggle: s,
    open: h,
    close: r,
    setContent: (g) => n.dispatch("set_cmp_flags", {
      name: "BasicSide",
      flags: { content: g }
    }),
    handleResize: () => {
      window.innerWidth < 960 && u.value && r();
    }
  };
}
function or() {
  const n = Le(), u = ke(""), i = ke(""), s = ke([]), h = ke([]), r = ke([]), p = ke([]), O = ce(
    () => n.state.showSearch2 || !1
  );
  return {
    search: u,
    search2: i,
    showSearch2: O,
    tagItems: s,
    tagItems2: h,
    items: r,
    items2: p,
    toggleSearch2: () => {
      n.commit("toggleSearch2");
    },
    toggleExpansion: () => {
      n.state.showExpansion = !n.state.showExpansion;
    },
    clearFilter: () => {
      u.value = "", i.value = "", s.value = [], h.value = [], n.dispatch("vxg_trigger_clear"), n.dispatch("setLastTrackedSearch", null), n.dispatch("clear_path_data"), n.commit("clear_path_data"), n.commit("clearMatchingConnectorData"), O.value && n.commit("toggleSearch2");
    },
    reverseInputs: () => {
      const ee = u.value;
      u.value = i.value, i.value = ee;
      const ge = s.value;
      s.value = h.value, h.value = ge;
    },
    loadAssets: () => new Promise((ee) => {
      const ge = {
        assets: []
      };
      n.dispatch("vxg_get_assets", ge).then(() => {
        r.value = ge.assets, ee(ge.assets);
      }).catch(() => {
        ee([]);
      });
    })
  };
}
function ir() {
  const n = Le(), u = ke([]), i = ke(0), s = ke([]), h = ke(null), r = ke([]), p = ce(() => s.value.length > 1), O = ce(
    () => u.value[i.value] || null
  ), g = (G) => new Promise((L, P) => {
    if (!G || !Array.isArray(G) || G.length === 0) {
      console.warn("Invalid or empty pathData"), s.value = [], u.value = [], L();
      return;
    }
    try {
      h.value = G[0];
      const T = d(h.value);
      r.value = T.map((_) => _.map), fe(T).then((_) => {
        s.value = _, u.value = _.map((R, C) => ({
          id: `stage-${C}`,
          map: R.map,
          msg: R.msg,
          type: "stage"
        })), L();
      }).catch((_) => {
        console.error("Error generating route steps:", _), P(_);
      });
    } catch (T) {
      console.error("Error parsing pathData:", T), s.value = [], u.value = [], P(T);
    }
  }), v = (G) => {
    const L = G.split(","), P = L[0], T = L[1];
    return { id: P, type: T };
  }, d = (G) => !G || !Array.isArray(G) ? [] : G.map((L) => {
    const P = L.detail.split(",");
    return {
      id: P[0],
      type: P[1],
      map: L.index,
      x: parseFloat(P[3]),
      y: parseFloat(P[4])
    };
  }), se = (G) => G.filter((L, P, T) => {
    if (L.type !== "Connector") return !0;
    const _ = T[P - 1], R = T[P + 1];
    return !!(_ && _.type === "Connector" || R && R.type === "Connector");
  }), fe = (G) => new Promise((L) => {
    let P = G;
    const T = [], _ = 0;
    for (let R = 0; R < P.length - _; R++)
      if (P[R].type === "Connector") {
        let C = "Follow route to stairs and proceed to ", w = R;
        for (; w < P.length - 1 && P[w + 1].type === "Connector"; )
          w++;
        w < P.length - 0 && (C += ee(P[w]), T.push({
          msg: C,
          map: P[R].map - 1
        })), R = w;
      }
    T.length > 0 && T.push({
      msg: "Proceed to your destination.",
      map: P[P.length - 1].map - 1
    }), L(T);
  }), ee = (G) => {
    const L = n.state.main_asset;
    if (!L || !Array.isArray(L))
      return "@";
    const P = L.filter(
      (R) => !isNaN(parseInt(R.map)) && parseInt(R.map) === G.map - 1
    );
    if (P.length === 0)
      return "@";
    let T = P[0], _ = 1 / 0;
    for (const R of P) {
      const C = Math.sqrt(
        Math.pow(R.xco - G.x, 2) + Math.pow(R.yco - G.y, 2)
      );
      C < _ && (T = R, _ = C);
    }
    return T?.level || "@";
  };
  return {
    // State
    stages: u,
    activeStage: i,
    routeMassages: s,
    mapValues: r,
    // Computed
    hasStages: p,
    currentStageData: O,
    // Methods
    parsePathData: g,
    parseLine: v,
    parseLines: d,
    filterConnectors: se,
    getRouteSteps: fe,
    getMapName: ee,
    selectStage: (G) => {
      console.log(`🔄 useNavStages.selectStage: Setting activeStage from ${i.value} to ${G}`), i.value = G, n.commit("setCurrentStage", G + 1), console.log(`✅ useNavStages.selectStage: activeStage is now ${i.value}`);
    },
    getSelectedStage: () => i.value,
    clearStages: () => {
      u.value = [], s.value = [], i.value = 0, h.value = null, r.value = [];
    }
  };
}
function lr() {
  const n = Le(), u = (p) => Promise.resolve().then(() => {
    const O = p + 1;
    return n.commit("setCurrentStage", O), n.dispatch("setCurrentStage", O);
  }).then(() => {
    console.log("Route synced with stage:", p);
  }).catch((O) => {
    throw console.error("Error syncing route with stage:", O), O;
  }), i = (p, O, g) => {
    console.log("__trigger_select_value", p);
    const v = O.findIndex((d) => d.map === p);
    v !== -1 ? (g(v), console.log("__activeStage updated to", v)) : g(0);
  }, s = (p, O) => {
    console.log("Current Stage changed:", p), O(p - 1), n.dispatch("setCurrentStage", p).catch((g) => {
      console.error("Error dispatching setCurrentStage:", g);
    });
  };
  return {
    syncRouteWithStage: u,
    handleTriggerSelect: i,
    handleStageChange: s,
    setupStageWatchers: (p, O) => {
      Ce(
        () => n.state.trigger?.select?.value,
        (g) => {
          g !== void 0 && p.value && i(g, p.value, O);
        }
      ), Ce(
        () => n.state.currentStage,
        (g) => {
          g !== void 0 && s(g, O);
        }
      );
    },
    emitStageSelected: (p) => {
      console.log("Stage selected with map:", p);
    }
  };
}
const cr = ["data-active", "data-index"], ur = { class: "stage__title" }, dr = {
  key: 0,
  class: "stage__check"
}, pr = { class: "stage__message" }, fr = /* @__PURE__ */ Ve({
  __name: "NavStageItem",
  props: {
    stage: {},
    index: {},
    isActive: { type: Boolean }
  },
  emits: ["select"],
  setup(n, { emit: u }) {
    const i = n, s = u, h = () => {
      console.log(`🎯 Stage ${i.index + 1} clicked, isActive=${i.isActive}, will become active`), s("select"), setTimeout(() => {
        console.log(`✨ Stage ${i.index + 1} after click: isActive=${i.isActive}`);
      }, 200);
    };
    return (r, p) => (de(), we("div", {
      class: zt(["stage", { "stage--active": n.isActive }]),
      "data-active": n.isActive,
      "data-index": n.index,
      onClick: h
    }, [
      De("h3", ur, [
        Te(" STAGE " + Oe(n.index + 1) + " ", 1),
        n.isActive ? (de(), we("span", dr, " ✓")) : _e("", !0)
      ]),
      De("p", pr, Oe(n.stage.msg), 1)
    ], 10, cr));
  }
}), nn = /* @__PURE__ */ Re(fr, [["__scopeId", "data-v-da0fd9ea"]]), mr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nn
}, Symbol.toStringTag, { value: "Module" })), hr = /* @__PURE__ */ Ve({
  __name: "NavStagesExpansion",
  props: {
    expanded: {},
    stages: {},
    activeStage: {}
  },
  emits: ["update:expanded", "stage-select", "toggle-icon"],
  setup(n, { emit: u }) {
    const i = n, s = u, h = ce({
      get: () => i.expanded,
      set: (O) => s("update:expanded", O)
    });
    ce(
      () => h.value !== void 0 ? "nav_in.svg" : "nav_out.svg"
    );
    const r = () => {
      s("toggle-icon");
    }, p = (O) => {
      console.log(`📍 NavStagesExpansion: Stage ${O} selected, activeStage=${i.activeStage}`), s("stage-select", O);
    };
    return Ce(() => i.expanded, (O) => {
    }), Ce(() => i.activeStage, (O) => {
      console.log(`🎨 NavStagesExpansion: activeStage changed to ${O}`);
    }), (O, g) => (de(), Me(vn, {
      modelValue: h.value,
      "onUpdate:modelValue": g[0] || (g[0] = (v) => h.value = v),
      class: "mb-12"
    }, {
      default: pe(() => [
        ie(xn, null, {
          default: pe(() => [
            ie(bn, {
              style: { "background-color": "#DCEEEF", "border-bottom-left-radius": "10px", "border-bottom-right-radius": "10px" },
              onClick: r
            }, {
              actions: pe(() => [
                h.value !== void 0 ? (de(), Me(Ne, { key: 0 }, {
                  default: pe(() => [...g[1] || (g[1] = [
                    Te("mdi-chevron-up", -1)
                  ])]),
                  _: 1
                })) : (de(), Me(Ne, { key: 1 }, {
                  default: pe(() => [...g[2] || (g[2] = [
                    Te("mdi-chevron-down", -1)
                  ])]),
                  _: 1
                }))
              ]),
              default: pe(() => [
                ie(Ne, { class: "mr-2" }, {
                  default: pe(() => [...g[3] || (g[3] = [
                    Te("mdi-layers", -1)
                  ])]),
                  _: 1
                }),
                g[4] || (g[4] = De("h4", { style: { width: "300px", "font-size": "14px", "padding-left": "2px" } }, " THIS ROUTE CONTAINS MULTIPLE LEVELS ", -1))
              ]),
              _: 1
            }),
            ie(kn, { style: { padding: "10px 0 10px 0", "background-color": "#DCEEEF" } }, {
              default: pe(() => [
                (de(!0), we(Fe, null, Dt(n.stages, (v, d) => (de(), Me(nn, {
                  key: v.id || `stage-${d}`,
                  stage: v,
                  index: d,
                  "is-active": n.activeStage === d,
                  onSelect: (se) => p(d)
                }, null, 8, ["stage", "index", "is-active", "onSelect"]))), 128))
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["modelValue"]));
  }
}), gr = {
  key: 0,
  class: "basic-nav-stages",
  style: { position: "absolute", "z-index": "99", height: "300px", left: "7px", top: "250px", "max-width": "calc(100% - 11px)" }
}, vr = /* @__PURE__ */ Ve({
  __name: "BasicNavStages",
  emits: ["stageSelected"],
  setup(n, { emit: u }) {
    const i = Le(), {
      stages: s,
      activeStage: h,
      routeMassages: r,
      hasStages: p,
      parsePathData: O,
      selectStage: g,
      clearStages: v
    } = ir(), {
      syncRouteWithStage: d,
      handleTriggerSelect: se,
      handleStageChange: fe
    } = lr(), ee = ke(void 0);
    ke(!0), ce(() => i.state.pathData), ce(() => i.state.currentStage), ce(() => i.state.trigger?.select?.value);
    const ge = u, oe = (G) => {
      console.log(`🚀 BasicNavStages.handleStageSelect: Stage ${G} selected, current activeStage=${h.value}`);
      const P = s.value[G]?.map;
      g(G), console.log(`📊 BasicNavStages.handleStageSelect: After selectStageComposable, activeStage=${h.value}`), d(G).catch((T) => {
        console.error("Error syncing route:", T);
      }), P !== void 0 && ge("stageSelected", P);
    }, K = () => {
      console.log("Icon toggled, expanded:", ee.value);
    };
    return Ce(
      () => i.state.pathData,
      (G) => {
        if (!G || !G.asset123) {
          console.warn("PathData is undefined or missing asset123"), v();
          return;
        }
        console.log("pathData changed, parsing...", G.asset123), O(G.asset123).then(() => (console.log("Path data parsed successfully, stages:", s.value.length), i.dispatch("set_path_data", { pathDetails: G.asset123 }))).then((L) => {
          console.log("Dispatch result:", L);
        }).catch((L) => {
          console.error("Error handling pathData:", L);
        });
      },
      { deep: !0 }
    ), Ce(
      () => i.state.currentStage,
      (G) => {
        G !== void 0 && G > 0 && fe(G, (L) => {
          h.value = L;
        });
      }
    ), Ce(
      () => i.state.trigger?.select?.value,
      (G) => {
        G !== void 0 && r.value.length > 0 && se(
          G,
          r.value,
          (L) => {
            h.value = L;
          }
        );
      }
    ), Ce(ee, (G) => {
      console.log("Expansion state changed:", G);
    }), Bt(() => {
      console.log("BasicNavStages mounted, currentStage:", i.state.currentStage), i.state.pathData?.asset123 && O(i.state.pathData.asset123).catch((G) => {
        console.error("Error parsing initial pathData:", G);
      });
    }), Qe(() => {
      console.log("BasicNavStages unmounted");
    }), (G, L) => ue(p) ? (de(), we("div", gr, [
      ie(hr, {
        expanded: ee.value,
        "onUpdate:expanded": L[0] || (L[0] = (P) => ee.value = P),
        stages: ue(s),
        "active-stage": ue(h),
        onStageSelect: oe,
        onToggleIcon: K
      }, null, 8, ["expanded", "stages", "active-stage"])
    ])) : _e("", !0);
  }
}), xr = {
  class: "d-flex justify-space-between",
  style: { background: "var(--vxg-header-bg, #1976d2)", padding: "12px" }
}, br = ["innerHTML"], kr = {
  key: 1,
  style: { position: "relative", padding: "0" }
}, yr = { style: { position: "absolute", top: "8px", left: "16px", "z-index": "10", "pointer-events": "auto" } }, Sr = ["src"], wr = {
  key: 0,
  style: { position: "absolute", top: "8px", left: "16px", "z-index": "5", "pointer-events": "none" }
}, _r = ["src"], Mr = ["src"], Tr = {
  key: 2,
  style: { position: "relative", height: "1px", "background-color": "#4CAF50", margin: "-6px 48px 6px 48px", "z-index": "4" }
}, Cr = {
  key: 3,
  style: { position: "relative", "z-index": "1", "margin-top": "0", "margin-left": "48px" }
}, $r = { key: 4 }, Or = {
  key: 5,
  style: { color: "#000", "background-color": "rgb(220 238 239)", height: "33px", width: "calc(100% - 8px)", left: "4px", "padding-top": "3px", "padding-left": "13px", position: "absolute", "z-index": "9999", top: "185px" }
}, Er = { key: 0 }, Ir = { key: 1 }, jr = {
  class: "Menu Items",
  style: { "margin-top": "15px", height: "calc(100vh - 332px)" }
}, Nr = {
  key: 0,
  class: "router_items"
}, Pt = "/", Ts = /* @__PURE__ */ Ve({
  __name: "BasicSide",
  props: {
    spec: {},
    logo: { default: "" },
    location: { default: "left" }
  },
  emits: ["action"],
  setup(n, { emit: u }) {
    const i = n, s = Le(), h = et(), r = Gt();
    ar();
    const {
      search: p,
      search2: O,
      showSearch2: g,
      tagItems: v,
      tagItems2: d,
      items: se,
      items2: fe,
      toggleSearch2: ee,
      toggleExpansion: ge,
      clearFilter: oe,
      reverseInputs: K,
      loadAssets: G
    } = or(), L = ke(), P = ke(), T = ke(!0);
    ke(!1);
    const _ = ke([]), R = ke(null), C = ke({ mode: "standard", menu: { items: {}, order: "" } });
    ke("");
    const w = ke(!0), z = ce(() => r.name), J = ce(() => s.state.showSearch2 || !1);
    ce(() => s.state.showExpansion !== !1);
    const I = ce(() => s.state.pathData || null);
    ce(() => s.state.currentStage || 0), ce(() => s.state.trigger?.select || {}), ce(() => s.state.trigger?.filter_disabled?.value || !1);
    const x = ce(() => !J.value && w.value ? "mdi-magnify magnifierIcon" : ""), q = ce(() => {
      if (C.value.mode !== "standard") return [];
      const { items: E = {}, order: B = "" } = C.value.menu || {};
      return B ? B.split(/\s*,\s*/).filter((o) => o && E[o]).map((o) => ({
        ...E[o],
        code: o,
        klass: { "vxg-router-link": !0 }
      })) : [];
    }), $ = ce(() => s.state.vxg?.cmp?.BasicHead?.show?.filter || !1);
    ce(() => le);
    const M = ce(() => window.$model?.main?.ux?.custom || {}), k = ce(() => M.value.special?.view || {});
    ce(() => M.value.special?.portal || {});
    const j = ce(() => {
      const E = window.$model?.main?.app?.web?.parts?.head?.tool || {}, B = k.value.tool || {};
      return {
        clear: { active: !0 },
        select: { active: !1 },
        ...E,
        ...B
      };
    }), N = ce(() => M.value.search_config || {}), c = ce(() => s.state.pathEstimation?.time || 0), e = ce(() => s.state.pathEstimation?.distance || 0), t = (E) => !E || typeof E != "object" || !E.tag ? null : E.custom12 != null ? E.tag + "(" + E.custom12 + ")" : E.tag, y = (E, B, o) => 1, f = () => {
      w.value = !1;
    }, A = () => {
      w.value = !0;
    }, U = (E) => {
      E.name !== "NavigationDuplicated" && console.error("Router navigation error:", E);
    }, b = async (E, B, o) => {
      if (E) {
        const a = window.$seneca;
        if (a) {
          const l = await a.post(
            "sys:search, cmd:search",
            { query: E, params: N.value }
          );
          B.value = l.data.hits.filter((X) => X && X.doc).map((X) => t(X.doc)).filter((X) => X !== null);
        }
      } else
        o.value != null && (B.value = o.value.filter((a) => a && a.tag).map(t).filter((a) => a !== null));
    }, m = (E) => {
      J.value ? h.replace({
        path: r.path,
        query: {
          mode: "route",
          a: p.value,
          b: O.value
        }
      }).catch(U) : h.push({
        path: r.path,
        query: {
          mode: "assetsearch",
          term: E
        }
      }).catch(U);
    }, D = async (E) => {
      if (E.key === "Enter" && r.query.mode === "assetsearch") {
        const o = E.target?.value?.trim();
        if (o) {
          ne(o);
          return;
        }
      }
      const B = O.value;
      setTimeout(async () => {
        const o = E.target ? E.target.value : null;
        J.value ? h.replace({
          path: r.path,
          query: {
            mode: "route",
            a: o || "",
            b: B || ""
            // Use captured value
          }
        }).catch(U) : h.push({
          path: r.path,
          query: {
            mode: "assetsearch",
            term: o
          }
        }).catch(U), await b(o, v, se);
      }, 11);
    }, te = async (E) => {
      const B = p.value;
      setTimeout(async () => {
        const o = E.target ? E.target.value : null;
        J.value && h.replace({
          path: r.path,
          query: {
            mode: "route",
            a: B || "",
            // Use captured value
            b: o || ""
          }
        }).catch(U), await b(o, d, fe);
      }, 11);
    }, S = () => {
      const E = r.query;
      let B = p.value || "", o = O.value || "";
      E.mode === "assetsearch" && E.term && !o && (o = E.term, O.value = o), J.value || ee(), s.dispatch("toggleSideInfoCardVisibility", !1), h.replace({
        path: r.path,
        query: {
          mode: "route",
          a: B,
          b: o
        }
      }).catch((a) => {
        a.name !== "NavigationDuplicated" && console.error("Router navigation error:", a);
      });
    }, Z = () => {
      oe(), cn(() => {
        s.dispatch("set_cmp_flags", { name: "BasicMain", flags: { show: !1 } }), p.value = "", O.value = "";
      }), h.replace({
        path: r.path,
        query: {}
      }).catch((E) => {
        E.name !== "NavigationDuplicated" && console.error("Router navigation error:", E);
      });
    }, F = () => {
      K(), s.commit("setCurrentStage", 1), s.dispatch("setCurrentStage", 1), h.replace({
        path: r.path,
        query: {
          mode: "route",
          a: p.value,
          b: O.value
        }
      }).catch((E) => {
        E.name !== "NavigationDuplicated" && console.error("Router navigation error:", E);
      });
    }, H = (E) => V(E) && s.state.vxg?.cmp?.BasicHead?.show?.[E], Y = (E) => {
      if (r.query.mode === "route") {
        console.log("Filter ignored - currently in navigation mode");
        return;
      }
      r.query.mode !== "filtersearch" && h.replace({
        path: r.path,
        query: {
          mode: "filtersearch",
          area: "",
          level: "",
          systemtype: "",
          assettype: ""
        }
      }).catch((B) => {
        B.name !== "NavigationDuplicated" && console.error("Router navigation error:", B);
      }), s.dispatch("trigger_toggle_filter");
    }, ae = () => C.value && C.value.menu && C.value.menu.default, re = (E) => {
      const B = M.value.special || {};
      for (let o in B) {
        const a = B[o];
        if (a.name === E || a.sub && a.sub.includes(E))
          return a;
      }
      return { index: 1 };
    }, V = (E) => {
      const B = window.$vxg;
      return E && E.allow && B ? B.allow(E.allow) : !0;
    }, ne = async (E) => {
      try {
        if (console.log("Performing asset search for term:", E), E && E.trim()) {
          const B = E.trim(), o = window.$seneca;
          if (o) {
            const a = await o.post(
              "sys:search, cmd:search",
              { query: B, params: N.value }
            );
            v.value = a.data.hits.filter((l) => l && l.doc).map((l) => t(l.doc)).filter((l) => l !== null), console.log("Asset search results:", v.value), s.dispatch("trigger_asset_search", {
              term: B,
              results: a.data.hits,
              mode: "assetsearch"
            });
          }
        } else
          se.value != null && (v.value = se.value.filter((B) => B && B.tag).map(t).filter((B) => B !== null));
      } catch (B) {
        console.error("Error performing asset search:", B);
      }
    };
    Ce(() => J.value, (E) => {
      E && (s.state.showExpansion = !1);
    }), Ce(() => R.value, (E) => {
    }), Ce(() => s.state.trigger?.search?.a, (E) => {
      p.value = E, typeof E == "object" && (E = E.tag), E == "" && L.value && (L.value.reset(), v.value = se.value.filter((B) => B && B.tag).map(t).filter((B) => B !== null));
    }), Ce(() => s.state.trigger?.search?.b, (E) => {
      typeof E == "object" && (E = E.tag), E = String(E).replace(/\(.*?\)/g, "").trim(), O.value = E, E == "" && P.value && (P.value.reset(), d.value = fe.value.filter((o) => o && o.tag).map(t).filter((o) => o !== null));
    }), Ce(p, (E) => {
      let B = E || "";
      B = B.trim(), s.dispatch("trigger_search", { a: B });
    }), Ce(O, (E) => {
      let B = E || "";
      s.dispatch("trigger_search", { b: B });
    }), Ce(() => r.name, (E) => {
      !E && ae() && h.push(C.value.menu.default);
      const B = re(E);
      C.value = _.value[B.index] || C.value;
    }, { immediate: !0 }), Ce(() => r.query, (E) => {
      E.mode == "route" && (E.a !== void 0 && (p.value = E.a || "", s.state.trigger.search.a = p.value), E.b !== void 0 && (O.value = E.b || "", s.state.trigger.search.b = O.value));
    }, { immediate: !0 }), Bt(() => {
      J.value && (s.state.showExpansion = !1);
      const E = i.spec.view || {};
      for (let a in E) {
        let l = E[a];
        l.name = a, _.value.push(l);
      }
      console.log("menuViewList:", _.value);
      const B = re(r.name);
      C.value = _.value[B.index] || C.value, R.value = B.index;
      const o = setInterval(async () => {
        const a = await G();
        if (r.path.includes("/user"))
          try {
            s.state.main_user && s.state.main_user.length > 0 ? fe.value = s.state.main_user : fe.value = [...a];
          } catch {
            fe.value = [...a];
          }
        else
          fe.value = [...a];
        a.length != 0 && (v.value = a.filter((l) => l && l.tag).map(tagAlias).filter((l) => l !== null), fe.value.length > 0 && fe.value[0].email ? d.value = fe.value.filter((l) => l && (l.email || l.name)).map((l) => l.email || l.name).filter((l) => l !== null) : d.value = fe.value.filter((l) => l && l.tag).map(tagAlias).filter((l) => l !== null), clearInterval(o), console.log("✅ Assets loaded and formatted:", v.value.slice(0, 5)));
      }, 111);
    }), Qe(() => {
    });
    const le = Object.freeze({
      width: "282px",
      visibility: "visible !important",
      transform: "none !important"
    });
    return (E, B) => {
      const o = Ge("router-link");
      return de(), Me(yn, {
        modelValue: T.value,
        "onUpdate:modelValue": B[9] || (B[9] = (a) => T.value = a),
        app: "",
        location: n.location,
        class: "vxg-side",
        width: 280,
        permanent: "",
        touchless: !0,
        temporary: !1
      }, {
        default: pe(() => [
          ie(Sn, { class: "d-flex flex-column h-100" }, {
            default: pe(() => [
              De("div", xr, [
                De("div", { innerHTML: n.logo }, null, 8, br)
              ]),
              H("clear") && j.value.clear.active ? (de(), Me(He, {
                key: 0,
                text: "",
                style: { "max-width": "200px", display: "inline-block", "margin-left": "48%", "text-transform": "none", "font-size": "12px", color: "var(--vxg-text-color, #333)", top: "10px" },
                class: "btn-clear",
                onClick: Z
              }, {
                default: pe(() => [
                  Te(Oe(ue(g) ? "Close Navigation Mode" : "Clear Search"), 1)
                ]),
                _: 1
              })) : _e("", !0),
              z.value === "pqview" || z.value === "side" ? (de(), we("div", kr, [
                sn(De("div", yr, [
                  De("img", {
                    src: `${Pt}Layer_5.svg`,
                    alt: "Layer_5",
                    class: "Layer_5",
                    style: { cursor: "pointer", width: "24px", height: "24px" },
                    onClick: B[0] || (B[0] = (a) => {
                      ue(ee)(), ue(ge)(), S();
                    })
                  }, null, 8, Sr)
                ], 512), [
                  [an, !ue(g)]
                ]),
                ue(g) ? (de(), we("div", wr, [
                  De("img", {
                    src: `${Pt}navigation_1.svg`,
                    alt: "navigation_1",
                    class: "navigation_1",
                    style: { height: "60px", display: "block" }
                  }, null, 8, _r)
                ])) : _e("", !0),
                De("div", {
                  style: on({
                    position: "relative",
                    zIndex: 1,
                    marginBottom: 0,
                    marginLeft: ue(g) ? "48px" : "0"
                  })
                }, [
                  ie(At, {
                    ref_key: "searchRef",
                    ref: L,
                    class: "comboxSearch d-flex justify-space-between",
                    modelValue: ue(p),
                    "onUpdate:modelValue": B[1] || (B[1] = (a) => Xe(p) ? p.value = a : null),
                    onKeydown: B[2] || (B[2] = (a) => D(a)),
                    "onClick:clear": B[3] || (B[3] = (a) => D(a)),
                    onChange: B[4] || (B[4] = (a) => m(a)),
                    items: ue(v),
                    flat: "",
                    "hide-details": "",
                    outlined: "",
                    dense: "",
                    clearable: "",
                    placeholder: ue(g) ? "Start location..." : "Search...",
                    "onClick:append": Y,
                    filter: y,
                    "prepend-inner-icon": x.value,
                    onClick: f,
                    onBlur: A
                  }, null, 8, ["modelValue", "items", "placeholder", "prepend-inner-icon"])
                ], 4),
                $.value && !ue(g) ? (de(), we("img", {
                  key: 1,
                  src: `${Pt}Clip_path_group.svg`,
                  alt: "Clip_Path_group",
                  style: { cursor: "pointer", position: "relative", top: "-33px", left: "calc(100% - 33px)", "border-left": "solid 1px", "padding-left": "2px", "z-index": "10" },
                  class: "clip-path-group",
                  onClick: ln(Y, ["stop", "prevent"])
                }, null, 8, Mr)) : _e("", !0),
                ue(g) ? (de(), we("div", Tr)) : _e("", !0),
                ue(g) ? (de(), we("div", Cr, [
                  ie(At, {
                    class: "comboxSearch2",
                    ref_key: "search2Ref",
                    ref: P,
                    modelValue: ue(O),
                    "onUpdate:modelValue": B[5] || (B[5] = (a) => Xe(O) ? O.value = a : null),
                    onKeydown: B[6] || (B[6] = (a) => te(a)),
                    "onClick:clear": B[7] || (B[7] = (a) => te(a)),
                    items: ue(d),
                    flat: "",
                    "hide-details": "",
                    outlined: "",
                    dense: "",
                    clearable: "",
                    placeholder: "Destination...",
                    filter: y
                  }, null, 8, ["modelValue", "items"])
                ])) : _e("", !0),
                ue(g) ? (de(), we("div", $r, [
                  ie(Ne, {
                    size: "18",
                    color: "black",
                    style: { cursor: "pointer", position: "relative", top: "-49px", left: "calc(100% - 29px)", "margin-left": "-18px", background: "white", "z-index": "999", "border-radius": "2px" },
                    onClick: F
                  }, {
                    default: pe(() => [...B[10] || (B[10] = [
                      Te(" mdi-swap-vertical ", -1)
                    ])]),
                    _: 1
                  })
                ])) : _e("", !0),
                ue(g) && ue(O) && I.value && Object.keys(I.value).length > 0 ? (de(), we("div", Or, [
                  ie(Ne, {
                    style: { margin: "-7px 0", color: "black" },
                    "aria-hidden": "true",
                    "aria-label": "Route to Asset"
                  }, {
                    default: pe(() => [...B[11] || (B[11] = [
                      Te(" mdi-clock-time-four-outline ", -1)
                    ])]),
                    _: 1
                  }),
                  c.value >= 60 ? (de(), we("span", Er, Oe(Math.trunc(c.value / 60)) + ":" + Oe((c.value % 60).toString().padStart(2, "0")) + " minutes (" + Oe(e.value.toFixed(0)) + " meters) ", 1)) : (de(), we("span", Ir, Oe(c.value) + " seconds (" + Oe(e.value.toFixed(0)) + " meters) ", 1))
                ])) : _e("", !0),
                ue(g) ? (de(), Me(vr, {
                  key: 6,
                  spec: n.spec
                }, null, 8, ["spec"])) : _e("", !0)
              ])) : _e("", !0),
              De("div", jr, [
                C.value.mode === "standard" ? (de(), we("div", Nr, [
                  (de(!0), we(Fe, null, Dt(q.value, (a) => (de(), we(Fe, {
                    key: a.code
                  }, [
                    a && V(a) && a.code !== "admin" && a.title !== "Devices" && a.code !== "devices" ? (de(), Me(o, {
                      key: 0,
                      to: `/${a.code}`,
                      class: zt(["vxg-router-link", a.klass])
                    }, {
                      default: pe(() => [
                        B[8] || (Ue(-1, !0), (B[8] = ie(Ne, null, {
                          default: pe(() => [
                            Te("mdi-" + Oe(a.icon), 1)
                          ]),
                          _: 2
                        }, 1024)).cacheIndex = 8, Ue(1), B[8]),
                        Te(" " + Oe(a.title), 1)
                      ]),
                      _: 2
                    }, 1032, ["to", "class"])) : _e("", !0)
                  ], 64))), 128))
                ])) : C.value.mode === "custom" ? (de(), Me(Ft(C.value.cmp), {
                  key: 1,
                  spec: C.value.view.spec
                }, null, 8, ["spec"])) : _e("", !0)
              ]),
              ie(Vt),
              ie(Ye, { style: { "margin-top": "65px" } }),
              n.spec.footer.active ? (de(), Me(Ft(n.spec.footer.cmp), {
                key: 2,
                spec: n.spec.footer.spec
              }, null, 8, ["spec"])) : _e("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue", "location"]);
    };
  }
}), Pr = { class: "head-navigation" }, Ar = /* @__PURE__ */ Ve({
  __name: "HeadNavigation",
  props: {
    drawerOpen: { type: Boolean, default: !1 },
    detailOpen: { type: Boolean, default: !1 },
    showExpandSide: { type: Boolean, default: !1 },
    showExpandMain: { type: Boolean, default: !1 }
  },
  emits: ["toggle-drawer", "toggle-detail"],
  setup(n, { emit: u }) {
    const i = u, s = () => {
      i("toggle-drawer");
    }, h = () => {
      i("toggle-detail");
    };
    return (r, p) => (de(), we("div", Pr, [
      n.showExpandSide && !n.drawerOpen ? (de(), we(Fe, { key: 0 }, [
        ie(Ne, {
          large: "",
          onClick: s,
          style: { display: "inline-block" },
          light: ""
        }, {
          default: pe(() => [...p[0] || (p[0] = [
            Te(" mdi-chevron-right ", -1)
          ])]),
          _: 1
        }),
        ie(Ye, {
          vertical: "",
          style: { margin: "0px 16px" }
        })
      ], 64)) : _e("", !0),
      n.showExpandMain && !n.detailOpen ? (de(), we(Fe, { key: 1 }, [
        ie(Ye, {
          vertical: "",
          style: { margin: "0px 16px" }
        }),
        ie(Ne, {
          large: "",
          onClick: h,
          style: { display: "inline-block" },
          light: ""
        }, {
          default: pe(() => [...p[1] || (p[1] = [
            Te(" mdi-chevron-left ", -1)
          ])]),
          _: 1
        })
      ], 64)) : _e("", !0)
    ]));
  }
}), Ut = /* @__PURE__ */ Re(Ar, [["__scopeId", "data-v-8c4127e2"]]), Dr = { class: "head-toolbar" }, Br = /* @__PURE__ */ Ve({
  __name: "HeadToolbar",
  props: {
    modelValue: { default: "" },
    selectItems: { default: () => [] },
    selectLabel: { default: "" },
    itemName: { default: "Item" },
    showSelect: { type: Boolean, default: !1 },
    showAdd: { type: Boolean, default: !1 },
    showRemove: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "add", "remove"],
  setup(n, { emit: u }) {
    const i = n, s = u, h = ke(), r = ce(() => i.itemName === "Asset" ? "Fixed Asset" : i.itemName), p = (v) => {
      s("update:modelValue", v);
    }, O = () => {
      s("add");
    }, g = () => {
      s("remove");
    };
    return (v, d) => (de(), we("div", Dr, [
      n.showSelect ? (de(), Me(Wt, {
        key: 0,
        style: { "max-width": "20%", display: "inline-block", "margin-left": "10px" },
        items: n.selectItems,
        ref_key: "selectRef",
        ref: h,
        label: n.selectLabel,
        "model-value": n.modelValue,
        "onUpdate:modelValue": p,
        tile: "",
        outlined: "",
        "hide-details": "",
        dense: ""
      }, null, 8, ["items", "label", "model-value"])) : _e("", !0),
      n.showAdd ? (de(), we(Fe, { key: 1 }, [
        ie(He, {
          class: "vxg-head-btn",
          onClick: O
        }, {
          default: pe(() => [
            ie(Ne, { start: "" }, {
              default: pe(() => [...d[0] || (d[0] = [
                Te(" mdi-map-marker-path ", -1)
              ])]),
              _: 1
            }),
            Te(" Add " + Oe(r.value), 1)
          ]),
          _: 1
        }),
        ie(Ye, {
          vertical: "",
          class: "mx-4"
        })
      ], 64)) : _e("", !0),
      n.showRemove ? (de(), we(Fe, { key: 2 }, [
        ie(He, {
          class: "vxg-head-btn",
          onClick: g
        }, {
          default: pe(() => [
            ie(Ne, { start: "" }, {
              default: pe(() => [...d[1] || (d[1] = [
                Te(" mdi-map-marker-path ", -1)
              ])]),
              _: 1
            }),
            Te(" Remove " + Oe(n.itemName), 1)
          ]),
          _: 1
        }),
        ie(Ye, {
          vertical: "",
          class: "mx-4"
        })
      ], 64)) : _e("", !0)
    ]));
  }
}), Vr = /* @__PURE__ */ Re(Br, [["__scopeId", "data-v-2411752b"]]), Rr = /* @__PURE__ */ Ve({
  __name: "HeadSearch",
  props: {
    modelValue: { default: "" },
    items: { default: () => [] },
    placeholder: { default: "Search" },
    customFilter: { type: Function, default: (n, u, i) => {
      if (!u) return !0;
      const s = u.toLowerCase();
      return (n || "").toLowerCase().includes(s);
    } }
  },
  emits: ["update:modelValue", "keydown", "clear", "change", "filter"],
  setup(n, { expose: u, emit: i }) {
    const s = i, h = ke(null), r = (ee) => {
      s("update:modelValue", ee);
    }, p = (ee) => {
      s("keydown", ee);
    }, O = () => {
      s("clear");
    }, g = (ee) => {
      s("change", ee);
    }, v = () => {
      s("filter");
    };
    return u({
      reset: () => {
        h.value && h.value.reset();
      },
      blur: () => {
        h.value && h.value.blur && h.value.blur();
      },
      closeMenu: () => {
        h.value && (h.value.isMenuActive = !1);
      }
    }), (ee, ge) => (de(), Me(At, {
      ref_key: "searchRef",
      ref: h,
      "model-value": n.modelValue,
      "onUpdate:modelValue": r,
      onKeydown: p,
      "onClick:clear": O,
      onChange: g,
      items: n.items,
      flat: "",
      "hide-details": "",
      outlined: "",
      dense: "",
      clearable: "",
      placeholder: n.placeholder,
      "append-icon": null,
      "onClick:append": v,
      filter: n.customFilter
    }, null, 8, ["model-value", "items", "placeholder", "filter"]));
  }
}), Fr = /* @__PURE__ */ Re(Rr, [["__scopeId", "data-v-ad17ebba"]]), Lr = /* @__PURE__ */ Ve({
  __name: "HeadUser",
  props: {
    show: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(n, { emit: u }) {
    const i = u, s = () => {
      i("click");
    };
    return (h, r) => n.show ? (de(), Me(Ne, {
      key: 0,
      large: "",
      onClick: s,
      style: { display: "inline-block" },
      light: ""
    }, {
      default: pe(() => [...r[0] || (r[0] = [
        Te(" mdi-account ", -1)
      ])]),
      _: 1
    })) : _e("", !0);
  }
}), Yr = /* @__PURE__ */ Re(Lr, [["__scopeId", "data-v-3ec345bd"]]), Ur = { class: "head-utilities" }, Hr = /* @__PURE__ */ Ve({
  __name: "HeadUtilities",
  props: {
    showPrint: { type: Boolean, default: !1 },
    showBookmark: { type: Boolean, default: !1 },
    showCollect: { type: Boolean, default: !1 },
    printDisabled: { type: Boolean, default: !1 },
    bookmarkVisible: { type: Boolean, default: !1 },
    bookmarkActive: { type: Boolean, default: !1 }
  },
  emits: ["print", "bookmark", "collect"],
  setup(n, { emit: u }) {
    const i = n, s = u, h = ce(() => i.bookmarkActive ? "HIDE TAGS" : "SHOW TAGS"), r = () => {
      s("print");
    }, p = () => {
      s("bookmark");
    }, O = () => {
      s("collect");
    };
    return (g, v) => (de(), we("div", Ur, [
      n.showPrint ? (de(), we(Fe, { key: 0 }, [
        ie(Ye, { vertical: "" }),
        v[0] || (Ue(-1, !0), (v[0] = ie(Nt, { bottom: "" }, {
          activator: pe(({ on: d, attrs: se }) => [
            ie(He, It(se, jt(d), {
              large: "",
              elevation: "0",
              class: "pa-1 ma-1",
              color: "white",
              style: { height: "55px" },
              disabled: n.printDisabled,
              onClick: r
            }), {
              default: pe(() => [
                ie(Ne, {
                  large: "",
                  class: "vxg-icon"
                }, {
                  default: pe(() => [...v[3] || (v[3] = [
                    Te("mdi-printer", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            }, 16, ["disabled"])
          ]),
          default: pe(() => [
            v[4] || (v[4] = De("span", null, "PRINT", -1))
          ]),
          _: 1
        })).cacheIndex = 0, Ue(1), v[0]),
        ie(Ye, { vertical: "" })
      ], 64)) : _e("", !0),
      n.showBookmark ? (de(), we(Fe, { key: 1 }, [
        v[1] || (Ue(-1, !0), (v[1] = ie(Nt, { bottom: "" }, {
          activator: pe(({ on: d, attrs: se }) => [
            ie(He, It(se, jt(d), {
              large: "",
              elevation: "0",
              class: "pa-1 ma-1",
              color: "white",
              style: { height: "55px" },
              disabled: !n.bookmarkVisible,
              onClick: p
            }), {
              default: pe(() => [
                ie(Ne, {
                  large: "",
                  class: "vxg-icon"
                }, {
                  default: pe(() => [...v[5] || (v[5] = [
                    Te("mdi-bookmark-minus-outline", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            }, 16, ["disabled"])
          ]),
          default: pe(() => [
            De("span", null, Oe(h.value), 1)
          ]),
          _: 1
        })).cacheIndex = 1, Ue(1), v[1]),
        ie(Ye, { vertical: "" })
      ], 64)) : _e("", !0),
      n.showCollect ? (de(), we(Fe, { key: 2 }, [
        v[2] || (Ue(-1, !0), (v[2] = ie(Nt, { bottom: "" }, {
          activator: pe(({ on: d, attrs: se }) => [
            ie(He, It(se, jt(d), {
              large: "",
              elevation: "0",
              class: "pa-1 ma-1",
              color: "white",
              style: { height: "55px" },
              onClick: O
            }), {
              default: pe(() => [
                ie(Ne, {
                  large: "",
                  class: "vxg-icon"
                }, {
                  default: pe(() => [...v[6] || (v[6] = [
                    Te("mdi-folder-open-outline", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            }, 16)
          ]),
          default: pe(() => [
            v[7] || (v[7] = De("span", null, "ASSET COLLECTION", -1))
          ]),
          _: 1
        })).cacheIndex = 2, Ue(1), v[2]),
        ie(Ye, { vertical: "" })
      ], 64)) : _e("", !0)
    ]));
  }
}), zr = /* @__PURE__ */ Re(Hr, [["__scopeId", "data-v-c3919ebe"]]);
function Ke(n) {
  return !n || !n.tag ? null : n.custom12 != null ? `${n.tag}(${n.custom12})` : n.tag;
}
function Gr(n, u, i, s, h) {
  const r = ke(""), p = ke([]), O = ke([]);
  let g = null, v = null;
  const d = ce(() => h?.main?.ux?.custom?.search_config || {}), se = (L) => {
    const P = L.map((T) => s.post("sys:search, cmd:add", { doc: T }));
    return Promise.all(P).then(() => {
      console.log(`[useHeadSearch] MiniSearch initialized with ${L.length} assets`);
    }).catch((T) => {
      throw console.error("[useHeadSearch] MiniSearch setup error:", T), T;
    });
  }, fe = (L) => new Promise((P, T) => {
    L ? s.post("sys:search, cmd:search", {
      query: L,
      params: d.value
    }).then((_) => {
      const R = _?.data?.hits || [];
      O.value = R.map((C) => Ke(C.doc)).filter((C) => C !== null), console.log(`[useHeadSearch] Search results: ${O.value.length} matches for "${L}"`), P();
    }).catch((_) => {
      console.error("[useHeadSearch] Search error:", _), T(_);
    }) : (p.value && p.value.length > 0 && (O.value = p.value.map(Ke).filter((_) => _ !== null)), P());
  }), ee = () => {
    const L = {};
    g = setInterval(() => {
      n.dispatch("vxg_get_assets", L).then(() => {
        p.value = L.assets || [], p.value.length !== 0 && (O.value = p.value.map(Ke).filter((P) => P !== null), se(p.value).then(() => {
          g && (clearInterval(g), g = null);
        }).catch((P) => {
          console.error("[useHeadSearch] Failed to setup MiniSearch:", P);
        }));
      }).catch((P) => {
        console.error("[useHeadSearch] Asset loading error:", P);
      });
    }, 111);
  }, ge = (L, P, T) => {
    if (!P) return !0;
    const _ = P.toLowerCase();
    return (L || "").toLowerCase().includes(_);
  }, oe = (L) => {
    v && clearTimeout(v), v = setTimeout(() => {
      const T = L.target?.value || null;
      console.log("[useHeadSearch] Search term:", T), n.state.trigger.search.term = T || "", n.state.trigger.search.a = T || "", fe(T || "").then(() => {
        const _ = i.query.mode;
        _ === "assetsearch" || _ === "filtersearch" || _ === "route" || (T ? u.push({
          path: i.path,
          query: {
            mode: "headsearch",
            term: T
          }
        }).catch((R) => {
          R.name !== "NavigationDuplicated" && console.error("[useHeadSearch] Router navigation error:", R);
        }) : u.push({
          path: i.path,
          query: {}
        }).catch((R) => {
          R.name !== "NavigationDuplicated" && console.error("[useHeadSearch] Router navigation error:", R);
        }));
      }).catch((_) => {
        console.error("[useHeadSearch] Search handling error:", _);
      });
    }, 11);
  }, K = (L) => {
    console.log("[useHeadSearch] Search selected:", L), n.state.trigger.search.term = L || "", n.state.trigger.search.a = L || "";
  };
  Ce(
    () => n.state.trigger?.search?.term,
    (L) => {
      L === "" && p.value.length > 0 && (O.value = p.value.map(Ke).filter((P) => P !== null));
    }
  );
  const G = () => {
    g && (clearInterval(g), g = null), v && (clearTimeout(v), v = null);
  };
  return Qe(() => {
    G();
  }), {
    search: r,
    tagItems: O,
    items: p,
    setupMiniSearch: se,
    performSearch: fe,
    customFilter: ge,
    handleSearchChange: oe,
    handleSearchSelect: K,
    initializeAssetLoading: ee,
    cleanup: G
  };
}
function qr(n) {
  return {
    addItem: () => {
      n.dispatch("trigger_led_add").catch((d) => {
        console.error("[useHeadActions] Add item error:", d);
      });
    },
    addMobileAsset: () => {
      n.dispatch("trigger_led_add_mobile").catch((d) => {
        console.error("[useHeadActions] Add mobile asset error:", d);
      });
    },
    removeItem: () => {
      n.dispatch("trigger_led_remove").catch((d) => {
        console.error("[useHeadActions] Remove item error:", d);
      });
    },
    print: () => {
      n.dispatch("vxg_trigger_printMap").catch((d) => {
        console.error("[useHeadActions] Print error:", d);
      });
    },
    collect: () => {
      n.dispatch("vxg_trigger_collect").catch((d) => {
        console.error("[useHeadActions] Collect error:", d);
      });
    },
    showTags: () => {
      n.dispatch("adjust_trigger_bookmark").catch((d) => {
        console.error("[useHeadActions] Show tags error:", d);
      });
    },
    filterAssets: () => {
      n.dispatch("vxg_trigger_go").catch((d) => {
        console.error("[useHeadActions] Filter assets error:", d);
      });
    },
    clearFilter: () => {
      n.dispatch("vxg_trigger_clear").catch((d) => {
        console.error("[useHeadActions] Clear filter error:", d);
      });
    },
    toggleFilter: () => {
      n.dispatch("trigger_toggle_filter").catch((d) => {
        console.error("[useHeadActions] Toggle filter error:", d);
      });
    }
  };
}
function Jr(n) {
  const u = (g) => {
    const v = n.state.vxg?.cmp?.BasicHead?.allow?.[g];
    return v ?? !0;
  }, i = (g) => u(g) && (n.state.vxg?.cmp?.BasicHead?.show?.[g] || !1), s = ce(() => n.state.trigger?.filter_disabled?.value || !1), h = ce(() => n.state.vxg?.cmp?.BasicHead?.show?.filter || !1), r = ce(() => n.state.trigger?.bookmark?.visible || !1), p = ce(() => n.state.trigger?.bookmark?.value || !1), O = ce(() => !1);
  return {
    allow: u,
    show: i,
    filterDisabled: s,
    filterIcon: h,
    bookmarkVisible: r,
    bookmarkActive: p,
    printDisabled: O
  };
}
function Wr(n) {
  const u = ce(() => n.state.vxg?.cmp?.BasicSide?.show || !1), i = ce(() => !n.state.vxg?.cmp?.BasicMain?.show);
  return {
    drawerOpen: u,
    detailOpen: i,
    openDrawer: () => {
      n.dispatch("set_cmp_flags", {
        name: "BasicSide",
        flags: { show: !0 }
      }).catch((r) => {
        console.error("[useHeadNavigation] Open drawer error:", r);
      });
    },
    closeDetail: () => {
      n.dispatch("set_cmp_flags", {
        name: "BasicMain",
        flags: { show: !1 }
      }).catch((r) => {
        console.error("[useHeadNavigation] Close detail error:", r);
      });
    }
  };
}
function Zr(n, u, i, s) {
  const h = ke(""), r = ke({}), p = ce(() => {
    const d = i?.main?.app?.web?.parts?.head?.tool || {};
    return s?.deep(d, r.value) || d;
  }), O = ce(() => {
    const d = n.state.vxg?.ent?.meta?.name || "Item";
    if (d === "Item") {
      const se = u.path;
      if (se.includes("/device"))
        return "Device";
      if (se.includes("/user"))
        return "User";
    }
    return d;
  }), g = ce(() => {
    const d = [], se = p.value.select?.items;
    return se && Object.entries(se).forEach(([fe, ee]) => {
      d.push({
        value: fe,
        text: ee.title || fe
      });
    }), d;
  }), v = () => {
    p.value.select?.active && p.value.select?.initial && (h.value = p.value.select.initial);
  };
  return Ce(
    () => u.name,
    (d) => {
      if (d) {
        const se = i?.main?.app?.web?.view?.[d];
        se && se.head ? r.value = se.head.tool || {} : r.value = {}, v();
      }
    },
    { immediate: !0 }
  ), Ce(h, (d) => {
    n.dispatch("trigger_select", { value: d }).catch((se) => {
      console.error("[useHeadConfig] Select dispatch error:", se);
    });
  }), Ce(
    () => n.state.trigger?.select?.value,
    (d) => {
      d !== void 0 && d !== h.value && (h.value = d);
    }
  ), {
    tool: p,
    itemName: O,
    select: h,
    selectItems: g,
    viewTool: r,
    defaults: v
  };
}
const Kr = /* @__PURE__ */ Ve({
  __name: "BasicHead",
  props: {
    logo: { default: "" }
  },
  emits: ["action"],
  setup(n, { emit: u }) {
    const i = u, s = Le(), h = et(), r = Gt(), p = un(), O = p?.proxy?.$seneca, g = p?.proxy?.$model, v = p?.proxy?.$main?.seneca?.util, {
      drawerOpen: d,
      detailOpen: se,
      openDrawer: fe,
      closeDetail: ee
    } = Wr(s), {
      tool: ge,
      itemName: oe,
      select: K,
      selectItems: G
    } = Zr(s, r, g, v), {
      search: L,
      tagItems: P,
      items: T,
      customFilter: _,
      handleSearchChange: R,
      handleSearchSelect: C,
      initializeAssetLoading: w,
      cleanup: z
    } = Gr(s, h, r, O, g), {
      addItem: J,
      removeItem: I,
      print: x,
      collect: q,
      showTags: $,
      toggleFilter: M
    } = qr(s), {
      show: k,
      bookmarkVisible: j,
      bookmarkActive: N
    } = Jr(s), c = ke(), e = (A) => {
      const U = {
        target: A.target
      };
      R(U);
    }, t = () => {
      L.value = "", R({
        target: { value: "" }
      });
    }, y = (A) => {
      C(A);
    }, f = () => {
      i("action", "avatar");
    };
    return Ce(
      () => r.name,
      (A) => {
        if (A && (c.value && (c.value.blur(), setTimeout(() => {
          c.value && c.value.closeMenu();
        }, 50)), !(r.query.mode === "assetsearch" || r.name === "admin" && r.query.tab === "assets") && (L.value = "", s.state.trigger.search.term = "", c.value && c.value.reset(), T.value && T.value.length > 0))) {
          const b = (m) => !m || !m.tag ? null : m.custom12 != null ? `${m.tag}(${m.custom12})` : m.tag;
          P.value = T.value.map(b).filter((m) => m !== null);
        }
      }
    ), Ce(
      () => s.state.trigger?.search?.term,
      (A) => {
        A === "" && c.value && c.value.reset();
      }
    ), Bt(() => {
      w();
    }), Qe(() => {
      z();
    }), (A, U) => (de(), Me(wn, {
      app: "",
      class: "vxg-app-bar"
    }, {
      default: pe(() => [
        ie(Ut, {
          "drawer-open": ue(d),
          "show-expand-side": ue(ge).expandSide?.active || !1,
          "show-expand-main-false": "",
          onToggleDrawer: ue(fe)
        }, null, 8, ["drawer-open", "show-expand-side", "onToggleDrawer"]),
        ie(Vr, {
          modelValue: ue(K),
          "onUpdate:modelValue": U[0] || (U[0] = (b) => Xe(K) ? K.value = b : null),
          "select-items": ue(G),
          "select-label": ue(ge).select?.title || "",
          "item-name": ue(oe),
          "show-select": ue(k)("select") && (ue(ge).select?.active || !1),
          "show-add": ue(k)("add") && (ue(ge).add?.active || !1),
          "show-remove": ue(k)("remove") && (ue(ge).remove?.active || !1),
          onAdd: ue(J),
          onRemove: ue(I)
        }, null, 8, ["modelValue", "select-items", "select-label", "item-name", "show-select", "show-add", "show-remove", "onAdd", "onRemove"]),
        ie(Fr, {
          ref_key: "searchRef",
          ref: c,
          modelValue: ue(L),
          "onUpdate:modelValue": U[1] || (U[1] = (b) => Xe(L) ? L.value = b : null),
          items: ue(P),
          placeholder: "Search",
          "custom-filter": ue(_),
          onKeydown: e,
          onClear: t,
          onChange: y,
          onFilter: ue(M)
        }, null, 8, ["modelValue", "items", "custom-filter", "onFilter"]),
        ue(ge).avatar?.active || ue(ge).expandMain?.active ? (de(), Me(Vt, { key: 0 })) : _e("", !0),
        ie(Yr, {
          show: ue(ge).avatar?.active || !1,
          onClick: f
        }, null, 8, ["show"]),
        ie(Ut, {
          "detail-open": ue(se),
          "show-expand-side-false": "",
          "show-expand-main": ue(ge).expandMain?.active || !1,
          onToggleDetail: ue(ee)
        }, null, 8, ["detail-open", "show-expand-main", "onToggleDetail"]),
        ie(zr, {
          "show-print": ue(k)("print"),
          "show-bookmark": ue(k)("bookmark"),
          "show-collect": ue(k)("collect"),
          "print-disabled": ue(ge).print?.disabled || !1,
          "bookmark-visible": ue(j),
          "bookmark-active": ue(N),
          onPrint: ue(x),
          onBookmark: ue($),
          onCollect: ue(q)
        }, null, 8, ["show-print", "show-bookmark", "show-collect", "print-disabled", "bookmark-visible", "bookmark-active", "onPrint", "onBookmark", "onCollect"])
      ]),
      _: 1
    }));
  }
}), Xr = /* @__PURE__ */ Re(Kr, [["__scopeId", "data-v-23ed96ab"]]), Qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xr
}, Symbol.toStringTag, { value: "Module" })), es = {
  computed: {
    viewSpec() {
      const n = this.$route.meta.view || this.$model.main.app.web.defaults.view;
      return this.$model.main.app.web.view[n].spec;
    }
  }
};
function ts(n, u, i, s, h, r) {
  const p = Ge("router-view");
  return de(), Me(_n, { app: "" }, {
    default: pe(() => [
      ie(Jt, {
        fluid: "",
        class: "pa-0"
      }, {
        default: pe(() => [
          ie(p, { spec: r.viewSpec }, null, 8, ["spec"])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const ns = /* @__PURE__ */ Re(es, [["render", ts]]), rs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ns
}, Symbol.toStringTag, { value: "Module" }));
function Cs() {
  const n = Le(), u = et(), i = ce(
    () => n.state.auth?.authenticated || !1
  ), s = ce(
    () => n.state.auth?.user || null
  );
  return {
    isAuthenticated: i,
    currentUser: s,
    signin: (O) => n.dispatch("signin_user", O),
    signout: () => n.dispatch("signout_user").then(() => u.push("/login")),
    checkAuth: () => n.dispatch("check_auth")
  };
}
function $s() {
  const n = Le(), u = ce(
    () => n.state.admin?.users || []
  ), i = ce(
    () => n.state.auth?.user?.role === "admin"
  ), s = ce(
    () => n.state.admin?.loading || !1
  );
  return {
    users: u,
    isAdmin: i,
    isLoading: s,
    loadUsers: () => n.dispatch("admin/loadUsers"),
    updateUser: (g, v) => n.dispatch("admin/updateUser", { userId: g, data: v }),
    deleteUser: (g) => n.dispatch("admin/deleteUser", g),
    createUser: (g) => n.dispatch("admin/createUser", g)
  };
}
const Ht = "1.0.0-alpha.1", Os = {
  install(n, u = {}) {
    console.log("[Vxg] Vue 3 plugin installed - v" + Ht);
    const {
      components: i = !0,
      prefix: s = "Vxg",
      store: h = null,
      allow: r = {},
      initialState: p = {},
      ...O
    } = u, g = new In({
      allow: r,
      ...O
    });
    p && Object.assign(g.state, p), h && new jn(g, h).connect(), n.provide("vxg", g), n.provide("$vxg", g), n.config.globalProperties.$vxg = g, i !== !1 && (Promise.resolve().then(() => Qr).then((v) => {
      n.component(`${s}BasicHead`, v.default);
    }), import("./BasicSide-5FnwC7Sc.js").then((v) => {
      n.component(`${s}BasicSide`, v.default);
    }), Promise.resolve().then(() => rs).then((v) => {
      n.component(`${s}BasicMain`, v.default);
    }), import("./BasicNavStages-S_dNz33d.js").then((v) => {
      n.component(`${s}BasicNavStages`, v.default);
    }), import("./NavStagesExpansion-BGKsSEXW.js").then((v) => {
      n.component(`${s}NavStagesExpansion`, v.default);
    }), Promise.resolve().then(() => mr).then((v) => {
      n.component(`${s}NavStageItem`, v.default);
    }), Promise.resolve().then(() => er).then((v) => {
      n.component(`${s}BasicAuth`, v.default);
    }), Promise.resolve().then(() => sr).then((v) => {
      n.component(`${s}BasicAdmin`, v.default);
    }), Promise.resolve().then(() => Zn).then((v) => {
      n.component(`${s}BasicFieldPick`, v.default);
    }), Promise.resolve().then(() => qn).then((v) => {
      n.component(`${s}BasicFoot`, v.default);
    }), Promise.resolve().then(() => An).then((v) => {
      n.component(`${s}BasicLed`, v.default);
    }), g.registerComponent("BasicHead", "VxgBasicHead"), g.registerComponent("BasicSide", "VxgBasicSide"), g.registerComponent("BasicMain", "VxgBasicMain"), g.registerComponent("BasicNavStages", "VxgBasicNavStages"), g.registerComponent("BasicAuth", "VxgBasicAuth"), g.registerComponent("BasicAdmin", "VxgBasicAdmin"), g.registerComponent("BasicFieldPick", "VxgBasicFieldPick"), g.registerComponent("BasicFoot", "VxgBasicFoot"), g.registerComponent("BasicLed", "VxgBasicLed")), n.config.globalProperties.$vxgVersion = Ht;
  }
};
export {
  rr as BasicAdmin,
  Qn as BasicAuth,
  Wn as BasicFieldPick,
  Gn as BasicFoot,
  Xr as BasicHead,
  Pn as BasicLed,
  ns as BasicMain,
  vr as BasicNavStages,
  Ts as BasicSide,
  Ut as HeadNavigation,
  Fr as HeadSearch,
  Vr as HeadToolbar,
  Yr as HeadUser,
  zr as HeadUtilities,
  nn as NavStageItem,
  hr as NavStagesExpansion,
  jn as StoreAdapter,
  In as Vxg,
  Os as VxgPlugin,
  Ms as createVxgPiniaStore,
  _s as createVxgVuexModule,
  Os as default,
  $s as useAdmin,
  Cs as useAuth,
  qr as useHeadActions,
  Zr as useHeadConfig,
  Wr as useHeadNavigation,
  Jr as useHeadPermissions,
  Gr as useHeadSearch,
  ir as useNavStages,
  ar as useSide,
  or as useSideSearch,
  lr as useStageRouting,
  Ht as version
};
//# sourceMappingURL=vxg.es.js.map
