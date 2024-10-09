function Forms() {
  let forms = document.querySelectorAll("[data-form-container]:not(.js-running)");
  forms.forEach((containerForm) => {
    containerForm.classList.add("js-running");
    containerForm.querySelector("form").addEventListener("submit", function(e) {
      e.preventDefault();
      {
        containerForm.dataset.formState = "success";
      }
    });
  });
}
Forms();
document.addEventListener("pjax:complete", Forms);
