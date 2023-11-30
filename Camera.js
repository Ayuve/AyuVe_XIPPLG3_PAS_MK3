// Kelas Camera digunakan untuk mengontrol kamera dalam permainan.
export class Camera {
  // Objek yang terhubung ke kamera.
  attachedObj = null;

  // Metode untuk menghubungkan kamera ke objek tertentu dengan offset dan posisi tetap opsional.
  attach(gameObj, offsetX = 0, offsetY = 0, fixedX = null, fixedY = null) {
    // Menyimpan objek yang terhubung.
    this.attachedObj = gameObj;

    // Kasus jika hanya posisi X yang tetap.
    if (fixedX && !fixedY) {
      onUpdate(() => {
        // Menetapkan posisi kamera berdasarkan posisi tetap dan posisi Y objek yang terhubung.
        camPos(fixedX, this.attachedObj.pos.y + offsetY);
      });
      return;
    }

    // Kasus jika hanya posisi Y yang tetap.
    if (!fixedX && fixedY) {
      onUpdate(() => {
        // Menetapkan posisi kamera berdasarkan posisi tetap dan posisi X objek yang terhubung.
        camPos(this.attachedObj.pos.x + offsetX, fixedY);
      });
      return;
    }

    // Kasus jika kedua posisi X dan Y tetap.
    if (fixedX && fixedY) {
      onUpdate(() => {
        // Menetapkan posisi kamera berdasarkan posisi tetap untuk kedua sumbu.
        camPos(fixedX, fixedY);
      });
      return;
    }

    // Kasus default, kamera mengikuti objek dengan offset.
    onUpdate(() => {
      camPos(this.attachedObj.pos.x + offsetX, this.attachedObj.pos.y + offsetY);
    });
  }
}
