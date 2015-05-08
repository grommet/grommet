module.exports = {
  scroll: function(element) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("scroll", false, true);
    element.dispatchEvent(evt);
  }
}