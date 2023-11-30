export class Fish {
  constructor(positions, amplitudes, type) {
    // Konstruktor kelas Fish untuk mengatur perilaku ikan pada permainan.
    this.amplitudes = amplitudes;  // Amplitudo pergerakan ikan ke atas dan ke bawah
    this.fish = [];

    // Membuat instance ikan untuk setiap posisi awal yang diberikan
    for (const position of positions) {
      this.fish.push(
        add([
          sprite(`fish-${type}`, { anim: "swim" }),  // Menambahkan sprite ikan dengan animasi berenang
          area({ shape: new Rect(vec2(0), 12, 12) }),  // Area kollision ikan dengan bentuk persegi
          anchor("center"),  // Menetapkan anchor pada tengah ikan
          pos(position),     // Menentukan posisi awal ikan
          scale(4),          // Menetapkan skala ikan
          rotate(90),        // Mengatur rotasi ikan sejajar sumbu y
          state("launch", ["launch", "rotate", "fall"]),  // Menetapkan state "launch" dengan transisi yang mungkin
          offscreen(),       // Menandakan bahwa ikan di luar layar
          "fish",            // Menetapkan tag "fish" pada ikan
        ])
      );
    }
  }

  // Metode untuk mengatur pola gerakan ikan (meluncur, berputar, jatuh) pada permainan
  setMovementPattern() {
    for (const [index, fish] of this.fish.entries()) {
      const launch = fish.onStateEnter("launch", async () => {
        await tween(
          fish.pos.y,
          fish.pos.y - this.amplitudes[index],
          2,
          (posY) => (fish.pos.y = posY),
          easings.easeOutSine
        );  // Animasi ikan meluncur ke atas dengan bantuan tween
        fish.enterState("rotate", "fall");  // Memasuki state "rotate" dan "fall" setelah meluncur
      });

      const rotate = fish.onStateEnter("rotate", (nextState) => {
        fish.rotateBy(180);  // Mengatur rotasi ikan sebanyak 180 derajat
        fish.enterState(nextState);  // Memasuki state berikutnya setelah rotasi selesai
      });

      const fall = fish.onStateEnter("fall", async () => {
        await tween(
          fish.pos.y,
          fish.pos.y + this.amplitudes[index],
          2,
          (posY) => (fish.pos.y = posY),
          easings.easeOutSine
        );  // Animasi ikan jatuh ke bawah dengan bantuan tween
        fish.enterState("rotate", "launch");  // Memasuki state "rotate" dan "launch" setelah jatuh
      });

      // Membatalkan animasi gerakan ikan jika pemain meninggalkan layar
      onSceneLeave(() => {
        launch.cancel();
        rotate.cancel();
        fall.cancel();
      });
    }
  }
}
