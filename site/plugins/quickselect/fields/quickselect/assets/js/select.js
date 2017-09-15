(function($) {

  $.fn.quickselect = function() {

    return this.each(function() {

      var field = $(this);

      // avoid multiple inits
      if(field.data('quickselect')) {
        return true;
      } else {
        field.data('quickselect', true);
      }

      if (field.find("select").attr("required") == "required") {
        var clear = false;
      }
      else {
        var clear = true;
      }

      var noresults = field.find("select").attr("data-noresults");
      
      function formatState (opt) {
        
        if (!opt.id) {
          return opt.text;
        }
        
        var optimage = $(opt.element).data('image'); 
        
        if(!field.find("select").hasClass("images") || !optimage){
          var $opt = $(
            '<span>' + opt.text + '</span>'
          );
        }
        else {                    
          var $opt = $(
            '<span class="with-image"><img src="' + optimage + '"/> ' + opt.text + '</span>'
          );
        }
        
        return $opt;
        
      }
      
      var $select2 = field.find("select").select2({
        language: {
          noResults: function (params) {
            return noresults;
          },
        },
        templateResult: formatState,
        templateSelection: formatState,
      });
      
      if (field.find('select.quickselect').hasClass("images")) {
        $select2.data('select2').$container.addClass("select2-container--images");
      }

      if (field.find(".select2-results__options li").first().text() == "") {
        field.find(".select2-results__options li").first().hide();
      }

      if (clear == false || field.find("select").val() == "") {
        field.find("i.x").hide();
      }

      field.find('select.quickselect').on('select2:select', function (evt) {
        if (clear == true) {
          field.find("i.x").show();
        }
      });

      field.find("i.x").on("click", function() {
        field.find("select").val('').change();
        field.find("i.x").hide();
      });
      
    });

  };

})(jQuery);
