var key = ''
var secret = ''
AWS.config.update({accessKeyId: key, secretAccessKey: secret});
AWS.config.region = 'eu-west-1';
var dynamodb = new AWS.DynamoDB();
  
var save = function(id, tags) {
	dynamodb.putItem({TableName:"newshack-video-tags", Item: {video: {S : id}, tags: {S: JSON.stringify(tags)}}}, function(err, tags) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log("Saved" + tags);           // successful response
	});
}

var load = function(id) {
	return new Promise(
		function(resolve, reject) {
			dynamodb.getItem({TableName:"newshack-video-tags", Key: {video: {S: id}}}, function(err, data) { 
				if (err) {
					console.log(err, err.stack); // an error occurred
					reject(err);
				}
				else return resolve(data);
			});
		}
	).then(function(data) {return JSON.parse(data.Item.tags.S)});
}
