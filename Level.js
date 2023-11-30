// Kelas Level digunakan untuk menggambar elemen-elemen level dalam permainan.
export class Level {
  // Metode untuk menggambar gelombang-gelombang pada latar belakang.
  drawWaves(type, anim) {
    let offset = -100;

    // Menggambar gelombang-gelombang dengan sprite dan animasi yang ditentukan.
    for (let i = 0; i < 21; i++) {
      add([sprite(type, { anim }), pos(offset, 600), scale(4), fixed()]);
      offset += 64;
    }
  }

  // Metode untuk menggambar tata letak peta dengan menggunakan layer dan mapping yang diberikan.
  drawMapLayout(levelLayout, mappings) {
    const layerSettings = {
      tileWidth: 16,
      tileHeight: 12,
      tiles: mappings,
    };

    this.map = [];

    // Menggambar peta untuk setiap layer dengan pengaturan yang diberikan.
    for (const layerLayout of levelLayout) {
      this.map.push(addLevel(layerLayout, layerSettings));
    }

    // Mengatur skala untuk setiap layer peta.
    for (const layer of this.map) {
      layer.use(scale(4));
    }
  }

  // Metode untuk menggambar latar belakang dengan sprite yang ditentukan.
  drawBackground(bgSpriteName) {
    add([sprite(bgSpriteName), fixed(), scale(4)]);
  }
}
