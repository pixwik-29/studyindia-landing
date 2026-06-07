/**
 * STUDY INDIA MBBS - LANDING PAGE INTERACTION & LOGIC
 * Includes: Sticky Nav, Mobile Menu, Modal Popup Form, Dynamic State-based College Filter,
 * Count-Up Stats, Scroll Animations, and Accessible Form Validations.
 */

document.addEventListener('DOMContentLoaded', () => {

  // College names grouped by state
  const collegeData = {
    'tamil-nadu': [
      { value: 'srm', label: 'SRM Medical College' },
      { value: 'saveetha', label: 'Saveetha Medical College' },
      { value: 'ramachandra', label: 'Sri Ramachandra Medical College' },
      { value: 'chettinad', label: 'Chettinad Hospital & Research (CARE)' },
      { value: 'balaji', label: 'Mahatma Gandhi Medical College (Sri Balaji Vidyapeeth)' },
      { value: 'vels', label: 'Vels Medical College' },
      { value: 'psg', label: 'PSG Institute of Medical Sciences' },
      { value: 'cmc-vellore', label: 'Christian Medical College (CMC Vellore)' },
      { value: 'other-tn', label: 'Other College in Tamil Nadu' }
    ],
    'andhra-telangana': [
      { value: 'kamineni', label: 'Kamineni Institute of Medical Sciences' },
      { value: 'malla-reddy', label: 'Malla Reddy Institute of Medical Sciences' },
      { value: 'nri-academy', label: 'NRI Academy of Medical Sciences' },
      { value: 'apollo', label: 'Apollo Institute of Medical Sciences' },
      { value: 'mamata', label: 'Mamata Medical College' },
      { value: 'other-ap-tg', label: 'Other College in AP / Telangana' }
    ],
    'karnataka': [
      { value: 'kmc-manipal', label: 'Kasturba Medical College (KMC Manipal)' },
      { value: 'ramaiah', label: 'MS Ramaiah Medical College' },
      { value: 'jss', label: 'JSS Medical College' },
      { value: 'st-johns', label: "St. John's Medical College" },
      { value: 'ks-hegde', label: 'K.S. Hegde Medical Academy' },
      { value: 'other-ka', label: 'Other College in Karnataka' }
    ],
    'maharashtra': [
      { value: 'dy-patil', label: 'DY Patil Medical College (Pune)' },
      { value: 'krishna', label: 'Krishna Institute of Medical Sciences (Karad)' },
      { value: 'bharati-vidyapeeth', label: 'Bharati Vidyapeeth Medical College (Pune)' },
      { value: 'mgm', label: 'MGM Medical College (Navi Mumbai)' },
      { value: 'pravara', label: 'Pravara Institute of Medical Sciences' },
      { value: 'other-mh', label: 'Other College in Maharashtra' }
    ],
    'uttar-pradesh': [
      { value: 'sharda', label: 'Sharda University School of Medical Sciences' },
      { value: 'subharti', label: 'Subharti Medical College' },
      { value: 'eras-lucknow', label: "Era's Lucknow Medical College" },
      { value: 'santosh', label: 'Santosh Medical College' },
      { value: 'rohilkhand', label: 'Rohilkhand Medical College' },
      { value: 'other-up', label: 'Other College in Uttar Pradesh' }
    ],
    'other': [
      { value: 'other-pan-india', label: 'Other Colleges (PAN India)' }
    ]
  };

  // Map college names from data-college to state and college values
  const collegeMapping = {
    'SRM Medical College': { state: 'tamil-nadu', college: 'srm' },
    'Saveetha Medical College': { state: 'tamil-nadu', college: 'saveetha' },
    'Sri Ramachandra Medical College': { state: 'tamil-nadu', college: 'ramachandra' },
    'Chettinad Hospital & Research Institute': { state: 'tamil-nadu', college: 'chettinad' },
    'Sri Balaji Vidyapeeth': { state: 'tamil-nadu', college: 'balaji' },
    'Vels Medical College': { state: 'tamil-nadu', college: 'vels' },
    'Tamilnadu Medical Colleges': { state: 'tamil-nadu', college: 'other-tn' },
    'Andhra & Telengana Medical Colleges': { state: 'andhra-telangana', college: 'other-ap-tg' },
    'Karnataka Medical Colleges': { state: 'karnataka', college: 'other-ka' },
    'Maharastra Medical Colleges': { state: 'maharashtra', college: 'other-mh' },
    'Uttar Pradesh Medical Colleges': { state: 'uttar-pradesh', college: 'other-up' }
  };

  // ==========================================================================
  // 1. STICKY HEADER SCROLL EFFECT
  // ==========================================================================
  const header = document.querySelector('.main-header');
  const scrollThreshold = 50;

  const handleScrollHeader = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader(); // Run on init in case page is refreshed partway down


  // ==========================================================================
  // 2. MOBILE HAMBURGER MENU
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navigation = document.getElementById('navigation');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navigation.classList.toggle('open');
  };

  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  };

  menuToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Small timeout to allow smooth scroll or modal trigger to start first
      setTimeout(closeMenu, 150);
    });
  });

  // Close menu if user clicks outside of nav area
  document.addEventListener('click', (event) => {
    const isClickInside = navigation.contains(event.target) || menuToggle.contains(event.target);
    if (!isClickInside && navigation.classList.contains('open')) {
      closeMenu();
    }
  });


  // ==========================================================================
  // 3. MODAL POPUP FOR ENQUIRY FORM
  // ==========================================================================
  const modal = document.getElementById('enquiry-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const openModal = () => {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Shift focus to modal title for accessibility
      const modalTitle = document.getElementById('modal-title');
      if (modalTitle) {
        modalTitle.setAttribute('tabindex', '-1');
        modalTitle.focus();
      }
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });


  // ==========================================================================
  // 4. SMOOTH SCROLL WITH HEADER OFFSET (EXCEPT FORM CTAs)
  // ==========================================================================
  const allScrollLinks = document.querySelectorAll('a[href^="#"]:not(.skip-link)');

  allScrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      // Intercept form section link and open popup modal instead
      if (targetId === '#contact') {
        openModal();
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // Adjust navigation highlight state
      navLinks.forEach(nl => nl.classList.remove('active'));
      if (this.classList.contains('nav-link')) {
        this.classList.add('active');
      }

      // Calculate header offset height dynamically based on the scrolled state it will have
      const wasScrolled = header.classList.contains('scrolled');
      if (!wasScrolled) header.classList.add('scrolled');
      const offsetHeight = header.offsetHeight;
      if (!wasScrolled) header.classList.remove('scrolled');
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offsetHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Move focus for accessibility
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: true });
    });
  });


  // ==========================================================================
  // 5. COLLEGE SELECTION & POPUP TRIGGERS
  // ==========================================================================
  const collegeEnquireBtns = document.querySelectorAll('.college-enquire-btn, .slide-cta-btn, .open-enquiry-btn');
  const stateSelect = document.getElementById('preferred-state');
  const collegeSelect = document.getElementById('preferred-college');

  const populateColleges = (stateValue, selectedCollegeValue = '') => {
    if (!collegeSelect) return;
    
    collegeSelect.innerHTML = '';
    
    if (!stateValue) {
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.disabled = true;
      defaultOption.selected = true;
      defaultOption.textContent = 'Select State First';
      collegeSelect.appendChild(defaultOption);
      return;
    }
    
    const colleges = collegeData[stateValue] || [];
    
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.disabled = true;
    placeholderOption.selected = !selectedCollegeValue;
    placeholderOption.textContent = 'Select Institution';
    collegeSelect.appendChild(placeholderOption);
    
    colleges.forEach(col => {
      const option = document.createElement('option');
      option.value = col.value;
      option.textContent = col.label;
      if (selectedCollegeValue && col.value === selectedCollegeValue) {
        option.selected = true;
      }
      collegeSelect.appendChild(option);
    });
  };

  // Setup state change listener to dynamically change colleges
  if (stateSelect) {
    stateSelect.addEventListener('change', () => {
      populateColleges(stateSelect.value);
    });
  }

  collegeEnquireBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();

      const collegeName = this.getAttribute('data-college');
      if (collegeName && collegeMapping[collegeName]) {
        const mapped = collegeMapping[collegeName];
        if (stateSelect) {
          stateSelect.value = mapped.state;
          stateSelect.dispatchEvent(new Event('change'));
        }
        if (collegeSelect) {
          populateColleges(mapped.state, mapped.college);
        }
      } else {
        // Reset state/college selects to placeholder if generic button clicked
        if (stateSelect) {
          stateSelect.value = '';
          populateColleges('');
        }
      }

      // Shift focus to form input for accessibility
      setTimeout(() => {
        const firstInput = document.getElementById('fullname');
        if (firstInput) firstInput.focus();
      }, 500);
    });
  });


  // ==========================================================================
  // 6. INTERACTIVE SCROLL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.fade-in, .hero-stats');

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        animationObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters
  });

  animatedElements.forEach(el => animationObserver.observe(el));


  // ==========================================================================
  // 7. STATS NUMBER COUNT-UP ANIMATION
  // ==========================================================================
  const statNumbers = document.querySelectorAll('.stat-card-num');

  const animateStats = (element) => {
    const targetValue = parseInt(element.getAttribute('data-val'), 10);
    let startValue = 0;
    const duration = 1500; // 1.5s total animation duration
    const stepTime = Math.abs(Math.floor(duration / targetValue));
    
    // Fallback limit stepTime if number is small (e.g. 18 years)
    const intervalTime = Math.max(stepTime, 20);
    const increment = Math.max(Math.ceil(targetValue / (duration / intervalTime)), 1);

    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= targetValue) {
        element.textContent = targetValue + (targetValue === 10000 ? '+' : (targetValue === 50 ? '+' : (targetValue === 100 ? '%' : '')));
        clearInterval(timer);
      } else {
        // Add thousands separator for 10000
        if (targetValue === 10000) {
          element.textContent = startValue.toLocaleString('en-IN') + '+';
        } else {
          element.textContent = startValue + (targetValue === 50 ? '+' : (targetValue === 100 ? '%' : ''));
        }
      }
    }, intervalTime);
  };

  const statsSection = document.getElementById('about');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(num => animateStats(num));
          statsObserver.unobserve(statsSection); // Count up once
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }


  // ==========================================================================
  // 8. FORM VALIDATION LOGIC (Modern Forms Guideline Compliant)
  // ==========================================================================
  const form = document.getElementById('enquiry-form');
  const submitBtn = document.getElementById('submit-button');
  const formContainer = document.getElementById('form-container');

  // Input fields
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const neetscore = document.getElementById('neetscore');
  const quota = document.getElementById('quota');
  const consent = document.getElementById('consent');
  const honeypot = document.getElementById('website-field');

  // Error spans
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const neetError = document.getElementById('neet-error');
  const stateError = document.getElementById('state-error');
  const collegeError = document.getElementById('college-error');
  const quotaError = document.getElementById('quota-error');
  const consentError = document.getElementById('consent-error');

  // RegEx patterns
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^[6-9]\d{9}$/; // 10-digit Indian Mobile number starting with 6-9

  // Helper validation functions
  const validateName = () => {
    const val = fullname.value.trim();
    if (!val) {
      showError(fullname, nameError, 'Full name is required.');
      return false;
    }
    if (val.length < 3) {
      showError(fullname, nameError, 'Name must be at least 3 characters.');
      return false;
    }
    clearError(fullname, nameError);
    return true;
  };

  const validateEmail = () => {
    const val = email.value.trim();
    if (!val) {
      showError(email, emailError, 'Email address is required.');
      return false;
    }
    if (!emailPattern.test(val)) {
      showError(email, emailError, 'Please enter a valid email (e.g. name@domain.com).');
      return false;
    }
    clearError(email, emailError);
    return true;
  };

  const validatePhone = () => {
    const val = phone.value.trim();
    if (!val) {
      showError(phone, phoneError, 'Phone number is required.');
      return false;
    }
    if (!phonePattern.test(val)) {
      showError(phone, phoneError, 'Enter a valid 10-digit mobile number (starts with 6-9).');
      return false;
    }
    clearError(phone, phoneError);
    return true;
  };

  const validateNeetScore = () => {
    const val = neetscore.value.trim();
    if (!val) {
      showError(neetscore, neetError, 'Estimated NEET score is required.');
      return false;
    }
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 50 || num > 720) {
      showError(neetscore, neetError, 'Enter score between 50 and 720 marks.');
      return false;
    }
    clearError(neetscore, neetError);
    return true;
  };

  const validateState = () => {
    if (!stateSelect) return true;
    if (!stateSelect.value) {
      showError(stateSelect, stateError, 'Please select a preferred state.');
      return false;
    }
    clearError(stateSelect, stateError);
    return true;
  };

  const validateCollege = () => {
    if (!collegeSelect) return true;
    if (!collegeSelect.value) {
      showError(collegeSelect, collegeError, 'Please select a preferred college.');
      return false;
    }
    clearError(collegeSelect, collegeError);
    return true;
  };

  const validateQuota = () => {
    if (!quota.value) {
      showError(quota, quotaError, 'Please select a preferred quota.');
      return false;
    }
    clearError(quota, quotaError);
    return true;
  };

  const validateConsent = () => {
    if (!consent.checked) {
      showError(consent, consentError, 'You must authorize Study India to contact you.');
      return false;
    }
    clearError(consent, consentError);
    return true;
  };

  // Error management helpers
  const showError = (inputElement, errorElement, message) => {
    inputElement.closest('.form-group').classList.add('invalid');
    inputElement.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
  };

  const clearError = (inputElement, errorElement) => {
    inputElement.closest('.form-group').classList.remove('invalid');
    inputElement.removeAttribute('aria-invalid');
    if (errorElement) errorElement.textContent = '';
  };

  // Event validation triggers:
  // RULE: Clear errors on 'input' (active typing)
  if (fullname) fullname.addEventListener('input', () => clearError(fullname, nameError));
  if (email) email.addEventListener('input', () => clearError(email, emailError));
  if (phone) phone.addEventListener('input', () => clearError(phone, phoneError));
  if (neetscore) neetscore.addEventListener('input', () => clearError(neetscore, neetError));
  if (stateSelect) {
    stateSelect.addEventListener('change', () => clearError(stateSelect, stateError));
    stateSelect.addEventListener('blur', validateState);
  }
  if (collegeSelect) {
    collegeSelect.addEventListener('change', () => clearError(collegeSelect, collegeError));
    collegeSelect.addEventListener('blur', validateCollege);
  }
  if (quota) {
    quota.addEventListener('change', () => clearError(quota, quotaError));
    quota.addEventListener('blur', validateQuota);
  }
  if (consent) {
    consent.addEventListener('change', () => {
      if (consent.checked) clearError(consent, consentError);
    });
  }

  // RULE: Run check and show error on 'blur' / 'focusout' (exiting the field)
  if (fullname) fullname.addEventListener('blur', validateName);
  if (email) email.addEventListener('blur', validateEmail);
  if (phone) phone.addEventListener('blur', validatePhone);
  if (neetscore) neetscore.addEventListener('blur', validateNeetScore);

  // Form submission handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Spam Check: Check Honeypot Field
      if (honeypot.value) {
        console.warn('Spam submission detected via honeypot.');
        showSuccessState();
        return;
      }

      // Run all validations
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isNeetValid = validateNeetScore();
      const isStateValid = validateState();
      const isCollegeValid = validateCollege();
      const isQuotaValid = validateQuota();
      const isConsentValid = validateConsent();

      const isFormValid = isNameValid && isEmailValid && isPhoneValid && isNeetValid && isStateValid && isCollegeValid && isQuotaValid && isConsentValid;

      if (!isFormValid) {
        // Focus the first invalid field for accessibility
        const firstInvalidGroup = formContainer.querySelector('.form-group.invalid');
        if (firstInvalidGroup) {
          const inputToFocus = firstInvalidGroup.querySelector('input, select, textarea');
          if (inputToFocus) inputToFocus.focus();
        }
        return;
      }

      // Submit state: Disable button to prevent double-submits
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing request...';

      // Simulate AJAX Request
      setTimeout(() => {
        showSuccessState();
      }, 1500);
    });
  }

  // Success state handler
  const showSuccessState = () => {
    let successOverlay = formContainer.querySelector('.form-success-overlay');
    if (!successOverlay) {
      successOverlay = document.createElement('div');
      successOverlay.className = 'form-success-overlay';
      successOverlay.innerHTML = `
        <div class="success-icon" aria-hidden="true">✓</div>
        <h4 class="success-title">Submission Successful</h4>
        <p class="success-message">Thank you for contacting Study India MBBS. Our senior medical advisory team will review your scorecard and contact you within the next 2-4 hours.</p>
        <button type="button" id="success-done-btn" class="btn btn-primary">Okay</button>
      `;
      formContainer.appendChild(successOverlay);
      
      // Hook up 'Okay' button click to clear form, close overlay, and close modal
      document.getElementById('success-done-btn').addEventListener('click', () => {
        successOverlay.classList.remove('active');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request Free Counselling Session';
        closeModal();
      });
    }

    // Make it active
    successOverlay.classList.add('active');
    successOverlay.setAttribute('role', 'dialog');
    successOverlay.setAttribute('aria-modal', 'true');
    successOverlay.setAttribute('aria-labelledby', 'success-dialog-title');
    
    successOverlay.querySelector('.success-title').id = 'success-dialog-title';
    
    setTimeout(() => {
      document.getElementById('success-done-btn').focus();
    }, 100);
  };

  // ==========================================================================
  // 9. HERO SLIDESHOW TIMER (4 SECOND INTERVALS)
  // ==========================================================================
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlideIndex = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlideIndex].classList.remove('active');
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      slides[currentSlideIndex].classList.add('active');
    }, 4000);
  }

});
