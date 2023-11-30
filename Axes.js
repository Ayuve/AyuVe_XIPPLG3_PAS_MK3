export class Axes {
  constructor(positions, swingTimes) {
    // Konstruktor kelas Axes untuk mengatur perilaku palu (axe) pada permainan.
    this.swingTimes = swingTimes;  // Waktu untuk satu putaran gerakan palu
    this.positions = positions;    // Posisi awal palu pada level
    this.axes = [];

    // Membuat instance palu untuk setiap posisi awal yang diberikan
    for (const position of positions) {
      this.axes.push(
        add([
          sprite("axe"),  // Menambahkan sprite palu
          area({
            shape: new Rect(vec2(0, 40), 30, 10),
            collisionIgnore: ["spiders", "flames"],
          }),  // Area kollision palu dengan pengecualian tabrakan dengan "spiders" dan "flames"
          pos(position),   // Menentukan posisi awal palu
          scale(4),        // Menetapkan skala palu
          anchor(vec2(0, -0.75)),  // Menetapkan titik anchor palu
          state("swing-left", ["swing-left", "swing-right"]),  // Menetapkan state "swing-left" dengan transisi ke "swing-right"
          rotate(),         // Membuat palu dapat berputar
          offscreen(),      // Menandakan bahwa palu di luar layar
          "axes",           // Menetapkan tag "axes" pada palu
        ])
      );
    }
  }

  // Metode untuk menggerakkan palu dengan efek animasi ketika palu dipicu
  async swing(axe, angle, swingTime) {
    if (!axe.isOffScreen()) play("swinging-axe");  // Memainkan suara efek palu berayun

    await tween(
      axe.angle,
      angle,
      swingTime,
      (val) => (axe.angle = val),
      easings.easeInOutSine
    );  // Animasi putaran palu dengan bantuan tween
  }

  // Metode untuk mengatur pola gerakan palu (ke kiri dan ke kanan)
  setMovementPattern() {
    for (const [index, axe] of this.axes.entries()) {
      const swingLeft = axe.onStateEnter("swing-left", async () => {
        // Logika ketika palu bergerak ke kiri
        await this.swing(axe, 90, this.swingTimes[index]);
        axe.enterState("swing-right");  // Memasuki state "swing-right" setelah gerakan ke kiri selesai
      });

      const swingRight = axe.onStateEnter("swing-right", async () => {
        // Logika ketika palu bergerak ke kanan
        await this.swing(axe, -90, this.swingTimes[index]);
        axe.enterState("swing-left");  // Memasuki state "swing-left" setelah gerakan ke kanan selesai
      });

      // Membatalkan animasi palu jika pemain meninggalkan layar
      onSceneLeave(() => {
        swingLeft.cancel();
        swingRight.cancel();
      });
    }
  }
}
