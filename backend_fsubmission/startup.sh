#!/bin/bash
export PYTHONPATH=/home/site/wwwroot/backend
uvicorn api.main:app --host 0.0.0.0 --port $PORT