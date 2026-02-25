/* ============================================
   Config Loader — Auto-injects COMPANY values
   ============================================
   Uses data-company attributes on HTML elements
   to populate company info from company-config.js.

   Supported attributes:
     data-company="name"        → textContent = COMPANY.name
     data-company="phone"       → textContent = COMPANY.phone
     data-company="phone-link"  → href = tel:... & textContent = COMPANY.phone
     data-company="email"       → textContent = COMPANY.email
     data-company="email-link"  → href = mailto:... & textContent = COMPANY.email
     data-company="address"     → textContent = COMPANY.address
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    if (typeof COMPANY === 'undefined') return;

    document.querySelectorAll('[data-company]').forEach(function (el) {
        var type = el.getAttribute('data-company');

        switch (type) {
            case 'name':
                el.textContent = COMPANY.name;
                break;

            case 'phone':
                el.textContent = COMPANY.phone;
                break;

            case 'phone-link':
                el.href = 'tel:' + COMPANY.phoneRaw;
                el.textContent = COMPANY.phone;
                break;

            case 'phone-href':
                el.href = 'tel:' + COMPANY.phoneRaw;
                break;

            case 'email':
                el.textContent = COMPANY.email;
                break;

            case 'email-link':
                el.href = 'mailto:' + COMPANY.email;
                el.textContent = COMPANY.email;
                break;

            case 'email-href':
                el.href = 'mailto:' + COMPANY.email;
                break;

            case 'address':
                el.textContent = COMPANY.address;
                break;
        }
    });
});
