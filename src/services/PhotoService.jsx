class PhotoService {
  getPhotos() {
    return new Promise((resolve) => {
      import("./tenisData").then((module) => {
        resolve(module.data);
      });
    });
  }
}
export default new PhotoService();
