function showSection(id) { const sections = document.querySelectorAll("main section"); sections.forEach(section => section.classList.remove("active"));

const selected = document.getElementById(id); if (selected) { selected.classList.add("active"); } }

