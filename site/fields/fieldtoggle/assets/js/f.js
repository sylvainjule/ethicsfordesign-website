$(document).ready(function(){

  function fieldtoggle() {


    function toggleoff(f, ft) {
      if (ft.find("label.fieldtoggle").data("keepvisible")) {
        f.addClass("field-is-readonly");
        f.find(".input").addClass("input-is-readonly");
      }
      else {
        f.hide();
      }

    }

    function toggleon(f, ft) {
      if (ft.find("label.fieldtoggle").data("keepvisible")) {
        f.removeClass("field-is-readonly");
        f.find(".input").removeClass("input-is-readonly");
      }
      else {
        f.show();
      }
    }

    requiredfield = 0;

    $($(".fieldtoggle input").get().reverse()).each(function() {
      var fieldtoggle = $(this).closest("div.field");
      var field = $(this).parent();

      if (field.data("hide")) {
        var hide = field.data("hide").split(" ");
      }
      else {
        var hide = [];
      }

      if (field.data("show")) {
        var show = field.data("show").split(" ");
      }
      else {
        var show = [];
      }

      if ($(this).is(":checked")) {
        $.each(hide, function(key, value) {

          var ziel = $(".field-name-" + value).closest(".field");

          if (ziel.find($('abbr[title="Required"]')).length) {
            requiredfield = field.text();
          }

          toggleoff(ziel, fieldtoggle);

        });
        $.each(show, function(key, value) {
          toggleon($(".field-name-" + value).closest(".field"), fieldtoggle);
        });

      }

    });

    if (requiredfield != 0) {
      requiredHidden1 = $(".field span.l10n").data("required-hidden1");
      requiredHidden2 = $(".field span.l10n").data("required-hidden2");
      text = requiredHidden1 + ' "' + requiredfield + '" ' +  requiredHidden2;
      if ($("header.topbar .message-required").length) {
        $("header.topbar .message-required .message-content").html(text);
      }
      else {
        $("header.topbar").append('<div class="message message-is-alert message-required"><span class="message-content">' + text + '</span><a class="message-toggle"><i>×</i></a></div>');
      }
    }
    else {
      $("header.topbar .message-required").remove();
    }

  }

  fieldtoggle();
  
  $(document).ajaxComplete(function() {
    fieldtoggle();
  });

  $("body").on("change", ".fieldtoggle input", function(event) {
    if ($(event.target).is(':checked')) {
      fieldtoggle();
    }
  });

  $("body").on("click", ".message-required .message-toggle", function() {
    $(".message-required").remove();
    return false;
  })

});
