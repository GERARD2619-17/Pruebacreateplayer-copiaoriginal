/*para modal formulario*/
// Inicialización de modales
document.addEventListener("DOMContentLoaded", function () {
    const modals = ["playerModal", "playerModalUpda", "playerModalDelet"];
    modals.forEach(modalId => document.getElementById(modalId).style.display = "none");
   
    document.getElementById("miBoton").addEventListener("click", () => document.getElementById("playerModal").style.display = "block");
   
    document.querySelectorAll(".close").forEach(button => button.addEventListener("click", () => {
       // @ts-ignore
       const modalId = button.dataset.modal;
       document.getElementById(modalId).style.display = "none";
    }));
   
    window.onclick = function (event) {
       if (event.target.classList.contains("modal")) {
         // @ts-ignore
         document.querySelectorAll(".modal").forEach(modal => modal.style.display = "none");
       }
    };
   });