(function () {
  'use strict';

  // ─── Config ────────────────────────────────────────────────────────────────

  const API_URL = 'https://ry8f7fo7d5.execute-api.us-east-1.amazonaws.com/prod/';
  const CDN_BASE = 'https://d4cc9faf2xny6.cloudfront.net';

  var LEO_PHOTOS = [
    { file: 'IMG_1066.jpeg',
      pro: 'Birthday Portrait — A distinguished celebration',
      chaos: 'It\'s MY birthday and I\'ll judge you if I want to',
      turbo: 'THE BIRTHDAY BOY DEMANDS TRIBUTE. WHERE IS THE CAKE. WHY IS THERE A BALLOON AND NOT A STEAK.' },
    { file: 'IMG_1255.jpeg',
      pro: 'Cozy Couture — Wrapped in luxury',
      chaos: 'Blanket burrito mode: ACTIVATED',
      turbo: 'I AM THE BURRITO. THE BURRITO IS ME. WE ARE ONE. DO NOT UNWRAP ME OR FACE THE CONSEQUENCES.' },
    { file: 'IMG_1260.jpeg',
      pro: 'Soft Focus — An intimate portrait',
      chaos: 'Those eyes have seen things. Mostly treats.',
      turbo: 'STARING INTO YOUR SOUL AND FINDING IT LACKING... IN TREATS. GIVE TREATS NOW.' },
    { file: 'IMG_1547.jpeg',
      pro: 'The Commute — Traveling in style',
      chaos: 'Asleep in the car like a grumpy old man',
      turbo: 'DO NOT SPEAK TO ME. I AM RECHARGING MY CHAOS BATTERIES. ETA: UNKNOWN. SNORING: MAXIMUM.' },
    { file: 'IMG_2463.jpeg',
      pro: 'Snack Time — Savoring the finer things',
      chaos: 'CHOMP. This is MY chew and I will END you.',
      turbo: 'CONSUMING THE EVIDENCE. YOU SAW NOTHING. THIS CHEW HAD A FAMILY AND I DO NOT CARE.' },
    { file: 'IMG_2469.jpeg',
      pro: 'Golden Hour — A majestic beach portrait',
      chaos: 'Main character energy at the beach',
      turbo: 'I AM THE GUARDIAN OF THIS BEACH. THE SAND BELONGS TO ME. THE SUNSET WAS COMMISSIONED IN MY HONOR.' },
    { file: 'IMG_2974.jpeg',
      pro: 'Floral Elegance — A touch of pink',
      chaos: 'Yes I\'m wearing a flower hat. No I will not discuss it.',
      turbo: 'THE FLOWER CROWN CHOSE ME. I DID NOT CHOOSE THIS LIFE. BUT I WILL ROCK IT HARDER THAN ANYONE HAS EVER ROCKED ANYTHING.' },
    { file: 'IMG_3402.jpeg',
      pro: 'Pure Joy — A natural smile in the park',
      chaos: 'CHEESE!! Wait no— TREATS!!',
      turbo: 'MAXIMUM HAPPINESS ACHIEVED. SEROTONIN LEVELS: OFF THE CHARTS. TONGUE STATUS: FULLY DEPLOYED.' },
    { file: 'IMG_3454.JPG',
      pro: 'Low Angle — A commanding perspective',
      chaos: 'When you drop your phone and the front camera is on',
      turbo: 'YOU DARE PHOTOGRAPH ME FROM BELOW?? I AM NOT YOUR CEILING FAN. I AM YOUR OVERLORD. BOW.' },
    { file: 'IMG_3556.jpeg',
      pro: 'Contemplation — A thoughtful repose',
      chaos: 'Plotting world domination, one nap at a time',
      turbo: 'THE PLAN IS SIMPLE: STEP 1 — STARE. STEP 2 — KEEP STARING. STEP 3 — THEY GIVE YOU WHATEVER YOU WANT. IT WORKS EVERY TIME.' },
    { file: 'IMG_3768.jpeg',
      pro: 'Holiday Spirit — Festive and refined',
      chaos: 'Wearing a scarf because I\'m FANCY',
      turbo: 'THIS SCARF COST MORE THAN YOUR RENT. JUST KIDDING IT\'S FROM TARGET. BUT I MAKE IT LOOK GUCCI.' },
    { file: 'IMG_3794.jpeg',
      pro: 'At Rest — Nestled in comfort',
      chaos: 'This is MY bed and you can\'t have it',
      turbo: 'THE THRONE. THE PLUSH THRONE OF INFINITE COZINESS. PEASANTS SLEEP ON MATTRESSES. I SLEEP ON CLOUDS OF MY OWN SUPERIORITY.' },
    { file: 'IMG_3818.jpeg',
      pro: 'Autumn Collection — Sherpa-lined sophistication',
      chaos: 'Jacket game: STRONG. Attitude game: STRONGER.',
      turbo: 'DRIP CHECK. SHERPA LINED. EYES THAT SAY "I KNOW I LOOK GOOD AND THERE\'S NOTHING YOU CAN DO ABOUT IT."' },
    { file: 'IMG_4356.jpeg',
      pro: 'Sun-Kissed — Basking in natural light',
      chaos: 'Squinting at the sun like it personally offended me',
      turbo: 'THE SUN EXISTS BECAUSE I ALLOW IT. I SQUINT NOT BECAUSE IT\'S BRIGHT BUT BECAUSE I\'M JUDGING IT.' },
    { file: 'IMG_4425.jpeg',
      pro: 'Backyard Portrait — A candid moment of joy',
      chaos: 'HIIII!! HI!! Are those TREATS?! HI!!',
      turbo: 'APPROACHING AT MAXIMUM SPEED. TAIL FREQUENCY: 9000 RPM. INCOMING FACE LICK IN 3... 2...' },
    { file: 'IMG_4600.jpeg',
      pro: 'The Thinker — A moment of quiet reflection',
      chaos: 'Side-eye level: EXPERT',
      turbo: 'I SEE WHAT YOU DID. I SEE EVERYTHING. NOTHING ESCAPES THESE EYES. I WILL REMEMBER THIS AT 3 AM.' },
    { file: 'IMG_4639.jpeg',
      pro: 'Garden Gentleman — An afternoon in the yard',
      chaos: 'That ball is mine. Everything is mine.',
      turbo: 'THE RED BALL FEARS ME. AS IT SHOULD. I HAVE DESTROYED 47 TOYS THIS YEAR AND I WILL NOT STOP UNTIL THE TOY INDUSTRY TREMBLES.' },
    { file: 'IMG_4723.jpeg',
      pro: 'Sidewalk Portrait — Urban charm',
      chaos: 'Underbite and PROUD of it',
      turbo: 'TEEFIES: OUT. UNDERBITE: LEGENDARY. PHOTOGRAPHER: BLESSED TO WITNESS THIS. YOU\'RE WELCOME.' },
    { file: 'IMG_4724.jpeg',
      pro: 'The Smile — Radiant and warm',
      chaos: 'When someone says "walk" and means it',
      turbo: 'THIS IS WHAT PURE UNBRIDLED JOY LOOKS LIKE. SCIENTISTS HAVE STUDIED THIS FACE. THEY WEPT.' },
    { file: 'IMG_4761.jpeg',
      pro: 'Garden Stroll — Exploring the grounds',
      chaos: 'Ears UP, attitude ON, let\'s GO',
      turbo: 'PATROL IN PROGRESS. PERIMETER: SECURE. SQUIRRELS: DETECTED. ENGAGING PURSUIT MODE IN T-MINUS NOW.' },
    { file: 'IMG_4764.jpeg',
      pro: 'Upward Gaze — Nobility personified',
      chaos: 'Looking at you like you owe me treats',
      turbo: 'LOOKING UP AT GOD AND ASKING WHY THE TREAT BAG IS EMPTY. ANSWERS: NONE. DISAPPOINTMENT: INFINITE.' },
    { file: 'IMG_5236.jpeg',
      pro: 'City Walk — A dapper outing in blue',
      chaos: 'Blue harness, blue steel, BLUE EVERYTHING',
      turbo: 'HARNESS: EQUIPPED. LOCATION: PUBLIC. MISSION: RECEIVE COMPLIMENTS FROM EVERY HUMAN IN A 50-FOOT RADIUS. STATUS: SUCCEEDING.' },
    { file: 'IMG_5595.jpeg',
      pro: 'In the Tall Grass — A pastoral portrait',
      chaos: 'Grass level: 100. Stealth mode: ON.',
      turbo: 'I AM THE GRASS. THE GRASS IS ME. YOU CANNOT FIND ME. EXCEPT YOU CAN BECAUSE I\'M SNORING.' },
    { file: 'IMG_6677.jpeg',
      pro: 'Garden Portrait — A natural beauty',
      chaos: 'Tongue out, vibes immaculate',
      turbo: 'TONGUE: FULLY EXTENDED. VIBES: TRANSCENDENT. THIS PHOTO CURES SADNESS. SCIENCE SAID SO. PROBABLY.' },
  ];

  // ─── Personality Mode ──────────────────────────────────────────────────────

  const htmlEl = document.documentElement;
  const modeBtns = document.querySelectorAll('.mode-btn');
  var confettiInterval = null;

  function setMode(mode) {
    htmlEl.setAttribute('data-mode', mode);
    localStorage.setItem('leo-mode', mode);
    modeBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    // Turbo confetti
    if (mode === 'turbo') {
      startConfetti();
    } else {
      stopConfetti();
    }
  }

  modeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setMode(this.dataset.mode);
    });
  });

  // ─── Turbo Confetti ───────────────────────────────────────────────────────

  function createConfettiPiece() {
    var piece = document.createElement('div');
    piece.style.cssText = 'position:fixed;z-index:9999;pointer-events:none;font-size:' +
      (12 + Math.random() * 20) + 'px;left:' + (Math.random() * 100) + 'vw;top:-30px;' +
      'animation:turbo-fall ' + (2 + Math.random() * 3) + 's linear forwards;';
    var emojis = ['🐾', '🦴', '💀', '🔥', '⚡', '💥', '🌈', '✨', '🐶', '👑', '💎', '🚀'];
    piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(piece);
    setTimeout(function () { piece.remove(); }, 5000);
  }

  function startConfetti() {
    if (confettiInterval) return;
    // Inject the fall animation if not already present
    if (!document.getElementById('turbo-confetti-style')) {
      var style = document.createElement('style');
      style.id = 'turbo-confetti-style';
      style.textContent = '@keyframes turbo-fall{0%{top:-30px;opacity:1;transform:rotate(0deg)}100%{top:110vh;opacity:0;transform:rotate(720deg)}}';
      document.head.appendChild(style);
    }
    confettiInterval = setInterval(createConfettiPiece, 200);
  }

  function stopConfetti() {
    if (confettiInterval) {
      clearInterval(confettiInterval);
      confettiInterval = null;
    }
  }

  // Restore saved mode on load (default: 'professional')
  var savedMode = localStorage.getItem('leo-mode') || 'professional';
  setMode(savedMode);

  // ─── Gallery ───────────────────────────────────────────────────────────────

  function getPhotoUrl(filename) {
    return CDN_BASE ? CDN_BASE + '/leo/' + filename : 'leo/' + filename;
  }

  function getCaption(photo) {
    var mode = htmlEl.getAttribute('data-mode');
    if (mode === 'turbo') return photo.turbo;
    if (mode === 'unhinged') return photo.chaos;
    return photo.pro;
  }

  function renderGallery() {
    var grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = '';

    LEO_PHOTOS.forEach(function (photo, index) {
      var item = document.createElement('div');
      item.className = 'gallery-item';
      item.dataset.photoIndex = index;

      var img = document.createElement('img');
      img.src = getPhotoUrl(photo.file);
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
    var item = e.target.closest('.gallery-item');
    if (!item) return;
    var img = item.querySelector('img');
    var index = parseInt(item.dataset.photoIndex, 10);
    if (img && !isNaN(index)) {
      openLightbox(img.src, getCaption(LEO_PHOTOS[index]));
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
