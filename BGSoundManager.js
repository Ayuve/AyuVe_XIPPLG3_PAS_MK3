// Kelas BGSoundManager bertanggung jawab mengelola suara latar belakang (background sounds).
class BGSoundManager {
  // Membuat peta (map) untuk menyimpan suara berdasarkan kunci (key).
  soundMap = {}

  // Metode untuk menambahkan suara ke dalam peta dengan opsi yang diberikan.
  addSound(key, options) {
    // Memainkan suara dan menyimpannya dalam peta.
    this.soundMap[key] = play(key, options)
  }

  // Metode untuk memainkan ulang suara dengan kunci tertentu.
  play(key) {
     // Mengatur posisi seek suara ke awal dan melanjutkan pemutaran.
    this.soundMap[key].seek = 0
    this.soundMap[key].paused = false
  }
  
  // Metode untuk memberhentikan suara dengan kunci tertentu.
  pause(key) {
    // Memberhentikan pemutaran suara dan mengatur posisi seek kembali ke awal.
    this.soundMap[key].paused = true
    this.soundMap[key].seek = 0
  }

    // Metode untuk memberhentikan semua suara.
  pauseAllSounds() {
    // Iterasi melalui peta suara dan memberhentikan setiap suara.
    for (const key in this.soundMap) {
      this.soundMap[key].paused = true
      this.soundMap[key].seek = 0
    }
  }
}

// Instance tunggal (singleton) dari kelas BGSoundManager.
export const bgSoundManager = new BGSoundManager()
