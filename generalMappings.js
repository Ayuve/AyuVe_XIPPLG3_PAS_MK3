export function generateMappings(tileType) { // Fungsi ini menghasilkan pemetaan (mapping) antara tipe ubin dan properti-properti terkait.
  return {
    0: () => [
      sprite(`${tileType}-tileset`, { anim: "tl" }), // Animasi sudut kiri atas
      area(),  // Area kollision
      body({ isStatic: true }), // Tubuh yang statis
      offscreen(),  // Ubin di luar layar
    ],
    1: () => [
      sprite(`${tileType}-tileset`, { anim: "tm" }), // Animasi atas tengah
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    2: () => [
      sprite(`${tileType}-tileset`, { anim: "tr" }), // Animasi sudut kanan atas
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    3: () => [
      sprite(`${tileType}-tileset`, { anim: "ml" }),  // Animasi tengah kiri
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    4: () => [sprite(`${tileType}-tileset`, { anim: "mm" }), offscreen()], // Animasi tengah tengah
    5: () => [
      sprite(`${tileType}-tileset`, { anim: "mr" }), // Animasi tengah kanan
      area(), 
      body({ isStatic: true }),
      offscreen(),
       // Selanjutnya bisa ditambahkan pemetaan untuk tipe ubin lainnya sesuai kebutuhan.
    ],
    6: () => [sprite(`${tileType}-tileset`, { anim: "ml-2" }), offscreen()], // Animasi tambahan ml-2
    7: () => [sprite(`${tileType}-tileset`, { anim: "mm-2" }), offscreen()],  // Animasi tambahan mm-2
    8: () => [sprite(`${tileType}-tileset`, { anim: "mr-2" }), offscreen()], // Animasi tambahan mr-2
    9: () => [ // Animasi ubin dengan tipe 9 hingga e (oneway-tileset)

      sprite(`${tileType}-oneway-tileset`, { anim: "tl" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    a: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tm" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    b: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tr" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    c: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "ml" }),
      offscreen(),
    ],
    d: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "mm" }),
      offscreen(),
    ],
    e: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "mr" }),
      offscreen(),
    ],
    // Animasi ubin dengan tipe o dan @
    o: () => [sprite("bridge"), area(), body({ isStatic: true }), offscreen()],
    "@": () => [sprite("coin"), area(), "coin", offscreen()],
  }
}
