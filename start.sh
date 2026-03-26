#!/bin/bash
cd backend && node server.js &
cd frontend && npm run build && npm start
