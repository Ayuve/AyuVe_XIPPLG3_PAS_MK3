export const level1Config = {
  gravity: 1400,                   // Gravitasi yang berlaku pada permainan
  playerSpeed: 400,                // Kecepatan pemain
  jumpForce: 650,                  // Gaya loncat pemain
  nbLives: 3,                      // Jumlah nyawa awal pemain
  playerStartPosX: 1500,           // Posisi awal pemain (sumbu x)
  playerStartPosY: 100,            // Posisi awal pemain (sumbu y)
  
  fishPositions: [                 // Posisi awal ikan-ikan pada level
    () => vec2(2595, 600),
    () => vec2(2655, 600),
    () => vec2(4100, 600),
    () => vec2(4220, 800),
    () => vec2(5200, 800),
    () => vec2(5300, 800),
  ],
  fishAmplitudes: [300, 500, 400, 500, 900, 800],  // Amplitudo pergerakan ikan-ikan
  fishType: 1,                      // Tipe ikan
  
  spiderPositions: [               // Posisi awal laba-laba pada level
    () => vec2(2000, 300),
    () => vec2(2020, 0),
    () => vec2(3200, 200),
    () => vec2(3500, 300),
  ],
  spiderAmplitudes: [300, 150, 150, 300],           // Amplitudo pergerakan laba-laba
  spiderSpeeds: [2, 1, 1, 2],                        // Kecepatan pergerakan laba-laba
  spiderType: 1,                                     // Tipe laba-laba
};
