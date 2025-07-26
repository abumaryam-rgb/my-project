// ADUSTECH MSSN Registration System JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Form validation function
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        // Email validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            }
        }

        // Phone number validation
        const phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput && phoneInput.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
                phoneInput.classList.add('is-invalid');
                isValid = false;
            }
        }

        return isValid;
    }

    // Registration form submission
    const registrationForms = document.querySelectorAll('.registration-form');
    registrationForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show loading state
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading"></span> Processing...';
                submitBtn.disabled = true;

                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showSuccessMessage('Registration submitted successfully! Redirecting to payment...');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Redirect to payment page after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'payment.html';
                    }, 2000);
                }, 2000);
            } else {
                showErrorMessage('Please fill in all required fields correctly.');
            }
        });
    });

    // Payment form handling
    const paymentForm = document.querySelector('#payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Processing Payment...';
            submitBtn.disabled = true;

            // Simulate payment processing
            setTimeout(() => {
                showSuccessMessage('Payment successful! Generating receipt...');
                
                setTimeout(() => {
                    // Generate and download receipt
                    generateReceipt();
                    showSuccessMessage('Receipt downloaded successfully!');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }, 3000);
        });
    }

    // Show success message
    function showSuccessMessage(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show';
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    // Show error message
    function showErrorMessage(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show';
        alertDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    // Generate receipt function
    function generateReceipt() {
        const receiptData = {
            studentName: localStorage.getItem('studentName') || 'Student Name',
            registrationNumber: localStorage.getItem('registrationNumber') || 'REG123456',
            classType: localStorage.getItem('classType') || 'Islamic Class',
            amount: '₦200',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            receiptNumber: 'RCP' + Date.now()
        };

        // Create receipt content
        const receiptContent = `
            <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; border: 2px solid #1e3a8a; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #1e3a8a; margin: 0;">ADUSTECH MSSN</h2>
                    <p style="color: #666; margin: 5px 0;">Class Registration Receipt</p>
                </div>
                
                <div style="border-top: 1px solid #ddd; padding-top: 15px;">
                    <p><strong>Receipt No:</strong> ${receiptData.receiptNumber}</p>
                    <p><strong>Date:</strong> ${receiptData.date}</p>
                    <p><strong>Time:</strong> ${receiptData.time}</p>
                    <p><strong>Student Name:</strong> ${receiptData.studentName}</p>
                    <p><strong>Registration No:</strong> ${receiptData.registrationNumber}</p>
                    <p><strong>Class:</strong> ${receiptData.classType}</p>
                    <p><strong>Amount:</strong> ${receiptData.amount}</p>
                </div>
                
                <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd;">
                    <p style="color: #059669; font-weight: bold;">Payment Successful!</p>
                    <p style="font-size: 12px; color: #666;">Thank you for registering with ADUSTECH MSSN</p>
                </div>
            </div>
        `;

        // Create and download receipt
        const blob = new Blob([receiptContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt_${receiptData.receiptNumber}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Dynamic form field handling
    const accommodationType = document.querySelector('select[name="accommodation_type"]');
    if (accommodationType) {
        accommodationType.addEventListener('change', function() {
            const hostelFields = document.querySelectorAll('.hostel-fields');
            const offCampusFields = document.querySelectorAll('.off-campus-fields');
            
            if (this.value === 'hostel') {
                hostelFields.forEach(field => field.style.display = 'block');
                offCampusFields.forEach(field => field.style.display = 'none');
            } else if (this.value === 'off_campus') {
                hostelFields.forEach(field => field.style.display = 'none');
                offCampusFields.forEach(field => field.style.display = 'block');
            } else {
                hostelFields.forEach(field => field.style.display = 'none');
                offCampusFields.forEach(field => field.style.display = 'none');
            }
        });
    }

    // Qur'anic class specific functionality
    const categorySelect = document.querySelector('select[name="category"]');
    const hizbSelect = document.querySelector('select[name="hizb"]');
    
    if (categorySelect && hizbSelect) {
        categorySelect.addEventListener('change', function() {
            const hizbOptions = hizbSelect.querySelectorAll('option');
            
            if (this.value === 'reciters') {
                hizbOptions.forEach(option => {
                    if (option.value !== '') {
                        option.style.display = 'block';
                    }
                });
            } else if (this.value === 'tahfeez') {
                hizbOptions.forEach(option => {
                    if (option.value !== '' && option.value !== 'graduation') {
                        option.style.display = 'block';
                    } else {
                        option.style.display = 'none';
                    }
                });
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.class-card, .rule-item, .form-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-primary position-fixed';
    backToTopBtn.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px; display: none;';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Form data persistence
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(input.name);
        if (savedValue) {
            input.value = savedValue;
        }

        // Save data on change
        input.addEventListener('change', function() {
            localStorage.setItem(this.name, this.value);
        });
    });

    console.log('ADUSTECH MSSN Registration System initialized successfully!');
});
