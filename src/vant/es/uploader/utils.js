export function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}
export function readFile(file, resultType) {
  return new Promise(function (resolve) {
    var reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target.result);
    };

    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file);
    } else if (resultType === 'text') {
      reader.readAsText(file);
    }
  });
}
export function isOversize(files, maxSize) {
  return toArray(files).some(function (file) {
    return file.size > maxSize;
  });
}
var IMAGE_EXT = ['jpeg', 'jpg', 'gif', 'png', 'svg'];
export function isImageUrl(url) {
  return IMAGE_EXT.some(function (ext) {
    return url.indexOf("." + ext) !== -1;
  });
}
export function isImageFile(item) {
  if (item.file && item.file.type) {
    return item.file.type.indexOf('image') === 0;
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  if (item.content) {
    return item.content.indexOf('data:image') === 0;
  }

  return false;
}