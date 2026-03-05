#!/bin/bash
export PYTHONPATH=/home/site/wwwroot/backend-api
uvicorn api.main:app --host 0.0.0.0 --port $PORT