# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.  

## Project Overview

Asaka Campus Portal is a documentation website for Toyo University's Asaka Campus students. It's built with Zensical (a static site generator) and automatically deployed to GitHub Pages at <https://yuhei-tsujimoto.github.io/asaka-portal/>  

## Essential Commands

### Development Environment Setup

```bash  
# Create and activate virtual environment
python3 -m venv .venv  
source .venv/bin/activate  

# Install dependencies
pip install -r requirements.txt  
```  

### Development Workflow

```bash  
# Start development server (auto-reloads on changes)
npm run dev  
# or directly:
source .venv/bin/activate && zensical serve  
# Access at: http://localhost:8000

# Build static site (outputs to site/ directory)
npm run build  
# or directly:
source .venv/bin/activate && zensical build  

# Build with clean output directory
zensical build --clean  
```  

**Note:** Always activate the virtual environment before running Zensical commands. The npm scripts handle this automatically.  

## Architecture

### Project Structure

```  
asaka-portal/  
├── docs/                       # Content source (Markdown files)  
│   ├── index.md               # Homepage (with frontmatter)  
│   ├── 01_スケジュール/       # Schedule category (has index.md)  
│   ├── 02_履修-成績/          # Academic registration category  
│   ├── 03_学生生活/           # Student life category  
│   ├── 04_進路-キャリア/      # Career services category  
│   ├── 05_各種申請/           # Various applications category  
│   └── 06_施設・設備/         # Facilities category  
├── site/                       # Build output (generated, not in git)  
├── .venv/                      # Python virtual environment (not in git)  
├── zensical.toml              # Zensical configuration  
└── requirements.txt           # Python dependencies  
```  

### Content Organization

- **Content Location:** All documentation is in `docs/` as Markdown files
- **Category Structure:** Numbered directories (e.g., `02_履修-成績/`) define content categories
- **Category index.md Rules:**
    - **01_スケジュール ONLY** has `index.md` (serves as the schedule homepage with embedded Google Calendar)
    - **All other categories** (02, 03, 04, 05, 06) do NOT have `index.md` - they function as toggle-only navigation items
    - Do NOT create `index.md` for categories other than 01_スケジュール
- **Navigation:** Automatically generated from folder structure and frontmatter; manual nav configuration is commented out in `zensical.toml`
- **Frontmatter:** Used in Markdown files for metadata (title, nav_order, layout)

### Zensical Configuration

The site is configured via `zensical.toml`:  

- **Site metadata:** name, description, author, URL, copyright
- **Language:** Japanese (`ja`)
- **Theme features:** Includes navigation, search, code highlighting, dark/light mode toggle
- **Navigation:** Auto-generated from file structure (manual nav config is commented out)

Key enabled features:  

- Full-text search with highlighting (`search.highlight`)
- Instant navigation with prefetch
- Code copy buttons and annotations
- Dark/light mode toggle with custom icons

## Deployment

### GitHub Actions Workflow

Located at `.github/workflows/docs.yml`:  

- **Triggers:** Push to `main`/`master` branch, or manual workflow dispatch
- **Process:** Install Python deps → `zensical build --clean` → Deploy to GitHub Pages
- **Output:** Deployed to `github-pages` environment

### Manual Deployment

Deployment happens automatically on push to main. To trigger manually:  

1. Go to GitHub Actions tab
2. Select "Documentation" workflow
3. Click "Run workflow"

## Content Development

### Adding New Pages

1. Create a Markdown file in the appropriate category directory under `docs/`
2. Add frontmatter with title and nav_order if needed
3. Zensical will automatically include it in the navigation

### Content Style Guidelines

#### Heading Hierarchy

- **Level 1 headings (`#`)**: Used for page titles only
    - Defined in the `title` frontmatter field with a single relevant emoji at the beginning
    - Example: `title: 💼 アルバイト` or `title: 🌍 英語単位認定`
    - Choose emojis that visually represent the page content
    - Appears in the navigation menu and page headers

- **Level 2 headings (`##`)**: Major sections that broadly divide page content
    - **Do NOT include emojis** - keep them clean and semantic
    - Use for major conceptual divisions within a page
    - Example: `## 申請手続き` or `## 利用方法`

- **Level 3 headings (`###`)**: Standard subsection headings (most commonly used)
    - Always prefix with a single relevant emoji at the beginning
    - Example: `### 📅 更新時期` or `### 📝 申請方法`
    - Choose emojis that visually represent the subsection content

#### Additional Style Rules

- **Language**: Always use Japanese for all content, documentation, and communication in this project
    - All Markdown content in `docs/` should be in Japanese
    - All documentation, comments, and commit messages should be in Japanese
    - This is a Japanese-language site for Japanese university students

- **Menu category titles (`parent` in frontmatter)**: Do NOT include emojis
    - Example: `parent: 学生生活` or `parent: 履修・成績`
    - Keep category names clean and consistent across all categories

### Modifying Site Configuration

Edit `zensical.toml` for:  

- Site metadata (name, description, URL)
- Theme features (navigation, search, etc.)
- Color scheme options
- Custom navigation structure (currently auto-generated)

### Search Functionality

The site features full-text search as a primary way for users to find information. The homepage emphasizes this feature prominently. When adding content, use clear, searchable keywords to improve discoverability.  

## Dependencies

- **Zensical:** 0.0.9 (static site generator)
- **Python:** 3.x required
- **Key Python packages:** markdown, pygments, pymdown-extensions (see `requirements.txt`)

## Deployment URL

Production site: <https://yuhei-tsujimoto.github.io/asaka-portal/>  
