$(document).ready(function () {
  // Charger l'info depuis l'API Numbers
  $.ajax({
    url: "http://numbersapi.com/1/30/date?json",
    method: "GET",
    success: function (data) {
      $("#factArea").text(data.text);
    },
    error: function () {
      $("#factArea").text("Impossible de charger l'information.");
    }
  });

  // Gestion du clic sur la zone pour sélectionner un fichier
 $("#dropArea").on("click", function (e) {
  // Évite le double déclenchement si on clique sur le label ou l'input
  if (e.target.tagName !== "LABEL" && e.target.tagName !== "INPUT") {
    $("#imageInput").click();
  }
});

// Effet visuel au glisser-déposer
$("#dropArea").on("dragover", function (e) {
  e.preventDefault();
  $(this).addClass("bg-light border-success");
});

$("#dropArea").on("dragleave", function () {
  $(this).removeClass("bg-light border-success");
});


  // Afficher l’image sélectionnée
  $("#imageInput").on("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $("#preview").html(`<img src="${e.target.result}" alt="Aperçu" style="max-width: 100%; margin-top: 15px;">`);
      };
      reader.readAsDataURL(file);
    }
  });

  // Envoi de l'image via AJAX
  $("#uploadForm").on("submit", function (e) {
    e.preventDefault();

    const fileInput = $("#imageInput")[0];
    if (!fileInput || fileInput.files.length === 0) {
      alert("Veuillez choisir une image.");
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image", file);

    $.ajax({
  url: "/upload",
  type: "POST",
  data: formData,
  contentType: false,
  processData: false,
  success: function (response) {
    alert("✅ Image envoyée avec succès !");
  },
  error: function (err) {
    alert("❌ Erreur lors de l’envoi de l’image.");
  }
});

  });
});
