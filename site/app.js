(function () {
  'use strict';

  // ─── Config ────────────────────────────────────────────────────────────────

  const API_URL = 'https://ry8f7fo7d5.execute-api.us-east-1.amazonaws.com/prod/';
  const CDN_BASE = 'https://d4cc9faf2xny6.cloudfront.net';

  const LEO_PHOTOS = [
    'IMG_1066.jpeg', 'IMG_1255.jpeg', 'IMG_1260.jpeg', 'IMG_1547.jpeg',
    'IMG_2463.jpeg', 'IMG_2469.jpeg', 'IMG_2974.jpeg', 'IMG_3402.jpeg',
    'IMG_3454.JPG',  'IMG_3556.jpeg', 'IMG_3768.jpeg', 'IMG_3794.jpeg',
    'IMG_3818.jpeg', 'IMG_4356.jpeg', 'IMG_4425.jpeg', 'IMG_4600.jpeg',
    'IMG_4639.jpeg', 'IMG_4723.jpeg', 'IMG_4724.jpeg', 'IMG_4761.jpeg',
    'IMG_4764.jpeg', 'IMG_5236.jpeg', 'IMG_5595.jpeg', 'IMG_6677.jpeg'
  ];

  // ─── Personality Toggle ────────────────────────────────────────────────────

  const modeToggle = document.getElementById('mode-toggle');
  const htmlEl = document.documentElement;

  function setMode(mode) {
    htmlEl.setAttribute('data-mode', mode);
    localStorage.setItem('leo-mode', mode);
    modeToggle.checked = (mode === 'unhinged');
  }

  modeToggle.addEventListener('change', function () {
    setMode(this.checked ? 'unhinged' : 'professional');
  });

  // Restore saved mode on load (default: 'professional')
  const savedMode = localStorage.getItem('leo-mode') || 'professional';
  setMode(savedMode);

  // ─── Gallery ───────────────────────────────────────────────────────────────

  function getPhotoUrl(filename) {
    return CDN_BASE ? CDN_BASE + '/leo/' + filename : 'leo/' + filename;
  }

  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = '';

    LEO_PHOTOS.forEach(function (filename) {
      const item = document.createElement('div');
      item.className = 'gallery-item';

      const img = document.createElement('img');
      img.src = getPhotoUrl(filename);
      img.alt = 'Leo the French Bulldog';
      img.loading = 'lazy';

      item.appendChild(img);
      grid.appendChild(item);
    });
  }

  renderGallery();

  // ─── Lightbox ──────────────────────────────────────────────────────────────

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  // Close button
  lightboxCloseBtn.addEventListener('click', closeLightbox);

  // Click on overlay background (not the inner content)
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('active')) {
        closeLightbox();
      }
      if (uploadModal.classList.contains('active')) {
        closeModal();
      }
    }
  });

  // Gallery click delegation
  document.getElementById('gallery-grid').addEventListener('click', function (e) {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const img = item.querySelector('img');
    if (img) {
      openLightbox(img.src, img.alt);
    }
  });

  // ─── Pet Wall ──────────────────────────────────────────────────────────────

  function renderPetWall(pets) {
    const grid = document.getElementById('pet-wall-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (!pets || pets.length === 0) {
      const msg = document.createElement('p');
      msg.className = 'pet-wall-empty';
      msg.textContent = 'No pets yet. Be the first!';
      grid.appendChild(msg);
      return;
    }

    pets.forEach(function (pet) {
      const card = document.createElement('div');
      card.className = 'pet-card';

      const img = document.createElement('img');
      const photoUrl = CDN_BASE ? CDN_BASE + '/' + pet.photoKey : pet.photoKey;
      img.src = photoUrl;
      img.alt = pet.name || 'Community pet';
      img.loading = 'lazy';

      const nameOverlay = document.createElement('div');
      nameOverlay.className = 'pet-card-name';
      nameOverlay.textContent = pet.name || '';

      card.appendChild(img);
      card.appendChild(nameOverlay);
      grid.appendChild(card);
    });
  }

  function loadPetWall() {
    const manifestUrl = CDN_BASE
      ? CDN_BASE + '/community/manifest.json'
      : 'community/manifest.json';

    fetch(manifestUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('manifest not found');
        return res.json();
      })
      .then(function (data) {
        renderPetWall(Array.isArray(data) ? data : []);
      })
      .catch(function () {
        renderPetWall([]);
      });
  }

  loadPetWall();

  // Pet wall click delegation
  document.getElementById('pet-wall-grid').addEventListener('click', function (e) {
    const card = e.target.closest('.pet-card');
    if (!card) return;
    const img = card.querySelector('img');
    const nameEl = card.querySelector('.pet-card-name');
    if (img) {
      openLightbox(img.src, nameEl ? nameEl.textContent : '');
    }
  });

  // ─── Upload Modal ──────────────────────────────────────────────────────────

  const uploadModal = document.getElementById('upload-modal');
  const addPetBtn = document.getElementById('add-pet-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openModal() {
    uploadModal.classList.add('active');
    uploadModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    uploadModal.classList.remove('active');
    uploadModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  addPetBtn.addEventListener('click', openModal);
  modalCloseBtn.addEventListener('click', closeModal);

  // Click on overlay background
  uploadModal.addEventListener('click', function (e) {
    if (e.target === uploadModal) {
      closeModal();
    }
  });

  // ─── Photo Preview in Modal ────────────────────────────────────────────────

  const petFileInput = document.getElementById('pet-file-input');
  const previewContainer = document.getElementById('preview-container');

  petFileInput.addEventListener('change', function () {
    const file = this.files && this.files[0];
    if (!file) {
      previewContainer.innerHTML = '';
      previewContainer.style.display = 'none';
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      let img = previewContainer.querySelector('img#preview-img');
      if (!img) {
        img = document.createElement('img');
        img.id = 'preview-img';
        img.alt = 'Preview of selected photo';
        previewContainer.innerHTML = '';
        previewContainer.appendChild(img);
      }
      img.src = e.target.result;
      previewContainer.style.display = '';
    };
    reader.readAsDataURL(file);
  });

  // ─── Image Resize ──────────────────────────────────────────────────────────

  function resizeImage(file, maxWidth) {
    return new Promise(function (resolve) {
      var img = new Image();
      var canvas = document.createElement('canvas');
      img.onload = function () {
        var scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(function (blob) { resolve(blob); }, file.type, 0.85);
      };
      img.src = URL.createObjectURL(file);
    });
  }

  // ─── Upload Form ──────────────────────────────────────────────────────────

  var uploadForm = document.getElementById('upload-form');
  var uploadStatus = document.getElementById('upload-status');
  var submitBtn = document.getElementById('upload-submit-btn');

  uploadForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var petName = document.getElementById('pet-name-input').value.trim();
    var file = petFileInput.files[0];

    if (!petName || !file) return;
    if (file.size > 5 * 1024 * 1024) {
      uploadStatus.textContent = 'Photo must be under 5MB.';
      return;
    }

    submitBtn.disabled = true;
    uploadStatus.textContent = 'Uploading...';

    resizeImage(file, 1200).then(function (resizedBlob) {
      return fetch(API_URL + 'upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: petName, contentType: file.type }),
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.error) throw new Error(data.error);
          return fetch(data.uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': file.type },
            body: resizedBlob,
          }).then(function () { return data; });
        });
    }).then(function () {
      uploadStatus.textContent = 'Done!';
      uploadForm.reset();
      previewContainer.innerHTML = '';
      previewContainer.style.display = 'none';
      setTimeout(function () {
        closeModal();
        uploadStatus.textContent = '';
        submitBtn.disabled = false;
        loadPetWall();
      }, 1000);
    }).catch(function (err) {
      uploadStatus.textContent = 'Upload failed: ' + err.message;
      submitBtn.disabled = false;
    });
  });

}());
