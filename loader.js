export const load = {
  fonts: () => {
     // Memuat jenis font khusus ("Round") untuk digunakan dalam permainan.
    loadFont("Round", "./Round9x13.ttf")
  },
  assets: () => {
    // Memuat semua aset permainan, seperti sprite dan gambar ikon.
    // Ikoni kontrol
    loadSprite("up", "./Arrow_Up_Key_Dark.png")
    loadSprite("down", "./Arrow_Down_Key_Dark.png")
    loadSprite("left", "./Arrow_Left_Key_Dark.png")
    loadSprite("right", "./Arrow_Right_Key_Dark.png")
    loadSprite("space", "./Space_Key_Dark.png")

     // Ikon koin dan bintang
    loadSprite("coin-icon", "./Coins_Ui.png")
    loadSprite("star-icon", "./Stars_Ui.png")

     // Sprite koin, logo, pemain, jembatan, dan laba-laba
    loadSprite("coin", "./Coin.png")
    loadSprite("logo", "./Logo.png")
    loadSprite("player", "./Player.png", {
      // Mengatur potongan sprite untuk animasi pemain.
      sliceX: 4,
      sliceY: 6,
      anims: {
        idle: {
          from: 0,
          to: 3,
          loop: true,
        },
        run: {
          from: 4,
          to: 7,
          loop: true,
        },
        "jump-up": 8,
        "jump-down": 9,
      },
    })
    loadSprite("bridge", "./Bridge.png")
    loadSprite("spider-1", "./Spider_1.png", {
       // Mengatur potongan sprite untuk animasi laba-laba tipe 1.
      sliceX: 3,
      sliceY: 1,
      anims: {
        crawl: { from: 0, to: 2, loop: true },
        idle: 0,
      },
    })
    loadSprite("spider-2", "./Spider_2.png", {
      // Mengatur potongan sprite untuk animasi laba-laba tipe 2.
      sliceX: 3,
      sliceY: 1,
      anims: {
        crawl: { from: 0, to: 2, loop: true },
        idle: 0,
      },
    })
    loadSprite("forest-background", "./android-chrome-512x512.png")
    loadSprite("grass-tileset", "./Grass_Tileset.png", {
      // Mengatur potongan sprite untuk animasi tanah rumput.
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("grass-oneway-tileset", "./Grass_Oneway.png", {
      // Mengatur potongan sprite untuk animasi tanah rumput dengan satu arah.
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("water", "./Water.png", {
      // Mengatur potongan sprite untuk animasi air.
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
        "wave-reversed": {
          from: 7,
          to: 0,
          speed: 16,
          loop: true,
        },
      },
    })
    loadSprite("fish-1", "./Fish_1.png", {
        // Mengatur potongan sprite untuk animasi ikan tipe 1.
      sliceX: 2,
      sliceY: 1,
      anims: {
        swim: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("fish-2", "./Fish_2.png", {
        // Mengatur potongan sprite untuk animasi ikan tipe 2.
      sliceX: 2,
      sliceY: 1,
      anims: {
        swim: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("castle-background", "./Castle_Background_0.png")
    loadSprite("brick-tileset", "./Brick_Tileset.png", {
      // Mengatur potongan sprite untuk animasi tanah bata.
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("brick-oneway-tileset", "./Brick_Oneway.png", {
       // Mengatur potongan sprite untuk animasi tanah bata dengan satu arah.
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })

    loadSprite("lava", "./Lava.png", {
      // Mengatur potongan sprite untuk animasi lava.
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
        "wave-reversed": {
          from: 7,
          to: 0,
          speed: 16,
          loop: true,
        },
      },
    })
    loadSprite("flame-1", "./Flame_1.png", {
      // Mengatur potongan sprite untuk animasi api tipe 1.
      sliceX: 2,
      sliceY: 1,
      anims: {
        burn: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("flame-2", "./Flame_2.png", {
      // Mengatur potongan sprite untuk animasi api tipe 2.
      sliceX: 2,
      sliceY: 1,
      anims: {
        burn: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("axe", "./Axe_Trap.png")
    loadSprite("saw", "./Circular_Saw.png")

    loadSprite("sky-background-0", "./Sky_Background_0.png")
    loadSprite("sky-background-1", "./Sky_Background_1.png")
    loadSprite("sky-background-2", "./Sky_Background_2.png")

    loadSprite("rock-tileset", "./Grass_Rock_Tileset.png", {
      // Mengatur potongan sprite untuk animasi tanah batu.
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("rock-oneway-tileset", "./Grass_Rock_Oneway.png", {
       // Mengatur potongan sprite untuk animasi tanah batu dengan satu arah.
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("clouds", "./Clouds.png", {
      // Mengatur potongan sprite untuk animasi awan.
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
        "wave-reversed": {
          from: 7,
          to: 0,
          speed: 16,
          loop: true,
        },
      },
    })
    loadSprite("bird-1", "./Bird_1.png", {
      // Mengatur potongan sprite untuk animasi burung tipe 1.
      sliceX: 3,
      sliceY: 1,
      anims: {
        fly: {
          from: 0,
          to: 2,
          speed: 9,
          loop: true,
        },
      },
    })
    loadSprite("bird-2", "./Bird_2.png", {
      // Mengatur potongan sprite untuk animasi burung tipe 2.
      sliceX: 3,
      sliceY: 1,
      anims: {
        fly: {
          from: 0,
          to: 2,
          speed: 9,
          loop: true,
        },
      },
    })
  },
  sounds: () => {
    // Memuat berbagai suara untuk digunakan dalam permainan.
    loadSound("jump", "./jump.wav")
    loadSound("coin", "./coin.wav")
    loadSound("water-ambience", "./water-ambience.mp3")
    loadSound("spider-attack", "./spider-attack.mp3")
    loadSound("hit", "./hit.wav")
    loadSound("lava-ambience", "./lava.wav")
    loadSound("confirm-ui", "./confirm-ui.wav")
    loadSound("swinging-axe", "./swinging-axe.mp3")
    loadSound("saw", "./saw.wav")
    loadSound("fireball", "./fireball.wav")
    loadSound("strong-wind", "./strong-wind.wav")
    loadSound("dive", "./dive.wav")
  },
}
