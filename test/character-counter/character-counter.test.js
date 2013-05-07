describe("CharacterCounter", function(){
  var input = $("input.count-characters:first");
  var charCounter = null;

  before(function(){
    charCounter = new CharacterCounter(input);
  })

  after(function(){
    $(".counter").remove();
    $(".counter-input").remove();
  });

  context("when the related input wasn't informed", function(){
    describe("new", function(){
      it("returns a empty CharacterCounter instance", function(){
        var newCounter = new CharacterCounter();
        expect(newCounter.el).to.be(undefined);
      })
    })
  })

  context("when the related input is informed", function(){
    describe("new", function(){
      it("returns a CharacterCounter instance with attributes", function(){
        expect(charCounter.el).to.not.be(undefined);
      })
    })
  })

  describe("#el", function(){
    it("returns the associated input text element.", function(){
      expect(charCounter.el[0]).to.be(input[0]);
    })
  })

  describe("#max", function(){
    it("returns attribute for maximum of characters length.", function(){
      expect(charCounter.max).to.be(50);
    })
  })

  describe("#remaining", function(){
    it("returns the number of caracters remaining for input", function(){
      charCounter.el.val("aaaaa");
      charCounter.el.trigger("keyup");
      expect(charCounter.remaining()).to.be(45);
    })
  })

  describe("#render", function(){
    it("updates the number of character remaining for input", function(){
      charCounter.el.val("texto para teste"); // 16 chars
      charCounter.render();

      expect(parseInt($(".remaining", charCounter.infoEl).html())).to.be(charCounter.max - 16);
    })
  })

  context("when custom maximum length is informed", function(){
    it("should have a new max limit", function(){
      $("body").append($("<input type='text' class='counter-input count-characters'>"));
      var newCounter = new CharacterCounter($("input.count-characters:first"), {maxlength: 150});
      expect(newCounter.max).to.be(150);
    })
  })

  context("when custom position is informed", function(){
    it("should be placed in the correct position.", function(){
      $("body").append($("<input type='text' class='counter-input count-characters'>"));
      var newCounter = new CharacterCounter($("input.count-characters:first"), {counterPosition: "after"});
      expect(newCounter.el.prev()[0]).to.not.be(newCounter.infoEl[0]);
      expect(newCounter.el.next()[0]).to.be(newCounter.infoEl[0]);
    })
  })
});
