﻿(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
      for (const r of s) if (r.type === "childList") for (const o of r.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && i(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
      const r = {};
      return (
          s.integrity && (r.integrity = s.integrity),
          s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy),
          s.crossOrigin === "use-credentials" ? (r.credentials = "include") : s.crossOrigin === "anonymous" ? (r.credentials = "omit") : (r.credentials = "same-origin"),
          r
      );
  }
  function i(s) {
      if (s.ep) return;
      s.ep = !0;
      const r = n(s);
      fetch(s.href, r);
  }
})();
function Fo(e, t) {
  const n = new Set(e.split(","));
  return t ? (i) => n.has(i.toLowerCase()) : (i) => n.has(i);
}
const wt = {},
  ri = [],
  _e = () => {},
  W_ = () => !1,
  ir = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  ko = (e) => e.startsWith("onUpdate:"),
  Ht = Object.assign,
  $o = (e, t) => {
      const n = e.indexOf(t);
      n > -1 && e.splice(n, 1);
  },
  X_ = Object.prototype.hasOwnProperty,
  dt = (e, t) => X_.call(e, t),
  nt = Array.isArray,
  Ni = (e) => rr(e) === "[object Map]",
  Z_ = (e) => rr(e) === "[object Set]",
  st = (e) => typeof e == "function",
  Kt = (e) => typeof e == "string",
  sr = (e) => typeof e == "symbol",
  Nt = (e) => e !== null && typeof e == "object",
  lu = (e) => (Nt(e) || st(e)) && st(e.then) && st(e.catch),
  B_ = Object.prototype.toString,
  rr = (e) => B_.call(e),
  q_ = (e) => rr(e).slice(8, -1),
  Q_ = (e) => rr(e) === "[object Object]",
  Vo = (e) => Kt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  $s = Fo(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  or = (e) => {
      const t = Object.create(null);
      return (n) => t[n] || (t[n] = e(n));
  },
  J_ = /-(\w)/g,
  Ne = or((e) => e.replace(J_, (t, n) => (n ? n.toUpperCase() : ""))),
  tp = /\B([A-Z])/g,
  Ti = or((e) => e.replace(tp, "-$1").toLowerCase()),
  ar = or((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Kr = or((e) => (e ? `on${ar(e)}` : "")),
  On = (e, t) => !Object.is(e, t),
  Gr = (e, t) => {
      for (let n = 0; n < e.length; n++) e[n](t);
  },
  Ys = (e, t, n) => {
      Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  ep = (e) => {
      const t = parseFloat(e);
      return isNaN(t) ? e : t;
  };
let Ll;
const cu = () => Ll || (Ll = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function jo(e) {
  if (nt(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
          const i = e[n],
              s = Kt(i) ? rp(i) : jo(i);
          if (s) for (const r in s) t[r] = s[r];
      }
      return t;
  } else if (Kt(e) || Nt(e)) return e;
}
const np = /;(?![^(]*\))/g,
  ip = /:([^]+)/,
  sp = /\/\*[^]*?\*\//g;
function rp(e) {
  const t = {};
  return (
      e
          .replace(sp, "")
          .split(np)
          .forEach((n) => {
              if (n) {
                  const i = n.split(ip);
                  i.length > 1 && (t[i[0].trim()] = i[1].trim());
              }
          }),
      t
  );
}
function en(e) {
  let t = "";
  if (Kt(e)) t = e;
  else if (nt(e))
      for (let n = 0; n < e.length; n++) {
          const i = en(e[n]);
          i && (t += i + " ");
      }
  else if (Nt(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const op = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  ap = Fo(op);
function uu(e) {
  return !!e || e === "";
}
let Ie;
class lp {
  constructor(t = !1) {
      (this.detached = t), (this._active = !0), (this.effects = []), (this.cleanups = []), (this.parent = Ie), !t && Ie && (this.index = (Ie.scopes || (Ie.scopes = [])).push(this) - 1);
  }
  get active() {
      return this._active;
  }
  run(t) {
      if (this._active) {
          const n = Ie;
          try {
              return (Ie = this), t();
          } finally {
              Ie = n;
          }
      }
  }
  on() {
      Ie = this;
  }
  off() {
      Ie = this.parent;
  }
  stop(t) {
      if (this._active) {
          let n, i;
          for (n = 0, i = this.effects.length; n < i; n++) this.effects[n].stop();
          for (n = 0, i = this.cleanups.length; n < i; n++) this.cleanups[n]();
          if (this.scopes) for (n = 0, i = this.scopes.length; n < i; n++) this.scopes[n].stop(!0);
          if (!this.detached && this.parent && !t) {
              const s = this.parent.scopes.pop();
              s && s !== this && ((this.parent.scopes[this.index] = s), (s.index = this.index));
          }
          (this.parent = void 0), (this._active = !1);
      }
  }
}
function cp(e, t = Ie) {
  t && t.active && t.effects.push(e);
}
let wn;
class Ko {
  constructor(t, n, i, s) {
      (this.fn = t), (this.trigger = n), (this.scheduler = i), (this.active = !0), (this.deps = []), (this._dirtyLevel = 3), (this._trackId = 0), (this._runnings = 0), (this._queryings = 0), (this._depsLength = 0), cp(this, s);
  }
  get dirty() {
      if (this._dirtyLevel === 1) {
          (this._dirtyLevel = 0), this._queryings++, Mn();
          for (const t of this.deps) if (t.computed && (up(t.computed), this._dirtyLevel >= 2)) break;
          Nn(), this._queryings--;
      }
      return this._dirtyLevel >= 2;
  }
  set dirty(t) {
      this._dirtyLevel = t ? 3 : 0;
  }
  run() {
      if (((this._dirtyLevel = 0), !this.active)) return this.fn();
      let t = sn,
          n = wn;
      try {
          return (sn = !0), (wn = this), this._runnings++, Pl(this), this.fn();
      } finally {
          Ml(this), this._runnings--, (wn = n), (sn = t);
      }
  }
  stop() {
      var t;
      this.active && (Pl(this), Ml(this), (t = this.onStop) == null || t.call(this), (this.active = !1));
  }
}
function up(e) {
  return e.value;
}
function Pl(e) {
  e._trackId++, (e._depsLength = 0);
}
function Ml(e) {
  if (e.deps && e.deps.length > e._depsLength) {
      for (let t = e._depsLength; t < e.deps.length; t++) hu(e.deps[t], e);
      e.deps.length = e._depsLength;
  }
}
function hu(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let sn = !0,
  ao = 0;
const du = [];
function Mn() {
  du.push(sn), (sn = !1);
}
function Nn() {
  const e = du.pop();
  sn = e === void 0 ? !0 : e;
}
function Go() {
  ao++;
}
function Uo() {
  for (ao--; !ao && lo.length; ) lo.shift()();
}
function fu(e, t, n) {
  if (t.get(e) !== e._trackId) {
      t.set(e, e._trackId);
      const i = e.deps[e._depsLength];
      i !== t ? (i && hu(i, e), (e.deps[e._depsLength++] = t)) : e._depsLength++;
  }
}
const lo = [];
function gu(e, t, n) {
  Go();
  for (const i of e.keys())
      if (!(!i.allowRecurse && i._runnings) && i._dirtyLevel < t && (!i._runnings || t !== 2)) {
          const s = i._dirtyLevel;
          (i._dirtyLevel = t), s === 0 && (!i._queryings || t !== 2) && (i.trigger(), i.scheduler && lo.push(i.scheduler));
      }
  Uo();
}
const _u = (e, t) => {
      const n = new Map();
      return (n.cleanup = e), (n.computed = t), n;
  },
  co = new WeakMap(),
  An = Symbol(""),
  uo = Symbol("");
function ee(e, t, n) {
  if (sn && wn) {
      let i = co.get(e);
      i || co.set(e, (i = new Map()));
      let s = i.get(n);
      s || i.set(n, (s = _u(() => i.delete(n)))), fu(wn, s);
  }
}
function Ke(e, t, n, i, s, r) {
  const o = co.get(e);
  if (!o) return;
  let a = [];
  if (t === "clear") a = [...o.values()];
  else if (n === "length" && nt(e)) {
      const c = Number(i);
      o.forEach((u, h) => {
          (h === "length" || (!sr(h) && h >= c)) && a.push(u);
      });
  } else
      switch ((n !== void 0 && a.push(o.get(n)), t)) {
          case "add":
              nt(e) ? Vo(n) && a.push(o.get("length")) : (a.push(o.get(An)), Ni(e) && a.push(o.get(uo)));
              break;
          case "delete":
              nt(e) || (a.push(o.get(An)), Ni(e) && a.push(o.get(uo)));
              break;
          case "set":
              Ni(e) && a.push(o.get(An));
              break;
      }
  Go();
  for (const c of a) c && gu(c, 3);
  Uo();
}
const hp = Fo("__proto__,__v_isRef,__isVue"),
  pu = new Set(
      Object.getOwnPropertyNames(Symbol)
          .filter((e) => e !== "arguments" && e !== "caller")
          .map((e) => Symbol[e])
          .filter(sr)
  ),
  Nl = dp();
function dp() {
  const e = {};
  return (
      ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
          e[t] = function (...n) {
              const i = pt(this);
              for (let r = 0, o = this.length; r < o; r++) ee(i, "get", r + "");
              const s = i[t](...n);
              return s === -1 || s === !1 ? i[t](...n.map(pt)) : s;
          };
      }),
      ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
          e[t] = function (...n) {
              Mn(), Go();
              const i = pt(this)[t].apply(this, n);
              return Uo(), Nn(), i;
          };
      }),
      e
  );
}
function fp(e) {
  const t = pt(this);
  return ee(t, "has", e), t.hasOwnProperty(e);
}
class mu {
  constructor(t = !1, n = !1) {
      (this._isReadonly = t), (this._shallow = n);
  }
  get(t, n, i) {
      const s = this._isReadonly,
          r = this._shallow;
      if (n === "__v_isReactive") return !s;
      if (n === "__v_isReadonly") return s;
      if (n === "__v_isShallow") return r;
      if (n === "__v_raw") return i === (s ? (r ? Rp : Tu) : r ? vu : yu).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(i) ? t : void 0;
      const o = nt(t);
      if (!s) {
          if (o && dt(Nl, n)) return Reflect.get(Nl, n, i);
          if (n === "hasOwnProperty") return fp;
      }
      const a = Reflect.get(t, n, i);
      return (sr(n) ? pu.has(n) : hp(n)) || (s || ee(t, "get", n), r) ? a : ne(a) ? (o && Vo(n) ? a : a.value) : Nt(a) ? (s ? bu(a) : Ho(a)) : a;
  }
}
class Eu extends mu {
  constructor(t = !1) {
      super(!1, t);
  }
  set(t, n, i, s) {
      let r = t[n];
      if (!this._shallow) {
          const c = ji(r);
          if ((!ho(i) && !ji(i) && ((r = pt(r)), (i = pt(i))), !nt(t) && ne(r) && !ne(i))) return c ? !1 : ((r.value = i), !0);
      }
      const o = nt(t) && Vo(n) ? Number(n) < t.length : dt(t, n),
          a = Reflect.set(t, n, i, s);
      return t === pt(s) && (o ? On(i, r) && Ke(t, "set", n, i) : Ke(t, "add", n, i)), a;
  }
  deleteProperty(t, n) {
      const i = dt(t, n);
      t[n];
      const s = Reflect.deleteProperty(t, n);
      return s && i && Ke(t, "delete", n, void 0), s;
  }
  has(t, n) {
      const i = Reflect.has(t, n);
      return (!sr(n) || !pu.has(n)) && ee(t, "has", n), i;
  }
  ownKeys(t) {
      return ee(t, "iterate", nt(t) ? "length" : An), Reflect.ownKeys(t);
  }
}
class gp extends mu {
  constructor(t = !1) {
      super(!0, t);
  }
  set(t, n) {
      return !0;
  }
  deleteProperty(t, n) {
      return !0;
  }
}
const _p = new Eu(),
  pp = new gp(),
  mp = new Eu(!0),
  zo = (e) => e,
  lr = (e) => Reflect.getPrototypeOf(e);
function Ts(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const s = pt(e),
      r = pt(t);
  n || (On(t, r) && ee(s, "get", t), ee(s, "get", r));
  const { has: o } = lr(s),
      a = i ? zo : n ? Zo : Xo;
  if (o.call(s, t)) return a(e.get(t));
  if (o.call(s, r)) return a(e.get(r));
  e !== s && e.get(t);
}
function bs(e, t = !1) {
  const n = this.__v_raw,
      i = pt(n),
      s = pt(e);
  return t || (On(e, s) && ee(i, "has", e), ee(i, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function Cs(e, t = !1) {
  return (e = e.__v_raw), !t && ee(pt(e), "iterate", An), Reflect.get(e, "size", e);
}
function Dl(e) {
  e = pt(e);
  const t = pt(this);
  return lr(t).has.call(t, e) || (t.add(e), Ke(t, "add", e, e)), this;
}
function Fl(e, t) {
  t = pt(t);
  const n = pt(this),
      { has: i, get: s } = lr(n);
  let r = i.call(n, e);
  r || ((e = pt(e)), (r = i.call(n, e)));
  const o = s.call(n, e);
  return n.set(e, t), r ? On(t, o) && Ke(n, "set", e, t) : Ke(n, "add", e, t), this;
}
function kl(e) {
  const t = pt(this),
      { has: n, get: i } = lr(t);
  let s = n.call(t, e);
  s || ((e = pt(e)), (s = n.call(t, e))), i && i.call(t, e);
  const r = t.delete(e);
  return s && Ke(t, "delete", e, void 0), r;
}
function $l() {
  const e = pt(this),
      t = e.size !== 0,
      n = e.clear();
  return t && Ke(e, "clear", void 0, void 0), n;
}
function ws(e, t) {
  return function (i, s) {
      const r = this,
          o = r.__v_raw,
          a = pt(o),
          c = t ? zo : e ? Zo : Xo;
      return !e && ee(a, "iterate", An), o.forEach((u, h) => i.call(s, c(u), c(h), r));
  };
}
function As(e, t, n) {
  return function (...i) {
      const s = this.__v_raw,
          r = pt(s),
          o = Ni(r),
          a = e === "entries" || (e === Symbol.iterator && o),
          c = e === "keys" && o,
          u = s[e](...i),
          h = n ? zo : t ? Zo : Xo;
      return (
          !t && ee(r, "iterate", c ? uo : An),
          {
              next() {
                  const { value: f, done: g } = u.next();
                  return g ? { value: f, done: g } : { value: a ? [h(f[0]), h(f[1])] : h(f), done: g };
              },
              [Symbol.iterator]() {
                  return this;
              },
          }
      );
  };
}
function Xe(e) {
  return function (...t) {
      return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ep() {
  const e = {
          get(r) {
              return Ts(this, r);
          },
          get size() {
              return Cs(this);
          },
          has: bs,
          add: Dl,
          set: Fl,
          delete: kl,
          clear: $l,
          forEach: ws(!1, !1),
      },
      t = {
          get(r) {
              return Ts(this, r, !1, !0);
          },
          get size() {
              return Cs(this);
          },
          has: bs,
          add: Dl,
          set: Fl,
          delete: kl,
          clear: $l,
          forEach: ws(!1, !0),
      },
      n = {
          get(r) {
              return Ts(this, r, !0);
          },
          get size() {
              return Cs(this, !0);
          },
          has(r) {
              return bs.call(this, r, !0);
          },
          add: Xe("add"),
          set: Xe("set"),
          delete: Xe("delete"),
          clear: Xe("clear"),
          forEach: ws(!0, !1),
      },
      i = {
          get(r) {
              return Ts(this, r, !0, !0);
          },
          get size() {
              return Cs(this, !0);
          },
          has(r) {
              return bs.call(this, r, !0);
          },
          add: Xe("add"),
          set: Xe("set"),
          delete: Xe("delete"),
          clear: Xe("clear"),
          forEach: ws(!0, !0),
      };
  return (
      ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
          (e[r] = As(r, !1, !1)), (n[r] = As(r, !0, !1)), (t[r] = As(r, !1, !0)), (i[r] = As(r, !0, !0));
      }),
      [e, n, t, i]
  );
}
const [yp, vp, Tp, bp] = Ep();
function Yo(e, t) {
  const n = t ? (e ? bp : Tp) : e ? vp : yp;
  return (i, s, r) => (s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? i : Reflect.get(dt(n, s) && s in i ? n : i, s, r));
}
const Cp = { get: Yo(!1, !1) },
  wp = { get: Yo(!1, !0) },
  Ap = { get: Yo(!0, !1) },
  yu = new WeakMap(),
  vu = new WeakMap(),
  Tu = new WeakMap(),
  Rp = new WeakMap();
function Ip(e) {
  switch (e) {
      case "Object":
      case "Array":
          return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
          return 2;
      default:
          return 0;
  }
}
function xp(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ip(q_(e));
}
function Ho(e) {
  return ji(e) ? e : Wo(e, !1, _p, Cp, yu);
}
function Op(e) {
  return Wo(e, !1, mp, wp, vu);
}
function bu(e) {
  return Wo(e, !0, pp, Ap, Tu);
}
function Wo(e, t, n, i, s) {
  if (!Nt(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const r = s.get(e);
  if (r) return r;
  const o = xp(e);
  if (o === 0) return e;
  const a = new Proxy(e, o === 2 ? i : n);
  return s.set(e, a), a;
}
function oi(e) {
  return ji(e) ? oi(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ji(e) {
  return !!(e && e.__v_isReadonly);
}
function ho(e) {
  return !!(e && e.__v_isShallow);
}
function Cu(e) {
  return oi(e) || ji(e);
}
function pt(e) {
  const t = e && e.__v_raw;
  return t ? pt(t) : e;
}
function wu(e) {
  return Ys(e, "__v_skip", !0), e;
}
const Xo = (e) => (Nt(e) ? Ho(e) : e),
  Zo = (e) => (Nt(e) ? bu(e) : e);
class Au {
  constructor(t, n, i, s) {
      (this._setter = n),
          (this.dep = void 0),
          (this.__v_isRef = !0),
          (this.__v_isReadonly = !1),
          (this.effect = new Ko(
              () => t(this._value),
              () => Vl(this, 1)
          )),
          (this.effect.computed = this),
          (this.effect.active = this._cacheable = !s),
          (this.__v_isReadonly = i);
  }
  get value() {
      const t = pt(this);
      return Lp(t), (!t._cacheable || t.effect.dirty) && On(t._value, (t._value = t.effect.run())) && Vl(t, 2), t._value;
  }
  set value(t) {
      this._setter(t);
  }
  get _dirty() {
      return this.effect.dirty;
  }
  set _dirty(t) {
      this.effect.dirty = t;
  }
}
function Sp(e, t, n = !1) {
  let i, s;
  const r = st(e);
  return r ? ((i = e), (s = _e)) : ((i = e.get), (s = e.set)), new Au(i, s, r || !s, n);
}
function Lp(e) {
  sn && wn && ((e = pt(e)), fu(wn, e.dep || (e.dep = _u(() => (e.dep = void 0), e instanceof Au ? e : void 0))));
}
function Vl(e, t = 3, n) {
  e = pt(e);
  const i = e.dep;
  i && gu(i, t);
}
function ne(e) {
  return !!(e && e.__v_isRef === !0);
}
function Pp(e) {
  return ne(e) ? e.value : e;
}
const Mp = {
  get: (e, t, n) => Pp(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
      const s = e[t];
      return ne(s) && !ne(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, i);
  },
};
function Ru(e) {
  return oi(e) ? e : new Proxy(e, Mp);
}
function rn(e, t, n, i) {
  let s;
  try {
      s = i ? e(...i) : e();
  } catch (r) {
      cr(r, t, n);
  }
  return s;
}
function be(e, t, n, i) {
  if (st(e)) {
      const r = rn(e, t, n, i);
      return (
          r &&
              lu(r) &&
              r.catch((o) => {
                  cr(o, t, n);
              }),
          r
      );
  }
  const s = [];
  for (let r = 0; r < e.length; r++) s.push(be(e[r], t, n, i));
  return s;
}
function cr(e, t, n, i = !0) {
  const s = t ? t.vnode : null;
  if (t) {
      let r = t.parent;
      const o = t.proxy,
          a = `https://vuejs.org/errors/#runtime-${n}`;
      for (; r; ) {
          const u = r.ec;
          if (u) {
              for (let h = 0; h < u.length; h++) if (u[h](e, o, a) === !1) return;
          }
          r = r.parent;
      }
      const c = t.appContext.config.errorHandler;
      if (c) {
          rn(c, null, 10, [e, o, a]);
          return;
      }
  }
  Np(e, n, s, i);
}
function Np(e, t, n, i = !0) {
  console.error(e);
}
let Ki = !1,
  fo = !1;
const zt = [];
let Le = 0;
const ai = [];
let Ve = null,
  bn = 0;
const Iu = Promise.resolve();
let Bo = null;
function Dp(e) {
  const t = Bo || Iu;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Fp(e) {
  let t = Le + 1,
      n = zt.length;
  for (; t < n; ) {
      const i = (t + n) >>> 1,
          s = zt[i],
          r = Gi(s);
      r < e || (r === e && s.pre) ? (t = i + 1) : (n = i);
  }
  return t;
}
function qo(e) {
  (!zt.length || !zt.includes(e, Ki && e.allowRecurse ? Le + 1 : Le)) && (e.id == null ? zt.push(e) : zt.splice(Fp(e.id), 0, e), xu());
}
function xu() {
  !Ki && !fo && ((fo = !0), (Bo = Iu.then(Su)));
}
function kp(e) {
  const t = zt.indexOf(e);
  t > Le && zt.splice(t, 1);
}
function $p(e) {
  nt(e) ? ai.push(...e) : (!Ve || !Ve.includes(e, e.allowRecurse ? bn + 1 : bn)) && ai.push(e), xu();
}
function jl(e, t, n = Ki ? Le + 1 : 0) {
  for (; n < zt.length; n++) {
      const i = zt[n];
      if (i && i.pre) {
          if (e && i.id !== e.uid) continue;
          zt.splice(n, 1), n--, i();
      }
  }
}
function Ou(e) {
  if (ai.length) {
      const t = [...new Set(ai)];
      if (((ai.length = 0), Ve)) {
          Ve.push(...t);
          return;
      }
      for (Ve = t, Ve.sort((n, i) => Gi(n) - Gi(i)), bn = 0; bn < Ve.length; bn++) Ve[bn]();
      (Ve = null), (bn = 0);
  }
}
const Gi = (e) => (e.id == null ? 1 / 0 : e.id),
  Vp = (e, t) => {
      const n = Gi(e) - Gi(t);
      if (n === 0) {
          if (e.pre && !t.pre) return -1;
          if (t.pre && !e.pre) return 1;
      }
      return n;
  };
function Su(e) {
  (fo = !1), (Ki = !0), zt.sort(Vp);
  try {
      for (Le = 0; Le < zt.length; Le++) {
          const t = zt[Le];
          t && t.active !== !1 && rn(t, null, 14);
      }
  } finally {
      (Le = 0), (zt.length = 0), Ou(), (Ki = !1), (Bo = null), (zt.length || ai.length) && Su();
  }
}
function jp(e, t, ...n) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || wt;
  let s = n;
  const r = t.startsWith("update:"),
      o = r && t.slice(7);
  if (o && o in i) {
      const h = `${o === "modelValue" ? "model" : o}Modifiers`,
          { number: f, trim: g } = i[h] || wt;
      g && (s = n.map((_) => (Kt(_) ? _.trim() : _))), f && (s = n.map(ep));
  }
  let a,
      c = i[(a = Kr(t))] || i[(a = Kr(Ne(t)))];
  !c && r && (c = i[(a = Kr(Ti(t)))]), c && be(c, e, 6, s);
  const u = i[a + "Once"];
  if (u) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[a]) return;
      (e.emitted[a] = !0), be(u, e, 6, s);
  }
}
function Lu(e, t, n = !1) {
  const i = t.emitsCache,
      s = i.get(e);
  if (s !== void 0) return s;
  const r = e.emits;
  let o = {},
      a = !1;
  if (!st(e)) {
      const c = (u) => {
          const h = Lu(u, t, !0);
          h && ((a = !0), Ht(o, h));
      };
      !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !a ? (Nt(e) && i.set(e, null), null) : (nt(r) ? r.forEach((c) => (o[c] = null)) : Ht(o, r), Nt(e) && i.set(e, o), o);
}
function ur(e, t) {
  return !e || !ir(t) ? !1 : ((t = t.slice(2).replace(/Once$/, "")), dt(e, t[0].toLowerCase() + t.slice(1)) || dt(e, Ti(t)) || dt(e, t));
}
let ve = null,
  hr = null;
function Hs(e) {
  const t = ve;
  return (ve = e), (hr = (e && e.type.__scopeId) || null), t;
}
function Pu(e) {
  hr = e;
}
function Mu() {
  hr = null;
}
function Kp(e, t = ve, n) {
  if (!t || e._n) return e;
  const i = (...s) => {
      i._d && Ql(-1);
      const r = Hs(t);
      let o;
      try {
          o = e(...s);
      } finally {
          Hs(r), i._d && Ql(1);
      }
      return o;
  };
  return (i._n = !0), (i._c = !0), (i._d = !0), i;
}
function Ur(e) {
  const {
      type: t,
      vnode: n,
      proxy: i,
      withProxy: s,
      props: r,
      propsOptions: [o],
      slots: a,
      attrs: c,
      emit: u,
      render: h,
      renderCache: f,
      data: g,
      setupState: _,
      ctx: T,
      inheritAttrs: v,
  } = e;
  let b, x;
  const R = Hs(e);
  try {
      if (n.shapeFlag & 4) {
          const I = s || i,
              w = I;
          (b = Oe(h.call(w, I, f, r, _, g, T))), (x = c);
      } else {
          const I = t;
          (b = Oe(I.length > 1 ? I(r, { attrs: c, slots: a, emit: u }) : I(r, null))), (x = t.props ? c : Gp(c));
      }
  } catch (I) {
      (Fi.length = 0), cr(I, e, 1), (b = Ce(Sn));
  }
  let M = b;
  if (x && v !== !1) {
      const I = Object.keys(x),
          { shapeFlag: w } = M;
      I.length && w & 7 && (o && I.some(ko) && (x = Up(x, o)), (M = di(M, x)));
  }
  return n.dirs && ((M = di(M)), (M.dirs = M.dirs ? M.dirs.concat(n.dirs) : n.dirs)), n.transition && (M.transition = n.transition), (b = M), Hs(R), b;
}
const Gp = (e) => {
      let t;
      for (const n in e) (n === "class" || n === "style" || ir(n)) && ((t || (t = {}))[n] = e[n]);
      return t;
  },
  Up = (e, t) => {
      const n = {};
      for (const i in e) (!ko(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
      return n;
  };
function zp(e, t, n) {
  const { props: i, children: s, component: r } = e,
      { props: o, children: a, patchFlag: c } = t,
      u = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
      if (c & 1024) return !0;
      if (c & 16) return i ? Kl(i, o, u) : !!o;
      if (c & 8) {
          const h = t.dynamicProps;
          for (let f = 0; f < h.length; f++) {
              const g = h[f];
              if (o[g] !== i[g] && !ur(u, g)) return !0;
          }
      }
  } else return (s || a) && (!a || !a.$stable) ? !0 : i === o ? !1 : i ? (o ? Kl(i, o, u) : !0) : !!o;
  return !1;
}
function Kl(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < i.length; s++) {
      const r = i[s];
      if (t[r] !== e[r] && !ur(n, r)) return !0;
  }
  return !1;
}
function Yp({ vnode: e, parent: t }, n) {
  if (n)
      for (; t; ) {
          const i = t.subTree;
          if ((i.suspense && i.suspense.activeBranch === e && (i.el = e.el), i === e)) ((e = t.vnode).el = n), (t = t.parent);
          else break;
      }
}
const Nu = "components";
function Gl(e, t) {
  return Wp(Nu, e, !0, t) || e;
}
const Hp = Symbol.for("v-ndc");
function Wp(e, t, n = !0, i = !1) {
  const s = ve || Yt;
  if (s) {
      const r = s.type;
      if (e === Nu) {
          const a = zm(r, !1);
          if (a && (a === t || a === Ne(t) || a === ar(Ne(t)))) return r;
      }
      const o = Ul(s[e] || r[e], t) || Ul(s.appContext[e], t);
      return !o && i ? r : o;
  }
}
function Ul(e, t) {
  return e && (e[t] || e[Ne(t)] || e[ar(Ne(t))]);
}
const Xp = (e) => e.__isSuspense;
function Zp(e, t) {
  t && t.pendingBranch ? (nt(e) ? t.effects.push(...e) : t.effects.push(e)) : $p(e);
}
const Bp = Symbol.for("v-scx"),
  qp = () => js(Bp),
  Rs = {};
function zr(e, t, n) {
  return Du(e, t, n);
}
function Du(e, t, { immediate: n, deep: i, flush: s, once: r, onTrack: o, onTrigger: a } = wt) {
  if (t && r) {
      const w = t;
      t = (...K) => {
          w(...K), I();
      };
  }
  const c = Yt,
      u = (w) => (i === !0 ? w : ni(w, i === !1 ? 1 : void 0));
  let h,
      f = !1,
      g = !1;
  if (
      (ne(e)
          ? ((h = () => e.value), (f = ho(e)))
          : oi(e)
          ? ((h = () => u(e)), (f = !0))
          : nt(e)
          ? ((g = !0),
            (f = e.some((w) => oi(w) || ho(w))),
            (h = () =>
                e.map((w) => {
                    if (ne(w)) return w.value;
                    if (oi(w)) return u(w);
                    if (st(w)) return rn(w, c, 2);
                })))
          : st(e)
          ? t
              ? (h = () => rn(e, c, 2))
              : (h = () => (_ && _(), be(e, c, 3, [T])))
          : (h = _e),
      t && i)
  ) {
      const w = h;
      h = () => ni(w());
  }
  let _,
      T = (w) => {
          _ = M.onStop = () => {
              rn(w, c, 4), (_ = M.onStop = void 0);
          };
      },
      v;
  if (_r)
      if (((T = _e), t ? n && be(t, c, 3, [h(), g ? [] : void 0, T]) : h(), s === "sync")) {
          const w = qp();
          v = w.__watcherHandles || (w.__watcherHandles = []);
      } else return _e;
  let b = g ? new Array(e.length).fill(Rs) : Rs;
  const x = () => {
      if (!(!M.active || !M.dirty))
          if (t) {
              const w = M.run();
              (i || f || (g ? w.some((K, W) => On(K, b[W])) : On(w, b))) && (_ && _(), be(t, c, 3, [w, b === Rs ? void 0 : g && b[0] === Rs ? [] : b, T]), (b = w));
          } else M.run();
  };
  x.allowRecurse = !!t;
  let R;
  s === "sync" ? (R = x) : s === "post" ? (R = () => Jt(x, c && c.suspense)) : ((x.pre = !0), c && (x.id = c.uid), (R = () => qo(x)));
  const M = new Ko(h, _e, R),
      I = () => {
          M.stop(), c && c.scope && $o(c.scope.effects, M);
      };
  return t ? (n ? x() : (b = M.run())) : s === "post" ? Jt(M.run.bind(M), c && c.suspense) : M.run(), v && v.push(I), I;
}
function Qp(e, t, n) {
  const i = this.proxy,
      s = Kt(e) ? (e.includes(".") ? Fu(i, e) : () => i[e]) : e.bind(i, i);
  let r;
  st(t) ? (r = t) : ((r = t.handler), (n = t));
  const o = Yt;
  fi(this);
  const a = Du(s, r.bind(i), n);
  return o ? fi(o) : Rn(), a;
}
function Fu(e, t) {
  const n = t.split(".");
  return () => {
      let i = e;
      for (let s = 0; s < n.length && i; s++) i = i[n[s]];
      return i;
  };
}
function ni(e, t, n = 0, i) {
  if (!Nt(e) || e.__v_skip) return e;
  if (t && t > 0) {
      if (n >= t) return e;
      n++;
  }
  if (((i = i || new Set()), i.has(e))) return e;
  if ((i.add(e), ne(e))) ni(e.value, t, n, i);
  else if (nt(e)) for (let s = 0; s < e.length; s++) ni(e[s], t, n, i);
  else if (Z_(e) || Ni(e))
      e.forEach((s) => {
          ni(s, t, n, i);
      });
  else if (Q_(e)) for (const s in e) ni(e[s], t, n, i);
  return e;
}
function En(e, t, n, i) {
  const s = e.dirs,
      r = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
      const a = s[o];
      r && (a.oldValue = r[o].value);
      let c = a.dir[i];
      c && (Mn(), be(c, n, 8, [e.el, a, e, t]), Nn());
  }
}
const Vs = (e) => !!e.type.__asyncLoader,
  ku = (e) => e.type.__isKeepAlive;
function Jp(e, t) {
  $u(e, "a", t);
}
function tm(e, t) {
  $u(e, "da", t);
}
function $u(e, t, n = Yt) {
  const i =
      e.__wdc ||
      (e.__wdc = () => {
          let s = n;
          for (; s; ) {
              if (s.isDeactivated) return;
              s = s.parent;
          }
          return e();
      });
  if ((dr(t, i, n), n)) {
      let s = n.parent;
      for (; s && s.parent; ) ku(s.parent.vnode) && em(i, t, n, s), (s = s.parent);
  }
}
function em(e, t, n, i) {
  const s = dr(t, e, i, !0);
  Vu(() => {
      $o(i[t], s);
  }, n);
}
function dr(e, t, n = Yt, i = !1) {
  if (n) {
      const s = n[e] || (n[e] = []),
          r =
              t.__weh ||
              (t.__weh = (...o) => {
                  if (n.isUnmounted) return;
                  Mn(), fi(n);
                  const a = be(t, n, e, o);
                  return Rn(), Nn(), a;
              });
      return i ? s.unshift(r) : s.push(r), r;
  }
}
const Ue = (e) => (t, n = Yt) => (!_r || e === "sp") && dr(e, (...i) => t(...i), n),
  nm = Ue("bm"),
  im = Ue("m"),
  sm = Ue("bu"),
  rm = Ue("u"),
  om = Ue("bum"),
  Vu = Ue("um"),
  am = Ue("sp"),
  lm = Ue("rtg"),
  cm = Ue("rtc");
function um(e, t = Yt) {
  dr("ec", e, t);
}
const go = (e) => (e ? (qu(e) ? na(e) || e.proxy : go(e.parent)) : null),
  Di = Ht(Object.create(null), {
      $: (e) => e,
      $el: (e) => e.vnode.el,
      $data: (e) => e.data,
      $props: (e) => e.props,
      $attrs: (e) => e.attrs,
      $slots: (e) => e.slots,
      $refs: (e) => e.refs,
      $parent: (e) => go(e.parent),
      $root: (e) => go(e.root),
      $emit: (e) => e.emit,
      $options: (e) => Qo(e),
      $forceUpdate: (e) =>
          e.f ||
          (e.f = () => {
              (e.effect.dirty = !0), qo(e.update);
          }),
      $nextTick: (e) => e.n || (e.n = Dp.bind(e.proxy)),
      $watch: (e) => Qp.bind(e),
  }),
  Yr = (e, t) => e !== wt && !e.__isScriptSetup && dt(e, t),
  hm = {
      get({ _: e }, t) {
          const { ctx: n, setupState: i, data: s, props: r, accessCache: o, type: a, appContext: c } = e;
          let u;
          if (t[0] !== "$") {
              const _ = o[t];
              if (_ !== void 0)
                  switch (_) {
                      case 1:
                          return i[t];
                      case 2:
                          return s[t];
                      case 4:
                          return n[t];
                      case 3:
                          return r[t];
                  }
              else {
                  if (Yr(i, t)) return (o[t] = 1), i[t];
                  if (s !== wt && dt(s, t)) return (o[t] = 2), s[t];
                  if ((u = e.propsOptions[0]) && dt(u, t)) return (o[t] = 3), r[t];
                  if (n !== wt && dt(n, t)) return (o[t] = 4), n[t];
                  _o && (o[t] = 0);
              }
          }
          const h = Di[t];
          let f, g;
          if (h) return t === "$attrs" && ee(e, "get", t), h(e);
          if ((f = a.__cssModules) && (f = f[t])) return f;
          if (n !== wt && dt(n, t)) return (o[t] = 4), n[t];
          if (((g = c.config.globalProperties), dt(g, t))) return g[t];
      },
      set({ _: e }, t, n) {
          const { data: i, setupState: s, ctx: r } = e;
          return Yr(s, t) ? ((s[t] = n), !0) : i !== wt && dt(i, t) ? ((i[t] = n), !0) : dt(e.props, t) || (t[0] === "$" && t.slice(1) in e) ? !1 : ((r[t] = n), !0);
      },
      has({ _: { data: e, setupState: t, accessCache: n, ctx: i, appContext: s, propsOptions: r } }, o) {
          let a;
          return !!n[o] || (e !== wt && dt(e, o)) || Yr(t, o) || ((a = r[0]) && dt(a, o)) || dt(i, o) || dt(Di, o) || dt(s.config.globalProperties, o);
      },
      defineProperty(e, t, n) {
          return n.get != null ? (e._.accessCache[t] = 0) : dt(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
      },
  };
function zl(e) {
  return nt(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let _o = !0;
function dm(e) {
  const t = Qo(e),
      n = e.proxy,
      i = e.ctx;
  (_o = !1), t.beforeCreate && Yl(t.beforeCreate, e, "bc");
  const {
      data: s,
      computed: r,
      methods: o,
      watch: a,
      provide: c,
      inject: u,
      created: h,
      beforeMount: f,
      mounted: g,
      beforeUpdate: _,
      updated: T,
      activated: v,
      deactivated: b,
      beforeDestroy: x,
      beforeUnmount: R,
      destroyed: M,
      unmounted: I,
      render: w,
      renderTracked: K,
      renderTriggered: W,
      errorCaptured: q,
      serverPrefetch: X,
      expose: Y,
      inheritAttrs: B,
      components: Et,
      directives: ct,
      filters: xt,
  } = t;
  if ((u && fm(u, i, null), o))
      for (const U in o) {
          const J = o[U];
          st(J) && (i[U] = J.bind(n));
      }
  if (s) {
      const U = s.call(n, n);
      Nt(U) && (e.data = Ho(U));
  }
  if (((_o = !0), r))
      for (const U in r) {
          const J = r[U],
              mt = st(J) ? J.bind(n, n) : st(J.get) ? J.get.bind(n, n) : _e,
              At = !st(J) && st(J.set) ? J.set.bind(n) : _e,
              Pt = Hm({ get: mt, set: At });
          Object.defineProperty(i, U, { enumerable: !0, configurable: !0, get: () => Pt.value, set: (rt) => (Pt.value = rt) });
      }
  if (a) for (const U in a) ju(a[U], i, n, U);
  if (c) {
      const U = st(c) ? c.call(n) : c;
      Reflect.ownKeys(U).forEach((J) => {
          ym(J, U[J]);
      });
  }
  h && Yl(h, e, "c");
  function et(U, J) {
      nt(J) ? J.forEach((mt) => U(mt.bind(n))) : J && U(J.bind(n));
  }
  if ((et(nm, f), et(im, g), et(sm, _), et(rm, T), et(Jp, v), et(tm, b), et(um, q), et(cm, K), et(lm, W), et(om, R), et(Vu, I), et(am, X), nt(Y)))
      if (Y.length) {
          const U = e.exposed || (e.exposed = {});
          Y.forEach((J) => {
              Object.defineProperty(U, J, { get: () => n[J], set: (mt) => (n[J] = mt) });
          });
      } else e.exposed || (e.exposed = {});
  w && e.render === _e && (e.render = w), B != null && (e.inheritAttrs = B), Et && (e.components = Et), ct && (e.directives = ct);
}
function fm(e, t, n = _e) {
  nt(e) && (e = po(e));
  for (const i in e) {
      const s = e[i];
      let r;
      Nt(s) ? ("default" in s ? (r = js(s.from || i, s.default, !0)) : (r = js(s.from || i))) : (r = js(s)),
          ne(r) ? Object.defineProperty(t, i, { enumerable: !0, configurable: !0, get: () => r.value, set: (o) => (r.value = o) }) : (t[i] = r);
  }
}
function Yl(e, t, n) {
  be(nt(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ju(e, t, n, i) {
  const s = i.includes(".") ? Fu(n, i) : () => n[i];
  if (Kt(e)) {
      const r = t[e];
      st(r) && zr(s, r);
  } else if (st(e)) zr(s, e.bind(n));
  else if (Nt(e))
      if (nt(e)) e.forEach((r) => ju(r, t, n, i));
      else {
          const r = st(e.handler) ? e.handler.bind(n) : t[e.handler];
          st(r) && zr(s, r, e);
      }
}
function Qo(e) {
  const t = e.type,
      { mixins: n, extends: i } = t,
      {
          mixins: s,
          optionsCache: r,
          config: { optionMergeStrategies: o },
      } = e.appContext,
      a = r.get(t);
  let c;
  return a ? (c = a) : !s.length && !n && !i ? (c = t) : ((c = {}), s.length && s.forEach((u) => Ws(c, u, o, !0)), Ws(c, t, o)), Nt(t) && r.set(t, c), c;
}
function Ws(e, t, n, i = !1) {
  const { mixins: s, extends: r } = t;
  r && Ws(e, r, n, !0), s && s.forEach((o) => Ws(e, o, n, !0));
  for (const o in t)
      if (!(i && o === "expose")) {
          const a = gm[o] || (n && n[o]);
          e[o] = a ? a(e[o], t[o]) : t[o];
      }
  return e;
}
const gm = {
  data: Hl,
  props: Wl,
  emits: Wl,
  methods: Mi,
  computed: Mi,
  beforeCreate: Xt,
  created: Xt,
  beforeMount: Xt,
  mounted: Xt,
  beforeUpdate: Xt,
  updated: Xt,
  beforeDestroy: Xt,
  beforeUnmount: Xt,
  destroyed: Xt,
  unmounted: Xt,
  activated: Xt,
  deactivated: Xt,
  errorCaptured: Xt,
  serverPrefetch: Xt,
  components: Mi,
  directives: Mi,
  watch: pm,
  provide: Hl,
  inject: _m,
};
function Hl(e, t) {
  return t
      ? e
          ? function () {
                return Ht(st(e) ? e.call(this, this) : e, st(t) ? t.call(this, this) : t);
            }
          : t
      : e;
}
function _m(e, t) {
  return Mi(po(e), po(t));
}
function po(e) {
  if (nt(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
      return t;
  }
  return e;
}
function Xt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Mi(e, t) {
  return e ? Ht(Object.create(null), e, t) : t;
}
function Wl(e, t) {
  return e ? (nt(e) && nt(t) ? [...new Set([...e, ...t])] : Ht(Object.create(null), zl(e), zl(t ?? {}))) : t;
}
function pm(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ht(Object.create(null), e);
  for (const i in t) n[i] = Xt(e[i], t[i]);
  return n;
}
function Ku() {
  return {
      app: null,
      config: { isNativeTag: W_, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap(),
  };
}
let mm = 0;
function Em(e, t) {
  return function (i, s = null) {
      st(i) || (i = Ht({}, i)), s != null && !Nt(s) && (s = null);
      const r = Ku(),
          o = new WeakSet();
      let a = !1;
      const c = (r.app = {
          _uid: mm++,
          _component: i,
          _props: s,
          _container: null,
          _context: r,
          _instance: null,
          version: Wm,
          get config() {
              return r.config;
          },
          set config(u) {},
          use(u, ...h) {
              return o.has(u) || (u && st(u.install) ? (o.add(u), u.install(c, ...h)) : st(u) && (o.add(u), u(c, ...h))), c;
          },
          mixin(u) {
              return r.mixins.includes(u) || r.mixins.push(u), c;
          },
          component(u, h) {
              return h ? ((r.components[u] = h), c) : r.components[u];
          },
          directive(u, h) {
              return h ? ((r.directives[u] = h), c) : r.directives[u];
          },
          mount(u, h, f) {
              if (!a) {
                  const g = Ce(i, s);
                  return (g.appContext = r), f === !0 ? (f = "svg") : f === !1 && (f = void 0), h && t ? t(g, u) : e(g, u, f), (a = !0), (c._container = u), (u.__vue_app__ = c), na(g.component) || g.component.proxy;
              }
          },
          unmount() {
              a && (e(null, c._container), delete c._container.__vue_app__);
          },
          provide(u, h) {
              return (r.provides[u] = h), c;
          },
          runWithContext(u) {
              Xs = c;
              try {
                  return u();
              } finally {
                  Xs = null;
              }
          },
      });
      return c;
  };
}
let Xs = null;
function ym(e, t) {
  if (Yt) {
      let n = Yt.provides;
      const i = Yt.parent && Yt.parent.provides;
      i === n && (n = Yt.provides = Object.create(i)), (n[e] = t);
  }
}
function js(e, t, n = !1) {
  const i = Yt || ve;
  if (i || Xs) {
      const s = i ? (i.parent == null ? i.vnode.appContext && i.vnode.appContext.provides : i.parent.provides) : Xs._context.provides;
      if (s && e in s) return s[e];
      if (arguments.length > 1) return n && st(t) ? t.call(i && i.proxy) : t;
  }
}
function vm(e, t, n, i = !1) {
  const s = {},
      r = {};
  Ys(r, gr, 1), (e.propsDefaults = Object.create(null)), Gu(e, t, s, r);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? (e.props = i ? s : Op(s)) : e.type.props ? (e.props = s) : (e.props = r), (e.attrs = r);
}
function Tm(e, t, n, i) {
  const {
          props: s,
          attrs: r,
          vnode: { patchFlag: o },
      } = e,
      a = pt(s),
      [c] = e.propsOptions;
  let u = !1;
  if ((i || o > 0) && !(o & 16)) {
      if (o & 8) {
          const h = e.vnode.dynamicProps;
          for (let f = 0; f < h.length; f++) {
              let g = h[f];
              if (ur(e.emitsOptions, g)) continue;
              const _ = t[g];
              if (c)
                  if (dt(r, g)) _ !== r[g] && ((r[g] = _), (u = !0));
                  else {
                      const T = Ne(g);
                      s[T] = mo(c, a, T, _, e, !1);
                  }
              else _ !== r[g] && ((r[g] = _), (u = !0));
          }
      }
  } else {
      Gu(e, t, s, r) && (u = !0);
      let h;
      for (const f in a) (!t || (!dt(t, f) && ((h = Ti(f)) === f || !dt(t, h)))) && (c ? n && (n[f] !== void 0 || n[h] !== void 0) && (s[f] = mo(c, a, f, void 0, e, !0)) : delete s[f]);
      if (r !== a) for (const f in r) (!t || !dt(t, f)) && (delete r[f], (u = !0));
  }
  u && Ke(e, "set", "$attrs");
}
function Gu(e, t, n, i) {
  const [s, r] = e.propsOptions;
  let o = !1,
      a;
  if (t)
      for (let c in t) {
          if ($s(c)) continue;
          const u = t[c];
          let h;
          s && dt(s, (h = Ne(c))) ? (!r || !r.includes(h) ? (n[h] = u) : ((a || (a = {}))[h] = u)) : ur(e.emitsOptions, c) || ((!(c in i) || u !== i[c]) && ((i[c] = u), (o = !0)));
      }
  if (r) {
      const c = pt(n),
          u = a || wt;
      for (let h = 0; h < r.length; h++) {
          const f = r[h];
          n[f] = mo(s, c, f, u[f], e, !dt(u, f));
      }
  }
  return o;
}
function mo(e, t, n, i, s, r) {
  const o = e[n];
  if (o != null) {
      const a = dt(o, "default");
      if (a && i === void 0) {
          const c = o.default;
          if (o.type !== Function && !o.skipFactory && st(c)) {
              const { propsDefaults: u } = s;
              n in u ? (i = u[n]) : (fi(s), (i = u[n] = c.call(null, t)), Rn());
          } else i = c;
      }
      o[0] && (r && !a ? (i = !1) : o[1] && (i === "" || i === Ti(n)) && (i = !0));
  }
  return i;
}
function Uu(e, t, n = !1) {
  const i = t.propsCache,
      s = i.get(e);
  if (s) return s;
  const r = e.props,
      o = {},
      a = [];
  let c = !1;
  if (!st(e)) {
      const h = (f) => {
          c = !0;
          const [g, _] = Uu(f, t, !0);
          Ht(o, g), _ && a.push(..._);
      };
      !n && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !c) return Nt(e) && i.set(e, ri), ri;
  if (nt(r))
      for (let h = 0; h < r.length; h++) {
          const f = Ne(r[h]);
          Xl(f) && (o[f] = wt);
      }
  else if (r)
      for (const h in r) {
          const f = Ne(h);
          if (Xl(f)) {
              const g = r[h],
                  _ = (o[f] = nt(g) || st(g) ? { type: g } : Ht({}, g));
              if (_) {
                  const T = ql(Boolean, _.type),
                      v = ql(String, _.type);
                  (_[0] = T > -1), (_[1] = v < 0 || T < v), (T > -1 || dt(_, "default")) && a.push(f);
              }
          }
      }
  const u = [o, a];
  return Nt(e) && i.set(e, u), u;
}
function Xl(e) {
  return e[0] !== "$";
}
function Zl(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Bl(e, t) {
  return Zl(e) === Zl(t);
}
function ql(e, t) {
  return nt(t) ? t.findIndex((n) => Bl(n, e)) : st(t) && Bl(t, e) ? 0 : -1;
}
const zu = (e) => e[0] === "_" || e === "$stable",
  Jo = (e) => (nt(e) ? e.map(Oe) : [Oe(e)]),
  bm = (e, t, n) => {
      if (t._n) return t;
      const i = Kp((...s) => Jo(t(...s)), n);
      return (i._c = !1), i;
  },
  Yu = (e, t, n) => {
      const i = e._ctx;
      for (const s in e) {
          if (zu(s)) continue;
          const r = e[s];
          if (st(r)) t[s] = bm(s, r, i);
          else if (r != null) {
              const o = Jo(r);
              t[s] = () => o;
          }
      }
  },
  Hu = (e, t) => {
      const n = Jo(t);
      e.slots.default = () => n;
  },
  Cm = (e, t) => {
      if (e.vnode.shapeFlag & 32) {
          const n = t._;
          n ? ((e.slots = pt(t)), Ys(t, "_", n)) : Yu(t, (e.slots = {}));
      } else (e.slots = {}), t && Hu(e, t);
      Ys(e.slots, gr, 1);
  },
  wm = (e, t, n) => {
      const { vnode: i, slots: s } = e;
      let r = !0,
          o = wt;
      if (i.shapeFlag & 32) {
          const a = t._;
          a ? (n && a === 1 ? (r = !1) : (Ht(s, t), !n && a === 1 && delete s._)) : ((r = !t.$stable), Yu(t, s)), (o = t);
      } else t && (Hu(e, t), (o = { default: 1 }));
      if (r) for (const a in s) !zu(a) && o[a] == null && delete s[a];
  };
function Eo(e, t, n, i, s = !1) {
  if (nt(e)) {
      e.forEach((g, _) => Eo(g, t && (nt(t) ? t[_] : t), n, i, s));
      return;
  }
  if (Vs(i) && !s) return;
  const r = i.shapeFlag & 4 ? na(i.component) || i.component.proxy : i.el,
      o = s ? null : r,
      { i: a, r: c } = e,
      u = t && t.r,
      h = a.refs === wt ? (a.refs = {}) : a.refs,
      f = a.setupState;
  if ((u != null && u !== c && (Kt(u) ? ((h[u] = null), dt(f, u) && (f[u] = null)) : ne(u) && (u.value = null)), st(c))) rn(c, a, 12, [o, h]);
  else {
      const g = Kt(c),
          _ = ne(c);
      if (g || _) {
          const T = () => {
              if (e.f) {
                  const v = g ? (dt(f, c) ? f[c] : h[c]) : c.value;
                  s ? nt(v) && $o(v, r) : nt(v) ? v.includes(r) || v.push(r) : g ? ((h[c] = [r]), dt(f, c) && (f[c] = h[c])) : ((c.value = [r]), e.k && (h[e.k] = c.value));
              } else g ? ((h[c] = o), dt(f, c) && (f[c] = o)) : _ && ((c.value = o), e.k && (h[e.k] = o));
          };
          o ? ((T.id = -1), Jt(T, n)) : T();
      }
  }
}
const Jt = Zp;
function Am(e) {
  return Rm(e);
}
function Rm(e, t) {
  const n = cu();
  n.__VUE__ = !0;
  const { insert: i, remove: s, patchProp: r, createElement: o, createText: a, createComment: c, setText: u, setElementText: h, parentNode: f, nextSibling: g, setScopeId: _ = _e, insertStaticContent: T } = e,
      v = (m, y, A, L = null, S = null, F = null, k = void 0, D = null, C = !!y.dynamicChildren) => {
          if (m === y) return;
          m && !Li(m, y) && ((L = yt(m)), rt(m, S, F, !0), (m = null)), y.patchFlag === -2 && ((C = !1), (y.dynamicChildren = null));
          const { type: N, ref: j, shapeFlag: z } = y;
          switch (N) {
              case fr:
                  b(m, y, A, L);
                  break;
              case Sn:
                  x(m, y, A, L);
                  break;
              case Wr:
                  m == null && R(y, A, L, k);
                  break;
              case xe:
                  Et(m, y, A, L, S, F, k, D, C);
                  break;
              default:
                  z & 1 ? w(m, y, A, L, S, F, k, D, C) : z & 6 ? ct(m, y, A, L, S, F, k, D, C) : (z & 64 || z & 128) && N.process(m, y, A, L, S, F, k, D, C, Dt);
          }
          j != null && S && Eo(j, m && m.ref, F, y || m, !y);
      },
      b = (m, y, A, L) => {
          if (m == null) i((y.el = a(y.children)), A, L);
          else {
              const S = (y.el = m.el);
              y.children !== m.children && u(S, y.children);
          }
      },
      x = (m, y, A, L) => {
          m == null ? i((y.el = c(y.children || "")), A, L) : (y.el = m.el);
      },
      R = (m, y, A, L) => {
          [m.el, m.anchor] = T(m.children, y, A, L, m.el, m.anchor);
      },
      M = ({ el: m, anchor: y }, A, L) => {
          let S;
          for (; m && m !== y; ) (S = g(m)), i(m, A, L), (m = S);
          i(y, A, L);
      },
      I = ({ el: m, anchor: y }) => {
          let A;
          for (; m && m !== y; ) (A = g(m)), s(m), (m = A);
          s(y);
      },
      w = (m, y, A, L, S, F, k, D, C) => {
          y.type === "svg" ? (k = "svg") : y.type === "math" && (k = "mathml"), m == null ? K(y, A, L, S, F, k, D, C) : X(m, y, S, F, k, D, C);
      },
      K = (m, y, A, L, S, F, k, D) => {
          let C, N;
          const { props: j, shapeFlag: z, transition: G, dirs: H } = m;
          if (((C = m.el = o(m.type, F, j && j.is, j)), z & 8 ? h(C, m.children) : z & 16 && q(m.children, C, null, L, S, Hr(m, F), k, D), H && En(m, null, L, "created"), W(C, m, m.scopeId, k, L), j)) {
              for (const ot in j) ot !== "value" && !$s(ot) && r(C, ot, null, j[ot], F, m.children, L, S, vt);
              "value" in j && r(C, "value", null, j.value, F), (N = j.onVnodeBeforeMount) && Re(N, L, m);
          }
          H && En(m, null, L, "beforeMount");
          const tt = Im(S, G);
          tt && G.beforeEnter(C),
              i(C, y, A),
              ((N = j && j.onVnodeMounted) || tt || H) &&
                  Jt(() => {
                      N && Re(N, L, m), tt && G.enter(C), H && En(m, null, L, "mounted");
                  }, S);
      },
      W = (m, y, A, L, S) => {
          if ((A && _(m, A), L)) for (let F = 0; F < L.length; F++) _(m, L[F]);
          if (S) {
              let F = S.subTree;
              if (y === F) {
                  const k = S.vnode;
                  W(m, k, k.scopeId, k.slotScopeIds, S.parent);
              }
          }
      },
      q = (m, y, A, L, S, F, k, D, C = 0) => {
          for (let N = C; N < m.length; N++) {
              const j = (m[N] = D ? Qe(m[N]) : Oe(m[N]));
              v(null, j, y, A, L, S, F, k, D);
          }
      },
      X = (m, y, A, L, S, F, k) => {
          const D = (y.el = m.el);
          let { patchFlag: C, dynamicChildren: N, dirs: j } = y;
          C |= m.patchFlag & 16;
          const z = m.props || wt,
              G = y.props || wt;
          let H;
          if ((A && yn(A, !1), (H = G.onVnodeBeforeUpdate) && Re(H, A, y, m), j && En(y, m, A, "beforeUpdate"), A && yn(A, !0), N ? Y(m.dynamicChildren, N, D, A, L, Hr(y, S), F) : k || J(m, y, D, null, A, L, Hr(y, S), F, !1), C > 0)) {
              if (C & 16) B(D, y, z, G, A, L, S);
              else if ((C & 2 && z.class !== G.class && r(D, "class", null, G.class, S), C & 4 && r(D, "style", z.style, G.style, S), C & 8)) {
                  const tt = y.dynamicProps;
                  for (let ot = 0; ot < tt.length; ot++) {
                      const ht = tt[ot],
                          ft = z[ht],
                          Wt = G[ht];
                      (Wt !== ft || ht === "value") && r(D, ht, ft, Wt, S, m.children, A, L, vt);
                  }
              }
              C & 1 && m.children !== y.children && h(D, y.children);
          } else !k && N == null && B(D, y, z, G, A, L, S);
          ((H = G.onVnodeUpdated) || j) &&
              Jt(() => {
                  H && Re(H, A, y, m), j && En(y, m, A, "updated");
              }, L);
      },
      Y = (m, y, A, L, S, F, k) => {
          for (let D = 0; D < y.length; D++) {
              const C = m[D],
                  N = y[D],
                  j = C.el && (C.type === xe || !Li(C, N) || C.shapeFlag & 70) ? f(C.el) : A;
              v(C, N, j, null, L, S, F, k, !0);
          }
      },
      B = (m, y, A, L, S, F, k) => {
          if (A !== L) {
              if (A !== wt) for (const D in A) !$s(D) && !(D in L) && r(m, D, A[D], null, k, y.children, S, F, vt);
              for (const D in L) {
                  if ($s(D)) continue;
                  const C = L[D],
                      N = A[D];
                  C !== N && D !== "value" && r(m, D, N, C, k, y.children, S, F, vt);
              }
              "value" in L && r(m, "value", A.value, L.value, k);
          }
      },
      Et = (m, y, A, L, S, F, k, D, C) => {
          const N = (y.el = m ? m.el : a("")),
              j = (y.anchor = m ? m.anchor : a(""));
          let { patchFlag: z, dynamicChildren: G, slotScopeIds: H } = y;
          H && (D = D ? D.concat(H) : H),
              m == null
                  ? (i(N, A, L), i(j, A, L), q(y.children, A, j, S, F, k, D, C))
                  : z > 0 && z & 64 && G && m.dynamicChildren
                  ? (Y(m.dynamicChildren, G, A, S, F, k, D), (y.key != null || (S && y === S.subTree)) && Wu(m, y, !0))
                  : J(m, y, A, j, S, F, k, D, C);
      },
      ct = (m, y, A, L, S, F, k, D, C) => {
          (y.slotScopeIds = D), m == null ? (y.shapeFlag & 512 ? S.ctx.activate(y, A, L, k, C) : xt(y, A, L, S, F, k, C)) : bt(m, y, C);
      },
      xt = (m, y, A, L, S, F, k) => {
          const D = (m.component = Vm(m, L, S));
          if ((ku(m) && (D.ctx.renderer = Dt), jm(D), D.asyncDep)) {
              if ((S && S.registerDep(D, et), !m.el)) {
                  const C = (D.subTree = Ce(Sn));
                  x(null, C, y, A);
              }
          } else et(D, m, y, A, S, F, k);
      },
      bt = (m, y, A) => {
          const L = (y.component = m.component);
          if (zp(m, y, A))
              if (L.asyncDep && !L.asyncResolved) {
                  U(L, y, A);
                  return;
              } else (L.next = y), kp(L.update), (L.effect.dirty = !0), L.update();
          else (y.el = m.el), (L.vnode = y);
      },
      et = (m, y, A, L, S, F, k) => {
          const D = () => {
                  if (m.isMounted) {
                      let { next: j, bu: z, u: G, parent: H, vnode: tt } = m;
                      {
                          const Mt = Xu(m);
                          if (Mt) {
                              j && ((j.el = tt.el), U(m, j, k)),
                                  Mt.asyncDep.then(() => {
                                      m.isUnmounted || D();
                                  });
                              return;
                          }
                      }
                      let ot = j,
                          ht;
                      yn(m, !1), j ? ((j.el = tt.el), U(m, j, k)) : (j = tt), z && Gr(z), (ht = j.props && j.props.onVnodeBeforeUpdate) && Re(ht, H, j, tt), yn(m, !0);
                      const ft = Ur(m),
                          Wt = m.subTree;
                      (m.subTree = ft), v(Wt, ft, f(Wt.el), yt(Wt), m, S, F), (j.el = ft.el), ot === null && Yp(m, ft.el), G && Jt(G, S), (ht = j.props && j.props.onVnodeUpdated) && Jt(() => Re(ht, H, j, tt), S);
                  } else {
                      let j;
                      const { el: z, props: G } = y,
                          { bm: H, m: tt, parent: ot } = m,
                          ht = Vs(y);
                      if ((yn(m, !1), H && Gr(H), !ht && (j = G && G.onVnodeBeforeMount) && Re(j, ot, y), yn(m, !0), z && P)) {
                          const ft = () => {
                              (m.subTree = Ur(m)), P(z, m.subTree, m, S, null);
                          };
                          ht ? y.type.__asyncLoader().then(() => !m.isUnmounted && ft()) : ft();
                      } else {
                          const ft = (m.subTree = Ur(m));
                          v(null, ft, A, L, m, S, F), (y.el = ft.el);
                      }
                      if ((tt && Jt(tt, S), !ht && (j = G && G.onVnodeMounted))) {
                          const ft = y;
                          Jt(() => Re(j, ot, ft), S);
                      }
                      (y.shapeFlag & 256 || (ot && Vs(ot.vnode) && ot.vnode.shapeFlag & 256)) && m.a && Jt(m.a, S), (m.isMounted = !0), (y = A = L = null);
                  }
              },
              C = (m.effect = new Ko(D, _e, () => qo(N), m.scope)),
              N = (m.update = () => {
                  C.dirty && C.run();
              });
          (N.id = m.uid), yn(m, !0), N();
      },
      U = (m, y, A) => {
          y.component = m;
          const L = m.vnode.props;
          (m.vnode = y), (m.next = null), Tm(m, y.props, L, A), wm(m, y.children, A), Mn(), jl(m), Nn();
      },
      J = (m, y, A, L, S, F, k, D, C = !1) => {
          const N = m && m.children,
              j = m ? m.shapeFlag : 0,
              z = y.children,
              { patchFlag: G, shapeFlag: H } = y;
          if (G > 0) {
              if (G & 128) {
                  At(N, z, A, L, S, F, k, D, C);
                  return;
              } else if (G & 256) {
                  mt(N, z, A, L, S, F, k, D, C);
                  return;
              }
          }
          H & 8 ? (j & 16 && vt(N, S, F), z !== N && h(A, z)) : j & 16 ? (H & 16 ? At(N, z, A, L, S, F, k, D, C) : vt(N, S, F, !0)) : (j & 8 && h(A, ""), H & 16 && q(z, A, L, S, F, k, D, C));
      },
      mt = (m, y, A, L, S, F, k, D, C) => {
          (m = m || ri), (y = y || ri);
          const N = m.length,
              j = y.length,
              z = Math.min(N, j);
          let G;
          for (G = 0; G < z; G++) {
              const H = (y[G] = C ? Qe(y[G]) : Oe(y[G]));
              v(m[G], H, A, null, S, F, k, D, C);
          }
          N > j ? vt(m, S, F, !0, !1, z) : q(y, A, L, S, F, k, D, C, z);
      },
      At = (m, y, A, L, S, F, k, D, C) => {
          let N = 0;
          const j = y.length;
          let z = m.length - 1,
              G = j - 1;
          for (; N <= z && N <= G; ) {
              const H = m[N],
                  tt = (y[N] = C ? Qe(y[N]) : Oe(y[N]));
              if (Li(H, tt)) v(H, tt, A, null, S, F, k, D, C);
              else break;
              N++;
          }
          for (; N <= z && N <= G; ) {
              const H = m[z],
                  tt = (y[G] = C ? Qe(y[G]) : Oe(y[G]));
              if (Li(H, tt)) v(H, tt, A, null, S, F, k, D, C);
              else break;
              z--, G--;
          }
          if (N > z) {
              if (N <= G) {
                  const H = G + 1,
                      tt = H < j ? y[H].el : L;
                  for (; N <= G; ) v(null, (y[N] = C ? Qe(y[N]) : Oe(y[N])), A, tt, S, F, k, D, C), N++;
              }
          } else if (N > G) for (; N <= z; ) rt(m[N], S, F, !0), N++;
          else {
              const H = N,
                  tt = N,
                  ot = new Map();
              for (N = tt; N <= G; N++) {
                  const Gt = (y[N] = C ? Qe(y[N]) : Oe(y[N]));
                  Gt.key != null && ot.set(Gt.key, N);
              }
              let ht,
                  ft = 0;
              const Wt = G - tt + 1;
              let Mt = !1,
                  as = 0;
              const un = new Array(Wt);
              for (N = 0; N < Wt; N++) un[N] = 0;
              for (N = H; N <= z; N++) {
                  const Gt = m[N];
                  if (ft >= Wt) {
                      rt(Gt, S, F, !0);
                      continue;
                  }
                  let ae;
                  if (Gt.key != null) ae = ot.get(Gt.key);
                  else
                      for (ht = tt; ht <= G; ht++)
                          if (un[ht - tt] === 0 && Li(Gt, y[ht])) {
                              ae = ht;
                              break;
                          }
                  ae === void 0 ? rt(Gt, S, F, !0) : ((un[ae - tt] = N + 1), ae >= as ? (as = ae) : (Mt = !0), v(Gt, y[ae], A, null, S, F, k, D, C), ft++);
              }
              const ls = Mt ? xm(un) : ri;
              for (ht = ls.length - 1, N = Wt - 1; N >= 0; N--) {
                  const Gt = tt + N,
                      ae = y[Gt],
                      Ye = Gt + 1 < j ? y[Gt + 1].el : L;
                  un[N] === 0 ? v(null, ae, A, Ye, S, F, k, D, C) : Mt && (ht < 0 || N !== ls[ht] ? Pt(ae, A, Ye, 2) : ht--);
              }
          }
      },
      Pt = (m, y, A, L, S = null) => {
          const { el: F, type: k, transition: D, children: C, shapeFlag: N } = m;
          if (N & 6) {
              Pt(m.component.subTree, y, A, L);
              return;
          }
          if (N & 128) {
              m.suspense.move(y, A, L);
              return;
          }
          if (N & 64) {
              k.move(m, y, A, Dt);
              return;
          }
          if (k === xe) {
              i(F, y, A);
              for (let z = 0; z < C.length; z++) Pt(C[z], y, A, L);
              i(m.anchor, y, A);
              return;
          }
          if (k === Wr) {
              M(m, y, A);
              return;
          }
          if (L !== 2 && N & 1 && D)
              if (L === 0) D.beforeEnter(F), i(F, y, A), Jt(() => D.enter(F), S);
              else {
                  const { leave: z, delayLeave: G, afterLeave: H } = D,
                      tt = () => i(F, y, A),
                      ot = () => {
                          z(F, () => {
                              tt(), H && H();
                          });
                      };
                  G ? G(F, tt, ot) : ot();
              }
          else i(F, y, A);
      },
      rt = (m, y, A, L = !1, S = !1) => {
          const { type: F, props: k, ref: D, children: C, dynamicChildren: N, shapeFlag: j, patchFlag: z, dirs: G } = m;
          if ((D != null && Eo(D, null, A, m, !0), j & 256)) {
              y.ctx.deactivate(m);
              return;
          }
          const H = j & 1 && G,
              tt = !Vs(m);
          let ot;
          if ((tt && (ot = k && k.onVnodeBeforeUnmount) && Re(ot, y, m), j & 6)) ut(m.component, A, L);
          else {
              if (j & 128) {
                  m.suspense.unmount(A, L);
                  return;
              }
              H && En(m, null, y, "beforeUnmount"), j & 64 ? m.type.remove(m, y, A, S, Dt, L) : N && (F !== xe || (z > 0 && z & 64)) ? vt(N, y, A, !1, !0) : ((F === xe && z & 384) || (!S && j & 16)) && vt(C, y, A), L && Ct(m);
          }
          ((tt && (ot = k && k.onVnodeUnmounted)) || H) &&
              Jt(() => {
                  ot && Re(ot, y, m), H && En(m, null, y, "unmounted");
              }, A);
      },
      Ct = (m) => {
          const { type: y, el: A, anchor: L, transition: S } = m;
          if (y === xe) {
              lt(A, L);
              return;
          }
          if (y === Wr) {
              I(m);
              return;
          }
          const F = () => {
              s(A), S && !S.persisted && S.afterLeave && S.afterLeave();
          };
          if (m.shapeFlag & 1 && S && !S.persisted) {
              const { leave: k, delayLeave: D } = S,
                  C = () => k(A, F);
              D ? D(m.el, F, C) : C();
          } else F();
      },
      lt = (m, y) => {
          let A;
          for (; m !== y; ) (A = g(m)), s(m), (m = A);
          s(y);
      },
      ut = (m, y, A) => {
          const { bum: L, scope: S, update: F, subTree: k, um: D } = m;
          L && Gr(L),
              S.stop(),
              F && ((F.active = !1), rt(k, m, y, A)),
              D && Jt(D, y),
              Jt(() => {
                  m.isUnmounted = !0;
              }, y),
              y && y.pendingBranch && !y.isUnmounted && m.asyncDep && !m.asyncResolved && m.suspenseId === y.pendingId && (y.deps--, y.deps === 0 && y.resolve());
      },
      vt = (m, y, A, L = !1, S = !1, F = 0) => {
          for (let k = F; k < m.length; k++) rt(m[k], y, A, L, S);
      },
      yt = (m) => (m.shapeFlag & 6 ? yt(m.component.subTree) : m.shapeFlag & 128 ? m.suspense.next() : g(m.anchor || m.el)),
      Ot = (m, y, A) => {
          m == null ? y._vnode && rt(y._vnode, null, null, !0) : v(y._vnode || null, m, y, null, null, null, A), jl(), Ou(), (y._vnode = m);
      },
      Dt = { p: v, um: rt, m: Pt, r: Ct, mt: xt, mc: q, pc: J, pbc: Y, n: yt, o: e };
  let oe, P;
  return t && ([oe, P] = t(Dt)), { render: Ot, hydrate: oe, createApp: Em(Ot, oe) };
}
function Hr({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") || (n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html")) ? void 0 : n;
}
function yn({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Im(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Wu(e, t, n = !1) {
  const i = e.children,
      s = t.children;
  if (nt(i) && nt(s))
      for (let r = 0; r < i.length; r++) {
          const o = i[r];
          let a = s[r];
          a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && ((a = s[r] = Qe(s[r])), (a.el = o.el)), n || Wu(o, a)), a.type === fr && (a.el = o.el);
      }
}
function xm(e) {
  const t = e.slice(),
      n = [0];
  let i, s, r, o, a;
  const c = e.length;
  for (i = 0; i < c; i++) {
      const u = e[i];
      if (u !== 0) {
          if (((s = n[n.length - 1]), e[s] < u)) {
              (t[i] = s), n.push(i);
              continue;
          }
          for (r = 0, o = n.length - 1; r < o; ) (a = (r + o) >> 1), e[n[a]] < u ? (r = a + 1) : (o = a);
          u < e[n[r]] && (r > 0 && (t[i] = n[r - 1]), (n[r] = i));
      }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; ) (n[r] = o), (o = t[o]);
  return n;
}
function Xu(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Xu(t);
}
const Om = (e) => e.__isTeleport,
  xe = Symbol.for("v-fgt"),
  fr = Symbol.for("v-txt"),
  Sn = Symbol.for("v-cmt"),
  Wr = Symbol.for("v-stc"),
  Fi = [];
let Te = null;
function Ui(e = !1) {
  Fi.push((Te = e ? null : []));
}
function Sm() {
  Fi.pop(), (Te = Fi[Fi.length - 1] || null);
}
let zi = 1;
function Ql(e) {
  zi += e;
}
function Zu(e) {
  return (e.dynamicChildren = zi > 0 ? Te || ri : null), Sm(), zi > 0 && Te && Te.push(e), e;
}
function Zs(e, t, n, i, s, r) {
  return Zu(Q(e, t, n, i, s, r, !0));
}
function Lm(e, t, n, i, s) {
  return Zu(Ce(e, t, n, i, s, !0));
}
function Pm(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Li(e, t) {
  return e.type === t.type && e.key === t.key;
}
const gr = "__vInternal",
  Bu = ({ key: e }) => e ?? null,
  Ks = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? (Kt(e) || ne(e) || st(e) ? { i: ve, r: e, k: t, f: !!n } : e) : null);
function Q(e, t = null, n = null, i = 0, s = null, r = e === xe ? 0 : 1, o = !1, a = !1) {
  const c = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e,
      props: t,
      key: t && Bu(t),
      ref: t && Ks(t),
      scopeId: hr,
      slotScopeIds: null,
      children: n,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: r,
      patchFlag: i,
      dynamicProps: s,
      dynamicChildren: null,
      appContext: null,
      ctx: ve,
  };
  return a ? (ta(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= Kt(n) ? 8 : 16), zi > 0 && !o && Te && (c.patchFlag > 0 || r & 6) && c.patchFlag !== 32 && Te.push(c), c;
}
const Ce = Mm;
function Mm(e, t = null, n = null, i = 0, s = null, r = !1) {
  if (((!e || e === Hp) && (e = Sn), Pm(e))) {
      const a = di(e, t, !0);
      return n && ta(a, n), zi > 0 && !r && Te && (a.shapeFlag & 6 ? (Te[Te.indexOf(e)] = a) : Te.push(a)), (a.patchFlag |= -2), a;
  }
  if ((Ym(e) && (e = e.__vccOpts), t)) {
      t = Nm(t);
      let { class: a, style: c } = t;
      a && !Kt(a) && (t.class = en(a)), Nt(c) && (Cu(c) && !nt(c) && (c = Ht({}, c)), (t.style = jo(c)));
  }
  const o = Kt(e) ? 1 : Xp(e) ? 128 : Om(e) ? 64 : Nt(e) ? 4 : st(e) ? 2 : 0;
  return Q(e, t, n, i, s, o, r, !0);
}
function Nm(e) {
  return e ? (Cu(e) || gr in e ? Ht({}, e) : e) : null;
}
function di(e, t, n = !1) {
  const { props: i, ref: s, patchFlag: r, children: o } = e,
      a = t ? Fm(i || {}, t) : i;
  return {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: a,
      key: a && Bu(a),
      ref: t && t.ref ? (n && s ? (nt(s) ? s.concat(Ks(t)) : [s, Ks(t)]) : Ks(t)) : s,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: o,
      target: e.target,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== xe ? (r === -1 ? 16 : r | 16) : r,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: e.transition,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && di(e.ssContent),
      ssFallback: e.ssFallback && di(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
  };
}
function yo(e = " ", t = 0) {
  return Ce(fr, null, e, t);
}
function Dm(e = "", t = !1) {
  return t ? (Ui(), Lm(Sn, null, e)) : Ce(Sn, null, e);
}
function Oe(e) {
  return e == null || typeof e == "boolean" ? Ce(Sn) : nt(e) ? Ce(xe, null, e.slice()) : typeof e == "object" ? Qe(e) : Ce(fr, null, String(e));
}
function Qe(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : di(e);
}
function ta(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null) t = null;
  else if (nt(t)) n = 16;
  else if (typeof t == "object")
      if (i & 65) {
          const s = t.default;
          s && (s._c && (s._d = !1), ta(e, s()), s._c && (s._d = !0));
          return;
      } else {
          n = 32;
          const s = t._;
          !s && !(gr in t) ? (t._ctx = ve) : s === 3 && ve && (ve.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
      }
  else st(t) ? ((t = { default: t, _ctx: ve }), (n = 32)) : ((t = String(t)), i & 64 ? ((n = 16), (t = [yo(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Fm(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
      const i = e[n];
      for (const s in i)
          if (s === "class") t.class !== i.class && (t.class = en([t.class, i.class]));
          else if (s === "style") t.style = jo([t.style, i.style]);
          else if (ir(s)) {
              const r = t[s],
                  o = i[s];
              o && r !== o && !(nt(r) && r.includes(o)) && (t[s] = r ? [].concat(r, o) : o);
          } else s !== "" && (t[s] = i[s]);
  }
  return t;
}
function Re(e, t, n, i = null) {
  be(e, t, 7, [n, i]);
}
const km = Ku();
let $m = 0;
function Vm(e, t, n) {
  const i = e.type,
      s = (t ? t.appContext : e.appContext) || km,
      r = {
          uid: $m++,
          vnode: e,
          type: i,
          parent: t,
          appContext: s,
          root: null,
          next: null,
          subTree: null,
          effect: null,
          update: null,
          scope: new lp(!0),
          render: null,
          proxy: null,
          exposed: null,
          exposeProxy: null,
          withProxy: null,
          provides: t ? t.provides : Object.create(s.provides),
          accessCache: null,
          renderCache: [],
          components: null,
          directives: null,
          propsOptions: Uu(i, s),
          emitsOptions: Lu(i, s),
          emit: null,
          emitted: null,
          propsDefaults: wt,
          inheritAttrs: i.inheritAttrs,
          ctx: wt,
          data: wt,
          props: wt,
          attrs: wt,
          slots: wt,
          refs: wt,
          setupState: wt,
          setupContext: null,
          attrsProxy: null,
          slotsProxy: null,
          suspense: n,
          suspenseId: n ? n.pendingId : 0,
          asyncDep: null,
          asyncResolved: !1,
          isMounted: !1,
          isUnmounted: !1,
          isDeactivated: !1,
          bc: null,
          c: null,
          bm: null,
          m: null,
          bu: null,
          u: null,
          um: null,
          bum: null,
          da: null,
          a: null,
          rtg: null,
          rtc: null,
          ec: null,
          sp: null,
      };
  return (r.ctx = { _: r }), (r.root = t ? t.root : r), (r.emit = jp.bind(null, r)), e.ce && e.ce(r), r;
}
let Yt = null,
  ea,
  vo;
{
  const e = cu(),
      t = (n, i) => {
          let s;
          return (
              (s = e[n]) || (s = e[n] = []),
              s.push(i),
              (r) => {
                  s.length > 1 ? s.forEach((o) => o(r)) : s[0](r);
              }
          );
      };
  (ea = t("__VUE_INSTANCE_SETTERS__", (n) => (Yt = n))), (vo = t("__VUE_SSR_SETTERS__", (n) => (_r = n)));
}
const fi = (e) => {
      ea(e), e.scope.on();
  },
  Rn = () => {
      Yt && Yt.scope.off(), ea(null);
  };
function qu(e) {
  return e.vnode.shapeFlag & 4;
}
let _r = !1;
function jm(e, t = !1) {
  t && vo(t);
  const { props: n, children: i } = e.vnode,
      s = qu(e);
  vm(e, n, s, t), Cm(e, i);
  const r = s ? Km(e, t) : void 0;
  return t && vo(!1), r;
}
function Km(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = wu(new Proxy(e.ctx, hm)));
  const { setup: i } = n;
  if (i) {
      const s = (e.setupContext = i.length > 1 ? Um(e) : null);
      fi(e), Mn();
      const r = rn(i, e, 0, [e.props, s]);
      if ((Nn(), Rn(), lu(r))) {
          if ((r.then(Rn, Rn), t))
              return r
                  .then((o) => {
                      Jl(e, o, t);
                  })
                  .catch((o) => {
                      cr(o, e, 0);
                  });
          e.asyncDep = r;
      } else Jl(e, r, t);
  } else Qu(e, t);
}
function Jl(e, t, n) {
  st(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : Nt(t) && (e.setupState = Ru(t)), Qu(e, n);
}
let tc;
function Qu(e, t, n) {
  const i = e.type;
  if (!e.render) {
      if (!t && tc && !i.render) {
          const s = i.template || Qo(e).template;
          if (s) {
              const { isCustomElement: r, compilerOptions: o } = e.appContext.config,
                  { delimiters: a, compilerOptions: c } = i,
                  u = Ht(Ht({ isCustomElement: r, delimiters: a }, o), c);
              i.render = tc(s, u);
          }
      }
      e.render = i.render || _e;
  }
  {
      fi(e), Mn();
      try {
          dm(e);
      } finally {
          Nn(), Rn();
      }
  }
}
function Gm(e) {
  return (
      e.attrsProxy ||
      (e.attrsProxy = new Proxy(e.attrs, {
          get(t, n) {
              return ee(e, "get", "$attrs"), t[n];
          },
      }))
  );
}
function Um(e) {
  const t = (n) => {
      e.exposed = n || {};
  };
  return {
      get attrs() {
          return Gm(e);
      },
      slots: e.slots,
      emit: e.emit,
      expose: t,
  };
}
function na(e) {
  if (e.exposed)
      return (
          e.exposeProxy ||
          (e.exposeProxy = new Proxy(Ru(wu(e.exposed)), {
              get(t, n) {
                  if (n in t) return t[n];
                  if (n in Di) return Di[n](e);
              },
              has(t, n) {
                  return n in t || n in Di;
              },
          }))
      );
}
function zm(e, t = !0) {
  return st(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ym(e) {
  return st(e) && "__vccOpts" in e;
}
const Hm = (e, t) => Sp(e, t, _r),
  Wm = "3.4.4",
  Xm = "http://www.w3.org/2000/svg",
  Zm = "http://www.w3.org/1998/Math/MathML",
  Je = typeof document < "u" ? document : null,
  ec = Je && Je.createElement("template"),
  Bm = {
      insert: (e, t, n) => {
          t.insertBefore(e, n || null);
      },
      remove: (e) => {
          const t = e.parentNode;
          t && t.removeChild(e);
      },
      createElement: (e, t, n, i) => {
          const s = t === "svg" ? Je.createElementNS(Xm, e) : t === "mathml" ? Je.createElementNS(Zm, e) : Je.createElement(e, n ? { is: n } : void 0);
          return e === "select" && i && i.multiple != null && s.setAttribute("multiple", i.multiple), s;
      },
      createText: (e) => Je.createTextNode(e),
      createComment: (e) => Je.createComment(e),
      setText: (e, t) => {
          e.nodeValue = t;
      },
      setElementText: (e, t) => {
          e.textContent = t;
      },
      parentNode: (e) => e.parentNode,
      nextSibling: (e) => e.nextSibling,
      querySelector: (e) => Je.querySelector(e),
      setScopeId(e, t) {
          e.setAttribute(t, "");
      },
      insertStaticContent(e, t, n, i, s, r) {
          const o = n ? n.previousSibling : t.lastChild;
          if (s && (s === r || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)); );
          else {
              ec.innerHTML = i === "svg" ? `<svg>${e}</svg>` : i === "mathml" ? `<math>${e}</math>` : e;
              const a = ec.content;
              if (i === "svg" || i === "mathml") {
                  const c = a.firstChild;
                  for (; c.firstChild; ) a.appendChild(c.firstChild);
                  a.removeChild(c);
              }
              t.insertBefore(a, n);
          }
          return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
      },
  },
  qm = Symbol("_vtc");
function Qm(e, t, n) {
  const i = e[qm];
  i && (t = (t ? [t, ...i] : [...i]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : (e.className = t);
}
const Jm = Symbol("_vod"),
  tE = Symbol("");
function eE(e, t, n) {
  const i = e.style,
      s = Kt(n);
  if (n && !s) {
      if (t && !Kt(t)) for (const r in t) n[r] == null && To(i, r, "");
      for (const r in n) To(i, r, n[r]);
  } else {
      const r = i.display;
      if (s) {
          if (t !== n) {
              const o = i[tE];
              o && (n += ";" + o), (i.cssText = n);
          }
      } else t && e.removeAttribute("style");
      Jm in e && (i.display = r);
  }
}
const nc = /\s*!important$/;
function To(e, t, n) {
  if (nt(n)) n.forEach((i) => To(e, t, i));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
      const i = nE(e, t);
      nc.test(n) ? e.setProperty(Ti(i), n.replace(nc, ""), "important") : (e[i] = n);
  }
}
const ic = ["Webkit", "Moz", "ms"],
  Xr = {};
function nE(e, t) {
  const n = Xr[t];
  if (n) return n;
  let i = Ne(t);
  if (i !== "filter" && i in e) return (Xr[t] = i);
  i = ar(i);
  for (let s = 0; s < ic.length; s++) {
      const r = ic[s] + i;
      if (r in e) return (Xr[t] = r);
  }
  return t;
}
const sc = "http://www.w3.org/1999/xlink";
function iE(e, t, n, i, s) {
  if (i && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(sc, t.slice(6, t.length)) : e.setAttributeNS(sc, t, n);
  else {
      const r = ap(t);
      n == null || (r && !uu(n)) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function sE(e, t, n, i, s, r, o) {
  if (t === "innerHTML" || t === "textContent") {
      i && o(i, s, r), (e[t] = n ?? "");
      return;
  }
  const a = e.tagName;
  if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
      e._value = n;
      const u = a === "OPTION" ? e.getAttribute("value") : e.value,
          h = n ?? "";
      u !== h && (e.value = h), n == null && e.removeAttribute(t);
      return;
  }
  let c = !1;
  if (n === "" || n == null) {
      const u = typeof e[t];
      u === "boolean" ? (n = uu(n)) : n == null && u === "string" ? ((n = ""), (c = !0)) : u === "number" && ((n = 0), (c = !0));
  }
  try {
      e[t] = n;
  } catch {}
  c && e.removeAttribute(t);
}
function rE(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function oE(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
const rc = Symbol("_vei");
function aE(e, t, n, i, s = null) {
  const r = e[rc] || (e[rc] = {}),
      o = r[t];
  if (i && o) o.value = i;
  else {
      const [a, c] = lE(t);
      if (i) {
          const u = (r[t] = hE(i, s));
          rE(e, a, u, c);
      } else o && (oE(e, a, o, c), (r[t] = void 0));
  }
}
const oc = /(?:Once|Passive|Capture)$/;
function lE(e) {
  let t;
  if (oc.test(e)) {
      t = {};
      let i;
      for (; (i = e.match(oc)); ) (e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : Ti(e.slice(2)), t];
}
let Zr = 0;
const cE = Promise.resolve(),
  uE = () => Zr || (cE.then(() => (Zr = 0)), (Zr = Date.now()));
function hE(e, t) {
  const n = (i) => {
      if (!i._vts) i._vts = Date.now();
      else if (i._vts <= n.attached) return;
      be(dE(i, n.value), t, 5, [i]);
  };
  return (n.value = e), (n.attached = uE()), n;
}
function dE(e, t) {
  if (nt(t)) {
      const n = e.stopImmediatePropagation;
      return (
          (e.stopImmediatePropagation = () => {
              n.call(e), (e._stopped = !0);
          }),
          t.map((i) => (s) => !s._stopped && i && i(s))
      );
  } else return t;
}
const ac = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
  fE = (e, t, n, i, s, r, o, a, c) => {
      const u = s === "svg";
      t === "class"
          ? Qm(e, i, u)
          : t === "style"
          ? eE(e, n, i)
          : ir(t)
          ? ko(t) || aE(e, t, n, i, o)
          : (t[0] === "." ? ((t = t.slice(1)), !0) : t[0] === "^" ? ((t = t.slice(1)), !1) : gE(e, t, i, u))
          ? sE(e, t, i, r, o, a, c)
          : (t === "true-value" ? (e._trueValue = i) : t === "false-value" && (e._falseValue = i), iE(e, t, i, u));
  };
function gE(e, t, n, i) {
  if (i) return !!(t === "innerHTML" || t === "textContent" || (t in e && ac(t) && st(n)));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || (t === "list" && e.tagName === "INPUT") || (t === "type" && e.tagName === "TEXTAREA")) return !1;
  if (t === "width" || t === "height") {
      const s = e.tagName;
      if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1;
  }
  return ac(t) && Kt(n) ? !1 : t in e;
}
const _E = Ht({ patchProp: fE }, Bm);
let lc;
function pE() {
  return lc || (lc = Am(_E));
}
const mE = (...e) => {
  const t = pE().createApp(...e),
      { mount: n } = t;
  return (
      (t.mount = (i) => {
          const s = yE(i);
          if (!s) return;
          const r = t._component;
          !st(r) && !r.render && !r.template && (r.template = s.innerHTML), (s.innerHTML = "");
          const o = n(s, !1, EE(s));
          return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
      }),
      t
  );
};
function EE(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function yE(e) {
  return Kt(e) ? document.querySelector(e) : e;
}
const vE = "" + new URL("https://www.co.dakota.mn.us/SiteAssets/DakotaCountyLogo_W.png", import.meta.url).href,
  TE =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAABICAYAAADbPm9XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACwlJREFUeNrsnY2V2jgQx715KYCr4JwKQiqIt4KFCs5UsFABUAFsBUAFSyqAdEAqiK+CcBXkPOxfWcXxh2RZxmb/v/f8uNxaM7I+RqOxLAUBIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgjpMD9//hymV+RZx0B0iC6WeL+5K2pE6c8qvU53d3cz04ZnmyaTzpRdKn9rIf+A/5yk6RJfz4G0kk7SP6Vp9xb5c9FlVtF3d/cN10mCujjaGijItq1Hle6Mujz70tW0sUx/pun1kFNfUoZ7tJfEUU+Y/szTa5Reg8yfT1IG6bU1KbcC+XH6849NWTbQtm10XdKYtnPteewMZoX8VO4m/QktbUCEujunacb6394XpJEKth3l66TR053RkJpG5ek5vT55fI4AjUrSipd0Mux0rrqOHspMlUGCq0h3nD6ndPpJDdlfHdqX5GnmUVdTxjnGADFA+5YO+w1//oi8TVGOs7qDCIzTNGP0/8W/P6s2mV6P6b3jVE+dfhbWKEvXth2hH50s0rgyRH2dUGe2yEB4gA04Vg2IGMCVUR+bVrgUzE/N+/SSxiWdhXydlc/8SBpN18Eif7V1eSozVQaLint+4L5pk7Ir0ilGvnQ1VIYLLa8LdMSq++IaejZI+6MoPUIeK01P5PA8C8u+59qPvheVnY/+oOmOHGSsTJ9du/c57+/v3kgoR42GU5OO3QBHjP6LWy1QhDbUiP/Yomo1bdxgWt850MbmaHOf0rJaFHlS8jfM7M7womz0XLxvtO8PRR646EaYQc10nrtadjn9NoSH2ae+MUPeozLnBe1kirqfvGUDfdaMycZkRHZkAp1z3y+EOmCkL52oxRdSEiJYYhr63EHjPNAMilE4Qe5Jr79grG30zFV7M4ktw4CvUXbzHjSxJdrXqM7s4soogzvPGwxz2sn5LRtoZUxa6diIPeveyuCGi1Y1rEGLdbnALGXYwVmKekm3t32BakkMPVvLmPISdRb3oF3qnuWqT6tSUCfK3uTNADb427qsnbwZA6117FMb4Qe8wV2XVNCtMMgY6rYYd3SWolYG7DzrecDvk2W7VC8r1WDSB0M3U/2oT86O5kj8Zm8Q2hjBFi3LZLwpA912x9ZiUSObF2l9AR6NXOeaKwNcyvbc0VlKpA3QbeipU+5qJUbYE0O3xqBiuyS3K6EOZW+GCHcoh60yNPW+QvjQ4i2sawcx1TVzMQYSfkj1TBDmkI79oe7aUIsKOmCKdmzakBmWmfVaVAO9UfAaKnq6Usfdp/mQzjtFXu470inbGqzqhlAS/H7umaGLEJr50sIA2FQbFXuzxMCygbEWW7k0sQVv0YNW3s22jfCDNkXrmqdnNF3HsqPs9R2DjoqBLq5Yl/ob80VHyu0cEB8zJv1Ff9ijvOszgAgOk1FbrfKgTxZf5kTotLW9Dpuv3RpghgK7hB9QiL4qaJvqkJjhCAPCuEHZPsssLJgGqzjmriOejJqlyDRy33a4paDc+qAn6ZmRPsIbnQfmH551bQYwsOn/b9KD1kZkFR9q4w3xBB2iT0uGZBqWhywJG3dlmtmxWYrUcdhCHlz0RPj9t4f9VjzPY/ASEl31zN6cVNiDBtq8Yy/b6NiZKdqKG9k0P0uBVx8G1101c8Rv3JKeOisxHjIyTOhS2EY5Vm19eHY13rFj/4oPee/Y2bWRN74++lodV81SrrVqRi2ve/Rcv1/wa7XhD0KR4hwkluu0Vdjoo4UeL4Y9853BTfejd+zTv3fsoMYOV3WnaEH/lgz1YRr5a5YSWOz212Aejqjf0KZ+JexlY2gQXqr8nDijY6DlaVnjuc4Y/EKDJKofffVUzvp3Bs+32qZpoIM/1tTGLahUa7Fjlr6XWYqKR1/rc+Zf9YvNjAYVhnOD2ZutodHfoUwNjPMBg9ax5s55Kk1pOBDvWGLkbeuxnNWn4FHQzE52neN9h/IyMPxwJHHdO7fIQ9DeEHsfELS12E6Yfmzj+bPjrhnpNVbNRFfSL/V7j/qN4eXKWvG9arswcGpTpRCGZmyp5yTbh0LPCs/82z7E8HYlD4/B6zaadVcRLYPXrUtlueUyo2sIPcrxmPn8xkDrR2rJ59vgStuNmrKwlG/7HIe2tgC12ZawJJ9G1KyThce2tfCZDlts/rjWdqNaHjYG1eMUR8UXalXt4UcT5YBnMtE1ctBhteWnzB7qtPMmdPu0D2UedILR0sZTrZNGT2eKrSdom6cJPIA6Xrq8IDKOuclHFml9/deGrpp1cuyQbKt0mhc78vQcxqEzzMwkHx+D17XLZ9Tf3nVGiLDOPTxYpWeglZvSc27omXRd+teIko9vDehSbTsxzNMadq8JL9pKd4f6LCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghN80di6C/YMMa2YD9a9kpwdjFTDa1mZUdqIoz3r6V7RWMvX4f5EzCknsOBrouctJrUrSxjoWcskMWZlWHyObISIKXA3GPhvUgm/So57GSYZD/AHK2FXLC4GVP6S8+D0Am7fKeRdBrxDBEwcsBmus8QwfjofYCrtrtSwz+fxX3iCGQUzVWshtfwT2Rga6LnOBlV7eJoxy5dgV/P1cYtg3yIQbwK2SJoT2gTGcGg+QBeiQPp4yMbSpjUiIiCX7f4exzzvMkBm0hDl73aqaBJqQDHnSk7b8bF9wz1fZFjirkHar2DJa/a/JGBfeY6NLlxI5yDjXLb1ikA0dQVZVFiGfI3c8ZMqz2o677PGma79r+4jF7x23AI69uA/H+ik6CeQyaP3boBJkbw/PpyuSIt3etU84vOvPCEBJSKAsbASnzs3jIebMXhCUup/Q4llOVcY7hdT+hXh7ZJWigSXeQjhlmPUH8W3Xcpplh6u10EjpCCM5yHAYIFXuvQxxUHzaxRvhj5PE5JIatNv6X0MjwSgMeoYEmOUZOOuYx+PNlk/z76OkMRxU7jho4SmmMAaauoRwg3PPHVfEMaiYw1UIVRoZUk30yKCe556Mn71kG4EgNwpgNJPSiaaBJtxDPKVaxUG1lwc7jwKBO0J67nOGGAWQGQ1nH01Qv6vKuKt0yyHyCoZZneFbn95mcE1i1QkTDV4hDDHGSCdNcjthyOeeQ0ECTZo3lFp7TFP9rio679axXpvB7GLaBY/7lqhPXlllCLqYDjYRa0uuDZqznJmEXi4Ep8VQFcfBnCEudtD1iz6CBJt3yov/Rwhu7lvSqZWTPjnLEiz43IMdpVoC4+KzMC9U81mGFAVdLIb95CG+IcRb5f8PjXyDcNEU5ztklaKBJdxDPL8Ta3jBofvVGkVETYyBxZIn7ThuQM2wgru3KycAAS/k+VswcphmvtvHwBvL4OXMlQc6LY9Iv+KHKbYU5krRD7jHt3ft4OVii+5jqltjnylHOKZUzc5Vj6IGuYNzGOcvkZAZyrvgScIkwgiwTnGVlwMMVL3bZdF1glYbK+77gnu94jiN7Bw006QZPMBq7thXLuuHUKDxUTfsN5Kwhx9T7C0s87m2JcdxhMJOPPLYIQ4TwQEX3xGBAvA9eXkaOCmSsDdZT1/aei4yz1hZyBw9CA038kwSZdbjKk83puMug+kXVzuCeY8U9Yxi9JuRMDeW4eOsfgtd9NIZaud6b7MXRhAzLclHIQPCl4h4ZMAYYME7sLoQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIaRR/hdgAKyiLNIQeCbyAAAAAElFTkSuQmCC",
  ia = (e, t) => {
      const n = e.__vccOpts || e;
      for (const [i, s] of t) n[i] = s;
      return n;
  },
  bE = {
      name: "AppHeader",
      data() {
          return { windowWidth: 0 };
      },
      created() {
          window.addEventListener("resize", this.handleResize), this.handleResize();
      },
      unmounted() {
          window.removeEventListener("resize", this.handleResize);
      },
      methods: {
          handleResize() {
              this.windowWidth = window.innerWidth;
          },
          goToGisHub() {
              window.open("https://gis-hennepin.hub.arcgis.com/");
          },
      },
  },
  Ju = (e) => (Pu("data-v-93801f6d"), (e = e()), Mu(), e),
  CE = { class: "navbar navbar-expand-md navbar-dark py-0 primaryColor justify-content-between" },
  wE = { class: "navbar-brand" },
  AE = Ju(() => Q("img", { src: vE, id: "hcgis-logo", alt: "DC logo", tabindex: "0" }, null, -1)),
  RE = [AE],
  IE = Ju(() => Q("div", { id: "title-cont" }, "Dakota County Oblique Air Photo Viewer", -1)),
  xE = { id: "hennepinLogo", class: "navbar-brand py-0 mr-1", href: "https://www.hennepin.us/", target: "_blank" },
  OE = { key: 0, src: TE, width: "275px", class: "d-inline-block align-top", alt: "Hennepin logo" };
function SE(e, t, n, i, s, r) {
  return (
      Ui(),
      Zs("nav", CE, [Q("div", wE, [Q("div", { id: "logo-cont", onClick: t[0] || (t[0] = (...o) => r.goToGisHub && r.goToGisHub(...o)), tabindex: "0" }, RE), IE]), Q("a", xE, [s.windowWidth > 670 ? (Ui(), Zs("img", OE)) : Dm("", !0)])])
  );
}
const LE = ia(bE, [
      ["render", SE],
      ["__scopeId", "data-v-93801f6d"],
  ]),
  PE = {
      data() {
          return {};
      },
  },
  th = (e) => (Pu("data-v-03cc4813"), (e = e()), Mu(), e),
  ME = th(() => Q("button", { type: "button", id: "help-btn", class: "btn esri-icon-support", "data-bs-toggle": "modal", "data-bs-target": "#helpModal", "aria-label": "Help" }, null, -1)),
  NE = th(() =>
      Q(
          "div",
          { id: "helpModal", class: "modal fade", tabindex: "-1", role: "dialog", "aria-labelledby": "helpModalLabel", "aria-hidden": "true", "data-bs-backdrop": "false" },
          [
              Q("div", { class: "modal-dialog modal-lg", role: "document" }, [
                  Q("div", { class: "modal-content" }, [
                      Q("div", { class: "modal-header" }, [
                          Q("h5", { id: "helpModalLabel", class: "modal-title" }, "Contact"),
                          Q("button", { type: "button", class: "close", "data-bs-dismiss": "modal", "aria-label": "Close" }, [Q("span", { "aria-hidden": "true" }, "×")]),
                      ]),
                      Q("div", { class: "modal-body", style: { "text-align": "left" } }, [
                          Q("p", null, "Please contact the Office of GIS if you are experiencing any issues or have questions about the Dakota County Oblique Air Photo Viewer."),
                          Q("ul", { class: "list-group list-group-flush" }, [
                              Q("li", { class: "list-group-item contact-li font-weight-bold" }, "Dakota County GIS"),
                              Q("li", { class: "list-group-item contact-li" }, [yo(" Email: "), Q("a", { href: "mailto:gis@co.dakota.mn.us" }, "gis@co.dakota.mn.us")]),
                              Q("li", { class: "list-group-item contact-li" }, [yo(" Web: "), Q("a", { href: "https://gis-hennepin.hub.arcgis.com/", target: "_blank" }, "Hennepin GIS Public Portal")]),
                          ]),
                      ]),
                      Q("div", { class: "modal-footer" }, [Q("button", { type: "button", class: "btn btn-secondary", "data-bs-dismiss": "modal" }, "Close")]),
                  ]),
              ]),
          ],
          -1
      )
  ),
  DE = [ME, NE];
function FE(e, t, n, i, s, r) {
  return Ui(), Zs("div", null, DE);
}
const kE = ia(PE, [
      ["render", FE],
      ["__scopeId", "data-v-03cc4813"],
  ]),
  St = { DEMO_API_KEY: "NzU2YzM2NWQtMWQwOC00OWU3LWJjZDctYjRkNTg2MzllODZh", CENTER: [-93.25, 45], MIN_ZOOM: 0, MAX_ZOOM: 24, ZOOM: 13, EXTENT: [-94.1, 44.75, -93, 45.3], SINCE: "", UNTIL: "" },
  Yi = {
      degreesToRadians(e) {
          return e * (Math.PI / 180);
      },
      radiansToDegrees(e) {
          return e / (Math.PI / 180);
      },
      modulus360(e) {
          return e < 0 ? 360 + (e % 360) : e % 360;
      },
  },
  Hi = { radians: 6370997 / (2 * Math.PI), degrees: (2 * Math.PI * 6370997) / 360, ft: 0.3048, m: 1, "us-ft": 1200 / 3937 };
class sa {
  constructor(t) {
      (this.code_ = t.code),
          (this.units_ = t.units),
          (this.extent_ = t.extent !== void 0 ? t.extent : null),
          (this.worldExtent_ = t.worldExtent !== void 0 ? t.worldExtent : null),
          (this.axisOrientation_ = t.axisOrientation !== void 0 ? t.axisOrientation : "enu"),
          (this.global_ = t.global !== void 0 ? t.global : !1),
          (this.canWrapX_ = !!(this.global_ && this.extent_)),
          (this.getPointResolutionFunc_ = t.getPointResolution),
          (this.defaultTileGrid_ = null),
          (this.metersPerUnit_ = t.metersPerUnit);
  }
  canWrapX() {
      return this.canWrapX_;
  }
  getCode() {
      return this.code_;
  }
  getExtent() {
      return this.extent_;
  }
  getUnits() {
      return this.units_;
  }
  getMetersPerUnit() {
      return this.metersPerUnit_ || Hi[this.units_];
  }
  getWorldExtent() {
      return this.worldExtent_;
  }
  getAxisOrientation() {
      return this.axisOrientation_;
  }
  isGlobal() {
      return this.global_;
  }
  setGlobal(t) {
      (this.global_ = t), (this.canWrapX_ = !!(t && this.extent_));
  }
  getDefaultTileGrid() {
      return this.defaultTileGrid_;
  }
  setDefaultTileGrid(t) {
      this.defaultTileGrid_ = t;
  }
  setExtent(t) {
      (this.extent_ = t), (this.canWrapX_ = !!(this.global_ && t));
  }
  setWorldExtent(t) {
      this.worldExtent_ = t;
  }
  setGetPointResolution(t) {
      this.getPointResolutionFunc_ = t;
  }
  getPointResolutionFunc() {
      return this.getPointResolutionFunc_;
  }
}
const Ji = 6378137,
  ii = Math.PI * Ji,
  $E = [-ii, -ii, ii, ii],
  VE = [-180, -85, 180, 85],
  Is = Ji * Math.log(Math.tan(Math.PI / 2));
class Hn extends sa {
  constructor(t) {
      super({
          code: t,
          units: "m",
          extent: $E,
          global: !0,
          worldExtent: VE,
          getPointResolution: function (n, i) {
              return n / Math.cosh(i[1] / Ji);
          },
      });
  }
}
const cc = [new Hn("EPSG:3857"), new Hn("EPSG:102100"), new Hn("EPSG:102113"), new Hn("EPSG:900913"), new Hn("http://www.opengis.net/def/crs/EPSG/0/3857"), new Hn("http://www.opengis.net/gml/srs/epsg.xml#3857")];
function jE(e, t, n) {
  const i = e.length;
  (n = n > 1 ? n : 2), t === void 0 && (n > 2 ? (t = e.slice()) : (t = new Array(i)));
  for (let s = 0; s < i; s += n) {
      t[s] = (ii * e[s]) / 180;
      let r = Ji * Math.log(Math.tan((Math.PI * (+e[s + 1] + 90)) / 360));
      r > Is ? (r = Is) : r < -Is && (r = -Is), (t[s + 1] = r);
  }
  return t;
}
function KE(e, t, n) {
  const i = e.length;
  (n = n > 1 ? n : 2), t === void 0 && (n > 2 ? (t = e.slice()) : (t = new Array(i)));
  for (let s = 0; s < i; s += n) (t[s] = (180 * e[s]) / ii), (t[s + 1] = (360 * Math.atan(Math.exp(e[s + 1] / Ji))) / Math.PI - 90);
  return t;
}
const GE = 6378137,
  uc = [-180, -90, 180, 90],
  UE = (Math.PI * GE) / 180;
class vn extends sa {
  constructor(t, n) {
      super({ code: t, units: "degrees", extent: uc, axisOrientation: n, global: !0, metersPerUnit: UE, worldExtent: uc });
  }
}
const hc = [
  new vn("CRS:84"),
  new vn("EPSG:4326", "neu"),
  new vn("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new vn("urn:ogc:def:crs:OGC:2:84"),
  new vn("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new vn("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new vn("http://www.opengis.net/def/crs/EPSG/0/4326", "neu"),
];
let bo = {};
function zE(e) {
  return bo[e] || bo[e.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] || null;
}
function YE(e, t) {
  bo[e] = t;
}
function pr(e) {
  for (const t in e) delete e[t];
}
function HE(e) {
  let t;
  for (t in e) return !1;
  return !t;
}
let li = {};
function gi(e, t, n) {
  const i = e.getCode(),
      s = t.getCode();
  i in li || (li[i] = {}), (li[i][s] = n);
}
function WE(e, t) {
  let n;
  return e in li && t in li[e] && (n = li[e][t]), n;
}
const jt = { UNKNOWN: 0, INTERSECTING: 1, ABOVE: 2, RIGHT: 4, BELOW: 8, LEFT: 16 };
function dc(e) {
  const t = Dn();
  for (let n = 0, i = e.length; n < i; ++n) Gs(t, e[n]);
  return t;
}
function XE(e, t, n) {
  const i = Math.min.apply(null, e),
      s = Math.min.apply(null, t),
      r = Math.max.apply(null, e),
      o = Math.max.apply(null, t);
  return bi(i, s, r, o, n);
}
function ZE(e, t) {
  return t ? ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t) : e.slice();
}
function eh(e, t, n) {
  let i, s;
  return t < e[0] ? (i = e[0] - t) : e[2] < t ? (i = t - e[2]) : (i = 0), n < e[1] ? (s = e[1] - n) : e[3] < n ? (s = n - e[3]) : (s = 0), i * i + s * s;
}
function ra(e, t) {
  return nh(e, t[0], t[1]);
}
function BE(e, t) {
  return e[0] <= t[0] && t[2] <= e[2] && e[1] <= t[1] && t[3] <= e[3];
}
function nh(e, t, n) {
  return e[0] <= t && t <= e[2] && e[1] <= n && n <= e[3];
}
function fc(e, t) {
  const n = e[0],
      i = e[1],
      s = e[2],
      r = e[3],
      o = t[0],
      a = t[1];
  let c = jt.UNKNOWN;
  return o < n ? (c = c | jt.LEFT) : o > s && (c = c | jt.RIGHT), a < i ? (c = c | jt.BELOW) : a > r && (c = c | jt.ABOVE), c === jt.UNKNOWN && (c = jt.INTERSECTING), c;
}
function Dn() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
}
function bi(e, t, n, i, s) {
  return s ? ((s[0] = e), (s[1] = t), (s[2] = n), (s[3] = i), s) : [e, t, n, i];
}
function ts(e) {
  return bi(1 / 0, 1 / 0, -1 / 0, -1 / 0, e);
}
function qE(e, t) {
  const n = e[0],
      i = e[1];
  return bi(n, i, n, i, t);
}
function QE(e, t, n, i, s) {
  const r = ts(s);
  return ih(r, e, t, n, i);
}
function Co(e, t) {
  return e[0] == t[0] && e[2] == t[2] && e[1] == t[1] && e[3] == t[3];
}
function JE(e, t) {
  return t[0] < e[0] && (e[0] = t[0]), t[2] > e[2] && (e[2] = t[2]), t[1] < e[1] && (e[1] = t[1]), t[3] > e[3] && (e[3] = t[3]), e;
}
function Gs(e, t) {
  t[0] < e[0] && (e[0] = t[0]), t[0] > e[2] && (e[2] = t[0]), t[1] < e[1] && (e[1] = t[1]), t[1] > e[3] && (e[3] = t[1]);
}
function ih(e, t, n, i, s) {
  for (; n < i; n += s) ty(e, t[n], t[n + 1]);
  return e;
}
function ty(e, t, n) {
  (e[0] = Math.min(e[0], t)), (e[1] = Math.min(e[1], n)), (e[2] = Math.max(e[2], t)), (e[3] = Math.max(e[3], n));
}
function sh(e, t) {
  let n;
  return (n = t(mr(e))), n || ((n = t(Er(e))), n) || ((n = t(yr(e))), n) || ((n = t(Fn(e))), n) ? n : !1;
}
function wo(e) {
  let t = 0;
  return ns(e) || (t = Ft(e) * we(e)), t;
}
function mr(e) {
  return [e[0], e[1]];
}
function Er(e) {
  return [e[2], e[1]];
}
function Wi(e) {
  return [(e[0] + e[2]) / 2, (e[1] + e[3]) / 2];
}
function ey(e, t) {
  let n;
  if (t === "bottom-left") n = mr(e);
  else if (t === "bottom-right") n = Er(e);
  else if (t === "top-left") n = Fn(e);
  else if (t === "top-right") n = yr(e);
  else throw new Error("Invalid corner");
  return n;
}
function Ao(e, t, n, i, s) {
  const [r, o, a, c, u, h, f, g] = Ro(e, t, n, i);
  return bi(Math.min(r, a, u, f), Math.min(o, c, h, g), Math.max(r, a, u, f), Math.max(o, c, h, g), s);
}
function Ro(e, t, n, i) {
  const s = (t * i[0]) / 2,
      r = (t * i[1]) / 2,
      o = Math.cos(n),
      a = Math.sin(n),
      c = s * o,
      u = s * a,
      h = r * o,
      f = r * a,
      g = e[0],
      _ = e[1];
  return [g - c + f, _ - u - h, g - c - f, _ - u + h, g + c - f, _ + u + h, g + c + f, _ + u - h, g - c + f, _ - u - h];
}
function we(e) {
  return e[3] - e[1];
}
function ki(e, t, n) {
  const i = n || Dn();
  return es(e, t) ? (e[0] > t[0] ? (i[0] = e[0]) : (i[0] = t[0]), e[1] > t[1] ? (i[1] = e[1]) : (i[1] = t[1]), e[2] < t[2] ? (i[2] = e[2]) : (i[2] = t[2]), e[3] < t[3] ? (i[3] = e[3]) : (i[3] = t[3])) : ts(i), i;
}
function Fn(e) {
  return [e[0], e[3]];
}
function yr(e) {
  return [e[2], e[3]];
}
function Ft(e) {
  return e[2] - e[0];
}
function es(e, t) {
  return e[0] <= t[2] && e[2] >= t[0] && e[1] <= t[3] && e[3] >= t[1];
}
function ns(e) {
  return e[2] < e[0] || e[3] < e[1];
}
function ny(e, t) {
  return t ? ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t) : e;
}
function iy(e, t, n) {
  let i = !1;
  const s = fc(e, t),
      r = fc(e, n);
  if (s === jt.INTERSECTING || r === jt.INTERSECTING) i = !0;
  else {
      const o = e[0],
          a = e[1],
          c = e[2],
          u = e[3],
          h = t[0],
          f = t[1],
          g = n[0],
          _ = n[1],
          T = (_ - f) / (g - h);
      let v, b;
      r & jt.ABOVE && !(s & jt.ABOVE) && ((v = g - (_ - u) / T), (i = v >= o && v <= c)),
          !i && r & jt.RIGHT && !(s & jt.RIGHT) && ((b = _ - (g - c) * T), (i = b >= a && b <= u)),
          !i && r & jt.BELOW && !(s & jt.BELOW) && ((v = g - (_ - a) / T), (i = v >= o && v <= c)),
          !i && r & jt.LEFT && !(s & jt.LEFT) && ((b = _ - (g - o) * T), (i = b >= a && b <= u));
  }
  return i;
}
function sy(e, t, n, i) {
  if (ns(e)) return ts(n);
  let s = [];
  if (i > 1) {
      const a = e[2] - e[0],
          c = e[3] - e[1];
      for (let u = 0; u < i; ++u) s.push(e[0] + (a * u) / i, e[1], e[2], e[1] + (c * u) / i, e[2] - (a * u) / i, e[3], e[0], e[3] - (c * u) / i);
  } else s = [e[0], e[1], e[2], e[1], e[2], e[3], e[0], e[3]];
  t(s, s, 2);
  const r = [],
      o = [];
  for (let a = 0, c = s.length; a < c; a += 2) r.push(s[a]), o.push(s[a + 1]);
  return XE(r, o, n);
}
function Vt(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function ry(e, t, n, i, s, r) {
  const o = s - n,
      a = r - i;
  if (o !== 0 || a !== 0) {
      const c = ((e - n) * o + (t - i) * a) / (o * o + a * a);
      c > 1 ? ((n = s), (i = r)) : c > 0 && ((n += o * c), (i += a * c));
  }
  return ci(e, t, n, i);
}
function ci(e, t, n, i) {
  const s = n - e,
      r = i - t;
  return s * s + r * r;
}
function oy(e) {
  const t = e.length;
  for (let i = 0; i < t; i++) {
      let s = i,
          r = Math.abs(e[i][i]);
      for (let a = i + 1; a < t; a++) {
          const c = Math.abs(e[a][i]);
          c > r && ((r = c), (s = a));
      }
      if (r === 0) return null;
      const o = e[s];
      (e[s] = e[i]), (e[i] = o);
      for (let a = i + 1; a < t; a++) {
          const c = -e[a][i] / e[i][i];
          for (let u = i; u < t + 1; u++) i == u ? (e[a][u] = 0) : (e[a][u] += c * e[i][u]);
      }
  }
  const n = new Array(t);
  for (let i = t - 1; i >= 0; i--) {
      n[i] = e[i][t] / e[i][i];
      for (let s = i - 1; s >= 0; s--) e[s][t] -= e[s][i] * n[i];
  }
  return n;
}
function Us(e) {
  return (e * Math.PI) / 180;
}
function In(e, t) {
  const n = e % t;
  return n * t < 0 ? n + t : n;
}
function ay(e, t, n) {
  return e + n * (t - e);
}
function rh(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
function xs(e, t) {
  return Math.floor(rh(e, t));
}
function Os(e, t) {
  return Math.ceil(rh(e, t));
}
function ly(e, t) {
  return (e[0] += +t[0]), (e[1] += +t[1]), e;
}
function Bs(e, t) {
  let n = !0;
  for (let i = e.length - 1; i >= 0; --i)
      if (e[i] != t[i]) {
          n = !1;
          break;
      }
  return n;
}
function oa(e, t) {
  const n = Math.cos(t),
      i = Math.sin(t),
      s = e[0] * n - e[1] * i,
      r = e[1] * n + e[0] * i;
  return (e[0] = s), (e[1] = r), e;
}
function cy(e, t) {
  return (e[0] *= t), (e[1] *= t), e;
}
function uy(e, t) {
  if (t.canWrapX()) {
      const n = Ft(t.getExtent()),
          i = hy(e, t, n);
      i && (e[0] -= i * n);
  }
  return e;
}
function hy(e, t, n) {
  const i = t.getExtent();
  let s = 0;
  return t.canWrapX() && (e[0] < i[0] || e[0] > i[2]) && ((n = n || Ft(i)), (s = Math.floor((e[0] - i[0]) / n))), s;
}
const dy = 63710088e-1;
function gc(e, t, n) {
  n = n || dy;
  const i = Us(e[1]),
      s = Us(t[1]),
      r = (s - i) / 2,
      o = Us(t[0] - e[0]) / 2,
      a = Math.sin(r) * Math.sin(r) + Math.sin(o) * Math.sin(o) * Math.cos(i) * Math.cos(s);
  return 2 * n * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function oh(...e) {
  console.warn(...e);
}
let Io = !0;
function ah(e) {
  Io = !(e === void 0 ? !0 : e);
}
function aa(e, t) {
  if (t !== void 0) {
      for (let n = 0, i = e.length; n < i; ++n) t[n] = e[n];
      t = t;
  } else t = e.slice();
  return t;
}
function lh(e, t) {
  if (t !== void 0 && e !== t) {
      for (let n = 0, i = e.length; n < i; ++n) t[n] = e[n];
      e = t;
  }
  return e;
}
function ch(e) {
  YE(e.getCode(), e), gi(e, e, aa);
}
function fy(e) {
  e.forEach(ch);
}
function kt(e) {
  return typeof e == "string" ? zE(e) : e || null;
}
function _c(e, t, n, i) {
  e = kt(e);
  let s;
  const r = e.getPointResolutionFunc();
  if (r) {
      if (((s = r(t, n)), i && i !== e.getUnits())) {
          const o = e.getMetersPerUnit();
          o && (s = (s * o) / Hi[i]);
      }
  } else {
      const o = e.getUnits();
      if ((o == "degrees" && !i) || i == "degrees") s = t;
      else {
          const a = ca(e, kt("EPSG:4326"));
          if (a === lh && o !== "degrees") s = t * e.getMetersPerUnit();
          else {
              let u = [n[0] - t / 2, n[1], n[0] + t / 2, n[1], n[0], n[1] - t / 2, n[0], n[1] + t / 2];
              u = a(u, u, 2);
              const h = gc(u.slice(0, 2), u.slice(2, 4)),
                  f = gc(u.slice(4, 6), u.slice(6, 8));
              s = (h + f) / 2;
          }
          const c = i ? Hi[i] : e.getMetersPerUnit();
          c !== void 0 && (s /= c);
      }
  }
  return s;
}
function pc(e) {
  fy(e),
      e.forEach(function (t) {
          e.forEach(function (n) {
              t !== n && gi(t, n, aa);
          });
      });
}
function gy(e, t, n, i) {
  e.forEach(function (s) {
      t.forEach(function (r) {
          gi(s, r, n), gi(r, s, i);
      });
  });
}
function la(e, t) {
  return e ? (typeof e == "string" ? kt(e) : e) : kt(t);
}
function mc(e) {
  return function (t, n, i) {
      const s = t.length;
      (i = i !== void 0 ? i : 2), (n = n !== void 0 ? n : new Array(s));
      for (let r = 0; r < s; r += i) {
          const o = e(t.slice(r, r + i)),
              a = o.length;
          for (let c = 0, u = i; c < u; ++c) n[r + c] = c >= a ? t[r + c] : o[c];
      }
      return n;
  };
}
function _y(e, t, n, i) {
  const s = kt(e),
      r = kt(t);
  gi(s, r, mc(n)), gi(r, s, mc(i));
}
function py(e, t) {
  return ah(), ua(e, "EPSG:4326", t !== void 0 ? t : "EPSG:3857");
}
function my(e, t) {
  const n = ua(e, t !== void 0 ? t : "EPSG:3857", "EPSG:4326"),
      i = n[0];
  return (i < -180 || i > 180) && (n[0] = In(i + 180, 360) - 180), n;
}
function Qn(e, t) {
  if (e === t) return !0;
  const n = e.getUnits() === t.getUnits();
  return (e.getCode() === t.getCode() || ca(e, t) === aa) && n;
}
function ca(e, t) {
  const n = e.getCode(),
      i = t.getCode();
  let s = WE(n, i);
  return s || (s = lh), s;
}
function Xi(e, t) {
  const n = kt(e),
      i = kt(t);
  return ca(n, i);
}
function ua(e, t, n) {
  return Xi(t, n)(e, void 0, e.length);
}
function Ec(e, t, n, i) {
  const s = Xi(t, n);
  return sy(e, s, void 0, i);
}
function xo(e, t) {
  return e;
}
function $e(e, t) {
  return Io && !Bs(e, [0, 0]) && e[0] >= -180 && e[0] <= 180 && e[1] >= -90 && e[1] <= 90 && ((Io = !1), oh("Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.")), e;
}
function Ey(e, t) {
  return e;
}
function si(e, t) {
  return e;
}
function yy() {
  pc(cc), pc(hc), gy(hc, cc, jE, KE);
}
yy();
const vy = 0,
  Ty = 0,
  by = 90,
  Cy = 180,
  wy = 270;
function ha(e, t, n) {
  const i = new sa({ code: e, extent: [0, 0, t, n], worldExtent: [-180, -85, 180, 85], units: "pixels" });
  ch(i);
  const s = t / 2,
      r = n / 2,
      o = t / 360,
      a = n / (2 * Math.PI);
  _y(
      "EPSG:4326",
      i,
      function (c) {
          const u = c[0],
              h = c[1],
              f = s + u * o,
              g = Yi.degreesToRadians(h),
              _ = Math.tan(g),
              T = 1 / Math.cos(g),
              v = Math.log(_ + T),
              b = r + v * a;
          return [f, b];
      },
      function (c) {
          const u = c[0],
              h = c[1],
              f = (u - s) / o,
              g = (h - r) / -a,
              _ = -Yi.radiansToDegrees(2 * Math.atan(Math.exp(g)) - Math.PI / 2);
          return [f, _];
      }
  );
}
ha("NMV:000", 256, 256);
ha("NMO:NS", 256, 192);
ha("NMO:EW", 192, 256);
kt("EPSG:4326");
const Ay = kt("NMV:000"),
  yc = kt("NMO:NS"),
  vc = kt("NMO:EW"),
  Se = { PROJECTIONS: { North: yc, East: vc, South: yc, West: vc, Vert: Ay }, HEADINGS: { Vert: vy, North: Ty, East: by, South: Cy, West: wy } },
  Tc = {
      fetchImageData(e) {
          return fetch(e, { redirect: "manual" })
              .then(function (t) {
                  return t.status === 200
                      ? t.blob().then(function (n) {
                            return window.URL.createObjectURL(n);
                        })
                      : null;
              })
              .catch(function (t) {
                  return null;
              });
      },
      loadImage(e) {
          return new Promise(function (t) {
              const n = document.createElement("img");
              n.addEventListener("load", function () {
                  t(n);
              }),
                  n.addEventListener("error", function () {
                      t(n);
                  }),
                  (n.src = e);
          });
      },
      rotateImage(e, t, n, i, s) {
          const r = Yi.degreesToRadians(s);
          switch ((e.save(), e.translate(n / 2, i / 2), e.rotate(r), s)) {
              case Se.HEADINGS.North:
              case Se.HEADINGS.South:
                  e.drawImage(t, -n / 2, -i / 2, n, i);
                  break;
              case Se.HEADINGS.East:
              case Se.HEADINGS.West:
                  e.drawImage(t, -i / 2, -n / 2, i, n);
                  break;
          }
          e.restore();
      },
      createCanvas(e, t) {
          const n = document.createElement("canvas");
          return (n.width = e), (n.height = t), [n, n.getContext("2d")];
      },
      rotateTile(e, t, n) {
          let i = this;
          const s = t[0],
              r = t[1],
              o = this.createCanvas(s, r),
              a = o[0],
              c = o[1];
          return i.loadImage(e).then(function (u) {
              return i.rotateImage(c, u, s, r, n), a.toDataURL();
          });
      },
  };
class ln {
  constructor(t) {
      this.propagationStopped, this.defaultPrevented, (this.type = t), (this.target = null);
  }
  preventDefault() {
      this.defaultPrevented = !0;
  }
  stopPropagation() {
      this.propagationStopped = !0;
  }
}
const Zi = { PROPERTYCHANGE: "propertychange" };
class da {
  constructor() {
      this.disposed = !1;
  }
  dispose() {
      this.disposed || ((this.disposed = !0), this.disposeInternal());
  }
  disposeInternal() {}
}
function fa(e, t) {
  return e > t ? 1 : e < t ? -1 : 0;
}
function ga(e, t, n) {
  if (e[0] <= t) return 0;
  const i = e.length;
  if (t <= e[i - 1]) return i - 1;
  if (typeof n == "function") {
      for (let s = 1; s < i; ++s) {
          const r = e[s];
          if (r === t) return s;
          if (r < t) return n(t, e[s - 1], r) > 0 ? s - 1 : s;
      }
      return i - 1;
  }
  if (n > 0) {
      for (let s = 1; s < i; ++s) if (e[s] < t) return s - 1;
      return i - 1;
  }
  if (n < 0) {
      for (let s = 1; s < i; ++s) if (e[s] <= t) return s;
      return i - 1;
  }
  for (let s = 1; s < i; ++s) {
      if (e[s] == t) return s;
      if (e[s] < t) return e[s - 1] - t < t - e[s] ? s - 1 : s;
  }
  return i - 1;
}
function Ry(e, t) {
  const n = Array.isArray(t) ? t : [t],
      i = n.length;
  for (let s = 0; s < i; s++) e[e.length] = n[s];
}
function vr(e, t) {
  const n = e.length;
  if (n !== t.length) return !1;
  for (let i = 0; i < n; i++) if (e[i] !== t[i]) return !1;
  return !0;
}
function Iy(e, t, n) {
  const i = t || fa;
  return e.every(function (s, r) {
      if (r === 0) return !0;
      const o = i(e[r - 1], s);
      return !(o > 0 || (n && o === 0));
  });
}
function qs() {
  return !0;
}
function Tr() {
  return !1;
}
function Qs() {}
function xy(e) {
  let t = !1,
      n,
      i,
      s;
  return function () {
      const r = Array.prototype.slice.call(arguments);
      return (!t || this !== s || !vr(r, i)) && ((t = !0), (s = this), (i = r), (n = e.apply(this, arguments))), n;
  };
}
class _a extends da {
  constructor(t) {
      super(), (this.eventTarget_ = t), (this.pendingRemovals_ = null), (this.dispatching_ = null), (this.listeners_ = null);
  }
  addEventListener(t, n) {
      if (!t || !n) return;
      const i = this.listeners_ || (this.listeners_ = {}),
          s = i[t] || (i[t] = []);
      s.includes(n) || s.push(n);
  }
  dispatchEvent(t) {
      const n = typeof t == "string",
          i = n ? t : t.type,
          s = this.listeners_ && this.listeners_[i];
      if (!s) return;
      const r = n ? new ln(t) : t;
      r.target || (r.target = this.eventTarget_ || this);
      const o = this.dispatching_ || (this.dispatching_ = {}),
          a = this.pendingRemovals_ || (this.pendingRemovals_ = {});
      i in o || ((o[i] = 0), (a[i] = 0)), ++o[i];
      let c;
      for (let u = 0, h = s.length; u < h; ++u)
          if (("handleEvent" in s[u] ? (c = s[u].handleEvent(r)) : (c = s[u].call(this, r)), c === !1 || r.propagationStopped)) {
              c = !1;
              break;
          }
      if (--o[i] === 0) {
          let u = a[i];
          for (delete a[i]; u--; ) this.removeEventListener(i, Qs);
          delete o[i];
      }
      return c;
  }
  disposeInternal() {
      this.listeners_ && pr(this.listeners_);
  }
  getListeners(t) {
      return (this.listeners_ && this.listeners_[t]) || void 0;
  }
  hasListener(t) {
      return this.listeners_ ? (t ? t in this.listeners_ : Object.keys(this.listeners_).length > 0) : !1;
  }
  removeEventListener(t, n) {
      if (!this.listeners_) return;
      const i = this.listeners_[t];
      if (!i) return;
      const s = i.indexOf(n);
      s !== -1 && (this.pendingRemovals_ && t in this.pendingRemovals_ ? ((i[s] = Qs), ++this.pendingRemovals_[t]) : (i.splice(s, 1), i.length === 0 && delete this.listeners_[t]));
  }
}
const at = {
  CHANGE: "change",
  ERROR: "error",
  BLUR: "blur",
  CLEAR: "clear",
  CONTEXTMENU: "contextmenu",
  CLICK: "click",
  DBLCLICK: "dblclick",
  DRAGENTER: "dragenter",
  DRAGOVER: "dragover",
  DROP: "drop",
  FOCUS: "focus",
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  LOAD: "load",
  RESIZE: "resize",
  TOUCHMOVE: "touchmove",
  WHEEL: "wheel",
};
function _t(e, t, n, i, s) {
  if ((i && i !== e && (n = n.bind(i)), s)) {
      const o = n;
      n = function () {
          e.removeEventListener(t, n), o.apply(this, arguments);
      };
  }
  const r = { target: e, type: t, listener: n };
  return e.addEventListener(t, n), r;
}
function Js(e, t, n, i) {
  return _t(e, t, n, i, !0);
}
function Lt(e) {
  e && e.target && (e.target.removeEventListener(e.type, e.listener), pr(e));
}
class is extends _a {
  constructor() {
      super(), (this.on = this.onInternal), (this.once = this.onceInternal), (this.un = this.unInternal), (this.revision_ = 0);
  }
  changed() {
      ++this.revision_, this.dispatchEvent(at.CHANGE);
  }
  getRevision() {
      return this.revision_;
  }
  onInternal(t, n) {
      if (Array.isArray(t)) {
          const i = t.length,
              s = new Array(i);
          for (let r = 0; r < i; ++r) s[r] = _t(this, t[r], n);
          return s;
      }
      return _t(this, t, n);
  }
  onceInternal(t, n) {
      let i;
      if (Array.isArray(t)) {
          const s = t.length;
          i = new Array(s);
          for (let r = 0; r < s; ++r) i[r] = Js(this, t[r], n);
      } else i = Js(this, t, n);
      return (n.ol_key = i), i;
  }
  unInternal(t, n) {
      const i = n.ol_key;
      if (i) Oy(i);
      else if (Array.isArray(t)) for (let s = 0, r = t.length; s < r; ++s) this.removeEventListener(t[s], n);
      else this.removeEventListener(t, n);
  }
}
is.prototype.on;
is.prototype.once;
is.prototype.un;
function Oy(e) {
  if (Array.isArray(e)) for (let t = 0, n = e.length; t < n; ++t) Lt(e[t]);
  else Lt(e);
}
function It() {
  throw new Error("Unimplemented abstract method.");
}
let Sy = 0;
function te(e) {
  return e.ol_uid || (e.ol_uid = String(++Sy));
}
class bc extends ln {
  constructor(t, n, i) {
      super(t), (this.key = n), (this.oldValue = i);
  }
}
class ze extends is {
  constructor(t) {
      super(), this.on, this.once, this.un, te(this), (this.values_ = null), t !== void 0 && this.setProperties(t);
  }
  get(t) {
      let n;
      return this.values_ && this.values_.hasOwnProperty(t) && (n = this.values_[t]), n;
  }
  getKeys() {
      return (this.values_ && Object.keys(this.values_)) || [];
  }
  getProperties() {
      return (this.values_ && Object.assign({}, this.values_)) || {};
  }
  getPropertiesInternal() {
      return this.values_;
  }
  hasProperties() {
      return !!this.values_;
  }
  notify(t, n) {
      let i;
      (i = `change:${t}`), this.hasListener(i) && this.dispatchEvent(new bc(i, t, n)), (i = Zi.PROPERTYCHANGE), this.hasListener(i) && this.dispatchEvent(new bc(i, t, n));
  }
  addChangeListener(t, n) {
      this.addEventListener(`change:${t}`, n);
  }
  removeChangeListener(t, n) {
      this.removeEventListener(`change:${t}`, n);
  }
  set(t, n, i) {
      const s = this.values_ || (this.values_ = {});
      if (i) s[t] = n;
      else {
          const r = s[t];
          (s[t] = n), r !== n && this.notify(t, r);
      }
  }
  setProperties(t, n) {
      for (const i in t) this.set(i, t[i], n);
  }
  applyProperties(t) {
      t.values_ && Object.assign(this.values_ || (this.values_ = {}), t.values_);
  }
  unset(t, n) {
      if (this.values_ && t in this.values_) {
          const i = this.values_[t];
          delete this.values_[t], HE(this.values_) && (this.values_ = null), n || this.notify(t, i);
      }
  }
}
const de = { ANIMATING: 0, INTERACTING: 1 },
  ye = { CENTER: "center", RESOLUTION: "resolution", ROTATION: "rotation" },
  Ly = 42,
  pa = 256;
function Tt(e, t) {
  if (!e) throw new Error(t);
}
function Cc(e, t, n) {
  return function (i, s, r, o, a) {
      if (!i) return;
      if (!s && !t) return i;
      const c = t ? 0 : r[0] * s,
          u = t ? 0 : r[1] * s,
          h = a ? a[0] : 0,
          f = a ? a[1] : 0;
      let g = e[0] + c / 2 + h,
          _ = e[2] - c / 2 + h,
          T = e[1] + u / 2 + f,
          v = e[3] - u / 2 + f;
      g > _ && ((g = (_ + g) / 2), (_ = g)), T > v && ((T = (v + T) / 2), (v = T));
      let b = Vt(i[0], g, _),
          x = Vt(i[1], T, v);
      if (o && n && s) {
          const R = 30 * s;
          (b += -R * Math.log(1 + Math.max(0, g - i[0]) / R) + R * Math.log(1 + Math.max(0, i[0] - _) / R)), (x += -R * Math.log(1 + Math.max(0, T - i[1]) / R) + R * Math.log(1 + Math.max(0, i[1] - v) / R));
      }
      return [b, x];
  };
}
function Py(e) {
  return e;
}
function ma(e, t, n, i) {
  const s = Ft(t) / n[0],
      r = we(t) / n[1];
  return i ? Math.min(e, Math.max(s, r)) : Math.min(e, Math.min(s, r));
}
function Ea(e, t, n) {
  let i = Math.min(e, t);
  const s = 50;
  return (i *= Math.log(1 + s * Math.max(0, e / t - 1)) / s + 1), n && ((i = Math.max(i, n)), (i /= Math.log(1 + s * Math.max(0, n / e - 1)) / s + 1)), Vt(i, n / 2, t * 2);
}
function My(e, t, n, i) {
  return (
      (t = t !== void 0 ? t : !0),
      function (s, r, o, a) {
          if (s !== void 0) {
              const c = e[0],
                  u = e[e.length - 1],
                  h = n ? ma(c, n, o, i) : c;
              if (a) return t ? Ea(s, h, u) : Vt(s, u, h);
              const f = Math.min(h, s),
                  g = Math.floor(ga(e, f, r));
              return e[g] > h && g < e.length - 1 ? e[g + 1] : e[g];
          }
      }
  );
}
function Ny(e, t, n, i, s, r) {
  return (
      (i = i !== void 0 ? i : !0),
      (n = n !== void 0 ? n : 0),
      function (o, a, c, u) {
          if (o !== void 0) {
              const h = s ? ma(t, s, c, r) : t;
              if (u) return i ? Ea(o, h, n) : Vt(o, n, h);
              const f = 1e-9,
                  g = Math.ceil(Math.log(t / h) / Math.log(e) - f),
                  _ = -a * (0.5 - f) + 0.5,
                  T = Math.min(h, o),
                  v = Math.floor(Math.log(t / T) / Math.log(e) + _),
                  b = Math.max(g, v),
                  x = t / Math.pow(e, b);
              return Vt(x, n, h);
          }
      }
  );
}
function wc(e, t, n, i, s) {
  return (
      (n = n !== void 0 ? n : !0),
      function (r, o, a, c) {
          if (r !== void 0) {
              const u = i ? ma(e, i, a, s) : e;
              return !n || !c ? Vt(r, t, u) : Ea(r, u, t);
          }
      }
  );
}
function ya(e) {
  if (e !== void 0) return 0;
}
function Ac(e) {
  if (e !== void 0) return e;
}
function Dy(e) {
  const t = (2 * Math.PI) / e;
  return function (n, i) {
      if (i) return n;
      if (n !== void 0) return (n = Math.floor(n / t + 0.5) * t), n;
  };
}
function Fy(e) {
  const t = e === void 0 ? Us(5) : e;
  return function (n, i) {
      return i || n === void 0 ? n : Math.abs(n) <= t ? 0 : n;
  };
}
function uh(e) {
  return Math.pow(e, 3);
}
function Ci(e) {
  return 1 - uh(1 - e);
}
function ky(e) {
  return 3 * e * e - 2 * e * e * e;
}
function $y(e) {
  return e;
}
const an = typeof navigator < "u" && typeof navigator.userAgent < "u" ? navigator.userAgent.toLowerCase() : "",
  Vy = an.includes("firefox"),
  jy = an.includes("safari") && !an.includes("chrom");
jy && (an.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(an));
const Ky = an.includes("webkit") && !an.includes("edge"),
  hh = an.includes("macintosh"),
  dh = typeof devicePixelRatio < "u" ? devicePixelRatio : 1,
  fh = typeof WorkerGlobalScope < "u" && typeof OffscreenCanvas < "u" && self instanceof WorkerGlobalScope,
  Gy = typeof Image < "u" && Image.prototype.decode,
  gh = (function () {
      let e = !1;
      try {
          const t = Object.defineProperty({}, "passive", {
              get: function () {
                  e = !0;
              },
          });
          window.addEventListener("_", null, t), window.removeEventListener("_", null, t);
      } catch {}
      return e;
  })();
new Array(6);
function ui() {
  return [1, 0, 0, 1, 0, 0];
}
function fe(e, t) {
  const n = t[0],
      i = t[1];
  return (t[0] = e[0] * n + e[2] * i + e[4]), (t[1] = e[1] * n + e[3] * i + e[5]), t;
}
function Bi(e, t, n, i, s, r, o, a) {
  const c = Math.sin(r),
      u = Math.cos(r);
  return (e[0] = i * u), (e[1] = s * c), (e[2] = -i * c), (e[3] = s * u), (e[4] = o * i * u - a * i * c + t), (e[5] = o * s * c + a * s * u + n), e;
}
function _h(e, t) {
  const n = Uy(t);
  Tt(n !== 0, "Transformation matrix cannot be inverted");
  const i = t[0],
      s = t[1],
      r = t[2],
      o = t[3],
      a = t[4],
      c = t[5];
  return (e[0] = o / n), (e[1] = -s / n), (e[2] = -r / n), (e[3] = i / n), (e[4] = (r * c - o * a) / n), (e[5] = -(i * c - s * a) / n), e;
}
function Uy(e) {
  return e[0] * e[3] - e[1] * e[2];
}
let Rc;
function zy(e) {
  const t = "matrix(" + e.join(", ") + ")";
  if (fh) return t;
  const n = Rc || (Rc = document.createElement("div"));
  return (n.style.transform = t), n.style.transform;
}
function Yy(e, t, n, i, s, r) {
  r = r || [];
  let o = 0;
  for (let a = t; a < n; a += i) {
      const c = e[a],
          u = e[a + 1];
      (r[o++] = s[0] * c + s[2] * u + s[4]), (r[o++] = s[1] * c + s[3] * u + s[5]);
  }
  return r && r.length != o && (r.length = o), r;
}
function Hy(e, t, n, i, s, r, o) {
  o = o || [];
  const a = Math.cos(s),
      c = Math.sin(s),
      u = r[0],
      h = r[1];
  let f = 0;
  for (let g = t; g < n; g += i) {
      const _ = e[g] - u,
          T = e[g + 1] - h;
      (o[f++] = u + _ * a - T * c), (o[f++] = h + _ * c + T * a);
      for (let v = g + 2; v < g + i; ++v) o[f++] = e[v];
  }
  return o && o.length != f && (o.length = f), o;
}
function Wy(e, t, n, i, s, r, o, a) {
  a = a || [];
  const c = o[0],
      u = o[1];
  let h = 0;
  for (let f = t; f < n; f += i) {
      const g = e[f] - c,
          _ = e[f + 1] - u;
      (a[h++] = c + s * g), (a[h++] = u + r * _);
      for (let T = f + 2; T < f + i; ++T) a[h++] = e[T];
  }
  return a && a.length != h && (a.length = h), a;
}
function Xy(e, t, n, i, s, r, o) {
  o = o || [];
  let a = 0;
  for (let c = t; c < n; c += i) {
      (o[a++] = e[c] + s), (o[a++] = e[c + 1] + r);
      for (let u = c + 2; u < c + i; ++u) o[a++] = e[u];
  }
  return o && o.length != a && (o.length = a), o;
}
const Ic = ui();
class Zy extends ze {
  constructor() {
      super(),
          (this.extent_ = Dn()),
          (this.extentRevision_ = -1),
          (this.simplifiedGeometryMaxMinSquaredTolerance = 0),
          (this.simplifiedGeometryRevision = 0),
          (this.simplifyTransformedInternal = xy((t, n, i) => {
              if (!i) return this.getSimplifiedGeometry(n);
              const s = this.clone();
              return s.applyTransform(i), s.getSimplifiedGeometry(n);
          }));
  }
  simplifyTransformed(t, n) {
      return this.simplifyTransformedInternal(this.getRevision(), t, n);
  }
  clone() {
      return It();
  }
  closestPointXY(t, n, i, s) {
      return It();
  }
  containsXY(t, n) {
      const i = this.getClosestPoint([t, n]);
      return i[0] === t && i[1] === n;
  }
  getClosestPoint(t, n) {
      return (n = n || [NaN, NaN]), this.closestPointXY(t[0], t[1], n, 1 / 0), n;
  }
  intersectsCoordinate(t) {
      return this.containsXY(t[0], t[1]);
  }
  computeExtent(t) {
      return It();
  }
  getExtent(t) {
      if (this.extentRevision_ != this.getRevision()) {
          const n = this.computeExtent(this.extent_);
          (isNaN(n[0]) || isNaN(n[1])) && ts(n), (this.extentRevision_ = this.getRevision());
      }
      return ny(this.extent_, t);
  }
  rotate(t, n) {
      It();
  }
  scale(t, n, i) {
      It();
  }
  simplify(t) {
      return this.getSimplifiedGeometry(t * t);
  }
  getSimplifiedGeometry(t) {
      return It();
  }
  getType() {
      return It();
  }
  applyTransform(t) {
      It();
  }
  intersectsExtent(t) {
      return It();
  }
  translate(t, n) {
      It();
  }
  transform(t, n) {
      const i = kt(t),
          s =
              i.getUnits() == "tile-pixels"
                  ? function (r, o, a) {
                        const c = i.getExtent(),
                            u = i.getWorldExtent(),
                            h = we(u) / we(c);
                        return Bi(Ic, u[0], u[3], h, -h, 0, 0, 0), Yy(r, 0, r.length, a, Ic, o), Xi(i, n)(r, o, a);
                    }
                  : Xi(i, n);
      return this.applyTransform(s), this;
  }
}
class va extends Zy {
  constructor() {
      super(), (this.layout = "XY"), (this.stride = 2), this.flatCoordinates;
  }
  computeExtent(t) {
      return QE(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t);
  }
  getCoordinates() {
      return It();
  }
  getFirstCoordinate() {
      return this.flatCoordinates.slice(0, this.stride);
  }
  getFlatCoordinates() {
      return this.flatCoordinates;
  }
  getLastCoordinate() {
      return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
  }
  getLayout() {
      return this.layout;
  }
  getSimplifiedGeometry(t) {
      if (
          (this.simplifiedGeometryRevision !== this.getRevision() && ((this.simplifiedGeometryMaxMinSquaredTolerance = 0), (this.simplifiedGeometryRevision = this.getRevision())),
          t < 0 || (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && t <= this.simplifiedGeometryMaxMinSquaredTolerance))
      )
          return this;
      const n = this.getSimplifiedGeometryInternal(t);
      return n.getFlatCoordinates().length < this.flatCoordinates.length ? n : ((this.simplifiedGeometryMaxMinSquaredTolerance = t), this);
  }
  getSimplifiedGeometryInternal(t) {
      return this;
  }
  getStride() {
      return this.stride;
  }
  setFlatCoordinates(t, n) {
      (this.stride = xc(t)), (this.layout = t), (this.flatCoordinates = n);
  }
  setCoordinates(t, n) {
      It();
  }
  setLayout(t, n, i) {
      let s;
      if (t) s = xc(t);
      else {
          for (let r = 0; r < i; ++r) {
              if (n.length === 0) {
                  (this.layout = "XY"), (this.stride = 2);
                  return;
              }
              n = n[0];
          }
          (s = n.length), (t = By(s));
      }
      (this.layout = t), (this.stride = s);
  }
  applyTransform(t) {
      this.flatCoordinates && (t(this.flatCoordinates, this.flatCoordinates, this.stride), this.changed());
  }
  rotate(t, n) {
      const i = this.getFlatCoordinates();
      if (i) {
          const s = this.getStride();
          Hy(i, 0, i.length, s, t, n, i), this.changed();
      }
  }
  scale(t, n, i) {
      n === void 0 && (n = t), i || (i = Wi(this.getExtent()));
      const s = this.getFlatCoordinates();
      if (s) {
          const r = this.getStride();
          Wy(s, 0, s.length, r, t, n, i, s), this.changed();
      }
  }
  translate(t, n) {
      const i = this.getFlatCoordinates();
      if (i) {
          const s = this.getStride();
          Xy(i, 0, i.length, s, t, n, i), this.changed();
      }
  }
}
function By(e) {
  let t;
  return e == 2 ? (t = "XY") : e == 3 ? (t = "XYZ") : e == 4 && (t = "XYZM"), t;
}
function xc(e) {
  let t;
  return e == "XY" ? (t = 2) : e == "XYZ" || e == "XYM" ? (t = 3) : e == "XYZM" && (t = 4), t;
}
function Oc(e, t, n, i, s, r, o) {
  const a = e[t],
      c = e[t + 1],
      u = e[n] - a,
      h = e[n + 1] - c;
  let f;
  if (u === 0 && h === 0) f = t;
  else {
      const g = ((s - a) * u + (r - c) * h) / (u * u + h * h);
      if (g > 1) f = n;
      else if (g > 0) {
          for (let _ = 0; _ < i; ++_) o[_] = ay(e[t + _], e[n + _], g);
          o.length = i;
          return;
      } else f = t;
  }
  for (let g = 0; g < i; ++g) o[g] = e[f + g];
  o.length = i;
}
function ph(e, t, n, i, s) {
  let r = e[t],
      o = e[t + 1];
  for (t += i; t < n; t += i) {
      const a = e[t],
          c = e[t + 1],
          u = ci(r, o, a, c);
      u > s && (s = u), (r = a), (o = c);
  }
  return s;
}
function qy(e, t, n, i, s) {
  for (let r = 0, o = n.length; r < o; ++r) {
      const a = n[r];
      (s = ph(e, t, a, i, s)), (t = a);
  }
  return s;
}
function mh(e, t, n, i, s, r, o, a, c, u, h) {
  if (t == n) return u;
  let f, g;
  if (s === 0) {
      if (((g = ci(o, a, e[t], e[t + 1])), g < u)) {
          for (f = 0; f < i; ++f) c[f] = e[t + f];
          return (c.length = i), g;
      }
      return u;
  }
  h = h || [NaN, NaN];
  let _ = t + i;
  for (; _ < n; )
      if ((Oc(e, _ - i, _, i, o, a, h), (g = ci(o, a, h[0], h[1])), g < u)) {
          for (u = g, f = 0; f < i; ++f) c[f] = h[f];
          (c.length = i), (_ += i);
      } else _ += i * Math.max(((Math.sqrt(g) - Math.sqrt(u)) / s) | 0, 1);
  if (r && (Oc(e, n - i, t, i, o, a, h), (g = ci(o, a, h[0], h[1])), g < u)) {
      for (u = g, f = 0; f < i; ++f) c[f] = h[f];
      c.length = i;
  }
  return u;
}
function Qy(e, t, n, i, s, r, o, a, c, u, h) {
  h = h || [NaN, NaN];
  for (let f = 0, g = n.length; f < g; ++f) {
      const _ = n[f];
      (u = mh(e, t, _, i, s, r, o, a, c, u, h)), (t = _);
  }
  return u;
}
function Jy(e, t, n, i) {
  for (let s = 0, r = n.length; s < r; ++s) e[t++] = n[s];
  return t;
}
function Eh(e, t, n, i) {
  for (let s = 0, r = n.length; s < r; ++s) {
      const o = n[s];
      for (let a = 0; a < i; ++a) e[t++] = o[a];
  }
  return t;
}
function t0(e, t, n, i, s) {
  s = s || [];
  let r = 0;
  for (let o = 0, a = n.length; o < a; ++o) {
      const c = Eh(e, t, n[o], i);
      (s[r++] = c), (t = c);
  }
  return (s.length = r), s;
}
function e0(e, t, n, i, s, r, o) {
  const a = (n - t) / i;
  if (a < 3) {
      for (; t < n; t += i) (r[o++] = e[t]), (r[o++] = e[t + 1]);
      return o;
  }
  const c = new Array(a);
  (c[0] = 1), (c[a - 1] = 1);
  const u = [t, n - i];
  let h = 0;
  for (; u.length > 0; ) {
      const f = u.pop(),
          g = u.pop();
      let _ = 0;
      const T = e[g],
          v = e[g + 1],
          b = e[f],
          x = e[f + 1];
      for (let R = g + i; R < f; R += i) {
          const M = e[R],
              I = e[R + 1],
              w = ry(M, I, T, v, b, x);
          w > _ && ((h = R), (_ = w));
      }
      _ > s && ((c[(h - t) / i] = 1), g + i < h && u.push(g, h), h + i < f && u.push(h, f));
  }
  for (let f = 0; f < a; ++f) c[f] && ((r[o++] = e[t + f * i]), (r[o++] = e[t + f * i + 1]));
  return o;
}
function Wn(e, t) {
  return t * Math.round(e / t);
}
function n0(e, t, n, i, s, r, o) {
  if (t == n) return o;
  let a = Wn(e[t], s),
      c = Wn(e[t + 1], s);
  (t += i), (r[o++] = a), (r[o++] = c);
  let u, h;
  do if (((u = Wn(e[t], s)), (h = Wn(e[t + 1], s)), (t += i), t == n)) return (r[o++] = u), (r[o++] = h), o;
  while (u == a && h == c);
  for (; t < n; ) {
      const f = Wn(e[t], s),
          g = Wn(e[t + 1], s);
      if (((t += i), f == u && g == h)) continue;
      const _ = u - a,
          T = h - c,
          v = f - a,
          b = g - c;
      if (_ * b == T * v && ((_ < 0 && v < _) || _ == v || (_ > 0 && v > _)) && ((T < 0 && b < T) || T == b || (T > 0 && b > T))) {
          (u = f), (h = g);
          continue;
      }
      (r[o++] = u), (r[o++] = h), (a = u), (c = h), (u = f), (h = g);
  }
  return (r[o++] = u), (r[o++] = h), o;
}
function i0(e, t, n, i, s, r, o, a) {
  for (let c = 0, u = n.length; c < u; ++c) {
      const h = n[c];
      (o = n0(e, t, h, i, s, r, o)), a.push(o), (t = h);
  }
  return o;
}
function yh(e, t, n, i, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = t; o < n; o += i) s[r++] = e.slice(o, o + i);
  return (s.length = r), s;
}
function s0(e, t, n, i, s) {
  s = s !== void 0 ? s : [];
  let r = 0;
  for (let o = 0, a = n.length; o < a; ++o) {
      const c = n[o];
      (s[r++] = yh(e, t, c, i, s[r])), (t = c);
  }
  return (s.length = r), s;
}
function vh(e, t, n, i) {
  let s = 0,
      r = e[n - i],
      o = e[n - i + 1];
  for (; t < n; t += i) {
      const a = e[t],
          c = e[t + 1];
      (s += o * a - r * c), (r = a), (o = c);
  }
  return s / 2;
}
function r0(e, t, n, i) {
  let s = 0;
  for (let r = 0, o = n.length; r < o; ++r) {
      const a = n[r];
      (s += vh(e, t, a, i)), (t = a);
  }
  return s;
}
class qi extends va {
  constructor(t, n) {
      super(), (this.maxDelta_ = -1), (this.maxDeltaRevision_ = -1), n !== void 0 && !Array.isArray(t[0]) ? this.setFlatCoordinates(n, t) : this.setCoordinates(t, n);
  }
  clone() {
      return new qi(this.flatCoordinates.slice(), this.layout);
  }
  closestPointXY(t, n, i, s) {
      return s < eh(this.getExtent(), t, n)
          ? s
          : (this.maxDeltaRevision_ != this.getRevision() && ((this.maxDelta_ = Math.sqrt(ph(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0))), (this.maxDeltaRevision_ = this.getRevision())),
            mh(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, !0, t, n, i, s));
  }
  getArea() {
      return vh(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  }
  getCoordinates() {
      return yh(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  }
  getSimplifiedGeometryInternal(t) {
      const n = [];
      return (n.length = e0(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, t, n, 0)), new qi(n, "XY");
  }
  getType() {
      return "LinearRing";
  }
  intersectsExtent(t) {
      return !1;
  }
  setCoordinates(t, n) {
      this.setLayout(n, t, 1), this.flatCoordinates || (this.flatCoordinates = []), (this.flatCoordinates.length = Eh(this.flatCoordinates, 0, t, this.stride)), this.changed();
  }
}
class Ta extends va {
  constructor(t, n) {
      super(), this.setCoordinates(t, n);
  }
  clone() {
      const t = new Ta(this.flatCoordinates.slice(), this.layout);
      return t.applyProperties(this), t;
  }
  closestPointXY(t, n, i, s) {
      const r = this.flatCoordinates,
          o = ci(t, n, r[0], r[1]);
      if (o < s) {
          const a = this.stride;
          for (let c = 0; c < a; ++c) i[c] = r[c];
          return (i.length = a), o;
      }
      return s;
  }
  getCoordinates() {
      return this.flatCoordinates.slice();
  }
  computeExtent(t) {
      return qE(this.flatCoordinates, t);
  }
  getType() {
      return "Point";
  }
  intersectsExtent(t) {
      return nh(t, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  setCoordinates(t, n) {
      this.setLayout(n, t, 0), this.flatCoordinates || (this.flatCoordinates = []), (this.flatCoordinates.length = Jy(this.flatCoordinates, 0, t, this.stride)), this.changed();
  }
}
function o0(e, t, n, i, s) {
  return !sh(s, function (o) {
      return !Cn(e, t, n, i, o[0], o[1]);
  });
}
function Cn(e, t, n, i, s, r) {
  let o = 0,
      a = e[n - i],
      c = e[n - i + 1];
  for (; t < n; t += i) {
      const u = e[t],
          h = e[t + 1];
      c <= r ? h > r && (u - a) * (r - c) - (s - a) * (h - c) > 0 && o++ : h <= r && (u - a) * (r - c) - (s - a) * (h - c) < 0 && o--, (a = u), (c = h);
  }
  return o !== 0;
}
function Th(e, t, n, i, s, r) {
  if (n.length === 0 || !Cn(e, t, n[0], i, s, r)) return !1;
  for (let o = 1, a = n.length; o < a; ++o) if (Cn(e, n[o - 1], n[o], i, s, r)) return !1;
  return !0;
}
function a0(e, t, n, i, s, r, o) {
  let a, c, u, h, f, g, _;
  const T = s[r + 1],
      v = [];
  for (let R = 0, M = n.length; R < M; ++R) {
      const I = n[R];
      for (h = e[I - i], g = e[I - i + 1], a = t; a < I; a += i) (f = e[a]), (_ = e[a + 1]), ((T <= g && _ <= T) || (g <= T && T <= _)) && ((u = ((T - g) / (_ - g)) * (f - h) + h), v.push(u)), (h = f), (g = _);
  }
  let b = NaN,
      x = -1 / 0;
  for (v.sort(fa), h = v[0], a = 1, c = v.length; a < c; ++a) {
      f = v[a];
      const R = Math.abs(f - h);
      R > x && ((u = (h + f) / 2), Th(e, t, n, i, u, T) && ((b = u), (x = R))), (h = f);
  }
  return isNaN(b) && (b = s[r]), o ? (o.push(b, T, x), o) : [b, T, x];
}
function l0(e, t, n, i, s) {
  let r;
  for (t += i; t < n; t += i) if (((r = s(e.slice(t - i, t), e.slice(t, t + i))), r)) return r;
  return !1;
}
function bh(e, t, n, i, s) {
  const r = ih(Dn(), e, t, n, i);
  return es(s, r)
      ? BE(s, r) || (r[0] >= s[0] && r[2] <= s[2]) || (r[1] >= s[1] && r[3] <= s[3])
          ? !0
          : l0(e, t, n, i, function (o, a) {
                return iy(s, o, a);
            })
      : !1;
}
function Ch(e, t, n, i, s) {
  return !!(bh(e, t, n, i, s) || Cn(e, t, n, i, s[0], s[1]) || Cn(e, t, n, i, s[0], s[3]) || Cn(e, t, n, i, s[2], s[1]) || Cn(e, t, n, i, s[2], s[3]));
}
function c0(e, t, n, i, s) {
  if (!Ch(e, t, n[0], i, s)) return !1;
  if (n.length === 1) return !0;
  for (let r = 1, o = n.length; r < o; ++r) if (o0(e, n[r - 1], n[r], i, s) && !bh(e, n[r - 1], n[r], i, s)) return !1;
  return !0;
}
function u0(e, t, n, i) {
  for (; t < n - i; ) {
      for (let s = 0; s < i; ++s) {
          const r = e[t + s];
          (e[t + s] = e[n - i + s]), (e[n - i + s] = r);
      }
      (t += i), (n -= i);
  }
}
function wh(e, t, n, i) {
  let s = 0,
      r = e[n - i],
      o = e[n - i + 1];
  for (; t < n; t += i) {
      const a = e[t],
          c = e[t + 1];
      (s += (a - r) * (c + o)), (r = a), (o = c);
  }
  return s === 0 ? void 0 : s > 0;
}
function h0(e, t, n, i, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = n.length; r < o; ++r) {
      const a = n[r],
          c = wh(e, t, a, i);
      if (r === 0) {
          if ((s && c) || (!s && !c)) return !1;
      } else if ((s && !c) || (!s && c)) return !1;
      t = a;
  }
  return !0;
}
function Sc(e, t, n, i, s) {
  s = s !== void 0 ? s : !1;
  for (let r = 0, o = n.length; r < o; ++r) {
      const a = n[r],
          c = wh(e, t, a, i);
      (r === 0 ? (s && c) || (!s && !c) : (s && !c) || (!s && c)) && u0(e, t, a, i), (t = a);
  }
  return t;
}
class Qi extends va {
  constructor(t, n, i) {
      super(),
          (this.ends_ = []),
          (this.flatInteriorPointRevision_ = -1),
          (this.flatInteriorPoint_ = null),
          (this.maxDelta_ = -1),
          (this.maxDeltaRevision_ = -1),
          (this.orientedRevision_ = -1),
          (this.orientedFlatCoordinates_ = null),
          n !== void 0 && i ? (this.setFlatCoordinates(n, t), (this.ends_ = i)) : this.setCoordinates(t, n);
  }
  appendLinearRing(t) {
      this.flatCoordinates ? Ry(this.flatCoordinates, t.getFlatCoordinates()) : (this.flatCoordinates = t.getFlatCoordinates().slice()), this.ends_.push(this.flatCoordinates.length), this.changed();
  }
  clone() {
      const t = new Qi(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
      return t.applyProperties(this), t;
  }
  closestPointXY(t, n, i, s) {
      return s < eh(this.getExtent(), t, n)
          ? s
          : (this.maxDeltaRevision_ != this.getRevision() && ((this.maxDelta_ = Math.sqrt(qy(this.flatCoordinates, 0, this.ends_, this.stride, 0))), (this.maxDeltaRevision_ = this.getRevision())),
            Qy(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, !0, t, n, i, s));
  }
  containsXY(t, n) {
      return Th(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t, n);
  }
  getArea() {
      return r0(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
  }
  getCoordinates(t) {
      let n;
      return t !== void 0 ? ((n = this.getOrientedFlatCoordinates().slice()), Sc(n, 0, this.ends_, this.stride, t)) : (n = this.flatCoordinates), s0(n, 0, this.ends_, this.stride);
  }
  getEnds() {
      return this.ends_;
  }
  getFlatInteriorPoint() {
      if (this.flatInteriorPointRevision_ != this.getRevision()) {
          const t = Wi(this.getExtent());
          (this.flatInteriorPoint_ = a0(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t, 0)), (this.flatInteriorPointRevision_ = this.getRevision());
      }
      return this.flatInteriorPoint_;
  }
  getInteriorPoint() {
      return new Ta(this.getFlatInteriorPoint(), "XYM");
  }
  getLinearRingCount() {
      return this.ends_.length;
  }
  getLinearRing(t) {
      return t < 0 || this.ends_.length <= t ? null : new qi(this.flatCoordinates.slice(t === 0 ? 0 : this.ends_[t - 1], this.ends_[t]), this.layout);
  }
  getLinearRings() {
      const t = this.layout,
          n = this.flatCoordinates,
          i = this.ends_,
          s = [];
      let r = 0;
      for (let o = 0, a = i.length; o < a; ++o) {
          const c = i[o],
              u = new qi(n.slice(r, c), t);
          s.push(u), (r = c);
      }
      return s;
  }
  getOrientedFlatCoordinates() {
      if (this.orientedRevision_ != this.getRevision()) {
          const t = this.flatCoordinates;
          h0(t, 0, this.ends_, this.stride) ? (this.orientedFlatCoordinates_ = t) : ((this.orientedFlatCoordinates_ = t.slice()), (this.orientedFlatCoordinates_.length = Sc(this.orientedFlatCoordinates_, 0, this.ends_, this.stride))),
              (this.orientedRevision_ = this.getRevision());
      }
      return this.orientedFlatCoordinates_;
  }
  getSimplifiedGeometryInternal(t) {
      const n = [],
          i = [];
      return (n.length = i0(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(t), n, 0, i)), new Qi(n, "XY", i);
  }
  getType() {
      return "Polygon";
  }
  intersectsExtent(t) {
      return c0(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t);
  }
  setCoordinates(t, n) {
      this.setLayout(n, t, 2), this.flatCoordinates || (this.flatCoordinates = []);
      const i = t0(this.flatCoordinates, 0, t, this.stride, this.ends_);
      (this.flatCoordinates.length = i.length === 0 ? 0 : i[i.length - 1]), this.changed();
  }
}
function Lc(e) {
  if (ns(e)) throw new Error("Cannot create polygon from empty extent");
  const t = e[0],
      n = e[1],
      i = e[2],
      s = e[3],
      r = [t, n, t, s, i, s, i, n, t, n];
  return new Qi(r, "XY", [r.length]);
}
const Br = 0;
class d0 extends ze {
  constructor(t) {
      super(),
          this.on,
          this.once,
          this.un,
          (t = Object.assign({}, t)),
          (this.hints_ = [0, 0]),
          (this.animations_ = []),
          this.updateAnimationKey_,
          (this.projection_ = la(t.projection, "EPSG:3857")),
          (this.viewportSize_ = [100, 100]),
          (this.targetCenter_ = null),
          this.targetResolution_,
          this.targetRotation_,
          (this.nextCenter_ = null),
          this.nextResolution_,
          this.nextRotation_,
          (this.cancelAnchor_ = void 0),
          t.projection && ah(),
          t.center && (t.center = $e(t.center, this.projection_)),
          t.extent && (t.extent = si(t.extent, this.projection_)),
          this.applyOptions_(t);
  }
  applyOptions_(t) {
      const n = Object.assign({}, t);
      for (const a in ye) delete n[a];
      this.setProperties(n, !0);
      const i = g0(t);
      (this.maxResolution_ = i.maxResolution), (this.minResolution_ = i.minResolution), (this.zoomFactor_ = i.zoomFactor), (this.resolutions_ = t.resolutions), (this.padding_ = t.padding), (this.minZoom_ = i.minZoom);
      const s = f0(t),
          r = i.constraint,
          o = _0(t);
      (this.constraints_ = { center: s, resolution: r, rotation: o }),
          this.setRotation(t.rotation !== void 0 ? t.rotation : 0),
          this.setCenterInternal(t.center !== void 0 ? t.center : null),
          t.resolution !== void 0 ? this.setResolution(t.resolution) : t.zoom !== void 0 && this.setZoom(t.zoom);
  }
  get padding() {
      return this.padding_;
  }
  set padding(t) {
      let n = this.padding_;
      this.padding_ = t;
      const i = this.getCenterInternal();
      if (i) {
          const s = t || [0, 0, 0, 0];
          n = n || [0, 0, 0, 0];
          const r = this.getResolution(),
              o = (r / 2) * (s[3] - n[3] + n[1] - s[1]),
              a = (r / 2) * (s[0] - n[0] + n[2] - s[2]);
          this.setCenterInternal([i[0] + o, i[1] - a]);
      }
  }
  getUpdatedOptions_(t) {
      const n = this.getProperties();
      return n.resolution !== void 0 ? (n.resolution = this.getResolution()) : (n.zoom = this.getZoom()), (n.center = this.getCenterInternal()), (n.rotation = this.getRotation()), Object.assign({}, n, t);
  }
  animate(t) {
      this.isDef() && !this.getAnimating() && this.resolveConstraints(0);
      const n = new Array(arguments.length);
      for (let i = 0; i < n.length; ++i) {
          let s = arguments[i];
          s.center && ((s = Object.assign({}, s)), (s.center = $e(s.center, this.getProjection()))), s.anchor && ((s = Object.assign({}, s)), (s.anchor = $e(s.anchor, this.getProjection()))), (n[i] = s);
      }
      this.animateInternal.apply(this, n);
  }
  animateInternal(t) {
      let n = arguments.length,
          i;
      n > 1 && typeof arguments[n - 1] == "function" && ((i = arguments[n - 1]), --n);
      let s = 0;
      for (; s < n && !this.isDef(); ++s) {
          const h = arguments[s];
          h.center && this.setCenterInternal(h.center), h.zoom !== void 0 ? this.setZoom(h.zoom) : h.resolution && this.setResolution(h.resolution), h.rotation !== void 0 && this.setRotation(h.rotation);
      }
      if (s === n) {
          i && Ss(i, !0);
          return;
      }
      let r = Date.now(),
          o = this.targetCenter_.slice(),
          a = this.targetResolution_,
          c = this.targetRotation_;
      const u = [];
      for (; s < n; ++s) {
          const h = arguments[s],
              f = { start: r, complete: !1, anchor: h.anchor, duration: h.duration !== void 0 ? h.duration : 1e3, easing: h.easing || ky, callback: i };
          if (
              (h.center && ((f.sourceCenter = o), (f.targetCenter = h.center.slice()), (o = f.targetCenter)),
              h.zoom !== void 0
                  ? ((f.sourceResolution = a), (f.targetResolution = this.getResolutionForZoom(h.zoom)), (a = f.targetResolution))
                  : h.resolution && ((f.sourceResolution = a), (f.targetResolution = h.resolution), (a = f.targetResolution)),
              h.rotation !== void 0)
          ) {
              f.sourceRotation = c;
              const g = In(h.rotation - c + Math.PI, 2 * Math.PI) - Math.PI;
              (f.targetRotation = c + g), (c = f.targetRotation);
          }
          p0(f) ? (f.complete = !0) : (r += f.duration), u.push(f);
      }
      this.animations_.push(u), this.setHint(de.ANIMATING, 1), this.updateAnimations_();
  }
  getAnimating() {
      return this.hints_[de.ANIMATING] > 0;
  }
  getInteracting() {
      return this.hints_[de.INTERACTING] > 0;
  }
  cancelAnimations() {
      this.setHint(de.ANIMATING, -this.hints_[de.ANIMATING]);
      let t;
      for (let n = 0, i = this.animations_.length; n < i; ++n) {
          const s = this.animations_[n];
          if ((s[0].callback && Ss(s[0].callback, !1), !t))
              for (let r = 0, o = s.length; r < o; ++r) {
                  const a = s[r];
                  if (!a.complete) {
                      t = a.anchor;
                      break;
                  }
              }
      }
      (this.animations_.length = 0), (this.cancelAnchor_ = t), (this.nextCenter_ = null), (this.nextResolution_ = NaN), (this.nextRotation_ = NaN);
  }
  updateAnimations_() {
      if ((this.updateAnimationKey_ !== void 0 && (cancelAnimationFrame(this.updateAnimationKey_), (this.updateAnimationKey_ = void 0)), !this.getAnimating())) return;
      const t = Date.now();
      let n = !1;
      for (let i = this.animations_.length - 1; i >= 0; --i) {
          const s = this.animations_[i];
          let r = !0;
          for (let o = 0, a = s.length; o < a; ++o) {
              const c = s[o];
              if (c.complete) continue;
              const u = t - c.start;
              let h = c.duration > 0 ? u / c.duration : 1;
              h >= 1 ? ((c.complete = !0), (h = 1)) : (r = !1);
              const f = c.easing(h);
              if (c.sourceCenter) {
                  const g = c.sourceCenter[0],
                      _ = c.sourceCenter[1],
                      T = c.targetCenter[0],
                      v = c.targetCenter[1];
                  this.nextCenter_ = c.targetCenter;
                  const b = g + f * (T - g),
                      x = _ + f * (v - _);
                  this.targetCenter_ = [b, x];
              }
              if (c.sourceResolution && c.targetResolution) {
                  const g = f === 1 ? c.targetResolution : c.sourceResolution + f * (c.targetResolution - c.sourceResolution);
                  if (c.anchor) {
                      const _ = this.getViewportSize_(this.getRotation()),
                          T = this.constraints_.resolution(g, 0, _, !0);
                      this.targetCenter_ = this.calculateCenterZoom(T, c.anchor);
                  }
                  (this.nextResolution_ = c.targetResolution), (this.targetResolution_ = g), this.applyTargetState_(!0);
              }
              if (c.sourceRotation !== void 0 && c.targetRotation !== void 0) {
                  const g = f === 1 ? In(c.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : c.sourceRotation + f * (c.targetRotation - c.sourceRotation);
                  if (c.anchor) {
                      const _ = this.constraints_.rotation(g, !0);
                      this.targetCenter_ = this.calculateCenterRotate(_, c.anchor);
                  }
                  (this.nextRotation_ = c.targetRotation), (this.targetRotation_ = g);
              }
              if ((this.applyTargetState_(!0), (n = !0), !c.complete)) break;
          }
          if (r) {
              (this.animations_[i] = null), this.setHint(de.ANIMATING, -1), (this.nextCenter_ = null), (this.nextResolution_ = NaN), (this.nextRotation_ = NaN);
              const o = s[0].callback;
              o && Ss(o, !0);
          }
      }
      (this.animations_ = this.animations_.filter(Boolean)), n && this.updateAnimationKey_ === void 0 && (this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_.bind(this)));
  }
  calculateCenterRotate(t, n) {
      let i;
      const s = this.getCenterInternal();
      return s !== void 0 && ((i = [s[0] - n[0], s[1] - n[1]]), oa(i, t - this.getRotation()), ly(i, n)), i;
  }
  calculateCenterZoom(t, n) {
      let i;
      const s = this.getCenterInternal(),
          r = this.getResolution();
      if (s !== void 0 && r !== void 0) {
          const o = n[0] - (t * (n[0] - s[0])) / r,
              a = n[1] - (t * (n[1] - s[1])) / r;
          i = [o, a];
      }
      return i;
  }
  getViewportSize_(t) {
      const n = this.viewportSize_;
      if (t) {
          const i = n[0],
              s = n[1];
          return [Math.abs(i * Math.cos(t)) + Math.abs(s * Math.sin(t)), Math.abs(i * Math.sin(t)) + Math.abs(s * Math.cos(t))];
      }
      return n;
  }
  setViewportSize(t) {
      (this.viewportSize_ = Array.isArray(t) ? t.slice() : [100, 100]), this.getAnimating() || this.resolveConstraints(0);
  }
  getCenter() {
      const t = this.getCenterInternal();
      return t && xo(t, this.getProjection());
  }
  getCenterInternal() {
      return this.get(ye.CENTER);
  }
  getConstraints() {
      return this.constraints_;
  }
  getConstrainResolution() {
      return this.get("constrainResolution");
  }
  getHints(t) {
      return t !== void 0 ? ((t[0] = this.hints_[0]), (t[1] = this.hints_[1]), t) : this.hints_.slice();
  }
  calculateExtent(t) {
      const n = this.calculateExtentInternal(t);
      return Ey(n, this.getProjection());
  }
  calculateExtentInternal(t) {
      t = t || this.getViewportSizeMinusPadding_();
      const n = this.getCenterInternal();
      Tt(n, "The view center is not defined");
      const i = this.getResolution();
      Tt(i !== void 0, "The view resolution is not defined");
      const s = this.getRotation();
      return Tt(s !== void 0, "The view rotation is not defined"), Ao(n, i, s, t);
  }
  getMaxResolution() {
      return this.maxResolution_;
  }
  getMinResolution() {
      return this.minResolution_;
  }
  getMaxZoom() {
      return this.getZoomForResolution(this.minResolution_);
  }
  setMaxZoom(t) {
      this.applyOptions_(this.getUpdatedOptions_({ maxZoom: t }));
  }
  getMinZoom() {
      return this.getZoomForResolution(this.maxResolution_);
  }
  setMinZoom(t) {
      this.applyOptions_(this.getUpdatedOptions_({ minZoom: t }));
  }
  setConstrainResolution(t) {
      this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: t }));
  }
  getProjection() {
      return this.projection_;
  }
  getResolution() {
      return this.get(ye.RESOLUTION);
  }
  getResolutions() {
      return this.resolutions_;
  }
  getResolutionForExtent(t, n) {
      return this.getResolutionForExtentInternal(si(t, this.getProjection()), n);
  }
  getResolutionForExtentInternal(t, n) {
      n = n || this.getViewportSizeMinusPadding_();
      const i = Ft(t) / n[0],
          s = we(t) / n[1];
      return Math.max(i, s);
  }
  getResolutionForValueFunction(t) {
      t = t || 2;
      const n = this.getConstrainedResolution(this.maxResolution_),
          i = this.minResolution_,
          s = Math.log(n / i) / Math.log(t);
      return function (r) {
          return n / Math.pow(t, r * s);
      };
  }
  getRotation() {
      return this.get(ye.ROTATION);
  }
  getValueForResolutionFunction(t) {
      const n = Math.log(t || 2),
          i = this.getConstrainedResolution(this.maxResolution_),
          s = this.minResolution_,
          r = Math.log(i / s) / n;
      return function (o) {
          return Math.log(i / o) / n / r;
      };
  }
  getViewportSizeMinusPadding_(t) {
      let n = this.getViewportSize_(t);
      const i = this.padding_;
      return i && (n = [n[0] - i[1] - i[3], n[1] - i[0] - i[2]]), n;
  }
  getState() {
      const t = this.getProjection(),
          n = this.getResolution(),
          i = this.getRotation();
      let s = this.getCenterInternal();
      const r = this.padding_;
      if (r) {
          const o = this.getViewportSizeMinusPadding_();
          s = qr(s, this.getViewportSize_(), [o[0] / 2 + r[3], o[1] / 2 + r[0]], n, i);
      }
      return { center: s.slice(0), projection: t !== void 0 ? t : null, resolution: n, nextCenter: this.nextCenter_, nextResolution: this.nextResolution_, nextRotation: this.nextRotation_, rotation: i, zoom: this.getZoom() };
  }
  getViewStateAndExtent() {
      return { viewState: this.getState(), extent: this.calculateExtent() };
  }
  getZoom() {
      let t;
      const n = this.getResolution();
      return n !== void 0 && (t = this.getZoomForResolution(n)), t;
  }
  getZoomForResolution(t) {
      let n = this.minZoom_ || 0,
          i,
          s;
      if (this.resolutions_) {
          const r = ga(this.resolutions_, t, 1);
          (n = r), (i = this.resolutions_[r]), r == this.resolutions_.length - 1 ? (s = 2) : (s = i / this.resolutions_[r + 1]);
      } else (i = this.maxResolution_), (s = this.zoomFactor_);
      return n + Math.log(i / t) / Math.log(s);
  }
  getResolutionForZoom(t) {
      if (this.resolutions_) {
          if (this.resolutions_.length <= 1) return 0;
          const n = Vt(Math.floor(t), 0, this.resolutions_.length - 2),
              i = this.resolutions_[n] / this.resolutions_[n + 1];
          return this.resolutions_[n] / Math.pow(i, Vt(t - n, 0, 1));
      }
      return this.maxResolution_ / Math.pow(this.zoomFactor_, t - this.minZoom_);
  }
  fit(t, n) {
      let i;
      if ((Tt(Array.isArray(t) || typeof t.getSimplifiedGeometry == "function", "Invalid extent or geometry provided as `geometry`"), Array.isArray(t))) {
          Tt(!ns(t), "Cannot fit empty extent provided as `geometry`");
          const s = si(t, this.getProjection());
          i = Lc(s);
      } else if (t.getType() === "Circle") {
          const s = si(t.getExtent(), this.getProjection());
          (i = Lc(s)), i.rotate(this.getRotation(), Wi(s));
      } else i = t;
      this.fitInternal(i, n);
  }
  rotatedExtentForGeometry(t) {
      const n = this.getRotation(),
          i = Math.cos(n),
          s = Math.sin(-n),
          r = t.getFlatCoordinates(),
          o = t.getStride();
      let a = 1 / 0,
          c = 1 / 0,
          u = -1 / 0,
          h = -1 / 0;
      for (let f = 0, g = r.length; f < g; f += o) {
          const _ = r[f] * i - r[f + 1] * s,
              T = r[f] * s + r[f + 1] * i;
          (a = Math.min(a, _)), (c = Math.min(c, T)), (u = Math.max(u, _)), (h = Math.max(h, T));
      }
      return [a, c, u, h];
  }
  fitInternal(t, n) {
      n = n || {};
      let i = n.size;
      i || (i = this.getViewportSizeMinusPadding_());
      const s = n.padding !== void 0 ? n.padding : [0, 0, 0, 0],
          r = n.nearest !== void 0 ? n.nearest : !1;
      let o;
      n.minResolution !== void 0 ? (o = n.minResolution) : n.maxZoom !== void 0 ? (o = this.getResolutionForZoom(n.maxZoom)) : (o = 0);
      const a = this.rotatedExtentForGeometry(t);
      let c = this.getResolutionForExtentInternal(a, [i[0] - s[1] - s[3], i[1] - s[0] - s[2]]);
      (c = isNaN(c) ? o : Math.max(c, o)), (c = this.getConstrainedResolution(c, r ? 0 : 1));
      const u = this.getRotation(),
          h = Math.sin(u),
          f = Math.cos(u),
          g = Wi(a);
      (g[0] += ((s[1] - s[3]) / 2) * c), (g[1] += ((s[0] - s[2]) / 2) * c);
      const _ = g[0] * f - g[1] * h,
          T = g[1] * f + g[0] * h,
          v = this.getConstrainedCenter([_, T], c),
          b = n.callback ? n.callback : Qs;
      n.duration !== void 0 ? this.animateInternal({ resolution: c, center: v, duration: n.duration, easing: n.easing }, b) : ((this.targetResolution_ = c), (this.targetCenter_ = v), this.applyTargetState_(!1, !0), Ss(b, !0));
  }
  centerOn(t, n, i) {
      this.centerOnInternal($e(t, this.getProjection()), n, i);
  }
  centerOnInternal(t, n, i) {
      this.setCenterInternal(qr(t, n, i, this.getResolution(), this.getRotation()));
  }
  calculateCenterShift(t, n, i, s) {
      let r;
      const o = this.padding_;
      if (o && t) {
          const a = this.getViewportSizeMinusPadding_(-i),
              c = qr(t, s, [a[0] / 2 + o[3], a[1] / 2 + o[0]], n, i);
          r = [t[0] - c[0], t[1] - c[1]];
      }
      return r;
  }
  isDef() {
      return !!this.getCenterInternal() && this.getResolution() !== void 0;
  }
  adjustCenter(t) {
      const n = xo(this.targetCenter_, this.getProjection());
      this.setCenter([n[0] + t[0], n[1] + t[1]]);
  }
  adjustCenterInternal(t) {
      const n = this.targetCenter_;
      this.setCenterInternal([n[0] + t[0], n[1] + t[1]]);
  }
  adjustResolution(t, n) {
      (n = n && $e(n, this.getProjection())), this.adjustResolutionInternal(t, n);
  }
  adjustResolutionInternal(t, n) {
      const i = this.getAnimating() || this.getInteracting(),
          s = this.getViewportSize_(this.getRotation()),
          r = this.constraints_.resolution(this.targetResolution_ * t, 0, s, i);
      n && (this.targetCenter_ = this.calculateCenterZoom(r, n)), (this.targetResolution_ *= t), this.applyTargetState_();
  }
  adjustZoom(t, n) {
      this.adjustResolution(Math.pow(this.zoomFactor_, -t), n);
  }
  adjustRotation(t, n) {
      n && (n = $e(n, this.getProjection())), this.adjustRotationInternal(t, n);
  }
  adjustRotationInternal(t, n) {
      const i = this.getAnimating() || this.getInteracting(),
          s = this.constraints_.rotation(this.targetRotation_ + t, i);
      n && (this.targetCenter_ = this.calculateCenterRotate(s, n)), (this.targetRotation_ += t), this.applyTargetState_();
  }
  setCenter(t) {
      this.setCenterInternal(t && $e(t, this.getProjection()));
  }
  setCenterInternal(t) {
      (this.targetCenter_ = t), this.applyTargetState_();
  }
  setHint(t, n) {
      return (this.hints_[t] += n), this.changed(), this.hints_[t];
  }
  setResolution(t) {
      (this.targetResolution_ = t), this.applyTargetState_();
  }
  setRotation(t) {
      (this.targetRotation_ = t), this.applyTargetState_();
  }
  setZoom(t) {
      this.setResolution(this.getResolutionForZoom(t));
  }
  applyTargetState_(t, n) {
      const i = this.getAnimating() || this.getInteracting() || n,
          s = this.constraints_.rotation(this.targetRotation_, i),
          r = this.getViewportSize_(s),
          o = this.constraints_.resolution(this.targetResolution_, 0, r, i),
          a = this.constraints_.center(this.targetCenter_, o, r, i, this.calculateCenterShift(this.targetCenter_, o, s, r));
      this.get(ye.ROTATION) !== s && this.set(ye.ROTATION, s),
          this.get(ye.RESOLUTION) !== o && (this.set(ye.RESOLUTION, o), this.set("zoom", this.getZoom(), !0)),
          (!a || !this.get(ye.CENTER) || !Bs(this.get(ye.CENTER), a)) && this.set(ye.CENTER, a),
          this.getAnimating() && !t && this.cancelAnimations(),
          (this.cancelAnchor_ = void 0);
  }
  resolveConstraints(t, n, i) {
      t = t !== void 0 ? t : 200;
      const s = n || 0,
          r = this.constraints_.rotation(this.targetRotation_),
          o = this.getViewportSize_(r),
          a = this.constraints_.resolution(this.targetResolution_, s, o),
          c = this.constraints_.center(this.targetCenter_, a, o, !1, this.calculateCenterShift(this.targetCenter_, a, r, o));
      if (t === 0 && !this.cancelAnchor_) {
          (this.targetResolution_ = a), (this.targetRotation_ = r), (this.targetCenter_ = c), this.applyTargetState_();
          return;
      }
      (i = i || (t === 0 ? this.cancelAnchor_ : void 0)),
          (this.cancelAnchor_ = void 0),
          (this.getResolution() !== a || this.getRotation() !== r || !this.getCenterInternal() || !Bs(this.getCenterInternal(), c)) &&
              (this.getAnimating() && this.cancelAnimations(), this.animateInternal({ rotation: r, center: c, resolution: a, duration: t, easing: Ci, anchor: i }));
  }
  beginInteraction() {
      this.resolveConstraints(0), this.setHint(de.INTERACTING, 1);
  }
  endInteraction(t, n, i) {
      (i = i && $e(i, this.getProjection())), this.endInteractionInternal(t, n, i);
  }
  endInteractionInternal(t, n, i) {
      this.getInteracting() && (this.setHint(de.INTERACTING, -1), this.resolveConstraints(t, n, i));
  }
  getConstrainedCenter(t, n) {
      const i = this.getViewportSize_(this.getRotation());
      return this.constraints_.center(t, n || this.getResolution(), i);
  }
  getConstrainedZoom(t, n) {
      const i = this.getResolutionForZoom(t);
      return this.getZoomForResolution(this.getConstrainedResolution(i, n));
  }
  getConstrainedResolution(t, n) {
      n = n || 0;
      const i = this.getViewportSize_(this.getRotation());
      return this.constraints_.resolution(t, n, i);
  }
}
function Ss(e, t) {
  setTimeout(function () {
      e(t);
  }, 0);
}
function f0(e) {
  if (e.extent !== void 0) {
      const n = e.smoothExtentConstraint !== void 0 ? e.smoothExtentConstraint : !0;
      return Cc(e.extent, e.constrainOnlyCenter, n);
  }
  const t = la(e.projection, "EPSG:3857");
  if (e.multiWorld !== !0 && t.isGlobal()) {
      const n = t.getExtent().slice();
      return (n[0] = -1 / 0), (n[2] = 1 / 0), Cc(n, !1, !1);
  }
  return Py;
}
function g0(e) {
  let t,
      n,
      i,
      o = e.minZoom !== void 0 ? e.minZoom : Br,
      a = e.maxZoom !== void 0 ? e.maxZoom : 28;
  const c = e.zoomFactor !== void 0 ? e.zoomFactor : 2,
      u = e.multiWorld !== void 0 ? e.multiWorld : !1,
      h = e.smoothResolutionConstraint !== void 0 ? e.smoothResolutionConstraint : !0,
      f = e.showFullExtent !== void 0 ? e.showFullExtent : !1,
      g = la(e.projection, "EPSG:3857"),
      _ = g.getExtent();
  let T = e.constrainOnlyCenter,
      v = e.extent;
  if ((!u && !v && g.isGlobal() && ((T = !1), (v = _)), e.resolutions !== void 0)) {
      const b = e.resolutions;
      (n = b[o]), (i = b[a] !== void 0 ? b[a] : b[b.length - 1]), e.constrainResolution ? (t = My(b, h, !T && v, f)) : (t = wc(n, i, h, !T && v, f));
  } else {
      const x = (_ ? Math.max(Ft(_), we(_)) : (360 * Hi.degrees) / g.getMetersPerUnit()) / pa / Math.pow(2, Br),
          R = x / Math.pow(2, 28 - Br);
      (n = e.maxResolution),
          n !== void 0 ? (o = 0) : (n = x / Math.pow(c, o)),
          (i = e.minResolution),
          i === void 0 && (e.maxZoom !== void 0 ? (e.maxResolution !== void 0 ? (i = n / Math.pow(c, a)) : (i = x / Math.pow(c, a))) : (i = R)),
          (a = o + Math.floor(Math.log(n / i) / Math.log(c))),
          (i = n / Math.pow(c, a - o)),
          e.constrainResolution ? (t = Ny(c, n, i, h, !T && v, f)) : (t = wc(n, i, h, !T && v, f));
  }
  return { constraint: t, maxResolution: n, minResolution: i, minZoom: o, zoomFactor: c };
}
function _0(e) {
  if (e.enableRotation !== void 0 ? e.enableRotation : !0) {
      const n = e.constrainRotation;
      return n === void 0 || n === !0 ? Fy() : n === !1 ? Ac : typeof n == "number" ? Dy(n) : Ac;
  }
  return ya;
}
function p0(e) {
  return !((e.sourceCenter && e.targetCenter && !Bs(e.sourceCenter, e.targetCenter)) || e.sourceResolution !== e.targetResolution || e.sourceRotation !== e.targetRotation);
}
function qr(e, t, n, i, s) {
  const r = Math.cos(-s);
  let o = Math.sin(-s),
      a = e[0] * r - e[1] * o,
      c = e[1] * r + e[0] * o;
  (a += (t[0] / 2 - n[0]) * i), (c += (n[1] - t[1] / 2) * i), (o = -o);
  const u = a * r - c * o,
      h = c * r + a * o;
  return [u, h];
}
const Pe = d0,
  ge = { ADD: "add", REMOVE: "remove" },
  Pc = { LENGTH: "length" };
class Ls extends ln {
  constructor(t, n, i) {
      super(t), (this.element = n), (this.index = i);
  }
}
class je extends ze {
  constructor(t, n) {
      if ((super(), this.on, this.once, this.un, (n = n || {}), (this.unique_ = !!n.unique), (this.array_ = t || []), this.unique_)) for (let i = 0, s = this.array_.length; i < s; ++i) this.assertUnique_(this.array_[i], i);
      this.updateLength_();
  }
  clear() {
      for (; this.getLength() > 0; ) this.pop();
  }
  extend(t) {
      for (let n = 0, i = t.length; n < i; ++n) this.push(t[n]);
      return this;
  }
  forEach(t) {
      const n = this.array_;
      for (let i = 0, s = n.length; i < s; ++i) t(n[i], i, n);
  }
  getArray() {
      return this.array_;
  }
  item(t) {
      return this.array_[t];
  }
  getLength() {
      return this.get(Pc.LENGTH);
  }
  insertAt(t, n) {
      if (t < 0 || t > this.getLength()) throw new Error("Index out of bounds: " + t);
      this.unique_ && this.assertUnique_(n), this.array_.splice(t, 0, n), this.updateLength_(), this.dispatchEvent(new Ls(ge.ADD, n, t));
  }
  pop() {
      return this.removeAt(this.getLength() - 1);
  }
  push(t) {
      this.unique_ && this.assertUnique_(t);
      const n = this.getLength();
      return this.insertAt(n, t), this.getLength();
  }
  remove(t) {
      const n = this.array_;
      for (let i = 0, s = n.length; i < s; ++i) if (n[i] === t) return this.removeAt(i);
  }
  removeAt(t) {
      if (t < 0 || t >= this.getLength()) return;
      const n = this.array_[t];
      return this.array_.splice(t, 1), this.updateLength_(), this.dispatchEvent(new Ls(ge.REMOVE, n, t)), n;
  }
  setAt(t, n) {
      const i = this.getLength();
      if (t >= i) {
          this.insertAt(t, n);
          return;
      }
      if (t < 0) throw new Error("Index out of bounds: " + t);
      this.unique_ && this.assertUnique_(n, t);
      const s = this.array_[t];
      (this.array_[t] = n), this.dispatchEvent(new Ls(ge.REMOVE, s, t)), this.dispatchEvent(new Ls(ge.ADD, n, t));
  }
  updateLength_() {
      this.set(Pc.LENGTH, this.array_.length);
  }
  assertUnique_(t, n) {
      for (let i = 0, s = this.array_.length; i < s; ++i) if (this.array_[i] === t && i !== n) throw new Error("Duplicate item added to a unique collection");
  }
}
const tr = { name: "rgb", min: [0, 0, 0], max: [255, 255, 255], channel: ["red", "green", "blue"], alias: ["RGB"] };
var Zt = { name: "xyz", min: [0, 0, 0], channel: ["X", "Y", "Z"], alias: ["XYZ", "ciexyz", "cie1931"] };
Zt.whitepoint = {
  2: {
      A: [109.85, 100, 35.585],
      C: [98.074, 100, 118.232],
      D50: [96.422, 100, 82.521],
      D55: [95.682, 100, 92.149],
      D65: [95.045592705167, 100, 108.9057750759878],
      D75: [94.972, 100, 122.638],
      F2: [99.187, 100, 67.395],
      F7: [95.044, 100, 108.755],
      F11: [100.966, 100, 64.37],
      E: [100, 100, 100],
  },
  10: {
      A: [111.144, 100, 35.2],
      C: [97.285, 100, 116.145],
      D50: [96.72, 100, 81.427],
      D55: [95.799, 100, 90.926],
      D65: [94.811, 100, 107.304],
      D75: [94.416, 100, 120.641],
      F2: [103.28, 100, 69.026],
      F7: [95.792, 100, 107.687],
      F11: [103.866, 100, 65.627],
      E: [100, 100, 100],
  },
};
Zt.max = Zt.whitepoint[2].D65;
Zt.rgb = function (e, t) {
  t = t || Zt.whitepoint[2].E;
  var n = e[0] / t[0],
      i = e[1] / t[1],
      s = e[2] / t[2],
      r,
      o,
      a;
  return (
      (r = n * 3.240969941904521 + i * -1.537383177570093 + s * -0.498610760293),
      (o = n * -0.96924363628087 + i * 1.87596750150772 + s * 0.041555057407175),
      (a = n * 0.055630079696993 + i * -0.20397695888897 + s * 1.056971514242878),
      (r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : (r = r * 12.92)),
      (o = o > 0.0031308 ? 1.055 * Math.pow(o, 1 / 2.4) - 0.055 : (o = o * 12.92)),
      (a = a > 0.0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - 0.055 : (a = a * 12.92)),
      (r = Math.min(Math.max(0, r), 1)),
      (o = Math.min(Math.max(0, o), 1)),
      (a = Math.min(Math.max(0, a), 1)),
      [r * 255, o * 255, a * 255]
  );
};
tr.xyz = function (e, t) {
  var n = e[0] / 255,
      i = e[1] / 255,
      s = e[2] / 255;
  (n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92), (i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92), (s = s > 0.04045 ? Math.pow((s + 0.055) / 1.055, 2.4) : s / 12.92);
  var r = n * 0.41239079926595 + i * 0.35758433938387 + s * 0.18048078840183,
      o = n * 0.21263900587151 + i * 0.71516867876775 + s * 0.072192315360733,
      a = n * 0.019330818715591 + i * 0.11919477979462 + s * 0.95053215224966;
  return (t = t || Zt.whitepoint[2].E), [r * t[0], o * t[1], a * t[2]];
};
const Ah = {
  name: "luv",
  min: [0, -134, -140],
  max: [100, 224, 122],
  channel: ["lightness", "u", "v"],
  alias: ["LUV", "cieluv", "cie1976"],
  xyz: function (e, t, n) {
      var i, s, r, o, a, c, u, h, f, g, _, T, v;
      if (((r = e[0]), (o = e[1]), (a = e[2]), r === 0)) return [0, 0, 0];
      var b = 0.0011070564598794539;
      return (
          (t = t || "D65"),
          (n = n || 2),
          (f = Zt.whitepoint[n][t][0]),
          (g = Zt.whitepoint[n][t][1]),
          (_ = Zt.whitepoint[n][t][2]),
          (T = (4 * f) / (f + 15 * g + 3 * _)),
          (v = (9 * g) / (f + 15 * g + 3 * _)),
          (i = o / (13 * r) + T || 0),
          (s = a / (13 * r) + v || 0),
          (u = r > 8 ? g * Math.pow((r + 16) / 116, 3) : g * r * b),
          (c = (u * 9 * i) / (4 * s) || 0),
          (h = (u * (12 - 3 * i - 20 * s)) / (4 * s) || 0),
          [c, u, h]
      );
  },
};
Zt.luv = function (e, t, n) {
  var i,
      s,
      r,
      o,
      a,
      c,
      u,
      h,
      f,
      g,
      _,
      T,
      v,
      b = 0.008856451679035631,
      x = 903.2962962962961;
  (t = t || "D65"),
      (n = n || 2),
      (f = Zt.whitepoint[n][t][0]),
      (g = Zt.whitepoint[n][t][1]),
      (_ = Zt.whitepoint[n][t][2]),
      (T = (4 * f) / (f + 15 * g + 3 * _)),
      (v = (9 * g) / (f + 15 * g + 3 * _)),
      (c = e[0]),
      (u = e[1]),
      (h = e[2]),
      (i = (4 * c) / (c + 15 * u + 3 * h) || 0),
      (s = (9 * u) / (c + 15 * u + 3 * h) || 0);
  var R = u / g;
  return (r = R <= b ? x * R : 116 * Math.pow(R, 1 / 3) - 16), (o = 13 * r * (i - T)), (a = 13 * r * (s - v)), [r, o, a];
};
Ah.lchuv = function (e) {
  var t = e[0],
      n = e[1],
      i = e[2],
      s = Math.sqrt(n * n + i * i),
      r = Math.atan2(i, n),
      o = (r * 360) / 2 / Math.PI;
  return o < 0 && (o += 360), [t, s, o];
};
Zt.lchuv = function (e) {
  return Ah.lchuv(Zt.luv(e));
};
var m0 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function E0(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function y0(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
      var n = function i() {
          return this instanceof i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
      };
      n.prototype = t.prototype;
  } else n = {};
  return (
      Object.defineProperty(n, "__esModule", { value: !0 }),
      Object.keys(e).forEach(function (i) {
          var s = Object.getOwnPropertyDescriptor(e, i);
          Object.defineProperty(
              n,
              i,
              s.get
                  ? s
                  : {
                        enumerable: !0,
                        get: function () {
                            return e[i];
                        },
                    }
          );
      }),
      n
  );
}
var v0 = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50],
};
const Mc = E0(v0);
var Nc = { red: 0, orange: 60, yellow: 120, green: 180, blue: 240, purple: 300 };
function T0(e) {
  var h, f;
  var t,
      n = [],
      i = 1,
      s;
  if (typeof e == "number") return { space: "rgb", values: [e >>> 16, (e & 65280) >>> 8, e & 255], alpha: 1 };
  if (typeof e == "number") return { space: "rgb", values: [e >>> 16, (e & 65280) >>> 8, e & 255], alpha: 1 };
  if (((e = String(e).toLowerCase()), Mc[e])) (n = Mc[e].slice()), (s = "rgb");
  else if (e === "transparent") (i = 0), (s = "rgb"), (n = [0, 0, 0]);
  else if (e[0] === "#") {
      var r = e.slice(1),
          o = r.length,
          a = o <= 4;
      (i = 1),
          a
              ? ((n = [parseInt(r[0] + r[0], 16), parseInt(r[1] + r[1], 16), parseInt(r[2] + r[2], 16)]), o === 4 && (i = parseInt(r[3] + r[3], 16) / 255))
              : ((n = [parseInt(r[0] + r[1], 16), parseInt(r[2] + r[3], 16), parseInt(r[4] + r[5], 16)]), o === 8 && (i = parseInt(r[6] + r[7], 16) / 255)),
          n[0] || (n[0] = 0),
          n[1] || (n[1] = 0),
          n[2] || (n[2] = 0),
          (s = "rgb");
  } else if ((t = /^((?:rgba?|hs[lvb]a?|hwba?|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms|oklch|oklab|color))\s*\(([^\)]*)\)/.exec(e))) {
      var c = t[1];
      s = c.replace(/a$/, "");
      var u = s === "cmyk" ? 4 : s === "gray" ? 1 : 3;
      (n = t[2].trim().split(/\s*[,\/]\s*|\s+/)),
          s === "color" && (s = n.shift()),
          (n = n.map(function (g, _) {
              if (g[g.length - 1] === "%")
                  return (
                      (g = parseFloat(g) / 100),
                      _ === 3
                          ? g
                          : s === "rgb"
                          ? g * 255
                          : s[0] === "h" || (s[0] === "l" && !_)
                          ? g * 100
                          : s === "lab"
                          ? g * 125
                          : s === "lch"
                          ? _ < 2
                              ? g * 150
                              : g * 360
                          : s[0] === "o" && !_
                          ? g
                          : s === "oklab"
                          ? g * 0.4
                          : s === "oklch"
                          ? _ < 2
                              ? g * 0.4
                              : g * 360
                          : g
                  );
              if (s[_] === "h" || (_ === 2 && s[s.length - 1] === "h")) {
                  if (Nc[g] !== void 0) return Nc[g];
                  if (g.endsWith("deg")) return parseFloat(g);
                  if (g.endsWith("turn")) return parseFloat(g) * 360;
                  if (g.endsWith("grad")) return (parseFloat(g) * 360) / 400;
                  if (g.endsWith("rad")) return (parseFloat(g) * 180) / Math.PI;
              }
              return g === "none" ? 0 : parseFloat(g);
          })),
          (i = n.length > u ? n.pop() : 1);
  } else
      /[0-9](?:\s|\/|,)/.test(e) &&
          ((n = e.match(/([0-9]+)/g).map(function (g) {
              return parseFloat(g);
          })),
          (s = ((f = (h = e.match(/([a-z])/gi)) == null ? void 0 : h.join("")) == null ? void 0 : f.toLowerCase()) || "rgb"));
  return { space: s, values: n, alpha: i };
}
const Qr = {
  name: "hsl",
  min: [0, 0, 0],
  max: [360, 100, 100],
  channel: ["hue", "saturation", "lightness"],
  alias: ["HSL"],
  rgb: function (e) {
      var t = e[0] / 360,
          n = e[1] / 100,
          i = e[2] / 100,
          s,
          r,
          o,
          a,
          c,
          u = 0;
      if (n === 0) return (c = i * 255), [c, c, c];
      for (r = i < 0.5 ? i * (1 + n) : i + n - i * n, s = 2 * i - r, a = [0, 0, 0]; u < 3; )
          (o = t + (1 / 3) * -(u - 1)), o < 0 ? o++ : o > 1 && o--, (c = 6 * o < 1 ? s + (r - s) * 6 * o : 2 * o < 1 ? r : 3 * o < 2 ? s + (r - s) * (2 / 3 - o) * 6 : s), (a[u++] = c * 255);
      return a;
  },
};
tr.hsl = function (e) {
  var t = e[0] / 255,
      n = e[1] / 255,
      i = e[2] / 255,
      s = Math.min(t, n, i),
      r = Math.max(t, n, i),
      o = r - s,
      a,
      c,
      u;
  return (
      r === s ? (a = 0) : t === r ? (a = (n - i) / o) : n === r ? (a = 2 + (i - t) / o) : i === r && (a = 4 + (t - n) / o),
      (a = Math.min(a * 60, 360)),
      a < 0 && (a += 360),
      (u = (s + r) / 2),
      r === s ? (c = 0) : u <= 0.5 ? (c = o / (r + s)) : (c = o / (2 - r - s)),
      [a, c * 100, u * 100]
  );
};
function b0(e) {
  Array.isArray(e) && e.raw && (e = String.raw(...arguments)), e instanceof Number && (e = +e);
  var t,
      n = T0(e);
  if (!n.space) return [];
  const i = n.space[0] === "h" ? Qr.min : tr.min,
      s = n.space[0] === "h" ? Qr.max : tr.max;
  return (
      (t = Array(3)),
      (t[0] = Math.min(Math.max(n.values[0], i[0]), s[0])),
      (t[1] = Math.min(Math.max(n.values[1], i[1]), s[1])),
      (t[2] = Math.min(Math.max(n.values[2], i[2]), s[2])),
      n.space[0] === "h" && (t = Qr.rgb(t)),
      t.push(Math.min(Math.max(n.alpha, 0), 1)),
      t
  );
}
function C0(e) {
  return typeof e == "string" ? e : I0(e);
}
const w0 = 1024,
  Pi = {};
let Jr = 0;
function A0(e) {
  if (Pi.hasOwnProperty(e)) return Pi[e];
  if (Jr >= w0) {
      let n = 0;
      for (const i in Pi) n++ & 3 || (delete Pi[i], --Jr);
  }
  const t = b0(e);
  if (t.length !== 4) throw new Error('Failed to parse "' + e + '" as color');
  for (const n of t) if (isNaN(n)) throw new Error('Failed to parse "' + e + '" as color');
  return R0(t), (Pi[e] = t), ++Jr, t;
}
function Dc(e) {
  return Array.isArray(e) ? e : A0(e);
}
function R0(e) {
  return (e[0] = Vt((e[0] + 0.5) | 0, 0, 255)), (e[1] = Vt((e[1] + 0.5) | 0, 0, 255)), (e[2] = Vt((e[2] + 0.5) | 0, 0, 255)), (e[3] = Vt(e[3], 0, 1)), e;
}
function I0(e) {
  let t = e[0];
  t != (t | 0) && (t = (t + 0.5) | 0);
  let n = e[1];
  n != (n | 0) && (n = (n + 0.5) | 0);
  let i = e[2];
  i != (i | 0) && (i = (i + 0.5) | 0);
  const s = e[3] === void 0 ? 1 : Math.round(e[3] * 100) / 100;
  return "rgba(" + t + "," + n + "," + i + "," + s + ")";
}
class x0 {
  constructor() {
      (this.cache_ = {}), (this.cacheSize_ = 0), (this.maxCacheSize_ = 32);
  }
  clear() {
      (this.cache_ = {}), (this.cacheSize_ = 0);
  }
  canExpireCache() {
      return this.cacheSize_ > this.maxCacheSize_;
  }
  expire() {
      if (this.canExpireCache()) {
          let t = 0;
          for (const n in this.cache_) {
              const i = this.cache_[n];
              !(t++ & 3) && !i.hasListener() && (delete this.cache_[n], --this.cacheSize_);
          }
      }
  }
  get(t, n, i) {
      const s = Fc(t, n, i);
      return s in this.cache_ ? this.cache_[s] : null;
  }
  set(t, n, i, s) {
      const r = Fc(t, n, i);
      (this.cache_[r] = s), ++this.cacheSize_;
  }
  setSize(t) {
      (this.maxCacheSize_ = t), this.expire();
  }
}
function Fc(e, t, n) {
  const i = n ? C0(n) : "null";
  return t + ":" + e + ":" + i;
}
const Rh = new x0(),
  gt = { OPACITY: "opacity", VISIBLE: "visible", EXTENT: "extent", Z_INDEX: "zIndex", MAX_RESOLUTION: "maxResolution", MIN_RESOLUTION: "minResolution", MAX_ZOOM: "maxZoom", MIN_ZOOM: "minZoom", SOURCE: "source", MAP: "map" };
class Ih extends ze {
  constructor(t) {
      super(), this.on, this.once, this.un, (this.background_ = t.background);
      const n = Object.assign({}, t);
      typeof t.properties == "object" && (delete n.properties, Object.assign(n, t.properties)),
          (n[gt.OPACITY] = t.opacity !== void 0 ? t.opacity : 1),
          Tt(typeof n[gt.OPACITY] == "number", "Layer opacity must be a number"),
          (n[gt.VISIBLE] = t.visible !== void 0 ? t.visible : !0),
          (n[gt.Z_INDEX] = t.zIndex),
          (n[gt.MAX_RESOLUTION] = t.maxResolution !== void 0 ? t.maxResolution : 1 / 0),
          (n[gt.MIN_RESOLUTION] = t.minResolution !== void 0 ? t.minResolution : 0),
          (n[gt.MIN_ZOOM] = t.minZoom !== void 0 ? t.minZoom : -1 / 0),
          (n[gt.MAX_ZOOM] = t.maxZoom !== void 0 ? t.maxZoom : 1 / 0),
          (this.className_ = n.className !== void 0 ? n.className : "ol-layer"),
          delete n.className,
          this.setProperties(n),
          (this.state_ = null);
  }
  getBackground() {
      return this.background_;
  }
  getClassName() {
      return this.className_;
  }
  getLayerState(t) {
      const n = this.state_ || { layer: this, managed: t === void 0 ? !0 : t },
          i = this.getZIndex();
      return (
          (n.opacity = Vt(Math.round(this.getOpacity() * 100) / 100, 0, 1)),
          (n.visible = this.getVisible()),
          (n.extent = this.getExtent()),
          (n.zIndex = i === void 0 && !n.managed ? 1 / 0 : i),
          (n.maxResolution = this.getMaxResolution()),
          (n.minResolution = Math.max(this.getMinResolution(), 0)),
          (n.minZoom = this.getMinZoom()),
          (n.maxZoom = this.getMaxZoom()),
          (this.state_ = n),
          n
      );
  }
  getLayersArray(t) {
      return It();
  }
  getLayerStatesArray(t) {
      return It();
  }
  getExtent() {
      return this.get(gt.EXTENT);
  }
  getMaxResolution() {
      return this.get(gt.MAX_RESOLUTION);
  }
  getMinResolution() {
      return this.get(gt.MIN_RESOLUTION);
  }
  getMinZoom() {
      return this.get(gt.MIN_ZOOM);
  }
  getMaxZoom() {
      return this.get(gt.MAX_ZOOM);
  }
  getOpacity() {
      return this.get(gt.OPACITY);
  }
  getSourceState() {
      return It();
  }
  getVisible() {
      return this.get(gt.VISIBLE);
  }
  getZIndex() {
      return this.get(gt.Z_INDEX);
  }
  setBackground(t) {
      (this.background_ = t), this.changed();
  }
  setExtent(t) {
      this.set(gt.EXTENT, t);
  }
  setMaxResolution(t) {
      this.set(gt.MAX_RESOLUTION, t);
  }
  setMinResolution(t) {
      this.set(gt.MIN_RESOLUTION, t);
  }
  setMaxZoom(t) {
      this.set(gt.MAX_ZOOM, t);
  }
  setMinZoom(t) {
      this.set(gt.MIN_ZOOM, t);
  }
  setOpacity(t) {
      Tt(typeof t == "number", "Layer opacity must be a number"), this.set(gt.OPACITY, t);
  }
  setVisible(t) {
      this.set(gt.VISIBLE, t);
  }
  setZIndex(t) {
      this.set(gt.Z_INDEX, t);
  }
  disposeInternal() {
      this.state_ && ((this.state_.layer = null), (this.state_ = null)), super.disposeInternal();
  }
}
const on = { PRERENDER: "prerender", POSTRENDER: "postrender", PRECOMPOSE: "precompose", POSTCOMPOSE: "postcompose", RENDERCOMPLETE: "rendercomplete" };
class O0 extends Ih {
  constructor(t) {
      const n = Object.assign({}, t);
      delete n.source,
          super(n),
          this.on,
          this.once,
          this.un,
          (this.mapPrecomposeKey_ = null),
          (this.mapRenderKey_ = null),
          (this.sourceChangeKey_ = null),
          (this.renderer_ = null),
          (this.sourceReady_ = !1),
          (this.rendered = !1),
          t.render && (this.render = t.render),
          t.map && this.setMap(t.map),
          this.addChangeListener(gt.SOURCE, this.handleSourcePropertyChange_);
      const i = t.source ? t.source : null;
      this.setSource(i);
  }
  getLayersArray(t) {
      return (t = t || []), t.push(this), t;
  }
  getLayerStatesArray(t) {
      return (t = t || []), t.push(this.getLayerState()), t;
  }
  getSource() {
      return this.get(gt.SOURCE) || null;
  }
  getRenderSource() {
      return this.getSource();
  }
  getSourceState() {
      const t = this.getSource();
      return t ? t.getState() : "undefined";
  }
  handleSourceChange_() {
      this.changed(), !(this.sourceReady_ || this.getSource().getState() !== "ready") && ((this.sourceReady_ = !0), this.dispatchEvent("sourceready"));
  }
  handleSourcePropertyChange_() {
      this.sourceChangeKey_ && (Lt(this.sourceChangeKey_), (this.sourceChangeKey_ = null)), (this.sourceReady_ = !1);
      const t = this.getSource();
      t &&
          ((this.sourceChangeKey_ = _t(t, at.CHANGE, this.handleSourceChange_, this)),
          t.getState() === "ready" &&
              ((this.sourceReady_ = !0),
              setTimeout(() => {
                  this.dispatchEvent("sourceready");
              }, 0))),
          this.changed();
  }
  getFeatures(t) {
      return this.renderer_ ? this.renderer_.getFeatures(t) : Promise.resolve([]);
  }
  getData(t) {
      return !this.renderer_ || !this.rendered ? null : this.renderer_.getData(t);
  }
  isVisible(t) {
      let n;
      const i = this.getMapInternal();
      !t && i && (t = i.getView()), t instanceof Pe ? (n = { viewState: t.getState(), extent: t.calculateExtent() }) : (n = t), !n.layerStatesArray && i && (n.layerStatesArray = i.getLayerGroup().getLayerStatesArray());
      let s;
      n.layerStatesArray ? (s = n.layerStatesArray.find((o) => o.layer === this)) : (s = this.getLayerState());
      const r = this.getExtent();
      return ba(s, n.viewState) && (!r || es(r, n.extent));
  }
  getAttributions(t) {
      if (!this.isVisible(t)) return [];
      let n;
      const i = this.getSource();
      if ((i && (n = i.getAttributions()), !n)) return [];
      const s = t instanceof Pe ? t.getViewStateAndExtent() : t;
      let r = n(s);
      return Array.isArray(r) || (r = [r]), r;
  }
  render(t, n) {
      const i = this.getRenderer();
      return i.prepareFrame(t) ? ((this.rendered = !0), i.renderFrame(t, n)) : null;
  }
  unrender() {
      this.rendered = !1;
  }
  setMapInternal(t) {
      t || this.unrender(), this.set(gt.MAP, t);
  }
  getMapInternal() {
      return this.get(gt.MAP);
  }
  setMap(t) {
      this.mapPrecomposeKey_ && (Lt(this.mapPrecomposeKey_), (this.mapPrecomposeKey_ = null)),
          t || this.changed(),
          this.mapRenderKey_ && (Lt(this.mapRenderKey_), (this.mapRenderKey_ = null)),
          t &&
              ((this.mapPrecomposeKey_ = _t(
                  t,
                  on.PRECOMPOSE,
                  function (n) {
                      const s = n.frameState.layerStatesArray,
                          r = this.getLayerState(!1);
                      Tt(
                          !s.some(function (o) {
                              return o.layer === r.layer;
                          }),
                          "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both."
                      ),
                          s.push(r);
                  },
                  this
              )),
              (this.mapRenderKey_ = _t(this, at.CHANGE, t.render, t)),
              this.changed());
  }
  setSource(t) {
      this.set(gt.SOURCE, t);
  }
  getRenderer() {
      return this.renderer_ || (this.renderer_ = this.createRenderer()), this.renderer_;
  }
  hasRenderer() {
      return !!this.renderer_;
  }
  createRenderer() {
      return null;
  }
  disposeInternal() {
      this.renderer_ && (this.renderer_.dispose(), delete this.renderer_), this.setSource(null), super.disposeInternal();
  }
}
function ba(e, t) {
  if (!e.visible) return !1;
  const n = t.resolution;
  if (n < e.minResolution || n >= e.maxResolution) return !1;
  const i = t.zoom;
  return i > e.minZoom && i <= e.maxZoom;
}
const Ca = O0;
class S0 extends da {
  constructor(t) {
      super(), (this.map_ = t);
  }
  dispatchRenderEvent(t, n) {
      It();
  }
  calculateMatrices2D(t) {
      const n = t.viewState,
          i = t.coordinateToPixelTransform,
          s = t.pixelToCoordinateTransform;
      Bi(i, t.size[0] / 2, t.size[1] / 2, 1 / n.resolution, -1 / n.resolution, -n.rotation, -n.center[0], -n.center[1]), _h(s, i);
  }
  forEachFeatureAtCoordinate(t, n, i, s, r, o, a, c) {
      let u;
      const h = n.viewState;
      function f(I, w, K, W) {
          return r.call(o, w, I ? K : null, W);
      }
      const g = h.projection,
          _ = uy(t.slice(), g),
          T = [[0, 0]];
      if (g.canWrapX() && s) {
          const I = g.getExtent(),
              w = Ft(I);
          T.push([-w, 0], [w, 0]);
      }
      const v = n.layerStatesArray,
          b = v.length,
          x = [],
          R = [];
      for (let I = 0; I < T.length; I++)
          for (let w = b - 1; w >= 0; --w) {
              const K = v[w],
                  W = K.layer;
              if (W.hasRenderer() && ba(K, h) && a.call(c, W)) {
                  const q = W.getRenderer(),
                      X = W.getSource();
                  if (q && X) {
                      const Y = X.getWrapX() ? _ : t,
                          B = f.bind(null, K.managed);
                      (R[0] = Y[0] + T[I][0]), (R[1] = Y[1] + T[I][1]), (u = q.forEachFeatureAtCoordinate(R, n, i, B, x));
                  }
                  if (u) return u;
              }
          }
      if (x.length === 0) return;
      const M = 1 / x.length;
      return x.forEach((I, w) => (I.distanceSq += w * M)), x.sort((I, w) => I.distanceSq - w.distanceSq), x.some((I) => (u = I.callback(I.feature, I.layer, I.geometry))), u;
  }
  hasFeatureAtCoordinate(t, n, i, s, r, o) {
      return this.forEachFeatureAtCoordinate(t, n, i, s, qs, this, r, o) !== void 0;
  }
  getMap() {
      return this.map_;
  }
  renderFrame(t) {
      It();
  }
  flushDeclutterItems(t) {}
  scheduleExpireIconCache(t) {
      Rh.canExpireCache() && t.postRenderFunctions.push(L0);
  }
}
function L0(e, t) {
  Rh.expire();
}
class xh extends ln {
  constructor(t, n, i, s) {
      super(t), (this.inversePixelTransform = n), (this.frameState = i), (this.context = s);
  }
}
const Ps = "ol-hidden",
  br = "ol-unselectable",
  wa = "ol-control",
  kc = "ol-collapsed";
function _i(e, t, n, i) {
  let s;
  return n && n.length ? (s = n.shift()) : fh ? (s = new OffscreenCanvas(e || 300, t || 300)) : (s = document.createElement("canvas")), e && (s.width = e), t && (s.height = t), s.getContext("2d", i);
}
function Aa(e) {
  const t = e.canvas;
  (t.width = 1), (t.height = 1), e.clearRect(0, 0, 1, 1);
}
function $c(e, t) {
  const n = t.parentNode;
  n && n.replaceChild(e, t);
}
function Oo(e) {
  return e && e.parentNode ? e.parentNode.removeChild(e) : null;
}
function P0(e) {
  for (; e.lastChild; ) e.removeChild(e.lastChild);
}
function M0(e, t) {
  const n = e.childNodes;
  for (let i = 0; ; ++i) {
      const s = n[i],
          r = t[i];
      if (!s && !r) break;
      if (s !== r) {
          if (!s) {
              e.appendChild(r);
              continue;
          }
          if (!r) {
              e.removeChild(s), --i;
              continue;
          }
          e.insertBefore(r, s);
      }
  }
}
const N0 = new ze();
class D0 extends S0 {
  constructor(t) {
      super(t), (this.fontChangeListenerKey_ = _t(N0, Zi.PROPERTYCHANGE, t.redrawText.bind(t))), (this.element_ = document.createElement("div"));
      const n = this.element_.style;
      (n.position = "absolute"), (n.width = "100%"), (n.height = "100%"), (n.zIndex = "0"), (this.element_.className = br + " ol-layers");
      const i = t.getViewport();
      i.insertBefore(this.element_, i.firstChild || null), (this.children_ = []), (this.renderedVisible_ = !0), (this.declutterLayers_ = []);
  }
  dispatchRenderEvent(t, n) {
      const i = this.getMap();
      if (i.hasListener(t)) {
          const s = new xh(t, void 0, n);
          i.dispatchEvent(s);
      }
  }
  disposeInternal() {
      Lt(this.fontChangeListenerKey_), this.element_.parentNode.removeChild(this.element_), super.disposeInternal();
  }
  renderFrame(t) {
      if (!t) {
          this.renderedVisible_ && ((this.element_.style.display = "none"), (this.renderedVisible_ = !1));
          return;
      }
      this.calculateMatrices2D(t), this.dispatchRenderEvent(on.PRECOMPOSE, t);
      const n = t.layerStatesArray.sort(function (o, a) {
              return o.zIndex - a.zIndex;
          }),
          i = t.viewState;
      this.children_.length = 0;
      const s = this.declutterLayers_;
      s.length = 0;
      let r = null;
      for (let o = 0, a = n.length; o < a; ++o) {
          const c = n[o];
          t.layerIndex = o;
          const u = c.layer,
              h = u.getSourceState();
          if (!ba(c, i) || (h != "ready" && h != "undefined")) {
              u.unrender();
              continue;
          }
          const f = u.render(t, r);
          f && (f !== r && (this.children_.push(f), (r = f)), "getDeclutter" in u && s.push(u));
      }
      this.flushDeclutterItems(t),
          M0(this.element_, this.children_),
          this.dispatchRenderEvent(on.POSTCOMPOSE, t),
          this.renderedVisible_ || ((this.element_.style.display = ""), (this.renderedVisible_ = !0)),
          this.scheduleExpireIconCache(t);
  }
  flushDeclutterItems(t) {
      const n = this.declutterLayers_;
      for (let i = n.length - 1; i >= 0; --i) n[i].renderDeclutter(t);
      n.length = 0;
  }
}
class tn extends ln {
  constructor(t, n) {
      super(t), (this.layer = n);
  }
}
const to = { LAYERS: "layers" };
class wi extends Ih {
  constructor(t) {
      t = t || {};
      const n = Object.assign({}, t);
      delete n.layers;
      let i = t.layers;
      super(n),
          this.on,
          this.once,
          this.un,
          (this.layersListenerKeys_ = []),
          (this.listenerKeys_ = {}),
          this.addChangeListener(to.LAYERS, this.handleLayersChanged_),
          i ? (Array.isArray(i) ? (i = new je(i.slice(), { unique: !0 })) : Tt(typeof i.getArray == "function", "Expected `layers` to be an array or a `Collection`")) : (i = new je(void 0, { unique: !0 })),
          this.setLayers(i);
  }
  handleLayerChange_() {
      this.changed();
  }
  handleLayersChanged_() {
      this.layersListenerKeys_.forEach(Lt), (this.layersListenerKeys_.length = 0);
      const t = this.getLayers();
      this.layersListenerKeys_.push(_t(t, ge.ADD, this.handleLayersAdd_, this), _t(t, ge.REMOVE, this.handleLayersRemove_, this));
      for (const i in this.listenerKeys_) this.listenerKeys_[i].forEach(Lt);
      pr(this.listenerKeys_);
      const n = t.getArray();
      for (let i = 0, s = n.length; i < s; i++) {
          const r = n[i];
          this.registerLayerListeners_(r), this.dispatchEvent(new tn("addlayer", r));
      }
      this.changed();
  }
  registerLayerListeners_(t) {
      const n = [_t(t, Zi.PROPERTYCHANGE, this.handleLayerChange_, this), _t(t, at.CHANGE, this.handleLayerChange_, this)];
      t instanceof wi && n.push(_t(t, "addlayer", this.handleLayerGroupAdd_, this), _t(t, "removelayer", this.handleLayerGroupRemove_, this)), (this.listenerKeys_[te(t)] = n);
  }
  handleLayerGroupAdd_(t) {
      this.dispatchEvent(new tn("addlayer", t.layer));
  }
  handleLayerGroupRemove_(t) {
      this.dispatchEvent(new tn("removelayer", t.layer));
  }
  handleLayersAdd_(t) {
      const n = t.element;
      this.registerLayerListeners_(n), this.dispatchEvent(new tn("addlayer", n)), this.changed();
  }
  handleLayersRemove_(t) {
      const n = t.element,
          i = te(n);
      this.listenerKeys_[i].forEach(Lt), delete this.listenerKeys_[i], this.dispatchEvent(new tn("removelayer", n)), this.changed();
  }
  getLayers() {
      return this.get(to.LAYERS);
  }
  setLayers(t) {
      const n = this.getLayers();
      if (n) {
          const i = n.getArray();
          for (let s = 0, r = i.length; s < r; ++s) this.dispatchEvent(new tn("removelayer", i[s]));
      }
      this.set(to.LAYERS, t);
  }
  getLayersArray(t) {
      return (
          (t = t !== void 0 ? t : []),
          this.getLayers().forEach(function (n) {
              n.getLayersArray(t);
          }),
          t
      );
  }
  getLayerStatesArray(t) {
      const n = t !== void 0 ? t : [],
          i = n.length;
      this.getLayers().forEach(function (o) {
          o.getLayerStatesArray(n);
      });
      const s = this.getLayerState();
      let r = s.zIndex;
      !t && s.zIndex === void 0 && (r = 0);
      for (let o = i, a = n.length; o < a; o++) {
          const c = n[o];
          (c.opacity *= s.opacity),
              (c.visible = c.visible && s.visible),
              (c.maxResolution = Math.min(c.maxResolution, s.maxResolution)),
              (c.minResolution = Math.max(c.minResolution, s.minResolution)),
              (c.minZoom = Math.max(c.minZoom, s.minZoom)),
              (c.maxZoom = Math.min(c.maxZoom, s.maxZoom)),
              s.extent !== void 0 && (c.extent !== void 0 ? (c.extent = ki(c.extent, s.extent)) : (c.extent = s.extent)),
              c.zIndex === void 0 && (c.zIndex = r);
      }
      return n;
  }
  getSourceState() {
      return "ready";
  }
}
class Jn extends ln {
  constructor(t, n, i) {
      super(t), (this.map = n), (this.frameState = i !== void 0 ? i : null);
  }
}
class Be extends Jn {
  constructor(t, n, i, s, r, o) {
      super(t, n, r), (this.originalEvent = i), (this.pixel_ = null), (this.coordinate_ = null), (this.dragging = s !== void 0 ? s : !1), (this.activePointers = o);
  }
  get pixel() {
      return this.pixel_ || (this.pixel_ = this.map.getEventPixel(this.originalEvent)), this.pixel_;
  }
  set pixel(t) {
      this.pixel_ = t;
  }
  get coordinate() {
      return this.coordinate_ || (this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel)), this.coordinate_;
  }
  set coordinate(t) {
      this.coordinate_ = t;
  }
  preventDefault() {
      super.preventDefault(), "preventDefault" in this.originalEvent && this.originalEvent.preventDefault();
  }
  stopPropagation() {
      super.stopPropagation(), "stopPropagation" in this.originalEvent && this.originalEvent.stopPropagation();
  }
}
const Rt = {
      SINGLECLICK: "singleclick",
      CLICK: at.CLICK,
      DBLCLICK: at.DBLCLICK,
      POINTERDRAG: "pointerdrag",
      POINTERMOVE: "pointermove",
      POINTERDOWN: "pointerdown",
      POINTERUP: "pointerup",
      POINTEROVER: "pointerover",
      POINTEROUT: "pointerout",
      POINTERENTER: "pointerenter",
      POINTERLEAVE: "pointerleave",
      POINTERCANCEL: "pointercancel",
  },
  So = { POINTERMOVE: "pointermove", POINTERDOWN: "pointerdown", POINTERUP: "pointerup", POINTEROVER: "pointerover", POINTEROUT: "pointerout", POINTERENTER: "pointerenter", POINTERLEAVE: "pointerleave", POINTERCANCEL: "pointercancel" };
class F0 extends _a {
  constructor(t, n) {
      super(t), (this.map_ = t), this.clickTimeoutId_, (this.emulateClicks_ = !1), (this.dragging_ = !1), (this.dragListenerKeys_ = []), (this.moveTolerance_ = n === void 0 ? 1 : n), (this.down_ = null);
      const i = this.map_.getViewport();
      (this.activePointers_ = []),
          (this.trackedTouches_ = {}),
          (this.element_ = i),
          (this.pointerdownListenerKey_ = _t(i, So.POINTERDOWN, this.handlePointerDown_, this)),
          this.originalPointerMoveEvent_,
          (this.relayedListenerKey_ = _t(i, So.POINTERMOVE, this.relayMoveEvent_, this)),
          (this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this)),
          this.element_.addEventListener(at.TOUCHMOVE, this.boundHandleTouchMove_, gh ? { passive: !1 } : !1);
  }
  emulateClick_(t) {
      let n = new Be(Rt.CLICK, this.map_, t);
      this.dispatchEvent(n),
          this.clickTimeoutId_ !== void 0
              ? (clearTimeout(this.clickTimeoutId_), (this.clickTimeoutId_ = void 0), (n = new Be(Rt.DBLCLICK, this.map_, t)), this.dispatchEvent(n))
              : (this.clickTimeoutId_ = setTimeout(() => {
                    this.clickTimeoutId_ = void 0;
                    const i = new Be(Rt.SINGLECLICK, this.map_, t);
                    this.dispatchEvent(i);
                }, 250));
  }
  updateActivePointers_(t) {
      const n = t,
          i = n.pointerId;
      if (n.type == Rt.POINTERUP || n.type == Rt.POINTERCANCEL) {
          delete this.trackedTouches_[i];
          for (const s in this.trackedTouches_)
              if (this.trackedTouches_[s].target !== n.target) {
                  delete this.trackedTouches_[s];
                  break;
              }
      } else (n.type == Rt.POINTERDOWN || n.type == Rt.POINTERMOVE) && (this.trackedTouches_[i] = n);
      this.activePointers_ = Object.values(this.trackedTouches_);
  }
  handlePointerUp_(t) {
      this.updateActivePointers_(t);
      const n = new Be(Rt.POINTERUP, this.map_, t, void 0, void 0, this.activePointers_);
      this.dispatchEvent(n),
          this.emulateClicks_ && !n.defaultPrevented && !this.dragging_ && this.isMouseActionButton_(t) && this.emulateClick_(this.down_),
          this.activePointers_.length === 0 && (this.dragListenerKeys_.forEach(Lt), (this.dragListenerKeys_.length = 0), (this.dragging_ = !1), (this.down_ = null));
  }
  isMouseActionButton_(t) {
      return t.button === 0;
  }
  handlePointerDown_(t) {
      (this.emulateClicks_ = this.activePointers_.length === 0), this.updateActivePointers_(t);
      const n = new Be(Rt.POINTERDOWN, this.map_, t, void 0, void 0, this.activePointers_);
      if ((this.dispatchEvent(n), (this.down_ = new PointerEvent(t.type, t)), Object.defineProperty(this.down_, "target", { writable: !1, value: t.target }), this.dragListenerKeys_.length === 0)) {
          const i = this.map_.getOwnerDocument();
          this.dragListenerKeys_.push(_t(i, Rt.POINTERMOVE, this.handlePointerMove_, this), _t(i, Rt.POINTERUP, this.handlePointerUp_, this), _t(this.element_, Rt.POINTERCANCEL, this.handlePointerUp_, this)),
              this.element_.getRootNode && this.element_.getRootNode() !== i && this.dragListenerKeys_.push(_t(this.element_.getRootNode(), Rt.POINTERUP, this.handlePointerUp_, this));
      }
  }
  handlePointerMove_(t) {
      if (this.isMoving_(t)) {
          this.updateActivePointers_(t), (this.dragging_ = !0);
          const n = new Be(Rt.POINTERDRAG, this.map_, t, this.dragging_, void 0, this.activePointers_);
          this.dispatchEvent(n);
      }
  }
  relayMoveEvent_(t) {
      this.originalPointerMoveEvent_ = t;
      const n = !!(this.down_ && this.isMoving_(t));
      this.dispatchEvent(new Be(Rt.POINTERMOVE, this.map_, t, n));
  }
  handleTouchMove_(t) {
      const n = this.originalPointerMoveEvent_;
      (!n || n.defaultPrevented) && (typeof t.cancelable != "boolean" || t.cancelable === !0) && t.preventDefault();
  }
  isMoving_(t) {
      return this.dragging_ || Math.abs(t.clientX - this.down_.clientX) > this.moveTolerance_ || Math.abs(t.clientY - this.down_.clientY) > this.moveTolerance_;
  }
  disposeInternal() {
      this.relayedListenerKey_ && (Lt(this.relayedListenerKey_), (this.relayedListenerKey_ = null)),
          this.element_.removeEventListener(at.TOUCHMOVE, this.boundHandleTouchMove_),
          this.pointerdownListenerKey_ && (Lt(this.pointerdownListenerKey_), (this.pointerdownListenerKey_ = null)),
          this.dragListenerKeys_.forEach(Lt),
          (this.dragListenerKeys_.length = 0),
          (this.element_ = null),
          super.disposeInternal();
  }
}
const qe = { POSTRENDER: "postrender", MOVESTART: "movestart", MOVEEND: "moveend", LOADSTART: "loadstart", LOADEND: "loadend" },
  Ut = { LAYERGROUP: "layergroup", SIZE: "size", TARGET: "target", VIEW: "view" },
  er = 1 / 0;
class k0 {
  constructor(t, n) {
      (this.priorityFunction_ = t), (this.keyFunction_ = n), (this.elements_ = []), (this.priorities_ = []), (this.queuedElements_ = {});
  }
  clear() {
      (this.elements_.length = 0), (this.priorities_.length = 0), pr(this.queuedElements_);
  }
  dequeue() {
      const t = this.elements_,
          n = this.priorities_,
          i = t[0];
      t.length == 1 ? ((t.length = 0), (n.length = 0)) : ((t[0] = t.pop()), (n[0] = n.pop()), this.siftUp_(0));
      const s = this.keyFunction_(i);
      return delete this.queuedElements_[s], i;
  }
  enqueue(t) {
      Tt(!(this.keyFunction_(t) in this.queuedElements_), "Tried to enqueue an `element` that was already added to the queue");
      const n = this.priorityFunction_(t);
      return n != er ? (this.elements_.push(t), this.priorities_.push(n), (this.queuedElements_[this.keyFunction_(t)] = !0), this.siftDown_(0, this.elements_.length - 1), !0) : !1;
  }
  getCount() {
      return this.elements_.length;
  }
  getLeftChildIndex_(t) {
      return t * 2 + 1;
  }
  getRightChildIndex_(t) {
      return t * 2 + 2;
  }
  getParentIndex_(t) {
      return (t - 1) >> 1;
  }
  heapify_() {
      let t;
      for (t = (this.elements_.length >> 1) - 1; t >= 0; t--) this.siftUp_(t);
  }
  isEmpty() {
      return this.elements_.length === 0;
  }
  isKeyQueued(t) {
      return t in this.queuedElements_;
  }
  isQueued(t) {
      return this.isKeyQueued(this.keyFunction_(t));
  }
  siftUp_(t) {
      const n = this.elements_,
          i = this.priorities_,
          s = n.length,
          r = n[t],
          o = i[t],
          a = t;
      for (; t < s >> 1; ) {
          const c = this.getLeftChildIndex_(t),
              u = this.getRightChildIndex_(t),
              h = u < s && i[u] < i[c] ? u : c;
          (n[t] = n[h]), (i[t] = i[h]), (t = h);
      }
      (n[t] = r), (i[t] = o), this.siftDown_(a, t);
  }
  siftDown_(t, n) {
      const i = this.elements_,
          s = this.priorities_,
          r = i[n],
          o = s[n];
      for (; n > t; ) {
          const a = this.getParentIndex_(n);
          if (s[a] > o) (i[n] = i[a]), (s[n] = s[a]), (n = a);
          else break;
      }
      (i[n] = r), (s[n] = o);
  }
  reprioritize() {
      const t = this.priorityFunction_,
          n = this.elements_,
          i = this.priorities_;
      let s = 0;
      const r = n.length;
      let o, a, c;
      for (a = 0; a < r; ++a) (o = n[a]), (c = t(o)), c == er ? delete this.queuedElements_[this.keyFunction_(o)] : ((i[s] = c), (n[s++] = o));
      (n.length = s), (i.length = s), this.heapify_();
  }
}
const Z = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3, EMPTY: 4 };
class $0 extends k0 {
  constructor(t, n) {
      super(
          function (i) {
              return t.apply(null, i);
          },
          function (i) {
              return i[0].getKey();
          }
      ),
          (this.boundHandleTileChange_ = this.handleTileChange.bind(this)),
          (this.tileChangeCallback_ = n),
          (this.tilesLoading_ = 0),
          (this.tilesLoadingKeys_ = {});
  }
  enqueue(t) {
      const n = super.enqueue(t);
      return n && t[0].addEventListener(at.CHANGE, this.boundHandleTileChange_), n;
  }
  getTilesLoading() {
      return this.tilesLoading_;
  }
  handleTileChange(t) {
      const n = t.target,
          i = n.getState();
      if (i === Z.LOADED || i === Z.ERROR || i === Z.EMPTY) {
          i !== Z.ERROR && n.removeEventListener(at.CHANGE, this.boundHandleTileChange_);
          const s = n.getKey();
          s in this.tilesLoadingKeys_ && (delete this.tilesLoadingKeys_[s], --this.tilesLoading_), this.tileChangeCallback_();
      }
  }
  loadMoreTiles(t, n) {
      let i = 0,
          s,
          r,
          o;
      for (; this.tilesLoading_ < t && i < n && this.getCount() > 0; )
          (r = this.dequeue()[0]), (o = r.getKey()), (s = r.getState()), s === Z.IDLE && !(o in this.tilesLoadingKeys_) && ((this.tilesLoadingKeys_[o] = !0), ++this.tilesLoading_, ++i, r.load());
  }
}
function V0(e, t, n, i, s) {
  if (!e || !(n in e.wantedTiles) || !e.wantedTiles[n][t.getKey()]) return er;
  const r = e.viewState.center,
      o = i[0] - r[0],
      a = i[1] - r[1];
  return 65536 * Math.log(s) + Math.sqrt(o * o + a * a) / s;
}
class Ra extends ze {
  constructor(t) {
      super();
      const n = t.element;
      n && !t.target && !n.style.pointerEvents && (n.style.pointerEvents = "auto"),
          (this.element = n || null),
          (this.target_ = null),
          (this.map_ = null),
          (this.listenerKeys = []),
          t.render && (this.render = t.render),
          t.target && this.setTarget(t.target);
  }
  disposeInternal() {
      Oo(this.element), super.disposeInternal();
  }
  getMap() {
      return this.map_;
  }
  setMap(t) {
      this.map_ && Oo(this.element);
      for (let n = 0, i = this.listenerKeys.length; n < i; ++n) Lt(this.listenerKeys[n]);
      (this.listenerKeys.length = 0),
          (this.map_ = t),
          t && ((this.target_ ? this.target_ : t.getOverlayContainerStopEvent()).appendChild(this.element), this.render !== Qs && this.listenerKeys.push(_t(t, qe.POSTRENDER, this.render, this)), t.render());
  }
  render(t) {}
  setTarget(t) {
      this.target_ = typeof t == "string" ? document.getElementById(t) : t;
  }
}
class j0 extends Ra {
  constructor(t) {
      (t = t || {}),
          super({ element: document.createElement("div"), render: t.render, target: t.target }),
          (this.ulElement_ = document.createElement("ul")),
          (this.collapsed_ = t.collapsed !== void 0 ? t.collapsed : !0),
          (this.userCollapsed_ = this.collapsed_),
          (this.overrideCollapsible_ = t.collapsible !== void 0),
          (this.collapsible_ = t.collapsible !== void 0 ? t.collapsible : !0),
          this.collapsible_ || (this.collapsed_ = !1);
      const n = t.className !== void 0 ? t.className : "ol-attribution",
          i = t.tipLabel !== void 0 ? t.tipLabel : "Attributions",
          s = t.expandClassName !== void 0 ? t.expandClassName : n + "-expand",
          r = t.collapseLabel !== void 0 ? t.collapseLabel : "›",
          o = t.collapseClassName !== void 0 ? t.collapseClassName : n + "-collapse";
      typeof r == "string" ? ((this.collapseLabel_ = document.createElement("span")), (this.collapseLabel_.textContent = r), (this.collapseLabel_.className = o)) : (this.collapseLabel_ = r);
      const a = t.label !== void 0 ? t.label : "i";
      typeof a == "string" ? ((this.label_ = document.createElement("span")), (this.label_.textContent = a), (this.label_.className = s)) : (this.label_ = a);
      const c = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
      (this.toggleButton_ = document.createElement("button")),
          this.toggleButton_.setAttribute("type", "button"),
          this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_)),
          (this.toggleButton_.title = i),
          this.toggleButton_.appendChild(c),
          this.toggleButton_.addEventListener(at.CLICK, this.handleClick_.bind(this), !1);
      const u = n + " " + br + " " + wa + (this.collapsed_ && this.collapsible_ ? " " + kc : "") + (this.collapsible_ ? "" : " ol-uncollapsible"),
          h = this.element;
      (h.className = u), h.appendChild(this.toggleButton_), h.appendChild(this.ulElement_), (this.renderedAttributions_ = []), (this.renderedVisible_ = !0);
  }
  collectSourceAttributions_(t) {
      const n = Array.from(
              new Set(
                  this.getMap()
                      .getAllLayers()
                      .flatMap((s) => s.getAttributions(t))
              )
          ),
          i = !this.getMap()
              .getAllLayers()
              .some((s) => s.getSource() && s.getSource().getAttributionsCollapsible() === !1);
      return this.overrideCollapsible_ || this.setCollapsible(i), n;
  }
  updateElement_(t) {
      if (!t) {
          this.renderedVisible_ && ((this.element.style.display = "none"), (this.renderedVisible_ = !1));
          return;
      }
      const n = this.collectSourceAttributions_(t),
          i = n.length > 0;
      if ((this.renderedVisible_ != i && ((this.element.style.display = i ? "" : "none"), (this.renderedVisible_ = i)), !vr(n, this.renderedAttributions_))) {
          P0(this.ulElement_);
          for (let s = 0, r = n.length; s < r; ++s) {
              const o = document.createElement("li");
              (o.innerHTML = n[s]), this.ulElement_.appendChild(o);
          }
          this.renderedAttributions_ = n;
      }
  }
  handleClick_(t) {
      t.preventDefault(), this.handleToggle_(), (this.userCollapsed_ = this.collapsed_);
  }
  handleToggle_() {
      this.element.classList.toggle(kc),
          this.collapsed_ ? $c(this.collapseLabel_, this.label_) : $c(this.label_, this.collapseLabel_),
          (this.collapsed_ = !this.collapsed_),
          this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_));
  }
  getCollapsible() {
      return this.collapsible_;
  }
  setCollapsible(t) {
      this.collapsible_ !== t && ((this.collapsible_ = t), this.element.classList.toggle("ol-uncollapsible"), this.userCollapsed_ && this.handleToggle_());
  }
  setCollapsed(t) {
      (this.userCollapsed_ = t), !(!this.collapsible_ || this.collapsed_ === t) && this.handleToggle_();
  }
  getCollapsed() {
      return this.collapsed_;
  }
  render(t) {
      this.updateElement_(t.frameState);
  }
}
const K0 = j0;
class G0 extends Ra {
  constructor(t) {
      (t = t || {}), super({ element: document.createElement("div"), render: t.render, target: t.target });
      const n = t.className !== void 0 ? t.className : "ol-rotate",
          i = t.label !== void 0 ? t.label : "⇧",
          s = t.compassClassName !== void 0 ? t.compassClassName : "ol-compass";
      (this.label_ = null), typeof i == "string" ? ((this.label_ = document.createElement("span")), (this.label_.className = s), (this.label_.textContent = i)) : ((this.label_ = i), this.label_.classList.add(s));
      const r = t.tipLabel ? t.tipLabel : "Reset rotation",
          o = document.createElement("button");
      (o.className = n + "-reset"), o.setAttribute("type", "button"), (o.title = r), o.appendChild(this.label_), o.addEventListener(at.CLICK, this.handleClick_.bind(this), !1);
      const a = n + " " + br + " " + wa,
          c = this.element;
      (c.className = a),
          c.appendChild(o),
          (this.callResetNorth_ = t.resetNorth ? t.resetNorth : void 0),
          (this.duration_ = t.duration !== void 0 ? t.duration : 250),
          (this.autoHide_ = t.autoHide !== void 0 ? t.autoHide : !0),
          (this.rotation_ = void 0),
          this.autoHide_ && this.element.classList.add(Ps);
  }
  handleClick_(t) {
      t.preventDefault(), this.callResetNorth_ !== void 0 ? this.callResetNorth_() : this.resetNorth_();
  }
  resetNorth_() {
      const n = this.getMap().getView();
      if (!n) return;
      const i = n.getRotation();
      i !== void 0 && (this.duration_ > 0 && i % (2 * Math.PI) !== 0 ? n.animate({ rotation: 0, duration: this.duration_, easing: Ci }) : n.setRotation(0));
  }
  render(t) {
      const n = t.frameState;
      if (!n) return;
      const i = n.viewState.rotation;
      if (i != this.rotation_) {
          const s = "rotate(" + i + "rad)";
          if (this.autoHide_) {
              const r = this.element.classList.contains(Ps);
              !r && i === 0 ? this.element.classList.add(Ps) : r && i !== 0 && this.element.classList.remove(Ps);
          }
          this.label_.style.transform = s;
      }
      this.rotation_ = i;
  }
}
const U0 = G0;
class Oh extends Ra {
  constructor(t) {
      (t = t || {}), super({ element: document.createElement("div"), target: t.target });
      const n = t.className !== void 0 ? t.className : "ol-zoom",
          i = t.delta !== void 0 ? t.delta : 1,
          s = t.zoomInClassName !== void 0 ? t.zoomInClassName : n + "-in",
          r = t.zoomOutClassName !== void 0 ? t.zoomOutClassName : n + "-out",
          o = t.zoomInLabel !== void 0 ? t.zoomInLabel : "+",
          a = t.zoomOutLabel !== void 0 ? t.zoomOutLabel : "–",
          c = t.zoomInTipLabel !== void 0 ? t.zoomInTipLabel : "Zoom in",
          u = t.zoomOutTipLabel !== void 0 ? t.zoomOutTipLabel : "Zoom out",
          h = document.createElement("button");
      (h.className = s), h.setAttribute("type", "button"), (h.title = c), h.appendChild(typeof o == "string" ? document.createTextNode(o) : o), h.addEventListener(at.CLICK, this.handleClick_.bind(this, i), !1);
      const f = document.createElement("button");
      (f.className = r), f.setAttribute("type", "button"), (f.title = u), f.appendChild(typeof a == "string" ? document.createTextNode(a) : a), f.addEventListener(at.CLICK, this.handleClick_.bind(this, -i), !1);
      const g = n + " " + br + " " + wa,
          _ = this.element;
      (_.className = g), _.appendChild(h), _.appendChild(f), (this.duration_ = t.duration !== void 0 ? t.duration : 250);
  }
  handleClick_(t, n) {
      n.preventDefault(), this.zoomByDelta_(t);
  }
  zoomByDelta_(t) {
      const i = this.getMap().getView();
      if (!i) return;
      const s = i.getZoom();
      if (s !== void 0) {
          const r = i.getConstrainedZoom(s + t);
          this.duration_ > 0 ? (i.getAnimating() && i.cancelAnimations(), i.animate({ zoom: r, duration: this.duration_, easing: Ci })) : i.setZoom(r);
      }
  }
}
function z0(e) {
  e = e || {};
  const t = new je();
  return (
      (e.zoom !== void 0 ? e.zoom : !0) && t.push(new Oh(e.zoomOptions)), (e.rotate !== void 0 ? e.rotate : !0) && t.push(new U0(e.rotateOptions)), (e.attribution !== void 0 ? e.attribution : !0) && t.push(new K0(e.attributionOptions)), t
  );
}
const Vc = { ACTIVE: "active" };
class ss extends ze {
  constructor(t) {
      super(), this.on, this.once, this.un, t && t.handleEvent && (this.handleEvent = t.handleEvent), (this.map_ = null), this.setActive(!0);
  }
  getActive() {
      return this.get(Vc.ACTIVE);
  }
  getMap() {
      return this.map_;
  }
  handleEvent(t) {
      return !0;
  }
  setActive(t) {
      this.set(Vc.ACTIVE, t);
  }
  setMap(t) {
      this.map_ = t;
  }
}
function Y0(e, t, n) {
  const i = e.getCenterInternal();
  if (i) {
      const s = [i[0] + t[0], i[1] + t[1]];
      e.animateInternal({ duration: n !== void 0 ? n : 250, easing: $y, center: e.getConstrainedCenter(s) });
  }
}
function Ia(e, t, n, i) {
  const s = e.getZoom();
  if (s === void 0) return;
  const r = e.getConstrainedZoom(s + t),
      o = e.getResolutionForZoom(r);
  e.getAnimating() && e.cancelAnimations(), e.animate({ resolution: o, anchor: n, duration: i !== void 0 ? i : 250, easing: Ci });
}
class H0 extends ss {
  constructor(t) {
      super(), (t = t || {}), (this.delta_ = t.delta ? t.delta : 1), (this.duration_ = t.duration !== void 0 ? t.duration : 250);
  }
  handleEvent(t) {
      let n = !1;
      if (t.type == Rt.DBLCLICK) {
          const i = t.originalEvent,
              s = t.map,
              r = t.coordinate,
              o = i.shiftKey ? -this.delta_ : this.delta_,
              a = s.getView();
          Ia(a, o, r, this.duration_), i.preventDefault(), (n = !0);
      }
      return !n;
  }
}
const W0 = H0;
class rs extends ss {
  constructor(t) {
      (t = t || {}),
          super(t),
          t.handleDownEvent && (this.handleDownEvent = t.handleDownEvent),
          t.handleDragEvent && (this.handleDragEvent = t.handleDragEvent),
          t.handleMoveEvent && (this.handleMoveEvent = t.handleMoveEvent),
          t.handleUpEvent && (this.handleUpEvent = t.handleUpEvent),
          t.stopDown && (this.stopDown = t.stopDown),
          (this.handlingDownUpSequence = !1),
          (this.targetPointers = []);
  }
  getPointerCount() {
      return this.targetPointers.length;
  }
  handleDownEvent(t) {
      return !1;
  }
  handleDragEvent(t) {}
  handleEvent(t) {
      if (!t.originalEvent) return !0;
      let n = !1;
      if ((this.updateTrackedPointers_(t), this.handlingDownUpSequence)) {
          if (t.type == Rt.POINTERDRAG) this.handleDragEvent(t), t.originalEvent.preventDefault();
          else if (t.type == Rt.POINTERUP) {
              const i = this.handleUpEvent(t);
              this.handlingDownUpSequence = i && this.targetPointers.length > 0;
          }
      } else if (t.type == Rt.POINTERDOWN) {
          const i = this.handleDownEvent(t);
          (this.handlingDownUpSequence = i), (n = this.stopDown(i));
      } else t.type == Rt.POINTERMOVE && this.handleMoveEvent(t);
      return !n;
  }
  handleMoveEvent(t) {}
  handleUpEvent(t) {
      return !1;
  }
  stopDown(t) {
      return t;
  }
  updateTrackedPointers_(t) {
      t.activePointers && (this.targetPointers = t.activePointers);
  }
}
function xa(e) {
  const t = e.length;
  let n = 0,
      i = 0;
  for (let s = 0; s < t; s++) (n += e[s].clientX), (i += e[s].clientY);
  return { clientX: n / t, clientY: i / t };
}
function Lo(e) {
  const t = arguments;
  return function (n) {
      let i = !0;
      for (let s = 0, r = t.length; s < r && ((i = i && t[s](n)), !!i); ++s);
      return i;
  };
}
const X0 = function (e) {
      const t = e.originalEvent;
      return t.altKey && !(t.metaKey || t.ctrlKey) && t.shiftKey;
  },
  Z0 = function (e) {
      const t = e.map.getTargetElement(),
          n = e.map.getOwnerDocument().activeElement;
      return t.contains(n);
  },
  Sh = function (e) {
      return e.map.getTargetElement().hasAttribute("tabindex") ? Z0(e) : !0;
  },
  B0 = qs,
  Lh = function (e) {
      const t = e.originalEvent;
      return t.button == 0 && !(Ky && hh && t.ctrlKey);
  },
  Ph = function (e) {
      const t = e.originalEvent;
      return !t.altKey && !(t.metaKey || t.ctrlKey) && !t.shiftKey;
  },
  q0 = function (e) {
      const t = e.originalEvent;
      return hh ? t.metaKey : t.ctrlKey;
  },
  Q0 = function (e) {
      const t = e.originalEvent;
      return !t.altKey && !(t.metaKey || t.ctrlKey) && t.shiftKey;
  },
  Mh = function (e) {
      const t = e.originalEvent,
          n = t.target.tagName;
      return n !== "INPUT" && n !== "SELECT" && n !== "TEXTAREA" && !t.target.isContentEditable;
  },
  eo = function (e) {
      const t = e.originalEvent;
      return Tt(t !== void 0, "mapBrowserEvent must originate from a pointer event"), t.pointerType == "mouse";
  },
  J0 = function (e) {
      const t = e.originalEvent;
      return Tt(t !== void 0, "mapBrowserEvent must originate from a pointer event"), t.isPrimary && t.button === 0;
  };
class tv extends rs {
  constructor(t) {
      super({ stopDown: Tr }), (t = t || {}), (this.kinetic_ = t.kinetic), (this.lastCentroid = null), this.lastPointersCount_, (this.panning_ = !1);
      const n = t.condition ? t.condition : Lo(Ph, J0);
      (this.condition_ = t.onFocusOnly ? Lo(Sh, n) : n), (this.noKinetic_ = !1);
  }
  handleDragEvent(t) {
      const n = t.map;
      this.panning_ || ((this.panning_ = !0), n.getView().beginInteraction());
      const i = this.targetPointers,
          s = n.getEventPixel(xa(i));
      if (i.length == this.lastPointersCount_) {
          if ((this.kinetic_ && this.kinetic_.update(s[0], s[1]), this.lastCentroid)) {
              const r = [this.lastCentroid[0] - s[0], s[1] - this.lastCentroid[1]],
                  a = t.map.getView();
              cy(r, a.getResolution()), oa(r, a.getRotation()), a.adjustCenterInternal(r);
          }
      } else this.kinetic_ && this.kinetic_.begin();
      (this.lastCentroid = s), (this.lastPointersCount_ = i.length), t.originalEvent.preventDefault();
  }
  handleUpEvent(t) {
      const n = t.map,
          i = n.getView();
      if (this.targetPointers.length === 0) {
          if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
              const s = this.kinetic_.getDistance(),
                  r = this.kinetic_.getAngle(),
                  o = i.getCenterInternal(),
                  a = n.getPixelFromCoordinateInternal(o),
                  c = n.getCoordinateFromPixelInternal([a[0] - s * Math.cos(r), a[1] - s * Math.sin(r)]);
              i.animateInternal({ center: i.getConstrainedCenter(c), duration: 500, easing: Ci });
          }
          return this.panning_ && ((this.panning_ = !1), i.endInteraction()), !1;
      }
      return this.kinetic_ && this.kinetic_.begin(), (this.lastCentroid = null), !0;
  }
  handleDownEvent(t) {
      if (this.targetPointers.length > 0 && this.condition_(t)) {
          const i = t.map.getView();
          return (this.lastCentroid = null), i.getAnimating() && i.cancelAnimations(), this.kinetic_ && this.kinetic_.begin(), (this.noKinetic_ = this.targetPointers.length > 1), !0;
      }
      return !1;
  }
}
const ev = tv;
class nv extends rs {
  constructor(t) {
      (t = t || {}), super({ stopDown: Tr }), (this.condition_ = t.condition ? t.condition : X0), (this.lastAngle_ = void 0), (this.duration_ = t.duration !== void 0 ? t.duration : 250);
  }
  handleDragEvent(t) {
      if (!eo(t)) return;
      const n = t.map,
          i = n.getView();
      if (i.getConstraints().rotation === ya) return;
      const s = n.getSize(),
          r = t.pixel,
          o = Math.atan2(s[1] / 2 - r[1], r[0] - s[0] / 2);
      if (this.lastAngle_ !== void 0) {
          const a = o - this.lastAngle_;
          i.adjustRotationInternal(-a);
      }
      this.lastAngle_ = o;
  }
  handleUpEvent(t) {
      return eo(t) ? (t.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  handleDownEvent(t) {
      return eo(t) && Lh(t) && this.condition_(t) ? (t.map.getView().beginInteraction(), (this.lastAngle_ = void 0), !0) : !1;
  }
}
class iv extends da {
  constructor(t) {
      super(),
          (this.geometry_ = null),
          (this.element_ = document.createElement("div")),
          (this.element_.style.position = "absolute"),
          (this.element_.style.pointerEvents = "auto"),
          (this.element_.className = "ol-box " + t),
          (this.map_ = null),
          (this.startPixel_ = null),
          (this.endPixel_ = null);
  }
  disposeInternal() {
      this.setMap(null);
  }
  render_() {
      const t = this.startPixel_,
          n = this.endPixel_,
          i = "px",
          s = this.element_.style;
      (s.left = Math.min(t[0], n[0]) + i), (s.top = Math.min(t[1], n[1]) + i), (s.width = Math.abs(n[0] - t[0]) + i), (s.height = Math.abs(n[1] - t[1]) + i);
  }
  setMap(t) {
      if (this.map_) {
          this.map_.getOverlayContainer().removeChild(this.element_);
          const n = this.element_.style;
          (n.left = "inherit"), (n.top = "inherit"), (n.width = "inherit"), (n.height = "inherit");
      }
      (this.map_ = t), this.map_ && this.map_.getOverlayContainer().appendChild(this.element_);
  }
  setPixels(t, n) {
      (this.startPixel_ = t), (this.endPixel_ = n), this.createOrUpdateGeometry(), this.render_();
  }
  createOrUpdateGeometry() {
      const t = this.startPixel_,
          n = this.endPixel_,
          s = [t, [t[0], n[1]], n, [n[0], t[1]]].map(this.map_.getCoordinateFromPixelInternal, this.map_);
      (s[4] = s[0].slice()), this.geometry_ ? this.geometry_.setCoordinates([s]) : (this.geometry_ = new Qi([s]));
  }
  getGeometry() {
      return this.geometry_;
  }
}
const Ms = { BOXSTART: "boxstart", BOXDRAG: "boxdrag", BOXEND: "boxend", BOXCANCEL: "boxcancel" };
class no extends ln {
  constructor(t, n, i) {
      super(t), (this.coordinate = n), (this.mapBrowserEvent = i);
  }
}
class sv extends rs {
  constructor(t) {
      super(),
          this.on,
          this.once,
          this.un,
          (t = t || {}),
          (this.box_ = new iv(t.className || "ol-dragbox")),
          (this.minArea_ = t.minArea !== void 0 ? t.minArea : 64),
          t.onBoxEnd && (this.onBoxEnd = t.onBoxEnd),
          (this.startPixel_ = null),
          (this.condition_ = t.condition ? t.condition : Lh),
          (this.boxEndCondition_ = t.boxEndCondition ? t.boxEndCondition : this.defaultBoxEndCondition);
  }
  defaultBoxEndCondition(t, n, i) {
      const s = i[0] - n[0],
          r = i[1] - n[1];
      return s * s + r * r >= this.minArea_;
  }
  getGeometry() {
      return this.box_.getGeometry();
  }
  handleDragEvent(t) {
      this.box_.setPixels(this.startPixel_, t.pixel), this.dispatchEvent(new no(Ms.BOXDRAG, t.coordinate, t));
  }
  handleUpEvent(t) {
      this.box_.setMap(null);
      const n = this.boxEndCondition_(t, this.startPixel_, t.pixel);
      return n && this.onBoxEnd(t), this.dispatchEvent(new no(n ? Ms.BOXEND : Ms.BOXCANCEL, t.coordinate, t)), !1;
  }
  handleDownEvent(t) {
      return this.condition_(t) ? ((this.startPixel_ = t.pixel), this.box_.setMap(t.map), this.box_.setPixels(this.startPixel_, this.startPixel_), this.dispatchEvent(new no(Ms.BOXSTART, t.coordinate, t)), !0) : !1;
  }
  onBoxEnd(t) {}
}
class rv extends sv {
  constructor(t) {
      t = t || {};
      const n = t.condition ? t.condition : Q0;
      super({ condition: n, className: t.className || "ol-dragzoom", minArea: t.minArea }), (this.duration_ = t.duration !== void 0 ? t.duration : 200), (this.out_ = t.out !== void 0 ? t.out : !1);
  }
  onBoxEnd(t) {
      const i = this.getMap().getView();
      let s = this.getGeometry();
      if (this.out_) {
          const r = i.rotatedExtentForGeometry(s),
              o = i.getResolutionForExtentInternal(r),
              a = i.getResolution() / o;
          (s = s.clone()), s.scale(a * a);
      }
      i.fitInternal(s, { duration: this.duration_, easing: Ci });
  }
}
const ov = rv,
  Tn = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", DOWN: "ArrowDown" };
class av extends ss {
  constructor(t) {
      super(),
          (t = t || {}),
          (this.defaultCondition_ = function (n) {
              return Ph(n) && Mh(n);
          }),
          (this.condition_ = t.condition !== void 0 ? t.condition : this.defaultCondition_),
          (this.duration_ = t.duration !== void 0 ? t.duration : 100),
          (this.pixelDelta_ = t.pixelDelta !== void 0 ? t.pixelDelta : 128);
  }
  handleEvent(t) {
      let n = !1;
      if (t.type == at.KEYDOWN) {
          const i = t.originalEvent,
              s = i.key;
          if (this.condition_(t) && (s == Tn.DOWN || s == Tn.LEFT || s == Tn.RIGHT || s == Tn.UP)) {
              const o = t.map.getView(),
                  a = o.getResolution() * this.pixelDelta_;
              let c = 0,
                  u = 0;
              s == Tn.DOWN ? (u = -a) : s == Tn.LEFT ? (c = -a) : s == Tn.RIGHT ? (c = a) : (u = a);
              const h = [c, u];
              oa(h, o.getRotation()), Y0(o, h, this.duration_), i.preventDefault(), (n = !0);
          }
      }
      return !n;
  }
}
class lv extends ss {
  constructor(t) {
      super(),
          (t = t || {}),
          (this.condition_ = t.condition
              ? t.condition
              : function (n) {
                    return !q0(n) && Mh(n);
                }),
          (this.delta_ = t.delta ? t.delta : 1),
          (this.duration_ = t.duration !== void 0 ? t.duration : 100);
  }
  handleEvent(t) {
      let n = !1;
      if (t.type == at.KEYDOWN || t.type == at.KEYPRESS) {
          const i = t.originalEvent,
              s = i.key;
          if (this.condition_(t) && (s === "+" || s === "-")) {
              const r = t.map,
                  o = s === "+" ? this.delta_ : -this.delta_,
                  a = r.getView();
              Ia(a, o, void 0, this.duration_), i.preventDefault(), (n = !0);
          }
      }
      return !n;
  }
}
const cv = lv;
class uv {
  constructor(t, n, i) {
      (this.decay_ = t), (this.minVelocity_ = n), (this.delay_ = i), (this.points_ = []), (this.angle_ = 0), (this.initialVelocity_ = 0);
  }
  begin() {
      (this.points_.length = 0), (this.angle_ = 0), (this.initialVelocity_ = 0);
  }
  update(t, n) {
      this.points_.push(t, n, Date.now());
  }
  end() {
      if (this.points_.length < 6) return !1;
      const t = Date.now() - this.delay_,
          n = this.points_.length - 3;
      if (this.points_[n + 2] < t) return !1;
      let i = n - 3;
      for (; i > 0 && this.points_[i + 2] > t; ) i -= 3;
      const s = this.points_[n + 2] - this.points_[i + 2];
      if (s < 1e3 / 60) return !1;
      const r = this.points_[n] - this.points_[i],
          o = this.points_[n + 1] - this.points_[i + 1];
      return (this.angle_ = Math.atan2(o, r)), (this.initialVelocity_ = Math.sqrt(r * r + o * o) / s), this.initialVelocity_ > this.minVelocity_;
  }
  getDistance() {
      return (this.minVelocity_ - this.initialVelocity_) / this.decay_;
  }
  getAngle() {
      return this.angle_;
  }
}
class hv extends ss {
  constructor(t) {
      (t = t || {}),
          super(t),
          (this.totalDelta_ = 0),
          (this.lastDelta_ = 0),
          (this.maxDelta_ = t.maxDelta !== void 0 ? t.maxDelta : 1),
          (this.duration_ = t.duration !== void 0 ? t.duration : 250),
          (this.timeout_ = t.timeout !== void 0 ? t.timeout : 80),
          (this.useAnchor_ = t.useAnchor !== void 0 ? t.useAnchor : !0),
          (this.constrainResolution_ = t.constrainResolution !== void 0 ? t.constrainResolution : !1);
      const n = t.condition ? t.condition : B0;
      (this.condition_ = t.onFocusOnly ? Lo(Sh, n) : n), (this.lastAnchor_ = null), (this.startTime_ = void 0), this.timeoutId_, (this.mode_ = void 0), (this.trackpadEventGap_ = 400), this.trackpadTimeoutId_, (this.deltaPerZoom_ = 300);
  }
  endInteraction_() {
      this.trackpadTimeoutId_ = void 0;
      const t = this.getMap();
      if (!t) return;
      t.getView().endInteraction(void 0, this.lastDelta_ ? (this.lastDelta_ > 0 ? 1 : -1) : 0, this.lastAnchor_);
  }
  handleEvent(t) {
      if (!this.condition_(t) || t.type !== at.WHEEL) return !0;
      const i = t.map,
          s = t.originalEvent;
      s.preventDefault(), this.useAnchor_ && (this.lastAnchor_ = t.coordinate);
      let r;
      if ((t.type == at.WHEEL && ((r = s.deltaY), Vy && s.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (r /= dh), s.deltaMode === WheelEvent.DOM_DELTA_LINE && (r *= 40)), r === 0)) return !1;
      this.lastDelta_ = r;
      const o = Date.now();
      this.startTime_ === void 0 && (this.startTime_ = o), (!this.mode_ || o - this.startTime_ > this.trackpadEventGap_) && (this.mode_ = Math.abs(r) < 4 ? "trackpad" : "wheel");
      const a = i.getView();
      if (this.mode_ === "trackpad" && !(a.getConstrainResolution() || this.constrainResolution_))
          return (
              this.trackpadTimeoutId_ ? clearTimeout(this.trackpadTimeoutId_) : (a.getAnimating() && a.cancelAnimations(), a.beginInteraction()),
              (this.trackpadTimeoutId_ = setTimeout(this.endInteraction_.bind(this), this.timeout_)),
              a.adjustZoom(-r / this.deltaPerZoom_, this.lastAnchor_),
              (this.startTime_ = o),
              !1
          );
      this.totalDelta_ += r;
      const c = Math.max(this.timeout_ - (o - this.startTime_), 0);
      return clearTimeout(this.timeoutId_), (this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, i), c)), !1;
  }
  handleWheelZoom_(t) {
      const n = t.getView();
      n.getAnimating() && n.cancelAnimations();
      let i = -Vt(this.totalDelta_, -this.maxDelta_ * this.deltaPerZoom_, this.maxDelta_ * this.deltaPerZoom_) / this.deltaPerZoom_;
      (n.getConstrainResolution() || this.constrainResolution_) && (i = i ? (i > 0 ? 1 : -1) : 0),
          Ia(n, i, this.lastAnchor_, this.duration_),
          (this.mode_ = void 0),
          (this.totalDelta_ = 0),
          (this.lastAnchor_ = null),
          (this.startTime_ = void 0),
          (this.timeoutId_ = void 0);
  }
  setMouseAnchor(t) {
      (this.useAnchor_ = t), t || (this.lastAnchor_ = null);
  }
}
const dv = hv;
class fv extends rs {
  constructor(t) {
      t = t || {};
      const n = t;
      n.stopDown || (n.stopDown = Tr),
          super(n),
          (this.anchor_ = null),
          (this.lastAngle_ = void 0),
          (this.rotating_ = !1),
          (this.rotationDelta_ = 0),
          (this.threshold_ = t.threshold !== void 0 ? t.threshold : 0.3),
          (this.duration_ = t.duration !== void 0 ? t.duration : 250);
  }
  handleDragEvent(t) {
      let n = 0;
      const i = this.targetPointers[0],
          s = this.targetPointers[1],
          r = Math.atan2(s.clientY - i.clientY, s.clientX - i.clientX);
      if (this.lastAngle_ !== void 0) {
          const c = r - this.lastAngle_;
          (this.rotationDelta_ += c), !this.rotating_ && Math.abs(this.rotationDelta_) > this.threshold_ && (this.rotating_ = !0), (n = c);
      }
      this.lastAngle_ = r;
      const o = t.map,
          a = o.getView();
      a.getConstraints().rotation !== ya && ((this.anchor_ = o.getCoordinateFromPixelInternal(o.getEventPixel(xa(this.targetPointers)))), this.rotating_ && (o.render(), a.adjustRotationInternal(n, this.anchor_)));
  }
  handleUpEvent(t) {
      return this.targetPointers.length < 2 ? (t.map.getView().endInteraction(this.duration_), !1) : !0;
  }
  handleDownEvent(t) {
      if (this.targetPointers.length >= 2) {
          const n = t.map;
          return (this.anchor_ = null), (this.lastAngle_ = void 0), (this.rotating_ = !1), (this.rotationDelta_ = 0), this.handlingDownUpSequence || n.getView().beginInteraction(), !0;
      }
      return !1;
  }
}
class gv extends rs {
  constructor(t) {
      t = t || {};
      const n = t;
      n.stopDown || (n.stopDown = Tr), super(n), (this.anchor_ = null), (this.duration_ = t.duration !== void 0 ? t.duration : 400), (this.lastDistance_ = void 0), (this.lastScaleDelta_ = 1);
  }
  handleDragEvent(t) {
      let n = 1;
      const i = this.targetPointers[0],
          s = this.targetPointers[1],
          r = i.clientX - s.clientX,
          o = i.clientY - s.clientY,
          a = Math.sqrt(r * r + o * o);
      this.lastDistance_ !== void 0 && (n = this.lastDistance_ / a), (this.lastDistance_ = a);
      const c = t.map,
          u = c.getView();
      n != 1 && (this.lastScaleDelta_ = n), (this.anchor_ = c.getCoordinateFromPixelInternal(c.getEventPixel(xa(this.targetPointers)))), c.render(), u.adjustResolutionInternal(n, this.anchor_);
  }
  handleUpEvent(t) {
      if (this.targetPointers.length < 2) {
          const i = t.map.getView(),
              s = this.lastScaleDelta_ > 1 ? 1 : -1;
          return i.endInteraction(this.duration_, s), !1;
      }
      return !0;
  }
  handleDownEvent(t) {
      if (this.targetPointers.length >= 2) {
          const n = t.map;
          return (this.anchor_ = null), (this.lastDistance_ = void 0), (this.lastScaleDelta_ = 1), this.handlingDownUpSequence || n.getView().beginInteraction(), !0;
      }
      return !1;
  }
}
const _v = gv;
function pv(e) {
  e = e || {};
  const t = new je(),
      n = new uv(-0.005, 0.05, 100);
  return (
      (e.altShiftDragRotate !== void 0 ? e.altShiftDragRotate : !0) && t.push(new nv()),
      (e.doubleClickZoom !== void 0 ? e.doubleClickZoom : !0) && t.push(new W0({ delta: e.zoomDelta, duration: e.zoomDuration })),
      (e.dragPan !== void 0 ? e.dragPan : !0) && t.push(new ev({ onFocusOnly: e.onFocusOnly, kinetic: n })),
      (e.pinchRotate !== void 0 ? e.pinchRotate : !0) && t.push(new fv()),
      (e.pinchZoom !== void 0 ? e.pinchZoom : !0) && t.push(new _v({ duration: e.zoomDuration })),
      (e.keyboard !== void 0 ? e.keyboard : !0) && (t.push(new av()), t.push(new cv({ delta: e.zoomDelta, duration: e.zoomDuration }))),
      (e.mouseWheelZoom !== void 0 ? e.mouseWheelZoom : !0) && t.push(new dv({ onFocusOnly: e.onFocusOnly, duration: e.zoomDuration })),
      (e.shiftDragZoom !== void 0 ? e.shiftDragZoom : !0) && t.push(new ov({ duration: e.zoomDuration })),
      t
  );
}
function jc(e) {
  return e[0] > 0 && e[1] > 0;
}
function mv(e, t, n) {
  return n === void 0 && (n = [0, 0]), (n[0] = (e[0] * t + 0.5) | 0), (n[1] = (e[1] * t + 0.5) | 0), n;
}
function nn(e, t) {
  return Array.isArray(e) ? e : (t === void 0 ? (t = [e, e]) : ((t[0] = e), (t[1] = e)), t);
}
function Nh(e) {
  if (e instanceof Ca) {
      e.setMapInternal(null);
      return;
  }
  e instanceof wi && e.getLayers().forEach(Nh);
}
function Dh(e, t) {
  if (e instanceof Ca) {
      e.setMapInternal(t);
      return;
  }
  if (e instanceof wi) {
      const n = e.getLayers().getArray();
      for (let i = 0, s = n.length; i < s; ++i) Dh(n[i], t);
  }
}
let Ev = class extends ze {
  constructor(t) {
      super(), (t = t || {}), this.on, this.once, this.un;
      const n = yv(t);
      this.renderComplete_,
          (this.loaded_ = !0),
          (this.boundHandleBrowserEvent_ = this.handleBrowserEvent.bind(this)),
          (this.maxTilesLoading_ = t.maxTilesLoading !== void 0 ? t.maxTilesLoading : 16),
          (this.pixelRatio_ = t.pixelRatio !== void 0 ? t.pixelRatio : dh),
          this.postRenderTimeoutHandle_,
          this.animationDelayKey_,
          (this.animationDelay_ = this.animationDelay_.bind(this)),
          (this.coordinateToPixelTransform_ = ui()),
          (this.pixelToCoordinateTransform_ = ui()),
          (this.frameIndex_ = 0),
          (this.frameState_ = null),
          (this.previousExtent_ = null),
          (this.viewPropertyListenerKey_ = null),
          (this.viewChangeListenerKey_ = null),
          (this.layerGroupPropertyListenerKeys_ = null),
          (this.viewport_ = document.createElement("div")),
          (this.viewport_.className = "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : "")),
          (this.viewport_.style.position = "relative"),
          (this.viewport_.style.overflow = "hidden"),
          (this.viewport_.style.width = "100%"),
          (this.viewport_.style.height = "100%"),
          (this.overlayContainer_ = document.createElement("div")),
          (this.overlayContainer_.style.position = "absolute"),
          (this.overlayContainer_.style.zIndex = "0"),
          (this.overlayContainer_.style.width = "100%"),
          (this.overlayContainer_.style.height = "100%"),
          (this.overlayContainer_.style.pointerEvents = "none"),
          (this.overlayContainer_.className = "ol-overlaycontainer"),
          this.viewport_.appendChild(this.overlayContainer_),
          (this.overlayContainerStopEvent_ = document.createElement("div")),
          (this.overlayContainerStopEvent_.style.position = "absolute"),
          (this.overlayContainerStopEvent_.style.zIndex = "0"),
          (this.overlayContainerStopEvent_.style.width = "100%"),
          (this.overlayContainerStopEvent_.style.height = "100%"),
          (this.overlayContainerStopEvent_.style.pointerEvents = "none"),
          (this.overlayContainerStopEvent_.className = "ol-overlaycontainer-stopevent"),
          this.viewport_.appendChild(this.overlayContainerStopEvent_),
          (this.mapBrowserEventHandler_ = null),
          (this.moveTolerance_ = t.moveTolerance),
          (this.keyboardEventTarget_ = n.keyboardEventTarget),
          (this.targetChangeHandlerKeys_ = null),
          (this.targetElement_ = null),
          (this.resizeObserver_ = new ResizeObserver(() => this.updateSize())),
          (this.controls = n.controls || z0()),
          (this.interactions = n.interactions || pv({ onFocusOnly: !0 })),
          (this.overlays_ = n.overlays),
          (this.overlayIdIndex_ = {}),
          (this.renderer_ = null),
          (this.postRenderFunctions_ = []),
          (this.tileQueue_ = new $0(this.getTilePriority.bind(this), this.handleTileChange_.bind(this))),
          this.addChangeListener(Ut.LAYERGROUP, this.handleLayerGroupChanged_),
          this.addChangeListener(Ut.VIEW, this.handleViewChanged_),
          this.addChangeListener(Ut.SIZE, this.handleSizeChanged_),
          this.addChangeListener(Ut.TARGET, this.handleTargetChanged_),
          this.setProperties(n.values);
      const i = this;
      t.view &&
          !(t.view instanceof Pe) &&
          t.view.then(function (s) {
              i.setView(new Pe(s));
          }),
          this.controls.addEventListener(ge.ADD, (s) => {
              s.element.setMap(this);
          }),
          this.controls.addEventListener(ge.REMOVE, (s) => {
              s.element.setMap(null);
          }),
          this.interactions.addEventListener(ge.ADD, (s) => {
              s.element.setMap(this);
          }),
          this.interactions.addEventListener(ge.REMOVE, (s) => {
              s.element.setMap(null);
          }),
          this.overlays_.addEventListener(ge.ADD, (s) => {
              this.addOverlayInternal_(s.element);
          }),
          this.overlays_.addEventListener(ge.REMOVE, (s) => {
              const r = s.element.getId();
              r !== void 0 && delete this.overlayIdIndex_[r.toString()], s.element.setMap(null);
          }),
          this.controls.forEach((s) => {
              s.setMap(this);
          }),
          this.interactions.forEach((s) => {
              s.setMap(this);
          }),
          this.overlays_.forEach(this.addOverlayInternal_.bind(this));
  }
  addControl(t) {
      this.getControls().push(t);
  }
  addInteraction(t) {
      this.getInteractions().push(t);
  }
  addLayer(t) {
      this.getLayerGroup().getLayers().push(t);
  }
  handleLayerAdd_(t) {
      Dh(t.layer, this);
  }
  addOverlay(t) {
      this.getOverlays().push(t);
  }
  addOverlayInternal_(t) {
      const n = t.getId();
      n !== void 0 && (this.overlayIdIndex_[n.toString()] = t), t.setMap(this);
  }
  disposeInternal() {
      this.controls.clear(), this.interactions.clear(), this.overlays_.clear(), this.resizeObserver_.disconnect(), this.setTarget(null), super.disposeInternal();
  }
  forEachFeatureAtPixel(t, n, i) {
      if (!this.frameState_ || !this.renderer_) return;
      const s = this.getCoordinateFromPixelInternal(t);
      i = i !== void 0 ? i : {};
      const r = i.hitTolerance !== void 0 ? i.hitTolerance : 0,
          o = i.layerFilter !== void 0 ? i.layerFilter : qs,
          a = i.checkWrapped !== !1;
      return this.renderer_.forEachFeatureAtCoordinate(s, this.frameState_, r, a, n, null, o, null);
  }
  getFeaturesAtPixel(t, n) {
      const i = [];
      return (
          this.forEachFeatureAtPixel(
              t,
              function (s) {
                  i.push(s);
              },
              n
          ),
          i
      );
  }
  getAllLayers() {
      const t = [];
      function n(i) {
          i.forEach(function (s) {
              s instanceof wi ? n(s.getLayers()) : t.push(s);
          });
      }
      return n(this.getLayers()), t;
  }
  hasFeatureAtPixel(t, n) {
      if (!this.frameState_ || !this.renderer_) return !1;
      const i = this.getCoordinateFromPixelInternal(t);
      n = n !== void 0 ? n : {};
      const s = n.layerFilter !== void 0 ? n.layerFilter : qs,
          r = n.hitTolerance !== void 0 ? n.hitTolerance : 0,
          o = n.checkWrapped !== !1;
      return this.renderer_.hasFeatureAtCoordinate(i, this.frameState_, r, o, s, null);
  }
  getEventCoordinate(t) {
      return this.getCoordinateFromPixel(this.getEventPixel(t));
  }
  getEventCoordinateInternal(t) {
      return this.getCoordinateFromPixelInternal(this.getEventPixel(t));
  }
  getEventPixel(t) {
      const i = this.viewport_.getBoundingClientRect(),
          s = this.getSize(),
          r = i.width / s[0],
          o = i.height / s[1],
          a = "changedTouches" in t ? t.changedTouches[0] : t;
      return [(a.clientX - i.left) / r, (a.clientY - i.top) / o];
  }
  getTarget() {
      return this.get(Ut.TARGET);
  }
  getTargetElement() {
      return this.targetElement_;
  }
  getCoordinateFromPixel(t) {
      return xo(this.getCoordinateFromPixelInternal(t), this.getView().getProjection());
  }
  getCoordinateFromPixelInternal(t) {
      const n = this.frameState_;
      return n ? fe(n.pixelToCoordinateTransform, t.slice()) : null;
  }
  getControls() {
      return this.controls;
  }
  getOverlays() {
      return this.overlays_;
  }
  getOverlayById(t) {
      const n = this.overlayIdIndex_[t.toString()];
      return n !== void 0 ? n : null;
  }
  getInteractions() {
      return this.interactions;
  }
  getLayerGroup() {
      return this.get(Ut.LAYERGROUP);
  }
  setLayers(t) {
      const n = this.getLayerGroup();
      if (t instanceof je) {
          n.setLayers(t);
          return;
      }
      const i = n.getLayers();
      i.clear(), i.extend(t);
  }
  getLayers() {
      return this.getLayerGroup().getLayers();
  }
  getLoadingOrNotReady() {
      const t = this.getLayerGroup().getLayerStatesArray();
      for (let n = 0, i = t.length; n < i; ++n) {
          const s = t[n];
          if (!s.visible) continue;
          const r = s.layer.getRenderer();
          if (r && !r.ready) return !0;
          const o = s.layer.getSource();
          if (o && o.loading) return !0;
      }
      return !1;
  }
  getPixelFromCoordinate(t) {
      const n = $e(t, this.getView().getProjection());
      return this.getPixelFromCoordinateInternal(n);
  }
  getPixelFromCoordinateInternal(t) {
      const n = this.frameState_;
      return n ? fe(n.coordinateToPixelTransform, t.slice(0, 2)) : null;
  }
  getRenderer() {
      return this.renderer_;
  }
  getSize() {
      return this.get(Ut.SIZE);
  }
  getView() {
      return this.get(Ut.VIEW);
  }
  getViewport() {
      return this.viewport_;
  }
  getOverlayContainer() {
      return this.overlayContainer_;
  }
  getOverlayContainerStopEvent() {
      return this.overlayContainerStopEvent_;
  }
  getOwnerDocument() {
      const t = this.getTargetElement();
      return t ? t.ownerDocument : document;
  }
  getTilePriority(t, n, i, s) {
      return V0(this.frameState_, t, n, i, s);
  }
  handleBrowserEvent(t, n) {
      n = n || t.type;
      const i = new Be(n, this, t);
      this.handleMapBrowserEvent(i);
  }
  handleMapBrowserEvent(t) {
      if (!this.frameState_) return;
      const n = t.originalEvent,
          i = n.type;
      if (i === So.POINTERDOWN || i === at.WHEEL || i === at.KEYDOWN) {
          const s = this.getOwnerDocument(),
              r = this.viewport_.getRootNode ? this.viewport_.getRootNode() : s,
              o = n.target;
          if (this.overlayContainerStopEvent_.contains(o) || !(r === s ? s.documentElement : r).contains(o)) return;
      }
      if (((t.frameState = this.frameState_), this.dispatchEvent(t) !== !1)) {
          const s = this.getInteractions().getArray().slice();
          for (let r = s.length - 1; r >= 0; r--) {
              const o = s[r];
              if (o.getMap() !== this || !o.getActive() || !this.getTargetElement()) continue;
              if (!o.handleEvent(t) || t.propagationStopped) break;
          }
      }
  }
  handlePostRender() {
      const t = this.frameState_,
          n = this.tileQueue_;
      if (!n.isEmpty()) {
          let s = this.maxTilesLoading_,
              r = s;
          if (t) {
              const o = t.viewHints;
              if (o[de.ANIMATING] || o[de.INTERACTING]) {
                  const a = Date.now() - t.time > 8;
                  (s = a ? 0 : 8), (r = a ? 0 : 2);
              }
          }
          n.getTilesLoading() < s && (n.reprioritize(), n.loadMoreTiles(s, r));
      }
      t &&
          this.renderer_ &&
          !t.animate &&
          (this.renderComplete_ === !0
              ? (this.hasListener(on.RENDERCOMPLETE) && this.renderer_.dispatchRenderEvent(on.RENDERCOMPLETE, t), this.loaded_ === !1 && ((this.loaded_ = !0), this.dispatchEvent(new Jn(qe.LOADEND, this, t))))
              : this.loaded_ === !0 && ((this.loaded_ = !1), this.dispatchEvent(new Jn(qe.LOADSTART, this, t))));
      const i = this.postRenderFunctions_;
      for (let s = 0, r = i.length; s < r; ++s) i[s](this, t);
      i.length = 0;
  }
  handleSizeChanged_() {
      this.getView() && !this.getView().getAnimating() && this.getView().resolveConstraints(0), this.render();
  }
  handleTargetChanged_() {
      if (this.mapBrowserEventHandler_) {
          for (let i = 0, s = this.targetChangeHandlerKeys_.length; i < s; ++i) Lt(this.targetChangeHandlerKeys_[i]);
          (this.targetChangeHandlerKeys_ = null),
              this.viewport_.removeEventListener(at.CONTEXTMENU, this.boundHandleBrowserEvent_),
              this.viewport_.removeEventListener(at.WHEEL, this.boundHandleBrowserEvent_),
              this.mapBrowserEventHandler_.dispose(),
              (this.mapBrowserEventHandler_ = null),
              Oo(this.viewport_);
      }
      if (this.targetElement_) {
          this.resizeObserver_.unobserve(this.targetElement_);
          const i = this.targetElement_.getRootNode();
          i instanceof ShadowRoot && this.resizeObserver_.unobserve(i.host), this.setSize(void 0);
      }
      const t = this.getTarget(),
          n = typeof t == "string" ? document.getElementById(t) : t;
      if (((this.targetElement_ = n), !n))
          this.renderer_ && (clearTimeout(this.postRenderTimeoutHandle_), (this.postRenderTimeoutHandle_ = void 0), (this.postRenderFunctions_.length = 0), this.renderer_.dispose(), (this.renderer_ = null)),
              this.animationDelayKey_ && (cancelAnimationFrame(this.animationDelayKey_), (this.animationDelayKey_ = void 0));
      else {
          n.appendChild(this.viewport_), this.renderer_ || (this.renderer_ = new D0(this)), (this.mapBrowserEventHandler_ = new F0(this, this.moveTolerance_));
          for (const r in Rt) this.mapBrowserEventHandler_.addEventListener(Rt[r], this.handleMapBrowserEvent.bind(this));
          this.viewport_.addEventListener(at.CONTEXTMENU, this.boundHandleBrowserEvent_, !1), this.viewport_.addEventListener(at.WHEEL, this.boundHandleBrowserEvent_, gh ? { passive: !1 } : !1);
          const i = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : n;
          this.targetChangeHandlerKeys_ = [_t(i, at.KEYDOWN, this.handleBrowserEvent, this), _t(i, at.KEYPRESS, this.handleBrowserEvent, this)];
          const s = n.getRootNode();
          s instanceof ShadowRoot && this.resizeObserver_.observe(s.host), this.resizeObserver_.observe(n);
      }
      this.updateSize();
  }
  handleTileChange_() {
      this.render();
  }
  handleViewPropertyChanged_() {
      this.render();
  }
  handleViewChanged_() {
      this.viewPropertyListenerKey_ && (Lt(this.viewPropertyListenerKey_), (this.viewPropertyListenerKey_ = null)), this.viewChangeListenerKey_ && (Lt(this.viewChangeListenerKey_), (this.viewChangeListenerKey_ = null));
      const t = this.getView();
      t &&
          (this.updateViewportSize_(this.getSize()),
          (this.viewPropertyListenerKey_ = _t(t, Zi.PROPERTYCHANGE, this.handleViewPropertyChanged_, this)),
          (this.viewChangeListenerKey_ = _t(t, at.CHANGE, this.handleViewPropertyChanged_, this)),
          t.resolveConstraints(0)),
          this.render();
  }
  handleLayerGroupChanged_() {
      this.layerGroupPropertyListenerKeys_ && (this.layerGroupPropertyListenerKeys_.forEach(Lt), (this.layerGroupPropertyListenerKeys_ = null));
      const t = this.getLayerGroup();
      t &&
          (this.handleLayerAdd_(new tn("addlayer", t)),
          (this.layerGroupPropertyListenerKeys_ = [_t(t, Zi.PROPERTYCHANGE, this.render, this), _t(t, at.CHANGE, this.render, this), _t(t, "addlayer", this.handleLayerAdd_, this), _t(t, "removelayer", this.handleLayerRemove_, this)])),
          this.render();
  }
  isRendered() {
      return !!this.frameState_;
  }
  animationDelay_() {
      (this.animationDelayKey_ = void 0), this.renderFrame_(Date.now());
  }
  renderSync() {
      this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_), this.animationDelay_();
  }
  redrawText() {
      const t = this.getLayerGroup().getLayerStatesArray();
      for (let n = 0, i = t.length; n < i; ++n) {
          const s = t[n].layer;
          s.hasRenderer() && s.getRenderer().handleFontsChanged();
      }
  }
  render() {
      this.renderer_ && this.animationDelayKey_ === void 0 && (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_));
  }
  flushDeclutterItems() {
      const t = this.frameState_;
      t && this.renderer_.flushDeclutterItems(t);
  }
  removeControl(t) {
      return this.getControls().remove(t);
  }
  removeInteraction(t) {
      return this.getInteractions().remove(t);
  }
  removeLayer(t) {
      return this.getLayerGroup().getLayers().remove(t);
  }
  handleLayerRemove_(t) {
      Nh(t.layer);
  }
  removeOverlay(t) {
      return this.getOverlays().remove(t);
  }
  renderFrame_(t) {
      const n = this.getSize(),
          i = this.getView(),
          s = this.frameState_;
      let r = null;
      if (n !== void 0 && jc(n) && i && i.isDef()) {
          const o = i.getHints(this.frameState_ ? this.frameState_.viewHints : void 0),
              a = i.getState();
          if (
              ((r = {
                  animate: !1,
                  coordinateToPixelTransform: this.coordinateToPixelTransform_,
                  declutterTree: null,
                  extent: Ao(a.center, a.resolution, a.rotation, n),
                  index: this.frameIndex_++,
                  layerIndex: 0,
                  layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
                  pixelRatio: this.pixelRatio_,
                  pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
                  postRenderFunctions: [],
                  size: n,
                  tileQueue: this.tileQueue_,
                  time: t,
                  usedTiles: {},
                  viewState: a,
                  viewHints: o,
                  wantedTiles: {},
                  mapId: te(this),
                  renderTargets: {},
              }),
              a.nextCenter && a.nextResolution)
          ) {
              const c = isNaN(a.nextRotation) ? a.rotation : a.nextRotation;
              r.nextExtent = Ao(a.nextCenter, a.nextResolution, c, n);
          }
      }
      (this.frameState_ = r),
          this.renderer_.renderFrame(r),
          r &&
              (r.animate && this.render(),
              Array.prototype.push.apply(this.postRenderFunctions_, r.postRenderFunctions),
              s && (!this.previousExtent_ || (!ns(this.previousExtent_) && !Co(r.extent, this.previousExtent_))) && (this.dispatchEvent(new Jn(qe.MOVESTART, this, s)), (this.previousExtent_ = ts(this.previousExtent_))),
              this.previousExtent_ && !r.viewHints[de.ANIMATING] && !r.viewHints[de.INTERACTING] && !Co(r.extent, this.previousExtent_) && (this.dispatchEvent(new Jn(qe.MOVEEND, this, r)), ZE(r.extent, this.previousExtent_))),
          this.dispatchEvent(new Jn(qe.POSTRENDER, this, r)),
          (this.renderComplete_ =
              this.hasListener(qe.LOADSTART) || this.hasListener(qe.LOADEND) || this.hasListener(on.RENDERCOMPLETE) ? !this.tileQueue_.getTilesLoading() && !this.tileQueue_.getCount() && !this.getLoadingOrNotReady() : void 0),
          this.postRenderTimeoutHandle_ ||
              (this.postRenderTimeoutHandle_ = setTimeout(() => {
                  (this.postRenderTimeoutHandle_ = void 0), this.handlePostRender();
              }, 0));
  }
  setLayerGroup(t) {
      const n = this.getLayerGroup();
      n && this.handleLayerRemove_(new tn("removelayer", n)), this.set(Ut.LAYERGROUP, t);
  }
  setSize(t) {
      this.set(Ut.SIZE, t);
  }
  setTarget(t) {
      this.set(Ut.TARGET, t);
  }
  setView(t) {
      if (!t || t instanceof Pe) {
          this.set(Ut.VIEW, t);
          return;
      }
      this.set(Ut.VIEW, new Pe());
      const n = this;
      t.then(function (i) {
          n.setView(new Pe(i));
      });
  }
  updateSize() {
      const t = this.getTargetElement();
      let n;
      if (t) {
          const s = getComputedStyle(t),
              r = t.offsetWidth - parseFloat(s.borderLeftWidth) - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight) - parseFloat(s.borderRightWidth),
              o = t.offsetHeight - parseFloat(s.borderTopWidth) - parseFloat(s.paddingTop) - parseFloat(s.paddingBottom) - parseFloat(s.borderBottomWidth);
          !isNaN(r) && !isNaN(o) && ((n = [r, o]), !jc(n) && (t.offsetWidth || t.offsetHeight || t.getClientRects().length) && oh("No map visible because the map container's width or height are 0."));
      }
      const i = this.getSize();
      n && (!i || !vr(n, i)) && (this.setSize(n), this.updateViewportSize_(n));
  }
  updateViewportSize_(t) {
      const n = this.getView();
      n && n.setViewportSize(t);
  }
};
function yv(e) {
  let t = null;
  e.keyboardEventTarget !== void 0 && (t = typeof e.keyboardEventTarget == "string" ? document.getElementById(e.keyboardEventTarget) : e.keyboardEventTarget);
  const n = {},
      i = e.layers && typeof e.layers.getLayers == "function" ? e.layers : new wi({ layers: e.layers });
  (n[Ut.LAYERGROUP] = i), (n[Ut.TARGET] = e.target), (n[Ut.VIEW] = e.view instanceof Pe ? e.view : new Pe());
  let s;
  e.controls !== void 0 && (Array.isArray(e.controls) ? (s = new je(e.controls.slice())) : (Tt(typeof e.controls.getArray == "function", "Expected `controls` to be an array or an `ol/Collection.js`"), (s = e.controls)));
  let r;
  e.interactions !== void 0 &&
      (Array.isArray(e.interactions) ? (r = new je(e.interactions.slice())) : (Tt(typeof e.interactions.getArray == "function", "Expected `interactions` to be an array or an `ol/Collection.js`"), (r = e.interactions)));
  let o;
  return (
      e.overlays !== void 0
          ? Array.isArray(e.overlays)
              ? (o = new je(e.overlays.slice()))
              : (Tt(typeof e.overlays.getArray == "function", "Expected `overlays` to be an array or an `ol/Collection.js`"), (o = e.overlays))
          : (o = new je()),
      { controls: s, interactions: r, keyboardEventTarget: t, overlays: o, values: n }
  );
}
const vv = Ev,
  Ns = { PRELOAD: "preload", USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError" };
class Tv extends Ca {
  constructor(t) {
      t = t || {};
      const n = Object.assign({}, t);
      delete n.preload,
          delete n.useInterimTilesOnError,
          super(n),
          this.on,
          this.once,
          this.un,
          this.setPreload(t.preload !== void 0 ? t.preload : 0),
          this.setUseInterimTilesOnError(t.useInterimTilesOnError !== void 0 ? t.useInterimTilesOnError : !0);
  }
  getPreload() {
      return this.get(Ns.PRELOAD);
  }
  setPreload(t) {
      this.set(Ns.PRELOAD, t);
  }
  getUseInterimTilesOnError() {
      return this.get(Ns.USE_INTERIM_TILES_ON_ERROR);
  }
  setUseInterimTilesOnError(t) {
      this.set(Ns.USE_INTERIM_TILES_ON_ERROR, t);
  }
  getData(t) {
      return super.getData(t);
  }
}
const Xn = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3, EMPTY: 4 };
class bv extends is {
  constructor(t) {
      super(), (this.ready = !0), (this.boundHandleImageChange_ = this.handleImageChange_.bind(this)), (this.layer_ = t), (this.declutterExecutorGroup = null);
  }
  getFeatures(t) {
      return It();
  }
  getData(t) {
      return null;
  }
  prepareFrame(t) {
      return It();
  }
  renderFrame(t, n) {
      return It();
  }
  loadedTileCallback(t, n, i) {
      t[n] || (t[n] = {}), (t[n][i.tileCoord.toString()] = i);
  }
  createLoadedTileFinder(t, n, i) {
      return (s, r) => {
          const o = this.loadedTileCallback.bind(this, i, s);
          return t.forEachLoadedTile(n, s, r, o);
      };
  }
  forEachFeatureAtCoordinate(t, n, i, s, r) {}
  getLayer() {
      return this.layer_;
  }
  handleFontsChanged() {}
  handleImageChange_(t) {
      const n = t.target;
      (n.getState() === Xn.LOADED || n.getState() === Xn.ERROR) && this.renderIfReadyAndVisible();
  }
  loadImage(t) {
      let n = t.getState();
      return n != Xn.LOADED && n != Xn.ERROR && t.addEventListener(at.CHANGE, this.boundHandleImageChange_), n == Xn.IDLE && (t.load(), (n = t.getState())), n == Xn.LOADED;
  }
  renderIfReadyAndVisible() {
      const t = this.getLayer();
      t && t.getVisible() && t.getSourceState() === "ready" && t.changed();
  }
  disposeInternal() {
      delete this.layer_, super.disposeInternal();
  }
}
let ti = null;
function Cv() {
  ti = _i(1, 1, void 0, { willReadFrequently: !0 });
}
class wv extends bv {
  constructor(t) {
      super(t),
          (this.container = null),
          this.renderedResolution,
          (this.tempTransform = ui()),
          (this.pixelTransform = ui()),
          (this.inversePixelTransform = ui()),
          (this.context = null),
          (this.containerReused = !1),
          (this.pixelContext_ = null),
          (this.frameState = null);
  }
  getImageData(t, n, i) {
      ti || Cv(), ti.clearRect(0, 0, 1, 1);
      let s;
      try {
          ti.drawImage(t, n, i, 1, 1, 0, 0, 1, 1), (s = ti.getImageData(0, 0, 1, 1).data);
      } catch {
          return (ti = null), null;
      }
      return s;
  }
  getBackground(t) {
      let i = this.getLayer().getBackground();
      return typeof i == "function" && (i = i(t.viewState.resolution)), i || void 0;
  }
  useContainer(t, n, i) {
      const s = this.getLayer().getClassName();
      let r, o;
      if (t && t.className === s && (!i || (t && t.style.backgroundColor && vr(Dc(t.style.backgroundColor), Dc(i))))) {
          const a = t.firstElementChild;
          a instanceof HTMLCanvasElement && (o = a.getContext("2d"));
      }
      if (
          (o && o.canvas.style.transform === n
              ? ((this.container = t), (this.context = o), (this.containerReused = !0))
              : this.containerReused
              ? ((this.container = null), (this.context = null), (this.containerReused = !1))
              : this.container && (this.container.style.backgroundColor = null),
          !this.container)
      ) {
          (r = document.createElement("div")), (r.className = s);
          let a = r.style;
          (a.position = "absolute"), (a.width = "100%"), (a.height = "100%"), (o = _i());
          const c = o.canvas;
          r.appendChild(c), (a = c.style), (a.position = "absolute"), (a.left = "0"), (a.transformOrigin = "top left"), (this.container = r), (this.context = o);
      }
      !this.containerReused && i && !this.container.style.backgroundColor && (this.container.style.backgroundColor = i);
  }
  clipUnrotated(t, n, i) {
      const s = Fn(i),
          r = yr(i),
          o = Er(i),
          a = mr(i);
      fe(n.coordinateToPixelTransform, s), fe(n.coordinateToPixelTransform, r), fe(n.coordinateToPixelTransform, o), fe(n.coordinateToPixelTransform, a);
      const c = this.inversePixelTransform;
      fe(c, s),
          fe(c, r),
          fe(c, o),
          fe(c, a),
          t.save(),
          t.beginPath(),
          t.moveTo(Math.round(s[0]), Math.round(s[1])),
          t.lineTo(Math.round(r[0]), Math.round(r[1])),
          t.lineTo(Math.round(o[0]), Math.round(o[1])),
          t.lineTo(Math.round(a[0]), Math.round(a[1])),
          t.clip();
  }
  dispatchRenderEvent_(t, n, i) {
      const s = this.getLayer();
      if (s.hasListener(t)) {
          const r = new xh(t, this.inversePixelTransform, i, n);
          s.dispatchEvent(r);
      }
  }
  preRender(t, n) {
      (this.frameState = n), this.dispatchRenderEvent_(on.PRERENDER, t, n);
  }
  postRender(t, n) {
      this.dispatchRenderEvent_(on.POSTRENDER, t, n);
  }
  getRenderTransform(t, n, i, s, r, o, a) {
      const c = r / 2,
          u = o / 2,
          h = s / n,
          f = -h,
          g = -t[0] + a,
          _ = -t[1];
      return Bi(this.tempTransform, c, u, h, f, -i, g, _);
  }
  disposeInternal() {
      delete this.frameState, super.disposeInternal();
  }
}
class Fh extends _a {
  constructor(t, n, i) {
      super(),
          (i = i || {}),
          (this.tileCoord = t),
          (this.state = n),
          (this.interimTile = null),
          (this.key = ""),
          (this.transition_ = i.transition === void 0 ? 250 : i.transition),
          (this.transitionStarts_ = {}),
          (this.interpolate = !!i.interpolate);
  }
  changed() {
      this.dispatchEvent(at.CHANGE);
  }
  release() {
      this.state === Z.ERROR && this.setState(Z.EMPTY);
  }
  getKey() {
      return this.key + "/" + this.tileCoord;
  }
  getInterimTile() {
      let t = this.interimTile;
      if (!t) return this;
      do {
          if (t.getState() == Z.LOADED) return (this.transition_ = 0), t;
          t = t.interimTile;
      } while (t);
      return this;
  }
  refreshInterimChain() {
      let t = this.interimTile;
      if (!t) return;
      let n = this;
      do {
          if (t.getState() == Z.LOADED) {
              t.interimTile = null;
              break;
          }
          t.getState() == Z.LOADING ? (n = t) : t.getState() == Z.IDLE ? (n.interimTile = t.interimTile) : (n = t), (t = n.interimTile);
      } while (t);
  }
  getTileCoord() {
      return this.tileCoord;
  }
  getState() {
      return this.state;
  }
  setState(t) {
      if (this.state !== Z.ERROR && this.state > t) throw new Error("Tile load sequence violation");
      (this.state = t), this.changed();
  }
  load() {
      It();
  }
  getAlpha(t, n) {
      if (!this.transition_) return 1;
      let i = this.transitionStarts_[t];
      if (!i) (i = n), (this.transitionStarts_[t] = i);
      else if (i === -1) return 1;
      const s = n - i + 1e3 / 60;
      return s >= this.transition_ ? 1 : uh(s / this.transition_);
  }
  inTransition(t) {
      return this.transition_ ? this.transitionStarts_[t] !== -1 : !1;
  }
  endTransition(t) {
      this.transition_ && (this.transitionStarts_[t] = -1);
  }
}
function Av(e, t, n) {
  const i = e;
  let s = !0,
      r = !1,
      o = !1;
  const a = [
      Js(i, at.LOAD, function () {
          (o = !0), r || t();
      }),
  ];
  return (
      i.src && Gy
          ? ((r = !0),
            i
                .decode()
                .then(function () {
                    s && t();
                })
                .catch(function (c) {
                    s && (o ? t() : n());
                }))
          : a.push(Js(i, at.ERROR, n)),
      function () {
          (s = !1), a.forEach(Lt);
      }
  );
}
class kh extends Fh {
  constructor(t, n, i, s, r, o) {
      super(t, n, o), (this.crossOrigin_ = s), (this.src_ = i), (this.key = i), (this.image_ = new Image()), s !== null && (this.image_.crossOrigin = s), (this.unlisten_ = null), (this.tileLoadFunction_ = r);
  }
  getImage() {
      return this.image_;
  }
  setImage(t) {
      (this.image_ = t), (this.state = Z.LOADED), this.unlistenImage_(), this.changed();
  }
  handleImageError_() {
      (this.state = Z.ERROR), this.unlistenImage_(), (this.image_ = Rv()), this.changed();
  }
  handleImageLoad_() {
      const t = this.image_;
      t.naturalWidth && t.naturalHeight ? (this.state = Z.LOADED) : (this.state = Z.EMPTY), this.unlistenImage_(), this.changed();
  }
  load() {
      this.state == Z.ERROR && ((this.state = Z.IDLE), (this.image_ = new Image()), this.crossOrigin_ !== null && (this.image_.crossOrigin = this.crossOrigin_)),
          this.state == Z.IDLE && ((this.state = Z.LOADING), this.changed(), this.tileLoadFunction_(this, this.src_), (this.unlisten_ = Av(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this))));
  }
  unlistenImage_() {
      this.unlisten_ && (this.unlisten_(), (this.unlisten_ = null));
  }
}
function Rv() {
  const e = _i(1, 1);
  return (e.fillStyle = "rgba(0,0,0,0)"), e.fillRect(0, 0, 1, 1), e.canvas;
}
const Iv = 0.5,
  xv = 10,
  Kc = 0.25;
class Ov {
  constructor(t, n, i, s, r, o) {
      (this.sourceProj_ = t), (this.targetProj_ = n);
      let a = {};
      const c = Xi(this.targetProj_, this.sourceProj_);
      (this.transformInv_ = function (R) {
          const M = R[0] + "/" + R[1];
          return a[M] || (a[M] = c(R)), a[M];
      }),
          (this.maxSourceExtent_ = s),
          (this.errorThresholdSquared_ = r * r),
          (this.triangles_ = []),
          (this.wrapsXInSource_ = !1),
          (this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!s && !!this.sourceProj_.getExtent() && Ft(s) >= Ft(this.sourceProj_.getExtent())),
          (this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? Ft(this.sourceProj_.getExtent()) : null),
          (this.targetWorldWidth_ = this.targetProj_.getExtent() ? Ft(this.targetProj_.getExtent()) : null);
      const u = Fn(i),
          h = yr(i),
          f = Er(i),
          g = mr(i),
          _ = this.transformInv_(u),
          T = this.transformInv_(h),
          v = this.transformInv_(f),
          b = this.transformInv_(g),
          x = xv + (o ? Math.max(0, Math.ceil(Math.log2(wo(i) / (o * o * 256 * 256)))) : 0);
      if ((this.addQuad_(u, h, f, g, _, T, v, b, x), this.wrapsXInSource_)) {
          let R = 1 / 0;
          this.triangles_.forEach(function (M, I, w) {
              R = Math.min(R, M.source[0][0], M.source[1][0], M.source[2][0]);
          }),
              this.triangles_.forEach((M) => {
                  if (Math.max(M.source[0][0], M.source[1][0], M.source[2][0]) - R > this.sourceWorldWidth_ / 2) {
                      const I = [
                          [M.source[0][0], M.source[0][1]],
                          [M.source[1][0], M.source[1][1]],
                          [M.source[2][0], M.source[2][1]],
                      ];
                      I[0][0] - R > this.sourceWorldWidth_ / 2 && (I[0][0] -= this.sourceWorldWidth_),
                          I[1][0] - R > this.sourceWorldWidth_ / 2 && (I[1][0] -= this.sourceWorldWidth_),
                          I[2][0] - R > this.sourceWorldWidth_ / 2 && (I[2][0] -= this.sourceWorldWidth_);
                      const w = Math.min(I[0][0], I[1][0], I[2][0]);
                      Math.max(I[0][0], I[1][0], I[2][0]) - w < this.sourceWorldWidth_ / 2 && (M.source = I);
                  }
              });
      }
      a = {};
  }
  addTriangle_(t, n, i, s, r, o) {
      this.triangles_.push({ source: [s, r, o], target: [t, n, i] });
  }
  addQuad_(t, n, i, s, r, o, a, c, u) {
      const h = dc([r, o, a, c]),
          f = this.sourceWorldWidth_ ? Ft(h) / this.sourceWorldWidth_ : null,
          g = this.sourceWorldWidth_,
          _ = this.sourceProj_.canWrapX() && f > 0.5 && f < 1;
      let T = !1;
      if (u > 0) {
          if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
              const b = dc([t, n, i, s]);
              T = Ft(b) / this.targetWorldWidth_ > Kc || T;
          }
          !_ && this.sourceProj_.isGlobal() && f && (T = f > Kc || T);
      }
      if (!T && this.maxSourceExtent_ && isFinite(h[0]) && isFinite(h[1]) && isFinite(h[2]) && isFinite(h[3]) && !es(h, this.maxSourceExtent_)) return;
      let v = 0;
      if (!T && (!isFinite(r[0]) || !isFinite(r[1]) || !isFinite(o[0]) || !isFinite(o[1]) || !isFinite(a[0]) || !isFinite(a[1]) || !isFinite(c[0]) || !isFinite(c[1]))) {
          if (u > 0) T = !0;
          else if (
              ((v = (!isFinite(r[0]) || !isFinite(r[1]) ? 8 : 0) + (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) + (!isFinite(a[0]) || !isFinite(a[1]) ? 2 : 0) + (!isFinite(c[0]) || !isFinite(c[1]) ? 1 : 0)),
              v != 1 && v != 2 && v != 4 && v != 8)
          )
              return;
      }
      if (u > 0) {
          if (!T) {
              const b = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2],
                  x = this.transformInv_(b);
              let R;
              _ ? (R = (In(r[0], g) + In(a[0], g)) / 2 - In(x[0], g)) : (R = (r[0] + a[0]) / 2 - x[0]);
              const M = (r[1] + a[1]) / 2 - x[1];
              T = R * R + M * M > this.errorThresholdSquared_;
          }
          if (T) {
              if (Math.abs(t[0] - i[0]) <= Math.abs(t[1] - i[1])) {
                  const b = [(n[0] + i[0]) / 2, (n[1] + i[1]) / 2],
                      x = this.transformInv_(b),
                      R = [(s[0] + t[0]) / 2, (s[1] + t[1]) / 2],
                      M = this.transformInv_(R);
                  this.addQuad_(t, n, b, R, r, o, x, M, u - 1), this.addQuad_(R, b, i, s, M, x, a, c, u - 1);
              } else {
                  const b = [(t[0] + n[0]) / 2, (t[1] + n[1]) / 2],
                      x = this.transformInv_(b),
                      R = [(i[0] + s[0]) / 2, (i[1] + s[1]) / 2],
                      M = this.transformInv_(R);
                  this.addQuad_(t, b, R, s, r, x, M, c, u - 1), this.addQuad_(b, n, i, R, x, o, a, M, u - 1);
              }
              return;
          }
      }
      if (_) {
          if (!this.canWrapXInSource_) return;
          this.wrapsXInSource_ = !0;
      }
      v & 11 || this.addTriangle_(t, i, s, r, a, c), v & 14 || this.addTriangle_(t, i, n, r, a, o), v && (v & 13 || this.addTriangle_(n, s, t, o, c, r), v & 7 || this.addTriangle_(n, s, i, o, c, a));
  }
  calculateSourceExtent() {
      const t = Dn();
      return (
          this.triangles_.forEach(function (n, i, s) {
              const r = n.source;
              Gs(t, r[0]), Gs(t, r[1]), Gs(t, r[2]);
          }),
          t
      );
  }
  getTriangles() {
      return this.triangles_;
  }
}
let io;
const hi = [];
function Gc(e, t, n, i, s) {
  e.beginPath(), e.moveTo(0, 0), e.lineTo(t, n), e.lineTo(i, s), e.closePath(), e.save(), e.clip(), e.fillRect(0, 0, Math.max(t, i) + 1, Math.max(n, s)), e.restore();
}
function so(e, t) {
  return Math.abs(e[t * 4] - 210) > 2 || Math.abs(e[t * 4 + 3] - 0.75 * 255) > 2;
}
function Sv() {
  if (io === void 0) {
      const e = _i(6, 6, hi);
      (e.globalCompositeOperation = "lighter"), (e.fillStyle = "rgba(210, 0, 0, 0.75)"), Gc(e, 4, 5, 4, 0), Gc(e, 4, 5, 0, 5);
      const t = e.getImageData(0, 0, 3, 3).data;
      (io = so(t, 0) || so(t, 4) || so(t, 8)), Aa(e), hi.push(e.canvas);
  }
  return io;
}
function Uc(e, t, n, i) {
  const s = ua(n, t, e);
  let r = _c(t, i, n);
  const o = t.getMetersPerUnit();
  o !== void 0 && (r *= o);
  const a = e.getMetersPerUnit();
  a !== void 0 && (r /= a);
  const c = e.getExtent();
  if (!c || ra(c, s)) {
      const u = _c(e, r, s) / r;
      isFinite(u) && u > 0 && (r /= u);
  }
  return r;
}
function Lv(e, t, n, i) {
  const s = Wi(n);
  let r = Uc(e, t, s, i);
  return (
      (!isFinite(r) || r <= 0) &&
          sh(n, function (o) {
              return (r = Uc(e, t, o, i)), isFinite(r) && r > 0;
          }),
      r
  );
}
function Pv(e, t, n, i, s, r, o, a, c, u, h, f, g) {
  const _ = _i(Math.round(n * e), Math.round(n * t), hi);
  if ((f || (_.imageSmoothingEnabled = !1), c.length === 0)) return _.canvas;
  _.scale(n, n);
  function T(R) {
      return Math.round(R * n) / n;
  }
  _.globalCompositeOperation = "lighter";
  const v = Dn();
  c.forEach(function (R, M, I) {
      JE(v, R.extent);
  });
  let b;
  if (!g || c.length !== 1 || u !== 0) {
      const R = Ft(v),
          M = we(v);
      (b = _i(Math.round((n * R) / i), Math.round((n * M) / i), hi)), f || (b.imageSmoothingEnabled = !1);
      const I = n / i;
      c.forEach(function (w, K, W) {
          const q = w.extent[0] - v[0],
              X = -(w.extent[3] - v[3]),
              Y = Ft(w.extent),
              B = we(w.extent);
          w.image.width > 0 && w.image.height > 0 && b.drawImage(w.image, u, u, w.image.width - 2 * u, w.image.height - 2 * u, q * I, X * I, Y * I, B * I);
      });
  }
  const x = Fn(o);
  return (
      a.getTriangles().forEach(function (R, M, I) {
          const w = R.source,
              K = R.target;
          let W = w[0][0],
              q = w[0][1],
              X = w[1][0],
              Y = w[1][1],
              B = w[2][0],
              Et = w[2][1];
          const ct = T((K[0][0] - x[0]) / r),
              xt = T(-(K[0][1] - x[1]) / r),
              bt = T((K[1][0] - x[0]) / r),
              et = T(-(K[1][1] - x[1]) / r),
              U = T((K[2][0] - x[0]) / r),
              J = T(-(K[2][1] - x[1]) / r),
              mt = W,
              At = q;
          (W = 0), (q = 0), (X -= mt), (Y -= At), (B -= mt), (Et -= At);
          const Pt = [
                  [X, Y, 0, 0, bt - ct],
                  [B, Et, 0, 0, U - ct],
                  [0, 0, X, Y, et - xt],
                  [0, 0, B, Et, J - xt],
              ],
              rt = oy(Pt);
          if (!rt) return;
          if ((_.save(), _.beginPath(), Sv() || !f)) {
              _.moveTo(bt, et);
              const lt = 4,
                  ut = ct - bt,
                  vt = xt - et;
              for (let yt = 0; yt < lt; yt++) _.lineTo(bt + T(((yt + 1) * ut) / lt), et + T((yt * vt) / (lt - 1))), yt != lt - 1 && _.lineTo(bt + T(((yt + 1) * ut) / lt), et + T(((yt + 1) * vt) / (lt - 1)));
              _.lineTo(U, J);
          } else _.moveTo(bt, et), _.lineTo(ct, xt), _.lineTo(U, J);
          _.clip(), _.transform(rt[0], rt[2], rt[1], rt[3], ct, xt), _.translate(v[0] - mt, v[3] - At);
          let Ct;
          if (b) (Ct = b.canvas), _.scale(i / n, -i / n);
          else {
              const lt = c[0],
                  ut = lt.extent;
              (Ct = lt.image), _.scale(Ft(ut) / Ct.width, -we(ut) / Ct.height);
          }
          _.drawImage(Ct, 0, 0), _.restore();
      }),
      b && (Aa(b), hi.push(b.canvas)),
      h &&
          (_.save(),
          (_.globalCompositeOperation = "source-over"),
          (_.strokeStyle = "black"),
          (_.lineWidth = 1),
          a.getTriangles().forEach(function (R, M, I) {
              const w = R.target,
                  K = (w[0][0] - x[0]) / r,
                  W = -(w[0][1] - x[1]) / r,
                  q = (w[1][0] - x[0]) / r,
                  X = -(w[1][1] - x[1]) / r,
                  Y = (w[2][0] - x[0]) / r,
                  B = -(w[2][1] - x[1]) / r;
              _.beginPath(), _.moveTo(q, X), _.lineTo(K, W), _.lineTo(Y, B), _.closePath(), _.stroke();
          }),
          _.restore()),
      _.canvas
  );
}
class Po extends Fh {
  constructor(t, n, i, s, r, o, a, c, u, h, f, g) {
      super(r, Z.IDLE, g),
          (this.renderEdges_ = f !== void 0 ? f : !1),
          (this.pixelRatio_ = a),
          (this.gutter_ = c),
          (this.canvas_ = null),
          (this.sourceTileGrid_ = n),
          (this.targetTileGrid_ = s),
          (this.wrappedTileCoord_ = o || r),
          (this.sourceTiles_ = []),
          (this.sourcesListenerKeys_ = null),
          (this.sourceZ_ = 0);
      const _ = s.getTileCoordExtent(this.wrappedTileCoord_),
          T = this.targetTileGrid_.getExtent();
      let v = this.sourceTileGrid_.getExtent();
      const b = T ? ki(_, T) : _;
      if (wo(b) === 0) {
          this.state = Z.EMPTY;
          return;
      }
      const x = t.getExtent();
      x && (v ? (v = ki(v, x)) : (v = x));
      const R = s.getResolution(this.wrappedTileCoord_[0]),
          M = Lv(t, i, b, R);
      if (!isFinite(M) || M <= 0) {
          this.state = Z.EMPTY;
          return;
      }
      const I = h !== void 0 ? h : Iv;
      if (((this.triangulation_ = new Ov(t, i, b, v, M * I, R)), this.triangulation_.getTriangles().length === 0)) {
          this.state = Z.EMPTY;
          return;
      }
      this.sourceZ_ = n.getZForResolution(M);
      let w = this.triangulation_.calculateSourceExtent();
      if ((v && (t.canWrapX() ? ((w[1] = Vt(w[1], v[1], v[3])), (w[3] = Vt(w[3], v[1], v[3]))) : (w = ki(w, v))), !wo(w))) this.state = Z.EMPTY;
      else {
          const K = n.getTileRangeForExtentAndZ(w, this.sourceZ_);
          for (let W = K.minX; W <= K.maxX; W++)
              for (let q = K.minY; q <= K.maxY; q++) {
                  const X = u(this.sourceZ_, W, q, a);
                  X && this.sourceTiles_.push(X);
              }
          this.sourceTiles_.length === 0 && (this.state = Z.EMPTY);
      }
  }
  getImage() {
      return this.canvas_;
  }
  reproject_() {
      const t = [];
      if (
          (this.sourceTiles_.forEach((n) => {
              n && n.getState() == Z.LOADED && t.push({ extent: this.sourceTileGrid_.getTileCoordExtent(n.tileCoord), image: n.getImage() });
          }),
          (this.sourceTiles_.length = 0),
          t.length === 0)
      )
          this.state = Z.ERROR;
      else {
          const n = this.wrappedTileCoord_[0],
              i = this.targetTileGrid_.getTileSize(n),
              s = typeof i == "number" ? i : i[0],
              r = typeof i == "number" ? i : i[1],
              o = this.targetTileGrid_.getResolution(n),
              a = this.sourceTileGrid_.getResolution(this.sourceZ_),
              c = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
          (this.canvas_ = Pv(s, r, this.pixelRatio_, a, this.sourceTileGrid_.getExtent(), o, c, this.triangulation_, t, this.gutter_, this.renderEdges_, this.interpolate)), (this.state = Z.LOADED);
      }
      this.changed();
  }
  load() {
      if (this.state == Z.IDLE) {
          (this.state = Z.LOADING), this.changed();
          let t = 0;
          (this.sourcesListenerKeys_ = []),
              this.sourceTiles_.forEach((n) => {
                  const i = n.getState();
                  if (i == Z.IDLE || i == Z.LOADING) {
                      t++;
                      const s = _t(
                          n,
                          at.CHANGE,
                          function (r) {
                              const o = n.getState();
                              (o == Z.LOADED || o == Z.ERROR || o == Z.EMPTY) && (Lt(s), t--, t === 0 && (this.unlistenSources_(), this.reproject_()));
                          },
                          this
                      );
                      this.sourcesListenerKeys_.push(s);
                  }
              }),
              t === 0
                  ? setTimeout(this.reproject_.bind(this), 0)
                  : this.sourceTiles_.forEach(function (n, i, s) {
                        n.getState() == Z.IDLE && n.load();
                    });
      }
  }
  unlistenSources_() {
      this.sourcesListenerKeys_.forEach(Lt), (this.sourcesListenerKeys_ = null);
  }
  release() {
      this.canvas_ && (Aa(this.canvas_.getContext("2d")), hi.push(this.canvas_), (this.canvas_ = null)), super.release();
  }
}
class Oa {
  constructor(t, n, i, s) {
      (this.minX = t), (this.maxX = n), (this.minY = i), (this.maxY = s);
  }
  contains(t) {
      return this.containsXY(t[1], t[2]);
  }
  containsTileRange(t) {
      return this.minX <= t.minX && t.maxX <= this.maxX && this.minY <= t.minY && t.maxY <= this.maxY;
  }
  containsXY(t, n) {
      return this.minX <= t && t <= this.maxX && this.minY <= n && n <= this.maxY;
  }
  equals(t) {
      return this.minX == t.minX && this.minY == t.minY && this.maxX == t.maxX && this.maxY == t.maxY;
  }
  extend(t) {
      t.minX < this.minX && (this.minX = t.minX), t.maxX > this.maxX && (this.maxX = t.maxX), t.minY < this.minY && (this.minY = t.minY), t.maxY > this.maxY && (this.maxY = t.maxY);
  }
  getHeight() {
      return this.maxY - this.minY + 1;
  }
  getSize() {
      return [this.getWidth(), this.getHeight()];
  }
  getWidth() {
      return this.maxX - this.minX + 1;
  }
  intersects(t) {
      return this.minX <= t.maxX && this.maxX >= t.minX && this.minY <= t.maxY && this.maxY >= t.minY;
  }
}
function Zn(e, t, n, i, s) {
  return s !== void 0 ? ((s.minX = e), (s.maxX = t), (s.minY = n), (s.maxY = i), s) : new Oa(e, t, n, i);
}
class Mv extends wv {
  constructor(t) {
      super(t),
          (this.extentChanged = !0),
          (this.renderedExtent_ = null),
          this.renderedPixelRatio,
          (this.renderedProjection = null),
          this.renderedRevision,
          (this.renderedTiles = []),
          (this.newTiles_ = !1),
          (this.tmpExtent = Dn()),
          (this.tmpTileRange_ = new Oa(0, 0, 0, 0));
  }
  isDrawableTile(t) {
      const n = this.getLayer(),
          i = t.getState(),
          s = n.getUseInterimTilesOnError();
      return i == Z.LOADED || i == Z.EMPTY || (i == Z.ERROR && !s);
  }
  getTile(t, n, i, s) {
      const r = s.pixelRatio,
          o = s.viewState.projection,
          a = this.getLayer();
      let u = a.getSource().getTile(t, n, i, r, o);
      return u.getState() == Z.ERROR && a.getUseInterimTilesOnError() && a.getPreload() > 0 && (this.newTiles_ = !0), this.isDrawableTile(u) || (u = u.getInterimTile()), u;
  }
  getData(t) {
      const n = this.frameState;
      if (!n) return null;
      const i = this.getLayer(),
          s = fe(n.pixelToCoordinateTransform, t.slice()),
          r = i.getExtent();
      if (r && !ra(r, s)) return null;
      const o = n.pixelRatio,
          a = n.viewState.projection,
          c = n.viewState,
          u = i.getRenderSource(),
          h = u.getTileGridForProjection(c.projection),
          f = u.getTilePixelRatio(n.pixelRatio);
      for (let g = h.getZForResolution(c.resolution); g >= h.getMinZoom(); --g) {
          const _ = h.getTileCoordForCoordAndZ(s, g),
              T = u.getTile(g, _[1], _[2], o, a);
          if (!(T instanceof kh || T instanceof Po) || (T instanceof Po && T.getState() === Z.EMPTY)) return null;
          if (T.getState() !== Z.LOADED) continue;
          const v = h.getOrigin(g),
              b = nn(h.getTileSize(g)),
              x = h.getResolution(g),
              R = Math.floor(f * ((s[0] - v[0]) / x - _[1] * b[0])),
              M = Math.floor(f * ((v[1] - s[1]) / x - _[2] * b[1])),
              I = Math.round(f * u.getGutterForProjection(c.projection));
          return this.getImageData(T.getImage(), R + I, M + I);
      }
      return null;
  }
  loadedTileCallback(t, n, i) {
      return this.isDrawableTile(i) ? super.loadedTileCallback(t, n, i) : !1;
  }
  prepareFrame(t) {
      return !!this.getLayer().getSource();
  }
  renderFrame(t, n) {
      const i = t.layerStatesArray[t.layerIndex],
          s = t.viewState,
          r = s.projection,
          o = s.resolution,
          a = s.center,
          c = s.rotation,
          u = t.pixelRatio,
          h = this.getLayer(),
          f = h.getSource(),
          g = f.getRevision(),
          _ = f.getTileGridForProjection(r),
          T = _.getZForResolution(o, f.zDirection),
          v = _.getResolution(T);
      let b = t.extent;
      const x = t.viewState.resolution,
          R = f.getTilePixelRatio(u),
          M = Math.round((Ft(b) / x) * u),
          I = Math.round((we(b) / x) * u),
          w = i.extent && si(i.extent);
      w && (b = ki(b, si(i.extent)));
      const K = (v * M) / 2 / R,
          W = (v * I) / 2 / R,
          q = [a[0] - K, a[1] - W, a[0] + K, a[1] + W],
          X = _.getTileRangeForExtentAndZ(b, T),
          Y = {};
      Y[T] = {};
      const B = this.createLoadedTileFinder(f, r, Y),
          Et = this.tmpExtent,
          ct = this.tmpTileRange_;
      this.newTiles_ = !1;
      const xt = c ? Ro(s.center, x, c, t.size) : void 0;
      for (let Ct = X.minX; Ct <= X.maxX; ++Ct)
          for (let lt = X.minY; lt <= X.maxY; ++lt) {
              if (c && !_.tileCoordIntersectsViewport([T, Ct, lt], xt)) continue;
              const ut = this.getTile(T, Ct, lt, t);
              if (this.isDrawableTile(ut)) {
                  const Ot = te(this);
                  if (ut.getState() == Z.LOADED) {
                      Y[T][ut.tileCoord.toString()] = ut;
                      let Dt = ut.inTransition(Ot);
                      Dt && i.opacity !== 1 && (ut.endTransition(Ot), (Dt = !1)), !this.newTiles_ && (Dt || !this.renderedTiles.includes(ut)) && (this.newTiles_ = !0);
                  }
                  if (ut.getAlpha(Ot, t.time) === 1) continue;
              }
              const vt = _.getTileCoordChildTileRange(ut.tileCoord, ct, Et);
              let yt = !1;
              vt && (yt = B(T + 1, vt)), yt || _.forEachTileCoordParentTileRange(ut.tileCoord, B, ct, Et);
          }
      const bt = ((v / o) * u) / R;
      Bi(this.pixelTransform, t.size[0] / 2, t.size[1] / 2, 1 / u, 1 / u, c, -M / 2, -I / 2);
      const et = zy(this.pixelTransform);
      this.useContainer(n, et, this.getBackground(t));
      const U = this.context,
          J = U.canvas;
      _h(this.inversePixelTransform, this.pixelTransform),
          Bi(this.tempTransform, M / 2, I / 2, bt, bt, 0, -M / 2, -I / 2),
          J.width != M || J.height != I ? ((J.width = M), (J.height = I)) : this.containerReused || U.clearRect(0, 0, M, I),
          w && this.clipUnrotated(U, t, w),
          f.getInterpolate() || (U.imageSmoothingEnabled = !1),
          this.preRender(U, t),
          (this.renderedTiles.length = 0);
      let mt = Object.keys(Y).map(Number);
      mt.sort(fa);
      let At, Pt, rt;
      i.opacity === 1 && (!this.containerReused || f.getOpaque(t.viewState.projection)) ? (mt = mt.reverse()) : ((At = []), (Pt = []));
      for (let Ct = mt.length - 1; Ct >= 0; --Ct) {
          const lt = mt[Ct],
              ut = f.getTilePixelSize(lt, u, r),
              yt = _.getResolution(lt) / v,
              Ot = ut[0] * yt * bt,
              Dt = ut[1] * yt * bt,
              oe = _.getTileCoordForCoordAndZ(Fn(q), lt),
              P = _.getTileCoordExtent(oe),
              m = fe(this.tempTransform, [(R * (P[0] - q[0])) / v, (R * (q[3] - P[3])) / v]),
              y = R * f.getGutterForProjection(r),
              A = Y[lt];
          for (const L in A) {
              const S = A[L],
                  F = S.tileCoord,
                  k = oe[1] - F[1],
                  D = Math.round(m[0] - (k - 1) * Ot),
                  C = oe[2] - F[2],
                  N = Math.round(m[1] - (C - 1) * Dt),
                  j = Math.round(m[0] - k * Ot),
                  z = Math.round(m[1] - C * Dt),
                  G = D - j,
                  H = N - z,
                  tt = T === lt,
                  ot = tt && S.getAlpha(te(this), t.time) !== 1;
              let ht = !1;
              if (!ot)
                  if (At) {
                      rt = [j, z, j + G, z, j + G, z + H, j, z + H];
                      for (let ft = 0, Wt = At.length; ft < Wt; ++ft)
                          if (T !== lt && lt < Pt[ft]) {
                              const Mt = At[ft];
                              es([j, z, j + G, z + H], [Mt[0], Mt[3], Mt[4], Mt[7]]) &&
                                  (ht || (U.save(), (ht = !0)),
                                  U.beginPath(),
                                  U.moveTo(rt[0], rt[1]),
                                  U.lineTo(rt[2], rt[3]),
                                  U.lineTo(rt[4], rt[5]),
                                  U.lineTo(rt[6], rt[7]),
                                  U.moveTo(Mt[6], Mt[7]),
                                  U.lineTo(Mt[4], Mt[5]),
                                  U.lineTo(Mt[2], Mt[3]),
                                  U.lineTo(Mt[0], Mt[1]),
                                  U.clip());
                          }
                      At.push(rt), Pt.push(lt);
                  } else U.clearRect(j, z, G, H);
              this.drawTileImage(S, t, j, z, G, H, y, tt), At && !ot ? (ht && U.restore(), this.renderedTiles.unshift(S)) : this.renderedTiles.push(S), this.updateUsedTiles(t.usedTiles, f, S);
          }
      }
      return (
          (this.renderedRevision = g),
          (this.renderedResolution = v),
          (this.extentChanged = !this.renderedExtent_ || !Co(this.renderedExtent_, q)),
          (this.renderedExtent_ = q),
          (this.renderedPixelRatio = u),
          (this.renderedProjection = r),
          this.manageTilePyramid(t, f, _, u, r, b, T, h.getPreload()),
          this.scheduleExpireCache(t, f),
          this.postRender(U, t),
          i.extent && U.restore(),
          (U.imageSmoothingEnabled = !0),
          et !== J.style.transform && (J.style.transform = et),
          this.container
      );
  }
  drawTileImage(t, n, i, s, r, o, a, c) {
      const u = this.getTileImage(t);
      if (!u) return;
      const h = te(this),
          f = n.layerStatesArray[n.layerIndex],
          g = f.opacity * (c ? t.getAlpha(h, n.time) : 1),
          _ = g !== this.context.globalAlpha;
      _ && (this.context.save(), (this.context.globalAlpha = g)), this.context.drawImage(u, a, a, u.width - 2 * a, u.height - 2 * a, i, s, r, o), _ && this.context.restore(), g !== f.opacity ? (n.animate = !0) : c && t.endTransition(h);
  }
  getImage() {
      const t = this.context;
      return t ? t.canvas : null;
  }
  getTileImage(t) {
      return t.getImage();
  }
  scheduleExpireCache(t, n) {
      if (n.canExpireCache()) {
          const i = function (s, r, o) {
              const a = te(s);
              a in o.usedTiles && s.expireCache(o.viewState.projection, o.usedTiles[a]);
          }.bind(null, n);
          t.postRenderFunctions.push(i);
      }
  }
  updateUsedTiles(t, n, i) {
      const s = te(n);
      s in t || (t[s] = {}), (t[s][i.getKey()] = !0);
  }
  manageTilePyramid(t, n, i, s, r, o, a, c, u) {
      const h = te(n);
      h in t.wantedTiles || (t.wantedTiles[h] = {});
      const f = t.wantedTiles[h],
          g = t.tileQueue,
          _ = i.getMinZoom(),
          T = t.viewState.rotation,
          v = T ? Ro(t.viewState.center, t.viewState.resolution, T, t.size) : void 0;
      let b = 0,
          x,
          R,
          M,
          I,
          w,
          K;
      for (K = _; K <= a; ++K)
          for (R = i.getTileRangeForExtentAndZ(o, K, R), M = i.getResolution(K), I = R.minX; I <= R.maxX; ++I)
              for (w = R.minY; w <= R.maxY; ++w)
                  (T && !i.tileCoordIntersectsViewport([K, I, w], v)) ||
                      (a - K <= c
                          ? (++b, (x = n.getTile(K, I, w, s, r)), x.getState() == Z.IDLE && ((f[x.getKey()] = !0), g.isKeyQueued(x.getKey()) || g.enqueue([x, h, i.getTileCoordCenter(x.tileCoord), M])), u !== void 0 && u(x))
                          : n.useTile(K, I, w, r));
      n.updateCacheSize(b, r);
  }
}
class Nv extends Tv {
  constructor(t) {
      super(t);
  }
  createRenderer() {
      return new Mv(this);
  }
}
const Dv = Nv;
class Fv {
  constructor(t) {
      (this.highWaterMark = t !== void 0 ? t : 2048), (this.count_ = 0), (this.entries_ = {}), (this.oldest_ = null), (this.newest_ = null);
  }
  canExpireCache() {
      return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  }
  expireCache(t) {
      for (; this.canExpireCache(); ) this.pop();
  }
  clear() {
      (this.count_ = 0), (this.entries_ = {}), (this.oldest_ = null), (this.newest_ = null);
  }
  containsKey(t) {
      return this.entries_.hasOwnProperty(t);
  }
  forEach(t) {
      let n = this.oldest_;
      for (; n; ) t(n.value_, n.key_, this), (n = n.newer);
  }
  get(t, n) {
      const i = this.entries_[t];
      return (
          Tt(i !== void 0, "Tried to get a value for a key that does not exist in the cache"),
          i === this.newest_ ||
              (i === this.oldest_ ? ((this.oldest_ = this.oldest_.newer), (this.oldest_.older = null)) : ((i.newer.older = i.older), (i.older.newer = i.newer)),
              (i.newer = null),
              (i.older = this.newest_),
              (this.newest_.newer = i),
              (this.newest_ = i)),
          i.value_
      );
  }
  remove(t) {
      const n = this.entries_[t];
      return (
          Tt(n !== void 0, "Tried to get a value for a key that does not exist in the cache"),
          n === this.newest_
              ? ((this.newest_ = n.older), this.newest_ && (this.newest_.newer = null))
              : n === this.oldest_
              ? ((this.oldest_ = n.newer), this.oldest_ && (this.oldest_.older = null))
              : ((n.newer.older = n.older), (n.older.newer = n.newer)),
          delete this.entries_[t],
          --this.count_,
          n.value_
      );
  }
  getCount() {
      return this.count_;
  }
  getKeys() {
      const t = new Array(this.count_);
      let n = 0,
          i;
      for (i = this.newest_; i; i = i.older) t[n++] = i.key_;
      return t;
  }
  getValues() {
      const t = new Array(this.count_);
      let n = 0,
          i;
      for (i = this.newest_; i; i = i.older) t[n++] = i.value_;
      return t;
  }
  peekLast() {
      return this.oldest_.value_;
  }
  peekLastKey() {
      return this.oldest_.key_;
  }
  peekFirstKey() {
      return this.newest_.key_;
  }
  peek(t) {
      var n;
      return (n = this.entries_[t]) == null ? void 0 : n.value_;
  }
  pop() {
      const t = this.oldest_;
      return delete this.entries_[t.key_], t.newer && (t.newer.older = null), (this.oldest_ = t.newer), this.oldest_ || (this.newest_ = null), --this.count_, t.value_;
  }
  replace(t, n) {
      this.get(t), (this.entries_[t].value_ = n);
  }
  set(t, n) {
      Tt(!(t in this.entries_), "Tried to set a value for a key that is used already");
      const i = { key_: t, newer: null, older: this.newest_, value_: n };
      this.newest_ ? (this.newest_.newer = i) : (this.oldest_ = i), (this.newest_ = i), (this.entries_[t] = i), ++this.count_;
  }
  setSize(t) {
      this.highWaterMark = t;
  }
}
function zc(e, t, n, i) {
  return i !== void 0 ? ((i[0] = e), (i[1] = t), (i[2] = n), i) : [e, t, n];
}
function Cr(e, t, n) {
  return e + "/" + t + "/" + n;
}
function $h(e) {
  return Cr(e[0], e[1], e[2]);
}
function kv(e) {
  return e.split("/").map(Number);
}
function $v(e) {
  return (e[1] << e[0]) + e[2];
}
function Vv(e, t) {
  const n = e[0],
      i = e[1],
      s = e[2];
  if (t.getMinZoom() > n || n > t.getMaxZoom()) return !1;
  const r = t.getFullTileRange(n);
  return r ? r.containsXY(i, s) : !0;
}
class Vh extends Fv {
  clear() {
      for (; this.getCount() > 0; ) this.pop().release();
      super.clear();
  }
  expireCache(t) {
      for (; this.canExpireCache() && !(this.peekLast().getKey() in t); ) this.pop().release();
  }
  pruneExceptNewestZ() {
      if (this.getCount() === 0) return;
      const t = this.peekFirstKey(),
          i = kv(t)[0];
      this.forEach((s) => {
          s.tileCoord[0] !== i && (this.remove($h(s.tileCoord)), s.release());
      });
  }
}
const ro = { TILELOADSTART: "tileloadstart", TILELOADEND: "tileloadend", TILELOADERROR: "tileloaderror" };
class jv extends ze {
  constructor(t) {
      super(),
          (this.projection = kt(t.projection)),
          (this.attributions_ = Yc(t.attributions)),
          (this.attributionsCollapsible_ = t.attributionsCollapsible !== void 0 ? t.attributionsCollapsible : !0),
          (this.loading = !1),
          (this.state_ = t.state !== void 0 ? t.state : "ready"),
          (this.wrapX_ = t.wrapX !== void 0 ? t.wrapX : !1),
          (this.interpolate_ = !!t.interpolate),
          (this.viewResolver = null),
          (this.viewRejector = null);
      const n = this;
      this.viewPromise_ = new Promise(function (i, s) {
          (n.viewResolver = i), (n.viewRejector = s);
      });
  }
  getAttributions() {
      return this.attributions_;
  }
  getAttributionsCollapsible() {
      return this.attributionsCollapsible_;
  }
  getProjection() {
      return this.projection;
  }
  getResolutions(t) {
      return null;
  }
  getView() {
      return this.viewPromise_;
  }
  getState() {
      return this.state_;
  }
  getWrapX() {
      return this.wrapX_;
  }
  getInterpolate() {
      return this.interpolate_;
  }
  refresh() {
      this.changed();
  }
  setAttributions(t) {
      (this.attributions_ = Yc(t)), this.changed();
  }
  setState(t) {
      (this.state_ = t), this.changed();
  }
}
function Yc(e) {
  return e
      ? Array.isArray(e)
          ? function (t) {
                return e;
            }
          : typeof e == "function"
          ? e
          : function (t) {
                return [e];
            }
      : null;
}
const Bn = [0, 0, 0],
  Ze = 5;
class Kv {
  constructor(t) {
      (this.minZoom = t.minZoom !== void 0 ? t.minZoom : 0),
          (this.resolutions_ = t.resolutions),
          Tt(
              Iy(this.resolutions_, (s, r) => r - s, !0),
              "`resolutions` must be sorted in descending order"
          );
      let n;
      if (!t.origins) {
          for (let s = 0, r = this.resolutions_.length - 1; s < r; ++s)
              if (!n) n = this.resolutions_[s] / this.resolutions_[s + 1];
              else if (this.resolutions_[s] / this.resolutions_[s + 1] !== n) {
                  n = void 0;
                  break;
              }
      }
      (this.zoomFactor_ = n),
          (this.maxZoom = this.resolutions_.length - 1),
          (this.origin_ = t.origin !== void 0 ? t.origin : null),
          (this.origins_ = null),
          t.origins !== void 0 && ((this.origins_ = t.origins), Tt(this.origins_.length == this.resolutions_.length, "Number of `origins` and `resolutions` must be equal"));
      const i = t.extent;
      i !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = Fn(i)),
          Tt((!this.origin_ && this.origins_) || (this.origin_ && !this.origins_), "Either `origin` or `origins` must be configured, never both"),
          (this.tileSizes_ = null),
          t.tileSizes !== void 0 && ((this.tileSizes_ = t.tileSizes), Tt(this.tileSizes_.length == this.resolutions_.length, "Number of `tileSizes` and `resolutions` must be equal")),
          (this.tileSize_ = t.tileSize !== void 0 ? t.tileSize : this.tileSizes_ ? null : pa),
          Tt((!this.tileSize_ && this.tileSizes_) || (this.tileSize_ && !this.tileSizes_), "Either `tileSize` or `tileSizes` must be configured, never both"),
          (this.extent_ = i !== void 0 ? i : null),
          (this.fullTileRanges_ = null),
          (this.tmpSize_ = [0, 0]),
          (this.tmpExtent_ = [0, 0, 0, 0]),
          t.sizes !== void 0
              ? (this.fullTileRanges_ = t.sizes.map((s, r) => {
                    const o = new Oa(Math.min(0, s[0]), Math.max(s[0] - 1, -1), Math.min(0, s[1]), Math.max(s[1] - 1, -1));
                    if (i) {
                        const a = this.getTileRangeForExtentAndZ(i, r);
                        (o.minX = Math.max(a.minX, o.minX)), (o.maxX = Math.min(a.maxX, o.maxX)), (o.minY = Math.max(a.minY, o.minY)), (o.maxY = Math.min(a.maxY, o.maxY));
                    }
                    return o;
                }))
              : i && this.calculateTileRanges_(i);
  }
  forEachTileCoord(t, n, i) {
      const s = this.getTileRangeForExtentAndZ(t, n);
      for (let r = s.minX, o = s.maxX; r <= o; ++r) for (let a = s.minY, c = s.maxY; a <= c; ++a) i([n, r, a]);
  }
  forEachTileCoordParentTileRange(t, n, i, s) {
      let r,
          o,
          a,
          c = null,
          u = t[0] - 1;
      for (this.zoomFactor_ === 2 ? ((o = t[1]), (a = t[2])) : (c = this.getTileCoordExtent(t, s)); u >= this.minZoom; ) {
          if ((o !== void 0 && a !== void 0 ? ((o = Math.floor(o / 2)), (a = Math.floor(a / 2)), (r = Zn(o, o, a, a, i))) : (r = this.getTileRangeForExtentAndZ(c, u, i)), n(u, r))) return !0;
          --u;
      }
      return !1;
  }
  getExtent() {
      return this.extent_;
  }
  getMaxZoom() {
      return this.maxZoom;
  }
  getMinZoom() {
      return this.minZoom;
  }
  getOrigin(t) {
      return this.origin_ ? this.origin_ : this.origins_[t];
  }
  getResolution(t) {
      return this.resolutions_[t];
  }
  getResolutions() {
      return this.resolutions_;
  }
  getTileCoordChildTileRange(t, n, i) {
      if (t[0] < this.maxZoom) {
          if (this.zoomFactor_ === 2) {
              const r = t[1] * 2,
                  o = t[2] * 2;
              return Zn(r, r + 1, o, o + 1, n);
          }
          const s = this.getTileCoordExtent(t, i || this.tmpExtent_);
          return this.getTileRangeForExtentAndZ(s, t[0] + 1, n);
      }
      return null;
  }
  getTileRangeForTileCoordAndZ(t, n, i) {
      if (n > this.maxZoom || n < this.minZoom) return null;
      const s = t[0],
          r = t[1],
          o = t[2];
      if (n === s) return Zn(r, o, r, o, i);
      if (this.zoomFactor_) {
          const c = Math.pow(this.zoomFactor_, n - s),
              u = Math.floor(r * c),
              h = Math.floor(o * c);
          if (n < s) return Zn(u, u, h, h, i);
          const f = Math.floor(c * (r + 1)) - 1,
              g = Math.floor(c * (o + 1)) - 1;
          return Zn(u, f, h, g, i);
      }
      const a = this.getTileCoordExtent(t, this.tmpExtent_);
      return this.getTileRangeForExtentAndZ(a, n, i);
  }
  getTileRangeForExtentAndZ(t, n, i) {
      this.getTileCoordForXYAndZ_(t[0], t[3], n, !1, Bn);
      const s = Bn[1],
          r = Bn[2];
      this.getTileCoordForXYAndZ_(t[2], t[1], n, !0, Bn);
      const o = Bn[1],
          a = Bn[2];
      return Zn(s, o, r, a, i);
  }
  getTileCoordCenter(t) {
      const n = this.getOrigin(t[0]),
          i = this.getResolution(t[0]),
          s = nn(this.getTileSize(t[0]), this.tmpSize_);
      return [n[0] + (t[1] + 0.5) * s[0] * i, n[1] - (t[2] + 0.5) * s[1] * i];
  }
  getTileCoordExtent(t, n) {
      const i = this.getOrigin(t[0]),
          s = this.getResolution(t[0]),
          r = nn(this.getTileSize(t[0]), this.tmpSize_),
          o = i[0] + t[1] * r[0] * s,
          a = i[1] - (t[2] + 1) * r[1] * s,
          c = o + r[0] * s,
          u = a + r[1] * s;
      return bi(o, a, c, u, n);
  }
  getTileCoordForCoordAndResolution(t, n, i) {
      return this.getTileCoordForXYAndResolution_(t[0], t[1], n, !1, i);
  }
  getTileCoordForXYAndResolution_(t, n, i, s, r) {
      const o = this.getZForResolution(i),
          a = i / this.getResolution(o),
          c = this.getOrigin(o),
          u = nn(this.getTileSize(o), this.tmpSize_);
      let h = (a * (t - c[0])) / i / u[0],
          f = (a * (c[1] - n)) / i / u[1];
      return s ? ((h = Os(h, Ze) - 1), (f = Os(f, Ze) - 1)) : ((h = xs(h, Ze)), (f = xs(f, Ze))), zc(o, h, f, r);
  }
  getTileCoordForXYAndZ_(t, n, i, s, r) {
      const o = this.getOrigin(i),
          a = this.getResolution(i),
          c = nn(this.getTileSize(i), this.tmpSize_);
      let u = (t - o[0]) / a / c[0],
          h = (o[1] - n) / a / c[1];
      return s ? ((u = Os(u, Ze) - 1), (h = Os(h, Ze) - 1)) : ((u = xs(u, Ze)), (h = xs(h, Ze))), zc(i, u, h, r);
  }
  getTileCoordForCoordAndZ(t, n, i) {
      return this.getTileCoordForXYAndZ_(t[0], t[1], n, !1, i);
  }
  getTileCoordResolution(t) {
      return this.resolutions_[t[0]];
  }
  getTileSize(t) {
      return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t];
  }
  getFullTileRange(t) {
      return this.fullTileRanges_ ? this.fullTileRanges_[t] : this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, t) : null;
  }
  getZForResolution(t, n) {
      const i = ga(this.resolutions_, t, n || 0);
      return Vt(i, this.minZoom, this.maxZoom);
  }
  tileCoordIntersectsViewport(t, n) {
      return Ch(n, 0, n.length, 2, this.getTileCoordExtent(t));
  }
  calculateTileRanges_(t) {
      const n = this.resolutions_.length,
          i = new Array(n);
      for (let s = this.minZoom; s < n; ++s) i[s] = this.getTileRangeForExtentAndZ(t, s);
      this.fullTileRanges_ = i;
  }
}
const jh = Kv;
function Kh(e) {
  let t = e.getDefaultTileGrid();
  return t || ((t = Yv(e)), e.setDefaultTileGrid(t)), t;
}
function Gv(e, t, n) {
  const i = t[0],
      s = e.getTileCoordCenter(t),
      r = Sa(n);
  if (!ra(r, s)) {
      const o = Ft(r),
          a = Math.ceil((r[0] - s[0]) / o);
      return (s[0] += o * a), e.getTileCoordForCoordAndZ(s, i);
  }
  return t;
}
function Uv(e, t, n, i) {
  i = i !== void 0 ? i : "top-left";
  const s = Gh(e, t, n);
  return new jh({ extent: e, origin: ey(e, i), resolutions: s, tileSize: n });
}
function zv(e) {
  const t = e || {},
      n = t.extent || kt("EPSG:3857").getExtent(),
      i = { extent: n, minZoom: t.minZoom, tileSize: t.tileSize, resolutions: Gh(n, t.maxZoom, t.tileSize, t.maxResolution) };
  return new jh(i);
}
function Gh(e, t, n, i) {
  (t = t !== void 0 ? t : Ly), (n = nn(n !== void 0 ? n : pa));
  const s = we(e),
      r = Ft(e);
  i = i > 0 ? i : Math.max(r / n[0], s / n[1]);
  const o = t + 1,
      a = new Array(o);
  for (let c = 0; c < o; ++c) a[c] = i / Math.pow(2, c);
  return a;
}
function Yv(e, t, n, i) {
  const s = Sa(e);
  return Uv(s, t, n, i);
}
function Sa(e) {
  e = kt(e);
  let t = e.getExtent();
  if (!t) {
      const n = (180 * Hi.degrees) / e.getMetersPerUnit();
      t = bi(-n, -n, n, n);
  }
  return t;
}
class Hv extends jv {
  constructor(t) {
      super({ attributions: t.attributions, attributionsCollapsible: t.attributionsCollapsible, projection: t.projection, state: t.state, wrapX: t.wrapX, interpolate: t.interpolate }),
          this.on,
          this.once,
          this.un,
          (this.opaque_ = t.opaque !== void 0 ? t.opaque : !1),
          (this.tilePixelRatio_ = t.tilePixelRatio !== void 0 ? t.tilePixelRatio : 1),
          (this.tileGrid = t.tileGrid !== void 0 ? t.tileGrid : null);
      const n = [256, 256];
      this.tileGrid && nn(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), n),
          (this.tileCache = new Vh(t.cacheSize || 0)),
          (this.tmpSize = [0, 0]),
          (this.key_ = t.key || ""),
          (this.tileOptions = { transition: t.transition, interpolate: t.interpolate }),
          (this.zDirection = t.zDirection ? t.zDirection : 0);
  }
  canExpireCache() {
      return this.tileCache.canExpireCache();
  }
  expireCache(t, n) {
      const i = this.getTileCacheForProjection(t);
      i && i.expireCache(n);
  }
  forEachLoadedTile(t, n, i, s) {
      const r = this.getTileCacheForProjection(t);
      if (!r) return !1;
      let o = !0,
          a,
          c,
          u;
      for (let h = i.minX; h <= i.maxX; ++h) for (let f = i.minY; f <= i.maxY; ++f) (c = Cr(n, h, f)), (u = !1), r.containsKey(c) && ((a = r.get(c)), (u = a.getState() === Z.LOADED), u && (u = s(a) !== !1)), u || (o = !1);
      return o;
  }
  getGutterForProjection(t) {
      return 0;
  }
  getKey() {
      return this.key_;
  }
  setKey(t) {
      this.key_ !== t && ((this.key_ = t), this.changed());
  }
  getOpaque(t) {
      return this.opaque_;
  }
  getResolutions(t) {
      const n = t ? this.getTileGridForProjection(t) : this.tileGrid;
      return n ? n.getResolutions() : null;
  }
  getTile(t, n, i, s, r) {
      return It();
  }
  getTileGrid() {
      return this.tileGrid;
  }
  getTileGridForProjection(t) {
      return this.tileGrid ? this.tileGrid : Kh(t);
  }
  getTileCacheForProjection(t) {
      const n = this.getProjection();
      return Tt(n === null || Qn(n, t), "A VectorTile source can only be rendered if it has a projection compatible with the view projection."), this.tileCache;
  }
  getTilePixelRatio(t) {
      return this.tilePixelRatio_;
  }
  getTilePixelSize(t, n, i) {
      const s = this.getTileGridForProjection(i),
          r = this.getTilePixelRatio(n),
          o = nn(s.getTileSize(t), this.tmpSize);
      return r == 1 ? o : mv(o, r, this.tmpSize);
  }
  getTileCoordForTileUrlFunction(t, n) {
      n = n !== void 0 ? n : this.getProjection();
      const i = this.getTileGridForProjection(n);
      return this.getWrapX() && n.isGlobal() && (t = Gv(i, t, n)), Vv(t, i) ? t : null;
  }
  clear() {
      this.tileCache.clear();
  }
  refresh() {
      this.clear(), super.refresh();
  }
  updateCacheSize(t, n) {
      const i = this.getTileCacheForProjection(n);
      t > i.highWaterMark && (i.highWaterMark = t);
  }
  useTile(t, n, i, s) {}
}
class Wv extends ln {
  constructor(t, n) {
      super(t), (this.tile = n);
  }
}
function Xv(e, t) {
  const n = /\{z\}/g,
      i = /\{x\}/g,
      s = /\{y\}/g,
      r = /\{-y\}/g;
  return function (o, a, c) {
      if (o)
          return e
              .replace(n, o[0].toString())
              .replace(i, o[1].toString())
              .replace(s, o[2].toString())
              .replace(r, function () {
                  const u = o[0],
                      h = t.getFullTileRange(u);
                  if (!h) throw new Error("The {-y} placeholder requires a tile grid with extent");
                  return (h.getHeight() - o[2] - 1).toString();
              });
  };
}
function Zv(e, t) {
  const n = e.length,
      i = new Array(n);
  for (let s = 0; s < n; ++s) i[s] = Xv(e[s], t);
  return Bv(i);
}
function Bv(e) {
  return e.length === 1
      ? e[0]
      : function (t, n, i) {
            if (!t) return;
            const s = $v(t),
                r = In(s, e.length);
            return e[r](t, n, i);
        };
}
function qv(e) {
  const t = [];
  let n = /\{([a-z])-([a-z])\}/.exec(e);
  if (n) {
      const i = n[1].charCodeAt(0),
          s = n[2].charCodeAt(0);
      let r;
      for (r = i; r <= s; ++r) t.push(e.replace(n[0], String.fromCharCode(r)));
      return t;
  }
  if (((n = /\{(\d+)-(\d+)\}/.exec(e)), n)) {
      const i = parseInt(n[2], 10);
      for (let s = parseInt(n[1], 10); s <= i; s++) t.push(e.replace(n[0], s.toString()));
      return t;
  }
  return t.push(e), t;
}
class La extends Hv {
  constructor(t) {
      super({
          attributions: t.attributions,
          cacheSize: t.cacheSize,
          opaque: t.opaque,
          projection: t.projection,
          state: t.state,
          tileGrid: t.tileGrid,
          tilePixelRatio: t.tilePixelRatio,
          wrapX: t.wrapX,
          transition: t.transition,
          interpolate: t.interpolate,
          key: t.key,
          attributionsCollapsible: t.attributionsCollapsible,
          zDirection: t.zDirection,
      }),
          (this.generateTileUrlFunction_ = this.tileUrlFunction === La.prototype.tileUrlFunction),
          (this.tileLoadFunction = t.tileLoadFunction),
          t.tileUrlFunction && (this.tileUrlFunction = t.tileUrlFunction),
          (this.urls = null),
          t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url),
          (this.tileLoadingKeys_ = {});
  }
  getTileLoadFunction() {
      return this.tileLoadFunction;
  }
  getTileUrlFunction() {
      return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  }
  getUrls() {
      return this.urls;
  }
  handleTileChange(t) {
      const n = t.target,
          i = te(n),
          s = n.getState();
      let r;
      s == Z.LOADING ? ((this.tileLoadingKeys_[i] = !0), (r = ro.TILELOADSTART)) : i in this.tileLoadingKeys_ && (delete this.tileLoadingKeys_[i], (r = s == Z.ERROR ? ro.TILELOADERROR : s == Z.LOADED ? ro.TILELOADEND : void 0)),
          r != null && this.dispatchEvent(new Wv(r, n));
  }
  setTileLoadFunction(t) {
      this.tileCache.clear(), (this.tileLoadFunction = t), this.changed();
  }
  setTileUrlFunction(t, n) {
      (this.tileUrlFunction = t), this.tileCache.pruneExceptNewestZ(), typeof n < "u" ? this.setKey(n) : this.changed();
  }
  setUrl(t) {
      const n = qv(t);
      (this.urls = n), this.setUrls(n);
  }
  setUrls(t) {
      this.urls = t;
      const n = t.join(`
`);
      this.generateTileUrlFunction_ ? this.setTileUrlFunction(Zv(t, this.tileGrid), n) : this.setKey(n);
  }
  tileUrlFunction(t, n, i) {}
  useTile(t, n, i) {
      const s = Cr(t, n, i);
      this.tileCache.containsKey(s) && this.tileCache.get(s);
  }
}
class Qv extends La {
  constructor(t) {
      super({
          attributions: t.attributions,
          cacheSize: t.cacheSize,
          opaque: t.opaque,
          projection: t.projection,
          state: t.state,
          tileGrid: t.tileGrid,
          tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : Jv,
          tilePixelRatio: t.tilePixelRatio,
          tileUrlFunction: t.tileUrlFunction,
          url: t.url,
          urls: t.urls,
          wrapX: t.wrapX,
          transition: t.transition,
          interpolate: t.interpolate !== void 0 ? t.interpolate : !0,
          key: t.key,
          attributionsCollapsible: t.attributionsCollapsible,
          zDirection: t.zDirection,
      }),
          (this.crossOrigin = t.crossOrigin !== void 0 ? t.crossOrigin : null),
          (this.tileClass = t.tileClass !== void 0 ? t.tileClass : kh),
          (this.tileCacheForProjection = {}),
          (this.tileGridForProjection = {}),
          (this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold),
          (this.renderReprojectionEdges_ = !1);
  }
  canExpireCache() {
      if (this.tileCache.canExpireCache()) return !0;
      for (const t in this.tileCacheForProjection) if (this.tileCacheForProjection[t].canExpireCache()) return !0;
      return !1;
  }
  expireCache(t, n) {
      const i = this.getTileCacheForProjection(t);
      this.tileCache.expireCache(this.tileCache == i ? n : {});
      for (const s in this.tileCacheForProjection) {
          const r = this.tileCacheForProjection[s];
          r.expireCache(r == i ? n : {});
      }
  }
  getGutterForProjection(t) {
      return this.getProjection() && t && !Qn(this.getProjection(), t) ? 0 : this.getGutter();
  }
  getGutter() {
      return 0;
  }
  getKey() {
      let t = super.getKey();
      return this.getInterpolate() || (t += ":disable-interpolation"), t;
  }
  getOpaque(t) {
      return this.getProjection() && t && !Qn(this.getProjection(), t) ? !1 : super.getOpaque(t);
  }
  getTileGridForProjection(t) {
      const n = this.getProjection();
      if (this.tileGrid && (!n || Qn(n, t))) return this.tileGrid;
      const i = te(t);
      return i in this.tileGridForProjection || (this.tileGridForProjection[i] = Kh(t)), this.tileGridForProjection[i];
  }
  getTileCacheForProjection(t) {
      const n = this.getProjection();
      if (!n || Qn(n, t)) return this.tileCache;
      const i = te(t);
      return i in this.tileCacheForProjection || (this.tileCacheForProjection[i] = new Vh(this.tileCache.highWaterMark)), this.tileCacheForProjection[i];
  }
  createTile_(t, n, i, s, r, o) {
      const a = [t, n, i],
          c = this.getTileCoordForTileUrlFunction(a, r),
          u = c ? this.tileUrlFunction(c, s, r) : void 0,
          h = new this.tileClass(a, u !== void 0 ? Z.IDLE : Z.EMPTY, u !== void 0 ? u : "", this.crossOrigin, this.tileLoadFunction, this.tileOptions);
      return (h.key = o), h.addEventListener(at.CHANGE, this.handleTileChange.bind(this)), h;
  }
  getTile(t, n, i, s, r) {
      const o = this.getProjection();
      if (!o || !r || Qn(o, r)) return this.getTileInternal(t, n, i, s, o || r);
      const a = this.getTileCacheForProjection(r),
          c = [t, n, i];
      let u;
      const h = $h(c);
      a.containsKey(h) && (u = a.get(h));
      const f = this.getKey();
      if (u && u.key == f) return u;
      const g = this.getTileGridForProjection(o),
          _ = this.getTileGridForProjection(r),
          T = this.getTileCoordForTileUrlFunction(c, r),
          v = new Po(o, g, r, _, c, T, this.getTilePixelRatio(s), this.getGutter(), (b, x, R, M) => this.getTileInternal(b, x, R, M, o), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_, this.tileOptions);
      return (v.key = f), u ? ((v.interimTile = u), v.refreshInterimChain(), a.replace(h, v)) : a.set(h, v), v;
  }
  getTileInternal(t, n, i, s, r) {
      let o = null;
      const a = Cr(t, n, i),
          c = this.getKey();
      if (!this.tileCache.containsKey(a)) (o = this.createTile_(t, n, i, s, r, c)), this.tileCache.set(a, o);
      else if (((o = this.tileCache.get(a)), o.key != c)) {
          const u = o;
          (o = this.createTile_(t, n, i, s, r, c)), u.getState() == Z.IDLE ? (o.interimTile = u.interimTile) : (o.interimTile = u), o.refreshInterimChain(), this.tileCache.replace(a, o);
      }
      return o;
  }
  setRenderReprojectionEdges(t) {
      if (this.renderReprojectionEdges_ != t) {
          this.renderReprojectionEdges_ = t;
          for (const n in this.tileCacheForProjection) this.tileCacheForProjection[n].clear();
          this.changed();
      }
  }
  setTileGridForProjection(t, n) {
      const i = kt(t);
      if (i) {
          const s = te(i);
          s in this.tileGridForProjection || (this.tileGridForProjection[s] = n);
      }
  }
  clear() {
      super.clear();
      for (const t in this.tileCacheForProjection) this.tileCacheForProjection[t].clear();
  }
}
function Jv(e, t) {
  e.getImage().src = t;
}
class tT extends Qv {
  constructor(t) {
      t = t || {};
      const n = t.projection !== void 0 ? t.projection : "EPSG:3857",
          i = t.tileGrid !== void 0 ? t.tileGrid : zv({ extent: Sa(n), maxResolution: t.maxResolution, maxZoom: t.maxZoom, minZoom: t.minZoom, tileSize: t.tileSize });
      super({
          attributions: t.attributions,
          cacheSize: t.cacheSize,
          crossOrigin: t.crossOrigin,
          interpolate: t.interpolate,
          opaque: t.opaque,
          projection: n,
          reprojectionErrorThreshold: t.reprojectionErrorThreshold,
          tileGrid: i,
          tileLoadFunction: t.tileLoadFunction,
          tilePixelRatio: t.tilePixelRatio,
          tileUrlFunction: t.tileUrlFunction,
          url: t.url,
          urls: t.urls,
          wrapX: t.wrapX !== void 0 ? t.wrapX : !0,
          transition: t.transition,
          attributionsCollapsible: t.attributionsCollapsible,
          zDirection: t.zDirection,
      }),
          (this.gutter_ = t.gutter !== void 0 ? t.gutter : 0);
  }
  getGutter() {
      return this.gutter_;
  }
}
const eT = tT,
  Hc = {
      urlTemplate(e, t, n, i, s) {
          let r = "";
          return i && (r = "&until=" + i), "https://api.nearmap.com/tiles/v3/" + s + "/" + e + "/" + t + "/" + n + ".img?tertiary=satellite&apikey=" + St.DEMO_API_KEY + r;
      },
      coverageUrlTemplate(e, t, n, i) {
          return (
              "https://api.nearmap.com/coverage/v2/poly/" +
              t +
              "," +
              n +
              "," +
              e +
              "," +
              n +
              "," +
              e +
              "," +
              i +
              "," +
              t +
              "," +
              i +
              "," +
              t +
              "," +
              n +
              "?apikey=" +
              St.DEMO_API_KEY +
              "&since=" +
              St.SINCE +
              "&until=" +
              St.UNTIL +
              "&limit=1000"
          );
      },
  };
let ue = null,
  he = "Vert",
  oo = [],
  qn = null,
  Uh = null,
  zh = null,
  Wc = null,
  Xc = null,
  Zc = null,
  Bc = null,
  qc = null;
try {
  St.UNTIL = new Date(St.UNTIL).toISOString().slice(0, 10);
} catch {
  St.UNTIL = new Date().toISOString().slice(0, 10);
}
try {
  St.SINCE = new Date(St.SINCE).toISOString().slice(0, 10);
} catch {
  St.SINCE = new Date("2001-01-01").toISOString().slice(0, 10);
}
let Qc = {
      survey: null,
      get value() {
          return this.survey;
      },
      set value(e) {
          (this.survey = e), (Uh.innerHTML = e);
      },
  },
  Ds = {
      survey: null,
      get value() {
          return this.survey;
      },
      set value(e) {
          (this.survey = e), (zh.innerHTML = e);
      },
  };
const Jc = { North: [256, 192], East: [192, 256], South: [256, 192], West: [192, 256], Vertical: [256, 256] },
  Fs = {
      toViewRotation(e) {
          return Yi.degreesToRadians(Yi.modulus360(360 - e));
      },
      tileUrlFunction(e) {
          let t = e[0],
              n = e[1],
              i = e[2];
          return Hc.urlTemplate(t, n, i, Ds.value, he);
      },
      tileLoadFunction(e, t) {
          let n = e.getImage();
          Tc.fetchImageData(t).then(function (i) {
              i &&
                  he !== "Vert" &&
                  Tc.rotateTile(i, Jc[he], Se.HEADINGS[he]).then(function (s) {
                      n.src = s || "";
                  }),
                  (n.src = i || "");
          });
      },
      createView(e, t, n) {
          (e = e || St.ZOOM), (t = t || St.CENTER), (n = n || St.EXTENT);
          let i = Ec(n, kt("EPSG:4326"), Se.PROJECTIONS[he]);
          return new Pe({ projection: Se.PROJECTIONS[he], rotation: this.toViewRotation(Se.HEADINGS[he]), center: py(t, Se.PROJECTIONS[he]), minZoom: St.MIN_ZOOM, maxZoom: St.MAX_ZOOM, zoom: e, extent: i });
      },
      createLayer() {
          return new Dv({ source: new eT({ projection: Se.PROJECTIONS[he], tileSize: Jc[he], tileUrlFunction: this.tileUrlFunction, tileLoadFunction: this.tileLoadFunction }) });
      },
      getBounds() {
          let e = ue.getView(),
              t = e.getProjection(),
              n = e.calculateExtent(ue.getSize());
          n = Ec(n, t, kt("EPSG:4326"));
          let i = n[0],
              s = n[1],
              r = n[2];
          return { north: n[3], east: r, west: i, south: s };
      },
      findClosestDate(e, t) {
          let n = t ? +new Date(t) : +new Date(),
              i = e.map(function (r) {
                  let o = +new Date(r.captureDate);
                  return Math.abs(n - o);
              }),
              s = Math.min.apply(null, i);
          return e[
              i.findIndex(function (r) {
                  return r === s;
              })
          ].captureDate;
      },
      getSurveyDate(e, t) {
          let n = this;
          return e.length === 0
              ? null
              : e.find(function (i) {
                    return t === i.captureDate;
                })
              ? t
              : n.findClosestDate(e, t);
      },
      fetchCoverage() {
          let e = this.getBounds(ue),
              t = Hc.coverageUrlTemplate(e.east, e.west, e.north, e.south);
          return fetch(t).then(function (n) {
              return n.json();
          });
      },
      refreshTiles() {
          ue.getLayers().item(0).getSource().refresh();
      },
      refreshView() {
          let e = this,
              t = ue.getView().getProjection(),
              n = ue.getView().getCenter(),
              i = ue.getView().getZoom(),
              s = my(n, t);
          return e.updateSurveys().then(function () {
              ue.setView(e.createView(i, s)), ue.getLayers().clear(), ue.getLayers().push(e.createLayer());
          });
      },
      updateSurveys() {
          let e = this;
          return this.fetchCoverage().then(function (t) {
              (oo = e.getAvailableSurveyDates(t)), (Ds.value = e.getSurveyDate(oo, Qc.value)), e.updateDropDown();
          });
      },
      updateDropDown() {
          (qn.innerHTML = ""),
              oo.forEach(function (e) {
                  let t = document.createElement("option");
                  t.setAttribute("value", e.captureDate), (t.innerText = e.captureDate), qn.add(t);
              }),
              (qn.value = Ds.value);
      },
      getAvailableSurveyDates(e) {
          return (e && e.surveys ? e.surveys : []).filter(function (n) {
              return (n.resources.tiles || []).some(function (i) {
                  return i.type === he;
              });
          });
      },
      onMapMoveHandler() {
          this.updateSurveys();
      },
      initUiElements() {
          (qn = document.querySelector("select")),
              (Uh = document.querySelector("#selectedSurveyElementId")),
              (zh = document.querySelector("#displayedSurveyElementId")),
              (Wc = document.querySelector("#northElementId")),
              (Xc = document.querySelector("#westElementId")),
              (Zc = document.querySelector("#southElementId")),
              (Bc = document.querySelector("#eastElementId")),
              (qc = document.querySelector("#vertElementId"));
      },
      addEventListeners() {
          let e = this;
          ue.on("moveend", function () {
              e.onMapMoveHandler(qn);
          }),
              qn.addEventListener("change", function (t) {
                  (Qc.value = t.target.value), (Ds.value = t.target.value), e.refreshTiles();
              }),
              [Wc, Xc, Zc, Bc, qc].forEach(function (t) {
                  t.addEventListener("click", function (n) {
                      (he = n.target.value), e.refreshView();
                  });
              });
      },
      initMap(e, t) {
          (ue = new vv({ target: "map", controls: [new Oh()], layers: [this.createLayer()], view: this.createView(t, e) })), this.initUiElements(), this.addEventListeners();
      },
  },
  nT = {
      name: "App",
      components: { AppHeader: LE, ContactPopup: kE },
      data() {
          return { selectedDirection: "Vert" };
      },
      mounted() {
          this.checkShareUrl();
      },
      methods: {
          checkShareUrl() {
              let e = "";
              window.location.href.indexOf("%7b") ? (e = decodeURI(window.location.href)) : (e = window.location.href);
              let t = e.split("?");
              if (t.length == 2) {
                  let n = t[1].split("&"),
                      i = {},
                      s = "";
                  if (
                      (n.forEach(function (r) {
                          (s = r.split("=")), s.length == 2 && (i[s[0]] = s[1]);
                      }),
                      console.log(i),
                      i)
                  ) {
                      let r = [],
                          o = null;
                      if ((console.log("getVars", i), i.center && i.zoom)) {
                          let a = parseFloat(i.center.split(",")[0]),
                              c = parseFloat(i.center.split(",")[1]);
                          r.push(a, c), (o = parseInt(i.zoom));
                      } else Fs.initMap(St.CENTER, St.ZOOM);
                      Fs.initMap(r, o);
                  } else Fs.initMap(St.CENTER, St.ZOOM);
              } else Fs.initMap(St.CENTER, St.ZOOM);
          },
      },
  },
  iT = { class: "container-fluid" },
  sT = Q("div", { id: "map" }, null, -1),
  rT = { class: "heading-btn" },
  oT = { class: "center" },
  aT = { class: "center" },
  lT = Q(
      "div",
      { class: "survey-picker" },
      [
          Q("div", null, [Q("span", null, "Available surveys"), Q("select")]),
          Q("div", null, [Q("span", null, "Selected"), Q("div", { id: "selectedSurveyElementId" })]),
          Q("div", null, [Q("span", null, "Displayed"), Q("div", { id: "displayedSurveyElementId" })]),
      ],
      -1
  );
function cT(e, t, n, i, s, r) {
  const o = Gl("AppHeader"),
      a = Gl("ContactPopup");
  return (
      Ui(),
      Zs(
          xe,
          null,
          [
              Q("header", null, [Ce(o)]),
              Q("div", iT, [
                  sT,
                  Q("div", rT, [
                      Q("div", oT, [
                          Q(
                              "button",
                              {
                                  id: "northElementId",
                                  class: en(["btn btn-primary primaryColor", s.selectedDirection == "North" ? "activeButton" : "#B11116"]),
                                  value: "North",
                                  onClick: t[0] || (t[0] = (c) => (s.selectedDirection = "North")),
                              },
                              " North ",
                              2
                          ),
                      ]),
                      Q("div", null, [
                          Q(
                              "button",
                              {
                                  id: "westElementId",
                                  class: en(["btn btn-primary primaryColor", s.selectedDirection == "West" ? "activeButton" : "#B11116"]),
                                  value: "West",
                                  onClick: t[1] || (t[1] = (c) => (s.selectedDirection = "West")),
                              },
                              " West ",
                              2
                          ),
                          Q(
                              "button",
                              {
                                  id: "vertElementId",
                                  class: en(["btn btn-primary primaryColor", s.selectedDirection == "Vert" ? "activeButton" : "#B11116"]),
                                  value: "Vert",
                                  onClick: t[2] || (t[2] = (c) => (s.selectedDirection = "Vert")),
                              },
                              " Vertical ",
                              2
                          ),
                          Q(
                              "button",
                              {
                                  id: "eastElementId",
                                  class: en(["btn btn-primary primaryColor", s.selectedDirection == "East" ? "activeButton" : "#B11116"]),
                                  value: "East",
                                  onClick: t[3] || (t[3] = (c) => (s.selectedDirection = "East")),
                              },
                              " East ",
                              2
                          ),
                      ]),
                      Q("div", aT, [
                          Q(
                              "button",
                              {
                                  id: "southElementId",
                                  class: en(["btn btn-primary primaryColor", s.selectedDirection == "South" ? "activeButton" : "#B11116"]),
                                  value: "South",
                                  onClick: t[4] || (t[4] = (c) => (s.selectedDirection = "South")),
                              },
                              " South ",
                              2
                          ),
                      ]),
                  ]),
                  lT,
                  Ce(a),
              ]),
          ],
          64
      )
  );
}
const uT = ia(nT, [["render", cT]]);
var hT = { exports: {} },
  Bt = "top",
  ie = "bottom",
  se = "right",
  qt = "left",
  wr = "auto",
  Ai = [Bt, ie, se, qt],
  Ln = "start",
  pi = "end",
  Yh = "clippingParents",
  Pa = "viewport",
  ei = "popper",
  Hh = "reference",
  Mo = Ai.reduce(function (e, t) {
      return e.concat([t + "-" + Ln, t + "-" + pi]);
  }, []),
  Ma = [].concat(Ai, [wr]).reduce(function (e, t) {
      return e.concat([t, t + "-" + Ln, t + "-" + pi]);
  }, []),
  Wh = "beforeRead",
  Xh = "read",
  Zh = "afterRead",
  Bh = "beforeMain",
  qh = "main",
  Qh = "afterMain",
  Jh = "beforeWrite",
  td = "write",
  ed = "afterWrite",
  nd = [Wh, Xh, Zh, Bh, qh, Qh, Jh, td, ed];
function De(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function re(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
      var t = e.ownerDocument;
      return (t && t.defaultView) || window;
  }
  return e;
}
function Pn(e) {
  var t = re(e).Element;
  return e instanceof t || e instanceof Element;
}
function pe(e) {
  var t = re(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Na(e) {
  if (typeof ShadowRoot > "u") return !1;
  var t = re(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function dT(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (n) {
      var i = t.styles[n] || {},
          s = t.attributes[n] || {},
          r = t.elements[n];
      !pe(r) ||
          !De(r) ||
          (Object.assign(r.style, i),
          Object.keys(s).forEach(function (o) {
              var a = s[o];
              a === !1 ? r.removeAttribute(o) : r.setAttribute(o, a === !0 ? "" : a);
          }));
  });
}
function fT(e) {
  var t = e.state,
      n = { popper: { position: t.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return (
      Object.assign(t.elements.popper.style, n.popper),
      (t.styles = n),
      t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
      function () {
          Object.keys(t.elements).forEach(function (i) {
              var s = t.elements[i],
                  r = t.attributes[i] || {},
                  o = Object.keys(t.styles.hasOwnProperty(i) ? t.styles[i] : n[i]),
                  a = o.reduce(function (c, u) {
                      return (c[u] = ""), c;
                  }, {});
              !pe(s) ||
                  !De(s) ||
                  (Object.assign(s.style, a),
                  Object.keys(r).forEach(function (c) {
                      s.removeAttribute(c);
                  }));
          });
      }
  );
}
const Da = { name: "applyStyles", enabled: !0, phase: "write", fn: dT, effect: fT, requires: ["computeStyles"] };
function Me(e) {
  return e.split("-")[0];
}
var xn = Math.max,
  nr = Math.min,
  mi = Math.round;
function No() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
      ? e.brands
            .map(function (t) {
                return t.brand + "/" + t.version;
            })
            .join(" ")
      : navigator.userAgent;
}
function id() {
  return !/^((?!chrome|android).)*safari/i.test(No());
}
function Ei(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var i = e.getBoundingClientRect(),
      s = 1,
      r = 1;
  t && pe(e) && ((s = (e.offsetWidth > 0 && mi(i.width) / e.offsetWidth) || 1), (r = (e.offsetHeight > 0 && mi(i.height) / e.offsetHeight) || 1));
  var o = Pn(e) ? re(e) : window,
      a = o.visualViewport,
      c = !id() && n,
      u = (i.left + (c && a ? a.offsetLeft : 0)) / s,
      h = (i.top + (c && a ? a.offsetTop : 0)) / r,
      f = i.width / s,
      g = i.height / r;
  return { width: f, height: g, top: h, right: u + f, bottom: h + g, left: u, x: u, y: h };
}
function Fa(e) {
  var t = Ei(e),
      n = e.offsetWidth,
      i = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), { x: e.offsetLeft, y: e.offsetTop, width: n, height: i };
}
function sd(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && Na(n)) {
      var i = t;
      do {
          if (i && e.isSameNode(i)) return !0;
          i = i.parentNode || i.host;
      } while (i);
  }
  return !1;
}
function Ge(e) {
  return re(e).getComputedStyle(e);
}
function gT(e) {
  return ["table", "td", "th"].indexOf(De(e)) >= 0;
}
function cn(e) {
  return ((Pn(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Ar(e) {
  return De(e) === "html" ? e : e.assignedSlot || e.parentNode || (Na(e) ? e.host : null) || cn(e);
}
function tu(e) {
  return !pe(e) || Ge(e).position === "fixed" ? null : e.offsetParent;
}
function _T(e) {
  var t = /firefox/i.test(No()),
      n = /Trident/i.test(No());
  if (n && pe(e)) {
      var i = Ge(e);
      if (i.position === "fixed") return null;
  }
  var s = Ar(e);
  for (Na(s) && (s = s.host); pe(s) && ["html", "body"].indexOf(De(s)) < 0; ) {
      var r = Ge(s);
      if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || (t && r.willChange === "filter") || (t && r.filter && r.filter !== "none")) return s;
      s = s.parentNode;
  }
  return null;
}
function os(e) {
  for (var t = re(e), n = tu(e); n && gT(n) && Ge(n).position === "static"; ) n = tu(n);
  return n && (De(n) === "html" || (De(n) === "body" && Ge(n).position === "static")) ? t : n || _T(e) || t;
}
function ka(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function $i(e, t, n) {
  return xn(e, nr(t, n));
}
function pT(e, t, n) {
  var i = $i(e, t, n);
  return i > n ? n : i;
}
function rd() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function od(e) {
  return Object.assign({}, rd(), e);
}
function ad(e, t) {
  return t.reduce(function (n, i) {
      return (n[i] = e), n;
  }, {});
}
var mT = function (t, n) {
  return (t = typeof t == "function" ? t(Object.assign({}, n.rects, { placement: n.placement })) : t), od(typeof t != "number" ? t : ad(t, Ai));
};
function ET(e) {
  var t,
      n = e.state,
      i = e.name,
      s = e.options,
      r = n.elements.arrow,
      o = n.modifiersData.popperOffsets,
      a = Me(n.placement),
      c = ka(a),
      u = [qt, se].indexOf(a) >= 0,
      h = u ? "height" : "width";
  if (!(!r || !o)) {
      var f = mT(s.padding, n),
          g = Fa(r),
          _ = c === "y" ? Bt : qt,
          T = c === "y" ? ie : se,
          v = n.rects.reference[h] + n.rects.reference[c] - o[c] - n.rects.popper[h],
          b = o[c] - n.rects.reference[c],
          x = os(r),
          R = x ? (c === "y" ? x.clientHeight || 0 : x.clientWidth || 0) : 0,
          M = v / 2 - b / 2,
          I = f[_],
          w = R - g[h] - f[T],
          K = R / 2 - g[h] / 2 + M,
          W = $i(I, K, w),
          q = c;
      n.modifiersData[i] = ((t = {}), (t[q] = W), (t.centerOffset = W - K), t);
  }
}
function yT(e) {
  var t = e.state,
      n = e.options,
      i = n.element,
      s = i === void 0 ? "[data-popper-arrow]" : i;
  s != null && ((typeof s == "string" && ((s = t.elements.popper.querySelector(s)), !s)) || (sd(t.elements.popper, s) && (t.elements.arrow = s)));
}
const ld = { name: "arrow", enabled: !0, phase: "main", fn: ET, effect: yT, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function yi(e) {
  return e.split("-")[1];
}
var vT = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function TT(e, t) {
  var n = e.x,
      i = e.y,
      s = t.devicePixelRatio || 1;
  return { x: mi(n * s) / s || 0, y: mi(i * s) / s || 0 };
}
function eu(e) {
  var t,
      n = e.popper,
      i = e.popperRect,
      s = e.placement,
      r = e.variation,
      o = e.offsets,
      a = e.position,
      c = e.gpuAcceleration,
      u = e.adaptive,
      h = e.roundOffsets,
      f = e.isFixed,
      g = o.x,
      _ = g === void 0 ? 0 : g,
      T = o.y,
      v = T === void 0 ? 0 : T,
      b = typeof h == "function" ? h({ x: _, y: v }) : { x: _, y: v };
  (_ = b.x), (v = b.y);
  var x = o.hasOwnProperty("x"),
      R = o.hasOwnProperty("y"),
      M = qt,
      I = Bt,
      w = window;
  if (u) {
      var K = os(n),
          W = "clientHeight",
          q = "clientWidth";
      if ((K === re(n) && ((K = cn(n)), Ge(K).position !== "static" && a === "absolute" && ((W = "scrollHeight"), (q = "scrollWidth"))), (K = K), s === Bt || ((s === qt || s === se) && r === pi))) {
          I = ie;
          var X = f && K === w && w.visualViewport ? w.visualViewport.height : K[W];
          (v -= X - i.height), (v *= c ? 1 : -1);
      }
      if (s === qt || ((s === Bt || s === ie) && r === pi)) {
          M = se;
          var Y = f && K === w && w.visualViewport ? w.visualViewport.width : K[q];
          (_ -= Y - i.width), (_ *= c ? 1 : -1);
      }
  }
  var B = Object.assign({ position: a }, u && vT),
      Et = h === !0 ? TT({ x: _, y: v }, re(n)) : { x: _, y: v };
  if (((_ = Et.x), (v = Et.y), c)) {
      var ct;
      return Object.assign({}, B, ((ct = {}), (ct[I] = R ? "0" : ""), (ct[M] = x ? "0" : ""), (ct.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + _ + "px, " + v + "px)" : "translate3d(" + _ + "px, " + v + "px, 0)"), ct));
  }
  return Object.assign({}, B, ((t = {}), (t[I] = R ? v + "px" : ""), (t[M] = x ? _ + "px" : ""), (t.transform = ""), t));
}
function bT(e) {
  var t = e.state,
      n = e.options,
      i = n.gpuAcceleration,
      s = i === void 0 ? !0 : i,
      r = n.adaptive,
      o = r === void 0 ? !0 : r,
      a = n.roundOffsets,
      c = a === void 0 ? !0 : a,
      u = { placement: Me(t.placement), variation: yi(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: s, isFixed: t.options.strategy === "fixed" };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, eu(Object.assign({}, u, { offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: o, roundOffsets: c })))),
      t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, eu(Object.assign({}, u, { offsets: t.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: c })))),
      (t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement }));
}
const $a = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: bT, data: {} };
var ks = { passive: !0 };
function CT(e) {
  var t = e.state,
      n = e.instance,
      i = e.options,
      s = i.scroll,
      r = s === void 0 ? !0 : s,
      o = i.resize,
      a = o === void 0 ? !0 : o,
      c = re(t.elements.popper),
      u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
      r &&
          u.forEach(function (h) {
              h.addEventListener("scroll", n.update, ks);
          }),
      a && c.addEventListener("resize", n.update, ks),
      function () {
          r &&
              u.forEach(function (h) {
                  h.removeEventListener("scroll", n.update, ks);
              }),
              a && c.removeEventListener("resize", n.update, ks);
      }
  );
}
const Va = { name: "eventListeners", enabled: !0, phase: "write", fn: function () {}, effect: CT, data: {} };
var wT = { left: "right", right: "left", bottom: "top", top: "bottom" };
function zs(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
      return wT[t];
  });
}
var AT = { start: "end", end: "start" };
function nu(e) {
  return e.replace(/start|end/g, function (t) {
      return AT[t];
  });
}
function ja(e) {
  var t = re(e),
      n = t.pageXOffset,
      i = t.pageYOffset;
  return { scrollLeft: n, scrollTop: i };
}
function Ka(e) {
  return Ei(cn(e)).left + ja(e).scrollLeft;
}
function RT(e, t) {
  var n = re(e),
      i = cn(e),
      s = n.visualViewport,
      r = i.clientWidth,
      o = i.clientHeight,
      a = 0,
      c = 0;
  if (s) {
      (r = s.width), (o = s.height);
      var u = id();
      (u || (!u && t === "fixed")) && ((a = s.offsetLeft), (c = s.offsetTop));
  }
  return { width: r, height: o, x: a + Ka(e), y: c };
}
function IT(e) {
  var t,
      n = cn(e),
      i = ja(e),
      s = (t = e.ownerDocument) == null ? void 0 : t.body,
      r = xn(n.scrollWidth, n.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0),
      o = xn(n.scrollHeight, n.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0),
      a = -i.scrollLeft + Ka(e),
      c = -i.scrollTop;
  return Ge(s || n).direction === "rtl" && (a += xn(n.clientWidth, s ? s.clientWidth : 0) - r), { width: r, height: o, x: a, y: c };
}
function Ga(e) {
  var t = Ge(e),
      n = t.overflow,
      i = t.overflowX,
      s = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + s + i);
}
function cd(e) {
  return ["html", "body", "#document"].indexOf(De(e)) >= 0 ? e.ownerDocument.body : pe(e) && Ga(e) ? e : cd(Ar(e));
}
function Vi(e, t) {
  var n;
  t === void 0 && (t = []);
  var i = cd(e),
      s = i === ((n = e.ownerDocument) == null ? void 0 : n.body),
      r = re(i),
      o = s ? [r].concat(r.visualViewport || [], Ga(i) ? i : []) : i,
      a = t.concat(o);
  return s ? a : a.concat(Vi(Ar(o)));
}
function Do(e) {
  return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
}
function xT(e, t) {
  var n = Ei(e, !1, t === "fixed");
  return (n.top = n.top + e.clientTop), (n.left = n.left + e.clientLeft), (n.bottom = n.top + e.clientHeight), (n.right = n.left + e.clientWidth), (n.width = e.clientWidth), (n.height = e.clientHeight), (n.x = n.left), (n.y = n.top), n;
}
function iu(e, t, n) {
  return t === Pa ? Do(RT(e, n)) : Pn(t) ? xT(t, n) : Do(IT(cn(e)));
}
function OT(e) {
  var t = Vi(Ar(e)),
      n = ["absolute", "fixed"].indexOf(Ge(e).position) >= 0,
      i = n && pe(e) ? os(e) : e;
  return Pn(i)
      ? t.filter(function (s) {
            return Pn(s) && sd(s, i) && De(s) !== "body";
        })
      : [];
}
function ST(e, t, n, i) {
  var s = t === "clippingParents" ? OT(e) : [].concat(t),
      r = [].concat(s, [n]),
      o = r[0],
      a = r.reduce(function (c, u) {
          var h = iu(e, u, i);
          return (c.top = xn(h.top, c.top)), (c.right = nr(h.right, c.right)), (c.bottom = nr(h.bottom, c.bottom)), (c.left = xn(h.left, c.left)), c;
      }, iu(e, o, i));
  return (a.width = a.right - a.left), (a.height = a.bottom - a.top), (a.x = a.left), (a.y = a.top), a;
}
function ud(e) {
  var t = e.reference,
      n = e.element,
      i = e.placement,
      s = i ? Me(i) : null,
      r = i ? yi(i) : null,
      o = t.x + t.width / 2 - n.width / 2,
      a = t.y + t.height / 2 - n.height / 2,
      c;
  switch (s) {
      case Bt:
          c = { x: o, y: t.y - n.height };
          break;
      case ie:
          c = { x: o, y: t.y + t.height };
          break;
      case se:
          c = { x: t.x + t.width, y: a };
          break;
      case qt:
          c = { x: t.x - n.width, y: a };
          break;
      default:
          c = { x: t.x, y: t.y };
  }
  var u = s ? ka(s) : null;
  if (u != null) {
      var h = u === "y" ? "height" : "width";
      switch (r) {
          case Ln:
              c[u] = c[u] - (t[h] / 2 - n[h] / 2);
              break;
          case pi:
              c[u] = c[u] + (t[h] / 2 - n[h] / 2);
              break;
      }
  }
  return c;
}
function vi(e, t) {
  t === void 0 && (t = {});
  var n = t,
      i = n.placement,
      s = i === void 0 ? e.placement : i,
      r = n.strategy,
      o = r === void 0 ? e.strategy : r,
      a = n.boundary,
      c = a === void 0 ? Yh : a,
      u = n.rootBoundary,
      h = u === void 0 ? Pa : u,
      f = n.elementContext,
      g = f === void 0 ? ei : f,
      _ = n.altBoundary,
      T = _ === void 0 ? !1 : _,
      v = n.padding,
      b = v === void 0 ? 0 : v,
      x = od(typeof b != "number" ? b : ad(b, Ai)),
      R = g === ei ? Hh : ei,
      M = e.rects.popper,
      I = e.elements[T ? R : g],
      w = ST(Pn(I) ? I : I.contextElement || cn(e.elements.popper), c, h, o),
      K = Ei(e.elements.reference),
      W = ud({ reference: K, element: M, strategy: "absolute", placement: s }),
      q = Do(Object.assign({}, M, W)),
      X = g === ei ? q : K,
      Y = { top: w.top - X.top + x.top, bottom: X.bottom - w.bottom + x.bottom, left: w.left - X.left + x.left, right: X.right - w.right + x.right },
      B = e.modifiersData.offset;
  if (g === ei && B) {
      var Et = B[s];
      Object.keys(Y).forEach(function (ct) {
          var xt = [se, ie].indexOf(ct) >= 0 ? 1 : -1,
              bt = [Bt, ie].indexOf(ct) >= 0 ? "y" : "x";
          Y[ct] += Et[bt] * xt;
      });
  }
  return Y;
}
function LT(e, t) {
  t === void 0 && (t = {});
  var n = t,
      i = n.placement,
      s = n.boundary,
      r = n.rootBoundary,
      o = n.padding,
      a = n.flipVariations,
      c = n.allowedAutoPlacements,
      u = c === void 0 ? Ma : c,
      h = yi(i),
      f = h
          ? a
              ? Mo
              : Mo.filter(function (T) {
                    return yi(T) === h;
                })
          : Ai,
      g = f.filter(function (T) {
          return u.indexOf(T) >= 0;
      });
  g.length === 0 && (g = f);
  var _ = g.reduce(function (T, v) {
      return (T[v] = vi(e, { placement: v, boundary: s, rootBoundary: r, padding: o })[Me(v)]), T;
  }, {});
  return Object.keys(_).sort(function (T, v) {
      return _[T] - _[v];
  });
}
function PT(e) {
  if (Me(e) === wr) return [];
  var t = zs(e);
  return [nu(e), t, nu(t)];
}
function MT(e) {
  var t = e.state,
      n = e.options,
      i = e.name;
  if (!t.modifiersData[i]._skip) {
      for (
          var s = n.mainAxis,
              r = s === void 0 ? !0 : s,
              o = n.altAxis,
              a = o === void 0 ? !0 : o,
              c = n.fallbackPlacements,
              u = n.padding,
              h = n.boundary,
              f = n.rootBoundary,
              g = n.altBoundary,
              _ = n.flipVariations,
              T = _ === void 0 ? !0 : _,
              v = n.allowedAutoPlacements,
              b = t.options.placement,
              x = Me(b),
              R = x === b,
              M = c || (R || !T ? [zs(b)] : PT(b)),
              I = [b].concat(M).reduce(function (lt, ut) {
                  return lt.concat(Me(ut) === wr ? LT(t, { placement: ut, boundary: h, rootBoundary: f, padding: u, flipVariations: T, allowedAutoPlacements: v }) : ut);
              }, []),
              w = t.rects.reference,
              K = t.rects.popper,
              W = new Map(),
              q = !0,
              X = I[0],
              Y = 0;
          Y < I.length;
          Y++
      ) {
          var B = I[Y],
              Et = Me(B),
              ct = yi(B) === Ln,
              xt = [Bt, ie].indexOf(Et) >= 0,
              bt = xt ? "width" : "height",
              et = vi(t, { placement: B, boundary: h, rootBoundary: f, altBoundary: g, padding: u }),
              U = xt ? (ct ? se : qt) : ct ? ie : Bt;
          w[bt] > K[bt] && (U = zs(U));
          var J = zs(U),
              mt = [];
          if (
              (r && mt.push(et[Et] <= 0),
              a && mt.push(et[U] <= 0, et[J] <= 0),
              mt.every(function (lt) {
                  return lt;
              }))
          ) {
              (X = B), (q = !1);
              break;
          }
          W.set(B, mt);
      }
      if (q)
          for (
              var At = T ? 3 : 1,
                  Pt = function (ut) {
                      var vt = I.find(function (yt) {
                          var Ot = W.get(yt);
                          if (Ot)
                              return Ot.slice(0, ut).every(function (Dt) {
                                  return Dt;
                              });
                      });
                      if (vt) return (X = vt), "break";
                  },
                  rt = At;
              rt > 0;
              rt--
          ) {
              var Ct = Pt(rt);
              if (Ct === "break") break;
          }
      t.placement !== X && ((t.modifiersData[i]._skip = !0), (t.placement = X), (t.reset = !0));
  }
}
const hd = { name: "flip", enabled: !0, phase: "main", fn: MT, requiresIfExists: ["offset"], data: { _skip: !1 } };
function su(e, t, n) {
  return n === void 0 && (n = { x: 0, y: 0 }), { top: e.top - t.height - n.y, right: e.right - t.width + n.x, bottom: e.bottom - t.height + n.y, left: e.left - t.width - n.x };
}
function ru(e) {
  return [Bt, se, ie, qt].some(function (t) {
      return e[t] >= 0;
  });
}
function NT(e) {
  var t = e.state,
      n = e.name,
      i = t.rects.reference,
      s = t.rects.popper,
      r = t.modifiersData.preventOverflow,
      o = vi(t, { elementContext: "reference" }),
      a = vi(t, { altBoundary: !0 }),
      c = su(o, i),
      u = su(a, s, r),
      h = ru(c),
      f = ru(u);
  (t.modifiersData[n] = { referenceClippingOffsets: c, popperEscapeOffsets: u, isReferenceHidden: h, hasPopperEscaped: f }),
      (t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-reference-hidden": h, "data-popper-escaped": f }));
}
const dd = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: NT };
function DT(e, t, n) {
  var i = Me(e),
      s = [qt, Bt].indexOf(i) >= 0 ? -1 : 1,
      r = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n,
      o = r[0],
      a = r[1];
  return (o = o || 0), (a = (a || 0) * s), [qt, se].indexOf(i) >= 0 ? { x: a, y: o } : { x: o, y: a };
}
function FT(e) {
  var t = e.state,
      n = e.options,
      i = e.name,
      s = n.offset,
      r = s === void 0 ? [0, 0] : s,
      o = Ma.reduce(function (h, f) {
          return (h[f] = DT(f, t.rects, r)), h;
      }, {}),
      a = o[t.placement],
      c = a.x,
      u = a.y;
  t.modifiersData.popperOffsets != null && ((t.modifiersData.popperOffsets.x += c), (t.modifiersData.popperOffsets.y += u)), (t.modifiersData[i] = o);
}
const fd = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: FT };
function kT(e) {
  var t = e.state,
      n = e.name;
  t.modifiersData[n] = ud({ reference: t.rects.reference, element: t.rects.popper, strategy: "absolute", placement: t.placement });
}
const Ua = { name: "popperOffsets", enabled: !0, phase: "read", fn: kT, data: {} };
function $T(e) {
  return e === "x" ? "y" : "x";
}
function VT(e) {
  var t = e.state,
      n = e.options,
      i = e.name,
      s = n.mainAxis,
      r = s === void 0 ? !0 : s,
      o = n.altAxis,
      a = o === void 0 ? !1 : o,
      c = n.boundary,
      u = n.rootBoundary,
      h = n.altBoundary,
      f = n.padding,
      g = n.tether,
      _ = g === void 0 ? !0 : g,
      T = n.tetherOffset,
      v = T === void 0 ? 0 : T,
      b = vi(t, { boundary: c, rootBoundary: u, padding: f, altBoundary: h }),
      x = Me(t.placement),
      R = yi(t.placement),
      M = !R,
      I = ka(x),
      w = $T(I),
      K = t.modifiersData.popperOffsets,
      W = t.rects.reference,
      q = t.rects.popper,
      X = typeof v == "function" ? v(Object.assign({}, t.rects, { placement: t.placement })) : v,
      Y = typeof X == "number" ? { mainAxis: X, altAxis: X } : Object.assign({ mainAxis: 0, altAxis: 0 }, X),
      B = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
      Et = { x: 0, y: 0 };
  if (K) {
      if (r) {
          var ct,
              xt = I === "y" ? Bt : qt,
              bt = I === "y" ? ie : se,
              et = I === "y" ? "height" : "width",
              U = K[I],
              J = U + b[xt],
              mt = U - b[bt],
              At = _ ? -q[et] / 2 : 0,
              Pt = R === Ln ? W[et] : q[et],
              rt = R === Ln ? -q[et] : -W[et],
              Ct = t.elements.arrow,
              lt = _ && Ct ? Fa(Ct) : { width: 0, height: 0 },
              ut = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : rd(),
              vt = ut[xt],
              yt = ut[bt],
              Ot = $i(0, W[et], lt[et]),
              Dt = M ? W[et] / 2 - At - Ot - vt - Y.mainAxis : Pt - Ot - vt - Y.mainAxis,
              oe = M ? -W[et] / 2 + At + Ot + yt + Y.mainAxis : rt + Ot + yt + Y.mainAxis,
              P = t.elements.arrow && os(t.elements.arrow),
              m = P ? (I === "y" ? P.clientTop || 0 : P.clientLeft || 0) : 0,
              y = (ct = B == null ? void 0 : B[I]) != null ? ct : 0,
              A = U + Dt - y - m,
              L = U + oe - y,
              S = $i(_ ? nr(J, A) : J, U, _ ? xn(mt, L) : mt);
          (K[I] = S), (Et[I] = S - U);
      }
      if (a) {
          var F,
              k = I === "x" ? Bt : qt,
              D = I === "x" ? ie : se,
              C = K[w],
              N = w === "y" ? "height" : "width",
              j = C + b[k],
              z = C - b[D],
              G = [Bt, qt].indexOf(x) !== -1,
              H = (F = B == null ? void 0 : B[w]) != null ? F : 0,
              tt = G ? j : C - W[N] - q[N] - H + Y.altAxis,
              ot = G ? C + W[N] + q[N] - H - Y.altAxis : z,
              ht = _ && G ? pT(tt, C, ot) : $i(_ ? tt : j, C, _ ? ot : z);
          (K[w] = ht), (Et[w] = ht - C);
      }
      t.modifiersData[i] = Et;
  }
}
const gd = { name: "preventOverflow", enabled: !0, phase: "main", fn: VT, requiresIfExists: ["offset"] };
function jT(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function KT(e) {
  return e === re(e) || !pe(e) ? ja(e) : jT(e);
}
function GT(e) {
  var t = e.getBoundingClientRect(),
      n = mi(t.width) / e.offsetWidth || 1,
      i = mi(t.height) / e.offsetHeight || 1;
  return n !== 1 || i !== 1;
}
function UT(e, t, n) {
  n === void 0 && (n = !1);
  var i = pe(t),
      s = pe(t) && GT(t),
      r = cn(t),
      o = Ei(e, s, n),
      a = { scrollLeft: 0, scrollTop: 0 },
      c = { x: 0, y: 0 };
  return (
      (i || (!i && !n)) && ((De(t) !== "body" || Ga(r)) && (a = KT(t)), pe(t) ? ((c = Ei(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop)) : r && (c.x = Ka(r))),
      { x: o.left + a.scrollLeft - c.x, y: o.top + a.scrollTop - c.y, width: o.width, height: o.height }
  );
}
function zT(e) {
  var t = new Map(),
      n = new Set(),
      i = [];
  e.forEach(function (r) {
      t.set(r.name, r);
  });
  function s(r) {
      n.add(r.name);
      var o = [].concat(r.requires || [], r.requiresIfExists || []);
      o.forEach(function (a) {
          if (!n.has(a)) {
              var c = t.get(a);
              c && s(c);
          }
      }),
          i.push(r);
  }
  return (
      e.forEach(function (r) {
          n.has(r.name) || s(r);
      }),
      i
  );
}
function YT(e) {
  var t = zT(e);
  return nd.reduce(function (n, i) {
      return n.concat(
          t.filter(function (s) {
              return s.phase === i;
          })
      );
  }, []);
}
function HT(e) {
  var t;
  return function () {
      return (
          t ||
              (t = new Promise(function (n) {
                  Promise.resolve().then(function () {
                      (t = void 0), n(e());
                  });
              })),
          t
      );
  };
}
function WT(e) {
  var t = e.reduce(function (n, i) {
      var s = n[i.name];
      return (n[i.name] = s ? Object.assign({}, s, i, { options: Object.assign({}, s.options, i.options), data: Object.assign({}, s.data, i.data) }) : i), n;
  }, {});
  return Object.keys(t).map(function (n) {
      return t[n];
  });
}
var ou = { placement: "bottom", modifiers: [], strategy: "absolute" };
function au() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return !t.some(function (i) {
      return !(i && typeof i.getBoundingClientRect == "function");
  });
}
function Rr(e) {
  e === void 0 && (e = {});
  var t = e,
      n = t.defaultModifiers,
      i = n === void 0 ? [] : n,
      s = t.defaultOptions,
      r = s === void 0 ? ou : s;
  return function (a, c, u) {
      u === void 0 && (u = r);
      var h = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, ou, r), modifiersData: {}, elements: { reference: a, popper: c }, attributes: {}, styles: {} },
          f = [],
          g = !1,
          _ = {
              state: h,
              setOptions: function (x) {
                  var R = typeof x == "function" ? x(h.options) : x;
                  v(), (h.options = Object.assign({}, r, h.options, R)), (h.scrollParents = { reference: Pn(a) ? Vi(a) : a.contextElement ? Vi(a.contextElement) : [], popper: Vi(c) });
                  var M = YT(WT([].concat(i, h.options.modifiers)));
                  return (
                      (h.orderedModifiers = M.filter(function (I) {
                          return I.enabled;
                      })),
                      T(),
                      _.update()
                  );
              },
              forceUpdate: function () {
                  if (!g) {
                      var x = h.elements,
                          R = x.reference,
                          M = x.popper;
                      if (au(R, M)) {
                          (h.rects = { reference: UT(R, os(M), h.options.strategy === "fixed"), popper: Fa(M) }),
                              (h.reset = !1),
                              (h.placement = h.options.placement),
                              h.orderedModifiers.forEach(function (Y) {
                                  return (h.modifiersData[Y.name] = Object.assign({}, Y.data));
                              });
                          for (var I = 0; I < h.orderedModifiers.length; I++) {
                              if (h.reset === !0) {
                                  (h.reset = !1), (I = -1);
                                  continue;
                              }
                              var w = h.orderedModifiers[I],
                                  K = w.fn,
                                  W = w.options,
                                  q = W === void 0 ? {} : W,
                                  X = w.name;
                              typeof K == "function" && (h = K({ state: h, options: q, name: X, instance: _ }) || h);
                          }
                      }
                  }
              },
              update: HT(function () {
                  return new Promise(function (b) {
                      _.forceUpdate(), b(h);
                  });
              }),
              destroy: function () {
                  v(), (g = !0);
              },
          };
      if (!au(a, c)) return _;
      _.setOptions(u).then(function (b) {
          !g && u.onFirstUpdate && u.onFirstUpdate(b);
      });
      function T() {
          h.orderedModifiers.forEach(function (b) {
              var x = b.name,
                  R = b.options,
                  M = R === void 0 ? {} : R,
                  I = b.effect;
              if (typeof I == "function") {
                  var w = I({ state: h, name: x, instance: _, options: M }),
                      K = function () {};
                  f.push(w || K);
              }
          });
      }
      function v() {
          f.forEach(function (b) {
              return b();
          }),
              (f = []);
      }
      return _;
  };
}
var XT = Rr(),
  ZT = [Va, Ua, $a, Da],
  BT = Rr({ defaultModifiers: ZT }),
  qT = [Va, Ua, $a, Da, fd, hd, gd, ld, dd],
  QT = Rr({ defaultModifiers: qT });
const JT = Object.freeze(
      Object.defineProperty(
          {
              __proto__: null,
              afterMain: Qh,
              afterRead: Zh,
              afterWrite: ed,
              applyStyles: Da,
              arrow: ld,
              auto: wr,
              basePlacements: Ai,
              beforeMain: Bh,
              beforeRead: Wh,
              beforeWrite: Jh,
              bottom: ie,
              clippingParents: Yh,
              computeStyles: $a,
              createPopper: QT,
              createPopperBase: XT,
              createPopperLite: BT,
              detectOverflow: vi,
              end: pi,
              eventListeners: Va,
              flip: hd,
              hide: dd,
              left: qt,
              main: qh,
              modifierPhases: nd,
              offset: fd,
              placements: Ma,
              popper: ei,
              popperGenerator: Rr,
              popperOffsets: Ua,
              preventOverflow: gd,
              read: Xh,
              reference: Hh,
              right: se,
              start: Ln,
              top: Bt,
              variationPlacements: Mo,
              viewport: Pa,
              write: td,
          },
          Symbol.toStringTag,
          { value: "Module" }
      )
  ),
  tb = y0(JT);
/*!
* Bootstrap v5.3.2 (https://getbootstrap.com/)
* Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
*/ (function (e, t) {
  (function (n, i) {
      e.exports = i(tb);
  })(m0, function (n) {
      function i(p) {
          const l = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
          if (p) {
              for (const d in p)
                  if (d !== "default") {
                      const E = Object.getOwnPropertyDescriptor(p, d);
                      Object.defineProperty(l, d, E.get ? E : { enumerable: !0, get: () => p[d] });
                  }
          }
          return (l.default = p), Object.freeze(l);
      }
      const s = i(n),
          r = new Map(),
          o = {
              set(p, l, d) {
                  r.has(p) || r.set(p, new Map());
                  const E = r.get(p);
                  if (!E.has(l) && E.size !== 0) {
                      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(E.keys())[0]}.`);
                      return;
                  }
                  E.set(l, d);
              },
              get(p, l) {
                  return (r.has(p) && r.get(p).get(l)) || null;
              },
              remove(p, l) {
                  if (!r.has(p)) return;
                  const d = r.get(p);
                  d.delete(l), d.size === 0 && r.delete(p);
              },
          },
          a = 1e6,
          c = 1e3,
          u = "transitionend",
          h = (p) => (p && window.CSS && window.CSS.escape && (p = p.replace(/#([^\s"#']+)/g, (l, d) => `#${CSS.escape(d)}`)), p),
          f = (p) =>
              p == null
                  ? `${p}`
                  : Object.prototype.toString
                        .call(p)
                        .match(/\s([a-z]+)/i)[1]
                        .toLowerCase(),
          g = (p) => {
              do p += Math.floor(Math.random() * a);
              while (document.getElementById(p));
              return p;
          },
          _ = (p) => {
              if (!p) return 0;
              let { transitionDuration: l, transitionDelay: d } = window.getComputedStyle(p);
              const E = Number.parseFloat(l),
                  O = Number.parseFloat(d);
              return !E && !O ? 0 : ((l = l.split(",")[0]), (d = d.split(",")[0]), (Number.parseFloat(l) + Number.parseFloat(d)) * c);
          },
          T = (p) => {
              p.dispatchEvent(new Event(u));
          },
          v = (p) => (!p || typeof p != "object" ? !1 : (typeof p.jquery < "u" && (p = p[0]), typeof p.nodeType < "u")),
          b = (p) => (v(p) ? (p.jquery ? p[0] : p) : typeof p == "string" && p.length > 0 ? document.querySelector(h(p)) : null),
          x = (p) => {
              if (!v(p) || p.getClientRects().length === 0) return !1;
              const l = getComputedStyle(p).getPropertyValue("visibility") === "visible",
                  d = p.closest("details:not([open])");
              if (!d) return l;
              if (d !== p) {
                  const E = p.closest("summary");
                  if ((E && E.parentNode !== d) || E === null) return !1;
              }
              return l;
          },
          R = (p) => (!p || p.nodeType !== Node.ELEMENT_NODE || p.classList.contains("disabled") ? !0 : typeof p.disabled < "u" ? p.disabled : p.hasAttribute("disabled") && p.getAttribute("disabled") !== "false"),
          M = (p) => {
              if (!document.documentElement.attachShadow) return null;
              if (typeof p.getRootNode == "function") {
                  const l = p.getRootNode();
                  return l instanceof ShadowRoot ? l : null;
              }
              return p instanceof ShadowRoot ? p : p.parentNode ? M(p.parentNode) : null;
          },
          I = () => {},
          w = (p) => {
              p.offsetHeight;
          },
          K = () => (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null),
          W = [],
          q = (p) => {
              document.readyState === "loading"
                  ? (W.length ||
                        document.addEventListener("DOMContentLoaded", () => {
                            for (const l of W) l();
                        }),
                    W.push(p))
                  : p();
          },
          X = () => document.documentElement.dir === "rtl",
          Y = (p) => {
              q(() => {
                  const l = K();
                  if (l) {
                      const d = p.NAME,
                          E = l.fn[d];
                      (l.fn[d] = p.jQueryInterface), (l.fn[d].Constructor = p), (l.fn[d].noConflict = () => ((l.fn[d] = E), p.jQueryInterface));
                  }
              });
          },
          B = (p, l = [], d = p) => (typeof p == "function" ? p(...l) : d),
          Et = (p, l, d = !0) => {
              if (!d) {
                  B(p);
                  return;
              }
              const O = _(l) + 5;
              let V = !1;
              const $ = ({ target: it }) => {
                  it === l && ((V = !0), l.removeEventListener(u, $), B(p));
              };
              l.addEventListener(u, $),
                  setTimeout(() => {
                      V || T(l);
                  }, O);
          },
          ct = (p, l, d, E) => {
              const O = p.length;
              let V = p.indexOf(l);
              return V === -1 ? (!d && E ? p[O - 1] : p[0]) : ((V += d ? 1 : -1), E && (V = (V + O) % O), p[Math.max(0, Math.min(V, O - 1))]);
          },
          xt = /[^.]*(?=\..*)\.|.*/,
          bt = /\..*/,
          et = /::\d+$/,
          U = {};
      let J = 1;
      const mt = { mouseenter: "mouseover", mouseleave: "mouseout" },
          At = new Set([
              "click",
              "dblclick",
              "mouseup",
              "mousedown",
              "contextmenu",
              "mousewheel",
              "DOMMouseScroll",
              "mouseover",
              "mouseout",
              "mousemove",
              "selectstart",
              "selectend",
              "keydown",
              "keypress",
              "keyup",
              "orientationchange",
              "touchstart",
              "touchmove",
              "touchend",
              "touchcancel",
              "pointerdown",
              "pointermove",
              "pointerup",
              "pointerleave",
              "pointercancel",
              "gesturestart",
              "gesturechange",
              "gestureend",
              "focus",
              "blur",
              "change",
              "reset",
              "select",
              "submit",
              "focusin",
              "focusout",
              "load",
              "unload",
              "beforeunload",
              "resize",
              "move",
              "DOMContentLoaded",
              "readystatechange",
              "error",
              "abort",
              "scroll",
          ]);
      function Pt(p, l) {
          return (l && `${l}::${J++}`) || p.uidEvent || J++;
      }
      function rt(p) {
          const l = Pt(p);
          return (p.uidEvent = l), (U[l] = U[l] || {}), U[l];
      }
      function Ct(p, l) {
          return function d(E) {
              return m(E, { delegateTarget: p }), d.oneOff && P.off(p, E.type, l), l.apply(p, [E]);
          };
      }
      function lt(p, l, d) {
          return function E(O) {
              const V = p.querySelectorAll(l);
              for (let { target: $ } = O; $ && $ !== this; $ = $.parentNode) for (const it of V) if (it === $) return m(O, { delegateTarget: $ }), E.oneOff && P.off(p, O.type, l, d), d.apply($, [O]);
          };
      }
      function ut(p, l, d = null) {
          return Object.values(p).find((E) => E.callable === l && E.delegationSelector === d);
      }
      function vt(p, l, d) {
          const E = typeof l == "string",
              O = E ? d : l || d;
          let V = oe(p);
          return At.has(V) || (V = p), [E, O, V];
      }
      function yt(p, l, d, E, O) {
          if (typeof l != "string" || !p) return;
          let [V, $, it] = vt(l, d, E);
          l in mt &&
              ($ = ((H_) =>
                  function (Yn) {
                      if (!Yn.relatedTarget || (Yn.relatedTarget !== Yn.delegateTarget && !Yn.delegateTarget.contains(Yn.relatedTarget))) return H_.call(this, Yn);
                  })($));
          const Qt = rt(p),
              ce = Qt[it] || (Qt[it] = {}),
              $t = ut(ce, $, V ? d : null);
          if ($t) {
              $t.oneOff = $t.oneOff && O;
              return;
          }
          const Ae = Pt($, l.replace(xt, "")),
              Ee = V ? lt(p, d, $) : Ct(p, $);
          (Ee.delegationSelector = V ? d : null), (Ee.callable = $), (Ee.oneOff = O), (Ee.uidEvent = Ae), (ce[Ae] = Ee), p.addEventListener(it, Ee, V);
      }
      function Ot(p, l, d, E, O) {
          const V = ut(l[d], E, O);
          V && (p.removeEventListener(d, V, !!O), delete l[d][V.uidEvent]);
      }
      function Dt(p, l, d, E) {
          const O = l[d] || {};
          for (const [V, $] of Object.entries(O)) V.includes(E) && Ot(p, l, d, $.callable, $.delegationSelector);
      }
      function oe(p) {
          return (p = p.replace(bt, "")), mt[p] || p;
      }
      const P = {
          on(p, l, d, E) {
              yt(p, l, d, E, !1);
          },
          one(p, l, d, E) {
              yt(p, l, d, E, !0);
          },
          off(p, l, d, E) {
              if (typeof l != "string" || !p) return;
              const [O, V, $] = vt(l, d, E),
                  it = $ !== l,
                  Qt = rt(p),
                  ce = Qt[$] || {},
                  $t = l.startsWith(".");
              if (typeof V < "u") {
                  if (!Object.keys(ce).length) return;
                  Ot(p, Qt, $, V, O ? d : null);
                  return;
              }
              if ($t) for (const Ae of Object.keys(Qt)) Dt(p, Qt, Ae, l.slice(1));
              for (const [Ae, Ee] of Object.entries(ce)) {
                  const vs = Ae.replace(et, "");
                  (!it || l.includes(vs)) && Ot(p, Qt, $, Ee.callable, Ee.delegationSelector);
              }
          },
          trigger(p, l, d) {
              if (typeof l != "string" || !p) return null;
              const E = K(),
                  O = oe(l),
                  V = l !== O;
              let $ = null,
                  it = !0,
                  Qt = !0,
                  ce = !1;
              V && E && (($ = E.Event(l, d)), E(p).trigger($), (it = !$.isPropagationStopped()), (Qt = !$.isImmediatePropagationStopped()), (ce = $.isDefaultPrevented()));
              const $t = m(new Event(l, { bubbles: it, cancelable: !0 }), d);
              return ce && $t.preventDefault(), Qt && p.dispatchEvent($t), $t.defaultPrevented && $ && $.preventDefault(), $t;
          },
      };
      function m(p, l = {}) {
          for (const [d, E] of Object.entries(l))
              try {
                  p[d] = E;
              } catch {
                  Object.defineProperty(p, d, {
                      configurable: !0,
                      get() {
                          return E;
                      },
                  });
              }
          return p;
      }
      function y(p) {
          if (p === "true") return !0;
          if (p === "false") return !1;
          if (p === Number(p).toString()) return Number(p);
          if (p === "" || p === "null") return null;
          if (typeof p != "string") return p;
          try {
              return JSON.parse(decodeURIComponent(p));
          } catch {
              return p;
          }
      }
      function A(p) {
          return p.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);
      }
      const L = {
          setDataAttribute(p, l, d) {
              p.setAttribute(`data-bs-${A(l)}`, d);
          },
          removeDataAttribute(p, l) {
              p.removeAttribute(`data-bs-${A(l)}`);
          },
          getDataAttributes(p) {
              if (!p) return {};
              const l = {},
                  d = Object.keys(p.dataset).filter((E) => E.startsWith("bs") && !E.startsWith("bsConfig"));
              for (const E of d) {
                  let O = E.replace(/^bs/, "");
                  (O = O.charAt(0).toLowerCase() + O.slice(1, O.length)), (l[O] = y(p.dataset[E]));
              }
              return l;
          },
          getDataAttribute(p, l) {
              return y(p.getAttribute(`data-bs-${A(l)}`));
          },
      };
      class S {
          static get Default() {
              return {};
          }
          static get DefaultType() {
              return {};
          }
          static get NAME() {
              throw new Error('You have to implement the static method "NAME", for each component!');
          }
          _getConfig(l) {
              return (l = this._mergeConfigObj(l)), (l = this._configAfterMerge(l)), this._typeCheckConfig(l), l;
          }
          _configAfterMerge(l) {
              return l;
          }
          _mergeConfigObj(l, d) {
              const E = v(d) ? L.getDataAttribute(d, "config") : {};
              return { ...this.constructor.Default, ...(typeof E == "object" ? E : {}), ...(v(d) ? L.getDataAttributes(d) : {}), ...(typeof l == "object" ? l : {}) };
          }
          _typeCheckConfig(l, d = this.constructor.DefaultType) {
              for (const [E, O] of Object.entries(d)) {
                  const V = l[E],
                      $ = v(V) ? "element" : f(V);
                  if (!new RegExp(O).test($)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${E}" provided type "${$}" but expected type "${O}".`);
              }
          }
      }
      const F = "5.3.2";
      class k extends S {
          constructor(l, d) {
              super(), (l = b(l)), l && ((this._element = l), (this._config = this._getConfig(d)), o.set(this._element, this.constructor.DATA_KEY, this));
          }
          dispose() {
              o.remove(this._element, this.constructor.DATA_KEY), P.off(this._element, this.constructor.EVENT_KEY);
              for (const l of Object.getOwnPropertyNames(this)) this[l] = null;
          }
          _queueCallback(l, d, E = !0) {
              Et(l, d, E);
          }
          _getConfig(l) {
              return (l = this._mergeConfigObj(l, this._element)), (l = this._configAfterMerge(l)), this._typeCheckConfig(l), l;
          }
          static getInstance(l) {
              return o.get(b(l), this.DATA_KEY);
          }
          static getOrCreateInstance(l, d = {}) {
              return this.getInstance(l) || new this(l, typeof d == "object" ? d : null);
          }
          static get VERSION() {
              return F;
          }
          static get DATA_KEY() {
              return `bs.${this.NAME}`;
          }
          static get EVENT_KEY() {
              return `.${this.DATA_KEY}`;
          }
          static eventName(l) {
              return `${l}${this.EVENT_KEY}`;
          }
      }
      const D = (p) => {
              let l = p.getAttribute("data-bs-target");
              if (!l || l === "#") {
                  let d = p.getAttribute("href");
                  if (!d || (!d.includes("#") && !d.startsWith("."))) return null;
                  d.includes("#") && !d.startsWith("#") && (d = `#${d.split("#")[1]}`), (l = d && d !== "#" ? h(d.trim()) : null);
              }
              return l;
          },
          C = {
              find(p, l = document.documentElement) {
                  return [].concat(...Element.prototype.querySelectorAll.call(l, p));
              },
              findOne(p, l = document.documentElement) {
                  return Element.prototype.querySelector.call(l, p);
              },
              children(p, l) {
                  return [].concat(...p.children).filter((d) => d.matches(l));
              },
              parents(p, l) {
                  const d = [];
                  let E = p.parentNode.closest(l);
                  for (; E; ) d.push(E), (E = E.parentNode.closest(l));
                  return d;
              },
              prev(p, l) {
                  let d = p.previousElementSibling;
                  for (; d; ) {
                      if (d.matches(l)) return [d];
                      d = d.previousElementSibling;
                  }
                  return [];
              },
              next(p, l) {
                  let d = p.nextElementSibling;
                  for (; d; ) {
                      if (d.matches(l)) return [d];
                      d = d.nextElementSibling;
                  }
                  return [];
              },
              focusableChildren(p) {
                  const l = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((d) => `${d}:not([tabindex^="-"])`).join(",");
                  return this.find(l, p).filter((d) => !R(d) && x(d));
              },
              getSelectorFromElement(p) {
                  const l = D(p);
                  return l && C.findOne(l) ? l : null;
              },
              getElementFromSelector(p) {
                  const l = D(p);
                  return l ? C.findOne(l) : null;
              },
              getMultipleElementsFromSelector(p) {
                  const l = D(p);
                  return l ? C.find(l) : [];
              },
          },
          N = (p, l = "hide") => {
              const d = `click.dismiss${p.EVENT_KEY}`,
                  E = p.NAME;
              P.on(document, d, `[data-bs-dismiss="${E}"]`, function (O) {
                  if ((["A", "AREA"].includes(this.tagName) && O.preventDefault(), R(this))) return;
                  const V = C.getElementFromSelector(this) || this.closest(`.${E}`);
                  p.getOrCreateInstance(V)[l]();
              });
          },
          j = "alert",
          G = ".bs.alert",
          H = `close${G}`,
          tt = `closed${G}`,
          ot = "fade",
          ht = "show";
      class ft extends k {
          static get NAME() {
              return j;
          }
          close() {
              if (P.trigger(this._element, H).defaultPrevented) return;
              this._element.classList.remove(ht);
              const d = this._element.classList.contains(ot);
              this._queueCallback(() => this._destroyElement(), this._element, d);
          }
          _destroyElement() {
              this._element.remove(), P.trigger(this._element, tt), this.dispose();
          }
          static jQueryInterface(l) {
              return this.each(function () {
                  const d = ft.getOrCreateInstance(this);
                  if (typeof l == "string") {
                      if (d[l] === void 0 || l.startsWith("_") || l === "constructor") throw new TypeError(`No method named "${l}"`);
                      d[l](this);
                  }
              });
          }
      }
      N(ft, "close"), Y(ft);
      const Wt = "button",
          as = ".bs.button",
          un = ".data-api",
          ls = "active",
          Gt = '[data-bs-toggle="button"]',
          ae = `click${as}${un}`;
      class Ye extends k {
          static get NAME() {
              return Wt;
          }
          toggle() {
              this._element.setAttribute("aria-pressed", this._element.classList.toggle(ls));
          }
          static jQueryInterface(l) {
              return this.each(function () {
                  const d = Ye.getOrCreateInstance(this);
                  l === "toggle" && d[l]();
              });
          }
      }
      P.on(document, ae, Gt, (p) => {
          p.preventDefault();
          const l = p.target.closest(Gt);
          Ye.getOrCreateInstance(l).toggle();
      }),
          Y(Ye);
      const _d = "swipe",
          kn = ".bs.swipe",
          pd = `touchstart${kn}`,
          md = `touchmove${kn}`,
          Ed = `touchend${kn}`,
          yd = `pointerdown${kn}`,
          vd = `pointerup${kn}`,
          Td = "touch",
          bd = "pen",
          Cd = "pointer-event",
          wd = 40,
          Ad = { endCallback: null, leftCallback: null, rightCallback: null },
          Rd = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };
      class cs extends S {
          constructor(l, d) {
              super(), (this._element = l), !(!l || !cs.isSupported()) && ((this._config = this._getConfig(d)), (this._deltaX = 0), (this._supportPointerEvents = !!window.PointerEvent), this._initEvents());
          }
          static get Default() {
              return Ad;
          }
          static get DefaultType() {
              return Rd;
          }
          static get NAME() {
              return _d;
          }
          dispose() {
              P.off(this._element, kn);
          }
          _start(l) {
              if (!this._supportPointerEvents) {
                  this._deltaX = l.touches[0].clientX;
                  return;
              }
              this._eventIsPointerPenTouch(l) && (this._deltaX = l.clientX);
          }
          _end(l) {
              this._eventIsPointerPenTouch(l) && (this._deltaX = l.clientX - this._deltaX), this._handleSwipe(), B(this._config.endCallback);
          }
          _move(l) {
              this._deltaX = l.touches && l.touches.length > 1 ? 0 : l.touches[0].clientX - this._deltaX;
          }
          _handleSwipe() {
              const l = Math.abs(this._deltaX);
              if (l <= wd) return;
              const d = l / this._deltaX;
              (this._deltaX = 0), d && B(d > 0 ? this._config.rightCallback : this._config.leftCallback);
          }
          _initEvents() {
              this._supportPointerEvents
                  ? (P.on(this._element, yd, (l) => this._start(l)), P.on(this._element, vd, (l) => this._end(l)), this._element.classList.add(Cd))
                  : (P.on(this._element, pd, (l) => this._start(l)), P.on(this._element, md, (l) => this._move(l)), P.on(this._element, Ed, (l) => this._end(l)));
          }
          _eventIsPointerPenTouch(l) {
              return this._supportPointerEvents && (l.pointerType === bd || l.pointerType === Td);
          }
          static isSupported() {
              return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
          }
      }
      const Id = "carousel",
          He = ".bs.carousel",
          za = ".data-api",
          xd = "ArrowLeft",
          Od = "ArrowRight",
          Sd = 500,
          Ri = "next",
          $n = "prev",
          Vn = "left",
          us = "right",
          Ld = `slide${He}`,
          Ir = `slid${He}`,
          Pd = `keydown${He}`,
          Md = `mouseenter${He}`,
          Nd = `mouseleave${He}`,
          Dd = `dragstart${He}`,
          Fd = `load${He}${za}`,
          kd = `click${He}${za}`,
          Ya = "carousel",
          hs = "active",
          $d = "slide",
          Vd = "carousel-item-end",
          jd = "carousel-item-start",
          Kd = "carousel-item-next",
          Gd = "carousel-item-prev",
          Ha = ".active",
          Wa = ".carousel-item",
          Ud = Ha + Wa,
          zd = ".carousel-item img",
          Yd = ".carousel-indicators",
          Hd = "[data-bs-slide], [data-bs-slide-to]",
          Wd = '[data-bs-ride="carousel"]',
          Xd = { [xd]: us, [Od]: Vn },
          Zd = { interval: 5e3, keyboard: !0, pause: "hover", ride: !1, touch: !0, wrap: !0 },
          Bd = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };
      class jn extends k {
          constructor(l, d) {
              super(l, d),
                  (this._interval = null),
                  (this._activeElement = null),
                  (this._isSliding = !1),
                  (this.touchTimeout = null),
                  (this._swipeHelper = null),
                  (this._indicatorsElement = C.findOne(Yd, this._element)),
                  this._addEventListeners(),
                  this._config.ride === Ya && this.cycle();
          }
          static get Default() {
              return Zd;
          }
          static get DefaultType() {
              return Bd;
          }
          static get NAME() {
              return Id;
          }
          next() {
              this._slide(Ri);
          }
          nextWhenVisible() {
              !document.hidden && x(this._element) && this.next();
          }
          prev() {
              this._slide($n);
          }
          pause() {
              this._isSliding && T(this._element), this._clearInterval();
          }
          cycle() {
              this._clearInterval(), this._updateInterval(), (this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval));
          }
          _maybeEnableCycle() {
              if (this._config.ride) {
                  if (this._isSliding) {
                      P.one(this._element, Ir, () => this.cycle());
                      return;
                  }
                  this.cycle();
              }
          }
          to(l) {
              const d = this._getItems();
              if (l > d.length - 1 || l < 0) return;
              if (this._isSliding) {
                  P.one(this._element, Ir, () => this.to(l));
                  return;
              }
              const E = this._getItemIndex(this._getActive());
              if (E === l) return;
              const O = l > E ? Ri : $n;
              this._slide(O, d[l]);
          }
          dispose() {
              this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
          }
          _configAfterMerge(l) {
              return (l.defaultInterval = l.interval), l;
          }
          _addEventListeners() {
              this._config.keyboard && P.on(this._element, Pd, (l) => this._keydown(l)),
                  this._config.pause === "hover" && (P.on(this._element, Md, () => this.pause()), P.on(this._element, Nd, () => this._maybeEnableCycle())),
                  this._config.touch && cs.isSupported() && this._addTouchEventListeners();
          }
          _addTouchEventListeners() {
              for (const E of C.find(zd, this._element)) P.on(E, Dd, (O) => O.preventDefault());
              const d = {
                  leftCallback: () => this._slide(this._directionToOrder(Vn)),
                  rightCallback: () => this._slide(this._directionToOrder(us)),
                  endCallback: () => {
                      this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), (this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Sd + this._config.interval)));
                  },
              };
              this._swipeHelper = new cs(this._element, d);
          }
          _keydown(l) {
              if (/input|textarea/i.test(l.target.tagName)) return;
              const d = Xd[l.key];
              d && (l.preventDefault(), this._slide(this._directionToOrder(d)));
          }
          _getItemIndex(l) {
              return this._getItems().indexOf(l);
          }
          _setActiveIndicatorElement(l) {
              if (!this._indicatorsElement) return;
              const d = C.findOne(Ha, this._indicatorsElement);
              d.classList.remove(hs), d.removeAttribute("aria-current");
              const E = C.findOne(`[data-bs-slide-to="${l}"]`, this._indicatorsElement);
              E && (E.classList.add(hs), E.setAttribute("aria-current", "true"));
          }
          _updateInterval() {
              const l = this._activeElement || this._getActive();
              if (!l) return;
              const d = Number.parseInt(l.getAttribute("data-bs-interval"), 10);
              this._config.interval = d || this._config.defaultInterval;
          }
          _slide(l, d = null) {
              if (this._isSliding) return;
              const E = this._getActive(),
                  O = l === Ri,
                  V = d || ct(this._getItems(), E, O, this._config.wrap);
              if (V === E) return;
              const $ = this._getItemIndex(V),
                  it = (vs) => P.trigger(this._element, vs, { relatedTarget: V, direction: this._orderToDirection(l), from: this._getItemIndex(E), to: $ });
              if (it(Ld).defaultPrevented || !E || !V) return;
              const ce = !!this._interval;
              this.pause(), (this._isSliding = !0), this._setActiveIndicatorElement($), (this._activeElement = V);
              const $t = O ? jd : Vd,
                  Ae = O ? Kd : Gd;
              V.classList.add(Ae), w(V), E.classList.add($t), V.classList.add($t);
              const Ee = () => {
                  V.classList.remove($t, Ae), V.classList.add(hs), E.classList.remove(hs, Ae, $t), (this._isSliding = !1), it(Ir);
              };
              this._queueCallback(Ee, E, this._isAnimated()), ce && this.cycle();
          }
          _isAnimated() {
              return this._element.classList.contains($d);
          }
          _getActive() {
              return C.findOne(Ud, this._element);
          }
          _getItems() {
              return C.find(Wa, this._element);
          }
          _clearInterval() {
              this._interval && (clearInterval(this._interval), (this._interval = null));
          }
          _directionToOrder(l) {
              return X() ? (l === Vn ? $n : Ri) : l === Vn ? Ri : $n;
          }
          _orderToDirection(l) {
              return X() ? (l === $n ? Vn : us) : l === $n ? us : Vn;
          }
          static jQueryInterface(l) {
              return this.each(function () {
                  const d = jn.getOrCreateInstance(this, l);
                  if (typeof l == "number") {
                      d.to(l);
                      return;
                  }
                  if (typeof l == "string") {
                      if (d[l] === void 0 || l.startsWith("_") || l === "constructor") throw new TypeError(`No method named "${l}"`);
                      d[l]();
                  }
              });
          }
      }
      P.on(document, kd, Hd, function (p) {
          const l = C.getElementFromSelector(this);
          if (!l || !l.classList.contains(Ya)) return;
          p.preventDefault();
          const d = jn.getOrCreateInstance(l),
              E = this.getAttribute("data-bs-slide-to");
          if (E) {
              d.to(E), d._maybeEnableCycle();
              return;
          }
          if (L.getDataAttribute(this, "slide") === "next") {
              d.next(), d._maybeEnableCycle();
              return;
          }
          d.prev(), d._maybeEnableCycle();
      }),
          P.on(window, Fd, () => {
              const p = C.find(Wd);
              for (const l of p) jn.getOrCreateInstance(l);
          }),
          Y(jn);
      const qd = "collapse",
          Ii = ".bs.collapse",
          Qd = ".data-api",
          Jd = `show${Ii}`,
          tf = `shown${Ii}`,
          ef = `hide${Ii}`,
          nf = `hidden${Ii}`,
          sf = `click${Ii}${Qd}`,
          xr = "show",
          Kn = "collapse",
          ds = "collapsing",
          rf = "collapsed",
          of = `:scope .${Kn} .${Kn}`,
          af = "collapse-horizontal",
          lf = "width",
          cf = "height",
          uf = ".collapse.show, .collapse.collapsing",
          Or = '[data-bs-toggle="collapse"]',
          hf = { parent: null, toggle: !0 },
          df = { parent: "(null|element)", toggle: "boolean" };
      class Gn extends k {
          constructor(l, d) {
              super(l, d), (this._isTransitioning = !1), (this._triggerArray = []);
              const E = C.find(Or);
              for (const O of E) {
                  const V = C.getSelectorFromElement(O),
                      $ = C.find(V).filter((it) => it === this._element);
                  V !== null && $.length && this._triggerArray.push(O);
              }
              this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
          }
          static get Default() {
              return hf;
          }
          static get DefaultType() {
              return df;
          }
          static get NAME() {
              return qd;
          }
          toggle() {
              this._isShown() ? this.hide() : this.show();
          }
          show() {
              if (this._isTransitioning || this._isShown()) return;
              let l = [];
              if (
                  (this._config.parent &&
                      (l = this._getFirstLevelChildren(uf)
                          .filter((it) => it !== this._element)
                          .map((it) => Gn.getOrCreateInstance(it, { toggle: !1 }))),
                  (l.length && l[0]._isTransitioning) || P.trigger(this._element, Jd).defaultPrevented)
              )
                  return;
              for (const it of l) it.hide();
              const E = this._getDimension();
              this._element.classList.remove(Kn), this._element.classList.add(ds), (this._element.style[E] = 0), this._addAriaAndCollapsedClass(this._triggerArray, !0), (this._isTransitioning = !0);
              const O = () => {
                      (this._isTransitioning = !1), this._element.classList.remove(ds), this._element.classList.add(Kn, xr), (this._element.style[E] = ""), P.trigger(this._element, tf);
                  },
                  $ = `scroll${E[0].toUpperCase() + E.slice(1)}`;
              this._queueCallback(O, this._element, !0), (this._element.style[E] = `${this._element[$]}px`);
          }
          hide() {
              if (this._isTransitioning || !this._isShown() || P.trigger(this._element, ef).defaultPrevented) return;
              const d = this._getDimension();
              (this._element.style[d] = `${this._element.getBoundingClientRect()[d]}px`), w(this._element), this._element.classList.add(ds), this._element.classList.remove(Kn, xr);
              for (const O of this._triggerArray) {
                  const V = C.getElementFromSelector(O);
                  V && !this._isShown(V) && this._addAriaAndCollapsedClass([O], !1);
              }
              this._isTransitioning = !0;
              const E = () => {
                  (this._isTransitioning = !1), this._element.classList.remove(ds), this._element.classList.add(Kn), P.trigger(this._element, nf);
              };
              (this._element.style[d] = ""), this._queueCallback(E, this._element, !0);
          }
          _isShown(l = this._element) {
              return l.classList.contains(xr);
          }
          _configAfterMerge(l) {
              return (l.toggle = !!l.toggle), (l.parent = b(l.parent)), l;
          }
          _getDimension() {
              return this._element.classList.contains(af) ? lf : cf;
          }
          _initializeChildren() {
              if (!this._config.parent) return;
              const l = this._getFirstLevelChildren(Or);
              for (const d of l) {
                  const E = C.getElementFromSelector(d);
                  E && this._addAriaAndCollapsedClass([d], this._isShown(E));
              }
          }
          _getFirstLevelChildren(l) {
              const d = C.find(of, this._config.parent);
              return C.find(l, this._config.parent).filter((E) => !d.includes(E));
          }
          _addAriaAndCollapsedClass(l, d) {
              if (l.length) for (const E of l) E.classList.toggle(rf, !d), E.setAttribute("aria-expanded", d);
          }
          static jQueryInterface(l) {
              const d = {};
              return (
                  typeof l == "string" && /show|hide/.test(l) && (d.toggle = !1),
                  this.each(function () {
                      const E = Gn.getOrCreateInstance(this, d);
                      if (typeof l == "string") {
                          if (typeof E[l] > "u") throw new TypeError(`No method named "${l}"`);
                          E[l]();
                      }
                  })
              );
          }
      }
      P.on(document, sf, Or, function (p) {
          (p.target.tagName === "A" || (p.delegateTarget && p.delegateTarget.tagName === "A")) && p.preventDefault();
          for (const l of C.getMultipleElementsFromSelector(this)) Gn.getOrCreateInstance(l, { toggle: !1 }).toggle();
      }),
          Y(Gn);
      const Xa = "dropdown",
          hn = ".bs.dropdown",
          Sr = ".data-api",
          ff = "Escape",
          Za = "Tab",
          gf = "ArrowUp",
          Ba = "ArrowDown",
          _f = 2,
          pf = `hide${hn}`,
          mf = `hidden${hn}`,
          Ef = `show${hn}`,
          yf = `shown${hn}`,
          qa = `click${hn}${Sr}`,
          Qa = `keydown${hn}${Sr}`,
          vf = `keyup${hn}${Sr}`,
          Un = "show",
          Tf = "dropup",
          bf = "dropend",
          Cf = "dropstart",
          wf = "dropup-center",
          Af = "dropdown-center",
          dn = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
          Rf = `${dn}.${Un}`,
          fs = ".dropdown-menu",
          If = ".navbar",
          xf = ".navbar-nav",
          Of = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
          Sf = X() ? "top-end" : "top-start",
          Lf = X() ? "top-start" : "top-end",
          Pf = X() ? "bottom-end" : "bottom-start",
          Mf = X() ? "bottom-start" : "bottom-end",
          Nf = X() ? "left-start" : "right-start",
          Df = X() ? "right-start" : "left-start",
          Ff = "top",
          kf = "bottom",
          $f = { autoClose: !0, boundary: "clippingParents", display: "dynamic", offset: [0, 2], popperConfig: null, reference: "toggle" },
          Vf = { autoClose: "(boolean|string)", boundary: "(string|element)", display: "string", offset: "(array|string|function)", popperConfig: "(null|object|function)", reference: "(string|element|object)" };
      class me extends k {
          constructor(l, d) {
              super(l, d),
                  (this._popper = null),
                  (this._parent = this._element.parentNode),
                  (this._menu = C.next(this._element, fs)[0] || C.prev(this._element, fs)[0] || C.findOne(fs, this._parent)),
                  (this._inNavbar = this._detectNavbar());
          }
          static get Default() {
              return $f;
          }
          static get DefaultType() {
              return Vf;
          }
          static get NAME() {
              return Xa;
          }
          toggle() {
              return this._isShown() ? this.hide() : this.show();
          }
          show() {
              if (R(this._element) || this._isShown()) return;
              const l = { relatedTarget: this._element };
              if (!P.trigger(this._element, Ef, l).defaultPrevented) {
                  if ((this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(xf))) for (const E of [].concat(...document.body.children)) P.on(E, "mouseover", I);
                  this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Un), this._element.classList.add(Un), P.trigger(this._element, yf, l);
              }
          }
          hide() {
              if (R(this._element) || !this._isShown()) return;
              const l = { relatedTarget: this._element };
              this._completeHide(l);
          }
          dispose() {
              this._popper && this._popper.destroy(), super.dispose();
          }
          update() {
              (this._inNavbar = this._detectNavbar()), this._popper && this._popper.update();
          }
          _completeHide(l) {
              if (!P.trigger(this._element, pf, l).defaultPrevented) {
                  if ("ontouchstart" in document.documentElement) for (const E of [].concat(...document.body.children)) P.off(E, "mouseover", I);
                  this._popper && this._popper.destroy(),
                      this._menu.classList.remove(Un),
                      this._element.classList.remove(Un),
                      this._element.setAttribute("aria-expanded", "false"),
                      L.removeDataAttribute(this._menu, "popper"),
                      P.trigger(this._element, mf, l);
              }
          }
          _getConfig(l) {
              if (((l = super._getConfig(l)), typeof l.reference == "object" && !v(l.reference) && typeof l.reference.getBoundingClientRect != "function"))
                  throw new TypeError(`${Xa.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
              return l;
          }
          _createPopper() {
              if (typeof s > "u") throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
              let l = this._element;
              this._config.reference === "parent" ? (l = this._parent) : v(this._config.reference) ? (l = b(this._config.reference)) : typeof this._config.reference == "object" && (l = this._config.reference);
              const d = this._getPopperConfig();
              this._popper = s.createPopper(l, this._menu, d);
          }
          _isShown() {
              return this._menu.classList.contains(Un);
          }
          _getPlacement() {
              const l = this._parent;
              if (l.classList.contains(bf)) return Nf;
              if (l.classList.contains(Cf)) return Df;
              if (l.classList.contains(wf)) return Ff;
              if (l.classList.contains(Af)) return kf;
              const d = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
              return l.classList.contains(Tf) ? (d ? Lf : Sf) : d ? Mf : Pf;
          }
          _detectNavbar() {
              return this._element.closest(If) !== null;
          }
          _getOffset() {
              const { offset: l } = this._config;
              return typeof l == "string" ? l.split(",").map((d) => Number.parseInt(d, 10)) : typeof l == "function" ? (d) => l(d, this._element) : l;
          }
          _getPopperConfig() {
              const l = {
                  placement: this._getPlacement(),
                  modifiers: [
                      { name: "preventOverflow", options: { boundary: this._config.boundary } },
                      { name: "offset", options: { offset: this._getOffset() } },
                  ],
              };
              return (this._inNavbar || this._config.display === "static") && (L.setDataAttribute(this._menu, "popper", "static"), (l.modifiers = [{ name: "applyStyles", enabled: !1 }])), { ...l, ...B(this._config.popperConfig, [l]) };
          }
          _selectMenuItem({ key: l, target: d }) {
              const E = C.find(Of, this._menu).filter((O) => x(O));
              E.length && ct(E, d, l === Ba, !E.includes(d)).focus();
          }
          static jQueryInterface(l) {
              return this.each(function () {
                  const d = me.getOrCreateInstance(this, l);
                  if (typeof l == "string") {
                      if (typeof d[l] > "u") throw new TypeError(`No method named "${l}"`);
                      d[l]();
                  }
              });
          }
          static clearMenus(l) {
              if (l.button === _f || (l.type === "keyup" && l.key !== Za)) return;
              const d = C.find(Rf);
              for (const E of d) {
                  const O = me.getInstance(E);
                  if (!O || O._config.autoClose === !1) continue;
                  const V = l.composedPath(),
                      $ = V.includes(O._menu);
                  if (
                      V.includes(O._element) ||
                      (O._config.autoClose === "inside" && !$) ||
                      (O._config.autoClose === "outside" && $) ||
                      (O._menu.contains(l.target) && ((l.type === "keyup" && l.key === Za) || /input|select|option|textarea|form/i.test(l.target.tagName)))
                  )
                      continue;
                  const it = { relatedTarget: O._element };
                  l.type === "click" && (it.clickEvent = l), O._completeHide(it);
              }
          }
          static dataApiKeydownHandler(l) {
              const d = /input|textarea/i.test(l.target.tagName),
                  E = l.key === ff,
                  O = [gf, Ba].includes(l.key);
              if ((!O && !E) || (d && !E)) return;
              l.preventDefault();
              const V = this.matches(dn) ? this : C.prev(this, dn)[0] || C.next(this, dn)[0] || C.findOne(dn, l.delegateTarget.parentNode),
                  $ = me.getOrCreateInstance(V);
              if (O) {
                  l.stopPropagation(), $.show(), $._selectMenuItem(l);
                  return;
              }
              $._isShown() && (l.stopPropagation(), $.hide(), V.focus());
          }
      }
      P.on(document, Qa, dn, me.dataApiKeydownHandler),
          P.on(document, Qa, fs, me.dataApiKeydownHandler),
          P.on(document, qa, me.clearMenus),
          P.on(document, vf, me.clearMenus),
          P.on(document, qa, dn, function (p) {
              p.preventDefault(), me.getOrCreateInstance(this).toggle();
          }),
          Y(me);
      const Ja = "backdrop",
          jf = "fade",
          tl = "show",
          el = `mousedown.bs.${Ja}`,
          Kf = { className: "modal-backdrop", clickCallback: null, isAnimated: !1, isVisible: !0, rootElement: "body" },
          Gf = { className: "string", clickCallback: "(function|null)", isAnimated: "boolean", isVisible: "boolean", rootElement: "(element|string)" };
      class nl extends S {
          constructor(l) {
              super(), (this._config = this._getConfig(l)), (this._isAppended = !1), (this._element = null);
          }
          static get Default() {
              return Kf;
          }
          static get DefaultType() {
              return Gf;
          }
          static get NAME() {
              return Ja;
          }
          show(l) {
              if (!this._config.isVisible) {
                  B(l);
                  return;
              }
              this._append();
              const d = this._getElement();
              this._config.isAnimated && w(d),
                  d.classList.add(tl),
                  this._emulateAnimation(() => {
                      B(l);
                  });
          }
          hide(l) {
              if (!this._config.isVisible) {
                  B(l);
                  return;
              }
              this._getElement().classList.remove(tl),
                  this._emulateAnimation(() => {
                      this.dispose(), B(l);
                  });
          }
          dispose() {
              this._isAppended && (P.off(this._element, el), this._element.remove(), (this._isAppended = !1));
          }
          _getElement() {
              if (!this._element) {
                  const l = document.createElement("div");
                  (l.className = this._config.className), this._config.isAnimated && l.classList.add(jf), (this._element = l);
              }
              return this._element;
          }
          _configAfterMerge(l) {
              return (l.rootElement = b(l.rootElement)), l;
          }
          _append() {
              if (this._isAppended) return;
              const l = this._getElement();
              this._config.rootElement.append(l),
                  P.on(l, el, () => {
                      B(this._config.clickCallback);
                  }),
                  (this._isAppended = !0);
          }
          _emulateAnimation(l) {
              Et(l, this._getElement(), this._config.isAnimated);
          }
      }
      const Uf = "focustrap",
          gs = ".bs.focustrap",
          zf = `focusin${gs}`,
          Yf = `keydown.tab${gs}`,
          Hf = "Tab",
          Wf = "forward",
          il = "backward",
          Xf = { autofocus: !0, trapElement: null },
          Zf = { autofocus: "boolean", trapElement: "element" };
      class sl extends S {
          constructor(l) {
              super(), (this._config = this._getConfig(l)), (this._isActive = !1), (this._lastTabNavDirection = null);
          }
          static get Default() {
              return Xf;
          }
          static get DefaultType() {
              return Zf;
          }
          static get NAME() {
              return Uf;
          }
          activate() {
              this._isActive ||
                  (this._config.autofocus && this._config.trapElement.focus(), P.off(document, gs), P.on(document, zf, (l) => this._handleFocusin(l)), P.on(document, Yf, (l) => this._handleKeydown(l)), (this._isActive = !0));
          }
          deactivate() {
              this._isActive && ((this._isActive = !1), P.off(document, gs));
          }
          _handleFocusin(l) {
              const { trapElement: d } = this._config;
              if (l.target === document || l.target === d || d.contains(l.target)) return;
              const E = C.focusableChildren(d);
              E.length === 0 ? d.focus() : this._lastTabNavDirection === il ? E[E.length - 1].focus() : E[0].focus();
          }
          _handleKeydown(l) {
              l.key === Hf && (this._lastTabNavDirection = l.shiftKey ? il : Wf);
          }
      }
      const rl = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          ol = ".sticky-top",
          _s = "padding-right",
          al = "margin-right";
      class Lr {
          constructor() {
              this._element = document.body;
          }
          getWidth() {
              const l = document.documentElement.clientWidth;
              return Math.abs(window.innerWidth - l);
          }
          hide() {
              const l = this.getWidth();
              this._disableOverFlow(), this._setElementAttributes(this._element, _s, (d) => d + l), this._setElementAttributes(rl, _s, (d) => d + l), this._setElementAttributes(ol, al, (d) => d - l);
          }
          reset() {
              this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, _s), this._resetElementAttributes(rl, _s), this._resetElementAttributes(ol, al);
          }
          isOverflowing() {
              return this.getWidth() > 0;
          }
          _disableOverFlow() {
              this._saveInitialAttribute(this._element, "overflow"), (this._element.style.overflow = "hidden");
          }
          _setElementAttributes(l, d, E) {
              const O = this.getWidth(),
                  V = ($) => {
                      if ($ !== this._element && window.innerWidth > $.clientWidth + O) return;
                      this._saveInitialAttribute($, d);
                      const it = window.getComputedStyle($).getPropertyValue(d);
                      $.style.setProperty(d, `${E(Number.parseFloat(it))}px`);
                  };
              this._applyManipulationCallback(l, V);
          }
          _saveInitialAttribute(l, d) {
              const E = l.style.getPropertyValue(d);
              E && L.setDataAttribute(l, d, E);
          }
          _resetElementAttributes(l, d) {
              const E = (O) => {
                  const V = L.getDataAttribute(O, d);
                  if (V === null) {
                      O.style.removeProperty(d);
                      return;
                  }
                  L.removeDataAttribute(O, d), O.style.setProperty(d, V);
              };
              this._applyManipulationCallback(l, E);
          }
          _applyManipulationCallback(l, d) {
              if (v(l)) {
                  d(l);
                  return;
              }
              for (const E of C.find(l, this._element)) d(E);
          }
      }
      const Bf = "modal",
          le = ".bs.modal",
          qf = ".data-api",
          Qf = "Escape",
          Jf = `hide${le}`,
          tg = `hidePrevented${le}`,
          ll = `hidden${le}`,
          cl = `show${le}`,
          eg = `shown${le}`,
          ng = `resize${le}`,
          ig = `click.dismiss${le}`,
          sg = `mousedown.dismiss${le}`,
          rg = `keydown.dismiss${le}`,
          og = `click${le}${qf}`,
          ul = "modal-open",
          ag = "fade",
          hl = "show",
          Pr = "modal-static",
          lg = ".modal.show",
          cg = ".modal-dialog",
          ug = ".modal-body",
          hg = '[data-bs-toggle="modal"]',
          dg = { backdrop: !0, focus: !0, keyboard: !0 },
          fg = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
      class fn extends k {
          constructor(l, d) {
              super(l, d),
                  (this._dialog = C.findOne(cg, this._element)),
                  (this._backdrop = this._initializeBackDrop()),
                  (this._focustrap = this._initializeFocusTrap()),
                  (this._isShown = !1),
                  (this._isTransitioning = !1),
                  (this._scrollBar = new Lr()),
                  this._addEventListeners();
          }
          static get Default() {
              return dg;
          }
          static get DefaultType() {
              return fg;
          }
          static get NAME() {
              return Bf;
          }
          toggle(l) {
              return this._isShown ? this.hide() : this.show(l);
          }
          show(l) {
              this._isShown ||
                  this._isTransitioning ||
                  P.trigger(this._element, cl, { relatedTarget: l }).defaultPrevented ||
                  ((this._isShown = !0), (this._isTransitioning = !0), this._scrollBar.hide(), document.body.classList.add(ul), this._adjustDialog(), this._backdrop.show(() => this._showElement(l)));
          }
          hide() {
              !this._isShown ||
                  this._isTransitioning ||
                  P.trigger(this._element, Jf).defaultPrevented ||
                  ((this._isShown = !1), (this._isTransitioning = !0), this._focustrap.deactivate(), this._element.classList.remove(hl), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
          }
          dispose() {
              P.off(window, le), P.off(this._dialog, le), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
          }
          handleUpdate() {
              this._adjustDialog();
          }
          _initializeBackDrop() {
              return new nl({ isVisible: !!this._config.backdrop, isAnimated: this._isAnimated() });
          }
          _initializeFocusTrap() {
              return new sl({ trapElement: this._element });
          }
          _showElement(l) {
              document.body.contains(this._element) || document.body.append(this._element),
                  (this._element.style.display = "block"),
                  this._element.removeAttribute("aria-hidden"),
                  this._element.setAttribute("aria-modal", !0),
                  this._element.setAttribute("role", "dialog"),
                  (this._element.scrollTop = 0);
              const d = C.findOne(ug, this._dialog);
              d && (d.scrollTop = 0), w(this._element), this._element.classList.add(hl);
              const E = () => {
                  this._config.focus && this._focustrap.activate(), (this._isTransitioning = !1), P.trigger(this._element, eg, { relatedTarget: l });
              };
              this._queueCallback(E, this._dialog, this._isAnimated());
          }
          _addEventListeners() {
              P.on(this._element, rg, (l) => {
                  if (l.key === Qf) {
                      if (this._config.keyboard) {
                          this.hide();
                          return;
                      }
                      this._triggerBackdropTransition();
                  }
              }),
                  P.on(window, ng, () => {
                      this._isShown && !this._isTransitioning && this._adjustDialog();
                  }),
                  P.on(this._element, sg, (l) => {
                      P.one(this._element, ig, (d) => {
                          if (!(this._element !== l.target || this._element !== d.target)) {
                              if (this._config.backdrop === "static") {
                                  this._triggerBackdropTransition();
                                  return;
                              }
                              this._config.backdrop && this.hide();
                          }
                      });
                  });
          }
          _hideModal() {
              (this._element.style.display = "none"),
                  this._element.setAttribute("aria-hidden", !0),
                  this._element.removeAttribute("aria-modal"),
                  this._element.removeAttribute("role"),
                  (this._isTransitioning = !1),
                  this._backdrop.hide(() => {
                      document.body.classList.remove(ul), this._resetAdjustments(), this._scrollBar.reset(), P.trigger(this._element, ll);
                  });
          }
          _isAnimated() {
              return this._element.classList.contains(ag);
          }
          _triggerBackdropTransition() {
              if (P.trigger(this._element, tg).defaultPrevented) return;
              const d = this._element.scrollHeight > document.documentElement.clientHeight,
                  E = this._element.style.overflowY;
              E === "hidden" ||
                  this._element.classList.contains(Pr) ||
                  (d || (this._element.style.overflowY = "hidden"),
                  this._element.classList.add(Pr),
                  this._queueCallback(() => {
                      this._element.classList.remove(Pr),
                          this._queueCallback(() => {
                              this._element.style.overflowY = E;
                          }, this._dialog);
                  }, this._dialog),
                  this._element.focus());
          }
          _adjustDialog() {
              const l = this._element.scrollHeight > document.documentElement.clientHeight,
                  d = this._scrollBar.getWidth(),
                  E = d > 0;
              if (E && !l) {
                  const O = X() ? "paddingLeft" : "paddingRight";
                  this._element.style[O] = `${d}px`;
              }
              if (!E && l) {
                  const O = X() ? "paddingRight" : "paddingLeft";
                  this._element.style[O] = `${d}px`;
              }
          }
          _resetAdjustments() {
              (this._element.style.paddingLeft = ""), (this._element.style.paddingRight = "");
          }
          static jQueryInterface(l, d) {
              return this.each(function () {
                  const E = fn.getOrCreateInstance(this, l);
                  if (typeof l == "string") {
                      if (typeof E[l] > "u") throw new TypeError(`No method named "${l}"`);
                      E[l](d);
                  }
              });
          }
      }
      P.on(document, og, hg, function (p) {
          const l = C.getElementFromSelector(this);
          ["A", "AREA"].includes(this.tagName) && p.preventDefault(),
              P.one(l, cl, (O) => {
                  O.defaultPrevented ||
                      P.one(l, ll, () => {
                          x(this) && this.focus();
                      });
              });
          const d = C.findOne(lg);
          d && fn.getInstance(d).hide(), fn.getOrCreateInstance(l).toggle(this);
      }),
          N(fn),
          Y(fn);
      const gg = "offcanvas",
          Fe = ".bs.offcanvas",
          dl = ".data-api",
          _g = `load${Fe}${dl}`,
          pg = "Escape",
          fl = "show",
          gl = "showing",
          _l = "hiding",
          mg = "offcanvas-backdrop",
          pl = ".offcanvas.show",
          Eg = `show${Fe}`,
          yg = `shown${Fe}`,
          vg = `hide${Fe}`,
          ml = `hidePrevented${Fe}`,
          El = `hidden${Fe}`,
          Tg = `resize${Fe}`,
          bg = `click${Fe}${dl}`,
          Cg = `keydown.dismiss${Fe}`,
          wg = '[data-bs-toggle="offcanvas"]',
          Ag = { backdrop: !0, keyboard: !0, scroll: !1 },
          Rg = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
      class ke extends k {
          constructor(l, d) {
              super(l, d), (this._isShown = !1), (this._backdrop = this._initializeBackDrop()), (this._focustrap = this._initializeFocusTrap()), this._addEventListeners();
          }
          static get Default() {
              return Ag;
          }
          static get DefaultType() {
              return Rg;
          }
          static get NAME() {
              return gg;
          }
          toggle(l) {
              return this._isShown ? this.hide() : this.show(l);
          }
          show(l) {
              if (this._isShown || P.trigger(this._element, Eg, { relatedTarget: l }).defaultPrevented) return;
              (this._isShown = !0), this._backdrop.show(), this._config.scroll || new Lr().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(gl);
              const E = () => {
                  (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(fl), this._element.classList.remove(gl), P.trigger(this._element, yg, { relatedTarget: l });
              };
              this._queueCallback(E, this._element, !0);
          }
          hide() {
              if (!this._isShown || P.trigger(this._element, vg).defaultPrevented) return;
              this._focustrap.deactivate(), this._element.blur(), (this._isShown = !1), this._element.classList.add(_l), this._backdrop.hide();
              const d = () => {
                  this._element.classList.remove(fl, _l), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new Lr().reset(), P.trigger(this._element, El);
              };
              this._queueCallback(d, this._element, !0);
          }
          dispose() {
              this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
          }
          _initializeBackDrop() {
              const l = () => {
                      if (this._config.backdrop === "static") {
                          P.trigger(this._element, ml);
                          return;
                      }
                      this.hide();
                  },
                  d = !!this._config.backdrop;
              return new nl({ className: mg, isVisible: d, isAnimated: !0, rootElement: this._element.parentNode, clickCallback: d ? l : null });
          }
          _initializeFocusTrap() {
              return new sl({ trapElement: this._element });
          }
          _addEventListeners() {
              P.on(this._element, Cg, (l) => {
                  if (l.key === pg) {
                      if (this._config.keyboard) {
                          this.hide();
                          return;
                      }
                      P.trigger(this._element, ml);
                  }
              });
          }
          static jQueryInterface(l) {
              return this.each(function () {
                  const d = ke.getOrCreateInstance(this, l);
                  if (typeof l == "string") {
                      if (d[l] === void 0 || l.startsWith("_") || l === "constructor") throw new TypeError(`No method named "${l}"`);
                      d[l](this);
                  }
              });
          }
      }
      P.on(document, bg, wg, function (p) {
          const l = C.getElementFromSelector(this);
          if ((["A", "AREA"].includes(this.tagName) && p.preventDefault(), R(this))) return;
          P.one(l, El, () => {
              x(this) && this.focus();
          });
          const d = C.findOne(pl);
          d && d !== l && ke.getInstance(d).hide(), ke.getOrCreateInstance(l).toggle(this);
      }),
          P.on(window, _g, () => {
              for (const p of C.find(pl)) ke.getOrCreateInstance(p).show();
          }),
          P.on(window, Tg, () => {
              for (const p of C.find("[aria-modal][class*=show][class*=offcanvas-]")) getComputedStyle(p).position !== "fixed" && ke.getOrCreateInstance(p).hide();
          }),
          N(ke),
          Y(ke);
      const yl = {
              "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
              a: ["target", "href", "title", "rel"],
              area: [],
              b: [],
              br: [],
              col: [],
              code: [],
              div: [],
              em: [],
              hr: [],
              h1: [],
              h2: [],
              h3: [],
              h4: [],
              h5: [],
              h6: [],
              i: [],
              img: ["src", "srcset", "alt", "title", "width", "height"],
              li: [],
              ol: [],
              p: [],
              pre: [],
              s: [],
              small: [],
              span: [],
              sub: [],
              sup: [],
              strong: [],
              u: [],
              ul: [],
          },
          Ig = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
          xg = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
          Og = (p, l) => {
              const d = p.nodeName.toLowerCase();
              return l.includes(d) ? (Ig.has(d) ? !!xg.test(p.nodeValue) : !0) : l.filter((E) => E instanceof RegExp).some((E) => E.test(d));
          };
      function Sg(p, l, d) {
          if (!p.length) return p;
          if (d && typeof d == "function") return d(p);
          const O = new window.DOMParser().parseFromString(p, "text/html"),
              V = [].concat(...O.body.querySelectorAll("*"));
          for (const $ of V) {
              const it = $.nodeName.toLowerCase();
              if (!Object.keys(l).includes(it)) {
                  $.remove();
                  continue;
              }
              const Qt = [].concat(...$.attributes),
                  ce = [].concat(l["*"] || [], l[it] || []);
              for (const $t of Qt) Og($t, ce) || $.removeAttribute($t.nodeName);
          }
          return O.body.innerHTML;
      }
      const Lg = "TemplateFactory",
          Pg = { allowList: yl, content: {}, extraClass: "", html: !1, sanitize: !0, sanitizeFn: null, template: "<div></div>" },
          Mg = { allowList: "object", content: "object", extraClass: "(string|function)", html: "boolean", sanitize: "boolean", sanitizeFn: "(null|function)", template: "string" },
          Ng = { entry: "(string|element|function|null)", selector: "(string|element)" };
      class Dg extends S {
          constructor(l) {
              super(), (this._config = this._getConfig(l));
          }
          static get Default() {
              return Pg;
          }
          static get DefaultType() {
              return Mg;
          }
          static get NAME() {
              return Lg;
          }
          getContent() {
              return Object.values(this._config.content)
                  .map((l) => this._resolvePossibleFunction(l))
                  .filter(Boolean);
          }
          hasContent() {
              return this.getContent().length > 0;
          }
          changeContent(l) {
              return this._checkContent(l), (this._config.content = { ...this._config.content, ...l }), this;
          }
          toHtml() {
              const l = document.createElement("div");
              l.innerHTML = this._maybeSanitize(this._config.template);
              for (const [O, V] of Object.entries(this._config.content)) this._setContent(l, V, O);
              const d = l.children[0],
                  E = this._resolvePossibleFunction(this._config.extraClass);
              return E && d.classList.add(...E.split(" ")), d;
          }
          _typeCheckConfig(l) {
              super._typeCheckConfig(l), this._checkContent(l.content);
          }
          _checkContent(l) {
              for (const [d, E] of Object.entries(l)) super._typeCheckConfig({ selector: d, entry: E }, Ng);
          }
          _setContent(l, d, E) {
              const O = C.findOne(E, l);
              if (O) {
                  if (((d = this._resolvePossibleFunction(d)), !d)) {
                      O.remove();
                      return;
                  }
                  if (v(d)) {
                      this._putElementInTemplate(b(d), O);
                      return;
                  }
                  if (this._config.html) {
                      O.innerHTML = this._maybeSanitize(d);
                      return;
                  }
                  O.textContent = d;
              }
          }
          _maybeSanitize(l) {
              return this._config.sanitize ? Sg(l, this._config.allowList, this._config.sanitizeFn) : l;
          }
          _resolvePossibleFunction(l) {
              return B(l, [this]);
          }
          _putElementInTemplate(l, d) {
              if (this._config.html) {
                  (d.innerHTML = ""), d.append(l);
                  return;
              }
              d.textContent = l.textContent;
          }
      }
      const Fg = "tooltip",
          kg = new Set(["sanitize", "allowList", "sanitizeFn"]),
          Mr = "fade",
          $g = "modal",
          ps = "show",
          Vg = ".tooltip-inner",
          vl = `.${$g}`,
          Tl = "hide.bs.modal",
          xi = "hover",
          Nr = "focus",
          jg = "click",
          Kg = "manual",
          Gg = "hide",
          Ug = "hidden",
          zg = "show",
          Yg = "shown",
          Hg = "inserted",
          Wg = "click",
          Xg = "focusin",
          Zg = "focusout",
          Bg = "mouseenter",
          qg = "mouseleave",
          Qg = { AUTO: "auto", TOP: "top", RIGHT: X() ? "left" : "right", BOTTOM: "bottom", LEFT: X() ? "right" : "left" },
          Jg = {
              allowList: yl,
              animation: !0,
              boundary: "clippingParents",
              container: !1,
              customClass: "",
              delay: 0,
              fallbackPlacements: ["top", "right", "bottom", "left"],
              html: !1,
              offset: [0, 6],
              placement: "top",
              popperConfig: null,
              sanitize: !0,
              sanitizeFn: null,
              selector: !1,
              template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
              title: "",
              trigger: "hover focus",
          },
          t_ = {
              allowList: "object",
              animation: "boolean",
              boundary: "(string|element)",
              container: "(string|element|boolean)",
              customClass: "(string|function)",
              delay: "(number|object)",
              fallbackPlacements: "array",
              html: "boolean",
              offset: "(array|string|function)",
              placement: "(string|function)",
              popperConfig: "(null|object|function)",
              sanitize: "boolean",
              sanitizeFn: "(null|function)",
              selector: "(string|boolean)",
              template: "string",
              title: "(string|element|function)",
              trigger: "string",
          };
      class gn extends k {
          constructor(l, d) {
              if (typeof s > "u") throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
              super(l, d),
                  (this._isEnabled = !0),
                  (this._timeout = 0),
                  (this._isHovered = null),
                  (this._activeTrigger = {}),
                  (this._popper = null),
                  (this._templateFactory = null),
                  (this._newContent = null),
                  (this.tip = null),
                  this._setListeners(),
                  this._config.selector || this._fixTitle();
          }
          static get Default() {
              return Jg;
          }
          static get DefaultType() {
              return t_;
          }
          static get NAME() {
              return Fg;
          }
          enable() {
              this._isEnabled = !0;
          }
          disable() {
              this._isEnabled = !1;
          }
          toggleEnabled() {
              this._isEnabled = !this._isEnabled;
          }
          toggle() {
              if (this._isEnabled) {
                  if (((this._activeTrigger.click = !this._activeTrigger.click), this._isShown())) {
                      this._leave();
                      return;
                  }
                  this._enter();
              }
          }
          dispose() {
              clearTimeout(this._timeout),
                  P.off(this._element.closest(vl), Tl, this._hideModalHandler),
                  this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")),
                  this._disposePopper(),
                  super.dispose();
          }
          show() {
              if (this._element.style.display === "none") throw new Error("Please use show on visible elements");
              if (!(this._isWithContent() && this._isEnabled)) return;
              const l = P.trigger(this._element, this.constructor.eventName(zg)),
                  E = (M(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
              if (l.defaultPrevented || !E) return;
              this._disposePopper();
              const O = this._getTipElement();
              this._element.setAttribute("aria-describedby", O.getAttribute("id"));
              const { container: V } = this._config;
              if (
                  (this._element.ownerDocument.documentElement.contains(this.tip) || (V.append(O), P.trigger(this._element, this.constructor.eventName(Hg))),
                  (this._popper = this._createPopper(O)),
                  O.classList.add(ps),
                  "ontouchstart" in document.documentElement)
              )
                  for (const it of [].concat(...document.body.children)) P.on(it, "mouseover", I);
              const $ = () => {
                  P.trigger(this._element, this.constructor.eventName(Yg)), this._isHovered === !1 && this._leave(), (this._isHovered = !1);
              };
              this._queueCallback($, this.tip, this._isAnimated());
          }
          hide() {
              if (!this._isShown() || P.trigger(this._element, this.constructor.eventName(Gg)).defaultPrevented) return;
              if ((this._getTipElement().classList.remove(ps), "ontouchstart" in document.documentElement)) for (const O of [].concat(...document.body.children)) P.off(O, "mouseover", I);
              (this._activeTrigger[jg] = !1), (this._activeTrigger[Nr] = !1), (this._activeTrigger[xi] = !1), (this._isHovered = null);
              const E = () => {
                  this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), P.trigger(this._element, this.constructor.eventName(Ug)));
              };
              this._queueCallback(E, this.tip, this._isAnimated());
          }
          update() {
              this._popper && this._popper.update();
          }
          _isWithContent() {
              return !!this._getTitle();
          }
          _getTipElement() {
              return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
          }
          _createTipElement(l) {
              const d = this._getTemplateFactory(l).toHtml();
              if (!d) return null;
              d.classList.remove(Mr, ps), d.classList.add(`bs-${this.constructor.NAME}-auto`);
              const E = g(this.constructor.NAME).toString();
              return d.setAttribute("id", E), this._isAnimated() && d.classList.add(Mr), d;
          }
          setContent(l) {
              (this._newContent = l), this._isShown() && (this._disposePopper(), this.show());
          }
          _getTemplateFactory(l) {
              return (
                  this._templateFactory ? this._templateFactory.changeContent(l) : (this._templateFactory = new Dg({ ...this._config, content: l, extraClass: this._resolvePossibleFunction(this._config.customClass) })),
                  this._templateFactory
              );
          }
          _getContentForTemplate() {
              return { [Vg]: this._getTitle() };
          }
          _getTitle() {
              return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
          }
          _initializeOnDelegatedTarget(l) {
              return this.constructor.getOrCreateInstance(l.delegateTarget, this._getDelegateConfig());
          }
          _isAnimated() {
              return this._config.animation || (this.tip && this.tip.classList.contains(Mr));
          }
          _isShown() {
              return this.tip && this.tip.classList.contains(ps);
          }
          _createPopper(l) {
              const d = B(this._config.placement, [this, l, this._element]),
                  E = Qg[d.toUpperCase()];
              return s.createPopper(this._element, l, this._getPopperConfig(E));
          }
          _getOffset() {
              const { offset: l } = this._config;
              return typeof l == "string" ? l.split(",").map((d) => Number.parseInt(d, 10)) : typeof l == "function" ? (d) => l(d, this._element) : l;
          }
          _resolvePossibleFunction(l) {
              return B(l, [this._element]);
          }
          _getPopperConfig(l) {
              const d = {
                  placement: l,
                  modifiers: [
                      { name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } },
                      { name: "offset", options: { offset: this._getOffset() } },
                      { name: "preventOverflow", options: { boundary: this._config.boundary } },
                      { name: "arrow", options: { element: `.${this.constructor.NAME}-arrow` } },
                      {
                          name: "preSetPlacement",
                          enabled: !0,
                          phase: "beforeMain",
                          fn: (E) => {
                              this._getTipElement().setAttribute("data-popper-placement", E.state.placement);
                          },
                      },
                  ],
              };
              return { ...d, ...B(this._config.popperConfig, [d]) };
          }
          _setListeners() {
              const l = this._config.trigger.split(" ");
              for (const d of l)
                  if (d === "click")
                      P.on(this._element, this.constructor.eventName(Wg), this._config.selector, (E) => {
                          this._initializeOnDelegatedTarget(E).toggle();
                      });
                  else if (d !== Kg) {
                      const E = d === xi ? this.constructor.eventName(Bg) : this.constructor.eventName(Xg),
                          O = d === xi ? this.constructor.eventName(qg) : this.constructor.eventName(Zg);
                      P.on(this._element, E, this._config.selector, (V) => {
                          const $ = this._initializeOnDelegatedTarget(V);
                          ($._activeTrigger[V.type === "focusin" ? Nr : xi] = !0), $._enter();
                      }),
                          P.on(this._element, O, this._config.selector, (V) => {
                              const $ = this._initializeOnDelegatedTarget(V);
                              ($._activeTrigger[V.type === "focusout" ? Nr : xi] = $._element.contains(V.relatedTarget)), $._leave();
                          });
                  }
              (this._hideModalHandler = () => {
                  this._element && this.hide();
              }),
                  P.on(this._element.closest(vl), Tl, this._hideModalHandler);
          }
          _fixTitle() {
              const l = this._element.getAttribute("title");
              l &&
                  (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", l),
                  this._element.setAttribute("data-bs-original-title", l),
                  this._element.removeAttribute("title"));
          }
          _enter() {
              if (this._isShown() || this._isHovered) {
                  this._isHovered = !0;
                  return;
              }
              (this._isHovered = !0),
                  this._setTimeout(() => {
                      this._isHovered && this.show();
                  }, this._config.delay.show);
          }
          _leave() {
              this._isWithActiveTrigger() ||
                  ((this._isHovered = !1),
                  this._setTimeout(() => {
                      this._isHovered || this.hide();
                  }, this._config.delay.hide));
          }
          _setTimeout(l, d) {
              clearTimeout(this._timeout), (this._timeout = setTimeout(l, d));
          }
          _isWithActiveTrigger() {
              return Object.values(this._activeTrigger).includes(!0);
          }
          _getConfig(l) {
              const d = L.getDataAttributes(this._element);
              for (const E of Object.keys(d)) kg.has(E) && delete d[E];
              return (l = { ...d, ...(typeof l == "object" && l ? l : {}) }), (l = this._mergeConfigObj(l)), (l = this._configAfterMerge(l)), this._typeCheckConfig(l), l;
          }
          _configAfterMerge(l) {
              return (
                  (l.container = l.container === !1 ? document.body : b(l.container)),
                  typeof l.delay == "number" && (l.delay = { show: l.delay, hide: l.delay }),
                  typeof l.title == "number" && (l.title = l.title.toString()),
                  typeof l.content == "number" && (l.content = l.content.toString()),
                  l
              );
          }
          _getDelegateConfig() {
              const l = {};
              for (const [d, E] of Object.entries(this._config)) this.constructor.Default[d] !== E && (l[d] = E);
              return (l.selector = !1), (l.trigger = "manual"), l;
          }
          _disposePopper() {
              this._popper && (this._popper.destroy(), (this._popper = null)), this.tip && (this.tip.remove(), (this.tip = null));
          }
          static jQueryInterface(l) {
              return this.each(function () {
                  const d = gn.getOrCreateInstance(this, l);
                  if (typeof l == "string") {
                      if (typeof d[l] > "u") throw new TypeError(`No method named "${l}"`);
                      d[l]();
                  }
              });
          }
      }
      Y(gn);
      const e_ = "popover",
          n_ = ".popover-header",
          i_ = ".popover-body",
          s_ = {
              ...gn.Default,
              content: "",
              offset: [0, 8],
              placement: "right",
              template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
              trigger: "click",
          },
          r_ = { ...gn.DefaultType, content: "(null|string|element|function)" };
      class ms extends gn {
          static get Default() {
              return s_;
          }
          static get DefaultType() {
              return r_;
          }
          static get NAME() {
              return e_;
          }
          _isWithContent() {
              return this._getTitle() || this._getContent();
          }
          _getContentForTemplate() {
              return { [n_]: this._getTitle(), [i_]: this._getContent() };
          }
          _getContent() {
              return this._resolvePossibleFunction(this._config.content);
          }
          static jQueryInterface(l) {
              return this.each(function () {
                  const d = ms.getOrCreateInstance(this, l);
                  if (typeof l == "string") {
                      if (typeof d[l] > "u") throw new TypeError(`No method named "${l}"`);
                      d[l]();
                  }
              });
          }
      }
      Y(ms);
      const o_ = "scrollspy",
          Dr = ".bs.scrollspy",
          a_ = ".data-api",
          l_ = `activate${Dr}`,
          bl = `click${Dr}`,
          c_ = `load${Dr}${a_}`,
          u_ = "dropdown-item",
          zn = "active",
          h_ = '[data-bs-spy="scroll"]',
          Fr = "[href]",
          d_ = ".nav, .list-group",
          Cl = ".nav-link",
          f_ = `${Cl}, .nav-item > ${Cl}, .list-group-item`,
          g_ = ".dropdown",
          __ = ".dropdown-toggle",
          p_ = { offset: null, rootMargin: "0px 0px -25%", smoothScroll: !1, target: null, threshold: [0.1, 0.5, 1] },
          m_ = { offset: "(number|null)", rootMargin: "string", smoothScroll: "boolean", target: "element", threshold: "array" };
      class Oi extends k {
          constructor(l, d) {
              super(l, d),
                  (this._targetLinks = new Map()),
                  (this._observableSections = new Map()),
                  (this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element),
                  (this._activeTarget = null),
                  (this._observer = null),
                  (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }),
                  this.refresh();
          }
          static get Default() {
              return p_;
          }
          static get DefaultType() {
              return m_;
          }
          static get NAME() {
              return o_;
          }
          refresh() {
              this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : (this._observer = this._getNewObserver());
              for (const l of this._observableSections.values()) this._observer.observe(l);
          }
          dispose() {
              this._observer.disconnect(), super.dispose();
          }
          _configAfterMerge(l) {
              return (
                  (l.target = b(l.target) || document.body), (l.rootMargin = l.offset ? `${l.offset}px 0px -30%` : l.rootMargin), typeof l.threshold == "string" && (l.threshold = l.threshold.split(",").map((d) => Number.parseFloat(d))), l
              );
          }
          _maybeEnableSmoothScroll() {
              this._config.smoothScroll &&
                  (P.off(this._config.target, bl),
                  P.on(this._config.target, bl, Fr, (l) => {
                      const d = this._observableSections.get(l.target.hash);
                      if (d) {
                          l.preventDefault();
                          const E = this._rootElement || window,
                              O = d.offsetTop - this._element.offsetTop;
                          if (E.scrollTo) {
                              E.scrollTo({ top: O, behavior: "smooth" });
                              return;
                          }
                          E.scrollTop = O;
                      }
                  }));
          }
          _getNewObserver() {
              const l = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin };
              return new IntersectionObserver((d) => this._observerCallback(d), l);
          }
          _observerCallback(l) {
              const d = ($) => this._targetLinks.get(`#${$.target.id}`),
                  E = ($) => {
                      (this._previousScrollData.visibleEntryTop = $.target.offsetTop), this._process(d($));
                  },
                  O = (this._rootElement || document.documentElement).scrollTop,
                  V = O >= this._previousScrollData.parentScrollTop;
              this._previousScrollData.parentScrollTop = O;
              for (const $ of l) {
                  if (!$.isIntersecting) {
                      (this._activeTarget = null), this._clearActiveClass(d($));
                      continue;
                  }
                  const it = $.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                  if (V && it) {
                      if ((E($), !O)) return;
                      continue;
                  }
                  !V && !it && E($);
              }
          }
          _initializeTargetsAndObservables() {
              (this._targetLinks = new Map()), (this._observableSections = new Map());
              const l = C.find(Fr, this._config.target);
              for (const d of l) {
                  if (!d.hash || R(d)) continue;
                  const E = C.findOne(decodeURI(d.hash), this._element);
                  x(E) && (this._targetLinks.set(decodeURI(d.hash), d), this._observableSections.set(d.hash, E));
              }
          }
          _process(l) {
              this._activeTarget !== l && (this._clearActiveClass(this._config.target), (this._activeTarget = l), l.classList.add(zn), this._activateParents(l), P.trigger(this._element, l_, { relatedTarget: l }));
          }
          _activateParents(l) {
              if (l.classList.contains(u_)) {
                  C.findOne(__, l.closest(g_)).classList.add(zn);
                  return;
              }
              for (const d of C.parents(l, d_)) for (const E of C.prev(d, f_)) E.classList.add(zn);
          }
          _clearActiveClass(l) {
              l.classList.remove(zn);
              const d = C.find(`${Fr}.${zn}`, l);
              for (const E of d) E.classList.remove(zn);
          }
          static jQueryInterface(l) {
              return this.each(function () {
                  const d = Oi.getOrCreateInstance(this, l);
                  if (typeof l == "string") {
                      if (d[l] === void 0 || l.startsWith("_") || l === "constructor") throw new TypeError(`No method named "${l}"`);
                      d[l]();
                  }
              });
          }
      }
      P.on(window, c_, () => {
          for (const p of C.find(h_)) Oi.getOrCreateInstance(p);
      }),
          Y(Oi);
      const E_ = "tab",
          _n = ".bs.tab",
          y_ = `hide${_n}`,
          v_ = `hidden${_n}`,
          T_ = `show${_n}`,
          b_ = `shown${_n}`,
          C_ = `click${_n}`,
          w_ = `keydown${_n}`,
          A_ = `load${_n}`,
          R_ = "ArrowLeft",
          wl = "ArrowRight",
          I_ = "ArrowUp",
          Al = "ArrowDown",
          kr = "Home",
          Rl = "End",
          pn = "active",
          Il = "fade",
          $r = "show",
          x_ = "dropdown",
          xl = ".dropdown-toggle",
          O_ = ".dropdown-menu",
          Vr = `:not(${xl})`,
          S_ = '.list-group, .nav, [role="tablist"]',
          L_ = ".nav-item, .list-group-item",
          P_ = `.nav-link${Vr}, .list-group-item${Vr}, [role="tab"]${Vr}`,
          Ol = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
          jr = `${P_}, ${Ol}`,
          M_ = `.${pn}[data-bs-toggle="tab"], .${pn}[data-bs-toggle="pill"], .${pn}[data-bs-toggle="list"]`;
      class mn extends k {
          constructor(l) {
              super(l), (this._parent = this._element.closest(S_)), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), P.on(this._element, w_, (d) => this._keydown(d)));
          }
          static get NAME() {
              return E_;
          }
          show() {
              const l = this._element;
              if (this._elemIsActive(l)) return;
              const d = this._getActiveElem(),
                  E = d ? P.trigger(d, y_, { relatedTarget: l }) : null;
              P.trigger(l, T_, { relatedTarget: d }).defaultPrevented || (E && E.defaultPrevented) || (this._deactivate(d, l), this._activate(l, d));
          }
          _activate(l, d) {
              if (!l) return;
              l.classList.add(pn), this._activate(C.getElementFromSelector(l));
              const E = () => {
                  if (l.getAttribute("role") !== "tab") {
                      l.classList.add($r);
                      return;
                  }
                  l.removeAttribute("tabindex"), l.setAttribute("aria-selected", !0), this._toggleDropDown(l, !0), P.trigger(l, b_, { relatedTarget: d });
              };
              this._queueCallback(E, l, l.classList.contains(Il));
          }
          _deactivate(l, d) {
              if (!l) return;
              l.classList.remove(pn), l.blur(), this._deactivate(C.getElementFromSelector(l));
              const E = () => {
                  if (l.getAttribute("role") !== "tab") {
                      l.classList.remove($r);
                      return;
                  }
                  l.setAttribute("aria-selected", !1), l.setAttribute("tabindex", "-1"), this._toggleDropDown(l, !1), P.trigger(l, v_, { relatedTarget: d });
              };
              this._queueCallback(E, l, l.classList.contains(Il));
          }
          _keydown(l) {
              if (![R_, wl, I_, Al, kr, Rl].includes(l.key)) return;
              l.stopPropagation(), l.preventDefault();
              const d = this._getChildren().filter((O) => !R(O));
              let E;
              if ([kr, Rl].includes(l.key)) E = d[l.key === kr ? 0 : d.length - 1];
              else {
                  const O = [wl, Al].includes(l.key);
                  E = ct(d, l.target, O, !0);
              }
              E && (E.focus({ preventScroll: !0 }), mn.getOrCreateInstance(E).show());
          }
          _getChildren() {
              return C.find(jr, this._parent);
          }
          _getActiveElem() {
              return this._getChildren().find((l) => this._elemIsActive(l)) || null;
          }
          _setInitialAttributes(l, d) {
              this._setAttributeIfNotExists(l, "role", "tablist");
              for (const E of d) this._setInitialAttributesOnChild(E);
          }
          _setInitialAttributesOnChild(l) {
              l = this._getInnerElement(l);
              const d = this._elemIsActive(l),
                  E = this._getOuterElement(l);
              l.setAttribute("aria-selected", d),
                  E !== l && this._setAttributeIfNotExists(E, "role", "presentation"),
                  d || l.setAttribute("tabindex", "-1"),
                  this._setAttributeIfNotExists(l, "role", "tab"),
                  this._setInitialAttributesOnTargetPanel(l);
          }
          _setInitialAttributesOnTargetPanel(l) {
              const d = C.getElementFromSelector(l);
              d && (this._setAttributeIfNotExists(d, "role", "tabpanel"), l.id && this._setAttributeIfNotExists(d, "aria-labelledby", `${l.id}`));
          }
          _toggleDropDown(l, d) {
              const E = this._getOuterElement(l);
              if (!E.classList.contains(x_)) return;
              const O = (V, $) => {
                  const it = C.findOne(V, E);
                  it && it.classList.toggle($, d);
              };
              O(xl, pn), O(O_, $r), E.setAttribute("aria-expanded", d);
          }
          _setAttributeIfNotExists(l, d, E) {
              l.hasAttribute(d) || l.setAttribute(d, E);
          }
          _elemIsActive(l) {
              return l.classList.contains(pn);
          }
          _getInnerElement(l) {
              return l.matches(jr) ? l : C.findOne(jr, l);
          }
          _getOuterElement(l) {
              return l.closest(L_) || l;
          }
          static jQueryInterface(l) {
              return this.each(function () {
                  const d = mn.getOrCreateInstance(this);
                  if (typeof l == "string") {
                      if (d[l] === void 0 || l.startsWith("_") || l === "constructor") throw new TypeError(`No method named "${l}"`);
                      d[l]();
                  }
              });
          }
      }
      P.on(document, C_, Ol, function (p) {
          ["A", "AREA"].includes(this.tagName) && p.preventDefault(), !R(this) && mn.getOrCreateInstance(this).show();
      }),
          P.on(window, A_, () => {
              for (const p of C.find(M_)) mn.getOrCreateInstance(p);
          }),
          Y(mn);
      const N_ = "toast",
          We = ".bs.toast",
          D_ = `mouseover${We}`,
          F_ = `mouseout${We}`,
          k_ = `focusin${We}`,
          $_ = `focusout${We}`,
          V_ = `hide${We}`,
          j_ = `hidden${We}`,
          K_ = `show${We}`,
          G_ = `shown${We}`,
          U_ = "fade",
          Sl = "hide",
          Es = "show",
          ys = "showing",
          z_ = { animation: "boolean", autohide: "boolean", delay: "number" },
          Y_ = { animation: !0, autohide: !0, delay: 5e3 };
      class Si extends k {
          constructor(l, d) {
              super(l, d), (this._timeout = null), (this._hasMouseInteraction = !1), (this._hasKeyboardInteraction = !1), this._setListeners();
          }
          static get Default() {
              return Y_;
          }
          static get DefaultType() {
              return z_;
          }
          static get NAME() {
              return N_;
          }
          show() {
              if (P.trigger(this._element, K_).defaultPrevented) return;
              this._clearTimeout(), this._config.animation && this._element.classList.add(U_);
              const d = () => {
                  this._element.classList.remove(ys), P.trigger(this._element, G_), this._maybeScheduleHide();
              };
              this._element.classList.remove(Sl), w(this._element), this._element.classList.add(Es, ys), this._queueCallback(d, this._element, this._config.animation);
          }
          hide() {
              if (!this.isShown() || P.trigger(this._element, V_).defaultPrevented) return;
              const d = () => {
                  this._element.classList.add(Sl), this._element.classList.remove(ys, Es), P.trigger(this._element, j_);
              };
              this._element.classList.add(ys), this._queueCallback(d, this._element, this._config.animation);
          }
          dispose() {
              this._clearTimeout(), this.isShown() && this._element.classList.remove(Es), super.dispose();
          }
          isShown() {
              return this._element.classList.contains(Es);
          }
          _maybeScheduleHide() {
              this._config.autohide &&
                  (this._hasMouseInteraction ||
                      this._hasKeyboardInteraction ||
                      (this._timeout = setTimeout(() => {
                          this.hide();
                      }, this._config.delay)));
          }
          _onInteraction(l, d) {
              switch (l.type) {
                  case "mouseover":
                  case "mouseout": {
                      this._hasMouseInteraction = d;
                      break;
                  }
                  case "focusin":
                  case "focusout": {
                      this._hasKeyboardInteraction = d;
                      break;
                  }
              }
              if (d) {
                  this._clearTimeout();
                  return;
              }
              const E = l.relatedTarget;
              this._element === E || this._element.contains(E) || this._maybeScheduleHide();
          }
          _setListeners() {
              P.on(this._element, D_, (l) => this._onInteraction(l, !0)),
                  P.on(this._element, F_, (l) => this._onInteraction(l, !1)),
                  P.on(this._element, k_, (l) => this._onInteraction(l, !0)),
                  P.on(this._element, $_, (l) => this._onInteraction(l, !1));
          }
          _clearTimeout() {
              clearTimeout(this._timeout), (this._timeout = null);
          }
          static jQueryInterface(l) {
              return this.each(function () {
                  const d = Si.getOrCreateInstance(this, l);
                  if (typeof l == "string") {
                      if (typeof d[l] > "u") throw new TypeError(`No method named "${l}"`);
                      d[l](this);
                  }
              });
          }
      }
      return N(Si), Y(Si), { Alert: ft, Button: Ye, Carousel: jn, Collapse: Gn, Dropdown: me, Modal: fn, Offcanvas: ke, Popover: ms, ScrollSpy: Oi, Tab: mn, Toast: Si, Tooltip: gn };
  });
})(hT);
mE(uT).mount("#app");
