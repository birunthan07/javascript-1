document.addEventListener('DOMContentLoaded', function() {
    const contactButton = document.getElementById('contactButton');
    const contactModal = document.getElementById('contactModal');
    const closeButton = document.getElementsByClassName('close')[0];
    const contactForm = document.getElementById('contactForm');
    
    contactButton.onclick = () => contactModal.style.display = 'block';
    closeButton.onclick = () => contactModal.style.display = 'none';
    
    window.onclick = event => {
        if (event.target === contactModal) {
            contactModal.style.display = 'none';
        }
    };

    contactForm.onsubmit = function(event) {
        event.preventDefault();
        if (validateForm()) {
            saveContactData();
            alert('Contact form submitted successfully!');
            contactModal.style.display = 'none';
            contactForm.reset();
        }
    };

    function validateForm() {
        let valid = true;

        valid &= validateField('name', 'Name is required.');
        valid &= validateField('address', 'Address is required.');
        valid &= validateField('phone', 'Phone number must start with +94 and be followed by exactly 9 digits.', /^\+94\d{9}$/);
        valid &= validateField('email', 'Email format is invalid.', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        valid &= validateField('message', 'Message must be at least 10 characters long.', /[\s\S]{10,}/);

        return Boolean(valid);
    }

    function validateField(fieldId, errorMessage, regex = /.+/) {
        const field = document.getElementById(fieldId);
        const errorField = document.getElementById(`${fieldId}Error`);
        if (!regex.test(field.value.trim())) {
            errorField.innerText = errorMessage;
            return false;
        } else {
            errorField.innerText = '';
            return true;
        }
    }

    function saveContactData() {
        const contactData = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
        };
        localStorage.setItem('contactData', JSON.stringify(contactData));
    }
});
