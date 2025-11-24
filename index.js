document.addEventListener('DOMContentLoaded', () => {
    const contactLinks = document.querySelectorAll('.contact-list a');

    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = link.querySelector('span').innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied: ${textToCopy}`);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });

    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    document.body.appendChild(toast);

    function showToast(message) {
        toast.textContent = message;
        toast.className = 'show';
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }
});
