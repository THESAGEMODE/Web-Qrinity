document.addEventListener("DOMContentLoaded", () => {
    // Tangkap elemen modal dan tombol
    const addMenuModal = document.getElementById("addMenuModal");
    const btnAddMenu = document.querySelector(".btn-primary-purple-add");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const cancelModalBtn = document.getElementById("cancelModalBtn");

    // Fungsi membuka modal
    if (btnAddMenu) {
        btnAddMenu.addEventListener("click", () => {
            addMenuModal.classList.add("active");
            document.body.style.overflow = "hidden"; // Menghindari background scrolling
        });
    }

    // Fungsi menutup modal
    const closeModal = () => {
        addMenuModal.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);

    // Menutup modal jika user klik area gelap di luarnya
    window.addEventListener("click", (e) => {
        if (e.target === addMenuModal) {
            closeModal();
        }
    });
});