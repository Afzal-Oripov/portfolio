# Use the latest Python 3.12 image from Docker Hub
FROM python:3.12-slim

# Install gettext tools
RUN apt-get update && \
    apt-get install -y gettext && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Run Django development server by default
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
