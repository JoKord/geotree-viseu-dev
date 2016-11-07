'use strict'

const express = require('express');
const assert = require('assert');
const supertest = require('supertest');
var request = supertest.agent("http://localhost:3000");

const validator = require('geojson-validation');
