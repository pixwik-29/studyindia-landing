/**
 * STUDY INDIA MBBS - LANDING PAGE INTERACTION & LOGIC
 * Includes: Sticky Nav, Mobile Menu, Auto-Fill selectors, Count-Up Stats,
 * Scroll Animations, and Accessible Form Validations.
 */

document.addEventListener('DOMContentLoaded', () => {

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
      // Small timeout to allow smooth scroll logic to start first
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
  // 3. SMOOTH SCROLL WITH HEADER OFFSET
  // ==========================================================================
  const allScrollLinks = document.querySelectorAll('a[href^="#"]:not(.skip-link)');

  allScrollLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      // Adjust navigation highlight state
      navLinks.forEach(nl => nl.classList.remove('active'));
      if (this.classList.contains('nav-link')) {
        this.classList.add('active');
      }

      // Calculate header offset height dynamically
      const offsetHeight = header.classList.contains('scrolled') ? 70 : 80;
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
  // 4. AUTO-FILL COLLEGE SELECTION
  // ==========================================================================
  const collegeEnquireBtns = document.querySelectorAll('.college-enquire-btn');
  const collegeSelect = document.getElementById('preferred-college');

  // Map college names from data-college to form option values
  const collegeMapping = {
    'SRM Medical College': 'srm',
    'Saveetha Medical College': 'saveetha',
    'Sri Ramachandra Medical College': 'ramachandra',
    'Chettinad Hospital & Research Institute': 'chettinad',
    'Sri Balaji Vidyapeeth': 'balaji',
    'Vels Medical College': 'vels'
  };

  collegeEnquireBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const collegeName = this.getAttribute('data-college');
      const mappedValue = collegeMapping[collegeName];

      if (mappedValue && collegeSelect) {
        collegeSelect.value = mappedValue;
        // Trigger select field styling adjustments if needed
        collegeSelect.dispatchEvent(new Event('change'));
      }

      // Smooth scroll to form section
      const contactSection = document.getElementById('contact');
      const offsetHeight = header.classList.contains('scrolled') ? 70 : 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offsetHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Shift focus to form input for accessibility
      setTimeout(() => {
        const firstInput = document.getElementById('fullname');
        if (firstInput) firstInput.focus();
      }, 800);
    });
  });


  // ==========================================================================
  // 5. INTERACTIVE SCROLL ANIMATIONS (INTERSECTION OBSERVER)
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
  // 6. STATS NUMBER COUNT-UP ANIMATION
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
  // 7. FORM VALIDATION LOGIC (Modern Forms Guideline Compliant)
  // ==========================================================================
  const form = document.getElementById('enquiry-form');
  const submitBtn = document.getElementById('submit-button');
  const formContainer = document.getElementById('form-container');

  // Input fields
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const neetscore = document.getElementById('neetscore');
  const college = document.getElementById('preferred-college');
  const quota = document.getElementById('quota');
  const consent = document.getElementById('consent');
  const honeypot = document.getElementById('website-field');

  // Error spans
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const neetError = document.getElementById('neet-error');
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

  const validateCollege = () => {
    if (!college.value) {
      showError(college, collegeError, 'Please select a preferred college.');
      return false;
    }
    clearError(college, collegeError);
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
    errorElement.textContent = '';
  };

  // Event validation triggers:
  // RULE: Clear errors on 'input' (active typing)
  fullname.addEventListener('input', () => clearError(fullname, nameError));
  email.addEventListener('input', () => clearError(email, emailError));
  phone.addEventListener('input', () => clearError(phone, phoneError));
  neetscore.addEventListener('input', () => clearError(neetscore, neetError));
  college.addEventListener('change', () => clearError(college, collegeError));
  quota.addEventListener('change', () => clearError(quota, quotaError));
  consent.addEventListener('change', () => {
    if (consent.checked) clearError(consent, consentError);
  });

  // RULE: Run check and show error on 'blur' / 'focusout' (exiting the field)
  fullname.addEventListener('blur', validateName);
  email.addEventListener('blur', validateEmail);
  phone.addEventListener('blur', validatePhone);
  neetscore.addEventListener('blur', validateNeetScore);
  college.addEventListener('blur', validateCollege);
  quota.addEventListener('blur', validateQuota);

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Spam Check: Check Honeypot Field
    if (honeypot.value) {
      console.warn('Spam submission detected via honeypot.');
      // Silently discard and simulate success to spammers
      showSuccessState();
      return;
    }

    // Run all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isNeetValid = validateNeetScore();
    const isCollegeValid = validateCollege();
    const isQuotaValid = validateQuota();
    const isConsentValid = validateConsent();

    const isFormValid = isNameValid && isEmailValid && isPhoneValid && isNeetValid && isCollegeValid && isQuotaValid && isConsentValid;

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

  // Success state handler
  const showSuccessState = () => {
    // Create and inject Success Overlay dynamically if not present
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
      
      // Hook up 'Okay' button click to clear form and close overlay
      document.getElementById('success-done-btn').addEventListener('click', () => {
        successOverlay.classList.remove('active');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request Free Counselling Session';
        
        // Return focus to form heading
        formContainer.querySelector('.form-title').focus();
      });
    }

    // Make it active
    successOverlay.classList.add('active');
    successOverlay.setAttribute('role', 'dialog');
    successOverlay.setAttribute('aria-modal', 'true');
    successOverlay.setAttribute('aria-labelledby', 'success-dialog-title');
    
    // Set ID for dialog accessibility
    successOverlay.querySelector('.success-title').id = 'success-dialog-title';
    
    // Focus the 'Okay' button in the success dialog
    setTimeout(() => {
      document.getElementById('success-done-btn').focus();
    }, 100);
  };

  // ==========================================================================
  // 8. HERO SLIDESHOW TIMER (1 SECOND INTERVALS)
  // ==========================================================================
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlideIndex = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlideIndex].classList.remove('active');
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      slides[currentSlideIndex].classList.add('active');
    }, 1000);
  }

});
