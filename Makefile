.PHONY: help install dev dev-firefox build build-firefox zip zip-firefox clean check

# Default target
help:
	@echo "🚀 Browser Extension Development Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make install     Install dependencies"
	@echo ""
	@echo "Development:"
	@echo "  make dev         Start development server (Chrome)"
	@echo "  make dev-firefox Start development server (Firefox)"
	@echo ""
	@echo "Building:"
	@echo "  make build       Build for production (Chrome)"
	@echo "  make build-firefox Build for production (Firefox)"
	@echo ""
	@echo "Packaging:"
	@echo "  make zip         Create Chrome extension zip"
	@echo "  make zip-firefox Create Firefox extension zip"
	@echo ""
	@echo "Utilities:"
	@echo "  make check       Check TypeScript types"
	@echo "  make clean       Clean build files"

# Setup
install:
	@echo "📦 Installing dependencies..."
	bun install

# Development
dev:
	@echo "🔧 Starting development server for Chrome..."
	bun run dev

dev-firefox:
	@echo "🦊 Starting development server for Firefox..."
	bun run dev:firefox

# Building
build:
	@echo "🏗️  Building extension for Chrome..."
	bun run build

build-firefox:
	@echo "🏗️  Building extension for Firefox..."
	bun run build:firefox

# Packaging
zip:
	@echo "📦 Creating Chrome extension zip..."
	bun run zip

zip-firefox:
	@echo "📦 Creating Firefox extension zip..."
	bun run zip:firefox

# Utilities
check:
	@echo "🔍 Checking TypeScript types..."
	bun run compile

clean:
	@echo "🧹 Cleaning build files..."
	rm -rf .output
	rm -rf .wxt
