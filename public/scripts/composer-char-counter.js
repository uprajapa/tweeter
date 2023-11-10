$(document).ready( function() {
  let count = 0;

  $('#tweet-text').on('keyup', function(event) {
    count = this.value.length;

    const button = $(this).closest('form');
    const counterFound = button.find('.counter');
    count = 140 - count;

    if (count < 0) {
      counterFound.css('color', 'red');
    } else {
      counterFound.css('color', '#545149');
    }
    
    counterFound.val(count);
  });
});