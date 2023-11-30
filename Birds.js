export class Birds {
  constructor(positions, ranges, type) {
     // Konstruktor kelas Birds untuk mengatur perilaku burung pada permainan.
     this.ranges = ranges;  // Rentang gerakan untuk setiap burung
     this.birds = [];

     // Membuat instance burung untuk setiap posisi awal yang diberikan
    for (const position of positions) {
      this.birds.push(
        add([
          sprite(`bird-${type}`, { anim: "fly" }),  // Menambahkan sprite burung dengan animasi terbang
          area({ shape: new Rect(vec2(0), 10, 10) }),  // Area kollision burung dengan bentuk persegi
          anchor("center"),  // Menetapkan anchor pada tengah burung
          pos(position),     // Menentukan posisi awal burung
          scale(4),          // Menetapkan skala burung
          rotate(),          // Membuat burung dapat berputar
          state("fly-left", [
            "fly-left",
            "fly-right",
            "dive-attack-left",
            "dive-attack-right",
          ]), // Menetapkan state "fly-left" dengan transisi yang mungkin
          offscreen(),       // Menandakan bahwa burung di luar layar
          "birds",           // Menetapkan tag "birds" pada burung
        ])
      )
    }
  }

  // Metode untuk mengatur animasi terbang burung
  async fly(bird, moveBy, duration) {
    await tween(
      bird.pos.x,
      bird.pos.x + moveBy,
      duration,
      (posX) => (bird.pos.x = posX),
      easings.linear
    ) // Animasi gerakan horizontal burung dengan bantuan tween
  }

  // Metode untuk mengatur animasi menyelam (dive) burung ke target
  async dive(bird, target, duration) {
    await tween(
      bird.pos,
      target,
      duration,
      (pos) => (bird.pos = pos),
      easings.easeInSine
    ) // Animasi perubahan posisi burung menuju target dengan bantuan tween
  }

  setMovementPattern() {
    // Metode untuk mengatur pola gerakan burung (terbang dan menyelam) pada permainan.
    for (const [index, bird] of this.birds.entries()) {
      const flyLeft = bird.onStateEnter("fly-left", async () => {
        bird.flipX = false // Mengubah orientasi burung agar menghadap ke kiri
        await this.fly(bird, -this.ranges[index], 0.5) // Memanggil metode fly untuk terbang ke kiri
        bird.enterState("dive-attack-left") // Memasuki state "dive-attack-left" setelah terbang ke kiri selesai
      })
      const flyRight = bird.onStateEnter("fly-right", async () => {
        bird.flipX = true // Mengubah orientasi burung agar menghadap ke kanan
        await this.fly(bird, this.ranges[index], 0.5) // Memanggil metode fly untuk terbang ke kanan
        bird.enterState("dive-attack-right") // Memasuki state "dive-attack-right" setelah terbang ke kanan selesai
      })

      const diveAttackLeft = bird.onStateEnter("dive-attack-left", async () => {
        if (!bird.isOffScreen()) play("dive", { volume: 0.05 }) // Memainkan suara efek menyelam jika burung tidak berada di luar layar
        await this.dive(
          bird,
          vec2(
            bird.pos.x - this.ranges[index],
            bird.pos.y + this.ranges[index]
          ),
          0.5
        ) // Memanggil metode dive untuk menyelam ke kiri dan bawah
        await this.dive(
          bird,
          vec2(
            bird.pos.x - this.ranges[index],
            bird.pos.y - this.ranges[index]
          ),
          0.5
        ) // Memanggil metode dive untuk menyelam ke kiri dan atas

        bird.enterState("fly-right") // Memasuki state "fly-right" setelah menyelam ke kiri selesai
      })

      const diveAttackRight = bird.onStateEnter(
        "dive-attack-right",
        async () => {
          if (!bird.isOffScreen()) play("dive", { volume: 0.05 }) // Memainkan suara efek menyelam jika burung tidak berada di luar layar
          await this.dive(
            bird,
            vec2(
              bird.pos.x + this.ranges[index],
              bird.pos.y + this.ranges[index]
            ),
            0.5
          ) // Memanggil metode dive untuk menyelam ke kanan dan bawah
          await this.dive(
            bird,
            vec2(
              bird.pos.x + this.ranges[index],
              bird.pos.y - this.ranges[index]
            ),
            0.5
          ) // Memanggil metode dive untuk menyelam ke kanan dan atas

          bird.enterState("fly-left") // Memasuki state "fly-left" setelah menyelam ke kanan selesai
        }
      )

      // Membatalkan animasi gerakan burung jika pemain meninggalkan layar
      onSceneLeave(() => {
        flyLeft.cancel()
        flyRight.cancel()
        diveAttackLeft.cancel()
        diveAttackRight.cancel()
      })
    }
  }
}
