FROM python:3.11-buster
ENV PYTHONUNBUFFERED=1

WORKDIR /src

# Poetry をインストール
RUN pip install poetry

# 依存関係だけコピーしてインストール
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.in-project true
RUN poetry install --no-root

# ソースコードをコピー
COPY . .

# uvicorn 起動
ENTRYPOINT ["poetry", "run", "uvicorn", "backend.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]