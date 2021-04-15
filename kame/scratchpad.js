function bigauss() {
  var u1 = Math.random();
  var u2 = Math.random();
  var r = Math.sqrt(-2 * Math.log(u1));
  var th = 2 * Math.PI * u2;
  var x = r * Math.cos(th);
  var y = r * Math.sin(th);
  return { r: r, th: th, x: x, y: y };
}

function nxcol(s, k) {
  function clip(x, min, max) { return x > max ? max : x < min ? min : x; }

  s.cl = clip(s.cl + (Math.random() - 0.5) / k, 20, 100);
  s.ca = clip(s.ca + (Math.random() - 0.5) / k, 30, 100);
  s.cb = clip(s.cb + (Math.random() - 0.5) / k, -100, 100);

  kame.penColor(d3.lab(s.cl, s.ca, s.cb));
}

var scolor = { cl: 50, ca: 100, cb: 50 };

function smoke() {
  kame.repeat(1000, () => {
    nxcol(scolor, 1);

    var bg = bigauss();
    kame.f(bg.r);
    kame.l(bg.th);
  });
}

function spiral() {
  var l = 1;
  var k = 1.003;

  function go() {
    kame.f(l);
    kame.l(3/5 + 0.01);
    l *= k;
    nxcol(scolor, 0.3);
  }

  kame.repeat(2600, go);
}

function spiral_2() {
  var l = 1;
  var k = 1.01;

  function go() {
    kame.f(l);
    kame.l(3/5 + 0.01);
    l = l * k;
    k = Math.sqrt(k) * 1.001;
    nxcol(scolor, 0.3);
  }

  kame.repeat(4000, go);
}

function spiral_3() {
  var l = 1;
  var k = 1.0004;

  function go() {
    kame.f(l);
    kame.l(3/5 + 0.001);
    l *= k;
    nxcol(scolor, 0.2);
  }

  kame.repeat(20000, go);
}

function spiral_4() {
  var l = 1;
  var t = 0, dt = 0.001;
  kame.repeat(10000, () => {
    l = t * 100 * Math.log(100+t);
    t += dt;
    kame.penColor(d3.lab(scolor.cl, scolor.ca, scolor.cb));
    kame.f(l);
    kame.l(3/11 + 0.0001);
    nxcol(scolor, 0.2);
  });
  kame.finish();
}

function t1() {
  l=1;
  kame.repeat(100, ()=>{
    kame.push();
    kame.repeat(1000, ()=>{
      kame.f(5);
      kame.l(1/8);
      nxcol(scolor, 0.1);
      l=(7*l)%89;
      kame.l(l/89);
    });
    kame.pop();
  })
}

function t2() {
  kame.repeat(100, ()=>{
    kame.push();
    kame.repeat(10, ()=>{
      nxcol(scolor, 0.1);
      kame.f(100); kame.l(7/16);
      kame.f(100); kame.l(-7/16);
    });
    kame.pop();
    kame.l(1/100);
  })
}

function t3() {
  kame.repeat(100, ()=>{
    kame.push();
    kame.repeat(20, ()=>{
      nxcol(scolor, 0.3);
      kame.f(100); kame.l(31/64);
      kame.f(100); kame.l(-31/64);
    });
    kame.repeat(70, ()=>{
      nxcol(scolor, 0.3);
      kame.f(100); kame.l(81/130);
    });
    kame.pop();
    kame.l(1/100);
  })
}

function t4() {
  kame.repeat(60, ()=>{
    kame.push();
    var l = 20;
    kame.repeat(400, ()=>{
      nxcol(scolor, 0.3);
      kame.f(l); kame.l(1/64);
      l /= 1.01;
    });
    kame.pop();
    kame.push();
    var l = 20;
    kame.repeat(400, ()=>{
      nxcol(scolor, 0.3);
      kame.f(l); kame.r(1/64);
      l /= 1.01;
    });
    kame.pop();
    kame.l(55/89);
  })
}

function t5() {
  var l0 = 13;
  var dl = 0.1;
  var kcol = 0.1;
  var np = 20;
  var ns = 30;
  var ka = 1/(6*ns);
  var sp = 1/10;

  function x(flip) {
    kame.push();
    kame.r(flip ? sp : -sp);
    var l = l0;
    kame.repeat(np, ()=>{
      kame.push();
      kame.repeat(ns, ()=>{
        nxcol(scolor, kcol);
        kame.f(l); kame.l(flip ? ka : -ka);
      });
      l -= dl;
      kame.pop();
    });
    kame.pop();
  }

  penta(()=>{ x(true); x(false); });

  radial(49, 160, 80, ()=>{
    star(34, 144, 10, 45, 0.3);
  });
}

