# ErgoWellness DevOps Makefile

.PHONY: help install dev build release docker-dev docker-build clean test deploy

# Default target
help:
	@echo "ErgoWellness DevOps Commands:"
	@echo ""
	@echo "Development:"
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make electron     - Start Electron app"
	@echo ""
	@echo "Build:"
	@echo "  make build        - Build for production"
	@echo "  make build-all    - Build for all platforms"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-dev   - Run dev environment in Docker"
	@echo "  make docker-build - Build app in Docker"
	@echo "  make docker-clean - Clean Docker containers"
	@echo ""
	@echo "Release:"
	@echo "  make version-patch - Bump patch version (0.0.x)"
	@echo "  make version-minor - Bump minor version (0.x.0)"
	@echo "  make release      - Create and push release tag"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean        - Clean build artifacts"
	@echo "  make audit        - Run security audit"
	@echo "  make format       - Format code with Prettier"

# Install dependencies
install:
	npm install

# Development
dev:
	npm run dev

electron:
	npm run electron:dev

# Build
build:
	npm run build

build-all:
	npm run electron:build

# Docker operations
docker-dev:
	docker-compose up dev

docker-build:
	docker-compose up build

docker-clean:
	docker-compose down -v
	docker system prune -f

# Version management
version-patch:
	npm version patch -m "chore: bump version to %s"
	@echo "Version bumped! Run 'make release' to create release"

version-minor:
	npm version minor -m "feat: bump version to %s"
	@echo "Version bumped! Run 'make release' to create release"

version-major:
	npm version major -m "feat!: bump version to %s"
	@echo "Version bumped! Run 'make release' to create release"

# Release
release:
	@echo "Creating release..."
	git push origin master --tags
	@echo "Release tag pushed! GitHub Actions will build and publish."

# Utilities
clean:
	rm -rf dist dist-electron node_modules/.vite

audit:
	npm audit
	npm outdated

format:
	npx prettier --write "src/**/*.{js,jsx,css}"

# Git operations
commit:
	git add .
	@read -p "Commit message: " msg; \
	git commit -m "$$msg"

push:
	git push origin master

# Complete workflow
deploy: version-patch commit push release
	@echo "Deployment initiated!"

