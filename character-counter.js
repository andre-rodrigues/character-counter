(function(){
  $.fn.countCharacters = function(options){
    $(this).each(function(index, element){
      if(!$(element).is("input") && !$(element).is("textarea")) return;

      new CharacterCounter(element, options);
    });
  }
})();

// options['counterPosition'] = "after" or "before" (Anything other than "after" will be considered as "before")
// options['maxlength'] = number (Overwrites the html attribute maxlength)
function CharacterCounter(input, options){
  if(typeof input == "undefined") return;
  if(typeof options == "undefined") options = {};

  if(!$(input).hasClass("count-characters")) return;
  $(input).removeClass("count-characters");

  var self    = this;
  this.el     = $(input);
  this.max    = parseInt(options["maxlength"]) || parseInt(this.el.attr("maxlength")) || 500;
  this.el.attr("maxlength", this.max); // Force a value to attribute maxlength if it is blank or for prioritize the given option

  this.infoEl = $("<span class='counter'>").html("Caracteres restantes: <span class='remaining counter_color'>"+ this.max +"</span> de <span class='total'>"+ this.max +"</span>");

  if(options["counterPosition"] && options["counterPosition"].toLowerCase() == "after") {
    this.infoEl.insertAfter(this.el);
  } else {
    this.infoEl.insertBefore(this.el);
  }

  this.remaining  = function() {
    return self.max - self.el.val().length;
  }

  this.render = function() {
    var color = (self.remaining() <= (self.max * 0.1)) ? "red" : "black";
    $(".remaining", self.infoEl).css("color", color);
    $(".remaining", self.infoEl).html(self.remaining());
  }

  this.el.on('keyup', function() {
    self.render();
  });
}
