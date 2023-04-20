name: CI/CD Pipeline

description: |
This workflow will build, scan, lint, test and push a new container image and will then deploy it.

on:
push:
branches: - main
pull_request:
branches: - main

jobs:
LintAndTest:
name: Lint TypeScript Code
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v2 - uses: actions/setup-node@v1
with:
node-version: 16 - name: Install Dependencies
run: npm -I

      - name: Lint Code
        run: npm run lint
      - name: Test Code
        run: npm run test

SonarCloudScan:
runs-on: ubuntu-latest
needs: LintAndTest
steps: - uses: actions/checkout@v2
with:
fetch-depth: 0 - name: SonarCloud Scan
uses: sonarsource/sonarcloud-github-action@master
env:
GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

BuildAndPush:
name: Build and Push Docker Image
runs-on: ubuntu-latest
needs: SonarCloudScan
steps: - name: Build Docker image
run: docker build -t myapp:${{ github.sha }} .
      - name: Login to Docker registry
        run: echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
      - name: Push Docker image
        run: docker push myapp:${{ github.sha }}
