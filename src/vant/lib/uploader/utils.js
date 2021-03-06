"use strict";

exports.__esModule = true;
exports.toArray = toArray;
exports.readFile = readFile;
exports.isOversize = isOversize;
exports.isImageUrl = isImageUrl;
exports.isImageFile = isImageFile;

function toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}

function readFile(file, resultType) {
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

function isOversize(files, maxSize) {
  return toArray(files).some(function (file) {
    return file.size > maxSize;
  });
}

var IMAGE_EXT = ['jpeg', 'jpg', 'gif', 'png', 'svg'];

function isImageUrl(url) {
  return IMAGE_EXT.some(function (ext) {
    return url.indexOf("." + ext) !== -1;
  });
}

function isImageFile(item) {
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