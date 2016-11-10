'use strict'
let express = require('express');
let assert = require('assert');
let supertest = require('supertest');
let request = supertest.agent("http://localhost:3000");
let validator = require('geojson-validation');
describe('Trees Routes', function () {
	describe('GET /api/points/1/trees', function () {
		it('Should return a 200 Status!', function (done) {
			request.get("/api/points/1/trees")
				.expect(200, done);
		});
		it('Should return JSON response', function(done){
				request.get("/api/points/")
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200, done);
		});
		it('Should return JSON response', function(done){
				request.get("/api/points/")
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200, done);
		});
	});
	describe('GET /api/points/1/trees/1', function () {
		it('Should return a 200 Status!', function (done) {
			request.get("/api/points/1/trees/1")
				.expect(200, done);
		});
		it('Should return JSON response', function(done){
				request.get("/api/points/1/trees/1")
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200, done);
		});
		it('Should return only 1 result', function(done){
				request.get("/api/points/1/trees/1")
				.set('Accept', 'application/json')
				.expect(200)
				.end((err, res) =>{
					if(err) return done(err);
					assert.equal(false, Array.isArray(res.body));
					done();
				});
			});
		it('Should return correct result', function(done){
			request.get("/api/points/1/trees/1")				
			.expect(200, { 
				id: 1, 
				id_point: 1, 
				state: "Viva da Silva",
				isAlive: true 
			}, done);
		});
	});
	describe('POST /api/points/1/trees', function () {
			let tree = {
				"state":"Vivinha"
			};
			it("Should return status 201:Created", function(done){
				request.post("/api/points/1/trees")
				.send(tree)
				.expect(201)
				.end(done);
			});
			it("Should return the location of the resource and the resource", function(done){
				request.post("/api/points/1/trees")
				.send(tree)
				.expect(function(res){
					res.body.id = "1";
				})
				.expect('Location', /\/api\/points\/[0-9]*\/trees\/[0-9]*/)
				.expect(201, { 
					'id': 1,
					'id_point': 1,
					'state': tree.state,
					'isAlive': true
				}).end(done);
			});
		});
	describe('PUT /api/points/1/trees/3', function(){
		it("Should change the values of the Tree", function(done){
			request.put("/api/points/1/trees/3")
				.send({
					"id": 3,
					"id_point": 1,
					"state": "Novo Estado",
					"isAlive": true
				})
				.set('Content-Type', "application/json")
				.set('Accept', "application/json")
				.expect(200, { 
					"id": 3,
					"id_point": 1,
					"state": "Novo Estado",
					"isAlive": true
				})
				.end(done);
		});
		it("Error in: change the values of the Tree", function(done){
			request.put("/api/points/1/trees/3")
				.send({
					"id": 3,
					"id_point": 1,
					"state": "Novo Estado",
				})
				.set('Content-Type', "application/json")
				.set('Accept', "application/json")
				.expect(422, done);
		});
		it("Should be a JSON Content-Type", function(done){
			request.put("/api/points/1/trees/3")
				.send({
					"id": 3,
					"id_point": 1,
					"state": "Estado Antigo",
					"isAlive": true
				})
				.expect('Content-Type', "application/json; charset=utf-8")
				.end(done);
		});
	});
	describe('PATCH /api/points/1/trees/4', function(){
		it("Should return status 200 and the Resource", function(done){
			request.patch("/api/points/1/trees/4")
				.send({"isAlive":false})
				.set("Accept", "/application/json")
				.set("Content-Type", "application/json")
				.expect(200)
				.end(function(err,res){
					assert.equal(false, res.body.isAlive);
					done();
				});
		});
		it("Should return status 200 and change the Tree State", function(done){
			request.patch("/api/points/1/trees/4")
				.send({"isAlive":true, "state": "Dead Inside"})
				.set("Accept", "/application/json")
				.set("Content-Type", "application/json")
				.expect(200)
				.end(function(err,res){
					assert.equal(true, res.body.isAlive);
					assert.equal("Dead Inside", res.body.state);
					done();
				});
		});
	});
	describe('DELETE /api/points/1/trees/8', function(){
		it("Should delete a resource and receive status 204", function(done){
				request.del("/api/points/1/trees/8")
					.expect(204)
					.end(done);
		});
		it("Should not delete a resource", function(done){
			request.del("/api/points/1/trees/x")
				.expect(500)
				.end(done);
		});
	});
});