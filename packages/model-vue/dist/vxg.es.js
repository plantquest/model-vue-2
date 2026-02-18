import { defineComponent as Ve, computed as ue, openBlock as pe, createBlock as Me, withCtx as fe, createVNode as le, createElementBlock as we, Fragment as Fe, renderList as Dt, createTextVNode as Te, toDisplayString as $e, createElementVNode as De, createCommentVNode as _e, ref as ke, renderSlot as rn, resolveComponent as qe, watch as Ce, normalizeClass as zt, onMounted as Bt, onUnmounted as Qe, unref as de, withDirectives as sn, vShow as an, normalizeStyle as on, isRef as Xe, withModifiers as ln, setBlockTracking as Ue, resolveDynamicComponent as Ft, nextTick as cn, mergeProps as It, toHandlers as jt, getCurrentInstance as un } from "vue";
import { VIcon as Pe } from "vuetify/components/VIcon";
import { useRouter as et, useRoute as qt } from "vue-router";
import { VBtn as He } from "vuetify/components/VBtn";
import { VFooter as dn } from "vuetify/components/VFooter";
import { VRow as Gt, VCol as Ze, VContainer as Jt, VSpacer as Vt } from "vuetify/components/VGrid";
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
import { VTooltip as Pt } from "vuetify/components/VTooltip";
import { VAppBar as wn } from "vuetify/components/VAppBar";
import { VMain as _n } from "vuetify/components/VMain";
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Je(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Zt = { exports: {} };
(function(n, u) {
  (function(l) {
    n.exports = l();
  })(function() {
    var l = { exports: {} };
    (function(N) {
      (function() {
        (function(T) {
          typeof l.exports == "object" ? l.exports = T() : (typeof window < "u" ? window : N !== void 0 ? N : typeof self < "u" ? self : this).Gex = T();
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
    }).call(this, typeof Ge < "u" ? Ge : typeof self < "u" ? self : typeof window < "u" ? window : {}), l = l.exports;
    var s, m, r, d, $, y, g, h, ae, ie = {}, re = this && this.__classPrivateFieldGet || function(N, T, _, R) {
      if (_ === "a" && !R) throw new TypeError("Private accessor was defined without a getter");
      if (typeof T == "function" ? N !== T || !R : !T.has(N)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return _ === "m" ? R : _ === "a" ? R.call(N) : R ? R.value : T.get(N);
    };
    Object.defineProperty(ie, "__esModule", { value: !0 }), ie.IntervalMatcher = ie.GexMatcher = void 0, ie.GexMatcher = class {
      constructor() {
      }
      make(N, T) {
        if (typeof T == "string" && T.match(/[*?]/)) {
          let _ = (0, l.Gex)(T);
          return { kind: "gex", match: (R) => _.on(R) != null, fix: T, meta: {}, same(R) {
            return R != null && R.kind === this.kind && R.fix === this.fix;
          } };
        }
      }
      scan(N, T) {
        let _ = N.filter((R) => R.fix === "*").length > 0;
        return { complete: _, sound: _, gaps: [], overs: [], why: "no-star" };
      }
    };
    const he = new RegExp(["^/s*", "(=*[<>/(/[]?=*)?/s*([-+0-9a-fA-FeEoOxX]+(/.([0-9a-fA-FeEoOxX]+))?)([/)/]]?)(/s*(,|&+|/|+|/./.)/s*(=*[<>]?=*)/s*([-+.0-9a-fA-FeEoOxX]+)/s*([/)/]]?))?/s*$"].join("").replace(/\//g, "\\"));
    class se {
      constructor() {
        this.kind = "interval", s.set(this, (T, _) => function(R) {
          return T(R) && _(R);
        }), m.set(this, (T, _) => function(R) {
          return T(R) || _(R);
        }), r.set(this, (T) => function(_) {
          return !1;
        }), d.set(this, (T) => function(_) {
          return !1;
        }), $.set(this, (T) => function(_) {
          return _ > T;
        }), y.set(this, (T) => function(_) {
          return _ >= T;
        }), g.set(this, (T) => function(_) {
          return _ < T;
        }), h.set(this, (T) => function(_) {
          return _ <= T;
        }), ae.set(this, (T) => function(_) {
          return _ === T;
        });
      }
      make(T, _) {
        if (typeof _ == "string" && _.match(/[=<>.[()\]]/)) {
          let R = _.match(he);
          if (R != null) {
            let C = se.normop(R[1]) || se.normop(R[5]), w = se.normop(R[8]) || se.normop(R[10]), z = re(this, C === "=" ? ae : C === "<" || C === ")" ? g : C === "<=" || C === "]" ? h : C === ">" || C === "(" ? $ : C === ">=" || C === "[" ? y : d, "f"), J = Number(R[2]), I = R[9] == null ? NaN : Number(R[9]), v = R[7], G = v == null ? re(this, m, "f") : v.substring(0, 1) === "&" || v.substring(0, 1) === "," ? re(this, s, "f") : re(this, m, "f");
            v === ".." && (G = re(this, s, "f"), z = re(this, d, "f") === z ? re(this, y, "f") : z, w = w === "" ? "<=" : w);
            let O = re(this, w == null ? r : w === "=" ? ae : w === "<" || w === ")" ? g : w === "<=" || w === "]" ? h : w === ">" ? $ : w === ">=" ? y : d, "f");
            if (J === I && (C === "=" && w != null ? (I = NaN, O = re(this, r, "f"), z = w.includes("<") ? re(this, h, "f") : w.includes(">") ? re(this, y, "f") : w.includes("=") ? re(this, ae, "f") : re(this, d, "f")) : w === "=" && C != null && (I = NaN, O = re(this, r, "f"), z = C.includes("<") ? re(this, h, "f") : C.includes(">") ? re(this, y, "f") : re(this, d, "f"))), re(this, d, "f") !== z && re(this, r, "f") === O && (re(this, g, "f") === z || re(this, h, "f") === z ? (O = z, I = J, z = re(this, y, "f"), J = Number.NEGATIVE_INFINITY, G = re(this, s, "f")) : re(this, $, "f") !== z && re(this, y, "f") !== z || (O = re(this, h, "f"), I = Number.POSITIVE_INFINITY, G = re(this, s, "f"))), !isNaN(I) && I < J) {
              let P = O, c = I;
              I = J, J = c, v !== ".." && (O = z, z = P);
            }
            let M = z(J), b = O(I), j = G(M, b);
            return { kind: "interval", fix: _, meta: { jo: j.name, o0: M.name, n0: J, o1: b.name, n1: I }, match: (P) => {
              let c = !1, e = parseFloat(P);
              return isNaN(e) || (c = j(e)), c;
            }, same(P) {
              return P != null && P.kind === this.kind && P.meta.jo === this.meta.jo && P.meta.o0 === this.meta.o0 && P.meta.n0 === this.meta.n0 && P.meta.o1 === this.meta.o1 && P.meta.n1 === this.meta.n1;
            } };
          }
        }
      }
      scan(T, _) {
        let R = { complete: !1, sound: !1, gaps: [], overs: [], lower: null, upper: null }, C = Number.NEGATIVE_INFINITY, w = Number.POSITIVE_INFINITY, z = this.half_intervals(T);
        z.reduce((I, v) => {
          let G = v.o === "eq", O = v.o === "lt", M = v.o === "lte", b = v.o === "gt", j = v.o === "gte", P = v.n;
          if (I.lower == null) {
            let c = { n: C, o: "gte" };
            I.lower = c, I.upper = v, C == P && j || (b || j ? I.gaps.push([c, { n: P, o: b ? "lte" : "lt", m: 0 }]) : G && I.gaps.push([c, { n: P, o: "lte", m: 1 }]));
          } else {
            let c = I.upper.o === "eq", e = I.upper.o === "lt", t = I.upper.o === "lte", k = I.upper.n, p = I.upper;
            P === k ? e && (j || G) || (t || c) && b || (c || e || t) && I.gaps.push([{ n: k, o: c || t ? "gt" : "gte", m: 2, d: { u: p, h: v } }, { n: P, o: G || j ? "lt" : "lte", m: 3 }]) : k < P ? O || M || (c || e || t) && I.gaps.push([{ n: k, o: c || t ? "gt" : "gte", m: 4 }, { n: P, o: G || j ? "lt" : "lte", m: 5 }]) : I.overs.push([{ n: P, o: G || j ? "gte" : "gt", m: 10 }, { n: k, o: c || t ? "lte" : "lt", m: 11 }]), I.upper = v;
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
          var I = R.indexOf(C[1].o), v = R.indexOf(w[1].o);
          return I < v ? -1 : v < I ? 1 : 0;
        }).reduce((C, w) => C.concat(...w), []);
      }
    }
    ie.IntervalMatcher = se, s = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap(), $ = /* @__PURE__ */ new WeakMap(), y = /* @__PURE__ */ new WeakMap(), g = /* @__PURE__ */ new WeakMap(), h = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), se.normop = (N) => N == null ? null : ((N.match(/([<>\(\)\[\]])/) || [])[1] || "") + ((N.match(/(=)/) || [])[1] || "");
    var Z = { exports: {} };
    function q(N) {
      var T = {}, _ = {};
      let R = [];
      return (N = N || {}).gex && R.push(new ie.GexMatcher()), N.interval && R.push(new ie.IntervalMatcher()), T.top = function() {
        return _;
      }, T.add = function(C, w) {
        C = { ...C };
        var z = typeof N == "function" ? N.call(T, C, w) : null, J = Object.keys(C).filter((c) => C[c] != null).sort();
        J.forEach(function(c) {
          C[c] = String(C[c]);
        });
        for (var I, v = _, G = 0; G < J.length; G++) {
          var O = J[G], M = C[O];
          let c = R.reduce((e, t) => e || t.make(O, M), void 0);
          if ((I = v.v) && O == v.k) if (c) {
            var b = (P = v.g = v.g || {})[O] = P[O] || [];
            v = (c = b.find((e) => e.same(c)) || (b.push(c), c)).keymap || (c.keymap = {});
          } else v = I[M] || (I[M] = {});
          else if (v.k) if (O < v.k) {
            var j = v.s;
            P = v.g, v.s = { k: v.k, v: v.v }, j && (v.s.s = j), P && (v.s.g = P), v.g && (v.g = {}), v.k = O, v.v = {}, c ? (b = (P = v.g = v.g || {})[O] = P[O] || [], v = (c = b.find((e) => e.same(c)) || (b.push(c), c)).keymap || (c.keymap = {})) : v = v.v[M] = {};
          } else v = v.s || (v.s = {}), G--;
          else if (v.k = O, v.v = {}, c) {
            var P;
            b = (P = v.g = v.g || {})[O] = P[O] || [], v = (c = b.find((e) => e.same(c)) || (b.push(c), c)).keymap || (c.keymap = {});
          } else v = v.v[M] = {};
        }
        return w !== void 0 && v && (v.d = w, z && (v.f = typeof z == "function" ? z : z.find, v.r = typeof z.remove == "function" ? z.remove : void 0)), T;
      }, T.findexact = function(C) {
        return T.find(C, !0);
      }, T.find = function(C, w, z) {
        if (C == null) return null;
        var J = _, I = _.d === void 0 ? null : _.d, v = _.f, G = null, O = [], M = {}, b = Object.keys(C).length, j = [];
        _.d !== void 0 && j.push(_.d);
        do {
          if (G = J.k, J.v) {
            var P = C[G], c = J.v[P];
            if (!c && J.g && J.g[G]) {
              for (var e = J.g[G], t = 0; t < e.length; t++) if (e[t].match(P)) {
                c = e[t].keymap;
                break;
              }
            }
            c ? (M[G] = !0, J.s && O.push(J.s), I = c.d === void 0 ? w ? null : I : c.d, z && c.d !== void 0 && j.push(c.d), v = c.f, J = c) : J = J.s;
          } else J = null;
          J == null && 0 < O.length && (I == null || z && !w) && (J = O.pop());
        } while (J);
        return w ? Object.keys(M).length !== b && (I = null) : I == null && _.d !== void 0 && (I = _.d), v && (I = v.call(T, C, I)), z ? j : I;
      }, T.remove = function(C) {
        var w, z = _, J = null, I = [];
        do
          if (w = z.k, z.v || z.g) {
            if (z.v) {
              var v = z.v[C[w]];
              v && I.push({ km: z, v: C[w] });
            }
            if (v == null && z.g) {
              let M = z.g[w] || [];
              for (let b = 0; b < M.length; b++) if (M[b].fix === C[w]) {
                I.push({ km: z, v: C[w], mv: M[b] }), v = M[b].keymap;
                break;
              }
            }
            v ? (J = v.d, z = v) : z = z.s;
          } else z = null;
        while (z);
        if (J !== void 0) {
          var G = I[I.length - 1];
          if (G && G.km && G.km.v) {
            var O = G.km.v[G.v] || G.mv && G.mv.keymap;
            !O || O.r && !O.r(C, O.d) || delete O.d;
          }
        }
      }, T.list = function(C, w) {
        C = C || {};
        var z = [];
        return _.d && z.push({ match: {}, data: _.d, find: _.f }), function J(I, v, G, O) {
          if (I.v) {
            var M, b = I.k, j = (0, l.Gex)(C ? C[b] == null ? w ? null : "*" : C[b] : "*"), P = { ...v }, c = { ...G };
            for (var e in I.v) if (e === C[b] || !w && C[b] == null || j.on(e)) {
              var t = { ...P };
              t[b] = e;
              var k = { ...c };
              delete k[b], M = I.v[e], Object.keys(k).length === 0 && M && M.d && O.push({ match: t, data: M.d, find: M.f }), M && M.v != null && J(M, { ...t }, { ...k }, O);
            }
            (M = I.s) && J(M, { ...P }, { ...c }, O);
          }
        }(_, {}, { ...C }, z), z;
      }, T.toString = function(C, w) {
        var z = C === !0 || !!w, J = typeof C == "function" ? C : function(O) {
          return typeof O == "function" ? "<" + O.name + ">" : "<" + O + ">";
        };
        function I(O, M) {
          for (var b = 0; b < M; b++) O.push(" ");
        }
        var v = [], G = [];
        return function O(M, b, j, P) {
          var c;
          if (M.d !== void 0 && (b.push(" " + J(M.d)), v.push(P.join(", ") + " -> " + J(M.d))), M.k && (b.push(`
`), I(b, j), b.push(M.k + ":")), (M.v || M.s || M.g) && j++, M.v) for (var e = Object.keys(M.v).sort(), t = 0; t < e.length; t++) {
            var k = e[t];
            b.push(`
`), I(b, j), b.push(k + " ->"), (c = P.slice()).push(M.k + "=" + k), O(M.v[k], b, j + 1, c);
          }
          if (M.g) for (e = Object.keys(M.g).sort(), t = 0; t < e.length; t++) for (var p = M.g[e[t]], A = 0; A < p.length; A++) {
            var U = p[A];
            b.push(`
`), I(b, j), b.push(U.fix + " ~>"), (c = P.slice()).push(M.k + "~" + U.fix), O(U.keymap, b, j + 1, c);
          }
          M.s && (b.push(`
`), I(b, j), b.push("|"), c = P.slice(), O(M.s, b, j + 1, c));
        }(_, G, 0, []), z ? G.join("") : v.join(`
`);
      }, T.inspect = T.toString, T.toJSON = function(C) {
        return JSON.stringify(_, function(w, z) {
          return typeof z == "function" ? "[Function]" : z;
        }, C);
      }, T;
    }
    function F(N) {
      return new q(N);
    }
    return Object.defineProperty(Z.exports, "__esModule", { value: !0 }), Z.exports.Gex = Z.exports.Patrun = void 0, Object.defineProperty(Z.exports, "Gex", { enumerable: !0, get: function() {
      return l.Gex;
    } }), Z.exports.Patrun = q, Z.exports = F, Z.exports.Patrun = q, Z.exports.Gex = l.Gex, Z.exports.default = F, Z = Z.exports;
  });
})(Zt);
var Mn = Zt.exports;
const Tn = /* @__PURE__ */ Je(Mn);
var Kt = { exports: {} };
(function(n, u) {
  (function(l) {
    n.exports = l();
  })(function() {
    var l = function(c) {
      var e;
      return function(t) {
        return e || c(e = { exports: {}, parent: t }, e.exports), e.exports;
      };
    }, s = l(function(c, e) {
      Object.defineProperty(e, "__esModule", { value: !0 }), e.values = e.keys = e.omap = e.str = e.prop = e.normalt = e.parserwrap = e.trimstk = e.tokenize = e.srcfmt = e.snip = e.regexp = e.mesc = e.makelog = e.isarr = e.filterRules = e.extract = e.escre = e.errinject = e.errdesc = e.entries = e.defprop = e.deep = e.configure = e.clone = e.clean = e.charset = e.badlex = e.assign = e.S = e.JsonicError = void 0;
      const t = m({}), k = (o) => o == null ? [] : Object.keys(o);
      e.keys = k, e.values = (o) => o == null ? [] : Object.values(o);
      const p = (o) => o == null ? [] : Object.entries(o);
      e.entries = p;
      const A = (o, ...a) => Object.assign(o ?? {}, ...a);
      e.assign = A, e.isarr = (o) => Array.isArray(o);
      const U = Object.defineProperty;
      e.defprop = U;
      const x = (o, a) => Object.entries(o || {}).reduce((i, X) => {
        let W = a ? a(X) : X;
        W[0] === void 0 ? delete i[X[0]] : i[W[0]] = W[1];
        let Q = 2;
        for (; W[Q] !== void 0; ) i[W[Q]] = W[Q + 1], Q += 2;
        return i;
      }, {});
      e.omap = x;
      const f = { indent: "  ", space: " ", Object: "Object", Array: "Array", object: "object", string: "string", function: "function", unexpected: "unexpected", map: "map", list: "list", elem: "elem", pair: "pair", val: "val", node: "node", no_re_flags: r.EMPTY, unprintable: "unprintable", invalid_ascii: "invalid_ascii", invalid_unicode: "invalid_unicode", invalid_lex_state: "invalid_lex_state", unterminated_string: "unterminated_string", unterminated_comment: "unterminated_comment", lex: "lex", parse: "parse", error: "error", none: "none", imp_map: "imp,map", imp_list: "imp,list", imp_null: "imp,null", end: "end", open: "open", close: "close", rule: "rule", stack: "stack", nUll: "null", name: "name", make: "make" };
      e.S = f;
      class D extends SyntaxError {
        constructor(a, i, X, W, Q) {
          let ge = ne(a, i = L({}, i), X, W, Q);
          super(ge.message), A(this, ge), Y(this);
        }
        toJSON() {
          return { ...this, __error: !0, name: this.name, message: this.message, stack: this.stack };
        }
      }
      function ee(o, a, i) {
        let X = a.t, W = X[o];
        return W == null && r.STRING === typeof o && (X[W = a.tI++] = o, X[o] = W, X[o.substring(1)] = W, i != null && A(i.token, a.t)), W;
      }
      function S(o, ...a) {
        return new RegExp(a.map((i) => i.esc ? K(i.toString()) : i).join(r.EMPTY), o ?? "");
      }
      function K(o) {
        return o == null ? "" : o.replace(/[-\\|\]{}()[^$+*?.!=]/g, "\\$&").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/\n/g, "\\n");
      }
      function L(o, ...a) {
        let i = f.function === typeof o, X = o != null && (f.object === typeof o || i);
        for (let W of a) {
          let Q, ge = f.function === typeof W, xe = W != null && (f.object === typeof W || ge);
          if (X && xe && !ge && Array.isArray(o) === Array.isArray(W)) for (let me in W) o[me] = L(o[me], W[me]);
          else o = W === void 0 ? o : ge ? W : xe ? f.function === typeof (Q = W.constructor) && f.Object !== Q.name && f.Array !== Q.name ? W : L(Array.isArray(W) ? [] : {}, W) : W, i = f.function === typeof o, X = o != null && (f.object === typeof o || i);
        }
        return o;
      }
      function H(o, a, i, X, W, Q) {
        let ge = { code: a, details: i, token: X, rule: W, ctx: Q };
        return o == null ? "" : o.replace(/\$([\w_]+)/g, (xe, me) => {
          let Se = JSON.stringify(ge[me] != null ? ge[me] : i[me] != null ? i[me] : Q.meta && Q.meta[me] != null ? Q.meta[me] : X[me] != null ? X[me] : W[me] != null ? W[me] : Q.opts[me] != null ? Q.opts[me] : Q.cfg[me] != null ? Q.cfg[me] : Q[me] != null ? Q[me] : "$" + me);
          return Se ?? "";
        });
      }
      function Y(o) {
        o.stack && (o.stack = o.stack.split(`
`).filter((a) => !a.includes("jsonic/jsonic")).map((a) => a.replace(/    at /, "at ")).join(`
`));
      }
      function oe(o, a, i) {
        let X = 0 < i.sI ? i.sI : 0, W = 0 < i.rI ? i.rI : 1, Q = 0 < i.cI ? i.cI : 1, ge = i.src == null ? r.EMPTY : i.src, xe = o.substring(Math.max(0, X - 333), X).split(`
`), me = o.substring(X, X + 333).split(`
`), Se = 2 + (r.EMPTY + (W + 2)).length, ye = W < 3 ? 1 : W - 2, Oe = (Ne) => "\x1B[34m" + (r.EMPTY + ye++).padStart(Se, " ") + " | \x1B[0m" + (Ne ?? r.EMPTY), Ee = xe.length;
        return [2 < Ee ? Oe(xe[Ee - 3]) : null, 1 < Ee ? Oe(xe[Ee - 2]) : null, Oe(xe[Ee - 1] + me[0]), " ".repeat(Se) + "   " + " ".repeat(Q - 1) + "\x1B[31m" + "^".repeat(ge.length || 1) + " " + a + "\x1B[0m", Oe(me[1]), Oe(me[2])].filter((Ne) => Ne != null).join(`
`);
      }
      function ne(o, a, i, X, W) {
        try {
          let Q = W.cfg, ge = W.meta, xe = H(Q.error[o] || Q.error.unknown, o, a, i, X, W);
          f.function === typeof Q.hint && (Q.hint = { ...Q.hint(), ...Q.hint });
          let me = ["\x1B[31m[jsonic/" + o + "]:\x1B[0m " + xe, "  \x1B[34m-->\x1B[0m " + (ge && ge.fileName || "<no-file>") + ":" + i.rI + ":" + i.cI, oe(W.src(), xe, i), "", H((Q.hint[o] || Q.hint.unknown || "").trim().split(`
`).map((ye) => "  " + ye).join(`
`), o, a, i, X, W), "", "  \x1B[2mhttps://jsonic.senecajs.org\x1B[0m", "  \x1B[2m--internal: rule=" + X.name + "~" + X.state + "; token=" + ee(i.tin, W.cfg) + (i.why == null ? "" : "~" + i.why) + "; plugins=" + W.plgn().map((ye) => ye.name).join(",") + `--\x1B[0m
`].join(`
`), Se = { internal: { token: i, ctx: W } };
          return Se = { ...Object.create(Se), message: me, code: o, details: a, meta: ge, fileName: ge ? ge.fileName : void 0, lineNumber: i.rI, columnNumber: i.cI };
        } catch (Q) {
          return console.log(Q), {};
        }
      }
      function V(o) {
        return typeof o.debug.print.src == "function" ? o.debug.print.src : (a, i) => a == null ? r.EMPTY : (i = JSON.stringify(a)).substring(0, o.debug.maxlen) + (o.debug.maxlen < i.length ? "..." : r.EMPTY);
      }
      function te(o, a = 44) {
        let i;
        try {
          i = typeof o == "object" ? JSON.stringify(o) : "" + o;
        } catch {
          i = "" + o;
        }
        return ce(a < i.length ? i.substring(0, a - 3) + "..." : i, a);
      }
      function ce(o, a = 5) {
        return o === void 0 ? "" : ("" + o).substring(0, a).replace(/[\r\n\t]/g, ".");
      }
      function E(...o) {
        return o == null ? {} : o.filter((a) => a !== !1).map((a) => typeof a == "object" ? k(a).join(r.EMPTY) : a).join(r.EMPTY).split(r.EMPTY).reduce((a, i) => (a[i] = i.charCodeAt(0), a), {});
      }
      function B(o) {
        for (let a in o) o[a] == null && delete o[a];
        return o;
      }
      e.JsonicError = D, e.configure = function(o, a, i) {
        var X, W, Q, ge, xe, me, Se, ye, Oe, Ee, Ne, Ae, Ie, ze, We, nt, rt, st, at, ot, it, lt, ct, ut, dt, pt, ft, mt, ht, gt, vt, xt, bt, kt, yt, St, wt, _t, Mt, Tt, Ct;
        const ve = a || {};
        ve.t = ve.t || {}, ve.tI = ve.tI || 1;
        const Be = (be) => ee(be, ve);
        i.standard$ !== !1 && (Be("#BD"), Be("#ZZ"), Be("#UK"), Be("#AA"), Be("#SP"), Be("#LN"), Be("#CM"), Be("#NR"), Be("#ST"), Be("#TX"), Be("#VL")), ve.fixed = { lex: !!(!((X = i.fixed) === null || X === void 0) && X.lex), token: i.fixed ? x(B(i.fixed.token), ([be, je]) => [je, ee(be, ve)]) : {}, ref: void 0 }, ve.fixed.ref = x(ve.fixed.token, ([be, je]) => [be, je]), ve.fixed.ref = Object.assign(ve.fixed.ref, x(ve.fixed.ref, ([be, je]) => [je, be])), ve.tokenSet = i.tokenSet ? Object.keys(i.tokenSet).reduce((be, je) => (be[je] = i.tokenSet[je].filter((Et) => Et != null).map((Et) => Be(Et)), be), { ...ve.tokenSet }) : {}, ve.tokenSetDerived = { ignore: Object.fromEntries((((W = i.tokenSet) === null || W === void 0 ? void 0 : W.ignore) || []).map((be) => [Be(be), !0])) }, ve.space = { lex: !!(!((Q = i.space) === null || Q === void 0) && Q.lex), chars: E((ge = i.space) === null || ge === void 0 ? void 0 : ge.chars) }, ve.line = { lex: !!(!((xe = i.line) === null || xe === void 0) && xe.lex), chars: E((me = i.line) === null || me === void 0 ? void 0 : me.chars), rowChars: E((Se = i.line) === null || Se === void 0 ? void 0 : Se.rowChars), single: !!(!((ye = i.line) === null || ye === void 0) && ye.single) }, ve.text = { lex: !!(!((Oe = i.text) === null || Oe === void 0) && Oe.lex), modify: (((Ee = ve.text) === null || Ee === void 0 ? void 0 : Ee.modify) || []).concat([(Ne = i.text) === null || Ne === void 0 ? void 0 : Ne.modify].flat()).filter((be) => be != null) }, ve.number = { lex: !!(!((Ae = i.number) === null || Ae === void 0) && Ae.lex), hex: !!(!((Ie = i.number) === null || Ie === void 0) && Ie.hex), oct: !!(!((ze = i.number) === null || ze === void 0) && ze.oct), bin: !!(!((We = i.number) === null || We === void 0) && We.bin), sep: ((nt = i.number) === null || nt === void 0 ? void 0 : nt.sep) != null && i.number.sep !== "", exclude: (rt = i.number) === null || rt === void 0 ? void 0 : rt.exclude, sepChar: (st = i.number) === null || st === void 0 ? void 0 : st.sep }, ve.value = { lex: !!(!((at = i.value) === null || at === void 0) && at.lex), map: p(((ot = i.value) === null || ot === void 0 ? void 0 : ot.map) || {}).reduce((be, je) => (je[1] == null || (be[je[0]] = je[1]), be), {}) }, ve.rule = { start: ((it = i.rule) === null || it === void 0 ? void 0 : it.start) == null ? "val" : i.rule.start, maxmul: ((lt = i.rule) === null || lt === void 0 ? void 0 : lt.maxmul) == null ? 3 : i.rule.maxmul, finish: !!(!((ct = i.rule) === null || ct === void 0) && ct.finish), include: !((ut = i.rule) === null || ut === void 0) && ut.include ? i.rule.include.split(/\s*,+\s*/).filter((be) => be !== "") : [], exclude: !((dt = i.rule) === null || dt === void 0) && dt.exclude ? i.rule.exclude.split(/\s*,+\s*/).filter((be) => be !== "") : [] }, ve.map = { extend: !!(!((pt = i.map) === null || pt === void 0) && pt.extend), merge: (ft = i.map) === null || ft === void 0 ? void 0 : ft.merge }, ve.list = { property: !!(!((mt = i.list) === null || mt === void 0) && mt.property) };
        let Ot = Object.keys(ve.fixed.token).sort((be, je) => je.length - be.length).map((be) => K(be)).join("|"), $t = !((ht = i.comment) === null || ht === void 0) && ht.lex ? (i.comment.marker || []).filter((be) => be.lex).map((be) => K(be.start)).join("|") : "", Rt = ["([", K(k(E(ve.space.lex && ve.space.chars, ve.line.lex && ve.line.chars)).join("")), "]", (typeof i.ender == "string" ? i.ender.split("") : Array.isArray(i.ender) ? i.ender : []).map((be) => "|" + K(be)).join(""), Ot === "" ? "" : "|", Ot, $t === "" ? "" : "|", $t, "|$)"];
        return ve.rePart = { fixed: Ot, ender: Rt, commentStart: $t }, ve.re = { ender: S(null, ...Rt), rowChars: S(null, K((gt = i.line) === null || gt === void 0 ? void 0 : gt.rowChars)), columns: S(null, "[" + K((vt = i.line) === null || vt === void 0 ? void 0 : vt.chars) + "]", "(.*)$") }, ve.lex = { empty: !!(!((xt = i.lex) === null || xt === void 0) && xt.empty), emptyResult: (bt = i.lex) === null || bt === void 0 ? void 0 : bt.emptyResult, match: !((kt = i.lex) === null || kt === void 0) && kt.match ? i.lex.match.map((be) => {
          let je = be(ve, i);
          return je.maker = be, je;
        }) : [] }, ve.debug = { get_console: ((yt = i.debug) === null || yt === void 0 ? void 0 : yt.get_console) || (() => console), maxlen: ((St = i.debug) === null || St === void 0 ? void 0 : St.maxlen) == null ? 99 : i.debug.maxlen, print: { config: !!(!((_t = (wt = i.debug) === null || wt === void 0 ? void 0 : wt.print) === null || _t === void 0) && _t.config), src: (Tt = (Mt = i.debug) === null || Mt === void 0 ? void 0 : Mt.print) === null || Tt === void 0 ? void 0 : Tt.src } }, ve.error = i.error || {}, ve.hint = i.hint || {}, !((Ct = i.config) === null || Ct === void 0) && Ct.modify && k(i.config.modify).forEach((be) => i.config.modify[be](ve, i)), ve.debug.print.config && ve.debug.get_console().dir(ve, { depth: null }), ve.result = { fail: [] }, i.result && (ve.result.fail = [...i.result.fail]), A(o.options, i), A(o.token, ve.t), A(o.fixed, ve.fixed.ref), ve;
      }, e.tokenize = ee, e.mesc = function(o, a) {
        return (a = new String(o)).esc = !0, a;
      }, e.regexp = S, e.escre = K, e.deep = L, e.errinject = H, e.trimstk = Y, e.extract = oe, e.errdesc = ne, e.badlex = function(o, a, i) {
        let X = (W) => {
          let Q = o.next(W);
          if (a === Q.tin) {
            let ge = {};
            throw Q.use != null && (ge.use = Q.use), new D(Q.why || f.unexpected, ge, Q, W, i);
          }
          return Q;
        };
        return X.src = o.src, X;
      }, e.makelog = function(o, a) {
        var i, X, W;
        let Q = (W = (X = (i = o.opts) === null || i === void 0 ? void 0 : i.plugin) === null || X === void 0 ? void 0 : X.debug) === null || W === void 0 ? void 0 : W.trace;
        if (a || Q) if (typeof a?.log == "number" || Q) {
          let ge = !1, xe = a?.log;
          (xe === -1 || Q) && (xe = 1, ge = !0), o.log = (...me) => {
            if (ge) {
              let Se = me.filter((ye) => f.object != typeof ye).map((ye) => f.function == typeof ye ? ye.name : ye).join(f.indent);
              o.cfg.debug.get_console().log(Se);
            } else o.cfg.debug.get_console().dir(me, { depth: xe });
          };
        } else typeof a.log == "function" && (o.log = a.log);
        return o.log;
      }, e.srcfmt = V, e.str = te, e.snip = ce, e.clone = function(o) {
        return L(Object.create(Object.getPrototypeOf(o)), o);
      }, e.charset = E, e.clean = B, e.filterRules = function(o, a) {
        let i = ["open", "close"];
        for (let X of i) o.def[X] = o.def[X].map((W) => (W.g = typeof W.g == "string" ? (W.g || "").split(/\s*,+\s*/) : W.g || [], W)).filter((W) => a.rule.include.reduce((Q, ge) => Q || W.g != null && W.g.indexOf(ge) !== -1, a.rule.include.length === 0)).filter((W) => a.rule.exclude.reduce((Q, ge) => Q && (W.g == null || W.g.indexOf(ge) === -1), !0));
        return o;
      }, e.normalt = function(o) {
        if (o.c != null) {
          let a = o.c.n, i = o.c.d;
          a == null && i == null || (o.c = function(X) {
            let W = !0;
            if (a != null) for (let Q in a) W = W && (X.n[Q] == null || X.n[Q] <= (a[Q] == null ? 0 : a[Q]));
            return i != null && (W = W && X.d <= i), W;
          }, a != null && (o.c.n = a), i != null && (o.c.d = i));
        }
        if (r.STRING === typeof o.g && (o.g = o.g.split(/\s*,\s*/)), o.s && o.s.length !== 0) {
          const a = (xe) => xe.flat().filter((me) => typeof me == "number"), i = (xe, me) => xe.filter((Se) => 31 * me <= Se && Se < 31 * (me + 1)), X = (xe, me) => xe.reduce((Se, ye) => 1 << ye - (31 * me + 1) | Se, 0), W = a([o.s[0]]), Q = a([o.s[1]]), ge = o;
          ge.S0 = 0 < W.length ? new Array(Math.max(...W.map((xe) => 1 + xe / 31 | 0))).fill(null).map((xe, me) => me).map((xe) => X(i(W, xe), xe)) : null, ge.S1 = 0 < Q.length ? new Array(Math.max(...Q.map((xe) => 1 + xe / 31 | 0))).fill(null).map((xe, me) => me).map((xe) => X(i(Q, xe), xe)) : null;
        } else o.s = null;
        return o;
      }, e.prop = function(o, a, i) {
        let X = o;
        try {
          let W, Q = a.split(".");
          for (let ge = 0; ge < Q.length; ge++) W = Q[ge], ge < Q.length - 1 && (o = o[W] = o[W] || {});
          return i !== void 0 && (o[W] = i), o[W];
        } catch {
          throw new Error("Cannot " + (i === void 0 ? "get" : "set") + " path " + a + " on object: " + te(X) + (i === void 0 ? "" : " to value: " + te(i, 22)));
        }
      }, e.parserwrap = function(o) {
        return { start: function(a, i, X, W) {
          try {
            return o.start(a, i, X, W);
          } catch (Q) {
            if (Q.name === "SyntaxError") {
              let ge = 0, xe = 0, me = 0, Se = r.EMPTY, ye = Q.message.match(/^Unexpected token (.) .*position\s+(\d+)/i);
              if (ye) {
                Se = ye[1], ge = parseInt(ye[2]), xe = a.substring(0, ge).replace(/[^\n]/g, r.EMPTY).length;
                let Ee = ge - 1;
                for (; -1 < Ee && a.charAt(Ee) !== `
`; ) Ee--;
                me = Math.max(a.substring(Ee, ge).length, 0);
              }
              let Oe = Q.token || (0, t.makeToken)("#UK", ee("#UK", i.internal().config), void 0, Se, (0, t.makePoint)(Se.length, ge, Q.lineNumber || xe, Q.columnNumber || me));
              throw new D(Q.code || "json", Q.details || { msg: Q.message }, Oe, {}, Q.ctx || { uI: -1, opts: i.options, cfg: i.internal().config, token: Oe, meta: X, src: () => a, root: () => {
              }, plgn: () => i.internal().plugins, rule: { name: "no-rule" }, sub: {}, xs: -1, v2: Oe, v1: Oe, t0: Oe, t1: Oe, tC: -1, rs: [], rsI: 0, next: () => Oe, rsm: {}, n: {}, log: X ? X.log : void 0, F: V(i.internal().config), use: {}, NORULE: { name: "no-rule" }, NOTOKEN: { name: "no-token" } });
            }
            throw Q;
          }
        } };
      };
    }), m = l(function(c, e) {
      Object.defineProperty(e, "__esModule", { value: !0 }), e.makeTextMatcher = e.makeNumberMatcher = e.makeCommentMatcher = e.makeStringMatcher = e.makeLineMatcher = e.makeSpaceMatcher = e.makeFixedMatcher = e.makeToken = e.makePoint = e.makeLex = e.makeNoToken = void 0;
      const t = s({});
      class k {
        constructor(ee, S, K, L) {
          this.len = -1, this.sI = 0, this.rI = 1, this.cI = 1, this.token = [], this.len = ee, S != null && (this.sI = S), K != null && (this.rI = K), L != null && (this.cI = L);
        }
        toString() {
          return "Point[" + [this.sI + "/" + this.len, this.rI, this.cI] + (0 < this.token.length ? " " + this.token : "") + "]";
        }
        [r.INSPECT]() {
          return this.toString();
        }
      }
      const p = (...D) => new k(...D);
      e.makePoint = p;
      class A {
        constructor(ee, S, K, L, H, Y, oe) {
          this.isToken = !0, this.name = r.EMPTY, this.tin = -1, this.val = void 0, this.src = r.EMPTY, this.sI = -1, this.rI = -1, this.cI = -1, this.len = -1, this.name = ee, this.tin = S, this.src = L, this.val = K, this.sI = H.sI, this.rI = H.rI, this.cI = H.cI, this.use = Y, this.why = oe, this.len = L == null ? 0 : L.length;
        }
        resolveVal(ee, S) {
          return typeof this.val == "function" ? this.val(ee, S) : this.val;
        }
        bad(ee, S) {
          return this.err = ee, S != null && (this.use = (0, t.deep)(this.use || {}, S)), this;
        }
        toString() {
          return "Token[" + this.name + "=" + this.tin + " " + (0, t.snip)(this.src) + (this.val === void 0 || this.name === "#ST" || this.name === "#TX" ? "" : "=" + (0, t.snip)(this.val)) + " " + [this.sI, this.rI, this.cI] + (this.use == null ? "" : " " + (0, t.snip)("" + JSON.stringify(this.use).replace(/"/g, ""), 22)) + (this.err == null ? "" : " " + this.err) + (this.why == null ? "" : " " + (0, t.snip)("" + this.why, 22)) + "]";
        }
        [r.INSPECT]() {
          return this.toString();
        }
      }
      const U = (...D) => new A(...D);
      function x(D, ee, S) {
        let K = D.pnt, L = ee;
        if (D.cfg.fixed.lex && S != null && 0 < S.length) {
          let H, Y = D.cfg.fixed.token[S];
          Y != null && (H = D.token(Y, void 0, S, K)), H != null && (K.sI += H.src.length, K.cI += H.src.length, ee == null ? L = H : K.token.push(H));
        }
        return L;
      }
      e.makeToken = U, e.makeNoToken = () => U("", -1, void 0, r.EMPTY, p(-1)), e.makeFixedMatcher = (D, ee) => {
        let S = (0, t.regexp)(null, "^(", D.rePart.fixed, ")");
        return function(K) {
          let L = D.fixed;
          if (!L.lex) return;
          let H = K.pnt, Y = K.src.substring(H.sI).match(S);
          if (Y) {
            let oe = Y[1], ne = oe.length;
            if (0 < ne) {
              let V, te = L.token[oe];
              return te != null && (V = K.token(te, void 0, oe, H), H.sI += ne, H.cI += ne), V;
            }
          }
        };
      }, e.makeCommentMatcher = (D, ee) => {
        let S = ee.comment;
        D.comment = { lex: !!S && !!S.lex, marker: (S?.marker || []).map((H) => {
          let Y = { start: H.start, end: H.end, line: !!H.line, lex: !!H.lex, suffixMatch: void 0 };
          return Y.getSuffixMatch = H.suffix ? () => {
            if (H.suffix instanceof Function) return Y.suffixMatch = H.suffix;
            let oe = (Array.isArray(H.suffix) ? H.suffix : [H.suffix]).map((V) => D.lex.match.find((te) => {
              var ce;
              return ((ce = te.maker) === null || ce === void 0 ? void 0 : ce.name) == V;
            })).filter((V) => V != null), ne = (...V) => {
              oe.map((te) => te(...V));
            };
            return (0, t.defprop)(ne, "name", { value: "" + H.suffix }), ne;
          } : void 0, Y;
        }) };
        let K = D.comment.lex ? D.comment.marker.filter((H) => H.lex && H.line) : [], L = D.comment.lex ? D.comment.marker.filter((H) => H.lex && !H.line) : [];
        return function(H, Y) {
          if (!D.comment.lex) return;
          let oe = H.pnt, ne = H.src.substring(oe.sI), V = oe.rI, te = oe.cI;
          for (let ce of K) if (ne.startsWith(ce.start)) {
            let E = ne.length, B = ce.start.length;
            for (te += ce.start.length; B < E && !D.line.chars[ne[B]]; ) te++, B++;
            let o = ne.substring(0, B), a = H.token("#CM", void 0, o, oe);
            return oe.sI += o.length, oe.cI = te, ce.suffixMatch ? ce.suffixMatch(H, Y) : ce.getSuffixMatch && (ce.suffixMatch = ce.getSuffixMatch(), ce.suffixMatch && ce.suffixMatch(H, Y)), a;
          }
          for (let ce of L) if (ne.startsWith(ce.start)) {
            let E = ne.length, B = ce.start.length, o = ce.end;
            for (te += ce.start.length; B < E && !ne.substring(B).startsWith(o); ) D.line.rowChars[ne[B]] && (V++, te = 0), te++, B++;
            if (ne.substring(B).startsWith(o)) {
              te += o.length;
              let a = ne.substring(0, B + o.length), i = H.token("#CM", void 0, a, oe);
              return oe.sI += a.length, oe.rI = V, oe.cI = te, i;
            }
            return H.bad(t.S.unterminated_comment, oe.sI, oe.sI + 9 * ce.start.length);
          }
        };
      }, e.makeTextMatcher = (D, ee) => {
        let S = (0, t.regexp)(D.line.lex ? null : "s", "^(.*?)", ...D.rePart.ender);
        return function(K) {
          let L = D.text, H = K.pnt, Y = K.src.substring(H.sI), oe = D.value.map, ne = Y.match(S);
          if (ne) {
            let V = ne[1], te = ne[2], ce;
            if (V != null) {
              let E = V.length;
              if (0 < E) {
                let B;
                D.value.lex && (B = oe[V]) !== void 0 ? (ce = K.token("#VL", B.val, V, H), H.sI += E, H.cI += E) : L.lex && (ce = K.token("#TX", V, V, H), H.sI += E, H.cI += E);
              }
            }
            if (ce && (ce = x(K, ce, te)), ce && 0 < D.text.modify.length) {
              const E = D.text.modify;
              for (let B = 0; B < E.length; B++) ce.val = E[B](ce.val, K, D, ee);
            }
            return ce;
          }
        };
      }, e.makeNumberMatcher = (D, ee) => {
        let S = D.number, K = (0, t.regexp)(null, ["^([-+]?(0(", [S.hex ? "x[0-9a-fA-F_]+" : null, S.oct ? "o[0-7_]+" : null, S.bin ? "b[01_]+" : null].filter((H) => H != null).join("|"), ")|[.0-9]+([0-9_]*[0-9])?)", "(\\.[0-9]?([0-9_]*[0-9])?)?", "([eE][-+]?[0-9]+([0-9_]*[0-9])?)?"].join("").replace(/_/g, S.sep ? (0, t.escre)(S.sepChar) : ""), ")", ...D.rePart.ender), L = S.sep ? (0, t.regexp)("g", (0, t.escre)(S.sepChar)) : void 0;
        return function(H) {
          if (!(S = D.number).lex) return;
          let Y = H.pnt, oe = H.src.substring(Y.sI), ne = D.value.map, V = oe.match(K);
          if (V) {
            let te = V[1], ce = V[9], E, B = !0;
            if (te != null && (B = !D.number.exclude || !te.match(D.number.exclude))) {
              let o = te.length;
              if (0 < o) {
                let a;
                if (D.value.lex && (a = ne[te]) !== void 0) E = H.token("#VL", a.val, te, Y);
                else {
                  let i = L ? te.replace(L, "") : te, X = +i;
                  if (isNaN(X)) {
                    let W = i[0];
                    W !== "-" && W !== "+" || (X = (W === "-" ? -1 : 1) * +i.substring(1));
                  }
                  isNaN(X) || (E = H.token("#NR", X, te, Y), Y.sI += o, Y.cI += o);
                }
              }
            }
            return B && (E = x(H, E, ce)), E;
          }
        };
      }, e.makeStringMatcher = (D, ee) => {
        let S = ee.string || {};
        return D.string = D.string || {}, D.string = (0, t.deep)(D.string, { lex: !!S?.lex, quoteMap: (0, t.charset)(S.chars), multiChars: (0, t.charset)(S.multiChars), escMap: (0, t.clean)({ ...S.escape }), escChar: S.escapeChar, escCharCode: S.escapeChar == null ? void 0 : S.escapeChar.charCodeAt(0), allowUnknown: !!S.allowUnknown, replaceCodeMap: (0, t.omap)((0, t.clean)({ ...S.replace }), ([K, L]) => [K.charCodeAt(0), L]), hasReplace: !1 }), D.string.hasReplace = 0 < (0, t.keys)(D.string.replaceCodeMap).length, function(K) {
          let L = D.string;
          if (!L.lex) return;
          let { quoteMap: H, escMap: Y, escChar: oe, escCharCode: ne, multiChars: V, allowUnknown: te, replaceCodeMap: ce, hasReplace: E } = L, { pnt: B, src: o } = K, { sI: a, rI: i, cI: X } = B, W = o.length;
          if (H[o[a]]) {
            const Q = o[a], ge = a, xe = i, me = V[Q];
            ++a, ++X;
            let Se, ye = [];
            for (; a < W; a++) {
              X++;
              let Ee = o[a];
              if (Se = void 0, Q === Ee) {
                a++;
                break;
              }
              if (oe === Ee) {
                X++;
                let Ne = Y[o[++a]];
                if (Ne != null) ye.push(Ne);
                else if (o[a] === "x") {
                  a++;
                  let Ae = parseInt(o.substring(a, a + 2), 16);
                  if (isNaN(Ae)) return a -= 2, X -= 2, B.sI = a, B.cI = X, K.bad(t.S.invalid_ascii, a, a + 4);
                  let Ie = String.fromCharCode(Ae);
                  ye.push(Ie), a += 1, X += 2;
                } else if (o[a] === "u") {
                  let Ae = o[++a] === "{" ? (a++, 1) : 0, Ie = Ae ? 6 : 4, ze = parseInt(o.substring(a, a + Ie), 16);
                  if (isNaN(ze)) return a = a - 2 - Ae, X -= 2, B.sI = a, B.cI = X, K.bad(t.S.invalid_unicode, a, a + Ie + 2 + 2 * Ae);
                  let We = String.fromCodePoint(ze);
                  ye.push(We), a += Ie - 1 + Ae, X += Ie + Ae;
                } else {
                  if (!te) return B.sI = a, B.cI = X - 1, K.bad(t.S.unexpected, a, a + 1);
                  ye.push(o[a]);
                }
              } else if (E && (Se = ce[o.charCodeAt(a)]) !== void 0) ye.push(Se), X++;
              else {
                let Ne = a, Ae = Q.charCodeAt(0), Ie = o.charCodeAt(a);
                for (; (!E || (Se = ce[Ie]) === void 0) && a < W && 32 <= Ie && Ae !== Ie && ne !== Ie; ) Ie = o.charCodeAt(++a), X++;
                if (X--, Se === void 0 && Ie < 32) {
                  if (!me || !D.line.chars[o[a]]) return B.sI = a, B.cI = X, K.bad(t.S.unprintable, a, a + 1);
                  D.line.rowChars[o[a]] && (B.rI = ++i), X = 1, ye.push(o.substring(Ne, a + 1));
                } else ye.push(o.substring(Ne, a)), a--;
              }
            }
            if (o[a - 1] !== Q || B.sI === a - 1) return B.rI = xe, K.bad(t.S.unterminated_string, ge, a);
            const Oe = K.token("#ST", ye.join(r.EMPTY), o.substring(B.sI, a), B);
            return B.sI = a, B.rI = i, B.cI = X, Oe;
          }
        };
      }, e.makeLineMatcher = (D, ee) => function(S) {
        if (!D.line.lex) return;
        let { chars: K, rowChars: L } = D.line, { pnt: H, src: Y } = S, { sI: oe, rI: ne } = H, V = D.line.single, te;
        for (V && (te = {}); K[Y[oe]] && !(te && (te[Y[oe]] = (te[Y[oe]] || 0) + 1, V && 1 < te[Y[oe]])); ) ne += L[Y[oe]] ? 1 : 0, oe++;
        if (H.sI < oe) {
          let ce = Y.substring(H.sI, oe);
          const E = S.token("#LN", void 0, ce, H);
          return H.sI += ce.length, H.rI = ne, H.cI = 1, E;
        }
      }, e.makeSpaceMatcher = (D, ee) => function(S) {
        if (!D.space.lex) return;
        let { chars: K } = D.space, { pnt: L, src: H } = S, { sI: Y, cI: oe } = L;
        for (; K[H[Y]]; ) Y++, oe++;
        if (L.sI < Y) {
          let ne = H.substring(L.sI, Y);
          const V = S.token("#SP", void 0, ne, L);
          return L.sI += ne.length, L.cI = oe, V;
        }
      };
      class f {
        constructor(ee) {
          this.src = r.EMPTY, this.ctx = {}, this.cfg = {}, this.pnt = p(-1), this.ctx = ee, this.src = ee.src(), this.cfg = ee.cfg, this.pnt = p(this.src.length);
        }
        token(ee, S, K, L, H, Y) {
          let oe, ne;
          return typeof ee == "string" ? (ne = ee, oe = (0, t.tokenize)(ne, this.cfg)) : (oe = ee, ne = (0, t.tokenize)(ee, this.cfg)), U(ne, oe, S, K, L || this.pnt, H, Y);
        }
        next(ee) {
          let S, K, L = this.pnt, H = L.sI;
          if (L.end) S = L.end;
          else if (0 < L.token.length) S = L.token.shift();
          else if (L.len <= L.sI) L.end = this.token("#ZZ", void 0, "", L), S = L.end;
          else {
            for (let Y of this.cfg.lex.match) if (S = Y(this, ee)) {
              K = Y;
              break;
            }
            S = S || this.token("#BD", void 0, this.src[L.sI], L, void 0, "unexpected");
          }
          return this.ctx.log && this.ctx.log(t.S.indent.repeat(ee.d) + t.S.lex, (0, t.tokenize)(S.tin, this.cfg), this.ctx.F(S.src), L.sI, L.rI + ":" + L.cI, K?.name || "none", this.ctx.F(this.src.substring(H, H + 16))), this.ctx.sub.lex && this.ctx.sub.lex.map((Y) => Y(S, ee, this.ctx)), S;
        }
        tokenize(ee) {
          return (0, t.tokenize)(ee, this.cfg);
        }
        bad(ee, S, K) {
          return this.token("#BD", void 0, 0 <= S && S <= K ? this.src.substring(S, K) : this.src[this.pnt.sI], void 0, void 0, ee);
        }
      }
      e.makeLex = (...D) => new f(...D);
    }), r = {};
    Object.defineProperty(r, "__esModule", { value: !0 }), r.STRING = r.INSPECT = r.EMPTY = r.AFTER = r.BEFORE = r.CLOSE = r.OPEN = void 0, r.OPEN = "o", r.CLOSE = "c", r.BEFORE = "b", r.AFTER = "a", r.EMPTY = "", r.INSPECT = Symbol.for("nodejs.util.inspect.custom"), r.STRING = "string";
    var d = {};
    Object.defineProperty(d, "__esModule", { value: !0 }), d.defaults = void 0;
    const $ = m({}), y = { tag: "-", fixed: { lex: !0, token: { "#OB": "{", "#CB": "}", "#OS": "[", "#CS": "]", "#CL": ":", "#CA": "," } }, tokenSet: { ignore: ["#SP", "#LN", "#CM"], val: ["#TX", "#NR", "#ST", "#VL"], key: ["#TX", "#NR", "#ST", "#VL"] }, space: { lex: !0, chars: " 	" }, line: { lex: !0, chars: `\r
`, rowChars: `
`, single: !1 }, text: { lex: !0 }, number: { lex: !0, hex: !0, oct: !0, bin: !0, sep: "_", exclude: void 0 }, comment: { lex: !0, marker: [{ line: !0, start: "#", lex: !0 }, { line: !0, start: "//", lex: !0 }, { line: !1, start: "/*", end: "*/", lex: !0 }] }, string: { lex: !0, chars: "'\"`", multiChars: "`", escapeChar: "\\", escape: { b: "\b", f: "\f", n: `
`, r: "\r", t: "	", v: "\v", '"': '"', "'": "'", "`": "`", "\\": "\\", "/": "/" }, allowUnknown: !0 }, map: { extend: !0, merge: void 0 }, list: { property: !0 }, value: { lex: !0, map: { true: { val: !0 }, false: { val: !1 }, null: { val: null } } }, ender: [], plugin: {}, debug: { get_console: () => console, maxlen: 99, print: { config: !1, src: void 0 } }, error: { unknown: "unknown error: $code", unexpected: "unexpected character(s): $src", invalid_unicode: "invalid unicode escape: $src", invalid_ascii: "invalid ascii escape: $src", unprintable: "unprintable character: $src", unterminated_string: "unterminated string: $src", unterminated_comment: "unterminated comment: $src", unknown_rule: "unknown rule: $rulename" }, hint: function(c = (t, k = "replace") => t[k](/[A-Z]/g, (p) => " " + p.toLowerCase())[k](/[~%][a-z]/g, (p) => (p[0] == "~" ? " " : "") + p[1].toUpperCase()), e = `~sinceTheErrorIsUnknown,ThisIsProbablyABugInsideJsonic
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
      return "unknown|unexpected|invalid_unicode|invalid_ascii|unprintable|unterminated_string|unterminated_comment|unknown_rule".split("|").reduce((t, k, p) => (t[k] = c(e[p]), t), {});
    }, lex: { match: [$.makeFixedMatcher, $.makeSpaceMatcher, $.makeLineMatcher, $.makeStringMatcher, $.makeCommentMatcher, $.makeNumberMatcher, $.makeTextMatcher], empty: !0, emptyResult: void 0 }, rule: { start: "val", finish: !0, maxmul: 3, include: "", exclude: "" }, result: { fail: [] }, config: { modify: {} }, parser: { start: void 0 } };
    d.defaults = y;
    var g = {};
    Object.defineProperty(g, "__esModule", { value: !0 }), g.Parser = g.makeRuleSpec = g.makeRule = void 0;
    const h = s({}), ae = m({});
    class ie {
      constructor(e, t, k) {
        this.id = -1, this.name = r.EMPTY, this.node = null, this.state = r.OPEN, this.n = /* @__PURE__ */ Object.create(null), this.d = -1, this.use = /* @__PURE__ */ Object.create(null), this.keep = /* @__PURE__ */ Object.create(null), this.bo = !1, this.ao = !1, this.bc = !1, this.ac = !1, this.os = 0, this.cs = 0, this.id = t.uI++, this.name = e.name, this.spec = e, this.child = t.NORULE, this.parent = t.NORULE, this.prev = t.NORULE, this.o0 = t.NOTOKEN, this.o1 = t.NOTOKEN, this.c0 = t.NOTOKEN, this.c1 = t.NOTOKEN, this.node = k, this.d = t.rsI, this.bo = e.def.bo != null, this.ao = e.def.ao != null, this.bc = e.def.bc != null, this.ac = e.def.ac != null;
      }
      process(e) {
        return this.spec.process(this, e, this.state);
      }
      toString() {
        return "[Rule " + this.name + "~" + this.id + "]";
      }
    }
    const re = (...c) => new ie(...c);
    g.makeRule = re;
    class he {
      constructor() {
        this.p = r.EMPTY, this.r = r.EMPTY, this.b = 0;
      }
    }
    const se = (...c) => new he(...c), Z = se(), q = se();
    class F {
      constructor(e, t) {
        this.name = r.EMPTY, this.def = { open: [], close: [], bo: [], bc: [], ao: [], ac: [] }, this.cfg = e, this.def = Object.assign(this.def, t), this.def.open = (this.def.open || []).filter((k) => k != null), this.def.close = (this.def.close || []).filter((k) => k != null);
        for (let k of [...this.def.open, ...this.def.close]) (0, h.normalt)(k);
      }
      tin(e) {
        return (0, h.tokenize)(e, this.cfg);
      }
      add(e, t, k) {
        let p = k?.append ? "push" : "unshift", A = ((0, h.isarr)(t) ? t : [t]).filter((f) => f != null && typeof f == "object").map((f) => (0, h.normalt)(f)), U = e === "o" ? "open" : "close", x = this.def[U];
        if (x[p](...A), k) {
          if (k.delete) for (let f = 0; f < k.delete.length; f++) x[(x.length + k.delete[f]) % x.length] = null;
          if (k.move) for (let f = 0; f < k.move.length; f += 2) {
            let D = (x.length + k.move[f]) % x.length, ee = (x.length + k.move[f + 1]) % x.length, S = x[D];
            x.splice(D, 1), x.splice(ee, 0, S);
          }
          this.def[U] = x.filter((f) => f != null);
        }
        return (0, h.filterRules)(this, this.cfg), this;
      }
      open(e, t) {
        return this.add("o", e, t);
      }
      close(e, t) {
        return this.add("c", e, t);
      }
      action(e, t, k, p) {
        let A = this.def[t + k];
        return e ? A.push(p) : A.unshift(p), this;
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
      process(e, t, k) {
        let p = r.EMPTY, A = t.F, U = k === "o", x = U ? e : t.NORULE, f = this.def, D = U ? f.open : f.close, ee = U ? e.bo ? f.bo : null : e.bc ? f.bc : null;
        if (ee) {
          let Y;
          for (let oe = 0; oe < ee.length; oe++) if ((Y = ee[oe].call(this, e, t, x, Y)) != null && Y.isToken && Y?.err) return this.bad(Y, e, t, { is_open: U });
        }
        let S = 0 < D.length ? this.parse_alts(U, D, e, t) : q;
        if (S.h && (S = S.h(e, t, S, x) || S, p += "H"), S.e) return this.bad(S.e, e, t, { is_open: U });
        if (S.n) for (let Y in S.n) e.n[Y] = S.n[Y] === 0 ? 0 : (e.n[Y] == null ? 0 : e.n[Y]) + S.n[Y];
        if (S.u && (e.use = Object.assign(e.use, S.u)), S.k && (e.keep = Object.assign(e.keep, S.k)), S.a) {
          p += "A";
          let Y = S.a.call(this, e, t, S);
          if (Y && Y.isToken && Y.err) return this.bad(Y, e, t, { is_open: U });
        }
        if (S.p) {
          t.rs[t.rsI++] = e;
          let Y = t.rsm[S.p];
          if (!Y) return this.bad(this.unknownRule(t.t0, S.p), e, t, { is_open: U });
          (x = e.child = re(Y, t, e.node)).parent = e, x.n = { ...e.n }, 0 < Object.keys(e.keep).length && (x.keep = { ...e.keep }), p += "@p:" + S.p;
        } else if (S.r) {
          let Y = t.rsm[S.r];
          if (!Y) return this.bad(this.unknownRule(t.t0, S.r), e, t, { is_open: U });
          (x = re(Y, t, e.node)).parent = e.parent, x.prev = e, x.n = { ...e.n }, 0 < Object.keys(e.keep).length && (x.keep = { ...e.keep }), p += "@r:" + S.r;
        } else U || (x = t.rs[--t.rsI] || t.NORULE), p += "Z";
        let K = U ? e.ao ? f.ao : null : e.ac ? f.ac : null;
        if (K) {
          let Y;
          for (let oe = 0; oe < K.length; oe++) if ((Y = K[oe].call(this, e, t, x, Y)) != null && Y.isToken && Y?.err) return this.bad(Y, e, t, { is_open: U });
        }
        x.why = p, t.log && t.log(h.S.indent.repeat(e.d) + h.S.node + h.S.space, e.state.toUpperCase(), (e.prev.id + "/" + e.parent.id + "/" + e.child.id).padEnd(12), e.name + "~" + e.id, "w=" + p, "n:" + (0, h.entries)(e.n).filter((Y) => Y[1]).map((Y) => Y[0] + "=" + Y[1]).join(";"), "u:" + (0, h.entries)(e.use).map((Y) => Y[0] + "=" + Y[1]).join(";"), "k:" + (0, h.entries)(e.keep).map((Y) => Y[0] + "=" + Y[1]).join(";"), "<" + A(e.node) + ">");
        let L = 0, H = e[U ? "os" : "cs"] - (S.b || 0);
        for (; L++ < H; ) t.next();
        return r.OPEN === e.state && (e.state = r.CLOSE), x;
      }
      parse_alts(e, t, k, p) {
        let A = Z;
        A.b = 0, A.p = r.EMPTY, A.r = r.EMPTY, A.n = void 0, A.h = void 0, A.a = void 0, A.u = void 0, A.k = void 0, A.e = void 0;
        let U, x = null, f = 0, D = p.cfg.t, ee = 1 << D.AA - 1, S = t.length;
        for (f = 0; f < S; f++) {
          x = t[f];
          let L = p.t0.tin, H = !1, Y = !1;
          if (U = !0, x.S0 && (H = !0, (U = x.S0[L / 31 | 0] & (1 << L % 31 - 1 | ee)) && (Y = x.S1 != null, x.S1))) {
            Y = !0;
            let oe = p.t1.tin;
            U = x.S1[oe / 31 | 0] & (1 << oe % 31 - 1 | ee);
          }
          if (e ? (k.o0 = H ? p.t0 : p.NOTOKEN, k.o1 = Y ? p.t1 : p.NOTOKEN, k.os = (H ? 1 : 0) + (Y ? 1 : 0)) : (k.c0 = H ? p.t0 : p.NOTOKEN, k.c1 = Y ? p.t1 : p.NOTOKEN, k.cs = (H ? 1 : 0) + (Y ? 1 : 0)), U && x.c && (U = U && x.c(k, p, A)), U) break;
          x = null;
        }
        U || D.ZZ === p.t0.tin || (A.e = p.t0), x && (A.n = x.n != null ? x.n : A.n, A.h = x.h != null ? x.h : A.h, A.a = x.a != null ? x.a : A.a, A.u = x.u != null ? x.u : A.u, A.k = x.k != null ? x.k : A.k, A.g = x.g != null ? x.g : A.g, A.e = x.e && x.e(k, p, A) || void 0, A.p = x.p != null ? typeof x.p == "string" ? x.p : x.p(k, p, A) : A.p, A.r = x.r != null ? typeof x.r == "string" ? x.r : x.r(k, p, A) : A.r, A.b = x.b != null ? typeof x.b == "number" ? x.b : x.b(k, p, A) : A.b);
        let K = f < t.length;
        return p.log && p.log(h.S.indent.repeat(k.d) + h.S.parse, k.state.toUpperCase(), (k.prev.id + "/" + k.parent.id + "/" + k.child.id).padEnd(12), k.name + "~" + k.id, K ? "alt=" + f : "no-alt", K && A.g ? "g:" + A.g + " " : "", (K && A.p ? "p:" + A.p + " " : "") + (K && A.r ? "r:" + A.r + " " : "") + (K && A.b ? "b:" + A.b + " " : ""), (r.OPEN === k.state ? [k.o0, k.o1].slice(0, k.os) : [k.c0, k.c1].slice(0, k.cs)).map((L) => L.name + "=" + p.F(L.src)).join(" "), "c:" + (x && x.c ? U : r.EMPTY), "n:" + (0, h.entries)(A.n).map((L) => L[0] + "=" + L[1]).join(";"), "u:" + (0, h.entries)(A.u).map((L) => L[0] + "=" + L[1]).join(";"), "k:" + (0, h.entries)(A.k).map((L) => L[0] + "=" + L[1]).join(";"), f < t.length && x.s ? "[" + x.s.map((L) => Array.isArray(L) ? L.map((H) => D[H]).join("|") : D[L]).join(" ") + "]" : "[]", A), A;
      }
      bad(e, t, k, p) {
        throw new h.JsonicError(e.err || h.S.unexpected, { ...e.use, state: p.is_open ? h.S.open : h.S.close }, e, t, k);
      }
      unknownRule(e, t) {
        return e.err = "unknown_rule", e.use = e.use || {}, e.use.rulename = t, e;
      }
    }
    const N = (...c) => new F(...c);
    g.makeRuleSpec = N;
    class T {
      constructor(e, t) {
        this.rsm = {}, this.options = e, this.cfg = t;
      }
      rule(e, t) {
        if (e == null) return this.rsm;
        let k = this.rsm[e];
        if (t === null) delete this.rsm[e];
        else if (t !== void 0) {
          k = this.rsm[e] = this.rsm[e] || N(this.cfg, {}), (k = this.rsm[e] = t(this.rsm[e], this.rsm) || this.rsm[e]).name = e;
          for (let p of [...k.def.open, ...k.def.close]) (0, h.normalt)(p);
          return;
        }
        return k;
      }
      start(e, t, k, p) {
        let A, U = (0, ae.makeToken)("#ZZ", (0, h.tokenize)("#ZZ", this.cfg), void 0, r.EMPTY, (0, ae.makePoint)(-1)), x = (0, ae.makeNoToken)(), f = { uI: 0, opts: this.options, cfg: this.cfg, meta: k || {}, src: () => e, root: () => A.node, plgn: () => t.internal().plugins, rule: {}, sub: t.internal().sub, xs: -1, v2: U, v1: U, t0: U, t1: U, tC: -2, next: oe, rs: [], rsI: 0, rsm: this.rsm, log: void 0, F: (0, h.srcfmt)(this.cfg), use: {}, NOTOKEN: x, NORULE: {} };
        f = (0, h.deep)(f, p);
        let D = ((te) => re(N(te.cfg, {}), te))(f);
        if (f.NORULE = D, f.rule = D, (0, h.makelog)(f, k), e === "") {
          if (this.cfg.lex.empty) return this.cfg.lex.emptyResult;
          throw new h.JsonicError(h.S.unexpected, { src: e }, f.t0, D, f);
        }
        let ee = (te) => (0, h.tokenize)(te, this.cfg), S = (0, h.badlex)((0, ae.makeLex)(f), (0, h.tokenize)("#BD", this.cfg), f), K = this.rsm[this.cfg.rule.start];
        if (K == null) return;
        let L = re(K, f);
        A = L;
        let H = 2 * (0, h.keys)(this.rsm).length * S.src.length * 2 * f.cfg.rule.maxmul, Y = f.cfg.tokenSetDerived.ignore;
        function oe() {
          let te, ce;
          f.v2 = f.v1, f.v1 = f.t0, f.t0 = f.t1;
          do
            ce = S(L), f.tC++;
          while (Y[ce.tin] && (te = ce));
          return ce.ignored = te, f.t1 = ce, f.t0;
        }
        oe(), oe();
        let ne = 0;
        for (; D !== L && ne < H; ) f.sub.rule && f.sub.rule.map((te) => te(L, f)), f.log && f.log(`
` + h.S.indent.repeat(L.d) + h.S.stack, f.rs.slice(0, f.rsI).map((te) => te.name + "~" + te.id).join("/"), "<<" + f.F(A.node) + ">>", f.rs.slice(0, f.rsI).map((te) => "<" + f.F(te.node) + ">").join(" "), L, f), f.log && f.log(h.S.indent.repeat(L.d) + h.S.rule + h.S.space, L.state.toUpperCase(), (L.prev.id + "/" + L.parent.id + "/" + L.child.id).padEnd(12), L.name + "~" + L.id, "[" + f.F(f.t0.src) + " " + f.F(f.t1.src) + "]", "n:" + (0, h.entries)(L.n).filter((te) => te[1]).map((te) => te[0] + "=" + te[1]).join(";"), "u:" + (0, h.entries)(L.use).map((te) => te[0] + "=" + te[1]).join(";"), "k:" + (0, h.entries)(L.keep).map((te) => te[0] + "=" + te[1]).join(";"), "[" + ee(f.t0.tin) + " " + ee(f.t1.tin) + "]", L, f), f.rule = L, L = L.process(f), ne++;
        if ((0, h.tokenize)("#ZZ", this.cfg) !== f.t0.tin) throw new h.JsonicError(h.S.unexpected, {}, f.t0, D, f);
        const V = f.root();
        if (this.cfg.result.fail.includes(V)) throw new h.JsonicError(h.S.unexpected, {}, f.t0, D, f);
        return V;
      }
      clone(e, t) {
        let k = new T(e, t);
        return k.rsm = Object.keys(this.rsm).reduce((p, A) => (p[A] = (0, h.filterRules)(this.rsm[A], this.cfg), p), {}), k;
      }
    }
    g.Parser = T;
    var _ = {};
    function R(c) {
      const e = c.token.OB, t = c.token.CB, k = c.token.OS, p = c.token.CS, A = c.token.CL, U = c.token.CA, x = c.token.TX, f = c.token.ST, D = c.token.ZZ, ee = c.config(), S = ee.tokenSet.val, K = ee.tokenSet.key, L = c.util.deep, H = (ne, V) => {
        if (!V.cfg.rule.finish) return V.t0.src = "END_OF_SOURCE", V.t0;
      }, Y = (ne) => {
        const V = ne.o0, te = f === V.tin || x === V.tin ? V.val : V.src;
        ne.use.key = te;
      };
      c.rule("val", (ne) => {
        ne.bo((V) => V.node = void 0).open([{ s: [e], p: "map", b: 1, g: "map,json" }, { s: [k], p: "list", b: 1, g: "list,json" }, { s: [S], g: "val,json" }]).close([{ s: [D], g: "end,json" }, { b: 1, g: "more,json" }]).bc((V, te) => {
          V.node = V.node === void 0 ? V.child.node === void 0 ? V.os === 0 ? void 0 : V.o0.resolveVal(V, te) : V.child.node : V.node;
        });
      }), c.rule("map", (ne) => {
        ne.bo((V) => {
          V.node = {};
        }).open([{ s: [e, t], g: "map,json" }, { s: [e], p: "pair", n: { pk: 0 }, g: "map,json,pair" }]);
      }), c.rule("list", (ne) => {
        ne.bo((V) => {
          V.node = [];
        }).open([{ s: [k, p], g: "list,json" }, { s: [k], p: "elem", g: "list,elem,json" }]);
      }), c.rule("pair", (ne) => {
        ne.open([{ s: [K, A], p: "val", u: { pair: !0 }, a: Y, g: "map,pair,key,json" }]).bc((V, te) => {
          V.use.pair && (V.use.prev = V.node[V.use.key], V.node[V.use.key] = V.child.node);
        }).close([{ s: [t], g: "map,pair,json" }, { s: [U], r: "pair", g: "map,pair,json" }, { s: [D], e: H, g: "map,pair,json" }]);
      }), c.rule("elem", (ne) => {
        ne.open([{ p: "val", u: { elem: !0 }, g: "list,elem,val,json" }]).bc((V) => {
          V.use.elem && V.node.push(V.child.node);
        }).close([{ s: [U], r: "elem", g: "list,elem,json" }, { s: [p], g: "list,elem,json" }, { s: [D], e: H, g: "list,elem,json" }]);
      });
      const oe = (ne, V) => {
        let te = ne.use.key, ce = ne.child.node;
        const E = ne.use.prev;
        ce = ce === void 0 ? null : ce, ne.node[te] = E == null ? ce : V.cfg.map.merge ? V.cfg.map.merge(E, ce) : V.cfg.map.extend ? L(E, ce) : ce;
      };
      c.rule("val", (ne) => {
        ne.open([{ s: [K, A], p: "map", b: 2, n: { pk: 1 }, g: "pair,jsonic" }, { s: [S], g: "val,json" }, { s: [[t, p]], b: 1, g: "val,imp,null,jsonic" }, { s: [U], c: { n: { il: 0 } }, p: "list", b: 1, g: "list,imp,jsonic" }, { s: [U], b: 1, g: "list,val,imp,null,jsonic" }], { append: !0, delete: [2] }).close([{ s: [[t, p]], b: 1, g: "val,json,close" }, { s: [U], c: { n: { il: 0, pk: 0 } }, n: { il: 1 }, r: "elem", a: (V) => V.node = [V.node], g: "list,val,imp,comma,jsonic" }, { c: { n: { il: 0, pk: 0 } }, n: { il: 1 }, r: "elem", a: (V) => V.node = [V.node], g: "list,val,imp,space,jsonic", b: 1 }], { append: !0, move: [1, -1] });
      }), c.rule("map", (ne) => {
        ne.bo((V) => {
          V.n.il = 1 + (V.n.il ? V.n.il : 0), V.n.im = 1 + (V.n.im ? V.n.im : 0);
        }).open([{ s: [K, A], p: "pair", b: 2, g: "pair,list,val,imp" }], { append: !0 });
      }), c.rule("list", (ne) => {
        ne.bo((V) => {
          V.n.il = 1 + (V.n.il ? V.n.il : 0), V.n.pk = 1 + (V.n.pk ? V.n.pk : 0), V.n.im = 1 + (V.n.im ? V.n.im : 0);
        }).open([{ s: [U], p: "elem", b: 1, g: "list,elem,val,imp" }, { p: "elem", g: "list,elem" }], { append: !0 });
      }), c.rule("pair", (ne) => {
        ne.open([{ s: [U], g: "map,pair,comma" }], { append: !0 }).bc((V, te) => {
          V.use.pair && oe(V, te);
        }).close([{ s: [t], c: { n: { pk: 0 } }, g: "map,pair,json" }, { s: [U, t], c: { n: { pk: 0 } }, g: "map,pair,comma,jsonic" }, { s: [U], c: { n: { pk: 0 } }, r: "pair", g: "map,pair,json" }, { s: [U], c: { n: { im: 1 } }, r: "pair", g: "map,pair,jsonic" }, { s: [S], c: { n: { pk: 0 } }, r: "pair", b: 1, g: "map,pair,imp,jsonic" }, { s: [S], c: { n: { im: 1 } }, r: "pair", b: 1, g: "map,pair,imp,jsonic" }, { s: [[t, U, ...S]], b: 1, g: "map,pair,imp,path,jsonic" }, { s: [p], b: 1, g: "list,pair,imp,jsonic" }, { s: [D], e: H, g: "map,pair,json" }], { append: !0, delete: [0, 1, 2] });
      }), c.rule("elem", (ne) => {
        ne.open([{ s: [U, U], b: 2, a: (V) => V.node.push(null), g: "list,elem,imp,null,jsonic" }, { s: [U], a: (V) => V.node.push(null), g: "list,elem,imp,null,jsonic" }, ee.list.property && { s: [K, A], p: "val", n: { pk: 1 }, u: { elem: !1 }, a: Y, g: "elem,pair,jsonic" }]).bc((V, te) => {
          V.use.elem === !1 && (V.use.prev = V.node[V.use.key], oe(V, te));
        }).close([{ s: [U, p], g: "list,elem,comma.jsonic" }, { s: [U], r: "elem", g: "list,elem,json" }, { s: [[...S, e, k]], r: "elem", b: 1, g: "list,elem,imp,jsonic" }, { s: [p], g: "list,elem,json" }, { s: [D], e: H, g: "list,elem,json" }], { delete: [-1, -2, -3] });
      });
    }
    Object.defineProperty(_, "__esModule", { value: !0 }), _.makeJSON = _.grammar = void 0, _.grammar = R, _.makeJSON = function(c) {
      let e = c.make({ grammar$: !1, text: { lex: !1 }, number: { hex: !1, oct: !1, bin: !1, sep: null, exclude: /^00+/ }, string: { chars: '"', multiChars: "", allowUnknown: !1, escape: { v: null } }, comment: { lex: !1 }, map: { extend: !1 }, lex: { empty: !1 }, rule: { finish: !1, include: "json" }, result: { fail: [void 0, NaN] }, tokenSet: { key: ["#ST", null, null, null] } });
      return R(e), e;
    };
    var C = {};
    Object.defineProperty(C, "__esModule", { value: !0 }), C.Debug = void 0;
    const w = (c, e) => {
      const { keys: t, values: k, entries: p } = c.util;
      c.debug = { describe: function() {
        var U;
        let x = (U = c.options.lex) === null || U === void 0 ? void 0 : U.match, f = c.rule();
        return ["========= RULES =========", J(c, t(f), f), `
`, "========= ALTS =========", k(f).map((D) => "  " + D.name + `:
` + z(c, D, "open") + z(c, D, "close")).join(`

`), `
`, "========= LEXER =========", "  " + (x && x.map((D) => D.name) || []).join(`
  `), `
`, `
`, "========= PLUGIN =========", "  " + c.internal().plugins.map((D) => D.name + (D.options ? p(D.options).reduce((ee, S) => ee + `
    ` + S[0] + ": " + JSON.stringify(S[1]), "") : "")).join(`
  `), `
`].join(`
`);
      } };
      const A = c.use.bind(c);
      c.use = (...U) => {
        let x = A(...U);
        return e.print && x.internal().config.debug.get_console().log(x.debug.describe()), x;
      };
    };
    function z(c, e, t) {
      const { entries: k } = c.util;
      return e.def[t].length === 0 ? "" : "    " + t.toUpperCase() + `:
` + e.def[t].map((p, A) => {
        var U, x;
        return "      " + ("" + A).padStart(5, " ") + " " + ("[" + (p.s || []).map((f) => typeof f == "number" ? c.token[f] : "[" + f.map((D) => c.token[D]) + "]").join(" ") + "] ").padEnd(32, " ") + (p.r ? " r=" + (typeof p.r == "string" ? p.r : "<F>") : "") + (p.p ? " p=" + (typeof p.p == "string" ? p.p : "<F>") : "") + (p.r || p.p ? "" : "	") + "	" + (p.b == null ? "" : "b=" + p.b) + "	" + (p.n == null ? "" : "n=" + k(p.n).map(([f, D]) => f + ":" + D)) + "	" + (p.a == null ? "" : "A") + (p.c == null ? "" : "C") + (p.h == null ? "" : "H") + "	" + (((U = p.c) === null || U === void 0 ? void 0 : U.n) == null ? "	" : " CN=" + k(p.c.n).map(([f, D]) => f + ":" + D)) + (((x = p.c) === null || x === void 0 ? void 0 : x.d) == null ? "" : " CD=" + p.c.d) + (p.g ? "	g=" + p.g : "");
      }).join(`
`) + `
`;
    }
    function J(c, e, t) {
      const { values: k, omap: p } = c.util;
      return e.reduce((A, U) => A += "  " + U + `:
    ` + k(p({ op: I(t, U, "open", "p"), or: I(t, U, "open", "r"), cp: I(t, U, "close", "p"), cr: I(t, U, "close", "r") }, ([x, f]) => [1 < f.length ? x : void 0, x + ": " + f])).join(`
    `) + `
`, "");
    }
    function I(c, e, t, k) {
      return [...new Set(c[e].def[t].filter((p) => p[k]).map((p) => p[k]).map((p) => typeof p == "string" ? p : "<F>"))].join(" ");
    }
    C.Debug = w, w.defaults = { print: !0, trace: !1 };
    var v = { exports: {} };
    Object.defineProperty(v.exports, "__esModule", { value: !0 }), v.exports.EMPTY = v.exports.AFTER = v.exports.BEFORE = v.exports.CLOSE = v.exports.OPEN = v.exports.makeTextMatcher = v.exports.makeNumberMatcher = v.exports.makeCommentMatcher = v.exports.makeStringMatcher = v.exports.makeLineMatcher = v.exports.makeSpaceMatcher = v.exports.makeFixedMatcher = v.exports.makeLex = v.exports.makeRuleSpec = v.exports.makeRule = v.exports.makePoint = v.exports.makeToken = v.exports.make = v.exports.util = v.exports.Debug = v.exports.Parser = v.exports.JsonicError = v.exports.Jsonic = void 0, Object.defineProperty(v.exports, "OPEN", { enumerable: !0, get: function() {
      return r.OPEN;
    } }), Object.defineProperty(v.exports, "CLOSE", { enumerable: !0, get: function() {
      return r.CLOSE;
    } }), Object.defineProperty(v.exports, "BEFORE", { enumerable: !0, get: function() {
      return r.BEFORE;
    } }), Object.defineProperty(v.exports, "AFTER", { enumerable: !0, get: function() {
      return r.AFTER;
    } }), Object.defineProperty(v.exports, "EMPTY", { enumerable: !0, get: function() {
      return r.EMPTY;
    } });
    const G = s({});
    Object.defineProperty(v.exports, "JsonicError", { enumerable: !0, get: function() {
      return G.JsonicError;
    } });
    const O = m({});
    Object.defineProperty(v.exports, "makePoint", { enumerable: !0, get: function() {
      return O.makePoint;
    } }), Object.defineProperty(v.exports, "makeToken", { enumerable: !0, get: function() {
      return O.makeToken;
    } }), Object.defineProperty(v.exports, "makeLex", { enumerable: !0, get: function() {
      return O.makeLex;
    } }), Object.defineProperty(v.exports, "makeFixedMatcher", { enumerable: !0, get: function() {
      return O.makeFixedMatcher;
    } }), Object.defineProperty(v.exports, "makeSpaceMatcher", { enumerable: !0, get: function() {
      return O.makeSpaceMatcher;
    } }), Object.defineProperty(v.exports, "makeLineMatcher", { enumerable: !0, get: function() {
      return O.makeLineMatcher;
    } }), Object.defineProperty(v.exports, "makeStringMatcher", { enumerable: !0, get: function() {
      return O.makeStringMatcher;
    } }), Object.defineProperty(v.exports, "makeCommentMatcher", { enumerable: !0, get: function() {
      return O.makeCommentMatcher;
    } }), Object.defineProperty(v.exports, "makeNumberMatcher", { enumerable: !0, get: function() {
      return O.makeNumberMatcher;
    } }), Object.defineProperty(v.exports, "makeTextMatcher", { enumerable: !0, get: function() {
      return O.makeTextMatcher;
    } }), Object.defineProperty(v.exports, "makeRule", { enumerable: !0, get: function() {
      return g.makeRule;
    } }), Object.defineProperty(v.exports, "makeRuleSpec", { enumerable: !0, get: function() {
      return g.makeRuleSpec;
    } }), Object.defineProperty(v.exports, "Parser", { enumerable: !0, get: function() {
      return g.Parser;
    } }), Object.defineProperty(v.exports, "Debug", { enumerable: !0, get: function() {
      return C.Debug;
    } });
    const M = { tokenize: G.tokenize, srcfmt: G.srcfmt, clone: G.clone, charset: G.charset, trimstk: G.trimstk, makelog: G.makelog, badlex: G.badlex, extract: G.extract, errinject: G.errinject, errdesc: G.errdesc, configure: G.configure, parserwrap: G.parserwrap, mesc: G.mesc, escre: G.escre, regexp: G.regexp, prop: G.prop, str: G.str, clean: G.clean, deep: G.deep, omap: G.omap, keys: G.keys, values: G.values, entries: G.entries };
    function b(c, e) {
      if (c === "json") return (0, _.makeJSON)(j);
      let t = { parser: {}, config: {}, plugins: [], sub: { lex: void 0, rule: void 0 }, mark: Math.random() }, k = (0, G.deep)({}, e ? { ...e.options } : c?.defaults$ === !1 ? {} : d.defaults, c || {}), p = function(x, f, D) {
        var ee;
        if (G.S.string === typeof x) {
          let S = p.internal();
          return (!((ee = A.parser) === null || ee === void 0) && ee.start ? (0, G.parserwrap)(A.parser) : S.parser).start(x, p, f, D);
        }
        return x;
      }, A = (x) => {
        if (x != null && G.S.object === typeof x) {
          (0, G.deep)(k, x), (0, G.configure)(p, t.config, k);
          let f = p.internal().parser;
          t.parser = f.clone(k, t.config);
        }
        return { ...p.options };
      }, U = { token: (x) => (0, G.tokenize)(x, t.config, p), fixed: (x) => t.config.fixed.ref[x], options: (0, G.deep)(A, k), config: () => (0, G.deep)(t.config), parse: p, use: function(x, f) {
        const D = x.name.toLowerCase(), ee = (0, G.deep)({}, x.defaults || {}, f || {});
        p.options({ plugin: { [D]: ee } });
        let S = p.options.plugin[D];
        return p.internal().plugins.push(x), x.options = S, x(p, S) || p;
      }, rule: (x, f) => p.internal().parser.rule(x, f) || p, lex: (x) => {
        let f = k.lex.match;
        f.unshift(x), p.options({ lex: { match: f } });
      }, make: (x) => b(x, p), empty: (x) => b({ defaults$: !1, standard$: !1, grammar$: !1, ...x || {} }), id: "Jsonic/" + Date.now() + "/" + ("" + Math.random()).substring(2, 8).padEnd(6, "0") + (A.tag == null ? "" : "/" + A.tag), toString: () => U.id, sub: (x) => (x.lex && (t.sub.lex = t.sub.lex || [], t.sub.lex.push(x.lex)), x.rule && (t.sub.rule = t.sub.rule || [], t.sub.rule.push(x.rule)), p), util: M };
      if ((0, G.defprop)(U.make, G.S.name, { value: G.S.make }), (0, G.assign)(p, U), (0, G.defprop)(p, "internal", { value: () => t }), e) {
        for (let f in e) p[f] === void 0 && (p[f] = e[f]);
        p.parent = e;
        let x = e.internal();
        t.config = (0, G.deep)({}, x.config), (0, G.configure)(p, t.config, k), (0, G.assign)(p.token, t.config.t), t.plugins = [...x.plugins], t.parser = x.parser.clone(k, t.config);
      } else t.config = (0, G.configure)(p, void 0, k), t.plugins = [], t.parser = new g.Parser(k, t.config), k.grammar$ !== !1 && (0, _.grammar)(p);
      return p;
    }
    v.exports.util = M, v.exports.make = b;
    let j, P = j = b();
    return v.exports.Jsonic = P, delete j.options, delete j.use, delete j.rule, delete j.lex, delete j.token, delete j.fixed, j.Jsonic = j, j.JsonicError = G.JsonicError, j.Parser = g.Parser, j.Debug = C.Debug, j.makeLex = O.makeLex, j.makeToken = O.makeToken, j.makePoint = O.makePoint, j.makeRule = g.makeRule, j.makeRuleSpec = g.makeRuleSpec, j.makeFixedMatcher = O.makeFixedMatcher, j.makeSpaceMatcher = O.makeSpaceMatcher, j.makeLineMatcher = O.makeLineMatcher, j.makeStringMatcher = O.makeStringMatcher, j.makeCommentMatcher = O.makeCommentMatcher, j.makeNumberMatcher = O.makeNumberMatcher, j.makeTextMatcher = O.makeTextMatcher, j.OPEN = r.OPEN, j.CLOSE = r.CLOSE, j.BEFORE = r.BEFORE, j.AFTER = r.AFTER, j.EMPTY = r.EMPTY, j.util = M, j.make = b, v.exports.default = P, v.exports = v.exports.Jsonic, v = v.exports;
  });
})(Kt);
var Cn = Kt.exports;
const On = /* @__PURE__ */ Je(Cn), $n = {
  allow: {
    match: [],
    modify: (n) => n
  }
};
function En(n, u) {
  if (!n || !u) return !1;
  for (const l in n) {
    if (!(l in u))
      return !1;
    const s = n[l], m = u[l];
    if (Array.isArray(s) && Array.isArray(m)) {
      if (!s.some((d) => m.includes(d)) && !m.includes("*"))
        return !1;
    } else if (s !== m && m !== "*")
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
    this.config = Object.assign({}, $n, u), this.config.allow = this.config.allow || {}, this.config.allow.modify = this.config.allow.modify || ((l) => l), this.config.allow.match = this.config.allow.match || [], this.allowPatterns = [...this.config.allow.match];
    for (const l of this.config.allow.match)
      this.match.allow.add(l, { allow: !0 });
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
    const l = JSON.stringify(u);
    if (this.memoizedAllow.has(l))
      return this.memoizedAllow.get(l);
    let s;
    try {
      s = typeof u == "string" ? On(u) : u;
    } catch (r) {
      return console.warn("[Vxg] Invalid match pattern:", u, r), this.memoizedAllow.set(l, !1), !1;
    }
    const m = Array.isArray(s) ? s : [s];
    for (const r of m) {
      if (!r || typeof r != "object")
        continue;
      const d = this.config.allow.modify({ ...r });
      for (const $ of this.allowPatterns)
        if (En(d, $))
          return this.memoizedAllow.set(l, !0), !0;
    }
    return this.memoizedAllow.set(l, !1), !1;
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
  setComponentFlags(u, l) {
    this.state.cmp[u] || (this.state.cmp[u] = {}), Object.assign(this.state.cmp[u], l), this._store && this._syncToStore(u, l);
  }
  /**
   * Get nested state value by path
   * @param {string} path - Dot-separated path (e.g., 'cmp.basic-head.show')
   * @returns {*} Value at path
   */
  get(u) {
    const l = u.split(".");
    let s = this.state;
    for (const m of l)
      if (s && typeof s == "object")
        s = s[m];
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
  set(u, l) {
    const s = u.split("."), m = s.pop();
    let r = this.state;
    for (const d of s)
      (!r[d] || typeof r[d] != "object") && (r[d] = {}), r = r[d];
    r[m] = l, this._store && this._syncToStore(u, l);
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
    u.subscribe((l, s) => {
      if (l.type.startsWith("vxg/")) {
        const m = l.type.replace("vxg/", "");
        this._handleStoreChange(m, l.payload, s);
      }
    }), this.commit = (l, s) => u.commit(`vxg/${l}`, s), this.dispatch = (l, s) => u.dispatch(`vxg/${l}`, s);
  }
  /**
   * Connect to Pinia store
   * @param {Object} pinia - Pinia instance
   * @private
   */
  _connectPinia(u) {
    const l = u._s.get("vxg");
    if (!l) {
      console.warn('[Vxg] Pinia store "vxg" not found. Create it using defineStore("vxg", ...)');
      return;
    }
    l.$subscribe((s, m) => {
      this._handleStoreChange(s.storeId, s, m);
    }), this.updateStore = (s) => {
      l.$patch(s);
    };
  }
  /**
   * Handle store changes and sync to Vxg state
   * @param {string} path - State path
   * @param {*} payload - Change payload
   * @param {Object} state - New state
   * @private
   */
  _handleStoreChange(u, l, s) {
    s.vxg && (this.state = { ...s.vxg });
  }
  /**
   * Sync Vxg state changes to store
   * @param {string} path - State path
   * @param {*} value - New value
   * @private
   */
  _syncToStore(u, l) {
    this._storeType === "vuex4" && this.commit ? this.commit("SET_VXG_STATE", { path: u, value: l }) : this._storeType === "pinia" && this.updateStore && this.updateStore({ [u]: l });
  }
  /**
   * Register a component
   * @param {string} name - Component name
   * @param {Object} component - Component definition
   */
  registerComponent(u, l) {
    this.cmp[u] = l;
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
      SET_COMPONENT_FLAGS(u, { name: l, flags: s }) {
        u.cmp[l] || (u.cmp[l] = {}), Object.assign(u.cmp[l], s);
      },
      /**
       * Set nested state value
       */
      SET_VXG_STATE(u, { path: l, value: s }) {
        const m = l.split("."), r = m.pop();
        let d = u;
        for (const $ of m)
          (!d[$] || typeof d[$] != "object") && (d[$] = {}), d = d[$];
        d[r] = s;
      },
      /**
       * Set entire state
       */
      SET_STATE(u, l) {
        Object.assign(u, l);
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
      updateComponentFlags({ commit: u }, { name: l, flags: s }) {
        u("SET_COMPONENT_FLAGS", { name: l, flags: s });
      },
      /**
       * Update state by path
       */
      updateState({ commit: u }, { path: l, value: s }) {
        u("SET_VXG_STATE", { path: l, value: s });
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
      componentState: (u) => (l) => u.cmp[l] || {},
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
      getByPath: (u) => (l) => {
        const s = l.split(".");
        let m = u;
        for (const r of s)
          if (m && typeof m == "object")
            m = m[r];
          else
            return;
        return m;
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
      componentState: (l) => (s) => l.cmp[s] || {},
      /**
       * Get all component states
       */
      allComponents: (l) => l.cmp,
      /**
       * Get entity metadata
       */
      entityMeta: (l) => l.ent?.meta || {},
      /**
       * Get state by path
       */
      getByPath: (l) => (s) => {
        const m = s.split(".");
        let r = l;
        for (const d of m)
          if (r && typeof r == "object")
            r = r[d];
          else
            return;
        return r;
      }
    },
    actions: {
      /**
       * Set component flags
       */
      setComponentFlags(l, s) {
        this.cmp[l] || (this.cmp[l] = {}), Object.assign(this.cmp[l], s);
      },
      /**
       * Set state by path
       */
      setByPath(l, s) {
        const m = l.split("."), r = m.pop();
        let d = this;
        for (const $ of m)
          (!d[$] || typeof d[$] != "object") && (d[$] = {}), d = d[$];
        d[r] = s;
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
  constructor(u, l) {
    this.vxg = u, this.store = l, this.storeType = u._detectStoreType(l);
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
  setComponentFlags(u, l) {
    this.storeType === "vuex4" ? this.store.dispatch("vxg/updateComponentFlags", { name: u, flags: l }) : this.storeType === "pinia" && this.store.setComponentFlags(u, l);
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
const Pn = /* @__PURE__ */ Ve({
  __name: "BasicLed",
  props: {
    status: { default: "off" },
    spec: { default: () => ({}) },
    param: { default: () => ({}) }
  },
  setup(n) {
    const u = n, l = ue(() => {
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
    }), s = ue(() => {
      switch (l.value) {
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
    }), m = ue(() => "mdi-circle");
    return (r, d) => (pe(), Me(Pe, {
      color: s.value,
      icon: m.value
    }, null, 8, ["color", "icon"]));
  }
}), Re = (n, u) => {
  const l = n.__vccOpts || n;
  for (const [s, m] of u)
    l[s] = m;
  return l;
}, Nn = /* @__PURE__ */ Re(Pn, [["__scopeId", "data-v-da4e0332"]]), An = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nn
}, Symbol.toStringTag, { value: "Module" }));
var Xt = { exports: {} };
(function(n, u) {
  (function(l, s) {
    n.exports = s();
  })(Ge, function() {
    var l = 1e3, s = 6e4, m = 36e5, r = "millisecond", d = "second", $ = "minute", y = "hour", g = "day", h = "week", ae = "month", ie = "quarter", re = "year", he = "date", se = "Invalid Date", Z = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, q = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, F = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(O) {
      var M = ["th", "st", "nd", "rd"], b = O % 100;
      return "[" + O + (M[(b - 20) % 10] || M[b] || M[0]) + "]";
    } }, N = function(O, M, b) {
      var j = String(O);
      return !j || j.length >= M ? O : "" + Array(M + 1 - j.length).join(b) + O;
    }, T = { s: N, z: function(O) {
      var M = -O.utcOffset(), b = Math.abs(M), j = Math.floor(b / 60), P = b % 60;
      return (M <= 0 ? "+" : "-") + N(j, 2, "0") + ":" + N(P, 2, "0");
    }, m: function O(M, b) {
      if (M.date() < b.date()) return -O(b, M);
      var j = 12 * (b.year() - M.year()) + (b.month() - M.month()), P = M.clone().add(j, ae), c = b - P < 0, e = M.clone().add(j + (c ? -1 : 1), ae);
      return +(-(j + (b - P) / (c ? P - e : e - P)) || 0);
    }, a: function(O) {
      return O < 0 ? Math.ceil(O) || 0 : Math.floor(O);
    }, p: function(O) {
      return { M: ae, y: re, w: h, d: g, D: he, h: y, m: $, s: d, ms: r, Q: ie }[O] || String(O || "").toLowerCase().replace(/s$/, "");
    }, u: function(O) {
      return O === void 0;
    } }, _ = "en", R = {};
    R[_] = F;
    var C = "$isDayjsObject", w = function(O) {
      return O instanceof v || !(!O || !O[C]);
    }, z = function O(M, b, j) {
      var P;
      if (!M) return _;
      if (typeof M == "string") {
        var c = M.toLowerCase();
        R[c] && (P = c), b && (R[c] = b, P = c);
        var e = M.split("-");
        if (!P && e.length > 1) return O(e[0]);
      } else {
        var t = M.name;
        R[t] = M, P = t;
      }
      return !j && P && (_ = P), P || !j && _;
    }, J = function(O, M) {
      if (w(O)) return O.clone();
      var b = typeof M == "object" ? M : {};
      return b.date = O, b.args = arguments, new v(b);
    }, I = T;
    I.l = z, I.i = w, I.w = function(O, M) {
      return J(O, { locale: M.$L, utc: M.$u, x: M.$x, $offset: M.$offset });
    };
    var v = function() {
      function O(b) {
        this.$L = z(b.locale, null, !0), this.parse(b), this.$x = this.$x || b.x || {}, this[C] = !0;
      }
      var M = O.prototype;
      return M.parse = function(b) {
        this.$d = function(j) {
          var P = j.date, c = j.utc;
          if (P === null) return /* @__PURE__ */ new Date(NaN);
          if (I.u(P)) return /* @__PURE__ */ new Date();
          if (P instanceof Date) return new Date(P);
          if (typeof P == "string" && !/Z$/i.test(P)) {
            var e = P.match(Z);
            if (e) {
              var t = e[2] - 1 || 0, k = (e[7] || "0").substring(0, 3);
              return c ? new Date(Date.UTC(e[1], t, e[3] || 1, e[4] || 0, e[5] || 0, e[6] || 0, k)) : new Date(e[1], t, e[3] || 1, e[4] || 0, e[5] || 0, e[6] || 0, k);
            }
          }
          return new Date(P);
        }(b), this.init();
      }, M.init = function() {
        var b = this.$d;
        this.$y = b.getFullYear(), this.$M = b.getMonth(), this.$D = b.getDate(), this.$W = b.getDay(), this.$H = b.getHours(), this.$m = b.getMinutes(), this.$s = b.getSeconds(), this.$ms = b.getMilliseconds();
      }, M.$utils = function() {
        return I;
      }, M.isValid = function() {
        return this.$d.toString() !== se;
      }, M.isSame = function(b, j) {
        var P = J(b);
        return this.startOf(j) <= P && P <= this.endOf(j);
      }, M.isAfter = function(b, j) {
        return J(b) < this.startOf(j);
      }, M.isBefore = function(b, j) {
        return this.endOf(j) < J(b);
      }, M.$g = function(b, j, P) {
        return I.u(b) ? this[j] : this.set(P, b);
      }, M.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, M.valueOf = function() {
        return this.$d.getTime();
      }, M.startOf = function(b, j) {
        var P = this, c = !!I.u(j) || j, e = I.p(b), t = function(ee, S) {
          var K = I.w(P.$u ? Date.UTC(P.$y, S, ee) : new Date(P.$y, S, ee), P);
          return c ? K : K.endOf(g);
        }, k = function(ee, S) {
          return I.w(P.toDate()[ee].apply(P.toDate("s"), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(S)), P);
        }, p = this.$W, A = this.$M, U = this.$D, x = "set" + (this.$u ? "UTC" : "");
        switch (e) {
          case re:
            return c ? t(1, 0) : t(31, 11);
          case ae:
            return c ? t(1, A) : t(0, A + 1);
          case h:
            var f = this.$locale().weekStart || 0, D = (p < f ? p + 7 : p) - f;
            return t(c ? U - D : U + (6 - D), A);
          case g:
          case he:
            return k(x + "Hours", 0);
          case y:
            return k(x + "Minutes", 1);
          case $:
            return k(x + "Seconds", 2);
          case d:
            return k(x + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, M.endOf = function(b) {
        return this.startOf(b, !1);
      }, M.$set = function(b, j) {
        var P, c = I.p(b), e = "set" + (this.$u ? "UTC" : ""), t = (P = {}, P[g] = e + "Date", P[he] = e + "Date", P[ae] = e + "Month", P[re] = e + "FullYear", P[y] = e + "Hours", P[$] = e + "Minutes", P[d] = e + "Seconds", P[r] = e + "Milliseconds", P)[c], k = c === g ? this.$D + (j - this.$W) : j;
        if (c === ae || c === re) {
          var p = this.clone().set(he, 1);
          p.$d[t](k), p.init(), this.$d = p.set(he, Math.min(this.$D, p.daysInMonth())).$d;
        } else t && this.$d[t](k);
        return this.init(), this;
      }, M.set = function(b, j) {
        return this.clone().$set(b, j);
      }, M.get = function(b) {
        return this[I.p(b)]();
      }, M.add = function(b, j) {
        var P, c = this;
        b = Number(b);
        var e = I.p(j), t = function(A) {
          var U = J(c);
          return I.w(U.date(U.date() + Math.round(A * b)), c);
        };
        if (e === ae) return this.set(ae, this.$M + b);
        if (e === re) return this.set(re, this.$y + b);
        if (e === g) return t(1);
        if (e === h) return t(7);
        var k = (P = {}, P[$] = s, P[y] = m, P[d] = l, P)[e] || 1, p = this.$d.getTime() + b * k;
        return I.w(p, this);
      }, M.subtract = function(b, j) {
        return this.add(-1 * b, j);
      }, M.format = function(b) {
        var j = this, P = this.$locale();
        if (!this.isValid()) return P.invalidDate || se;
        var c = b || "YYYY-MM-DDTHH:mm:ssZ", e = I.z(this), t = this.$H, k = this.$m, p = this.$M, A = P.weekdays, U = P.months, x = P.meridiem, f = function(S, K, L, H) {
          return S && (S[K] || S(j, c)) || L[K].slice(0, H);
        }, D = function(S) {
          return I.s(t % 12 || 12, S, "0");
        }, ee = x || function(S, K, L) {
          var H = S < 12 ? "AM" : "PM";
          return L ? H.toLowerCase() : H;
        };
        return c.replace(q, function(S, K) {
          return K || function(L) {
            switch (L) {
              case "YY":
                return String(j.$y).slice(-2);
              case "YYYY":
                return I.s(j.$y, 4, "0");
              case "M":
                return p + 1;
              case "MM":
                return I.s(p + 1, 2, "0");
              case "MMM":
                return f(P.monthsShort, p, U, 3);
              case "MMMM":
                return f(U, p);
              case "D":
                return j.$D;
              case "DD":
                return I.s(j.$D, 2, "0");
              case "d":
                return String(j.$W);
              case "dd":
                return f(P.weekdaysMin, j.$W, A, 2);
              case "ddd":
                return f(P.weekdaysShort, j.$W, A, 3);
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
                return ee(t, k, !0);
              case "A":
                return ee(t, k, !1);
              case "m":
                return String(k);
              case "mm":
                return I.s(k, 2, "0");
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
      }, M.diff = function(b, j, P) {
        var c, e = this, t = I.p(j), k = J(b), p = (k.utcOffset() - this.utcOffset()) * s, A = this - k, U = function() {
          return I.m(e, k);
        };
        switch (t) {
          case re:
            c = U() / 12;
            break;
          case ae:
            c = U();
            break;
          case ie:
            c = U() / 3;
            break;
          case h:
            c = (A - p) / 6048e5;
            break;
          case g:
            c = (A - p) / 864e5;
            break;
          case y:
            c = A / m;
            break;
          case $:
            c = A / s;
            break;
          case d:
            c = A / l;
            break;
          default:
            c = A;
        }
        return P ? c : I.a(c);
      }, M.daysInMonth = function() {
        return this.endOf(ae).$D;
      }, M.$locale = function() {
        return R[this.$L];
      }, M.locale = function(b, j) {
        if (!b) return this.$L;
        var P = this.clone(), c = z(b, j, !0);
        return c && (P.$L = c), P;
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
      }, O;
    }(), G = v.prototype;
    return J.prototype = G, [["$ms", r], ["$s", d], ["$m", $], ["$H", y], ["$W", g], ["$M", ae], ["$y", re], ["$D", he]].forEach(function(O) {
      G[O[1]] = function(M) {
        return this.$g(M, O[0], O[1]);
      };
    }), J.extend = function(O, M) {
      return O.$i || (O(M, v, J), O.$i = !0), J;
    }, J.locale = z, J.isDayjs = w, J.unix = function(O) {
      return J(1e3 * O);
    }, J.en = R[_], J.Ls = R, J.p = {}, J;
  });
})(Xt);
var Dn = Xt.exports;
const tt = /* @__PURE__ */ Je(Dn);
var Qt = { exports: {} };
(function(n, u) {
  (function(l, s) {
    n.exports = s();
  })(Ge, function() {
    return function(l, s, m) {
      l = l || {};
      var r = s.prototype, d = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function $(g, h, ae, ie) {
        return r.fromToBase(g, h, ae, ie);
      }
      m.en.relativeTime = d, r.fromToBase = function(g, h, ae, ie, re) {
        for (var he, se, Z, q = ae.$locale().relativeTime || d, F = l.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], N = F.length, T = 0; T < N; T += 1) {
          var _ = F[T];
          _.d && (he = ie ? m(g).diff(ae, _.d, !0) : ae.diff(g, _.d, !0));
          var R = (l.rounding || Math.round)(Math.abs(he));
          if (Z = he > 0, R <= _.r || !_.r) {
            R <= 1 && T > 0 && (_ = F[T - 1]);
            var C = q[_.l];
            re && (R = re("" + R)), se = typeof C == "string" ? C.replace("%d", R) : C(R, h, _.l, Z);
            break;
          }
        }
        if (h) return se;
        var w = Z ? q.future : q.past;
        return typeof w == "function" ? w(se) : w.replace("%s", se);
      }, r.to = function(g, h) {
        return $(g, h, this, !0);
      }, r.from = function(g, h) {
        return $(g, h, this);
      };
      var y = function(g) {
        return g.$u ? m.utc() : m();
      };
      r.toNow = function(g) {
        return this.to(y(this), g);
      }, r.fromNow = function(g) {
        return this.from(y(this), g);
      };
    };
  });
})(Qt);
var Bn = Qt.exports;
const Vn = /* @__PURE__ */ Je(Bn);
var en = { exports: {} };
(function(n, u) {
  (function(l, s) {
    n.exports = s();
  })(Ge, function() {
    var l = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, s = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, m = /\d/, r = /\d\d/, d = /\d\d?/, $ = /\d*[^-_:/,()\s\d]+/, y = {}, g = function(Z) {
      return (Z = +Z) + (Z > 68 ? 1900 : 2e3);
    }, h = function(Z) {
      return function(q) {
        this[Z] = +q;
      };
    }, ae = [/[+-]\d\d:?(\d\d)?|Z/, function(Z) {
      (this.zone || (this.zone = {})).offset = function(q) {
        if (!q || q === "Z") return 0;
        var F = q.match(/([+-]|\d\d)/g), N = 60 * F[1] + (+F[2] || 0);
        return N === 0 ? 0 : F[0] === "+" ? -N : N;
      }(Z);
    }], ie = function(Z) {
      var q = y[Z];
      return q && (q.indexOf ? q : q.s.concat(q.f));
    }, re = function(Z, q) {
      var F, N = y.meridiem;
      if (N) {
        for (var T = 1; T <= 24; T += 1) if (Z.indexOf(N(T, 0, q)) > -1) {
          F = T > 12;
          break;
        }
      } else F = Z === (q ? "pm" : "PM");
      return F;
    }, he = { A: [$, function(Z) {
      this.afternoon = re(Z, !1);
    }], a: [$, function(Z) {
      this.afternoon = re(Z, !0);
    }], Q: [m, function(Z) {
      this.month = 3 * (Z - 1) + 1;
    }], S: [m, function(Z) {
      this.milliseconds = 100 * +Z;
    }], SS: [r, function(Z) {
      this.milliseconds = 10 * +Z;
    }], SSS: [/\d{3}/, function(Z) {
      this.milliseconds = +Z;
    }], s: [d, h("seconds")], ss: [d, h("seconds")], m: [d, h("minutes")], mm: [d, h("minutes")], H: [d, h("hours")], h: [d, h("hours")], HH: [d, h("hours")], hh: [d, h("hours")], D: [d, h("day")], DD: [r, h("day")], Do: [$, function(Z) {
      var q = y.ordinal, F = Z.match(/\d+/);
      if (this.day = F[0], q) for (var N = 1; N <= 31; N += 1) q(N).replace(/\[|\]/g, "") === Z && (this.day = N);
    }], w: [d, h("week")], ww: [r, h("week")], M: [d, h("month")], MM: [r, h("month")], MMM: [$, function(Z) {
      var q = ie("months"), F = (ie("monthsShort") || q.map(function(N) {
        return N.slice(0, 3);
      })).indexOf(Z) + 1;
      if (F < 1) throw new Error();
      this.month = F % 12 || F;
    }], MMMM: [$, function(Z) {
      var q = ie("months").indexOf(Z) + 1;
      if (q < 1) throw new Error();
      this.month = q % 12 || q;
    }], Y: [/[+-]?\d+/, h("year")], YY: [r, function(Z) {
      this.year = g(Z);
    }], YYYY: [/\d{4}/, h("year")], Z: ae, ZZ: ae };
    function se(Z) {
      var q, F;
      q = Z, F = y && y.formats;
      for (var N = (Z = q.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(J, I, v) {
        var G = v && v.toUpperCase();
        return I || F[v] || l[v] || F[G].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(O, M, b) {
          return M || b.slice(1);
        });
      })).match(s), T = N.length, _ = 0; _ < T; _ += 1) {
        var R = N[_], C = he[R], w = C && C[0], z = C && C[1];
        N[_] = z ? { regex: w, parser: z } : R.replace(/^\[|\]$/g, "");
      }
      return function(J) {
        for (var I = {}, v = 0, G = 0; v < T; v += 1) {
          var O = N[v];
          if (typeof O == "string") G += O.length;
          else {
            var M = O.regex, b = O.parser, j = J.slice(G), P = M.exec(j)[0];
            b.call(I, P), J = J.replace(P, "");
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
    return function(Z, q, F) {
      F.p.customParseFormat = !0, Z && Z.parseTwoDigitYear && (g = Z.parseTwoDigitYear);
      var N = q.prototype, T = N.parse;
      N.parse = function(_) {
        var R = _.date, C = _.utc, w = _.args;
        this.$u = C;
        var z = w[1];
        if (typeof z == "string") {
          var J = w[2] === !0, I = w[3] === !0, v = J || I, G = w[2];
          I && (G = w[2]), y = this.$locale(), !J && G && (y = F.Ls[G]), this.$d = function(j, P, c, e) {
            try {
              if (["x", "X"].indexOf(P) > -1) return new Date((P === "X" ? 1e3 : 1) * j);
              var t = se(P)(j), k = t.year, p = t.month, A = t.day, U = t.hours, x = t.minutes, f = t.seconds, D = t.milliseconds, ee = t.zone, S = t.week, K = /* @__PURE__ */ new Date(), L = A || (k || p ? 1 : K.getDate()), H = k || K.getFullYear(), Y = 0;
              k && !p || (Y = p > 0 ? p - 1 : K.getMonth());
              var oe, ne = U || 0, V = x || 0, te = f || 0, ce = D || 0;
              return ee ? new Date(Date.UTC(H, Y, L, ne, V, te, ce + 60 * ee.offset * 1e3)) : c ? new Date(Date.UTC(H, Y, L, ne, V, te, ce)) : (oe = new Date(H, Y, L, ne, V, te, ce), S && (oe = e(oe).week(S).toDate()), oe);
            } catch {
              return /* @__PURE__ */ new Date("");
            }
          }(R, z, C, F), this.init(), G && G !== !0 && (this.$L = this.locale(G).$L), v && R != this.format(z) && (this.$d = /* @__PURE__ */ new Date("")), y = {};
        } else if (z instanceof Array) for (var O = z.length, M = 1; M <= O; M += 1) {
          w[1] = z[M - 1];
          var b = F.apply(this, w);
          if (b.isValid()) {
            this.$d = b.$d, this.$L = b.$L, this.init();
            break;
          }
          M === O && (this.$d = /* @__PURE__ */ new Date(""));
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
  (function(l, s) {
    n.exports = s();
  })(Ge, function() {
    var l = "minute", s = /[+-]\d\d(?::?\d\d)?/g, m = /([+-]|\d\d)/g;
    return function(r, d, $) {
      var y = d.prototype;
      $.utc = function(se) {
        var Z = { date: se, utc: !0, args: arguments };
        return new d(Z);
      }, y.utc = function(se) {
        var Z = $(this.toDate(), { locale: this.$L, utc: !0 });
        return se ? Z.add(this.utcOffset(), l) : Z;
      }, y.local = function() {
        return $(this.toDate(), { locale: this.$L, utc: !1 });
      };
      var g = y.parse;
      y.parse = function(se) {
        se.utc && (this.$u = !0), this.$utils().u(se.$offset) || (this.$offset = se.$offset), g.call(this, se);
      };
      var h = y.init;
      y.init = function() {
        if (this.$u) {
          var se = this.$d;
          this.$y = se.getUTCFullYear(), this.$M = se.getUTCMonth(), this.$D = se.getUTCDate(), this.$W = se.getUTCDay(), this.$H = se.getUTCHours(), this.$m = se.getUTCMinutes(), this.$s = se.getUTCSeconds(), this.$ms = se.getUTCMilliseconds();
        } else h.call(this);
      };
      var ae = y.utcOffset;
      y.utcOffset = function(se, Z) {
        var q = this.$utils().u;
        if (q(se)) return this.$u ? 0 : q(this.$offset) ? ae.call(this) : this.$offset;
        if (typeof se == "string" && (se = function(_) {
          _ === void 0 && (_ = "");
          var R = _.match(s);
          if (!R) return null;
          var C = ("" + R[0]).match(m) || ["-", 0, 0], w = C[0], z = 60 * +C[1] + +C[2];
          return z === 0 ? 0 : w === "+" ? z : -z;
        }(se), se === null)) return this;
        var F = Math.abs(se) <= 16 ? 60 * se : se;
        if (F === 0) return this.utc(Z);
        var N = this.clone();
        if (Z) return N.$offset = F, N.$u = !1, N;
        var T = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
        return (N = this.local().add(F + T, l)).$offset = F, N.$x.$localOffset = T, N;
      };
      var ie = y.format;
      y.format = function(se) {
        var Z = se || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
        return ie.call(this, Z);
      }, y.valueOf = function() {
        var se = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
        return this.$d.valueOf() - 6e4 * se;
      }, y.isUTC = function() {
        return !!this.$u;
      }, y.toISOString = function() {
        return this.toDate().toISOString();
      }, y.toString = function() {
        return this.toDate().toUTCString();
      };
      var re = y.toDate;
      y.toDate = function(se) {
        return se === "s" && this.$offset ? $(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : re.call(this);
      };
      var he = y.diff;
      y.diff = function(se, Z, q) {
        if (se && this.$u === se.$u) return he.call(this, se, Z, q);
        var F = this.local(), N = $(se).local();
        return he.call(F, N, Z, q);
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
    const l = u, s = et(), m = ue(() => Un()), r = (d) => {
      d.route ? s.push(d.route) : d.href && window.open(d.href, "_blank"), l("linkClick", d);
    };
    return (d, $) => (pe(), Me(dn, {
      app: "",
      class: "basic-footer"
    }, {
      default: fe(() => [
        le(Gt, null, {
          default: fe(() => [
            le(Ze, null, {
              default: fe(() => [
                (pe(!0), we(Fe, null, Dt(n.links, (y) => (pe(), Me(He, {
                  key: y.id,
                  variant: "text",
                  onClick: (g) => r(y)
                }, {
                  default: fe(() => [
                    Te($e(y.label), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick"]))), 128))
              ]),
              _: 1
            }),
            le(Ze, { class: "text-right" }, {
              default: fe(() => [
                De("span", null, $e(n.copyright) + " " + $e(m.value), 1),
                n.version ? (pe(), we("span", Hn, "v" + $e(n.version), 1)) : _e("", !0)
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
}), qn = /* @__PURE__ */ Re(zn, [["__scopeId", "data-v-b418d0f4"]]), Gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qn
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
  setup(n, { expose: u, emit: l }) {
    const s = n, m = l, r = Le(), d = ke(!1), $ = ue(() => s.param?.item || {}), y = ue(() => s.field?.custom || {}), g = ue(() => y.value.allow || (() => !0)), h = ue(() => r?.state?.current_user || null), ae = (F) => y.value.field?.[F.name]?.filter || (() => !0), ie = ue(() => {
      const F = s.field;
      if (!F) return [];
      let T = (F.kind ? Object.entries(F.kind) : []).filter(ae(F)).map(([_, R]) => ({
        text: R.title,
        value: _
      }));
      return h.value && (h.value.profile === "sea" && (T = T.filter((_) => _.value !== "gea")), h.value.profile === "ob" && (T = T.filter(
        (_) => _.value !== "gea" && _.value !== "sea"
      ))), T;
    }), re = ue(() => ie.value), he = ue(() => s.label || s.field?.title || ""), se = ue(() => s.disabled || s.field?.readonly || !g.value("edit")), Z = (F) => {
      s.field && $.value && ($.value[s.field.name] = F), m("update:modelValue", F), m("change", F);
    };
    return u({
      allow: (...F) => g.value(...F)
    }), (F, N) => (pe(), Me(Wt, {
      "model-value": n.modelValue,
      items: re.value,
      label: he.value,
      disabled: se.value,
      multiple: n.multiple,
      loading: d.value,
      "item-title": "text",
      "item-value": "value",
      variant: "outlined",
      "onUpdate:modelValue": Z
    }, null, 8, ["model-value", "items", "label", "disabled", "multiple", "loading"]));
  }
}), Wn = /* @__PURE__ */ Re(Jn, [["__scopeId", "data-v-cd41e439"]]), Zn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
function Xn(n, u, l, s, m, r) {
  return pe(), we("div", null, [
    l.user ? rn(n.$slots, "default", { key: 0 }) : (pe(), Me(Jt, { key: 1 }, {
      default: fe(() => [
        le(Gt, null, {
          default: fe(() => [
            le(Ze),
            le(Ze, null, {
              default: fe(() => [
                le(pn, { xstyle: "max-width:40vw" }, {
                  default: fe(() => [
                    le(fn, null, {
                      default: fe(() => [...u[3] || (u[3] = [
                        Te("Sign In", -1)
                      ])]),
                      _: 1
                    }),
                    le(hn, {
                      ref: "form",
                      modelValue: m.valid,
                      "onUpdate:modelValue": u[2] || (u[2] = (d) => m.valid = d),
                      "lazy-validation": ""
                    }, {
                      default: fe(() => [
                        le(Lt, null, {
                          default: fe(() => [
                            le(Yt, {
                              modelValue: m.email,
                              "onUpdate:modelValue": u[0] || (u[0] = (d) => m.email = d),
                              rules: m.emailRules,
                              label: "Email",
                              required: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "rules"]),
                            le(Yt, {
                              modelValue: m.password,
                              "onUpdate:modelValue": u[1] || (u[1] = (d) => m.password = d),
                              rules: m.passwordRules,
                              label: "Password",
                              required: "",
                              type: "password",
                              outlined: ""
                            }, null, 8, ["modelValue", "rules"])
                          ]),
                          _: 1
                        }),
                        m.state != "empty" ? (pe(), Me(Lt, { key: 0 }, {
                          default: fe(() => [
                            Te($e(m.stateMessage[m.state]), 1)
                          ]),
                          _: 1
                        })) : _e("", !0),
                        le(mn, null, {
                          default: fe(() => [
                            le(Vt),
                            le(He, {
                              disabled: !m.valid,
                              onClick: r.signin
                            }, {
                              default: fe(() => [...u[4] || (u[4] = [
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
            le(Ze)
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
function nr(n, u, l, s, m, r) {
  const d = qe("vxg-basic-head"), $ = qe("vxg-basic-side"), y = qe("vxg-basic-main"), g = qe("vxg-basic-foot");
  return pe(), Me(gn, { id: "app" }, {
    default: fe(() => [
      le(d, {
        spec: m.spec.parts.head,
        logo: l.logo,
        onAction: u[0] || (u[0] = (h) => r.action("BasicHead", h))
      }, null, 8, ["spec", "logo"]),
      r.showSide ? (pe(), Me($, {
        key: 0,
        spec: m.spec.parts.side,
        logo: l.logo,
        onAction: u[1] || (u[1] = (h) => r.action("BasicSide", h))
      }, null, 8, ["spec", "logo"])) : _e("", !0),
      le(y, {
        spec: m.spec.parts.main
      }, null, 8, ["spec"]),
      le(g, {
        spec: m.spec.parts.foot
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
  const n = Le(), u = ue(
    () => n.state.vxg?.cmp?.BasicSide?.show || !1
  ), l = ue(
    () => n.state.vxg?.cmp?.BasicSide?.content || null
  ), s = ue(() => n.state.vxg?.cmp?.BasicSide?.width ?? 282), m = (g) => {
    const h = g !== void 0 ? g : !u.value;
    return n.dispatch("set_cmp_flags", {
      name: "BasicSide",
      flags: { show: h }
    });
  }, r = () => n.dispatch("set_cmp_flags", {
    name: "BasicSide",
    flags: { show: !0 }
  }), d = () => n.dispatch("set_cmp_flags", {
    name: "BasicSide",
    flags: { show: !1 }
  });
  return {
    isOpen: u,
    content: l,
    width: s,
    toggle: m,
    open: r,
    close: d,
    setContent: (g) => n.dispatch("set_cmp_flags", {
      name: "BasicSide",
      flags: { content: g }
    }),
    handleResize: () => {
      window.innerWidth < 960 && u.value && d();
    }
  };
}
function or() {
  const n = Le(), u = ke(""), l = ke(""), s = ke([]), m = ke([]), r = ke([]), d = ke([]), $ = ue(
    () => n.state.showSearch2 || !1
  );
  return {
    search: u,
    search2: l,
    showSearch2: $,
    tagItems: s,
    tagItems2: m,
    items: r,
    items2: d,
    toggleSearch2: () => {
      n.commit("toggleSearch2");
    },
    toggleExpansion: () => {
      n.state.showExpansion = !n.state.showExpansion;
    },
    clearFilter: () => {
      u.value = "", l.value = "", s.value = [], m.value = [], n.dispatch("vxg_trigger_clear"), n.dispatch("setLastTrackedSearch", null), n.dispatch("clear_path_data"), n.commit("clear_path_data"), n.commit("clearMatchingConnectorData"), $.value && n.commit("toggleSearch2");
    },
    reverseInputs: () => {
      const he = u.value;
      u.value = l.value, l.value = he;
      const se = s.value;
      s.value = m.value, m.value = se;
      const Z = r.value;
      r.value = d.value, d.value = Z, n.commit("setReverseTriggered", !0);
    },
    loadAssets: () => new Promise((he) => {
      const se = {
        assets: []
      };
      n.dispatch("vxg_get_assets", se).then(() => {
        r.value = se.assets, he(se.assets);
      }).catch(() => {
        he([]);
      });
    }),
    searchAssets: async (he, se) => {
      const Z = window.$seneca;
      if (!Z) return [];
      try {
        return (await Z.post("sys:search,cmd:search", {
          query: he,
          params: se
        })).data?.hits || [];
      } catch (q) {
        return console.error("Error searching assets:", q), [];
      }
    }
  };
}
function ir() {
  const n = Le(), u = ke([]), l = ke(0), s = ke([]), m = ke(null), r = ke([]), d = ue(() => s.value.length > 1), $ = ue(
    () => u.value[l.value] || null
  ), y = (q) => new Promise((F, N) => {
    if (!q || !Array.isArray(q) || q.length === 0) {
      console.warn("Invalid or empty pathData"), s.value = [], u.value = [], F();
      return;
    }
    try {
      m.value = q[0];
      const T = h(m.value);
      r.value = T.map((_) => _.map), ie(T).then((_) => {
        s.value = _, u.value = _.map((R, C) => ({
          id: `stage-${C}`,
          map: R.map,
          msg: R.msg,
          type: "stage"
        })), F();
      }).catch((_) => {
        console.error("Error generating route steps:", _), N(_);
      });
    } catch (T) {
      console.error("Error parsing pathData:", T), s.value = [], u.value = [], N(T);
    }
  }), g = (q) => {
    const F = q.split(","), N = F[0], T = F[1];
    return { id: N, type: T };
  }, h = (q) => !q || !Array.isArray(q) ? [] : q.map((F) => {
    const N = F.detail.split(",");
    return {
      id: N[0],
      type: N[1],
      map: F.index,
      x: parseFloat(N[3]),
      y: parseFloat(N[4])
    };
  }), ae = (q) => q.filter((F, N, T) => {
    if (F.type !== "Connector") return !0;
    const _ = T[N - 1], R = T[N + 1];
    return !!(_ && _.type === "Connector" || R && R.type === "Connector");
  }), ie = (q) => new Promise((F) => {
    let N = q;
    const T = [], _ = 0;
    for (let R = 0; R < N.length - _; R++)
      if (N[R].type === "Connector") {
        let C = "Follow route to stairs and proceed to ", w = R;
        for (; w < N.length - 1 && N[w + 1].type === "Connector"; )
          w++;
        w < N.length - 0 && (C += re(N[w]), T.push({
          msg: C,
          map: N[R].map - 1
        })), R = w;
      }
    T.length > 0 && T.push({
      msg: "Proceed to your destination.",
      map: N[N.length - 1].map - 1
    }), F(T);
  }), re = (q) => {
    const F = n.state.main_asset;
    if (!F || !Array.isArray(F))
      return "@";
    const N = F.filter(
      (R) => !isNaN(parseInt(R.map)) && parseInt(R.map) === q.map - 1
    );
    if (N.length === 0)
      return "@";
    let T = N[0], _ = 1 / 0;
    for (const R of N) {
      const C = Math.sqrt(
        Math.pow(R.xco - q.x, 2) + Math.pow(R.yco - q.y, 2)
      );
      C < _ && (T = R, _ = C);
    }
    return T?.level || "@";
  };
  return {
    // State
    stages: u,
    activeStage: l,
    routeMassages: s,
    mapValues: r,
    // Computed
    hasStages: d,
    currentStageData: $,
    // Methods
    parsePathData: y,
    parseLine: g,
    parseLines: h,
    filterConnectors: ae,
    getRouteSteps: ie,
    getMapName: re,
    selectStage: (q) => {
      l.value = q, n.commit("setCurrentStage", q + 1);
    },
    getSelectedStage: () => l.value,
    clearStages: () => {
      u.value = [], s.value = [], l.value = 0, m.value = null, r.value = [];
    }
  };
}
function lr() {
  const n = Le(), u = (d) => Promise.resolve().then(() => {
    const $ = d + 1;
    return n.commit("setCurrentStage", $), n.dispatch("setCurrentStage", $);
  }).then(() => {
    console.log("Route synced with stage:", d);
  }).catch(($) => {
    throw console.error("Error syncing route with stage:", $), $;
  }), l = (d, $, y) => {
    console.log("__trigger_select_value", d);
    const g = $.findIndex((h) => h.map === d);
    g !== -1 ? (y(g), console.log("__activeStage updated to", g)) : y(0);
  }, s = (d, $) => {
    console.log("Current Stage changed:", d), $(d - 1), n.dispatch("setCurrentStage", d).catch((y) => {
      console.error("Error dispatching setCurrentStage:", y);
    });
  };
  return {
    syncRouteWithStage: u,
    handleTriggerSelect: l,
    handleStageChange: s,
    setupStageWatchers: (d, $) => {
      Ce(
        () => n.state.trigger?.select?.value,
        (y) => {
          y !== void 0 && d.value && l(y, d.value, $);
        }
      ), Ce(
        () => n.state.currentStage,
        (y) => {
          y !== void 0 && s(y, $);
        }
      );
    },
    emitStageSelected: (d) => {
      console.log("Stage selected with map:", d);
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
    const l = u, s = () => {
      l("select");
    };
    return (m, r) => (pe(), we("div", {
      class: zt(["stage", { "stage--active": n.isActive }]),
      "data-active": n.isActive,
      "data-index": n.index,
      onClick: s
    }, [
      De("h3", ur, [
        Te(" STAGE " + $e(n.index + 1) + " ", 1),
        n.isActive ? (pe(), we("span", dr, " ✓")) : _e("", !0)
      ]),
      De("p", pr, $e(n.stage.msg), 1)
    ], 10, cr));
  }
}), nn = /* @__PURE__ */ Re(fr, [["__scopeId", "data-v-989fc945"]]), mr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
    const l = n, s = u, m = ue({
      get: () => l.expanded,
      set: ($) => s("update:expanded", $)
    });
    ue(
      () => m.value !== void 0 ? "nav_in.svg" : "nav_out.svg"
    );
    const r = () => {
      s("toggle-icon");
    }, d = ($) => {
      console.log(`📍 NavStagesExpansion: Stage ${$} selected, activeStage=${l.activeStage}`), s("stage-select", $);
    };
    return Ce(() => l.expanded, ($) => {
    }), Ce(() => l.activeStage, ($) => {
      console.log(`🎨 NavStagesExpansion: activeStage changed to ${$}`);
    }), ($, y) => (pe(), Me(vn, {
      modelValue: m.value,
      "onUpdate:modelValue": y[0] || (y[0] = (g) => m.value = g),
      class: "mb-12"
    }, {
      default: fe(() => [
        le(xn, null, {
          default: fe(() => [
            le(bn, {
              style: { "background-color": "#DCEEEF", "border-bottom-left-radius": "10px", "border-bottom-right-radius": "10px" },
              onClick: r
            }, {
              actions: fe(() => [
                m.value !== void 0 ? (pe(), Me(Pe, { key: 0 }, {
                  default: fe(() => [...y[1] || (y[1] = [
                    Te("mdi-chevron-up", -1)
                  ])]),
                  _: 1
                })) : (pe(), Me(Pe, { key: 1 }, {
                  default: fe(() => [...y[2] || (y[2] = [
                    Te("mdi-chevron-down", -1)
                  ])]),
                  _: 1
                }))
              ]),
              default: fe(() => [
                le(Pe, { class: "mr-2" }, {
                  default: fe(() => [...y[3] || (y[3] = [
                    Te("mdi-layers", -1)
                  ])]),
                  _: 1
                }),
                y[4] || (y[4] = De("h4", { style: { width: "300px", "font-size": "14px", "padding-left": "2px" } }, " THIS ROUTE CONTAINS MULTIPLE LEVELS ", -1))
              ]),
              _: 1
            }),
            le(kn, { style: { padding: "10px 0 10px 0", "background-color": "#DCEEEF" } }, {
              default: fe(() => [
                (pe(!0), we(Fe, null, Dt(n.stages, (g, h) => (pe(), Me(nn, {
                  key: g.id || `stage-${h}`,
                  stage: g,
                  index: h,
                  "is-active": n.activeStage === h,
                  onSelect: (ae) => d(h)
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
    const l = Le(), {
      stages: s,
      activeStage: m,
      routeMassages: r,
      hasStages: d,
      parsePathData: $,
      selectStage: y,
      clearStages: g
    } = ir(), {
      syncRouteWithStage: h,
      handleTriggerSelect: ae,
      handleStageChange: ie
    } = lr(), re = ke(void 0);
    ke(!0), ue(() => l.state.pathData), ue(() => l.state.currentStage), ue(() => l.state.trigger?.select?.value);
    const he = u, se = (q) => {
      console.log(`🚀 BasicNavStages.handleStageSelect: Stage ${q} selected, current activeStage=${m.value}`);
      const N = s.value[q]?.map;
      y(q), console.log(`📊 BasicNavStages.handleStageSelect: After selectStageComposable, activeStage=${m.value}`), h(q).catch((T) => {
        console.error("Error syncing route:", T);
      }), N !== void 0 && he("stageSelected", N);
    }, Z = () => {
      console.log("Icon toggled, expanded:", re.value);
    };
    return Ce(
      () => l.state.pathData,
      (q) => {
        if (!q || !q.asset123) {
          console.warn("PathData is undefined or missing asset123"), g();
          return;
        }
        console.log("pathData changed, parsing...", q.asset123), $(q.asset123).then(() => (console.log("Path data parsed successfully, stages:", s.value.length), l.dispatch("set_path_data", { pathDetails: q.asset123 }))).then((F) => {
          console.log("Dispatch result:", F);
        }).catch((F) => {
          console.error("Error handling pathData:", F);
        });
      },
      { deep: !0 }
    ), Ce(
      () => l.state.currentStage,
      (q) => {
        q !== void 0 && q > 0 && ie(q, (F) => {
          m.value = F;
        });
      }
    ), Ce(
      () => l.state.trigger?.select?.value,
      (q) => {
        q !== void 0 && r.value.length > 0 && ae(
          q,
          r.value,
          (F) => {
            m.value = F;
          }
        );
      }
    ), Ce(re, (q) => {
      console.log("Expansion state changed:", q);
    }), Bt(() => {
      console.log("BasicNavStages mounted, currentStage:", l.state.currentStage), l.state.pathData?.asset123 && $(l.state.pathData.asset123).catch((q) => {
        console.error("Error parsing initial pathData:", q);
      });
    }), Qe(() => {
      console.log("BasicNavStages unmounted");
    }), (q, F) => de(d) ? (pe(), we("div", gr, [
      le(hr, {
        expanded: re.value,
        "onUpdate:expanded": F[0] || (F[0] = (N) => re.value = N),
        stages: de(s),
        "active-stage": de(m),
        onStageSelect: se,
        onToggleIcon: Z
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
}, Or = { key: 4 }, $r = {
  key: 5,
  style: { color: "#000", "background-color": "rgb(220 238 239)", height: "33px", width: "calc(100% - 8px)", left: "4px", "padding-top": "3px", "padding-left": "13px", position: "absolute", "z-index": "9999", top: "185px" }
}, Er = { key: 0 }, Ir = { key: 1 }, jr = {
  class: "Menu Items",
  style: { "margin-top": "15px", height: "calc(100vh - 332px)" }
}, Pr = {
  key: 0,
  class: "router_items"
}, Nt = "/", Ts = /* @__PURE__ */ Ve({
  __name: "BasicSide",
  props: {
    spec: {},
    logo: { default: "" },
    location: { default: "left" }
  },
  emits: ["action"],
  setup(n, { emit: u }) {
    const l = n, s = Le(), m = et(), r = qt();
    ar();
    const {
      search: d,
      search2: $,
      showSearch2: y,
      tagItems: g,
      tagItems2: h,
      items: ae,
      items2: ie,
      toggleSearch2: re,
      toggleExpansion: he,
      clearFilter: se,
      reverseInputs: Z,
      loadAssets: q
    } = or(), F = ke(), N = ke(), T = ke(!0);
    ke(!1);
    const _ = ke([]), R = ke(null), C = ke({ mode: "standard", menu: { items: {}, order: "" } });
    ke("");
    const w = ke(!0), z = ue(() => r.name), J = ue(() => s.state.showSearch2 || !1);
    ue(() => s.state.showExpansion !== !1);
    const I = ue(() => s.state.pathData || null);
    ue(() => s.state.currentStage || 0), ue(() => s.state.trigger?.select || {}), ue(() => s.state.trigger?.filter_disabled?.value || !1);
    const v = ue(() => !J.value && w.value ? "mdi-magnify magnifierIcon" : ""), G = ue(() => {
      if (C.value.mode !== "standard") return [];
      const { items: E = {}, order: B = "" } = C.value.menu || {};
      return B ? B.split(/\s*,\s*/).filter((o) => o && E[o]).map((o) => ({
        ...E[o],
        code: o,
        klass: { "vxg-router-link": !0 }
      })) : [];
    }), O = ue(() => s.state.vxg?.cmp?.BasicHead?.show?.filter || !1);
    ue(() => ce);
    const M = ue(() => window.$model?.main?.ux?.custom || {}), b = ue(() => M.value.special?.view || {});
    ue(() => M.value.special?.portal || {});
    const j = ue(() => {
      const E = window.$model?.main?.app?.web?.parts?.head?.tool || {}, B = b.value.tool || {};
      return {
        clear: { active: !0 },
        select: { active: !1 },
        ...E,
        ...B
      };
    }), P = ue(() => M.value.search_config || {}), c = ue(() => s.state.pathEstimation?.time || 0), e = ue(() => s.state.pathEstimation?.distance || 0), t = (E) => !E || typeof E != "object" || !E.tag ? null : E.custom12 != null ? E.tag + "(" + E.custom12 + ")" : E.tag, k = (E, B, o) => 1, p = () => {
      w.value = !1;
    }, A = () => {
      w.value = !0;
    }, U = (E) => {
      E.name !== "NavigationDuplicated" && console.error("Router navigation error:", E);
    }, x = async (E, B, o) => {
      if (E) {
        const a = window.$seneca;
        if (a) {
          const i = await a.post(
            "sys:search, cmd:search",
            { query: E, params: P.value }
          );
          B.value = i.data.hits.filter((X) => X && X.doc).map((X) => t(X.doc)).filter((X) => X !== null);
        }
      } else
        o.value != null && (B.value = o.value.filter((a) => a && a.tag).map(t).filter((a) => a !== null));
    }, f = (E) => {
      J.value ? m.replace({
        path: r.path,
        query: {
          mode: "route",
          a: d.value,
          b: $.value
        }
      }).catch(U) : m.push({
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
          te(o);
          return;
        }
      }
      const B = $.value;
      setTimeout(async () => {
        const o = E.target ? E.target.value : null;
        J.value ? m.replace({
          path: r.path,
          query: {
            mode: "route",
            a: o || "",
            b: B || ""
            // Use captured value
          }
        }).catch(U) : m.push({
          path: r.path,
          query: {
            mode: "assetsearch",
            term: o
          }
        }).catch(U), await x(o, g, ae);
      }, 11);
    }, ee = async (E) => {
      const B = d.value;
      setTimeout(async () => {
        const o = E.target ? E.target.value : null;
        J.value && m.replace({
          path: r.path,
          query: {
            mode: "route",
            a: B || "",
            // Use captured value
            b: o || ""
          }
        }).catch(U), await x(o, h, ie);
      }, 11);
    }, S = () => {
      const E = r.query;
      let B = d.value || "", o = $.value || "";
      E.mode === "assetsearch" && E.term && !o && (o = E.term, $.value = o), J.value || re(), s.dispatch("toggleSideInfoCardVisibility", !1), m.replace({
        path: r.path,
        query: {
          mode: "route",
          a: B,
          b: o
        }
      }).catch((a) => {
        a.name !== "NavigationDuplicated" && console.error("Router navigation error:", a);
      });
    }, K = () => {
      se(), cn(() => {
        s.dispatch("set_cmp_flags", { name: "BasicMain", flags: { show: !1 } }), d.value = "", $.value = "";
      }), m.replace({
        path: r.path,
        query: {}
      }).catch((E) => {
        E.name !== "NavigationDuplicated" && console.error("Router navigation error:", E);
      });
    }, L = () => {
      Z(), s.commit("setCurrentStage", 1), s.dispatch("setCurrentStage", 1), m.replace({
        path: r.path,
        query: {
          mode: "route",
          a: d.value,
          b: $.value
        }
      }).catch((E) => {
        E.name !== "NavigationDuplicated" && console.error("Router navigation error:", E);
      });
    }, H = (E) => V(E) && s.state.vxg?.cmp?.BasicHead?.show?.[E], Y = (E) => {
      if (r.query.mode === "route") {
        console.log("Filter ignored - currently in navigation mode");
        return;
      }
      r.query.mode !== "filtersearch" && m.replace({
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
    }, oe = () => C.value && C.value.menu && C.value.menu.default, ne = (E) => {
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
    }, te = async (E) => {
      try {
        if (console.log("Performing asset search for term:", E), E && E.trim()) {
          const B = E.trim(), o = window.$seneca;
          if (o) {
            const a = await o.post(
              "sys:search, cmd:search",
              { query: B, params: P.value }
            );
            g.value = a.data.hits.filter((i) => i && i.doc).map((i) => t(i.doc)).filter((i) => i !== null), console.log("Asset search results:", g.value), s.dispatch("trigger_asset_search", {
              term: B,
              results: a.data.hits,
              mode: "assetsearch"
            });
          }
        } else
          ae.value != null && (g.value = ae.value.filter((B) => B && B.tag).map(t).filter((B) => B !== null));
      } catch (B) {
        console.error("Error performing asset search:", B);
      }
    };
    Ce(() => J.value, (E) => {
      E && (s.state.showExpansion = !1);
    }), Ce(() => R.value, (E) => {
    }), Ce(() => s.state.trigger?.search?.a, (E) => {
      d.value = E, typeof E == "object" && (E = E.tag), E == "" && F.value && (F.value.reset(), g.value = ae.value.filter((B) => B && B.tag).map(t).filter((B) => B !== null));
    }), Ce(() => s.state.trigger?.search?.b, (E) => {
      typeof E == "object" && (E = E.tag), E = String(E).replace(/\(.*?\)/g, "").trim(), $.value = E, E == "" && N.value && (N.value.reset(), h.value = ie.value.filter((o) => o && o.tag).map(t).filter((o) => o !== null));
    }), Ce(d, (E) => {
      let B = E || "";
      B = B.trim(), s.dispatch("trigger_search", { a: B });
    }), Ce($, (E) => {
      let B = E || "";
      s.dispatch("trigger_search", { b: B });
    }), Ce(() => r.name, (E) => {
      !E && oe() && m.push(C.value.menu.default);
      const B = ne(E);
      C.value = _.value[B.index] || C.value;
    }, { immediate: !0 }), Ce(() => r.query, (E) => {
      E.mode == "route" && (E.a !== void 0 && (d.value = E.a || "", s.state.trigger.search.a = d.value), E.b !== void 0 && ($.value = E.b || "", s.state.trigger.search.b = $.value));
    }, { immediate: !0 }), Bt(() => {
      J.value && (s.state.showExpansion = !1);
      const E = l.spec.view || {};
      for (let a in E) {
        let i = E[a];
        i.name = a, _.value.push(i);
      }
      console.log("menuViewList:", _.value);
      const B = ne(r.name);
      C.value = _.value[B.index] || C.value, R.value = B.index;
      const o = setInterval(async () => {
        const a = await q();
        if (r.path.includes("/user"))
          try {
            s.state.main_user && s.state.main_user.length > 0 ? ie.value = s.state.main_user : ie.value = [...a];
          } catch {
            ie.value = [...a];
          }
        else
          ie.value = [...a];
        a.length != 0 && (g.value = a.filter((i) => i && i.tag).map(t).filter((i) => i !== null), ie.value.length > 0 && ie.value[0].email ? h.value = ie.value.filter((i) => i && (i.email || i.name)).map((i) => i.email || i.name).filter((i) => i !== null) : h.value = ie.value.filter((i) => i && i.tag).map(t).filter((i) => i !== null), clearInterval(o), console.log("✅ Assets loaded and formatted:", g.value.slice(0, 5)));
      }, 111);
    }), Qe(() => {
    });
    const ce = Object.freeze({
      width: "282px",
      visibility: "visible !important",
      transform: "none !important"
    });
    return (E, B) => {
      const o = qe("router-link");
      return pe(), Me(yn, {
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
        default: fe(() => [
          le(Sn, { class: "d-flex flex-column h-100" }, {
            default: fe(() => [
              De("div", xr, [
                De("div", { innerHTML: n.logo }, null, 8, br)
              ]),
              H("clear") && j.value.clear.active ? (pe(), Me(He, {
                key: 0,
                text: "",
                style: { "max-width": "200px", display: "inline-block", "margin-left": "48%", "text-transform": "none", "font-size": "12px", color: "var(--vxg-text-color, #333)", top: "10px" },
                class: "btn-clear",
                onClick: K
              }, {
                default: fe(() => [
                  Te($e(de(y) ? "Close Navigation Mode" : "Clear Search"), 1)
                ]),
                _: 1
              })) : _e("", !0),
              z.value === "pqview" || z.value === "side" ? (pe(), we("div", kr, [
                sn(De("div", yr, [
                  De("img", {
                    src: `${Nt}Layer_5.svg`,
                    alt: "Layer_5",
                    class: "Layer_5",
                    style: { cursor: "pointer", width: "24px", height: "24px" },
                    onClick: B[0] || (B[0] = (a) => {
                      de(re)(), de(he)(), S();
                    })
                  }, null, 8, Sr)
                ], 512), [
                  [an, !de(y)]
                ]),
                de(y) ? (pe(), we("div", wr, [
                  De("img", {
                    src: `${Nt}navigation_1.svg`,
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
                    marginLeft: de(y) ? "48px" : "0"
                  })
                }, [
                  le(At, {
                    ref_key: "searchRef",
                    ref: F,
                    class: "comboxSearch d-flex justify-space-between",
                    modelValue: de(d),
                    "onUpdate:modelValue": B[1] || (B[1] = (a) => Xe(d) ? d.value = a : null),
                    onKeydown: B[2] || (B[2] = (a) => D(a)),
                    "onClick:clear": B[3] || (B[3] = (a) => D(a)),
                    onChange: B[4] || (B[4] = (a) => f(a)),
                    items: de(g),
                    flat: "",
                    "hide-details": "",
                    outlined: "",
                    dense: "",
                    clearable: "",
                    placeholder: de(y) ? "Start location..." : "Search...",
                    "onClick:append": Y,
                    filter: k,
                    "prepend-inner-icon": v.value,
                    onClick: p,
                    onBlur: A
                  }, null, 8, ["modelValue", "items", "placeholder", "prepend-inner-icon"])
                ], 4),
                O.value && !de(y) ? (pe(), we("img", {
                  key: 1,
                  src: `${Nt}Clip_path_group.svg`,
                  alt: "Clip_Path_group",
                  style: { cursor: "pointer", position: "relative", top: "-33px", left: "calc(100% - 33px)", "border-left": "solid 1px", "padding-left": "2px", "z-index": "10" },
                  class: "clip-path-group",
                  onClick: ln(Y, ["stop", "prevent"])
                }, null, 8, Mr)) : _e("", !0),
                de(y) ? (pe(), we("div", Tr)) : _e("", !0),
                de(y) ? (pe(), we("div", Cr, [
                  le(At, {
                    class: "comboxSearch2",
                    ref_key: "search2Ref",
                    ref: N,
                    modelValue: de($),
                    "onUpdate:modelValue": B[5] || (B[5] = (a) => Xe($) ? $.value = a : null),
                    onKeydown: B[6] || (B[6] = (a) => ee(a)),
                    "onClick:clear": B[7] || (B[7] = (a) => ee(a)),
                    items: de(h),
                    flat: "",
                    "hide-details": "",
                    outlined: "",
                    dense: "",
                    clearable: "",
                    placeholder: "Destination...",
                    filter: k
                  }, null, 8, ["modelValue", "items"])
                ])) : _e("", !0),
                de(y) ? (pe(), we("div", Or, [
                  le(Pe, {
                    size: "18",
                    color: "black",
                    style: { cursor: "pointer", position: "relative", top: "-49px", left: "calc(100% - 29px)", "margin-left": "-18px", background: "white", "z-index": "999", "border-radius": "2px" },
                    onClick: L
                  }, {
                    default: fe(() => [...B[10] || (B[10] = [
                      Te(" mdi-swap-vertical ", -1)
                    ])]),
                    _: 1
                  })
                ])) : _e("", !0),
                de(y) && de($) && I.value && Object.keys(I.value).length > 0 ? (pe(), we("div", $r, [
                  le(Pe, {
                    style: { margin: "-7px 0", color: "black" },
                    "aria-hidden": "true",
                    "aria-label": "Route to Asset"
                  }, {
                    default: fe(() => [...B[11] || (B[11] = [
                      Te(" mdi-clock-time-four-outline ", -1)
                    ])]),
                    _: 1
                  }),
                  c.value >= 60 ? (pe(), we("span", Er, $e(Math.trunc(c.value / 60)) + ":" + $e((c.value % 60).toString().padStart(2, "0")) + " minutes (" + $e(e.value.toFixed(0)) + " meters) ", 1)) : (pe(), we("span", Ir, $e(c.value) + " seconds (" + $e(e.value.toFixed(0)) + " meters) ", 1))
                ])) : _e("", !0),
                de(y) ? (pe(), Me(vr, {
                  key: 6,
                  spec: n.spec
                }, null, 8, ["spec"])) : _e("", !0)
              ])) : _e("", !0),
              De("div", jr, [
                C.value.mode === "standard" ? (pe(), we("div", Pr, [
                  (pe(!0), we(Fe, null, Dt(G.value, (a) => (pe(), we(Fe, {
                    key: a.code
                  }, [
                    a && V(a) && a.code !== "admin" && a.title !== "Devices" && a.code !== "devices" ? (pe(), Me(o, {
                      key: 0,
                      to: `/${a.code}`,
                      class: zt(["vxg-router-link", a.klass])
                    }, {
                      default: fe(() => [
                        B[8] || (Ue(-1, !0), (B[8] = le(Pe, null, {
                          default: fe(() => [
                            Te("mdi-" + $e(a.icon), 1)
                          ]),
                          _: 2
                        }, 1024)).cacheIndex = 8, Ue(1), B[8]),
                        Te(" " + $e(a.title), 1)
                      ]),
                      _: 2
                    }, 1032, ["to", "class"])) : _e("", !0)
                  ], 64))), 128))
                ])) : C.value.mode === "custom" ? (pe(), Me(Ft(C.value.cmp), {
                  key: 1,
                  spec: C.value.view.spec
                }, null, 8, ["spec"])) : _e("", !0)
              ]),
              le(Vt),
              le(Ye, { style: { "margin-top": "65px" } }),
              n.spec.footer.active ? (pe(), Me(Ft(n.spec.footer.cmp), {
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
}), Nr = { class: "head-navigation" }, Ar = /* @__PURE__ */ Ve({
  __name: "HeadNavigation",
  props: {
    drawerOpen: { type: Boolean, default: !1 },
    detailOpen: { type: Boolean, default: !1 },
    showExpandSide: { type: Boolean, default: !1 },
    showExpandMain: { type: Boolean, default: !1 }
  },
  emits: ["toggle-drawer", "toggle-detail"],
  setup(n, { emit: u }) {
    const l = u, s = () => {
      l("toggle-drawer");
    }, m = () => {
      l("toggle-detail");
    };
    return (r, d) => (pe(), we("div", Nr, [
      n.showExpandSide && !n.drawerOpen ? (pe(), we(Fe, { key: 0 }, [
        le(Pe, {
          large: "",
          onClick: s,
          style: { display: "inline-block" },
          light: ""
        }, {
          default: fe(() => [...d[0] || (d[0] = [
            Te(" mdi-chevron-right ", -1)
          ])]),
          _: 1
        }),
        le(Ye, {
          vertical: "",
          style: { margin: "0px 16px" }
        })
      ], 64)) : _e("", !0),
      n.showExpandMain && !n.detailOpen ? (pe(), we(Fe, { key: 1 }, [
        le(Ye, {
          vertical: "",
          style: { margin: "0px 16px" }
        }),
        le(Pe, {
          large: "",
          onClick: m,
          style: { display: "inline-block" },
          light: ""
        }, {
          default: fe(() => [...d[1] || (d[1] = [
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
    const l = n, s = u, m = ke(), r = ue(() => l.itemName === "Asset" ? "Fixed Asset" : l.itemName), d = (g) => {
      s("update:modelValue", g);
    }, $ = () => {
      s("add");
    }, y = () => {
      s("remove");
    };
    return (g, h) => (pe(), we("div", Dr, [
      n.showSelect ? (pe(), Me(Wt, {
        key: 0,
        style: { "max-width": "20%", display: "inline-block", "margin-left": "10px" },
        items: n.selectItems,
        ref_key: "selectRef",
        ref: m,
        label: n.selectLabel,
        "model-value": n.modelValue,
        "onUpdate:modelValue": d,
        tile: "",
        outlined: "",
        "hide-details": "",
        dense: ""
      }, null, 8, ["items", "label", "model-value"])) : _e("", !0),
      n.showAdd ? (pe(), we(Fe, { key: 1 }, [
        le(He, {
          class: "vxg-head-btn",
          onClick: $
        }, {
          default: fe(() => [
            le(Pe, { start: "" }, {
              default: fe(() => [...h[0] || (h[0] = [
                Te(" mdi-map-marker-path ", -1)
              ])]),
              _: 1
            }),
            Te(" Add " + $e(r.value), 1)
          ]),
          _: 1
        }),
        le(Ye, {
          vertical: "",
          class: "mx-4"
        })
      ], 64)) : _e("", !0),
      n.showRemove ? (pe(), we(Fe, { key: 2 }, [
        le(He, {
          class: "vxg-head-btn",
          onClick: y
        }, {
          default: fe(() => [
            le(Pe, { start: "" }, {
              default: fe(() => [...h[1] || (h[1] = [
                Te(" mdi-map-marker-path ", -1)
              ])]),
              _: 1
            }),
            Te(" Remove " + $e(n.itemName), 1)
          ]),
          _: 1
        }),
        le(Ye, {
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
    customFilter: { type: Function, default: (n, u, l) => {
      if (!u) return !0;
      const s = u.toLowerCase();
      return (n || "").toLowerCase().includes(s);
    } }
  },
  emits: ["update:modelValue", "keydown", "clear", "change", "filter"],
  setup(n, { expose: u, emit: l }) {
    const s = l, m = ke(null), r = (re) => {
      s("update:modelValue", re);
    }, d = (re) => {
      s("keydown", re);
    }, $ = () => {
      s("clear");
    }, y = (re) => {
      s("change", re);
    }, g = () => {
      s("filter");
    };
    return u({
      reset: () => {
        m.value && m.value.reset();
      },
      blur: () => {
        m.value && m.value.blur && m.value.blur();
      },
      closeMenu: () => {
        m.value && (m.value.isMenuActive = !1);
      }
    }), (re, he) => (pe(), Me(At, {
      ref_key: "searchRef",
      ref: m,
      "model-value": n.modelValue,
      "onUpdate:modelValue": r,
      onKeydown: d,
      "onClick:clear": $,
      onChange: y,
      items: n.items,
      flat: "",
      "hide-details": "",
      outlined: "",
      dense: "",
      clearable: "",
      placeholder: n.placeholder,
      "append-icon": null,
      "onClick:append": g,
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
    const l = u, s = () => {
      l("click");
    };
    return (m, r) => n.show ? (pe(), Me(Pe, {
      key: 0,
      large: "",
      onClick: s,
      style: { display: "inline-block" },
      light: ""
    }, {
      default: fe(() => [...r[0] || (r[0] = [
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
    const l = n, s = u, m = ue(() => l.bookmarkActive ? "HIDE TAGS" : "SHOW TAGS"), r = () => {
      s("print");
    }, d = () => {
      s("bookmark");
    }, $ = () => {
      s("collect");
    };
    return (y, g) => (pe(), we("div", Ur, [
      n.showPrint ? (pe(), we(Fe, { key: 0 }, [
        le(Ye, { vertical: "" }),
        g[0] || (Ue(-1, !0), (g[0] = le(Pt, { bottom: "" }, {
          activator: fe(({ on: h, attrs: ae }) => [
            le(He, It(ae, jt(h), {
              large: "",
              elevation: "0",
              class: "pa-1 ma-1",
              color: "white",
              style: { height: "55px" },
              disabled: n.printDisabled,
              onClick: r
            }), {
              default: fe(() => [
                le(Pe, {
                  large: "",
                  class: "vxg-icon"
                }, {
                  default: fe(() => [...g[3] || (g[3] = [
                    Te("mdi-printer", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            }, 16, ["disabled"])
          ]),
          default: fe(() => [
            g[4] || (g[4] = De("span", null, "PRINT", -1))
          ]),
          _: 1
        })).cacheIndex = 0, Ue(1), g[0]),
        le(Ye, { vertical: "" })
      ], 64)) : _e("", !0),
      n.showBookmark ? (pe(), we(Fe, { key: 1 }, [
        g[1] || (Ue(-1, !0), (g[1] = le(Pt, { bottom: "" }, {
          activator: fe(({ on: h, attrs: ae }) => [
            le(He, It(ae, jt(h), {
              large: "",
              elevation: "0",
              class: "pa-1 ma-1",
              color: "white",
              style: { height: "55px" },
              disabled: !n.bookmarkVisible,
              onClick: d
            }), {
              default: fe(() => [
                le(Pe, {
                  large: "",
                  class: "vxg-icon"
                }, {
                  default: fe(() => [...g[5] || (g[5] = [
                    Te("mdi-bookmark-minus-outline", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            }, 16, ["disabled"])
          ]),
          default: fe(() => [
            De("span", null, $e(m.value), 1)
          ]),
          _: 1
        })).cacheIndex = 1, Ue(1), g[1]),
        le(Ye, { vertical: "" })
      ], 64)) : _e("", !0),
      n.showCollect ? (pe(), we(Fe, { key: 2 }, [
        g[2] || (Ue(-1, !0), (g[2] = le(Pt, { bottom: "" }, {
          activator: fe(({ on: h, attrs: ae }) => [
            le(He, It(ae, jt(h), {
              large: "",
              elevation: "0",
              class: "pa-1 ma-1",
              color: "white",
              style: { height: "55px" },
              onClick: $
            }), {
              default: fe(() => [
                le(Pe, {
                  large: "",
                  class: "vxg-icon"
                }, {
                  default: fe(() => [...g[6] || (g[6] = [
                    Te("mdi-folder-open-outline", -1)
                  ])]),
                  _: 1
                })
              ]),
              _: 1
            }, 16)
          ]),
          default: fe(() => [
            g[7] || (g[7] = De("span", null, "ASSET COLLECTION", -1))
          ]),
          _: 1
        })).cacheIndex = 2, Ue(1), g[2]),
        le(Ye, { vertical: "" })
      ], 64)) : _e("", !0)
    ]));
  }
}), zr = /* @__PURE__ */ Re(Hr, [["__scopeId", "data-v-c3919ebe"]]);
function Ke(n) {
  return !n || !n.tag ? null : n.custom12 != null ? `${n.tag}(${n.custom12})` : n.tag;
}
function qr(n, u, l, s, m) {
  const r = ke(""), d = ke([]), $ = ke([]);
  let y = null, g = null;
  const h = ue(() => m?.main?.ux?.custom?.search_config || {}), ae = (F) => {
    const N = F.map((T) => s.post("sys:search, cmd:add", { doc: T }));
    return Promise.all(N).then(() => {
      console.log(`[useHeadSearch] MiniSearch initialized with ${F.length} assets`);
    }).catch((T) => {
      throw console.error("[useHeadSearch] MiniSearch setup error:", T), T;
    });
  }, ie = (F) => new Promise((N, T) => {
    F ? s.post("sys:search, cmd:search", {
      query: F,
      params: h.value
    }).then((_) => {
      const R = _?.data?.hits || [];
      $.value = R.map((C) => Ke(C.doc)).filter((C) => C !== null), console.log(`[useHeadSearch] Search results: ${$.value.length} matches for "${F}"`), N();
    }).catch((_) => {
      console.error("[useHeadSearch] Search error:", _), T(_);
    }) : (d.value && d.value.length > 0 && ($.value = d.value.map(Ke).filter((_) => _ !== null)), N());
  }), re = () => {
    const F = {};
    y = setInterval(() => {
      n.dispatch("vxg_get_assets", F).then(() => {
        d.value = F.assets || [], d.value.length !== 0 && ($.value = d.value.map(Ke).filter((N) => N !== null), ae(d.value).then(() => {
          y && (clearInterval(y), y = null);
        }).catch((N) => {
          console.error("[useHeadSearch] Failed to setup MiniSearch:", N);
        }));
      }).catch((N) => {
        console.error("[useHeadSearch] Asset loading error:", N);
      });
    }, 111);
  }, he = (F, N, T) => {
    if (!N) return !0;
    const _ = N.toLowerCase();
    return (F || "").toLowerCase().includes(_);
  }, se = (F) => {
    g && clearTimeout(g), g = setTimeout(() => {
      const T = F.target?.value || null;
      console.log("[useHeadSearch] Search term:", T), n.state.trigger.search.term = T || "", n.state.trigger.search.a = T || "", ie(T || "").then(() => {
        const _ = l.query.mode;
        _ === "assetsearch" || _ === "filtersearch" || _ === "route" || (T ? u.push({
          path: l.path,
          query: {
            mode: "headsearch",
            term: T
          }
        }).catch((R) => {
          R.name !== "NavigationDuplicated" && console.error("[useHeadSearch] Router navigation error:", R);
        }) : u.push({
          path: l.path,
          query: {}
        }).catch((R) => {
          R.name !== "NavigationDuplicated" && console.error("[useHeadSearch] Router navigation error:", R);
        }));
      }).catch((_) => {
        console.error("[useHeadSearch] Search handling error:", _);
      });
    }, 11);
  }, Z = (F) => {
    console.log("[useHeadSearch] Search selected:", F), n.state.trigger.search.term = F || "", n.state.trigger.search.a = F || "";
  };
  Ce(
    () => n.state.trigger?.search?.term,
    (F) => {
      F === "" && d.value.length > 0 && ($.value = d.value.map(Ke).filter((N) => N !== null));
    }
  );
  const q = () => {
    y && (clearInterval(y), y = null), g && (clearTimeout(g), g = null);
  };
  return Qe(() => {
    q();
  }), {
    search: r,
    tagItems: $,
    items: d,
    setupMiniSearch: ae,
    performSearch: ie,
    customFilter: he,
    handleSearchChange: se,
    handleSearchSelect: Z,
    initializeAssetLoading: re,
    cleanup: q
  };
}
function Gr(n) {
  return {
    addItem: () => {
      n.dispatch("trigger_led_add").catch((ie) => {
        console.error("[useHeadActions] Add item error:", ie);
      });
    },
    addMobileAsset: () => {
      n.dispatch("trigger_led_add_mobile").catch((ie) => {
        console.error("[useHeadActions] Add mobile asset error:", ie);
      });
    },
    removeItem: () => {
      n.dispatch("trigger_led_remove").catch((ie) => {
        console.error("[useHeadActions] Remove item error:", ie);
      });
    },
    print: () => {
      n.dispatch("vxg_trigger_printMap").catch((ie) => {
        console.error("[useHeadActions] Print error:", ie);
      });
    },
    collect: () => {
      n.dispatch("vxg_trigger_collect").catch((ie) => {
        console.error("[useHeadActions] Collect error:", ie);
      });
    },
    showTags: () => {
      n.dispatch("adjust_trigger_bookmark").catch((ie) => {
        console.error("[useHeadActions] Show tags error:", ie);
      });
    },
    filterAssets: () => {
      n.dispatch("vxg_trigger_go").catch((ie) => {
        console.error("[useHeadActions] Filter assets error:", ie);
      });
    },
    clearFilter: () => {
      n.dispatch("vxg_trigger_clear").catch((ie) => {
        console.error("[useHeadActions] Clear filter error:", ie);
      });
    },
    toggleFilter: () => {
      n.dispatch("trigger_toggle_filter").catch((ie) => {
        console.error("[useHeadActions] Toggle filter error:", ie);
      });
    },
    openDrawer: () => {
      n.dispatch("set_cmp_flags", {
        name: "BasicSide",
        flags: { show: !0 }
      });
    },
    closeDetail: () => {
      n.dispatch("set_cmp_flags", {
        name: "BasicMain",
        flags: { show: !1 }
      });
    }
  };
}
function Jr(n) {
  const u = (y) => {
    const g = n.state.vxg?.cmp?.BasicHead?.allow?.[y];
    return g ?? !0;
  }, l = (y) => u(y) && (n.state.vxg?.cmp?.BasicHead?.show?.[y] || !1), s = ue(() => n.state.trigger?.filter_disabled?.value || !1), m = ue(() => n.state.vxg?.cmp?.BasicHead?.show?.filter || !1), r = ue(() => n.state.trigger?.bookmark?.visible || !1), d = ue(() => n.state.trigger?.bookmark?.value || !1), $ = ue(() => !1);
  return {
    allow: u,
    show: l,
    filterDisabled: s,
    filterIcon: m,
    bookmarkVisible: r,
    bookmarkActive: d,
    printDisabled: $
  };
}
function Wr(n) {
  const u = ue(() => n.state.vxg?.cmp?.BasicSide?.show || !1), l = ue(() => !n.state.vxg?.cmp?.BasicMain?.show);
  return {
    drawerOpen: u,
    detailOpen: l,
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
function Zr(n, u, l, s) {
  const m = ke(""), r = ke({}), d = ue(() => {
    const h = l?.main?.app?.web?.parts?.head?.tool || {};
    return s?.deep(h, r.value) || h;
  }), $ = ue(() => {
    const h = n.state.vxg?.ent?.meta?.name || "Item";
    if (h === "Item") {
      const ae = u.path;
      if (ae.includes("/device"))
        return "Device";
      if (ae.includes("/user"))
        return "User";
    }
    return h;
  }), y = ue(() => {
    const h = [], ae = d.value.select?.items;
    return ae && Object.entries(ae).forEach(([ie, re]) => {
      h.push({
        value: ie,
        text: re.title || ie
      });
    }), h;
  }), g = () => {
    d.value.select?.active && d.value.select?.initial && (m.value = d.value.select.initial);
  };
  return Ce(
    () => u.name,
    (h) => {
      if (h) {
        const ae = l?.main?.app?.web?.view?.[h];
        ae && ae.head ? r.value = ae.head.tool || {} : r.value = {}, g();
      }
    },
    { immediate: !0 }
  ), Ce(m, (h) => {
    n.dispatch("trigger_select", { value: h }).catch((ae) => {
      console.error("[useHeadConfig] Select dispatch error:", ae);
    });
  }), Ce(
    () => n.state.trigger?.select?.value,
    (h) => {
      h !== void 0 && h !== m.value && (m.value = h);
    }
  ), {
    tool: d,
    itemName: $,
    select: m,
    selectItems: y,
    viewTool: r,
    defaults: g
  };
}
const Kr = /* @__PURE__ */ Ve({
  __name: "BasicHead",
  props: {
    logo: { default: "" }
  },
  emits: ["action"],
  setup(n, { emit: u }) {
    const l = u, s = Le(), m = et(), r = qt(), d = un(), $ = d?.proxy?.$seneca, y = d?.proxy?.$model, g = d?.proxy?.$main?.seneca?.util, {
      drawerOpen: h,
      detailOpen: ae,
      openDrawer: ie,
      closeDetail: re
    } = Wr(s), {
      tool: he,
      itemName: se,
      select: Z,
      selectItems: q
    } = Zr(s, r, y, g), {
      search: F,
      tagItems: N,
      items: T,
      customFilter: _,
      handleSearchChange: R,
      handleSearchSelect: C,
      initializeAssetLoading: w,
      cleanup: z
    } = qr(s, m, r, $, y), {
      addItem: J,
      removeItem: I,
      print: v,
      collect: G,
      showTags: O,
      toggleFilter: M
    } = Gr(s), {
      show: b,
      bookmarkVisible: j,
      bookmarkActive: P
    } = Jr(s), c = ke(), e = (A) => {
      const U = {
        target: A.target
      };
      R(U);
    }, t = () => {
      F.value = "", R({
        target: { value: "" }
      });
    }, k = (A) => {
      C(A);
    }, p = () => {
      l("action", "avatar");
    };
    return Ce(
      () => r.name,
      (A) => {
        if (A && (c.value && (c.value.blur(), setTimeout(() => {
          c.value && c.value.closeMenu();
        }, 50)), !(r.query.mode === "assetsearch" || r.name === "admin" && r.query.tab === "assets") && (F.value = "", s.state.trigger.search.term = "", c.value && c.value.reset(), T.value && T.value.length > 0))) {
          const x = (f) => !f || !f.tag ? null : f.custom12 != null ? `${f.tag}(${f.custom12})` : f.tag;
          N.value = T.value.map(x).filter((f) => f !== null);
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
    }), (A, U) => (pe(), Me(wn, {
      app: "",
      class: "vxg-app-bar"
    }, {
      default: fe(() => [
        le(Ut, {
          "drawer-open": de(h),
          "show-expand-side": de(he).expandSide?.active || !1,
          "show-expand-main-false": "",
          onToggleDrawer: de(ie)
        }, null, 8, ["drawer-open", "show-expand-side", "onToggleDrawer"]),
        le(Vr, {
          modelValue: de(Z),
          "onUpdate:modelValue": U[0] || (U[0] = (x) => Xe(Z) ? Z.value = x : null),
          "select-items": de(q),
          "select-label": de(he).select?.title || "",
          "item-name": de(se),
          "show-select": de(b)("select") && (de(he).select?.active || !1),
          "show-add": de(b)("add") && (de(he).add?.active || !1),
          "show-remove": de(b)("remove") && (de(he).remove?.active || !1),
          onAdd: de(J),
          onRemove: de(I)
        }, null, 8, ["modelValue", "select-items", "select-label", "item-name", "show-select", "show-add", "show-remove", "onAdd", "onRemove"]),
        le(Fr, {
          ref_key: "searchRef",
          ref: c,
          modelValue: de(F),
          "onUpdate:modelValue": U[1] || (U[1] = (x) => Xe(F) ? F.value = x : null),
          items: de(N),
          placeholder: "Search",
          "custom-filter": de(_),
          onKeydown: e,
          onClear: t,
          onChange: k,
          onFilter: de(M)
        }, null, 8, ["modelValue", "items", "custom-filter", "onFilter"]),
        de(he).avatar?.active || de(he).expandMain?.active ? (pe(), Me(Vt, { key: 0 })) : _e("", !0),
        le(Yr, {
          show: de(he).avatar?.active || !1,
          onClick: p
        }, null, 8, ["show"]),
        le(Ut, {
          "detail-open": de(ae),
          "show-expand-side-false": "",
          "show-expand-main": de(he).expandMain?.active || !1,
          onToggleDetail: de(re)
        }, null, 8, ["detail-open", "show-expand-main", "onToggleDetail"]),
        le(zr, {
          "show-print": de(b)("print"),
          "show-bookmark": de(b)("bookmark"),
          "show-collect": de(b)("collect"),
          "print-disabled": de(he).print?.disabled || !1,
          "bookmark-visible": de(j),
          "bookmark-active": de(P),
          onPrint: de(v),
          onBookmark: de(O),
          onCollect: de(G)
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
function ts(n, u, l, s, m, r) {
  const d = qe("router-view");
  return pe(), Me(_n, { app: "" }, {
    default: fe(() => [
      le(Jt, {
        fluid: "",
        class: "pa-0"
      }, {
        default: fe(() => [
          le(d, { spec: r.viewSpec }, null, 8, ["spec"])
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
  const n = Le(), u = et(), l = ue(
    () => n.state.auth?.authenticated || !1
  ), s = ue(
    () => n.state.auth?.user || null
  );
  return {
    isAuthenticated: l,
    currentUser: s,
    signin: ($) => n.dispatch("signin_user", $),
    signout: () => n.dispatch("signout_user").then(() => u.push("/login")),
    checkAuth: () => n.dispatch("check_auth")
  };
}
function Os() {
  const n = Le(), u = ue(
    () => n.state.admin?.users || []
  ), l = ue(
    () => n.state.auth?.user?.role === "admin"
  ), s = ue(
    () => n.state.admin?.loading || !1
  );
  return {
    users: u,
    isAdmin: l,
    isLoading: s,
    loadUsers: () => n.dispatch("admin/loadUsers"),
    updateUser: (y, g) => n.dispatch("admin/updateUser", { userId: y, data: g }),
    deleteUser: (y) => n.dispatch("admin/deleteUser", y),
    createUser: (y) => n.dispatch("admin/createUser", y)
  };
}
const Ht = "1.0.0-alpha.1", $s = {
  install(n, u = {}) {
    console.log("[Vxg] Vue 3 plugin installed - v" + Ht);
    const {
      components: l = !0,
      prefix: s = "Vxg",
      store: m = null,
      allow: r = {},
      initialState: d = {},
      ...$
    } = u, y = new In({
      allow: r,
      ...$
    });
    d && Object.assign(y.state, d), m && new jn(y, m).connect(), n.provide("vxg", y), n.provide("$vxg", y), n.config.globalProperties.$vxg = y, l !== !1 && (Promise.resolve().then(() => Qr).then((g) => {
      n.component(`${s}BasicHead`, g.default);
    }), import("./BasicSide-5FnwC7Sc.js").then((g) => {
      n.component(`${s}BasicSide`, g.default);
    }), Promise.resolve().then(() => rs).then((g) => {
      n.component(`${s}BasicMain`, g.default);
    }), import("./BasicNavStages-S_dNz33d.js").then((g) => {
      n.component(`${s}BasicNavStages`, g.default);
    }), import("./NavStagesExpansion-BGKsSEXW.js").then((g) => {
      n.component(`${s}NavStagesExpansion`, g.default);
    }), Promise.resolve().then(() => mr).then((g) => {
      n.component(`${s}NavStageItem`, g.default);
    }), Promise.resolve().then(() => er).then((g) => {
      n.component(`${s}BasicAuth`, g.default);
    }), Promise.resolve().then(() => sr).then((g) => {
      n.component(`${s}BasicAdmin`, g.default);
    }), Promise.resolve().then(() => Zn).then((g) => {
      n.component(`${s}BasicFieldPick`, g.default);
    }), Promise.resolve().then(() => Gn).then((g) => {
      n.component(`${s}BasicFoot`, g.default);
    }), Promise.resolve().then(() => An).then((g) => {
      n.component(`${s}BasicLed`, g.default);
    }), y.registerComponent("BasicHead", "VxgBasicHead"), y.registerComponent("BasicSide", "VxgBasicSide"), y.registerComponent("BasicMain", "VxgBasicMain"), y.registerComponent("BasicNavStages", "VxgBasicNavStages"), y.registerComponent("BasicAuth", "VxgBasicAuth"), y.registerComponent("BasicAdmin", "VxgBasicAdmin"), y.registerComponent("BasicFieldPick", "VxgBasicFieldPick"), y.registerComponent("BasicFoot", "VxgBasicFoot"), y.registerComponent("BasicLed", "VxgBasicLed")), n.config.globalProperties.$vxgVersion = Ht;
  }
};
export {
  rr as BasicAdmin,
  Qn as BasicAuth,
  Wn as BasicFieldPick,
  qn as BasicFoot,
  Xr as BasicHead,
  Nn as BasicLed,
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
  $s as VxgPlugin,
  Ms as createVxgPiniaStore,
  _s as createVxgVuexModule,
  $s as default,
  Os as useAdmin,
  Cs as useAuth,
  Gr as useHeadActions,
  Zr as useHeadConfig,
  Wr as useHeadNavigation,
  Jr as useHeadPermissions,
  qr as useHeadSearch,
  ir as useNavStages,
  ar as useSide,
  or as useSideSearch,
  lr as useStageRouting,
  Ht as version
};
//# sourceMappingURL=vxg.es.js.map