function penta(f) { kame.repeat(5, ()=>{ f(); kame.l(1/5); }); }

function radial(a, b, n, f) { kame.repeat(n, ()=>{
  kame.push(); f(); kame.pop(); kame.l(a/b);
}); }

function star(a, b, n, s, kcol) {
  kame.repeat(n, ()=>{
    nxcol(scolor, kcol);
    kame.f(s); kame.l(a/b);
  });
}

function spir(a, b, n, s0, ds, kcol) {
  var s = s0;
  kame.repeat(n, ()=>{
    nxcol(scolor, kcol);
    kame.f(s); kame.l(a/b);
    s += ds;
  });
}

function t6() {
  kame.push(); spir(81, 130, 2600, 1, 1, 0.2); kame.pop();
  radial(1, 401, 401, ()=> {
    star(1, 80, 40, 15, 0.3);
  });
}

function elli(n, l, k, kcol) {
  var s = l;
  var d = Math.pow(k, 1/(n+1));
  kame.repeat(n, ()=>{
    nxcol(scolor, kcol);
    kame.f(s);
    kame.l(1/(4*n));
    s *= d;
  });
  kame.repeat(n, ()=>{
    nxcol(scolor, kcol);
    s /= d;
    kame.f(s);
    kame.l(1/(4*n));
  });
}

function t7() {
  radial(1, 3, 3, ()=>{
  Array(40).fill(0).map((_,i)=>{
    radial(1, 4, 4, ()=>{
      kame.repeat(2, ()=>{
        elli(30, 0.6, 50-i, 0.3);
        });
      });
    });
  });
}

function t8() {
  radial(1, 600, 600, ()=>{ star(1, 80, 40, 15, 1); });
  Array(1000).fill(0).map(()=>{ nxcol(scolor, 0.1); });
  radial(1, 1, 1, ()=>{
    Array(120).fill(0).map((_,i)=>{
      radial(1, 4, 4, ()=>{
        kame.repeat(2, ()=>{
          elli(30, 0.68, 49.5-(i*0.4), 3);
        });
      });
    });
  });
}

function t9() {
  kame.penColor(d3.rgb(255,255,255));
  kame.f(-300);
  kame.repeat(5, ()=>{ kame.f(100); kame.push(); });
  kame.repeat(5, ()=>{
    kame.pop();
    kame.repeat(100, ()=>{
      nxcol(scolor, 0.1);
      kame.f(100);
      kame.l(1/2-1/100);
      kame.f(100);
    });
  });
}

function dragon(h) {
  function d() { nxcol(scolor, 0.5); kame.f(1); }
  function wf(h) {
    if (h<0) { d(); return; }
    wf(h-1); kame.r(1/4);
    wg(h-1);
  }
  function wg(h) {
    if (h<0) { d(); return; }
    wf(h-1); kame.l(1/4);
    wg(h-1);
  }
  wf(h);
}

function t11() {
  [true, false].map(b=>{
    kame.forIndex(1000, (i)=>{
      nxcol(scolor, 0.3);
      kame.f(Math.sqrt(1+(b ? i : 1000-i)/10)); kame.l(1/100);
    });
  });
}

function t11bis() {
  kame.forIndex(10000, (i)=>{
    nxcol(scolor, 0.3);
    kame.f(Math.sqrt(1+i/10)); kame.l(1/100);
  });
}

function sq(n, s, b) {
  var d, b2 = b;
  kame.repeat(n, ()=>{
    d = b2 ? 1/4 : -1/4; b2 = !b2;
    kame.f(n*s); kame.r(d);
    kame.f(s); kame.r(d);
  });
  kame.r(b ? 1/4 : -1/4);
}

/* 10 0.5 30 3 4 */
function grid(nq, ss, lr, nr, n, dir) {
  var b = dir;
  function mkcol(c) { return d3.lab(c.l, c.a, c.b); }
  kame.repeat(n, ()=>{
    var c = { l: Math.random()*30+50, a: Math.random()*200-50, b: Math.random()*200-50 };
    kame.repeat(nr, ()=>{
      kame.repeat(lr, ()=>{
        kame.penColor(mkcol(c));
        sq(nq, ss, b);
        kame.penColor(d3.rgb(255,255,255,0));
        kame.f(nq*ss); kame.l(b ? 1/4 : -1/4);
      });
      kame.f(nq*ss);
      b = !b;
    });
  });
}
