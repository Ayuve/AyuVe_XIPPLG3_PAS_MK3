export const level2Config = {
  gravity: 1400,                   // Gravitasi yang berlaku pada permainan
  playerSpeed: 400,                // Kecepatan pemain
  jumpForce: 650,                  // Gaya loncat pemain
  nbLives: 3,                      // Jumlah nyawa awal pemain
  playerStartPosX: 1500,           // Posisi awal pemain (sumbu x)
  playerStartPosY: 100,            // Posisi awal pemain (sumbu y)

  flamePositions: [                // Posisi awal api-api pada level
    () => vec2(2595, 600),
    () => vec2(2655, 600),
    () => vec2(2775, 600),
    () => vec2(2875, 600),
    () => vec2(2965, 600),
    () => vec2(4100, 600),
    () => vec2(4220, 550),
    () => vec2(5200, 550),
    () => vec2(5300, 550),
    () => vec2(5700, 550),
    () => vec2(5800, 550),
    () => vec2(5900, 550),
  ],
  flameAmplitudes: [300, 500, 400, 300, 500, 900, 800, 500, 500, 900, 800, 500],  // Amplitudo pergerakan api-api
  flameType: 1,                    // Tipe api

  spiderPositions: [               // Posisi awal laba-laba pada level
    () => vec2(2200, 100),
    () => vec2(1900, 0),
    () => vec2(3200, 200),
    () => vec2(3500, 300),
    () => vec2(4500, 300),
  ],
  spiderAmplitudes: [300, 150, 150, 300, 300],    // Amplitudo pergerakan laba-laba
  spiderSpeeds: [2, 1, 1, 2, 2],                  // Kecepatan pergerakan laba-laba
  spiderType: 2,                                 // Tipe laba-laba

  axesPositions: [                // Posisi awal kapak-kapak pada level
    () => vec2(2100, -50),
    () => vec2(7000, 10),
    () => vec2(7300, 10),
    () => vec2(7600, 10),
  ],
  axesSwingTimes: [1, 2, 3, 2],    // Waktu putaran kapak-kapak
  sawPositions: [                 // Posisi awal gergaji pada level
    () => vec2(8000, 350),
    () => vec2(9000, 350),
  ],
  sawRanges: [300, 500],           // Rentang gerak gergaji
};
