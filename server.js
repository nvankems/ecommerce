var  express = require('express'),
	 app = express(),
	 bodyParser = require('body-parser'),
	 session = require('express-session'),
     sessionConfig = require('./config/sessionConfig.js'),
	 cors = require('cors'),
	 mongojs = require('mongojs'),
	 port = 9002,
	 corsOptions = {
        origin: 'http://localhost:' + port
	 },
	 db = mongojs('ecommerce', ['products']);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session(sessionConfig));

app.get('/api/products', function (req, res) {
	var query = req.query;
	db.products.find(query, function (err, response) {
		if (err) {
			res.status(500).json(err);
		} else {
			 res.json(response)
		}
	})


});

app.post('/api/products', function (req, res) {
	db.products.save(req.body, function (err, response) {
		if (err) {
			return res.status(500).json(err);
		} else {
			return res.json(response)
		}
	})
});

app.get('/api/products/:id', function (req, res) {
	var idObj = { _id: mongojs.ObjectId(req.params.id) };

	db.products.findOne(idObj, function(err, response) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(response)
		}
	})
});

app.put('/api/products/:id', function (req, res) {
	if (!req.params.id) {
		return res.status(400).send('id query needed');
	}
	var queryObj = { _id: mongojs.ObjectId(req.params.id)};
	db.products.update(queryObj, req.body, function (err, resp) {
		if (err) {
			return res.status(500).json(err);
		} else {
			return res.json(resp)
		}
	})
});

app.delete('/api/products/:id', function (req, res) {
	if (!req.params.id) {
		return res.status(400).send('id query needed');
	}
	var queryObj = { _id: mongojs.ObjectId(req.params.id)};
	db.products.remove(queryObj, function (err, resp) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(resp)
		}
	})
});

app.listen(port, function() {
	console.log('Listening on ' + port);
});