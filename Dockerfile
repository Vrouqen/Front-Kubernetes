FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=888

WORKDIR /app

# Dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir gunicorn

# Copia el resto
COPY . .

# Usuario no-root
RUN useradd -m appuser
USER appuser

EXPOSE 888

# Gunicorn (2 workers es suficiente para este mini-frontend)
CMD ["gunicorn", "--bind", "0.0.0.0:888", "--workers", "2", "app:app"]
