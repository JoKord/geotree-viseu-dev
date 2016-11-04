'use strict'

const express = require('express');
const assert = require('assert');
const supertest = require('supertest');
var request = supertest.agent("http://localhost:3000");

// Testing the Routes
describe('Routes', function(){
	describe('Points Routes', function(){
		// describe('GET /api/points/', function(){
		// 	it('Should return status 200', function(done){
		// 		request.get("/api/points").expect(200, done);
		// 	});	
		// 	it('Should return JSON response', function(done){
		// 		request.get("/api/points/")
		// 		.set('Accept', 'application/json')
		// 		.expect('Content-Type', /json/)
		// 		.expect(200, done);
		// 	});
		// 	it('Should return more than 1 result', function(done){
		// 		request.get("/api/points/")
		// 		.set('Accept', 'application/json')
		// 		.expect(200)
		// 		.end((err, res) =>{
		// 			if(err) return done(err);
		// 			assert.equal(true, Array.isArray(res.body));
		// 			assert.equal(true, res.body.length > 1);
		// 			done();
		// 		});
		// 	});
		// 	it('Should be GeoJSON');
		// });
		describe('GET api/points/:id', function(){
			it('Should return status 200', function(done){
				request.get("/api/points/1").expect(200, done);
			});	
			// it('Should return JSON response', function(done){
			// 	request.get("/api/points/1")
			// 	.set('Accept', 'application/json')
			// 	.expect('Content-Type', /json/)
			// 	.expect(200, done);
			// });
			// it('Should return only 1 result', function(done){
			// 	request.get("/api/points/1")
			// 	.set('Accept', 'application/json')
			// 	.expect(200)
			// 	.end((err, res) =>{
			// 		if(err) return done(err);
			// 		assert.equal(false, Array.isArray(res.body));
			// 		done();
			// 	});
			// });
			// it('Should return correct result', function(done){
			// 	request.get("/api/points/1")				
			// 	.expect(function(res) {
			// 		res.body.id = '1';
			// 		res.body.point_name = res.body.point_name.toUpperCase();
			// 	})
			// 	.expect(200, {
			// 		"id": '1',
			// 		"point_name": 'TESTINGPOINT1',
			// 		"lat": -0.487341772151899,
			// 		"lng": 0.177215189873418,
			// 		"street_id": 2,
			// 		"zone_id": 1
			// 	}, done);
			// });
			// it('Should be GeoJSON');
		});
		// describe('POST /api/points/', function () {
		// 	let point = {
		// 		"point_name": 'TestingPointNew',
		// 		"geom": '0101000020E6100000627E578B9B30DFBF602D6EC2FCAEC63F',
		// 		"street_id": 1,
		// 		"zone_id":1
		// 	};
		// 	it("Should return status 201:Created", function(done){
		// 		request.post("/api/points")
		// 		.send(point)
		// 		.expect(201)
		// 		.end(done);
		// 	});
		// 	it("Should return the location of the resource and the resource", function(done){
		// 		request.post("/api/points")
		// 		.send(point)
		// 		.expect(function(res){
		// 			res.body.id = "1";
		// 		})
		// 		.expect('Location', /\/api\/points\/[0-9]*/)
		// 		.expect(201, {
		// 			"id":1,
		// 			"point_name": 'TestingPointNew',
		// 			"geom": '0101000020E6100000627E578B9B30DFBF602D6EC2FCAEC63F',
		// 			"street_id": 1,
		// 			"zone_id":1
		// 		}).end(done);
		// 	});
		// 	it("Should be a Point");
		// 	it("Should not be a Point");
		// });
		// describe('DELETE /api/points/:id', function(){
		// 	it("Should delete a resource and receive status 204", function(done){
		// 		request.del("/api/points/37")
		// 			.expect(204)
		// 			.end(done);
		// 	});
		// 	it("Should not delete a resource", function(done){
		// 		request.del("/api/points/a")
		// 			.expect(500)
		// 			.end(done);
		// 	});
		// });
		// describe('PUT /api/points/:id', function(){
		// 	it("Should change the values of the Point", function(done){
		// 		request
		// 			.put("/api/points/3")
		// 			.send({
		// 				"id": 3,
		// 				"point_name": 'TESTINGPOINT3',
		// 				"geom": "0101000020E6100000627E578B9B30DFBF602D6EC2FCAEC63F",
		// 				"street_id": 2,
		// 				"zone_id": 1
		// 			})
		// 			.set('Content-Type', "application/json")
		// 			.set('Accept', "application/json")
		// 			.expect(200, {
		// 				"id": 3,
		// 				"point_name": 'TESTINGPOINT3',
		// 				"geom": "0101000020E6100000627E578B9B30DFBF602D6EC2FCAEC63F", 
		// 				"street_id": 2,
		// 				"zone_id": 1
		// 			})
		// 			.end(done);
		// 	});
		// 	it("Should be a JSON Content-Type", function(done){
		// 		request
		// 			.put("/api/points/2")
		// 			.send({
		// 				"id": '2',
		// 				"point_name": 'TESTINGPOINT1MODIFIED',
		// 				"geom": "0101000020E6100000627E578B9B30DFBF602D6EC2FCAEC63F",
		// 				"street_id": 2,
		// 				"zone_id": 1
		// 			})
		// 			.expect('Content-Type', "application/json; charset=utf-8")
		// 			.end(done);
		// 	});
		// });
		// describe("PATCH /api/points/4", function(){
		// 	it("Should return status 200 and the Resource", function(done){
		// 		let newPointName = "Patch Successfull";
		// 		request
		// 			.patch("/api/points/4")
		// 			.send({"point_name":newPointName, "zone_id": 1})
		// 			.set("Accept", "/application/json")
		// 			.set("Content-Type", "application/json")
		// 			.expect(200)
		// 			.end(function(err,res){
		// 				assert.equal(newPointName, res.body.point_name);
		// 				done();
		// 		});
		// 	});
		// });
	});
});