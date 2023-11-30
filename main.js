// Mengimpor pustaka Kaboom dan modul entitas serta utilitas lainnya.
import kaboom from "./kaboom.mjs"
import { Player } from "./Player.js"
import { Fish } from "./Fish.js"
import { Flames } from "./Flames.js"
import { Spiders } from "./Spiders.js"
import { Camera } from "./Camera.js"
import { level1Layout, level1Mappings } from "./level1Layout.js"
import { level1Config } from "./config.js"
import { level2Config } from "./config2.js"
import { UIManager } from "./UIManager.js"
import { level2Layout, level2Mappings } from "./level2Layout.js"
import { Level } from "./Level.js"
import { Axes } from "./Axes.js"
import { Saws } from "./Saws.js"
import { level3Config } from "./config3.js"
import { level3Layout, level3Mappings } from "./level3Layout.js"
import { Birds } from "./Birds.js"
import { load } from "./loader.js"
import { bgSoundManager } from "./BGSoundManager.js"

// Inisialisasi Kaboom dengan konfigurasi tertentu.
kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
  debug: false,
})

// Memuat font, aset, dan suara.
load.fonts()
load.assets()
load.sounds()

// Definisi berbagai scene permainan.
const scenes = {
  // Scene menu utama.
  menu: () => {
    UIManager.displayMainMenu()
  },
  // Scene menu kontrol permainan.
  controls: () => {
    UIManager.displayControlsMenu()
  },
   // Scene level 1
  1: () => {
    // Pengaturan musik latar dan gravitasi.
    bgSoundManager.addSound("water-ambience", {
      volume: 0.02,
      loop: true,
    })
    bgSoundManager.play("water-ambience")
   // Scene untuk Level 1
    // Membuat objek Level
    const level1 = new Level()
    // Mengatur gravitasi dan menggambar latar belakang
    setGravity(level1Config.gravity)
    level1.drawBackground("forest-background")
     // Menggambar layout dan menambahkan elemen-elemen seperti player, ikan, laba-laba, dan lainnya
    level1.drawMapLayout(level1Layout, level1Mappings)

    const player = new Player(
      level1Config.playerStartPosX,
      level1Config.playerStartPosY,
      level1Config.playerSpeed,
      level1Config.jumpForce,
      level1Config.nbLives,
      1,
      false
    )
    player.enablePassthrough()
    player.enableCoinPickUp()
    player.enableMobVunerability()

    const fish = new Fish(
      level1Config.fishPositions.map((fishPos) => fishPos()),
      level1Config.fishAmplitudes,
      level1Config.fishType
    )
    fish.setMovementPattern()

    const spiders = new Spiders(
      level1Config.spiderPositions.map((spiderPos) => spiderPos()),
      level1Config.spiderAmplitudes,
      level1Config.spiderSpeeds,
      level1Config.spiderType
    )
    spiders.setMovementPattern()
    spiders.enablePassthrough()

    level1.drawWaves("water", "wave")

    // Mengatur kamera dan UI
    const camera = new Camera()
    camera.attach(player.gameObj, 0, -200, null, 200)
    UIManager.addDarkBg()
    UIManager.displayLivesCount(player)
    UIManager.displayCoinCount(player)

    player.updateLives(UIManager.livesCountUI)
    player.updateCoinCount(UIManager.coinCountUI)
  },
  // Scene untuk Level 2
  2: () => {
    // Menghentikan semua suara dan memainkan musik latar baru
    bgSoundManager.pauseAllSounds()
    bgSoundManager.addSound("lava-ambience", { loop: true })
    bgSoundManager.play("lava-ambience")
    // Mengatur gravitasi dan menggambar latar belakang
    setGravity(level2Config.gravity)
  
    // Menggambar layout dan menambahkan elemen-elemen seperti player, nyala api, laba-laba, kapak, dan gergaji
    const level2 = new Level()
    level2.drawBackground("castle-background")
    level2.drawMapLayout(level2Layout, level2Mappings)

    const player = new Player(
      level2Config.playerStartPosX,
      level2Config.playerStartPosY,
      level2Config.playerSpeed,
      level2Config.jumpForce,
      level2Config.nbLives,
      2,
      false
    )
    player.enablePassthrough()
    player.enableCoinPickUp()
    player.enableMobVunerability()

    const flames = new Flames(
      level2Config.flamePositions.map((flamePos) => flamePos()),
      level2Config.flameAmplitudes,
      level2Config.flameType
    )
    flames.setMovementPattern()

    const spiders = new Spiders(
      level2Config.spiderPositions.map((spiderPos) => spiderPos()),
      level2Config.spiderAmplitudes,
      level2Config.spiderSpeeds,
      level2Config.spiderType
    )
    spiders.setMovementPattern()
    spiders.enablePassthrough()

    const axes = new Axes(
      level2Config.axesPositions.map((axePos) => axePos()),
      level2Config.axesSwingTimes
    )
    axes.setMovementPattern()

    const saws = new Saws(
      level2Config.sawPositions.map((sawPos) => sawPos()),
      level2Config.sawRanges
    )
    saws.rotate()

    level2.drawWaves("lava", "wave")

    // Mengatur kamera dan UI
    const camera = new Camera()
    camera.attach(player.gameObj, 0, -200, null, 200)

    UIManager.addDarkBg()
    UIManager.displayLivesCount(player)
    UIManager.displayCoinCount(player)

    player.updateLives(UIManager.livesCountUI)
    player.updateCoinCount(UIManager.coinCountUI)
  },
  // Scene untuk Level 3
  3: () => {
    // Menghentikan semua suara dan memainkan musik latar baru
    bgSoundManager.pauseAllSounds()
    bgSoundManager.addSound("strong-wind", { volume: 0.2, loop: true })
    bgSoundManager.play("strong-wind")
    // Mengatur gravitasi dan menggambar latar belakang
    setGravity(level3Config.gravity)
    const level3 = new Level()
    level3.drawBackground("sky-background-0")
    level3.drawBackground("sky-background-1")
    level3.drawBackground("sky-background-2")
    level3.drawMapLayout(level3Layout, level3Mappings)

    // Menggambar layout dan menambahkan elemen-elemen seperti player, burung, dan awan
    const player = new Player(
      level3Config.playerStartPosX,
      level3Config.playerStartPosY,
      level3Config.playerSpeed,
      level3Config.jumpForce,
      level3Config.nbLives,
      3,
      true
    )
    player.enablePassthrough()
    player.enableCoinPickUp()
    player.enableMobVunerability()

    level3.drawWaves("clouds", "wave")

    const birds = new Birds(
      level3Config.birdPositions.map((birdPos) => birdPos()),
      level3Config.birdRanges,
      level3Config.birdType
    )

    birds.setMovementPattern()

    // Mengatur kamera dan UI
    const camera = new Camera()
    camera.attach(player.gameObj, 0, -200, null, 200)

    UIManager.addDarkBg()
    UIManager.displayLivesCount(player)
    UIManager.displayCoinCount(player)

    player.updateLives(UIManager.livesCountUI)
    player.updateCoinCount(UIManager.coinCountUI)
  },
  gameover: async () => UIManager.displayGameOverScreen(),
  end: () => UIManager.displayEndGameScreen(),
}

for (const key in scenes) {
  scene(key, scenes[key])
}

go("menu")
