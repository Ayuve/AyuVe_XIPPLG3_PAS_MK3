// Kelas untuk mengelola perilaku gergaji (saws) pada permainan.
export class Saws {
  // Konstruktor menerima posisi dan rentang gergaji.
  constructor(positions, ranges) {
    this.positions = positions;
    this.ranges = ranges;
    this.saws = [];

    // Membuat instance gergaji untuk setiap posisi yang diberikan.
    for (const position of this.positions) {
      this.saws.push(
        add([
          sprite("saw"),
          area(),
          anchor("center"),
          pos(position),
          scale(4),
          rotate(),
          state("rotate-left", ["rotate-left", "rotate-right"]),
          offscreen(),
          "saws",
        ])
      );
    }
  }

  // Metode untuk mengatur rotasi gergaji.
  rotate() {
    for (const [index, saw] of this.saws.entries()) {
      // Mengatur rotasi ke kiri.
      const rotateLeft = saw.onStateEnter("rotate-left", async () => {
        if (!saw.isOffScreen()) play("saw", { volume: 0.6, seek: 10 });

        // Menggunakan Promise.all untuk menjalankan animasi rotasi dan pergerakan bersamaan.
        await Promise.all([
          tween(
            saw.pos.x,
            saw.pos.x - this.ranges[index],
            1,
            (posX) => (saw.pos.x = posX),
            easings.linear
          ),
          tween(
            saw.angle,
            360,
            2,
            (currAngle) => (saw.angle = currAngle),
            easings.linear
          ),
        ]);

        // Mengatur ulang sudut rotasi dan memasuki keadaan "rotate-right".
        saw.angle = 0;
        saw.enterState("rotate-right");
      });

      // Mengatur rotasi ke kanan.
      const rotateRight = saw.onStateEnter("rotate-right", async () => {
        if (!saw.isOffScreen()) play("saw", { volume: 0.8, seek: 10 });

        // Menggunakan Promise.all untuk menjalankan animasi rotasi dan pergerakan bersamaan.
        await Promise.all([
          tween(
            saw.pos.x,
            saw.pos.x + this.ranges[index],
            1,
            (posX) => (saw.pos.x = posX),
            easings.linear
          ),
          tween(
            saw.angle,
            360,
            2,
            (currAngle) => (saw.angle = currAngle),
            easings.linear
          ),
        ]);

        // Mengatur ulang sudut rotasi dan memasuki keadaan "rotate-left".
        saw.angle = 0;
        saw.enterState("rotate-left");
      });

      // Mematikan animasi saat berpindah scene.
      onSceneLeave(() => {
        rotateRight.cancel();
        rotateLeft.cancel();
      });
    }
  }
}
