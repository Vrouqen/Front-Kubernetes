FROM python:3.12-slim

WORKDIR /app

# Dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia TODO (app.py, templates/, static/ si existe, etc.)
COPY . .

EXPOSE 888

# Servidor simple de Flask (suficiente para tus pruebas)
CMD ["python", "app.py"]
