// Kelas untuk mengelola perilaku laba-laba (spiders) dalam permainan.
export class Spiders {
  // Rentang pergerakan laba-laba pada sumbu X dan Y.
  rangeX = 0;
  rangeY = 800;

  // Konstruktor menerima posisi, amplitudo, kecepatan, dan jenis laba-laba.
  constructor(positions, amplitudes, velocities, type) {
    this.amplitudes = amplitudes;
    this.velocities = velocities;
    this.spiders = [];

    // Membuat instance laba-laba untuk setiap posisi yang diberikan.
    for (const position of positions) {
      this.spiders.push(
        add([
          sprite(`spider-${type}`, { anim: "crawl" }),
          pos(position),
          area({
            shape: new Rect(vec2(0, 4.5), 20, 6),
            collisionIgnore: ["spiders"],
          }),
          anchor("center"),
          body(),
          scale(4),
          state("idle", ["idle", "crawl-left", "crawl-right"]),
          offscreen(),
          "spiders",
        ])
      );
    }
  }

  // Metode untuk menjalankan animasi pergerakan laba-laba.
  async crawl(spider, moveBy, duration) {
    // Memastikan laba-laba sedang dalam animasi merangkak.
    if (spider.currAnim !== "crawl") spider.play("crawl");

    // Animasi pergerakan menggunakan tween untuk mencapai efek visual yang diinginkan.
    await tween(
      spider.pos.x,
      spider.pos.x + moveBy,
      duration,
      (posX) => (spider.pos.x = posX),
      easings.easeOutSine
    );
  }

  // Metode untuk mengatur pola pergerakan laba-laba.
  setMovementPattern() {
    for (const [index, spider] of this.spiders.entries()) {
      // Mengatur keadaan idle laba-laba.
      const idle = spider.onStateEnter("idle", async (previousState) => {
        // Memastikan laba-laba dalam animasi idle.
        if (spider.currAnim !== "idle") spider.play("idle");

        // Menunggu selama 1 detik.
        await new Promise((resolve) => {
          setTimeout(() => resolve(), 1000);
        });

        // Berdasarkan keadaan sebelumnya, laba-laba akan melanjutkan ke keadaan yang sesuai.
        if (previousState === "crawl-left") {
          spider.enterState("crawl-right");
        } else {
          spider.jump();
          if (!spider.isOffScreen()) {
            play("spider-attack", { volume: 0.6 });
          }

          spider.enterState("crawl-left");
        }
      });

      // Mengatur pergerakan laba-laba ke kiri.
      const crawlLeft = spider.onStateEnter("crawl-left", async () => {
        spider.flipX = false;

        // Memanggil metode crawl untuk animasi pergerakan.
        await this.crawl(
          spider,
          -this.amplitudes[index],
          this.velocities[index]
        );
        spider.enterState("idle", "crawl-left");
      });

      // Mengatur pergerakan laba-laba ke kanan.
      const crawlRight = spider.onStateEnter("crawl-right", async () => {
        spider.flipX = true;

        // Memanggil metode crawl untuk animasi pergerakan.
        await this.crawl(spider, this.amplitudes[index], this.velocities[index]);
        spider.enterState("idle", "crawl-right");
      });

      // Mematikan animasi saat berpindah scene.
      onSceneLeave(() => {
        idle.cancel();
        crawlLeft.cancel();
        crawlRight.cancel();
      });
    }
  }

  // Metode untuk mengaktifkan kemampuan melewati platform (passthrough).
  enablePassthrough() {
    for (const spider of this.spiders) {
      // Menangani peristiwa sebelum resolusi fisika untuk melewati platform.
      spider.onBeforePhysicsResolve((collision) => {
        if (collision.target.is("passthrough") && spider.isJumping()) {
          collision.preventResolution();
        }
      });
    }
  }
}
