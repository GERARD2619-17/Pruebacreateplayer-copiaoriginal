document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.flex-1');
    const toggleBtn = document.getElementById('toggleBtn');

    toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('hidden');
        content.classList.toggle('ml-16');
    });
});
