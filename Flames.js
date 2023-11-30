export class Flames {
  constructor(positions, amplitudes, type) {
    // Konstruktor kelas Flames untuk mengatur perilaku nyala api pada permainan.
    this.amplitudes = amplitudes;  // Amplitudo pergerakan nyala api ke atas dan ke bawah
    this.flames = [];

    // Membuat instance nyala api untuk setiap posisi awal yang diberikan
    for (const position of positions) {
      this.flames.push(
        add([
          sprite(`flame-${type}`, { anim: "burn" }),  // Menambahkan sprite nyala api dengan animasi terbakar
          area({ shape: new Rect(vec2(0), 12, 12) }),  // Area kollision nyala api dengan bentuk persegi
          anchor("center"),  // Menetapkan anchor pada tengah nyala api
          pos(position),     // Menentukan posisi awal nyala api
          scale(4),          // Menetapkan skala nyala api
          rotate(),          // Membuat nyala api dapat berputar
          state("launch", ["launch", "rotate", "fall"]),  // Menetapkan state "launch" dengan transisi yang mungkin
          offscreen(),       // Menandakan bahwa nyala api di luar layar
          "flames",          // Menetapkan tag "flames" pada nyala api
        ])
      );
    }
  }

  // Metode untuk mengatur pola gerakan nyala api (meluncur, berputar, jatuh) pada permainan
  setMovementPattern() {
    for (const [index, flame] of this.flames.entries()) {
      const launch = flame.onStateEnter("launch", async () => {
        if (!flame.isOffScreen()) play("fireball");  // Memainkan suara efek ledakan api jika nyala api tidak berada di luar layar
        await tween(
          flame.pos.y,
          flame.pos.y - this.amplitudes[index],
          2,
          (posY) => (flame.pos.y = posY),
          easings.linear
        );  // Animasi nyala api meluncur ke atas dengan bantuan tween
        flame.enterState("rotate", "fall");  // Memasuki state "rotate" dan "fall" setelah meluncur
      });

      const rotate = flame.onStateEnter("rotate", (nextState) => {
        flame.rotateBy(180);  // Mengatur rotasi nyala api sebanyak 180 derajat
        flame.enterState(nextState);  // Memasuki state berikutnya setelah rotasi selesai
      });

      const fall = flame.onStateEnter("fall", async () => {
        await tween(
          flame.pos.y,
          flame.pos.y + this.amplitudes[index],
          2,
          (posY) => (flame.pos.y = posY),
          easings.linear
        );  // Animasi nyala api jatuh ke bawah dengan bantuan tween
        flame.enterState("rotate", "launch");  // Memasuki state "rotate" dan "launch" setelah jatuh
      });

      // Membatalkan animasi gerakan nyala api jika pemain meninggalkan layar
      onSceneLeave(() => {
        launch.cancel();
        rotate.cancel();
        fall.cancel();
      });
    }
  }
}
