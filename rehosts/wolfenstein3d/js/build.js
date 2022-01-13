floor = function(a) {
  return ~~a
};
ceil = Math.ceil;
abs = Math.abs;
sqrt = Math.sqrt;
sqrt2 = Math.sqrt(2);
random = Math.random;
round = Math.round;
pow = Math.pow;
min = Math.min;
max = Math.max;
sin = Math.sin;
cos = Math.cos;
atan2 = Math.atan2;

var sens = 0.01;
utils = {
  directions: {
    north: {
      x: 0,
      y: -1
    },
    south: {
      x: 0,
      y: 1
    },
    east: {
      x: 1,
      y: 0
    },
    west: {
      x: -1,
      y: 0
    }
  },
  queryStrings: function() {
    var a = {},
      b = window.location.href.split("?");
    if (1 < b.length)
      for (var b = b[1].split("&"), c = 0; c < b.length; c++) a[b[c].split("=")[0]] = b[c].split("=")[1];
    return a
  },
  eval: function(a, b) {
    for (var c = "", d = 0; d < b.length; d++) c += "string" == typeof b[d] ? "'" + b[d] + "'" : b[d].toString(), d < b.length - 1 && (c += ",");
    return a + "(" + c + ");"
  },
  clone: function(a) {
    var b = {};
    utils.overwrite(b, a);
    return b
  },
  shuffle: function(a) {
    for (var b, c, d =
        a.length; d; b = parseInt(Math.random() * d), c = a[--d], a[d] = a[b], a[b] = c);
    return a
  },
  random: function(a, b) {
    b || (b = 0);
    return floor((a - b + 1) * random()) + b
  },
  round: function(a, b) {
    b || (b = 1);
    return round(a * pow(10, b)) / pow(10, b)
  },
  bind: function(a, b) {
    return b.bind ? b.bind(a) : function() {
      return b.apply(a, arguments)
    }
  },
  extend: function(a, b) {
    for (var c in b) void 0 == a[c] ? null != b[c] && void 0 != b[c] && "object" == typeof b[c] ? (a[c] = "number" == typeof b[c].length ? [] : {}, utils.extend(a[c], b[c])) : a[c] = b[c] : "object" == typeof b[c] && utils.extend(a[c],
      b[c])
  },
  overwrite: function(a, b) {
    for (var c in b) null != b[c] && void 0 != b[c] && "object" == typeof b[c] ? (a[c] = "number" == typeof b[c].length ? [] : {}, utils.overwrite(a[c], b[c])) : a[c] = b[c]
  },
  fillString: function(a, b, c) {
    for (var d = "", e = 0; e < c; e++) d += b;
    d += a;
    return d.slice(max(0, d.length - c))
  },
  rad: Math.PI / 180,
  deg: 180 / Math.PI
};
resources = {
  textures: {
    sprites: "images/sprites/items.png",
    "sod-sprites": "images/sprites/sod-items.png",
    walls: "images/walls/walls.png"
  },
  images: {
    hudWeapon: "images/hud/weapons.png",
    hudFaces: "images/hud/faces.png",
    hudKeys: "images/hud/keys.png",
    hudChars: "images/hud/chars.png",
    knife: "images/weapons/knife.png",
    pistol: "images/weapons/pistol.png",
    machinegun: "images/weapons/machinegun.png",
    gatling: "images/weapons/gatling.png",
    soldier: "images/sprites/soldier.png",
    dog: "images/sprites/dog.png",
    ss: "images/sprites/ss.png",
    mutant: "images/sprites/mutant.png",
    officer: "images/sprites/officer.png",
    hans: "images/sprites/hans.png",
    drschabbs: "images/sprites/drschabbs.png",
    needle: "images/sprites/needle.png",
    ghost: "images/sprites/ghost.png",
    fireball: "images/sprites/fireball.png",
    hitler: "images/sprites/hitler.png",
    giftmacher: "images/sprites/giftmacher.png",
    missile: "images/sprites/missile.png",
    gretel: "images/sprites/gretel.png",
    fettgesicht: "images/sprites/fettgesicht.png",
    bj: "images/sprites/bj.png",
    pacman: "images/sprites/pacman.png",
    angelofdeath: "images/sprites/angelofdeath.png",
    deathknight: "images/sprites/deathknight.png",
    orb: "images/sprites/orb.png",
    himissile: "images/sprites/himissile.png",
    spectre: "images/sprites/spectre.png",
    transgrosse: "images/sprites/transgrosse.png",
    ubermutant: "images/sprites/ubermutant.png",
    wilhelm: "images/sprites/wilhelm.png"
  },
  textureWidth: 128,
  textureHeight: 128,
  init: function(a, b) {
    var c = document.getElementById("resources");
    c || (c = document.createElement("DIV"), c.id = "resources", document.body.appendChild(c),
      c = document.getElementById("resources"));
    resources.count = 0;
    for (var d in resources.textures) "string" == typeof resources.textures[d] && resources.count++;
    for (var e in resources.images) "string" == typeof resources.images[e] && resources.count++;
    for (d in resources.textures) "string" == typeof resources.textures[d] && (resources[d] ? (resources.count--, !resources.count && a && a()) : (c = new Image, c.id = d, c.onload = function() {
      var b = floor((this.width || this.naturalWidth) / resources.textureWidth),
        c = floor((this.height || this.naturalHeight) /
          resources.textureHeight);
      resources[this.id] = [];
      for (var d = 0; d < b; d++) {
        resources[this.id][d] = [];
        for (var e = 0; e < c; e++) resources[this.id][d][e] = new resources.Texture(this, d, e)
      }
      resources.count--;
      !resources.count && a && a()
    }, c.onerror = b, c.src = resources.textures[d]));
    for (e in resources.images) "string" == typeof resources.images[e] && (resources[e] ? (resources.count--, !resources.count && a && a()) : (c = new Image, c.id = e, c.onload = function() {
      this.id && !resources[this.id] && (resources[this.id] = this);
      resources.count--;
      !resources.count &&
        a && a()
    }, c.onerror = b, c.src = resources.images[e]))
  },
  Texture: function(a, b, c) {
    if (!a) return null;
    this.image = a;
    this.index = b;
    this.depth = c;
    this.canvas = document.createElement("CANVAS");
    this.canvas.width = resources.textureWidth;
    this.canvas.height = resources.textureHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.context = this.canvas.getContext("2d");
    this.context.drawImage(a, b * resources.textureWidth, c * resources.textureHeight, resources.textureWidth, resources.textureHeight, 0, 0, this.canvas.width,
      this.canvas.height);
    this.url = this.canvas.toDataURL()
  },
  PreTexture: function(a) {
    if (!a) return null;
    this.canvas = document.createElement("CANVAS");
    this.context = this.canvas.getContext("2d");
    this.width = a.width || a.naturalWidth;
    this.height = a.height || a.naturalHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context.drawImage(a, 0, 0);
    this.data = this.context.getImageData(0, 0, this.width, this.height).data
  }
};
resources.palette = [
  [0, 0, 0],
  [0, 0, 168],
  [0, 168, 0],
  [0, 168, 168],
  [168, 0, 0],
  [168, 0, 168],
  [168, 84, 0],
  [192, 192, 192],
  [84, 84, 84],
  [84, 84, 252],
  [84, 252, 84],
  [84, 252, 252],
  [252, 84, 84],
  [252, 84, 252],
  [252, 252, 84],
  [252, 252, 252],
  [236, 236, 236],
  [220, 220, 220],
  [208, 208, 208],
  [192, 192, 192],
  [180, 180, 180],
  [168, 168, 168],
  [152, 152, 152],
  [140, 140, 140],
  [124, 124, 124],
  [112, 112, 112],
  [100, 100, 100],
  [84, 84, 84],
  [72, 72, 72],
  [56, 56, 56],
  [44, 44, 44],
  [32, 32, 32],
  [252, 0, 0],
  [236, 0, 0],
  [224, 0, 0],
  [212, 0, 0],
  [200, 0, 0],
  [188, 0, 0],
  [176, 0, 0],
  [164, 0, 0],
  [152, 0,
    0
  ],
  [136, 0, 0],
  [124, 0, 0],
  [112, 0, 0],
  [100, 0, 0],
  [88, 0, 0],
  [76, 0, 0],
  [64, 0, 0],
  [252, 216, 216],
  [252, 184, 184],
  [252, 156, 156],
  [252, 124, 124],
  [252, 92, 92],
  [252, 64, 64],
  [252, 32, 32],
  [252, 0, 0],
  [252, 168, 92],
  [252, 152, 64],
  [252, 136, 32],
  [252, 120, 0],
  [228, 108, 0],
  [204, 96, 0],
  [180, 84, 0],
  [156, 76, 0],
  [252, 252, 216],
  [252, 252, 184],
  [252, 252, 156],
  [252, 252, 124],
  [252, 248, 92],
  [252, 244, 64],
  [252, 244, 32],
  [252, 244, 0],
  [228, 216, 0],
  [204, 196, 0],
  [180, 172, 0],
  [156, 156, 0],
  [132, 132, 0],
  [112, 108, 0],
  [88, 84, 0],
  [64, 64, 0],
  [208, 252, 92],
  [196, 252, 64],
  [180, 252,
    32
  ],
  [160, 252, 0],
  [144, 228, 0],
  [128, 204, 0],
  [116, 180, 0],
  [96, 156, 0],
  [216, 252, 216],
  [188, 252, 184],
  [156, 252, 156],
  [128, 252, 124],
  [96, 252, 92],
  [64, 252, 64],
  [32, 252, 32],
  [0, 252, 0],
  [0, 252, 0],
  [0, 236, 0],
  [0, 224, 0],
  [0, 212, 0],
  [4, 200, 0],
  [4, 188, 0],
  [4, 176, 0],
  [4, 164, 0],
  [4, 152, 0],
  [4, 136, 0],
  [4, 124, 0],
  [4, 112, 0],
  [4, 100, 0],
  [4, 88, 0],
  [4, 76, 0],
  [4, 64, 0],
  [216, 252, 252],
  [184, 252, 252],
  [156, 252, 252],
  [124, 252, 248],
  [92, 252, 252],
  [64, 252, 252],
  [32, 252, 252],
  [0, 252, 252],
  [0, 228, 228],
  [0, 204, 204],
  [0, 180, 180],
  [0, 156, 156],
  [0, 132, 132],
  [0, 112, 112],
  [0, 88, 88],
  [0, 64, 64],
  [92, 188, 252],
  [64, 176, 252],
  [32, 168, 252],
  [0, 156, 252],
  [0, 140, 228],
  [0, 124, 204],
  [0, 108, 180],
  [0, 92, 156],
  [216, 216, 252],
  [184, 188, 252],
  [156, 156, 252],
  [124, 128, 252],
  [92, 96, 252],
  [64, 64, 252],
  [32, 36, 252],
  [0, 4, 252],
  [0, 0, 252],
  [0, 0, 236],
  [0, 0, 224],
  [0, 0, 212],
  [0, 0, 200],
  [0, 0, 188],
  [0, 0, 176],
  [0, 0, 164],
  [0, 0, 152],
  [0, 0, 136],
  [0, 0, 124],
  [0, 0, 112],
  [0, 0, 100],
  [0, 0, 88],
  [0, 0, 76],
  [0, 0, 64],
  [40, 40, 40],
  [252, 224, 52],
  [252, 212, 36],
  [252, 204, 24],
  [252, 192, 8],
  [252, 180, 0],
  [180, 32, 252],
  [168, 0, 252],
  [152, 0, 228],
  [128, 0, 204],
  [116,
    0, 180
  ],
  [96, 0, 156],
  [80, 0, 132],
  [68, 0, 112],
  [52, 0, 88],
  [40, 0, 64],
  [252, 216, 252],
  [252, 184, 252],
  [252, 156, 252],
  [252, 124, 252],
  [252, 92, 252],
  [252, 64, 252],
  [252, 32, 252],
  [252, 0, 252],
  [224, 0, 228],
  [200, 0, 204],
  [180, 0, 180],
  [156, 0, 156],
  [132, 0, 132],
  [108, 0, 112],
  [88, 0, 88],
  [64, 0, 64],
  [252, 232, 220],
  [252, 224, 208],
  [252, 216, 196],
  [252, 212, 188],
  [252, 204, 176],
  [252, 196, 164],
  [252, 188, 156],
  [252, 184, 144],
  [252, 176, 128],
  [252, 164, 112],
  [252, 156, 96],
  [240, 148, 92],
  [232, 140, 88],
  [220, 136, 84],
  [208, 128, 80],
  [200, 124, 76],
  [188, 120, 72],
  [180, 112, 68],
  [168, 104, 64],
  [160, 100, 60],
  [156, 96, 56],
  [144, 92, 52],
  [136, 88, 48],
  [128, 80, 44],
  [116, 76, 40],
  [108, 72, 36],
  [92, 64, 32],
  [84, 60, 28],
  [72, 56, 24],
  [64, 48, 24],
  [56, 44, 20],
  [40, 32, 12],
  [96, 0, 100],
  [0, 100, 100],
  [0, 96, 96],
  [0, 0, 28],
  [0, 0, 44],
  [48, 36, 16],
  [72, 0, 72],
  [80, 0, 80],
  [0, 0, 52],
  [28, 28, 28],
  [76, 76, 76],
  [92, 92, 92],
  [64, 64, 64],
  [48, 48, 48],
  [52, 52, 52],
  [216, 244, 244],
  [184, 232, 232],
  [156, 220, 220],
  [116, 200, 200],
  [72, 192, 192],
  [32, 180, 180],
  [32, 176, 176],
  [0, 164, 164],
  [0, 152, 152],
  [0, 140, 140],
  [0, 132, 132],
  [0, 124, 124],
  [0, 120, 120],
  [0, 116, 116],
  [0,
    112, 112
  ],
  [0, 108, 108],
  [152, 0, 136]
];
audio = {
  music: {
    "nazi-nor": "music/nazi_nor",
    wonderin: "music/wonderin",
    endlevel: "music/endlevel",
    roster: "music/roster",
    urahero: "music/urahero",
    getthem: "music/getthem",
    searchn: "music/searchn",
    pow: "music/pow",
    suspense: "music/suspense",
    warmarch: "music/warmarch",
    corner: "music/corner",
    dungeon: "music/dungeon",
    funkyou: "music/funkyou",
    goingaft: "music/goingaft",
    headache: "music/headache",
    hitlwltz: "music/hitlwltz",
    introcw3: "music/introcw3",
    "nazi-omi": "music/nazi_omi",
    "nazi-rap": "music/nazi_rap",
    pacman: "music/pacman",
    pregnant: "music/pregnant",
    twelfth: "music/twelfth",
    ultimate: "music/ultimate",
    zerohour: "music/zerohour",
    salute: "music/salute",
    victors: "music/victors",
    vicmarch: "music/vicmarch",
    copypro: "music/copypro",
    xdeath: "music/xdeath",
    xevil: "music/xevil",
    xfunkie: "music/xfunkie",
    xgetyou: "music/xgetyou",
    xjaznazi: "music/xjaznazi",
    xputit: "music/xputit",
    xtheend: "music/xtheend",
    xtiptoe: "music/xtiptoe",
    xtower2: "music/xtower2"
  },
  sounds: {
    hitwall: "sounds/sfx/hitwall",
    donothing: "sounds/sfx/donothing",
    atkknife: "sounds/sfx/atkknife",
    atkpistol: "sounds/atkpistol",
    atkmachinegun: "sounds/atkmachinegun",
    atkgatling: "sounds/atkgatling",
    getmachine: "sounds/sfx/getmachine",
    getgatling: "sounds/sfx/getgatling",
    opendoor: "sounds/opendoor",
    closedoor: "sounds/closedoor",
    pushwall: "sounds/pushwall",
    leveldone: "sounds/leveldone",
    nazifire: "sounds/nazifire",
    ssfire: "sounds/ssfire",
    bossfire: "sounds/bossfire",
    schabbsthrow: "sounds/sfx/schabbsthrow",
    flamethrower: "sounds/sfx/flamethrower",
    missilefire: "sounds/sfx/missilefire",
    missilehit: "sounds/sfx/missilehit",
    yeah: "sounds/yeah",
    halt: "sounds/halt",
    deathscream1: "sounds/deathscream1",
    deathscream2: "sounds/deathscream2",
    deathscream3: "sounds/deathscream1",
    deathscream4: "sounds/deathscream4",
    deathscream5: "sounds/deathscream5",
    deathscream6: "sounds/deathscream6",
    deathscream7: "sounds/deathscream7",
    deathscream8: "sounds/deathscream8",
    deathscream9: "sounds/deathscream9",
    dogattack: "sounds/dogattack",
    dogbark: "sounds/dogbark",
    dogdeath: "sounds/dogdeath",
    schutzad: "sounds/schutzad",
    leben: "sounds/leben",
    spion: "sounds/spion",
    neinsovass: "sounds/neinsovass",
    ahhhg: "sounds/ahhhg",
    gutentag: "sounds/gutentag",
    mutti: "sounds/mutti",
    kein: "sounds/kein",
    mein: "sounds/mein",
    schabbsha: "sounds/schabbsha",
    meingott: "sounds/meingott",
    hitlerha: "sounds/hitlerha",
    tothund: "sounds/tothund",
    die: "sounds/die",
    mechstep: "sounds/mechstep",
    scheist: "sounds/scheist",
    eva: "sounds/eva",
    eine: "sounds/eine",
    donner: "sounds/donner",
    erlauben: "sounds/erlauben",
    rose: "sounds/rose",
    getammo: "sounds/sfx/getammo",
    getammobox: "sounds/sfx/getammobox",
    getkey: "sounds/sfx/getkey",
    slurpie: "sounds/slurpie",
    health1: "sounds/sfx/health1",
    health2: "sounds/sfx/health2",
    bonus1up: "sounds/sfx/bonus1up",
    bonus1: "sounds/sfx/bonus1",
    bonus2: "sounds/sfx/bonus2",
    bonus3: "sounds/sfx/bonus3",
    bonus4: "sounds/sfx/bonus4",
    playerdeath: "sounds/sfx/playerdeath",
    movegun1: "sounds/sfx/movegun1",
    movegun2: "sounds/sfx/movegun2",
    escpressed: "sounds/sfx/escpressed",
    shoot: "sounds/sfx/shoot",
    endbonus1: "sounds/sfx/endbonus1",
    endbonus2: "sounds/sfx/endbonus2",
    percent100: "sounds/sfx/percent100",
    knightmissile: "sounds/sfx/knightmissile",
    angelfire: "sounds/sfx/angelfire",
    ghostsight: "sounds/sfx/ghostsight",
    ghostfade: "sounds/sfx/ghostfade",
    transsight: "sounds/transsight",
    transdeath: "sounds/transdeath",
    wilhelmsight: "sounds/wilhelmsight",
    wilhelmdeath: "sounds/wilhelmdeath",
    uberdeath: "sounds/uberdeath",
    knightsight: "sounds/knightsight",
    knightdeath: "sounds/knightdeath",
    angelsight: "sounds/angelsight",
    angeldeath: "sounds/angeldeath",
    "sod-getgatling": "sounds/sod-getgatling",
    getspear: "sounds/getspear"
  },
  buffers: {},
  process: [],
  musicChannel: null,
  soundsChannel: {},
  context: window.webkitAudioContext ? new webkitAudioContext : null,
  request: function(a, b, c) {
    if (audio.context) {
      var d = new XMLHttpRequest;
      d.open("GET", b + ".mp4", !0);
      d.responseType = "arraybuffer";
      d.onload = function() {
        audio.context.decodeAudioData(d.response, function(b) {
          audio.buffers[a] = b;
          c && c()
        })
      };
      d.send()
    } else audio.buffers[a] = new Audio(b + (audio.canPlayMP4 ? ".mp4" : ".ogg")), audio.buffers[a].preload = !0, c && c()
  },
  init: function(a) {
    var b = document.createElement("AUDIO");
    b && (audio.canPlay = !!b.canPlayType, audio.canPlay &&
      (audio.canPlayMP4 = b.canPlayType("audio/mpeg"), audio.musicVolume = a.musicVolume || 0, audio.soundsVolume = a.soundsVolume || 0))
  },
  playMusic: function(a, b) {
    if (audio.canPlay && !audio.currentMusic && !audio.musicChannel) {
      audio.musicChannel = document.createElement("AUDIO");
      audio.musicChannel.id = "music";
      audio.musicChannel.volume = (b || 1) * audio.musicVolume;
      audio.musicChannel.preload = !0;
      audio.musicChannel.loop = !0;
      audio.musicChannel.looping = !0;
      var c = document.createElement("SOURCE");
      c.src = audio.music[a] + ".mp4";
      var d = document.createElement("SOURCE");
      d.src = audio.music[a] + ".ogg";
      audio.musicChannel.appendChild(c);
      audio.musicChannel.appendChild(d);
      document.body.appendChild(audio.musicChannel);
      audio.musicChannel.play();
      audio.currentMusic = a;
      var e = function() {
        audio.musicChannel && 0 == audio.musicChannel.currentTime && (audio.musicChannel.load(), audio.musicChannel.play(), setTimeout(e, 1E3))
      };
      setTimeout(e, 1E3)
    }
  },
  stopMusic: function() {
    audio.currentMusic && (audio.musicChannel.pause(), document.body.removeChild(audio.musicChannel), audio.musicChannel = null, audio.currentMusic =
      null)
  },
  setMusicVolume: function(a) {
    audio.musicVolume = a;
    localStorage.musicVolume = round(100 * audio.musicVolume).toString();
    audio.musicChannel && (audio.musicChannel.volume = (null == a || void 0 == a ? 1 : a) * audio.musicVolume)
  },
  setSoundsVolume: function(a) {
    audio.soundsVolume = a;
    localStorage.soundsVolume = round(100 * audio.soundsVolume).toString()
  },
  muteMusic: function() {
    audio.setMusicVolume(0)
  },
  muteSounds: function() {
    audio.setSoundsVolume(0)
  },
  queueSound: function(a, b, c) {
    audio.process.push({
      id: a,
      x: b,
      y: c
    })
  },
  playSound: function(a,
    b, c) {
    if (audio.canPlay && 0 != audio.soundsVolume)
      if (audio.context) {
        try {
          "suspended" == audio.context.state && audio.context.resume()
        } catch (d) {
          console.error(d)
        }
        var e = audio.soundsChannel[a],
          f = audio.buffers[a];
        if ((c ? e : 1) && f)
          if (c) e.src.noteOff(0), e.gain = audio.context.createGainNode(), e.src = audio.context.createBufferSource(), e.src.buffer = f, e.src.connect(e.gain), e.gain.connect(audio.context.destination), e.gain.gain.value = (null == b || void 0 == b ? 1 : b) * audio.soundsVolume, e.src.noteOn(0);
          else {
            var e = audio.context.createGainNode(),
              h = audio.context.createBufferSource();
            h.buffer = f;
            h.connect(e);
            e.connect(audio.context.destination);
            e.gain.value = (null == b || void 0 == b ? 1 : b) * audio.soundsVolume;
            h.noteOn(0)
          }
        else audio.request(a, audio.sounds[a], function() {
          var d = audio.buffers[a];
          if (d)
            if (c) {
              var e;
              audio.soundsChannel[a] || (audio.soundsChannel[a] = {
                gain: audio.context.createGainNode(),
                src: audio.context.createBufferSource()
              }, e = audio.soundsChannel[a]);
              e && (e.gain = audio.context.createGainNode(), e.src = audio.context.createBufferSource(), e.src.buffer =
                d, e.src.connect(e.gain), e.gain.connect(audio.context.destination), e.gain.gain.value = (null == b || void 0 == b ? 1 : b) * audio.soundsVolume, e.src.noteOn(0))
            } else {
              e = audio.context.createGainNode();
              var f = audio.context.createBufferSource();
              f.buffer = d;
              f.connect(e);
              e.connect(audio.context.destination);
              e.gain.value = (null == b || void 0 == b ? 1 : b) * audio.soundsVolume;
              f.noteOn(0)
            }
        })
      } else if (f = audio.buffers[a]) {
      f.volume = (null == b || void 0 == b ? 1 : b) * audio.soundsVolume;
      try {
        f.currentTime = 0
      } catch (g) {}
      f.play()
    } else audio.request(a, audio.sounds[a],
      function() {
        var c = audio.buffers[a];
        if (c) {
          c.volume = (null == b || void 0 == b ? 1 : b) * audio.soundsVolume;
          try {
            c.currentTime = 0
          } catch (d) {}
          c.play()
        }
      })
  }
};
animation = {
  process: [],
  Animation: function(a) {
    a || (a = {});
    this.keyframe = a.keyframe || 0;
    this.state = a.state || this.keyframe;
    this.speed = a.speed || 1;
    this.count = a.count || 1;
    this.step = a.step || 0;
    this.index = 0;
    this.single = a.single || !1;
    this.slide = a.slide || !1;
    this.callback = a.callback ? a.callback : null
  }
};
animation.Animation.prototype = {
  calculateState: function() {
    this.state = this.keyframe + this.index * this.step
  },
  play: function() {
    this.process != this.play && (this.process = this.play, 0 > animation.process.indexOf(this) && animation.process.push(this), this.timer = 0);
    this.timer++;
    this.timer >= this.speed / game.timeFactor && (this.stopping ? this.stop() : (this.timer = 0, this.index = ++this.index % this.count, this.calculateState(), this.callback && this.callback(this), 0 == this.index && this.single && (this.stopping = !0)))
  },
  back: function() {
    if (0 ==
      this.index) return !1;
    this.process != this.back && (this.process = this.back, 0 > animation.process.indexOf(this) && animation.process.push(this), this.timer = 0);
    this.timer++;
    this.timer >= this.speed / game.timeFactor && (this.stopping ? this.stop() : (this.timer = 0, this.index = --this.index % this.count, this.calculateState(), this.callback && this.callback(this), 0 == this.index && (this.stopping = !0)))
  },
  stop: function() {
    animation.process.splice(animation.process.indexOf(this), 1);
    delete this.stopping;
    delete this.process;
    delete this.timer
  },
  isPlaying: function() {
    return this.state > this.keyframe
  },
  stepForward: function() {
    this.timer || (this.timer = 0);
    this.timer++;
    this.timer >= this.speed / game.timeFactor && (this.timer = 0, this.index = ++this.index % this.count, this.calculateState(), this.callback && this.callback(this), 0 == this.index && this.single && delete this.timer)
  },
  stepBackward: function() {
    if (0 == this.index) return !1;
    this.timer || (this.timer = 0);
    this.timer++;
    this.timer >= this.speed / game.timeFactor && (this.stopping ? this.stop() : (this.timer = 0, this.index = --this.index %
      this.count, this.calculateState(), this.callback && this.callback(this), 0 == this.index && (this.stopping = !0)))
  }
};
sprites = {
  Sprite: function(a) {
    a || (a = {});
    this.eval = a.eval || JSON.stringify(a);
    this.x = a.x || 0;
    this.y = a.y || 0;
    this.hit = a.hit || !1;
    this.destroyable = a.destroyable || !1;
    this.resource = a.resource ? resources[a.resource] : resources.sprites;
    this.texture = a.texture + 1 ? this.resource[a.texture][0].canvas : null;
    this.animations = a.animations || {};
    void 0 == this.animations.current ? this.animations.current = null : this.animate(this.animations.current);
    this.listeners = {};
    if (a.listeners)
      for (var b in a.listeners) this.listeners[b] = utils.bind(this,
        a.listeners[b])
  }
};
sprites.Sprite.prototype = {
  animate: function(a) {
    this.animations[a] && (this.animations.current = a, this.animations[a].play())
  }
};
doors = {
  openSlide: resources.textureWidth,
  process: [],
  Door: function(a) {
    this.x = a.x || 0;
    this.y = a.y || 0;
    this.action = a.action || "open";
    this.delay = a.delay || 200;
    this.slide = a.slide || 0;
    this.weight = a.weight || floor(resources.textureWidth / 25);
    this.texture = a.texture ? resources.walls[a.texture] : null;
    this.key = a.key || null
  }
};
doors.Door.prototype = {
  open: function() {
    this.action = "close";
    this.process = utils.bind(this, function() {
      this.delayTimer ? (this.delayTimer++, this.delayTimer * game.timeFactor > this.delay && (delete this.delayTimer, this[this.action]())) : (this.slide = round(this.slide + this.weight * game.timeFactor), this.slide >= resources.textureWidth && (this.slide = resources.textureWidth, this.delayTimer = 1))
    });
    0 > doors.process.indexOf(this) && doors.process.push(this);
    audio.queueSound("opendoor", this.x, this.y)
  },
  close: function() {
    this.delayTimer &&
      delete this.delayTimer;
    this.action = "open";
    this.process = utils.bind(this, function() {
      this.slide = round(this.slide - this.weight * game.timeFactor);
      0 >= this.slide && (this.slide = 0, this.process = null, doors.process.splice(doors.process.indexOf(this), 1), audio.queueSound("closedoor", this.x, this.y))
    });
    0 > doors.process.indexOf(this) && doors.process.push(this)
  },
  isOpen: function() {
    return this.slide >= doors.openSlide
  },
  isClosed: function() {
    return 0 >= this.slide
  },
  getTexture: function(a) {
    "silver" == this.key ? a = 1 : "gold" == this.key &&
      (a = 0);
    return this.texture[a].canvas
  }
};
secret = {
  process: [],
  SecretWall: function(a) {
    this.eval = a.eval || JSON.stringify({
      x: a.x,
      y: a.y
    });
    this.x = a.x || 0;
    this.y = a.y || 0;
    this.startX = this.x;
    this.startY = this.y;
    this.texture = a.texture + 1 ? resources.walls[a.texture] : null;
    this.state = a.state || 0;
    this.weight = a.weight || 0.02;
    this.map = a.map
  }
};
secret.SecretWall.prototype = {
  getTexture: function(a) {
    return this.texture[a].canvas
  },
  move: function() {
    this.state += this.weight * game.timeFactor;
    if (1 <= this.state && (this.map.secretMap[this.x][this.y] = null, this.x += this.direction.x, this.y += this.direction.y, this.map.secretMap[this.x][this.y] = this, this.state = 0, 2 == abs(this.x - this.startX) || 2 == abs(this.y - this.startY))) {
      this.map.removeSecret(this);
      this.process = null;
      secret.process.splice(secret.process.indexOf(this), 1);
      return
    }
    var a = this.map.getHitValue(this.x + this.direction.x,
      this.y + this.direction.y);
    if (a || null === a) this.map.removeSecret(this), this.process = null, secret.process.splice(secret.process.indexOf(this), 1)
  },
  push: function() {
    this.map.map[this.x][this.y] = 0;
    this.map.hit[this.x][this.y] = 0;
    this.process = utils.bind(this, this.move);
    0 > secret.process.indexOf(this) && (audio.playSound("pushwall"), secret.process.push(this))
  }
};
scripts = {
  process: [],
  Script: function(a) {
    a || (a = {});
    this.x = a.x || 0;
    this.y = a.y || 0;
    this.action = a.action || null;
    this.params = a.params || null
  },
  angle: function(a, b, c) {
    return new scripts.Script({
      x: a,
      y: b,
      action: "angle",
      params: {
        angle: c
      }
    })
  },
  endgame: function(a, b) {
    return new scripts.Script({
      x: a,
      y: b,
      action: "endgame"
    })
  }
};
scripts.Script.prototype = {
  angle: function(a) {
    void 0 != a.angle && void 0 != a.getDirection && (a.angle = this.params.angle, a.getDirection())
  },
  endgame: function(a) {
    a.score && (document.getElementById("hand").style.display = "none", a.map.ai.push(new ai.BJ({
      x: this.x + 2,
      y: this.y,
      angle: 4
    })), game.bj = a.map.ai[a.map.ai.length - 1], game.bj.direction = {
      x: 0,
      y: 0
    }, game.auto = function() {
      0 > a.direction.x || abs(a.direction.y) > a.speed.rotation ? a.rotateLeft() : (a.direction = {
        x: 1,
        y: 0
      }, a.plane = {
        x: 0,
        y: -1
      });
      a.getDistance(game.bj.x, game.bj.y) >
        2 * sqrt2 && (game.bj.direction = {
          x: -1,
          y: 0
        });
      !a.map.getMapValue(floor(a.x - a.direction.x * a.min.speed.move), floor(a.y)) ? a.x -= a.direction.x * a.min.speed.move : game.bj && "dead" != game.bj.animations.current && game.bj.animate("yeah")
    })
  }
};
maps = {
  request: function(a, b) {
    if (wolf3d.maps[a]) b && b();
    else {
      var c = new XMLHttpRequest;
      c.open("GET", "maps/" + a + ".js", !0);
      c.onload = function() {
        eval(c.response || c.responseText);
        b && b()
      };
      c.send()
    }
  },
  Map: function(a, b) {
    this.map = a.map || [];
    this.floors = a.floors || [];
    this.floor = a.floor || 25;
    this.ceiling = a.ceiling || 29;
    this.hitDistance = a.hitDistance || 3;
    this.doors = [];
    for (var c = 0; c < this.map.length; c++) this.doors[c] = [];
    if (a.doors)
      for (c = 0; c < a.doors.length; c++) {
        var d = a.doors[c];
        this.doors[d.x] || (this.doors[d.x] = []);
        this.doors[d.x][d.y] =
          new doors.Door(d)
      }
    this.sprites = [];
    this.spriteHistory = {
      add: [],
      remove: []
    };
    this.ai = [];
    this.aiHistory = {
      add: []
    };
    this.treasures = 0;
    if (a.sprites)
      for (c = 0; c < a.sprites.length; c++) d = a.sprites[c], 29 <= d.texture && 32 >= d.texture && this.treasures++, d.type ? d.level <= (b || 1) && this.ai.push(new d.type(d)) : (d.resource = a.spriteResource, this.sprites.push(new sprites.Sprite(d)));
    this.secrets = [];
    this.secretsHistory = {
      remove: []
    };
    if (a.secrets)
      for (c = 0; c < a.secrets.length; c++) d = a.secrets[c], d.map = this, this.map[d.x][d.y] = d.texture + 1,
        this.secrets[c] = new secret.SecretWall(d);
    this.scripts = [];
    a.scripts && (this.scripts = a.scripts.slice(0));
    this.generateHitMap()
  }
};
maps.Map.prototype = {
  generateHitMap: function() {
    this.hit = [];
    this.spriteMap = [];
    this.secretMap = [];
    for (var a = 0; a < this.map.length; a++) {
      this.hit[a] = [];
      this.spriteMap[a] = [];
      this.secretMap[a] = [];
      for (var b = 0; b < this.map[a].length; b++)
        if (this.spriteMap[a][b] = [], 0 < this.map[a][b]) this.hit[a][b] = 1;
        else if (!this.hit[a][b]) {
        for (var c = !1, d = 0; d < this.sprites.length; d++) {
          var e = this.sprites[d];
          if (e.x == a && e.y == b) {
            this.spriteMap[a][b].push(e);
            e.hit && (c = !0);
            break
          }
        }
        this.hit[a][b] = c ? 1 : 0
      }
    }
    for (d = 0; d < this.secrets.length; d++) e =
      this.secrets[d], this.secretMap[e.x][e.y] = e
  },
  getGraph: function() {
    for (var a = [], b = 0; b < this.hit.length; b++) {
      a[b] = [];
      for (var c = 0; c < this.hit[b].length; c++) a[b][c] = this.hit[b][c]
    }
    for (b = 0; b < this.sprites.length; b++) c = this.sprites[b], c.hitpoints && (a[c.baseX][c.baseY] = 1);
    return new Graph(a)
  },
  getMapValue: function(a, b) {
    return void 0 == this.map[a] || void 0 == this.map[a][b] ? null : this.map[a][b]
  },
  getHitValue: function(a, b, c) {
    var d = !1;
    if (c && c.hit)
      for (var e = 0; e < this.ai.length; e++) {
        var f = this.ai[e];
        if (!(c && c.id == f.id) &&
          f.baseX == a && f.baseY == b && f.hitpoints) {
          d = !0;
          break
        }
      }
    return void 0 == this.hit[a] || void 0 == this.hit[a][b] ? null : this.hit[a][b] || d
  },
  isHit: function(a, b) {
    var c = this.hit[a] && this.hit[a][b] ? 0 < this.hit[a][b] : !1,
      d = this.getDoor(a, b),
      e = this.getSecret(a, b);
    return c || (d ? !d.isOpen() : !1) || (e ? !e.hidden : !1)
  },
  firstFree: function(a, b) {
    for (var c = -1; 2 > c; c++)
      for (var d = -1; 2 > d; d++) {
        for (var e = this.hit[a] && this.hit[a][b] ? 0 < this.hit[a][b] : !1, f = this.getDoor(a + c, b + d), h = !1, g = 0; g < this.ai.length; g++) {
          var j = this.ai[g];
          if (j.baseX == a + c &&
            j.baseY == b + d && j.hitpoints) {
            h = !0;
            break
          }
        }
        if (!e && !f && !h) return {
          x: a + c,
          y: b + d
        }
      }
    return null
  },
  inDoor: function(a, b) {
    for (var c = -this.hitDistance; c <= this.hitDistance; c++)
      for (var d = -this.hitDistance; d <= this.hitDistance; d++)
        if (this.getDoor(floor(a + c / 10), floor(b + d / 10))) return !1;
    return !0
  },
  isFree: function(a, b) {
    for (var c = -this.hitDistance; c <= this.hitDistance; c++)
      for (var d = -this.hitDistance; d <= this.hitDistance; d++) {
        var e = floor(a + c / 10),
          f = floor(b + d / 10);
        if (this.isHit(e, f)) return !1
      }
    c = !1;
    for (d = 0; d < this.ai.length; d++)
      if (e =
        this.ai[d], abs(e.x + 0.5 - a) <= this.hitDistance / 5 && abs(e.y + 0.5 - b) <= this.hitDistance / 5 && e.hitpoints) {
        c = !0;
        break
      } return c ? !1 : !0
  },
  getScript: function(a, b) {
    for (var c = 0; c < this.scripts.length; c++) {
      var d = this.scripts[c];
      if (d.x == a && d.y == b) return d
    }
  },
  getSecret: function(a, b, c) {
    if (!this.secretMap[a]) return !1;
    var d = this.secretMap[a][b],
      e = this.secretMap[a - 1] ? this.secretMap[a - 1][b] : null,
      f = this.secretMap[a + 1] ? this.secretMap[a + 1][b] : null,
      h = this.secretMap[a][b + 1],
      g = this.secretMap[a][b - 1];
    if (!d && !e && !f && !h && !g || void 0 !=
      c && (c == d || c == e || c == f || c == h || c == g)) return null;
    if (d && d.x == a && d.y == b) return d.hidden = !1, d;
    if (!d) {
      if (e) return e.process && 0 == e.direction.x && (c = this.getMapValue(a, b), a = this.getSecret(a, b, e), !c && !a) ? (e.hidden = !0, e) : null;
      if (f) return f.process && 0 == f.direction.x && (c = this.getMapValue(a, b), a = this.getSecret(a, b, f), !c && !a) ? (f.hidden = !0, f) : null;
      if (h) return h.process && 0 == h.direction.y && (c = this.getMapValue(a, b), a = this.getSecret(a, b, h), !c && !a) ? (h.hidden = !0, h) : null;
      if (g) return g.process && 0 == g.direction.y && (c = this.getMapValue(a,
        b), a = this.getSecret(a, b, g), !c && !a) ? (g.hidden = !0, g) : null
    }
  },
  removeSecret: function(a) {
    this.hit[a.x][a.y] = 1;
    this.map[a.x][a.y] = resources.walls.indexOf(a.texture) + 1;
    this.secretMap[a.x][a.y] = null;
    this.secrets.splice(this.secrets.indexOf(a), 1);
    this.secretsHistory.remove.push(a)
  },
  getDoor: function(a, b) {
    return this.doors[a] && this.doors[a][b] ? this.doors[a][b] : null
  },
  getTexture: function(a, b, c, d, e) {
    return 0 == c && (d ? 0 > d ? this.getDoor(a + 1, b) : this.getDoor(a - 1, b) : this.getDoor(a - 1, b) || this.getDoor(a + 1, b)) || 1 == c && (e ? 0 >
      e ? this.getDoor(a, b + 1) : this.getDoor(a, b - 1) : this.getDoor(a, b - 1) || this.getDoor(a, b + 1)) ? resources.walls[66][c].canvas : (a = this.getMapValue(a, b)) ? resources.walls[a - 1][c].canvas : resources.walls[22][c].canvas
  },
  hitSprites: function(a, b) {
    var c = [];
    if (this.spriteMap[a] && this.spriteMap[a][b])
      for (var d = this.spriteMap[a][b], e = 0; e < d.length; e++) {
        var f = d[e];
        f.listeners.hit && c.push(f)
      }
    return c
  },
  moveAI: function() {},
  addAI: function(a) {
    this.ai.push(a);
    this.aiHistory.add.push(a)
  },
  removeAI: function(a) {
    this.ai.splice(this.ai.indexOf(a),
      1);
    a = this.aiHistory.add.indexOf(a); - 1 < a && this.aiHistory.add.splice(a, 1)
  },
  addSprite: function(a) {
    this.spriteMap[a.x][a.y].push(a);
    this.sprites.push(a);
    this.spriteHistory.add.push(a)
  },
  removeSprite: function(a) {
    var b = this.spriteMap[a.x][a.y];
    b.splice(b.indexOf(a), 1);
    this.sprites.splice(this.sprites.indexOf(a), 1);
    b = this.spriteHistory.add.indexOf(a); - 1 < b ? this.spriteHistory.add.splice(b, 1) : this.spriteHistory.remove.push(a)
  }
};
player = {
  Player: function(a) {
    this.id = a.id || "player";
    this.textValue(document.getElementById("ammo"), this.ammo = a.ammo || 8);
    this.textValue(document.getElementById("health"), this.health = a.health || 100);
    this.textValue(document.getElementById("lives"), this.lives = a.lives || 3);
    this.textValue(document.getElementById("score"), this.score = a.score || 0);
    this.textValue(document.getElementById("floor"), this.floor = a.floor || 1);
    this.keys = new player.Keys(a.keys);
    this.weapons = a.weapons || [];
    for (var b = 0; b < this.weapons.length; b++) {
      var c =
        this.weapons[b];
      c.animation && c.animation.callback && (c.animation.callback = utils.bind(this, c.animation.callback))
    }
    this.activeWeapon = this.weapons[this.weapons.length - 1];
    this.activeWeapon.render();
    this.face = new player.Face(a.face);
    this.keys.render();
    this.min = {
      ammo: 0,
      health: 0,
      score: 0,
      lives: 0,
      floor: 0,
      speed: {
        rotation: 0.05,
        move: 0.1
      }
    };
    a.min && utils.overwrite(this.min, a.min);
    this.max = {
      ammo: 99,
      health: 100,
      score: 999999,
      lives: 9,
      floor: 9,
      speed: {
        rotation: 0.1,
        move: 0.2
      }
    };
    a.max && utils.overwrite(this.max, a.max);
    this.x =
      a.x || 0;
    this.y = a.y || 0;
    this.prevX = this.x;
    this.prevY = this.y;
    this.direction = a.direction && void 0 != a.direction.x && void 0 != a.direction.y ? utils.clone(a.direction) : utils.directions.north;
    this.plane = a.plane && void 0 != a.plane.x && void 0 != a.plane.y ? utils.clone(a.plane) : utils.directions.west;
    this.speed = a.speed && void 0 != a.speed.move && void 0 != a.speed.rotation ? a.speed : {
      move: 0,
      rotation: 0
    };
    this.acceleration = a.acceleration && void 0 != a.acceleration.move && void 0 != a.acceleration.rotation ? a.acceleration : {
      move: 1,
      rotation: 1
    };
    this.decceleration = a.decceleration && void 0 != a.decceleration.move && void 0 != a.decceleration.rotation ? a.decceleration : {
      move: 1,
      rotation: 1
    };
    this.view = a.view || 0;
    this.map = a.map || new maps.Map;
    this.left = this.strafeLeft;
    this.right = this.strafeRight
  },
  Weapon: function(a) {
    a || (a = {});
    this.id = a.id || 0;
    this.active = a.active || !1;
    this.ammo = a.ammo || !1;
    this.resource = a.resource ? resources[a.resource] : resources.knife;
    this.hudCanvas = document.getElementById(a.canvas || "weapon") || document.createElement("CANVAS");
    this.hudContext =
      this.hudCanvas.getContext("2d");
    this.handCanvas = document.getElementById(a.hand || "hand") || document.createElement("CANVAS");
    this.handContext = this.handCanvas.getContext("2d");
    this.animation = new animation.Animation(a.animation) || new animation.Animation;
    this.fire = a.fire ? utils.bind(this, a.fire) : utils.bind(this, function() {
      this.animation.play();
      return !0
    });
    this.release = a.release ? utils.bind(this, a.release) : utils.bind(this, function() {
      return !0
    });
    this.listeners = a.listeners || {}
  },
  Keys: function(a, b) {
    b || (b = {});
    this.keys =
      b.keys || {};
    this.canvas = document.getElementById(b.id || "keys") || document.createElement("CANVAS");
    this.context = this.canvas.getContext("2d")
  },
  Face: function(a, b) {
    b || (b = {});
    this.level = this.direction = 0;
    this.timer = null;
    this.zombie = this.smile = !1;
    this.canvas = document.getElementById(b.id || "face") || document.createElement("CANVAS");
    this.context = this.canvas.getContext("2d")
  }
};
player.Weapon.prototype = {
  render: function() {
    this.renderHand();
    this.renderHud()
  },
  renderHand: function() {
    this.handContext.clearRect(0, 0, this.handCanvas.width, this.handCanvas.height);
    this.handContext.drawImage(this.resource, this.animation.state, 0, resources.textureWidth, resources.textureHeight, 0, 0, this.handCanvas.width, this.handCanvas.height)
  },
  renderHud: function() {
    this.hudContext.clearRect(0, 0, this.hudCanvas.width, this.hudCanvas.height);
    this.hudContext.drawImage(resources.hudWeapon, 96 * this.id, 0, 96, 48, 0,
      0, this.hudCanvas.width, this.hudCanvas.height)
  }
};
player.Keys.prototype = {
  render: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.keys.gold ? this.context.drawImage(resources.hudKeys, 16, 0, 16, 32, 0, 0, this.canvas.width, this.canvas.height / 2) : this.context.drawImage(resources.hudKeys, 0, 0, 16, 32, 0, 0, this.canvas.width, this.canvas.height / 2);
    this.keys.silver ? this.context.drawImage(resources.hudKeys, 32, 0, 16, 32, 0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2) : this.context.drawImage(resources.hudKeys, 0, 0, 16, 32, 0, this.canvas.height /
      2, this.canvas.width, this.canvas.height / 2)
  },
  has: function(a) {
    return this.keys[a]
  },
  add: function(a) {
    this.keys[a] = !0;
    this.render()
  },
  remove: function(a) {
    delete this.keys[a];
    this.render()
  }
};
player.Face.prototype = {
  render: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(resources.hudFaces, 48 * this.direction, 64 * this.level + 2, 48, 62, 0, 0, this.canvas.width, this.canvas.height)
  },
  setSmile: function(a) {
    this.faceTimer && (clearTimeout(this.faceTimer), delete this.faceTimer);
    this.level = 7;
    this.direction = 1;
    this.smile = !0;
    this.render();
    setTimeout(utils.bind(this, function() {
      this.smile = false
    }), a)
  },
  process: function(a) {
    if (!this.smile && !this.zombie && (0 < a.health ?
        (a = min(6, max(0, 6 - floor(a.health / (a.max.health / 7)))), this.level != a && (this.level = a, this.render())) : (this.faceTimer && (clearTimeout(this.faceTimer), delete this.faceTimer), this.level = 7, this.direction = 0, this.render()), !this.faceTimer && 7 > this.level)) this.faceTimer = setTimeout(utils.bind(this, function() {
      this.direction = utils.random(2, 0);
      this.render();
      delete this.faceTimer
    }), utils.random(1E3, 250))
  }
};
player.Player.prototype = {
  render: function() {
    this.face.process(this)
  },
  textValue: function(a, b) {
    if (a) {
      var c = a.getContext("2d");
      c.clearRect(0, 0, a.width, a.height);
      for (var d = b.toString(), e = d.length - 1; - 1 < e; e--) {
        var f = floor(d[e]);
        c.drawImage(resources.hudChars, 16 * f + 1, 0, 16, 32, a.width - 26 * (d.length - e), 0, 24, 48)
      }
    }
  },
  setProperty: function(a, b) {
    if (!a || !b || void 0 == this[a] || void 0 == this.min[a] || void 0 == this.max[a] || 0 == b) return !1;
    var c = !1;
    0 < b ? this[a] < this.max[a] ? (this[a] = min(this.max[a], this[a] + b), c = !0) : c = !1 : this[a] >
      this.min[a] ? (this[a] = max(this.min[a], this[a] + b), c = !0) : c = !1;
    c && this.textValue(document.getElementById(a), this[a]);
    return c
  },
  setPosition: function(a, b) {
    this.x = a;
    this.y = b
  },
  lookAt: function() {},
  rotateLeft: function(div_ = 1) {
    var a = this.direction.x;
    const b_ = this.speed.rotation * div_;
    this.direction.x = this.direction.x * cos(b_ * game.timeFactor) - this.direction.y * sin(b_ * game.timeFactor);
    this.direction.y = a * sin(b_ * game.timeFactor) + this.direction.y * cos(b_ * game.timeFactor);
    a = this.plane.x;
    this.plane.x =
      this.plane.x * cos(b_ * game.timeFactor) - this.plane.y * sin(b_ * game.timeFactor);
    this.plane.y = a * sin(b_ * game.timeFactor) + this.plane.y * cos(b_ * game.timeFactor);
  },
  rotateRight: function(div_ = 1) {
    var a = this.direction.x;
    const b_ = this.speed.rotation * div_;
    this.direction.x = this.direction.x * cos(-b_ * game.timeFactor) - this.direction.y * sin(-b_ * game.timeFactor);
    this.direction.y = a * sin(-b_ * game.timeFactor) + this.direction.y * cos(-b_ *
      game.timeFactor);
    a = this.plane.x;
    this.plane.x = this.plane.x * cos(-b_ * game.timeFactor) - this.plane.y * sin(-b_ * game.timeFactor);
    this.plane.y = a * sin(-b_ * game.timeFactor) + this.plane.y * cos(-b_ * game.timeFactor);
  },
  strafeLeft: function() {
    this.prevX = this.x;
    this.prevY = this.y;
    var a = this.direction.x * cos(90 * utils.rad) - this.direction.y * sin(90 * utils.rad),
      b = this.direction.x * sin(90 * utils.rad) + this.direction.y * cos(90 * utils.rad);
    this.map.isFree(this.x + 1.5 *
      a * this.speed.move * game.timeFactor, this.y) && (this.x += 1.5 * a * this.speed.move * game.timeFactor);
    this.map.isFree(this.x, this.y + 1.5 * b * this.speed.move * game.timeFactor) && (this.y += 1.5 * b * this.speed.move * game.timeFactor);
    this.sprite()
  },
  strafeRight: function() {
    this.prevX = this.x;
    this.prevY = this.y;
    var a = this.direction.x * cos(270 * utils.rad) - this.direction.y * sin(270 * utils.rad),
      b = this.direction.x * sin(270 * utils.rad) + this.direction.y * cos(270 * utils.rad);
    this.map.isFree(this.x + 1.5 * a * this.speed.move * game.timeFactor, this.y) &&
      (this.x += 1.5 * a * this.speed.move * game.timeFactor);
    this.map.isFree(this.x, this.y + 1.5 * b * this.speed.move * game.timeFactor) && (this.y += 1.5 * b * this.speed.move * game.timeFactor);
    this.sprite()
  },
  forward: function() {
    this.prevX = this.x;
    this.prevY = this.y;
    var a = this.map.isFree(this.x + this.direction.x * this.speed.move * game.timeFactor, this.y),
      b = this.map.isFree(this.x, this.y + this.direction.y * this.speed.move * game.timeFactor);
    a && (this.x += this.direction.x * this.speed.move * game.timeFactor);
    b && (this.y += this.direction.y * this.speed.move *
      game.timeFactor);
    (!a || !b) && audio.playSound("hitwall");
    this.script();
    this.sprite()
  },
  backward: function() {
    this.prevX = this.x;
    this.prevY = this.y;
    var a = this.map.isFree(this.x - this.direction.x * this.speed.move * game.timeFactor, this.y),
      b = this.map.isFree(this.x, this.y - this.direction.y * this.speed.move * game.timeFactor);
    a && (this.x -= this.direction.x * this.speed.move * game.timeFactor);
    b && (this.y -= this.direction.y * this.speed.move * game.timeFactor);
    (!a || !b) && audio.playSound("hitwall");
    this.script();
    this.sprite()
  },
  script: function() {
    if (!game.editor &&
      (floor(this.prevX) != floor(this.x) || floor(this.prevY) != floor(this.y))) {
      var a = this.map.getScript(floor(this.x), floor(this.y));
      if (a && a.action && a[a.action]) a[a.action](this)
    }
  },
  sprite: function() {
    if (!game.editor)
      for (var a = this.map.hitSprites(floor(this.x), floor(this.y)), b = a.length; 0 < b; b--) a[b - 1].listeners.hit(this)
  },
  door: function() {
    var a = !0,
      b = floor(this.x + this.direction.x),
      c = floor(this.y + this.direction.y),
      d = this.map.getDoor(b, c);
    if (d && (!d.key || this.keys.has(d.key))) d[d.action](), a = !1;
    else if (0 == secret.process.length &&
      (d = this.map.getSecret(b, c)) && !d.hidden && !d.process) {
      var e = b + b - floor(this.x),
        f = c + c - floor(this.y);
      if (!this.map.getMapValue(e, f) && (d.direction = {
          x: b - floor(this.x),
          y: c - floor(this.y)
        }, this.map.getMapValue(b + d.direction.x, c) && (d.direction.x = 0), this.map.getMapValue(b, c + d.direction.y) && (d.direction.y = 0), e = this.map.getSecret(b - d.direction.x, c - d.direction.y), !e || e == d && e.hidden))
        if (0 == d.direction.x || 0 == d.direction.y) d.push(), this.ratio.secret++, a = !1
    }
    22 == this.map.getMapValue(b, c) && -1 != this.map.floors[b][c] && (this.map.map[b][c] =
      24, 107 == this.map.floors[floor(this.x)][floor(this.y)] && (this.secretfound = !0), audio.playSound("leveldone"), this.leveldone = !0, a = !1);
    a && audio.playSound("donothing")
  },
  getActiveWeapon: function() {
    return this.activeWeapon
  },
  weapon: function(a) {
    var b = null,
      c = null;
    if (this.getActiveWeapon().id != a) {
      for (var d = 0; d < this.weapons.length; d++) {
        var e = this.weapons[d];
        e.active && (this.backupWeapon = b = e);
        e.active = e.id == a;
        e.active && (this.activeWeapon = c = e, this.activeWeapon.render())
      }
      return c && c.ammo && 0 == this.ammo ? (c.active = !1,
        b.active = !0, this.activeWeapon = b, this.activeWeapon.render(), !1) : !0
    }
    return !1
  },
  hasWeapon: function(a) {
    for (var b = 0; b < this.weapons.length; b++)
      if (this.weapons[b].id == a) return !0;
    return !1
  },
  setRotation: function(a) {
    this.speed.rotation = max(0.01, min(0.1, a))
  },
  setMove: function(a) {
    this.speed.move = max(0.01, min(0.1, a))
  },
  getDistance: function(a, b) {
    var c = this.x - a,
      d = this.y - b;
    return sqrt(c * c + d * d)
  }
};
ai = {
  process: [],
  seed: 0,
  tick: 30,
  calculateAngleFromDirection: function(a, b) {
    if (-1 == a && -1 == b) return 3;
    if (-1 == a && 0 == b) return 4;
    if (-1 == a && 1 == b) return 5;
    if (0 == a && 1 == b) return 6;
    if (1 == a && 1 == b) return 7;
    if (1 == a && 0 == b) return 0;
    if (1 == a && -1 == b) return 1;
    if (0 == a && -1 == b) return 2
  },
  Entity: function(a) {
    sprites.Sprite.call(this, a);
    this.id = a.resource + "-" + ai.seed++;
    this.type = a.aiType || "unknown";
    this.baseX = floor(this.x);
    this.baseY = floor(this.y);
    this.prevX = this.baseX;
    this.prevY = this.baseY;
    this.detailLevel = a.detailLevel || 64;
    this.detailY = this.detailX = 0;
    this.texture = this.resource;
    this.hitpoints = a.hitpoints || 0;
    this.slide = this.angle = a.angle || 0;
    this.speed = a.speed || 1;
    this.soundOnAttack = a.soundOnAttack || null;
    this.instantAttack = a.instantAttack || null;
    this.timer = 0;
    a.direction ? this.direction = {
      x: a.direction.x || 0,
      y: a.direction.y || 0
    } : this.getDirection();
    ai.process.push(this)
  },
  Hans: function(a) {
    var b = 850;
    switch (game.difficulty) {
      case 0:
        b = 850;
        break;
      case 1:
        b = 950;
        break;
      case 2:
        b = 1050;
        break;
      case 3:
        b = 1200
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "hans",
      aiType: "hans",
      soundOnAttack: "gutentag",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          keyframe: 7 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && audio.queueSound("mutti", this.baseX, this.baseY);
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 10 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  UberMutant: function(a) {
    var b = 1050;
    switch (game.difficulty) {
      case 0:
        b =
          1050;
        break;
      case 1:
        b = 1150;
        break;
      case 2:
        b = 1250;
        break;
      case 3:
        b = 1400
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "ubermutant",
      aiType: "ubermutant",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            3 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 8,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          keyframe: 8 *
            resources.textureWidth,
          speed: 10,
          count: 5,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && audio.queueSound("uberdeath", this.baseX, this.baseY);
            4 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 12 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ?
      this[a.action] : this.ready)
  },
  TransGrosse: function(a) {
    var b = 850;
    switch (game.difficulty) {
      case 0:
        b = 850;
        break;
      case 1:
        b = 950;
        break;
      case 2:
        b = 1050;
        break;
      case 3:
        b = 1200
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "transgrosse",
      aiType: "transgrosse",
      soundOnAttack: "transsight",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 ==
              a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          keyframe: 7 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && audio.queueSound("transdeath", this.baseX, this.baseY);
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 10 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  Gretel: function(a) {
    var b = 850;
    switch (game.difficulty) {
      case 0:
        b = 850;
        break;
      case 1:
        b = 950;
        break;
      case 2:
        b = 1050;
        break;
      case 3:
        b = 1200
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "gretel",
      aiType: "gretel",
      soundOnAttack: "kein",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 *
            resources.textureWidth,
          speed: 10,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          keyframe: 7 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && audio.queueSound("mein", this.baseX, this.baseY);
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 10 *
            resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  DrSchabbs: function(a) {
    var b = 850;
    switch (game.difficulty) {
      case 0:
        b = 850;
        break;
      case 1:
        b = 950;
        break;
      case 2:
        b = 1550;
        break;
      case 3:
        b = 2400
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "drschabbs",
      aiType: "drschabbs",
      soundOnAttack: "schabbsha",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 2,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          speed: 10,
          count: 8,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (audio.queueSound("meingott", this.baseX,
              this.baseY), a.speed = 100);
            2 == a.index && (a.speed = 10, a.keyframe = 3 * resources.textureWidth, a.step = resources.textureWidth);
            7 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 9 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            if (game.auto) this.endDeathCam && (document.getElementById("deathcam").style.display = "none", this.action = this.dead);
            else {
              var a = this;
              ai.process = [a];
              animation.process = [];
              game.auto = function() {
                game.engine.maskColor = "#004040";
                if (game.restart) game.restartClear &&
                  (game.restartClear = game.engine.fizzleClear(), game.restartClear || (document.getElementById("deathcam").style.display = null, a.animate("dying"), a.action = null, game.auto = function() {
                    "dead" == a.animations.current ? (a.endDeathCam = !0, a.animate("dead")) : a.animate("dying")
                  }));
                else if (game.restart = !game.engine.fizzleFade(), game.restart) {
                  document.getElementById("letsseethatagain").style.display = "block";
                  document.getElementById("hand").style.display = "none";
                  game.client.x = a.x + a.direction.x;
                  game.client.x = a.y + a.direction.y;
                  var b = (atan2(game.client.y - a.y, game.client.x - a.x) * utils.deg + 210) % 360 * utils.rad,
                    e = -cos(b),
                    b = -sin(b);
                  game.client.x = a.x + 1.5 * e;
                  game.client.y = a.y + 1.5 * b;
                  game.client.direction.x = -e;
                  game.client.direction.y = -b;
                  game.client.plane.x = -b;
                  game.client.plane.y = e;
                  setTimeout(function() {
                    document.getElementById("letsseethatagain").style.display = null;
                    game.restartClear = !0;
                    a.animations.dying.stop();
                    a.animations.dead.stop();
                    a.animations.current = "ready";
                    a.animations.dying.keyframe = 0;
                    a.animations.dying.step = 0;
                    a.animations.dying.state =
                      0;
                    a.animations.dying.index = 0;
                    a.action = null
                  }, 1E3)
                }
              }
            }
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  Needle: function(a) {
    utils.extend(a, {
      speed: 4,
      detailLevel: 64,
      resource: "needle",
      aiType: "fake",
      animations: {
        run: new animation.Animation({
          speed: 5,
          count: 4,
          step: resources.textureWidth
        })
      }
    });
    ai.Entity.call(this, a);
    this.action = this.attack
  },
  Ghost: function(a) {
    var b = 200;
    switch (game.difficulty) {
      case 0:
        b = 200;
        break;
      case 1:
        b = 300;
        break;
      case 2:
        b = 400;
        break;
      case 3:
        b = 500
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "ghost",
      aiType: "ghost",
      soundOnAttack: "tothund",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 1,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function() {
            this.action = this.fire
          })
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          keyframe: 5 * resources.textureWidth,
          speed: 10,
          count: 6,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (audio.queueSound("hitlerha", this.baseX, this.baseY), scripts.process.push({
              x: this.baseX,
              y: this.baseY,
              action: "attack"
            }));
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 10 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" !=
    this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  Fireball: function(a) {
    utils.extend(a, {
      speed: 16,
      detailLevel: 64,
      resource: "fireball",
      aiType: "fake",
      animations: {
        run: new animation.Animation({
          speed: 5,
          count: 2,
          step: resources.textureWidth
        })
      }
    });
    ai.Entity.call(this, a);
    this.action = this.attack
  },
  AngelOfDeath: function(a) {
    var b = 1450;
    switch (game.difficulty) {
      case 0:
        b = 1450;
        break;
      case 1:
        b = 1550;
        break;
      case 2:
        b = 1650;
        break;
      case 3:
        b = 2E3
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "angelofdeath",
      aiType: "angelofdeath",
      soundOnAttack: "angelsight",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 2,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          keyframe: 6 * resources.textureWidth,
          speed: 10,
          count: 10,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (audio.queueSound("angeldeath", this.baseX, this.baseY), a.speed = 100);
            2 == a.index && (a.speed = 10);
            9 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 15 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  Orb: function(a) {
    utils.extend(a, {
      speed: 8,
      detailLevel: 64,
      resource: "orb",
      aiType: "fake",
      animations: {
        run: new animation.Animation({
          speed: 5,
          count: 4,
          step: resources.textureWidth
        })
      }
    });
    ai.Entity.call(this, a);
    this.action = this.attack
  },
  Hitler: function(a) {
    var b = 500;
    switch (game.difficulty) {
      case 0:
        b = 500;
        break;
      case 1:
        b = 700;
        break;
      case 2:
        b = 800;
        break;
      case 3:
        b = 900
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "hitler",
      aiType: "hitler",
      soundOnAttack: "scheist",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation({
          keyframe: 11 *
            resources.textureWidth
        }),
        fire: new animation.Animation({
          keyframe: 15 * resources.textureWidth,
          speed: 10,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          keyframe: 11 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          keyframe: 11 * resources.textureWidth,
          speed: 20,
          count: 12,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (audio.queueSound("eva", this.baseX,
              this.baseY), a.speed = 100);
            2 == a.index && (a.speed = 20, a.keyframe = 15 * resources.textureWidth, a.step = resources.textureWidth);
            11 == a.index && (audio.queueSound("slurpie", this.baseX, this.baseY), this.animate("dead"))
          })
        }),
        dead: new animation.Animation({
          keyframe: 25 * resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            if (game.auto) this.endDeathCam && (document.getElementById("deathcam").style.display = "none", this.action = this.dead);
            else {
              var a = this;
              ai.process = [a];
              animation.process = [];
              game.auto = function() {
                game.engine.maskColor = "#004040";
                if (game.restart) game.restartClear && (game.restartClear = game.engine.fizzleClear(), game.restartClear || (document.getElementById("deathcam").style.display = null, a.animate("dying"), a.action = null, game.auto = function() {
                  "dead" == a.animations.current ? (a.endDeathCam = !0, a.animate("dead")) : a.animate("dying")
                }));
                else if (game.restart = !game.engine.fizzleFade(), game.restart) {
                  document.getElementById("letsseethatagain").style.display = "block";
                  document.getElementById("hand").style.display =
                    "none";
                  game.client.x = a.x + a.direction.x;
                  game.client.x = a.y + a.direction.y;
                  var b = (atan2(game.client.y - a.y, game.client.x - a.x) * utils.deg + 210) % 360 * utils.rad,
                    e = -cos(b),
                    b = -sin(b);
                  game.client.x = a.x + 1.5 * e;
                  game.client.y = a.y + 1.5 * b;
                  game.client.direction.x = -e;
                  game.client.direction.y = -b;
                  game.client.plane.x = -b;
                  game.client.plane.y = e;
                  setTimeout(function() {
                    document.getElementById("letsseethatagain").style.display = null;
                    game.restartClear = !0;
                    a.animations.dying.stop();
                    a.animations.dead.stop();
                    a.animations.current = "ready";
                    a.animations.dying.keyframe = 11 * resources.textureWidth;
                    a.animations.dying.step = 0;
                    a.animations.dying.state = 11 * resources.textureWidth;
                    a.animations.dying.index = 0;
                    a.action = null
                  }, 1E3)
                }
              }
            }
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  MechHitler: function(a) {
    var b = 800;
    switch (game.difficulty) {
      case 0:
        b = 800;
        break;
      case 1:
        b = 950;
        break;
      case 2:
        b = 1050;
        break;
      case 3:
        b = 1200
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "hitler",
      aiType: "hitler",
      soundOnAttack: "die",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          callback: utils.bind(this, function(a) {
            1 == a.index && (0 != this.direction.x || 0 != this.direction.y) && audio.queueSound("mechstep", this.baseX, this.baseY)
          })
        }),
        dying: new animation.Animation({
          keyframe: 8 *
            resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 7 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  Giftmacher: function(a) {
    var b = 850;
    switch (game.difficulty) {
      case 0:
        b = 850;
        break;
      case 1:
        b = 950;
        break;
      case 2:
        b = 1050;
        break;
      case 3:
        b = 1200
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "giftmacher",
      aiType: "giftmacher",
      soundOnAttack: "eine",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 2,
          step: resources.textureWidth,
          single: !0
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          speed: 10,
          count: 8,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (audio.queueSound("donner", this.baseX, this.baseY), a.speed = 100);
            2 == a.index && (a.speed = 10, a.keyframe = 3 * resources.textureWidth, a.step = resources.textureWidth);
            7 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 9 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            if (game.auto) this.endDeathCam && (document.getElementById("deathcam").style.display = "none", this.action = this.dead);
            else {
              var a =
                this;
              ai.process = [a];
              animation.process = [];
              game.auto = function() {
                game.engine.maskColor = "#004040";
                if (game.restart) game.restartClear && (game.restartClear = game.engine.fizzleClear(), game.restartClear || (document.getElementById("deathcam").style.display = null, a.animate("dying"), a.action = null, game.auto = function() {
                  "dead" == a.animations.current ? (a.endDeathCam = !0, a.animate("dead")) : a.animate("dying")
                }));
                else if (game.restart = !game.engine.fizzleFade(), game.restart) {
                  document.getElementById("letsseethatagain").style.display =
                    "block";
                  document.getElementById("hand").style.display = "none";
                  game.client.x = a.x + a.direction.x;
                  game.client.x = a.y + a.direction.y;
                  var b = (atan2(game.client.y - a.y, game.client.x - a.x) * utils.deg + 210) % 360 * utils.rad,
                    e = -cos(b),
                    b = -sin(b);
                  game.client.x = a.x + 1.5 * e;
                  game.client.y = a.y + 1.5 * b;
                  game.client.direction.x = -e;
                  game.client.direction.y = -b;
                  game.client.plane.x = -b;
                  game.client.plane.y = e;
                  setTimeout(function() {
                    document.getElementById("letsseethatagain").style.display = null;
                    game.restartClear = !0;
                    a.animations.dying.stop();
                    a.animations.dead.stop();
                    a.animations.current = "ready";
                    a.animations.dying.keyframe = 0;
                    a.animations.dying.step = 0;
                    a.animations.dying.state = 0;
                    a.animations.dying.index = 0;
                    a.action = null
                  }, 1E3)
                }
              }
            }
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  HiMissile: function(a) {
    utils.extend(a, {
      speed: 8,
      detailLevel: 64,
      resource: "himissile",
      aiType: "fake",
      animations: {
        run: new animation.Animation({
          slide: !0
        }),
        explode: new animation.Animation({
          keyframe: 12 * resources.textureWidth,
          speed: 10,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && audio.queueSound("missilehit", this.baseX, this.baseY);
            2 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          callback: utils.bind(this, function(a) {
            this.process && (this.action = this.dead, a.stop())
          })
        })
      }
    });
    ai.Entity.call(this, a);
    this.action = this.attack
  },
  HiSmoke: function(a) {
    utils.extend(a, {
      speed: 0,
      detailLevel: 64,
      resource: "himissile",
      aiType: "fake",
      animations: {
        smoke: new animation.Animation({
          keyframe: 8 *
            resources.textureWidth,
          speed: 20,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          callback: utils.bind(this, function(a) {
            this.process && (this.action = this.dead, a.stop())
          })
        })
      }
    });
    ai.Entity.call(this, a);
    this.action = this.smoke
  },
  Missile: function(a) {
    utils.extend(a, {
      speed: 8,
      detailLevel: 64,
      resource: "missile",
      aiType: "fake",
      animations: {
        run: new animation.Animation({
          slide: !0
        }),
        explode: new animation.Animation({
          keyframe: 12 *
            resources.textureWidth,
          speed: 10,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && audio.queueSound("missilehit", this.baseX, this.baseY);
            2 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          callback: utils.bind(this, function(a) {
            this.process && (this.action = this.dead, a.stop())
          })
        })
      }
    });
    ai.Entity.call(this, a);
    this.action = this.attack
  },
  Smoke: function(a) {
    utils.extend(a, {
      speed: 0,
      detailLevel: 64,
      resource: "missile",
      aiType: "fake",
      animations: {
        smoke: new animation.Animation({
          keyframe: 8 *
            resources.textureWidth,
          speed: 20,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          callback: utils.bind(this, function(a) {
            this.process && (this.action = this.dead, a.stop())
          })
        })
      }
    });
    ai.Entity.call(this, a);
    this.action = this.smoke
  },
  Fettgesicht: function(a) {
    var b = 850;
    switch (game.difficulty) {
      case 0:
        b = 850;
        break;
      case 1:
        b = 950;
        break;
      case 2:
        b = 1050;
        break;
      case 3:
        b = 1200
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "fettgesicht",
      aiType: "fettgesicht",
      soundOnAttack: "erlauben",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            3 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          speed: 10,
          count: 8,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 ==
              a.index && (audio.queueSound("rose", this.baseX, this.baseY), a.speed = 100);
            2 == a.index && (a.speed = 10, a.keyframe = 5 * resources.textureWidth, a.step = resources.textureWidth);
            7 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 11 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            if (game.auto) this.endDeathCam && (document.getElementById("deathcam").style.display = "none", this.action = this.dead);
            else {
              var a = this;
              ai.process = [a];
              animation.process = [];
              game.auto =
                function() {
                  game.engine.maskColor = "#004040";
                  if (game.restart) game.restartClear && (game.restartClear = game.engine.fizzleClear(), game.restartClear || (document.getElementById("deathcam").style.display = null, a.animate("dying"), a.action = null, game.auto = function() {
                    "dead" == a.animations.current ? (a.endDeathCam = !0, a.animate("dead")) : a.animate("dying")
                  }));
                  else if (game.restart = !game.engine.fizzleFade(), game.restart) {
                    document.getElementById("letsseethatagain").style.display = "block";
                    document.getElementById("hand").style.display =
                      "none";
                    game.client.x = a.x + a.direction.x;
                    game.client.x = a.y + a.direction.y;
                    var b = (atan2(game.client.y - a.y, game.client.x - a.x) * utils.deg + 210) % 360 * utils.rad,
                      e = -cos(b),
                      b = -sin(b);
                    game.client.x = a.x + 1.5 * e;
                    game.client.y = a.y + 1.5 * b;
                    game.client.direction.x = -e;
                    game.client.direction.y = -b;
                    game.client.plane.x = -b;
                    game.client.plane.y = e;
                    setTimeout(function() {
                      document.getElementById("letsseethatagain").style.display = null;
                      game.restartClear = !0;
                      a.animations.dying.stop();
                      a.animations.dead.stop();
                      a.animations.current = "ready";
                      a.animations.dying.keyframe = 0;
                      a.animations.dying.step = 0;
                      a.animations.dying.state = 0;
                      a.animations.dying.index = 0;
                      a.action = null
                    }, 1E3)
                  }
                }
            }
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  BarnacleWilhelm: function(a) {
    var b = 950;
    switch (game.difficulty) {
      case 0:
        b = 950;
        break;
      case 1:
        b = 1050;
        break;
      case 2:
        b = 1150;
        break;
      case 3:
        b = 1300
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "wilhelm",
      aiType: "wilhelm",
      soundOnAttack: "wilhelmsight",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            3 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          keyframe: 8 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && audio.queueSound("wilhelmdeath",
              this.baseX, this.baseY);
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 11 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  DeathKnight: function(a) {
    var b = 1250;
    switch (game.difficulty) {
      case 0:
        b = 1250;
        break;
      case 1:
        b = 1350;
        break;
      case 2:
        b = 1450;
        break;
      case 3:
        b =
          1600
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "deathknight",
      aiType: "deathknight",
      soundOnAttack: "knightsight",
      instantAttack: !0,
      animations: {
        ready: new animation.Animation,
        fire: new animation.Animation({
          keyframe: 4 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 10,
          count: 4,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          keyframe: 8 *
            resources.textureWidth,
          speed: 10,
          count: 7,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && audio.queueSound("knightdeath", this.baseX, this.baseY);
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 14 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ?
      this[a.action] : this.ready)
  },
  Pacman: function(a) {
    var b = 0;
    switch (a.pacmanType) {
      case "red":
        b = 0;
        break;
      case "pink":
        b = 2;
        break;
      case "yellow":
        b = 4;
        break;
      case "blue":
        b = 6
    }
    utils.extend(a, {
      speed: 2,
      detailLevel: 64,
      resource: "pacman",
      aiType: "fake",
      hit: !0,
      animations: {
        run: new animation.Animation({
          keyframe: resources.textureWidth * b,
          speed: 10,
          count: 2,
          step: resources.textureWidth
        })
      }
    });
    ai.Entity.call(this, a);
    this.action = this.attack
  },
  Spectre: function(a) {
    var b = 5;
    switch (game.difficulty) {
      case 0:
        b = 5;
        break;
      case 1:
        b = 10;
        break;
      case 2:
        b =
          15;
        break;
      case 3:
        b = 25
    }
    utils.extend(a, {
      hitpoints: b,
      speed: 1,
      detailLevel: 64,
      resource: "spectre",
      aiType: "spectre",
      hit: !1,
      soundOnAttack: "ghostsight",
      animations: {
        ready: new animation.Animation({}),
        run: new animation.Animation({
          speed: 10,
          count: 2,
          step: resources.textureWidth
        }),
        dying: new animation.Animation({
          keyframe: 2 * resources.textureWidth,
          speed: 3,
          count: 6,
          single: !0,
          step: resources.textureWidth,
          callback: utils.bind(this, function(a) {
            1 == a.index && audio.queueSound("ghostfade", this.baseX, this.baseY);
            5 == a.index && this.animate("dead")
          })
        }),
        fade: new animation.Animation({
          keyframe: 7 * resources.textureWidth,
          speed: 3,
          count: 6,
          single: !0,
          step: -resources.textureWidth,
          callback: utils.bind(this, function(a) {
            if (5 == a.index) {
              this.animate("run");
              this.action = this.attack;
              a = 5;
              switch (game.difficulty) {
                case 0:
                  a = 5;
                  break;
                case 1:
                  a = 10;
                  break;
                case 2:
                  a = 15;
                  break;
                case 3:
                  a = 25
              }
              this.hitpoints = a
            }
          })
        }),
        dead: new animation.Animation({
          keyframe: 7 * resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function() {
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead :
              (this.action = null, setTimeout(utils.bind(this, function() {
                this.animations[this.animations.current].stop();
                this.animate("fade")
              }), 5E3))
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  BJ: function(a) {
    utils.extend(a, {
      hitpoints: 1,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "bj",
      aiType: "bj",
      animations: {
        current: "run",
        run: new animation.Animation({
          speed: 20,
          count: 4,
          step: resources.textureWidth
        }),
        yeah: new animation.Animation({
          keyframe: 3 * resources.textureWidth,
          speed: 20,
          count: 5,
          step: resources.textureWidth,
          callback: utils.bind(this, function(a) {
            this.speed = 4;
            2 == a.index && audio.playSound("yeah");
            4 == a.index && (this.animate("dead"), this.direction = {
              x: 0,
              y: 0
            })
          })
        }),
        dead: new animation.Animation({
          keyframe: 7 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.process = this.action = null;
            setTimeout(function() {
              game.auto = null;
              game.pause = !0;
              game.win = !0
            }, 1E3)
          })
        })
      }
    });
    ai.process = [];
    animation.process = [];
    ai.Entity.call(this, a);
    this.action = this.moving
  },
  Soldier: function(a) {
    utils.extend(a, {
      hitpoints: 25,
      speed: 4,
      detailLevel: 64,
      hit: !0,
      resource: "soldier",
      aiType: "soldier",
      soundOnAttack: "halt",
      animations: {
        showcase: new animation.Animation({
          speed: 20,
          count: 48,
          step: resources.textureWidth
        }),
        ready: new animation.Animation({
          slide: !0
        }),
        fire: new animation.Animation({
          keyframe: 46 * resources.textureWidth,
          speed: 10,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 == a.index && (this.action = this.fire)
          })
        }),
        walk: new animation.Animation({
          keyframe: 8 * resources.textureWidth,
          speed: 20,
          count: 4,
          step: 8 * resources.textureWidth,
          slide: !0,
          callback: utils.bind(this, function() {})
        }),
        run: new animation.Animation({
          keyframe: 8 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: 8 * resources.textureWidth,
          slide: !0,
          callback: utils.bind(this, function() {})
        }),
        hit: new animation.Animation({
          keyframe: 40 * resources.textureWidth,
          speed: 10,
          count: 1,
          step: 0,
          single: !0,
          callback: utils.bind(this, function() {})
        }),
        dying: new animation.Animation({
          keyframe: 41 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (audio.queueSound("deathscream" + utils.random(9, 1), this.baseX, this.baseY), scripts.process.push({
              x: this.baseX,
              y: this.baseY,
              action: "attack"
            }));
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 45 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action =
      a.action ? this[a.action] : this.ready)
  },
  SS: function(a) {
    utils.extend(a, {
      hitpoints: 100,
      speed: 16,
      detailLevel: 128,
      hit: !0,
      resource: "ss",
      aiType: "ss",
      soundOnAttack: "schutzad",
      animations: {
        ready: new animation.Animation({
          slide: !0
        }),
        fire: new animation.Animation({
          keyframe: 46 * resources.textureWidth,
          speed: 10,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 == a.index && (this.action = this.fire)
          })
        }),
        walk: new animation.Animation({
          keyframe: 8 * resources.textureWidth,
          speed: 20,
          count: 4,
          step: 8 *
            resources.textureWidth,
          slide: !0,
          callback: utils.bind(this, function() {
            this.speed = 8
          })
        }),
        run: new animation.Animation({
          keyframe: 8 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: 8 * resources.textureWidth,
          slide: !0,
          callback: utils.bind(this, function() {
            this.speed = 8
          })
        }),
        hit: new animation.Animation({
          keyframe: 40 * resources.textureWidth,
          speed: 10,
          count: 1,
          step: 0,
          single: !0,
          callback: utils.bind(this, function() {})
        }),
        dying: new animation.Animation({
          keyframe: 41 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (audio.queueSound("leben", this.baseX, this.baseY), scripts.process.push({
              x: this.baseX,
              y: this.baseY,
              action: "attack"
            }));
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 45 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ?
      this[a.action] : this.ready)
  },
  Mutant: function(a) {
    utils.extend(a, {
      hitpoints: 3 == game.difficulty ? 65 : 2 == game.difficulty ? 55 : 45,
      speed: 8,
      detailLevel: 128,
      hit: !0,
      resource: "mutant",
      aiType: "mutant",
      animations: {
        ready: new animation.Animation({
          slide: !0
        }),
        fire: new animation.Animation({
          keyframe: 46 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          keyframe: 8 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: 8 * resources.textureWidth,
          slide: !0
        }),
        hit: new animation.Animation({
          keyframe: 40 * resources.textureWidth,
          speed: 10,
          count: 1,
          step: 0,
          single: !0
        }),
        dying: new animation.Animation({
          keyframe: 40 * resources.textureWidth,
          speed: 10,
          count: 5,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (audio.queueSound("ahhhg", this.baseX, this.baseY), scripts.process.push({
              x: this.baseX,
              y: this.baseY,
              action: "attack"
            }));
            4 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 45 *
            resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead && this.action ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  Officer: function(a) {
    utils.extend(a, {
      hitpoints: 50,
      speed: 16,
      detailLevel: 128,
      hit: !0,
      resource: "officer",
      aiType: "officer",
      soundOnAttack: "spion",
      animations: {
        ready: new animation.Animation({
          slide: !0
        }),
        fire: new animation.Animation({
          keyframe: 47 *
            resources.textureWidth,
          speed: 10,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 == a.index && (this.action = this.fire)
          })
        }),
        walk: new animation.Animation({
          keyframe: 8 * resources.textureWidth,
          speed: 20,
          count: 4,
          step: 8 * resources.textureWidth,
          slide: !0,
          callback: utils.bind(this, function() {
            this.speed = 8
          })
        }),
        run: new animation.Animation({
          keyframe: 8 * resources.textureWidth,
          speed: 8,
          count: 4,
          step: 8 * resources.textureWidth,
          slide: !0,
          callback: utils.bind(this, function() {
            this.speed = 8
          })
        }),
        hit: new animation.Animation({
          keyframe: 40 *
            resources.textureWidth,
          speed: 10,
          count: 1,
          step: 0,
          single: !0,
          callback: utils.bind(this, function() {})
        }),
        dying: new animation.Animation({
          keyframe: 41 * resources.textureWidth,
          speed: 10,
          count: 5,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (audio.queueSound("neinsovass", this.baseX, this.baseY), scripts.process.push({
              x: this.baseX,
              y: this.baseY,
              action: "attack"
            }));
            4 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 46 * resources.textureWidth,
          callback: utils.bind(this,
            function() {
              this.hit = !1;
              this.hitpoints = 0;
              this.dead && this.action ? this.action = this.dead : this.process = this.action = null
            })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  },
  Dog: function(a) {
    utils.extend(a, {
      hitpoints: 1,
      speed: 16,
      detailLevel: 128,
      hit: !0,
      resource: "dog",
      aiType: "dog",
      soundOnAttack: "dogbark",
      animations: {
        showcase: new animation.Animation({
          speed: 20,
          count: 39,
          step: resources.textureWidth
        }),
        ready: new animation.Animation({
          slide: !0,
          single: !0
        }),
        fire: new animation.Animation({
          keyframe: 36 * resources.textureWidth,
          speed: 8,
          count: 3,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            2 == a.index && (this.action = this.fire)
          })
        }),
        run: new animation.Animation({
          speed: 8,
          count: 4,
          step: 8 * resources.textureWidth,
          slide: !0
        }),
        dying: new animation.Animation({
          keyframe: 32 * resources.textureWidth,
          speed: 10,
          count: 4,
          step: resources.textureWidth,
          single: !0,
          callback: utils.bind(this, function(a) {
            1 == a.index && (audio.queueSound("dogdeath", this.baseX, this.baseY),
              scripts.process.push({
                x: this.baseX,
                y: this.baseY,
                action: "attack"
              }));
            3 == a.index && this.animate("dead")
          })
        }),
        dead: new animation.Animation({
          keyframe: 35 * resources.textureWidth,
          callback: utils.bind(this, function() {
            this.hit = !1;
            this.hitpoints = 0;
            this.dead ? this.action = this.dead : this.process = this.action = null
          })
        })
      }
    });
    ai.Entity.call(this, a);
    "dead" != this.animations.current && (this.action = a.action ? this[a.action] : this.ready)
  }
};
utils.overwrite(ai.Entity.prototype = Object.create(sprites.Sprite.prototype), {
  calculateAngle: function() {
    -1 == this.direction.x && -1 == this.direction.y ? this.angle = 3 : -1 == this.direction.x && 0 == this.direction.y ? this.angle = 4 : -1 == this.direction.x && 1 == this.direction.y ? this.angle = 5 : 0 == this.direction.x && 1 == this.direction.y ? this.angle = 6 : 1 == this.direction.x && 1 == this.direction.y ? this.angle = 7 : 1 == this.direction.x && 0 == this.direction.y ? this.angle = 0 : 1 == this.direction.x && -1 == this.direction.y ? this.angle = 1 : 0 == this.direction.x &&
      -1 == this.direction.y && (this.angle = 2)
  },
  calculateSlide: function(a, b) {
    if (this.animations.current && !this.animations[this.animations.current].slide) this.slide = 0;
    else {
      var c = floor(atan2(this.baseY + 0.5 - b, this.baseX + 0.5 - a) * utils.deg + 22.5) + 180;
      this.slide = (floor(c / 45) + this.angle) % 8
    }
  },
  getTextureSlide: function() {
    return this.slide * resources.textureWidth
  },
  turnaround: function() {
    this.direction.x *= -1;
    this.direction.y *= -1;
    this.calculateAngle()
  },
  lookingAt: function(a, b) {
    var a = floor(a),
      b = floor(b),
      c = a - this.baseX,
      d = b - this.baseY;
    switch (this.angle) {
      case 0:
        return 0 < c;
      case 2:
        return 0 > d;
      case 4:
        return 0 > c;
      case 6:
        return 0 < d
    }
  },
  isVisible: function(a, b, c) {
    for (var d = floor(a), e = floor(b), f = floor((a - d) * this.detailLevel), h = floor((b - e) * this.detailLevel), b = this.baseX, a = this.baseY, g = floor((this.x + 0.5 - this.baseX) * this.detailLevel), j = floor((this.y + 0.5 - this.baseY) * this.detailLevel), b = b * this.detailLevel + g, a = a * this.detailLevel + j, d = d * this.detailLevel + f, e = e * this.detailLevel + h, f = abs(d - b), h = abs(e - a), j = b < d ? 1 : -1, g = a < e ? 1 : -1, i = f - h;;) {
      if (b == d && a == e) return !0;
      var m = floor(b / this.detailLevel),
        l = floor(a / this.detailLevel);
      if (c.getMapValue(m, l) || (m = c.getDoor(m, l)) && m.isClosed()) return !1;
      m = 2 * i;
      m > -h && (i -= h, b += j);
      m < f && (i += f, a += g)
    }
  },
  getDirectionTo: function(a, b, c) {
    var a = floor(a),
      b = floor(b),
      d = this.baseX,
      e = this.baseY,
      f = abs(a - d),
      h = abs(b - e),
      g = d < a ? 1 : -1,
      j = e < b ? 1 : -1,
      i = 2 * (f - h),
      m = 0,
      l = 0;
    i > -h && (m += g);
    i < f && (l += j);
    if (0 == m && 0 == l) return {
      x: 0,
      y: 0
    };
    for (var p = [
          [c.getHitValue(d - 1, e - 1, this) || d - 1 == a && e - 1 == b || 0 > [1, 2, 3, 4, 5].indexOf(this.angle), c.getHitValue(d - 1, e, this) || d - 1 == a && e == b || 0 > [2, 3, 4, 5, 6].indexOf(this.angle), c.getHitValue(d - 1, e + 1, this) || d - 1 == a && e + 1 == b || 0 > [3, 4, 5, 6, 7].indexOf(this.angle)],
          [c.getHitValue(d, e - 1, this) || d == a && e - 1 == b || 0 > [0, 1, 2, 3, 4].indexOf(this.angle), !1, c.getHitValue(d, e + 1, this) || d == a && e + 1 == b || 0 > [0, 4, 5, 6, 7].indexOf(this.angle)],
          [c.getHitValue(d + 1, e - 1, this) || d + 1 == a && e - 1 == b || 0 > [0, 1, 2, 3, 7].indexOf(this.angle), c.getHitValue(d + 1, e, this) || d + 1 == a && e == b || 0 > [0, 1, 2, 6, 7].indexOf(this.angle), c.getHitValue(d + 1, e + 1, this) || d + 1 == a && e + 1 == b || 0 > [0, 1, 5, 6, 7].indexOf(this.angle)]
        ],
        q = [p[0][0], p[1][0], p[2][0], p[2][1], p[2][2], p[1][2], p[0][2], p[0][1]], n = [{
          x: -1,
          y: -1
        }, {
          x: 0,
          y: -1
        }, {
          x: 1,
          y: -1
        }, {
          x: 1,
          y: 0
        }, {
          x: 1,
          y: 1
        }, {
          x: 0,
          y: 1
        }, {
          x: -1,
          y: 1
        }, {
          x: -1,
          y: 0
        }], o = 0; 8 > o && !(n[o].x == m && n[o].y == l); o++);
    var r = 0,
      s = function() {
        r++;
        if (8 < r) return null;
        if (q[o] || this.prevX && this.prevY && d + n[o].x == this.prevX && e + n[o].y == this.prevY) return o = (8 + (o + (f > h ? g : j))) % 8, s();
        if (!p[1][n[o].y + 1] && !p[n[o].x + 1][1]) return n[o];
        o = (8 + (o + (f > h ? g : j))) % 8;
        return s()
      };
    return s() || {
      x: 0,
      y: 0
    }
  },
  tryWalk: function(a, b, c, d) {
    var e;
    if (-1 == a.x && -1 ==
      a.y) e = 3;
    else if (-1 == a.x && 0 == a.y) e = 4;
    else if (-1 == a.x && 1 == a.y) e = 5;
    else if (0 == a.x && 1 == a.y) e = 6;
    else if (1 == a.x && 1 == a.y) e = 7;
    else if (1 == a.x && 0 == a.y) e = 0;
    else if (1 == a.x && -1 == a.y) e = 1;
    else if (0 == a.x && -1 == a.y) e = 2;
    else if (0 == a.x && 0 == a.y) return !1;
    switch (e) {
      case 0:
        if ("dog" == this.type || "fake" == this.type) {
          if (a = d.getDoor(this.baseX + 1, this.baseY), d.getHitValue(this.baseX + 1, this.baseY, this) || a && !a.isOpen() || this.baseX + 1 == b && this.baseY == c) return !1
        } else if (d.getHitValue(this.baseX + 1, this.baseY, this) || this.baseX + 1 == b &&
          this.baseY == c) return !1;
        break;
      case 1:
        a = d.getDoor(this.baseX + 1, this.baseY - 1);
        if (d.getHitValue(this.baseX + 1, this.baseY - 1, this) || a && !a.isOpen() || this.baseX + 1 == b && this.baseY - 1 == c) return !1;
        a = d.getDoor(this.baseX + 1, this.baseY);
        if (d.getHitValue(this.baseX + 1, this.baseY, this) || a && !a.isOpen() || this.baseX + 1 == b && this.baseY == c) return !1;
        a = d.getDoor(this.baseX, this.baseY - 1);
        if (d.getHitValue(this.baseX, this.baseY - 1, this) || a && !a.isOpen() || this.baseX == b && this.baseY - 1 == c) return !1;
        break;
      case 2:
        if ("dog" == this.type || "fake" ==
          this.type) {
          if (a = d.getDoor(this.baseX, this.baseY - 1), d.getHitValue(this.baseX, this.baseY - 1, this) || a && !a.isOpen() || this.baseX == b && this.baseY - 1 == c) return !1
        } else if (d.getHitValue(this.baseX, this.baseY - 1, this) || this.baseX == b && this.baseY - 1 == c) return !1;
        break;
      case 3:
        a = d.getDoor(this.baseX - 1, this.baseY - 1);
        if (d.getHitValue(this.baseX - 1, this.baseY - 1, this) || a && !a.isOpen() || this.baseX - 1 == b && this.baseY - 1 == c) return !1;
        a = d.getDoor(this.baseX - 1, this.baseY);
        if (d.getHitValue(this.baseX - 1, this.baseY, this) || a && !a.isOpen() ||
          this.baseX - 1 == b && this.baseY == c) return !1;
        a = d.getDoor(this.baseX, this.baseY - 1);
        if (d.getHitValue(this.baseX, this.baseY - 1, this) || a && !a.isOpen() || this.baseX == b && this.baseY - 1 == c) return !1;
        break;
      case 4:
        if ("dog" == this.type || "fake" == this.type) {
          if (a = d.getDoor(this.baseX - 1, this.baseY), d.getHitValue(this.baseX - 1, this.baseY, this) || a && !a.isOpen() || this.baseX - 1 == b && this.baseY == c) return !1
        } else if (d.getHitValue(this.baseX - 1, this.baseY, this) || this.baseX - 1 == b && this.baseY == c) return !1;
        break;
      case 5:
        a = d.getDoor(this.baseX -
          1, this.baseY + 1);
        if (d.getHitValue(this.baseX - 1, this.baseY + 1, this) || a && !a.isOpen() || this.baseX - 1 == b && this.baseY + 1 == c) return !1;
        a = d.getDoor(this.baseX - 1, this.baseY);
        if (d.getHitValue(this.baseX - 1, this.baseY, this) || a && !a.isOpen() || this.baseX - 1 == b && this.baseY == c) return !1;
        a = d.getDoor(this.baseX, this.baseY + 1);
        if (d.getHitValue(this.baseX, this.baseY + 1, this) || a && !a.isOpen() || this.baseX == b && this.baseY + 1 == c) return !1;
        break;
      case 6:
        if ("dog" == this.type || "fake" == this.type) {
          if (a = d.getDoor(this.baseX, this.baseY + 1), d.getHitValue(this.baseX,
              this.baseY + 1, this) || a && !a.isOpen() || this.baseX == b && this.baseY + 1 == c) return !1
        } else if (d.getHitValue(this.baseX, this.baseY + 1, this) || this.baseX == b && this.baseY + 1 == c) return !1;
        break;
      case 7:
        a = d.getDoor(this.baseX + 1, this.baseY + 1);
        if (d.getHitValue(this.baseX + 1, this.baseY + 1, this) || a && !a.isOpen() || this.baseX + 1 == b && this.baseY + 1 == c) return !1;
        a = d.getDoor(this.baseX + 1, this.baseY);
        if (d.getHitValue(this.baseX + 1, this.baseY, this) || a && !a.isOpen() || this.baseX + 1 == b && this.baseY == c) return !1;
        a = d.getDoor(this.baseX, this.baseY +
          1);
        if (d.getHitValue(this.baseX, this.baseY + 1, this) || a && !a.isOpen() || this.baseX == b && this.baseY + 1 == c) return !1;
        break;
      default:
        return !1
    }
    return !0
  },
  selectDodgeDirection: function(a, b, c) {
    if (0 != this.detailX || 0 != this.detailY) return this.direction;
    var a = floor(a),
      b = floor(b),
      d, e = {
        x: 0,
        y: 0
      };
    d = this.action == this.attack ? e : {
      x: -this.direction.x,
      y: -this.direction.y
    };
    var f = a - this.baseX,
      h = b - this.baseY,
      g = [];
    0 < f ? (g[1] = {
      x: 1,
      y: 0
    }, g[3] = {
      x: -1,
      y: 0
    }) : (g[3] = {
      x: 1,
      y: 0
    }, g[1] = {
      x: -1,
      y: 0
    });
    0 < h ? (g[2] = {
      x: 0,
      y: 1
    }, g[4] = {
      x: 0,
      y: -1
    }) : (g[4] = {
      x: 0,
      y: 1
    }, g[2] = {
      x: 0,
      y: -1
    });
    f = abs(f);
    h = abs(h);
    f > h && (h = g[1], g[1] = g[2], g[2] = h, h = g[3], g[3] = g[4], g[4] = h);
    128 > utils.random(256) && (h = g[1], g[1] = g[2], g[2] = h, h = g[3], g[3] = g[4], g[4] = h);
    g[0] = {
      x: 0 == g[1].x ? g[2].x : g[1].x,
      y: 0 == g[1].y ? g[2].y : g[1].y
    };
    for (h = 0; 5 > h; h++)
      if (!(g[h].x == e.x && g[h].y == e.y || g[h].x == d.x && g[h].y == d.y))
        if (f = {
            x: g[h].x,
            y: g[h].y
          }, this.tryWalk(f, a, b, c)) return f;
    return d.x != e.x && d.y != e.y && (f = {
      x: d.x,
      y: d.y
    }, this.tryWalk(f, a, b, c)) ? f : {
      x: e.x,
      y: e.y
    }
  },
  selectChaseDirection: function(a, b, c) {
    if (0 != this.detailX || 0 != this.detailY) return this.direction;
    var a = floor(a),
      b = floor(b),
      d = {
        x: this.direction.x,
        y: this.direction.y
      },
      e = -this.direction.x,
      f = -this.direction.y,
      h = {
        x: 0,
        y: 0
      },
      g = a - this.baseX,
      j = b - this.baseY,
      i = [];
    i[1] = h;
    i[2] = h;
    0 < g ? i[1] = {
      x: 1,
      y: 0
    } : 0 > g && (i[1] = {
      x: -1,
      y: 0
    });
    0 < j ? i[2] = {
      x: 0,
      y: 1
    } : 0 > j && (i[2] = {
      x: 0,
      y: -1
    });
    abs(j) > abs(g) && (g = i[1], i[1] = i[2], i[2] = g);
    this.action == this.attack && (i[1].x == e && i[1].y == f && (i[1] = h), i[2].x == e && i[2].y == f && (i[2] = h));
    if (i[1] != h && (g = {
        x: i[1].x,
        y: i[1].y
      }, this.tryWalk(g, a, b, c)) || i[2] != h && (g = {
        x: i[2].x,
        y: i[2].y
      }, this.tryWalk(g, a, b, c))) return g;
    if (d.x != h.x && d.y != h.y && this.tryWalk(d, a, b, c)) return d;
    d = [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: -1,
      y: 0
    }];
    if (128 < utils.random(256))
      for (i = 0; 4 > i; i++) {
        if (g = d[i], g.x != h.x || g.y != h.y || this.action != this.attack)
          if (g = {
              x: g.x,
              y: g.y
            }, this.tryWalk(g, a, b, c)) return g
      } else
        for (i = 3; 0 <= i; i--)
          if (g = d[i], g.x != h.x && g.y != h.y || this.action != this.attack)
            if (g = {
                x: g.x,
                y: g.y
              }, this.tryWalk(g, a, b, c)) return g;
    return e != h.x && f != h.y && (g = {
      x: e,
      y: f
    }, this.tryWalk(g, a, b, c)) ? g : {
      x: h.x,
      y: h.y
    }
  },
  selectRunDirection: function(a, b, c) {
    if (0 != this.detailX ||
      0 != this.detailY) return this.direction;
    var a = floor(a),
      b = floor(b),
      d = {
        x: this.direction.x,
        y: this.direction.y
      },
      e = -this.direction.x,
      f = -this.direction.y,
      h = {
        x: 0,
        y: 0
      },
      g = a - this.baseX,
      j = b - this.baseY,
      i = [];
    i[1] = h;
    i[2] = h;
    0 > g ? i[1] = {
      x: 1,
      y: 0
    } : 0 < g && (i[1] = {
      x: -1,
      y: 0
    });
    0 > j ? i[2] = {
      x: 0,
      y: 1
    } : 0 < j && (i[2] = {
      x: 0,
      y: -1
    });
    abs(j) > abs(g) && (g = i[1], i[1] = i[2], i[2] = g);
    if (i[1] != h && (g = {
        x: i[1].x,
        y: i[1].y
      }, this.tryWalk(g, a, b, c)) || i[2] != h && (g = {
        x: i[2].x,
        y: i[2].y
      }, this.tryWalk(g, a, b, c))) return g;
    if (d.x != h.x && d.y != h.y && this.tryWalk(d, a, b, c)) return d;
    d = [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: -1,
      y: 0
    }];
    if (128 < utils.random(256))
      for (i = 0; 4 > i; i++) {
        if (g = d[i], g.x != e && g.y != f || this.action != this.attack)
          if (g = {
              x: g.x,
              y: g.y
            }, this.tryWalk(g, a, b, c)) return g
      } else
        for (i = 3; 0 <= i; i--)
          if (g = d[i], g.x != e && g.y != f || this.action != this.attack)
            if (g = {
                x: g.x,
                y: g.y
              }, this.tryWalk(g, a, b, c)) return g;
    return e != h.x && f != h.y && (g = {
      x: e,
      y: f
    }, this.tryWalk(g, a, b, c)) ? g : {
      x: h.x,
      y: h.y
    }
  },
  getDistance: function(a, b) {
    var c = this.x - a,
      d = this.y - b;
    return sqrt(c * c + d * d)
  },
  getDirection: function() {
    var a = 0,
      b = 0;
    switch (this.angle) {
      case 0:
        a =
          1;
        b = 0;
        break;
      case 1:
        a = 1;
        b = -1;
        break;
      case 2:
        a = 0;
        b = -1;
        break;
      case 3:
        b = a = -1;
        break;
      case 4:
        a = -1;
        b = 0;
        break;
      case 5:
        a = -1;
        b = 1;
        break;
      case 6:
        a = 0;
        b = 1;
        break;
      case 7:
        b = a = 1
    }
    this.direction = {
      x: a,
      y: b
    }
  },
  moveForward: function(a, b) {
    var c = a.map;
    this.reset = !1;
    this.detailX >= this.detailLevel && (this.detailX = 0, this.prevX = this.baseX, this.x = this.baseX += this.direction.x, this.reset = !0);
    this.detailY >= this.detailLevel && (this.detailY = 0, this.prevY = this.baseY, this.y = this.baseY += this.direction.y, this.reset = !0);
    if (this.reset && this.action ==
      this.moving) {
      var d = c.getScript(this.baseX, this.baseY);
      if (d && d.action) d[d.action](this)
    }
    this.animate(b);
    if (!this.reset) {
      d = this.animations[this.animations.current];
      ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !d.process && this.animate(b);
      d = !0;
      d = !a.map.hit[this.baseX + this.direction.x][this.baseY + this.direction.y];
      if ("dog" != this.type && "fake" != this.type)
        if (this.action == this.attack) {
          if ("walk" == this.animations.current || "run" == this.animations.current ||
            "ready" == this.animations.current) {
            var e = c.getDoor(this.baseX + this.direction.x, this.baseY),
              f = c.getDoor(this.baseX, this.baseY + this.direction.y);
            if (e && f) {
              if ("open" == e.action) e[e.action]()
            } else if (e && !e.isOpen()) {
              if ("open" == e.action) e[e.action]()
            } else if (f && !f.isOpen() && "open" == f.action) f[f.action]()
          }
        } else if ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current)
        if ((e = c.getDoor(this.baseX + this.direction.x, this.baseY + this.direction.y)) && !e.isOpen() && "open" ==
          e.action) e[e.action]();
      abs(a.x - (this.x + 0.5 + this.direction.x * (this.speed / this.detailLevel) * game.timeFactor)) <= c.hitDistance / 5 && abs(a.y - (this.y + 0.5 + this.direction.y * (this.speed / this.detailLevel) * game.timeFactor)) <= c.hitDistance / 5 && (d = !1);
      if (d) {
        if ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) this.x += this.direction.x * (this.speed / this.detailLevel) * game.timeFactor, this.y += this.direction.y * (this.speed / this.detailLevel) * game.timeFactor, this.detailX += abs(floor(this.direction.x *
          this.speed * game.timeFactor)), this.detailY += abs(floor(this.direction.y * this.speed * game.timeFactor))
      } else this.direction = this.selectChaseDirection(a.x, a.y, a.map)
    }
  },
  checkAttack: function(a) {
    var b = !1,
      c = a.map.floors[this.baseX][this.baseY];
    if (106 != c && !this.instantAttack)
      for (var d = 0; d < scripts.process.length; d++) {
        var e = scripts.process[d],
          f = a.map.floors[floor(e.x)][floor(e.y)];
        if ((!e.visibility || this.isVisible(e.x, e.y, a.map)) && f == c) {
          this.timer = -1;
          this[e.action](a);
          b = !0;
          break
        }
      }!b && this.isVisible(a.x, a.y, a.map) &&
      (this.lookingAt(a.x, a.y) || this.instantAttack || this.getDistance(a.x, a.y) <= sqrt2) ? (this.timer ? this.timer++ : this.timer = 1, this.attack(a)) : this.timer = 0
  },
  ready: function(a) {
    this.attack && this.checkAttack(a);
    a = this.animations[this.animations.current];
    "hit" == this.animations.current && !a.process ? this.animate("ready") : this.animate(this.animations.current)
  },
  moving: function(a) {
    this.attack && this.checkAttack(a);
    this.moveForward(a, this.animations.walk ? "walk" : "run")
  },
  damage: function(a) {
    if (this.hitpoints && "dead" != this.animations.current &&
      this.isVisible(a.x, a.y, a.map)) {
      var b = 0;
      if (0 == a.getActiveWeapon().id) b = utils.random(255) >> 4;
      else {
        var c = abs(floor(a.x) - this.baseX),
          a = abs(floor(a.y) - this.baseY),
          c = c > a ? c : a;
        2 > c ? b = floor(utils.random(255) / 4) : 4 > c ? b = floor(utils.random(255) / 6) : floor(utils.random(255) / 12) >= c && (b = floor(utils.random(255) / 6))
      }
      b && (this.action != this.attack && this.action != this.fire && (b <<= 1), this.hitpoints -= b, 0 > this.hitpoints && (this.hitpoints = 0), this.hitpoints ? this.animations.hit && this.animate("hit") : this.animate("dying"), this.action =
        this.attack)
    }
  },
  process: function(a) {
    this.calculateSlide(a.x, a.y);
    this.action && this.action(a)
  }
});
utils.overwrite(ai.BJ.prototype = Object.create(ai.Entity.prototype), {});
utils.overwrite(ai.Hans.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        b = !1;
        this.timer > ai.tick ? d && (d = abs(floor(a.x) - this.baseX), b = abs(floor(a.y) - this.baseY), d = d > b ? d : b, c = !d || 1 == d && c <= sqrt2 ? 300 : floor(ai.tick << 4 / d), utils.random(255) < c && this.animate("fire"), b = !0) : this.timer++;
        this.reset ? (this.direction = b ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = this.selectDodgeDirection(a.x, a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" ==
          this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" == this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      var b =
        128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = floor(2 * (b > c ? b : c) / 3),
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c : -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("bossfire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health", -damage), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit()));
      this.action =
        this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    var b = this.baseX,
      c = this.baseY;
    if (a.map.getHitValue(b, c, this)) {
      var d = a.map.firstFree(b, c);
      d && (b = d.x, c = d.y)
    }
    a.map.addSprite(new sprites.Sprite(wolf3d.goldKey(b, c)));
    a.setProperty("score", 5E3);
    a.ratio.kill++;
    this.process = this.action = null
  }
});
utils.overwrite(ai.TransGrosse.prototype = Object.create(ai.Hans.prototype), {});
utils.overwrite(ai.UberMutant.prototype = Object.create(ai.Hans.prototype), {});
utils.overwrite(ai.Gretel.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        b = !1;
        this.timer > ai.tick ? d && (d = abs(floor(a.x) - this.baseX), b = abs(floor(a.y) - this.baseY), d = d > b ? d : b, c = !d || 1 == d && c <= sqrt2 ? 300 : floor(ai.tick << 4 / d), utils.random(255) < c && this.animate("fire"), b = !0) : this.timer++;
        this.reset ? (this.direction = b ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = this.selectDodgeDirection(a.x, a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" ==
          this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" == this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      var b =
        128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = floor(2 * (b > c ? b : c) / 3),
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c : -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("bossfire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health", -damage), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit()));
      this.action =
        this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    var b = this.baseX,
      c = this.baseY;
    if (a.map.getHitValue(b, c, this)) {
      var d = a.map.firstFree(b, c);
      d && (b = d.x, c = d.y)
    }
    a.map.addSprite(new sprites.Sprite(wolf3d.goldKey(b, c)));
    a.setProperty("score", 5E3);
    a.ratio.kill++;
    this.process = this.action = null
  }
});
utils.overwrite(ai.DrSchabbs.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        a.getDistance(this.x, this.y);
        var c = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        var b = !1,
          d = abs(floor(a.x) - this.baseX),
          e = abs(floor(a.y) - this.baseY),
          d = d > e ? d : e;
        this.timer > ai.tick ? c && (utils.random(255) < floor(ai.tick << 4 / d) && this.animate("fire"), b = !0) : this.timer++;
        this.reset ? (this.direction = 4 > d ? this.selectRunDirection(a.x, a.y, a.map) : b ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = 4 > d ? this.selectRunDirection(a.x, a.y, a.map) : this.selectDodgeDirection(a.x,
          a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" ==
      this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      audio.queueSound("schabbsthrow", this.baseX, this.baseY);
      var b = floor(a.x) - this.baseX,
        c = floor(a.y) - this.baseY,
        c = (atan2(c, b) * utils.deg + 180) % 360 * utils.rad,
        b = -cos(c),
        c = -sin(c),
        d = ai.calculateAngleFromDirection(0 > b ? ceil(b) : floor(b), 0 > c ? ceil(c) : floor(c));
      a.map.addAI(new ai.Needle({
        eval: "new ai.Needle({ x: " + this.x + ", y: " + this.y + ",direction: { x: " + b + ", y: " + c + " }, angle: " + d + " });",
        x: this.x,
        y: this.y,
        direction: {
          x: b,
          y: c
        },
        angle: d
      }));
      this.action = this.attack
    } else this.action =
      this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    a.setProperty("score", 5E3);
    a.ratio.kill++;
    this.process = this.action = null;
    setTimeout(function() {
      game.auto = null;
      game.pause = !0;
      game.win = !0
    }, 1E3)
  }
});
utils.overwrite(ai.Needle.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    this.animate("run");
    this.x += this.direction.x / this.speed * game.timeFactor;
    this.y += this.direction.y / this.speed * game.timeFactor;
    this.baseX = floor(this.x);
    this.baseY = floor(this.y);
    if (a.map.getMapValue(this.baseX, this.baseY) || this.baseX == floor(a.x) && this.baseY == floor(a.y))
      if (a.map.removeAI(this), ai.process.splice(ai.process.indexOf(this), 1), this.baseX == floor(a.x) && this.baseY == floor(a.y)) {
        var b = (utils.random(255) >>
          3) + 20;
        game.difficulty || (b >>= 1);
        b && (a.setProperty("health", -b), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit())
      }
  }
});
utils.overwrite(ai.Ghost.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        a.getDistance(this.x, this.y);
        var c = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        var b = abs(floor(a.x) - this.baseX),
          d = abs(floor(a.y) - this.baseY),
          b = b > d ? b : d;
        this.timer > ai.tick ? c && utils.random(255) < floor(ai.tick << 4 / b) && this.animate("fire") : this.timer++;
        if (this.reset || 0 == this.direction.x && 0 == this.direction.y) this.direction = this.selectDodgeDirection(a.x, a.y, a.map), this.calculateAngle();
        this.timer > ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action !=
          this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
            x: this.baseX,
            y: this.baseY,
            action: "attack"
          }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" == this.animations.current) {
      audio.queueSound("flamethrower", this.baseX, this.baseY);
      var b = floor(a.x) - this.baseX,
        c = floor(a.y) - this.baseY,
        c = (atan2(c, b) * utils.deg + 180) % 360 * utils.rad,
        b = -cos(c),
        c = -sin(c),
        d = ai.calculateAngleFromDirection(0 >
          b ? ceil(b) : floor(b), 0 > c ? ceil(c) : floor(c));
      a.map.addAI(new ai.Fireball({
        eval: "new ai.Fireball({ x: " + this.x + ", y: " + this.y + ",direction: { x: " + b + ", y: " + c + " }, angle: " + d + " });",
        x: this.x,
        y: this.y,
        direction: {
          x: b,
          y: c
        },
        angle: d
      }));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    a.setProperty("score", 2E3);
    a.ratio.kill++;
    this.process = this.action = null
  }
});
utils.overwrite(ai.Fireball.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    this.animate("run");
    this.x += this.direction.x / this.speed * game.timeFactor;
    this.y += this.direction.y / this.speed * game.timeFactor;
    this.baseX = floor(this.x);
    this.baseY = floor(this.y);
    if (a.map.getMapValue(this.baseX, this.baseY) || this.baseX == floor(a.x) && this.baseY == floor(a.y))
      if (a.map.removeAI(this), ai.process.splice(ai.process.indexOf(this), 1), this.baseX == floor(a.x) && this.baseY == floor(a.y)) {
        var b = floor((utils.random(255) >>
          3) / 3);
        game.difficulty || (b >>= 1);
        b && (a.setProperty("health", -b), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit())
      }
  }
});
utils.overwrite(ai.AngelOfDeath.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) &&
        !b.process && this.animate("run");
        var b = !1,
          e = abs(floor(a.x) - this.baseX),
          f = abs(floor(a.y) - this.baseY),
          e = e > f ? e : f;
        this.timer > ai.tick ? d && (e = abs(floor(a.x) - this.baseX), f = abs(floor(a.y) - this.baseY), e = e > f ? e : f, c = !e || 1 == e && c <= sqrt2 ? 300 : floor(ai.tick << 4 / e), utils.random(255) < c && this.animate("fire"), b = !0) : this.timer++;
        this.reset ? (this.direction = b ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = this.selectDodgeDirection(a.x,
          a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" ==
      this.animations.current) {
      audio.queueSound("angelfire", this.baseX, this.baseY);
      var b = floor(a.x) - this.baseX,
        c = floor(a.y) - this.baseY,
        c = (atan2(c, b) * utils.deg + 180) % 360 * utils.rad,
        b = -cos(c),
        c = -sin(c),
        d = ai.calculateAngleFromDirection(0 > b ? ceil(b) : floor(b), 0 > c ? ceil(c) : floor(c));
      a.map.addAI(new ai.Orb({
        eval: "new ai.Orb({ x: " + this.x + ", y: " + this.y + ",direction: { x: " + b + ", y: " + c + " }, angle: " + d + " });",
        x: this.x,
        y: this.y,
        direction: {
          x: b,
          y: c
        },
        angle: d
      }));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    a.setProperty("score", 5E3);
    a.ratio.kill++;
    this.process = this.action = null;
    setTimeout(function() {
      game.auto = null;
      game.pause = !0;
      game.win = !0
    }, 1E3)
  }
});
utils.overwrite(ai.Orb.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    this.animate("run");
    this.x += this.direction.x / this.speed * game.timeFactor;
    this.y += this.direction.y / this.speed * game.timeFactor;
    this.baseX = floor(this.x);
    this.baseY = floor(this.y);
    if (a.map.getMapValue(this.baseX, this.baseY) || this.baseX == floor(a.x) && this.baseY == floor(a.y))
      if (a.map.removeAI(this), ai.process.splice(ai.process.indexOf(this), 1), this.baseX == floor(a.x) && this.baseY == floor(a.y)) {
        var b = floor(utils.random(255) >>
          3);
        game.difficulty || (b >>= 1);
        b && (a.setProperty("health", -b), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit())
      }
  }
});
utils.overwrite(ai.MechHitler.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) &&
        !b.process && this.animate("run");
        b = !1;
        this.timer > ai.tick ? d && (d = abs(floor(a.x) - this.baseX), b = abs(floor(a.y) - this.baseY), d = d > b ? d : b, c = !d || 1 == d && c <= sqrt2 ? 300 : floor(ai.tick << 4 / d), utils.random(255) < c && this.animate("fire"), b = !0) : this.timer++;
        this.reset ? (this.direction = b ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = this.selectDodgeDirection(a.x, a.y, a.map), this.calculateAngle());
        this.timer >
          ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" == this.animations.current && this.isVisible(a.x,
        a.y, a.map)) {
      var b = 128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = floor(2 * (b > c ? b : c) / 3),
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c : -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("bossfire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health", -damage), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit()));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    var b = new ai.Hitler({
      x: this.baseX,
      y: this.baseY,
      action: "ready",
      animations: {
        current: "ready"
      }
    });
    b.x = this.x;
    b.y = this.y;
    b.detailX = this.detailX;
    b.detailY = this.detailY;
    b.direction = {
      x: this.direction.x,
      y: this.direction.y
    };
    a.map.ai.push(b);
    this.hit = !1;
    this.direction = {
      x: 0,
      y: 0
    };
    a.setProperty("score", 5E3);
    this.process = this.action = null
  }
});
utils.overwrite(ai.Hitler.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        b = !1;
        this.timer > ai.tick ? d && (d = abs(floor(a.x) - this.baseX), b = abs(floor(a.y) - this.baseY), d = d > b ? d : b, c = !d || 1 == d && c <= sqrt2 ? 300 : floor(ai.tick << 4 / d), utils.random(255) < c && this.animate("fire"), b = !0) : this.timer++;
        this.reset ? (this.direction = b ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = this.selectDodgeDirection(a.x, a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" ==
          this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" == this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      var b =
        128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = floor(2 * (b > c ? b : c) / 3),
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c : -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("bossfire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health", -damage), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit()));
      this.action =
        this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    a.setProperty("score", 5E3);
    a.ratio.kill++;
    this.process = this.action = null;
    setTimeout(function() {
      game.auto = null;
      game.pause = !0;
      game.win = !0
    }, 1E3)
  }
});
utils.overwrite(ai.Giftmacher.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        a.getDistance(this.x, this.y);
        var c = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) &&
        !b.process && this.animate("run");
        var d = !1,
          e = abs(floor(a.x) - this.baseX),
          f = abs(floor(a.y) - this.baseY),
          b = e > f ? e : f;
        this.timer > ai.tick ? c && (utils.random(255) < floor(ai.tick << 4 / b) && ("fire" != this.animations.current && (audio.queueSound("missilefire", this.baseX, this.baseY), e = floor(a.x) - this.baseX, f = floor(a.y) - this.baseY, d = (atan2(f, e) * utils.deg + 180) % 360 * utils.rad, c = -cos(d), d = -sin(d), e = ai.calculateAngleFromDirection(0 > c ? ceil(c) : floor(c), 0 > d ? ceil(d) : floor(d)), a.map.addAI(new ai.Missile({
          eval: "new ai.Missile({ x: " +
            this.x + ", y: " + this.y + ",direction: { x: " + c + ", y: " + d + " }, animations: { current: 'run' }, angle: " + e + " });",
          x: this.x,
          y: this.y,
          direction: {
            x: c,
            y: d
          },
          animations: {
            current: "run"
          },
          angle: e
        }))), this.animate("fire")), d = !0) : this.timer++;
        this.reset ? (this.direction = 4 > b ? this.selectRunDirection(a.x, a.y, a.map) : d ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = 4 > b ? this.selectRunDirection(a.x, a.y, a.map) :
          this.selectDodgeDirection(a.x, a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  dead: function(a) {
    a.setProperty("score", 5E3);
    a.ratio.kill++;
    this.process = this.action = null;
    setTimeout(function() {
      game.auto = null;
      game.pause = !0;
      game.win = !0
    }, 1E3)
  }
});
utils.overwrite(ai.Missile.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if ("run" == this.animations.current) {
      if (!this.smokeInterval) {
        var b = this;
        this.smokeInterval = setInterval(function() {
          var c = new ai.Smoke({
            x: b.baseX,
            y: b.baseY,
            animations: {
              current: "smoke"
            }
          });
          a.map.ai.push(c)
        }, 30)
      }
      this.x += this.direction.x / this.speed * game.timeFactor;
      this.y += this.direction.y / this.speed * game.timeFactor;
      this.baseX = floor(this.x);
      this.baseY = floor(this.y);
      if (a.map.getMapValue(this.baseX, this.baseY) || this.baseX ==
        floor(a.x) && this.baseY == floor(a.y))
        if (this.smokeInterval && (clearInterval(this.smokeInterval), this.smokeInterval = null), this.animate("explode"), this.baseX == floor(a.x) && this.baseY == floor(a.y)) {
          var c = (utils.random(255) >> 3) + 30;
          game.difficulty || (c >>= 1);
          c && (a.setProperty("health", -c), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit())
        }
    } else this.animate("explode")
  },
  dead: function(a) {
    this.process = this.action = null;
    a.map.removeAI(this);
    ai.process.splice(ai.process.indexOf(this), 1)
  }
});
utils.overwrite(ai.HiMissile.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if ("run" == this.animations.current) {
      if (!this.smokeInterval) {
        var b = this;
        this.smokeInterval = setInterval(function() {
          var c = new ai.HiSmoke({
            x: b.baseX,
            y: b.baseY,
            animations: {
              current: "smoke"
            }
          });
          a.map.ai.push(c)
        }, 30)
      }
      this.x += this.direction.x / this.speed * game.timeFactor;
      this.y += this.direction.y / this.speed * game.timeFactor;
      this.baseX = floor(this.x);
      this.baseY = floor(this.y);
      if (a.map.getMapValue(this.baseX, this.baseY) || this.baseX ==
        floor(a.x) && this.baseY == floor(a.y))
        if (this.smokeInterval && (clearInterval(this.smokeInterval), this.smokeInterval = null), this.animate("explode"), this.baseX == floor(a.x) && this.baseY == floor(a.y)) {
          var c = (utils.random(255) >> 3) + 30;
          game.difficulty || (c >>= 1);
          c && (a.setProperty("health", -c), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit())
        }
    } else this.animate("explode")
  },
  dead: function(a) {
    this.process = this.action = null;
    a.map.removeAI(this);
    ai.process.splice(ai.process.indexOf(this), 1)
  }
});
utils.overwrite(ai.Smoke.prototype = Object.create(ai.Entity.prototype), {
  smoke: function() {
    this.animate("smoke")
  },
  dead: function(a) {
    this.process = this.action = null;
    a.map.removeAI(this);
    ai.process.splice(ai.process.indexOf(this), 1)
  }
});
utils.overwrite(ai.HiSmoke.prototype = Object.create(ai.Smoke.prototype), {});
utils.overwrite(ai.Fettgesicht.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        a.getDistance(this.x, this.y);
        var c = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) &&
        !b.process && this.animate("run");
        var d = !1,
          e = abs(floor(a.x) - this.baseX),
          f = abs(floor(a.y) - this.baseY),
          b = e > f ? e : f;
        this.timer > ai.tick ? c && (utils.random(255) < floor(ai.tick << 4 / b) && ("fire" != this.animations.current && (audio.queueSound("missilefire", this.baseX, this.baseY), e = floor(a.x) - this.baseX, f = floor(a.y) - this.baseY, d = (atan2(f, e) * utils.deg + 180) % 360 * utils.rad, c = -cos(d), d = -sin(d), e = ai.calculateAngleFromDirection(0 > c ? ceil(c) : floor(c), 0 > d ? ceil(d) : floor(d)), a.map.addAI(new ai.Missile({
          eval: "new ai.Missile({ x: " +
            this.x + ", y: " + this.y + ",direction: { x: " + c + ", y: " + d + " }, animations: { current: 'run' }, angle: " + e + " });",
          x: this.x,
          y: this.y,
          direction: {
            x: c,
            y: d
          },
          animations: {
            current: "run"
          },
          angle: e
        }))), this.animate("fire")), d = !0) : this.timer++;
        this.reset ? (this.direction = 4 > b ? this.selectRunDirection(a.x, a.y, a.map) : d ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = 4 > b ? this.selectRunDirection(a.x, a.y, a.map) :
          this.selectDodgeDirection(a.x, a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" == this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      var b = 128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = floor(2 * (b > c ? b : c) / 3),
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c : -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("bossfire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health",
        -damage), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit()));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    a.setProperty("score", 5E3);
    a.ratio.kill++;
    this.process = this.action = null;
    setTimeout(function() {
      game.auto = null;
      game.pause = !0;
      game.win = !0
    }, 1E3)
  }
});
utils.overwrite(ai.BarnacleWilhelm.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        a.getDistance(this.x, this.y);
        var c = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) &&
        !b.process && this.animate("run");
        var d = !1,
          e = abs(floor(a.x) - this.baseX),
          f = abs(floor(a.y) - this.baseY),
          b = e > f ? e : f;
        this.timer > ai.tick ? c && (utils.random(255) < floor(ai.tick << 4 / b) && ("fire" != this.animations.current && (audio.queueSound("missilefire", this.baseX, this.baseY), e = floor(a.x) - this.baseX, f = floor(a.y) - this.baseY, d = (atan2(f, e) * utils.deg + 180) % 360 * utils.rad, c = -cos(d), d = -sin(d), e = ai.calculateAngleFromDirection(0 > c ? ceil(c) : floor(c), 0 > d ? ceil(d) : floor(d)), a.map.addAI(new ai.Missile({
          eval: "new ai.Missile({ x: " +
            this.x + ", y: " + this.y + ",direction: { x: " + c + ", y: " + d + " }, animations: { current: 'run' }, angle: " + e + " });",
          x: this.x,
          y: this.y,
          direction: {
            x: c,
            y: d
          },
          animations: {
            current: "run"
          },
          angle: e
        }))), this.animate("fire")), d = !0) : this.timer++;
        this.reset ? (this.direction = 4 > b ? this.selectRunDirection(a.x, a.y, a.map) : d ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = 4 > b ? this.selectRunDirection(a.x, a.y, a.map) :
          this.selectDodgeDirection(a.x, a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" == this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      var b = 128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = floor(2 * (b > c ? b : c) / 3),
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c : -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("nazifire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health",
        -damage), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit()));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    var b = this.baseX,
      c = this.baseY;
    if (a.map.getHitValue(b, c, this)) {
      var d = a.map.firstFree(b, c);
      d && (b = d.x, c = d.y)
    }
    a.map.addSprite(new sprites.Sprite(wolf3d.goldKey(b, c)));
    a.setProperty("score", 5E3);
    a.ratio.kill++;
    this.process = this.action = null
  }
});
utils.overwrite(ai.DeathKnight.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        a.getDistance(this.x, this.y);
        var c = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) &&
        !b.process && this.animate("run");
        var d = !1,
          e = abs(floor(a.x) - this.baseX),
          f = abs(floor(a.y) - this.baseY),
          b = e > f ? e : f;
        this.timer > ai.tick ? c && (utils.random(255) < floor(ai.tick << 4 / b) && ("fire" != this.animations.current && (audio.queueSound("knightmissile", this.baseX, this.baseY), e = floor(a.x) - this.baseX, f = floor(a.y) - this.baseY, d = (atan2(f, e) * utils.deg + 180) % 360 * utils.rad, c = -cos(d), d = -sin(d), e = ai.calculateAngleFromDirection(0 > c ? ceil(c) : floor(c), 0 > d ? ceil(d) : floor(d)), a.map.addAI(new ai.Missile({
          eval: "new ai.Missile({ x: " +
            this.x + ", y: " + this.y + ",direction: { x: " + c + ", y: " + d + " }, animations: { current: 'run' }, angle: " + e + " });",
          x: this.x,
          y: this.y,
          direction: {
            x: c,
            y: d
          },
          animations: {
            current: "run"
          },
          angle: e
        }))), this.animate("fire")), d = !0) : this.timer++;
        this.reset ? (this.direction = 4 > b ? this.selectRunDirection(a.x, a.y, a.map) : d ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = 4 > b ? this.selectRunDirection(a.x, a.y, a.map) :
          this.selectDodgeDirection(a.x, a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" == this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      var b = 128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = floor(2 * (b > c ? b : c) / 3),
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c : -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("nazifire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health",
        -damage), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit()));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    var b = this.baseX,
      c = this.baseY;
    if (a.map.getHitValue(b, c, this)) {
      var d = a.map.firstFree(b, c);
      d && (b = d.x, c = d.y)
    }
    a.map.addSprite(new sprites.Sprite(wolf3d.goldKey(b, c)));
    a.setProperty("score", 5E3);
    a.ratio.kill++;
    this.process = this.action = null
  }
});
utils.overwrite(ai.Pacman.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        d && c <= sqrt2 && (a.setProperty("health", -utils.random(255) >> 4), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit());
        if (this.reset || 0 == this.direction.x && 0 == this.direction.y) this.direction = this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle();
        ("run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run")
      }
      this.action != this.attack && (this.action = this.attack);
      this.timer = -1
    } else this.animate(this.animations.current)
  }
});
utils.overwrite(ai.Spectre.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        if (d && (c <= sqrt2 && (a.setProperty("health", -utils.random(255) >> 8), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit()), this.action != this.attack && this.action != this.fire && this.soundOnAttack)) audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        });
        if (this.reset || 0 == this.direction.x && 0 == this.direction.y) this.direction = this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle();
        ("run" == this.animations.current ||
          "ready" == this.animations.current) && this.moveForward(a, "run")
      }
      this.action != this.attack && (this.action = this.attack);
      this.timer = -1
    } else this.animate(this.animations.current)
  }
});
utils.overwrite(ai.Soldier.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        var e = !1;
        this.timer > ai.tick && ("hit" != this.animations.current || "hit" == this.animations.current && !b.process) ? d && (b = abs(floor(a.x) - this.baseX), d = abs(floor(a.y) - this.baseY), b = b > d ? b : d, c = !b || 1 == b && c <= sqrt2 ? 300 : floor(ai.tick << 4 / b), utils.random(255) < c && this.animate("fire"), e = !0) : this.timer++;
        this.reset ? (this.direction = e ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = this.selectDodgeDirection(a.x,
          a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" ==
      this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      var b = 128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = b > c ? b : c,
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c : -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("nazifire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health", -damage), 0 >= a.health && (a.deathCam =
        this), wolf3d.utils.flashHit()));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    var b = this.baseX,
      c = this.baseY;
    if (a.map.getHitValue(b, c, this)) {
      var d = a.map.firstFree(b, c);
      d && (b = d.x, c = d.y)
    }
    a.map.addSprite(new sprites.Sprite(wolf3d.utils.ammo(b, c, 4, 26, "getammo")));
    a.setProperty("score", 100);
    a.ratio.kill++;
    this.process = this.action = null
  }
});
utils.overwrite(ai.SS.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        var e = !1;
        this.timer > ai.tick && ("hit" != this.animations.current || "hit" == this.animations.current && !b.process) ? d && (b = abs(floor(a.x) - this.baseX), d = abs(floor(a.y) - this.baseY), b = b > d ? b : d, c = !b || 1 == b && c <= sqrt2 ? 300 : floor(ai.tick << 4 / b), utils.random(255) < c && this.animate("fire"), e = !0) : this.timer++;
        this.reset ? (this.direction = e ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = this.selectDodgeDirection(a.x,
          a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" ==
      this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      var b = 128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = floor(2 * (b > c ? b : c) / 3),
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c : -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("ssfire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health", -damage), 0 >= a.health &&
        (a.deathCam = this), wolf3d.utils.flashHit()));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    var b = this.baseX,
      c = this.baseY;
    if (a.map.getHitValue(b, c, this)) {
      var d = a.map.firstFree(b, c);
      d && (b = d.x, c = d.y)
    }
    a.hasWeapon(wolf3d.utils.weapons.machineGun.id) ? a.map.addSprite(new sprites.Sprite(wolf3d.utils.ammo(b, c, 4, 26, "getammo"))) : a.map.addSprite(new sprites.Sprite(wolf3d.machineGun(b, c)));
    a.setProperty("score", 500);
    a.ratio.kill++;
    this.process = this.action =
      null
  }
});
utils.overwrite(ai.Mutant.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        var e = !1;
        if (d && ("hit" != this.animations.current || "hit" == this.animations.current && !b.process)) b = abs(floor(a.x) - this.baseX), d = abs(floor(a.y) - this.baseY), b = b > d ? b : d, c = !b || 1 == b && c <= sqrt2 ? 300 : floor(ai.tick << 4 / b), utils.random(255) < c && this.animate("fire"), e = !0;
        this.reset ? (this.direction = e ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = this.selectDodgeDirection(a.x, a.y, a.map),
          this.calculateAngle());
        ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run")
      }
      this.action != this.attack && (this.action = this.attack);
      this.timer = -1
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" == this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      var b = 128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = b > c ? b : c,
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c :
        -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("nazifire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health", -damage), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit()));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    var b = this.baseX,
      c = this.baseY;
    if (a.map.getHitValue(b, c, this)) {
      var d =
        a.map.firstFree(b, c);
      d && (b = d.x, c = d.y)
    }
    a.map.addSprite(new sprites.Sprite(wolf3d.utils.ammo(b, c, 4, 26, "getammo")));
    a.setProperty("score", 700);
    a.ratio.kill++;
    this.process = this.action = null
  }
});
utils.overwrite(ai.Officer.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        var c = a.getDistance(this.x, this.y),
          d = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        var e = !1;
        this.timer > ai.tick && ("hit" != this.animations.current || "hit" == this.animations.current && !b.process) ? d && (b = abs(floor(a.x) - this.baseX), d = abs(floor(a.y) - this.baseY), b = b > d ? b : d, c = !b || 1 == b && c <= sqrt2 ? 300 : floor(ai.tick << 4 / b), utils.random(255) < c && this.animate("fire"), e = !0) : this.timer++;
        this.reset ? (this.direction = e ? this.selectDodgeDirection(a.x, a.y, a.map) : this.selectChaseDirection(a.x, a.y, a.map), this.calculateAngle()) : 0 == this.direction.x && 0 == this.direction.y && (this.direction = this.selectDodgeDirection(a.x,
          a.y, a.map), this.calculateAngle());
        this.timer > ai.tick && ("walk" == this.animations.current || "run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack)
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" ==
      this.animations.current && this.isVisible(a.x, a.y, a.map)) {
      var b = 128,
        b = abs(floor(a.x) - this.baseX),
        c = abs(floor(a.y) - this.baseY),
        c = b > c ? b : c,
        b = a.speed.move > a.min.speed.move ? -1 < a.fireBuffer.indexOf(this) ? 160 - 16 * c : 160 - 8 * c : -1 < a.fireBuffer.indexOf(this) ? 256 - 16 * c : 256 - 8 * c;
      audio.queueSound("nazifire", this.baseX, this.baseY);
      utils.random(255) < b && (damage = 2 > c ? utils.random(255) >> 2 : 4 > c ? utils.random(255) >> 3 : utils.random(255) >> 4, game.difficulty || (damage >>= 1), damage && (a.setProperty("health", -damage), 0 >= a.health && (a.deathCam =
        this), wolf3d.utils.flashHit()));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    var b = this.baseX,
      c = this.baseY;
    if (a.map.getHitValue(b, c, this)) {
      var d = a.map.firstFree(b, c);
      d && (b = d.x, c = d.y)
    }
    a.map.addSprite(new sprites.Sprite(wolf3d.utils.ammo(b, c, 4, 26, "getammo")));
    a.setProperty("score", 400);
    a.ratio.kill++;
    this.process = this.action = null
  }
});
utils.overwrite(ai.Dog.prototype = Object.create(ai.Entity.prototype), {
  attack: function(a) {
    if (0 > this.timer || 5 < this.timer || this.action == this.attack) {
      var b = this.animations[this.animations.current];
      if ("dying" == this.animations.current || "dead" == this.animations.current) this.animate(this.animations.current);
      else {
        this.lookingAt(a.x, a.y);
        a.getDistance(this.x, this.y);
        var c = this.isVisible(a.x, a.y, a.map);
        ("hit" == this.animations.current || "ready" == this.animations.current || "fire" == this.animations.current) && !b.process &&
          this.animate("run");
        var b = abs(floor(a.x) - this.baseX),
          d = abs(floor(a.y) - this.baseY);
        c && 2 > b && 2 > d && this.animate("fire");
        if (this.reset || 0 == this.direction.x && 0 == this.direction.y) this.direction = this.selectDodgeDirection(a.x, a.y, a.map), this.calculateAngle();
        ("run" == this.animations.current || "ready" == this.animations.current) && this.moveForward(a, "run");
        this.action != this.attack && this.action != this.fire && this.soundOnAttack && (audio.queueSound(this.soundOnAttack, this.baseX, this.baseY), scripts.process.push({
          x: this.baseX,
          y: this.baseY,
          action: "attack"
        }))
      }
      this.action != this.attack && (this.action = this.attack);
      this.timer = -1
    } else this.animate(this.animations.current)
  },
  fire: function(a) {
    if ("fire" == this.animations.current) {
      var b = this.isVisible(a.x, a.y, a.map),
        c = abs(floor(a.x) - this.baseX),
        d = abs(floor(a.y) - this.baseY);
      b && 2 > c && 2 > d && (audio.queueSound("dogattack", this.baseX, this.baseY), 180 > utils.random(255) && (b = utils.random(255) >> 4, game.difficulty || (b >>= 1), b && (a.setProperty("health", -b), 0 >= a.health && (a.deathCam = this), wolf3d.utils.flashHit())));
      this.action = this.attack
    } else this.action = this.attack, this.animate(this.animations.current)
  },
  dead: function(a) {
    a.setProperty("score", 200);
    a.ratio.kill++;
    this.process = this.action = null
  }
});
wolf3d = {
  graphics: {
    width: 640,
    height: 480
  },
  utils: {
    flash: function(a, b, c) {
      var d = document.getElementById("view");
      d.flashColor = [a, b, c];
      d.flashState = 0;
      d.flash = !0
    },
    clearFlash: function() {
      var a = document.getElementById("view");
      a.flashColor = null;
      a.flashState = 0;
      a.flash = !1
    },
    flashHit: function() {
      wolf3d.utils.flash(170, 0, 0)
    },
    flashAddon: function() {
      wolf3d.utils.flash(255, 255, 0)
    },
    addon: function(a, b, c, d, e, f, h) {
      return {
        x: a,
        y: b,
        texture: e,
        eval: utils.eval("wolf3d.utils.addon", arguments),
        listeners: {
          hit: function(a) {
            d && a.setProperty(c,
              d) && (h && h.call(a), f && audio.playSound(f, null, !0), wolf3d.utils.flashAddon(), a.map.removeSprite(this))
          }
        }
      }
    },
    ammo: function(a, b, c, d, e) {
      return {
        x: a,
        y: b,
        texture: d,
        eval: utils.eval("wolf3d.utils.ammo", arguments),
        listeners: {
          hit: function(a) {
            if (c) {
              var b = !1;
              0 == a.ammo && (b = !0);
              a.setProperty("ammo", c) && (e && audio.playSound(e, null, !0), wolf3d.utils.flashAddon(), a.map.removeSprite(this), b && a.weapon(a.backupWeapon.id))
            }
          }
        }
      }
    },
    health: function(a, b, c, d, e) {
      return wolf3d.utils.addon(a, b, "health", c, d, e)
    },
    treasure: function(a, b,
      c, d, e) {
      return wolf3d.utils.addon(a, b, "score", c, d, e, function() {
        this.ratio.treasure++
      })
    },
    weapons: {
      knife: {
        id: 0,
        active: !1,
        resource: "knife",
        animation: {
          speed: 1,
          count: 5,
          step: resources.textureWidth,
          single: !0,
          callback: function(a) {
            this.activeWeapon.renderHand();
            if (a.index == a.count - 1) {
              audio.playSound("atkknife");
              for (a = 1; a < wolf3d.graphics.width / 8; a++) {
                var b = this.fireBuffer[wolf3d.graphics.width / 2 + a];
                if (b && b.damage && 2 > this.getDistance(b.x, b.y)) {
                  b.damage(this, 25 + floor(a / 2));
                  break
                }
                if ((b = this.fireBuffer[wolf3d.graphics.width /
                    2 - a]) && b.damage && 2 > this.getDistance(b.x, b.y)) {
                  b.damage(this, 25 + floor(a / 2));
                  break
                }
              }
            }
          }
        }
      },
      pistol: {
        id: 1,
        active: !0,
        ammo: !0,
        resource: "pistol",
        animation: {
          speed: 1,
          count: 5,
          step: resources.textureWidth,
          single: !0,
          callback: function(a) {
            this.activeWeapon.renderHand();
            if (a.index == a.count - 1) {
              this.setProperty("ammo", -1);
              audio.playSound("atkpistol");
              scripts.process.push({
                x: this.x,
                y: this.y,
                action: "attack"
              });
              for (var b = 1; b < wolf3d.graphics.width / 8; b++) {
                var c = wolf3d.graphics.width / 2 + b;
                if (this.fireBuffer[c] && this.fireBuffer[c].damage) {
                  this.fireBuffer[c].damage(this,
                    floor(b / 2));
                  break
                }
                c = wolf3d.graphics.width / 2 - b;
                if (this.fireBuffer[c] && this.fireBuffer[c].damage) {
                  this.fireBuffer[c].damage(this, floor(b / 2));
                  break
                }
              }
            }
            0 == this.ammo && 0 == a.index && this.weapon(0)
          }
        }
      },
      machineGun: {
        id: 2,
        active: !1,
        ammo: !0,
        resource: "machinegun",
        fire: function(a) {
          this.animation.stepForward();
          3 == this.animation.index && 0 < a.ammo && (this.animation.index = 1);
          return 0 == a.ammo && 0 == this.animation.index
        },
        release: function() {
          this.animation.stepForward();
          return 0 == this.animation.index
        },
        animation: {
          speed: 2,
          count: 5,
          step: resources.textureWidth,
          single: !0,
          callback: function(a) {
            this.activeWeapon.renderHand();
            if (2 == a.index) {
              this.setProperty("ammo", -1);
              audio.playSound("atkmachinegun");
              scripts.process.push({
                x: this.x,
                y: this.y,
                action: "attack"
              });
              for (var b = 1; b < wolf3d.graphics.width / 8; b++) {
                var c = wolf3d.graphics.width / 2 + b;
                if (this.fireBuffer[c] && this.fireBuffer[c].damage) {
                  this.fireBuffer[c].damage(this, floor(b / 2));
                  break
                }
                c = wolf3d.graphics.width / 2 - b;
                if (this.fireBuffer[c] && this.fireBuffer[c].damage) {
                  this.fireBuffer[c].damage(this,
                    floor(b / 2));
                  break
                }
              }
            }
            0 == this.ammo && 0 == a.index && this.weapon(0)
          }
        }
      },
      gatling: {
        id: 3,
        active: !1,
        ammo: !0,
        resource: "gatling",
        fire: function(a) {
          this.animation.stepForward();
          3 == this.animation.index && 0 < a.ammo && (this.animation.index = 1);
          return 0 == a.ammo && 0 == this.animation.index
        },
        release: function() {
          this.animation.stepForward();
          return 0 == this.animation.index
        },
        animation: {
          speed: 3,
          count: 5,
          step: resources.textureWidth,
          single: !0,
          callback: function(a) {
            this.activeWeapon.renderHand();
            if (2 == a.index || 3 == a.index) {
              this.setProperty("ammo",
                -1);
              audio.playSound("atkgatling", 0.5);
              scripts.process.push({
                x: this.x,
                y: this.y,
                action: "attack"
              });
              for (var b = 1; b < wolf3d.graphics.width / 8; b++) {
                var c = wolf3d.graphics.width / 2 + b;
                if (this.fireBuffer[c] && this.fireBuffer[c].damage) {
                  this.fireBuffer[c].damage(this, floor(b / 2));
                  break
                }
                c = wolf3d.graphics.width / 2 - b;
                if (this.fireBuffer[c] && this.fireBuffer[c].damage) {
                  this.fireBuffer[c].damage(this, floor(b / 2));
                  break
                }
              }
            }
            0 == this.ammo && 0 == a.index && this.weapon(0)
          }
        }
      }
    }
  },
  goldKey: function(a, b) {
    return {
      x: a,
      y: b,
      texture: 20,
      eval: utils.eval("wolf3d.goldKey",
        arguments),
      listeners: {
        hit: function(a) {
          a.keys.has("gold") || (a.keys.add("gold"), audio.playSound("getkey", null, !0), wolf3d.utils.flashAddon(), a.map.removeSprite(this))
        }
      }
    }
  },
  silverKey: function(a, b) {
    return {
      x: a,
      y: b,
      texture: 21,
      eval: utils.eval("wolf3d.silverKey", arguments),
      listeners: {
        hit: function(a) {
          a.keys.has("silver") || (a.keys.add("silver"), audio.playSound("getkey", null, !0), wolf3d.utils.flashAddon(), a.map.removeSprite(this))
        }
      }
    }
  },
  ammo: function(a, b) {
    return wolf3d.utils.ammo(a, b, 8, 26, "getammo")
  },
  ammoBox: function(a,
    b) {
    return {
      x: a,
      y: b,
      texture: 49,
      eval: utils.eval("wolf3d.ammoBox", arguments),
      resource: "sod-sprites",
      listeners: {
        hit: function(a) {
          var b = !1;
          0 == a.ammo && (b = !0);
          a.setProperty("ammo", 25) && (audio.playSound("getammobox", null, !0), wolf3d.utils.flashAddon(), a.map.removeSprite(this), b && a.weapon(a.backupWeapon.id))
        }
      }
    }
  },
  food: function(a, b) {
    return wolf3d.utils.health(a, b, 10, 24, "health1")
  },
  dogfood: function(a, b) {
    return wolf3d.utils.health(a, b, 4, 6, "health1")
  },
  firstAidKit: function(a, b) {
    return wolf3d.utils.health(a, b, 25, 25,
      "health2")
  },
  cross: function(a, b) {
    return wolf3d.utils.treasure(a, b, 100, 29, "bonus1")
  },
  chalice: function(a, b) {
    return wolf3d.utils.treasure(a, b, 500, 30, "bonus2")
  },
  chest: function(a, b) {
    return wolf3d.utils.treasure(a, b, 1E3, 31, "bonus3")
  },
  crown: function(a, b) {
    return wolf3d.utils.treasure(a, b, 5E3, 32, "bonus4")
  },
  extraLife: function(a, b) {
    return {
      x: a,
      y: b,
      texture: 33,
      eval: utils.eval("wolf3d.extraLife", arguments),
      listeners: {
        hit: function(a) {
          a.setProperty("lives", 1) && (a.setProperty("health", 100), audio.playSound("bonus1up",
            null, !0), wolf3d.utils.flashAddon(), a.map.removeSprite(this))
        }
      }
    }
  },
  bloodBones: function(a, b) {
    return {
      x: a,
      y: b,
      texture: 34,
      eval: utils.eval("wolf3d.bloodBones", arguments),
      listeners: {
        hit: function(a) {
          10 > a.health && a.setProperty("health", 1) && (audio.playSound("slurpie", null, !0), wolf3d.utils.flashAddon(), a.map.removeSprite(this))
        }
      }
    }
  },
  bloodPool: function(a, b) {
    return {
      x: a,
      y: b,
      texture: 38,
      eval: utils.eval("wolf3d.bloodPool", arguments),
      listeners: {
        hit: function(a) {
          10 > a.health && a.setProperty("health", 1) && (audio.playSound("slurpie",
            null, !0), wolf3d.utils.flashAddon(), a.map.removeSprite(this))
        }
      }
    }
  },
  spearOfDestiny: function(a, b) {
    return {
      x: a,
      y: b,
      texture: 51,
      eval: utils.eval("wolf3d.spearOfDestiny", arguments),
      listeners: {
        hit: function() {
          audio.stopMusic();
          doors.process = [];
          secret.process = [];
          animation.process = [];
          ai.process = [];
          audio.process = [];
          game.mapName = "e7m21";
          maps.request(game.mapName, function() {
            game.levelConfig = wolf3d.maps[game.mapName];
            game.level = new maps.Map(utils.clone(game.levelConfig), game.difficulty);
            game.client.map = game.level;
            game.client.speed = {
              rotation: 0.1,
              move: 0.2
            };
            game.client.floor = game.levelConfig.episodeFloor;
            game.client.textValue(document.getElementById("floor"), game.client.floor);
            game.client.time = null;
            game.client.render();
            game.client.max.speed = {
              rotation: 0.15,
              move: 0.35
            };
            game.ctrl.activeKey = {};
            game.ctrl.inactiveKey = {};
            wolf3d.utils.clearFlash();
            game.engine.map = game.level;
            game.engine.backgroundRender();
            game.engine.render()
          })
        }
      }
    }
  },
  deadGuard: function(a, b) {
    return {
      type: ai.Soldier,
      x: a,
      y: b,
      eval: utils.eval("wolf3d.deadGuard",
        arguments),
      animations: {
        current: "dead"
      }
    }
  },
  guardStanding: function(a, b, c, d) {
    return {
      type: ai.Soldier,
      x: a,
      y: b,
      angle: c,
      level: d || 1,
      action: "ready",
      eval: utils.eval("wolf3d.guardStanding", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  guardMoving: function(a, b, c, d) {
    return {
      type: ai.Soldier,
      x: a,
      y: b,
      angle: c,
      level: d || 1,
      action: "moving",
      eval: utils.eval("wolf3d.guardMoving", arguments),
      animations: {
        current: "run"
      }
    }
  },
  ssStanding: function(a, b, c, d) {
    return {
      type: ai.SS,
      x: a,
      y: b,
      angle: c,
      level: d || 1,
      action: "ready",
      eval: utils.eval("wolf3d.ssStanding",
        arguments),
      animations: {
        current: "ready"
      }
    }
  },
  ssMoving: function(a, b, c, d) {
    return {
      type: ai.SS,
      x: a,
      y: b,
      angle: c,
      level: d || 1,
      action: "moving",
      eval: utils.eval("wolf3d.ssMoving", arguments),
      animations: {
        current: "run"
      }
    }
  },
  officerStanding: function(a, b, c, d) {
    return {
      type: ai.Officer,
      x: a,
      y: b,
      angle: c,
      level: d || 1,
      action: "ready",
      eval: utils.eval("wolf3d.officerStanding", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  officerMoving: function(a, b, c, d) {
    return {
      type: ai.Officer,
      x: a,
      y: b,
      angle: c,
      level: d || 1,
      action: "moving",
      eval: utils.eval("wolf3d.officerMoving",
        arguments),
      animations: {
        current: "run"
      }
    }
  },
  mutantStanding: function(a, b, c, d) {
    return {
      type: ai.Mutant,
      x: a,
      y: b,
      angle: c,
      level: d || 1,
      action: "ready",
      eval: utils.eval("wolf3d.mutantStanding", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  mutantMoving: function(a, b, c, d) {
    return {
      type: ai.Mutant,
      x: a,
      y: b,
      angle: c,
      level: d || 1,
      action: "moving",
      eval: utils.eval("wolf3d.mutantMoving", arguments),
      animations: {
        current: "run"
      }
    }
  },
  dog: function(a, b, c, d) {
    return {
      type: ai.Dog,
      x: a,
      y: b,
      angle: c,
      level: d || 1,
      action: "moving",
      eval: utils.eval("wolf3d.dog",
        arguments),
      animations: {
        current: "run"
      }
    }
  },
  transGrosse: function(a, b) {
    return {
      type: ai.TransGrosse,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.transGrosse", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  hans: function(a, b) {
    return {
      type: ai.Hans,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.hans", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  gretel: function(a, b) {
    return {
      type: ai.Gretel,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.gretel", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  drschabbs: function(a,
    b) {
    return {
      type: ai.DrSchabbs,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.drschabbs", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  ghost: function(a, b) {
    return {
      type: ai.Ghost,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.ghost", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  hitler: function(a, b) {
    return {
      type: ai.MechHitler,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.hitler", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  giftmacher: function(a, b) {
    return {
      type: ai.Giftmacher,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.giftmacher", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  fettgesicht: function(a, b) {
    return {
      type: ai.Fettgesicht,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.fettgesicht", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  barnacleWilhelm: function(a, b) {
    return {
      type: ai.BarnacleWilhelm,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.barnacleWilhelm", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  uberMutant: function(a, b) {
    return {
      type: ai.UberMutant,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.uberMutant",
        arguments),
      animations: {
        current: "ready"
      }
    }
  },
  deathKnight: function(a, b) {
    return {
      type: ai.DeathKnight,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.deathKnight", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  spectre: function(a, b) {
    return {
      type: ai.Spectre,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.spectre", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  angelOfDeath: function(a, b) {
    return {
      type: ai.AngelOfDeath,
      x: a,
      y: b,
      level: 0,
      action: "ready",
      eval: utils.eval("wolf3d.angelOfDeath", arguments),
      animations: {
        current: "ready"
      }
    }
  },
  pacman: function(a, b, c) {
    return {
      type: ai.Pacman,
      x: a,
      y: b,
      level: 0,
      pacmanType: c,
      eval: utils.eval("wolf3d.pacman", arguments),
      animations: {
        current: "run"
      }
    }
  },
  machineGun: function(a, b) {
    return {
      x: a,
      y: b,
      texture: 27,
      eval: utils.eval("wolf3d.machineGun", arguments),
      listeners: {
        hit: function(a) {
          if (a.hasWeapon(wolf3d.utils.weapons.machineGun.id)) a.setProperty("ammo", 6) && (audio.playSound("getmachine", null, !0), wolf3d.utils.flashAddon(), a.map.removeSprite(this));
          else {
            var b = new player.Weapon(wolf3d.utils.weapons.machineGun);
            a.setProperty("ammo",
              6);
            a.weapons.push(b);
            b = a.weapons[a.weapons.length - 1];
            b.animation && b.animation.callback && (b.animation.callback = utils.bind(a, b.animation.callback));
            2 > a.getActiveWeapon().id && a.weapon(2);
            audio.playSound("getmachine", null, !0);
            wolf3d.utils.flashAddon();
            a.map.removeSprite(this)
          }
        }
      }
    }
  },
  gatling: function(a, b) {
    return {
      x: a,
      y: b,
      texture: 28,
      eval: utils.eval("wolf3d.gatling", arguments),
      listeners: {
        hit: function(a) {
          if (a.hasWeapon(wolf3d.utils.weapons.gatling.id)) a.setProperty("ammo", 6) && (audio.playSound("getgatling", null,
            !0), wolf3d.utils.flashAddon(), a.map.removeSprite(this));
          else {
            var b = new player.Weapon(wolf3d.utils.weapons.gatling);
            a.setProperty("ammo", 6);
            a.weapons.push(b);
            b = a.weapons[a.weapons.length - 1];
            b.animation && b.animation.callback && (b.animation.callback = utils.bind(a, b.animation.callback));
            a.face.setSmile(1E3);
            a.weapon(3);
            audio.playSound("getgatling", null, !0);
            wolf3d.utils.flashAddon();
            a.map.removeSprite(this)
          }
        }
      }
    }
  },
  maps: {},
  fonts: {}
};
wolf3d.fonts.small = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, {
    width: 5,
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }, {
    width: 3,
    data: [0, 3, 3, 3, 3, 3, 0, 3, 0, 0]
  }, {
    width: 6,
    data: [0, 27, 27, 27, 0, 0, 0, 0, 0, 0]
  }, {
    width: 8,
    data: [0, 54, 54, 127, 54, 127, 54, 54, 0, 0]
  }, {
    width: 7,
    data: [0, 12, 62, 3, 30, 48, 31, 12, 0, 0]
  }, {
    width: 8,
    data: [0, 0, 99, 51, 24, 12, 102, 99, 0, 0]
  }, {
    width: 8,
    data: [0, 28, 54, 28, 110, 59, 51, 110, 0, 0]
  }, {
    width: 4,
    data: [0, 6, 6, 3, 0, 0, 0, 0, 0,
      0
    ]
  }, {
    width: 5,
    data: [0, 12, 6, 3, 3, 3, 6, 12, 0, 0]
  }, {
    width: 5,
    data: [0, 3, 6, 12, 12, 12, 6, 3, 0, 0]
  }, {
    width: 9,
    data: [0, 0, 102, 60, 255, 60, 102, 0, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 12, 12, 63, 12, 12, 0, 0, 0]
  }, {
    width: 5,
    data: [0, 0, 0, 0, 0, 0, 12, 12, 6, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 0, 63, 0, 0, 0, 0, 0]
  }, {
    width: 3,
    data: [0, 0, 0, 0, 0, 0, 3, 3, 0, 0]
  }, {
    width: 8,
    data: [0, 96, 48, 24, 12, 6, 3, 1, 0, 0]
  }, {
    width: 8,
    data: [0, 62, 99, 115, 123, 111, 103, 62, 0, 0]
  }, {
    width: 5,
    data: [0, 6, 7, 6, 6, 6, 6, 15, 0, 0]
  }, {
    width: 7,
    data: [0, 31, 48, 48, 28, 6, 3, 63, 0, 0]
  }, {
    width: 7,
    data: [0, 31, 48, 48, 28, 48, 48, 31, 0, 0]
  }, {
    width: 8,
    data: [0, 56, 60, 54, 51, 127, 48, 48, 0, 0]
  }, {
    width: 7,
    data: [0, 63, 3, 31, 48, 48, 48, 31, 0, 0]
  }, {
    width: 7,
    data: [0, 60, 6, 3, 31, 51, 51, 30, 0, 0]
  }, {
    width: 7,
    data: [0, 63, 48, 24, 12, 6, 3, 3, 0, 0]
  }, {
    width: 7,
    data: [0, 30, 51, 51, 30, 51, 51, 30, 0, 0]
  }, {
    width: 7,
    data: [0, 30, 51, 51, 62, 48, 48, 30, 0, 0]
  }, {
    width: 3,
    data: [0, 0, 3, 3, 0, 0, 3, 3, 0, 0]
  }, {
    width: 4,
    data: [0, 0, 6, 6, 0, 0, 6, 6, 3, 0]
  }, {
    width: 6,
    data: [0, 24, 12, 6, 3, 6, 12, 24, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 63, 0, 0, 63, 0, 0, 0]
  }, {
    width: 7,
    data: [0, 6, 12, 24, 48, 24, 12, 6, 0, 0]
  }, {
    width: 7,
    data: [0, 31, 48, 48, 28, 12, 0, 12, 0, 0]
  }, {
    width: 8,
    data: [0,
      62, 99, 123, 123, 123, 3, 30, 0, 0
    ]
  }, {
    width: 7,
    data: [0, 12, 30, 51, 51, 63, 51, 51, 0, 0]
  }, {
    width: 7,
    data: [0, 31, 51, 51, 31, 51, 51, 31, 0, 0]
  }, {
    width: 7,
    data: [0, 62, 3, 3, 3, 3, 3, 62, 0, 0]
  }, {
    width: 7,
    data: [0, 31, 51, 51, 51, 51, 51, 31, 0, 0]
  }, {
    width: 7,
    data: [0, 63, 3, 3, 31, 3, 3, 63, 0, 0]
  }, {
    width: 7,
    data: [0, 63, 3, 3, 31, 3, 3, 3, 0, 0]
  }, {
    width: 7,
    data: [0, 62, 3, 3, 3, 59, 51, 62, 0, 0]
  }, {
    width: 7,
    data: [0, 51, 51, 51, 63, 51, 51, 51, 0, 0]
  }, {
    width: 5,
    data: [0, 15, 6, 6, 6, 6, 6, 15, 0, 0]
  }, {
    width: 7,
    data: [0, 48, 48, 48, 48, 48, 48, 31, 0, 0]
  }, {
    width: 8,
    data: [0, 99, 51, 27, 15, 27, 51, 99, 0, 0]
  }, {
    width: 7,
    data: [0,
      3, 3, 3, 3, 3, 3, 63, 0, 0
    ]
  }, {
    width: 8,
    data: [0, 99, 119, 127, 107, 99, 99, 99, 0, 0]
  }, {
    width: 8,
    data: [0, 99, 103, 111, 123, 115, 99, 99, 0, 0]
  }, {
    width: 7,
    data: [0, 30, 51, 51, 51, 51, 51, 30, 0, 0]
  }, {
    width: 7,
    data: [0, 31, 51, 51, 31, 3, 3, 3, 0, 0]
  }, {
    width: 7,
    data: [0, 30, 51, 51, 51, 51, 27, 54, 0, 0]
  }, {
    width: 7,
    data: [0, 31, 51, 51, 31, 15, 27, 51, 0, 0]
  }, {
    width: 7,
    data: [0, 62, 3, 3, 30, 48, 48, 31, 0, 0]
  }, {
    width: 7,
    data: [0, 63, 12, 12, 12, 12, 12, 12, 0, 0]
  }, {
    width: 7,
    data: [0, 51, 51, 51, 51, 51, 51, 62, 0, 0]
  }, {
    width: 7,
    data: [0, 51, 51, 51, 51, 51, 30, 12, 0, 0]
  }, {
    width: 8,
    data: [0, 99, 99, 99, 107, 127, 119,
      99, 0, 0
    ]
  }, {
    width: 8,
    data: [0, 99, 99, 54, 28, 54, 99, 99, 0, 0]
  }, {
    width: 7,
    data: [0, 51, 51, 51, 30, 12, 12, 12, 0, 0]
  }, {
    width: 8,
    data: [0, 127, 48, 24, 12, 6, 3, 127, 0, 0]
  }, {
    width: 5,
    data: [0, 15, 3, 3, 3, 3, 3, 15, 0, 0]
  }, {
    width: 8,
    data: [0, 3, 6, 12, 24, 48, 96, 0, 0, 0]
  }, {
    width: 5,
    data: [0, 15, 12, 12, 12, 12, 12, 15, 0, 0]
  }, {
    width: 7,
    data: [0, 12, 30, 51, 33, 0, 0, 0, 0, 0]
  }, {
    width: 9,
    data: [0, 0, 0, 0, 0, 0, 0, 0, 255, 0]
  }, {
    width: 4,
    data: [0, 3, 3, 6, 0, 0, 0, 0, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 30, 48, 62, 51, 62, 0, 0]
  }, {
    width: 7,
    data: [0, 3, 3, 31, 51, 51, 51, 31, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 62, 3, 3, 3, 62, 0,
      0
    ]
  }, {
    width: 7,
    data: [0, 48, 48, 62, 51, 51, 51, 62, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 30, 51, 63, 3, 62, 0, 0]
  }, {
    width: 7,
    data: [0, 60, 6, 6, 31, 6, 6, 6, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 62, 51, 51, 62, 48, 31, 0]
  }, {
    width: 7,
    data: [0, 3, 3, 31, 51, 51, 51, 51, 0, 0]
  }, {
    width: 3,
    data: [0, 3, 0, 3, 3, 3, 3, 3, 0, 0]
  }, {
    width: 6,
    data: [0, 24, 0, 24, 24, 24, 24, 24, 15, 0]
  }, {
    width: 7,
    data: [0, 3, 3, 51, 27, 15, 27, 51, 0, 0]
  }, {
    width: 3,
    data: [0, 3, 3, 3, 3, 3, 3, 3, 0, 0]
  }, {
    width: 11,
    data: [0, 0, 0, 463, 819, 819, 819, 819, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 31, 51, 51, 51, 51, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 30, 51, 51, 51, 30, 0,
      0
    ]
  }, {
    width: 7,
    data: [0, 0, 0, 31, 51, 51, 51, 31, 3, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 62, 51, 51, 51, 62, 48, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 59, 7, 3, 3, 3, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 62, 3, 30, 48, 31, 0, 0]
  }, {
    width: 7,
    data: [0, 6, 6, 63, 6, 6, 6, 60, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 51, 51, 51, 51, 62, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 51, 51, 51, 30, 12, 0, 0]
  }, {
    width: 11,
    data: [0, 0, 0, 819, 819, 819, 819, 974, 0, 0]
  }, {
    width: 8,
    data: [0, 0, 0, 99, 54, 28, 54, 99, 0, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 51, 51, 51, 62, 48, 31, 0]
  }, {
    width: 7,
    data: [0, 0, 0, 63, 24, 12, 6, 63, 0, 0]
  }, {
    width: 7,
    data: [0, 56, 12, 12, 7, 12, 12, 56,
      0, 0
    ]
  }, {
    width: 3,
    data: [0, 3, 3, 3, 0, 3, 3, 3, 0, 0]
  }, {
    width: 7,
    data: [0, 7, 12, 12, 56, 12, 12, 7, 0, 0]
  }, {
    width: 8,
    data: [0, 110, 59, 0, 0, 0, 0, 0, 0, 0]
  }, {
    width: 8,
    data: [0, 0, 8, 28, 54, 99, 99, 127, 0, 0]
  }, {
    width: 2,
    data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }, {
    width: 8,
    data: [0, 62, 99, 115, 123, 111, 103, 62, 0, 0]
  }, {
    width: 8,
    data: [0, 24, 28, 24, 24, 24, 24, 60, 0, 0]
  }, {
    width: 8,
    data: [0, 31, 48, 48, 28, 6, 3, 63, 0, 0]
  }, {
    width: 8,
    data: [0, 31, 48, 48, 28, 48, 48, 31, 0, 0]
  }, {
    width: 8,
    data: [0, 56, 60, 54, 51, 127, 48, 48, 0, 0]
  }, {
    width: 8,
    data: [0, 63, 3, 31, 48, 48, 48, 31, 0, 0]
  }, {
    width: 8,
    data: [0, 60, 6, 3, 31, 51,
      51, 30, 0, 0
    ]
  }, {
    width: 8,
    data: [0, 63, 48, 24, 12, 6, 3, 3, 0, 0]
  }, {
    width: 8,
    data: [0, 30, 51, 51, 30, 51, 51, 30, 0, 0]
  }, {
    width: 8,
    data: [0, 30, 51, 51, 62, 48, 48, 30, 0, 0]
  }, {
    width: 11,
    data: [0, 0, 0, 0, 1023, 0, 0, 0, 0, 0]
  }, {
    width: 11,
    data: [0, 0, 120, 390, 561, 521, 561, 390, 120, 0]
  }, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
];
wolf3d.fonts.large = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, {
    width: 8,
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }, {
    width: 4,
    data: [0, 7, 7, 7, 7, 7, 7, 7, 0, 7, 7, 0, 0]
  }, {
    width: 8,
    data: [0, 119, 119, 51, 17, 0, 0, 0, 0, 0, 0, 0, 0]
  }, {
    width: 10,
    data: [0, 238, 238, 511, 511, 238, 238, 511, 511, 238, 238, 0, 0]
  }, {
    width: 10,
    data: [0, 56, 510, 511, 7, 255, 510, 448, 511, 255, 56, 0, 0]
  }, {
    width: 12,
    data: [0, 1799, 1927, 960, 480, 240, 120, 60, 30, 1807, 1799, 0, 0]
  }, {
    width: 13,
    data: [0, 124, 254, 238, 254, 124, 3838, 2030, 1006, 2046, 3708, 0, 0]
  }, {
    width: 4,
    data: [0, 7, 7, 7, 3, 1, 0, 0, 0, 0, 0, 0, 0]
  }, {
    width: 6,
    data: [0, 28, 14, 7, 7, 7, 7, 7, 7, 14, 28, 0, 0]
  }, {
    width: 6,
    data: [0, 7, 14, 28, 28, 28, 28, 28, 28, 14, 7, 0, 0]
  }, {
    width: 12,
    data: [0, 1651, 1911, 2047, 1022, 508, 508, 1022, 2047, 1911, 1651, 0, 0]
  }, {
    width: 10,
    data: [0, 56, 56, 56, 56, 511, 511, 56, 56, 56, 56, 0, 0]
  }, {
    width: 5,
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 6, 2]
  }, {
    width: 8,
    data: [0, 0, 0, 0, 0, 127, 127, 0, 0, 0, 0, 0, 0]
  }, {
    width: 4,
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0]
  }, {
    width: 12,
    data: [0, 1792, 1920, 960, 480, 240,
      120, 60, 30, 15, 7, 0, 0
    ]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 487, 503, 479, 463, 455, 511, 254, 0, 0]
  }, {
    width: 6,
    data: [0, 28, 30, 31, 31, 28, 28, 28, 28, 28, 28, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 448, 510, 255, 7, 7, 511, 511, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 448, 240, 240, 448, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 455, 455, 455, 455, 511, 511, 448, 448, 448, 448, 0, 0]
  }, {
    width: 10,
    data: [0, 511, 511, 7, 7, 255, 511, 448, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 7, 255, 511, 455, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 511, 511, 455, 224, 112, 56, 28, 28, 28, 28,
      0, 0
    ]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 455, 254, 254, 455, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 455, 511, 510, 448, 455, 511, 254, 0, 0]
  }, {
    width: 4,
    data: [0, 0, 0, 7, 7, 0, 0, 7, 7, 0, 0, 0, 0]
  }, {
    width: 4,
    data: [0, 0, 0, 7, 7, 0, 0, 7, 7, 3, 1, 0, 0]
  }, {
    width: 8,
    data: [0, 112, 56, 28, 14, 7, 7, 14, 28, 56, 112, 0, 0]
  }, {
    width: 8,
    data: [0, 0, 0, 127, 127, 0, 0, 127, 127, 0, 0, 0, 0]
  }, {
    width: 8,
    data: [0, 7, 14, 28, 56, 112, 112, 56, 28, 14, 7, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 448, 496, 248, 56, 0, 56, 56, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 455, 503, 247, 7, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 455, 511, 511, 455, 455, 455, 455, 0, 0]
  }, {
    width: 10,
    data: [0, 255, 511, 455, 455, 255, 255, 455, 455, 511, 255, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 7, 7, 7, 7, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 255, 511, 455, 455, 455, 455, 455, 455, 511, 255, 0, 0]
  }, {
    width: 10,
    data: [0, 511, 511, 7, 7, 127, 127, 7, 7, 511, 511, 0, 0]
  }, {
    width: 10,
    data: [0, 511, 511, 7, 7, 127, 127, 7, 7, 7, 7, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 7, 487, 487, 455, 455, 511, 510, 0, 0]
  }, {
    width: 10,
    data: [0, 455, 455, 455, 455, 511, 511, 455, 455, 455, 455, 0, 0]
  }, {
    width: 4,
    data: [0, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 7, 0, 0
    ]
  }, {
    width: 10,
    data: [0, 448, 448, 448, 448, 448, 448, 448, 455, 511, 254, 0, 0]
  }, {
    width: 11,
    data: [0, 903, 455, 231, 119, 63, 63, 119, 231, 455, 903, 0, 0]
  }, {
    width: 10,
    data: [0, 7, 7, 7, 7, 7, 7, 7, 7, 511, 511, 0, 0]
  }, {
    width: 12,
    data: [0, 1799, 1935, 2015, 2047, 1911, 1831, 1799, 1799, 1799, 1799, 0, 0]
  }, {
    width: 10,
    data: [0, 455, 463, 479, 511, 511, 503, 487, 455, 455, 455, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 455, 455, 455, 455, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 255, 511, 455, 455, 511, 255, 7, 7, 7, 7, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 455, 455, 455, 455, 455, 511, 254,
      56, 112
    ]
  }, {
    width: 10,
    data: [0, 255, 511, 455, 455, 511, 255, 63, 127, 247, 487, 0, 0]
  }, {
    width: 10,
    data: [0, 254, 511, 455, 7, 255, 510, 448, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 511, 511, 56, 56, 56, 56, 56, 56, 56, 56, 0, 0]
  }, {
    width: 10,
    data: [0, 455, 455, 455, 455, 455, 455, 455, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 455, 455, 455, 455, 455, 495, 254, 124, 56, 16, 0, 0]
  }, {
    width: 12,
    data: [0, 1799, 1799, 1799, 1799, 1831, 1911, 2047, 2015, 1935, 1799, 0, 0]
  }, {
    width: 10,
    data: [0, 455, 455, 455, 254, 124, 254, 511, 455, 455, 455, 0, 0]
  }, {
    width: 10,
    data: [0, 455, 455, 455, 455, 511, 254, 56, 56,
      56, 56, 0, 0
    ]
  }, {
    width: 10,
    data: [0, 511, 511, 224, 112, 56, 28, 14, 7, 511, 511, 0, 0]
  }, {
    width: 6,
    data: [0, 31, 31, 7, 7, 7, 7, 7, 7, 31, 31, 0, 0]
  }, {
    width: 12,
    data: [0, 7, 15, 30, 60, 120, 240, 480, 960, 1920, 1792, 0, 0]
  }, {
    width: 6,
    data: [0, 31, 31, 28, 28, 28, 28, 28, 28, 31, 31, 0, 0]
  }, {
    width: 12,
    data: [0, 112, 248, 508, 990, 1935, 0, 0, 0, 0, 0, 0, 0]
  }, {
    width: 8,
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 127]
  }, {
    width: 5,
    data: [0, 15, 15, 14, 12, 8, 0, 0, 0, 0, 0, 0, 0]
  }, {
    width: 10,
    data: [0, 0, 0, 254, 510, 448, 510, 511, 455, 511, 510, 0, 0]
  }, {
    width: 10,
    data: [0, 7, 7, 255, 511, 455, 455, 455, 455, 511, 255, 0, 0]
  },
  {
    width: 10,
    data: [0, 0, 0, 254, 511, 455, 7, 7, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 448, 448, 510, 511, 455, 455, 455, 455, 511, 510, 0, 0]
  }, {
    width: 10,
    data: [0, 0, 0, 254, 511, 455, 511, 511, 7, 511, 510, 0, 0]
  }, {
    width: 8,
    data: [0, 124, 126, 14, 14, 63, 63, 14, 14, 14, 14, 0, 0]
  }, {
    width: 10,
    data: [0, 0, 0, 510, 511, 455, 455, 455, 511, 510, 448, 511, 255]
  }, {
    width: 10,
    data: [0, 7, 7, 255, 511, 455, 455, 455, 455, 455, 455, 0, 0]
  }, {
    width: 5,
    data: [0, 14, 14, 0, 14, 14, 14, 14, 14, 14, 14, 0, 0]
  }, {
    width: 6,
    data: [0, 28, 28, 0, 28, 28, 28, 28, 28, 28, 28, 31, 15]
  }, {
    width: 10,
    data: [0, 7, 7, 455, 487, 247, 127,
      127, 247, 487, 455, 0, 0
    ]
  }, {
    width: 4,
    data: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0]
  }, {
    width: 12,
    data: [0, 0, 0, 991, 2047, 2047, 1911, 1911, 1911, 1911, 1911, 0, 0]
  }, {
    width: 10,
    data: [0, 0, 0, 255, 511, 455, 455, 455, 455, 455, 455, 0, 0]
  }, {
    width: 10,
    data: [0, 0, 0, 254, 511, 455, 455, 455, 455, 511, 254, 0, 0]
  }, {
    width: 10,
    data: [0, 0, 0, 255, 511, 455, 455, 455, 455, 511, 255, 7, 7]
  }, {
    width: 10,
    data: [0, 0, 0, 510, 511, 455, 455, 455, 455, 511, 510, 448, 448]
  }, {
    width: 10,
    data: [0, 0, 0, 255, 511, 455, 7, 7, 7, 7, 7, 0, 0]
  }, {
    width: 10,
    data: [0, 0, 0, 510, 511, 7, 255, 510, 448, 511, 255, 0, 0]
  }, {
    width: 10,
    data: [0,
      56, 56, 511, 511, 56, 56, 56, 56, 56, 56, 0, 0
    ]
  }, {
    width: 10,
    data: [0, 0, 0, 455, 455, 455, 455, 455, 455, 511, 510, 0, 0]
  }, {
    width: 10,
    data: [0, 0, 0, 455, 455, 455, 455, 238, 124, 56, 16, 0, 0]
  }, {
    width: 12,
    data: [0, 0, 0, 1911, 1911, 1911, 1911, 1911, 1911, 2047, 2046, 0, 0]
  }, {
    width: 10,
    data: [0, 0, 0, 455, 455, 238, 124, 124, 238, 455, 455, 0, 0]
  }, {
    width: 10,
    data: [0, 0, 0, 455, 455, 455, 455, 455, 511, 510, 448, 511, 255]
  }, {
    width: 10,
    data: [0, 0, 0, 511, 511, 240, 120, 60, 30, 511, 511, 0, 0]
  }, {
    width: 8,
    data: [0, 0, 120, 28, 28, 28, 15, 15, 28, 28, 28, 120, 0]
  }, {
    width: 4,
    data: [0, 0, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7]
  },
  {
    width: 8,
    data: [0, 0, 15, 28, 28, 28, 120, 120, 28, 28, 28, 15, 0]
  }, {
    width: 14,
    data: [0, 0, 975, 2031, 4094, 7932, 7800, 0, 0, 0, 0, 0, 0]
  }, {
    width: 16,
    data: [0, 0, 448, 992, 1904, 3640, 7196, 14350, 28679, 32767, 32767, 0, 0]
  }, {
    width: 3,
    data: [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0]
  },
  null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
];
wolf3d.fonts.bitmap = {
  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABNAAAAAgCAYAAADT74XvAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABfZSURBVHhe7Z3LcSS2DkUVmsN4YTgIh+EwnJ9eqTRcCCX0uRcAu+UxFrOwSeJ78SGa6n57++OP9/23NlgMLAYWA4uBxcBiYDGwGFgMLAYWA4uBxcBiYDGwGFgMJBhYw2xwLAYWA4uBxcBiYDGwGFgMLAYWA4uBxcBiYDGwGFgMLAYeYCA1zj//vL8p/7IXbP/73/vbx7+///767/z/eI54uS/liN5ZJ/kzOudctp7p6epBfEiPKr8//3x/+/gX/Xfoxf9/9lf5ZecO3WjnzC5HrlvyRL8Szlx7ED13/dijiscYx64fqnxdPdX9rj+O/H/99f728U/V/+yv6n/kfJX9XTu5+499KL+pdFX/x3xJ56KcqjzRfypuzr6Y94gv6eHyP/td/N6SQ61zr+bf9fuz/O/GQYafaVyqfia+bn9JfV7Gz8Ub6afSe5Z+ZGdVXtL78Mn6PfLPlBxTdCgPqPGn5t+q3PHcVP985K76TdW7GwfUf0zZI96nVP+rfYDr/+r+rr2zPODKQ34jel09pvlX6XXPuee7dqM6QH6j81V9qnx3gJZMF19VAKqNGjU67voO0L7/0+YdoH0dImUJqzu4UxOau8+Ngx2g3fkT/x2gfdo1w6/aOLsNg9q4n33uRaYaj+o5il+VjmsHtXGji7Pqr9v+r+rv2sH1h0uf8KDamy761b7Mpava6/ZF5pZdie4O0L7WBDX/qrihuJ8aGL3q/jRlh0Nnyh47QPv+3lDNz9VzP3WAV9Wne849f7vuqPFLdcSl4+4//K8N0E7iiYKd/38EoIIZ95PhuoCgxE8FKOqrFsBug6bahfZlflP1nnr5RbhQ/TwlT8SFyp/sPZWQsjir4m8qDqqDNDWhuftUf9DLLzUeqvq/ir/7cli1Z4ZziiOVfhUH6jn3JRrFD+kd5SI7qHqouK3WsdtyvNoOxH/a7+pAybV7FQeqPC6+XbyTH6bqKvHp2j3SJ/xk/cy0HKR31b8ZXer3aBDp6t/ttykOyI9u/FEfV9Wfzrn9y7P17sa5i2PVHtS/xXst+YHwpp7v7uvaO9PDlcv1G9WXV/Ov6tM9556f8n/MZ27+p/qk+rOr/w7Qwgu0VxeAKkAJUOr6DtAevzxzGx/V7m4gU4JQC30m31QcVOUg/arrqj+oAVJxUNX/Vfx3gPb9q7AdoH1+JQPFjxuXbt776fwpb7r60sWpSk/NXzS4mPaHqi/xrfZRdNG6TZfwswM07QU85aEdoD1+AX3s5/YvhF8379DgsBuPbv5U7UH92w7QvvYSFK9ZXnbP/dQBnotDN46orql27Mbb4bMDtF/fkZYVIvUFGg1sqi+IbgGiWnhvN3wu/bif/OAGrFv4VHkiHmhyXX3BeOTJGgI14bl+Idy69Kr7q3Jk/nD90L24VfU+5ygeIr6pcXT1J/5uPKr81bxdtW/8LjmKI3dwRbilCzqdV/Wu0qHvfCT+xPen6E9yZLgg/QlP1EhSg0j8yf50/nfxP9nxVfmd/KPiclo/qh9qH3xLP8Kty/fsp/7NxYkrR3Ug2bXHrXuEq7+aL9X+gfjf0rsbjzTwinqRPah/o/tRJo9qv6493PpLflfzKtFR9XfzBsUB9aEkt6o/yUF0su9qPueyAXDVXnRPzuhGe9K9g+JFxXukQ3Ea7Rb5vPwFGimgNg6qAamBpkCoBjAV3Kr8FFAqX/JD5EN2cgEf5czk2QEavwJRff5oH/k3O7sDtO9fMFHDpeI/y1/kL5U/FbIutnaA9okPN35UuxMOqF7Q+WfJ4Tbw1fpJ+lC/4PIlfjtAu1vfCN8UH9X+j+juAE370TKyo+vfHaB5L9Eof5H9q/FDfN08HHG0A7Tv+xK1/pHfKW67g6Pb/HeA9rguU/2K/tkBGrxAoz8Fok+e1AtfNSHHgCZ5KAFQALuDQKKnJja18BA/98UNJRySK5MnwwX5j/jF9SwhRD+S3Vy+0/Rc/mRHigMaxKryuPieHvxkfqDBMBWSqv6qPQg/lIem7UiNbbdxIvqZPap1g/zXjR+iT+vkf4pfOk/4Uf1JcpCetE56TPN/td+n7E52I7tX42raH8+Wg+yW6Uf1Qo23Kf8/y7+qvabzd/TD+e+pvq6bB8guhAc6X8Uhxeer9Z7qAygep/qwapxVz1VxofKbok90Mnno5dWhm/Xv5Hfq+0luih8Xv5kdSI8jB/2IV3X+ovoh+qN631LrvDu/iPJk/r/2Am0HaF8/UaPC5waQmsinEqALwB2gPX5pogb+tJ8JD91GaAdon98V5Tb+bvxX8UN5aAdoj19C3I4fok/r3UaOzhN+Xn2RfxX/bt4kv6rr5D9q5Om8Koebz0iuKt9nyUF2qw4u1Hh7Fe6rfFV7uXVUpRvl3gHa476F4rOb/8hvz4oDdQBB9iB9pvKZSofkIX2IzxR9orMDtMf3ShW/O0DT8h0NXq8N0Cjg6KLtJkzilxX68/9JHkowFPjVia7aoKj6Z/uqF2cK2KpcWUHOcDH1p4Pqy7NbfiEcVe2pnuvGQWY/+gRHlS/uI3mrfNU/IY7yTOGwigM6R3mIPvio+inDxXQckf7VPK7qTXgk/iqfbN8t/Q9dwo/qT7IDrZOdpuxAfKb6B5UP7ZvS2x1c3JaL6KvrXftMxR31TdX+95Z+ZF+Xr7rfxaFKN8tT3UFQN/+T/JR/6TzlVTrv3h8ivWr8kN6RLunRtUP3/NGnGucUj9P2IH5de6t9QyYH5dMjX/awI4tb9SHIlP5dO5zz6kuwY7e4v3pvUv0Q/RHzrhvvhE/33qj2uztA+/UrnK8ufAQAClA6T+s7QPv8G+8doL2/fWChircdoL2/fRSDaD+3IFTtT+dIjh2gfY99yp8/ZZBC/p9q/MkeU3IQn+qFTLWDyr/bP6h8aN+U3d3BxW25iL663rXPFN7oolG9WN/Sj+zr8lX3uzhU6e4A7fvvNCL77QDt+1+BdQdWO0CbxR/l0x2gfd/X7gDt8V2X7ktPH6DRJzwkMBVyWs8mi1Q41Iab6JB81QatSjebzKp+oEn3lFwZHcKT24hG/9H5aX8TvYjDbP/xn/tJgsv/tn+rDZuKX5I/G4RFXJz/zi7SxCeLw9sXCFeu6n6yC+Hu1ieBU3yzC5nrv6p9p/iTPagOVuWYtpOrR5e/y6/r52qfQP4jPapyE12Sq8rXvdhW5VD1o4se9RtkB1UOouOuu3zV/W5cqnTdPBXpvir+CJ+u/m58/FS9XT26dqT+Uv1A5chxe6DWxQXlgyn6RKcrR+a3jK96fyK5M7xlfS3RIzuo+S3aQ+2ziT/NBaJ+8YN71e4kR1yn+pvJlfHZAdqvF2gE2G7CpfMEBJKPzqvrJ6CoQBx6FCgq3+q+HaA9/tVHNxERzro4rvo5nqMGRcUvyRPtkTU6O0B7/Cs9O0DTPrkmPNJ6N36759XGLeYR96I8bYcu/ym7kV603pWDzhP/WxfsKt/pi3VXP2rgd4DGr98/MNr1g5undoD2+LuXKG9Q39g9Px3nJA/1l9Sfqn3lT897bhyRPmT37vkdoH3NrztAe1xv6P48VogI2GedEku3gaDC6gbQswon2a+bWIh+th4HVGrCnJpkk9yZXao4Uv2t2oHk7xZ+woX7Eo3oZY1Q1hBQAnLtQ/njyNHlSxcddQBQlSd+IqNe8Kv+c/3g7if5aRBPDbgaj67fzn41n73a/l3+3fPTfnBx9ir+Vbup516Nf5U/9V+kb9Xf6jniX9VTpTvdr3T7B9VutE/V341Pqhtd/VW51b5QpXcrTqr8qd+hgVGVr4sHwmGXnmoH6i/V/i2zm9u3k126/nkWfZKT5FD7yOi/yFft96p4i3LSl/qr+Sfah/Ds9rdk/7Ou8j38p/GeyaneHynfHfo7QNsXaCkGPkCyA7THL2u6Cf92A+gmJtInu2DEcy5fNTGrCZAaHOKnFgC1gLryqA1YFz9kh6l1ugipjQ/J4+JX3a82VCo90qO63uXfPa/GQ8wjhA/XHq4eXf4uP9dO6mDHlUPdr/K/NRhw/f9sOVw7xv3VD/x+Sv5X9a/iXr1APkuOW/hy5Z/yP/U7dKF8ldzTflDtQP2c2r9ldpvun7v+ofw7RZ/okBxqH7kDtK8vr9T+luy/A7ShgVI0NP2pHSVo1XHVfRS41EB2z5PcRJ/Ou+tZIlIbICowrjy0f6oQkZ3Vi1/3Qkb6uolKjS9X/2fhgfLHkVvVM7Ov2vi4jVu1ISJ5phpoFW/uPmpoXPmJv4tfki/So0bD5U/6uOtd/t3zaj5Q86ir/6v4V+2mnqP+Y1rv6fql6ln1t3rulhwqXdrXHaQRfRVHqj2ncafWebf+Rru4cmfn3fpF9u/6r3q+2z9X+bp+UHHpykN91q3+jeSs8p3GJdmd9CDcqzggOWgAeuSIfVz3Vyhd/bP9aj9KdojrKt3pe7vKV8WHq7d7Tz5yqHZ42gs0Kozdi2/VsGrgkoPdAHLlJfouPdq/A7THfxvt4obwQ/7I1tWCocYX4SzTg86pCSnTk/LH4a/qSfakl25uA19thKixe3aj5OKUCqgrP/EnHEb8knyR3g7QHn8XjpsXaT/5241D9yKt8ndxR3pn9EgeVw51f7d+qXxIv+76LTlUurRvB2jf/4p1Frdu/Yg4Jn+4cajSm8pbXf0pD6l9y6v17tqB+izVDlEOokt2q/Lt2sPNs6SHWj+IDsml3od2gPb4VznJzuq621+rdN19Ki5+7ACNLqTdxsE16HSCocBXE0i1sHb1P+cJ8FnBPee6g5JDPxuYEE4yP6iDFdeP6n7V/7HgHrlJbzVBEE5UfVycqvbP6FL+OHKTnUh/wj/Rp0EfDWBIPlrv+o/ou+uZPJkdSH6yH53P4pD8fusC59qT9lf1p4uUqv8UHTVfunlI1cPlf9vu5Pdpu7uDA5Kvax+ir67fkkOlq+6jOnML96odu/1zrJNRX7LTlP7Ex40Dld6U/F0/RHnVfrPLd/p8l17WX07dZ+K9Ru1nj3+6/XMXl5QXpugTHZLjrFM/lw0mqb+cilvSk9ZdO6j3w6r+mTwqX7ffUvU/+9R4c+PsaS/QSIFqw+AacioAugnblXsqoIgvJZ6sUd8BWu/Xo45dd4D2/XfOUf7YAdqn3ShP3C5Ual7cAdrj71akPP3T61gXh12cPpv/FD/3wq7Gmzs47MoxLVc1Hp4lh+p/dV+1H1bpT9kz6wcJPztA+z7/d/3nnt8B2qcfdoCmvSy/1XeoeUTNW3SP3QHa93eFHaB95gIVZ9cHaPQiw534qYq5+9QLejWBdPWkwujqG/erk+IuH/V8Vd/qOVUutyF36WY4JPxM+e92HLj2UAtr98Kt8lHl7+Iw8yd9Ikp8VRydfdU/IaAGhtZJj2oeJpwQXzrfjR8VX6/Sn/CjxhHZ8dV2cPl3/U64U+UhOmR3Oq/K4dZJkov4qi/WSb+qHCpd6ocjHXeQpspB9jzr8QO9W3nHxcuUHK4/CB+38wDl32n/qzh5td4ufqIfqX+u9kGZ/ap/2qn6o2sPl88U7oiOKhf58/CJAyPqr6fyDulJ62SHqP/Zr/bd04M00ofyKulLcabypx+XiHx2gPbrRxN+WgFwE2AVYLFRIqB1+ajnq3JUz6ly3fbLDtDufDKr+ncKP106O0DTvoPQjUcq1OQ3Ot+tIypOpxo51350gTv0unZ8tR1c/l2/k71UeYgO4ZfOq3K4uCK5iO8O0O68QN4B2vd1KMPj7TxA+ZfitxtnP1Xvbr6hgcsO0B6/ypnCHdGhOuDeZ3eA9pyXaOTXW3mJ4jrKNTZAU4FK+6ignMYn+9O16kSY5Irr6idR1YuL+0miWxBcfV365Af60QFXvizgMjsSzm4FKCWG23q7CYLkuR0HxL8aX1P+JX9SHHftd/SvDlK78lf5uvnEHbREvW7hhOxHOJvyf6Sjxk1VflVuwr/rV9JL9buLP/IjyTXVP6h2V+Wp+l/1myrHs/1Beqv6VXFB/CNd1e/n3LPjLnshcyvvuniZlsP1R8ZfpVOVn3Dg4rAaz1P5T41L0tvFTxbn9EKHBpiuPaf79yquqnlP9R/lsW7cVPWe8qcbd2c/4S2jSziLdKOe6n2Z7v0kh4sPlZ66T9Uz2ieLy8hX/ltPVeC4jxTYAZr297YUoFX/qACnQNoBmvdJpZvwswZiugB3C9ktnBLdbgOgxgE1cl37HTmqgyyyE8lf5es2sKq93QaC9CecdM9P+X8HaN+/qFHrXNePKp+zr+r36jm3fqiDSLKbaxc3zm/Rvy0H2W0HaN53LJE9p/GvxiHVD5VOVX6q32Q3kr8af6/W2+0/doA2c19x82qG3y5+qvG0A7THf+lB9341X7wqL9H86cg1PkDrKkwBoU5EpwA+5ehqoKr8/230aYJe1ZuA7ybuWziiOHH1J71j4Sf+WYIguVS6qh+69nflIf2ydcLz0SM2Aue/yX/qdwtkdKigZXZS7d8doJH91Aae/F39EYKMP/E766r/iF7EX2Y3lZ8ah92LvBpXpH8VB8/mr/JT7e8O3FQ7qfyJHvnNtceUXMQ3kzvmadLPjbeuftQnR3lvD1Dou5mq/Snhzh2A3JJD9UcVj2QHwmeXL/En+rRelb96bhoH6gfSbh/m7o/2UPu3aXuQv8869b2Ux8j/Vf2n+lGyA8kf4y7WGVVOil/C79GD9kV9SH9ad+1D9Gjd1e/sp3OR77XvQKNCtAM07eWZ2qARoGidAJ6dp8Anvtk6JWTVLkevagIm+at2q+odEyjxr+qv0lX90LW/Kw/5rYrnHaA9zluUD6gBUPG0A7SZ7wqkOl1tpKbi9dX83TxCeh96P9XuqvzTdlHzgntB3AGa99JkB2jvbx+Y6cZB9Xz1nFo3u3FGcV+Vv3rOzQdUT+gCfc67AzF3/w7QvsZg9f4w1Y92cb8DNM6pHzYiO6vrahzHeKZzTxugZQkxu4B2Xz6ohqV9ZEB3gEGJs1sAMjuTnnGdClh13ZUj7s9woTYM53zVD1P+Ue1ADayLv6r+PyUOjt1ooFotsNEvqv1v+0GVg+LA9X/k655X8wTFg0tH3e/67ex3X6ZQ/JDfXH639Vfz5205pnBDFynik613/R7lohdHhCPyR/W8ah/iP9W/TNldxXnVbtkAw7VTt3+ryt/lSwOcqh3cc7f8cOxDeHTrEOFySn81rqv5z9Wb8HILj2RP6jfpvGoHt/+6ZQ/ChdqvZnU3s1dXfzcOSc+ufYm+OvBT8UN9jopTNw6r9aXKp+qXGMdkj8jn2gs0CojYGO4A7ev0lRxJ6xSoVcARXwpYV64doD3+BJn8US1AbuEhOagBJFzsAK2GA9f/O0Cb+VUiih9qMHaA5r2cIXtSfqL8o653/R7l3AGa9qn0lN3dOkW4UgeELp1u/1aNly5fuiBV7eCe2wGa9510U/lv6uKfyfMsHOwA7Wte3gHazAurHaDN5CU1D/xrB2gxAXYvbmqCV/d1GzK3EZtqTKhBmS48h1/2JymqvWlfHKBkDWD2wpHou+tqgFb9QQXpWfp35ejGwdEzk8MdEKl+Jr3VRrArH8lBOJiyv2o3NS6InktH3a/67exzB1lZXcs+WIj/v8rvlv4ufm7JoeZRl79Kl/Da9Xusoy6/rt7ueVU+l27XH1nfRgMjF+dEj/Tu9ntT50nOLG9N61+lVz13e4AW+5bMziS/ikvXj904o/jv3p+qdXHKDioduk/Rd+Pe7t9UPSjOyd9xnfTO+rBb9zcaTLn6UdxSvBM/ktftY5+V77p1aSovqbiP+ZXORf1e9gItazhPAHUvngRQWu8WALXwUQImh3YDtZoIIt8doD3+BILwRvGQFbj4/6cL0E8Z4OwA7f3tw7cuDrp5yMWtmq+IrktH3e82HtWBFl2gsrxb5XdLfxc/t+RQGyuXv0qX8JrlbzVezz71xdl0o+raTbWHS7frjx2geS8hXP9M465Lr9u/TvHP4uFZ9wjXj904o/jv6h31UevilB1UOnR/o0HSDtC+/tr29P3l2JcGUoRn8nMXL5E+yev2sTtA+74uXhugVQG157Q/OVg7rZ0WA4uBxcBiYDGwGFgMLAYWA4uB/zoGpn6N+r9ux9V/c8li4D4Gxn71YJ1131lr47XxYmAxsBhYDCwGFgOLgcXAYmAx8DthYAdoi+ffCc+ry2+N5/8DRsKIn1G7VhQAAAAASUVORK5CYII=",
  height: 32,
  map: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, {
      offset: 0,
      width: 16
    }, null, null, null, {
      offset: 16,
      width: 32
    }, null, {
      offset: 48,
      width: 16
    }, null, null, null, null, null, null, null, null, {
      offset: 64,
      width: 32
    }, {
      offset: 96,
      width: 32
    }, {
      offset: 128,
      width: 32
    }, {
      offset: 160,
      width: 32
    }, {
      offset: 192,
      width: 32
    }, {
      offset: 224,
      width: 32
    }, {
      offset: 256,
      width: 32
    }, {
      offset: 288,
      width: 32
    }, {
      offset: 320,
      width: 32
    }, {
      offset: 352,
      width: 32
    }, {
      offset: 384,
      width: 16
    }, null, null, null, null, null, null, {
      offset: 400,
      width: 32
    }, {
      offset: 432,
      width: 32
    }, {
      offset: 464,
      width: 32
    }, {
      offset: 496,
      width: 32
    }, {
      offset: 528,
      width: 32
    }, {
      offset: 560,
      width: 32
    }, {
      offset: 592,
      width: 32
    }, {
      offset: 624,
      width: 32
    }, {
      offset: 656,
      width: 32
    }, {
      offset: 688,
      width: 32
    }, {
      offset: 720,
      width: 32
    }, {
      offset: 752,
      width: 32
    }, {
      offset: 784,
      width: 32
    }, {
      offset: 816,
      width: 32
    }, {
      offset: 848,
      width: 32
    }, {
      offset: 880,
      width: 32
    }, {
      offset: 912,
      width: 32
    }, {
      offset: 944,
      width: 32
    }, {
      offset: 976,
      width: 32
    }, {
      offset: 1008,
      width: 32
    },
    {
      offset: 1040,
      width: 32
    }, {
      offset: 1072,
      width: 32
    }, {
      offset: 1104,
      width: 32
    }, {
      offset: 1136,
      width: 32
    }, {
      offset: 1168,
      width: 32
    }, {
      offset: 1200,
      width: 32
    },
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
  ]
};
font = {
  BitmapFont: function(a) {
    this.images = [];
    var b = document.createElement("CANVAS");
    b.height = a.height;
    var c = b.getContext("2d"),
      d = this;
    window.addEventListener("load", function() {
      var e = new Image;
      e.src = a.image;
      var f = document.getElementById("resources");
      f || (f = document.createElement("DIV"), f.id = "resources", document.body.appendChild(f), f = document.getElementById("resources"));
      f.appendChild(e);
      e.onload = utils.bind(d, function() {
        for (var d = 0; d < a.map.length; d++)
          if (a.map[d]) {
            b.width = a.map[d].width;
            c.drawImage(e,
              a.map[d].offset, 0, a.map[d].width, a.height, 0, 0, b.width, b.height);
            this.images[d] = {
              width: b.width,
              height: b.height,
              data: b.toDataURL()
            };
            var f = document.getElementById("resources");
            if (!f) {
              f = document.createElement("DIV");
              f.id = "resources";
              document.body.appendChild(f);
              f = document.getElementById("resources")
            }
            var j = new Image;
            j.src = this.images[d].data;
            f.appendChild(j)
          }
      })
    }, !1)
  },
  Font: function(a, b) {
    this.images = [];
    var c = document.createElement("CANVAS"),
      d = c.getContext("2d"),
      e = this;
    window.addEventListener("load", function() {
      for (var f =
          0; f < a.length; f++)
        if (a[f]) {
          var h = a[f];
          c.width = 3 * h.width;
          c.height = 3 * h.data.length;
          for (var g = d.createImageData(c.width, c.height), j = 0; j < c.height; j++)
            for (var i = 4 * j * c.width, m = 0; m < c.width; m++) h.data[floor(j / 3)] & 1 << floor(m / 3) && (g.data[i + 4 * m] = b.r, g.data[i + 4 * m + 1] = b.g, g.data[i + 4 * m + 2] = b.b, g.data[i + 4 * m + 3] = 255);
          d.putImageData(g, 0, 0);
          e.images[f] = {
            width: c.width,
            height: c.height,
            data: c.toDataURL()
          };
          h = document.getElementById("resources");
          h || (h = document.createElement("DIV"), h.id = "resources", document.body.appendChild(h),
            h = document.getElementById("resources"));
          g = new Image;
          g.src = e.images[f].data;
          h.appendChild(g)
        }
    }, !1)
  }
};
font.BitmapFont.prototype = {
  text: function(a, b) {
    b || (b = a.innerHTML);
    a.innerHTML = "";
    for (var c = 0; c < b.length; c++) {
      var d = document.createElement("IMG"),
        e = b.charCodeAt(c);
      if (10 == e) d = document.createElement("BR"), a.appendChild(d);
      else if (32 == e) d.width = 48, d.height = 48, d.src = "images/hidden.png", a.appendChild(d);
      else if (e = this.images[e]) d.src = e.data, d.width = 1.5 * e.width, d.height = 1.5 * e.height, a.appendChild(d)
    }
  }
};
font.Font.prototype = {
  text: function(a, b) {
    b || (b = a.innerHTML);
    a.innerHTML = "";
    for (var c = 0; c < b.length; c++) {
      var d = document.createElement("IMG"),
        e = b.charCodeAt(c);
      if (10 == e) d = document.createElement("BR"), a.appendChild(d);
      else if (e = this.images[e - 1]) d.src = e.data, a.appendChild(d)
    }
  }
};
raycast = {
  defaults: {
    width: 640,
    height: 480,
    horizontalCasting: !1,
    horizontalShading: !1,
    verticalShading: !1
  },
  Engine: function(a) {
    this.width = a.width || raycast.defaults.width;
    this.height = a.height || raycast.defaults.height;
    this.distanceLUT = new raycast.DistanceLUT(this.height);
    this.shaderImage = new raycast.Shader;
    this.canvas = a.canvas || document.createElement("CANVAS");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    a.webgl ? (WebGL2D.enable(this.canvas), this.context = this.canvas.getContext("webgl-2d")) :
      this.context = this.canvas.getContext("2d");
    this.verticalContext = new raycast.Context(this.width, this.height);
    this.horizontalContext = new raycast.Context(this.width, this.height);
    this.horizontalCasting = a.horizontalCasting || raycast.defaults.horizontalCasting;
    this.horizontalShading = a.horizontalShading || raycast.defaults.horizontalShading;
    this.verticalShading = a.verticalShading || raycast.defaults.verticalShading;
    this.fps = null;
    this.frameTime = 0;
    this.map = a.map || new maps.Map;
    this.background = a.background || document.createElement("CANVAS");
    this.background.width = this.width;
    this.background.height = this.height;
    this.backgroundContext = this.background.getContext("2d");
    this.backgroundRender();
    this.player = a.player || new player.Player;
    this.mask = [];
    for (var b = 0; b < this.width; b += 3)
      for (var c = 0; c < this.height; c += 3) this.mask.push({
        x: b,
        y: c
      });
    this.mask = utils.shuffle(this.mask);
    this.maskIndex = 0;
    this.maskColor = a.maskColor || "#a00";
    this.maskSpeed = a.maskSpeed || this.width * this.height / 600;
    this.maskContext = new raycast.Context(this.width, this.height, a.mask);
    this.maskContext.context.clearRect(0,
      0, this.width, this.height)
  },
  Context: function(a, b, c) {
    this.width = a;
    this.height = b;
    this.canvas = c || document.createElement("CANVAS");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d")
  },
  DistanceLUT: function(a) {
    for (var b = 0; b < a; b++) this[b] = a / (2 * b - a)
  },
  canvas: null,
  shaderImage: null,
  verticalContext: null,
  horizontalContext: null,
  Shader: function() {
    this.canvas = document.createElement("CANVAS");
    this.canvas.width = 1;
    this.canvas.height = 256;
    this.context = this.canvas.getContext("2d");
    this.data = this.context.createImageData(1, 256);
    for (var a = 0; 1024 > a; a += 4) this.data.data[a] = 0, this.data.data[a + 1] = 0, this.data.data[a + 2] = 0, this.data.data[a + 3] = a;
    this.context.putImageData(this.data, 0, 0)
  }
};
raycast.Engine.prototype = {
  setResolution: function(a, b) {
    this.width = a;
    this.height = b;
    this.distanceLUT = new raycast.DistanceLUT(this.height);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.verticalContext = new raycast.Context(this.width, this.height);
    this.horizontalContext = new raycast.Context(this.width, this.height);
    this.background.width = this.width;
    this.background.height = this.height;
    this.backgroundRender();
    this.mask = [];
    for (var c = 0; c < this.width; c += 3)
      for (var d = 0; d < this.height; d += 3) this.mask.push({
        x: c,
        y: d
      });
    this.mask = utils.shuffle(this.mask);
    this.maskIndex = 0;
    this.maskSpeed = this.width * this.height / 600;
    this.maskContext = new raycast.Context(this.width, this.height, this.maskContext.canvas);
    this.maskContext.context.clearRect(0, 0, this.width, this.height)
  },
  backgroundRender: function() {
    this.backgroundContext.fillStyle = "rgb(" + resources.palette[this.map.ceiling][0] + "," + resources.palette[this.map.ceiling][1] + "," + resources.palette[this.map.ceiling][2] + ")";
    this.backgroundContext.fillRect(0, 0, this.width, this.height /
      2);
    this.backgroundContext.fillStyle = "rgb(" + resources.palette[this.map.floor][0] + "," + resources.palette[this.map.floor][1] + "," + resources.palette[this.map.floor][2] + ")";
    this.backgroundContext.fillRect(0, this.height / 2, this.width, this.height / 2)
  },
  calculateShader: function() {
    return 0
  },
  render: function() {
    this.rendering || (this.rendering = !0, this.cast(), this.rendering = !1)
  },
  fizzleFade: function() {
    if (this.maskIndex == this.mask.length - 1) return !1;
    this.maskContext.context.fillStyle = this.maskColor;
    for (var a = min(round(this.maskIndex +
        this.maskSpeed * game.timeFactor), this.mask.length - 1), b = this.maskIndex; b <= a; b++) {
      var c = this.mask[b];
      this.maskContext.context.fillRect(c.x, c.y, 3, 3)
    }
    this.maskIndex = a;
    return !0
  },
  fizzleClear: function() {
    if (0 == this.maskIndex) return !1;
    for (var a = max(round(this.maskIndex - this.maskSpeed * game.timeFactor), 0), b = this.maskIndex; b >= a; b--) {
      var c = this.mask[b];
      this.maskContext.context.clearRect(c.x, c.y, 3, 3)
    }
    this.maskIndex = a;
    return !0
  },
  cast: function() {
    this.fpsStart || (this.fpsStart = (new Date).getTime());
    var a = (new Date).getTime();
    this.verticalContext.context.clearRect(0, 0, this.width, this.height);
    this.horizontalCasting && (this.horizontalData = this.horizontalContext.context.createImageData(this.width, this.height), this.horizontalPixels = this.horizontalData.data);
    this.zBuffer = [];
    this.player.fireBuffer = [];
    for (var b = [], c = 0; c < this.width; c++) {
      var d = [],
        e = [],
        f = 2 * c / this.width - 1,
        h = this.player.x,
        g = this.player.y,
        j = this.player.direction.x + this.player.plane.x * f,
        i = this.player.direction.y + this.player.plane.y * f,
        m = floor(h),
        l = floor(g),
        p, q, n = sqrt(1 +
          i * i / (j * j)),
        o = sqrt(1 + j * j / (i * i)),
        r, s;
      0 > j ? (r = -1, p = (h - m) * n) : (r = 1, p = (m + 1 - h) * n);
      0 > i ? (s = -1, q = (g - l) * o) : (s = 1, q = (l + 1 - g) * o);
      for (var t, f = !1; !f;) {
        p < q ? (p += n, m += r, t = 0) : (q += o, l += s, t = 1);
        if (this.map.spriteMap[m] && this.map.spriteMap[m][l])
          for (var u = this.map.spriteMap[m][l], f = 0; f < u.length; f++) {
            var k = u[f];
            0 > b.indexOf(k) && b.push(k)
          }
        if (f = this.map.getSecret(m, l)) k = !f.hidden && !f.shift ? f.state : 0, u = f.hidden, e.push(0 == t ? {
          perspectiveDistance: abs((m - h + (0 < j ? k : -k) + (1 - r) / 2) / j),
          x: m + (0 < j ? k : -k),
          y: l,
          side: t,
          secret: f,
          hidden: u
        } : {
          perspectiveDistance: abs((l -
            g + (0 < i ? k : -k) + (1 - s) / 2) / i),
          x: m,
          y: l + (0 < i ? k : -k),
          side: t,
          secret: f,
          hidden: u
        });
        f = this.map.getMapValue(m, l);
        null === f && (f = !0);
        (k = this.map.getDoor(m, l)) && d.push(0 == t ? {
          perspectiveDistance: abs((m - h + (0 < j ? 0.5 : -0.5) + (1 - r) / 2) / j),
          x: m + (0 < j ? 0.5 : -0.5),
          y: l,
          side: t,
          door: k
        } : {
          perspectiveDistance: abs((l - g + (0 < i ? 0.5 : -0.5) + (1 - s) / 2) / i),
          x: m,
          y: l + (0 < i ? 0.5 : -0.5),
          side: t,
          door: k
        })
      }
      p = 0 == t ? abs((m - h + (1 - r) / 2) / j) : abs((l - g + (1 - s) / 2) / i);
      for (f = 0; f < d.length; f++)
        if (k = d[f], k.perspectiveDistance < p && (n = abs(floor(this.height / k.perspectiveDistance)),
            q = -n / 2, o = n / 2, n = o - q, q += this.height / 2, o += this.height / 2, o = 0 == k.side ? g + (k.x - h + (1 - r) / 2) / j * i : h + (k.y - g + (1 - s) / 2) / i * j, o -= floor(o), o = floor(o * resources.textureWidth), o > k.door.slide && !this.zBuffer[c])) {
          this.zBuffer[c] = k.perspectiveDistance;
          o = min(resources.textureWidth, o - k.door.slide);
          this.verticalContext.context.drawImage(k.door.getTexture(k.side), o, 0, 1, resources.textureHeight, c, q, 1, n);
          break
        } d = e.slice(0);
      d.sort(function(a, b) {
        return a.perspectiveDistance - b.perspectiveDistance
      });
      for (f = 0; f < d.length; f++)
        if (k = d[f],
          k.perspectiveDistance < p) {
          q = abs(floor(this.height / k.perspectiveDistance));
          e = -q / 2;
          n = q / 2;
          q = n - e;
          e += this.height / 2;
          n += this.height / 2;
          n = 0 == k.side ? g + (k.x - h + (1 - r) / 2) / j * i : h + (k.y - g + (1 - s) / 2) / i * j;
          n -= floor(n);
          n = floor(n * resources.textureWidth);
          if (0 == k.side && 0 < j || 1 == k.side && 0 > i) n = resources.textureWidth - n - 1;
          if (!this.zBuffer[c] || k.perspectiveDistance < this.zBuffer[c]) {
            k.hidden || (this.zBuffer[c] = k.perspectiveDistance, this.verticalContext.context.drawImage(k.secret.getTexture(k.side), n, 0, 1, resources.textureHeight, c, e,
              1, q));
            break
          }
        } if (!this.zBuffer[c]) {
        this.zBuffer[c] = p;
        f = this.map.getTexture(m, l, t, j, i);
        d = abs(floor(this.height / p));
        k = -d / 2;
        e = d / 2;
        d = e - k;
        k += this.height / 2;
        e += this.height / 2;
        h = 0 == t ? g + (m - h + (1 - r) / 2) / j * i : h + (l - g + (1 - s) / 2) / i * j;
        h -= floor(h);
        h = floor(h * resources.textureWidth);
        if (0 == t && 0 < j || 1 == t && 0 > i) h = resources.textureWidth - h - 1;
        f && (this.verticalContext.context.drawImage(f, h, 0, 1, resources.textureHeight, c, k, 1, d), this.verticalShading && this.verticalContext.context.drawImage(this.shaderImage, 0, this.calculateShader(), 1,
          1, c, k, 1, d))
      }
    }
    this.context.clearRect(0, 0, this.width, this.height);
    this.horizontalCasting && (this.horizontalContext.context.putImageData(this.horizontalData, 0, 0), this.context.drawImage(this.horizontalContext.canvas, 0, 0, this.width, this.height));
    this.player.fireBuffer = [];
    var b = b.concat(this.player.map.ai),
      v = this.player.x,
      w = this.player.y;
    b.sort(function(a, b) {
      var c = sqrt((v - a.x) * (v - a.x) + (w - a.y) * (w - a.y));
      return sqrt((v - b.x) * (v - b.x) + (w - b.y) * (w - b.y)) - c
    });
    for (f = 0; f < b.length; f++)
      if (k = b[f], j = k.x - this.player.x + 0.5,
        t = k.y - this.player.y + 0.5, i = 1 / (this.player.plane.x * this.player.direction.y - this.player.direction.x * this.player.plane.y), c = i * (-this.player.plane.y * j + this.player.plane.x * t), 0 < c) {
        j = this.width / 2 * (1 + i * (this.player.direction.y * j - this.player.direction.x * t) / c);
        h = abs(this.height / c);
        t = -h / 2;
        g = h / 2;
        i = g - t;
        t += this.height / 2;
        g += this.height / 2;
        h /= this.width / this.height;
        r = floor(max(0, -h / 2 + j));
        g = floor(min(this.width - 1, h / 2 + j));
        k.spriteWidth = floor(h);
        k.visibleWidth = 0;
        k.center = r + (g - r) / 2;
        m = [];
        for (l = 0; r < g; r++) c < this.zBuffer[r] ?
          (k.visibleWidth++, s = min(resources.textureWidth, max(0, floor((r - (-h / 2 + j)) * resources.textureWidth / h))), m[l] ? (m[l].stripeRight = r, m[l].texRight = s) : m[l] = {
            stripeLeft: r,
            texLeft: s
          }, k.hitpoints && (this.player.fireBuffer[r] = k)) : m[l] && l++;
        for (l = 0; l < m.length; l++) l = m[l], l.stripeRight || (l.stripeRight = l.stripeLeft + 1, l.texRight = l.texLeft + 1), this.verticalContext.context.drawImage(k.texture, l.texLeft + (k.animations.current ? k.animations[k.animations.current].state + (k.animations[k.animations.current].slide ? k.getTextureSlide() :
          0) : 0), 0, max(1, l.texRight - l.texLeft), resources.textureHeight, l.stripeLeft, t, max(1, l.stripeRight - l.stripeLeft), i)
      } this.canvas.flash ? (b = this.canvas.flashColor, k = this.canvas.flashState, this.verticalContext.context.fillStyle = "rgba(" + b[0] + "," + b[1] + "," + b[2] + "," + k + ")", this.verticalContext.context.fillRect(0, 0, this.width, this.height), this.canvas.flashState = min(0.3, this.canvas.flashState + 0.15 * game.timeFactor), 0.3 == this.canvas.flashState && (this.canvas.flash = !1)) : 0 < this.canvas.flashState && (b = this.canvas.flashColor,
      k = this.canvas.flashState, this.verticalContext.context.fillStyle = "rgba(" + b[0] + "," + b[1] + "," + b[2] + "," + k + ")", this.verticalContext.context.fillRect(0, 0, this.width, this.height), this.canvas.flashState = max(0, this.canvas.flashState - 0.15 * game.timeFactor));
    if (-1 < window.location.href.search("showmap")) {
      for (f = 0; 64 > f; f++)
        for (b = 0; 64 > b; b++) this.verticalContext.context.fillStyle = this.map.getHitValue(b, f) ? "#f00" : "#00f", this.verticalContext.context.fillRect(5 + 2 * f, 5 + 2 * b, 2, 2);
      for (f = 0; f < this.map.ai.length; f++) b = this.map.ai[f],
        this.verticalContext.context.fillStyle = 0 == b.direction.x && 0 == b.direction.y ? "#000" : 0 != b.direction.x && 0 != b.direction.y ? "#0ff" : "#0f0", this.verticalContext.context.fillRect(5 + 2 * b.baseY, 5 + 2 * b.baseX, 2, 2);
      this.verticalContext.context.fillStyle = "#ff0";
      this.verticalContext.context.fillRect(5 + 2 * floor(this.player.y), 5 + 2 * floor(this.player.x), 2, 2)
    }
    this.context.drawImage(this.verticalContext.canvas, 0, 0, this.width, this.height);
    b = (new Date).getTime();
    this.frameTime = b - a;
    1E3 < b - this.fpsStart ? (this.fps = this.fpsCounter,
      this.fpsCounter = 0, this.fpsStart = null) : this.fpsCounter ? this.fpsCounter++ : this.fpsCounter = 1
  }
};
controller = {
  keys: {
    left: {
      keyCode: [65],
      single: !1,
      exception: ["right"]
    },
    right: {
      keyCode: [68],
      single: !1,
      exception: ["left"]
    },
    strafe: {
      keyCode: [18],
      single: !1
    },
    run: {
      keyCode: [16],
      single: !0
    },
    forward: {
      keyCode: [87],
      single: !1,
      exception: ["backward"]
    },
    backward: {
      keyCode: [83],
      single: !1,
      exception: ["forward"]
    },
    door: {
      keyCode: [69],
      single: !0
    },
    knife: {
      keyCode: [49],
      single: !0
    },
    pistol: {
      keyCode: [50],
      single: !0
    },
    gun: {
      keyCode: [51],
      single: !0
    },
    machinegun: {
      keyCode: [52],
      single: !0
    },
    fire: {
      keyCode: [32],
      single: !1
    }
  },
  keydown: function(a) {
    a ||
      (a = window.event);
    for (var b in this.keys)
      if (-1 < this.keys[b].keyCode.indexOf(a.keyCode)) return void 0 == this.activeKey[b] && (this.activeKey[b] = !0, delete this.inactiveKey[b]), a.stopPropagation(), a.preventDefault(), !1
  },
  keyup: function(a) {
    a || (a = window.event);
    for (var b in this.keys)
      if (-1 < this.keys[b].keyCode.indexOf(a.keyCode)) return delete this.activeKey[b], this.inactiveKey[b] = !0, a.stopPropagation(), a.preventDefault(), !1
  },
  Controller: function(a) {
    this.keys = a.keys || controller.keys;
    this.activeListeners = a.activeListeners || {};
    this.inactiveListeners = a.inactiveListeners || {};
    this.activeKey = {};
    this.inactiveKey = {};
    window.addEventListener("keydown", utils.bind(this, controller.keydown), !1);
    window.addEventListener("keyup", utils.bind(this, controller.keyup), !1)
  }
};
controller.Controller.prototype = {
  reset: function() {
    this.activeKey = {};
    this.inactiveKey = {}
  },
  process: function() {
    for (var a in this.activeKey) {
      var b = this.keys[a];
      if (this.activeKey[a] && this.activeListeners[a])
        if (b.exception) {
          for (var c = !1, d = 0; d < b.exception.length; d++) {
            var e = b.exception[d];
            this.activeKey[e] && (c = !0);
            this.inactiveKey[e] && (c = !0, delete this.inactiveKey[e])
          }
          c || (this.activeKey[a] = !this.activeListeners[a]() && !this.keys[a].single)
        } else this.activeKey[a] = !this.activeListeners[a]() && !this.keys[a].single
    }
    for (a in this.inactiveKey) this.inactiveKey[a] &&
      (this.inactiveListeners[a] ? this.inactiveKey[a] = !this.inactiveListeners[a]() : delete this.inactiveKey[a])
  }
};
game = {
  tick: 1E3 / 33,
  levelConfig: null,
  level: null,
  client: null,
  ctrl: null,
  engine: null,
  loop: null,
  mapName: null,
  difficulty: null,
  pause: !1,
  restart: !1,
  death: !1,
  roster: !1,
  intro: !0,
  m: !1,
  l: !1,
  i: !1,
  gameLoop: function() {
    if (game.pause) {
      if (game.win) {
        var a = floor(game.client.time / 1E3);
        if (game.average) {
          if (game.average.totalTime += a, game.client.total.kill && (game.average.kill = floor((game.average.kill + floor(100 * (game.client.ratio.kill / game.client.total.kill))) / 2)), game.client.total.secret && (game.average.secret = floor((game.average.secret +
              floor(100 * (game.client.ratio.secret / game.client.total.secret))) / 2)), game.client.total.treasure) game.average.treasure = floor((game.average.treasure + floor(100 * (game.client.ratio.treasure / game.client.total.treasure))) / 2)
        } else if (game.average = {
            totalTime: a,
            kill: floor(100 * (game.client.ratio.kill / game.client.total.kill)),
            secret: floor(100 * (game.client.ratio.secret / game.client.total.secret)),
            treasure: floor(100 * (game.client.ratio.treasure / game.client.total.treasure))
          }, game.client.total.kill || (game.average.kill =
            100), game.client.total.secret || (game.average.secret = 100), !game.client.total.treasure) game.average.treasure = 100;
        game.win = null;
        window.onfocus = null;
        game.loop = null;
        audio.currentMusic && audio.stopMusic();
        var b = floor(game.average.totalTime / 60),
          c = game.average.totalTime - 60 * b;
        game.hideScreen("game", function() {
          document.getElementById("wingamescreen").style.display = "block";
          document.getElementById("hand").style.display = "";
          game.bitmap.text(document.querySelector("#wingamescreen .win"), "YOU WIN!");
          game.bitmap.text(document.querySelector("#wingamescreen .total"),
            "TOTAL TIME");
          game.bitmap.text(document.querySelector("#wingamescreen .time"), utils.fillString(b.toString(), "0", 2) + ":" + utils.fillString(c.toString(), "0", 2));
          game.bitmap.text(document.querySelector("#wingamescreen .averages"), "AVERAGES");
          game.bitmap.text(document.querySelector("#wingamescreen .kill"), "    KILL " + utils.fillString(game.average.kill.toString(), " ", 3) + "%");
          game.bitmap.text(document.querySelector("#wingamescreen .secret"), "  SECRET " + utils.fillString(game.average.secret.toString(), " ",
            3) + "%");
          game.bitmap.text(document.querySelector("#wingamescreen .treasure"), "TREASURE " + utils.fillString(game.average.treasure.toString(), " ", 3) + "%");
          audio.playMusic("urahero");
          game.trackEvent("game", "win");
          game.showScreen("game", null, function() {
            setTimeout(function() {
              window.onkeydown = window.onclick = function() {
                window.onkeydown = window.onclick = null;
                game.hideScreen("game", function() {
                  document.getElementById("wingamescreen").style.display = "";
                  "7" == game.mapName.slice(1, 2) && (audio.stopMusic(), audio.playMusic("xtower2"));
                  game.showReadme("episode" + game.mapName.slice(1, 2), function() {
                    audio.currentMusic && audio.stopMusic();
                    game.newHighscore(game.mapName, game.client.score, game.menu)
                  })
                })
              }
            }, 1E3)
          })
        })
      }
      return !1
    }
    if (game.client.leveldone) {
      game.pause = !0;
      game.client.leveldone = null;
      audio.currentMusic && audio.stopMusic();
      a = floor(game.client.time / 1E3);
      game.client.time = null;
      var b = floor(a / 60),
        c = a - 60 * b,
        d = 0,
        e = game.levelConfig.par,
        f = floor(e / 60),
        h = e - 60 * f,
        d = 0 > a - e ? d + 500 * abs(a - e) : 0,
        e = document.querySelector("#endlevelscreen .floor"),
        g = document.querySelector("#endlevelscreen .bonus"),
        j = document.querySelector("#endlevelscreen .time"),
        i = document.querySelector("#endlevelscreen .par"),
        m = document.querySelector("#endlevelscreen .kill"),
        l = document.querySelector("#endlevelscreen .secret"),
        p = document.querySelector("#endlevelscreen .treasure"),
        q = game.levelConfig.episodeFloor;
      !game.secretFloor && !game.levelConfig.endscreen ? (game.bitmap.text(e, "FLOOR " + q), game.bitmap.text(document.querySelector("#endlevelscreen .completed"), "COMPLETED"), game.bitmap.text(g, "BONUS " + utils.fillString("0", " ",
        5)), game.bitmap.text(j, "TIME " + utils.fillString(b.toString(), "0", 2) + ":" + utils.fillString(c.toString(), "0", 2)), game.bitmap.text(i, " PAR " + utils.fillString(f.toString(), "0", 2) + ":" + utils.fillString(h.toString(), "0", 2)), game.bitmap.text(m, "    KILL RATIO   0%"), game.bitmap.text(l, "  SECRET RATIO   0%"), game.bitmap.text(p, "TREASURE RATIO   0%"), game.hideScreen("game", function() {
        document.getElementById("endlevelscreen").style.display = "block";
        audio.playMusic("endlevel");
        game.showScreen("game");
        game.trackEvent("game",
          "endlevel " + game.mapName);
        setTimeout(function() {
          var b = 0,
            c = setInterval(function() {
              b == d && (clearInterval(c), audio.playSound("endbonus2", null, !0), setTimeout(function() {
                var b = 0,
                  c = setInterval(function() {
                    b == game.client.ratio.kill && (clearInterval(c), audio.playSound("endbonus2", null, !0), game.client.ratio.kill == game.client.total.kill && (d += 1E4, game.bitmap.text(g, "BONUS " + utils.fillString(d.toString(), " ", 5)), audio.playSound("percent100", null, !0)), setTimeout(function() {
                      var b = 0,
                        c = setInterval(function() {
                          if (b ==
                            game.client.ratio.secret) {
                            clearInterval(c);
                            audio.playSound("endbonus2", null, true);
                            if (game.client.ratio.secret == game.client.total.secret) {
                              d = d + 1E4;
                              game.bitmap.text(g, "BONUS " + utils.fillString(d.toString(), " ", 5));
                              audio.playSound("percent100", null, true)
                            }
                            setTimeout(function() {
                              var b = 0,
                                c = setInterval(function() {
                                  if (b == game.client.ratio.treasure) {
                                    clearInterval(c);
                                    audio.playSound("endbonus2", null, true);
                                    if (game.client.ratio.treasure == game.client.total.treasure) {
                                      d = d + 1E4;
                                      game.bitmap.text(g, "BONUS " + utils.fillString(d.toString(),
                                        " ", 5));
                                      audio.playSound("percent100", null, true)
                                    }
                                    game.client.setProperty("score", d);
                                    if (!game.client.extraLife) game.client.extraLife = 0;
                                    var e = floor(game.client.score / 4E4);
                                    if (e > game.client.extraLife) {
                                      game.client.extraLife = e;
                                      if (game.client.setProperty("lives", 1)) {
                                        game.client.setProperty("health", 100);
                                        audio.playSound("bonus1up", null, true);
                                        game.client.render();
                                        wolf3d.utils.flashAddon()
                                      }
                                    }
                                    if (game.average) {
                                      game.average.totalTime = game.average.totalTime + a;
                                      if (game.client.total.kill) game.average.kill = floor((game.average.kill +
                                        floor(game.client.ratio.kill / game.client.total.kill * 100)) / 2);
                                      if (game.client.total.secret) game.average.secret = floor((game.average.secret + floor(game.client.ratio.secret / game.client.total.secret * 100)) / 2);
                                      if (game.client.total.treasure) game.average.treasure = floor((game.average.treasure + floor(game.client.ratio.treasure / game.client.total.treasure * 100)) / 2)
                                    } else game.average = {
                                      totalTime: a,
                                      kill: floor(game.client.ratio.kill / game.client.total.kill * 100),
                                      secret: floor(game.client.ratio.secret / game.client.total.secret *
                                        100),
                                      treasure: floor(game.client.ratio.treasure / game.client.total.treasure * 100)
                                    };
                                    window.onkeydown = window.onclick = function() {
                                      window.onkeydown = window.onclick = null;
                                      audio.stopMusic();
                                      game.hideScreen("game", function() {
                                        document.getElementById("endlevelscreen").style.display = "";
                                        doors.process = [];
                                        secret.process = [];
                                        animation.process = [];
                                        ai.process = [];
                                        audio.process = [];
                                        game.mapName = game.mapName.slice(0, 3) + (q + 1);
                                        var a = game.mapName;
                                        if (game.client.secretfound) {
                                          a = game.mapName.slice(0, 3) + game.levelConfig.secret;
                                          game.client.secretfound =
                                            null;
                                          game.secretFloor = true
                                        } else game.secretFloor = false;
                                        game.trackEvent("game", "new map: " + game.mapName);
                                        maps.request(a, function() {
                                          game.levelConfig = wolf3d.maps[a];
                                          game.level = new maps.Map(utils.clone(game.levelConfig), game.difficulty);
                                          game.client.x = game.levelConfig.start.x;
                                          game.client.y = game.levelConfig.start.y;
                                          game.client.direction = utils.clone(game.levelConfig.start.direction);
                                          game.client.plane = utils.clone(game.levelConfig.start.plane);
                                          game.client.map = game.level;
                                          game.client.speed = {
                                            rotation: 0.1,
                                            move: 0.2
                                          };
                                          game.client.floor = game.levelConfig.episodeFloor;
                                          game.client.textValue(document.getElementById("floor"), game.client.floor);
                                          game.client.time = null;
                                          game.client.render();
                                          game.client.max.speed = {
                                            rotation: 0.15,
                                            move: 0.35
                                          };
                                          game.client.keys = new player.Keys;
                                          game.client.keys.render();
                                          game.ctrl.activeKey = {};
                                          game.ctrl.inactiveKey = {};
                                          wolf3d.utils.clearFlash();
                                          game.engine.map = game.level;
                                          game.engine.backgroundRender();
                                          game.engine.render();
                                          game.showScreen("game");
                                          setTimeout(function() {
                                            game.pause = false;
                                            game.client.leveldone =
                                              null
                                          }, 1E3)
                                        })
                                      })
                                    }
                                  }
                                  game.bitmap.text(p, "TREASURE RATIO " + utils.fillString(floor(b / game.client.total.treasure * 100).toString(), " ", 3) + "%");
                                  audio.playSound("endbonus1");
                                  b = b + 1
                                }, 50)
                            }, 1E3)
                          }
                          game.bitmap.text(l, "  SECRET RATIO " + utils.fillString(floor(b / game.client.total.secret * 100).toString(), " ", 3) + "%");
                          audio.playSound("endbonus1");
                          b = b + 1
                        }, 50)
                    }, 1E3));
                    game.bitmap.text(m, "    KILL RATIO " + utils.fillString(floor(100 * (b / game.client.total.kill)).toString(), " ", 3) + "%");
                    audio.playSound("endbonus1");
                    b += 1
                  }, 50)
              }, 1E3));
              game.bitmap.text(g, "BONUS " + utils.fillString(b.toString(), " ", 5));
              audio.playSound("endbonus1");
              b += 500
            }, 50)
        }, 1E3)
      })) : game.hideScreen("game", function() {
        document.getElementById("secretlevelscreen").style.display = "block";
        game.bitmap.text(document.querySelector("#secretlevelscreen .secret"), game.levelConfig.endscreen ? game.endscreenTitle[game.levelConfig.endscreen] : "SECRET FLOOR");
        game.bitmap.text(document.querySelector("#secretlevelscreen .completed"), game.levelConfig.endscreen ? game.endscreenSubtitle[game.levelConfig.endscreen] :
          "COMPLETED!");
        game.bitmap.text(document.querySelector("#secretlevelscreen .bonus"), "15000 BONUS!");
        audio.playMusic("endlevel");
        game.showScreen("game");
        game.trackEvent("game", "endlevel " + game.mapName);
        setTimeout(function() {
          game.client.setProperty("score", 15E3);
          game.client.extraLife || (game.client.extraLife = 0);
          var a = floor(game.client.score / 4E4);
          a > game.client.extraLife && (game.client.extraLife = a, game.client.setProperty("lives", 1) && (game.client.setProperty("health", 100), audio.playSound("bonus1up", null,
            !0), game.client.render(), wolf3d.utils.flashAddon()));
          window.onkeydown = window.onclick = function() {
            window.onkeydown = window.onclick = null;
            audio.stopMusic();
            game.hideScreen("game", function() {
              document.getElementById("secretlevelscreen").style.display = "";
              doors.process = [];
              secret.process = [];
              animation.process = [];
              ai.process = [];
              audio.process = [];
              var a = game.mapName.slice(0, 3) + q,
                b = game.mapName;
              a == b && (b = game.mapName.slice(0, 3) + (q + 1));
              game.mapName = b;
              game.trackEvent("game", "new map: " + game.mapName);
              maps.request(game.mapName,
                function() {
                  game.secretFloor = false;
                  game.levelConfig = wolf3d.maps[game.mapName];
                  game.level = new maps.Map(utils.clone(game.levelConfig), game.difficulty);
                  game.client.x = game.levelConfig.start.x;
                  game.client.y = game.levelConfig.start.y;
                  game.client.direction = utils.clone(game.levelConfig.start.direction);
                  game.client.plane = utils.clone(game.levelConfig.start.plane);
                  game.client.map = game.level;
                  game.client.speed = {
                    rotation: 0.1,
                    move: 0.2
                  };
                  game.client.floor = game.levelConfig.episodeFloor;
                  game.client.textValue(document.getElementById("floor"),
                    game.client.floor);
                  game.client.time = null;
                  game.client.render();
                  game.client.max.speed = {
                    rotation: 0.15,
                    move: 0.35
                  };
                  game.client.keys = new player.Keys;
                  game.client.keys.render();
                  game.ctrl.activeKey = {};
                  game.ctrl.inactiveKey = {};
                  wolf3d.utils.clearFlash();
                  game.engine.map = game.level;
                  game.engine.backgroundRender();
                  game.engine.render();
                  game.showScreen("game");
                  setTimeout(function() {
                    game.pause = false;
                    game.client.leveldone = null
                  }, 1E3)
                })
            })
          }
        }, 1E3)
      });
      return !1
    }
    if (game.client.leveldone) return !1;
    0 == game.client.health && (game.death = !0);
    if (game.death)
      if (game.client.deathCam)
        if (document.getElementById("hand").style.display = "none", game.client.deathCam.rotate)
          if (("rotateRight" == game.client.deathCam.rotate && game.client.deathCam.center > game.engine.width / 2 || "rotateLeft" == game.client.deathCam.rotate && game.client.deathCam.center <= game.engine.width / 2) && (game.client.deathCam.prevCenter != game.client.deathCam.center || !game.client.deathCam.prevCenter)) game.client.deathCam.prevCenter = game.client.deathCam.center, game.client[game.client.deathCam.rotate](),
            game.engine.render();
          else {
            if (!game.restart && (game.restart = !game.engine.fizzleFade(), game.restart))
              if (audio.currentMusic && audio.stopMusic(), 0 < game.client.lives) {
                doors.process = [];
                secret.process = [];
                animation.process = [];
                ai.process = [];
                audio.process = [];
                game.level = new maps.Map(utils.clone(game.levelConfig), game.difficulty);
                game.client.deathCam = null;
                game.client.x = game.levelConfig.start.x;
                game.client.y = game.levelConfig.start.y;
                game.client.direction = utils.clone(game.levelConfig.start.direction);
                game.client.plane =
                  utils.clone(game.levelConfig.start.plane);
                game.client.map = game.level;
                game.client.speed = {
                  rotation: 0.1,
                  move: 0.2
                };
                game.client.health = 100;
                game.client.ammo = 8;
                game.client.lives--;
                game.client.time = null;
                game.client.textValue(document.getElementById("ammo"), game.client.ammo);
                game.client.textValue(document.getElementById("health"), game.client.health);
                game.client.textValue(document.getElementById("lives"), game.client.lives);
                game.client.render();
                game.client.max.speed = {
                  rotation: 0.15,
                  move: 0.35
                };
                game.client.weapons = [new player.Weapon(wolf3d.utils.weapons.knife), new player.Weapon(wolf3d.utils.weapons.pistol)];
                game.client.keys = new player.Keys;
                game.client.keys.render();
                "e7m21" == game.mapName && game.client.keys.add("gold");
                for (f = 0; f < game.client.weapons.length; f++) h = game.client.weapons[f], h.animation && h.animation.callback && (h.animation.callback = utils.bind(game.client, h.animation.callback));
                game.client.activeWeapon = game.client.weapons[game.client.weapons.length - 1];
                game.client.activeWeapon.render();
                game.ctrl.activeKey = {};
                game.ctrl.inactiveKey = {};
                wolf3d.utils.clearFlash();
                game.engine.map = game.level;
                game.engine.backgroundRender();
                game.engine.render();
                document.getElementById("hand").style.display = ""
              } else game.client.deathCam = null, game.roster = !0
          }
    else audio.playSound("playerdeath"), game.client.deathCam.center > game.engine.width / 2 ? game.client.deathCam.rotate = "rotateRight" : game.client.deathCam.center <= game.engine.width / 2 && (game.client.deathCam.rotate = "rotateLeft");
    else game.restart && (game.roster ? audio.currentMusic || (window.onkeydown =
      window.onclick = null, game.win = null, game.pause = !0, game.loop = null, game.hideScreen("game", function() {
        audio.playMusic("roster");
        game.newHighscore(game.mapName, game.client.score, game.menu)
      })) : (audio.currentMusic && audio.stopMusic(), game.engine.fizzleClear() || (game.death = !1, game.restart = !1)));
    else {
      void 0 == game.client.time || null == game.client.time ? (game.client.time = 0, game.client.total = {
        kill: game.client.map.ai.length,
        secret: game.client.map.secrets.length,
        treasure: game.client.map.treasures
      }, game.client.ratio = {
        kill: 0,
        secret: 0,
        treasure: 0
      }) : game.client.time += game.renderFrame;
      game.client.extraLife || (game.client.extraLife = 0);
      f = floor(game.client.score / 4E4);
      f > game.client.extraLife && (game.client.extraLife = f, game.client.setProperty("lives", 1) && (game.client.setProperty("health", 100), audio.playSound("bonus1up", null, !0), game.client.render(), wolf3d.utils.flashAddon()));
      audio.currentMusic || audio.playMusic(game.levelConfig.music);
      for (f = 0; f < doors.process.length; f++)
        if (e = doors.process[f], game.client.map.inDoor(game.client.x,
            game.client.y) || !(e.isOpen() && "open" == e.action)) {
          j = !1;
          for (i = 0; i < ai.process.length; i++)
            if (h = ai.process[i], h.getDistance(e.x + 0.5, e.y + 0.5) < sqrt2 && e.isOpen() && "open" == e.action) {
              j = !0;
              break
            } j || e.process && e.process()
        } for (f = 0; f < secret.process.length; f++) h = secret.process[f], h.process && h.process();
      for (f = 0; f < animation.process.length; f++) h = animation.process[f], h.process && h.process();
      for (f = 0; f < ai.process.length; f++) h = ai.process[f], h.process && h.process(game.client);
      for (scripts.process = []; audio.process.length;) h =
        audio.process.pop(), e = game.client.getDistance(h.x, h.y), f = utils.round(min(1, max(0, 25 - e) / 25), 1), 0.1 < f && audio.playSound(h.id, f, !0);
      game.auto ? game.auto() : game.ctrl.process();
      game.client.render();
      game.engine.render()
    }
    game.debug && (document.title = game.engine.fps + "fps / " + game.engine.frameTime + "ms / " + floor(1E3 / game.engine.frameTime) + "fps")
  },
  endscreenTitle: {
    transgrosse: "TRANS\nGROSSE",
    wilhelm: "BARNACLE\nWILHELM",
    ubermutant: "UBERMUTANT"
  },
  endscreenSubtitle: {
    transgrosse: "DEFEATED!",
    wilhelm: "DEFEATED!",
    ubermutant: "DEFEATED!"
  },
  newGame: function(a, b, c, d) {
    game.trackEvent("game", "new map: " + a + " diff: " + b);
    if (!a || void 0 == b || null == b || !c) return !1;
    game.mapName = a;
    game.difficulty = b;
    game.requestHTML("game", function() {
      resources.init(function() {
        game.requestJavaScript("animation,sprites,doors,secret,scripts,maps,player,ai,raycast,controller".split(","), function() {
          doors.process = [];
          secret.process = [];
          animation.process = [];
          ai.process = [];
          audio.process = [];
          maps.request(game.mapName, function() {
            game.levelConfig = wolf3d.maps[game.mapName];
            game.level =
              new maps.Map(utils.clone(game.levelConfig), game.difficulty);
            if (game.client) {
              game.client.deathCam = null;
              game.client.x = game.levelConfig.start.x;
              game.client.y = game.levelConfig.start.y;
              game.client.direction = utils.clone(game.levelConfig.start.direction);
              game.client.plane = utils.clone(game.levelConfig.start.plane);
              game.client.map = game.level;
              game.client.speed = {
                rotation: 0.1,
                move: 0.2
              };
              game.client.health = 100;
              game.client.ammo = 8;
              game.client.lives = 3;
              game.client.score = 0;
              game.client.floor = game.levelConfig.episodeFloor;
              game.client.textValue(document.getElementById("ammo"), game.client.ammo);
              game.client.textValue(document.getElementById("health"), game.client.health);
              game.client.textValue(document.getElementById("lives"), game.client.lives);
              game.client.textValue(document.getElementById("score"), game.client.score);
              game.client.textValue(document.getElementById("floor"), game.client.floor);
              game.client.render();
              game.client.max.speed = {
                rotation: 0.15,
                move: 0.35
              };
              game.client.weapons = [new player.Weapon(wolf3d.utils.weapons.knife),
                new player.Weapon(wolf3d.utils.weapons.pistol)
              ];
              game.client.keys = new player.Keys;
              game.client.keys.render();
              game.client.time = null;
              game.client.total = null;
              game.client.ratio = null;
              for (var a = 0; a < game.client.weapons.length; a++) {
                var b = game.client.weapons[a];
                if (b.animation && b.animation.callback) b.animation.callback = utils.bind(game.client, b.animation.callback)
              }
              game.client.activeWeapon = game.client.weapons[game.client.weapons.length - 1];
              game.client.activeWeapon.render()
            } else game.client = new player.Player({
              x: game.levelConfig.start.x,
              y: game.levelConfig.start.y,
              direction: utils.clone(game.levelConfig.start.direction),
              plane: utils.clone(game.levelConfig.start.plane),
              map: game.level,
              speed: {
                rotation: 0.1,
                move: 0.2
              },
              acceleration: {
                rotation: 1.25,
                move: 1.5
              },
              decceleration: {
                rotation: 1.25,
                move: 1.1
              },
              health: 100,
              ammo: 8,
              lives: 3,
              score: 0,
              floor: 1,
              min: {
                speed: {
                  rotation: 0.1,
                  move: 0.2
                }
              },
              max: {
                speed: {
                  rotation: 0.15,
                  move: 0.35
                }
              },
              weapons: [new player.Weapon(wolf3d.utils.weapons.knife), new player.Weapon(wolf3d.utils.weapons.pistol)]
            });
            if (game.engine) {
              game.engine.map =
                game.level;
              game.engine.backgroundRender();
              game.engine.maskIndex = 0;
              game.engine.maskContext.context.clearRect(0, 0, game.engine.width, game.engine.height)
            } else {
              if (localStorage.graphics) wolf3d.graphics = JSON.parse(localStorage.graphics);
              game.engine = new raycast.Engine({
                canvas: document.getElementById("view"),
                background: document.getElementById("background"),
                mask: document.getElementById("mask"),
                map: game.level,
                player: game.client,
                width: wolf3d.graphics.width,
                height: wolf3d.graphics.height
              })
            }
            if (game.ctrl) {
              game.ctrl.activeKey = {};
              game.ctrl.inactiveKey = {}
            } else {
              a = localStorage.ctrl ? JSON.parse(localStorage.ctrl) : controller.keys;
              utils.extend(a, {
                menu: {
                  keyCode: [27],
                  single: true
                },
                pause: {
                  keyCode: [8],
                  single: true
                },
                m: {
                  keyCode: [77],
                  single: true
                },
                l: {
                  keyCode: [76],
                  single: true
                },
                i: {
                  keyCode: [73],
                  single: true
                }
              });
              utils.extend(a, {
                viewInc: {
                  keyCode: [107]
                },
                viewDec: {
                  keyCode: [109]
                },
                viewReset: {
                  keyCode: [106],
                  single: true
                }
              });
              game.ctrl = new controller.Controller({
                keys: a,
                activeListeners: {
                  viewInc: function() {
                    var a = document.getElementById("game");
                    localStorage.zoom =
                      localStorage.zoom ? (round(localStorage.zoom * 100) + 1) / 100 : 1.01;
                    if (a.style.zoom !== void 0) a.style.zoom = parseFloat(localStorage.zoom);
                    else if (a.style.MozTransform !== void 0) a.style.MozTransform = "scale(" + localStorage.zoom + ")"
                  },
                  viewDec: function() {
                    var a = document.getElementById("game");
                    if (localStorage.zoom) {
                      if (parseFloat(localStorage.zoom) > 0.1) localStorage.zoom = (round(localStorage.zoom * 100) - 1) / 100
                    } else localStorage.zoom = 0.99;
                    if (a.style.zoom !== void 0) a.style.zoom = parseFloat(localStorage.zoom);
                    else if (a.style.MozTransform !==
                      void 0) a.style.MozTransform = "scale(" + localStorage.zoom + ")"
                  },
                  viewReset: function() {
                    var a = document.getElementById("game");
                    if (a.style.zoom !== void 0) a.style.zoom = "";
                    else if (a.style.MozTransform !== void 0) a.style.MozTransform = "";
                    localStorage.removeItem("zoom")
                  },
                  menu: function() {
                    if (game.death || game.restart || game.roster) return false;
                    game.pause = true;
                    game.hideScreen("game", game.gameMenu)
                  },
                  pause: function() {
                    game.gamepause = true;
                    game.pause = true;
                    document.getElementById("gamepause").style.display = "block";
                    window.onkeydown =
                      function(a) {
                        if (a.keyCode != 8) {
                          window.onkeydown = null;
                          game.gamepause = false;
                          document.getElementById("gamepause").style.display = "";
                          game.pause = false
                        }
                      }
                  },
                  m: function() {
                    if (game.death || game.restart || game.roster) return false;
                    game.m = true
                  },
                  l: function() {
                    if (game.death || game.restart || game.roster || !game.m) return false;
                    game.l = true
                  },
                  i: function() {
                    if (game.death || game.restart || game.roster || !game.m || !game.l) return false;
                    game.i = true;
                    game.client.setProperty("health", 100);
                    game.client.setProperty("ammo", 99);
                    game.client.setProperty("score",
                      -999999);
                    game.client.keys.add("gold");
                    game.client.keys.add("silver");
                    if (!game.client.hasWeapon(wolf3d.utils.weapons.machineGun.id)) {
                      var a = new player.Weapon(wolf3d.utils.weapons.machineGun);
                      game.client.weapons.push(a);
                      a = game.client.weapons[game.client.weapons.length - 1];
                      if (a.animation && a.animation.callback) a.animation.callback = utils.bind(game.client, a.animation.callback);
                      game.client.getActiveWeapon().id < 2 && game.client.weapon(2)
                    }
                    if (!game.client.hasWeapon(wolf3d.utils.weapons.gatling.id)) {
                      a = new player.Weapon(wolf3d.utils.weapons.gatling);
                      game.client.weapons.push(a);
                      a = game.client.weapons[game.client.weapons.length - 1];
                      if (a.animation && a.animation.callback) a.animation.callback = utils.bind(game.client, a.animation.callback);
                      game.client.weapon(3)
                    }
                    game.client.time = game.client.time + 6E5;
                    game.client.face.setSmile(1E3);
                    game.m = false;
                    game.l = false;
                    game.i = false;
                    game.pause = true;
                    game.showMessage(game.cheatStr);
                    window.onkeydown = function(a) {
                      if (!a) a = window.event;
                      if (a.keyCode == 13) {
                        window.onkeydown = null;
                        game.hideMessage();
                        game.pause = false
                      }
                    }
                  },
                  left: utils.bind(game.client,
                    function() {
                      game.client.left();
                      return false
                    }),
                  right: utils.bind(game.client, function() {
                    game.client.right();
                    return false
                  }),
                  strafe: utils.bind(game.client, function() {
                    game.client.left = game.client.rotateLeft;
                    game.client.right = game.client.rotateRight;
                    return false
                  }),
                  run: utils.bind(game.client, function() {
                    game.client.speed.rotation = game.client.max.speed.rotation;
                    game.client.speed.move = game.client.max.speed.move;
                    return false
                  }),
                  forward: utils.bind(game.client, function() {
                    game.client.forward();
                    return false
                  }),
                  backward: utils.bind(game.client,
                    function() {
                      game.client.backward();
                      return false
                    }),
                  door: utils.bind(game.client, game.client.door),
                  fire: utils.bind(game.client, function() {
                    return game.client.getActiveWeapon().fire(game.client)
                  }),
                  knife: utils.bind(game.client, function() {
                    game.client.weapon(0)
                  }),
                  pistol: utils.bind(game.client, function() {
                    game.client.weapon(1)
                  }),
                  gun: utils.bind(game.client, function() {
                    game.client.weapon(2)
                  }),
                  machinegun: utils.bind(game.client, function() {
                    game.client.weapon(3)
                  })
                },
                inactiveListeners: {
                  m: function() {
                    game.m = false
                  },
                  l: function() {
                    game.l =
                      false
                  },
                  strafe: utils.bind(game.client, function() {
                    game.client.left = game.client.strafeLeft;
                    game.client.right = game.client.strafeRight;
                    return true
                  }),
                  run: utils.bind(game.client, function() {
                    game.client.speed.rotation = game.client.min.speed.rotation;
                    game.client.speed.move = game.client.min.speed.move;
                    return true
                  }),
                  fire: utils.bind(game.client, function() {
                    return game.client.getActiveWeapon().release()
                  })
                }
              })
            }
            game.restart = false;
            game.death = false;
            game.roster = false;
            d && d();
            game.engine.render();
            document.getElementById("hand").style.display =
              "";
            game.showScreen("game", null, function() {
              for (var a = document.querySelectorAll("*[ctrl]"), b = 0; b < a.length; b++) {
                var c = a[b];
                c.onmousedown = function(a) {
                  game.mousedown = true;
                  this.onmouseover(a)
                };
                c.onmouseover = function(a) {
                  if (!a) a = window.event;
                  if (game.mousedown)
                    for (var a = a.srcElement.getAttribute("ctrl").split(","), b = 0; b < a.length; b++) {
                      var c = a[b];
                      if (this.activeKey[c] == void 0) {
                        this.activeKey[c] = true;
                        delete this.inactiveKey[c]
                      }
                    }
                }.bind(game.ctrl);
                c.onmouseup = function(a) {
                  game.mousedown = false;
                  this.onmouseout(a)
                };
                c.onmouseout = function(a) {
                  for (var a = a.srcElement.getAttribute("ctrl").split(","), b = 0; b < a.length; b++) {
                    var c = a[b];
                    delete this.activeKey[c];
                    this.inactiveKey[c] = true
                  }
                }.bind(game.ctrl)
              }
              if (localStorage.zoom) {
                a = document.getElementById("game");
                if (a.style.zoom !== void 0) a.style.zoom = parseFloat(localStorage.zoom);
                else if (a.style.MozTransform !== void 0) a.style.MozTransform = "scale(" + localStorage.zoom + ")"
              }
              wolf3d.utils.clearFlash();
              window.onfocus = function() {
                if (game.ctrl.activeKey.strafe) {
                  delete game.ctrl.activeKey.strafe;
                  game.ctrl.inactiveKey.strafe = true;
                  game.client.left = game.client.rotateLeft;
                  game.client.right = game.client.rotateRight
                }
                if (game.ctrl.activeKey.run) {
                  delete game.ctrl.activeKey.run;
                  game.ctrl.inactiveKey.run = true;
                  game.client.speed.rotation = game.client.min.speed.rotation;
                  game.client.speed.move = game.client.min.speed.move
                }
              };
              game.loop = game.gameLoop;
              if (!game.rendering) {
                window.requestAnimationFrame(game.render);
                game.rendering = true
              }
              game.pause = false
            })
          })
        })
      }, function() {
        window.onkeydown = window.onclick = null;
        audio.stopMusic();
        audio.playSound("playerdeath");
        game.showMessage("Error loading resources!\n" + this.src.split("/")[this.src.split("/").length - 1] + " not found?\nPlease check your connection\nor try again later...")
      })
    })
  },
  requestHTML: function(a, b) {
    if (document.getElementById(a)) b && b();
    else {
      var c = new XMLHttpRequest;
      c.open("GET", "html/" + a + ".html", !0);
      c.onload = function() {
        if (200 == c.status) {
          var d = document.createElement("DIV");
          d.innerHTML = c.response || c.responseText;
          document.body.appendChild(d);
          game.processFont(document.getElementById(a));
          b && setTimeout(b, 1)
        } else window.onkeydown = window.onclick = null, audio.stopMusic(), audio.playSound("playerdeath"), game.showMessage("Error loading page!\n" + a + ".html not found?\nPlease check your connection\nor try again later...")
      };
      c.send()
    }
  },
  requestJavaScript: function(a, b) {
    b()
  },
  showScreen: function(a, b, c) {
    game.trackPage(a);
    game.requestHTML(a, function() {
      var d = document.getElementById(a);
      d.className ? 0 > d.className.search("fadein") && (d.className += " fadein") : d.className = " fadein";
      game.activeScreen = a;
      b ? game.timeout =
        setTimeout(function() {
          game.timeout = null;
          d.className = d.className.replace(" fadein", "");
          game.activeScreen = null;
          if (c) game.timeout = setTimeout(c, 500)
        }, b) : c && c()
    });
    if (a == 'game') {
      const container_ = document.body;
      container_.requestPointerLock = container_.requestPointerLock ||
        container_.mozRequestPointerLock ||
        container_.webkitRequestPointerLock;
      container_.requestPointerLock();

      setTimeout(function() {
        container_.onmousedown = function(e) {
          if (e.button == 2) {
            container_.requestPointerLock();
            game.client.door();
          }
          if (e.button == 0) {
            game.client.getActiveWeapon().fire(game.client);
          }
        }
        container_.onmousemove = function(e) {
          if (e.movementX == 0)
            return;
          if (e.movementX > 0) {
            game.client.rotateRight(e.movementX * sens);
            return;
          }
          if (e.movementX < 0) {
            game.client.rotateLeft(e.movementX * -sens);
            return;
          }
        }
      }, 1000);
    }
  },
  hideScreen: function(a, b) {
    if (a == 'game') {
      document.body.onmousedown = null;
      document.body.onmouseup = null;
      document.body.onmousemove = null;
    }
    var c = document.getElementById(a);
    c && (c.className = c.className.replace(" fadein", ""), game.activeScreen = null, b && (game.timeout = setTimeout(b, 1E3)), window.onmouseup = null)
  },
  pc13: function() {
    document.body.parentNode.style.backgroundColor = null;
    document.body.style.backgroundColor = null;
    game.showScreen("pc13", 5E3, game.title);
    setTimeout(function() {
      window.onkeydown =
        window.onclick = function() {
          window.onkeydown = window.onclick = null;
          game.timeout && (clearTimeout(game.timeout), game.timeout = null);
          game.hideScreen("pc13", game.title)
        }
    }, 500)
  },
  title: function() {
    game.showScreen("title", 5E3, game.credits);
    setTimeout(function() {
      window.onkeydown = window.onclick = function() {
        window.onkeydown = window.onclick = null;
        game.timeout && (clearTimeout(game.timeout), game.timeout = null);
        game.hideScreen("title", game.menu)
      }
    }, 500)
  },
  credits: function() {
    game.showScreen("credits", 5E3, game.highscores);
    setTimeout(function() {
      window.onkeydown =
        window.onclick = function() {
          window.onkeydown = window.onclick = null;
          game.timeout && (clearTimeout(game.timeout), game.timeout = null);
          game.hideScreen("credits", game.menu)
        }
    }, 500)
  },
  highscores: function() {
    document.body.parentNode.style.backgroundColor = "#880000";
    document.body.style.backgroundColor = "#880000";
    game.requestHTML("highscores", function() {
      var a = localStorage.highscores ? JSON.parse(localStorage.highscores) : game.baseHighscores;
      a.sort(function(a, b) {
        var c = parseInt(a.score),
          d = b.score;
        return c < d ? 1 : c > d ? -1 : 0
      });
      var b =
        document.querySelector("#highscores .rows");
      b.innerHTML = "";
      for (var c = 0; 7 > c; c++) {
        var d = document.createElement("TR"),
          e = document.createElement("TD");
        e.className = "col-name";
        var f = document.createElement("DIV");
        f.className = "text highscores";
        e.appendChild(f);
        var h = document.createElement("TD");
        h.className = "col-level";
        var g = document.createElement("DIV");
        g.className = "text highscores";
        h.appendChild(g);
        var j = document.createElement("TD");
        j.className = "col-score";
        var i = document.createElement("DIV");
        i.className =
          "text highscores";
        j.appendChild(i);
        d.appendChild(e);
        d.appendChild(h);
        d.appendChild(j);
        b.appendChild(d);
        game.smallWhite.text(f, a[c].name);
        game.smallWhite.text(g, a[c].level);
        game.smallWhite.text(i, a[c].score)
      }
    });
    game.showScreen("highscores", 5E3, game.pc13);
    setTimeout(function() {
      window.onkeydown = window.onclick = function() {
        window.onkeydown = window.onclick = null;
        game.timeout && (clearTimeout(game.timeout), game.timeout = null);
        game.hideScreen("highscores", game.menu)
      }
    }, 500)
  },
  difficultyMenu: ["Can I play, Daddy?",
    "Don't hurt me.", "Bring 'em on!", "I am Death incarnate!"
  ],
  difficultyCtrl: function(a) {
    a || (a = window.event);
    var b = document.getElementById("difficultycursor");
    if (40 == a.keyCode || 38 == a.keyCode) {
      var c = document.querySelectorAll("#difficulty .options .text"),
        d = c.length,
        e = c[b.cursorIndex];
      e.className = e.className.replace(" selected", "");
      game.largeText.text(e, game.difficultyMenu[b.cursorIndex]);
      switch (a.keyCode) {
        case 40:
          b.cursorIndex++;
          b.cursorIndex == d && (b.cursorIndex = 0);
          for (a = !1; - 1 < c[b.cursorIndex].className.search("disabled");) a = !0, b.cursorIndex++, b.cursorIndex == d && (b.cursorIndex = 0);
          audio.playSound(a ? "movegun2" : "movegun1");
          break;
        case 38:
          b.cursorIndex--;
          0 > b.cursorIndex && (b.cursorIndex = d - 1);
          for (a = !1; - 1 < c[b.cursorIndex].className.search("disabled");) a = !0, b.cursorIndex--, 0 > b.cursorIndex && (b.cursorIndex = d - 1);
          audio.playSound(a ? "movegun2" : "movegun1")
      }
      e = c[b.cursorIndex];
      e.className += " selected";
      game.largeSelected.text(e, game.difficultyMenu[b.cursorIndex]);
      document.getElementById("difficultypicture").style.backgroundPosition = "0px " +
        96 * -b.cursorIndex + "px";
      b.style.marginTop = 36 * b.cursorIndex + "px"
    } else 13 == a.keyCode ? (window.onkeydown = window.onclick = null, audio.playSound("shoot"), game.difficulty = b.cursorIndex, document.body.parentNode.style.backgroundColor = null, document.body.style.backgroundColor = null, game.hideScreen("difficulty"), audio.currentMusic && audio.stopMusic(), setTimeout(function() {
      game.newGame(game.mapName, game.difficulty, game.tick)
    }, 500)) : 27 == a.keyCode && (window.onkeydown = window.onclick = null, audio.playSound("escpressed"),
      game.hideScreen("difficulty", game.episode))
  },
  difficultySelection: function() {
    game.showScreen("difficulty", null, function() {
      var a = document.getElementById("difficultycursor");
      a.cursorIndex = 2;
      a.style.marginTop = "72px";
      document.getElementById("difficultypicture").style.backgroundPosition = "0px -192px";
      for (var a = document.querySelectorAll("#difficulty .options .text"), b = 0; b < a.length; b++) {
        var c = a[b];
        c.index = b;
        c.onmousemove = function() {
          if ("difficulty" == game.activeScreen) {
            var a = document.getElementById("difficultycursor");
            if (a.cursorIndex != this.index) {
              var b = document.querySelectorAll("#difficulty .options .text"),
                c = b[a.cursorIndex];
              c.className = c.className.replace(" selected", "");
              game.largeText.text(c, game.difficultyMenu[a.cursorIndex]);
              a.cursorIndex = this.index;
              audio.playSound("movegun1");
              c = b[a.cursorIndex];
              c.className += " selected";
              game.largeSelected.text(c, game.difficultyMenu[a.cursorIndex]);
              document.getElementById("difficultypicture").style.backgroundPosition = "0px " + 96 * -a.cursorIndex + "px";
              a.style.marginTop = 36 * a.cursorIndex +
                "px"
            }
          }
        };
        c.onmouseup = function(a) {
          if ("difficulty" == game.activeScreen && (a || (a = window.event), 0 == a.button)) window.onkeydown = window.onclick = null, audio.playSound("shoot"), a = document.getElementById("difficultycursor"), game.difficulty = a.cursorIndex, document.body.parentNode.style.backgroundColor = null, document.body.style.backgroundColor = null, game.hideScreen("difficulty"), audio.currentMusic && audio.stopMusic(), setTimeout(function() {
            game.newGame(game.mapName, game.difficulty, game.tick)
          }, 500)
        }
      }
      window.onmouseup = function(a) {
        if ("difficulty" ==
          game.activeScreen && (a || (a = window.event), 0 != a.button)) window.onkeydown = window.onclick = null, audio.playSound("escpressed"), game.hideScreen("difficulty", game.episode)
      };
      c = a[2];
      0 > c.className.search("selected") && (c.className += " selected");
      game.largeSelected.text(c, game.difficultyMenu[2]);
      for (b = 0; b < a.length; b++) 2 != b && (c = a[b], c.className = c.className.replace(" selected", ""), game.largeText.text(c, game.difficultyMenu[b]));
      setTimeout(function() {
        window.onkeydown = game.difficultyCtrl
      }, 500)
    })
  },
  episodeMenu: [],
  episodeCtrl: function(a) {
    a ||
      (a = window.event);
    for (var b = !1, c = document.getElementById("episodecursor"), d = document.querySelectorAll("#episode .options .episode"), e = 0; e < d.length; e++) game.episodeMenu[e] = d[e].getAttribute("episode");
    d = document.querySelector("#episode .options");
    if (40 == a.keyCode || 38 == a.keyCode) {
      var e = document.querySelectorAll("#episode .options .episode .text"),
        f = e.length / 2,
        h = e[2 * c.cursorIndex],
        g = e[2 * c.cursorIndex + 1];
      h.className = h.className.replace(" selected", "");
      g.className = g.className.replace(" selected", "");
      game.largeText.text(h,
        "Episode " + (c.cursorIndex + 1));
      game.largeText.text(g, game.episodeMenu[c.cursorIndex]);
      switch (a.keyCode) {
        case 40:
          c.cursorIndex++;
          c.cursorIndex == f && (c.cursorIndex = 0);
          for (h = !1; - 1 < e[2 * c.cursorIndex].className.search("disabled");) h = !0, c.cursorIndex++, c.cursorIndex == f && (c.cursorIndex = 0);
          audio.playSound(h ? "movegun2" : "movegun1");
          b = !0;
          break;
        case 38:
          c.cursorIndex--;
          0 > c.cursorIndex && (c.cursorIndex = f - 1);
          for (h = !1; - 1 < e[2 * c.cursorIndex].className.search("disabled");) h = !0, c.cursorIndex--, 0 > c.cursorIndex && (c.cursorIndex =
            f - 1);
          audio.playSound(h ? "movegun2" : "movegun1");
          b = !0
      }
      h = e[2 * c.cursorIndex];
      g = e[2 * c.cursorIndex + 1];
      h.className += " selected";
      g.className += " selected";
      game.largeSelected.text(h, "Episode " + (c.cursorIndex + 1));
      game.largeSelected.text(g, game.episodeMenu[c.cursorIndex]);
      e = 77 * c.cursorIndex;
      c.style.top = e + "px";
      d.scrollTop = e + 77 > d.clientHeight ? d.scrollHeight - d.clientHeight : 0
    } else 13 == a.keyCode ? (audio.playSound("shoot"), window.onkeydown = window.onclick = null, game.loop ? (game.showMessage(game.curgameStr), window.onkeydown =
      function(a) {
        if (!a) a = window.event;
        switch (a.keyCode) {
          case 89:
          case 90:
            game.hideMessage();
            game.mapName = "e" + (c.cursorIndex + 1) + "m1";
            game.hideScreen("episode", game.difficultySelection);
            b = true;
            break;
          case 78:
            game.hideMessage();
            game.hideScreen("episode", game.gameMenu);
            b = true;
            break;
          case 27:
            game.hideMessage();
            setTimeout(function() {
              window.onkeydown = game.episodeCtrl
            }, 500);
            b = true
        }
      }) : (game.mapName = "e" + (c.cursorIndex + 1) + "m1", game.hideScreen("episode", game.difficultySelection))) : 27 == a.keyCode && (window.onkeydown = window.onclick =
      null, audio.playSound("escpressed"), game.hideScreen("episode", game.loop ? game.gameMenu : game.menu));
    if (b) return a.stopPropagation(), a.preventDefault(), !1
  },
  episode: function() {
    game.showScreen("episode", null, function() {
      var a = document.getElementById("episodecursor");
      a.cursorIndex = 0;
      a.style.top = "0px";
      for (var b = document.querySelectorAll("#episode .options .episode"), a = 0; a < b.length; a++) game.episodeMenu[a] = b[a].getAttribute("episode");
      b = document.querySelectorAll("#episode .options .episode");
      for (a = 0; a < b.length; a++) {
        var c =
          b[a];
        c.index = a;
        c.onmousemove = function() {
          if ("episode" == game.activeScreen) {
            var a = document.getElementById("episodecursor");
            if (this.index != a.cursorIndex) {
              var b = document.querySelectorAll("#episode .options .episode .text"),
                c = b[2 * a.cursorIndex],
                d = b[2 * a.cursorIndex + 1];
              c.className = c.className.replace(" selected", "");
              d.className = d.className.replace(" selected", "");
              game.largeText.text(c, "Episode " + (a.cursorIndex + 1));
              game.largeText.text(d, game.episodeMenu[a.cursorIndex]);
              a.cursorIndex = this.index;
              audio.playSound("movegun1");
              c = b[2 * a.cursorIndex];
              d = b[2 * a.cursorIndex + 1];
              c.className += " selected";
              d.className += " selected";
              game.largeSelected.text(c, "Episode " + (a.cursorIndex + 1));
              game.largeSelected.text(d, game.episodeMenu[a.cursorIndex]);
              a.style.top = 77 * a.cursorIndex + "px"
            }
          }
        };
        c.onmouseup = function(a) {
          if ("episode" == game.activeScreen && (a || (a = window.event), 0 == a.button)) {
            audio.playSound("shoot");
            window.onkeydown = window.onclick = null;
            var b = document.getElementById("episodecursor");
            game.loop ? (window.onmouseup = null, game.showMessage(game.curgameStr),
              window.onkeydown = function(a) {
                if (!a) a = window.event;
                switch (a.keyCode) {
                  case 89:
                  case 90:
                    game.hideMessage();
                    game.mapName = "e" + (b.cursorIndex + 1) + "m1";
                    game.hideScreen("episode", game.difficultySelection);
                    se = true;
                    break;
                  case 78:
                    game.hideMessage();
                    game.hideScreen("episode", game.gameMenu);
                    se = true;
                    break;
                  case 27:
                    game.hideMessage();
                    setTimeout(function() {
                      window.onmouseup = function(a) {
                        if (!a) a = window.event;
                        if (a.button != 0) {
                          window.onkeydown = window.onclick = null;
                          audio.playSound("escpressed");
                          game.hideScreen("episode", game.loop ?
                            game.gameMenu : game.menu)
                        }
                      };
                      window.onkeydown = game.episodeCtrl
                    }, 500);
                    se = true
                }
                if (se) {
                  a.stopPropagation();
                  a.preventDefault();
                  return false
                }
              }) : (game.mapName = "e" + (b.cursorIndex + 1) + "m1", game.hideScreen("episode", game.difficultySelection))
          }
        }
      }
      window.onmouseup = function(a) {
        if ("episode" == game.activeScreen && (a || (a = window.event), 0 != a.button)) window.onkeydown = window.onclick = null, audio.playSound("escpressed"), game.hideScreen("episode", game.loop ? game.gameMenu : game.menu)
      };
      var b = document.querySelectorAll("#episode .options .episode .text"),
        c = b[0],
        d = b[1];
      0 > c.className.search("selected") && (c.className += " selected");
      0 > d.className.search("selected") && (d.className += " selected");
      game.largeSelected.text(c, "Episode 1");
      game.largeSelected.text(d, game.episodeMenu[0]);
      for (a = 1; a < b.length / 2; a++) c = b[2 * a], d = b[2 * a + 1], c.className = c.className.replace(" selected", ""), d.className = d.className.replace(" selected", ""), game.largeText.text(c, "Episode " + (a + 1)), game.largeText.text(d, game.episodeMenu[a]);
      setTimeout(function() {
          window.onkeydown = game.episodeCtrl
        },
        500)
    })
  },
  detailCtrl: function(a) {
    a || (a = window.event);
    var b = document.getElementById("detailcursor");
    switch (a.keyCode) {
      case 40:
        audio.playSound("movegun1");
        b.cursorIndex++;
        8 == b.cursorIndex && (b.cursorIndex = 0);
        game.detail();
        break;
      case 38:
        audio.playSound("movegun1");
        b.cursorIndex--;
        0 > b.cursorIndex && (b.cursorIndex = 7);
        game.detail();
        break;
      case 13:
        window.onkeydown = window.onclick = null;
        audio.playSound("shoot");
        a = {
          width: 160 * (b.cursorIndex + 1),
          height: 120 * (b.cursorIndex + 1)
        };
        wolf3d.graphics = a;
        localStorage.graphics =
          JSON.stringify(a);
        game.engine && (game.engine.setResolution(a.width, a.height), game.loop && game.engine.render());
        game.hideScreen("detail", game.loop ? game.gameMenu : game.menu);
        break;
      case 32:
        audio.playSound("shoot");
        a = {
          width: 160 * (b.cursorIndex + 1),
          height: 120 * (b.cursorIndex + 1)
        };
        wolf3d.graphics = a;
        localStorage.graphics = JSON.stringify(a);
        game.engine && (game.engine.setResolution(a.width, a.height), game.loop && game.engine.render());
        game.detail();
        break;
      case 27:
        window.onkeydown = window.onclick = null, audio.playSound("escpressed"),
          game.hideScreen("detail", game.loop ? game.gameMenu : game.menu)
    }
  },
  detail: function() {
    game.showScreen("detail", null, function() {
      var a = wolf3d.graphics;
      localStorage.graphics && (a = JSON.parse(localStorage.graphics));
      var b = document.getElementById("detailcursor");
      if (void 0 == b.cursorIndex || null == b.cursorIndex) b.cursorIndex = a.width / 160 - 1;
      b.style.top = 44 * b.cursorIndex + "px";
      var c = document.querySelectorAll("#detail .options tr");
      window.onmouseup = function(a) {
        if ("detail" == game.activeScreen && (a || (a = window.event), 0 != a.button)) window.onkeydown = window.onkeyup =
          window.onclick = null, audio.playSound("escpressed"), game.hideScreen("detail", game.loop ? game.gameMenu : game.menu)
      };
      for (var d = 0; d < c.length; d++) {
        var e = c[d];
        e.index = d;
        e.onmousemove = function() {
          if ("detail" == game.activeScreen) {
            var a = document.getElementById("detailcursor");
            a.cursorIndex != this.index && (a.cursorIndex = this.index, audio.playSound("movegun1"), game.detail())
          }
        };
        e.onmouseup = function(a) {
          if ("detail" == game.activeScreen && (a || (a = window.event), 0 == a.button)) a = document.getElementById("detailcursor"), audio.playSound("shoot"),
            a = {
              width: 160 * (a.cursorIndex + 1),
              height: 120 * (a.cursorIndex + 1)
            }, wolf3d.graphics = a, localStorage.graphics = JSON.stringify(a), game.engine && (game.engine.setResolution(a.width, a.height), game.loop && game.engine.render()), game.detail()
        };
        var e = c[d].querySelectorAll(".text"),
          f = c[d].querySelector(".switch");
        a.width == 160 * (d + 1) ? 0 > f.className.search("selected") && (f.className += " selected") : f.className = f.className.replace(" selected", "");
        if (d == b.cursorIndex)
          for (f = 0; f < e.length; f++) 0 > e[f].className.search("selected") &&
            (e[f].className += " selected"), 0 == f ? game.largeSelected.text(e[f], (160 * (d + 1)).toString()) : 1 == f ? game.largeSelected.text(e[f], "x") : 2 == f && game.largeSelected.text(e[f], (120 * (d + 1)).toString());
        else
          for (f = 0; f < e.length; f++) e[f].className = e[f].className.replace(" selected", ""), 0 == f ? game.largeText.text(e[f], (160 * (d + 1)).toString()) : 1 == f ? game.largeText.text(e[f], "x") : 2 == f && game.largeText.text(e[f], (120 * (d + 1)).toString())
      }
      window.onkeydown != game.detailCtrl && setTimeout(function() {
          window.onkeydown = game.detailCtrl
        },
        500)
    })
  },
  soundCtrl: function(a) {
    a || (a = window.event);
    switch (a.keyCode) {
      case 38:
      case 40:
        audio.playSound("movegun1");
        a = document.getElementById("soundcursor");
        a.className = -1 < a.className.search("sound") ? a.className.replace(" sound", " music") : a.className.replace(" music", " sound");
        break;
      case 37:
        a = document.getElementById("soundcursor");
        if (-1 < a.className.search("sound")) {
          if (0 < audio.soundsVolume) {
            audio.playSound("movegun2");
            var a = document.querySelector("#sound .soundoption .thumb"),
              b = document.querySelector("#sound .soundoption .text.readthis"),
              c = round(100 * audio.soundsVolume) - 10;
            audio.setSoundsVolume(c / 100);
            a.style.marginLeft = floor(5.5 * c) + "px";
            b.style.marginLeft = 150 + floor(5 * c) + "px";
            game.largeReadthis.text(b, c + "%")
          }
        } else 0 < audio.musicVolume && (audio.playSound("movegun2"), a = document.querySelector("#sound .musicoption .thumb"), b = document.querySelector("#sound .musicoption .text.readthis"), c = round(100 * audio.musicVolume) - 10, audio.setMusicVolume(c / 100), a.style.marginLeft = floor(5.5 * c) + "px", b.style.marginLeft = 150 + floor(5 * c) + "px", game.largeReadthis.text(b,
          c + "%"));
        break;
      case 39:
        a = document.getElementById("soundcursor"); - 1 < a.className.search("sound") ? 1 > audio.soundsVolume && (audio.playSound("movegun2"), a = document.querySelector("#sound .soundoption .thumb"), b = document.querySelector("#sound .soundoption .text.readthis"), c = round(100 * audio.soundsVolume) + 10, audio.setSoundsVolume(c / 100), a.style.marginLeft = floor(5.5 * c) + "px", b.style.marginLeft = 150 + floor(5 * c) + "px", game.largeReadthis.text(b, c + "%")) : 1 > audio.musicVolume && (audio.playSound("movegun2"), a = document.querySelector("#sound .musicoption .thumb"),
          b = document.querySelector("#sound .musicoption .text.readthis"), c = round(100 * audio.musicVolume) + 10, audio.setMusicVolume(c / 100), a.style.marginLeft = floor(5.5 * c) + "px", b.style.marginLeft = 150 + floor(5 * c) + "px", game.largeReadthis.text(b, c + "%"));
        break;
      case 13:
      case 27:
        window.onkeydown = window.onclick = null, audio.playSound("escpressed"), game.hideScreen("sound", game.loop ? game.gameMenu : game.menu)
    }
  },
  sound: function() {
    game.showScreen("sound", null, function() {
      document.querySelector("#sound .soundoption").onmousemove = function() {
        if ("sound" ==
          game.activeScreen) {
          var a = document.getElementById("soundcursor"); - 1 < a.className.search("sound") || (audio.playSound("movegun1"), a.className = a.className.replace(" music", " sound"))
        }
      };
      document.querySelector("#sound .musicoption").onmousemove = function() {
        if ("sound" == game.activeScreen) {
          var a = document.getElementById("soundcursor"); - 1 < a.className.search("music") || (audio.playSound("movegun1"), a.className = a.className.replace(" sound", " music"))
        }
      };
      document.querySelector("#sound .soundoption .bar").onmouseup = function(a) {
        if ("sound" ==
          game.activeScreen && (a || (a = window.event), 0 == a.button)) {
          audio.playSound("movegun2");
          var b = document.querySelector("#sound .soundoption .thumb"),
            c = document.querySelector("#sound .soundoption .text.readthis"),
            a = 10 * round(10 * (a.offsetX / this.clientWidth));
          audio.setSoundsVolume(a / 100);
          b.style.marginLeft = floor(5.5 * a) + "px";
          c.style.marginLeft = 150 + floor(5 * a) + "px";
          game.largeReadthis.text(c, a + "%")
        }
      };
      document.querySelector("#sound .musicoption .bar").onmouseup = function(a) {
        if ("sound" == game.activeScreen && (a || (a = window.event),
            0 == a.button)) {
          audio.playSound("movegun2");
          var b = document.querySelector("#sound .musicoption .thumb"),
            c = document.querySelector("#sound .musicoption .text.readthis"),
            a = 10 * round(10 * (a.offsetX / this.clientWidth));
          audio.setMusicVolume(a / 100);
          b.style.marginLeft = floor(5.5 * a) + "px";
          c.style.marginLeft = 150 + floor(5 * a) + "px";
          game.largeReadthis.text(c, a + "%")
        }
      };
      window.onmouseup = function(a) {
        if ("sound" == game.activeScreen && (a || (a = window.event), 0 != a.button)) window.onkeydown = window.onclick = null, audio.playSound("escpressed"),
          game.hideScreen("sound", game.loop ? game.gameMenu : game.menu)
      };
      var a = document.querySelector("#sound .soundoption .thumb"),
        b = document.querySelector("#sound .soundoption .text.readthis"),
        c = round(100 * audio.soundsVolume);
      a.style.marginLeft = floor(5.5 * c) + "px";
      b.style.marginLeft = 150 + floor(5 * c) + "px";
      game.largeReadthis.text(b, c + "%");
      a = document.querySelector("#sound .musicoption .thumb");
      b = document.querySelector("#sound .musicoption .text.readthis");
      c = round(100 * audio.musicVolume);
      a.style.marginLeft = floor(5.5 *
        c) + "px";
      b.style.marginLeft = 150 + floor(5 * c) + "px";
      game.largeReadthis.text(b, c + "%");
      window.onkeydown != game.soundCtrl && setTimeout(function() {
        window.onkeydown = game.soundCtrl
      }, 500)
    })
  },
  customizeCtrl: function(a) {
    a || (a = window.event);
    var b = document.getElementById("customizecursor"),
      c = document.querySelectorAll("#customize table.option:not(.disabled)");
    switch (a.keyCode) {
      case 40:
        void 0 == b.posIndex || null == b.posIndex ? (audio.playSound("movegun2"), b.cursorIndex++, b.cursorIndex == c.length && (b.cursorIndex = 0)) : (audio.playSound("escpressed"),
          b.posIndex = null);
        game.customize();
        break;
      case 38:
        void 0 == b.posIndex || null == b.posIndex ? (audio.playSound("movegun2"), b.cursorIndex--, 0 > b.cursorIndex && (b.cursorIndex = c.length - 1)) : (audio.playSound("escpressed"), b.posIndex = null);
        game.customize();
        break;
      case 37:
        void 0 != b.posIndex && null != b.posIndex && (audio.playSound("movegun2"), b.posIndex--, 0 > b.posIndex && (b.posIndex = 3), game.customize());
        break;
      case 39:
        void 0 != b.posIndex && null != b.posIndex && (audio.playSound("movegun2"), b.posIndex++, 4 == b.posIndex && (b.posIndex =
          0), game.customize());
        break;
      case 13:
        audio.playSound("shoot");
        void 0 == b.posIndex || null == b.posIndex ? b.posIndex = 0 : b.wait = !0;
        game.customize();
        break;
      case 27:
        audio.playSound("escpressed"), void 0 == b.posIndex || null == b.posIndex ? (window.onkeydown = window.onclick = null, game.hideScreen("customize", game.loop ? game.gameMenu : game.menu)) : (b.posIndex = null, game.customize())
    }
  },
  customize: function() {
    game.showScreen("customize", null, function() {
      document.getElementById('change_sens').onclick = function(){
        const user_input = prompt("Enter new Sensitivity: ");
        const new_sens = parseFloat(user_input.replaceAll(',', '.').trim());
        if (isNaN(new_sens)) {
          alert('Not a number!');
        }
        else {
          sens = new_sens / 100;
        }
      }
      localStorage.ctrl && (controller.keys = JSON.parse(localStorage.ctrl));
      var a = document.getElementById("customizecursor"),
        b = document.querySelectorAll("#customize table.option:not(.disabled)"),
        c = document.querySelectorAll("#customize table.option");
      a.parentNode.removeChild(a);
      if (void 0 == a.cursorIndex || null == a.cursorIndex) a.cursorIndex = 0;
      b[a.cursorIndex].querySelector("td").appendChild(a);
      for (var d = 0; d < b.length; d++) {
        var e = b[d].querySelectorAll(".text");
        e[0].className = "text";
        e[1].className = "text";
        e[2].className = "text";
        e[3].className = "text";
        b[d] == b[a.cursorIndex] && void 0 != a.posIndex && null != a.posIndex && (e[a.posIndex].className =
          "text readme change");
        b[d] == c[2] ? b[d] == b[a.cursorIndex] ? (0 == a.posIndex ? game.largeReadme.text(e[0], game.keyNames[game.ctrl ? game.ctrl.keys.run.keyCode[0] : controller.keys.run.keyCode[0]]) : game.largeSelected.text(e[0], game.keyNames[game.ctrl ? game.ctrl.keys.run.keyCode[0] : controller.keys.run.keyCode[0]]), 1 == a.posIndex ? game.largeReadme.text(e[1], game.keyNames[game.ctrl ? game.ctrl.keys.door.keyCode[0] : controller.keys.door.keyCode[0]]) : game.largeSelected.text(e[1], game.keyNames[game.ctrl ? game.ctrl.keys.door.keyCode[0] :
            controller.keys.door.keyCode[0]]), 2 == a.posIndex ? game.largeReadme.text(e[2], game.keyNames[game.ctrl ? game.ctrl.keys.fire.keyCode[0] : controller.keys.fire.keyCode[0]]) : game.largeSelected.text(e[2], game.keyNames[game.ctrl ? game.ctrl.keys.fire.keyCode[0] : controller.keys.fire.keyCode[0]]), 3 == a.posIndex ? game.largeReadme.text(e[3], game.keyNames[game.ctrl ? game.ctrl.keys.strafe.keyCode[0] : controller.keys.strafe.keyCode[0]]) : game.largeSelected.text(e[3], game.keyNames[game.ctrl ? game.ctrl.keys.strafe.keyCode[0] :
            controller.keys.strafe.keyCode[0]])) : (game.largeText.text(e[0], game.keyNames[game.ctrl ? game.ctrl.keys.run.keyCode[0] : controller.keys.run.keyCode[0]]), game.largeText.text(e[1], game.keyNames[game.ctrl ? game.ctrl.keys.door.keyCode[0] : controller.keys.door.keyCode[0]]), game.largeText.text(e[2], game.keyNames[game.ctrl ? game.ctrl.keys.fire.keyCode[0] : controller.keys.fire.keyCode[0]]), game.largeText.text(e[3], game.keyNames[game.ctrl ? game.ctrl.keys.strafe.keyCode[0] : controller.keys.strafe.keyCode[0]])) : b[d] ==
          c[3] && (b[d] == b[a.cursorIndex] ? (0 == a.posIndex ? game.largeReadme.text(e[0], game.keyNames[game.ctrl ? game.ctrl.keys.left.keyCode[0] : controller.keys.left.keyCode[0]]) : game.largeSelected.text(e[0], game.keyNames[game.ctrl ? game.ctrl.keys.left.keyCode[0] : controller.keys.left.keyCode[0]]), 1 == a.posIndex ? game.largeReadme.text(e[1], game.keyNames[game.ctrl ? game.ctrl.keys.right.keyCode[0] : controller.keys.right.keyCode[0]]) : game.largeSelected.text(e[1], game.keyNames[game.ctrl ? game.ctrl.keys.right.keyCode[0] : controller.keys.right.keyCode[0]]),
              2 == a.posIndex ? game.largeReadme.text(e[2], game.keyNames[game.ctrl ? game.ctrl.keys.forward.keyCode[0] : controller.keys.forward.keyCode[0]]) : game.largeSelected.text(e[2], game.keyNames[game.ctrl ? game.ctrl.keys.forward.keyCode[0] : controller.keys.forward.keyCode[0]]), 3 == a.posIndex ? game.largeReadme.text(e[3], game.keyNames[game.ctrl ? game.ctrl.keys.backward.keyCode[0] : controller.keys.backward.keyCode[0]]) : game.largeSelected.text(e[3], game.keyNames[game.ctrl ? game.ctrl.keys.backward.keyCode[0] : controller.keys.backward.keyCode[0]])) :
            (game.largeText.text(e[0], game.keyNames[game.ctrl ? game.ctrl.keys.left.keyCode[0] : controller.keys.left.keyCode[0]]), game.largeText.text(e[1], game.keyNames[game.ctrl ? game.ctrl.keys.right.keyCode[0] : controller.keys.right.keyCode[0]]), game.largeText.text(e[2], game.keyNames[game.ctrl ? game.ctrl.keys.forward.keyCode[0] : controller.keys.forward.keyCode[0]]), game.largeText.text(e[3], game.keyNames[game.ctrl ? game.ctrl.keys.backward.keyCode[0] : controller.keys.backward.keyCode[0]])))
      }
      if (a.wait) {
        var f = b[a.cursorIndex].querySelectorAll(".text")[a.posIndex];
        f.className = "text readme change wait";
        f.style.width = f.offsetWidth + "px";
        game.largeReadme.text(f, "?");
        window.onkeydown = function(d) {
          window.onkeydown = null;
          a.wait = null;
          f.style.width = null;
          if (!d) d = window.event;
          if (game.keyNames[d.keyCode]) {
            audio.playSound("shoot");
            if (b[a.cursorIndex] == c[2])
              if (a.posIndex == 0) game.ctrl ? game.ctrl.keys.run.keyCode = [d.keyCode] : controller.keys.run.keyCode = [d.keyCode];
              else if (a.posIndex == 1) game.ctrl ? game.ctrl.keys.door.keyCode = [d.keyCode] : controller.keys.door.keyCode = [d.keyCode];
            else if (a.posIndex == 2) game.ctrl ? game.ctrl.keys.fire.keyCode = [d.keyCode] : controller.keys.fire.keyCode = [d.keyCode];
            else {
              if (a.posIndex == 3) game.ctrl ? game.ctrl.keys.strafe.keyCode = [d.keyCode] : controller.keys.strafe.keyCode = [d.keyCode]
            } else if (b[a.cursorIndex] == c[3])
              if (a.posIndex == 0) game.ctrl ? game.ctrl.keys.left.keyCode = [d.keyCode] : controller.keys.left.keyCode = [d.keyCode];
              else if (a.posIndex == 1) game.ctrl ? game.ctrl.keys.right.keyCode = [d.keyCode] : controller.keys.right.keyCode = [d.keyCode];
            else if (a.posIndex ==
              2) game.ctrl ? game.ctrl.keys.forward.keyCode = [d.keyCode] : controller.keys.forward.keyCode = [d.keyCode];
            else if (a.posIndex == 3) game.ctrl ? game.ctrl.keys.backward.keyCode = [d.keyCode] : controller.keys.backward.keyCode = [d.keyCode];
            localStorage.ctrl = game.ctrl ? JSON.stringify(game.ctrl.keys) : JSON.stringify(controller.keys)
          } else audio.playSound("escpressed");
          game.customize()
        }
      } else window.onkeydown != game.customizeCtrl && setTimeout(function() {
        window.onmouseup = function(a) {
          if (game.activeScreen == "customize") {
            if (!a) a =
              window.event;
            if (a.button != 0) {
              window.onkeydown = window.onclick = null;
              audio.playSound("escpressed");
              game.hideScreen("customize", game.loop ? game.gameMenu : game.menu)
            }
          }
        };
        window.onkeydown = game.customizeCtrl
      }, 500)
    })
  },
  keyNames: {
    13: "Enter",
    16: "Shift",
    17: "Ctrl",
    18: "Alt",
    32: "Space",
    37: "Left",
    38: "Up",
    39: "Right",
    40: "Down",
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z"
  },
  baseHighscores: [{
    name: "id software-'92",
    level: "E1/L1",
    score: "10000"
  }, {
    name: "Adrian Carmack",
    level: "E1/L1",
    score: "10000"
  }, {
    name: "John Carmack",
    level: "E1/L1",
    score: "10000"
  }, {
    name: "Kevin Cloud",
    level: "E1/L1",
    score: "10000"
  }, {
    name: "Tom Hall",
    level: "E1/L1",
    score: "10000"
  }, {
    name: "John Romero",
    level: "E1/L1",
    score: "10000"
  }, {
    name: "Jay Wilbur",
    level: "E1/L1",
    score: "10000"
  }],
  newHighscore: function(a, b, c) {
    audio.currentMusic && audio.stopMusic();
    audio.playMusic("roster");
    game.showScreen("highscores", null, function() {
      audio.playMusic("roster");
      var d = 0,
        e = localStorage.highscores ?
        JSON.parse(localStorage.highscores) : game.baseHighscores;
      e.sort(function(a, b) {
        var c = parseInt(a.score),
          d = b.score;
        return c < d ? 1 : c > d ? -1 : 0
      });
      var f = document.querySelector("#highscores .rows");
      f.innerHTML = "";
      for (var h = 0; 7 > h; h++) {
        parseInt(e[h].score) > b && d++;
        var g = document.createElement("TR"),
          j = document.createElement("TD");
        j.className = "col-name";
        var i = document.createElement("DIV");
        i.className = "text highscores";
        j.appendChild(i);
        var m = document.createElement("TD");
        m.className = "col-level";
        var l = document.createElement("DIV");
        l.className = "text highscores";
        m.appendChild(l);
        var p = document.createElement("TD");
        p.className = "col-score";
        var q = document.createElement("DIV");
        q.className = "text highscores";
        p.appendChild(q);
        g.appendChild(j);
        g.appendChild(m);
        g.appendChild(p);
        f.appendChild(g);
        game.smallWhite.text(i, e[h].name);
        game.smallWhite.text(l, e[h].level);
        game.smallWhite.text(q, e[h].score)
      }
      if (b < parseInt(e[6].score)) setTimeout(function() {
        window.onkeydown = window.onclick = function() {
          window.onkeydown = window.onclick = null;
          audio.playSound("escpressed");
          game.hideScreen("highscores", c)
        }
      }, 1E3);
      else {
        f = document.querySelectorAll("#highscores .rows tr");
        f[0].parentNode.removeChild(f[f.length - 1]);
        g = document.createElement("TR");
        j = document.createElement("TD");
        j.className = "col-name";
        i = document.createElement("DIV");
        i.className = "text highscores beforecursor";
        j.appendChild(i);
        var n = document.createElement("DIV");
        n.className = "textcursor";
        j.appendChild(n);
        m = document.createElement("TD");
        m.className = "col-level";
        l = document.createElement("DIV");
        l.className = "text highscores";
        m.appendChild(l);
        p = document.createElement("TD");
        p.className = "col-score";
        q = document.createElement("DIV");
        q.className = "text highscores";
        p.appendChild(q);
        g.appendChild(j);
        g.appendChild(m);
        g.appendChild(p);
        f[0].parentNode.insertBefore(g, f[d]);
        var o = "E" + a.substring(1, 2) + "/L" + a.substring(3),
          r = b.toString();
        game.smallWhite.text(i, "");
        game.smallWhite.text(l, o);
        game.smallWhite.text(q, r);
        n.style.marginLeft = i.offsetWidth + "px";
        var s = "";
        window.onkeydown = function(a) {
          a || (a = window.event);
          var b = a.keyCode;
          if (i.children.length &&
            13 == b) window.onkeydown = null, audio.playSound("shoot"), n.style.display = "none", e.push({
            name: s,
            level: o,
            score: r
          }), e.sort(function(a, b) {
            var c = parseInt(a.score),
              d = b.score;
            return c < d ? 1 : c > d ? -1 : 0
          }), localStorage.highscores = JSON.stringify(e), game.hideScreen("highscores", c);
          else {
            if (8 == b) return i.children.length && (i.removeChild(i.lastChild), n.style.marginLeft = i.offsetWidth + "px", s = s.substring(0, s.length - 1)), a.stopPropagation(), a.preventDefault(), !1;
            if (15 > i.children.length && (32 == b || 47 < b && 91 > b || 105 < b && 112 > b && 108 !=
                b || 185 < b && 193 > b || 218 < b && 223 > b)) {
              var d = "";
              if (47 < b && 58 > b) d = String.fromCharCode(b);
              else if (64 < b && 91 > b) a.shiftKey || (b += 32), d = String.fromCharCode(b);
              else switch (b) {
                case 32:
                  d = " ";
                  break;
                case 106:
                  d = "*";
                  break;
                case 107:
                  d = "+";
                  break;
                case 109:
                  d = "-";
                  break;
                case 110:
                  d = ".";
                  break;
                case 111:
                  d = "/";
                  break;
                case 186:
                  d = ";";
                  break;
                case 187:
                  d = "=";
                  break;
                case 188:
                  d = ",";
                  break;
                case 189:
                  d = "-";
                  break;
                case 190:
                  d = ".";
                  break;
                case 191:
                  d = "/";
                  break;
                case 192:
                  d = "'";
                  break;
                case 219:
                  d = "(";
                  break;
                case 220:
                  d = "\\";
                  break;
                case 221:
                  d = ")";
                  break;
                case 222:
                  d =
                    "'"
              }
              game.smallWhite.images[d.charCodeAt(0) - 1] && (a = i.innerHTML, game.smallWhite.text(i, d), i.innerHTML = a + i.innerHTML, n.style.marginLeft = i.offsetWidth + "px", s += d)
            }
          }
        }
      }
    })
  },
  newLoadGame: function(a) {
    game.newGame(a.mapName.slice(0, 3) + a.player.floor, a.difficulty, game.tick, function() {
      game.mapName = a.mapName;
      a.average && (game.average = JSON.parse(JSON.stringify(a.average)));
      game.client.x = a.player.x;
      game.client.y = a.player.y;
      game.client.prevX = a.player.prevX;
      game.client.prevY = a.player.prevY;
      game.client.direction = {
        x: a.player.direction.x,
        y: a.player.direction.y
      };
      game.client.plane = {
        x: a.player.plane.x,
        y: a.player.plane.y
      };
      game.client.lives = a.player.lives;
      game.client.score = a.player.score;
      game.client.health = a.player.health;
      game.client.ammo = a.player.ammo;
      if (-1 < a.player.weapons.indexOf(2)) {
        var b = new player.Weapon(wolf3d.utils.weapons.machineGun);
        game.client.weapons.push(b);
        b = game.client.weapons[game.client.weapons.length - 1];
        b.animation && b.animation.callback && (b.animation.callback = utils.bind(game.client, b.animation.callback))
      } - 1 < a.player.weapons.indexOf(3) &&
        (b = new player.Weapon(wolf3d.utils.weapons.gatling), game.client.weapons.push(b), b = game.client.weapons[game.client.weapons.length - 1], b.animation && b.animation.callback && (b.animation.callback = utils.bind(game.client, b.animation.callback)));
      game.client.weapon(a.player.activeWeapon);
      game.client.keys.keys = a.player.keys;
      game.client.time = a.player.time;
      game.client.total = utils.clone(a.player.total);
      game.client.ratio = utils.clone(a.player.ratio);
      game.client.textValue(document.getElementById("ammo"), game.client.ammo);
      game.client.textValue(document.getElementById("health"), game.client.health);
      game.client.textValue(document.getElementById("lives"), game.client.lives);
      game.client.textValue(document.getElementById("score"), game.client.score);
      game.client.render();
      game.client.keys.render();
      game.client.extraLife = floor(game.client.score / 4E4);
      for (b = 0; b < a.doors.length; b++) {
        var c = a.doors[b],
          d = game.client.map.getDoor(c.x, c.y);
        d && (d.slide = c.slide, d.delayTimer = c.delayTimer, d.action = c.action, c.process && ("open" == c.action ? d.close() :
          "close" == c.action && d.open(), audio.process.pop()))
      }
      for (b = 0; b < a.spriteHistory.add.length; b++) game.client.map.addSprite(new sprites.Sprite(eval(a.spriteHistory.add[b])));
      for (b = 0; b < a.spriteHistory.remove.length; b++)
        for (c = 0; c < game.client.map.sprites.length; c++) a.spriteHistory.remove[b] == game.client.map.sprites[c].eval && game.client.map.removeSprite(game.client.map.sprites[c]);
      for (b = 0; b < a.aiHistory.add.length; b++) game.client.map.addAI(eval(a.aiHistory.add[b]));
      for (b = 0; b < game.client.map.ai.length; b++)
        if (c =
          game.client.map.ai[b], d = a.ai[c.eval]) {
          c.x = d.x;
          c.y = d.y;
          c.baseX = d.baseX;
          c.baseY = d.baseY;
          c.prevX = d.prevX;
          c.prevY = d.prevY;
          c.detailX = d.detailX;
          c.detailY = d.detailY;
          c.hitpoints = d.hitpoints;
          c.angle = d.angle;
          c.slide = d.slide;
          c.timer = d.timer;
          c.direction = {
            x: d.direction.x,
            y: d.direction.y
          };
          c.hit = d.hit;
          c.animations.current = d.animations.current;
          c.action = c[d.action];
          d.process || (c.action = null, c.process = null);
          for (var e in d.animations)
            if ("object" == typeof d.animations[e]) {
              var f = c.animations[e],
                h = d.animations[e];
              f && (f.keyframe =
                h.keyframe, f.state = h.state, f.speed = h.speed, f.count = h.count, f.step = h.step, f.index = h.index, f.timer = h.timer, f.stopping = h.stopping, f.process = h.process ? f[h.process] : f.process, f.process && 0 > animation.process.indexOf(f) && animation.process.push(f))
            } delete a.ai[c.eval]
        } for (b = 0; b < game.client.map.secrets.length; b++)
        if (e = game.client.map.secrets[b], -1 < a.secretsHistory.remove.indexOf(e.eval) && game.client.map.removeSecret(e), (c = a.secrets[e.eval]) && c.direction) e.x = c.x, e.y = c.y, e.state = c.state, e.direction = {
          x: c.direction.x,
          y: c.direction.y
        }, e.process = utils.bind(e, e.move), 0 > secret.process.indexOf(e) && secret.process.push(e);
      game.client.map.map = JSON.parse(JSON.stringify(a.map));
      game.client.map.hit = JSON.parse(JSON.stringify(a.hit))
    })
  },
  loadGameCtrl: function(a) {
    a || (a = window.event);
    var b = document.getElementById("loadcursor");
    switch (a.keyCode) {
      case 40:
        audio.playSound("movegun1");
        b.cursorIndex++;
        b.cursorIndex == game.slots.length && (b.cursorIndex = 0);
        game.loadGame();
        break;
      case 38:
        audio.playSound("movegun1");
        b.cursorIndex--;
        0 > b.cursorIndex &&
          (b.cursorIndex = game.slots.length - 1);
        game.loadGame();
        break;
      case 13:
        window.onkeydown = window.onclick = null;
        if (game.slots[b.cursorIndex]) {
          audio.playSound("shoot");
          document.body.parentNode.style.backgroundColor = null;
          document.body.style.backgroundColor = null;
          var c = game.slots[b.cursorIndex];
          game.hideScreen("loadgame", function() {
            audio.currentMusic && audio.stopMusic();
            game.newLoadGame(c)
          })
        }
        break;
      case 27:
        window.onkeydown = window.onclick = null, audio.playSound("escpressed"), game.hideScreen("loadgame", game.loop ? game.gameMenu :
          game.menu)
    }
  },
  loadGame: function() {
    game.showScreen("loadgame", null, function() {
      var a = document.getElementById("loadcursor");
      if (void 0 == a.cursorIndex || null == a.cursorIndex) a.cursorIndex = 0;
      a.style.top = 38 * a.cursorIndex + "px";
      var b = document.querySelectorAll("#loadgame .options .slot");
      game.slots = localStorage.slots ? JSON.parse(localStorage.slots) : [null, null, null, null, null, null, null, null, null, null];
      for (var c = 0; c < b.length; c++) {
        var d = b[c];
        d.index = c;
        d.onmousemove = function() {
          if ("loadgame" == game.activeScreen) {
            var a =
              document.getElementById("loadcursor");
            a.cursorIndex != this.index && (a.cursorIndex = this.index, audio.playSound("movegun1"), game.loadGame())
          }
        };
        d.onmouseup = function(a) {
          if ("loadgame" == game.activeScreen && (a || (a = window.event), 0 == a.button))
            if (window.onkeydown = window.onclick = null, game.slots[this.index]) {
              audio.playSound("shoot");
              document.body.parentNode.style.backgroundColor = null;
              document.body.style.backgroundColor = null;
              var b = game.slots[this.index];
              game.hideScreen("loadgame", function() {
                audio.currentMusic && audio.stopMusic();
                game.newLoadGame(b)
              })
            }
        };
        b[c].className = game.slots[c] ? "slot" + (c == a.cursorIndex ? " selected" : "") : "slot empty" + (c == a.cursorIndex ? " selected" : "");
        game[c == a.cursorIndex ? "smallWhite" : "smallText"].text(b[c].querySelector(".text"), game.slots[c] ? game.slots[c].name : "- empty -")
      }
      window.onmouseup = function(a) {
        if ("loadgame" == game.activeScreen && (a || (a = window.event), 0 != a.button)) window.onkeydown = window.onclick = null, audio.playSound("escpressed"), game.hideScreen("loadgame", game.loop ? game.gameMenu : game.menu)
      };
      window.onkeydown !=
        game.loadGameCtrl && setTimeout(function() {
          window.onkeydown = game.loadGameCtrl
        }, 500)
    })
  },
  newSaveGame: function() {
    for (var a = {
        name: "",
        mapName: game.mapName,
        difficulty: game.difficulty,
        average: game.average,
        player: {
          x: game.client.x,
          y: game.client.y,
          prevX: game.client.prevX,
          prevY: game.client.prevY,
          direction: game.client.direction,
          plane: game.client.plane,
          floor: game.client.floor,
          lives: game.client.lives,
          score: game.client.score,
          health: game.client.health,
          ammo: game.client.ammo,
          weapons: [],
          activeWeapon: game.client.getActiveWeapon().id,
          keys: game.client.keys.keys,
          time: game.client.time,
          total: game.client.total,
          ratio: game.client.ratio
        },
        doors: [],
        spriteHistory: {
          add: [],
          remove: []
        },
        ai: {},
        aiHistory: {
          add: []
        },
        secrets: {},
        secretsHistory: {
          remove: []
        },
        map: game.client.map.map,
        hit: game.client.map.hit
      }, b = 0; b < game.client.weapons.length; b++) a.player.weapons.push(game.client.weapons[b].id);
    for (b = 0; b < game.client.map.doors.length; b++)
      for (var c = 0; c < game.client.map.doors[b].length; c++) {
        var d = game.client.map.doors[b][c];
        d && a.doors.push({
          x: d.x,
          y: d.y,
          process: !!d.process,
          action: d.action,
          slide: d.slide,
          delayTimer: d.delayTimer
        })
      }
    for (b = 0; b < game.client.map.spriteHistory.remove.length; b++) c = game.client.map.spriteHistory.remove[b], a.spriteHistory.remove.push(c.eval);
    for (b = 0; b < game.client.map.spriteHistory.add.length; b++) c = game.client.map.spriteHistory.add[b], a.spriteHistory.add.push(c.eval);
    for (b = 0; b < game.client.map.aiHistory.add.length; b++) c = game.client.map.aiHistory.add[b], a.aiHistory.add.push(c.eval);
    for (b = 0; b < game.client.map.ai.length; b++) {
      c = game.client.map.ai[b];
      a.ai[c.eval] = {
        x: c.x,
        y: c.y,
        baseX: c.baseX,
        baseY: c.baseY,
        prevX: c.prevX,
        prevY: c.prevY,
        detailX: c.detailX,
        detailY: c.detailY,
        hitpoints: c.hitpoints,
        angle: c.angle,
        slide: c.slide,
        timer: c.timer,
        direction: {
          x: c.direction.x,
          y: c.direction.y
        },
        hit: c.hit,
        animations: {
          current: c.animations.current
        },
        action: c.action,
        process: !!c.process
      };
      for (var e in c.animations) "object" == typeof c.animations[e] && (d = c.animations[e], a.ai[c.eval].animations[e] = {
        keyframe: d.keyframe,
        state: d.state,
        speed: d.speed,
        count: d.count,
        step: d.step,
        index: d.index,
        timer: d.timer,
        stopping: d.stopping,
        process: d.process ? d.process == d.play ? "play" : "back" : d.process
      });
      for (var f in c) "function" == typeof c[f] && a.ai[c.eval].action == c[f] && (a.ai[c.eval].action = f)
    }
    for (b = 0; b < game.client.map.secrets.length; b++) c = game.client.map.secrets[b], a.secrets[c.eval] = {
      x: c.x,
      y: c.y,
      state: c.state,
      direction: c.direction ? {
        x: c.direction.x,
        y: c.direction.y
      } : null
    };
    for (b = 0; b < game.client.map.secretsHistory.remove.length; b++) a.secretsHistory.remove.push(game.client.map.secretsHistory.remove[b].eval);
    return a
  },
  saveGameCtrl: function(a) {
    a ||
      (a = window.event);
    var b = document.getElementById("savecursor"),
      c = document.querySelectorAll("#savegame .options .slot"),
      d = c[b.cursorIndex].querySelector(".textcursor");
    switch (a.keyCode) {
      case 40:
        d || (audio.playSound("movegun2"), b.cursorIndex++, b.cursorIndex == game.slots.length && (b.cursorIndex = 0), game.saveGame());
        break;
      case 38:
        d || (audio.playSound("movegun2"), b.cursorIndex--, 0 > b.cursorIndex && (b.cursorIndex = game.slots.length - 1), game.saveGame());
        break;
      case 13:
        audio.playSound("shoot");
        d ? (localStorage.slots =
          JSON.stringify(game.slots), game.slots = JSON.parse(localStorage.slots), c[b.cursorIndex].removeChild(d)) : (game.slots[b.cursorIndex] = game.newSaveGame(), d = document.createElement("DIV"), d.className = "textcursor", c[b.cursorIndex].appendChild(d));
        game.saveGame();
        break;
      case 27:
        audio.playSound("escpressed");
        d ? (c[b.cursorIndex].removeChild(d), game.slots[b.cursorIndex] = null, game.saveGame()) : (window.onkeydown = window.onclick = null, game.hideScreen("savegame", game.loop ? game.gameMenu : game.menu));
        break;
      case 8:
        d && game.slots[b.cursorIndex].name.length &&
          (game.slots[b.cursorIndex].name = game.slots[b.cursorIndex].name.slice(0, game.slots[b.cursorIndex].name.length - 1), game.saveGame());
        break;
      default:
        if (d && 15 > game.slots[b.cursorIndex].name.length && (c = a.keyCode, 32 == c || 47 < c && 91 > c || 105 < c && 112 > c && 108 != c || 185 < c && 193 > c || 218 < c && 223 > c)) {
          d = "";
          if (47 < c && 58 > c) d = String.fromCharCode(c);
          else if (64 < c && 91 > c) a.shiftKey || (c += 32), d = String.fromCharCode(c);
          else switch (c) {
            case 32:
              d = " ";
              break;
            case 106:
              d = "*";
              break;
            case 107:
              d = "+";
              break;
            case 109:
              d = "-";
              break;
            case 110:
              d = ".";
              break;
            case 111:
              d = "/";
              break;
            case 186:
              d = ";";
              break;
            case 187:
              d = "=";
              break;
            case 188:
              d = ",";
              break;
            case 189:
              d = "-";
              break;
            case 190:
              d = ".";
              break;
            case 191:
              d = "/";
              break;
            case 192:
              d = "'";
              break;
            case 219:
              d = "(";
              break;
            case 220:
              d = "\\";
              break;
            case 221:
              d = ")";
              break;
            case 222:
              d = "'"
          }
          game.smallWhite.images[d.charCodeAt(0) - 1] && (game.slots[b.cursorIndex].name += d, game.saveGame())
        }
    }
  },
  saveGame: function() {
    game.showScreen("savegame", null, function() {
      var a = document.getElementById("savecursor");
      if (void 0 == a.cursorIndex || null == a.cursorIndex) a.cursorIndex =
        0;
      a.style.top = 38 * a.cursorIndex + "px";
      var b = document.querySelectorAll("#savegame .options .slot");
      game.slots || (game.slots = localStorage.slots ? JSON.parse(localStorage.slots) : [null, null, null, null, null, null, null, null, null, null]);
      for (var c = 0; c < b.length; c++) {
        var d = b[c];
        d.index = c;
        d.onmousemove = function() {
          if (game.activeScreen == "savegame") {
            var a = document.getElementById("savecursor");
            if (a.cursorIndex != this.index) {
              a.cursorIndex = this.index;
              audio.playSound("movegun1");
              game.saveGame()
            }
          }
        };
        d.onmouseup = function(a) {
          if (game.activeScreen ==
            "savegame") {
            if (!a) a = window.event;
            if (a.button == 0) {
              window.onkeydown = window.onclick = null;
              audio.playSound("shoot");
              game.slots[this.index] = game.newSaveGame();
              game.slots[this.index].name = "Saved game " + (this.index + 1) + "/" + game.mapName.toUpperCase();
              localStorage.slots = JSON.stringify(game.slots);
              game.slots = JSON.parse(localStorage.slots);
              game.saveGame()
            }
          }
        };
        b[c].className = game.slots[c] ? "slot" + (c == a.cursorIndex ? " selected" : "") : "slot empty" + (c == a.cursorIndex ? " selected" : "");
        d = b[c].querySelector(".text");
        d.className =
          game.slots[c] ? "text beforecursor" : "text small";
        d.innerHTML = "";
        game[c == a.cursorIndex ? "smallWhite" : "smallText"].text(d, game.slots[c] ? game.slots[c].name : "- empty -");
        var e = b[c].querySelector(".textcursor");
        e && (e.style.marginLeft = d.offsetWidth + "px")
      }
      window.onmouseup = function(a) {
        if (game.activeScreen == "savegame") {
          if (!a) a = window.event;
          if (a.button != 0) {
            window.onkeydown = window.onclick = null;
            audio.playSound("escpressed");
            game.hideScreen("savegame", game.loop ? game.gameMenu : game.menu)
          }
        }
      };
      window.onkeydown != game.saveGameCtrl &&
        setTimeout(function() {
          window.onkeydown = game.saveGameCtrl
        }, 500)
    })
  },
  gameMainMenu: "New Game,Sound,Control,Load Game,Save Game,Graphic Detail,Read This!,End Game,Back to Game,Quit".split(","),
  endgameStr: "Are you sure you want\nto end the game you\nare playing? (Y or N):",
  curgameStr: "You are currently in\na game. Continuing will\nerase old game. Ok?",
  cheatStr: "You now have 100% Health,\n99 Ammo and both Keys!\nNote that you have basically\neliminated your chances of\ngetting a high score!",
  endStrings: 'Dost thou wish to\nleave with such hasty\nabandon?;Chickening out...\nalready?;Press N for more carnage.\nPress Y to be a weenie.;So, you think you can\nquit this easily, huh?;Press N to save the world.\nPress Y to abandon it in\nits hour of need.;Press N if you are brave.\nPress Y to cower in shame.;Heroes, press N.\nWimps, press Y.;You are at an intersection.\nA sign says, "Press Y to quit."\n>;For guns and glory, press N.\nFor work and worry, press Y.'.split(";"),
  mainMenu: "New Game,Sound,Control,Load Game,Save Game,Graphic Detail,Read This!,View Scores,Back to Demo,Quit".split(","),
  gameMenu: function() {
    game.showScreen("gamemenu", null, function() {
      document.body.parentNode.style.backgroundColor = "#880000";
      document.body.style.backgroundColor = "#880000";
      document.body.onmousedown = null;
      "wonderin" != audio.currentMusic && (audio.stopMusic(), audio.playMusic("wonderin"));
      var a = document.getElementById("gamemenucursor");
      if (void 0 == a.cursorIndex || null == a.cursorIndex) a.cursorIndex = 0;
      document.querySelectorAll("#gamemenu .options .text");
      for (var a = document.querySelectorAll("#gamemenu .options .text"), b = 0; b < a.length; b++) {
        var c = a[b];
        c.index = b;
        c.onmousemove = function() {
          if (game.activeScreen == "gamemenu") {
            var a = document.getElementById("gamemenucursor"),
              b = document.querySelectorAll("#gamemenu .options .text");
            if (!(b[this.index].className.search("disabled") > -1 || a.cursorIndex == this.index)) {
              var c = b[a.cursorIndex];
              c.className = c.className.replace(" selected", "");
              c.className.search("readthis") < 0 ? game.largeText.text(c, game.gameMainMenu[a.cursorIndex]) :
                game.largeReadthis.text(c, game.gameMainMenu[a.cursorIndex]);
              a.cursorIndex = this.index;
              audio.playSound("movegun1");
              c = b[a.cursorIndex];
              c.className = c.className + " selected";
              c.className.search("readthis") < 0 ? game.largeSelected.text(c, game.gameMainMenu[a.cursorIndex]) : game.largeReadthisSelected.text(c, game.gameMainMenu[a.cursorIndex]);
              a.style.top = 37 * a.cursorIndex + "px"
            }
          }
        };
        c.onmouseup = function(a) {
          if (game.activeScreen == "gamemenu") {
            if (!a) a = window.event;
            if (a.button === 0) {
              audio.playSound("shoot");
              switch (this.index) {
                case 0:
                  game.hideScreen("gamemenu",
                    game.episode);
                  break;
                case 1:
                  game.hideScreen("gamemenu", game.sound);
                  break;
                case 2:
                  window.onkeydown = window.onclick = null;
                  game.hideScreen("gamemenu", game.customize);
                  break;
                case 3:
                  window.onkeydown = window.onclick = null;
                  game.hideScreen("gamemenu", game.loadGame);
                  break;
                case 4:
                  window.onkeydown = window.onclick = null;
                  game.hideScreen("gamemenu", game.saveGame);
                  break;
                case 5:
                  window.onkeydown = window.onclick = null;
                  game.hideScreen("gamemenu", game.detail);
                  break;
                case 6:
                  window.onkeydown = window.onclick = null;
                  document.body.parentNode.style.backgroundColor =
                    null;
                  document.body.style.backgroundColor = null;
                  game.hideScreen("gamemenu", function() {
                    audio.currentMusic && audio.stopMusic();
                    audio.playMusic("corner");
                    game.showReadme("readthis", game.gameMenu)
                  });
                  break;
                case 7:
                  window.onmouseup = window.onkeydown = window.onclick = null;
                  game.showMessage(game.endgameStr);
                  setTimeout(function() {
                    window.onmouseup = function(a) {
                      if (game.activeScreen == "gamemenu") {
                        window.onkeydown = window.onclick = null;
                        if (!a) a = window.event;
                        if (a.button == 0) {
                          game.hideMessage();
                          document.body.parentNode.style.backgroundColor =
                            null;
                          document.body.style.backgroundColor = null;
                          game.hideScreen("gamemenu", function() {
                            audio.currentMusic && audio.stopMusic();
                            game.showScreen("game", null, function() {
                              game.pause = false;
                              setTimeout(function() {
                                game.client.lives = 0;
                                game.client.health = 0;
                                for (game.client.deathCam = game.client.map.ai[utils.random(game.client.map.ai.length - 1)]; game.client.deathCam.center == void 0;) game.client.deathCam = game.client.map.ai[utils.random(game.client.map.ai.length - 1)]
                              }, 1E3)
                            })
                          })
                        } else {
                          game.hideMessage();
                          game.gameMenu()
                        }
                        a.stopPropagation();
                        a.preventDefault();
                        return false
                      }
                    }
                  }, 500);
                  window.onkeydown = function(a) {
                    window.onmouseup = window.onkeydown = window.onclick = null;
                    if (!a) a = window.event;
                    switch (a.keyCode) {
                      case 89:
                      case 90:
                        game.hideMessage();
                        document.body.parentNode.style.backgroundColor = null;
                        document.body.style.backgroundColor = null;
                        game.hideScreen("gamemenu", function() {
                          audio.currentMusic && audio.stopMusic();
                          game.showScreen("game", null, function() {
                            game.pause = false;
                            setTimeout(function() {
                              game.client.lives = 0;
                              game.client.health = 0;
                              for (game.client.deathCam =
                                game.client.map.ai[utils.random(game.client.map.ai.length - 1)]; game.client.deathCam.center == void 0;) game.client.deathCam = game.client.map.ai[utils.random(game.client.map.ai.length - 1)]
                            }, 1E3)
                          })
                        });
                        break;
                      case 78:
                      case 27:
                        game.hideMessage();
                        game.gameMenu()
                    }
                  };
                  break;
                case 8:
                  window.onkeydown = window.onclick = null;
                  document.body.parentNode.style.backgroundColor = null;
                  document.body.style.backgroundColor = null;
                  game.hideScreen("gamemenu", function() {
                    audio.currentMusic && audio.stopMusic();
                    game.showScreen("game", null, function() {
                      setTimeout(function() {
                        game.pause =
                          false
                      }, 1E3)
                    })
                  });
                  break;
                case 9:
                  window.onkeydown = window.onclick = null;
                  game.showMessage(game.endStrings[utils.random(8)]);
                  setTimeout(function() {
                    window.onmouseup = function(a) {
                      window.onmouseup = null;
                      if (!a) a = window.event;
                      switch (a.button) {
                        case 0:
                          window.close();
                        case 1:
                        case 2:
                          game.hideMessage();
                          game.gameMenu()
                      }
                    }
                  }, 1);
                  window.onkeydown = function(a) {
                    if (!a) a = window.event;
                    switch (a.keyCode) {
                      case 89:
                      case 90:
                        window.close();
                      case 78:
                      case 27:
                        game.hideMessage();
                        game.gameMenu()
                    }
                  }
              }
            }
          }
        }
      }
      window.onclick = null;
      window.onclick = null;
      window.onkeydown = function(a) {
        if (!a) a = window.event;
        var b = document.getElementById("gamemenucursor");
        if (a.keyCode == 40 || a.keyCode == 38) {
          var c = document.querySelectorAll("#gamemenu .options .text"),
            h = c.length,
            g = c[b.cursorIndex];
          g.className = g.className.replace(" selected", "");
          g.className.search("readthis") < 0 ? game.largeText.text(g, game.gameMainMenu[b.cursorIndex]) : game.largeReadthis.text(g, game.gameMainMenu[b.cursorIndex]);
          switch (a.keyCode) {
            case 40:
              b.cursorIndex++;
              if (b.cursorIndex == h) b.cursorIndex = 0;
              for (; c[b.cursorIndex].className.search("disabled") >
                -1;) {
                b.cursorIndex++;
                if (b.cursorIndex == h) b.cursorIndex = 0
              }
              audio.playSound("movegun1");
              break;
            case 38:
              b.cursorIndex--;
              if (b.cursorIndex < 0) b.cursorIndex = h - 1;
              for (; c[b.cursorIndex].className.search("disabled") > -1;) {
                b.cursorIndex--;
                if (b.cursorIndex < 0) b.cursorIndex = h - 1
              }
              audio.playSound("movegun2")
          }
          g = c[b.cursorIndex];
          g.className = g.className + " selected";
          g.className.search("readthis") < 0 ? game.largeSelected.text(g, game.gameMainMenu[b.cursorIndex]) : game.largeReadthisSelected.text(g, game.gameMainMenu[b.cursorIndex]);
          b.style.top = 37 * b.cursorIndex + "px"
        } else if (a.keyCode == 13) {
          audio.playSound("shoot");
          if (b.cursorIndex == 0) game.hideScreen("gamemenu", game.episode);
          else if (b.cursorIndex == 1) {
            window.onkeydown = window.onclick = null;
            game.hideScreen("gamemenu", game.sound)
          } else if (b.cursorIndex == 2) {
            window.onkeydown = window.onclick = null;
            game.hideScreen("gamemenu", game.customize)
          } else if (b.cursorIndex == 3) {
            window.onkeydown = window.onclick = null;
            game.hideScreen("gamemenu", game.loadGame)
          } else if (b.cursorIndex == 4) {
            window.onkeydown = window.onclick =
              null;
            game.hideScreen("gamemenu", game.saveGame)
          } else if (b.cursorIndex == 5) {
            window.onkeydown = window.onclick = null;
            game.hideScreen("gamemenu", game.detail)
          } else if (b.cursorIndex == 6) {
            window.onkeydown = window.onclick = null;
            document.body.parentNode.style.backgroundColor = null;
            document.body.style.backgroundColor = null;
            game.hideScreen("gamemenu", function() {
              audio.currentMusic && audio.stopMusic();
              audio.playMusic("corner");
              game.showReadme("readthis", game.gameMenu)
            })
          } else if (b.cursorIndex == 7) {
            window.onmouseup = window.onkeydown =
              window.onclick = null;
            game.showMessage(game.endgameStr);
            setTimeout(function() {
              window.onmouseup = function(a) {
                if (game.activeScreen == "gamemenu") {
                  window.onkeydown = window.onclick = null;
                  if (!a) a = window.event;
                  if (a.button == 0) {
                    game.hideMessage();
                    document.body.parentNode.style.backgroundColor = null;
                    document.body.style.backgroundColor = null;
                    game.hideScreen("gamemenu", function() {
                      audio.currentMusic && audio.stopMusic();
                      game.showScreen("game", null, function() {
                        game.pause = false;
                        setTimeout(function() {
                          game.client.lives = 0;
                          game.client.health =
                            0;
                          for (game.client.deathCam = game.client.map.ai[utils.random(game.client.map.ai.length - 1)]; game.client.deathCam.center == void 0;) game.client.deathCam = game.client.map.ai[utils.random(game.client.map.ai.length - 1)]
                        }, 1E3)
                      })
                    })
                  } else {
                    game.hideMessage();
                    game.gameMenu()
                  }
                  a.stopPropagation();
                  a.preventDefault();
                  return false
                }
              }
            }, 500);
            window.onkeydown = function(a) {
              window.onmouseup = window.onkeydown = window.onclick = null;
              if (!a) a = window.event;
              switch (a.keyCode) {
                case 89:
                case 90:
                  game.hideMessage();
                  document.body.parentNode.style.backgroundColor =
                    null;
                  document.body.style.backgroundColor = null;
                  game.hideScreen("gamemenu", function() {
                    audio.currentMusic && audio.stopMusic();
                    game.showScreen("game", null, function() {
                      game.pause = false;
                      setTimeout(function() {
                        game.client.lives = 0;
                        game.client.health = 0;
                        for (game.client.deathCam = game.client.map.ai[utils.random(game.client.map.ai.length - 1)]; game.client.deathCam.center == void 0;) game.client.deathCam = game.client.map.ai[utils.random(game.client.map.ai.length - 1)]
                      }, 1E3)
                    })
                  });
                  break;
                case 78:
                case 27:
                  game.hideMessage();
                  game.gameMenu()
              }
            }
          } else if (b.cursorIndex ==
            8) {
            window.onkeydown = window.onclick = null;
            document.body.parentNode.style.backgroundColor = null;
            document.body.style.backgroundColor = null;
            game.hideScreen("gamemenu", function() {
              audio.currentMusic && audio.stopMusic();
              game.showScreen("game", null, function() {
                setTimeout(function() {
                  game.pause = false
                }, 1E3)
              })
            })
          } else if (b.cursorIndex == 9) {
            window.onkeydown = window.onclick = null;
            game.showMessage(game.endStrings[utils.random(8)]);
            window.onkeydown = function(a) {
              window.onkeydown = window.onclick = null;
              if (!a) a = window.event;
              switch (a.keyCode) {
                case 89:
                case 90:
                  window.close();
                case 78:
                case 27:
                  game.hideMessage();
                  game.gameMenu()
              }
            }
          }
        } else if (a.keyCode == 27) {
          window.onkeydown = window.onclick = null;
          audio.playSound("escpressed");
          game.showMessage(game.endStrings[utils.random(8)]);
          window.onkeydown = function(a) {
            if (!a) a = window.event;
            switch (a.keyCode) {
              case 89:
              case 90:
                window.close();
              case 78:
              case 27:
                game.hideMessage();
                game.gameMenu()
            }
          }
        }
      }
    })
  },
  menu: function() {
    game.showScreen("menu", null, function() {
      document.body.parentNode.style.backgroundColor = "#880000";
      document.body.style.backgroundColor = "#880000";
      "wonderin" != audio.currentMusic && (audio.stopMusic(), audio.playMusic("wonderin"));
      var a = document.getElementById("menucursor");
      if (void 0 == a.cursorIndex || null == a.cursorIndex) a.cursorIndex = 0;
      a = document.querySelectorAll("#menu .options .text");
      window.onmouseup = function(a) {
        if (game.activeScreen == "menu") {
          if (!a) a = window.event;
          if (a.button != 0) {
            audio.playSound("escpressed");
            window.onkeydown = window.onclick = null;
            game.showMessage(game.endStrings[utils.random(8)]);
            setTimeout(function() {
              window.onmouseup = function(a) {
                window.onmouseup =
                  null;
                if (!a) a = window.event;
                switch (a.button) {
                  case 0:
                    window.close();
                  case 1:
                  case 2:
                    game.hideMessage();
                    game.menu()
                }
              }
            }, 1);
            window.onkeydown = function(a) {
              if (!a) a = window.event;
              switch (a.keyCode) {
                case 89:
                case 90:
                  window.close();
                case 78:
                case 27:
                  game.hideMessage();
                  game.menu()
              }
            }
          }
        }
      };
      for (var b = 0; b < a.length; b++) {
        var c = a[b];
        c.index = b;
        c.onmousemove = function() {
          if (game.activeScreen == "menu") {
            var a = document.getElementById("menucursor"),
              b = document.querySelectorAll("#menu .options .text");
            if (!(b[this.index].className.search("disabled") >
                -1 || a.cursorIndex == this.index)) {
              var c = b[a.cursorIndex];
              c.className = c.className.replace(" selected", "");
              c.className.search("readthis") < 0 ? game.largeText.text(c, game.mainMenu[a.cursorIndex]) : game.largeReadthis.text(c, game.mainMenu[a.cursorIndex]);
              a.cursorIndex = this.index;
              audio.playSound("movegun1");
              c = b[a.cursorIndex];
              c.className = c.className + " selected";
              c.className.search("readthis") < 0 ? game.largeSelected.text(c, game.mainMenu[a.cursorIndex]) : game.largeReadthisSelected.text(c, game.mainMenu[a.cursorIndex]);
              a.style.top = 37 * a.cursorIndex + "px"
            }
          }
        };
        c.onmouseup = function(a) {
          if (game.activeScreen == "menu") {
            if (!a) a = window.event;
            if (a.button === 0) {
              audio.playSound("shoot");
              switch (this.index) {
                case 0:
                  game.hideScreen("menu", game.episode);
                  break;
                case 1:
                  game.hideScreen("menu", game.sound);
                  break;
                case 2:
                  window.onkeydown = window.onclick = null;
                  game.hideScreen("menu", game.customize);
                  break;
                case 3:
                  window.onkeydown = window.onclick = null;
                  game.hideScreen("menu", game.loadGame);
                  break;
                case 4:
                  window.onkeydown = window.onclick = null;
                  game.hideScreen("menu",
                    game.saveGame);
                  break;
                case 5:
                  window.onkeydown = window.onclick = null;
                  game.hideScreen("menu", game.detail);
                  break;
                case 6:
                  window.onkeydown = window.onclick = null;
                  document.body.parentNode.style.backgroundColor = null;
                  document.body.style.backgroundColor = null;
                  game.hideScreen("menu", function() {
                    audio.currentMusic && audio.stopMusic();
                    audio.playMusic("corner");
                    game.showReadme("readthis", game.menu)
                  });
                  break;
                case 7:
                  window.onkeydown = window.onclick = null;
                  game.hideScreen("menu", function() {
                    audio.currentMusic && audio.stopMusic();
                    audio.playMusic("roster");
                    game.newHighscore("e1m1", 0, game.menu)
                  });
                  break;
                case 9:
                  window.onkeydown = window.onclick = null;
                  game.showMessage(game.endStrings[utils.random(8)]);
                  setTimeout(function() {
                    window.onmouseup = function(a) {
                      window.onmouseup = null;
                      if (!a) a = window.event;
                      switch (a.button) {
                        case 0:
                          window.close();
                        case 1:
                        case 2:
                          game.hideMessage();
                          game.menu()
                      }
                    }
                  }, 1);
                  window.onkeydown = function(a) {
                    if (!a) a = window.event;
                    switch (a.keyCode) {
                      case 89:
                      case 90:
                        window.close();
                      case 78:
                      case 27:
                        game.hideMessage();
                        game.menu()
                    }
                  }
              }
            } else {
              window.onkeydown =
                window.onclick = null;
              audio.playSound("escpressed");
              game.showMessage(game.endStrings[utils.random(8)]);
              window.onmouseup = function(a) {
                window.onmouseup = null;
                if (game.activeScreen == "menu") {
                  if (!a) a = window.event;
                  switch (a.button) {
                    case 0:
                      window.close();
                    case 1:
                    case 2:
                      game.hideMessage();
                      game.menu()
                  }
                }
              };
              window.onkeydown = function(a) {
                if (!a) a = window.event;
                switch (a.keyCode) {
                  case 89:
                  case 90:
                    window.close();
                  case 78:
                  case 27:
                    game.hideMessage();
                    game.menu()
                }
              }
            }
          }
        }
      }
      window.onclick = null;
      window.onkeydown = function(a) {
        if (!a) a = window.event;
        var b = document.getElementById("menucursor");
        if (a.keyCode == 40 || a.keyCode == 38) {
          var c = document.querySelectorAll("#menu .options .text"),
            h = c.length,
            g = c[b.cursorIndex];
          g.className = g.className.replace(" selected", "");
          g.className.search("readthis") < 0 ? game.largeText.text(g, game.mainMenu[b.cursorIndex]) : game.largeReadthis.text(g, game.mainMenu[b.cursorIndex]);
          switch (a.keyCode) {
            case 40:
              b.cursorIndex++;
              if (b.cursorIndex == h) b.cursorIndex = 0;
              for (; c[b.cursorIndex].className.search("disabled") > -1;) {
                b.cursorIndex++;
                if (b.cursorIndex == h) b.cursorIndex = 0
              }
              audio.playSound("movegun1");
              break;
            case 38:
              b.cursorIndex--;
              if (b.cursorIndex < 0) b.cursorIndex = h - 1;
              for (; c[b.cursorIndex].className.search("disabled") > -1;) {
                b.cursorIndex--;
                if (b.cursorIndex < 0) b.cursorIndex = h - 1
              }
              audio.playSound("movegun1")
          }
          g = c[b.cursorIndex];
          g.className = g.className + " selected";
          g.className.search("readthis") < 0 ? game.largeSelected.text(g, game.mainMenu[b.cursorIndex]) : game.largeReadthisSelected.text(g, game.mainMenu[b.cursorIndex]);
          b.style.top = 37 * b.cursorIndex +
            "px"
        } else if (a.keyCode == 13) {
          audio.playSound("shoot");
          if (b.cursorIndex == 0) game.hideScreen("menu", game.episode);
          else if (b.cursorIndex == 1) {
            window.onkeydown = window.onclick = null;
            game.hideScreen("menu", game.sound)
          } else if (b.cursorIndex == 2) {
            window.onkeydown = window.onclick = null;
            game.hideScreen("menu", game.customize)
          } else if (b.cursorIndex == 3) {
            window.onkeydown = window.onclick = null;
            game.hideScreen("menu", game.loadGame)
          } else if (b.cursorIndex == 4) {
            window.onkeydown = window.onclick = null;
            game.hideScreen("menu", game.saveGame)
          } else if (b.cursorIndex ==
            5) {
            window.onkeydown = window.onclick = null;
            game.hideScreen("menu", game.detail)
          } else if (b.cursorIndex == 6) {
            window.onkeydown = window.onclick = null;
            document.body.parentNode.style.backgroundColor = null;
            document.body.style.backgroundColor = null;
            game.hideScreen("menu", function() {
              audio.currentMusic && audio.stopMusic();
              audio.playMusic("corner");
              game.showReadme("readthis", game.menu)
            })
          } else if (b.cursorIndex == 7) {
            window.onkeydown = window.onclick = null;
            game.hideScreen("menu", function() {
              audio.currentMusic && audio.stopMusic();
              audio.playMusic("roster");
              game.newHighscore("e1m1", 0, game.menu)
            })
          } else if (b.cursorIndex == 9) {
            window.onkeydown = window.onclick = null;
            game.showMessage(game.endStrings[utils.random(8)]);
            window.onmouseup = function(a) {
              if (game.activeScreen == "menu") {
                window.onmouseup = null;
                if (!a) a = window.event;
                switch (a.button) {
                  case 0:
                    window.close();
                  case 1:
                  case 2:
                    game.hideMessage();
                    game.menu()
                }
              }
            };
            window.onkeydown = function(a) {
              if (!a) a = window.event;
              switch (a.keyCode) {
                case 89:
                case 90:
                  window.close();
                case 78:
                case 27:
                  game.hideMessage();
                  game.menu()
              }
            }
          }
        } else if (a.keyCode == 27) {
          window.onkeydown = window.onclick = null;
          audio.playSound("escpressed");
          game.showMessage(game.endStrings[utils.random(8)]);
          window.onmouseup = function(a) {
            if (game.activeScreen == "menu") {
              window.onmouseup = null;
              if (!a) a = window.event;
              switch (a.button) {
                case 0:
                  window.close();
                case 1:
                case 2:
                  game.hideMessage();
                  game.menu()
              }
            }
          };
          window.onkeydown = function(a) {
            if (!a) a = window.event;
            switch (a.keyCode) {
              case 89:
              case 90:
                window.close();
              case 78:
              case 27:
                game.hideMessage();
                game.menu()
            }
          }
        }
      }
    })
  },
  showReadme: function(a,
    b) {
    game.requestHTML(a, function() {
      game.showScreen(a, null, function() {
        setTimeout(function() {
          var c = document.getElementById(a);
          c.pageIndex = 0;
          var d = document.querySelectorAll("#" + a + " .page"),
            e = document.querySelector("#" + a + " .pagenr"),
            f = function(a) {
              for (var b = 0; b < d.length; b++) d[b].className = d[b].className.replace(" selected", "");
              d[a].className += " selected";
              game.smallPageNr.text(e, "pg " + (a + 1) + " of " + d.length)
            };
          f(c.pageIndex);
          window.onmouseup = function(e) {
            e || (e = window.event);
            0 == e.button ? c.pageIndex < d.length -
              1 ? (audio.playSound("movegun2"), c.pageIndex++, f(c.pageIndex)) : (audio.playSound("escpressed"), game.hideScreen(a, b)) : (audio.playSound("escpressed"), game.hideScreen(a, b))
          };
          window.onkeydown = function(e) {
            e || (e = window.event);
            39 == e.keyCode ? c.pageIndex < d.length - 1 && (audio.playSound("movegun2"), c.pageIndex++, f(c.pageIndex)) : 37 == e.keyCode ? 0 < c.pageIndex && (audio.playSound("movegun2"), c.pageIndex--, f(c.pageIndex)) : 27 == e.keyCode && (audio.playSound("escpressed"), game.hideScreen(a, b))
          }
        }, 1E3)
      })
    })
  },
  showMessage: function(a) {
    game.trackPage(a);
    game.requestHTML("msg", function() {
      var b = document.getElementById("msgtext");
      b.innerHTML = "";
      game.largeReadme.text(b, a);
      document.getElementById("msg").style.display = "block";
      b.style.marginTop = floor(-b.offsetHeight / 2) + "px";
      b.style.marginLeft = floor(-b.offsetWidth / 2) + "px"
    })
  },
  hideMessage: function() {
    document.getElementById("msg").style.display = "";
    audio.playSound("escpressed")
  },
  smallWhite: new font.Font(wolf3d.fonts.small, {
    r: 255,
    g: 255,
    b: 255
  }),
  smallText: new font.Font(wolf3d.fonts.small, {
    r: 140,
    g: 140,
    b: 140
  }),
  smallPageNr: new font.Font(wolf3d.fonts.small, {
    r: 88,
    g: 84,
    b: 0
  }),
  smallReadmeTitle: new font.Font(wolf3d.fonts.small, {
    r: 0,
    g: 88,
    b: 88
  }),
  smallReadmeCyan: new font.Font(wolf3d.fonts.small, {
    r: 0,
    g: 132,
    b: 132
  }),
  smallReadmeGreen: new font.Font(wolf3d.fonts.small, {
    r: 4,
    g: 88,
    b: 0
  }),
  smallReadmeRed: new font.Font(wolf3d.fonts.small, {
    r: 100,
    g: 0,
    b: 0
  }),
  smallReadme: new font.Font(wolf3d.fonts.small, {
    r: 0,
    g: 0,
    b: 0
  }),
  largeReadme: new font.Font(wolf3d.fonts.large, {
    r: 0,
    g: 0,
    b: 0
  }),
  largeText: new font.Font(wolf3d.fonts.large, {
    r: 140,
    g: 140,
    b: 140
  }),
  largeSelected: new font.Font(wolf3d.fonts.large, {
    r: 192,
    g: 192,
    b: 192
  }),
  largeDisabled: new font.Font(wolf3d.fonts.large, {
    r: 112,
    g: 0,
    b: 0
  }),
  largeReadthis: new font.Font(wolf3d.fonts.large, {
    r: 180,
    g: 172,
    b: 0
  }),
  largeReadthisSelected: new font.Font(wolf3d.fonts.large, {
    r: 252,
    g: 244,
    b: 0
  }),
  bitmap: new font.BitmapFont(wolf3d.fonts.bitmap),
  processFont: function(a) {
    for (var b = a.querySelectorAll(".readme.process"), c = 0; c < b.length; c++) {
      var d = b[c].innerHTML;
      b[c].innerHTML = "";
      for (var e = b[c].className.replace("readme process", ""), d = d.split(" "), f = 0; f < d.length; f++)
        if (d[f].length) {
          var h =
            document.createElement("SPAN");
          h.className = "text readme" + e;
          h.innerHTML = d[f];
          b[c].parentNode.insertBefore(h, b[c])
        }
    }
    els = a.querySelectorAll(".text");
    for (c = 0; c < els.length; c++) switch (els[c].className) {
      case "text":
        game.largeText.text(els[c]);
        break;
      case "text selected":
        game.largeSelected.text(els[c]);
        break;
      case "text disabled":
        game.largeDisabled.text(els[c]);
        break;
      case "text readthis":
        game.largeReadthis.text(els[c]);
        break;
      case "text title":
      case "text readthis selected":
        game.largeReadthisSelected.text(els[c]);
        break;
      case "text bitmap":
        game.bitmap.text(els[c]);
        break;
      case "text pagenr":
        game.smallPageNr.text(els[c]);
        break;
      case "text readme title":
        game.smallReadmeTitle.text(els[c]);
        break;
      case "text readme cyan":
        game.smallReadmeCyan.text(els[c]);
        break;
      case "text readme green":
        game.smallReadmeGreen.text(els[c]);
        break;
      case "text readme red":
        game.smallReadmeRed.text(els[c]);
        break;
      case "text readme white":
        game.smallWhite.text(els[c]);
        break;
      case "text readme":
        game.smallReadme.text(els[c]);
        break;
      case "text highscores":
        game.smallWhite.text(els[c]);
        break;
      case "text small":
        game.smallText.text(els[c]);
        break;
      default:
        game.bitmap.text(els[c])
    }
  },
  render: function(a) {
    game.rendering = !0;
    a || (a = (new Date).getTime());
    game.frameTime = game.prevTimestamp ? floor(a - game.prevTimestamp) : 0;
    game.prevTimestamp = a;
    game.renderFrame || (game.renderFrame = 0);
    game.renderFrame += game.frameTime;
    game.timeFactor = game.timeFactor ? Math.min(game.renderFrame / game.tick, 2) : 1;
    game.loop && (game.loop(), game.renderFrame = 0, window.requestAnimationFrame(game.render))
  },
  trackPage: function(a) {},
  trackEvent: function(a, b, c, d) {},
  init: function() {
    audio.init({
      musicVolume: localStorage.musicVolume ? parseInt(localStorage.musicVolume) / 100 : 1,
      soundsVolume: localStorage.soundsVolume ? parseInt(localStorage.soundsVolume) / 100 : 1
    });
    var a = utils.queryStrings();
    game.debug = a.debug;
    a.loadgame ? game.newLoadGame(JSON.parse(localStorage.slots)[a.loadgame]) : a.map ? game.newGame(a.map || "e1m1", parseInt(a.difficulty || "0"), game.tick) : (audio.playMusic("copypro"), game.showScreen(a.donation ?
      "donation" : "copyright", null,
      function() {
        document.getElementById("start").onclick = window.onkeydown = function() {
          window.onclick = window.onkeydown = null;
          audio.stopMusic();
          game.hideScreen("copyright", function() {
            a.nointro && (game.intro = !1);
            game.intro ? (audio.playMusic("nazi-nor"), game.pc13()) : game.menu()
          })
        }
      }));

    /*window.addEventListener('keyup', function(e) {
      if (e.key == 'f' || e.keyCode == 70) {
        var elem = document.body;

        var fn = elem["requestFullScreen"] ||
          elem["webkitRequestFullscreen"] ||
          elem["mozRequestFullScreen"] ||
          elem["msRequestFullScreen"];

        if (fn) {
          fn.call(elem);
        }
      }
    });*/
  }
};
window.requestAnimationFrame = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
    window.setTimeout(a, floor(game.tick))
  }
}();
window.addEventListener("load", game.init, !1);
