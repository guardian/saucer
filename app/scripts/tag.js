(function () {
  'use strict';
  var $tags = $('#tags');
  var $tag = $('#tag');

  function pad(m) {
    if (m < 10) m = '0' + m;
    return m;
  }

  function addTag(tag) {
    var time = window.video.currentTime();
    var mins = Math.floor(time / 60);
    var secs = Math.floor(time % 60);

    var item = [
      '<li>',
        '<time data-time="' + time + '">' + pad(mins) + ':' + pad(secs) + '</time>',
        '<span>' + tag + '</span>',
        '<i class="glyphicon glyphicon-remove remove"></i>',
      '</li>'].join('');

    $tags.html(item + $tags.html());
  }

  $('#add_tag').submit(function (evt) {
    evt.preventDefault();
    addTag($tag.val());

    $('#custom-tags').append($('<button type="button" class="tag btn btn-primary btn-sm" />').text($tag.val()));
    $tag.val('');
  });

  $('#add_tag').on('click', '.tag', function (evt) {
    addTag(evt.target.textContent);
  });

  $tags.on('click', 'i', function (evt) {
    $(evt.target).parent().remove();
  });

  $tag.on('input', function () {
    window.video.pause();
  });

  $('#save').click(function () {
		var key ='AKIAJ5MNDAZVRU4MRCRQ'
		var secret = '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'
		AWS.config.update({accessKeyId: key, secretAccessKey: secret});
		AWS.config.region = 'eu-west-1';
    var data = $tags.children().map(function () {
      var time = this.querySelector('time').getAttribute('data-time');
      var tag = this.querySelector('span').textContent;
      return '{"time": ' + time + ', "tag": "' + tag + '"}';
    }).get().join(',\n');
		var dynamodb = new AWS.DynamoDB();
		var data = $tags.children().map(function(){ 
      var time = this.querySelector('time').getAttribute('data-time');
      var tag = this.querySelector('span').textContent;
			return { time: time, tag: tag }
		})
		dynamodb.putItem({TableName:"newshack-video-tags", Item: {video: {S :'video-1'}, tags: {S: JSON.stringify(data.toArray())}}}, function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else     console.log(data);           // successful response
		});

    $('#saved').text('[' + data  + ']');
  });
})();
