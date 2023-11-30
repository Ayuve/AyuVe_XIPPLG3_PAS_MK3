export class Player {
  // Properti yang digunakan untuk mengatur status dan perilaku pemain.
  heightDelta = 0 // Perbedaan tinggi aktual pemain terhadap tinggi awal

  isMoving = false // Menandakan apakah pemain sedang bergerak

  isRespawning = false // Menandakan apakah pemain sedang dalam proses respawn

  lives = 5 // Jumlah nyawa pemain

  coins = 0 // Jumlah koin yang dikumpulkan oleh pemain

  hasJumpedOnce = false // Menandakan apakah pemain sudah melompat setidaknya satu kali

  coyoteLapse = 0.1 // Batas waktu untuk lompatan 'coyote time'

 // Konstruktor kelas Player untuk inisialisasi pemain pada posisi dan level tertentu.
  constructor(
    posX,
    posY,
    speed,
    jumpForce,
    nbLives,
    currentLevelScene,
    isInTerminalScene
  ) {
    this.isInTerminalScene = isInTerminalScene;  // Menandakan apakah pemain berada di dalam terminal
    this.currentLevelScene = currentLevelScene;  // Menyimpan referensi ke scene level saat ini
    this.makePlayer(posX, posY);  // Membuat instance pemain dengan posisi awal yang diberikan
    this.speed = speed;  // Menetapkan kecepatan pemain
    this.jumpForce = jumpForce;  // Menetapkan gaya lompatan pemain
    this.lives = nbLives;  // Menetapkan jumlah nyawa awal pemain
    this.previousHeight = this.gameObj.pos.y;  // Menyimpan tinggi pemain sebelumnya untuk mengukur ketinggian perubahan
    this.setPlayerControls();  // Mengatur kontrol pemain
    this.update();  // Memanggil metode update untuk pemain
  }
 // Metode untuk membuat pemain pada posisi awal tertentu.
  makePlayer(x, y) {
    this.initialX = x;  // Menyimpan posisi awal pemain pada sumbu x
    this.initialY = y;  // Menyimpan posisi awal pemain pada sumbu y
    this.gameObj = add([
      sprite("player", { anim: "idle" }),  // Menambahkan sprite pemain dengan animasi "idle"
      area({ shape: new Rect(vec2(0, 3), 8, 8) }),  // Area kollision pemain dengan bentuk persegi
      anchor("center"),  // Menetapkan anchor pada tengah pemain
      pos(x, y),  // Menetapkan posisi awal pemain
      scale(4),  // Menetapkan skala pemain
      body(),  // Menambahkan body ke pemain untuk mengaktifkan fisika
      "player",  // Menetapkan tag "player" pada pemain
    ])
  }
// Metode untuk mengaktifkan fitur passthrough agar pemain dapat melewati platform tertentu saat melompat atau menekan tombol bawah.
  enablePassthrough() {
    this.gameObj.onBeforePhysicsResolve((collision) => {
       // Mencegah pemain berinteraksi dengan platform passthrough saat melompat.
      if (collision.target.is("passthrough") && this.gameObj.isJumping()) {
        collision.preventResolution()
      }
      // Mencegah pemain berinteraksi dengan platform passthrough saat menekan tombol bawah.
      if (collision.target.is("passthrough") && isKeyDown("down")) {
        collision.preventResolution()
      }
    })
  }
   // Metode untuk mengaktifkan fitur pemain mengambil koin dan menghandle perubahan nilai koin dan efek suara.
  enableCoinPickUp() {
    this.gameObj.onCollide("coin", (coin) => {
    this.coins++;  // Menambah jumlah koin saat pemain mengambil koin.
    destroy(coin);  // Menghapus koin setelah diambil oleh pemain.
    play("coin");  // Memainkan efek suara ketika pemain mengambil koin.
    })
  }
  // Metode untuk mengatur kontrol pemain seperti bergerak ke kiri, ke kanan, dan melompat.
  setPlayerControls() {
    // Kontrol bergerak ke kiri
    onKeyDown("left", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = true
      if (!this.isRespawning) this.gameObj.move(-this.speed, 0)
      this.isMoving = true
    })

    onKeyDown("right", () => {
      // Kontrol bergerak ke kanan
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = false
      if (!this.isRespawning) this.gameObj.move(this.speed, 0)
      this.isMoving = true
    })

    onKeyDown("space", () => {
      // Kontrol melompat
      if (this.gameObj.paused) return
      if (this.gameObj.isGrounded() && !this.isRespawning) {
        this.hasJumpedOnce = true
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }

      // Coyote time - memungkinkan pemain melompat setelah terlepas dari tanah dalam periode waktu tertentu.
      if (
        !this.gameObj.isGrounded() &&
        time() - this.timeSinceLastGrounded < this.coyoteLapse &&
        !this.hasJumpedOnce
      ) {
        this.hasJumpedOnce = true
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }
    })
    // Metode untuk menanggapi pelepasan tombol, mengubah animasi pemain menjadi "idle" jika tidak sedang bergerak.
    onKeyRelease(() => {
      if (this.gameObj.paused) return
      if (isKeyReleased("right") || isKeyReleased("left")) {
        this.gameObj.play("idle")
        this.isMoving = false
      }
    })
  }
  // Metode untuk mereset pemain ke posisi awal setelah mati, dengan mengurangi jumlah nyawa dan memberikan jeda sebelum dapat bergerak lagi.
  respawnPlayer() {
    if (this.lives > 0) {
      this.gameObj.pos = vec2(this.initialX, this.initialY)
      this.lives--
      this.isRespawning = true
      setTimeout(() => (this.isRespawning = false), 1000)
      return
    }

    go("gameover")
  }
  // Metode untuk mengaktifkan kerentanan pemain terhadap mob tertentu, memainkan suara ketika pemain terkena, dan memanggil respawnPlayer.
  enableMobVunerability() {
    function hitAndRespawn(context) {
      play("hit", { speed: 1.5 })
      context.respawnPlayer()
    }
    this.gameObj.onCollide("fish", () => hitAndRespawn(this))
    this.gameObj.onCollide("spiders", () => hitAndRespawn(this))
    this.gameObj.onCollide("flames", () => hitAndRespawn(this))
    this.gameObj.onCollide("axes", () => hitAndRespawn(this))
    this.gameObj.onCollide("saws", () => hitAndRespawn(this))
    this.gameObj.onCollide("birds", () => hitAndRespawn(this))
  }
  // Metode untuk memperbarui status pemain, animasi, dan penanganan jika pemain jatuh di luar layar.
  update() {
    onUpdate(() => {
      if (this.gameObj.isGrounded()) {
        this.hasJumpedOnce = false
        this.timeSinceLastGrounded = time()
      }
       // Logika untuk mengubah animasi berdasarkan kondisi pemain.
    // ...

    // Logika untuk menghandle respawn jika pemain jatuh di luar layar.

      this.heightDelta = this.previousHeight - this.gameObj.pos.y
      this.previousHeight = this.gameObj.pos.y

      if (!this.isMoving && this.gameObj.curAnim() !== "idle") {
        this.gameObj.play("idle")
      }

      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta > 0 &&
        this.gameObj.curAnim() !== "jump-up"
      ) {
        this.gameObj.play("jump-up")
      }

      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta < 0 &&
        this.gameObj.curAnim() !== "jump-down"
      ) {
        this.gameObj.play("jump-down")
      }

      if (this.gameObj.pos.y > 1000) {
        play("hit", { speed: 1.5 })
        this.respawnPlayer()
      }
    })
  }
  // Metode untuk memperbarui tampilan jumlah nyawa pemain.
  updateLives(livesCountUI) {
    onUpdate(() => {
      livesCountUI.text = `${this.lives}`
    })
  }
  // Metode untuk memperbarui tampilan jumlah koin pemain dan mengecek kapan pemain telah mengumpulkan semua koin pada suatu level.
  updateCoinCount(coinCountUI) {
    onUpdate(() => {
      coinCountUI.text = `${this.coins} / ${coinCountUI.fullCoinCount}`
      // Pengecekan jika pemain telah mengumpulkan semua koin pada suatu level.
      if (this.coins === coinCountUI.fullCoinCount) {
        go(this.isInTerminalScene ? "end" : this.currentLevelScene + 1)
      }
    })
  }
}
