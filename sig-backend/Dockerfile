############################################################
# Dockerfile Python - Flask
############################################################
FROM python:3

# Crear directorio de trabajo
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .

# Install requirements
RUN pip install -r requirements.txt

EXPOSE 5000

CMD python server.py prod