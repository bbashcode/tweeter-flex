//Document ready block, this section will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute
// This function block is responsible for character counts
$(document).ready(function() {
  const $textArea = $('textarea#tweet-text');
  $textArea.keyup( function() {
    const characterCount = $(this).val();
    const remainingCharCount = 140 - characterCount.length;

    $(".counter").val(remainingCharCount);
    if (remainingCharCount < 0) {
      $(".counter").css('color', '#ff0000');
    } else {
      $(".counter").css('color', '#535149');
    }
  });
});